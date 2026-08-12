"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";

interface ScrollExpandMediaProps {
  mediaType?: "video" | "image";
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  onProgressChange?: (progress: number) => void;
  children?: ReactNode;
}

/**
 * Scroll-driven hero expansion.
 *
 * Progress is derived from NATIVE window scroll over a "runway" (the first
 * viewport-height of scrolling — see the 200dvh spacer in CinematicHero).
 * The old implementation hijacked wheel/touch events (preventDefault +
 * window.scrollTo(0,0) to pin the page), which fought the browser's scroll
 * physics on mobile: iOS momentum leaked through, got snapped back, and the
 * mid-gesture handoff to native scroll required lifting the finger — the
 * source of the jitter. Native scroll + a passive rAF-throttled listener
 * keeps the browser in charge; the fixed hero simply renders progress.
 */
const ScrollExpandMedia = ({
  mediaType = "video",
  mediaSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  onProgressChange,
  children,
}: ScrollExpandMediaProps) => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [isMobileState, setIsMobileState] = useState<boolean>(false);
  const [viewport, setViewport] = useState<{ w: number; h: number }>({
    w: 0,
    h: 0,
  });

  // Notify parent of scroll progress changes
  useEffect(() => {
    onProgressChange?.(scrollProgress);
  }, [scrollProgress, onProgressChange]);

  // Drive progress from native scroll: runway = one viewport height.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const runway = window.innerHeight;
      const p = Math.min(Math.max(window.scrollY / runway, 0), 1);
      setScrollProgress(p);
      setShowContent(p >= 1);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const checkIfMobile = (): void => {
      setIsMobileState(window.innerWidth < 768);
      setViewport({ w: window.innerWidth, h: window.innerHeight });
    };
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Card dimensions.
  // Mobile: expand all the way to the full viewport (object-cover crop) so the
  //         fully-expanded image FILLS the screen — no black borders around it.
  // Desktop: unchanged — expands toward a large rounded card (95vw/85vh caps).
  const mediaWidth = isMobileState
    ? 300 + scrollProgress * (Math.max(viewport.w, 300) - 300)
    : 300 + scrollProgress * 1250;
  const mediaHeight = isMobileState
    ? 300 + scrollProgress * (Math.max(viewport.h, 300) - 300)
    : 300 + scrollProgress * 500;
  // Corners ease to square on mobile as the card reaches full-bleed.
  const mobileRadius = `${16 * (1 - scrollProgress)}px`;
  const textTranslateX = scrollProgress * (isMobileState ? 180 : 150);
  const firstWord = title ? title.split(" ")[0] : "";
  const restOfTitle = title ? title.split(" ").slice(1).join(" ") : "";

  return (
    <div className="transition-colors duration-700 ease-in-out overflow-x-hidden">
      <section className="relative flex flex-col items-center justify-start min-h-[100dvh] bg-black">
        <div className="relative w-full flex flex-col items-center min-h-[100dvh]">
          {/* Background image — visible immediately (SSR), fades out as media expands.
              Plain div (NOT motion) with inline opacity so the browser treats it as a
              stable SSR element. This is the LCP/FCP element — keep it static.
              `fill` + object-cover = exact container fit: the minimum zoom that
              still covers the viewport, so no black ever shows behind it. */}
          <div
            className="absolute inset-0 z-0 h-full"
            style={{ opacity: 1 - scrollProgress }}
          >
            <Image
              src={bgImageSrc}
              alt="Background"
              fill
              className="object-cover object-center"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/10" />
          </div>

          <div className="container mx-auto flex flex-col items-center justify-start relative z-10">
            <div className="flex flex-col items-center justify-center w-full h-[100dvh] relative">
              {/* Expanding media card */}
              <div
                className="absolute z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-none rounded-2xl"
                style={{
                  width: `${mediaWidth}px`,
                  height: `${mediaHeight}px`,
                  maxWidth: isMobileState ? "100vw" : "95vw",
                  maxHeight: isMobileState ? "100dvh" : "85vh",
                  boxShadow: `0px 0px 50px rgba(0, 0, 0, ${0.3 * scrollProgress})`,
                  backgroundColor: "transparent",
                  overflow: "hidden",
                  ...(isMobileState ? { borderRadius: mobileRadius } : {}),
                }}
              >
                {mediaType === "image" && (
                  <div
                    className="relative w-full h-full"
                    style={{ opacity: scrollProgress }}
                  >
                    {/* NOT priority: this card is opacity:0 until the user scrolls,
                        so preloading it (it's a large image) only steals early
                        bandwidth from the real LCP/font. It's in-viewport, so it
                        still loads promptly via the default eager path. */}
                    <Image
                      src={mediaSrc}
                      alt={title || "Media content"}
                      width={1280}
                      height={720}
                      className="w-full h-full object-cover rounded-xl"
                      sizes="(max-width: 768px) 100vw, 85vw"
                      style={
                        isMobileState ? { borderRadius: mobileRadius } : undefined
                      }
                    />
                    <div
                      className="absolute inset-0 bg-black/10 rounded-xl"
                      style={
                        isMobileState ? { borderRadius: mobileRadius } : undefined
                      }
                    />
                  </div>
                )}

                {/* Date and scroll prompt */}
                <div className="flex flex-col items-center text-center relative z-10 mt-4 transition-none">
                  {date && (
                    <p
                      className="text-2xl text-blue-200"
                      style={{
                        transform: `translateX(-${textTranslateX}vw)`,
                      }}
                    >
                      {date}
                    </p>
                  )}
                  {scrollToExpand && (
                    <p
                      className="text-blue-200 font-medium text-center tracking-widest uppercase"
                      style={{
                        transform: `translateX(${textTranslateX}vw)`,
                      }}
                    >
                      {scrollToExpand}
                    </p>
                  )}
                </div>
              </div>

              {/* Title text — splits as scroll progresses */}
              <div
                className={`flex items-center justify-center text-center gap-4 w-full relative z-10 transition-none flex-col ${
                  textBlend ? "mix-blend-difference" : "mix-blend-normal"
                }`}
              >
                {/* Plain h2 (NOT motion) — this is the LCP element. The transform
                    is scroll-driven inline style, so no motion component is needed.
                    hero-text-red + hero-text-script = Lobster script, red fill,
                    white outline, black glow (matches the Miller logo). */}
                <h2
                  className="text-6xl md:text-8xl lg:text-9xl font-bold hero-text-red hero-text-script transition-none"
                  style={{
                    transform: `translateX(-${textTranslateX}vw)`,
                  }}
                >
                  {firstWord}
                </h2>
                <h2
                  className="text-6xl md:text-8xl lg:text-9xl font-bold text-center hero-text-red hero-text-script transition-none"
                  style={{
                    transform: `translateX(${textTranslateX}vw)`,
                  }}
                >
                  {restOfTitle}
                </h2>
                <p
                  className="text-white text-sm md:text-lg lg:text-xl font-semibold tracking-widest uppercase mt-2 md:mt-4 text-center max-w-2xl mx-auto transition-none"
                  style={{
                    fontFamily: 'var(--font-montserrat), sans-serif',
                    WebkitTextStroke: '0.5px rgba(0, 0, 0, 0.7)',
                    paintOrder: 'stroke fill',
                    textShadow: '0 1px 4px rgba(0, 0, 0, 0.6)',
                    opacity: Math.max(1 - textTranslateX / 8, 0),
                  }}
                >
                  offer a full range of mechanical servicing, repair and maintenance services.
                </p>
              </div>
            </div>

            {/* Children content — fades in after expansion (CSS transition, no framer-motion) */}
            <section
              className="flex flex-col w-full px-4 py-10 md:px-16 lg:py-20"
              style={{
                opacity: showContent ? 1 : 0,
                transition: "opacity 0.7s ease-in-out",
              }}
            >
              {children}
            </section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;
