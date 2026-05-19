"use client";

import { useEffect, useRef, useCallback, useState } from "react";

/* ─── Data ─────────────────────────────────────────────── */
const KPI_DATA = [
  { val: "1,240", lbl: "Total Suppliers",    trend: "↑ 6.4%", up: true,  color: "#3B82F6" },
  { val: "1,087", lbl: "Active Suppliers",   trend: "↑ 3.2%", up: true,  color: "#047857" },
  { val: "₹82Cr", lbl: "Total Spend",        trend: "↑ 12%",  up: true,  color: "#1E1B4B" },
  { val: "6.2d",  lbl: "Avg Lead Time",      trend: "↓ 8%",   up: false, color: "#D97706" },
  { val: "94%",   lbl: "On-Time Delivery",   trend: "↑ 3.1%", up: true,  color: "#10B981" },
];

const SPEND_BARS = [
  { month: "Oct", h: 42, color: "#8482C8" },
  { month: "Nov", h: 56, color: "#4A47A0" },
  { month: "Dec", h: 48, color: "#8482C8" },
  { month: "Jan", h: 70, color: "#4A47A0" },
  { month: "Feb", h: 62, color: "#8482C8" },
  { month: "Mar", h: 82, color: "#3B82F6" },
];

const SLA_GAUGES = [
  { label: "Delivery SLA",             val: 92, target: "85%", status: "✓ Exceeded",    color: "#10B981" },
  { label: "Invoice Processing SLA",   val: 89, target: "90%", status: "⚠ Near-miss",   color: "#3B82F6" },
  { label: "Query Resolution ≤48hrs",  val: 76, target: "80%", status: "✗ Below target", color: "#F59E0B" },
];

const PERF_ROWS = [
  { name: "Steel Co. Pvt Ltd",     onTime: "98%", lead: "4.1d", fill: "99%", pill: "Top Performer", pillCls: "g" },
  { name: "Precision Parts Pvt",   onTime: "92%", lead: "5.8d", fill: "96%", pill: "Good",           pillCls: "g" },
  { name: "MetalWorks Ltd",        onTime: "81%", lead: "8.2d", fill: "87%", pill: "Watch",          pillCls: "y" },
  { name: "AlloyTech Industries",  onTime: "74%", lead: "10.5d",fill: "79%", pill: "At Risk",        pillCls: "r" },
];

const COMP_RINGS = [
  { label: "Financial",     val: 79, color: "#3B82F6" },
  { label: "Legal",         val: 91, color: "#10B981" },
  { label: "ESG",           val: 63, color: "#F59E0B" },
];

const VENDOR_CARDS = [
  { id: "saVC1", rank: "🥇", rankClass: "gold",   name: "Steel Co. Pvt Ltd",    tags: ["On-Time", "ISO"],   score: "9.4", scoreW: "94%", scoreColor: "#047857" },
  { id: "saVC2", rank: "🥈", rankClass: "silver",  name: "Precision Parts Pvt",  tags: ["Reliable", "Fast"], score: "8.7", scoreW: "87%", scoreColor: "#047857" },
  { id: "saVC3", rank: "🥉", rankClass: "bronze",  name: "MetalWorks Ltd",        tags: ["Watch"],            score: "7.2", scoreW: "72%", scoreColor: "#D97706" },
  { id: "saVC4", rank: "⚠", rankClass: "risk",    name: "AlloyTech Industries",  tags: ["At Risk"],          score: "5.8", scoreW: "58%", scoreColor: "#EF4444" },
];

const TABS = ["Overview", "SLA & Performance", "Compliance", "Vendor Ratings"];
const VIEW_DURATION = 4200;

/* ─── Component ─────────────────────────────────────────── */
export default function SupplierAnalytics() {
  const [activeView, setActiveView] = useState(0);
  const timersRef = useRef([]);
  const runningRef = useRef(false);

  const clearAll = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const t = useCallback((fn, delay) => {
    const id = setTimeout(fn, delay);
    timersRef.current.push(id);
    return id;
  }, []);

  /* ── Animate bars (V1) ── */
  const animV1 = useCallback(() => {
    document.querySelectorAll(".sa-bar-fill").forEach((bar, i) => {
      bar.style.height = "0px";
      setTimeout(() => { bar.style.height = bar.dataset.h; }, 100 + i * 130);
    });
  }, []);

  /* ── Animate gauges (V2) ── */
  const animV2 = useCallback(() => {
    document.querySelectorAll(".sa-gauge-fill").forEach((fill, i) => {
      fill.style.width = "0%";
      setTimeout(() => { fill.style.width = fill.dataset.w + "%"; }, 200 + i * 160);
    });
  }, []);

  /* ── Animate rings (V3) ── */
  const animV3 = useCallback(() => {
    document.querySelectorAll(".sa-ring-fill").forEach((ring) => {
      const val = parseFloat(ring.dataset.val) || 0;
      ring.style.transition = "none";
      ring.setAttribute("stroke-dasharray", "0 88");
      setTimeout(() => {
        ring.style.transition = "stroke-dasharray 1.1s ease";
        ring.setAttribute("stroke-dasharray", `${val} 88`);
      }, 250);
    });
  }, []);

  /* ── Animate vendor cards (V4) ── */
  const animV4 = useCallback(() => {
    VENDOR_CARDS.forEach(({ id }, i) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.style.opacity = "0";
      el.style.transform = "translateX(-8px)";
      setTimeout(() => {
        el.style.transition = "all 0.4s ease";
        el.style.opacity = "1";
        el.style.transform = "translateX(0)";
        const bar = el.querySelector(".sa-vc-score-bar");
        if (bar) {
          bar.style.width = "0";
          setTimeout(() => { bar.style.width = bar.dataset.w; }, 60);
        }
      }, 160 + i * 220);
    });
  }, []);

  const resetAll = useCallback(() => {
    document.querySelectorAll(".sa-bar-fill").forEach((b) => { b.style.height = "0px"; });
    document.querySelectorAll(".sa-gauge-fill").forEach((f) => { f.style.width = "0%"; });
    document.querySelectorAll(".sa-ring-fill").forEach((r) => {
      r.style.transition = "none";
      r.setAttribute("stroke-dasharray", "0 88");
    });
    VENDOR_CARDS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) { el.style.opacity = "0"; el.style.transform = "translateX(-8px)"; el.style.transition = "none"; }
    });
  }, []);

  const activateView = useCallback((idx) => {
    setActiveView(idx);
    if (idx === 0) setTimeout(animV1, 80);
    if (idx === 1) setTimeout(animV2, 80);
    if (idx === 2) setTimeout(animV3, 80);
    if (idx === 3) setTimeout(animV4, 80);
  }, [animV1, animV2, animV3, animV4]);

  const run = useCallback(() => {
    if (runningRef.current) return;
    runningRef.current = true;
    clearAll();
    resetAll();
    activateView(0);

    [1, 2, 3].forEach((i) => {
      t(() => activateView(i), i * VIEW_DURATION);
    });
    t(() => { runningRef.current = false; setTimeout(run, 600); }, 4 * VIEW_DURATION + 500);
  }, [clearAll, resetAll, activateView, t]);

  useEffect(() => {
    const id = setTimeout(run, 600);
    return () => { clearTimeout(id); clearAll(); };
  }, [run, clearAll]);

  const pillStyle = (cls) => {
    if (cls === "g") return { background: "#ECFDF5", color: "#047857", border: "1px solid rgba(16,185,129,0.25)" };
    if (cls === "y") return { background: "#FEF3C7", color: "#D97706", border: "1px solid rgba(245,158,11,0.25)" };
    return { background: "#FEF2F2", color: "#DC2626", border: "1px solid rgba(239,68,68,0.25)" };
  };

  return (
    <div style={styles.root}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <div style={styles.headerDot} />
          <span style={styles.headerLabel}>SUPPLIER ANALYTICS — LIVE DASHBOARD</span>
        </div>
        <div style={styles.liveBadge}>
          <div style={styles.liveDot} />
          Real-Time
        </div>
      </div>

      {/* Tab nav */}
      <div style={styles.tabBar}>
        {TABS.map((tab, i) => (
          <div
            key={tab}
            style={{
              ...styles.tab,
              ...(activeView === i ? styles.tabActive : {}),
            }}
            onClick={() => { clearAll(); runningRef.current = false; activateView(i); }}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* Views */}
      <div style={styles.viewArea}>
        {/* ─── VIEW 1: Overview ─── */}
        {activeView === 0 && (
          <div style={styles.view}>
            <div style={styles.kpiRow}>
              {KPI_DATA.map((k) => (
                <div key={k.lbl} style={styles.kpiCard}>
                  <div style={{ ...styles.kpiVal, color: k.color }}>{k.val}</div>
                  <div style={styles.kpiLbl}>{k.lbl}</div>
                  <div style={{ ...styles.kpiTrend, color: k.up ? "#047857" : "#EF4444" }}>{k.trend}</div>
                </div>
              ))}
            </div>

            <div style={styles.chartRow}>
              {/* Bar chart */}
              <div style={styles.chartBox}>
                <div style={styles.chartTitle}>Monthly Spend Trend (₹Cr)</div>
                <div style={styles.barsWrap}>
                  {SPEND_BARS.map((b) => (
                    <div key={b.month} style={styles.barCol}>
                      <div
                        className="sa-bar-fill"
                        data-h={b.h + "px"}
                        style={{ ...styles.barFill, background: b.color, height: "0px", transition: "height 0.9s cubic-bezier(.22,1,.36,1)" }}
                      />
                      <div style={styles.barMonthLbl}>{b.month}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Spend distribution */}
              <div style={styles.chartBox}>
                <div style={styles.chartTitle}>Spend Distribution</div>
                <div style={styles.donutWrap}>
                  <div style={styles.donutSvgWrap}>
                    <svg viewBox="0 0 36 36" style={{ width: 130, height: 130, transform: "rotate(-90deg)" }}>
                      <circle cx="18" cy="18" r="14" fill="none" stroke="#E0DDF5" strokeWidth="5" />
                      <circle cx="18" cy="18" r="14" fill="none" stroke="#3B82F6" strokeWidth="5" strokeDasharray="47 88" strokeDashoffset="0" />
                      <circle cx="18" cy="18" r="14" fill="none" stroke="#10B981" strokeWidth="5" strokeDasharray="22 88" strokeDashoffset="-47" />
                      <circle cx="18" cy="18" r="14" fill="none" stroke="#F59E0B" strokeWidth="5" strokeDasharray="11 88" strokeDashoffset="-69" />
                      <circle cx="18" cy="18" r="14" fill="none" stroke="#8482C8" strokeWidth="5" strokeDasharray="8 88" strokeDashoffset="-80" />
                    </svg>
                    <div style={styles.donutCenter}>
                      <div style={styles.donutVal}>₹82Cr</div>
                      <div style={styles.donutSub}>total</div>
                    </div>
                  </div>
                  <div style={styles.donutLegend}>
                    {[
                      { color: "#3B82F6", lbl: "Raw Materials 54%" },
                      { color: "#10B981", lbl: "Services 25%" },
                      { color: "#F59E0B", lbl: "Capex 13%" },
                      { color: "#8482C8", lbl: "Utilities 8%" },
                    ].map((l) => (
                      <div key={l.lbl} style={styles.legendItem}>
                        <div style={{ ...styles.legendDot, background: l.color }} />
                        <span style={styles.legendLbl}>{l.lbl}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─── VIEW 2: SLA & Performance ─── */}
        {activeView === 1 && (
          <div style={styles.view}>
            <div style={styles.chartRow}>
              {/* SLA gauges */}
              <div style={styles.chartBox}>
                <div style={styles.chartTitle}>SLA Compliance vs Target</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 20, flex: 1, justifyContent: "center" }}>
                  {SLA_GAUGES.map((g) => (
                    <div key={g.label}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                        <span style={styles.slaLabel}>{g.label}</span>
                        <span style={{ ...styles.slaVal, color: g.color }}>{g.val}%</span>
                      </div>
                      <div style={styles.gaugeTrack}>
                        <div
                          className="sa-gauge-fill"
                          data-w={g.val}
                          style={{ ...styles.gaugeFill, background: g.color, width: "0%", transition: "width 1.2s cubic-bezier(.22,1,.36,1)" }}
                        />
                      </div>
                      <div style={styles.gaugeFooter}>
                        <span style={styles.gaugeMeta}>Target: {g.target}</span>
                        <span style={{ ...styles.gaugeMeta, color: g.val >= parseInt(g.target) ? "#047857" : "#DC2626" }}>
                          {g.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery trend line */}
              <div style={styles.chartBox}>
                <div style={styles.chartTitle}>Delivery Performance Trend</div>
                <div style={{ flex: 1, minHeight: 100 }}>
                  <svg viewBox="0 0 280 90" style={{ width: "100%", height: "100%" }}>
                    <path d="M0,68 L56,58 L112,52 L168,38 L224,28 L280,18" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="5 3" />
                    <path d="M0,74 L56,70 L112,64 L168,56 L224,46 L280,36" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" />
                    <text x="6" y="15" fontSize="9" fill="#10B981" fontFamily="var(--fb)" fontWeight="700">On-Time %</text>
                    <text x="6" y="26" fontSize="9" fill="#3B82F6" fontFamily="var(--fb)">Fill Rate %</text>
                  </svg>
                </div>
                <div style={styles.chartTitle}>SLA Breach by Category</div>
                <div style={styles.breachBar}>
                  <div style={{ flex: 1.8, background: "#EF4444", borderRadius: "4px 0 0 4px" }} title="Delivery 35%" />
                  <div style={{ flex: 1.2, background: "#F59E0B" }} title="Invoice 24%" />
                  <div style={{ flex: 0.8, background: "#8482C8" }} title="Query 16%" />
                  <div style={{ flex: 1.2, background: "#E2E8F0", borderRadius: "0 4px 4px 0" }} title="None 25%" />
                </div>
                <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                  {[["#EF4444","Delivery 35%"],["#F59E0B","Invoice 24%"],["#8482C8","Query 16%"],["#94A3B8","None 25%"]].map(([c,l]) => (
                    <span key={l} style={{ fontSize: 11, color: c, fontWeight: 600 }}>● {l}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Performance table */}
            <div style={styles.perfTable}>
              <div style={styles.perfHdr}>
                {["Vendor", "On-Time %", "Lead Time", "Fill Rate", "Status"].map((h) => (
                  <div key={h} style={styles.perfHdrCell}>{h}</div>
                ))}
              </div>
              {PERF_ROWS.map((row, i) => (
                <div key={row.name} style={{ ...styles.perfRow, background: i === 0 ? "#F5F4FF" : "#fff" }}>
                  <div style={styles.perfName}>{row.name}</div>
                  <div style={styles.perfCell}>{row.onTime}</div>
                  <div style={styles.perfCell}>{row.lead}</div>
                  <div style={styles.perfCell}>{row.fill}</div>
                  <div style={styles.perfCell}>
                    <span style={{ ...styles.pill, ...pillStyle(row.pillCls) }}>{row.pill}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── VIEW 3: Compliance ─── */}
        {activeView === 2 && (
          <div style={styles.view}>
            <div style={styles.chartRow}>
              {/* Status cards */}
              <div style={styles.chartBox}>
                <div style={styles.chartTitle}>Compliance Status</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 18 }}>
                  {[
                    { n: "847", lbl: "Compliant",      bg: "#ECFDF5", bc: "rgba(16,185,129,.2)", tc: "#065F46", lc: "#10B981" },
                    { n: "143", lbl: "Pending",         bg: "#FEF3C7", bc: "rgba(245,158,11,.2)", tc: "#D97706", lc: "#F59E0B" },
                    { n: "97",  lbl: "Non-Compliant",   bg: "#FEF2F2", bc: "rgba(239,68,68,.2)",  tc: "#DC2626", lc: "#EF4444" },
                  ].map((s) => (
                    <div key={s.lbl} style={{ background: s.bg, border: `1.5px solid ${s.bc}`, borderRadius: 12, padding: "16px 10px", textAlign: "center" }}>
                      <div style={{ fontFamily: "var(--fb)", fontSize: 26, fontWeight: 800, color: s.tc }}>{s.n}</div>
                      <div style={{ fontSize: 10, fontWeight: 700, color: s.lc, textTransform: "uppercase", letterSpacing: "0.06em", marginTop: 4 }}>{s.lbl}</div>
                    </div>
                  ))}
                </div>
                <div style={styles.chartTitle}>Certification Status</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
                  {[
                    { n: "612", lbl: "ISO Certified",   bg: "#EFF6FF", bc: "#BFDBFE", tc: "#1D4ED8", lc: "#3B82F6" },
                    { n: "278", lbl: "Non-Certified",   bg: "#F5F4FF", bc: "#E0DDF5", tc: "#334155", lc: "#64748B" },
                    { n: "197", lbl: "Expired",          bg: "#FEF2F2", bc: "rgba(239,68,68,.2)", tc: "#DC2626", lc: "#EF4444" },
                  ].map((s) => (
                    <div key={s.lbl} style={{ background: s.bg, border: `1.5px solid ${s.bc}`, borderRadius: 10, padding: "12px 8px", textAlign: "center" }}>
                      <div style={{ fontSize: 20, fontWeight: 800, color: s.tc }}>{s.n}</div>
                      <div style={{ fontSize: 10, fontWeight: 700, color: s.lc, marginTop: 3 }}>{s.lbl}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Risk rings */}
              <div style={styles.chartBox}>
                <div style={styles.chartTitle}>Compliance Risk Heatmap</div>
                <div style={{ display: "flex", gap: 20, flex: 1, alignItems: "center", justifyContent: "center" }}>
                  {COMP_RINGS.map((r) => (
                    <div key={r.label} style={styles.ringCard}>
                      <div style={styles.ringLabel}>{r.label}</div>
                      <div style={styles.ringSvgWrap}>
                        <svg viewBox="0 0 36 36" style={{ width: 90, height: 90, transform: "rotate(-90deg)" }}>
                          <circle cx="18" cy="18" r="14" fill="none" stroke="#E0DDF5" strokeWidth="5" />
                          <circle
                            className="sa-ring-fill"
                            data-val={r.val}
                            cx="18" cy="18" r="14"
                            fill="none"
                            stroke={r.color}
                            strokeWidth="5"
                            strokeDasharray="0 88"
                          />
                        </svg>
                        <div style={styles.ringCenter}>
                          <div style={{ fontSize: 16, fontWeight: 800, color: r.color }}>{r.val}%</div>
                          <div style={{ fontSize: 9, color: "#94A3B8" }}>clear</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─── VIEW 4: Vendor Ratings ─── */}
        {activeView === 3 && (
          <div style={styles.view}>
            <div style={styles.ratingsHeader}>
              <span style={styles.ratingsTitle}>Top Vendor Scorecards — Q3 2025</span>
              <span style={styles.ratingsSub}>Ranked by composite performance score</span>
            </div>
            <div style={styles.vendorGrid}>
              {VENDOR_CARDS.map((v) => (
                <div key={v.id} id={v.id} style={styles.vendorCard}>
                  <div style={{ ...styles.vcRank, color: { gold: "#D97706", silver: "#64748B", bronze: "#B45309", risk: "#EF4444" }[v.rankClass] }}>
                    {v.rank}
                  </div>
                  <div style={styles.vcInfo}>
                    <div style={styles.vcName}>{v.name}</div>
                    <div style={styles.vcTags}>
                      {v.tags.map((tag) => (
                        <span key={tag} style={styles.vcTag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div style={styles.vcScore}>
                    <div style={{ ...styles.vcScoreVal, color: v.scoreColor }}>{v.score}</div>
                    <div style={styles.vcScoreBarTrack}>
                      <div
                        className="sa-vc-score-bar"
                        data-w={v.scoreW}
                        style={{
                          height: "100%", borderRadius: 100,
                          background: v.rankClass === "risk"
                            ? "linear-gradient(90deg,#EF4444,#F87171)"
                            : "linear-gradient(90deg,#10B981,#34D399)",
                          width: "0", transition: "width 1s ease",
                        }}
                      />
                    </div>
                    <div style={{ fontSize: 11, color: "#94A3B8", marginTop: 4 }}>Score / 10</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes livePulse{0%,100%{opacity:.5}50%{opacity:1}}
        .sa-bar-fill { transition: height 0.9s cubic-bezier(.22,1,.36,1); }
        .sa-gauge-fill { transition: width 1.2s cubic-bezier(.22,1,.36,1); }
        .sa-ring-fill { transition: stroke-dasharray 1.1s ease; }
      `}</style>
    </div>
  );
}

const styles = {
  root: {
    width: "100%", height: "100%", minHeight: 0,
    background: "#F5F7FF",
    fontFamily: "var(--fb)",
    display: "flex", flexDirection: "column",
    borderRadius: 0, overflow: "hidden",
  },
  header: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "18px 52px",
    background: "#EFF6FF",
    borderBottom: "1.5px solid #BFDBFE", flexShrink: 0,
  },
  headerLeft: { display: "flex", alignItems: "center", gap: 12 },
  headerDot: { width: 10, height: 10, borderRadius: "50%", background: "#3B82F6" },
  headerLabel: { fontSize: 12, fontWeight: 800, letterSpacing: "0.14em", color: "#1E40AF" },
  liveBadge: {
    display: "flex", alignItems: "center", gap: 8,
    background: "#ECFDF5", border: "1px solid rgba(16,185,129,0.3)",
    borderRadius: 100, padding: "6px 16px",
    fontSize: 13, fontWeight: 700, color: "#047857",
  },
  liveDot: {
    width: 7, height: 7, borderRadius: "50%", background: "#10B981",
    animation: "livePulse 1.8s ease-in-out infinite",
  },
  tabBar: {
    display: "flex", background: "#EFF6FF",
    borderBottom: "1.5px solid #BFDBFE",
    padding: "0 40px", flexShrink: 0,
  },
  tab: {
    padding: "13px 28px", fontSize: 13, fontWeight: 600,
    color: "#64748B", borderBottom: "2.5px solid transparent",
    cursor: "pointer", transition: "all 0.25s",
    whiteSpace: "nowrap",
  },
  tabActive: {
    color: "#1E1B4B", borderBottomColor: "#4A47A0", fontWeight: 700,
  },
  viewArea: {
    flex: 1, overflow: "hidden", background: "#fff",
    padding: "28px 44px",
  },
  view: { height: "100%", display: "flex", flexDirection: "column", gap: 20 },
  kpiRow: {
    display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 14, flexShrink: 0,
  },
  kpiCard: {
    background: "#F5F4FF", border: "1.5px solid #E0DDF5",
    borderRadius: 14, padding: "18px 16px",
  },
  kpiVal: {
    fontFamily: "var(--fb)",
    fontSize: 26, fontWeight: 800, letterSpacing: "-0.02em",
  },
  kpiLbl: { fontSize: 11, color: "#64748B", marginTop: 4, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" },
  kpiTrend: { fontSize: 12, fontWeight: 700, marginTop: 4 },
  chartRow: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, flex: 1, minHeight: 0 },
  chartBox: {
    background: "#F8F7FF", border: "1.5px solid #E0DDF5",
    borderRadius: 14, padding: "20px 22px",
    display: "flex", flexDirection: "column", gap: 12, overflow: "hidden",
  },
  chartTitle: {
    fontSize: 11, fontWeight: 700, color: "#64748B",
    textTransform: "uppercase", letterSpacing: "0.07em",
  },
  barsWrap: {
    display: "flex", alignItems: "flex-end", gap: 8, flex: 1, minHeight: 80,
    borderBottom: "1.5px solid #E0DDF5", paddingBottom: 6,
  },
  barCol: { display: "flex", flexDirection: "column", alignItems: "center", gap: 5, flex: 1 },
  barFill: { width: "100%", borderRadius: "4px 4px 0 0", minWidth: 0 },
  barMonthLbl: { fontSize: 10, color: "#94A3B8", fontWeight: 600 },
  donutWrap: { display: "flex", alignItems: "center", gap: 24, flex: 1 },
  donutSvgWrap: { position: "relative", flexShrink: 0 },
  donutCenter: {
    position: "absolute", inset: 0,
    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
  },
  donutVal: { fontFamily: "var(--fb)", fontSize: 14, fontWeight: 800, color: "#0F0D2E" },
  donutSub: { fontSize: 9, color: "#94A3B8" },
  donutLegend: { display: "flex", flexDirection: "column", gap: 8 },
  legendItem: { display: "flex", alignItems: "center", gap: 8 },
  legendDot: { width: 8, height: 8, borderRadius: "50%", flexShrink: 0 },
  legendLbl: { fontSize: 12, color: "#334155" },
  slaLabel: { fontSize: 12, fontWeight: 600, color: "#334155" },
  slaVal: { fontSize: 14, fontWeight: 800 },
  gaugeTrack: { height: 8, background: "#E0DDF5", borderRadius: 100, overflow: "hidden", marginBottom: 4 },
  gaugeFill: { height: "100%", borderRadius: 100 },
  gaugeFooter: { display: "flex", justifyContent: "space-between" },
  gaugeMeta: { fontSize: 11, color: "#94A3B8", fontWeight: 500 },
  breachBar: { display: "flex", gap: 2, height: 16, borderRadius: 6, overflow: "hidden" },
  perfTable: {
    background: "#F8F7FF", border: "1.5px solid #E0DDF5",
    borderRadius: 14, overflow: "hidden", flexShrink: 0,
  },
  perfHdr: {
    display: "grid", gridTemplateColumns: "1fr 100px 100px 100px 130px",
    background: "#EEEEF8", padding: "11px 20px",
    borderBottom: "1.5px solid #E0DDF5",
  },
  perfHdrCell: { fontSize: 10, fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.06em" },
  perfRow: {
    display: "grid", gridTemplateColumns: "1fr 100px 100px 100px 130px",
    padding: "13px 20px", borderBottom: "1px solid #E0DDF5",
    alignItems: "center",
  },
  perfName: { fontSize: 13, fontWeight: 700, color: "#0F0D2E" },
  perfCell: { fontSize: 12, color: "#334155", fontWeight: 500 },
  pill: {
    display: "inline-flex", padding: "3px 10px",
    borderRadius: 100, fontSize: 11, fontWeight: 700,
  },
  ringCard: {
    background: "#fff", border: "1.5px solid #E0DDF5", borderRadius: 14,
    padding: "20px 24px", display: "flex", flexDirection: "column",
    alignItems: "center", gap: 12, flex: 1,
  },
  ringLabel: { fontSize: 11, fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.08em" },
  ringSvgWrap: { position: "relative" },
  ringCenter: {
    position: "absolute", inset: 0,
    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
  },
  ratingsHeader: {
    display: "flex", alignItems: "baseline", gap: 16, flexShrink: 0,
  },
  ratingsTitle: {
    fontFamily: "var(--fb)",
    fontSize: 22, fontWeight: 800, color: "#0F0D2E",
  },
  ratingsSub: { fontSize: 13, color: "#94A3B8" },
  vendorGrid: { display: "flex", flexDirection: "column", gap: 14, flex: 1, justifyContent: "center" },
  vendorCard: {
    display: "grid", gridTemplateColumns: "52px 1fr auto",
    gap: 18, alignItems: "center",
    background: "#F8F7FF", border: "1.5px solid #E0DDF5",
    borderRadius: 16, padding: "20px 24px",
  },
  vcRank: { fontSize: 26, textAlign: "center" },
  vcInfo: { minWidth: 0 },
  vcName: { fontSize: 16, fontWeight: 800, color: "#0F0D2E", marginBottom: 6 },
  vcTags: { display: "flex", gap: 6 },
  vcTag: {
    fontSize: 11, fontWeight: 600, padding: "2px 10px",
    borderRadius: 100, background: "#EEEEF8", color: "#1E1B4B",
  },
  vcScore: { display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, minWidth: 120 },
  vcScoreVal: {
    fontFamily: "var(--fb)",
    fontSize: 28, fontWeight: 800, letterSpacing: "-0.02em",
  },
  vcScoreBarTrack: { width: 100, height: 5, background: "#E0DDF5", borderRadius: 100, overflow: "hidden" },
};
