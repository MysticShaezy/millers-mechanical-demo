"use client";

import type { ReactNode } from "react";
import { useReveal } from "./useReveal";

interface SlideUpProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
}

// Matches the previous framer-motion ease: [0.16, 1, 0.3, 1]
const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

/**
 * Slide-up + fade-in on scroll. CSS/IntersectionObserver implementation
 * (no framer-motion) — same props and visual behaviour as before.
 */
export default function SlideUp({
  children,
  className,
  delay = 0,
  duration = 0.7,
  distance = 60,
  once = true,
}: SlideUpProps) {
  const [ref, inView] = useReveal<HTMLDivElement>(once, "-80px");

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : `translateY(${distance}px)`,
        transition: `opacity ${duration}s ${EASE} ${delay}s, transform ${duration}s ${EASE} ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
