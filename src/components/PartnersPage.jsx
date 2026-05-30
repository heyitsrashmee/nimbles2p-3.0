"use client";

import { useEffect, useRef } from "react";
import { Nav } from "@/components/layout/SiteNav";
import { VDDFooter } from "@/components/layout/VDDFooter";
import { PARTNERS_CSS, PARTNERS_HTML } from "@/components/partnersContent";

/* ═══════════════════════════════════════════════════════════
   Partner Program page — converted from the standalone HTML.
   The shared homepage Nav + Footer wrap the page; the unique body
   (hero, opportunity charts, partner tracks, CFO math, tiers,
   enablement, earnings, trust, CTA) is injected verbatim so the
   inline SVG charts survive untouched. Every selector is scoped
   under .partners-page so styles can't leak to other routes.
   Behaviour (scroll-reveal, in-page anchor scrolling, the "Apply"
   CTA) is re-wired here in React via event delegation.
═══════════════════════════════════════════════════════════ */

export default function PartnersPage({ onBack, onNavigate }) {
  const rootRef = useRef(null);

  /* Scroll-reveal: add .visible to .sr elements as they enter the viewport. */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    root.querySelectorAll(".sr").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  /* Click delegation for the injected markup:
     - .btn-cta-primary ("Apply to Partner") → Book a Demo page
     - in-page #anchors → smooth scroll within the page             */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const onClick = (e) => {
      const link = e.target.closest("a");
      if (!link || !root.contains(link)) return;

      if (link.classList.contains("btn-cta-primary")) {
        e.preventDefault();
        if (typeof onNavigate === "function") onNavigate("demo");
        return;
      }

      const href = link.getAttribute("href") || "";
      if (href.startsWith("#") && href.length > 1) {
        const target = root.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };
    root.addEventListener("click", onClick);
    return () => root.removeEventListener("click", onClick);
  }, [onNavigate]);

  return (
    <div className="partners-page" ref={rootRef}>
      <style dangerouslySetInnerHTML={{ __html: PARTNERS_CSS }} />

      <Nav onNavigate={onNavigate} onBack={onBack} pageName="partners" />

      <div dangerouslySetInnerHTML={{ __html: PARTNERS_HTML }} />

      <VDDFooter onNavigate={onNavigate} />
    </div>
  );
}
