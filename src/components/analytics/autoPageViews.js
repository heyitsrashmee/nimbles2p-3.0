"use client";

/**
 * Automatic page-view tracking for the App Router.
 *
 * Fires `page_view` on the initial load and on every client-side route change.
 * Keyed on usePathname() (NOT useSearchParams, which would opt the whole tree
 * into dynamic rendering); the live query string is read from window so UTM
 * params still ride along. document.title is read a tick late so the new
 * route's <title> has settled before we capture it.
 */
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackPageView } from "@/lib/analytics";

export function useAutoPageViews() {
  const pathname = usePathname();
  const last = useRef(null);

  useEffect(() => {
    if (pathname == null) return;
    const search = typeof window !== "undefined" ? window.location.search : "";
    const full = pathname + search;
    if (last.current === full) return;
    last.current = full;

    // Defer one frame so the route's metadata/title is applied first.
    const id = setTimeout(() => {
      trackPageView({
        path: full,
        title: typeof document !== "undefined" ? document.title : "",
      });
    }, 0);
    return () => clearTimeout(id);
  }, [pathname]);
}
