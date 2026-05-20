"use client";

import { useState, useEffect, useRef, Fragment } from "react";
import { Nav } from "@/components/layout/SiteNav";
import { VDDFooter } from "@/components/layout/VDDFooter";
import { useWidth, useReveal, Eyebrow } from "@/components/shared/pageUi";

import { PRODUCT_PAGE_RESOURCES } from "@/components/layout/megaMenuData";

/* ═══════════════════════════════════════════════════════════
   SUPPLIER PORTAL — PRODUCT PAGE
   Shares design system with VDD page
═══════════════════════════════════════════════════════════ */

const spFaqs = [
  { q:"What is a Supplier Portal and why is the NimbleS2P Supplier Portal important for enterprises?", a:"A Supplier Portal is a digital platform that allows vendors to onboard, submit documents, track invoices, update profiles, and stay compliant. The Supplier Portal by NimbleS2P ensures faster onboarding, real-time visibility, and automated compliance checks — helping enterprises eliminate manual supplier management and reduce operational delays." },
  { q:"What features make the NimbleS2P Supplier Portal different from other supplier portals?", a:"The Supplier Portal by NimbleS2P is built with a compliance-first architecture, AI-powered agents, ERP integrations, automated validations, and real-time supplier communication. It offers a single window for onboarding, queries, document management, invoice submission, and compliance monitoring." },
  { q:"Can the portal handle large-scale enterprise supplier networks?", a:"Yes. The NimbleS2P Supplier Portal is built for enterprises with thousands of vendors across multiple business units, plants, and regions. It supports high-volume uploads, multi-level approvals, and complex supplier workflows." },
  { q:"How easy is the NimbleS2P Supplier Portal for vendors to use?", a:"The portal is designed with zero-learning UX, enabling vendors to onboard, upload documents, track payments, and manage queries without any training." },
  { q:"How does the Supplier Portal integrate with existing ERP systems?", a:"The Supplier Portal by NimbleS2P integrates seamlessly with leading ERPs like SAP, Oracle, and Microsoft Dynamics 365, as well as custom ERPs. It supports supplier master sync, PO and GRN fetch, and invoice posting, ensuring supplier data and transactions stay fully aligned." },
];

const spAgents = [
  { icon:"🎯", num:"01", title:"Query Resolution Agent", desc:"Handles supplier issues with smart classification, routing, and response suggestions — cutting resolution time drastically.", color:"#6320E0" },
  { icon:"🔔", num:"02", title:"Follow Up Agent", desc:"Automates reminders across multi-channels so that vendors never miss an action, without a single manual nudge.", color:"#0369A1" },
  { icon:"🛡", num:"03", title:"Compliance Agent", desc:"Monitors documents, expiries, and supplier data to keep every supplier continuously audit-ready, around the clock.", color:"#059669" },
];

const spFeatures = [
  { icon:"📄", title:"Single Click Invoice Submission", desc:"Vendors submit invoices in one step — no complex forms, no confusion. Just upload, confirm, done." },
  { icon:"💳", title:"Payment Status, Without the Guesswork", desc:"Real-time tracking on where payment stands: pending GRN, under approval, or paid — ending endless follow-up loops." },
  { icon:"🚚", title:"Shipment to GRN, All in One Flow", desc:"Advance Shipment Notes map automatically to GRNs, giving vendors full clarity on accepted, pending, and action items." },
  { icon:"💬", title:"Query Resolution Without the Ping-Pong", desc:"A structured query engine lets vendors raise, track, and close issues for any PO or invoice — no back-and-forth emails." },
  { icon:"📱", title:"Vendors Never Miss an Update", desc:"Email, SMS, and portal nudges ensure they stay informed across every channel — communication meets them where they are." },
  { icon:"📋", title:"No More Manual Follow-Ups for Routine Docs", desc:"The portal collects and verifies MSME status, due certificates, and compliance docs on its own — zero chasing." },
];

const spBenefitsSupplier = [
  { stat:"50%", label:"Less time chasing updates", desc:"One clear system — all transactions in one place" },
  { stat:"30–50%", label:"Faster payment cycles", desc:"Invoices validated before submission — no blind rework" },
  { stat:"70%", label:"Fewer disputes", desc:"Real-time visibility into approvals at every stage" },
  { stat:"40–60%", label:"Efficiency gain", desc:"No repeated emails, calls, or document resubmissions" },
];

const spBenefitsBuyer = [
  { stat:"30–50%", label:"Fewer follow-ups", desc:"Single tracked channel replaces fragmented emails" },
  { stat:"50%", label:"Faster audits", desc:"Every PO, invoice, and approval automatically logged" },
  { stat:"60–80%", label:"Fewer rejected invoices", desc:"Enforce SOPs before invoices enter your system" },
  { stat:"100%", label:"Transaction traceability", desc:"One window across sourcing, invoicing, and finance" },
];

/* ── SP FAQ Item with smooth animation ── */
function SPFAQItem({ f, isOpen, onToggle, isMobile }) {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);
  useEffect(() => {
    if (contentRef.current) setHeight(isOpen ? contentRef.current.scrollHeight : 0);
  }, [isOpen]);
  return (
    <div style={{ borderBottom:"1px solid #F1F5F9", overflow:"hidden" }}>
      <button onClick={onToggle} style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between", gap:16, padding:"22px 0", background:"transparent", border:"none", cursor:"pointer", textAlign:"left" }}>
        <span style={{ fontFamily:"var(--fb)", fontSize: isMobile ? 15 : 17, fontWeight:700, color:"#0F172A", letterSpacing:"-.01em", lineHeight:1.3 }}>{f.q}</span>
        <div style={{ width:32, height:32, borderRadius:"50%", background: isOpen ? "var(--p500)" : "#F1F5F9", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"all .25s cubic-bezier(.22,1,.36,1)" }}>
          <span style={{ fontSize:18, color: isOpen ? "#fff" : "var(--p500)", fontWeight:300, lineHeight:1, transition:"transform .25s cubic-bezier(.22,1,.36,1)", transform: isOpen ? "rotate(45deg)" : "none", display:"inline-block" }}>+</span>
        </div>
      </button>
      <div ref={contentRef} style={{ height:`${height}px`, overflow:"hidden", transition:"height .38s cubic-bezier(.22,1,.36,1)" }}>
        <p style={{ paddingBottom:24, fontSize:15, color:"#64748B", lineHeight:1.8, fontFamily:"var(--fb)" }}>{f.a}</p>
      </div>
    </div>
  );
}

/* ════════════════════════════════════
   SP HERO
════════════════════════════════════ */
function SPHero({ onNavigate }) {
  const w = useWidth(); const isMobile = w < 640;

  const spStats = [
    ["80","%","Query Reduction"],
    ["75","%","Faster Processing"],
    ["95","%","Adoption Rates"],
    ["100","%","Compliance"],
  ];

  return (
    <section style={{
      minHeight:"100vh", position:"relative", overflow:"hidden",
      background:"linear-gradient(140deg,#14104A 0%,#1E1660 40%,#261d6b 70%,#1a1258 100%)",
      display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
      padding: isMobile ? "110px 20px 64px" : "128px 5vw 80px",
      textAlign:"center",
    }}>
      {/* BG glows */}
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", background:"radial-gradient(ellipse 90% 70% at 50% 35%, rgba(99,32,224,.32) 0%, transparent 65%)" }} />
      <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"50%", pointerEvents:"none", background:"radial-gradient(ellipse 80% 60% at 50% 100%, rgba(245,166,35,.09) 0%, transparent 70%)" }} />
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", backgroundImage:"radial-gradient(rgba(255,255,255,.04) 1px,transparent 1px)", backgroundSize:"30px 30px" }} />

      <div style={{ position:"relative", zIndex:2, maxWidth:860, width:"100%" }}>
        {/* Eyebrow */}
        

        {/* H1 */}
        <h1 className="fade-up d1" style={{
          fontFamily:"var(--fb)", fontWeight:900,
          fontSize: isMobile ? "clamp(27px,7.7vw,40px)" : "clamp(40px,4.7vw,65px)",
          lineHeight:1.08, letterSpacing:"-.05em", marginBottom:22,
          background:"linear-gradient(95deg,#fff 0%,#fff 30%,#F5D060 62%,#F5A623 100%)",
          WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
          paddingBottom:"0.12em",
        }}>
          Supercharge Every<br />Supplier Transaction
        </h1>

        {/* Sub */}
        <p className="fade-up d2" style={{ fontSize: isMobile ? 15 : 17.5, color:"rgba(255,255,255,.52)", lineHeight:1.72, fontFamily:"var(--fb)", maxWidth:620, margin:"0 auto 36px" }}>
          The world's only hyper-configurable platform, fast enough to go-live in just few days with unbeatable supplier adoption.
        </p>

        {/* CTAs */}
        <div className="fade-up d3" style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap", marginBottom:56 }}>
          <a onClick={e=>{ e.preventDefault(); if(typeof onNavigate==="function") onNavigate("getstarted"); }} href="#" style={{ display:"inline-flex", alignItems:"center", gap:8,
            background:"linear-gradient(135deg,#E8920A,#F5B020)", color:"#fff",
            borderRadius:12, padding: isMobile ? "13px 28px" : "14px 34px",
            fontSize: isMobile ? 15 : 16, fontWeight:700,
            textDecoration:"none", fontFamily:"var(--fb)", letterSpacing:"-.01em",
            boxShadow:"0 6px 32px rgba(232,150,10,.52)",
            transition:"transform .2s, box-shadow .2s", }}
            onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 14px 44px rgba(232,150,10,.65)"; }}
            onMouseLeave={e=>{ e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow="0 6px 32px rgba(232,150,10,.52)"; }}
          >Get Started →</a>
          <a href="#features" style={{
            fontSize: isMobile ? 14 : 15, fontWeight:500, color:"rgba(255,255,255,.6)",
            fontFamily:"var(--fb)", textDecoration:"none", letterSpacing:"-.01em",
            display:"inline-flex", alignItems:"center", gap:5,
            transition:"color .18s",
          }}
            onMouseEnter={e=>e.currentTarget.style.color="#fff"}
            onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,.6)"}
          >See Features ↓</a>
        </div>

        {/* Stats tiles */}
        <div className="fade-up d4" style={{ width:"100%" }}>
          <div style={{ display:"grid", gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(4,1fr)", gap:1, background:"rgba(255,255,255,.07)", border:"1px solid rgba(255,255,255,.1)", borderRadius:16, overflow:"hidden", backdropFilter:"blur(12px)" }}>
            {spStats.map(([main,sup,label],i)=>(
              <div key={label} style={{ padding: isMobile ? "18px 12px" : "22px 16px", textAlign:"center", borderRight: i < spStats.length-1 && !(isMobile && i%2===1) ? "1px solid rgba(255,255,255,.08)" : "none", borderBottom: isMobile && i < 2 ? "1px solid rgba(255,255,255,.08)" : "none" }}>
                <div style={{ fontFamily:"var(--fb)", fontSize: isMobile ? 24 : 30, fontWeight:900, color:"#fff", letterSpacing:"-.04em", lineHeight:1 }}>{main}<span style={{ fontSize:"0.5em", verticalAlign:"super", fontWeight:900 }}>{sup}</span></div>
                <div style={{ fontSize:11, fontWeight:600, letterSpacing:".08em", textTransform:"uppercase", color:"rgba(255,255,255,.35)", marginTop:6, fontFamily:"var(--fb)" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Wave */}
      <div style={{ position:"absolute", bottom:0, left:0, right:0, height:48, overflow:"hidden", pointerEvents:"none" }}>
        <svg viewBox="0 0 1440 48" preserveAspectRatio="none" style={{ position:"absolute", bottom:0, left:0, width:"200%", height:"100%", animation:"waveSlide 10s linear infinite" }}>
          <path d="M0,24 C240,6 480,40 720,24 C960,8 1200,40 1440,24 L1440,48 L0,48 Z" fill="rgba(255,255,255,.05)" />
        </svg>
        <div style={{ position:"absolute", bottom:0, left:0, right:0, height:1, background:"linear-gradient(90deg,transparent,rgba(255,255,255,.1) 30%,rgba(255,255,255,.1) 70%,transparent)" }} />
      </div>
    </section>
  );
}

/* ════════════════════════════════════
   SP VIDEO
════════════════════════════════════ */
function SPVideo() {
  const w = useWidth(); const isMobile = w < 640;
  const ref = useReveal();
  return (
    <section style={{ background:"var(--slp)", padding: isMobile ? "64px 20px" : "clamp(64px,9vh,104px) 5vw" }}>
      <div style={{ maxWidth:900, margin:"0 auto" }}>
        <div className="reveal" ref={ref}>
          <div style={{ marginBottom: isMobile ? 28 : 40 }}>
            <Eyebrow>See It In Action</Eyebrow>
            <h2 style={{ fontFamily:"var(--fb)", fontSize: isMobile ? "clamp(22px,6vw,30px)" : "clamp(26px,3vw,38px)", fontWeight:700, letterSpacing:"-.04em", lineHeight:1.08, color:"#0F172A" }}>
              Watch the Supplier Portal live
            </h2>
          </div>
          <div style={{ borderRadius:20, overflow:"hidden", boxShadow:"0 8px 48px rgba(0,0,0,.12)", border:"1px solid #E2E8F0", background:"#0d0b26", position:"relative", cursor:"pointer" }}>
            <div style={{ position:"relative", paddingTop:"52%", overflow:"hidden" }}>
              <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg,#1a1645 0%,#2a2070 50%,#1e1850 100%)" }} />
              <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 60% 70% at 50% 40%, rgba(99,32,224,.2) 0%, transparent 65%)" }} />
              <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(rgba(255,255,255,.03) 1px,transparent 1px)", backgroundSize:"20px 20px" }} />
              <div style={{ position:"absolute", bottom:"-5%", left:"50%", transform:"translateX(-50%)", width:"40%", height:"80%", background:"linear-gradient(180deg,rgba(100,160,240,.15) 0%,rgba(20,60,120,.35) 100%)", borderRadius:"48% 48% 0 0", filter:"blur(3px)" }} />
              <div style={{ position:"absolute", top:16, left:16, zIndex:3, display:"inline-flex", alignItems:"center", gap:6, background:"rgba(0,0,0,.55)", backdropFilter:"blur(10px)", border:"1px solid rgba(255,255,255,.15)", borderRadius:100, padding:"5px 12px" }}>
                <span style={{ width:6, height:6, borderRadius:"50%", background:"#34D399", display:"inline-block", boxShadow:"0 0 6px #34D399", animation:"pulse-dot 2s ease-in-out infinite" }} />
                <span style={{ fontSize:11, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", color:"rgba(255,255,255,.75)", fontFamily:"var(--fb)" }}>Supplier Portal</span>
              </div>
              <div style={{ position:"absolute", top:16, right:16, zIndex:3, background:"rgba(0,0,0,.55)", backdropFilter:"blur(10px)", border:"1px solid rgba(255,255,255,.12)", borderRadius:6, padding:"3px 10px", fontSize:11, fontWeight:600, color:"rgba(255,255,255,.75)", fontFamily:"var(--fm)" }}>4:12</div>
              <div style={{ position:"absolute", top:"44%", left:"50%", transform:"translate(-50%,-50%)", width:68, height:68, borderRadius:"50%", background:"rgba(255,255,255,.16)", backdropFilter:"blur(14px)", border:"2px solid rgba(255,255,255,.35)", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 0 0 14px rgba(255,255,255,.06)", zIndex:3, transition:"all .2s" }}
                onMouseEnter={e=>{ e.currentTarget.style.background="rgba(52,211,153,.35)"; e.currentTarget.style.transform="translate(-50%,-50%) scale(1.08)"; }}
                onMouseLeave={e=>{ e.currentTarget.style.background="rgba(255,255,255,.16)"; e.currentTarget.style.transform="translate(-50%,-50%)"; }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M8 5l13 7-13 7V5z"/></svg>
              </div>
              <div style={{ position:"absolute", bottom:0, left:0, right:0, zIndex:3, padding:"0 16px 14px", background:"linear-gradient(0deg,rgba(0,0,0,.65) 0%,transparent 100%)" }}>
                <div style={{ height:3, background:"rgba(255,255,255,.22)", borderRadius:3, marginBottom:10, position:"relative" }}>
                  <div style={{ position:"absolute", left:0, top:0, bottom:0, width:"28%", background:"rgba(255,255,255,.85)", borderRadius:3 }} />
                  <div style={{ position:"absolute", left:"28%", top:"50%", transform:"translate(-50%,-50%)", width:11, height:11, borderRadius:"50%", background:"#fff" }} />
                </div>
              </div>
            </div>
            <div style={{ padding:"20px 28px", background:"#fff", display:"flex", alignItems:"flex-start", justifyContent:"space-between", flexWrap:"wrap", gap:14, borderTop:"1px solid #F1F5F9" }}>
              <p style={{ fontSize: isMobile ? 14 : 15.5, color:"#334155", fontFamily:"var(--fb)", lineHeight:1.65, fontStyle:"italic", flex:1, minWidth:220, margin:0 }}>
                "We went from chasing vendors every day to having everything tracked and automated. The adoption was instant."
              </p>
              <div style={{ textAlign:"right", flexShrink:0 }}>
                <div style={{ fontSize:14.5, fontWeight:700, color:"var(--p500)", fontFamily:"var(--fb)" }}>Priya Mehta</div>
                <div style={{ fontSize:12, color:"#94A3B8", fontFamily:"var(--fb)", marginTop:2 }}>VP Procurement, FMCG Enterprise</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════
   SP AI AGENTS
════════════════════════════════════ */
function SPAIAgents() {
  const w = useWidth(); const isMobile = w < 640; const isTablet = w < 900;
  const [active, setActive] = useState(0);
  const ag = spAgents[active];
  const ref = useReveal();

  return (
    <section style={{ background:"#fff", position:"relative", overflow:"hidden", padding: isMobile ? "64px 20px" : "clamp(64px,9vh,104px) 5vw" }}>
      {/* Top accent line */}
      <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:"linear-gradient(90deg,var(--p500),var(--p300),#F59E0B)", pointerEvents:"none" }} />

      <div style={{ maxWidth:1080, margin:"0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: isMobile ? 36 : 52 }}>
          <Eyebrow>AI Agents</Eyebrow>
          <h2 style={{ fontFamily:"var(--fb)", fontSize: isMobile ? "clamp(24px,6vw,34px)" : "clamp(28px,3.5vw,44px)", fontWeight:700, letterSpacing:"-.04em", lineHeight:1.0, color:"#0F172A", marginBottom:12 }}>
            NimbleS2P's AI: Always On,<br />So Stay Ahead
          </h2>
          <p style={{ fontSize: isMobile ? 14.5 : 16, color:"#64748B", lineHeight:1.72, fontFamily:"var(--fb)", maxWidth:520 }}>
            Specialized agents running continuously — catching what humans miss, around the clock.
          </p>
        </div>

        {/* 3 agent cards — always visible, no toggling */}
        <div className="reveal" ref={ref} style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(3,1fr)", gap:16, marginBottom:32 }}>
          {spAgents.map((a,i)=>{
            const isActive = active === i;
            return (
              <div key={a.title}
                onClick={()=>setActive(i)}
                style={{
                  position:"relative", overflow:"hidden",
                  borderRadius:20, cursor:"pointer",
                  border:`1.5px solid ${isActive ? a.color+"44" : "#F1F5F9"}`,
                  background: isActive ? `linear-gradient(145deg,${a.color}08,${a.color}03)` : "#FAFBFF",
                  padding: isMobile ? "24px 20px" : "32px 28px",
                  transition:"all .25s cubic-bezier(.22,1,.36,1)",
                  boxShadow: isActive ? `0 8px 32px ${a.color}18, 0 2px 8px rgba(0,0,0,.05)` : "0 1px 4px rgba(0,0,0,.04)",
                }}
                onMouseEnter={e=>{ if(!isActive){ e.currentTarget.style.borderColor="#E2E8F0"; e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 8px 24px rgba(0,0,0,.08)"; }}}
                onMouseLeave={e=>{ if(!isActive){ e.currentTarget.style.borderColor="#F1F5F9"; e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow="0 1px 4px rgba(0,0,0,.04)"; }}}
              >


                {/* Icon — bare, no box */}
                <div style={{ fontSize:32, marginBottom:16, lineHeight:1 }}>{a.icon}</div>



                {/* Title */}
                <h3 style={{ fontFamily:"var(--fb)", fontSize: isMobile ? 19 : 22, fontWeight:800, color: isActive ? "#0F172A" : "#1E293B", letterSpacing:"-.03em", lineHeight:1.15, marginBottom:10, transition:"color .25s" }}>{a.title}</h3>

                {/* Desc */}
                <p style={{ fontSize:14, color: isActive ? "#334155" : "#475569", lineHeight:1.68, fontFamily:"var(--fb)", margin:0, transition:"color .25s" }}>{a.desc}</p>

                {/* Active indicator — coloured bottom bar */}
                {isActive && (
                  <div style={{ position:"absolute", bottom:0, left:0, right:0, height:3, background:`linear-gradient(90deg,${a.color},${a.color}66,transparent)`, borderRadius:"0 0 20px 20px" }} />
                )}
              </div>
            );
          })}
        </div>

        {/* Detail strip — shows for active agent */}
        <div style={{
          background:`linear-gradient(135deg,${ag.color}08,${ag.color}04)`,
          border:`1px solid ${ag.color}22`,
          borderRadius:16, padding: isMobile ? "20px 18px" : "24px 32px",
          display:"flex", alignItems:"center", justifyContent:"space-between",
          flexWrap:"wrap", gap:16,
          transition:"all .3s cubic-bezier(.22,1,.36,1)",
        }}>
          <div style={{ display:"flex", alignItems:"center", gap:14, flexShrink:0 }}>
            <div style={{ width:40, height:40, borderRadius:12, background:`linear-gradient(135deg,${ag.color},${ag.color}bb)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, boxShadow:`0 4px 14px ${ag.color}44` }}>{ag.icon}</div>
            <div>
              <div style={{ fontSize:12, fontWeight:700, color:ag.color, fontFamily:"var(--fb)", letterSpacing:".04em", textTransform:"uppercase", marginBottom:2 }}>Agent {ag.num} — Active</div>
              <div style={{ fontSize:15, fontWeight:700, color:"#0F172A", fontFamily:"var(--fb)", letterSpacing:"-.02em" }}>{ag.title}</div>
            </div>
          </div>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            {([
              [["⏱️","Reduced Resolution Delays"],["🤝","Consistent Supplier Support"],["📉","Lower Support Workload"]],
              [["🔔","Timely Vendor Nudges"],["⚡","Action-Based Follow-Ups"],["🧠","Context-Aware Reminders"]],
              [["🏛️","Enterprise-Grade Governance"],["✅","Always Audit-Prepared"],["📅","Proactive Expiry Detection"]],
            ][active] || []).map(([icon,label])=>(
              <span key={label} style={{ display:"inline-flex", alignItems:"center", gap:5, background:`${ag.color}10`, border:`1px solid ${ag.color}28`, borderRadius:100, padding:"5px 13px", fontSize:12.5, fontWeight:600, color:ag.color, fontFamily:"var(--fb)" }}>{icon} {label}</span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

/* ════════════════════════════════════
   SP URGENCY SECTION
════════════════════════════════════ */
function SPUrgency() {
  const w = useWidth(); const isMobile = w < 640;
  const lineCount = 36;
  const ref = useReveal();
  return (
    <section style={{
      position:"relative", overflow:"hidden",
      background:[
        "radial-gradient(ellipse 55% 60% at 0% 0%,   #FCC96B 0%, transparent 65%)",
        "radial-gradient(ellipse 50% 55% at 100% 0%,  #FCBB4A 0%, transparent 60%)",
        "radial-gradient(ellipse 40% 50% at 100% 100%,#F5C86A 0%, transparent 55%)",
        "radial-gradient(ellipse 30% 40% at 0% 80%,   #FDD08A 0%, transparent 55%)",
        "#ffffff",
      ].join(","),
      minHeight:"100vh",
      display:"flex", flexDirection:"column", justifyContent:"center",
      padding: isMobile ? "52px 20px 62px" : "clamp(62px,9vh,104px) 5vw",
    }}>
      {/* Dashed vertical lines */}
      <div style={{ position:"absolute", inset:0, display:"flex", pointerEvents:"none", zIndex:0, WebkitMaskImage:"linear-gradient(90deg, transparent 0%, rgba(0,0,0,.08) 25%, rgba(0,0,0,.28) 50%, rgba(0,0,0,.55) 70%, rgba(0,0,0,.7) 100%)", maskImage:"linear-gradient(90deg, transparent 0%, rgba(0,0,0,.08) 25%, rgba(0,0,0,.28) 50%, rgba(0,0,0,.55) 70%, rgba(0,0,0,.7) 100%)" }}>
        {Array.from({ length: lineCount }).map((_,i) => (
          <div key={i} style={{ flex:1, borderRight:"1px dashed rgba(200,140,40,.35)" }} />
        ))}
      </div>

      <div style={{ maxWidth:1040, margin:"0 auto", position:"relative", zIndex:1, width:"100%", textAlign:"center" }}>
        <div className="reveal" ref={ref} style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>

          {/* Large decorative open quote */}
          <div style={{
            fontFamily:"Georgia, serif", fontSize: isMobile ? 120 : 200,
            lineHeight:.7, color:"#C8930A", opacity:.22,
            userSelect:"none", marginBottom: isMobile ? -24 : -48,
          }}>"</div>

          {/* THE MAIN STATEMENT — massive, emotional */}
          <blockquote style={{ margin:0, padding:0 }}>
            <p className="kalam" style={{
              fontSize: isMobile ? "clamp(22px,6vw,32px)" : "clamp(26px,2.9vw,44px)",
              lineHeight:1.35, letterSpacing:".005em",
              color:"#1a1a3e", margin:0,
            }}>
              If suppliers still chase you<br />through inboxes, you're not{" "}
              <span>"future-ready."</span>
              <br />
              <span className="kalam-highlight">You're just future-pretending.</span>
            </p>
          </blockquote>

        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════
   SP FEATURES
════════════════════════════════════ */
function SPFeatures() {
  const w = useWidth(); const isMobile = w < 640; const isTablet = w < 900;
  const ref = useReveal();
  return (
    <section id="features" style={{
      background:"linear-gradient(160deg,#1E1660 0%,#261d6b 50%,#1a1258 100%)",
      position:"relative", overflow:"hidden",
      padding: isMobile ? "64px 20px" : "clamp(64px,9vh,104px) 5vw",
    }}>
      {/* Subtle dot grid */}
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", backgroundImage:"radial-gradient(rgba(255,255,255,.045) 1px,transparent 1px)", backgroundSize:"28px 28px" }} />
      {/* Ambient glow */}
      <div style={{ position:"absolute", top:"-10%", right:"-5%", width:"45%", height:"70%", background:"radial-gradient(ellipse, rgba(99,32,224,.22) 0%, transparent 65%)", pointerEvents:"none" }} />

      <div style={{ maxWidth:1080, margin:"0 auto", position:"relative", zIndex:1 }}>

        {/* Header */}
        <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", flexWrap:"wrap", gap:20, marginBottom: isMobile ? 36 : 52 }}>
          <div>
            <Eyebrow dark>Features</Eyebrow>
            <h2 style={{ fontFamily:"var(--fb)", fontSize: isMobile ? "clamp(22px,6vw,32px)" : "clamp(26px,3vw,40px)", fontWeight:900, letterSpacing:"-.04em", lineHeight:1.06, background:"linear-gradient(95deg,#fff 0%,#fff 30%,#F5D060 62%,#F5A623 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", marginBottom:10 }}>
              Built for suppliers.<br />Loved by procurement teams.
            </h2>
            <p style={{ fontSize:15, color:"rgba(255,255,255,.45)", lineHeight:1.7, fontFamily:"var(--fb)", maxWidth:480 }}>Six capabilities that eliminate friction at every touchpoint.</p>
          </div>
        </div>

        {/* 2-column card grid */}
        <div className="reveal" ref={ref} style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "1fr 1fr", gap:12 }}>
          {spFeatures.map((f, i) => (
            <div key={f.title} style={{
              background:"rgba(255,255,255,.05)",
              border:"1px solid rgba(255,255,255,.09)",
              borderRadius:18,
              padding: isMobile ? "22px 18px" : "28px 28px",
              display:"flex", gap:18, alignItems:"flex-start",
              backdropFilter:"blur(8px)",
              transition:"all .22s cubic-bezier(.22,1,.36,1)",
              cursor:"default",
            }}
              onMouseEnter={e=>{ e.currentTarget.style.background="rgba(255,255,255,.1)"; e.currentTarget.style.borderColor="rgba(255,255,255,.18)"; e.currentTarget.style.transform="translateY(-2px)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.background="rgba(255,255,255,.05)"; e.currentTarget.style.borderColor="rgba(255,255,255,.09)"; e.currentTarget.style.transform=""; }}
            >
              {/* Icon */}
              <div style={{ width:48, height:48, borderRadius:14, background:"rgba(255,255,255,.08)", border:"1px solid rgba(255,255,255,.12)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>{f.icon}</div>

              {/* Text */}
              <div style={{ minWidth:0, flex:1 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8, flexWrap:"wrap" }}>
                  <h3 style={{ fontFamily:"var(--fb)", fontSize: isMobile ? 15 : 16.5, fontWeight:700, color:"#fff", letterSpacing:"-.02em", lineHeight:1.2, margin:0 }}>{f.title}</h3>
                  <span style={{ fontSize:9, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", color:"rgba(255,255,255,.35)", background:"rgba(255,255,255,.07)", border:"1px solid rgba(255,255,255,.1)", borderRadius:100, padding:"2px 8px", whiteSpace:"nowrap", fontFamily:"var(--fb)" }}>{String(i+1).padStart(2,"0")}</span>
                </div>
                <p style={{ fontSize: isMobile ? 13 : 14, color:"rgba(255,255,255,.5)", lineHeight:1.68, fontFamily:"var(--fb)", margin:0 }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════
   SP BENEFITS
════════════════════════════════════ */
function SPBenefits() {
  const w = useWidth(); const isMobile = w < 640; const isTablet = w < 900;
  const ref = useReveal();
  return (
    <section style={{ background:"var(--slp)", padding: isMobile ? "64px 20px" : "clamp(64px,9vh,104px) 5vw" }}>
      <div style={{ maxWidth:1080, margin:"0 auto" }}>
        <div className="reveal" ref={ref}>
          <div style={{ marginBottom: isMobile ? 36 : 52 }}>
            <Eyebrow>Business Impact</Eyebrow>
            <h2 style={{ fontFamily:"var(--fb)", fontSize: isMobile ? "clamp(22px,6vw,32px)" : "clamp(26px,3vw,40px)", fontWeight:700, letterSpacing:"-.04em", lineHeight:1.06, color:"#0F172A", marginBottom:10 }}>
              Wins on both sides of the table
            </h2>
            <p style={{ fontSize:15, color:"#64748B", lineHeight:1.7, fontFamily:"var(--fb)" }}>Real outcomes for suppliers and buyers alike.</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns: isTablet ? "1fr" : "1fr 1fr", gap:20 }}>
            {/* For Suppliers */}
            <div style={{ background:"#fff", borderRadius:20, border:"1px solid #E2E8F0", overflow:"hidden", boxShadow:"0 4px 24px rgba(0,0,0,.05)" }}>
              <div style={{ background:"linear-gradient(135deg,#059669,#10B981)", padding:"18px 24px", display:"flex", alignItems:"center", gap:10 }}>
                <span style={{ fontSize:20 }}>🏢</span>
                <span style={{ fontFamily:"var(--fb)", fontSize:16, fontWeight:800, color:"#fff", letterSpacing:"-.02em" }}>For Suppliers (Vendors)</span>
              </div>
              <div style={{ padding:"20px 24px", display:"flex", flexDirection:"column", gap:14 }}>
                {spBenefitsSupplier.map(b=>(
                  <div key={b.label} style={{ display:"flex", alignItems:"flex-start", gap:14 }}>
                    <div style={{ fontFamily:"var(--fb)", fontSize:20, fontWeight:900, color:"#059669", letterSpacing:"-.03em", lineHeight:1, flexShrink:0, minWidth:72 }}>{b.stat}</div>
                    <div>
                      <div style={{ fontSize:13.5, fontWeight:700, color:"#0F172A", fontFamily:"var(--fb)", marginBottom:2 }}>{b.label}</div>
                      <div style={{ fontSize:12.5, color:"#64748B", fontFamily:"var(--fb)" }}>{b.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* For Buyers */}
            <div style={{ background:"#fff", borderRadius:20, border:"1px solid #E2E8F0", overflow:"hidden", boxShadow:"0 4px 24px rgba(0,0,0,.05)" }}>
              <div style={{ background:"linear-gradient(135deg,#2D1A80,#6320E0)", padding:"18px 24px", display:"flex", alignItems:"center", gap:10 }}>
                <span style={{ fontSize:20 }}>🏗️</span>
                <span style={{ fontFamily:"var(--fb)", fontSize:16, fontWeight:800, color:"#fff", letterSpacing:"-.02em" }}>For Buyers (Enterprises)</span>
              </div>
              <div style={{ padding:"20px 24px", display:"flex", flexDirection:"column", gap:14 }}>
                {spBenefitsBuyer.map(b=>(
                  <div key={b.label} style={{ display:"flex", alignItems:"flex-start", gap:14 }}>
                    <div style={{ fontFamily:"var(--fb)", fontSize:20, fontWeight:900, color:"var(--p500)", letterSpacing:"-.03em", lineHeight:1, flexShrink:0, minWidth:72 }}>{b.stat}</div>
                    <div>
                      <div style={{ fontSize:13.5, fontWeight:700, color:"#0F172A", fontFamily:"var(--fb)", marginBottom:2 }}>{b.label}</div>
                      <div style={{ fontSize:12.5, color:"#64748B", fontFamily:"var(--fb)" }}>{b.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════
   SP FAQs
════════════════════════════════════ */
function SPFAQs() {
  const w = useWidth(); const isMobile = w < 640;
  const [open, setOpen] = useState(null);
  const ref = useReveal();
  return (
    <section style={{ background:"#fff", position:"relative", overflow:"hidden", padding: isMobile ? "64px 20px" : "clamp(64px,9vh,104px) 5vw" }}>
      {/* Top accent line */}
      <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:"linear-gradient(90deg,var(--p500),var(--p300),#F59E0B)", pointerEvents:"none" }} />
      <div style={{ maxWidth:1040, margin:"0 auto" }}>
        <div className="reveal" ref={ref} style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1.5fr", gap: isMobile ? 36 : 64, alignItems:"start" }}>
          <div style={{ position:"static" }}>
            <Eyebrow>FAQs</Eyebrow>
            <h2 style={{ fontFamily:"var(--fb)", fontSize: isMobile ? "clamp(24px,6vw,32px)" : "clamp(26px,3vw,38px)", fontWeight:700, letterSpacing:"-.04em", lineHeight:1.08, color:"#0F172A", marginBottom:16 }}>Questions<br />we get asked</h2>
            <p style={{ fontSize:15, color:"#64748B", lineHeight:1.7, fontFamily:"var(--fb)", marginBottom:28 }}>Everything about the NimbleS2P Supplier Portal, answered.</p>
            <a href="#" style={{ display:"inline-flex", alignItems:"center", gap:6, fontSize:14, fontWeight:600, color:"var(--p600)", fontFamily:"var(--fb)", textDecoration:"none", borderBottom:"1.5px solid var(--p200)", paddingBottom:2, transition:"color .15s, border-color .15s" }}
              onMouseEnter={e=>{ e.currentTarget.style.color="var(--p700)"; e.currentTarget.style.borderColor="var(--p400)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.color="var(--p600)"; e.currentTarget.style.borderColor="var(--p200)"; }}
            >Talk to our team →</a>
          </div>
          <div style={{ borderTop:"1px solid #E2E8F0" }}>
            {spFaqs.map((f,i)=>(
              <SPFAQItem key={i} f={f} isOpen={open===i} onToggle={()=>setOpen(open===i ? null : i)} isMobile={isMobile} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════
   SP CTA
════════════════════════════════════ */
function SPCTA() {
  const w = useWidth(); const isMobile = w < 640;
  const [email, setEmail] = useState(""); const [done, setDone] = useState(false);
  const ref = useReveal();
  return (
    <section style={{ background:"linear-gradient(160deg,#0f0c29 0%,#1a1260 40%,#261d6b 70%,#1e1050 100%)", position:"relative", overflow:"hidden", padding: isMobile ? "64px 20px 80px" : "clamp(72px,9vh,110px) 5vw" }}>
      <div style={{ position:"absolute", bottom:"-15%", right:"-5%", width:"55%", height:"85%", background:"radial-gradient(ellipse at 80% 80%, rgba(245,166,35,.16) 0%, transparent 60%)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", top:"-15%", left:"-5%", width:"55%", height:"80%", background:"radial-gradient(ellipse at 20% 20%, rgba(99,32,224,.28) 0%, transparent 60%)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(rgba(255,255,255,.05) 1px,transparent 1px)", backgroundSize:"26px 26px", pointerEvents:"none" }} />
      <div style={{ maxWidth:1040, margin:"0 auto", position:"relative", zIndex:2 }}>
        <div className="reveal" ref={ref} style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 40 : 80, alignItems:"center" }}>
          <div>
            <div style={{ display:"inline-flex", alignItems:"center", gap:7, background:"rgba(52,211,153,.12)", border:"1px solid rgba(52,211,153,.28)", borderRadius:100, padding:"5px 14px", marginBottom:20 }}>
              <span style={{ width:6, height:6, borderRadius:"50%", background:"#34D399", display:"inline-block", animation:"pulse-dot 2s infinite" }} />
              <span style={{ fontSize:11, fontWeight:700, color:"#6EE7B7", fontFamily:"var(--fb)", letterSpacing:".05em", textTransform:"uppercase" }}>Free Case Study</span>
            </div>
            <h2 style={{ fontFamily:"var(--fb)", fontWeight:900, fontSize: isMobile ? "clamp(24px,7vw,34px)" : "clamp(26px,3.2vw,40px)", lineHeight:1.06, letterSpacing:"-.04em", background:"linear-gradient(95deg,#fff 0%,#fff 30%,#F5D060 62%,#F5A623 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", marginBottom:16 }}>
              {PRODUCT_PAGE_RESOURCES.supplier.label}
            </h2>
            <p style={{ fontSize: isMobile ? 14.5 : 16, color:"rgba(255,255,255,.48)", lineHeight:1.75, fontFamily:"var(--fb)" }}>Full case study inside — how India's leading enterprises transformed supplier relationships with NimbleS2P.</p>
          </div>
          <div style={{ background:"rgba(255,255,255,.06)", border:"1px solid rgba(255,255,255,.12)", borderRadius:20, padding: isMobile ? "28px 22px" : "36px 32px", backdropFilter:"blur(16px)" }}>
            {!done ? (
              <>
                <div style={{ fontSize:13, fontWeight:600, color:"rgba(255,255,255,.5)", fontFamily:"var(--fb)", marginBottom:20 }}>Enter your work email to get instant access</div>
                <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                  <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@company.com"
                    style={{ width:"100%", background:"rgba(255,255,255,.08)", border:"1.5px solid rgba(255,255,255,.16)", borderRadius:10, outline:"none", padding:"13px 16px", fontSize:15, color:"#fff", fontFamily:"var(--fb)", transition:"border-color .18s" }}
                    onFocus={e=>e.target.style.borderColor="rgba(52,211,153,.6)"}
                    onBlur={e=>e.target.style.borderColor="rgba(255,255,255,.16)"}
                  />
                  <button onClick={()=>{ if(email) setDone(true); }} style={{ width:"100%", background:"linear-gradient(135deg,#E8920A,#F5B020)", color:"#fff", border:"none", borderRadius:10, padding:"13px 24px", fontSize:15, fontWeight:700, cursor:"pointer", fontFamily:"var(--fb)", boxShadow:"0 6px 24px rgba(232,150,10,.45)", transition:"all .2s" }}
                    onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-1px)"; e.currentTarget.style.boxShadow="0 10px 32px rgba(232,150,10,.6)"; }}
                    onMouseLeave={e=>{ e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow="0 6px 24px rgba(232,150,10,.45)"; }}
                  >Download Full Case Study →</button>
                </div>
                <p style={{ fontSize:11.5, color:"rgba(255,255,255,.22)", marginTop:14, fontFamily:"var(--fb)", textAlign:"center" }}>No spam. Unsubscribe anytime.</p>
              </>
            ) : (
              <div style={{ textAlign:"center", padding:"20px 0" }}>
                <div style={{ fontSize:40, marginBottom:14 }}>✅</div>
                <div style={{ fontSize:16, fontWeight:700, color:"#34D399", fontFamily:"var(--fb)", marginBottom:8 }}>Case study on its way!</div>
                <div style={{ fontSize:14, color:"rgba(255,255,255,.45)", fontFamily:"var(--fb)" }}>Check your inbox at {email}</div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* ── Bottom wave — transition to footer ── */}
      <div style={{ position:"absolute", bottom:0, left:0, right:0, height:52, overflow:"hidden", pointerEvents:"none" }}>
        <svg viewBox="0 0 1440 52" preserveAspectRatio="none"
          style={{ position:"absolute", bottom:0, left:0, width:"200%", height:"100%", animation:"waveSlide 10s linear infinite" }}>
          <path d="M0,26 C200,8 400,44 600,26 C800,8 1000,42 1200,26 C1360,12 1440,34 1440,26 L1440,52 L0,52 Z" fill="rgba(99,32,224,.12)" />
          <path d="M0,36 C180,14 380,50 580,32 C780,14 980,46 1180,30 C1340,16 1440,38 1440,36 L1440,52 L0,52 Z" fill="rgba(130,80,230,.07)" />
        </svg>
        <div style={{ position:"absolute", bottom:0, left:0, right:0, height:1,
          background:"linear-gradient(90deg,transparent,rgba(139,92,246,.4) 30%,rgba(139,92,246,.4) 70%,transparent)"
        }} />
      </div>
    </section>
  );
}

/* ════════════════════════════════════
   SP ROOT PAGE
════════════════════════════════════ */
export default function SupplierPortalPage({ onBack, onNavigate }) {
  return (
    <>
      <Nav onNavigate={onNavigate} onBack={onBack} pageName="Supplier Portal" />
      <main>
        <SPHero onNavigate={onNavigate} />
        <SPVideo />
        <SPAIAgents />
        <SPUrgency />
        <SPFeatures />
        <SPBenefits />
        <SPFAQs />
        <SPCTA />
      </main>
      <VDDFooter onNavigate={onNavigate} />
    </>
  );
}
