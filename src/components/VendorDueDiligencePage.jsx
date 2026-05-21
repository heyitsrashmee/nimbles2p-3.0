"use client";

import { useState, useEffect, useRef, Fragment } from "react";
import { Nav } from "@/components/layout/SiteNav";
import { VDDFooter } from "@/components/layout/VDDFooter";
import { useWidth, useReveal, Eyebrow } from "@/components/shared/pageUi";

import { PRODUCT_PAGE_RESOURCES } from "@/components/layout/megaMenuData";

/* ═══════════════════════════════════════════════════════════
   SUPPLIER DUE DILIGENCE — PRODUCT PAGE
   Nav: same homepage Nav component with onBack breadcrumb
═══════════════════════════════════════════════════════════ */

/* ── DATA ── */
const tableRows = [
  ["Onboarding Speed","Weeks to months, manual & opaque","Onboard within minutes"],
  ["Compliance","Reactive, one-time checks, audit shocks","24/7 continuous, always audit-ready"],
  ["IT Dependency","Heavy IT involvement for every change","Self Serve Workflows"],
  ["Operations","Chaotic, bottlenecks, no accountability","Predictable, frictionless, high-speed"],
  ["Audit Readiness","Days chasing evidence, last-minute panic","Resolved in minutes with traceable logs"],
  ["Document Collection","Manual chasing, incomplete submissions","AI-driven reminders, timely & complete"],
  ["Data Accuracy","Stale data, payment failures, fraud risk","Real-time supplier updates, pristine ERP"],
  ["Risk Detection","Issues surface late as costly failures","Multi-point checks catch anomalies early"],
];

const agents = [
  { icon:"🔍", title:"Data Verification",    desc:"AI-calibrated OCR matches data against source documents in real time — zero manual cross-checking needed.", color:"#6320E0", num:"01" },
  { icon:"📁", title:"Document Classifier",  desc:"Auto-classifies every document type, flags gaps, and ensures completeness before submission reaches your team.", color:"#0369A1", num:"02" },
  { icon:"⚠️", title:"Anomaly Detection",    desc:"Multi-signal pattern engine spots fraud, duplicates, and data anomalies before they become expensive problems.", color:"#DB2777", num:"03" },
  { icon:"📋", title:"SOPs Enforcement",     desc:"Every workflow step enforced by policy — your SOPs run automatically, consistently, without human intervention.", color:"#059669", num:"04" },
];

const faqs = [
  { q:"Can vendors complete onboarding without manual help?", a:"Yes. Vendors receive a DIY, self-service onboarding form with auto-validation, real-time checks, mobile compatibility, and automated reminders — removing dependency on support teams entirely." },
  { q:"Is multi-entity or multi-location onboarding supported?", a:"Absolutely. The platform supports multi-company code, multi-plant, and BU-specific onboarding rules, making it ideal for large multi-entity enterprises with complex structures." },
  { q:"How does NimbleS2P simplify supplier query resolution?", a:"The platform replaces email-based chaos with structured query types, auto-routing, SLA tracking, and escalation logic — reducing manual follow-ups and improving transparency across the board." },
  { q:"Are SLAs and escalations configurable?", a:"Fully configurable. Enterprises can define SLAs by query type, BU, supplier segment, and auto-escalate overdue items to seniors with complete audit trails." },
  { q:"How does the platform reduce document chase and follow-up?", a:"NimbleS2P AI agents send context-based reminders, support bulk document upload, validate formats, and highlight missing or incorrect documents — so your team never has to manually chase vendors." },
];

/* ── FAQ ITEM with smooth height animation ── */
function FAQItem({ f, isOpen, onToggle, isMobile }) {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);
  useEffect(() => {
    if (contentRef.current) setHeight(isOpen ? contentRef.current.scrollHeight : 0);
  }, [isOpen]);
  return (
    <div style={{ borderBottom:"1px solid #E2E8F0" }}>
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
   1. HERO
════════════════════════════════════ */
function VDDHero({ onNavigate }) {
  const w = useWidth(); const isMobile = w < 640; const isTablet = w < 960;

  const stats = [
    { val:"21 min",   label:"Average onboarding" },
    { val:"100%",    label:"Compliance rate" },
    { val:"80%",     label:"Reduced follow-ups" },
    { val:"8×",      label:"Faster than legacy" },
  ];

  return (
    <section style={{
      minHeight:"100vh", position:"relative", overflow:"hidden",
      background:"linear-gradient(140deg,#14104A 0%,#1E1660 40%,#261d6b 70%,#1a1258 100%)",
      display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center",
      padding: isMobile ? "110px 20px 64px" : "128px 5vw 80px",
      textAlign:"center",
    }}>

      {/* Ambient glows */}
      <div style={{ position:"absolute", inset:0, pointerEvents:"none",
        background:"radial-gradient(ellipse 90% 70% at 50% 35%, rgba(99,32,224,.32) 0%, transparent 65%)" }} />
      <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"50%", pointerEvents:"none",
        background:"radial-gradient(ellipse 80% 60% at 50% 100%, rgba(245,166,35,.09) 0%, transparent 70%)" }} />

      {/* Dot grid */}
      <div style={{ position:"absolute", inset:0, pointerEvents:"none",
        backgroundImage:"radial-gradient(rgba(255,255,255,.045) 1px,transparent 1px)",
        backgroundSize:"30px 30px" }} />

      {/* Top hairline */}
      <div style={{ position:"absolute", top:72, left:0, right:0, height:1, pointerEvents:"none",
        background:"linear-gradient(90deg,transparent,rgba(255,255,255,.08) 30%,rgba(255,255,255,.08) 70%,transparent)" }} />

      <div style={{ position:"relative", zIndex:2, maxWidth:860, width:"100%" }}>


        {/* H1 */}
        <h1 className="fade-up d1" style={{
          fontFamily:"var(--fb)", fontWeight:900,
          fontSize: isMobile ? "clamp(27px,7.7vw,40px)" : "clamp(40px,4.7vw,65px)",
          lineHeight:1.08, letterSpacing:"-.05em", marginBottom:22,
          background:"linear-gradient(95deg,#fff 0%,#fff 30%,#F5D060 62%,#F5A623 100%)",
          WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
          paddingBottom:"0.12em",
        }}>
          Trust-First Experience<br />For Your Suppliers
        </h1>

        {/* Sub */}
        <p className="fade-up d2" style={{
          fontSize: isMobile ? 15 : 17.5, color:"rgba(255,255,255,.52)",
          lineHeight:1.72, fontFamily:"var(--fb)", maxWidth:620, margin:"0 auto 36px",
        }}>
          A unified platform for self-service supplier onboarding, statutory, legal, and financial checks, built for scalable supplier management.
        </p>

        {/* CTAs */}
        <div className="fade-up d3" style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap", marginBottom:56 }}>
          <a onClick={e=>{ e.preventDefault(); if(typeof onNavigate==="function") onNavigate("getstarted"); }} href="#" style={{
            display:"inline-flex", alignItems:"center", gap:8,
            background:"linear-gradient(135deg,#E8920A,#F5B020)", color:"#fff",
            borderRadius:12, padding: isMobile ? "13px 28px" : "14px 34px",
            fontSize: isMobile ? 15 : 16, fontWeight:700,
            textDecoration:"none", fontFamily:"var(--fb)", letterSpacing:"-.01em",
            boxShadow:"0 6px 32px rgba(232,150,10,.52)",
            transition:"transform .2s, box-shadow .2s",
            width: isMobile ? "100%" : "auto",
          }}
            onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 14px 44px rgba(232,150,10,.65)"; }}
            onMouseLeave={e=>{ e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow="0 6px 32px rgba(232,150,10,.52)"; }}
          >Get Started →</a>
          <a href="#compare" style={{
            fontSize: isMobile ? 14 : 15, fontWeight:500, color:"rgba(255,255,255,.6)",
            fontFamily:"var(--fb)", textDecoration:"none", letterSpacing:"-.01em",
            display:"inline-flex", alignItems:"center", gap:5,
            transition:"color .18s",
          }}
            onMouseEnter={e=>e.currentTarget.style.color="#fff"}
            onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,.6)"}
          >See the Comparison ↓</a>
        </div>

        {/* Stats row */}
        <div className="fade-up d4" style={{
          display:"grid", gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(4,1fr)",
          gap: isMobile ? 1 : 1,
          background:"rgba(255,255,255,.07)", border:"1px solid rgba(255,255,255,.1)",
          borderRadius:16, overflow:"hidden", backdropFilter:"blur(12px)",
        }}>
          {stats.map((s,i)=>(
            <div key={s.label} style={{
              padding: isMobile ? "18px 12px" : "22px 16px", textAlign:"center",
              borderRight: i < stats.length-1 && !(isMobile && i%2===1) ? "1px solid rgba(255,255,255,.08)" : "none",
              borderBottom: isMobile && i < 2 ? "1px solid rgba(255,255,255,.08)" : "none",
            }}>
              <div style={{ fontFamily:"var(--fb)", fontSize: isMobile ? 24 : 30, fontWeight:900, color:"#fff", letterSpacing:"-.04em", lineHeight:1 }}>{s.val}</div>
              <div style={{ fontSize:11, fontWeight:600, letterSpacing:".08em", textTransform:"uppercase", color:"rgba(255,255,255,.35)", marginTop:6, fontFamily:"var(--fb)" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom wave */}
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
   2. COMPARE TABLE
════════════════════════════════════ */
function CompareTable() {
  const w = useWidth(); const isMobile = w < 640;
  const ref = useReveal();

  return (
    <section id="compare" style={{ background:"#fff", padding: isMobile ? "64px 20px" : "clamp(64px,9vh,104px) 5vw" }}>
      <div style={{ maxWidth:1040, margin:"0 auto" }}>
        <div className="reveal" ref={ref}>

          {/* Section header */}
          <div style={{ marginBottom: isMobile ? 36 : 48 }}>
            <Eyebrow>The Difference</Eyebrow>
            <h2 style={{ fontFamily:"var(--fb)", fontSize: isMobile ? "clamp(24px,6vw,34px)" : "clamp(28px,3.5vw,44px)", fontWeight:700, letterSpacing:"-.04em", lineHeight:1.05, color:"#0F172A", marginBottom:12 }}>
              With vs Without NimbleS2P
            </h2>
            <p style={{ fontSize: isMobile ? 14.5 : 16, color:"#64748B", lineHeight:1.7, fontFamily:"var(--fb)", maxWidth:500 }}>
              Every dimension of supplier onboarding, compared side by side.
            </p>
          </div>

          {/* Card container */}
          <div style={{ borderRadius:22, overflow:"hidden", boxShadow:"0 2px 40px rgba(15,23,42,.07), 0 1px 3px rgba(0,0,0,.05)", border:"1px solid #E8EAEE" }}>

            {/* Column headers */}
            <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "220px 1fr 1fr" }}>
              <div style={{ background:"#F8FAFC", padding:"16px 24px", display:"flex", alignItems:"center" }}>
                <span style={{ fontSize:11, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:"#94A3B8", fontFamily:"var(--fb)" }}>Parameter</span>
              </div>
              <div style={{ background:"#FFF5F5", padding:"16px 24px", display:"flex", alignItems:"center", gap:10, borderLeft: isMobile ? "none" : "1px solid #FFE4E4", borderTop: isMobile ? "1px solid #FFE4E4" : "none" }}>
                <div style={{ width:26, height:26, borderRadius:"50%", background:"#FEE2E2", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 2l8 8M10 2l-8 8" stroke="#EF4444" strokeWidth="2" strokeLinecap="round"/></svg>
                </div>
                <div>
                  <div style={{ fontSize:12, fontWeight:700, color:"#DC2626", fontFamily:"var(--fb)" }}>Without NimbleS2P</div>
                  <div style={{ fontSize:11, color:"#F87171", fontFamily:"var(--fb)" }}>Legacy approach</div>
                </div>
              </div>
              <div style={{ background:"#F0FDF8", padding:"16px 24px", display:"flex", alignItems:"center", gap:10, borderLeft: isMobile ? "none" : "1px solid #C6F6E0", borderTop: isMobile ? "1px solid #C6F6E0" : "none" }}>
                <div style={{ width:26, height:26, borderRadius:"50%", background:"#D1FAE5", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <svg width="12" height="10" viewBox="0 0 12 10" fill="none"><path d="M1 5l3.5 3.5L11 1" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div>
                  <div style={{ fontSize:12, fontWeight:700, color:"#059669", fontFamily:"var(--fb)" }}>With NimbleS2P</div>
                  <div style={{ fontSize:11, color:"#34D399", fontFamily:"var(--fb)" }}>Intelligent automation</div>
                </div>
              </div>
            </div>

            {/* Rows */}
            {tableRows.map(([param, without, with_], i)=>(
              <div key={param} style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "220px 1fr 1fr", borderTop:"1px solid #F1F5F9", transition:"background .15s" }}
                onMouseEnter={e=>e.currentTarget.style.background="#FAFBFF"}
                onMouseLeave={e=>e.currentTarget.style.background="transparent"}
              >
                <div style={{ padding:"15px 24px", display:"flex", alignItems:"center", background:"#FAFBFC" }}>
                  <span style={{ fontFamily:"var(--fb)", fontSize:13.5, fontWeight:700, color:"#334155" }}>{param}</span>
                </div>
                <div style={{ padding:"15px 24px", display:"flex", alignItems:"flex-start", gap:10, borderLeft: isMobile ? "none" : "1px solid #F1F5F9", borderTop: isMobile ? "1px solid #FEF2F2" : "none" }}>
                  <span style={{ fontSize:10, color:"#EF4444", fontWeight:700, marginTop:3, flexShrink:0 }}>✕</span>
                  <span style={{ fontFamily:"var(--fb)", fontSize:13.5, color:"#64748B", lineHeight:1.55 }}>{without}</span>
                </div>
                <div style={{ padding:"15px 24px", display:"flex", alignItems:"flex-start", gap:10, borderLeft: isMobile ? "none" : "1px solid #D1FAE5", background: i%2===0 ? "rgba(240,253,248,.6)" : "transparent", borderTop: isMobile ? "1px solid #D1FAE5" : "none" }}>
                  <span style={{ fontSize:10, color:"#10B981", fontWeight:700, marginTop:3, flexShrink:0 }}>✓</span>
                  <span style={{ fontFamily:"var(--fb)", fontSize:13.5, fontWeight:600, color:"#0F5132", lineHeight:1.55 }}>{with_}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════
   3. AI AGENTS
════════════════════════════════════ */
function AIAgents() {
  const w = useWidth(); const isMobile = w < 640; const isTablet = w < 900;
  const [active, setActive] = useState(0);
  const ag = agents[active];
  const ref = useReveal();

  return (
    <section style={{
      background:"linear-gradient(160deg,#0F0C2A 0%,#1a1260 45%,#221868 100%)",
      position:"relative", overflow:"hidden",
      padding: isMobile ? "64px 20px" : "clamp(64px,9vh,104px) 5vw",
    }}>
      {/* Background texture */}
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", backgroundImage:"radial-gradient(rgba(255,255,255,.04) 1px,transparent 1px)", backgroundSize:"26px 26px" }} />
      <div style={{ position:"absolute", top:0, right:"10%", width:"40%", height:"60%", background:"radial-gradient(ellipse, rgba(99,32,224,.2) 0%, transparent 65%)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:0, left:"5%", width:"35%", height:"50%", background:"radial-gradient(ellipse, rgba(245,166,35,.08) 0%, transparent 65%)", pointerEvents:"none" }} />

      <div style={{ maxWidth:1080, margin:"0 auto", position:"relative", zIndex:1 }}>
        <div className="reveal" ref={ref}>

          {/* Header */}
          <div style={{ marginBottom: isMobile ? 36 : 52 }}>
            <Eyebrow dark>AI Agents</Eyebrow>
            <h2 style={{ fontFamily:"var(--fb)", fontSize: isMobile ? "clamp(24px,6vw,34px)" : "clamp(28px,3.5vw,46px)", fontWeight:900, letterSpacing:"-.04em", lineHeight:1.15, background:"linear-gradient(95deg,#fff 0%,#fff 30%,#F5D060 62%,#F5A623 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", marginBottom:14, paddingBottom:"0.08em" }}>
              The agents doing the<br />heavy lifting for you
            </h2>
            <p style={{ fontSize: isMobile ? 14.5 : 16, color:"rgba(255,255,255,.72)", lineHeight:1.72, fontFamily:"var(--fb)", maxWidth:520 }}>
              Specialized AI agents run continuously behind the scenes — catching what humans miss.
            </p>
          </div>

          {/* 4 agent cards — all visible, click to activate */}
          <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr 1fr" : isTablet ? "1fr 1fr" : "repeat(4,1fr)", gap:12, marginBottom:20 }}>
            {agents.map((a,i)=>{
              const isAct = active === i;
              return (
                <div key={a.title}
                  onClick={()=>setActive(i)}
                  style={{
                    position:"relative", overflow:"hidden",
                    borderRadius:18, cursor:"pointer",
                    border: isAct ? "1.5px solid rgba(255,255,255,.7)" : "1.5px solid rgba(255,255,255,.14)",
                    background: isAct ? "rgba(255,255,255,.18)" : "rgba(255,255,255,.07)",
                    padding: isMobile ? "20px 16px" : "26px 22px",
                    backdropFilter:"blur(10px)",
                    transition:"all .25s cubic-bezier(.22,1,.36,1)",
                    boxShadow: isAct ? "0 8px 32px rgba(255,255,255,.15), 0 0 0 1px rgba(255,255,255,.2) inset" : "none",
                    transform: isAct ? "translateY(-2px)" : "none",
                  }}
                  onMouseEnter={e=>{ if(!isAct){ e.currentTarget.style.background="rgba(255,255,255,.12)"; e.currentTarget.style.borderColor="rgba(255,255,255,.28)"; e.currentTarget.style.transform="translateY(-2px)"; }}}
                  onMouseLeave={e=>{ if(!isAct){ e.currentTarget.style.background="rgba(255,255,255,.07)"; e.currentTarget.style.borderColor="rgba(255,255,255,.14)"; e.currentTarget.style.transform=""; }}}
                >

                  {/* Icon — bare, no box */}
                  <div style={{ fontSize:32, marginBottom:14, lineHeight:1 }}>{a.icon}</div>

                  {/* Title */}
                  <h3 style={{ fontFamily:"var(--fb)", fontSize: isMobile ? 15 : 17, fontWeight:800, color:"#fff", letterSpacing:"-.025em", lineHeight:1.2, marginBottom:8 }}>{a.title}</h3>

                  {/* Desc */}
                  <p style={{ fontSize: isMobile ? 12 : 13, color: isAct ? "rgba(255,255,255,.8)" : "rgba(255,255,255,.52)", lineHeight:1.6, fontFamily:"var(--fb)", margin:0, transition:"color .25s" }}>{a.desc}</p>

                  {/* Active bottom bar */}
                  {isAct && <div style={{ position:"absolute", bottom:0, left:0, right:0, height:3, background:"linear-gradient(90deg,rgba(255,255,255,.9),rgba(255,255,255,.4),transparent)" }} />}
                </div>
              );
            })}
          </div>

          {/* Detail strip */}
          <div style={{
            background:"rgba(255,255,255,.12)",
            border:"1.5px solid rgba(255,255,255,.35)",
            borderRadius:14, padding: isMobile ? "18px 16px" : "20px 28px",
            display:"flex", alignItems:"center", justifyContent:"space-between",
            flexWrap:"wrap", gap:14,
            backdropFilter:"blur(12px)",
            boxShadow:"0 4px 24px rgba(255,255,255,.08)",
          }}>
            <div style={{ display:"flex", alignItems:"center", gap:12, flexShrink:0 }}>
              <div style={{ width:38, height:38, borderRadius:11, background:"rgba(255,255,255,.2)", border:"1.5px solid rgba(255,255,255,.4)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 }}>{ag.icon}</div>
              <div>
                <div style={{ fontSize:11, fontWeight:700, color:"rgba(255,255,255,.6)", fontFamily:"var(--fb)", letterSpacing:".06em", textTransform:"uppercase", marginBottom:2 }}>Active Agent</div>
                <div style={{ fontSize:14, fontWeight:700, color:"#fff", fontFamily:"var(--fb)", letterSpacing:"-.02em" }}>{ag.title}</div>
              </div>
            </div>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              {([
                [["⚡","Real-time"],["🔒","Audit-ready"],["🤖","Zero manual Work"]],
                [["↩️","Reduced Back-and-Forth"],["✅","Zero Incomplete Applications"],["🔍","Missing Document Detection"]],
                [["🔗","Multi-Source Identity Matching"],["🗂","Vendor Master Harmonization"],["🚫","Prevents Unauthorized Changes"]],
                [["🔄","Periodic Check"],["✅","Zero SOP Deviations"],["📋","Audit Ready"]],
              ][active] || []).map(([icon,label])=>(
                <span key={label} style={{ display:"inline-flex", alignItems:"center", gap:5, background:"rgba(255,255,255,.15)", border:"1.5px solid rgba(255,255,255,.4)", borderRadius:100, padding:"6px 14px", fontSize:12.5, fontWeight:700, color:"#fff", fontFamily:"var(--fb)", letterSpacing:"-.01em" }}>{icon} {label}</span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════
   4. CUSTOMER STORY
════════════════════════════════════ */
function VideoTestimonial() {
  const w = useWidth(); const isMobile = w < 640; const isTablet = w < 900;
  const ref = useReveal();

  const outcomes = [
    { label:"Supplier onboarding time", prev:"45 days",     val:"21 min",  color:"#6320E0" },
    { label:"Audit compliance rate",    prev:"~60%",        val:"100%",   color:"#059669" },
    { label:"Manual follow-ups left",   prev:"Hundreds/mo", val:"Zero",   color:"#E06B72" },
  ];

  return (
    <section style={{ background:"var(--slp)", padding: isMobile ? "64px 20px" : "clamp(64px,9vh,104px) 5vw", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(rgba(99,32,224,.06) 1px,transparent 1px)", backgroundSize:"28px 28px", pointerEvents:"none" }} />
      <div style={{ maxWidth:1040, margin:"0 auto", position:"relative", zIndex:1 }}>
        <div className="reveal" ref={ref}>

          {/* Section label */}
          <div style={{ marginBottom: isMobile ? 28 : 40 }}>
            <Eyebrow>Case Study</Eyebrow>
            <h2 style={{ fontFamily:"var(--fb)", fontSize: isMobile ? "clamp(22px,6vw,30px)" : "clamp(26px,3vw,38px)", fontWeight:700, letterSpacing:"-.04em", lineHeight:1.08, color:"#0F172A" }}>
              Real stories, proven impact
            </h2>
          </div>

          {/* Main card */}
          <div style={{
            display:"grid",
            gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr" : "1.1fr 0.9fr",
            borderRadius:24, overflow:"hidden",
            boxShadow:"0 20px 80px rgba(57,16,133,.18), 0 4px 16px rgba(0,0,0,.08)",
            border:"1px solid rgba(99,32,224,.12)",
          }}>

            {/* LEFT — dark quote panel */}
            <div style={{
              background:"linear-gradient(140deg,#1a1645 0%,#231b6a 55%,#1e1850 100%)",
              padding: isMobile ? "36px 28px" : "52px 44px",
              display:"flex", flexDirection:"column", justifyContent:"space-between",
              position:"relative", overflow:"hidden",
            }}>
              {/* Glows */}
              <div style={{ position:"absolute", top:"-10%", left:"-5%", width:"55%", height:"65%", background:"radial-gradient(ellipse, rgba(99,32,224,.35) 0%, transparent 65%)", pointerEvents:"none" }} />
              <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(rgba(255,255,255,.04) 1px,transparent 1px)", backgroundSize:"22px 22px", pointerEvents:"none" }} />

              <div style={{ position:"relative", zIndex:1 }}>
                {/* Decorative quote */}
                <div style={{ fontFamily:"Georgia, serif", fontSize:88, lineHeight:.7, color:"rgba(167,139,250,.28)", userSelect:"none", marginBottom:24 }}>"</div>

                <blockquote style={{ margin:0, marginBottom:28 }}>
                  <p style={{ fontFamily:"var(--fb)", fontSize: isMobile ? 19 : 24, fontWeight:700, color:"#fff", lineHeight:1.42, letterSpacing:"-.025em", marginBottom:18 }}>
                    From 45-day supplier cycles to 21 minutes. NimbleS2P didn't just improve our process — it replaced it entirely.
                  </p>
                  <p style={{ fontSize:14.5, color:"rgba(255,255,255,.52)", lineHeight:1.75, fontFamily:"var(--fb)" }}>
                    Our compliance team went from chasing documents to reviewing dashboards. The AI agents handle everything in between.
                  </p>
                </blockquote>
              </div>

              {/* Attribution */}
              <div style={{ position:"relative", zIndex:1, display:"flex", alignItems:"center", gap:14, paddingTop:24, borderTop:"1px solid rgba(255,255,255,.1)" }}>
                <div style={{ width:48, height:48, borderRadius:"50%", background:"linear-gradient(135deg,#6320E0,#8B5CF6)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"var(--fb)", fontSize:16, fontWeight:800, color:"#fff", flexShrink:0, boxShadow:"0 4px 16px rgba(99,32,224,.5)" }}>RP</div>
                <div>
                  <div style={{ fontSize:14, fontWeight:700, color:"#fff", fontFamily:"var(--fb)", letterSpacing:"-.01em" }}>Rajesh Patel</div>
                  <div style={{ fontSize:12, color:"rgba(255,255,255,.4)", fontFamily:"var(--fb)" }}>CFO, Large Manufacturing Enterprise</div>
                </div>
              </div>
            </div>

            {/* RIGHT — white outcomes panel */}
            <div style={{
              background:"#fff",
              padding: isMobile ? "36px 28px" : "52px 44px",
              display:"flex", flexDirection:"column",
              borderLeft: isMobile ? "none" : "1px solid #F1F5F9",
              borderTop: isMobile ? "1px solid #F1F5F9" : "none",
            }}>

              {/* Industry pill */}
              <div style={{ marginBottom:32 }}>
                <div style={{ display:"inline-flex", alignItems:"center", gap:7, background:"rgba(99,32,224,.06)", border:"1.5px solid rgba(99,32,224,.18)", borderRadius:100, padding:"7px 16px" }}>
                  <span style={{ width:7, height:7, borderRadius:"50%", background:"#6320E0", display:"inline-block", boxShadow:"0 0 6px rgba(99,32,224,.5)" }} />
                  <span style={{ fontSize:12.5, fontWeight:600, color:"#391085", fontFamily:"var(--fb)" }}>Manufacturing Enterprise</span>
                </div>
              </div>

              {/* Outcomes label */}
              <div style={{ fontSize:10, fontWeight:800, letterSpacing:".14em", textTransform:"uppercase", color:"#94A3B8", fontFamily:"var(--fb)", marginBottom:6 }}>Outcomes Achieved</div>
              <div style={{ height:2, width:40, background:"linear-gradient(90deg,#6320E0,#8B5CF6)", borderRadius:99, marginBottom:20 }} />

              {/* Outcome rows */}
              <div style={{ display:"flex", flexDirection:"column", flex:1 }}>
                {outcomes.map((o,i) => (
                  <div key={o.label} style={{
                    display:"flex", alignItems:"center", justifyContent:"space-between", gap:12,
                    padding:"16px 0",
                    borderBottom: i < outcomes.length-1 ? "1px solid #F1F5F9" : "none",
                  }}>
                    <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                      <span style={{ width:6, height:6, borderRadius:"50%", background:o.color, display:"inline-block", flexShrink:0 }} />
                      <span style={{ fontSize:13.5, color:"#475569", fontFamily:"var(--fb)" }}>{o.label}</span>
                    </div>
                    <div style={{ display:"flex", alignItems:"center", gap:10, flexShrink:0 }}>
                      <span style={{ fontSize:11.5, color:"#CBD5E1", fontFamily:"var(--fb)", textDecoration:"line-through" }}>{o.prev}</span>
                      <span style={{ fontSize:16, fontWeight:900, color:o.color, fontFamily:"var(--fb)", letterSpacing:"-.03em" }}>{o.val}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Read story CTA */}
              <div style={{ marginTop:32, paddingTop:24, borderTop:"1px solid #F1F5F9" }}>
                <a href="#" style={{
                  display:"inline-flex", alignItems:"center", justifyContent:"space-between",
                  width:"100%", background:"#391085",
                  borderRadius:12, padding:"14px 20px", textDecoration:"none",
                  boxShadow:"0 6px 24px rgba(57,16,133,.35)",
                  transition:"background .18s, box-shadow .18s",
                }}
                  onMouseEnter={e=>{ e.currentTarget.style.background="#6320E0"; e.currentTarget.style.boxShadow="0 8px 32px rgba(99,32,224,.45)"; }}
                  onMouseLeave={e=>{ e.currentTarget.style.background="#391085"; e.currentTarget.style.boxShadow="0 6px 24px rgba(57,16,133,.35)"; }}
                >
                  <span style={{ fontSize:14, fontWeight:700, color:"#fff", fontFamily:"var(--fb)" }}>Read the full story</span>
                  <div style={{ width:28, height:28, borderRadius:"50%", background:"rgba(255,255,255,.2)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M7 3l3 3-3 3" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════
   5. FAQs
════════════════════════════════════ */
function FAQs() {
  const w = useWidth(); const isMobile = w < 640;
  const [open, setOpen] = useState(null);
  const ref = useReveal();

  return (
    <section style={{ background:"#ffffff", position:"relative", overflow:"hidden", padding: isMobile ? "64px 20px" : "clamp(64px,9vh,104px) 5vw" }}>
      {/* Top accent line */}
      <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:"linear-gradient(90deg,var(--p500),var(--p300),#F59E0B)", pointerEvents:"none" }} />
      <div style={{ maxWidth:1040, margin:"0 auto" }}>
        <div className="reveal" ref={ref} style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1.5fr", gap: isMobile ? 36 : 64, alignItems:"start" }}>

          {/* Left sticky header */}
          <div style={{ position:"static" }}>
            <Eyebrow>FAQs</Eyebrow>
            <h2 style={{ fontFamily:"var(--fb)", fontSize: isMobile ? "clamp(24px,6vw,32px)" : "clamp(26px,3vw,38px)", fontWeight:700, letterSpacing:"-.04em", lineHeight:1.08, color:"#0F172A", marginBottom:16 }}>
              Questions<br />we get asked
            </h2>
            <p style={{ fontSize:15, color:"#64748B", lineHeight:1.7, fontFamily:"var(--fb)", marginBottom:28 }}>
              Everything you need to know about NimbleS2P's supplier onboarding platform.
            </p>
            <a href="#" style={{ display:"inline-flex", alignItems:"center", gap:6, fontSize:14, fontWeight:600, color:"var(--p600)", fontFamily:"var(--fb)", textDecoration:"none", borderBottom:"1.5px solid var(--p200)", paddingBottom:2, transition:"color .15s, border-color .15s" }}
              onMouseEnter={e=>{ e.currentTarget.style.color="var(--p700)"; e.currentTarget.style.borderColor="var(--p400)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.color="var(--p600)"; e.currentTarget.style.borderColor="var(--p200)"; }}
            >Talk to our team →</a>
          </div>

          {/* Right accordion */}
          <div style={{ borderTop:"1px solid #E2E8F0" }}>
            {faqs.map((f,i)=>(
              <FAQItem key={i} f={f} isOpen={open===i} onToggle={()=>setOpen(open===i ? null : i)} isMobile={isMobile} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════
   6. LEAD MAGNET CTA
════════════════════════════════════ */
function LeadMagnetCTA() {
  const w = useWidth(); const isMobile = w < 640;
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const ref = useReveal();

  return (
    <section style={{
      background:"linear-gradient(160deg,#0f0c29 0%,#1a1260 40%,#261d6b 70%,#1e1050 100%)",
      position:"relative", overflow:"hidden",
      padding: isMobile ? "64px 20px 80px" : "clamp(72px,9vh,110px) 5vw",
    }}>
      <div style={{ position:"absolute", bottom:"-15%", right:"-5%", width:"55%", height:"85%", background:"radial-gradient(ellipse, rgba(245,166,35,.16) 0%, transparent 60%)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", top:"-15%", left:"-5%", width:"55%", height:"80%", background:"radial-gradient(ellipse, rgba(99,32,224,.28) 0%, transparent 60%)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(rgba(255,255,255,.05) 1px,transparent 1px)", backgroundSize:"26px 26px", pointerEvents:"none" }} />

      <div style={{ maxWidth:1040, margin:"0 auto", position:"relative", zIndex:2 }}>
        <div className="reveal" ref={ref} style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 40 : 80, alignItems:"center" }}>

          {/* Left: copy */}
          <div>
            <div style={{ display:"inline-flex", alignItems:"center", gap:7, background:"rgba(245,166,35,.12)", border:"1px solid rgba(245,166,35,.28)", borderRadius:100, padding:"5px 14px", marginBottom:20 }}>
              <span style={{ width:6, height:6, borderRadius:"50%", background:"#F5A623", display:"inline-block", animation:"pulse-dot 2s infinite" }} />
              <span style={{ fontSize:11, fontWeight:700, color:"#F5D060", fontFamily:"var(--fb)", letterSpacing:".05em", textTransform:"uppercase" }}>Free Resource</span>
            </div>
            <h2 style={{ fontFamily:"var(--fb)", fontWeight:900, fontSize: isMobile ? "clamp(24px,7vw,34px)" : "clamp(26px,3.2vw,40px)", lineHeight:1.15, paddingBottom:"0.12em", letterSpacing:"-.04em", background:"linear-gradient(95deg,#fff 0%,#fff 30%,#F5D060 62%,#F5A623 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", marginBottom:16 }}>
              {PRODUCT_PAGE_RESOURCES.vdd.label}
            </h2>
            <p style={{ fontSize: isMobile ? 14.5 : 16, color:"rgba(255,255,255,.48)", lineHeight:1.75, fontFamily:"var(--fb)", marginBottom:0 }}>
              Download our guide to avoid the pitfalls that cost enterprises crores in delayed payments, audit failures, and compliance gaps every year.
            </p>
          </div>

          {/* Right: form card */}
          <div style={{ background:"rgba(255,255,255,.06)", border:"1px solid rgba(255,255,255,.12)", borderRadius:20, padding: isMobile ? "28px 22px" : "36px 32px", backdropFilter:"blur(16px)" }}>
            {!done ? (
              <>
                <div style={{ fontSize:13, fontWeight:600, color:"rgba(255,255,255,.5)", fontFamily:"var(--fb)", marginBottom:20, letterSpacing:"-.01em" }}>Enter your work email to get instant access</div>
                <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                  <input
                    type="email" value={email} onChange={e=>setEmail(e.target.value)}
                    placeholder="you@company.com"
                    style={{ width:"100%", background:"rgba(255,255,255,.08)", border:"1.5px solid rgba(255,255,255,.16)", borderRadius:10, outline:"none", padding:"13px 16px", fontSize:15, color:"#fff", fontFamily:"var(--fb)", transition:"border-color .18s" }}
                    onFocus={e=>e.target.style.borderColor="rgba(245,166,35,.6)"}
                    onBlur={e=>e.target.style.borderColor="rgba(255,255,255,.16)"}
                  />
                  <button onClick={()=>{ if(email) setDone(true); }} style={{
                    width:"100%", background:"linear-gradient(135deg,#E8920A,#F5B020)", color:"#fff",
                    border:"none", borderRadius:10, padding:"13px 24px",
                    fontSize:15, fontWeight:700, cursor:"pointer", fontFamily:"var(--fb)",
                    boxShadow:"0 6px 24px rgba(232,150,10,.45)", transition:"all .2s",
                  }}
                    onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-1px)"; e.currentTarget.style.boxShadow="0 10px 32px rgba(232,150,10,.6)"; }}
                    onMouseLeave={e=>{ e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow="0 6px 24px rgba(232,150,10,.45)"; }}
                  >Download Free Guide →</button>
                </div>
                <p style={{ fontSize:11.5, color:"rgba(255,255,255,.22)", marginTop:14, fontFamily:"var(--fb)", textAlign:"center" }}>No spam. Unsubscribe anytime.</p>
              </>
            ) : (
              <div style={{ textAlign:"center", padding:"20px 0" }}>
                <div style={{ fontSize:40, marginBottom:14 }}>✅</div>
                <div style={{ fontSize:16, fontWeight:700, color:"#34D399", fontFamily:"var(--fb)", marginBottom:8 }}>Guide on its way!</div>
                <div style={{ fontSize:14, color:"rgba(255,255,255,.45)", fontFamily:"var(--fb)" }}>Check your inbox — the guide has been sent to {email}</div>
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
   FOOTER — identical to homepage
════════════════════════════════════ */

/* ════════════════════════════════════
   ROOT PRODUCT PAGE
════════════════════════════════════ */
export default function VendorDueDiligencePage({ onBack, onNavigate }) {
  return (
    <>
      <Nav onNavigate={onNavigate} onBack={onBack} pageName="Supplier Due Diligence" />
      <main>
        <VDDHero onNavigate={onNavigate} />
        <CompareTable />
        <AIAgents />
        <VideoTestimonial />
        <FAQs />
        <LeadMagnetCTA />
      </main>
      <VDDFooter onNavigate={onNavigate} />
    </>
  );
}
