"use client";

import { useState, useEffect, useRef, Fragment } from "react";
import { Nav } from "@/components/layout/SiteNav";
import { VDDFooter } from "@/components/layout/VDDFooter";
import { useWidth, useReveal, Eyebrow } from "@/components/shared/pageUi";

/* ═══════════════════════════════════════════════════════════
   RFQ MANAGEMENT — PRODUCT PAGE
═══════════════════════════════════════════════════════════ */

const rfqFaqs = [
  { q:"What is RFx Management by NimbleS2P?", a:"RFx Management by NimbleS2P is an AI-augmented platform that helps enterprises create, manage, evaluate, and close RFQ events faster and more accurately. It combines structured workflows with AI-augmented agents that assist procurement teams at every stage of the RFQ lifecycle." },
  { q:"Can RFQs be created quickly in NimbleS2P?", a:"Yes. Our solution allows teams to launch RFQ events using dynamic, reusable templates that adapt to category, scope, and commercial structure — significantly reducing setup time and rework." },
  { q:"How does RFx Management by NimbleS2P ensure maximum supplier participation?", a:"Our solution includes an AI Follow-Up Agent that automatically nudges vendors across multiple channels based on context, ensuring maximum response rates without procurement teams manually chasing suppliers." },
  { q:"Is RFx Management by NimbleS2P suitable for large enterprises?", a:"Yes. NimbleS2P is built exclusively for enterprises handling high RFQ volumes across multiple plants, business units, and regions, with complex approval hierarchies and strict audit requirements." },
  { q:"How does RFx Management by NimbleS2P help procurement teams shortlist suppliers?", a:"AI-augmented agents intelligently analyse supplier responses across pricing, compliance status, historical performance, and category relevance — helping teams arrive at faster, more informed shortlists while final evaluation and decision-making remain firmly human-led." },
];

const rfqAgents = [
  { icon:"📊", num:"01", title:"Price Comparison Agent", desc:"Brings all RFQ responses into one standardised view, highlighting price differences so evaluations move faster and stay objective.", color:"#6320E0" },
  { icon:"🔔", num:"02", title:"Follow-Up Agent", desc:"Automates timely, multi-channel nudges to vendors, ensuring no response, clarification, or submission is ever missed.", color:"#0369A1" },
  { icon:"⭐", num:"03", title:"Supplier Scoring Agent", desc:"Evaluates and scores vendors across multiple parameters, combining transactional performance and compliance insights for smarter shortlisting.", color:"#059669" },
];

const rfqFeatures = [
  { icon:"🚀", color:"#6320E0", tag:"Templates",    title:"Launch RFx Events the Right Way",           desc:"Dynamic, reusable templates eliminate repetitive setup — helping teams create structured RFx events faster without starting from scratch." },
  { icon:"⚡", color:"#D97706", tag:"Approvals",     title:"Approvals That Move Themselves",            desc:"Multi-level approval workflows route RFx events automatically based on value, category, or policy — governance stays intact without slowing sourcing cycles." },
  { icon:"📋", color:"#0369A1", tag:"Collaboration", title:"Supplier Responses Made Effortless",       desc:"Vendors respond directly through the portal — removing spreadsheets, email attachments, and friction that typically delay sourcing cycles." },
  { icon:"🛡", color:"#DB2777", tag:"Compliance",    title:"Risk Checks Before Price Comparisons",     desc:"Embedded compliance and due diligence ensure only verified, eligible suppliers move forward — evaluation focuses on value, not risk cleanup." },
  { icon:"💬", color:"#059669", tag:"Decision Room", title:"One Decision Room for All Stakeholders",   desc:"Teams collaborate, comment, and score responses inside a single workspace — evaluations stay structured, transparent, and defensible." },
  { icon:"📈", color:"#7C3AED", tag:"Analytics",     title:"Visibility That Improves Every RFx Run",   desc:"Dashboards reveal participation rates, pricing benchmarks, response delays, and cycle times — turning execution into a continuously optimised process." },
];

const rfqBenefits = [
  { stat:"50%",    label:"Higher supplier response rates",     desc:"AI follow-ups reach vendors across channels automatically" },
  { stat:"5–12%",  label:"Cost savings through competitive bidding", desc:"Structured evaluations surface the best commercial outcomes" },
  { stat:"50–70%", label:"Reduction in manual effort",         desc:"One sourcing manager can handle 3× more RFx events" },
  { stat:"100%",   label:"Standardisation across enterprise",  desc:"Consistent sourcing quality across geographies and BUs" },
];

const rfqStats = [
  ["50","%","Supplier Response Uplift"],
  ["5–12","%","Cost Savings"],
  ["70","%","Less Manual Effort"],
  ["3","×","More RFx Per Manager"],
];

/* ── RFQ FAQ Item ── */
function RFQFAQItem({ f, isOpen, onToggle, isMobile }) {
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
function RFQHero({ onNavigate }) {
  const w = useWidth(); const isMobile = w < 640;
  return (
    <section style={{
      minHeight:"100vh", position:"relative", overflow:"hidden",
      background:"linear-gradient(140deg,#14104A 0%,#1E1660 40%,#261d6b 70%,#1a1258 100%)",
      display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
      padding: isMobile ? "110px 20px 64px" : "128px 5vw 80px",
      textAlign:"center",
    }}>
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", background:"radial-gradient(ellipse 90% 70% at 50% 35%, rgba(99,32,224,.32) 0%, transparent 65%)" }} />
      <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"50%", pointerEvents:"none", background:"radial-gradient(ellipse 80% 60% at 50% 100%, rgba(245,166,35,.09) 0%, transparent 70%)" }} />
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", backgroundImage:"radial-gradient(rgba(255,255,255,.045) 1px,transparent 1px)", backgroundSize:"30px 30px" }} />

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
          Sourcing Built for<br />Forward-Looking Enterprises
        </h1>


        {/* Sub */}
        <p className="fade-up d2" style={{ fontSize: isMobile ? 15 : 16, color:"rgba(255,255,255,.52)", lineHeight:1.72, fontFamily:"var(--fb)", maxWidth:680, margin:"0 auto 36px" }}>
          An AI-augmented sourcing platform that simplifies RFQ while upholding compliance effortlessly — guaranteeing maximum supplier participation at every event.
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
          >See Features ↓</a>
        </div>

        {/* Stats tiles — same design as all other pages */}
        <div className="fade-up d4" style={{ width:"100%" }}>
          <div style={{ display:"grid", gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(4,1fr)",
          gap:1,
          background:"rgba(255,255,255,.07)", border:"1px solid rgba(255,255,255,.1)",
          borderRadius:16, overflow:"hidden", backdropFilter:"blur(12px)",
        }}>
          {rfqStats.map(([main,sup,label],i)=>(
            <div key={label} style={{
              padding: isMobile ? "18px 12px" : "22px 16px", textAlign:"center",
              borderRight: i < rfqStats.length-1 && !(isMobile && i%2===1) ? "1px solid rgba(255,255,255,.08)" : "none",
              borderBottom: isMobile && i < 2 ? "1px solid rgba(255,255,255,.08)" : "none",
            }}>
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
      </div>
    </section>
  );
}

/* ════════════════════════════════════
   2. AI AGENTS — same card-grid as VDD/SP/IP
════════════════════════════════════ */
function RFQAIAgents() {
  const w = useWidth(); const isMobile = w < 640; const isTablet = w < 900;
  const [active, setActive] = useState(0);
  const ag = rfqAgents[active];
  const ref = useReveal();

  const agentPills = [
    [["🔍","Unified Supplier Bid View"],["📊","Side-by-Side Commercial Analysis"],["⚖️","Bias-Free Supplier Evaluation"]],
    [["💬","Intelligent Vendor Nudges"],["📈","Higher Supplier Response Rates"],["⚡","Accelerated Sourcing Timelines"]],
    [["📋","Data-Backed Sourcing Decisions"],["🤖","Automated Supplier Shortlisting"],["🎯","Better Procurement Outcomes"]],
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
              Three agents. Every RFQ.<br />Maximum participation guaranteed.
            </h2>
            <p style={{ fontSize: isMobile ? 14.5 : 16, color:"rgba(255,255,255,.45)", lineHeight:1.72, fontFamily:"var(--fb)", maxWidth:520 }}>
              AI-augmented agents working alongside your team — so no supplier is missed and every evaluation is objective.
            </p>
          </div>

          {/* 3 cards — IP AI Agents style */}
          <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap:12, marginBottom:20 }}>
            {rfqAgents.map((a,i) => {
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

          {/* Detail strip — IP style */}
          <div style={{ background:"rgba(255,255,255,.12)", border:"1.5px solid rgba(255,255,255,.35)", borderRadius:14, padding: isMobile ? "18px 16px" : "20px 28px", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:14, backdropFilter:"blur(12px)", boxShadow:"0 4px 24px rgba(255,255,255,.08)" }}>
            <div style={{ display:"flex", alignItems:"center", gap:12, flexShrink:0 }}>
              <div style={{ width:38, height:38, borderRadius:11, background:"rgba(255,255,255,.2)", border:"1.5px solid rgba(255,255,255,.4)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 }}>{ag.icon}</div>
              <div>
                <div style={{ fontSize:11, fontWeight:700, color:"rgba(255,255,255,.6)", fontFamily:"var(--fb)", letterSpacing:".06em", textTransform:"uppercase", marginBottom:2 }}>Active Agent</div>
                <div style={{ fontSize:14, fontWeight:700, color:"#fff", fontFamily:"var(--fb)", letterSpacing:"-.02em" }}>{ag.title}</div>
              </div>
            </div>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              {(agentPills[active] || []).map(([icon,label])=>(
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
   3. FEATURES — 3+3 equal grid on white
════════════════════════════════════ */
function RFQFeatures() {
  const w = useWidth(); const isMobile = w < 640; const isTablet = w < 900;
  const ref = useReveal();
  return (
    <section id="features" style={{ background:"#fff", padding: isMobile ? "64px 20px" : "clamp(64px,9vh,104px) 5vw" }}>
      <div style={{ maxWidth:1080, margin:"0 auto" }}>
        <div style={{ marginBottom: isMobile ? 36 : 52 }}>
          <Eyebrow>Features</Eyebrow>
          <h2 style={{ fontFamily:"var(--fb)", fontSize: isMobile ? "clamp(22px,6vw,32px)" : "clamp(26px,3vw,40px)", fontWeight:700, letterSpacing:"-.04em", lineHeight:1.06, color:"#0F172A", marginBottom:10 }}>
            Six capabilities.<br />One sourcing platform.
          </h2>
          <p style={{ fontSize:15, color:"#64748B", lineHeight:1.7, fontFamily:"var(--fb)", maxWidth:480 }}>
            Every feature built to remove a specific friction point from your RFx lifecycle.
          </p>
        </div>
        <div className="reveal" ref={ref} style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "1fr 1fr 1fr", gap:14 }}>
          {rfqFeatures.map((f,i)=>(
            <div key={f.title} style={{ background:"#FAFBFF", border:"1px solid #F1F5F9", borderRadius:18, padding: isMobile ? "22px 18px" : "28px 24px", display:"flex", flexDirection:"column", gap:14, position:"relative", overflow:"hidden", boxShadow:"0 1px 4px rgba(0,0,0,.04)", transition:"all .22s cubic-bezier(.22,1,.36,1)", cursor:"default" }}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow=`0 10px 32px ${f.color}14`;e.currentTarget.style.borderColor=`${f.color}30`;}}
              onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="0 1px 4px rgba(0,0,0,.04)";e.currentTarget.style.borderColor="#F1F5F9";}}
            >
              <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:`linear-gradient(90deg,${f.color},${f.color}44,transparent)` }} />
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                <div style={{ width:44, height:44, borderRadius:12, background:`${f.color}0f`, border:`1px solid ${f.color}20`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:21 }}>{f.icon}</div>
                <span style={{ fontSize:9.5, fontWeight:700, letterSpacing:".07em", textTransform:"uppercase", color:f.color, background:`${f.color}0e`, border:`1px solid ${f.color}22`, borderRadius:100, padding:"2px 9px", fontFamily:"var(--fb)" }}>{f.tag}</span>
              </div>
              <div>
                <h3 style={{ fontFamily:"var(--fb)", fontSize: isMobile ? 15.5 : 17, fontWeight:700, color:"#0F172A", letterSpacing:"-.02em", lineHeight:1.2, marginBottom:8 }}>{f.title}</h3>
                <p style={{ fontSize:13.5, color:"#64748B", lineHeight:1.68, fontFamily:"var(--fb)", margin:0 }}>{f.desc}</p>
              </div>
              <div style={{ position:"absolute", bottom:-4, right:14, fontFamily:"var(--fb)", fontSize:56, fontWeight:900, lineHeight:1, color:`${f.color}07`, userSelect:"none", pointerEvents:"none" }}>{String(i+1).padStart(2,"0")}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════
   4. BENEFITS — Business Impact (same layout as IP)
════════════════════════════════════ */
function RFQBenefits() {
  const w = useWidth(); const isMobile = w < 640; const isTablet = w < 900;
  const ref = useReveal();
  return (
    <section style={{ background:"var(--slp)", position:"relative", overflow:"hidden", padding: isMobile ? "64px 20px" : "clamp(64px,9vh,104px) 5vw" }}>
      {/* Top accent line */}
      <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:"linear-gradient(90deg,var(--p500),var(--p300),#F59E0B)", pointerEvents:"none" }} />
      <div style={{ maxWidth:1080, margin:"0 auto" }}>
        <div className="reveal" ref={ref}>
          <div style={{ marginBottom: isMobile ? 36 : 52 }}>
            <Eyebrow>Business Impact</Eyebrow>
            <h2 style={{ fontFamily:"var(--fb)", fontSize: isMobile ? "clamp(22px,6vw,32px)" : "clamp(26px,3vw,40px)", fontWeight:700, letterSpacing:"-.04em", lineHeight:1.06, color:"#0F172A", marginBottom:10 }}>
              Measurable wins,<br />from the first RFx event.
            </h2>
            <p style={{ fontSize:15, color:"#64748B", lineHeight:1.7, fontFamily:"var(--fb)", maxWidth:480 }}>
              Outcomes that procurement leaders report within the first 90 days.
            </p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(4,1fr)", gap:16 }}>
            {rfqBenefits.map((b,i)=>{
              const colours=["#6320E0","#0369A1","#059669","#D97706"];
              const c=colours[i];
              return (
                <div key={b.label} style={{ background:"#fff", borderRadius:18, border:`1px solid ${c}18`, padding: isMobile ? "22px 18px" : "28px 22px", display:"flex", flexDirection:"column", boxShadow:`0 2px 16px ${c}0c`, position:"relative", overflow:"hidden", transition:"all .22s cubic-bezier(.22,1,.36,1)" }}
                  onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow=`0 8px 28px ${c}18`;e.currentTarget.style.borderColor=`${c}33`;}}
                  onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow=`0 2px 16px ${c}0c`;e.currentTarget.style.borderColor=`${c}18`;}}
                >
                  <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:`linear-gradient(90deg,${c},${c}44,transparent)` }} />
                  <div style={{ fontFamily:"var(--fb)", fontSize: isMobile ? 32 : 38, fontWeight:900, color:c, letterSpacing:"-.04em", lineHeight:1, marginBottom:8, marginTop:8 }}>{b.stat}</div>
                  <div style={{ fontFamily:"var(--fb)", fontSize: isMobile ? 14 : 15.5, fontWeight:700, color:"#0F172A", letterSpacing:"-.02em", lineHeight:1.25, marginBottom:8 }}>{b.label}</div>
                  <div style={{ fontSize:13, color:"#64748B", lineHeight:1.6, fontFamily:"var(--fb)", marginTop:"auto" }}>{b.desc}</div>
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
   5. FAQs
════════════════════════════════════ */
function RFQFAQs({ onNavigate }) {
  const w = useWidth(); const isMobile = w < 640;
  const [open, setOpen] = useState(null);
  const ref = useReveal();
  return (
    <section style={{ background:"#fff", padding: isMobile ? "64px 20px" : "clamp(64px,9vh,104px) 5vw" }}>
      <div style={{ maxWidth:1040, margin:"0 auto" }}>
        <div className="reveal" ref={ref} style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1.5fr", gap: isMobile ? 36 : 64, alignItems:"start" }}>
          <div style={{ position:"static" }}>
            <Eyebrow>FAQs</Eyebrow>
            <h2 style={{ fontFamily:"var(--fb)", fontSize: isMobile ? "clamp(24px,6vw,32px)" : "clamp(26px,3vw,38px)", fontWeight:700, letterSpacing:"-.04em", lineHeight:1.08, color:"#0F172A", marginBottom:16 }}>Questions<br />we get asked</h2>
            <p style={{ fontSize:15, color:"#64748B", lineHeight:1.7, fontFamily:"var(--fb)", marginBottom:28 }}>Everything about RFx Management by NimbleS2P, answered.</p>
            <a
              href="/getstarted"
              onClick={(e) => {
                e.preventDefault();
                if (typeof onNavigate === "function") onNavigate("getstarted");
              }}
              style={{ display:"inline-flex", alignItems:"center", gap:6, fontSize:14, fontWeight:600, color:"var(--p600)", fontFamily:"var(--fb)", textDecoration:"none", borderBottom:"1.5px solid var(--p200)", paddingBottom:2, transition:"color .15s,border-color .15s", cursor:"pointer" }}
              onMouseEnter={e=>{e.currentTarget.style.color="var(--p700)";e.currentTarget.style.borderColor="var(--p400)";}}
              onMouseLeave={e=>{e.currentTarget.style.color="var(--p600)";e.currentTarget.style.borderColor="var(--p200)";}}
            >Talk to our team →</a>
          </div>
          <div style={{ borderTop:"1px solid #E2E8F0" }}>
            {rfqFaqs.map((f,i)=>(
              <RFQFAQItem key={i} f={f} isOpen={open===i} onToggle={()=>setOpen(open===i?null:i)} isMobile={isMobile} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/** RFx Management bottom CTA → resource (matches Invoice Processing layout) */
const RFQ_CTA_RESOURCE_HREF = "/resources/rfq-best-practices";

/* ════════════════════════════════════
   6. CTA — matches Invoice Processing IPCTA
════════════════════════════════════ */
function RFQCTA() {
  const w = useWidth();
  const isMobile = w < 640;

  return (
    <section style={{
      position:"relative", overflow:"hidden",
      background:"#0f0c29",
      padding: isMobile ? "62px 20px 78px" : "clamp(72px,9vh,110px) 5vw",
    }}>
      <div style={{ position:"absolute", inset:0, pointerEvents:"none" }}>
        <div style={{ position:"absolute", inset:0,
          background:"linear-gradient(135deg,#0f0c29 0%,#1a1260 40%,#261d6b 70%,#1e1050 100%)"
        }} />
        <div style={{ position:"absolute", bottom:"-10%", right:"-5%", width:"50%", height:"80%",
          background:"radial-gradient(ellipse at 80% 80%, rgba(245,166,35,.22) 0%, transparent 60%)"
        }} />
        <div style={{ position:"absolute", top:"-10%", left:"-5%", width:"55%", height:"75%",
          background:"radial-gradient(ellipse at 20% 20%, rgba(99,32,224,.38) 0%, transparent 60%)"
        }} />
        <div style={{ position:"absolute", inset:0,
          backgroundImage:"radial-gradient(circle, rgba(255,255,255,.06) 1px, transparent 1px)",
          backgroundSize:"28px 28px"
        }} />
      </div>

      <div style={{ position:"absolute", top:0, left:0, right:0, height:52, overflow:"hidden", pointerEvents:"none" }}>
        <svg viewBox="0 0 1440 52" preserveAspectRatio="none"
          style={{ position:"absolute", top:0, left:0, width:"200%", height:"100%", animation:"waveSlide 9s linear infinite" }}>
          <path d="M0,26 C200,8 400,44 600,26 C800,8 1000,44 1200,26 C1360,12 1440,36 1440,26 L1440,0 L0,0 Z" fill="rgba(99,32,224,.15)" />
          <path d="M0,36 C180,12 380,52 580,32 C780,12 980,48 1180,28 C1340,14 1440,38 1440,36 L1440,0 L0,0 Z" fill="rgba(130,80,230,.09)" />
        </svg>
        <div style={{ position:"absolute", top:0, left:0, right:0, height:1,
          background:"linear-gradient(90deg,transparent,rgba(139,92,246,.45) 30%,rgba(139,92,246,.45) 70%,transparent)"
        }} />
      </div>

      <div style={{
        position:"relative", zIndex:2,
        maxWidth:1000, margin:"0 auto",
        textAlign:"center",
        display:"flex", flexDirection:"column", alignItems:"center",
      }}>
        <div style={{
          display:"inline-flex", alignItems:"center", gap:8, marginBottom:28,
          background:"rgba(245,166,35,.12)", border:"1px solid rgba(245,166,35,.3)",
          borderRadius:100, padding:"6px 18px",
        }}>
          <span style={{ width:7, height:7, borderRadius:"50%", background:"#F5A623", boxShadow:"0 0 8px rgba(245,166,35,.8)", display:"inline-block", animation:"pulse-dot 2.4s ease-in-out infinite" }} />
          <span style={{ fontSize:12, fontWeight:600, color:"#F5D060", fontFamily:"var(--fb)", letterSpacing:".04em" }}>
            See NimbleS2P In Action
          </span>
        </div>

        <h2 style={{
          fontFamily:"var(--fb)", fontWeight:900,
          fontSize: isMobile ? "clamp(26px,7vw,38px)" : "clamp(36px,4vw,56px)",
          lineHeight:1.1, letterSpacing:"-.04em",
          background:"linear-gradient(95deg,#fff 0%,#fff 30%,#F5D060 62%,#F5A623 100%)",
          WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
          margin:"0 auto 20px",
          maxWidth:900,
        }}>
          The RFQ Reality Index
        </h2>

        <p style={{
          fontSize: isMobile ? 14 : 16, color:"rgba(255,255,255,.52)",
          lineHeight:1.75, fontFamily:"var(--fb)",
          margin:"0 auto 40px", maxWidth:640,
        }}>
          A short diagnostic that benchmarks RFQ maturity across speed, governance, collaboration, and AI enablement. Know exactly where your gaps are.
        </p>

        <a
          href={RFQ_CTA_RESOURCE_HREF}
          style={{
            display:"inline-flex", alignItems:"center", justifyContent:"center", gap:8,
            background:"linear-gradient(135deg,#E8920A,#F5B020)", color:"#fff",
            borderRadius:12, padding: isMobile ? "13px 36px" : "15px 48px",
            fontSize: isMobile ? 15 : 16.5, fontWeight:700,
            textDecoration:"none", fontFamily:"var(--fb)", letterSpacing:"-.01em",
            boxShadow:"0 6px 28px rgba(232,150,10,.5), 0 1px 0 rgba(255,255,255,.15) inset",
            transition:"transform .2s cubic-bezier(.22,1,.36,1), box-shadow .2s",
            cursor:"pointer",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 14px 40px rgba(232,150,10,.65)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow="0 6px 28px rgba(232,150,10,.5), 0 1px 0 rgba(255,255,255,.15) inset"; }}
        >
          Read More →
        </a>
      </div>

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
   ROOT PAGE
════════════════════════════════════ */

/* ════════════════════════════════════
   RFQ DOMAIN STATEMENT
════════════════════════════════════ */
function RFQDomainStatement() {
  const w = useWidth();
  const isMobile = w < 640;
  const lineCount = 36;

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
      textAlign:"center",
    }}>
      {/* Dashed vertical lines */}
      <div style={{
        position:"absolute", inset:0, display:"flex",
        pointerEvents:"none", zIndex:0,
        WebkitMaskImage:"linear-gradient(90deg,transparent 0%,rgba(0,0,0,.08) 25%,rgba(0,0,0,.28) 50%,rgba(0,0,0,.55) 70%,rgba(0,0,0,.7) 100%)",
        maskImage:"linear-gradient(90deg,transparent 0%,rgba(0,0,0,.08) 25%,rgba(0,0,0,.28) 50%,rgba(0,0,0,.55) 70%,rgba(0,0,0,.7) 100%)",
      }}>
        {Array.from({ length: lineCount }).map((_,i) => (
          <div key={i} style={{ flex:1, borderRight:"1px dashed rgba(200,140,40,.35)" }} />
        ))}
      </div>

      <div style={{ position:"relative", zIndex:1, maxWidth: isMobile ? "100%" : 960, margin:"0 auto", textAlign:"center" }}>

        {/* Large decorative open quote */}
        <div style={{
          fontFamily:"Georgia, serif", fontSize: isMobile ? 120 : 200,
          lineHeight:.7, color:"#C8930A", opacity:.22,
          userSelect:"none", marginBottom: isMobile ? -24 : -48,
        }}>"</div>

        {/* Main statement */}
        <p className="kalam" style={{
          fontSize: isMobile ? "clamp(22px,6.5vw,32px)" : "clamp(28px,3vw,44px)",
          lineHeight:1.55,
          color:"#1a1a3e",
          marginBottom: isMobile ? 32 : 52,
          letterSpacing:".005em",
          textAlign:"center",
        }}>
          At{" "}
          <span className="kalam-highlight">USD 50 Million spend</span>
          {", inefficient sourcing silently leaks "}
          <span className="kalam-highlight">2–5% annually</span>
          {" while locking "}
          <span className="kalam-highlight" style={{ whiteSpace:"nowrap" }}>20–30% of spend</span>
          {" outside negotiation control."}
        </p>

      </div>
      {/* Bottom wave */}
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

export default function RFQManagementPage({ onBack, onNavigate }) {
  return (
    <>
      <Nav onNavigate={onNavigate} onBack={onBack} pageName="RFx Management" />
      <main>
        <RFQHero onNavigate={onNavigate} />
        <RFQDomainStatement />
        <RFQAIAgents />
        <RFQFeatures />
        <RFQBenefits />
        <RFQFAQs onNavigate={onNavigate} />
        <RFQCTA />
      </main>
      <VDDFooter onNavigate={onNavigate} />
    </>
  );
}
