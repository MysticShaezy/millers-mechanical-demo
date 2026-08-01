"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { X, Phone } from "lucide-react";
import { mainNavigation } from "@/data/navigation";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const navRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);

  // Only render portal after client-side mount to prevent hydration mismatch
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Focus trap and body scroll lock
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.setProperty("--scroll-top", `-${scrollY}px`);
      document.body.classList.add("nav-open");
      // Focus the close button when opening
      setTimeout(() => closeButtonRef.current?.focus(), 100);
    } else {
      const scrollY = document.body.style.getPropertyValue("--scroll-top");
      document.body.classList.remove("nav-open");
      document.body.style.removeProperty("--scroll-top");
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }

    return () => {
      const scrollY = document.body.style.getPropertyValue("--scroll-top");
      document.body.classList.remove("nav-open");
      document.body.style.removeProperty("--scroll-top");
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    };
  }, [isOpen]);

  // Close on Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }

      // Focus trap
      if (e.key === "Tab" && navRef.current) {
        const focusableElements = navRef.current.querySelectorAll<HTMLElement>(
          'a[href], button, [tabindex]:not([tabindex="-1"])'
        );
        const firstEl = focusableElements[0];
        const lastEl = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl?.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl?.focus();
        }
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleKeyDown]);

  // Don't render on server or before mount
  if (!mounted) return null;

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] transition-opacity duration-normal",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={navRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={cn(
          "fixed top-0 right-0 h-full w-[300px] max-w-[85vw] bg-brand-black z-[95]",
          "flex flex-col shadow-2xl",
          "transition-transform duration-slow ease-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Close button */}
        <div className="flex items-center justify-between p-6 border-b border-border-dark">
          <span className="text-white font-bold text-lg">Menu</span>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/10 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Close navigation menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation links */}
        <div className="flex-1 overflow-y-auto py-6">
          <ul className="space-y-1 px-4">
            {mainNavigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center px-4 py-4 text-lg font-semibold text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-fast min-h-[44px]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Phone CTA */}
        <div className="p-6 border-t border-border-dark">
          <a
            href={`tel:${siteConfig.phone}`}
            className="flex items-center justify-center gap-3 w-full bg-primary hover:bg-primary-hover text-white font-bold py-4 rounded-lg transition-colors min-h-[44px]"
            aria-label={`Call Miller Engines at ${siteConfig.phoneFormatted}`}
          >
            <Phone size={20} />
            <span>{siteConfig.phoneFormatted}</span>
          </a>

          <div className="flex items-center justify-center gap-4 mt-4 text-sm text-gray-500">
            <a
              href={siteConfig.social.facebook}
              className="hover:text-primary transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              Facebook
            </a>
            <span aria-hidden="true">·</span>
            <a
              href={siteConfig.social.instagram}
              className="hover:text-primary transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}
