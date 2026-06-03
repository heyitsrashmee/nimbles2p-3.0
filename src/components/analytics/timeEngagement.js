"use client";

/**
 * Time-on-page / engagement tracking. Accumulates only "engaged" time (tab
 * visible) and flushes `time_on_page` on route change and when the page is
 * hidden/unloaded, so background tabs don't inflate engagement.
 */
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackTimeOnPage } from "@/lib/analytics";

export function useTimeOnPage() {
  const pathname = usePathname();
  const start = useRef(0);
  const accrued = useRef(0);
  const path = useRef(pathname);

  useEffect(() => {
    const begin = () => {
      start.current = Date.now();
    };
    const pause = () => {
      if (start.current) {
        accrued.current += Date.now() - start.current;
        start.current = 0;
      }
    };
    const flush = () => {
      pause();
      if (accrued.current > 0) {
        trackTimeOnPage(accrued.current, { page_path: path.current });
        accrued.current = 0;
      }
    };
    const onVisibility = () => {
      if (document.visibilityState === "hidden") pause();
      else begin();
    };

    path.current = pathname;
    accrued.current = 0;
    begin();
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", flush);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", flush);
      flush(); // flush on route change (effect re-runs on pathname change)
    };
  }, [pathname]);
}
