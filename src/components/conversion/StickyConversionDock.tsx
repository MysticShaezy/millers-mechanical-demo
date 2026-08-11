"use client";

import { useState, useEffect } from "react";
import { Phone, Calendar } from "lucide-react";
import { siteConfig } from "@/data/site";
import { analytics } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export default function StickyConversionDock() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show once the page content starts rising over the hero.
      // The 200dvh spacer means expansion finishes at 1×vh; 1.8×vh keeps the
      // same "shortly before the banner tops out" timing as before.
      setIsVisible(window.scrollY > window.innerHeight * 1.8);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-sticky md:bottom-6 md:left-auto md:right-6 md:w-auto",
        "transition-all duration-slow",
        isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-full opacity-0 pointer-events-none"
      )}
    >
      {/* Mobile — full-width bar with safe area support */}
      <div className="md:hidden flex flex-wrap bg-brand-black/95 backdrop-blur-md border-t border-border-dark" style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
        <a
          href={`tel:${siteConfig.phone}`}
          onClick={() => analytics.ctaClick("dock_call_mobile")}
          className="flex-1 flex items-center justify-center gap-2 py-4 text-white font-bold hover:bg-primary transition-colors min-h-[56px]"
          aria-label={`Call Miller Engines at ${siteConfig.phoneFormatted}`}
        >
          <Phone size={20} />
          <span>Call Now</span>
        </a>
        <div className="w-px bg-border-dark" />
        <a
          href="/contact"
          onClick={() => analytics.ctaClick("dock_book_mobile")}
          className="flex-1 flex items-center justify-center gap-2 py-4 bg-primary text-white font-bold hover:bg-primary-hover transition-colors min-h-[56px]"
        >
          <Calendar size={20} />
          <span>Book Service</span>
        </a>
      </div>

      {/* Desktop — floating pill */}
      <div className="hidden md:flex items-center gap-3 bg-brand-black/95 backdrop-blur-md rounded-full px-2 py-2 shadow-2xl border border-border-dark">
        <a
          href={`tel:${siteConfig.phone}`}
          onClick={() => analytics.ctaClick("dock_call_desktop")}
          className="flex items-center gap-2 px-5 py-3 text-white font-semibold hover:text-primary transition-colors rounded-full min-h-[44px]"
          aria-label={`Call Miller Engines at ${siteConfig.phoneFormatted}`}
        >
          <Phone size={18} />
          <span className="text-sm">{siteConfig.phoneFormatted}</span>
        </a>
        <a
          href="/contact"
          onClick={() => analytics.ctaClick("dock_book_desktop")}
          className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-bold px-6 py-3 rounded-full transition-colors shadow-glow min-h-[44px]"
        >
          <Calendar size={18} />
          <span className="text-sm">Book Service</span>
        </a>
      </div>
    </div>
  );
}
