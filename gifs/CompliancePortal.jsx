"use client";

import { useEffect, useRef, useCallback } from "react";

const CHECKS = [
  { id: "pan",  label: "PAN Verification",    source: "Income Tax Dept",  icon: "🪪" },
  { id: "cin",  label: "CIN / ROC Check",     source: "MCA21 Portal",     icon: "🏛" },
  { id: "gst",  label: "GST Active Status",   source: "GSTN Gateway",     icon: "📋" },
  { id: "msme", label: "MSME Registration",   source: "Udyam Registry",   icon: "🏭" },
  { id: "itr",  label: "ITR Returns Filed",   source: "TRACES Portal",    icon: "📊" },
  { id: "epf",  label: "EPF Compliance",      source: "EPFO Database",    icon: "🛡" },
];

export default function CompliancePortal() {
  const tos = useRef([]);
  const clearAll = useCallback(() => {
    tos.current.forEach(clearTimeout);
    tos.current = [];
  }, []);
  const t = useCallback((fn, d) => {
    const id = setTimeout(fn, d);
    tos.current.push(id);
    return id;
  }, []);

  /* ── state helpers ── */
  const setCheck = useCallback((id, state) => {
    const row = document.getElementById(`cp-row-${id}`);
    if (!row) return;

    const iconEl   = row.querySelector(".cp-row-icon");
    const statusEl = row.querySelector(".cp-row-status");
    const spinEl   = row.querySelector(".cp-row-spinner");
    const pillEl   = row.querySelector(".cp-row-pill");

    row.dataset.state = state;

    if (state === "running") {
      row.style.background = "#FFFBEB";
      row.style.borderColor = "rgba(245,158,11,0.25)";
      if (spinEl)   { spinEl.style.display = "flex"; }
      if (pillEl)   { pillEl.style.display = "none"; }
      if (statusEl) { statusEl.textContent = "Checking…"; statusEl.style.color = "#D97706"; }
      if (iconEl)   { iconEl.style.opacity = "1"; }
    } else if (state === "done") {
      row.style.background = "#F0FDF4";
      row.style.borderColor = "rgba(16,185,129,0.25)";
      if (spinEl)   { spinEl.style.display = "none"; }
      if (pillEl)   { pillEl.style.display = "flex"; }
      if (statusEl) { statusEl.textContent = "Verified"; statusEl.style.color = "#059669"; }
    } else {
      row.style.background = "#fff";
      row.style.borderColor = "#E8E8ED";
      if (spinEl)   { spinEl.style.display = "none"; }
      if (pillEl)   { pillEl.style.display = "none"; }
      if (statusEl) { statusEl.textContent = "Pending"; statusEl.style.color = "#94A3B8"; }
    }
  }, []);

  const setProgress = useCallback((pct, animated = true) => {
    const bar = document.getElementById("cp-progress-fill");
    if (!bar) return;
    if (!animated) { bar.style.transition = "none"; }
    else { bar.style.transition = "width 0.6s cubic-bezier(0.22,1,0.36,1)"; }
    bar.style.width = pct + "%";
    const label = document.getElementById("cp-progress-label");
    if (label) label.textContent = pct + "%";
  }, []);

  

  

  const run = useCallback(() => {
    clearAll();

    /* ── full reset ── */
    const root = document.getElementById("cp-root");
    if (root) { root.style.transition = "none"; root.style.opacity = "0"; }

    CHECKS.forEach(c => setCheck(c.id, "idle"));
    setProgress(0, false);

    const banner = document.getElementById("cp-banner");
    if (banner) { banner.style.transition = "none"; banner.style.transform = "translateY(-100%)"; banner.style.opacity = "0"; }

    const btn = document.getElementById("cp-run-btn");
    if (btn) { btn.style.background = "#1E1B4B"; btn.style.transform = "scale(1)"; }

    const progressWrap = document.getElementById("cp-progress-wrap");
    if (progressWrap) { progressWrap.style.transition = "none"; progressWrap.style.opacity = "0"; }

    /* SCENE 1 — fade in */
    t(() => {
      if (root) { root.style.transition = "opacity 0.7s ease"; root.style.opacity = "1"; }
    }, 150);

    t(() => {
      if (progressWrap) {
        progressWrap.style.transition = "opacity 0.4s ease";
        progressWrap.style.opacity = "1";
      }
    }, 900);

    /* SCENE 4 — activate button */
    t(() => {
      if (btn) {
        btn.style.background = "#2D2A6A";
        setTimeout(() => { if (btn) btn.style.background = "#1E1B4B"; }, 180);
      }
    }, 1900);

    const CHECK_INTERVAL = 950;
    const CHECK_DURATION = 680;
    const checkStartDelay = 2550;

    CHECKS.forEach((c, i) => {
      const fireAt = checkStartDelay + i * CHECK_INTERVAL;

      t(() => {
        setCheck(c.id, "running");
        /* progress ticks with each check starting */
        setProgress(Math.round(((i) / CHECKS.length) * 90));
      }, fireAt);

      t(() => {
        setCheck(c.id, "done");
      }, fireAt + CHECK_DURATION);
    });

    /* SCENE 6 — all done, fill progress to 100% */
    const allDoneAt = checkStartDelay + CHECKS.length * CHECK_INTERVAL;

    t(() => {
      setProgress(100);
    }, allDoneAt);

    /* SCENE 7 — success banner slides in */
    t(() => {
      if (banner) {
        banner.style.transition = "transform 0.5s cubic-bezier(0.22,1,0.36,1), opacity 0.4s ease";
        banner.style.transform = "translateY(0)";
        banner.style.opacity = "1";
      }

    }, allDoneAt + 400);

    /* SCENE 8 — hold success, then fade out → loop */
    t(() => {
      if (root) {
        root.style.transition = "opacity 0.7s ease";
        root.style.opacity = "0";
      }
    }, allDoneAt + 2600);

    t(() => run(), allDoneAt + 3400);

  }, [clearAll, t, setCheck, setProgress]);

  useEffect(() => {
    const id = setTimeout(run, 300);
    return () => { clearTimeout(id); clearAll(); };
  }, [run, clearAll]);

  /* ── progress step count ── */
  const totalChecks = CHECKS.length;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

        #cp-root, #cp-root * { box-sizing: border-box; -webkit-font-smoothing: antialiased; }

        /* Spinner */
        @keyframes cp-spin { to { transform: rotate(360deg); } }
        .cp-spinner {
          width: 16px; height: 16px; border-radius: 50%;
          border: 2px solid #FDE68A;
          border-top-color: #D97706;
          animation: cp-spin 0.7s linear infinite;
          flex-shrink: 0;
        }

        /* Check row */
        .cp-check-row {
          display: flex; align-items: center; gap: 14px;
          padding: 14px 20px;
          border: 1px solid #E8E8ED;
          border-radius: 10px;
          background: #fff;
          transition: background 0.35s ease, border-color 0.35s ease;
        }

        /* Verified pill */
        .cp-pill {
          display: flex; align-items: center; gap: 5px;
          background: #ECFDF5; color: #059669;
          border: 1px solid #A7F3D0;
          border-radius: 100px; padding: 3px 10px;
          font-size: 11.5px; font-weight: 600;
          white-space: nowrap; flex-shrink: 0;
        }

        /* Success banner */
        #cp-banner {
          position: absolute; top: 0; left: 0; right: 0;
          transform: translateY(-100%); opacity: 0;
          z-index: 50;
        }

        @keyframes cp-shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }
        .cp-skeleton {
          background: linear-gradient(90deg, #F1F5F9 25%, #E2E8F0 50%, #F1F5F9 75%);
          background-size: 200% 100%;
          animation: cp-shimmer 1.4s ease-in-out infinite;
          border-radius: 4px;
        }

        /* Progress bar shimmer */
        @keyframes cp-bar-shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }
      `}</style>

      <div
        id="cp-root"
        style={{
          width: "100%", height: "100%",
          background: "#F7F7F9",
          fontFamily: "'Inter', system-ui, sans-serif",
          position: "relative", overflow: "hidden",
          opacity: 0,
        }}
      >
        {/* ── App chrome top bar ── */}
        <div style={{
          height: 52, background: "#fff",
          borderBottom: "1px solid #E8E8ED",
          display: "flex", alignItems: "center",
          padding: "0 28px", gap: 8, flexShrink: 0,
        }}>
          {/* Logo mark */}
          <div style={{
            width: 28, height: 28, borderRadius: 7,
            background: "linear-gradient(135deg,#1E1B4B,#4A47A0)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 12, fontWeight: 800, color: "#fff", flexShrink: 0,
          }}>N</div>

          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginLeft: 4 }}>
            {["Vendors","Precision Parts Pvt","Compliance Check"].map((b, i, arr) => (
              <span key={b} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{
                  fontSize: 13, fontWeight: i === arr.length - 1 ? 600 : 400,
                  color: i === arr.length - 1 ? "#0F172A" : "#94A3B8",
                }}>{b}</span>
                {i < arr.length - 1 && <span style={{ color: "#CBD5E1", fontSize: 13 }}>/</span>}
              </span>
            ))}
          </div>

          {/* Right: Run button */}
          <div style={{ marginLeft: "auto", display: "flex", gap: 10, alignItems: "center" }}>
            <button
              id="cp-run-btn"
              style={{
                background: "#1E1B4B", color: "#fff", border: "none",
                borderRadius: 8, padding: "7px 18px",
                fontSize: 13, fontWeight: 600, cursor: "pointer",
                fontFamily: "inherit", transition: "background 0.15s ease, transform 0.12s ease",
                display: "flex", alignItems: "center", gap: 7,
              }}
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M2 2L11 6.5L2 11V2Z" fill="white"/>
              </svg>
              Run Checks
            </button>
          </div>
        </div>

        {/* ── Main content ── */}
        <div style={{ padding: "28px 32px", position: "relative" }}>

          {/* Vendor info card */}
          <div style={{
            background: "#fff", border: "1px solid #E8E8ED",
            borderRadius: 12, padding: "18px 22px",
            display: "flex", alignItems: "center", gap: 16,
            marginBottom: 20,
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: "50%",
              background: "linear-gradient(135deg,#1E1B4B,#4A47A0)",
              color: "#fff", display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: 15, fontWeight: 700, flexShrink: 0,
            }}>PP</div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#0F172A" }}>Precision Parts Pvt Ltd</div>
              <div style={{ fontSize: 12, color: "#64748B", marginTop: 2 }}>GSTIN: 27AAPCP1234Q1Z5 &nbsp;·&nbsp; 🇮🇳 India &nbsp;·&nbsp; Vendor ID: SUP-0412</div>
            </div>
            <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
              <span style={{ fontSize: 12, fontWeight: 600, background: "#EFF6FF", color: "#3B82F6", border: "1px solid #BFDBFE", borderRadius: 100, padding: "3px 11px" }}>Manufacturing</span>
              <span style={{ fontSize: 12, fontWeight: 600, background: "#F8FAFC", color: "#64748B", border: "1px solid #E2E8F0", borderRadius: 100, padding: "3px 11px" }}>New Vendor</span>
            </div>
          </div>

          {/* Progress bar */}
          <div
            id="cp-progress-wrap"
            style={{ marginBottom: 18, opacity: 0 }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#64748B" }}>
                Statutory Compliance Check
              </span>
              <span id="cp-progress-label" style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, fontWeight: 500, color: "#1E1B4B" }}>0%</span>
            </div>
            <div style={{ height: 6, background: "#E8E8ED", borderRadius: 100, overflow: "hidden" }}>
              <div
                id="cp-progress-fill"
                style={{
                  height: "100%", width: "0%",
                  background: "linear-gradient(90deg,#4A47A0,#10B981)",
                  borderRadius: 100,
                  transition: "width 0.6s cubic-bezier(0.22,1,0.36,1)",
                }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
              <span style={{ fontSize: 11, color: "#94A3B8" }}>{totalChecks} checks · Live government APIs</span>
              <span style={{ fontSize: 11, color: "#94A3B8" }}>Est. time &lt; 4 seconds</span>
            </div>
          </div>

          {/* Check rows */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {CHECKS.map((c, i) => (
              <div
                key={c.id}
                id={`cp-row-${c.id}`}
                className="cp-check-row"
                data-state="idle"
              >
                {/* Row number */}
                <div style={{
                  width: 24, height: 24, borderRadius: "50%",
                  background: "#F1F5F9", color: "#94A3B8",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, fontWeight: 700, flexShrink: 0,
                }}>{i + 1}</div>

                {/* Icon */}
                <div className="cp-row-icon" style={{ fontSize: 18, flexShrink: 0, width: 24, textAlign: "center" }}>{c.icon}</div>

                {/* Label + source */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 600, color: "#0F172A" }}>{c.label}</div>
                  <div style={{ fontSize: 11.5, color: "#94A3B8", marginTop: 1 }}>{c.source}</div>
                </div>

                {/* Spinner (hidden by default) */}
                <div className="cp-row-spinner" style={{ display: "none", alignItems: "center", gap: 8 }}>
                  <div className="cp-spinner" />
                  <span style={{ fontSize: 12, color: "#D97706", fontWeight: 500 }}>Checking…</span>
                </div>

                {/* Verified pill (hidden by default) */}
                <div className="cp-row-pill" style={{ display: "none" }}>
                  <span className="cp-pill">
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                      <path d="M2 5.5L4.5 8L9 3" stroke="#059669" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Verified
                  </span>
                </div>

                {/* Status text */}
                <div className="cp-row-status" style={{ fontSize: 12, color: "#94A3B8", fontWeight: 500, marginLeft: 4, minWidth: 52, textAlign: "right" }}>
                  Pending
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Success banner ── */}
        <div id="cp-banner">
          <div style={{
            background: "#059669",
            padding: "14px 32px",
            display: "flex", alignItems: "center", gap: 12,
          }}>
            <div style={{
              width: 28, height: 28, borderRadius: "50%",
              background: "rgba(255,255,255,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7L5.5 10.5L12 3.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>All 6 compliance checks passed</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.75)", marginTop: 1 }}>Vendor cleared · PAN · CIN · GST · MSME · ITR · EPF verified against live government APIs</div>
            </div>
            <div style={{ marginLeft: "auto", display: "flex", gap: 10 }}>
              <button style={{ background: "#fff", color: "#059669", border: "none", borderRadius: 7, padding: "7px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                Proceed to Onboarding →
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
