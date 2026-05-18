"use client";

import { useState, useEffect, useRef } from "react";

export default function SupplierPortalAnimation() {
  const PHASE = { EMPTY:0, FORM:1, PROCESSING:2, RESOLUTION:3, CONFIRM:4 };
  const FIELDS = [
    { key:"issueType",  label:"Issue Type",      val:"Invoice Amount Mismatch", charDelay:62 },
    { key:"subCat",     label:"Sub Category",    val:"PO Budget Exhausted",     charDelay:62 },
    { key:"invoiceNo",  label:"Invoice Number",  val:"INV-2024-0892",           charDelay:82 },
    { key:"poRef",      label:"PO Reference",    val:"PO-7741",                 charDelay:100 },
    { key:"desc",       label:"Description",     val:"The invoice INV-2024-0892 for ₹4,82,500 has been rejected citing PO budget exhaustion on PO-7741. Please advise on the correct resolution path.", charDelay:20 },
  ];

  const [phase, setPhase]               = useState(PHASE.EMPTY);
  const [btnPressed, setBtnPressed]     = useState(false);
  const [submitPressed, setSubmitPressed] = useState(false);
  const [fieldVals, setFieldVals]       = useState({});
  const [fieldState, setFieldState]     = useState({}); // 'typing' | 'done' | ''
  const [showSubmit, setShowSubmit]     = useState(false);
  const [highlightAct, setHighlightAct] = useState(false);
  const [showConfirm, setShowConfirm]   = useState(false);
  const [shellOpacity, setShellOpacity] = useState(1);
  const [slideIn, setSlideIn]           = useState(false);
  const timersRef = useRef([]);

  function sleep(ms) {
    return new Promise(r => {
      const id = setTimeout(r, ms);
      timersRef.current.push(id);
    });
  }

  async function typeField(key, text, charDelay) {
    setFieldState(s => ({ ...s, [key]: "typing" }));
    for (let i = 0; i <= text.length; i++) {
      setFieldVals(v => ({ ...v, [key]: text.slice(0, i) }));
      await sleep(charDelay);
    }
    setFieldState(s => ({ ...s, [key]: "done" }));
    await sleep(180);
  }

  async function runLoop() {
    // Reset everything
    setPhase(PHASE.EMPTY);
    setFieldVals({});
    setFieldState({});
    setShowSubmit(false);
    setBtnPressed(false);
    setSubmitPressed(false);
    setHighlightAct(false);
    setShowConfirm(false);
    setSlideIn(false);
    setShellOpacity(1);

    await sleep(1300);

    // Press raise button
    setBtnPressed(true);
    await sleep(300);
    setBtnPressed(false);
    await sleep(220);

    // Transition to form
    setPhase(PHASE.FORM);
    setSlideIn(false);
    await sleep(50);
    setSlideIn(true);
    await sleep(500);

    // Typewrite each field
    for (const f of FIELDS) {
      await typeField(f.key, f.val, f.charDelay);
      await sleep(100);
    }

    // Show + press submit
    setShowSubmit(true);
    await sleep(650);
    setSubmitPressed(true);
    await sleep(320);
    setSubmitPressed(false);
    await sleep(200);

    // Processing
    setPhase(PHASE.PROCESSING);
    setSlideIn(false);
    await sleep(50);
    setSlideIn(true);
    await sleep(2600);

    // Resolution
    setPhase(PHASE.RESOLUTION);
    setSlideIn(false);
    await sleep(50);
    setSlideIn(true);
    await sleep(950);
    setHighlightAct(true);
    await sleep(1100);
    setShowConfirm(true);
    await sleep(2300);

    // Fade out and loop
    setShellOpacity(0);
    await sleep(700);
    runLoop();
  }

  useEffect(() => {
    runLoop();
    return () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
  }, []);

  const S = {
    shell: {
      width:"100%", height:"100%", background:"#F8FAFC",
      display:"flex", flexDirection:"column",
      fontFamily:"var(--fb)",
      opacity: shellOpacity, transition:"opacity .6s ease",
      position:"relative", overflow:"hidden",
      boxSizing:"border-box",
    },
    tabs: {
      display:"flex", borderBottom:"1px solid #E2E8F0",
      background:"#fff", padding:"0 12px", flexShrink:0,
    },
    tab: (act) => ({
      padding:"9px 12px", fontSize:12, fontWeight: act ? 700 : 500,
      color: act ? "#4F46E5" : "#64748B",
      borderBottom: act ? "2px solid #4F46E5" : "2px solid transparent",
      display:"flex", alignItems:"center", gap:5,
    }),
    tabDot: { width:6, height:6, borderRadius:"50%", background:"currentColor" },
    body: { display:"grid", gridTemplateColumns:"minmax(108px, 27%) 1fr", flex:1, minHeight:0, overflow:"hidden" },
    list: { borderRight:"1px solid #E2E8F0", padding:"8px 0", background:"#FAFBFC", overflow:"hidden", minWidth:0 },
    listHd: { fontSize:10, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:"#94A3B8", padding:"0 12px 8px" },
    listRow: (act) => ({
      padding:"8px 12px", fontSize:12, fontWeight: act ? 600 : 500,
      color: act ? "#4F46E5" : "#0F172A",
      borderLeft: `3px solid ${act ? "#4F46E5" : "transparent"}`,
      background: act ? "#EEF2FF" : "transparent",
      lineHeight:1.35,
    }),
    listSub: { fontSize:10, color:"#94A3B8", fontWeight:400, marginTop:2 },
    badge: (type) => ({
      display:"inline-block", fontSize:9, fontWeight:700, padding:"2px 6px",
      borderRadius:100, marginTop:3,
      background: type === "open" ? "#FEF3C7" : "#F0FDF4",
      color:       type === "open" ? "#92400E"  : "#166534",
    }),
    panel: { display:"flex", flexDirection:"column", overflow:"hidden", minWidth:0, minHeight:0 },
    panelHd: { padding:"10px 14px", borderBottom:"1px solid #E2E8F0", display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0, background:"#fff" },
    panelTitle: { fontSize:14, fontWeight:700, color:"#0F172A" },
    panelSub: { fontSize:11, color:"#64748B", marginTop:2 },
    chip: { fontSize:10, fontWeight:700, padding:"3px 9px", borderRadius:100, background:"#FEF3C7", color:"#92400E" },
    screens: { flex:1, position:"relative", overflow:"hidden", minHeight:0 },
    screen: (vis, offset) => ({
      position:"absolute", inset:0, display:"flex", flexDirection:"column",
      padding:"12px 14px",
      boxSizing:"border-box",
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : `translateY(${offset}px)`,
      transition:"opacity .38s ease, transform .38s ease",
      pointerEvents: vis ? "auto" : "none",
    }),
  };

  const fldStyle = (key) => ({
    border: `1.5px solid ${
      fieldState[key] === "typing" ? "#4F46E5" :
      fieldState[key] === "done"   ? "#86EFAC" : "#E2E8F0"
    }`,
    borderRadius:7, padding:"7px 10px", fontSize:12,
    fontFamily:"var(--fb)", color:"#0F172A",
    background:
      fieldState[key] === "typing" ? "#EEF2FF" :
      fieldState[key] === "done"   ? "#F0FDF4" : "#fff",
    width:"100%", minHeight:30, resize:"none", boxSizing:"border-box",
    transition:"border-color .2s, background .2s",
    outline:"none",
  });

  return (
    <div style={S.shell}>

      {/* ── Tab bar ── */}
      <div style={S.tabs}>
        {["My Queries", "Team", "Resolved"].map((t, i) => (
          <div key={t} style={S.tab(i === 0)}>
            {i === 0 && <span style={S.tabDot} />}
            {t}
          </div>
        ))}
      </div>

      {/* ── Body ── */}
      <div style={S.body}>

        {/* Left list */}
        <div style={S.list}>
          <div style={S.listHd}>Queries (3)</div>
          {[
            { id:"Query-2847", sub:"Invoice Mismatch", badge:"open", act:true  },
            { id:"Query-2831", sub:"PO Reference",     badge:"res",  act:false },
            { id:"Query-2819", sub:"Tax Issue",         badge:"res",  act:false },
          ].map(r => (
            <div key={r.id} style={S.listRow(r.act)}>
              {r.id}
              <div style={S.listSub}>{r.sub}</div>
              <span style={S.badge(r.badge)}>{r.badge === "open" ? "Open" : "Resolved"}</span>
            </div>
          ))}
        </div>

        {/* Right panel */}
        <div style={S.panel}>
          <div style={S.panelHd}>
            <div>
              <div style={S.panelTitle}>Raise / Track Query</div>
              <div style={S.panelSub}>NimbleAI — Instant Resolution</div>
            </div>
            <span style={S.chip}>Query-2847</span>
          </div>

          <div style={S.screens}>

            {/* SCREEN 1 — Empty State */}
            <div style={S.screen(phase === PHASE.EMPTY, 20)}>
              <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:8, textAlign:"center" }}>
                <div style={{ width:44, height:44, borderRadius:12, background:"#EEF2FF", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                </div>
                <div style={{ fontSize:13, fontWeight:700, color:"#0F172A" }}>No queries raised yet</div>
                <div style={{ fontSize:13, color:"#64748B", maxWidth:200, lineHeight:1.5 }}>
                  Raise a query and NimbleAI will resolve it instantly.
                </div>
                <button style={{
                  marginTop:4, padding:"8px 16px",
                  background: btnPressed ? "#3730A3" : "#4F46E5",
                  color:"#fff", border:"none", borderRadius:7,
                  fontSize:13, fontWeight:700, fontFamily:"inherit",
                  transform: btnPressed ? "scale(.93)" : "scale(1)",
                  boxShadow: btnPressed ? "0 2px 8px rgba(79,70,229,.35)" : "none",
                  transition:"transform .12s, box-shadow .12s, background .12s",
                  cursor:"default",
                }}>
                  + Raise a Query
                </button>
              </div>
            </div>

            {/* SCREEN 2 — Form */}
            <div style={S.screen(phase === PHASE.FORM && slideIn, 28)}>
              <div style={{ flex:1, display:"flex", flexDirection:"column", gap:5, overflow:"hidden", minHeight:0 }}>
                {FIELDS.map(f => (
                  <div key={f.key} style={{ display:"flex", flexDirection:"column", gap:2, flexShrink: f.key === "desc" ? 1 : 0, minHeight:0 }}>
                    <label style={{ fontSize:11, fontWeight:600, color:"#64748B", letterSpacing:".03em" }}>
                      {f.label}
                    </label>
                    {f.key === "desc"
                      ? <textarea readOnly style={{ ...fldStyle(f.key), minHeight:44, maxHeight:56, fontSize:11, lineHeight:1.45, flex:1 }} value={fieldVals[f.key] || ""} />
                      : <input   readOnly style={fldStyle(f.key)} value={fieldVals[f.key] || ""} />
                    }
                  </div>
                ))}
                <button style={{
                  marginTop:2, padding:"9px",
                  background: submitPressed ? "#3730A3" : "#4F46E5",
                  color:"#fff", border:"none", borderRadius:7,
                  fontSize:13, fontWeight:700, fontFamily:"inherit",
                  width:"100%", cursor:"default",
                  opacity: showSubmit ? 1 : 0,
                  transform: submitPressed ? "scale(.97)" : "scale(1)",
                  transition:"opacity .35s, transform .12s, background .12s",
                }}>
                  Submit Query →
                </button>
              </div>
            </div>

            {/* SCREEN 3 — AI Processing */}
            <div style={S.screen(phase === PHASE.PROCESSING && slideIn, 28)}>
              <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"flex-start", paddingTop:18, gap:14 }}>
                <div style={{ width:40, height:40, borderRadius:11, background:"linear-gradient(135deg,#4F46E5,#818CF8)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, boxShadow:"0 4px 14px rgba(79,70,229,.3)" }}>
                  🤖
                </div>
                <div style={{ fontSize:13, fontWeight:600, color:"#0F172A", display:"flex", alignItems:"center" }}>
                  NimbleAI is analyzing
                  <span style={{ display:"inline-flex", gap:3, marginLeft:5 }}>
                    {[0, 1, 2].map(i => (
                      <span key={i} style={{ width:5, height:5, borderRadius:"50%", background:"#4F46E5", display:"inline-block", animation:`spBounce .9s ease-in-out ${i * 0.15}s infinite` }} />
                    ))}
                  </span>
                </div>
                <div style={{ width:"100%", display:"flex", flexDirection:"column", gap:9 }}>
                  {[1, .8, 1, .6, 1, .75, 1].map((w, i) => (
                    <div key={i} style={{ height:11, borderRadius:5, width:`${w * 100}%`, background:"linear-gradient(90deg,#E2E8F0 25%,#F1F5F9 50%,#E2E8F0 75%)", backgroundSize:"200% 100%", animation:"spShimmer 1.4s infinite" }} />
                  ))}
                </div>
              </div>
            </div>

            {/* SCREEN 4 — AI Resolution */}
            <div style={S.screen(phase === PHASE.RESOLUTION && slideIn, 28)}>
              <div style={{ flex:1, display:"flex", flexDirection:"column", gap:5, overflow:"hidden", minHeight:0, paddingBottom: showConfirm ? 44 : 0 }}>

                {/* Bot message bubble */}
                <div style={{ display:"flex", gap:6, alignItems:"flex-start", flexShrink:0 }}>
                  <div style={{ width:28, height:28, borderRadius:8, background:"linear-gradient(135deg,#4F46E5,#818CF8)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, flexShrink:0 }}>
                    🤖
                  </div>
                  <div style={{ background:"#EEF2FF", border:"1px solid #C7D2FE", borderRadius:"0 9px 9px 9px", padding:"9px 11px", fontSize:12, color:"#0F172A", lineHeight:1.5, flex:1, minWidth:0 }}>
                    Root cause: <strong style={{ color:"#4F46E5" }}>PO budget exhaustion</strong> on PO-7741.
                    Invoice INV-2024-0892 exceeds the remaining balance by <strong style={{ color:"#4F46E5" }}>₹97,500</strong>.
                  </div>
                </div>

                {/* Amber warning card */}
                <div style={{ background:"#FFFBEB", border:"1px solid #FDE68A", borderRadius:8, padding:"7px 10px", flexShrink:0 }}>
                  <div style={{ fontSize:10, fontWeight:700, color:"#D97706", letterSpacing:".05em", textTransform:"uppercase", marginBottom:5, display:"flex", alignItems:"center", gap:4 }}>
                    ⚠ Budget Variance
                  </div>
                  {[
                    ["PO Original Budget", "₹12,00,000"],
                    ["Consumed to Date",   "₹11,97,500"],
                    ["Invoice Amount",     "₹4,82,500" ],
                    ["Shortfall",          "₹97,500"   ],
                  ].map(([l, v], i) => (
                    <div key={l} style={{ display:"flex", justifyContent:"space-between", fontSize:11, padding:"3px 0", borderBottom: i < 3 ? "1px solid #FDE68A" : "none" }}>
                      <span style={{ color:"#78350F", fontWeight:500 }}>{l}</span>
                      <span style={{ color: i === 3 ? "#DC2626" : "#92400E", fontWeight:700 }}>{v}</span>
                    </div>
                  ))}
                </div>

                {/* Action rows */}
                <div style={{ fontSize:10, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", color:"#94A3B8" }}>
                  Recommended Actions
                </div>
                {[
                  "Request PO Amendment for ₹97,500 shortfall",
                  "Create supplementary PO for balance",
                  "Reject invoice & ask supplier to split",
                ].map((txt, i) => (
                  <div key={i} style={{
                    display:"flex", alignItems:"center", gap:8,
                    border: `1.5px solid ${i === 0 && highlightAct ? "#4F46E5" : "#E2E8F0"}`,
                    borderRadius:7, padding:"7px 10px", cursor:"default", flexShrink:0,
                    background: i === 0 && highlightAct ? "#EEF2FF" : "#fff",
                    transition:"border-color .3s, background .3s",
                  }}>
                    <div style={{
                      width:22, height:22, borderRadius:5,
                      background: i === 0 && highlightAct ? "#4F46E5" : "#EEF2FF",
                      color:      i === 0 && highlightAct ? "#fff"    : "#4F46E5",
                      fontSize:11, fontWeight:800,
                      display:"flex", alignItems:"center", justifyContent:"center",
                      flexShrink:0, transition:"background .3s, color .3s",
                    }}>
                      {i + 1}
                    </div>
                    <div style={{ fontSize:12, fontWeight:600, color:"#0F172A", flex:1, minWidth:0, lineHeight:1.35 }}>{txt}</div>
                    <div style={{ fontSize:12, color: i === 0 && highlightAct ? "#4F46E5" : "#94A3B8", transition:"color .3s" }}>→</div>
                  </div>
                ))}
              </div>

              {/* Confirmation banner */}
              <div style={{
                position:"absolute", bottom:0, left:0, right:0,
                background:"#16A34A", color:"#fff",
                padding:"8px 12px", display:"flex", alignItems:"center", gap:8,
                transform: showConfirm ? "translateY(0)" : "translateY(100%)",
                transition:"transform .45s cubic-bezier(.22,1,.36,1)",
              }}>
                <span style={{ fontSize:16 }}>✓</span>
                <div>
                  <div style={{ fontSize:13, fontWeight:700 }}>Action submitted successfully</div>
                  <div style={{ fontSize:11, opacity:.85 }}>PO Amendment request sent to Finance team</div>
                </div>
              </div>
            </div>

          </div>{/* /screens */}
        </div>{/* /panel */}
      </div>{/* /body */}

      <style>{`
        @keyframes spBounce  { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-5px)} }
        @keyframes spShimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
      `}</style>
    </div>
  );
}
