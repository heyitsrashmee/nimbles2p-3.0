"use client";

/**
 * Global form-funnel tracking via delegation, so any <form> added anywhere is
 * tracked automatically:
 *
 *   form_view              — form scrolls into view (IntersectionObserver)
 *   form_start             — first focus inside the form
 *   form_field_interaction — first blur of each field
 *   form_submit            — native submit event
 *   form_abandonment       — started but not submitted on route change / unload
 *
 * form_success / form_error are emitted by the component from its async result
 * (see useFormTracking / trackFormSuccess / trackFormError) because the DOM
 * can't observe a fetch outcome.
 *
 * Form name resolution: data-analytics-form › name › id › aria-label › nearest
 * heading › "form". Opt a form out with `data-no-track`.
 */
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  trackFormView,
  trackFormStart,
  trackFormFieldInteraction,
  trackFormSubmit,
  trackFormAbandon,
} from "@/lib/analytics";

function formName(form) {
  const explicit = form.getAttribute("data-analytics-form");
  if (explicit) return explicit;
  const attr = form.getAttribute("name") || form.id;
  if (attr) return attr;
  const aria = form.getAttribute("aria-label");
  if (aria) return aria.trim().slice(0, 80);
  const heading = form
    .closest("section, div, main, article, [role='dialog']")
    ?.querySelector("h1, h2, h3");
  if (heading) return (heading.textContent || "").replace(/\s+/g, " ").trim().slice(0, 80);
  return "form";
}

function formType(form) {
  return form.getAttribute("data-analytics-form-type") || undefined;
}

export function useGlobalFormTracking() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof document === "undefined") return;
    const started = new Set(); // forms focused but not yet submitted

    const isTracked = (form) => form && !form.closest("[data-no-track]");

    const onFocusIn = (e) => {
      const form = e.target?.closest?.("form");
      if (!isTracked(form) || started.has(form)) return;
      started.add(form);
      trackFormStart(formName(form), { form_type: formType(form) });
    };

    const onFocusOut = (e) => {
      const field = e.target;
      if (!field || !/^(INPUT|SELECT|TEXTAREA)$/.test(field.tagName)) return;
      const form = field.closest("form");
      if (!isTracked(form) || field.dataset.aFieldTracked) return;
      field.dataset.aFieldTracked = "1";
      const name = field.getAttribute("name") || field.id || field.type;
      trackFormFieldInteraction(formName(form), name);
    };

    const onSubmit = (e) => {
      const form = e.target;
      if (!isTracked(form) || form.tagName !== "FORM") return;
      started.delete(form);
      trackFormSubmit(formName(form), { form_type: formType(form) });
    };

    // form_view: observe every form once it enters the viewport.
    const seen = new WeakSet();
    const io =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            (entries) => {
              for (const entry of entries) {
                if (entry.isIntersecting && !seen.has(entry.target)) {
                  seen.add(entry.target);
                  if (isTracked(entry.target)) {
                    trackFormView(formName(entry.target), { formType: formType(entry.target) });
                  }
                  io.unobserve(entry.target);
                }
              }
            },
            { threshold: 0.3 }
          )
        : null;

    const scan = () => {
      if (!io) return;
      document.querySelectorAll("form").forEach((form) => {
        if (!seen.has(form)) io.observe(form);
      });
    };

    // Re-scan when forms are added/removed (modals, async content).
    const mo =
      typeof MutationObserver !== "undefined" ? new MutationObserver(scan) : null;

    scan();
    mo?.observe(document.body, { childList: true, subtree: true });
    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("focusout", onFocusOut);
    document.addEventListener("submit", onSubmit, true);

    const flushAbandon = () => {
      started.forEach((form) =>
        trackFormAbandon(formName(form), { form_type: formType(form) })
      );
      started.clear();
    };
    window.addEventListener("pagehide", flushAbandon);

    return () => {
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("focusout", onFocusOut);
      document.removeEventListener("submit", onSubmit, true);
      window.removeEventListener("pagehide", flushAbandon);
      mo?.disconnect();
      io?.disconnect();
      flushAbandon(); // route change = abandonment of any started form
    };
  }, [pathname]);
}
