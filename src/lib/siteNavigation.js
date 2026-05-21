"use client";

import { useState, useEffect, useCallback } from "react";
import { pageToPath, pathToPage } from "@/lib/routes";

/** Shared router navigation — footer resource links work from every page. */
export function useSiteNavigation(pathname, router) {
  const page = pathToPage(pathname);
  const [resourceSection, setResourceSection] = useState("");

  useEffect(() => {
    if (page !== "resources") {
      setResourceSection("");
      return;
    }
    const sync = () => setResourceSection(window.location.hash.replace(/^#/, ""));
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [page, pathname]);

  const navigate = useCallback(
    (p, options = {}) => {
      const target = pageToPath(p);
      const hash = options.hash ?? "";
      const url = hash ? `${target}#${hash}` : target;

      if (p === "resources") setResourceSection(hash);
      else setResourceSection("");

      if (pathname !== target) {
        try {
          router.prefetch(target);
        } catch {
          /* prefetch is best-effort */
        }
        router.push(url);
      } else if (hash) {
        window.history.replaceState(null, "", url);
        window.dispatchEvent(new HashChangeEvent("hashchange"));
      } else if (pathname === target) {
        router.push(target);
      }

      if (!hash) window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [pathname, router]
  );

  return { navigate, resourceSection, page };
}
