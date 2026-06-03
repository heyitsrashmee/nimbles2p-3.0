"use client";

/**
 * Global CTA / link / download click tracking via a single delegated listener
 * on <body>. This is what makes "any new button is tracked automatically" true
 * — no per-element wiring. Every <a>, <button>, [role=button] and
 * [data-analytics] click is classified and emitted:
 *
 *   • mailto:  → cta_click  (link_type=email)
 *   • tel:     → cta_click  (link_type=phone)
 *   • wa.me / whatsapp → cta_click (link_type=whatsapp)
 *   • file ext / [download] → file_download
 *   • cross-origin → cta_click (link_type=external)
 *   • same-origin / button → cta_click (link_type=internal)
 *
 * Opt out any subtree with `data-no-track`. Override the derived label/location
 * with `data-analytics-id` / `data-analytics-location`. core.emit() de-dupes,
 * so elements that ALSO call an explicit tracker are still counted once.
 */
import { useEffect } from "react";
import {
  trackCtaClick,
  trackFileDownload,
  DOWNLOAD_EXTENSIONS,
  LINK_TYPES,
} from "@/lib/analytics";

const ACTIONABLE = 'a[href], button, [role="button"], [data-analytics], input[type="submit"], input[type="button"]';
const LANDMARKS =
  '[data-analytics-location], [data-analytics-section], section, header, footer, nav, [role="dialog"], main, article';

function ctaText(el) {
  const explicit = el.getAttribute("data-analytics-id");
  if (explicit) return explicit.slice(0, 120);
  const aria = el.getAttribute("aria-label");
  if (aria) return aria.trim().slice(0, 120);
  const text = (el.textContent || "").replace(/\s+/g, " ").trim();
  if (text) return text.slice(0, 120);
  const img = el.querySelector("img[alt]");
  if (img) return img.getAttribute("alt").slice(0, 120);
  return el.getAttribute("title") || el.getAttribute("value") || "(unlabeled)";
}

function ctaLocation(el) {
  const explicit = el.closest("[data-analytics-location]");
  if (explicit) return explicit.getAttribute("data-analytics-location");
  const landmark = el.closest(LANDMARKS);
  if (!landmark) return "body";
  return (
    landmark.getAttribute("data-analytics-section") ||
    landmark.getAttribute("aria-label") ||
    landmark.id ||
    landmark.getAttribute("role") ||
    landmark.tagName.toLowerCase()
  );
}

function fileExtension(url) {
  try {
    const path = new URL(url, window.location.origin).pathname;
    const ext = path.split(".").pop()?.toLowerCase();
    return ext && DOWNLOAD_EXTENSIONS.includes(ext) ? ext : null;
  } catch {
    return null;
  }
}

function classify(el) {
  // Anchors carry an href we can classify; everything else is a button.
  const href = el.tagName === "A" ? el.getAttribute("href") : null;
  if (!href) {
    return { type: LINK_TYPES.INTERNAL, destination: el.getAttribute("data-analytics-destination") || undefined };
  }
  const lower = href.toLowerCase();
  if (lower.startsWith("mailto:")) return { type: LINK_TYPES.EMAIL, destination: href };
  if (lower.startsWith("tel:")) return { type: LINK_TYPES.PHONE, destination: href };
  if (lower.includes("wa.me") || lower.includes("whatsapp.com") || lower.startsWith("whatsapp:"))
    return { type: LINK_TYPES.WHATSAPP, destination: href };

  const hasDownloadAttr = el.hasAttribute("download");
  const ext = fileExtension(href);
  if (hasDownloadAttr || ext) return { type: LINK_TYPES.DOWNLOAD, destination: href, ext };

  try {
    const url = new URL(href, window.location.href);
    const external = url.origin !== window.location.origin && /^https?:/.test(url.protocol);
    return {
      type: external ? LINK_TYPES.EXTERNAL : LINK_TYPES.INTERNAL,
      destination: url.href,
      domain: url.hostname,
    };
  } catch {
    return { type: LINK_TYPES.INTERNAL, destination: href };
  }
}

export function useGlobalClickTracking() {
  useEffect(() => {
    const onClick = (e) => {
      const target = e.target;
      if (!target || typeof target.closest !== "function") return;
      const el = target.closest(ACTIONABLE);
      if (!el || el.closest("[data-no-track]")) return;

      try {
        const text = ctaText(el);
        const location = ctaLocation(el);
        const info = classify(el);

        if (info.type === LINK_TYPES.DOWNLOAD) {
          const url = info.destination;
          const fileName = url ? url.split("/").pop().split("?")[0] : text;
          trackFileDownload({
            fileName,
            fileExtension: info.ext || fileExtension(url) || undefined,
            fileUrl: url,
            ctaLocation: location,
          });
          return;
        }

        trackCtaClick({
          buttonText: text,
          ctaLocation: location,
          destination: info.destination,
          linkType: info.type,
          linkUrl: info.destination,
          linkDomain: info.domain,
        });
      } catch {
        /* never let click tracking interfere with the click itself */
      }
    };

    // Bubble phase: fires after the element's own handlers, and core.emit()
    // de-dupes against any explicit tracker that already ran.
    document.body.addEventListener("click", onClick);
    return () => document.body.removeEventListener("click", onClick);
  }, []);
}
