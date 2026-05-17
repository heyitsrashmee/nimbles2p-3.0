import { useEffect, useRef, useCallback } from "react";

const CHECKS = [
  { id: "pan",  label: "PAN Verification" },
  { id: "cin",  label: "CIN / ROC Check" },
  { id: "gst",  label: "GST Active Status" },
  { id: "msme", label: "MSME Registration" },
  { id: "itr",  label: "ITR Returns Filed" },
  { id: "epf",  label: "EPF Compliance" },
];

export default function CompliancePortal() {
  const timersRef = useRef([]);

  const clearAll = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const t = useCallback((fn, delay) => {
    const id = setTimeout(fn, delay);
    timersRef.current.push(id);
  }, []);

  const setStep = useCallback((n, state) => {
    const el = document.getElementById(`cpStep${n}`);
    if (!el) return;
    el.className = `cp-step-node ${state}`;
    if (state === "done") el.textContent = "✓";
    else el.textContent = String(n);
  }, []);

  const setLine = useCallback((n, filled) => {
    const el = document.getElementById(`cpLine${n}`);
    if (!el) return;
    el.style.transition = filled ? "width 0.6s ease" : "none";
    el.style.width = filled ? "100%" : "0%";
  }, []);

  const setCheck = useCallback((id, state) => {
    const row = document.getElementById(`cpChk-${id}`);
    if (!row) return;
    row.className = `cp-check-item ${state}`;
    const icon = row.querySelector(".cp-ci-icon");
    if (icon) {
      if (state === "checking") icon.textContent = "⟳";
      else if (state === "done") icon.textContent = "✓";
      else icon.textContent = "·";
    }
    const statusEl = row.querySelector(".cp-ci-status");
    if (statusEl) {
      if (state === "checking") statusEl.textContent = "Checking…";
      else if (state === "done") statusEl.textContent = "Verified";
      else statusEl.textContent = "Pending";
    }
  }, []);

  const run = useCallback(() => {
    clearAll();

    // Reset
    [1, 2, 3, 4].forEach((n) => setStep(n, n === 1 ? "active" : ""));
    [1, 2, 3].forEach((n) => setLine(n, false));
    CHECKS.forEach((c) => setCheck(c.id, ""));
    const badge = document.getElementById("cpCountryBadge");
    if (badge) badge.style.opacity = "0";
    const popup = document.getElementById("cpPopup");
    if (popup) popup.style.opacity = "0";
    if (popup) popup.style.pointerEvents = "none";

    // Country badge appears
    t(() => {
      const b = document.getElementById("cpCountryBadge");
      if (b) b.style.opacity = "1";
    }, 600);

    // Step 1 → 2
    t(() => {
      setStep(1, "done");
      setLine(1, true);
      setStep(2, "active");
    }, 1400);

    // Checks run sequentially
    CHECKS.forEach((c, i) => {
      t(() => setCheck(c.id, "checking"), 1700 + i * 380);
      t(() => setCheck(c.id, "done"), 1700 + i * 380 + 520);
    });

    // Step 2 → 3
    t(() => {
      setStep(2, "done");
      setLine(2, true);
      setStep(3, "active");
    }, 4200);

    // Step 3 → 4
    t(() => {
      setStep(3, "done");
      setLine(3, true);
      setStep(4, "active");
    }, 5100);

    // Popup
    t(() => {
      const p = document.getElementById("cpPopup");
      if (p) { p.style.opacity = "1"; p.style.pointerEvents = "auto"; }
    }, 5600);

    // Loop
    t(() => run(), 8800);
  }, [clearAll, t, setStep, setLine, setCheck]);

  useEffect(() => {
    const id = setTimeout(run, 400);
    return () => { clearTimeout(id); clearAll(); };
  }, [run, clearAll]);

  return (
    <div style={styles.root}>
      {/* Header strip */}
      <div style={styles.headerStrip}>
        <div style={styles.headerLeft}>
          <div style={styles.headerDot} />
          <span style={styles.headerLabel}>AI-POWERED COMPLIANCE</span>
        </div>
        <div style={styles.liveChip}>
          <div style={styles.liveDot} />
          <span>Live Verification</span>
        </div>
      </div>

      {/* Main content */}
      <div style={styles.main}>
        {/* Left: step flow */}
        <div style={styles.leftPanel}>
          <div style={styles.leftTitle}>Vendor Onboarding</div>
          <div style={styles.leftSub}>Statutory checks running live against government databases</div>

          {/* Step progress */}
          <div style={styles.stepsRow}>
            {[1, 2, 3, 4].map((n, i) => (
              <div key={n} style={styles.stepGroup}>
                <div id={`cpStep${n}`} className="cp-step-node" style={styles.stepNodeBase}>
                  {n}
                </div>
                {i < 3 && (
                  <div style={styles.stepLineWrap}>
                    <div id={`cpLine${n}`} style={{ ...styles.stepLineFill, width: "0%" }} />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div style={styles.stepLabels}>
            {["Select Country", "Run Checks", "Risk Score", "Approved"].map((lbl) => (
              <div key={lbl} style={styles.stepLabel}>{lbl}</div>
            ))}
          </div>

          {/* Country selector */}
          <div style={styles.countryCard}>
            <div style={styles.countryFlag}>🇮🇳</div>
            <div>
              <div style={styles.countryName}>India</div>
              <div style={styles.countryCode}>ISO 3166-1 · IN</div>
            </div>
            <div
              id="cpCountryBadge"
              style={{ ...styles.countryBadge, opacity: 0, transition: "opacity 0.4s" }}
            >
              ✓ Selected
            </div>
          </div>

          {/* Stats row */}
          <div style={styles.statsRow}>
            {[
              { val: "12+", lbl: "Statutory APIs" },
              { val: "< 4s", lbl: "Avg Check Time" },
              { val: "100%", lbl: "Govt DB Verified" },
            ].map((s) => (
              <div key={s.lbl} style={styles.statCard}>
                <div style={styles.statVal}>{s.val}</div>
                <div style={styles.statLbl}>{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: checks grid */}
        <div style={styles.rightPanel}>
          <div style={styles.checksHeader}>
            <span style={styles.checksTitle}>Running Compliance Checks</span>
            <span style={styles.checksCount}>{CHECKS.length} checks</span>
          </div>

          <div style={styles.checksGrid}>
            {CHECKS.map((c) => (
              <div key={c.id} id={`cpChk-${c.id}`} className="cp-check-item" style={styles.checkItemBase}>
                <div className="cp-ci-icon" style={styles.checkIcon}>·</div>
                <div style={{ flex: 1 }}>
                  <div style={styles.checkLabel}>{c.label}</div>
                  <div className="cp-ci-status" style={styles.checkStatus}>Pending</div>
                </div>
                <div style={styles.checkArrow}>›</div>
              </div>
            ))}
          </div>

          {/* Completion popup */}
          <div
            id="cpPopup"
            style={{
              ...styles.popup,
              opacity: 0,
              pointerEvents: "none",
              transition: "opacity 0.4s",
            }}
          >
            <div style={styles.popupCard}>
              <div style={styles.popupIconWrap}>
                <span style={{ fontSize: 40 }}>🔍</span>
              </div>
              <div style={styles.popupTitle}>All Checks Passed</div>
              <div style={styles.popupBody}>
                Vendor cleared across all 6 statutory checks. Proceed with financial due diligence?
              </div>
              <div style={styles.popupBadgesRow}>
                <span style={styles.popupBadgeGreen}>✓ GST Active</span>
                <span style={styles.popupBadgeGreen}>✓ PAN Valid</span>
                <span style={styles.popupBadgeGreen}>✓ CIN Registered</span>
              </div>
              <div style={styles.popupActions}>
                <button
                  style={styles.popupBtnPrimary}
                  onClick={() => {
                    const p = document.getElementById("cpPopup");
                    if (p) { p.style.opacity = "0"; p.style.pointerEvents = "none"; }
                    clearAll();
                    setTimeout(run, 800);
                  }}
                >
                  Yes, Proceed →
                </button>
                <button
                  style={styles.popupBtnSecondary}
                  onClick={() => {
                    const p = document.getElementById("cpPopup");
                    if (p) { p.style.opacity = "0"; p.style.pointerEvents = "none"; }
                    clearAll();
                    setTimeout(run, 800);
                  }}
                >
                  Skip for now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .cp-step-node {
          width: 44px; height: 44px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 15px; font-weight: 800; flex-shrink: 0;
          transition: all 0.4s; z-index: 1;
          background: #E0DDF5; color: #7C75C9;
          border: 2px solid #C4BFED;
        }
        .cp-step-node.active {
          background: #1E1B4B; color: #fff;
          border-color: #1E1B4B;
          box-shadow: 0 0 0 6px rgba(30,27,75,0.12);
        }
        .cp-step-node.done {
          background: #10B981; color: #fff; border-color: #10B981;
        }
        .cp-check-item {
          display: flex; align-items: center; gap: 16px;
          border: 1.5px solid #E0DDF5; border-radius: 14px;
          padding: 18px 20px; background: #fff;
          transition: all 0.4s;
        }
        .cp-check-item.checking {
          border-color: #4A47A0; background: #F5F4FF;
        }
        .cp-check-item.checking .cp-ci-icon {
          background: rgba(245,158,11,0.15); color: #D97706;
          animation: cpSpin 0.8s linear infinite;
        }
        .cp-check-item.done {
          border-color: rgba(16,185,129,0.4); background: rgba(16,185,129,0.05);
        }
        .cp-check-item.done .cp-ci-icon {
          background: #ECFDF5; color: #047857;
        }
        .cp-check-item.done .cp-ci-status { color: #047857; }
        .cp-check-item.checking .cp-ci-status { color: #D97706; }
        .cp-ci-icon {
          width: 36px; height: 36px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 16px; flex-shrink: 0;
          background: #E0DDF5; color: #7C75C9;
          transition: all 0.4s; font-weight: 700;
        }
        @keyframes cpSpin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

const W = 1394;
const H = 732;

const styles = {
  root: {
    width: W, height: H,
    background: "linear-gradient(145deg, #F5F4FF 0%, #EDEAFF 100%)",
    fontFamily: "'Inter', system-ui, sans-serif",
    display: "flex", flexDirection: "column",
    position: "relative", overflow: "hidden",
    borderRadius: 20,
  },
  headerStrip: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "22px 56px",
    background: "#fff",
    borderBottom: "1.5px solid #E0DDF5",
    flexShrink: 0,
  },
  headerLeft: { display: "flex", alignItems: "center", gap: 12 },
  headerDot: {
    width: 10, height: 10, borderRadius: "50%", background: "#4A47A0",
  },
  headerLabel: {
    fontSize: 12, fontWeight: 800, letterSpacing: "0.16em",
    color: "#1E1B4B",
  },
  liveChip: {
    display: "flex", alignItems: "center", gap: 7,
    background: "#ECFDF5", border: "1px solid rgba(16,185,129,0.3)",
    borderRadius: 100, padding: "5px 14px",
    fontSize: 12, fontWeight: 700, color: "#047857",
  },
  liveDot: {
    width: 7, height: 7, borderRadius: "50%", background: "#10B981",
    animation: "pulse 1.8s ease-in-out infinite",
  },
  main: {
    display: "grid", gridTemplateColumns: "420px 1fr",
    flex: 1, overflow: "hidden",
  },
  leftPanel: {
    borderRight: "1.5px solid #E0DDF5",
    background: "#fff",
    padding: "44px 44px",
    display: "flex", flexDirection: "column", gap: 28,
  },
  leftTitle: {
    fontFamily: "'Outfit', system-ui, sans-serif",
    fontSize: 28, fontWeight: 800, color: "#0F0D2E", letterSpacing: "-0.02em",
  },
  leftSub: {
    fontSize: 15, color: "#64748B", lineHeight: 1.65, marginTop: -16,
  },
  stepsRow: {
    display: "flex", alignItems: "center",
  },
  stepGroup: {
    display: "flex", alignItems: "center", flex: 1,
  },
  stepNodeBase: {},
  stepLineWrap: {
    flex: 1, height: 3, background: "#E0DDF5",
    borderRadius: 2, overflow: "hidden", marginLeft: -1,
  },
  stepLineFill: {
    height: "100%", background: "#10B981",
    borderRadius: 2, width: "0%",
  },
  stepLabels: {
    display: "flex", justifyContent: "space-between",
    marginTop: -20,
  },
  stepLabel: {
    fontSize: 11, fontWeight: 600, color: "#94A3B8",
    textAlign: "center", width: 44,
  },
  countryCard: {
    display: "flex", alignItems: "center", gap: 16,
    border: "2px solid #C4BFED", borderRadius: 14,
    padding: "18px 20px", background: "#F5F4FF",
  },
  countryFlag: { fontSize: 32, flexShrink: 0 },
  countryName: { fontSize: 18, fontWeight: 800, color: "#0F0D2E" },
  countryCode: { fontSize: 12, color: "#94A3B8", marginTop: 2 },
  countryBadge: {
    marginLeft: "auto",
    background: "#ECFDF5", color: "#047857",
    border: "1px solid rgba(16,185,129,0.3)",
    borderRadius: 100, padding: "5px 14px",
    fontSize: 12, fontWeight: 700,
  },
  statsRow: {
    display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12,
    marginTop: "auto",
  },
  statCard: {
    background: "#F5F4FF", border: "1.5px solid #E0DDF5",
    borderRadius: 12, padding: "16px 12px", textAlign: "center",
  },
  statVal: {
    fontFamily: "'Outfit', system-ui, sans-serif",
    fontSize: 22, fontWeight: 800, color: "#1E1B4B",
    letterSpacing: "-0.02em",
  },
  statLbl: { fontSize: 11, color: "#64748B", marginTop: 4, fontWeight: 600 },
  rightPanel: {
    padding: "44px 52px",
    display: "flex", flexDirection: "column", gap: 24,
    position: "relative",
  },
  checksHeader: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
  },
  checksTitle: {
    fontFamily: "'Outfit', system-ui, sans-serif",
    fontSize: 22, fontWeight: 800, color: "#0F0D2E",
  },
  checksCount: {
    fontSize: 13, fontWeight: 700, color: "#94A3B8",
    background: "#F1F5F9", borderRadius: 100, padding: "4px 12px",
  },
  checksGrid: {
    display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, flex: 1,
  },
  checkItemBase: {},
  checkIcon: {},
  checkLabel: { fontSize: 14, fontWeight: 700, color: "#1E293B" },
  checkStatus: { fontSize: 12, color: "#94A3B8", marginTop: 3, fontWeight: 500 },
  checkArrow: { fontSize: 20, color: "#CBD5E1", flexShrink: 0 },
  popup: {
    position: "absolute", inset: 0,
    background: "rgba(30,27,75,0.12)",
    backdropFilter: "blur(8px)",
    display: "flex", alignItems: "center", justifyContent: "center",
    borderRadius: "0 0 20px 0",
  },
  popupCard: {
    background: "#fff", borderRadius: 20,
    padding: "44px 48px", width: 460, textAlign: "center",
    boxShadow: "0 32px 80px rgba(30,27,75,0.22)",
    border: "1.5px solid #E0DDF5",
    transform: "scale(1)",
  },
  popupIconWrap: { marginBottom: 16 },
  popupTitle: {
    fontFamily: "'Outfit', system-ui, sans-serif",
    fontSize: 24, fontWeight: 800, color: "#0F0D2E", marginBottom: 10,
  },
  popupBody: {
    fontSize: 14, color: "#64748B", lineHeight: 1.65, marginBottom: 20,
  },
  popupBadgesRow: {
    display: "flex", gap: 8, justifyContent: "center", marginBottom: 28, flexWrap: "wrap",
  },
  popupBadgeGreen: {
    background: "#ECFDF5", color: "#047857",
    border: "1px solid rgba(16,185,129,0.3)",
    borderRadius: 100, padding: "4px 12px",
    fontSize: 12, fontWeight: 700,
  },
  popupActions: { display: "flex", gap: 12, justifyContent: "center" },
  popupBtnPrimary: {
    background: "#1E1B4B", color: "#fff", border: "none",
    borderRadius: 10, padding: "12px 28px",
    fontSize: 14, fontWeight: 700, cursor: "pointer",
    fontFamily: "inherit",
  },
  popupBtnSecondary: {
    background: "transparent", color: "#64748B",
    border: "1.5px solid #E2E8F0",
    borderRadius: 10, padding: "11px 22px",
    fontSize: 14, fontWeight: 600, cursor: "pointer",
    fontFamily: "inherit",
  },
};
