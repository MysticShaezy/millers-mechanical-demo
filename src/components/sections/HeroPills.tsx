"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Calendar, Clock, Menu } from "lucide-react";
import { siteConfig } from "@/data/site";
import { analytics } from "@/lib/analytics";

interface HeroPillsProps {
  /** 0 = fully visible, 1 = fully hidden (merge transition) */
  progress: number;
  /** 0→1 as workshop image expands — pills glide upward to stay in black padding */
  expandProgress?: number;
  /** Trigger to open the mobile nav drawer */
  onMobileMenuOpen: () => void;
}

/**
 * Floating pill buttons that overlay the hero section.
 *
 * LEFT pill: Brand logo + "MILLER ENGINES" + hours
 * RIGHT pill: Phone number + "Book Service" CTA + mobile hamburger
 *
 * Below 1200px (nav: breakpoint), pills merge into a single bar.
 * Text is progressively hidden as the bar shrinks:
 *   1200px+ → two separate pills (full layout)
 *   768px–1200px → single merged bar, all text still visible
 *   640px–768px → hide hours text, keep brand name + phone number
 *   <640px → icons only with dropdowns
 */
export default function HeroPills({
  progress,
  expandProgress = 0,
  onMobileMenuOpen,
}: HeroPillsProps) {
  const [showHours, setShowHours] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const opacity = Math.max(1 - progress * 2, 0); // fully gone by progress 0.5
  // Combine: glide up ~16px during expansion + slide up further during merge
  const expandOffset = expandProgress * -16;
  const mergeOffset = -(progress * 24);
  const translateY = expandOffset + mergeOffset;

  return (
    <div
      className="absolute inset-x-0 top-0 z-40 pointer-events-none"
      style={{
        opacity,
        display: progress >= 0.95 ? "none" : "flex",
        transform: `translateY(${translateY}px)`,
        transition: "opacity 0.15s ease-out, transform 0.15s ease-out",
      }}
    >
      <div className="flex w-full px-4 pt-4 nav:px-6 nav:pt-5 relative">
        <div className="pointer-events-auto flex items-center justify-between w-full bg-brand-black/90 backdrop-blur-md rounded-full px-3 py-2 border border-border-dark shadow-2xl nav:bg-transparent nav:backdrop-blur-none nav:border-none nav:shadow-none nav:p-0 nav:w-full">
          
          {/* ── LEFT SECTION — Brand + Hours ─────────────────────────────── */}
          <div className="flex items-center gap-1.5 md:gap-2 min-w-0 flex-shrink nav:bg-brand-black/90 nav:backdrop-blur-md nav:rounded-full nav:px-4 nav:py-2.5 nav:border nav:border-border-dark nav:shadow-2xl">
            <Link
              href="/"
              className="flex items-center gap-1.5 md:gap-2 min-h-[36px] min-w-0 overflow-hidden px-2 nav:px-0"
              aria-label="Miller Engines & Mechanical — Home"
            >
              <Image
                src="/assets/transparent-logo-white-removebg-preview.png"
                alt=""
                width={32}
                height={32}
                className="w-6 h-6 nav:w-8 nav:h-8 object-contain flex-shrink-0"
                aria-hidden="true"
              />
              {/* Brand text: visible from sm (640px) up */}
              <span className="hidden sm:inline text-white font-bold text-xs md:text-sm tracking-tight truncate min-w-0">
                MILLER ENGINES
              </span>
            </Link>

            {/* Divider + hours — visible from md (768px) up */}
            <span
              className="hidden md:block text-white/20 text-lg select-none"
              aria-hidden="true"
            >
              |
            </span>
            <div className="hidden md:flex items-center gap-3 text-white/60">
              {siteConfig.hours.schedules.map((s, i) => (
                <span key={s.days} className="flex items-center gap-1.5">
                  {i === 0 && <Clock size={14} aria-hidden="true" />}
                  <span className="text-xs whitespace-nowrap">
                    {s.days}: {s.hours}
                  </span>
                  {i < siteConfig.hours.schedules.length - 1 && (
                    <span className="text-white/20 ml-1.5" aria-hidden="true">|</span>
                  )}
                </span>
              ))}
            </div>

            {/* Clock icon — only below md (768px) where hours text is hidden */}
            <button
              className="md:hidden flex items-center justify-center p-1.5 text-white/80 hover:text-white transition-colors rounded-full flex-shrink-0 relative"
              onClick={() => {
                setShowHours(!showHours);
                setShowPhone(false);
              }}
              aria-label="View opening hours"
            >
              <Clock size={16} />
            </button>
          </div>

          {/* ── RIGHT SECTION — Phone + Book + Mobile Menu ──────────────── */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0 nav:bg-brand-black/90 nav:backdrop-blur-md nav:rounded-full nav:px-2.5 nav:py-2.5 nav:border nav:border-border-dark nav:shadow-2xl">
            {/* Phone with full number — visible from sm (640px) up */}
            <a
              href={`tel:${siteConfig.phone}`}
              onClick={() => analytics.ctaClick("hero_pill_call")}
              className="hidden sm:flex items-center gap-2 px-3 py-2 text-white font-semibold hover:text-primary transition-colors rounded-full min-h-[36px]"
              aria-label={`Call Miller Engines at ${siteConfig.phoneFormatted}`}
            >
              <Phone size={16} />
              <span className="text-xs md:text-sm whitespace-nowrap">
                {siteConfig.phoneFormatted}
              </span>
            </a>

            {/* Phone icon only — below sm (640px) */}
            <button
              className="sm:hidden flex items-center justify-center p-1.5 text-white/80 hover:text-white transition-colors rounded-full flex-shrink-0 relative"
              onClick={() => {
                setShowPhone(!showPhone);
                setShowHours(false);
              }}
              aria-label="View phone number"
            >
              <Phone size={16} />
            </button>

            {/* Book Service CTA — always visible */}
            <a
              href="/contact"
              onClick={() => analytics.ctaClick("hero_pill_book")}
              className="flex items-center gap-1.5 bg-primary hover:bg-primary-hover text-white font-bold px-3 py-1.5 nav:px-5 nav:py-2 rounded-full transition-colors shadow-glow min-h-[32px] nav:min-h-[36px] text-[11px] nav:text-sm flex-shrink-0"
            >
              <Calendar size={14} className="nav:w-4 nav:h-4" />
              <span className="whitespace-nowrap">Book</span>
            </a>

            {/* Hamburger — only below nav: breakpoint (1200px) */}
            <button
              className="nav:hidden flex items-center justify-center p-1.5 mx-0.5 text-white hover:text-primary transition-colors rounded-full flex-shrink-0"
              onClick={onMobileMenuOpen}
              aria-label="Open navigation menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
        
        {/* Mobile Hours Dropdown Bubble — only below md where hours text is hidden */}
        {showHours && (
          <div className="absolute top-[64px] left-6 z-50 md:hidden pointer-events-auto bg-brand-black/95 backdrop-blur-md border border-border-dark rounded-xl px-4 py-3 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
            <p className="text-xs font-bold text-white/50 mb-2 uppercase tracking-wider">Trading Hours</p>
            <div className="space-y-1">
              {siteConfig.hours.schedules.map((s) => (
                <p key={s.days} className="text-sm text-white">
                  <span className="text-white/60">{s.days}:</span> {s.hours}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Mobile Phone Dropdown Bubble — only below sm where phone text is hidden */}
        {showPhone && (
          <div className="absolute top-[64px] right-24 z-50 sm:hidden pointer-events-auto bg-brand-black/95 backdrop-blur-md border border-border-dark rounded-xl px-4 py-3 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
            <p className="text-xs font-bold text-white/50 mb-1 uppercase tracking-wider">Call Us</p>
            <a href={`tel:${siteConfig.phone}`} className="text-sm text-white font-semibold hover:text-primary transition-colors block">
              {siteConfig.phoneFormatted}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
