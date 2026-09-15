"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, CheckCircle, Phone } from "lucide-react";
import { useState } from "react";
import { contactFormSchema, type ContactFormValues } from "@/lib/validation";
import { analytics } from "@/lib/analytics";
import { siteConfig } from "@/data/site";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/motion/FadeIn";
import { cn } from "@/lib/utils";

/**
 * The enhanced contact form (react-hook-form + zod + /api/contact submit).
 * Loaded by ContactForm only when the section nears the viewport — the
 * static markup in ContactFormStatic is what the server renders first.
 */
export default function ContactFormInner() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setSubmitError(null);
    // → /api/contact → GoHighLevel contact + note + tag. The GHL workflow on
    //   that tag sends the instant acknowledgement, so we only confirm here
    //   when the contact really landed — never a fake "sent".
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        setSubmitError(
          `We couldn't send that just now — please call us on ${siteConfig.phoneFormatted} and we'll sort it straight away.`,
        );
        return;
      }
    } catch {
      setSubmitError(
        `We couldn't send that just now — please call us on ${siteConfig.phoneFormatted} and we'll sort it straight away.`,
      );
      return;
    }
    analytics.formSubmit("contact");
    setIsSubmitted(true);
    reset();

    // Reset success message after 8 seconds
    setTimeout(() => setIsSubmitted(false), 8000);
  };

  return (
    <>
        {isSubmitted ? (
          <FadeIn>
            <div className="text-center py-12 bg-green-50 rounded-2xl border border-green-200">
              <CheckCircle className="text-success mx-auto mb-4" size={48} />
              <h3 className="text-2xl font-bold text-brand-black mb-2">
                Message Sent!
              </h3>
              <p className="text-text-secondary">
                Thanks for reaching out. You&apos;ll get a confirmation text or
                email in a moment, and we&apos;ll be in touch as soon as we can.
              </p>
            </div>
          </FadeIn>
        ) : (
          <FadeIn>
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-sm font-semibold text-brand-black mb-2"
                  >
                    Name <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    {...register("name")}
                    className={cn(
                      "w-full px-4 py-3 rounded-lg border bg-white outline-none transition-all duration-fast",
                      "focus:ring-2 focus:ring-primary/20 focus:border-primary",
                      errors.name
                        ? "border-error ring-2 ring-error/20"
                        : "border-border"
                    )}
                    placeholder="Your Name"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" className="text-error text-sm mt-1.5" role="alert">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="contact-phone"
                    className="block text-sm font-semibold text-brand-black mb-2"
                  >
                    Phone <span className="text-primary">*</span>
                  </label>
                  <input
                    type="tel"
                    id="contact-phone"
                    {...register("phone")}
                    className={cn(
                      "w-full px-4 py-3 rounded-lg border bg-white outline-none transition-all duration-fast",
                      "focus:ring-2 focus:ring-primary/20 focus:border-primary",
                      errors.phone
                        ? "border-error ring-2 ring-error/20"
                        : "border-border"
                    )}
                    placeholder="Your Phone Number"
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                  />
                  {errors.phone && (
                    <p id="phone-error" className="text-error text-sm mt-1.5" role="alert">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-sm font-semibold text-brand-black mb-2"
                >
                  Email <span className="text-primary">*</span>
                </label>
                <input
                  type="email"
                  id="contact-email"
                  {...register("email")}
                  className={cn(
                    "w-full px-4 py-3 rounded-lg border bg-white outline-none transition-all duration-fast",
                    "focus:ring-2 focus:ring-primary/20 focus:border-primary",
                    errors.email
                      ? "border-error ring-2 ring-error/20"
                      : "border-border"
                  )}
                  placeholder="Your Email Address"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="text-error text-sm mt-1.5" role="alert">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-sm font-semibold text-brand-black mb-2"
                >
                  Message <span className="text-primary">*</span>
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  {...register("message")}
                  className={cn(
                    "w-full px-4 py-3 rounded-lg border bg-white outline-none transition-all duration-fast resize-none",
                    "focus:ring-2 focus:ring-primary/20 focus:border-primary",
                    errors.message
                      ? "border-error ring-2 ring-error/20"
                      : "border-border"
                  )}
                  placeholder="How can we help you?"
                  aria-invalid={!!errors.message}
                  aria-describedby={
                    errors.message ? "message-error" : undefined
                  }
                />
                {errors.message && (
                  <p id="message-error" className="text-error text-sm mt-1.5" role="alert">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {submitError && (
                <p
                  role="alert"
                  className="flex items-start gap-2 text-sm text-error bg-primary-light border border-error/30 rounded-lg px-4 py-3"
                >
                  <Phone size={16} className="flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    {submitError}{" "}
                    <a href={`tel:${siteConfig.phone}`} className="font-semibold underline underline-offset-2">
                      Tap to call
                    </a>
                  </span>
                </p>
              )}

              <Button
                type="submit"
                variant="primary"
                size="lg"
                icon={<Send size={20} />}
                disabled={isSubmitting}
                className="w-full md:w-auto"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </FadeIn>
        )}
    </>
  );
}
