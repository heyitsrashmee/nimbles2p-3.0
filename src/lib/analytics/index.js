/**
 * Public analytics API for NimbleS2P.
 *
 * Import named trackers from "@/lib/analytics". Most tracking happens
 * automatically via <AnalyticsProvider/> (page views, CTA clicks, link/file
 * downloads, form funnel, scroll depth, web vitals) — these explicit helpers
 * are for events that code knows about but the DOM can't infer (form success/
 * error, calculator/video/search usage, etc.).
 *
 * See docs/ANALYTICS.md for the architecture diagram, event catalogue and GA4
 * DebugView verification steps.
 */
import { EVENTS, PARAMS, LINK_TYPES } from "./events";
import { emit } from "./core";

export { EVENTS, PARAMS, LINK_TYPES, DOWNLOAD_EXTENSIONS } from "./events";
export {
  emit,
  getEventLog,
  getEventCounts,
  subscribe,
  isGtmLoaded,
  isDebug,
  pageContext,
} from "./core";

/* ───────────────────────── Page views ───────────────────────── */

/** Track a page view (initial load or SPA route change). */
export function trackPageView({ path, title } = {}) {
  emit(EVENTS.PAGE_VIEW, {
    [PARAMS.PAGE_PATH]: path,
    [PARAMS.PAGE_TITLE]: title,
  });
}

/* ───────────────────────── CTA / links ───────────────────────── */

/**
 * Generic CTA click. Backward-compatible signature (buttonText/ctaLocation/
 * destination/resourceSlug) plus optional linkType/linkUrl for auto-tracking.
 */
export function trackCtaClick({
  buttonText,
  ctaLocation,
  destination,
  resourceSlug,
  linkType,
  linkUrl,
  linkDomain,
} = {}) {
  // Self-defending fallbacks: a cta_click must NEVER reach GA4 without a
  // location and label, or it surfaces as "(not set)" / "Direct / unknown" in
  // the dashboard's CTA Intelligence. This guarantees every call site — present
  // or future, however sparse its args — produces an attributable event.
  emit(EVENTS.CTA_CLICK, {
    [PARAMS.CTA_TEXT]: buttonText || "(unlabeled)",
    [PARAMS.CTA_LOCATION]: ctaLocation || "unknown",
    [PARAMS.CTA_DESTINATION]: destination,
    [PARAMS.RESOURCE_SLUG]: resourceSlug,
    [PARAMS.LINK_TYPE]: linkType,
    [PARAMS.LINK_URL]: linkUrl,
    [PARAMS.LINK_DOMAIN]: linkDomain,
  });
}

/** A downloadable file link was activated. */
export function trackFileDownload({ fileName, fileExtension, fileUrl, ctaLocation } = {}) {
  emit(EVENTS.FILE_DOWNLOAD, {
    [PARAMS.FILE_NAME]: fileName,
    [PARAMS.FILE_EXTENSION]: fileExtension,
    [PARAMS.FILE_URL]: fileUrl,
    [PARAMS.CTA_LOCATION]: ctaLocation,
  });
}

/** A gated/resource asset download CTA was clicked (legacy event name kept). */
export function trackResourceDownloadClick({ resourceSlug, buttonText, ctaLocation } = {}) {
  emit(EVENTS.RESOURCE_DOWNLOAD_CLICK, {
    [PARAMS.RESOURCE_SLUG]: resourceSlug,
    [PARAMS.CTA_TEXT]: buttonText,
    [PARAMS.CTA_LOCATION]: ctaLocation,
  });
}

/** A webinar registration CTA was clicked (legacy event name kept). */
export function trackWebinarRegisterClick({ webinarSlug, buttonText, ctaLocation } = {}) {
  emit(EVENTS.WEBINAR_REGISTER_CLICK, {
    webinar_slug: webinarSlug,
    [PARAMS.CTA_TEXT]: buttonText,
    [PARAMS.CTA_LOCATION]: ctaLocation,
  });
}

/* ───────────────────────── Forms (funnel) ───────────────────────── */

/** Form scrolled into view (top of funnel). */
export function trackFormView(formName, { formType } = {}) {
  emit(EVENTS.FORM_VIEW, { [PARAMS.FORM_NAME]: formName, [PARAMS.FORM_TYPE]: formType });
}

/** First interaction with a form. */
export function trackFormStart(formName, extra = {}) {
  emit(EVENTS.FORM_START, { [PARAMS.FORM_NAME]: formName, ...extra });
}

/** A single field was touched. */
export function trackFormFieldInteraction(formName, fieldName) {
  emit(EVENTS.FORM_FIELD, { [PARAMS.FORM_NAME]: formName, [PARAMS.FIELD_NAME]: fieldName });
}

/** Form submit attempt. */
export function trackFormSubmit(formName, extra = {}) {
  emit(EVENTS.FORM_SUBMIT, { [PARAMS.FORM_NAME]: formName, ...extra });
}

/** Form submitted successfully. */
export function trackFormSuccess(formName, extra = {}) {
  emit(EVENTS.FORM_SUCCESS, {
    [PARAMS.FORM_NAME]: formName,
    [PARAMS.FORM_STATUS]: "success",
    ...extra,
  });
}

/** Form submission failed. */
export function trackFormError(formName, { message, ...extra } = {}) {
  emit(EVENTS.FORM_ERROR, {
    [PARAMS.FORM_NAME]: formName,
    [PARAMS.FORM_STATUS]: "error",
    [PARAMS.ERROR_MESSAGE]: message,
    ...extra,
  });
}

/** User left a started-but-unsubmitted form. */
export function trackFormAbandon(formName, extra = {}) {
  emit(EVENTS.FORM_ABANDON, { [PARAMS.FORM_NAME]: formName, ...extra });
}

/**
 * Conversion key-event on successful lead submit. Keeps the legacy
 * `website_lead` event (existing GTM key-event tag) AND emits the standardized
 * `form_success`, so every existing call site gets both with no extra wiring.
 */
export function trackLead(formName, extra = {}) {
  emit(EVENTS.WEBSITE_LEAD, { [PARAMS.FORM_NAME]: formName, ...extra });
  trackFormSuccess(formName, extra);
}

/* ───────────────────────── Engagement ───────────────────────── */

export function trackScrollDepth(percent, extra = {}) {
  emit(EVENTS.SCROLL_DEPTH, { [PARAMS.PERCENT_SCROLLED]: percent, ...extra });
}

export function trackTimeOnPage(msec, extra = {}) {
  emit(EVENTS.TIME_ON_PAGE, { [PARAMS.ENGAGEMENT_TIME_MSEC]: msec, ...extra });
}

export function trackSectionView(sectionName, extra = {}) {
  emit(EVENTS.SECTION_VIEW, { [PARAMS.SECTION_NAME]: sectionName, ...extra });
}

export function trackVideoPlay(videoTitle, extra = {}) {
  emit(EVENTS.VIDEO_PLAY, { [PARAMS.VIDEO_TITLE]: videoTitle, ...extra });
}

export function trackVideoComplete(videoTitle, extra = {}) {
  emit(EVENTS.VIDEO_COMPLETE, { [PARAMS.VIDEO_TITLE]: videoTitle, ...extra });
}

export function trackCalculatorUse(calculatorName, { action, ...extra } = {}) {
  emit(EVENTS.CALCULATOR_USE, {
    [PARAMS.CALCULATOR_NAME]: calculatorName,
    [PARAMS.CALCULATOR_ACTION]: action,
    ...extra,
  });
}

export function trackTabInteraction(tabName, extra = {}) {
  emit(EVENTS.TAB_INTERACTION, { [PARAMS.TAB_NAME]: tabName, ...extra });
}

export function trackAccordionOpen(label, extra = {}) {
  emit(EVENTS.ACCORDION_OPEN, { [PARAMS.ACCORDION_LABEL]: label, ...extra });
}

export function trackModalOpen(modalName, extra = {}) {
  emit(EVENTS.MODAL_OPEN, { [PARAMS.MODAL_NAME]: modalName, ...extra });
}

export function trackSearch(term, { results, ...extra } = {}) {
  emit(EVENTS.SEARCH, {
    [PARAMS.SEARCH_TERM]: term,
    [PARAMS.SEARCH_RESULTS]: results,
    ...extra,
  });
}

export function trackChatInteraction(action, extra = {}) {
  emit(EVENTS.CHAT_INTERACTION, { [PARAMS.CHAT_ACTION]: action, ...extra });
}

/* ───────────────────────── Performance ───────────────────────── */

export function trackWebVitals({ name, value, rating } = {}) {
  emit(EVENTS.WEB_VITALS, {
    [PARAMS.METRIC_NAME]: name,
    [PARAMS.METRIC_VALUE]: value,
    [PARAMS.METRIC_RATING]: rating,
  });
}
