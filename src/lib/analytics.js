import { sendGTMEvent } from "@next/third-parties/google";

/**
 * Push a lead-conversion event to the GTM dataLayer on a successful form submit.
 *
 * The GA4 property already has a `website_lead` conversion (key event) configured,
 * but nothing on the site fired it. This pushes the event so it can be picked up.
 *
 * REQUIRED GTM STEP (one-time, in container GTM-T8WFVVR6): add a Custom Event
 * trigger matching event name `website_lead` and fire a GA4 event tag
 * (event name `website_lead`) to measurement ID G-1Y9ZVS01GG. Until that trigger
 * exists, this push is harmless but won't reach GA4.
 *
 * @param {string} formName  e.g. "book_demo" | "get_started" | "gated_download"
 * @param {Record<string, unknown>} [extra]
 */
export function trackLead(formName, extra = {}) {
  try {
    sendGTMEvent({ event: "website_lead", form_name: formName, ...extra });
  } catch {
    /* analytics must never break a form submission */
  }
}
