"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type TouchEvent,
  type WheelEvent,
} from "react";
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
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState<boolean>(false);
  const [touchStartY, setTouchStartY] = useState<number>(0);
  const [isMobileState, setIsMobileState] = useState<boolean>(false);

  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setScrollProgress(0);
    setShowContent(false);
    setMediaFullyExpanded(false);
  }, [mediaType]);

  // Notify parent of scroll progress changes
  useEffect(() => {
    onProgressChange?.(scrollProgress);
  }, [scrollProgress, onProgressChange]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (mediaFullyExpanded && e.deltaY < 0 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const scrollDelta = e.deltaY * 0.0009;
        const newProgress = Math.min(
          Math.max(scrollProgress + scrollDelta, 0),
          1
        );
        setScrollProgress(newProgress);

        if (newProgress >= 1) {
          setMediaFullyExpanded(true);
          setShowContent(true);
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      setTouchStartY(e.touches[0].clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartY) return;
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;
      if (mediaFullyExpanded && deltaY < -20 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const scrollFactor = deltaY < 0 ? 0.008 : 0.005;
        const scrollDelta = deltaY * scrollFactor;
        const newProgress = Math.min(
          Math.max(scrollProgress + scrollDelta, 0),
          1
        );
        setScrollProgress(newProgress);
        if (newProgress >= 1) {
          setMediaFullyExpanded(true);
          setShowContent(true);
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }
        setTouchStartY(touchY);
      }
    };

    const handleTouchEnd = (): void => {
      setTouchStartY(0);
    };

    const handleScroll = (): void => {
      if (!mediaFullyExpanded) {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener(
      "wheel",
      handleWheel as unknown as EventListener,
      { passive: false }
    );
    window.addEventListener("scroll", handleScroll as EventListener);
    window.addEventListener(
      "touchstart",
      handleTouchStart as unknown as EventListener,
      { passive: false }
    );
    window.addEventListener(
      "touchmove",
      handleTouchMove as unknown as EventListener,
      { passive: false }
    );
    window.addEventListener("touchend", handleTouchEnd as EventListener);

    return () => {
      window.removeEventListener(
        "wheel",
        handleWheel as unknown as EventListener
      );
      window.removeEventListener("scroll", handleScroll as EventListener);
      window.removeEventListener(
        "touchstart",
        handleTouchStart as unknown as EventListener
      );
      window.removeEventListener(
        "touchmove",
        handleTouchMove as unknown as EventListener
      );
      window.removeEventListener("touchend", handleTouchEnd as EventListener);
    };
  }, [scrollProgress, mediaFullyExpanded, touchStartY]);

  useEffect(() => {
    const checkIfMobile = (): void => {
      setIsMobileState(window.innerWidth < 768);
    };
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const mediaWidth = 300 + scrollProgress * (isMobileState ? 650 : 1250);
  const mediaHeight = 400 + scrollProgress * (isMobileState ? 200 : 400);
  const textTranslateX = scrollProgress * (isMobileState ? 180 : 150);
  const firstWord = title ? title.split(" ")[0] : "";
  const restOfTitle = title ? title.split(" ").slice(1).join(" ") : "";

  return (
    <div
      ref={sectionRef}
      className="transition-colors duration-700 ease-in-out overflow-x-hidden"
    >
      <section className="relative flex flex-col items-center justify-start min-h-[100dvh] bg-black">
        <div className="relative w-full flex flex-col items-center min-h-[100dvh]">
          {/* Background image — visible immediately (SSR), fades out as media expands.
              Plain div (NOT motion) with inline opacity so the browser treats it as a
              stable SSR element. framer-motion would "remove + re-add" it during
              hydration, disqualifying this full-viewport image as the LCP and forcing
              LCP onto late-painting text. This is the LCP/FCP element — keep it static. */}
          <div
            className="absolute inset-0 z-0 h-full"
            style={{ opacity: 1 - scrollProgress }}
          >
            <Image
              src={bgImageSrc}
              alt="Background"
              width={1920}
              height={1080}
              className="w-screen h-screen"
              style={{ objectFit: "cover", objectPosition: "center" }}
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
                  maxWidth: "95vw",
                  maxHeight: "85vh",
                  boxShadow: `0px 0px 50px rgba(0, 0, 0, ${0.3 * scrollProgress})`,
                  backgroundColor: "transparent",
                  overflow: "hidden",
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
                    />
                    <div className="absolute inset-0 bg-black/10 rounded-xl" />
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
                {/* Plain h2 (NOT motion) — this is the LCP element. framer-motion
                    re-registers the paint at hydration, inflating LCP render delay
                    on throttled mobile. The transform is scroll-driven inline style,
                    so no motion component is needed. */}
                <h2
                  className="text-6xl md:text-8xl lg:text-9xl font-bold text-primary transition-none"
                  style={{
                    transform: `translateX(-${textTranslateX}vw)`,
                  }}
                >
                  {firstWord}
                </h2>
                <h2
                  className="text-6xl md:text-8xl lg:text-9xl font-bold text-center text-white transition-none"
                  style={{
                    transform: `translateX(${textTranslateX}vw)`,
                  }}
                >
                  {restOfTitle}
                </h2>
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
