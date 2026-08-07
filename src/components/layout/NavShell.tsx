"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Phone, Calendar, Clock, Menu } from "lucide-react";
import { mainNavigation } from "@/data/navigation";
import { siteConfig } from "@/data/site";
import { analytics } from "@/lib/analytics";
import MobileNav from "./MobileNav";
import { cn } from "@/lib/utils";

/**
 * Conditional navigation shell.
 *
 * - **Homepage:** Hidden during hero sequence. After the hero scroll runway
 *   is consumed, a dark sticky nav bar slides down — its content mirrors the
 *   hero pills (brand left, links center, phone+book right), creating a
 *   visual "merge" effect.
 *
 * - **Other pages:** Renders the standard TopBar + white Header immediately,
 *   with normal sticky scroll behavior.
 */
export default function NavShell() {
  const pathname = usePathname();
  const isHomepage = pathname === "/";
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [navVisible, setNavVisible] = useState(false);
  const [showHours, setShowHours] = useState(false);
  const [showPhone, setShowPhone] = useState(false);

  useEffect(() => {
    if (!isHomepage) return;

    const onScroll = () => {
      // Nav appears when the red banner reaches the top of the viewport.
      // The spacer is 100vh, so scrollY >= vh means the scrollable content
      // (starting with the banner) has reached the top.
      setNavVisible(window.scrollY >= window.innerHeight);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHomepage]);



  const darkNavContent = (
    <div className="bg-brand-black/95 backdrop-blur-md border-b border-border-dark">
      <div className="container mx-auto px-4 h-16 md:h-18 flex items-center justify-between">
        {/* Left — Brand (mirrors left pill) */}
        <Link
          href="/"
          onClick={(e) => {
            // On the homepage, "/" is a no-op route change — scroll to the top instead.
            if (isHomepage) {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="flex items-center gap-2.5 group"
          aria-label="Miller Engines & Mechanical — Home"
        >
          <Image
            src="/assets/transparent-logo-white-removebg-preview.png"
            alt=""
            width={36}
            height={36}
            className="w-8 h-8 md:w-9 md:h-9 object-contain flex-shrink-0"
            aria-hidden="true"
          />
          <span className="text-white font-bold text-sm md:text-base tracking-tight">
            MILLER ENGINES
          </span>
        </Link>

        {/* Center — Desktop nav links */}
        <nav
          className="hidden md:flex items-center gap-6 lg:gap-8"
          aria-label="Main navigation"
        >
          {mainNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative font-semibold text-sm text-white/80 hover:text-white transition-colors duration-150 group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Right — Clock + Phone + Book + Hamburger */}
        <div className="flex items-center gap-2 relative">
          {/* Mobile clock icon with dropdown */}
          <button
            className="md:hidden flex items-center justify-center p-2 text-white/80 hover:text-white transition-colors rounded-full"
            onClick={() => { setShowHours(!showHours); setShowPhone(false); }}
            aria-label="View opening hours"
          >
            <Clock size={16} />
          </button>

          {/* Desktop phone (full text) */}
          <a
            href={`tel:${siteConfig.phone}`}
            onClick={() => analytics.ctaClick("nav_call")}
            className="hidden md:flex items-center gap-2 px-4 py-2 text-white font-semibold hover:text-primary transition-colors rounded-full min-h-[40px]"
            aria-label={`Call Miller Engines at ${siteConfig.phoneFormatted}`}
          >
            <Phone size={16} />
            <span className="text-sm">{siteConfig.phoneFormatted}</span>
          </a>

          {/* Mobile phone icon with dropdown */}
          <button
            className="md:hidden flex items-center justify-center p-2 text-white/80 hover:text-white transition-colors rounded-full"
            onClick={() => { setShowPhone(!showPhone); setShowHours(false); }}
            aria-label="View phone number"
          >
            <Phone size={16} />
          </button>

          {/* Book Service CTA — visible on all sizes */}
          <a
            href="/contact"
            onClick={() => analytics.ctaClick("nav_book")}
            className="flex items-center gap-1.5 bg-primary hover:bg-primary-hover text-white font-bold px-3 py-1.5 md:px-5 md:py-2 rounded-full transition-colors shadow-glow min-h-[32px] md:min-h-[40px] text-[11px] md:text-sm"
          >
            <Calendar size={14} className="md:w-4 md:h-4" />
            <span className="whitespace-nowrap">Book</span>
          </a>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-white hover:text-primary transition-colors rounded-lg min-w-[44px] min-h-[44px] flex items-center justify-center"
            onClick={() => setIsMobileNavOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={isMobileNavOpen}
            aria-controls="mobile-nav"
          >
            <Menu size={24} />
          </button>

          {/* Mobile Hours Dropdown */}
          {showHours && (
            <div className="absolute top-full right-0 mt-2 z-50 md:hidden bg-brand-black/95 backdrop-blur-md border border-border-dark rounded-xl px-4 py-3 shadow-xl">
              <p className="text-xs font-bold text-white/50 mb-1 uppercase tracking-wider">Trading Hours</p>
              <p className="text-sm text-white">{siteConfig.hours.formatted}</p>
            </div>
          )}

          {/* Mobile Phone Dropdown */}
          {showPhone && (
            <div className="absolute top-full right-0 mt-2 z-50 md:hidden bg-brand-black/95 backdrop-blur-md border border-border-dark rounded-xl px-4 py-3 shadow-xl">
              <p className="text-xs font-bold text-white/50 mb-1 uppercase tracking-wider">Call Us</p>
              <a href={`tel:${siteConfig.phone}`} className="text-sm text-white font-semibold hover:text-primary transition-colors block">
                {siteConfig.phoneFormatted}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <header
        className={cn(
          "z-50 w-full transition-all duration-500 ease-out",
          isHomepage
            ? [
                "fixed top-0 left-0 right-0",
                navVisible
                  ? "translate-y-0 opacity-100"
                  : "-translate-y-full opacity-0 pointer-events-none",
              ]
            : "sticky top-0"
        )}
      >
        {darkNavContent}
      </header>

      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
      />
    </>
  );
}
