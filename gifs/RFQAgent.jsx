import { useEffect, useRef, useCallback } from "react";

const VENDORS = [
  { id: "A", name: "MetalWorks Ltd",       color: "#EF4444", status: "✕ Email Not Opened", statusClass: "err", actionText: "📱 SMS + Email nudge sent" },
  { id: "B", name: "Steel Co. Pvt Ltd",    color: "#10B981", status: "↻ In Progress",       statusClass: "prog", actionText: "🎯 Motivation message sent" },
  { id: "C", name: "AlloyTech Industries", color: "#F59E0B", status: "👁 Opened, Not Started", statusClass: "warn", actionText: "📘 Guidance & tips sent" },
];

const MESSAGES = [
  { delay: 700,   type: "bot",    html: "Scanning RFQ <strong>#4421</strong> — analyzing response status for all 3 vendors…" },
  { delay: 2200,  type: "bot",    html: '<span style="color:#EF4444;font-weight:700">⚠ MetalWorks Ltd</span> has not opened the email. Risk of no-bid. Initiating SMS + email nudge every 2 days.', vendor: "A" },
  { delay: 4000,  type: "system", html: '📱 <strong>SMS sent to MetalWorks Ltd:</strong> "Hi, RFQ #4421 for Steel Components is awaiting your bid. Deadline in 3 days. Tap to open →"' },
  { delay: 5500,  type: "bot",    html: '<span style="color:#047857;font-weight:700">✓ Steel Co. Pvt Ltd</span> is actively working on the bid. Sending appreciation and deadline motivation.', vendor: "B" },
  { delay: 7200,  type: "system", html: '🎯 <strong>Message to Steel Co.:</strong> "Great work starting on time! You\'re ahead of the curve — stay focused to submit before the deadline."' },
  { delay: 9000,  type: "bot",    html: '<span style="color:#D97706;font-weight:700">⏸ AlloyTech Industries</span> opened the RFQ but hasn\'t begun. Sending onboarding guide + bid tips.', vendor: "C" },
  { delay: 10700, type: "system", html: "📘 <strong>Resources sent to AlloyTech:</strong> Bid submission guide, RFQ template, FAQs and step-by-step video walkthrough." },
  { delay: 12500, type: "bot",    html: 'All 3 vendors addressed. Monitoring continues. Next follow-up for <span style="color:#EF4444;font-weight:700">MetalWorks</span> in <strong>2 days</strong> if no action.' },
];

export default function RFQAgent() {
  const timersRef = useRef([]);

  const clearAll = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const t = useCallback((fn, delay) => {
    const id = setTimeout(fn, delay);
    timersRef.current.push(id);
  }, []);

  const highlightVendor = useCallback((vendorId) => {
    VENDORS.forEach((v) => {
      const row = document.getElementById(`rfqV${v.id}`);
      if (row) {
        row.style.background = v.id === vendorId ? "#F5F4FF" : "";
        const bar = row.querySelector(".rfq-active-bar");
        if (bar) bar.style.opacity = v.id === vendorId ? "1" : "0";
      }
    });
  }, []);

  const showAction = useCallback((vendorId) => {
    const el = document.getElementById(`rfqAct${vendorId}`);
    if (el) el.style.opacity = "1";
  }, []);

  const addMsg = useCallback((type, html) => {
    const container = document.getElementById("rfqMsgs");
    if (!container) return;
    const row = document.createElement("div");
    row.style.cssText = "display:flex;gap:10px;align-items:flex-start;opacity:0;transform:translateY(6px);transition:opacity 0.4s ease,transform 0.4s ease";
    if (type === "bot") {
      row.innerHTML = `
        <div style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#1E1B4B,#10B981);display:flex;align-items:center;justify-content:center;font-size:17px;flex-shrink:0">🤖</div>
        <div style="background:#F5F4FF;border:1.5px solid #E0DDF5;border-radius:0 14px 14px 14px;padding:12px 16px;font-size:13.5px;color:#334155;line-height:1.6;flex:1">${html}</div>
      `;
    } else {
      row.innerHTML = `
        <div style="background:#FFFBEB;border:1.5px solid rgba(245,158,11,0.3);border-radius:14px;padding:12px 16px;font-size:13px;color:#334155;line-height:1.6;flex:1">${html}</div>
      `;
    }
    container.appendChild(row);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        row.style.opacity = "1";
        row.style.transform = "translateY(0)";
      })
    );
    container.scrollTop = container.scrollHeight;
  }, []);

  const run = useCallback(() => {
    clearAll();
    const container = document.getElementById("rfqMsgs");
    if (container) container.innerHTML = "";
    VENDORS.forEach((v) => {
      const row = document.getElementById(`rfqV${v.id}`);
      if (row) { row.style.background = ""; }
      const bar = document.getElementById(`rfqV${v.id}`)?.querySelector(".rfq-active-bar");
      if (bar) bar.style.opacity = "0";
      const act = document.getElementById(`rfqAct${v.id}`);
      if (act) act.style.opacity = "0";
    });

    MESSAGES.forEach((msg) => {
      t(() => {
        addMsg(msg.type, msg.html);
        if (msg.vendor) {
          highlightVendor(msg.vendor);
          setTimeout(() => showAction(msg.vendor), 900);
        }
      }, msg.delay);
    });

    t(() => { clearAll(); setTimeout(run, 1500); }, 15000);
  }, [clearAll, t, addMsg, highlightVendor, showAction]);

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
          <span style={styles.headerLabel}>RFQ MANAGEMENT — AI FOLLOW-UP AGENT</span>
        </div>
        <div style={styles.agentBadge}>
          <div style={styles.agentDot} />
          Follow-Up Agent · Active
        </div>
      </div>

      {/* RFQ meta bar */}
      <div style={styles.metaBar}>
        <div style={styles.metaItem}>
          <span style={styles.metaKey}>RFQ</span>
          <span style={styles.metaVal}>#4421 — Steel Components</span>
        </div>
        <div style={styles.metaDivider} />
        <div style={styles.metaItem}>
          <span style={styles.metaKey}>Due</span>
          <span style={{ ...styles.metaVal, color: "#EF4444" }}>3 days</span>
        </div>
        <div style={styles.metaDivider} />
        <div style={styles.metaItem}>
          <span style={styles.metaKey}>Vendors Invited</span>
          <span style={styles.metaVal}>3</span>
        </div>
        <div style={styles.metaDivider} />
        <div style={styles.metaItem}>
          <span style={styles.metaKey}>Responses</span>
          <span style={{ ...styles.metaVal, color: "#D97706" }}>0 / 3</span>
        </div>
      </div>

      {/* Body */}
      <div style={styles.body}>
        {/* Left: vendor list */}
        <div style={styles.leftPanel}>
          <div style={styles.vendorListHeader}>Vendors Invited (3)</div>
          {VENDORS.map((v) => (
            <div key={v.id} id={`rfqV${v.id}`} style={styles.vendorRow}>
              <div style={styles.activeBar}>
                <div className="rfq-active-bar" style={{ ...styles.activeBarInner, opacity: 0 }} />
              </div>
              <div style={{ ...styles.vendorAvatar, background: v.color }}>{v.id}</div>
              <div style={styles.vendorInfo}>
                <div style={styles.vendorName}>{v.name}</div>
                <div style={{ ...styles.vendorStatus, ...statusColors[v.statusClass] }}>
                  {v.status}
                </div>
                <div id={`rfqAct${v.id}`} style={{ ...styles.vendorAction, opacity: 0 }}>
                  {v.actionText}
                </div>
              </div>
            </div>
          ))}

          {/* Status summary */}
          <div style={styles.summaryBox}>
            <div style={styles.summaryTitle}>Engagement Summary</div>
            <div style={styles.summaryRow}>
              <span style={styles.summaryDotRed} />
              <span style={styles.summaryText}>1 Not opened — Critical</span>
            </div>
            <div style={styles.summaryRow}>
              <span style={styles.summaryDotGreen} />
              <span style={styles.summaryText}>1 In Progress — On Track</span>
            </div>
            <div style={styles.summaryRow}>
              <span style={styles.summaryDotAmber} />
              <span style={styles.summaryText}>1 Opened, Not Started — Monitor</span>
            </div>
          </div>
        </div>

        {/* Right: agent chat */}
        <div style={styles.rightPanel}>
          <div style={styles.chatHeader}>
            <div style={styles.chatAvatar}>🤖</div>
            <div>
              <div style={styles.chatName}>NimbleAI Follow-Up Agent</div>
              <div style={styles.chatSub}>Monitoring 3 vendors · Auto-nudge enabled</div>
            </div>
            <div style={styles.chatBadge}>
              <div style={styles.chatBadgeDot} />
              Online
            </div>
          </div>
          <div id="rfqMsgs" style={styles.chatMsgs} />
        </div>
      </div>

      <style>{`
        @keyframes breathe{0%,100%{opacity:.4}50%{opacity:1}}
        .rfq-active-bar{transition:opacity 0.4s}
      `}</style>
    </div>
  );
}

const statusColors = {
  err:  { background: "#FEF2F2", color: "#DC2626", border: "1px solid rgba(239,68,68,0.25)" },
  prog: { background: "#ECFDF5", color: "#047857", border: "1px solid rgba(16,185,129,0.25)" },
  warn: { background: "#FEF3C7", color: "#D97706", border: "1px solid rgba(245,158,11,0.25)" },
};

const W = 1394;
const H = 732;

const styles = {
  root: {
    width: W, height: H,
    background: "#FFFBF5",
    fontFamily: "'Inter', system-ui, sans-serif",
    display: "flex", flexDirection: "column",
    borderRadius: 20, overflow: "hidden",
  },
  header: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "18px 48px",
    background: "#fff",
    borderBottom: "1.5px solid #FED7AA",
    flexShrink: 0,
  },
  headerLeft: { display: "flex", alignItems: "center", gap: 12 },
  headerDot: { width: 10, height: 10, borderRadius: "50%", background: "#D97706" },
  headerLabel: { fontSize: 12, fontWeight: 800, letterSpacing: "0.14em", color: "#92400E" },
  agentBadge: {
    display: "flex", alignItems: "center", gap: 8,
    background: "rgba(30,27,75,0.06)", border: "1px solid rgba(30,27,75,0.15)",
    borderRadius: 100, padding: "6px 16px",
    fontSize: 13, fontWeight: 700, color: "#1E1B4B",
  },
  agentDot: {
    width: 7, height: 7, borderRadius: "50%", background: "#4A47A0",
    animation: "breathe 1.5s infinite",
  },
  metaBar: {
    display: "flex", alignItems: "center", gap: 0,
    background: "#FFFBF5",
    borderBottom: "1.5px solid #FED7AA",
    padding: "14px 48px", flexShrink: 0,
  },
  metaItem: { display: "flex", alignItems: "center", gap: 8, padding: "0 24px" },
  metaKey: { fontSize: 11, fontWeight: 600, color: "#92400E", textTransform: "uppercase", letterSpacing: "0.08em" },
  metaVal: { fontSize: 14, fontWeight: 700, color: "#0F0D2E" },
  metaDivider: { width: 1, height: 28, background: "#FED7AA", flexShrink: 0 },
  body: { display: "grid", gridTemplateColumns: "380px 1fr", flex: 1, overflow: "hidden" },
  leftPanel: {
    borderRight: "1.5px solid #FED7AA",
    background: "#FFFBF5",
    display: "flex", flexDirection: "column",
    overflow: "auto",
  },
  vendorListHeader: {
    padding: "16px 24px 12px",
    fontSize: 11, fontWeight: 700, color: "#92400E",
    textTransform: "uppercase", letterSpacing: "0.1em",
    borderBottom: "1px solid #FED7AA",
    flexShrink: 0,
  },
  vendorRow: {
    display: "flex", alignItems: "flex-start", gap: 14,
    padding: "18px 24px", borderBottom: "1px solid #FEF3C7",
    transition: "background 0.3s", position: "relative",
  },
  activeBar: { position: "absolute", left: 0, top: 0, bottom: 0, width: 3 },
  activeBarInner: {
    width: "100%", height: "100%",
    background: "linear-gradient(180deg,#4A47A0,#8482C8)",
    borderRadius: "0 2px 2px 0",
  },
  vendorAvatar: {
    width: 40, height: 40, borderRadius: "50%",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 15, fontWeight: 800, color: "#fff", flexShrink: 0,
  },
  vendorInfo: { flex: 1, minWidth: 0 },
  vendorName: { fontSize: 14, fontWeight: 700, color: "#0F0D2E", marginBottom: 5 },
  vendorStatus: {
    display: "inline-flex", alignItems: "center", gap: 5,
    fontSize: 11, fontWeight: 600, padding: "3px 9px", borderRadius: 100,
  },
  vendorAction: {
    fontSize: 11, color: "#4A47A0", fontWeight: 600,
    marginTop: 6, transition: "opacity 0.4s",
  },
  summaryBox: {
    margin: "20px 24px",
    background: "#fff", border: "1.5px solid #FED7AA",
    borderRadius: 14, padding: "18px 20px",
  },
  summaryTitle: { fontSize: 11, fontWeight: 700, color: "#92400E", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 },
  summaryRow: { display: "flex", alignItems: "center", gap: 8, marginBottom: 8 },
  summaryDotRed: { width: 8, height: 8, borderRadius: "50%", background: "#EF4444", flexShrink: 0 },
  summaryDotGreen: { width: 8, height: 8, borderRadius: "50%", background: "#10B981", flexShrink: 0 },
  summaryDotAmber: { width: 8, height: 8, borderRadius: "50%", background: "#F59E0B", flexShrink: 0 },
  summaryText: { fontSize: 12, color: "#334155", fontWeight: 500 },
  rightPanel: {
    display: "flex", flexDirection: "column", background: "#fff", overflow: "hidden",
  },
  chatHeader: {
    display: "flex", alignItems: "center", gap: 14,
    padding: "16px 28px",
    borderBottom: "1.5px solid #E0DDF5", flexShrink: 0,
    background: "#FAFAFE",
  },
  chatAvatar: {
    width: 44, height: 44, borderRadius: "50%",
    background: "linear-gradient(135deg,#1E1B4B,#10B981)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 20, flexShrink: 0,
  },
  chatName: { fontSize: 15, fontWeight: 800, color: "#0F0D2E" },
  chatSub: { fontSize: 12, color: "#94A3B8", marginTop: 2 },
  chatBadge: {
    marginLeft: "auto", display: "flex", alignItems: "center", gap: 6,
    background: "#ECFDF5", border: "1px solid rgba(16,185,129,0.3)",
    borderRadius: 100, padding: "5px 14px",
    fontSize: 12, fontWeight: 700, color: "#047857",
  },
  chatBadgeDot: { width: 6, height: 6, borderRadius: "50%", background: "#10B981" },
  chatMsgs: {
    flex: 1, overflowY: "auto",
    padding: "24px 28px",
    display: "flex", flexDirection: "column", gap: 14,
  },
};
