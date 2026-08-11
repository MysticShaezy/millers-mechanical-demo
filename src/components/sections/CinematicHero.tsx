"use client";

import { useState, useEffect, useCallback } from "react";
import ScrollExpandMedia from "@/components/blocks/ScrollExpandMedia";
import HeroPills from "@/components/sections/HeroPills";
import MobileNav from "@/components/layout/MobileNav";

/**
 * Cinematic hero — fixed viewport with content scrolling over.
 *
 * Architecture:
 *   LAYER 1 (fixed): Nav pills + workshop image + logo — never moves.
 *   SPACER:          An empty div (200dvh) provides the scroll runway.
 *   LAYER 2 (flow):  Red banner + page content scroll naturally over the hero.
 *
 * Phase 1 (scrollY 0→vh, native scroll — no event hijacking):
 *   Workshop expands from card → full viewport as a function of scrollY.
 *   Text splits. Logo fades/scales in simultaneously.
 *   Pills visible throughout.
 *
 * Phase 2 (scrollY vh→2vh):
 *   The red banner and page content scroll UP over the fixed hero.
 *   Pills fade out as content covers the hero, merging into NavShell.
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

  // Track scroll for pill fade-out AND Phase B logo zoom.
  // Scroll map (spacer = 200dvh):
  //   scrollY 0→vh   — expansion runway (ScrollExpandMedia drives progress 0→1)
  //   scrollY vh→2vh — banner + content rise over the fixed hero
  //   scrollY = 2vh  — banner reaches the top; pills hand off to NavShell
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const vh = Math.max(window.innerHeight, 1);
      // Pills stay visible until the red banner reaches the TOP of the viewport
      // (scrollY = 2vh), then fade out over a quick 50px of scroll.
      const fadeStart = 2 * vh;
      const progress = Math.min(Math.max((y - fadeStart) / 50, 0), 1);
      setPillProgress(progress);
      // Phase B: logo continues scaling as the banner scrolls up (scrollY vh→2vh)
      setScrollExtraScale(Math.min(Math.max((y - vh) / vh, 0), 1) * 0.25);
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
            className="w-[70vw] flex flex-col items-center gap-4 text-center"
            style={{ transform: `scale(${logoScale})`, maxWidth: "min(700px, 90vw)" }}
          >
            <p
              className="text-white text-2xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)]"
              style={{ WebkitTextStroke: '0.5px rgba(0, 0, 0, 0.6)', paintOrder: 'stroke fill' }}
            >
              Come See Our Trusted Local Team Today
            </p>
            <p
              className="text-white text-sm md:text-lg max-w-md bg-primary/90 backdrop-blur-sm rounded-full px-6 py-2.5"
              style={{ WebkitTextStroke: '0.3px rgba(0, 0, 0, 0.5)', paintOrder: 'stroke fill' }}
            >
              Toowoomba&apos;s most reliable engine &amp; mechanical workshop since 2017.
            </p>
          </div>
        </div>

        {/* Floating hero pills */}
        <HeroPills
          progress={pillProgress}
          expandProgress={expandProgress}
          onMobileMenuOpen={() => setIsMobileNavOpen(true)}
        />
      </div>

      {/* ── SPACER: 200dvh scroll runway ────────────────────────────────
          First 100dvh of native scroll drives the hero expansion
          (ScrollExpandMedia maps scrollY/innerHeight → progress).
          The second 100dvh is the stretch where the banner + content
          rise over the fixed hero — same sequence as before, but the
          browser owns the scroll (no touch hijacking). */}
      <div className="h-[200dvh]" aria-hidden="true" />

      {/* Mobile nav drawer (triggered by pill hamburger) */}
      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
      />
    </>
  );
}
