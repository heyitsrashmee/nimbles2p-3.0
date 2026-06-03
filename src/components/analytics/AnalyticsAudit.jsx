"use client";

/**
 * Analytics QA dashboard (rendered at /analytics-audit, noindex).
 *
 * Verifies the tracking layer is alive end-to-end: GTM/dataLayer loaded, the
 * key event categories have fired this session, and a live event feed + inline
 * sandbox so a developer can click/submit and watch events appear in real time.
 * Reads from the in-memory ring buffer in lib/analytics/core.
 */
import { useEffect, useState, useCallback } from "react";
import {
  EVENTS,
  getEventLog,
  getEventCounts,
  subscribe,
  isGtmLoaded,
  isDebug,
  trackCtaClick,
} from "@/lib/analytics";

const COLORS = {
  pass: "#059669",
  fail: "#DC2626",
  warn: "#D97706",
  ink: "#0F172A",
  sub: "#64748B",
  line: "#E2E8F0",
  brand: "#6320E0",
  bg: "#F8FAFC",
};

function Badge({ ok, warn, children }) {
  const c = ok ? COLORS.pass : warn ? COLORS.warn : COLORS.fail;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontWeight: 700, color: c, fontSize: 13 }}>
      <span style={{ width: 9, height: 9, borderRadius: 9, background: c, display: "inline-block" }} />
      {children}
    </span>
  );
}

export default function AnalyticsAudit() {
  const [log, setLog] = useState([]);
  const [counts, setCounts] = useState({});
  const [gtm, setGtm] = useState(false);
  const [debug, setDebug] = useState(false);

  const refresh = useCallback(() => {
    setLog(getEventLog().slice().reverse());
    setCounts(getEventCounts());
    setGtm(isGtmLoaded());
    setDebug(isDebug());
  }, []);

  useEffect(() => {
    refresh();
    const unsub = subscribe(() => refresh());
    const id = setInterval(refresh, 1500);
    return () => {
      unsub();
      clearInterval(id);
    };
  }, [refresh]);

  const has = (name) => (counts[name] || 0) > 0;
  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  const checks = [
    { label: "GTM container + dataLayer loaded", ok: gtm },
    { label: "page_view firing (initial + route changes)", ok: has(EVENTS.PAGE_VIEW), warnIf: counts[EVENTS.PAGE_VIEW] === 1, warnText: "only initial — navigate to confirm route changes" },
    { label: "cta_click firing", ok: has(EVENTS.CTA_CLICK) },
    { label: "file_download firing", ok: has(EVENTS.FILE_DOWNLOAD), optional: true },
    { label: "form funnel firing (view/start/submit)", ok: has(EVENTS.FORM_VIEW) || has(EVENTS.FORM_START) || has(EVENTS.FORM_SUBMIT), optional: true },
    { label: "scroll_depth firing", ok: has(EVENTS.SCROLL_DEPTH), optional: true },
    { label: "web_vitals firing", ok: has(EVENTS.WEB_VITALS), optional: true },
    { label: "time_on_page firing", ok: has(EVENTS.TIME_ON_PAGE), optional: true },
  ];

  const toggleDebug = () => {
    try {
      const next = !debug;
      window.localStorage.setItem("analytics_debug", next ? "1" : "0");
      setDebug(next);
    } catch {}
  };

  const wrap = { maxWidth: 1040, margin: "0 auto", padding: "32px 20px 80px", fontFamily: "system-ui, sans-serif", color: COLORS.ink };
  const card = { border: `1px solid ${COLORS.line}`, borderRadius: 14, padding: 20, background: "#fff", marginBottom: 20 };
  const btn = { fontFamily: "inherit", fontSize: 13, fontWeight: 700, padding: "9px 14px", borderRadius: 10, border: `1px solid ${COLORS.line}`, background: "#fff", cursor: "pointer", color: COLORS.ink };
  const btnPrimary = { ...btn, background: COLORS.brand, color: "#fff", border: "none" };

  return (
    <div style={{ background: COLORS.bg, minHeight: "100vh" }}>
      <div style={wrap}>
        <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-.02em", marginBottom: 4 }}>
          Analytics Audit
        </h1>
        <p style={{ color: COLORS.sub, fontSize: 14, marginBottom: 24 }}>
          Live verification of the GA4 tracking layer (GTM-T8WFVVR6 → GA4
          G-1Y9ZVS01GG). {total} events captured this session.
        </p>

        {/* Health checks */}
        <div style={card}>
          <h2 style={{ fontSize: 16, fontWeight: 800, marginBottom: 14 }}>Health checks</h2>
          {checks.map((c) => (
            <div
              key={c.label}
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: `1px solid ${COLORS.line}` }}
            >
              <span style={{ fontSize: 14 }}>
                {c.label}
                {c.optional && !c.ok && (
                  <span style={{ color: COLORS.sub, fontSize: 12 }}> — not yet observed (interact to trigger)</span>
                )}
              </span>
              <Badge ok={c.ok && !c.warnIf} warn={(!c.ok && c.optional) || c.warnIf}>
                {c.ok ? (c.warnIf ? c.warnText || "partial" : "PASS") : c.optional ? "pending" : "FAIL"}
              </Badge>
            </div>
          ))}
        </div>

        {/* Controls + sandbox */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div style={card}>
            <h2 style={{ fontSize: 16, fontWeight: 800, marginBottom: 12 }}>Controls</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              <button style={btnPrimary} onClick={() => trackCtaClick({ buttonText: "Audit test CTA", ctaLocation: "analytics_audit", destination: "/test" })}>
                Fire test cta_click
              </button>
              <button style={btn} onClick={toggleDebug}>
                {debug ? "Disable" : "Enable"} console debug
              </button>
            </div>
            <p style={{ color: COLORS.sub, fontSize: 12, marginTop: 12, lineHeight: 1.6 }}>
              Debug mode logs every event to the console and is also enabled by
              appending <code>?analytics_debug=1</code> to any URL. For GA4
              DebugView, append <code>?_gl=1</code> via Tag Assistant or install
              the GA Debugger extension.
            </p>
          </div>

          <div style={card}>
            <h2 style={{ fontSize: 16, fontWeight: 800, marginBottom: 12 }}>Sandbox</h2>
            <p style={{ color: COLORS.sub, fontSize: 12, marginBottom: 12 }}>
              These use the AUTOMATIC global trackers — no explicit code.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 12 }}>
              <button style={btn}>Auto-tracked button</button>
              <a style={{ ...btn, textDecoration: "none", display: "inline-block" }} href="https://example.com" target="_blank" rel="noreferrer">
                External link
              </a>
              <a style={{ ...btn, textDecoration: "none", display: "inline-block" }} href="/sample.pdf" onClick={(e) => e.preventDefault()}>
                Download (.pdf)
              </a>
            </div>
            <form data-analytics-form="audit_sandbox" data-analytics-form-type="test" onSubmit={(e) => e.preventDefault()} style={{ display: "flex", gap: 8 }}>
              <input name="email" placeholder="you@company.com" style={{ flex: 1, padding: "9px 12px", border: `1px solid ${COLORS.line}`, borderRadius: 10, fontSize: 13 }} />
              <button style={btnPrimary} type="submit">Submit</button>
            </form>
          </div>
        </div>

        {/* Event counts */}
        <div style={card}>
          <h2 style={{ fontSize: 16, fontWeight: 800, marginBottom: 12 }}>Event counts</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {Object.keys(counts).length === 0 && <span style={{ color: COLORS.sub, fontSize: 13 }}>No events yet.</span>}
            {Object.entries(counts).sort((a, b) => b[1] - a[1]).map(([name, n]) => (
              <span key={name} style={{ fontSize: 12, fontWeight: 700, background: COLORS.bg, border: `1px solid ${COLORS.line}`, borderRadius: 999, padding: "5px 11px" }}>
                {name} <span style={{ color: COLORS.brand }}>{n}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Live event log */}
        <div style={card}>
          <h2 style={{ fontSize: 16, fontWeight: 800, marginBottom: 12 }}>Live event feed (newest first)</h2>
          <div style={{ maxHeight: 360, overflow: "auto", border: `1px solid ${COLORS.line}`, borderRadius: 10 }}>
            {log.length === 0 && <p style={{ padding: 16, color: COLORS.sub, fontSize: 13 }}>Interact with the page to see events.</p>}
            {log.map((e, i) => (
              <div key={i} style={{ padding: "10px 14px", borderBottom: `1px solid ${COLORS.line}`, fontSize: 12, fontFamily: "ui-monospace, monospace" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <strong style={{ color: COLORS.brand }}>{e.event}</strong>
                  <span style={{ color: COLORS.sub }}>{new Date(e.ts).toLocaleTimeString()}</span>
                </div>
                <div style={{ color: COLORS.sub, marginTop: 4, wordBreak: "break-word" }}>
                  {Object.entries(e.params)
                    .filter(([k]) => !["page_location", "event_timestamp"].includes(k))
                    .map(([k, v]) => `${k}=${v}`)
                    .join("  ·  ")}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
