import { sendGTMEvent } from "@next/third-parties/google";

/**
 * Client-side analytics layer for NimbleS2P.
 *
 * Every helper pushes a named event onto the GTM dataLayer (container
 * GTM-T8WFVVR6). GA4 (G-1Y9ZVS01GG) tags + triggers live inside the GTM
 * console, not here. Page context (path + title) is attached to every event so
 * GA4 reports can break events down by page without extra config.
 *
 * GTM SETUP REQUIRED for the params below to reach GA4 (one-time, console):
 *   1. Data Layer Variables: `form_name`, `resource_slug`, `button_text`,
 *      `cta_location`, `page_path`, `page_title` (DLV, version 2).
 *   2. GA4 event tags per event name (website_lead, form_start, cta_click,
 *      resource_download_click, webinar_register_click) firing on a matching
 *      Custom Event trigger, each forwarding the DLVs as Event Parameters.
 *   3. GA4 Admin → Custom definitions: register form_name, resource_slug,
 *      button_text, cta_location as event-scoped custom dimensions.
 */

/** Current page path (incl. query) + document title, for event breakdowns. */
function pageContext() {
  if (typeof window === "undefined") return {};
  return {
    page_path: window.location.pathname + window.location.search,
    page_title: typeof document !== "undefined" ? document.title : "",
  };
}

/** Push an event; analytics must never break the surrounding UI. */
function push(event, params = {}) {
  try {
    // Drop undefined values so GA4 doesn't record empty params.
    const clean = Object.fromEntries(
      Object.entries({ ...pageContext(), ...params }).filter(
        ([, v]) => v !== undefined && v !== null && v !== ""
      )
    );
    sendGTMEvent({ event, ...clean });
  } catch {
    /* swallow — never let tracking throw into UI code */
  }
}

/**
 * Lead-conversion event on a successful form submit (GA4 key event).
 * @param {string} formName  "book_demo" | "get_started" | "gated_download"
 * @param {Record<string, unknown>} [extra]  e.g. { resource_slug }
 */
export function trackLead(formName, extra = {}) {
  push("website_lead", { form_name: formName, ...extra });
}

/**
 * Fired once when a user first interacts with a lead form (top of funnel).
 * @param {string} formName
 * @param {Record<string, unknown>} [extra]
 */
export function trackFormStart(formName, extra = {}) {
  push("form_start", { form_name: formName, ...extra });
}

/**
 * Generic CTA click (hero / nav / footer / final / pricing buttons).
 * @param {{ buttonText?: string; ctaLocation?: string; destination?: string;
 *          resourceSlug?: string }} [opts]
 */
export function trackCtaClick({ buttonText, ctaLocation, destination, resourceSlug } = {}) {
  push("cta_click", {
    button_text: buttonText,
    cta_location: ctaLocation,
    cta_destination: destination,
    resource_slug: resourceSlug,
  });
}

/**
 * A gated/resource asset download was triggered.
 * @param {{ resourceSlug?: string; buttonText?: string; ctaLocation?: string }} [opts]
 */
export function trackResourceDownloadClick({ resourceSlug, buttonText, ctaLocation } = {}) {
  push("resource_download_click", {
    resource_slug: resourceSlug,
    button_text: buttonText,
    cta_location: ctaLocation,
  });
}

/**
 * A webinar registration CTA was clicked.
 * @param {{ webinarSlug?: string; buttonText?: string; ctaLocation?: string }} [opts]
 */
export function trackWebinarRegisterClick({ webinarSlug, buttonText, ctaLocation } = {}) {
  push("webinar_register_click", {
    webinar_slug: webinarSlug,
    button_text: buttonText,
    cta_location: ctaLocation,
  });
}
