"use client";

import { useState, useEffect, useRef, Fragment } from "react";
import { Nav } from "@/components/layout/SiteNav";
import { VDDFooter } from "@/components/layout/VDDFooter";
import { useWidth, useReveal, Eyebrow } from "@/components/shared/pageUi";

import { PRODUCT_PAGE_RESOURCES } from "@/components/layout/megaMenuData";

/* ═══════════════════════════════════════════════════════════
   SUPPLIER ANALYTICS — PRODUCT PAGE
   Color: #48A9A6 (teal)
═══════════════════════════════════════════════════════════ */

const SA_COLOR = "#6320E0";
const SA_COLOR_DARK = "#391085";
const SA_COLOR_LIGHT = "#A78BFA";

const saFaqs = [
  { q:"What is Supplier Analytics?", a:"Supplier Analytics is a data-driven approach that helps enterprises analyze supplier performance, compliance, spending patterns, delivery trends, risks, and operational efficiency through centralized dashboards and reports." },
  { q:"Why is Supplier Analytics important for enterprises?", a:"Supplier Analytics helps enterprises improve supplier performance, reduce procurement risks, identify cost-saving opportunities, strengthen compliance, and make faster strategic sourcing decisions using real-time insights." },
  { q:"How does Supplier Analytics improve supplier performance?", a:"Supplier Analytics tracks KPIs such as on-time delivery, quality performance, compliance status, response time, invoice accuracy, and procurement efficiency to help organizations evaluate and improve supplier performance continuously." },
  { q:"How does Supplier Analytics support procurement teams?", a:"Supplier Analytics enables procurement teams to make informed sourcing decisions, monitor supplier KPIs, improve negotiation strategies, automate reporting, and enhance supplier collaboration." },
  { q:"How does Supplier Analytics improve decision-making?", a:"Supplier Analytics provides centralized, real-time, and data-backed insights that help procurement, finance, and operations teams make faster and more accurate supplier-related decisions." },
];

const saAgents = [
  { icon:"📊", num:"01", title:"AI Reporting Agent", desc:"Generates executive-ready supplier reports, identifies anomalies, explains trends, and answers complex supplier questions instantly.", color:"#6320E0" },
  { icon:"🔔", num:"02", title:"AI Compliance Follow-up Agent", desc:"Tracks expiring certifications, missing documents, audit gaps, and automatically follows up with suppliers through email and portal workflows.", color:"#0369A1" },
  { icon:"⭐", num:"03", title:"AI Supplier Insight Agent", desc:"Analyzes supplier performance, detects declining KPIs, benchmarks suppliers, and recommends corrective actions proactively.", color:"#059669" },
];

const saFeatures = [
  {
    icon:"📈",
    color:"#6320E0",
    tag:"Auto Insights",
    title:"Auto Insights & Reporting",
    desc:"Turn supplier data into real-time insights, executive dashboards, AI-generated reports, and actionable intelligence automatically.",
  },
  {
    icon:"🛡",
    color:"#DC2626",
    tag:"Risk",
    title:"Supplier Risk & Exposure",
    desc:"Continuously monitor supplier risks, dependencies, and exposure levels with predictive alerts and multi-dimensional risk intelligence.",
  },
  {
    icon:"📋",
    color:"#0369A1",
    tag:"Performance",
    title:"Supplier Performance Analytics",
    desc:"Track supplier KPIs, SLA adherence, quality, and delivery performance through real-time analytics and trend-based insights.",
  },
];

const saCredibility = [
  { stat:"40%", label:"Faster supplier risk identification" },
  { stat:"60%", label:"Reduction in manual reporting effort" },
  { stat:"3X",  label:"Faster executive insight generation" },
  { stat:"25%", label:"Lower supplier compliance exposure" },
];

const saTimeline = [
  {
    period:"In 3 Months",
    title:"Operational Visibility",
    color:"#6320E0",
    items:[
      "Centralized supplier analytics foundation",
      "Automated supplier reporting",
      "Faster compliance visibility",
      "Unified supplier scorecards",
      "Reduced manual reporting dependency",
    ],
  },
  {
    period:"In 6 Months",
    title:"Predictive Supplier Intelligence",
    color:"#6320E0",
    items:[
      "Early supplier risk detection",
      "Improved supplier performance governance",
      "Improved executive visibility",
    ],
  },
  {
    period:"In 12 Months",
    title:"Strategic Supplier Ecosystem Optimization",
    color:"#F59E0B",
    items:[
      "Resilient supplier network",
      "Predictive supplier operations",
      "Stronger compliance posture",
      "Reduced supply disruption exposure",
      "Enterprise-wide supplier intelligence maturity",
    ],
  },
];

/* ── SA FAQ Item ── */
function SAFAQItem({ f, isOpen, onToggle, isMobile }) {
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
   1. HERO
════════════════════════════════════ */
function SAHero({ onNavigate }) {
  const w = useWidth(); const isMobile = w < 640;
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
      <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"50%", pointerEvents:"none", background:"radial-gradient(ellipse 80% 60% at 50% 100%, rgba(245,166,35,.08) 0%, transparent 70%)" }} />
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", backgroundImage:"radial-gradient(rgba(255,255,255,.04) 1px,transparent 1px)", backgroundSize:"30px 30px" }} />

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
          Turn Supplier Data Into Decisions<br />at Nimble Speed
        </h1>

        <p className="fade-up d2" style={{ fontSize: isMobile ? 15 : 18, color:"rgba(255,255,255,.52)", lineHeight:1.75, fontFamily:"var(--fb)", maxWidth:620, margin:"0 auto 36px" }}>
          Where supplier experience meets finance control. Enterprise automation that suppliers actually respond to.
        </p>

        {/* CTAs — match RFx Management (side-by-side on mobile) */}
        <div className="fade-up d3" style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap", marginBottom:56 }}>
          <a onClick={e=>{ e.preventDefault(); if(typeof onNavigate==="function") onNavigate("getstarted"); }} href="#" style={{ display:"inline-flex", alignItems:"center", gap:8,
            background:"linear-gradient(135deg,#E8920A,#F5B020)", color:"#fff",
            borderRadius:12, padding: isMobile ? "13px 28px" : "14px 34px",
            fontSize: isMobile ? 15 : 16, fontWeight:700,
            textDecoration:"none", fontFamily:"var(--fb)", letterSpacing:"-.01em",
            boxShadow:"0 6px 32px rgba(232,150,10,.52)",
            transition:"transform .2s, box-shadow .2s", }}
            onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 10px 36px rgba(232,150,10,.62)";}}
            onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="0 4px 24px rgba(232,150,10,.48),0 1px 0 rgba(255,255,255,.15) inset";}}
          >Get Started →</a>
          <a href="#features" style={{
            fontSize: isMobile ? 14 : 15, fontWeight:500, color:"rgba(255,255,255,.6)",
            fontFamily:"var(--fb)", textDecoration:"none", letterSpacing:"-.01em",
            display:"inline-flex", alignItems:"center", gap:5,
            transition:"color .18s",
          }}
            onMouseEnter={e=>e.currentTarget.style.color="#fff"}
            onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,.6)"}
          >Explore Features ↓</a>
        </div>

        {/* Credibility stats bar — RFQ style */}
        <div className="fade-up d4" style={{ width:"100%" }}>
          <div style={{
            display:"grid", gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(4,1fr)",
            gap:1, background:"rgba(255,255,255,.07)", border:"1px solid rgba(255,255,255,.1)",
            borderRadius:16, overflow:"hidden", backdropFilter:"blur(12px)",
          }}>
            {saCredibility.map((c, i) => (
              <div key={i} style={{
                padding: isMobile ? "18px 12px" : "22px 16px", textAlign:"center",
                borderRight: i < saCredibility.length-1 && !(isMobile && i%2===1) ? "1px solid rgba(255,255,255,.08)" : "none",
                borderBottom: isMobile && i < 2 ? "1px solid rgba(255,255,255,.08)" : "none",
              }}>
                <div style={{ fontFamily:"var(--fb)", fontSize: isMobile ? 24 : 30, fontWeight:900, color:"#fff", letterSpacing:"-.04em", lineHeight:1 }}>{c.stat}</div>
                <div style={{ fontSize:11, fontWeight:600, letterSpacing:".08em", textTransform:"uppercase", color:"rgba(255,255,255,.35)", marginTop:6, fontFamily:"var(--fb)" }}>{c.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Wave bottom */}
      <div style={{ position:"absolute", bottom:0, left:0, right:0, height:52, overflow:"hidden", pointerEvents:"none" }}>
        <svg viewBox="0 0 1440 52" preserveAspectRatio="none" style={{ position:"absolute", bottom:0, left:0, width:"200%", height:"100%", animation:"waveSlide 10s linear infinite" }}>
          <path d="M0,26 C200,8 400,44 600,26 C800,8 1000,42 1200,26 C1360,12 1440,34 1440,26 L1440,52 L0,52 Z" fill="rgba(99,32,224,.12)" />
          <path d="M0,36 C180,14 380,50 580,32 C780,14 980,46 1180,30 C1340,16 1440,38 1440,36 L1440,52 L0,52 Z" fill="rgba(130,80,230,.07)" />
        </svg>
      </div>
    </section>
  );
}

/* ════════════════════════════════════
   2. DOMAIN STATEMENT
════════════════════════════════════ */
function SADomainStatement() {
  const w = useWidth(); const isMobile = w < 640;
  const ref = useReveal();
  const lineCount = 36;
  return (
    <section className="fold" style={{
      position:"relative", overflow:"hidden",
      background:[
        "radial-gradient(ellipse 55% 60% at 0% 0%,   #FCC96B 0%, transparent 65%)",
        "radial-gradient(ellipse 50% 55% at 100% 0%,  #FCBB4A 0%, transparent 60%)",
        "radial-gradient(ellipse 40% 50% at 100% 100%,#F5C86A 0%, transparent 55%)",
        "radial-gradient(ellipse 30% 40% at 0% 80%,   #FDD08A 0%, transparent 55%)",
        "#ffffff",
      ].join(","),
      padding: isMobile ? "52px 20px 62px" : "clamp(62px,9vh,104px) 5vw",
      textAlign:"center",
      display:"flex", flexDirection:"column", justifyContent:"center",
    }}>
      {/* Dashed vertical lines — exact match to homepage DomainStatement */}
      <div style={{
        position:"absolute", inset:0, display:"flex",
        pointerEvents:"none", zIndex:0,
        WebkitMaskImage:"linear-gradient(90deg, transparent 0%, rgba(0,0,0,.08) 25%, rgba(0,0,0,.28) 50%, rgba(0,0,0,.55) 70%, rgba(0,0,0,.7) 100%)",
        maskImage:"linear-gradient(90deg, transparent 0%, rgba(0,0,0,.08) 25%, rgba(0,0,0,.28) 50%, rgba(0,0,0,.55) 70%, rgba(0,0,0,.7) 100%)",
      }}>
        {Array.from({ length: lineCount }).map((_,i) => (
          <div key={i} style={{ flex:1, borderRight:"1px dashed rgba(200,140,40,.35)" }} />
        ))}
      </div>

      <div style={{ position:"relative", zIndex:1, maxWidth:960, margin:"0 auto", width:"100%" }}>
        <div className="reveal" ref={ref} style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>

          {/* Large decorative open quote */}
          <div style={{
            fontFamily:"Georgia, serif",
            fontSize: isMobile ? 120 : 200,
            lineHeight:.7, color:"#C8930A", opacity:.22,
            userSelect:"none", marginBottom: isMobile ? -24 : -48,
          }}>"</div>

          <blockquote style={{ margin:0, padding:0 }}>
            <p className="kalam" style={{
              fontSize: isMobile ? "clamp(22px,6vw,34px)" : "clamp(32px,3vw,46px)",
              lineHeight:1.45, letterSpacing:".005em",
              color:"#1a1a3e", margin:0,
            }}>
              Without connected supplier analytics,{" "}
              <span className="kalam-accent">critical supplier knowledge</span>
              {" "}remains buried across{" "}
              <span className="kalam-accent">systems, reports, emails,</span>
              {" "}and teams — instead of driving{" "}
              <span className="kalam-highlight">proactive decisions.</span>
            </p>
          </blockquote>

        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════
   3. FEATURES
════════════════════════════════════ */
function SAFeatures() {
  const w = useWidth(); const isMobile = w < 640; const isTablet = w < 900;
  const ref = useReveal();
  return (
    <section id="features" style={{
      background:"#fff",
      position:"relative", overflow:"hidden",
      padding: isMobile ? "64px 20px" : "clamp(64px,9vh,104px) 5vw",
    }}>
      {/* Top accent line */}
      <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:"linear-gradient(90deg,var(--p500),var(--p300),#F59E0B)", pointerEvents:"none" }} />

      <div style={{ maxWidth:1080, margin:"0 auto", position:"relative", zIndex:1 }}>
        <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", flexWrap:"wrap", gap:20, marginBottom: isMobile ? 36 : 52 }}>
          <div>
            <Eyebrow>Core Capabilities</Eyebrow>
            <h2 style={{ fontFamily:"var(--fb)", fontSize: isMobile ? "clamp(22px,6vw,32px)" : "clamp(26px,3vw,40px)", fontWeight:900, letterSpacing:"-.04em", lineHeight:1.06, color:"#0F172A", marginBottom:10 }}>
              Three capabilities.<br />One connected supplier view.
            </h2>
            <p style={{ fontSize:15, color:"#64748B", lineHeight:1.7, fontFamily:"var(--fb)", maxWidth:480 }}>From raw supplier data to executive-ready decisions — automated, continuous, and AI-powered.</p>
          </div>
        </div>

        <div className="reveal" ref={ref} style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap:12 }}>
          {saFeatures.map((f, i) => (
            <div key={f.title} style={{
              background:"#FAFBFF",
              border:`1px solid ${f.color}18`,
              borderRadius:20,
              padding: isMobile ? "28px 22px" : "36px 28px",
              transition:"all .22s cubic-bezier(.22,1,.36,1)",
              cursor:"default",
              position:"relative", overflow:"hidden",
              boxShadow:`0 2px 12px ${f.color}08`,
            }}
              onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow=`0 10px 36px ${f.color}18`; e.currentTarget.style.borderColor=`${f.color}33`; }}
              onMouseLeave={e=>{ e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow=`0 2px 12px ${f.color}08`; e.currentTarget.style.borderColor=`${f.color}18`; }}
            >
              {/* Top colour bar */}
              <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:`linear-gradient(90deg,${f.color},${f.color}44,transparent)` }} />

              {/* Large number watermark */}
              <div style={{ position:"absolute", bottom:-8, right:12, fontFamily:"var(--fb)", fontSize:96, fontWeight:900, lineHeight:1, color:`${f.color}07`, userSelect:"none", pointerEvents:"none" }}>0{i+1}</div>

              {/* Tag */}
              <div style={{ display:"inline-flex", alignItems:"center", gap:5, background:`${f.color}0e`, border:`1px solid ${f.color}22`, borderRadius:100, padding:"3px 10px", marginBottom:18 }}>
                <span style={{ fontSize:9, fontWeight:800, letterSpacing:".1em", textTransform:"uppercase", color:f.color, fontFamily:"var(--fb)" }}>{f.tag}</span>
              </div>

              <div style={{ fontSize:28, marginBottom:16 }}>{f.icon}</div>
              <h3 style={{ fontFamily:"var(--fb)", fontSize: isMobile ? 18 : 20, fontWeight:800, color:"#0F172A", letterSpacing:"-.03em", lineHeight:1.2, marginBottom:12 }}>{f.title}</h3>
              <p style={{ fontSize:14, color:"#64748B", lineHeight:1.68, fontFamily:"var(--fb)", margin:0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════
   4. AI AGENTS
════════════════════════════════════ */
function SAAIAgents() {
  const w = useWidth(); const isMobile = w < 640; const isTablet = w < 900;
  const [active, setActive] = useState(0);
  const ag = saAgents[active];
  const ref = useReveal();

  const agentPills = [
    [["💬","Natural Language Query Responses"],["📊","Dynamic Supplier Dashboards"],["⚡","Faster Decision-Making"]],
    [["📅","Expiry & Audit Gap Tracking"],["🔁","Policy-Driven Follow-Up Workflows"],["🛡","Reduced Regulatory Risk"]],
    [["👁","Operational Performance Visibility"],["📈","Trend Analysis"],["🎯","Proactive KPI & Risk Detection"]],
  ];

  return (
    <section style={{ background:"linear-gradient(160deg,#0F0C2A 0%,#1a1260 45%,#221868 100%)", position:"relative", overflow:"hidden", padding: isMobile ? "64px 20px" : "clamp(64px,9vh,104px) 5vw" }}>
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", backgroundImage:"radial-gradient(rgba(255,255,255,.04) 1px,transparent 1px)", backgroundSize:"26px 26px" }} />
      <div style={{ position:"absolute", top:0, right:"10%", width:"40%", height:"60%", background:"radial-gradient(ellipse,rgba(99,32,224,.2) 0%,transparent 65%)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:0, left:"5%", width:"35%", height:"50%", background:"radial-gradient(ellipse,rgba(245,166,35,.08) 0%,transparent 65%)", pointerEvents:"none" }} />
      <div style={{ maxWidth:1080, margin:"0 auto", position:"relative", zIndex:1 }}>
        <div className="reveal" ref={ref}>
          <div style={{ marginBottom: isMobile ? 36 : 52 }}>
            <Eyebrow dark>AI Agents</Eyebrow>
            <h2 style={{ fontFamily:"var(--fb)", fontSize: isMobile ? "clamp(24px,6vw,34px)" : "clamp(28px,3.5vw,46px)", fontWeight:900, letterSpacing:"-.04em", lineHeight:1.1, background:"linear-gradient(95deg,#fff 0%,#fff 30%,#F5D060 62%,#F5A623 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", marginBottom:14, paddingBottom:6 }}>
              NimbleAI Agents<br />Driving decisions with your supplier data.
            </h2>
            <p style={{ fontSize: isMobile ? 14.5 : 16, color:"rgba(255,255,255,.45)", lineHeight:1.72, fontFamily:"var(--fb)", maxWidth:520 }}>
              Autonomous agents that report, follow up, and surface insights — so your team can focus on decisions, not data collection.
            </p>
          </div>

          {/* 3 cards — IPAIAgents style */}
          <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap:12, marginBottom:20 }}>
            {saAgents.map((a, i) => {
              const isAct = active === i;
              return (
                <div key={a.title} onClick={()=>setActive(i)} style={{
                  position:"relative", overflow:"hidden", borderRadius:18, cursor:"pointer",
                  border: isAct ? "1.5px solid rgba(255,255,255,.7)" : "1.5px solid rgba(255,255,255,.08)",
                  background: isAct ? "rgba(255,255,255,.18)" : "rgba(255,255,255,.04)",
                  padding: isMobile ? "22px 18px" : "28px 24px",
                  backdropFilter:"blur(10px)",
                  transition:"all .25s cubic-bezier(.22,1,.36,1)",
                  boxShadow: isAct ? "0 8px 32px rgba(255,255,255,.15), 0 0 0 1px rgba(255,255,255,.2) inset" : "none",
                  transform: isAct ? "translateY(-2px)" : "none",
                }}
                  onMouseEnter={e=>{ if(!isAct){ e.currentTarget.style.background="rgba(255,255,255,.10)"; e.currentTarget.style.borderColor="rgba(255,255,255,.24)"; e.currentTarget.style.transform="translateY(-2px)"; }}}
                  onMouseLeave={e=>{ if(!isAct){ e.currentTarget.style.background="rgba(255,255,255,.04)"; e.currentTarget.style.borderColor="rgba(255,255,255,.08)"; e.currentTarget.style.transform=""; }}}
                >
                  <div style={{ fontSize:32, marginBottom:14, lineHeight:1 }}>{a.icon}</div>
                  <h3 style={{ fontFamily:"var(--fb)", fontSize: isMobile ? 16 : 18, fontWeight:800, color:"#fff", letterSpacing:"-.025em", lineHeight:1.2, marginBottom:8 }}>{a.title}</h3>
                  <p style={{ fontSize: isMobile ? 12.5 : 13.5, color: isAct ? "rgba(255,255,255,.8)" : "rgba(255,255,255,.42)", lineHeight:1.6, fontFamily:"var(--fb)", margin:0, transition:"color .25s" }}>{a.desc}</p>
                  {isAct && <div style={{ position:"absolute", bottom:0, left:0, right:0, height:3, background:"linear-gradient(90deg,rgba(255,255,255,.9),rgba(255,255,255,.4),transparent)" }} />}
                </div>
              );
            })}
          </div>

          {/* Detail strip — IPAIAgents style */}
          <div style={{ background:"rgba(255,255,255,.12)", border:"1.5px solid rgba(255,255,255,.35)", borderRadius:14, padding: isMobile ? "18px 16px" : "20px 28px", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:14, backdropFilter:"blur(12px)", boxShadow:"0 4px 24px rgba(255,255,255,.08)" }}>
            <div style={{ display:"flex", alignItems:"center", gap:12, flexShrink:0 }}>
              <div style={{ width:38, height:38, borderRadius:11, background:"rgba(255,255,255,.2)", border:"1.5px solid rgba(255,255,255,.4)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 }}>{ag.icon}</div>
              <div>
                <div style={{ fontSize:11, fontWeight:700, color:"rgba(255,255,255,.6)", fontFamily:"var(--fb)", letterSpacing:".06em", textTransform:"uppercase", marginBottom:2 }}>Active Agent</div>
                <div style={{ fontSize:14, fontWeight:700, color:"#fff", fontFamily:"var(--fb)", letterSpacing:"-.02em" }}>{ag.title}</div>
              </div>
            </div>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              {(agentPills[active] || []).map(([icon, label]) => (
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
   5. VALUE REALIZATION TIMELINE
════════════════════════════════════ */
const saTimelineIcons = [
  ["📊","🔄","✅","📋","📉"],
  ["🎯","📈","👁"],
  ["🏗","🔮","🛡","⚡","🧠"],
];

function SATimeline() {
  const w = useWidth(); const isMobile = w < 640; const isTablet = w < 900;
  const [active, setActive] = useState(0);
  const ref = useReveal();

  const nodeColors = ["#6320E0", "#10B981", "#8B5CF6"];
  const nc = nodeColors[active];

  return (
    <section style={{
      background:"var(--slp)",
      position:"relative", overflow:"hidden",
      padding: isMobile ? "64px 20px 72px" : "clamp(64px,9vh,104px) 5vw",
    }}>
      {/* Top accent line */}
      <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:"linear-gradient(90deg,var(--p500),var(--p300),#F59E0B)", pointerEvents:"none" }} />

      <div style={{ maxWidth:1080, margin:"0 auto", position:"relative", zIndex:1 }}>

        {/* ── HEADER ── */}
        <div className="reveal" ref={ref}>
          <div style={{ marginBottom: isMobile ? 36 : 52 }}>
            <Eyebrow>Value Realization</Eyebrow>
            <h2 style={{ fontFamily:"var(--fb)", fontSize: isMobile ? "clamp(22px,6vw,32px)" : "clamp(26px,3vw,40px)", fontWeight:700, letterSpacing:"-.04em", lineHeight:1.06, color:"#0F172A", marginBottom:10 }}>
              From data to decisions.<br />A proven 12-month journey.
            </h2>
            <p style={{ fontSize:15, color:"#64748B", lineHeight:1.7, fontFamily:"var(--fb)", maxWidth:480 }}>
              Clear milestones so every stakeholder knows what to expect — and when.
            </p>
          </div>

          {/* ── STEP SELECTOR ── */}
          <div style={{ marginBottom: isMobile ? 28 : 40 }}>
            <div style={{ display:"flex", alignItems:"center", gap:0 }}>
              {saTimeline.map((p, i) => {
                const isAct  = active === i;
                const isPast = i < active;
                const c = nodeColors[i];
                const isConnectorPast = i > 0 && active >= i;
                return (
                  <Fragment key={p.period}>
                    {/* Connector segment between pills */}
                    {i > 0 && (
                      <div style={{
                        flex:1, height:2, borderRadius:99, minWidth:20,
                        background: isConnectorPast
                          ? `linear-gradient(90deg,${nodeColors[i-1]},${c})`
                          : "#E2E8F0",
                        transition:"background .5s cubic-bezier(.22,1,.36,1)",
                      }} />
                    )}
                    {/* Pill */}
                    <div onClick={()=>setActive(i)} style={{
                      display:"flex", alignItems:"center", gap: isMobile ? 6 : 8,
                      padding: isMobile ? "8px 12px" : "10px 20px",
                      borderRadius:999, cursor:"pointer", userSelect:"none", flexShrink:0,
                      background: isAct ? `linear-gradient(135deg,${c},${c}cc)` : isPast ? `${c}14` : "#fff",
                      border:`1.5px solid ${isAct ? c : isPast ? `${c}44` : "#E2E8F0"}`,
                      boxShadow: isAct ? `0 4px 20px ${c}40, 0 0 0 4px ${c}14` : "0 1px 3px rgba(0,0,0,.06)",
                      transition:"all .35s cubic-bezier(.22,1,.36,1)",
                    }}>
                      <div style={{
                        width: isMobile ? 20 : 24, height: isMobile ? 20 : 24,
                        borderRadius:"50%",
                        background: isAct ? "rgba(255,255,255,.25)" : isPast ? `${c}22` : "#F1F5F9",
                        display:"flex", alignItems:"center", justifyContent:"center",
                        flexShrink:0, transition:"background .3s",
                      }}>
                        {isPast ? (
                          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                            <path d="M2.5 6l3 3 4-4.5" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        ) : (
                          <span style={{ fontSize: isMobile ? 9 : 10, fontWeight:900, color: isAct ? "#fff" : "#94A3B8", fontFamily:"var(--fb)" }}>{i+1}</span>
                        )}
                      </div>
                      <span style={{
                        fontFamily:"var(--fb)", fontSize: isMobile ? 11 : 13,
                        fontWeight:700, letterSpacing:".04em", textTransform:"uppercase",
                        color: isAct ? "#fff" : isPast ? c : "#94A3B8",
                        transition:"color .3s", whiteSpace:"nowrap",
                      }}>{p.period}</span>
                    </div>
                  </Fragment>
                );
              })}
            </div>
          </div>

          {/* ── DETAIL CARD — white, dark text ── */}
          <div style={{
            position:"relative", minHeight: isMobile ? 360 : 240,
            borderRadius:20, background:"#fff",
            border:`1.5px solid ${nc}22`,
            boxShadow:`0 4px 32px ${nc}10`,
            overflow:"hidden",
            transition:"border-color .4s, box-shadow .4s",
          }}>
            {/* Top colour bar */}
            <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:`linear-gradient(90deg,${nc},${nc}66,transparent)`, transition:"background .4s" }} />

            {saTimeline.map((phase, i) => {
              const c = nodeColors[i];
              const isVis = active === i;
              return (
                <div key={phase.period} style={{
                  position:"absolute", inset:0,
                  padding: isMobile ? "24px 20px" : "32px 36px",
                  opacity: isVis ? 1 : 0,
                  transform: isVis ? "translateY(0)" : active > i ? "translateY(-10px)" : "translateY(10px)",
                  transition:"opacity .4s cubic-bezier(.22,1,.36,1), transform .4s cubic-bezier(.22,1,.36,1)",
                  pointerEvents: isVis ? "auto" : "none",
                  display:"flex", flexDirection:"column", gap:20,
                }}>
                  {/* Card header */}
                  <div style={{ display:"flex", alignItems:"center", gap:12, flexWrap:"wrap" }}>
                    <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:`${c}0e`, border:`1px solid ${c}28`, borderRadius:100, padding:"5px 14px", flexShrink:0 }}>
                      <span style={{ width:6, height:6, borderRadius:"50%", background:c, display:"inline-block" }} />
                      <span style={{ fontSize:10, fontWeight:800, letterSpacing:".1em", textTransform:"uppercase", color:c, fontFamily:"var(--fb)" }}>{phase.period}</span>
                    </div>
                    <h3 style={{ fontFamily:"var(--fb)", fontSize: isMobile ? 18 : 22, fontWeight:900, color:"#0F172A", letterSpacing:"-.03em", margin:0, lineHeight:1.1 }}>{phase.title}</h3>
                  </div>

                  {/* Milestone chips */}
                  <div style={{ display:"flex", flexWrap:"wrap", gap: isMobile ? 8 : 10 }}>
                    {phase.items.map((item, idx) => (
                      <div key={item} style={{
                        display:"inline-flex", alignItems:"center", gap:8,
                        background:`${c}06`,
                        border:`1px solid ${c}20`,
                        borderRadius:10,
                        padding: isMobile ? "9px 13px" : "11px 18px",
                        transition:"background .2s, border-color .2s",
                        cursor:"default",
                      }}
                        onMouseEnter={e=>{ e.currentTarget.style.background=`${c}12`; e.currentTarget.style.borderColor=`${c}40`; }}
                        onMouseLeave={e=>{ e.currentTarget.style.background=`${c}06`; e.currentTarget.style.borderColor=`${c}20`; }}
                      >
                        <span style={{ fontSize: isMobile ? 14 : 15 }}>{(saTimelineIcons[i]||[])[idx]||"✦"}</span>
                        <span style={{ fontFamily:"var(--fb)", fontSize: isMobile ? 12 : 13.5, fontWeight:600, color:"#334155", lineHeight:1.3 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════
   6. FAQs
════════════════════════════════════ */
function SAFAQs({ onNavigate }) {
  const w = useWidth(); const isMobile = w < 640;
  const [open, setOpen] = useState(null);
  const ref = useReveal();
  return (
    <section style={{ background:"#fff", position:"relative", overflow:"hidden", padding: isMobile ? "64px 20px" : "clamp(64px,9vh,104px) 5vw" }}>
      <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:"linear-gradient(90deg,var(--p500),var(--p300),#F59E0B)", pointerEvents:"none" }} />
      <div style={{ maxWidth:1040, margin:"0 auto" }}>
        <div className="reveal" ref={ref} style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1.5fr", gap: isMobile ? 36 : 64, alignItems:"start" }}>
          <div style={{ position:"static" }}>
            <Eyebrow>FAQs</Eyebrow>
            <h2 style={{ fontFamily:"var(--fb)", fontSize: isMobile ? "clamp(24px,6vw,32px)" : "clamp(26px,3vw,38px)", fontWeight:700, letterSpacing:"-.04em", lineHeight:1.08, color:"#0F172A", marginBottom:16 }}>Questions<br />we get asked</h2>
            <p style={{ fontSize:15, color:"#64748B", lineHeight:1.7, fontFamily:"var(--fb)", marginBottom:28 }}>Everything about Supplier Analytics, answered clearly.</p>
            <a
              href="/getstarted"
              onClick={(e) => {
                e.preventDefault();
                if (typeof onNavigate === "function") onNavigate("getstarted");
              }}
              style={{ display:"inline-flex", alignItems:"center", gap:6, fontSize:14, fontWeight:600, color:"var(--p700)", fontFamily:"var(--fb)", textDecoration:"none", borderBottom:"1.5px solid var(--p200)", paddingBottom:2, transition:"color .15s, border-color .15s", cursor:"pointer" }}
              onMouseEnter={e=>{ e.currentTarget.style.color="var(--p600)"; e.currentTarget.style.borderColor="var(--p400)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.color="var(--p700)"; e.currentTarget.style.borderColor="var(--p200)"; }}
            >Talk to our team →</a>
          </div>
          <div style={{ borderTop:"1px solid #E2E8F0" }}>
            {saFaqs.map((f,i)=>(
              <SAFAQItem key={i} f={f} isOpen={open===i} onToggle={()=>setOpen(open===i ? null : i)} isMobile={isMobile} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════
   7. CTA / RESOURCE BOOK
════════════════════════════════════ */
function SACTA({ onNavigate }) {
  const w = useWidth(); const isMobile = w < 640;
  const [email, setEmail] = useState(""); const [done, setDone] = useState(false);
  const ref = useReveal();
  return (
    <section style={{ background:"linear-gradient(160deg,#0f0c29 0%,#1a1260 40%,#261d6b 70%,#1e1050 100%)", position:"relative", overflow:"hidden", padding: isMobile ? "64px 20px 80px" : "clamp(72px,9vh,110px) 5vw" }}>
      <div style={{ position:"absolute", bottom:"-15%", right:"-5%", width:"55%", height:"85%", background:"radial-gradient(ellipse at 80% 80%, rgba(245,166,35,.16) 0%, transparent 60%)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", top:"-15%", left:"-5%", width:"55%", height:"80%", background:"radial-gradient(ellipse at 20% 20%, rgba(99,32,224,.28) 0%, transparent 60%)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(rgba(255,255,255,.04) 1px,transparent 1px)", backgroundSize:"26px 26px", pointerEvents:"none" }} />

      <div style={{ maxWidth:1040, margin:"0 auto", position:"relative", zIndex:2 }}>
        <div className="reveal" ref={ref} style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 40 : 80, alignItems:"center" }}>
          <div>
            <div style={{ display:"inline-flex", alignItems:"center", gap:7, background:"rgba(52,211,153,.12)", border:"1px solid rgba(52,211,153,.28)", borderRadius:100, padding:"5px 14px", marginBottom:20 }}>
              <span style={{ width:6, height:6, borderRadius:"50%", background:"#34D399", display:"inline-block", animation:"pulse-dot 2s infinite" }} />
              <span style={{ fontSize:11, fontWeight:700, color:"#6EE7B7", fontFamily:"var(--fb)", letterSpacing:".05em", textTransform:"uppercase" }}>Blog</span>
            </div>
            <h2 style={{ fontFamily:"var(--fb)", fontWeight:900, fontSize: isMobile ? "clamp(24px,7vw,34px)" : "clamp(26px,3.2vw,40px)", lineHeight:1.12, letterSpacing:"-.04em", background:"linear-gradient(95deg,#fff 0%,#fff 30%,#F5D060 62%,#F5A623 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", marginBottom:16, paddingBottom:8 }}>
              {PRODUCT_PAGE_RESOURCES.analytics.label}
            </h2>
            <p style={{ fontSize: isMobile ? 14.5 : 16, color:"rgba(255,255,255,.48)", lineHeight:1.75, fontFamily:"var(--fb)" }}>
              Get real-time visibility into supplier risk, compliance, performance, and operational health with AI-driven analytics.
            </p>
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
                  >Download Analytics Guide →</button>
                </div>
                <p style={{ fontSize:11.5, color:"rgba(255,255,255,.22)", marginTop:14, fontFamily:"var(--fb)", textAlign:"center" }}>No spam. Unsubscribe anytime.</p>
              </>
            ) : (
              <div style={{ textAlign:"center", padding:"20px 0" }}>
                <div style={{ fontSize:40, marginBottom:14 }}>✅</div>
                <div style={{ fontSize:16, fontWeight:700, color:"#34D399", fontFamily:"var(--fb)", marginBottom:8 }}>Guide on its way!</div>
                <div style={{ fontSize:14, color:"rgba(255,255,255,.45)", fontFamily:"var(--fb)" }}>Check your inbox at {email}</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div style={{ position:"absolute", bottom:0, left:0, right:0, height:52, overflow:"hidden", pointerEvents:"none" }}>
        <svg viewBox="0 0 1440 52" preserveAspectRatio="none" style={{ position:"absolute", bottom:0, left:0, width:"200%", height:"100%", animation:"waveSlide 10s linear infinite" }}>
          <path d="M0,26 C200,8 400,44 600,26 C800,8 1000,42 1200,26 C1360,12 1440,34 1440,26 L1440,52 L0,52 Z" fill="rgba(99,32,224,.12)" />
          <path d="M0,36 C180,14 380,50 580,32 C780,14 980,46 1180,30 C1340,16 1440,38 1440,36 L1440,52 L0,52 Z" fill="rgba(130,80,230,.07)" />
        </svg>
        <div style={{ position:"absolute", bottom:0, left:0, right:0, height:1, background:"linear-gradient(90deg,transparent,rgba(139,92,246,.4) 30%,rgba(139,92,246,.4) 70%,transparent)" }} />
      </div>
    </section>
  );
}

/* ════════════════════════════════════
   SA ROOT PAGE
════════════════════════════════════ */
export default function SupplierAnalyticsPage({ onBack, onNavigate }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <>
      <Nav onNavigate={onNavigate} onBack={onBack} pageName="Supplier Analytics" />
      <main>
        <SAHero onNavigate={onNavigate} />
        <SADomainStatement />
        <SAFeatures />
        <SAAIAgents />
        <SATimeline />
        <SAFAQs onNavigate={onNavigate} />
        <SACTA onNavigate={onNavigate} />
      </main>
      <VDDFooter onNavigate={onNavigate} />
    </>
  );
}
