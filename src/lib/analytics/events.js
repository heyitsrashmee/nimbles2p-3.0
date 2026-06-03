/**
 * DATA GOVERNANCE — single source of truth for GA4 event + parameter names.
 *
 * Every analytics call in the app references these constants instead of raw
 * strings, so naming stays consistent across pages and a rename happens in one
 * place. New event types should be added here first.
 *
 * Transport: events are pushed onto the GTM dataLayer (container GTM-T8WFVVR6)
 * via @next/third-parties. GA4 (G-1Y9ZVS01GG) receives them through GTM. See
 * docs/ANALYTICS.md for the one-time "catch-all GA4 event tag" that forwards
 * ANY event name below to GA4 with no further console work.
 */

/** Canonical GA4 event names. */
export const EVENTS = Object.freeze({
  // Navigation
  PAGE_VIEW: "page_view",

  // Calls to action / links
  CTA_CLICK: "cta_click",
  FILE_DOWNLOAD: "file_download",

  // Forms (full funnel)
  FORM_VIEW: "form_view",
  FORM_START: "form_start",
  FORM_FIELD: "form_field_interaction",
  FORM_SUBMIT: "form_submit",
  FORM_SUCCESS: "form_success",
  FORM_ERROR: "form_error",
  FORM_ABANDON: "form_abandonment",

  // Engagement
  SCROLL_DEPTH: "scroll_depth",
  TIME_ON_PAGE: "time_on_page",
  SECTION_VIEW: "section_view",
  VIDEO_PLAY: "video_play",
  VIDEO_COMPLETE: "video_complete",
  CALCULATOR_USE: "calculator_use",
  TAB_INTERACTION: "tab_interaction",
  ACCORDION_OPEN: "accordion_open",
  SEARCH: "search_performed",
  CHAT_INTERACTION: "chat_interaction",
  MODAL_OPEN: "modal_open",

  // Performance
  WEB_VITALS: "web_vitals",

  // Conversion / legacy (pre-existing GTM tags depend on these names — keep)
  WEBSITE_LEAD: "website_lead",
  RESOURCE_DOWNLOAD_CLICK: "resource_download_click",
  WEBINAR_REGISTER_CLICK: "webinar_register_click",
});

/**
 * Canonical parameter keys. Use these everywhere so GA4 custom dimensions map
 * cleanly. snake_case to match GA4 conventions.
 */
export const PARAMS = Object.freeze({
  // Page context (auto-attached to every event by core.emit)
  PAGE_PATH: "page_path",
  PAGE_LOCATION: "page_location",
  PAGE_TITLE: "page_title",
  EVENT_TIMESTAMP: "event_timestamp",

  // CTA / link
  CTA_TEXT: "cta_text",
  CTA_LOCATION: "cta_location",
  CTA_DESTINATION: "cta_destination",
  LINK_URL: "link_url",
  LINK_DOMAIN: "link_domain",
  LINK_TYPE: "link_type", // internal | external | email | phone | whatsapp | download

  // File / resource
  FILE_NAME: "file_name",
  FILE_EXTENSION: "file_extension",
  FILE_URL: "file_url",
  RESOURCE_SLUG: "resource_slug",

  // Forms
  FORM_NAME: "form_name",
  FORM_TYPE: "form_type", // lead | demo | gated_download | newsletter | contact | search
  FORM_STATUS: "form_status", // success | error
  FIELD_NAME: "field_name",
  ERROR_MESSAGE: "error_message",

  // Engagement
  PERCENT_SCROLLED: "percent_scrolled",
  ENGAGEMENT_TIME_MSEC: "engagement_time_msec",
  SECTION_NAME: "section_name",
  VIDEO_TITLE: "video_title",
  VIDEO_PERCENT: "video_percent",
  CALCULATOR_NAME: "calculator_name",
  CALCULATOR_ACTION: "calculator_action",
  TAB_NAME: "tab_name",
  ACCORDION_LABEL: "accordion_label",
  MODAL_NAME: "modal_name",
  SEARCH_TERM: "search_term",
  SEARCH_RESULTS: "search_results",
  CHAT_ACTION: "chat_action",

  // Performance / web vitals
  METRIC_NAME: "metric_name",
  METRIC_VALUE: "metric_value",
  METRIC_RATING: "metric_rating",
});

/** Link-type discriminants used by global click tracking. */
export const LINK_TYPES = Object.freeze({
  INTERNAL: "internal",
  EXTERNAL: "external",
  EMAIL: "email",
  PHONE: "phone",
  WHATSAPP: "whatsapp",
  DOWNLOAD: "download",
});

/** File extensions treated as downloads when found in a link href. */
export const DOWNLOAD_EXTENSIONS = Object.freeze([
  "pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx",
  "csv", "zip", "rar", "7z", "gz", "tar",
  "mp3", "mp4", "mov", "avi", "wav",
  "png", "jpg", "jpeg", "svg", "webp", "gif",
  "txt", "rtf", "json", "xml", "dmg", "exe", "pkg",
]);
