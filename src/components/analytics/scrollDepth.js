"use client";

/**
 * Automatic scroll-depth tracking. Fires `scroll_depth` once per threshold
 * (25/50/75/90/100) per page. Thresholds reset on route change so each page
 * gets its own funnel. Uses a passive scroll listener throttled with rAF.
 */
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackScrollDepth } from "@/lib/analytics";

const THRESHOLDS = [25, 50, 75, 90, 100];

export function useScrollDepth() {
  const pathname = usePathname();
  const fired = useRef(new Set());

  useEffect(() => {
    fired.current = new Set();
    let ticking = false;

    const measure = () => {
      ticking = false;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      const percent =
        scrollable <= 0 ? 100 : Math.round((window.scrollY / scrollable) * 100);
      for (const t of THRESHOLDS) {
        if (percent >= t && !fired.current.has(t)) {
          fired.current.add(t);
          trackScrollDepth(t);
        }
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(measure);
    };

    // Short pages may already satisfy low thresholds at load.
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);
}
