"use client";

/**
 * Core Web Vitals → GA4. Uses Next's built-in useReportWebVitals (no extra
 * dependency) which surfaces LCP, CLS, INP, FCP, TTFB (and FID on older
 * browsers). CLS is unitless so we keep more precision; everything else is
 * rounded to whole milliseconds.
 */
import { useReportWebVitals } from "next/web-vitals";
import { trackWebVitals } from "@/lib/analytics";

const CORE = new Set(["LCP", "CLS", "INP", "FCP", "TTFB", "FID"]);

export function useWebVitals() {
  useReportWebVitals((metric) => {
    if (!metric || !CORE.has(metric.name)) return;
    const value =
      metric.name === "CLS"
        ? Math.round(metric.value * 1000) / 1000
        : Math.round(metric.value);
    trackWebVitals({ name: metric.name, value, rating: metric.rating });
  });
}
