"use client";

import { useEffect, useRef, useCallback } from "react";

const TASKS = [
  { id: "invT1", icon: "🔍", label: "OCR Text Extraction",     runText: "Extracting fields…", doneText: "Complete", delay: 0 },
  { id: "invT2", icon: "📷", label: "QR / Barcode Verification", runText: "Checking QR code…", doneText: "Verified",  delay: 950 },
  { id: "invT3", icon: "🔄", label: "Duplicate Detection",      runText: "Scanning history…",  doneText: "No Duplicate", delay: 1900 },
  { id: "invT4", icon: "🏷", label: "Auto Classification",      runText: "Classifying…",        doneText: "Classified",   delay: 2850 },
];

const SCREENS = ["invS1", "invS2", "invS3", "invS4"];

export default function InvoiceProcessing() {
  const timersRef = useRef([]);
  const barIntervalRef = useRef(null);

  const clearAll = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    if (barIntervalRef.current) { clearInterval(barIntervalRef.current); barIntervalRef.current = null; }
  }, []);

  const t = useCallback((fn, delay) => {
    const id = setTimeout(fn, delay);
    timersRef.current.push(id);
  }, []);

  const showScreen = useCallback((id) => {
    SCREENS.forEach((s) => {
      const el = document.getElementById(s);
      if (el) el.style.display = "none";
    });
    const el = document.getElementById(id);
    if (el) el.style.display = "flex";
  }, []);

  const setTask = useCallback((taskId, state, statusText) => {
    const el = document.getElementById(taskId);
    if (!el) return;
    el.className = `inv-task ${state || ""}`;
    const st = el.querySelector(".inv-task-status");
    if (st) st.textContent = statusText;
  }, []);

  const animateBar = useCallback((onDone) => {
    const bar = document.getElementById("invBar");
    const pct = document.getElementById("invPct");
    if (!bar || !pct) { onDone(); return; }
    let val = 0;
    barIntervalRef.current = setInterval(() => {
      val += Math.random() * 9 + 4;
      if (val >= 100) {
        val = 100;
        clearInterval(barIntervalRef.current);
        barIntervalRef.current = null;
        setTimeout(onDone, 300);
      }
      bar.style.width = Math.min(val, 100).toFixed(0) + "%";
      if (pct) pct.textContent = Math.floor(Math.min(val, 100)) + "%";
    }, 75);
  }, []);

  const resetAll = useCallback(() => {
    TASKS.forEach((task) => setTask(task.id, "", "Waiting"));
    ["invM1", "invM2", "invM3"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) { el.style.opacity = "0.35"; el.style.transform = "translateX(-6px)"; }
    });
    const bar = document.getElementById("invBar");
    if (bar) bar.style.width = "0%";
    const pct = document.getElementById("invPct");
    if (pct) pct.textContent = "0%";
  }, [setTask]);

  const run = useCallback(() => {
    clearAll();
    resetAll();
    showScreen("invS1");

    t(() => {
      const btn = document.getElementById("invUploadBtn");
      if (btn) { btn.style.transform = "scale(0.95)"; setTimeout(() => { if (btn) btn.style.transform = ""; }, 200); }
      t(() => {
        showScreen("invS2");
        t(() => {
          animateBar(() => {
            showScreen("invS3");

            TASKS.forEach((task) => {
              t(() => setTask(task.id, "running", task.runText), task.delay);
              t(() => setTask(task.id, "done", task.doneText), task.delay + 700);
            });

            t(() => {
              showScreen("invS4");
              const showMatch = (id, delay) =>
                t(() => {
                  const el = document.getElementById(id);
                  if (el) {
                    el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
                    el.style.opacity = "1";
                    el.style.transform = "translateX(0)";
                  }
                }, delay);
              showMatch("invM1", 350);
              showMatch("invM2", 1100);
              showMatch("invM3", 2000);
              t(() => { clearAll(); setTimeout(run, 1400); }, 5400);
            }, 4300);
          });
        }, 400);
      }, 420);
    }, 1400);
  }, [clearAll, resetAll, showScreen, t, animateBar, setTask]);

  useEffect(() => {
    const id = setTimeout(run, 500);
    return () => { clearTimeout(id); clearAll(); };
  }, [run, clearAll]);

  return (
    <div style={styles.root}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <div style={styles.headerDot} />
          <span style={styles.headerLabel}>INVOICE PROCESSING — AI ENGINE</span>
        </div>
        <div style={styles.ocrBadge}>⚡ OCR + 3-Way Match</div>
      </div>

      {/* Body */}
      <div style={styles.body}>
        {/* Left: info + stats */}
        <div style={styles.leftPanel}>
          <div style={styles.leftTitle}>Zero-Touch Processing</div>
          <div style={styles.leftSub}>
            Upload once. AI extracts, validates, matches PO &amp; GRN — and accepts in seconds.
          </div>

          <div style={styles.statsGrid}>
            {[
              { val: "< 4s",  lbl: "Avg Processing Time",   color: "#1E1B4B" },
              { val: "99.2%", lbl: "Extraction Accuracy",    color: "#047857" },
              { val: "100%",  lbl: "Auto 3-Way Match",       color: "#1E40AF" },
              { val: "0",     lbl: "Manual Interventions",   color: "#D97706" },
            ].map((s) => (
              <div key={s.lbl} style={styles.statCard}>
                <div style={{ ...styles.statVal, color: s.color }}>{s.val}</div>
                <div style={styles.statLbl}>{s.lbl}</div>
              </div>
            ))}
          </div>

          <div style={styles.workflowBox}>
            <div style={styles.workflowTitle}>Processing Pipeline</div>
            {["Upload PDF", "OCR Extraction", "Validation & Dedup", "3-Way Match", "Auto Accept"].map((step, i, arr) => (
              <div key={step} style={styles.workflowStep}>
                <div style={styles.workflowDot}>
                  <div style={{ ...styles.workflowDotInner, background: i < 2 ? "#4A47A0" : i < 4 ? "#F59E0B" : "#10B981" }} />
                </div>
                <div style={styles.workflowLabel}>{step}</div>
                {i < arr.length - 1 && <div style={styles.workflowLine} />}
              </div>
            ))}
          </div>
        </div>

        {/* Right: animated screens */}
        <div style={styles.rightPanel}>
          {/* S1: Upload prompt */}
          <div id="invS1" style={{ ...styles.screen, ...styles.s1 }}>
            <div style={styles.s1Icon}>📄</div>
            <div style={styles.s1Title}>Ready to process your invoice</div>
            <div style={styles.s1Sub}>Drag &amp; drop or upload PDF — AI handles the rest</div>
            <button id="invUploadBtn" style={styles.s1Btn}>
              ⬆ Upload Invoice
            </button>
          </div>

          {/* S2: Upload progress */}
          <div id="invS2" style={{ ...styles.screen, ...styles.s2, display: "none" }}>
            <div style={styles.pdfCard}>
              <div style={styles.pdfIcon}>
                <span style={{ fontSize: 11, fontWeight: 800, color: "#fff", letterSpacing: "0.04em" }}>PDF</span>
                <div style={styles.pdfCorner} />
              </div>
              <div>
                <div style={styles.pdfName}>INV-0091_PrecisionParts.pdf</div>
                <div style={styles.pdfSize}>342 KB · Uploading…</div>
              </div>
            </div>
            <div style={styles.barWrap}>
              <div style={styles.barTrack}>
                <div id="invBar" style={styles.barFill} />
              </div>
              <div id="invPct" style={styles.barPct}>0%</div>
            </div>
            <div style={styles.uploadingNote}>Scanning for OCR, QR, and metadata…</div>
          </div>

          {/* S3: Extraction tasks */}
          <div id="invS3" style={{ ...styles.screen, ...styles.s3, display: "none" }}>
            <div style={styles.s3Title}>Processing Invoice…</div>
            <div style={styles.tasks}>
              {TASKS.map((task) => (
                <div key={task.id} id={task.id} className="inv-task" style={styles.taskBase}>
                  <div className="inv-task-icon" style={styles.taskIcon}>{task.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={styles.taskLabel}>{task.label}</div>
                  </div>
                  <div className="inv-task-status" style={styles.taskStatus}>Waiting</div>
                </div>
              ))}
            </div>
          </div>

          {/* S4: Match results */}
          <div id="invS4" style={{ ...styles.screen, ...styles.s4, display: "none" }}>
            <div style={styles.s4Header}>
              <span style={{ fontSize: 26 }}>⚡</span>
              <span style={styles.s4Title}>3-Way Match Results</span>
            </div>
            <div style={styles.matches}>
              <div id="invM1" style={{ ...styles.matchRow, ...styles.matchOk, opacity: 0.35, transform: "translateX(-6px)" }}>
                <div style={{ ...styles.matchIconWrap, background: "#ECFDF5" }}>✅</div>
                <div style={styles.matchContent}>
                  <div style={styles.matchLabel}>PO Matched</div>
                  <div style={styles.matchSub}>PO-4401 · ₹5.5L</div>
                </div>
                <div style={{ ...styles.matchBadge, background: "#ECFDF5", color: "#047857", border: "1px solid rgba(16,185,129,0.3)" }}>✓ Matched</div>
              </div>
              <div id="invM2" style={{ ...styles.matchRow, ...styles.matchOk, opacity: 0.35, transform: "translateX(-6px)" }}>
                <div style={{ ...styles.matchIconWrap, background: "#EFF6FF" }}>🚚</div>
                <div style={styles.matchContent}>
                  <div style={styles.matchLabel}>GRN Matched</div>
                  <div style={styles.matchSub}>GRN-0314 · 200 units</div>
                </div>
                <div style={{ ...styles.matchBadge, background: "#EFF6FF", color: "#1D4ED8", border: "1px solid rgba(59,130,246,0.3)" }}>✓ Matched</div>
              </div>
              <div id="invM3" style={{ ...styles.matchRow, ...styles.matchAccept, opacity: 0.35, transform: "translateX(-6px)" }}>
                <div style={{ ...styles.matchIconWrap, background: "#EEEEF8" }}>🎯</div>
                <div style={styles.matchContent}>
                  <div style={{ ...styles.matchLabel, color: "#1E1B4B" }}>Invoice Accepted</div>
                  <div style={{ ...styles.matchSub, color: "#4A47A0" }}>INV-0091 · ₹4.8L — Queued for payment</div>
                </div>
                <div style={{ ...styles.matchBadge, background: "#1E1B4B", color: "#fff", border: "none", fontSize: 13, padding: "6px 18px" }}>Accepted for Payment</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .inv-task {
          display: flex; align-items: center; gap: 18px;
          border: 2px solid #E0DDF5; border-radius: 16px;
          padding: 20px 24px; background: #fff;
          transition: all 0.4s;
        }
        .inv-task.running {
          border-color: #4A47A0; background: #F5F4FF;
        }
        .inv-task.running .inv-task-icon {
          background: rgba(245,158,11,0.15); color: #D97706;
          animation: invSpin 0.8s linear infinite;
        }
        .inv-task.running .inv-task-status { color: #4A47A0; font-weight: 700; }
        .inv-task.done {
          border-color: rgba(16,185,129,0.35); background: rgba(16,185,129,0.04);
        }
        .inv-task.done .inv-task-icon { background: #ECFDF5; color: #047857; }
        .inv-task.done .inv-task-status { color: #047857; font-weight: 700; }
        .inv-task-icon {
          width: 44px; height: 44px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          font-size: 20px; flex-shrink: 0;
          background: #E0DDF5; transition: all 0.4s;
        }
        @keyframes invSpin { to { transform: rotate(360deg); } }
        @keyframes invPulse {
          0%,100%{ box-shadow: 0 6px 20px rgba(30,27,75,0.3); }
          50%{ box-shadow: 0 6px 28px rgba(30,27,75,0.5), 0 0 0 6px rgba(30,27,75,0.08); }
        }
      `}</style>
    </div>
  );
}

const W = 1394;
const H = 732;

const styles = {
  root: {
    width: W, height: H,
    background: "#F5F3FF",
    fontFamily: "'Inter', system-ui, sans-serif",
    display: "flex", flexDirection: "column",
    borderRadius: 20, overflow: "hidden",
  },
  header: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "18px 52px",
    background: "#fff",
    borderBottom: "1.5px solid #E0DDF5", flexShrink: 0,
  },
  headerLeft: { display: "flex", alignItems: "center", gap: 12 },
  headerDot: { width: 10, height: 10, borderRadius: "50%", background: "#4A47A0" },
  headerLabel: { fontSize: 12, fontWeight: 800, letterSpacing: "0.14em", color: "#1E1B4B" },
  ocrBadge: {
    fontSize: 13, fontWeight: 700, color: "#4A47A0",
    background: "#EEEEF8", border: "1px solid rgba(30,27,75,0.15)",
    borderRadius: 100, padding: "6px 16px",
  },
  body: { display: "grid", gridTemplateColumns: "400px 1fr", flex: 1, overflow: "hidden" },
  leftPanel: {
    borderRight: "1.5px solid #E0DDF5",
    background: "#fff",
    padding: "40px 38px",
    display: "flex", flexDirection: "column", gap: 28, overflow: "auto",
  },
  leftTitle: {
    fontFamily: "'Outfit', system-ui, sans-serif",
    fontSize: 26, fontWeight: 800, color: "#0F0D2E", letterSpacing: "-0.02em",
  },
  leftSub: { fontSize: 14, color: "#64748B", lineHeight: 1.65, marginTop: -14 },
  statsGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 },
  statCard: {
    background: "#F5F4FF", border: "1.5px solid #E0DDF5",
    borderRadius: 14, padding: "18px 16px",
  },
  statVal: {
    fontFamily: "'Outfit', system-ui, sans-serif",
    fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em",
  },
  statLbl: { fontSize: 11, color: "#64748B", marginTop: 4, fontWeight: 600 },
  workflowBox: {
    background: "#F5F4FF", border: "1.5px solid #E0DDF5",
    borderRadius: 14, padding: "20px 22px",
    display: "flex", flexDirection: "column", gap: 0,
  },
  workflowTitle: {
    fontSize: 11, fontWeight: 700, color: "#64748B",
    textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16,
  },
  workflowStep: { display: "flex", alignItems: "center", gap: 12, position: "relative" },
  workflowDot: {
    width: 20, height: 20, borderRadius: "50%",
    display: "flex", alignItems: "center", justifyContent: "center",
    flexShrink: 0, background: "#fff", border: "2px solid #E0DDF5",
  },
  workflowDotInner: { width: 8, height: 8, borderRadius: "50%" },
  workflowLabel: { fontSize: 13, fontWeight: 600, color: "#334155", padding: "8px 0" },
  workflowLine: {
    display: "none",
  },
  rightPanel: {
    padding: "44px 52px",
    display: "flex", flexDirection: "column", position: "relative",
  },
  screen: { flex: 1, display: "flex", flexDirection: "column", gap: 20 },
  s1: { alignItems: "center", justifyContent: "center" },
  s1Icon: { fontSize: 68, lineHeight: 1 },
  s1Title: {
    fontFamily: "'Outfit', system-ui, sans-serif",
    fontSize: 28, fontWeight: 800, color: "#0F0D2E", textAlign: "center",
  },
  s1Sub: { fontSize: 15, color: "#64748B", textAlign: "center", lineHeight: 1.65 },
  s1Btn: {
    background: "linear-gradient(135deg,#1E1B4B,#4A47A0)",
    color: "#fff", border: "none", borderRadius: 12,
    padding: "16px 40px", fontSize: 16, fontWeight: 700,
    cursor: "pointer", fontFamily: "inherit",
    animation: "invPulse 2s ease-in-out infinite",
    transition: "transform 0.2s",
  },
  s2: { alignItems: "center", justifyContent: "center" },
  pdfCard: {
    display: "flex", alignItems: "center", gap: 18,
    background: "#F5F4FF", border: "2px solid #E0DDF5",
    borderRadius: 16, padding: "20px 24px",
    width: "100%", maxWidth: 420,
  },
  pdfIcon: {
    width: 52, height: 62, background: "linear-gradient(135deg,#EF4444,#DC2626)",
    borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
    flexShrink: 0, position: "relative",
  },
  pdfCorner: {
    position: "absolute", top: 0, right: 0, width: 14, height: 14,
    background: "rgba(255,255,255,0.25)", borderRadius: "0 8px 0 8px",
  },
  pdfName: { fontSize: 14, fontWeight: 700, color: "#0F0D2E" },
  pdfSize: { fontSize: 12, color: "#94A3B8", marginTop: 3 },
  barWrap: { width: "100%", maxWidth: 420, display: "flex", flexDirection: "column", gap: 6 },
  barTrack: { height: 6, background: "#E0DDF5", borderRadius: 100, overflow: "hidden" },
  barFill: {
    height: "100%", width: "0%",
    background: "linear-gradient(90deg,#4A47A0,#8482C8)",
    borderRadius: 100, transition: "none",
  },
  barPct: { fontSize: 12, fontWeight: 700, color: "#4A47A0", textAlign: "right" },
  uploadingNote: { fontSize: 13, color: "#94A3B8", fontStyle: "italic" },
  s3: { justifyContent: "flex-start" },
  s3Title: {
    fontFamily: "'Outfit', system-ui, sans-serif",
    fontSize: 22, fontWeight: 800, color: "#0F0D2E",
  },
  tasks: { display: "flex", flexDirection: "column", gap: 14, flex: 1, justifyContent: "center" },
  taskBase: {},
  taskIcon: {},
  taskLabel: { fontSize: 15, fontWeight: 700, color: "#1E293B" },
  taskStatus: { fontSize: 13, color: "#94A3B8", flexShrink: 0, minWidth: 100, textAlign: "right" },
  s4: { justifyContent: "flex-start" },
  s4Header: {
    display: "flex", alignItems: "center", gap: 14,
    marginBottom: 8,
  },
  s4Title: {
    fontFamily: "'Outfit', system-ui, sans-serif",
    fontSize: 24, fontWeight: 800, color: "#0F0D2E",
  },
  matches: { display: "flex", flexDirection: "column", gap: 16, flex: 1, justifyContent: "center" },
  matchRow: {
    display: "flex", alignItems: "center", gap: 18,
    border: "2px solid", borderRadius: 16, padding: "20px 24px",
    transition: "opacity 0.5s ease, transform 0.5s ease",
  },
  matchOk: { borderColor: "rgba(16,185,129,0.3)", background: "rgba(16,185,129,0.03)" },
  matchAccept: { borderColor: "#4A47A0", background: "#F5F4FF" },
  matchIconWrap: {
    width: 44, height: 44, borderRadius: 12,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 20, flexShrink: 0,
  },
  matchContent: { flex: 1, minWidth: 0 },
  matchLabel: { fontSize: 15, fontWeight: 800, color: "#0F172A" },
  matchSub: { fontSize: 12, color: "#64748B", marginTop: 3 },
  matchBadge: {
    fontSize: 11, fontWeight: 800,
    padding: "5px 14px", borderRadius: 100, flexShrink: 0,
  },
};
