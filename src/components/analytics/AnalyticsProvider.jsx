"use client";

/**
 * Single mount point for the site-wide analytics layer. Drop <AnalyticsProvider/>
 * once in the root layout and EVERY page — current or future — automatically
 * gets: page views, CTA/link/download click tracking, the full form funnel,
 * scroll depth, time-on-page, and Core Web Vitals. No per-page code required.
 *
 * It renders nothing. All work happens in composed hooks, each isolated so a
 * failure in one tracker can't take down the others.
 */
import { useAutoPageViews } from "./autoPageViews";
import { useGlobalClickTracking } from "./globalClicks";
import { useGlobalFormTracking } from "./globalForms";
import { useScrollDepth } from "./scrollDepth";
import { useTimeOnPage } from "./timeEngagement";
import { useWebVitals } from "./webVitals";

export default function AnalyticsProvider() {
  useAutoPageViews();
  useGlobalClickTracking();
  useGlobalFormTracking();
  useScrollDepth();
  useTimeOnPage();
  useWebVitals();
  return null;
}
