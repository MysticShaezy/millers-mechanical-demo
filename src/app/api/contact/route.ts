// ============================================================================
// POST /api/contact — website enquiry → GoHighLevel contact + note + tag
// ============================================================================
//
// The contact lands in the GHL sub-account; a GHL workflow triggered by the
// "website-enquiry" tag sends the instant acknowledgement (SMS/email) and the
// after-hours message. Missed-call text-back is configured in GHL too — none
// of that lives in code, the site just delivers a clean, tagged contact.
//
// Env (Vercel → Project → Settings → Environment Variables, server-side):
//   GHL_API_KEY      Private Integration token for the sub-account
//                    (Settings → Private Integrations; scope contacts.write)
//   GHL_LOCATION_ID  the sub-account's location id
//   GHL_CONTACT_TAG  optional, defaults to "website-enquiry"

import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validation";
import { siteConfig } from "@/data/site";

const GHL = "https://services.leadconnectorhq.com";
const VERSION = "2021-07-28";

function ghlHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    Version: VERSION,
    "Content-Type": "application/json",
    Accept: "application/json",
  };
}

function splitName(name: string) {
  const parts = name.trim().split(/\s+/);
  return { firstName: parts[0] ?? "", lastName: parts.slice(1).join(" ") };
}

/** "0746 332 417" / "07 4633 2417" / "+61 7 4633 2417" → E.164 "+61746332417". */
function toE164(phone: string) {
  const digits = phone.replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) return digits;
  if (digits.startsWith("0")) return `+61${digits.slice(1)}`;
  if (digits.startsWith("61")) return `+${digits}`;
  return digits;
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const parsed = contactFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Please check the form", issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const token = process.env.GHL_API_KEY;
  const locationId = process.env.GHL_LOCATION_ID;
  if (!token || !locationId) {
    // Not wired yet — tell the visitor to call rather than pretend it sent.
    console.error("[contact] GHL_API_KEY / GHL_LOCATION_ID not configured");
    return NextResponse.json(
      { ok: false, error: "not_configured", phone: siteConfig.phoneFormatted },
      { status: 503 },
    );
  }

  const { name, phone, email, message } = parsed.data;
  const { firstName, lastName } = splitName(name);
  const tag = process.env.GHL_CONTACT_TAG || "website-enquiry";

  try {
    // 1. Upsert the contact (dedupes on email/phone per the location setting).
    const up = await fetch(`${GHL}/contacts/upsert`, {
      method: "POST",
      headers: ghlHeaders(token),
      body: JSON.stringify({
        locationId,
        firstName,
        lastName,
        name,
        email,
        phone: toE164(phone),
        source: "Website contact form",
      }),
    });
    const upJson = (await up.json().catch(() => ({}))) as {
      contact?: { id?: string };
      message?: string | string[];
    };
    const contactId = upJson.contact?.id;
    if (!up.ok || !contactId) {
      console.error("[contact] GHL upsert failed", up.status, upJson.message);
      return NextResponse.json({ ok: false, error: "crm_error" }, { status: 502 });
    }

    // 2. The message goes on the contact as a note (there is no message field
    //    on a contact); 3. the tag is what the acknowledgement workflow keys on.
    //    Add Tag rather than tags-on-upsert so existing tags are kept.
    const [note, tags] = await Promise.all([
      fetch(`${GHL}/contacts/${contactId}/notes`, {
        method: "POST",
        headers: ghlHeaders(token),
        body: JSON.stringify({
          body: `Website enquiry (${new Date().toLocaleString("en-AU", { timeZone: "Australia/Brisbane" })})\n\n${message}`,
        }),
      }),
      fetch(`${GHL}/contacts/${contactId}/tags`, {
        method: "POST",
        headers: ghlHeaders(token),
        body: JSON.stringify({ tags: [tag] }),
      }),
    ]);
    if (!note.ok) console.error("[contact] GHL note failed", note.status);
    if (!tags.ok) console.error("[contact] GHL tag failed", tags.status);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] GHL request threw", err);
    return NextResponse.json({ ok: false, error: "crm_error" }, { status: 502 });
  }
}
