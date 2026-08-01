"use client";

import type { ReactNode } from "react";
import { useReveal } from "./useReveal";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  once?: boolean;
}

// Matches the previous framer-motion ease: [0.16, 1, 0.3, 1]
const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

/**
 * Fade + directional slide-in on scroll. CSS/IntersectionObserver implementation
 * (no framer-motion) — same props and visual behaviour as before.
 */
export default function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.6,
  direction = "up",
  distance = 30,
  once = true,
}: FadeInProps) {
  const [ref, inView] = useReveal<HTMLDivElement>(once, "-50px");

  // Hidden-state offset — element animates FROM here TO its resting position.
  const hiddenTransform = {
    up: `translateY(${distance}px)`,
    down: `translateY(-${distance}px)`,
    left: `translateX(${distance}px)`,
    right: `translateX(-${distance}px)`,
    none: "none",
  }[direction];

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : hiddenTransform,
        transition: `opacity ${duration}s ${EASE} ${delay}s, transform ${duration}s ${EASE} ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
