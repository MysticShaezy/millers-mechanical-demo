"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Reveal-on-scroll hook — a dependency-free replacement for framer-motion's
 * `useInView`, built on IntersectionObserver. Returns a ref to attach and a
 * boolean for whether the element has entered the viewport.
 *
 * @param once       Reveal only the first time (mirrors framer's `once`).
 * @param rootMargin Shrinks/grows the trigger area (mirrors framer's `margin`;
 *                   negative values trigger further inside the viewport).
 *
 * Dropping framer-motion in favour of this removes the motion-dom + framer-motion
 * chunks from the client bundle and lets these wrappers hydrate as plain divs.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  once = true,
  rootMargin = "-50px"
) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Very old browsers without IntersectionObserver: show content immediately.
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once, rootMargin]);

  return [ref, inView] as const;
}
