"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import ContactFormStatic from "./ContactFormStatic";

// The enhanced form (react-hook-form + zod ≈ 75 KB of JS) is the single
// biggest chunk on the home page and sits at the very bottom of it. Loading it
// only when the section is within ~600px of the viewport keeps that JS out of
// the initial load — and out of what Lighthouse charges to LCP.
const ContactFormInner = dynamic(() => import("./ContactFormInner"), {
  ssr: false,
  loading: () => <ContactFormStatic />,
});

export default function ContactForm() {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || near) return;
    if (typeof IntersectionObserver === "undefined") {
      const t = setTimeout(() => setNear(true), 0);
      return () => clearTimeout(t);
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "600px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [near]);

  return <div ref={ref}>{near ? <ContactFormInner /> : <ContactFormStatic />}</div>;
}
