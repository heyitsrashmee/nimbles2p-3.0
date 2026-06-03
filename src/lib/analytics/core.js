/**
 * Analytics transport + diagnostics core.
 *
 * `emit()` is the single chokepoint every tracker funnels through. It attaches
 * page context, drops empty params, pushes the event onto the GTM dataLayer,
 * and records it in an in-memory ring buffer that the /analytics-audit page and
 * `analytics_debug` mode read from. Analytics must NEVER throw into UI code, so
 * every path here is wrapped defensively.
 */
import { sendGTMEvent } from "@next/third-parties/google";

const MAX_BUFFER = 250;
/** Identical events (same name + params) within this window are de-duplicated,
 *  so an element with both explicit and auto (delegated) tracking fires once. */
const DEDUP_WINDOW_MS = 600;
/** @type {Map<string, number>} */
const lastSeen = new Map();
/** @type {Array<{event:string,params:Record<string,unknown>,ts:number}>} */
const buffer = [];
/** @type {Set<(entry:{event:string,params:Record<string,unknown>,ts:number})=>void>} */
const listeners = new Set();
/** Per-event-name counters, for the audit dashboard. */
const counts = Object.create(null);

/** Debug mode: `?analytics_debug=1` or localStorage `analytics_debug=1`. */
export function isDebug() {
  if (typeof window === "undefined") return false;
  try {
    if (window.location.search.includes("analytics_debug=1")) return true;
    return window.localStorage.getItem("analytics_debug") === "1";
  } catch {
    return false;
  }
}

/** Path + title + full location, attached to every event for GA4 breakdowns. */
export function pageContext() {
  if (typeof window === "undefined") return {};
  return {
    page_path: window.location.pathname + window.location.search,
    page_location: window.location.href,
    page_title: typeof document !== "undefined" ? document.title : "",
  };
}

function record(entry) {
  buffer.push(entry);
  if (buffer.length > MAX_BUFFER) buffer.shift();
  counts[entry.event] = (counts[entry.event] || 0) + 1;
  listeners.forEach((fn) => {
    try {
      fn(entry);
    } catch {
      /* a bad listener must not break tracking */
    }
  });
}

/**
 * Push a named event onto the dataLayer (→ GTM → GA4).
 * @param {string} event canonical event name from EVENTS
 * @param {Record<string, unknown>} [params]
 */
export function emit(event, params = {}) {
  if (typeof window === "undefined" || !event) return;
  let clean = {};
  try {
    const ctx = pageContext();
    const merged = { ...ctx, ...params };
    clean = Object.fromEntries(
      Object.entries(merged).filter(
        ([, v]) => v !== undefined && v !== null && v !== ""
      )
    );

    // De-dupe identical events fired in quick succession (e.g. an element with
    // both an explicit tracker and the global delegated tracker).
    const now = Date.now();
    const key = event + "|" + JSON.stringify(clean);
    const prev = lastSeen.get(key);
    if (prev && now - prev < DEDUP_WINDOW_MS) return;
    lastSeen.set(key, now);
    if (lastSeen.size > 100) {
      for (const [k, t] of lastSeen) if (now - t > DEDUP_WINDOW_MS) lastSeen.delete(k);
    }

    clean.event_timestamp = new Date(now).toISOString();
    sendGTMEvent({ event, ...clean });
  } catch {
    /* swallow transport errors — never surface tracking failures to users */
  }
  try {
    record({ event, params: clean, ts: Date.now() });
    if (isDebug()) {
      // eslint-disable-next-line no-console
      console.debug(`%c[analytics] ${event}`, "color:#6320E0;font-weight:600", clean);
    }
  } catch {
    /* diagnostics are best-effort */
  }
}

/** Snapshot of recently-emitted events (newest last). */
export function getEventLog() {
  return buffer.slice();
}

/** Map of event name → count emitted this session. */
export function getEventCounts() {
  return { ...counts };
}

/** Subscribe to live events; returns an unsubscribe fn. */
export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/** Whether the GTM dataLayer + container are present on the page. */
export function isGtmLoaded() {
  if (typeof window === "undefined") return false;
  try {
    return (
      Array.isArray(window.dataLayer) &&
      (typeof window.google_tag_manager === "object" ||
        window.dataLayer.some((d) => d && d["gtm.start"]))
    );
  } catch {
    return false;
  }
}
