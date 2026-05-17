import { useEffect, useRef, useCallback } from "react";

const FIELDS = [
  { id: "spF1", label: "Issue Type",         value: "Invoice Issue" },
  { id: "spF2", label: "Sub Category",       value: "PO / Budget" },
  { id: "spF3", label: "Invoice Number",     value: "INV-0083" },
  { id: "spF4", label: "PO Number",          value: "PO-4401" },
];
const COMMENT_TEXT = "Invoice partially blocked — 'PO consumption exceeded'";

const SCREENS = ["spS1", "spS2", "spS3", "spS4", "spS5"];

export default function SupplierPortal() {
  const timersRef = useRef([]);

  const clearAll = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
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

  const fillField = useCallback((id, val, cb) => {
    const el = document.getElementById(id);
    if (!el) { cb && cb(); return; }
    el.style.borderColor = "rgba(16,185,129,0.5)";
    el.style.background = "#F0FDF4";
    el.style.color = "#0F172A";
    el.textContent = val;
    setTimeout(cb || (() => {}), 350);
  }, []);

  const typeInto = useCallback((id, text, speed, cb) => {
    const el = document.getElementById(id);
    if (!el) { cb && cb(); return; }
    el.style.borderColor = "#4A47A0";
    el.style.background = "#F5F4FF";
    let i = 0;
    const iv = setInterval(() => {
      el.textContent = text.slice(0, ++i);
      el.style.color = "#0F172A";
      if (i >= text.length) {
        clearInterval(iv);
        el.style.borderColor = "rgba(16,185,129,0.5)";
        el.style.background = "#F0FDF4";
        cb && setTimeout(cb, 250);
      }
    }, speed);
    timersRef.current.push(iv);
  }, []);

  const resetForm = useCallback(() => {
    [...FIELDS.map((f) => f.id), "spFComment"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        el.textContent = "";
        el.style.borderColor = "#E2E8F0";
        el.style.background = "#F8FAFC";
        el.style.color = "#94A3B8";
      }
    });
    const sb = document.getElementById("spSubmitBtn");
    if (sb) sb.style.opacity = "0";
    ["spAct1", "spAct2", "spAct3"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.style.borderColor = "#E2E8F0";
    });
  }, []);

  const run = useCallback(() => {
    clearAll();
    resetForm();
    showScreen("spS1");

    // Step 1 → click raise query
    t(() => {
      const btn = document.getElementById("spRaiseBtn");
      if (btn) {
        btn.style.transform = "scale(0.95)";
        setTimeout(() => { if (btn) btn.style.transform = ""; }, 200);
      }
      t(() => {
        showScreen("spS2");
        t(() => {
          fillField("spF1", "Invoice Issue", () =>
            fillField("spF2", "PO / Budget", () =>
              fillField("spF3", "INV-0083", () =>
                fillField("spF4", "PO-4401", () =>
                  typeInto("spFComment", COMMENT_TEXT, 28, () => {
                    const sb = document.getElementById("spSubmitBtn");
                    if (sb) sb.style.opacity = "1";
                  })
                )
              )
            )
          );
        }, 500);
      }, 450);
    }, 1600);

    // Step 2 → bot analyzing
    t(() => {
      const sb = document.getElementById("spSubmitBtn");
      if (sb) { sb.style.transform = "scale(0.97)"; setTimeout(() => { if (sb) sb.style.transform = ""; }, 200); }
      t(() => showScreen("spS3"), 420);
    }, 8000);

    // Step 3 → root cause
    t(() => showScreen("spS4"), 10800);

    // Step 4 → choose action 1 → confirm
    t(() => {
      const act = document.getElementById("spAct1");
      if (act) { act.style.borderColor = "#4A47A0"; act.style.background = "#F5F4FF"; }
      t(() => showScreen("spS5"), 700);
    }, 13500);

    // Loop
    t(() => run(), 17500);
  }, [clearAll, resetForm, showScreen, t, fillField, typeInto]);

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
          <span style={styles.headerLabel}>SUPPLIER PORTAL — SELF-SERVICE</span>
        </div>
        <div style={styles.headerRight}>
          <span style={styles.qryRef}>#QRY-2241</span>
          <span style={styles.liveChip}>⚡ AI-Assisted</span>
        </div>
      </div>

      {/* Body */}
      <div style={styles.body}>
        {/* Left: context panel */}
        <div style={styles.leftPanel}>
          <div style={styles.supplierCard}>
            <div style={styles.supplierAvatar}>PP</div>
            <div>
              <div style={styles.supplierName}>Precision Parts Pvt</div>
              <div style={styles.supplierSub}>Supplier ID: SUP-0412</div>
            </div>
          </div>

          <div style={styles.invoiceAlert}>
            <div style={styles.alertLabel}>⚠ Blocked Invoice</div>
            <div style={styles.alertInv}>INV-0083</div>
            <div style={styles.alertMeta}>PO-4401 · ₹0.57L</div>
            <div style={styles.alertReason}>PO consumption exceeded</div>
          </div>

          <div style={styles.timelineBox}>
            <div style={styles.timelineTitle}>PO Budget Consumption</div>
            <div style={styles.timelineBarTrack}>
              <div style={styles.timelineBarFill} />
              <div style={styles.timelineBarOver} />
            </div>
            <div style={styles.timelineLabels}>
              <span style={{ color: "#1E1B4B", fontSize: 12, fontWeight: 700 }}>₹5.2L used (94.5%)</span>
              <span style={{ color: "#EF4444", fontSize: 12, fontWeight: 700 }}>₹0.57L over</span>
            </div>
            <div style={styles.timelineMeta}>Total PO Value: ₹5.5L · Remaining: ₹0.3L</div>
          </div>
        </div>

        {/* Right: animated screens */}
        <div style={styles.rightPanel}>
          {/* Screen 1: Welcome */}
          <div id="spS1" style={{ ...styles.screen, ...styles.s1 }}>
            <div style={styles.s1Emoji}>🏭</div>
            <div style={styles.s1Welcome}>Welcome back, Precision Parts Pvt</div>
            <div style={styles.s1Sub}>Invoice INV-0083 is currently blocked — raise a query to resolve it</div>
            <button id="spRaiseBtn" style={styles.s1Btn}>
              ✦ Raise a Query
            </button>
          </div>

          {/* Screen 2: Form */}
          <div id="spS2" style={{ ...styles.screen, ...styles.s2, display: "none" }}>
            <div style={styles.formTitle}>New Query</div>
            <div style={styles.formGrid}>
              {FIELDS.map((f) => (
                <div key={f.id} style={styles.formField}>
                  <label style={styles.fieldLabel}>{f.label}</label>
                  <div id={f.id} style={styles.fieldInput} />
                </div>
              ))}
              <div style={{ ...styles.formField, gridColumn: "span 2" }}>
                <label style={styles.fieldLabel}>Comments</label>
                <div id="spFComment" style={{ ...styles.fieldInput, minHeight: 52 }} />
              </div>
            </div>
            <button
              id="spSubmitBtn"
              style={{ ...styles.submitBtn, opacity: 0, transition: "opacity 0.4s" }}
            >
              Submit Query →
            </button>
          </div>

          {/* Screen 3: Bot analyzing */}
          <div id="spS3" style={{ ...styles.screen, ...styles.s3, display: "none" }}>
            <div style={styles.botRow}>
              <div style={styles.botAvatar}>🤖</div>
              <div style={styles.botBubble}>
                Query <strong style={{ color: "#1E1B4B" }}>#QRY-2241</strong> received. Analyzing
                why invoice <strong style={{ color: "#1E1B4B" }}>INV-0083</strong> was blocked…
              </div>
            </div>
            <div style={styles.analyzingRow}>
              <DotPulse />
              Scanning PO limits, invoice history &amp; approval trail
            </div>
          </div>

          {/* Screen 4: Root cause + actions */}
          <div id="spS4" style={{ ...styles.screen, ...styles.s4, display: "none" }}>
            <div style={styles.botRow}>
              <div style={styles.botAvatar}>🤖</div>
              <div style={styles.botBubble}>
                <strong style={{ color: "#047857" }}>Root Cause Found</strong>
              </div>
            </div>
            <div style={styles.rootCause}>
              <div style={styles.rootLabel}>⚠ Root Cause Identified</div>
              <div style={styles.rootText}>
                PO-4401 had a total value of <strong>₹5.5L</strong>. Previous invoices consumed{" "}
                <strong>₹5.2L</strong> (94.5%). Your invoice INV-0083 for <strong>₹0.57L</strong>{" "}
                exceeds the remaining budget of <strong>₹0.3L</strong>, triggering an auto-block.
              </div>
            </div>
            <div style={styles.actionsLabel}>Choose an Action</div>
            <div style={styles.actionBtns}>
              {[
                { id: "spAct1", text: "Request PO Increase Value" },
                { id: "spAct2", text: "Request a New PO for Excess Amount" },
                { id: "spAct3", text: "Cancel & Resubmit Invoice for Desired Amount" },
              ].map((a, i) => (
                <div key={a.id} id={a.id} style={styles.actionBtn}>
                  <div style={styles.actionNum}>{i + 1}</div>
                  <div style={styles.actionText}>{a.text}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Screen 5: Confirmation */}
          <div id="spS5" style={{ ...styles.screen, ...styles.s5, display: "none" }}>
            <div style={styles.confirmBanner}>
              <span style={{ fontSize: 32 }}>✅</span>
              <div>
                <div style={styles.confirmText}>Action Submitted Successfully</div>
                <div style={styles.confirmSub}>Request PO Increase Value</div>
              </div>
            </div>
            <div style={styles.botRow}>
              <div style={styles.botAvatar}>🤖</div>
              <div style={styles.botBubble}>
                Your request has been forwarded to the buyer's procurement team. The PO increase
                request for <strong style={{ color: "#1E1B4B" }}>₹0.27L</strong> is now under review.
                You'll receive an update within <strong style={{ color: "#1E1B4B" }}>24–48 hours</strong>.
                INV-0083 will be auto-processed once approved. 🎯
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DotPulse() {
  return (
    <span style={{ display: "flex", gap: 4, alignItems: "center", marginRight: 8 }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: 6, height: 6, borderRadius: "50%", background: "#4A47A0",
            display: "inline-block",
            animation: `dpulse 0.8s ease-in-out ${i * 0.16}s infinite`,
          }}
        />
      ))}
      <style>{`@keyframes dpulse{0%,100%{opacity:.3;transform:scale(.8)}50%{opacity:1;transform:scale(1)}}`}</style>
    </span>
  );
}

const W = 1394;
const H = 732;

const styles = {
  root: {
    width: W, height: H,
    background: "#F8F7FF",
    fontFamily: "'Inter', system-ui, sans-serif",
    display: "flex", flexDirection: "column",
    borderRadius: 20, overflow: "hidden",
    position: "relative",
  },
  header: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "20px 52px",
    background: "#fff",
    borderBottom: "1.5px solid #E0DDF5",
    flexShrink: 0,
  },
  headerLeft: { display: "flex", alignItems: "center", gap: 12 },
  headerDot: { width: 10, height: 10, borderRadius: "50%", background: "#4A47A0" },
  headerLabel: { fontSize: 12, fontWeight: 800, letterSpacing: "0.14em", color: "#1E1B4B" },
  headerRight: { display: "flex", alignItems: "center", gap: 12 },
  qryRef: {
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: 13, fontWeight: 600, color: "#4A47A0",
    background: "#EEEEF8", borderRadius: 100, padding: "4px 12px",
  },
  liveChip: {
    fontSize: 12, fontWeight: 700, color: "#047857",
    background: "#ECFDF5", border: "1px solid rgba(16,185,129,0.3)",
    borderRadius: 100, padding: "5px 14px",
  },
  body: { display: "grid", gridTemplateColumns: "360px 1fr", flex: 1, overflow: "hidden" },
  leftPanel: {
    borderRight: "1.5px solid #E0DDF5",
    background: "#fff",
    padding: "36px 32px",
    display: "flex", flexDirection: "column", gap: 24, overflow: "auto",
  },
  supplierCard: {
    display: "flex", alignItems: "center", gap: 14,
    background: "#F5F4FF", border: "1.5px solid #E0DDF5",
    borderRadius: 14, padding: "18px 18px",
  },
  supplierAvatar: {
    width: 48, height: 48, borderRadius: "50%",
    background: "linear-gradient(135deg,#1E1B4B,#4A47A0)",
    color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 16, fontWeight: 800, flexShrink: 0,
  },
  supplierName: { fontSize: 16, fontWeight: 800, color: "#0F0D2E" },
  supplierSub: { fontSize: 12, color: "#94A3B8", marginTop: 2 },
  invoiceAlert: {
    background: "#FEF3C7", border: "1.5px solid rgba(245,158,11,0.3)",
    borderRadius: 14, padding: "18px 20px",
  },
  alertLabel: { fontSize: 11, fontWeight: 800, color: "#B45309", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 },
  alertInv: { fontFamily: "'Outfit', system-ui, sans-serif", fontSize: 22, fontWeight: 800, color: "#0F0D2E" },
  alertMeta: { fontSize: 13, color: "#92400E", marginTop: 2, fontWeight: 600 },
  alertReason: {
    fontSize: 12, color: "#D97706", marginTop: 8,
    background: "rgba(245,158,11,0.1)", borderRadius: 8, padding: "4px 10px",
    display: "inline-block", fontWeight: 600,
  },
  timelineBox: {
    background: "#F5F4FF", border: "1.5px solid #E0DDF5",
    borderRadius: 14, padding: "20px",
  },
  timelineTitle: { fontSize: 12, fontWeight: 700, color: "#64748B", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.06em" },
  timelineBarTrack: {
    height: 10, background: "#E0DDF5", borderRadius: 100,
    overflow: "visible", position: "relative", marginBottom: 10,
  },
  timelineBarFill: {
    position: "absolute", left: 0, top: 0, bottom: 0,
    width: "94.5%", background: "linear-gradient(90deg,#4A47A0,#6366F1)",
    borderRadius: "100px 0 0 100px",
  },
  timelineBarOver: {
    position: "absolute", left: "94.5%", top: -2, bottom: -2,
    width: "10%", background: "#EF4444",
    borderRadius: "0 100px 100px 0",
  },
  timelineLabels: { display: "flex", justifyContent: "space-between" },
  timelineMeta: { fontSize: 11, color: "#94A3B8", marginTop: 8 },
  rightPanel: {
    padding: "36px 48px",
    position: "relative", display: "flex", flexDirection: "column",
  },
  screen: {
    flex: 1, display: "flex", flexDirection: "column",
    width: "100%", gap: 18,
  },
  s1: { alignItems: "center", justifyContent: "center", gap: 20 },
  s1Emoji: { fontSize: 56 },
  s1Welcome: {
    fontFamily: "'Outfit', system-ui, sans-serif",
    fontSize: 26, fontWeight: 800, color: "#0F0D2E", textAlign: "center",
  },
  s1Sub: { fontSize: 15, color: "#64748B", textAlign: "center", lineHeight: 1.6, maxWidth: 480 },
  s1Btn: {
    background: "linear-gradient(135deg,#047857,#10B981)",
    color: "#fff", border: "none", borderRadius: 12,
    padding: "16px 36px", fontSize: 16, fontWeight: 700,
    cursor: "pointer", fontFamily: "inherit",
    boxShadow: "0 6px 20px rgba(4,120,87,0.35)",
    transition: "transform 0.2s",
  },
  s2: { overflow: "auto" },
  formTitle: {
    fontFamily: "'Outfit', system-ui, sans-serif",
    fontSize: 22, fontWeight: 800, color: "#0F0D2E",
  },
  formGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 },
  formField: { display: "flex", flexDirection: "column", gap: 6 },
  fieldLabel: { fontSize: 11, fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.08em" },
  fieldInput: {
    border: "1.5px solid #E2E8F0", borderRadius: 10,
    padding: "11px 14px", fontSize: 14, color: "#94A3B8",
    background: "#F8FAFC", minHeight: 42, fontFamily: "inherit",
    transition: "border-color 0.3s, background 0.3s",
  },
  submitBtn: {
    background: "linear-gradient(135deg,#047857,#10B981)",
    color: "#fff", border: "none", borderRadius: 10,
    padding: "13px", fontSize: 15, fontWeight: 700,
    cursor: "pointer", fontFamily: "inherit",
  },
  s3: { justifyContent: "flex-start", paddingTop: 20 },
  botRow: { display: "flex", alignItems: "flex-start", gap: 14 },
  botAvatar: {
    width: 44, height: 44, borderRadius: "50%",
    background: "linear-gradient(135deg,#1E1B4B,#10B981)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 20, flexShrink: 0,
    boxShadow: "0 4px 12px rgba(30,27,75,0.25)",
  },
  botBubble: {
    background: "#F5F4FF", border: "1.5px solid #E0DDF5",
    borderRadius: "0 14px 14px 14px",
    padding: "14px 18px", fontSize: 14, color: "#334155",
    lineHeight: 1.65, flex: 1,
  },
  analyzingRow: {
    display: "flex", alignItems: "center", gap: 8,
    fontSize: 13, color: "#64748B", fontWeight: 600,
    marginLeft: 58,
  },
  s4: { overflow: "auto", paddingTop: 8 },
  rootCause: {
    background: "#FFFBEB", border: "1.5px solid rgba(245,158,11,0.35)",
    borderRadius: 14, padding: "16px 20px",
  },
  rootLabel: { fontSize: 10, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "#B45309", marginBottom: 6 },
  rootText: { fontSize: 13, color: "#334155", lineHeight: 1.6 },
  actionsLabel: { fontSize: 11, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.1em" },
  actionBtns: { display: "flex", flexDirection: "column", gap: 10 },
  actionBtn: {
    display: "flex", alignItems: "center", gap: 14,
    border: "1.5px solid #E2E8F0", borderRadius: 12,
    padding: "14px 18px", cursor: "default",
    transition: "all 0.3s", background: "#fff",
  },
  actionNum: {
    width: 28, height: 28, borderRadius: "50%",
    background: "#EEEEF8", color: "#4A47A0",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 12, fontWeight: 800, flexShrink: 0,
  },
  actionText: { fontSize: 14, fontWeight: 600, color: "#334155" },
  s5: { justifyContent: "flex-start", paddingTop: 20 },
  confirmBanner: {
    display: "flex", alignItems: "center", gap: 16,
    background: "#ECFDF5", border: "1.5px solid rgba(16,185,129,0.3)",
    borderRadius: 14, padding: "18px 22px",
  },
  confirmText: { fontSize: 16, fontWeight: 800, color: "#047857" },
  confirmSub: { fontSize: 13, color: "#10B981", marginTop: 3 },
};
