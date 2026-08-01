"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import ScrollExpandMedia from "@/components/blocks/ScrollExpandMedia";
import HeroPills from "@/components/sections/HeroPills";
import MobileNav from "@/components/layout/MobileNav";

/**
 * Cinematic hero — fixed viewport with content scrolling over.
 *
 * Architecture:
 *   LAYER 1 (fixed): Nav pills + workshop image + logo — never moves.
 *   SPACER:          An empty div (100vh) pushes scrollable content below the fold.
 *   LAYER 2 (flow):  Red banner + page content scroll naturally over the hero.
 *
 * Phase 1 (ScrollExpandMedia, custom scroll lock):
 *   Workshop expands from card → full viewport.
 *   Text splits. Logo fades/scales in simultaneously.
 *   Pills visible throughout.
 *
 * After Phase 1 completes, native scroll takes over.
 * The red banner and page content scroll UP over the fixed hero.
 * Pills fade out as content covers the hero, merging into NavShell.
 */
export default function CinematicHero() {
  const [expandProgress, setExpandProgress] = useState(0);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [pillProgress, setPillProgress] = useState(0);
  const [scrollExtraScale, setScrollExtraScale] = useState(0);

  // Reset scroll on mount
  useEffect(() => {
    window.scrollTo(0, 0);
    const resetEvent = new Event("resetSection");
    window.dispatchEvent(resetEvent);
  }, []);

  // Track scroll for pill fade-out AND Phase B logo zoom
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      // Pills stay visible until the red banner reaches the TOP of the viewport.
      // Banner's top edge hits the top of the viewport exactly at scrollY = vh.
      // Start fading out exactly at that moment over a quick 50px scroll.
      const fadeStart = vh;
      const progress = Math.min(Math.max((y - fadeStart) / 50, 0), 1);
      setPillProgress(progress);
      // Phase B: logo continues scaling as banner scrolls up (scrollY 0→vh)
      setScrollExtraScale(Math.min(y / Math.max(vh, 1), 1) * 0.25);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Callback from ScrollExpandMedia — drives logo opacity + scale
  const handleProgressChange = useCallback((progress: number) => {
    setExpandProgress(progress);
  }, []);

  // ── Logo: Phase A (expansion) + Phase B (scroll zoom) ─────────────────
  const logoOpacity = expandProgress;
  // Phase A: 0.3→1.0 during workshop expansion
  // Phase B: continues 1.0→2.5 as user scrolls and banner covers hero
  const logoScale = 0.3 + expandProgress * 0.7 + scrollExtraScale;

  return (
    <>
      {/* ── LAYER 1: Fixed hero — never moves ──────────────────────────── */}
      <div className="fixed top-0 left-0 right-0 h-dvh z-0 overflow-hidden bg-black">
        {/* Workshop expansion + text split */}
        <div className="absolute inset-0 z-0">
          <ScrollExpandMedia
            mediaType="image"
            mediaSrc="/assets/workshop.jpg"
            bgImageSrc="/assets/hero-car.jpg"
            title="MILLER ENGINES"
            date="TOOWOOMBA QLD"
            scrollToExpand="SCROLL TO EXPLORE"
            textBlend={true}
            onProgressChange={handleProgressChange}
          />
        </div>

        {/* Logo reveal — scales/fades with expansion */}
        <div
          className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
          style={{ 
            opacity: logoOpacity,
            display: pillProgress >= 0.95 ? "none" : "flex",
          }}
        >
          <div
            className="w-[70vw] flex flex-col items-center gap-4"
            style={{ transform: `scale(${logoScale})`, maxWidth: "min(600px, 85vw)" }}
          >
            {/* NOT priority: the logo starts at opacity 0 and only fades in as the
                hero expands on scroll. Preloading it steals early bandwidth from the
                real LCP (hero background + title font). It loads promptly anyway. */}
            <Image
              src="/assets/transparent-logo-white-removebg-preview.png"
              alt="Miller Engines & Mechanical"
              width={600}
              height={470}
              className="drop-shadow-[0_0_60px_rgba(255,255,255,0.3)]"
              style={{ width: "100%", height: "auto" }}
              sizes="(max-width: 768px) 300px, 600px"
            />
          </div>
        </div>

        {/* Floating hero pills */}
        <HeroPills
          progress={pillProgress}
          expandProgress={expandProgress}
          onMobileMenuOpen={() => setIsMobileNavOpen(true)}
        />
      </div>

      {/* ── SPACER: pushes scrollable content below the viewport ──────── */}
      <div className="h-dvh" aria-hidden="true" />

      {/* Mobile nav drawer (triggered by pill hamburger) */}
      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
      />
    </>
  );
}
