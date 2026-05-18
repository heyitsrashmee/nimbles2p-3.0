"use client";

import { useState, useEffect, useRef, useCallback } from "react";

/* ─────────────────────────────────────────────
   Check definitions
───────────────────────────────────────────── */
const VDD_CHECKS = [
  {
    id: "pan",
    label: "Tax Identification",
    source: "✓ Duplicate tax ID detection ✓ Tax jurisdiction validation",
    icon: "🪪",
    accent: "#6366F1",
  },
  {
    id: "cin",
    label: "Entity Verification",
    source: "✓ Legal entity name verified ✓ Incorporation date verified",
    icon: "🏛",
    accent: "#0EA5E9",
  },
  {
    id: "gst",
    label: "Business Registration Check",
    source: "✓ Registered address matched ✓ Incorporation date verified",
    icon: "📋",
    accent: "#F59E0B",
  },
  {
    id: "msme",
    label: "Sanction Check",
    source: "✓ Global sanctions list screening ✓ Politically Exposed Person (PEP) screening",
    icon: "🏭",
    accent: "#10B981",
  },
  {
    id: "epf",
    label: "Blacklist Check",
    source: "✓ Fraud watchlist screening ✓ Debarred vendor verification",
    icon: "🛡",
    accent: "#8B5CF6",
  },
];

/* ─────────────────────────────────────────────
   CSS keyframes + utility classes
───────────────────────────────────────────── */
const VDD_CSS = `
  @keyframes vdd-spin     { to { transform:rotate(360deg); } }
  @keyframes vdd-pop      { 0%{transform:scale(.6);opacity:0} 55%{transform:scale(1.08)} 100%{transform:scale(1);opacity:1} }
  @keyframes vdd-scan     { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
  @keyframes vdd-ripple   { 0%{transform:scale(1);opacity:.7} 100%{transform:scale(2.8);opacity:0} }
  @keyframes vdd-pulsedot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(.65)} }
  @keyframes vdd-slideup  { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
  @keyframes vdd-countup  { 0%{transform:translateY(6px);opacity:0} 100%{transform:translateY(0);opacity:1} }
  @keyframes vdd-slidein  { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
  @keyframes vdd-glow     { 0%,100%{opacity:.55} 50%{opacity:1} }
  .vdd-pill-pop  { animation: vdd-pop .508s cubic-bezier(.34,1.56,.64,1) both; }
  .vdd-banner-in { animation: vdd-slideup .605s cubic-bezier(.22,1,.36,1) both; }
  .vdd-row-in    { animation: vdd-slidein .424s cubic-bezier(.22,1,.36,1) both; }
`;

/* ─────────────────────────────────────────────
   Component
───────────────────────────────────────────── */
export default function VDDAnimation() {
  const CI = 944;   // ms between checks starting
  const CD = 678;   // ms each check takes
  const CS = 1936;  // ms before first check fires
  const N  = VDD_CHECKS.length;

  const [states,   setStates]   = useState(() => Object.fromEntries(VDD_CHECKS.map(c => [c.id, "idle"])));
  const [popKeys,  setPopKeys]  = useState(() => Object.fromEntries(VDD_CHECKS.map(c => [c.id, 0])));
  const [progress, setProgress] = useState(0);
  const [visible,  setVisible]  = useState(false);
  const [pgReady,  setPgReady]  = useState(false);
  const [banner,   setBanner]   = useState(false);
  const [elapsed,  setElapsed]  = useState(0);

  const tos        = useRef([]);
  const elapsedRef = useRef(null);

  const sc = useCallback((fn, d) => {
    const id = setTimeout(fn, d);
    tos.current.push(id);
  }, []);

  const clearAll = useCallback(() => {
    tos.current.forEach(clearTimeout);
    tos.current = [];
    if (elapsedRef.current) { clearInterval(elapsedRef.current); elapsedRef.current = null; }
  }, []);

  const runCycle = useCallback(() => {
    clearAll();
    setVisible(false); setPgReady(false); setBanner(false);
    setProgress(0);    setElapsed(0);
    setStates(Object.fromEntries(VDD_CHECKS.map(c => [c.id, "idle"])));

    sc(() => setVisible(true),  218);
    sc(() => setPgReady(true),  847);

    // start elapsed counter when checks begin
    sc(() => {
      let ms = 0;
      elapsedRef.current = setInterval(() => { ms += 100; setElapsed(ms); }, 100);
    }, CS);

    VDD_CHECKS.forEach((c, i) => {
      const fire = CS + i * CI;
      sc(() => {
        setStates(prev => ({ ...prev, [c.id]: "running" }));
        setProgress(Math.round((i / N) * 86));
      }, fire);
      sc(() => {
        setStates(prev => ({ ...prev, [c.id]: "done" }));
        setPopKeys(prev => ({ ...prev, [c.id]: prev[c.id] + 1 }));
      }, fire + CD);
    });

    const doneAt = CS + N * CI;
    sc(() => {
      setProgress(100);
      if (elapsedRef.current) { clearInterval(elapsedRef.current); elapsedRef.current = null; }
    }, doneAt);
    sc(() => setBanner(true),    doneAt + 411);
    sc(() => setVisible(false),  doneAt + 3751);
    sc(() => runCycle(),         doneAt + 4840);
  }, [clearAll, sc, N]);

  useEffect(() => {
    const id = setTimeout(runCycle, 339);
    return () => { clearTimeout(id); clearAll(); };
  }, [runCycle, clearAll]);

  const doneCount  = VDD_CHECKS.filter(c => states[c.id] === "done").length;
  const elapsedSec = (elapsed / 1000).toFixed(1);

  return (
    <div style={{
      width: "100%", height: "100%",
      background: "linear-gradient(160deg,#F0F2FF 0%,#F7F8FC 60%,#EEF5F2 100%)",
      fontFamily: "var(--fb)",
      position: "relative", overflow: "hidden",
      opacity: visible ? 1 : 0,
      transition: "opacity 0.65s cubic-bezier(.22,1,.36,1)",
      display: "flex", flexDirection: "column",
    }}>
      <style>{VDD_CSS}</style>

      {/* ── Dot-grid texture ── */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(rgba(99,102,241,.06) 1px, transparent 1px)",
        backgroundSize: "20px 20px", pointerEvents: "none",
      }} />

      {/* ── Top chrome — dark glass ── */}
      <div style={{
        height: 44, flexShrink: 0,
        background: "linear-gradient(135deg,#1E1B4B 0%,#2D2A6E 100%)",
        display: "flex", alignItems: "center", padding: "0 14px", gap: 8,
        boxShadow: "0 1px 0 rgba(255,255,255,.07), 0 2px 12px rgba(30,27,75,.25)",
        position: "relative", zIndex: 2,
      }}>
        {/* Logo chip */}
        <div style={{
          width: 22, height: 22, borderRadius: 6,
          background: "linear-gradient(135deg,#818CF8,#6366F1)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 10, fontWeight: 800, color: "#fff", flexShrink: 0,
          boxShadow: "0 2px 8px rgba(99,102,241,.5)",
        }}>N</div>

        {/* Breadcrumb */}
        {["Vendors", "Precision Parts", "Due Diligence"].map((b, i, arr) => (
          <span key={b} style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{
              fontSize: 11,
              fontWeight: i === arr.length - 1 ? 600 : 400,
              color: i === arr.length - 1 ? "rgba(255,255,255,.9)" : "rgba(255,255,255,.38)",
            }}>{b}</span>
            {i < arr.length - 1 && <span style={{ color: "rgba(255,255,255,.2)", fontSize: 10 }}>/</span>}
          </span>
        ))}

        {/* Live badge */}
        <div style={{
          marginLeft: "auto", display: "flex", alignItems: "center", gap: 5,
          background: "rgba(34,197,94,.15)", border: "1px solid rgba(34,197,94,.3)",
          borderRadius: 100, padding: "3px 9px",
        }}>
          <span style={{
            width: 5, height: 5, borderRadius: "50%", background: "#4ADE80",
            display: "inline-block",
            animation: "vdd-pulsedot 1.936s ease-in-out infinite",
            boxShadow: "0 0 6px rgba(74,222,128,.7)",
          }} />
          <span style={{ fontSize: 10, fontWeight: 700, color: "#4ADE80", letterSpacing: ".03em" }}>LIVE</span>
        </div>
      </div>

      {/* ── Vendor card ── */}
      <div style={{
        margin: "10px 10px 0",
        background: "#fff", borderRadius: 12,
        border: "1px solid rgba(99,102,241,.12)",
        padding: "10px 12px",
        display: "flex", alignItems: "center", gap: 10,
        flexShrink: 0,
        boxShadow: "0 1px 4px rgba(99,102,241,.08), 0 4px 16px rgba(0,0,0,.04)",
        position: "relative", zIndex: 1,
      }}>
        {/* Avatar with gradient ring */}
        <div style={{ position: "relative", flexShrink: 0 }}>
          <div style={{
            width: 34, height: 34, borderRadius: "50%",
            background: "linear-gradient(135deg,#1E1B4B,#4A47A0)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 11, fontWeight: 800, color: "#fff",
          }}>PP</div>
          <div style={{
            position: "absolute", inset: -2, borderRadius: "50%",
            border: "2px solid transparent",
            background: "linear-gradient(135deg,#818CF8,#34D399) border-box",
            WebkitMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "destination-out", maskComposite: "exclude",
          }} />
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12.5, fontWeight: 700, color: "#0F172A", letterSpacing: "-.02em" }}>
            Precision Parts Pvt Ltd
          </div>
          <div style={{ fontSize: 9.5, color: "#94A3B8", marginTop: 1.5, letterSpacing: ".01em" }}>
            Tax ID: 27AAPCP1234Q1Z5 · SUP-0412
          </div>
        </div>

        <div style={{ display: "flex", gap: 5, flexShrink: 0 }}>
          <span style={{ fontSize: 9.5, fontWeight: 600, background: "#EFF6FF", color: "#3B82F6", border: "1px solid #BFDBFE", borderRadius: 6, padding: "2px 7px" }}>Manufacturing</span>
          <span style={{ fontSize: 9.5, fontWeight: 600, background: "#FFFBEB", color: "#B45309", border: "1px solid #FDE68A", borderRadius: 6, padding: "2px 7px" }}>New</span>
        </div>
      </div>

      {/* ── Progress area ── */}
      <div style={{
        padding: "10px 10px 6px", flexShrink: 0,
        opacity: pgReady ? 1 : 0, transition: "opacity 0.45s ease",
        position: "relative", zIndex: 1,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 10.5, fontWeight: 700, color: "#475569", letterSpacing: "-.01em" }}>
              Statutory Compliance
            </span>
            {doneCount > 0 && (
              <span key={doneCount} style={{
                fontSize: 9.5, fontWeight: 700,
                background: "linear-gradient(135deg,#DCFCE7,#D1FAE5)",
                color: "#059669", borderRadius: 100, padding: "1px 7px",
                animation: "vdd-countup .3s cubic-bezier(.22,1,.36,1) both",
                border: "1px solid #A7F3D0",
              }}>
                {doneCount}/{N} done
              </span>
            )}
          </div>
          <span style={{ fontFamily: "var(--fm)", fontSize: 11, fontWeight: 600, color: "#4A47A0", letterSpacing: "-.02em" }}>
            {progress}%
          </span>
        </div>

        {/* Segmented pill track */}
        <div style={{ display: "flex", gap: 4, marginBottom: 5 }}>
          {VDD_CHECKS.map((c) => {
            const st = states[c.id];
            const bg = st === "done"
              ? "linear-gradient(90deg,#10B981,#34D399)"
              : st === "running"
                ? "linear-gradient(90deg,#F59E0B,#FBBF24)"
                : "rgba(0,0,0,.07)";
            return (
              <div key={c.id} style={{
                flex: 1, height: 5, borderRadius: 100, background: bg,
                transition: "background 0.4s ease",
                position: "relative", overflow: "hidden",
                boxShadow: st === "done"
                  ? "0 0 6px rgba(16,185,129,.35)"
                  : st === "running"
                    ? "0 0 6px rgba(245,158,11,.4)"
                    : "none",
              }}>
                {st === "running" && (
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(90deg,transparent,rgba(255,255,255,.6),transparent)",
                    backgroundSize: "200% 100%",
                    animation: "vdd-scan 1.21s ease-in-out infinite",
                  }} />
                )}
              </div>
            );
          })}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontSize: 9, color: "#94A3B8", letterSpacing: ".02em" }}>{N} CHECKS · G2B APIs</span>
          <span style={{ fontSize: 9, color: "#94A3B8", fontFamily: "var(--fm)" }}>
            {elapsed > 0 ? `${elapsedSec}s elapsed` : "est. <5s"}
          </span>
        </div>
      </div>

      {/* ── Check rows ── */}
      <div style={{ flex: 1, minHeight: 0, overflow: "hidden", padding: "2px 10px 6px", display: "flex", flexDirection: "column", gap: 4, position: "relative", zIndex: 1 }}>
        {VDD_CHECKS.map((c, i) => {
          const st = states[c.id];
          const isR = st === "running";
          const isD = st === "done";

          const rowBg   = isR ? "#FFFDF5" : isD ? "#F0FDF8" : "#fff";
          const rowBd   = isR ? "rgba(245,158,11,.22)" : isD ? "rgba(16,185,129,.2)" : "rgba(0,0,0,.07)";
          const accentL = isR ? c.accent : isD ? "#10B981" : "rgba(0,0,0,.1)";

          return (
            <div key={c.id} className="vdd-row-in" style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "8px 10px 8px 0",
              background: rowBg,
              borderTop: `1px solid ${rowBd}`,
              borderRight: `1px solid ${rowBd}`,
              borderBottom: `1px solid ${rowBd}`,
              borderLeft: `3px solid ${accentL}`,
              borderRadius: 10,
              transition: "background .35s ease, border-color .35s ease, border-left-color .35s ease, box-shadow .35s ease",
              boxShadow: isD
                ? "0 1px 6px rgba(16,185,129,.1)"
                : isR
                  ? "0 1px 8px rgba(245,158,11,.12)"
                  : "0 1px 3px rgba(0,0,0,.04)",
              animationDelay: `${i * 50}ms`,
              position: "relative", overflow: "hidden",
            }}>
              {/* Shimmer sweep on running row */}
              {isR && (
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(90deg,transparent,rgba(255,255,255,.4),transparent)",
                  backgroundSize: "200% 100%",
                  animation: "vdd-scan 1.573s ease-in-out infinite",
                  pointerEvents: "none",
                }} />
              )}

              {/* Step circle — number / spinner / checkmark */}
              <div style={{ width: 30, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <div style={{
                  width: 18, height: 18, borderRadius: "50%",
                  background: isD
                    ? "linear-gradient(135deg,#10B981,#34D399)"
                    : isR
                      ? "linear-gradient(135deg,#F59E0B,#FBBF24)"
                      : "#F1F5F9",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 9, fontWeight: 800,
                  color: isD || isR ? "#fff" : "#94A3B8",
                  boxShadow: isD
                    ? "0 2px 6px rgba(16,185,129,.4)"
                    : isR
                      ? "0 2px 6px rgba(245,158,11,.4)"
                      : "none",
                  transition: "all .35s cubic-bezier(.22,1,.36,1)",
                }}>
                  {isD ? (
                    <svg width="8" height="8" viewBox="0 0 11 11" fill="none">
                      <path d="M2 5.5L4.5 8L9 3" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : isR ? (
                    <div style={{
                      width: 7, height: 7, borderRadius: "50%",
                      border: "1.5px solid rgba(255,255,255,.5)", borderTopColor: "#fff",
                      animation: "vdd-spin 0.726s linear infinite",
                    }} />
                  ) : (
                    i + 1
                  )}
                </div>
              </div>

              {/* Accent icon chip */}
              <div style={{
                width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                background: isD
                  ? "linear-gradient(135deg,rgba(16,185,129,.12),rgba(52,211,153,.08))"
                  : isR
                    ? `linear-gradient(135deg,${c.accent}18,${c.accent}0a)`
                    : "#F8F9FC",
                border: isD
                  ? "1px solid rgba(16,185,129,.2)"
                  : isR
                    ? `1px solid ${c.accent}30`
                    : "1px solid rgba(0,0,0,.06)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 13, lineHeight: 1,
                transition: "all .35s ease",
              }}>{c.icon}</div>

              {/* Label + source */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontSize: 11.5, fontWeight: 700,
                  color: isD ? "#065F46" : isR ? "#92400E" : "#1E293B",
                  letterSpacing: "-.02em", transition: "color .3s",
                }}>{c.label}</div>
                <div style={{
                  fontSize: 8.5,
                  color: isD ? "#6EE7B7" : isR ? "#FCD34D" : "#94A3B8",
                  marginTop: 2, fontWeight: 500,
                  transition: "color .3s",
                  lineHeight: 1.55, whiteSpace: "pre-wrap",
                }}>{c.source.replace(/ ✓/g, "\n✓")}</div>
              </div>

              {/* Right status */}
              {isR && (
                <div style={{ display: "flex", alignItems: "center", paddingRight: 10, flexShrink: 0 }}>
                  <span style={{ fontSize: 10, color: "#D97706", fontWeight: 700, letterSpacing: "-.01em", fontStyle: "italic" }}>
                    Checking…
                  </span>
                </div>
              )}
              {isD && (
                <div key={popKeys[c.id]} className="vdd-pill-pop" style={{
                  display: "flex", alignItems: "center", gap: 4,
                  background: "linear-gradient(135deg,#10B981,#059669)",
                  color: "#fff", borderRadius: 100,
                  padding: "3px 9px", fontSize: 10, fontWeight: 700,
                  flexShrink: 0, marginRight: 10,
                  boxShadow: "0 2px 8px rgba(16,185,129,.4)",
                }}>
                  <svg width="8" height="8" viewBox="0 0 11 11" fill="none">
                    <path d="M2 5.5L4.5 8L9 3" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Verified
                </div>
              )}
              {!isR && !isD && (
                <span style={{ fontSize: 9.5, color: "#C4C9D4", fontWeight: 500, paddingRight: 10, flexShrink: 0, letterSpacing: ".02em" }}>
                  PENDING
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Success banner — slides up from bottom ── */}
      {banner && (
        <div className="vdd-banner-in" style={{ position: "absolute", left: 0, right: 0, bottom: 0, zIndex: 60 }}>
          {/* Fog overlay */}
          <div style={{
            position: "absolute", bottom: "100%", left: 0, right: 0, height: 60,
            background: "linear-gradient(to bottom,transparent,rgba(240,242,255,.9))",
            pointerEvents: "none",
          }} />

          {/* Green success strip */}
          <div style={{
            position: "relative",
            background: "linear-gradient(90deg,#065F46 0%,#059669 50%,#0D9488 100%)",
            padding: "12px 14px",
            display: "flex", alignItems: "center", gap: 11,
            boxShadow: "0 -4px 20px rgba(5,150,105,.2)",
          }}>
            {/* Dot-grid decoration */}
            <div style={{
              position: "absolute", inset: 0,
              backgroundImage: "radial-gradient(rgba(255,255,255,.08) 1px,transparent 1px)",
              backgroundSize: "14px 14px", pointerEvents: "none",
            }} />

            {/* Animated check circle + ripple */}
            <div style={{ position: "relative", flexShrink: 0, zIndex: 1 }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%",
                background: "rgba(255,255,255,.18)", border: "1.5px solid rgba(255,255,255,.35)",
                display: "flex", alignItems: "center", justifyContent: "center",
                backdropFilter: "blur(4px)",
              }}>
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7L5.5 10.5L12 3.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div style={{
                position: "absolute", inset: 0, borderRadius: "50%",
                border: "2px solid rgba(255,255,255,.5)",
                animation: "vdd-ripple 1.331s ease-out forwards",
              }} />
            </div>

            <div style={{ flex: 1, minWidth: 0, zIndex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: "#fff", letterSpacing: "-.02em" }}>
                All 5 statutory checks passed
              </div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,.65)", marginTop: 2, letterSpacing: ".04em", textTransform: "uppercase", fontWeight: 600 }}>
                Tax ID · Entity · Business Reg · Sanction · Blacklist
              </div>
            </div>

            {/* Elapsed time badge */}
            <div style={{
              display: "flex", alignItems: "center", gap: 4,
              background: "rgba(255,255,255,.14)", border: "1px solid rgba(255,255,255,.2)",
              borderRadius: 8, padding: "4px 10px", zIndex: 1, backdropFilter: "blur(4px)",
            }}>
              <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="5" stroke="rgba(255,255,255,.8)" strokeWidth="1.4" />
                <path d="M6 4v2.5l1.5 1.5" stroke="rgba(255,255,255,.8)" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              <span style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,.9)", fontFamily: "var(--fm)" }}>
                {elapsedSec}s
              </span>
            </div>
          </div>

          {/* Prompt card */}
          <div style={{
            position: "relative", background: "#fff",
            padding: "12px 14px",
            display: "flex", alignItems: "center", gap: 12,
            boxShadow: "0 -2px 0 rgba(0,0,0,.04)",
            borderTop: "1px solid rgba(99,102,241,.1)",
          }}>
            <div style={{
              width: 34, height: 34, borderRadius: 10,
              background: "linear-gradient(135deg,#EEF2FF,#E0E7FF)",
              border: "1px solid #C7D2FE",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0, boxShadow: "0 2px 8px rgba(99,102,241,.15)",
            }}>
              <svg width="15" height="15" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="7.5" stroke="#6366F1" strokeWidth="1.6" />
                <path d="M10 7v3.5l2 2" stroke="#6366F1" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12.5, fontWeight: 800, color: "#0F172A", letterSpacing: "-.02em" }}>
                Statutory Checks Done
              </div>
              <div style={{ fontSize: 10.5, color: "#64748B", marginTop: 2, fontWeight: 400 }}>
                Do you want to proceed with Financial Checks?
              </div>
            </div>

            <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
              <div style={{
                background: "#F8FAFC", color: "#64748B",
                border: "1px solid #E2E8F0", borderRadius: 8,
                padding: "5px 11px", fontSize: 11, fontWeight: 600,
                cursor: "pointer", letterSpacing: "-.01em",
              }}>Skip</div>
              <div style={{
                background: "linear-gradient(135deg,#4F46E5,#4A47A0)", color: "#fff",
                borderRadius: 8, padding: "5px 13px", fontSize: 11, fontWeight: 700,
                cursor: "pointer", boxShadow: "0 2px 10px rgba(79,70,229,.4)",
                display: "flex", alignItems: "center", gap: 5, letterSpacing: "-.01em",
              }}>
                Proceed
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6h8M7 3l3 3-3 3" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
