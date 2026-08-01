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
 * As `progress` goes from 0→1, the pills fade out and slide up,
 * visually merging into the sticky nav bar that appears.
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
      <div className="flex w-full px-4 pt-4 md:px-6 md:pt-5 relative">
        <div className="pointer-events-auto flex items-center justify-between w-full bg-brand-black/90 backdrop-blur-md rounded-full px-3 py-2 border border-border-dark shadow-2xl md:bg-transparent md:backdrop-blur-none md:border-none md:shadow-none md:p-0 md:w-full">
          
          {/* ── LEFT SECTION — Brand + Hours ─────────────────────────────── */}
          <div className="flex items-center gap-1.5 md:gap-2 min-w-0 flex-shrink md:bg-brand-black/90 md:backdrop-blur-md md:rounded-full md:px-4 md:py-2.5 md:border md:border-border-dark md:shadow-2xl">
            <Link
              href="/"
              className="flex items-center gap-1.5 md:gap-2 min-h-[36px] min-w-0 overflow-hidden px-2 md:px-0"
              aria-label="Miller Engines & Mechanical — Home"
            >
              <Image
                src="/assets/transparent-logo-white-removebg-preview.png"
                alt=""
                width={32}
                height={32}
                className="w-6 h-6 md:w-8 md:h-8 object-contain flex-shrink-0"
                aria-hidden="true"
              />
              <span className="hidden md:inline text-white font-bold md:text-sm tracking-tight truncate min-w-0">
                MILLER ENGINES
              </span>
            </Link>

            {/* Divider + hours — desktop only */}
            <span
              className="hidden md:block text-white/20 text-lg select-none"
              aria-hidden="true"
            >
              |
            </span>
            <div className="hidden md:flex items-center gap-1.5 text-white/60">
              <Clock size={14} aria-hidden="true" />
              <span className="text-xs whitespace-nowrap">
                {siteConfig.hours.formatted}
              </span>
            </div>

            {/* Mobile Clock Icon (Toggles Dropdown) */}
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
          <div className="flex items-center gap-3 md:gap-1.5 flex-shrink-0 md:bg-brand-black/90 md:backdrop-blur-md md:rounded-full md:px-2.5 md:py-2.5 md:border md:border-border-dark md:shadow-2xl">
            {/* Desktop Phone */}
            <a
              href={`tel:${siteConfig.phone}`}
              onClick={() => analytics.ctaClick("hero_pill_call")}
              className="hidden md:flex items-center gap-2 px-4 py-2 text-white font-semibold hover:text-primary transition-colors rounded-full min-h-[36px]"
              aria-label={`Call Miller Engines at ${siteConfig.phoneFormatted}`}
            >
              <Phone size={16} />
              <span className="text-sm">
                {siteConfig.phoneFormatted}
              </span>
            </a>

            {/* Mobile Phone Icon (Toggles Dropdown) */}
            <button
              className="md:hidden flex items-center justify-center p-1.5 text-white/80 hover:text-white transition-colors rounded-full flex-shrink-0 relative"
              onClick={() => {
                setShowPhone(!showPhone);
                setShowHours(false);
              }}
              aria-label="View phone number"
            >
              <Phone size={16} />
            </button>

            {/* Book Service CTA */}
            <a
              href="/contact"
              onClick={() => analytics.ctaClick("hero_pill_book")}
              className="flex items-center gap-1.5 bg-primary hover:bg-primary-hover text-white font-bold px-3 py-1.5 md:px-5 md:py-2 rounded-full transition-colors shadow-glow min-h-[32px] md:min-h-[36px] text-[11px] md:text-sm flex-shrink-0"
            >
              <Calendar size={14} className="md:w-4 md:h-4" />
              <span className="whitespace-nowrap">Book</span>
            </a>

            {/* Hamburger — mobile only */}
            <button
              className="md:hidden flex items-center justify-center p-1.5 mx-0.5 text-white hover:text-primary transition-colors rounded-full flex-shrink-0"
              onClick={onMobileMenuOpen}
              aria-label="Open navigation menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
        
        {/* Mobile Hours Dropdown Bubble */}
        {showHours && (
          <div className="absolute top-[64px] left-6 z-50 md:hidden pointer-events-auto bg-brand-black/95 backdrop-blur-md border border-border-dark rounded-xl px-4 py-3 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
            <p className="text-xs font-bold text-white/50 mb-1 uppercase tracking-wider">Trading Hours</p>
            <p className="text-sm text-white">{siteConfig.hours.formatted}</p>
          </div>
        )}

        {/* Mobile Phone Dropdown Bubble */}
        {showPhone && (
          <div className="absolute top-[64px] right-24 z-50 md:hidden pointer-events-auto bg-brand-black/95 backdrop-blur-md border border-border-dark rounded-xl px-4 py-3 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
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
