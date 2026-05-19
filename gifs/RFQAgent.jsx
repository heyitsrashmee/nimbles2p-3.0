"use client";

import { useState, useEffect, useRef, useCallback } from "react";

/* ─── animation keyframes injected once ─── */
const CSS = `
  @keyframes rfqa-in    { from { opacity:0; transform:translateY(8px) } to { opacity:1; transform:translateY(0) } }
  @keyframes rfqa-pulse { 0%,100% { opacity:1; transform:scale(1) } 50% { opacity:.3; transform:scale(.5) } }
  @keyframes rfqa-chip  { from { opacity:0; transform:translateY(5px) scale(.94) } to { opacity:1; transform:translateY(0) scale(1) } }
  @keyframes rfqa-badge { from { opacity:0; transform:scale(.88) } to { opacity:1; transform:scale(1) } }
  .rfqa-log-in  { animation: rfqa-in   .62s cubic-bezier(.22,1,.36,1) both; }
  .rfqa-chip-in { animation: rfqa-chip .88s cubic-bezier(.34,1.56,.64,1) both; }
  .rfqa-feed::-webkit-scrollbar { width: 3px; }
  .rfqa-feed::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 9px; }
`;

const VCONF = {
  metal: { name:"MetalWorks Ltd",    sub:"Pune · Steel",     g1:"#C0392B", g2:"#E74C3C", border:"rgba(239,68,68,.45)",    bg:"#FFF5F5", sh:"0 0 0 1.5px rgba(239,68,68,.5),0 2px 12px rgba(239,68,68,.1)"   },
  steel: { name:"Steel Co. India",   sub:"Mumbai · Steel",   g1:"#0F6E56", g2:"#10B981", border:"rgba(16,185,129,.45)",   bg:"#F0FDF4", sh:"0 0 0 1.5px rgba(16,185,129,.5),0 2px 12px rgba(16,185,129,.1)"  },
  alloy: { name:"AlloyTech Pvt Ltd", sub:"Chennai · Alloys", g1:"#B45309", g2:"#F59E0B", border:"rgba(245,158,11,.45)",   bg:"#FFFBEB", sh:"0 0 0 1.5px rgba(245,158,11,.5),0 2px 12px rgba(245,158,11,.1)"  },
};
const INIT = { metal:"MW", steel:"SC", alloy:"AT" };

const VENDORS = [
  { id:"metal", avatarGrad:["#C0392B","#E74C3C"], statusBg:"#FEE2E2", statusDot:"#EF4444", statusTxt:"#DC2626", statusLabel:"Email Not Opened",   chipBg:"#EFF6FF", chipBorder:"#BFDBFE", chipTxt:"#1D4ED8", chipLabel:"📱 SMS + nudge sent"  },
  { id:"steel", avatarGrad:["#0F6E56","#10B981"], statusBg:"#D1FAE5", statusDot:"#10B981", statusTxt:"#065F46", statusLabel:"In Progress",          chipBg:"#ECFDF5", chipBorder:"#6EE7B7", chipTxt:"#065F46", chipLabel:"🎯 Motivation sent"    },
  { id:"alloy", avatarGrad:["#B45309","#F59E0B"], statusBg:"#FEF3C7", statusDot:"#F59E0B", statusTxt:"#92400E", statusLabel:"Opened, Not Started",  chipBg:"#FFFBEB", chipBorder:"#FDE68A", chipTxt:"#92400E", chipLabel:"📘 Guide sent"          },
];

const LC = {
  scan:    { bg:"#F8FAFC", bo:"#E2E8F0", tx:"#475569" },
  warn:    { bg:"#FFF5F5", bo:"#FCA5A5", tx:"#991B1B" },
  action:  { bg:"#EFF6FF", bo:"#BFDBFE", tx:"#1D4ED8" },
  success: { bg:"#F0FDF4", bo:"#BBF7D0", tx:"#065F46" },
  done:    { bg:"#F0FDF4", bo:"#6EE7B7", tx:"#065F46" },
};

const SEQ = [
  // MetalWorks — gaps between messages ×1.4
  { t:600,   vid:"metal", type:"scan",      icon:"🔍", msg:"Agent detected: email sent 3 days ago — no open event recorded."                                                                          },
  { t:1560,  vid:"metal", type:"_hi"                                                                                                                                                                   },
  { t:1720,  vid:"metal", type:"warn",      icon:"⚠️", msg:"High risk of no-bid. Escalating to SMS and re-engagement email."                                                                         },
  { t:3320,  vid:"metal", type:"action",    icon:"📱", msg:'SMS sent: <em>"Hi MetalWorks, RFQ-2024-0091 closes Feb 28. Respond now to stay in consideration."</em>'                                  },
  { t:4920,  vid:"metal", type:"action",    icon:"📧", msg:"Follow-up email dispatched with direct submission link and deadline reminder."                                                             },
  { t:6120,  vid:"metal", type:"_actioned"                                                                                                                                                            },
  // Steel Co
  { t:7200,  vid:"steel", type:"scan",      icon:"🔍", msg:"Agent detected: RFQ opened 1 day ago — bid actively in progress."                                                                        },
  { t:8160,  vid:"steel", type:"_hi"                                                                                                                                                                   },
  { t:8320,  vid:"steel", type:"success",   icon:"✅", msg:"Good momentum detected. Sending motivation to maintain bid progress."                                                                      },
  { t:9920,  vid:"steel", type:"action",    icon:"🎯", msg:'Message sent: <em>"Great progress, Steel Co.! A competitive bid by Feb 28 puts you at the top of our shortlist."</em>'                  },
  { t:11120, vid:"steel", type:"_actioned"                                                                                                                                                            },
  // AlloyTech
  { t:12200, vid:"alloy", type:"scan",      icon:"🔍", msg:"Agent detected: RFQ opened 2 days ago — zero fields submitted."                                                                          },
  { t:13160, vid:"alloy", type:"_hi"                                                                                                                                                                   },
  { t:13320, vid:"alloy", type:"warn",      icon:"📂", msg:"Stalled after opening. Sending onboarding guide and call-back offer."                                                                     },
  { t:14920, vid:"alloy", type:"action",    icon:"📘", msg:'Guide sent: <em>"Fill RFQ-2024-0091 in under 20 min — quick-start doc attached."</em>'                                                  },
  { t:16520, vid:"alloy", type:"action",    icon:"📞", msg:"Call-back triggered: team available for a 10-min walkthrough if needed."                                                                  },
  { t:17720, vid:"alloy", type:"_actioned"                                                                                                                                                            },
  { t:18800, vid:null,    type:"_done"                                                                                                                                                                },
];

const AUTO_SELECT = [
  { t:480,   vid:"metal" },
  { t:6960,  vid:"steel" },
  { t:11960, vid:"alloy" },
];

/* ── sub-components ── */
function VendorBtn({ vm, isActive, actioned, unread, onClick }) {
  const vc = VCONF[vm.id];
  return (
    <div
      onClick={() => onClick(vm.id)}
      style={{
        margin:"0 6px 4px", borderRadius:10, padding:"10px 10px 9px", cursor:"pointer",
        border:`1.5px solid ${isActive ? vc.border : "transparent"}`,
        background: isActive ? vc.bg : "transparent",
        boxShadow: isActive ? vc.sh : "none",
        transition:"border-color .2s,background .2s,box-shadow .2s",
        flexShrink:0,
      }}
    >
      <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:6 }}>
        <div style={{ position:"relative", flexShrink:0 }}>
          <div style={{ width:26, height:26, borderRadius:7, background:`linear-gradient(135deg,${vm.avatarGrad[0]},${vm.avatarGrad[1]})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:8, fontWeight:800, color:"#fff" }}>
            {INIT[vm.id]}
          </div>
          {actioned && (
            <div style={{ position:"absolute", bottom:-3, right:-3, width:12, height:12, borderRadius:"50%", background:"#10B981", border:"1.5px solid #fff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:7, color:"#fff", fontWeight:800 }}>✓</div>
          )}
        </div>
        <div style={{ minWidth:0, flex:1 }}>
          <div style={{ fontSize:10.5, fontWeight:700, color:"#0F172A", lineHeight:1.2, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{vc.name}</div>
          <div style={{ fontSize:8, color:"#94A3B8" }}>{vc.sub}</div>
        </div>
        {unread > 0 && !actioned && (
          <div style={{ flexShrink:0, minWidth:16, height:16, borderRadius:8, background:"#6366F1", display:"flex", alignItems:"center", justifyContent:"center", fontSize:7.5, fontWeight:700, color:"#fff", padding:"0 4px" }}>{unread}</div>
        )}
      </div>
      <div style={{ display:"inline-flex", alignItems:"center", gap:4, background:vm.statusBg, borderRadius:5, padding:"2px 7px" }}>
        <span style={{ width:4, height:4, borderRadius:"50%", background:vm.statusDot, display:"inline-block" }} />
        <span style={{ fontSize:8, fontWeight:700, color:vm.statusTxt }}>{vm.statusLabel}</span>
      </div>
    </div>
  );
}

function LogEntry({ entry }) {
  const c = LC[entry.type] || LC.scan;
  if (entry.type === "done") {
    return (
      <div className="rfqa-log-in" style={{ display:"flex", alignItems:"center", gap:8, padding:"8px 11px", background:"linear-gradient(135deg,#ECFDF5,#D1FAE5)", border:"1px solid #6EE7B7", borderRadius:10, flexShrink:0 }}>
        <div style={{ width:18, height:18, borderRadius:"50%", background:"#10B981", display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, color:"#fff", fontWeight:800, flexShrink:0 }}>✓</div>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontSize:10, fontWeight:700, color:"#065F46", lineHeight:1.4 }} dangerouslySetInnerHTML={{ __html: entry.msg }} />
          <div style={{ fontSize:8, color:"#34D399", marginTop:2 }}>{entry.time}</div>
        </div>
      </div>
    );
  }
  return (
    <div className="rfqa-log-in" style={{ display:"flex", alignItems:"flex-start", gap:8, padding:"9px 11px", background:c.bg, border:`1px solid ${c.bo}`, borderRadius:10, flexShrink:0 }}>
      <span style={{ fontSize:13, flexShrink:0, marginTop:1 }}>{entry.icon}</span>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontSize:10.5, color:c.tx, lineHeight:1.55 }} dangerouslySetInnerHTML={{ __html: entry.msg }} />
        <div style={{ fontSize:8, color:"#94A3B8", marginTop:3 }}>{entry.time}</div>
      </div>
    </div>
  );
}

/* ── main export ── */
export default function RFQAgentDemo() {
  const [activeVid,   setActiveVid]   = useState(null);
  const [actioned,    setActioned]    = useState({});
  const [unread,      setUnread]      = useState({});
  const [logs,        setLogs]        = useState({});
  const [highlighted, setHighlighted] = useState({});
  const [badgeDone,   setBadgeDone]   = useState(false);
  const [summary,     setSummary]     = useState("Agent scanning all vendors…");
  const [loopKey,     setLoopKey]     = useState(0);

  const feedRefs = { metal: useRef(null), steel: useRef(null), alloy: useRef(null) };
  const timersRef = useRef([]);

  useEffect(() => {
    if (document.getElementById("rfqa-css")) return;
    const s = document.createElement("style");
    s.id = "rfqa-css";
    s.textContent = CSS;
    document.head.appendChild(s);
  }, []);

  useEffect(() => {
    if (activeVid && feedRefs[activeVid]?.current) {
      feedRefs[activeVid].current.scrollTop = feedRefs[activeVid].current.scrollHeight;
    }
  }, [logs, activeVid]);

  const clearAll = useCallback(() => { timersRef.current.forEach(clearTimeout); timersRef.current = []; }, []);

  const selectVendor = useCallback((vid) => {
    setActiveVid(vid);
    setUnread(u => ({ ...u, [vid]: 0 }));
  }, []);

  useEffect(() => {
    clearAll();
    setActiveVid(null); setActioned({}); setUnread({}); setLogs({});
    setHighlighted({}); setBadgeDone(false); setSummary("Agent scanning all vendors…");

    AUTO_SELECT.forEach(({ t, vid }) => {
      const id = setTimeout(() => setActiveVid(vid), t);
      timersRef.current.push(id);
    });

    SEQ.forEach(step => {
      const id = setTimeout(() => {
        if (step.type === "_hi") {
          setHighlighted(h => ({ ...h, [step.vid]: true }));
          setTimeout(() => setHighlighted(h => ({ ...h, [step.vid]: false })), 2160);
        } else if (step.type === "_actioned") {
          setActioned(a => ({ ...a, [step.vid]: true }));
          const time = new Date().toLocaleTimeString("en-IN", { hour:"2-digit", minute:"2-digit", second:"2-digit" });
          const doneEntry = { type:"done", icon:"✅", msg:`<strong>All actions complete</strong> for this vendor. Agent will follow up in 48h.`, time, key: Date.now() + Math.random() };
          setLogs(l => ({ ...l, [step.vid]: [...(l[step.vid] || []), doneEntry] }));
        } else if (step.type === "_done") {
          setBadgeDone(true);
          setSummary("3 of 3 vendors actioned");
        } else {
          const time = new Date().toLocaleTimeString("en-IN", { hour:"2-digit", minute:"2-digit", second:"2-digit" });
          setLogs(l => ({ ...l, [step.vid]: [...(l[step.vid] || []), { ...step, time, key: Date.now() + Math.random() }] }));
          setActiveVid(cur => {
            if (cur !== step.vid) setUnread(u => ({ ...u, [step.vid]: (u[step.vid] || 0) + 1 }));
            return cur;
          });
        }
      }, step.t);
      timersRef.current.push(id);
    });

    const loop = setTimeout(() => setLoopKey(k => k + 1), 21000);
    timersRef.current.push(loop);
    return clearAll;
  }, [loopKey, clearAll]);

  const vc = activeVid ? VCONF[activeVid] : null;

  return (
    <div style={{ width:"100%", height:"100%", background:"linear-gradient(160deg,#F0F2FF 0%,#F7F8FC 55%,#EEF5F2 100%)", display:"flex", flexDirection:"column", position:"relative", overflow:"hidden", fontFamily:"var(--fb)" }}>

      {/* dot grid */}
      <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(rgba(99,102,241,.05) 1px,transparent 1px)", backgroundSize:"22px 22px", pointerEvents:"none" }} />

      {/* chrome */}
      <div style={{ height:40, flexShrink:0, background:"linear-gradient(135deg,#1E1B4B,#2D2A6E)", display:"flex", alignItems:"center", padding:"0 14px", gap:7, position:"relative", zIndex:3 }}>
        <div style={{ width:21, height:21, borderRadius:6, background:"linear-gradient(135deg,#818CF8,#6366F1)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, fontWeight:800, color:"#fff", flexShrink:0 }}>N</div>
        {["RFQ","RFQ-2024-0091","AI Follow-up Agent"].map((seg,i,arr) => (
          <span key={seg} style={{ display:"flex", alignItems:"center", gap:5 }}>
            {i > 0 && <span style={{ fontSize:10, color:"rgba(255,255,255,.18)" }}>/</span>}
            <span style={{ fontSize:10, fontWeight:i===arr.length-1?600:400, color:i===arr.length-1?"rgba(255,255,255,.9)":"rgba(255,255,255,.35)" }}>{seg}</span>
          </span>
        ))}
        <div style={{ marginLeft:"auto" }}>
          {badgeDone ? (
            <div style={{ display:"inline-flex", alignItems:"center", gap:5, background:"rgba(16,185,129,.14)", border:"1px solid rgba(16,185,129,.35)", borderRadius:100, padding:"3px 10px", animation:"rfqa-badge .3s ease both" }}>
              <span style={{ fontSize:10 }}>✓</span>
              <span style={{ fontSize:8.5, fontWeight:700, color:"#6EE7B7", letterSpacing:".04em" }}>Done · Next check in 48h</span>
            </div>
          ) : (
            <div style={{ display:"inline-flex", alignItems:"center", gap:5, background:"rgba(245,158,11,.14)", border:"1px solid rgba(245,158,11,.35)", borderRadius:100, padding:"3px 10px" }}>
              <span style={{ width:5, height:5, borderRadius:"50%", background:"#F59E0B", display:"inline-block", animation:"rfqa-pulse 1.4s ease-in-out infinite" }} />
              <span style={{ fontSize:8.5, fontWeight:700, color:"#FCD34D", letterSpacing:".05em" }}>Scanning vendors…</span>
            </div>
          )}
        </div>
      </div>

      {/* meta strip */}
      <div style={{ height:28, flexShrink:0, background:"#fff", borderBottom:"1px solid #E2E8F0", display:"flex", alignItems:"center", padding:"0 14px", gap:10, position:"relative", zIndex:2 }}>
        <span style={{ fontSize:9, fontWeight:700, color:"#94A3B8", letterSpacing:".07em", textTransform:"uppercase" }}>RFQ-2024-0091</span>
        <div style={{ width:1, height:12, background:"#E2E8F0" }} />
        <span style={{ fontSize:9.5, color:"#475569" }}>Cold Rolled Steel Coils — Q1 2025</span>
        <div style={{ marginLeft:"auto", background:"#DBEAFE", borderRadius:5, padding:"2px 8px" }}>
          <span style={{ fontSize:8.5, fontWeight:700, color:"#1D4ED8" }}>● Open</span>
        </div>
        <span style={{ fontSize:8.5, color:"#94A3B8" }}>Closes 28 Feb 2025</span>
      </div>

      {/* body */}
      <div style={{ flex:1, display:"grid", gridTemplateColumns:"216px 1fr", minHeight:0, position:"relative", zIndex:1 }}>

        {/* LEFT vendor list */}
        <div style={{ background:"rgba(255,255,255,.72)", borderRight:"1px solid #E2E8F0", display:"flex", flexDirection:"column", overflow:"hidden" }}>
          <div style={{ padding:"9px 12px 5px", fontSize:9, fontWeight:700, color:"#94A3B8", letterSpacing:".08em", textTransform:"uppercase", flexShrink:0 }}>3 Vendors on this RFQ</div>

          {VENDORS.map(vm => (
            <VendorBtn
              key={vm.id}
              vm={vm}
              isActive={activeVid === vm.id}
              actioned={!!actioned[vm.id]}
              unread={!actioned[vm.id] ? (unread[vm.id] || 0) : 0}
              onClick={selectVendor}
            />
          ))}

          <div style={{ marginTop:"auto", padding:"9px 12px", borderTop:"1px solid #F1F5F9", flexShrink:0 }}>
            <div style={{ fontSize:8.5, fontWeight:500, color:"#475569" }}>{summary}</div>
          </div>
        </div>

        {/* RIGHT activity feed */}
        <div style={{ display:"flex", flexDirection:"column", minHeight:0, overflow:"hidden" }}>

          {/* feed header */}
          <div style={{ padding:"9px 14px 8px", borderBottom:"1px solid #F1F5F9", display:"flex", alignItems:"center", gap:9, flexShrink:0, background:"rgba(255,255,255,.88)" }}>
            {vc ? (
              <>
                <div style={{ width:26, height:26, borderRadius:7, flexShrink:0, background:`linear-gradient(135deg,${vc.g1},${vc.g2})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, fontWeight:800, color:"#fff" }}>
                  {INIT[activeVid]}
                </div>
                <div>
                  <div style={{ fontSize:11, fontWeight:700, color:"#0F172A" }}>{vc.name}</div>
                  <div style={{ fontSize:8.5, color:"#94A3B8" }}>{vc.sub} — activity log</div>
                </div>
                <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:4 }}>
                  <span style={{ width:6, height:6, borderRadius:"50%", background:"#10B981", display:"inline-block", animation:"rfqa-pulse 1.6s ease-in-out infinite" }} />
                  <span style={{ fontSize:8.5, fontWeight:600, color:"#10B981" }}>Live</span>
                </div>
              </>
            ) : (
              <>
                <div style={{ width:26, height:26, borderRadius:7, background:"#E2E8F0", flexShrink:0 }} />
                <div style={{ fontSize:11, fontWeight:500, color:"#94A3B8" }}>Select a vendor to view their activity</div>
              </>
            )}
          </div>

          {/* feed panels */}
          <div style={{ flex:1, position:"relative", minHeight:0 }}>
            {!activeVid && (
              <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:10 }}>
                <div style={{ width:38, height:38, borderRadius:10, background:"#F1F5F9", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>☰</div>
                <div style={{ fontSize:11, color:"#94A3B8", fontWeight:500 }}>Select a vendor to view their activity</div>
              </div>
            )}
            {VENDORS.map(vm => (
              <div
                key={vm.id}
                ref={feedRefs[vm.id]}
                className="rfqa-feed"
                style={{ position:"absolute", inset:0, overflowY:"auto", padding:"11px 14px", display:"flex", flexDirection:"column", gap:6, opacity:activeVid===vm.id?1:0, pointerEvents:activeVid===vm.id?"auto":"none", transition:"opacity .18s" }}
              >
                {(logs[vm.id] || []).length === 0 && activeVid === vm.id && (
                  <div style={{ padding:"14px 0", textAlign:"center", color:"#CBD5E1", fontSize:10 }}>Waiting for agent…</div>
                )}
                {(logs[vm.id] || []).map(e => <LogEntry key={e.key} entry={e} />)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
