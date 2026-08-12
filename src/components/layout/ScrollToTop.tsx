"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Forces every route navigation to start at the top of the page.
 *
 * Next.js already resets scroll on navigation, but the global
 * `html { scroll-behavior: smooth }` turns that reset into an animation
 * that the incoming (often tall) page interrupts — leaving the visitor
 * part-way down. Here we jump to the top explicitly with `behavior:
 * "instant"`, which bypasses the smooth CSS for this one call only, so
 * in-page anchor smoothness is preserved.
 *
 * Keyed on `pathname` (not hash), so `#section` anchor links still work.
 * Runs on mobile, tablet and desktop identically.
 */
export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    const toTop = () => {
      // Guard for the rare browser without ScrollToOptions support.
      try {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      } catch {
        window.scrollTo(0, 0);
      }
    };
    toTop();
    // Re-assert after the incoming page has painted, in case async content
    // (images, fonts, reveal wrappers) nudged the scroll position.
    const raf = requestAnimationFrame(toTop);
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  return null;
}
