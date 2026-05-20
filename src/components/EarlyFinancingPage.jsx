"use client";

import { useState, useEffect, useRef, Fragment } from "react";
import { Nav } from "@/components/layout/SiteNav";
import { VDDFooter } from "@/components/layout/VDDFooter";
import { useWidth, useReveal, Eyebrow } from "@/components/shared/pageUi";

import { PRODUCT_PAGE_RESOURCES } from "@/components/layout/megaMenuData";

/* ═══════════════════════════════════════════════════════════
   EARLY FINANCING — PRODUCT PAGE
   Color palette: purple (#14104A / #6320E0) + gold (#F5A623)
═══════════════════════════════════════════════════════════ */

const efProducts = [
  { icon:"🏪", id:"DF",      label:"Dealer Finance",               short:"DF",      desc:"Empower dealers and distributors with faster credit access to accelerate sales and improve channel liquidity." },
  { icon:"🤝", id:"VF",      label:"Vendor Finance",               short:"VF",      desc:"Enable suppliers to access affordable financing against approved purchase programs and strengthen supplier relationships." },
  { icon:"📄", id:"SID",     label:"Sales Invoice Discounting",    short:"SID",     desc:"Unlock immediate cash flow by discounting receivables against issued sales invoices." },
  { icon:"🧾", id:"PID",     label:"Purchase Invoice Discounting", short:"PID",     desc:"Help suppliers receive early payment on approved purchase invoices without impacting buyer cash cycles." },
  { icon:"📦", id:"FACT",    label:"Factoring",                    short:"FACT",    desc:"Support both anchor-led and standalone receivable financing with flexible factoring structures." },
  { icon:"🔄", id:"REVFACT", label:"Reverse Factoring",           short:"REVFACT", desc:"Allow suppliers to receive early payment backed by buyer credit strength through anchor-based financing programs." },
];

const efFeatures = [
  { icon:"⚡", label:"Auto invoice ingestion from ERP" },
  { icon:"🧠", label:"Intelligent financing eligibility checks" },
  { icon:"🔀", label:"Auto lender routing" },
  { icon:"🔔", label:"Automated reminders & follow-ups" },
  { icon:"📊", label:"Dynamic limit validations" },
  { icon:"💸", label:"Settlement reconciliation" },
  { icon:"🤖", label:"AI-assisted exception handling" },
  { icon:"📁", label:"Digital document collection" },
  { icon:"⚙️", label:"Configurable workflow engine" },
];

const efBenefitsSupplier = [
  { icon:"💰", title:"Faster Access to Working Capital",   desc:"Improve liquidity without waiting for long payment cycles." },
  { icon:"📉", title:"Better Financing Rates",             desc:"Leverage anchor credibility and invoice-backed financing." },
  { icon:"📱", title:"Fully Digital Experience",           desc:"Paperless onboarding, eKYC, approvals, and tracking." },
  { icon:"👁",  title:"Real-Time Visibility",              desc:"Track financing status, invoices, limits, and settlements in one place." },
  { icon:"🔕", title:"Reduced Follow-Ups",                 desc:"Automated workflows reduce manual coordination with buyers and lenders." },
];

const efBenefitsAnchor = [
  { icon:"🔗", title:"Strengthen Supply Chain Stability",  desc:"Help suppliers maintain healthy cash flows and operational continuity." },
  { icon:"⭐", title:"Improve Supplier Relationships",     desc:"Become a preferred buyer with faster payment enablement." },
  { icon:"⚡", title:"Increase Procurement Efficiency",    desc:"Reduce payment disputes and financing coordination effort." },
  { icon:"🚀", title:"Improve Dealer Sales Velocity",      desc:"Enable dealers to purchase more inventory with financing support." },
  { icon:"📊", title:"Gain Better Visibility & Controls",  desc:"Monitor exposure, utilization, lender participation, and financing trends centrally." },
  { icon:"💡", title:"Optimize Working Capital",           desc:"Extend payable cycles strategically while supporting supplier liquidity." },
];

const efJourney = [
  { icon:"📋", step:"01", label:"Invoice Generated / Approved" },
  { icon:"🧠", step:"02", label:"Financing Eligibility Evaluated" },
  { icon:"🏦", step:"03", label:"Lender Matching & Offer Selection" },
  { icon:"✅", step:"04", label:"Supplier Acceptance" },
  { icon:"📁", step:"05", label:"Digital Documentation" },
  { icon:"💸", step:"06", label:"Disbursement" },
  { icon:"🔄", step:"07", label:"Settlement & Reconciliation" },
  { icon:"📊", step:"08", label:"Audit & Reporting" },
];

const efComparison = [
  ["Multiple disconnected systems",   "Unified financing platform"],
  ["Manual lender coordination",      "Pre-integrated lender ecosystem"],
  ["Heavy operational workload",      "Automated workflows"],
  ["Limited visibility",              "Real-time dashboards"],
  ["Slow supplier onboarding",        "Digital onboarding journeys"],
  ["Compliance handled manually",     "Embedded controls & auditability"],
  ["Difficult scaling",               "Multi-program scalable architecture"],
];

const efCompliance = [
  { icon:"📜", label:"RBI & regulatory aligned workflows" },
  { icon:"🪪", label:"GST/PAN/KYC validations" },
  { icon:"🔍", label:"Digital audit trails" },
  { icon:"🔐", label:"Role-based access controls" },
  { icon:"✅", label:"Multi-level approvals" },
  { icon:"🚫", label:"Duplicate invoice checks" },
  { icon:"⚖️", label:"Financing eligibility rules" },
  { icon:"🏛️", label:"Automated sanction validations" },
  { icon:"🛡",  label:"Fraud & anomaly detection" },
  { icon:"📂", label:"Document verification workflows" },
  { icon:"🔗", label:"API-based compliance checks" },
  { icon:"🤝", label:"Consent & agreement management" },
];

const efEnterprise = [
  "Multi-ERP connectivity", "Multi-entity support", "Multi-country ready architecture",
  "Configurable workflows", "API-first platform", "Secure document vault",
  "Enterprise SLAs", "High-volume transaction handling",
];

const efFaqs = [
  { q:"How does Supply Chain Financing work?", a:"In Supply Chain Financing, a buyer approves supplier invoices, and a financing institution pays the supplier early at a discounted rate. The buyer then pays the financing provider on the agreed due date." },
  { q:"Why is Supply Chain Financing important for enterprises?", a:"Supply Chain Financing helps enterprises maintain healthy supplier ecosystems, improve procurement efficiency, enhance liquidity management, and reduce supply chain disruptions." },
  { q:"Who can benefit from Supply Chain Financing?", a:"Large enterprises, SMEs, manufacturers, retailers, distributors, logistics companies, and suppliers across industries can benefit from Supply Chain Financing programs." },
  { q:"What is the difference between Supply Chain Financing and traditional loans?", a:"Unlike traditional loans, Supply Chain Financing is based on approved invoices and buyer creditworthiness rather than supplier credit ratings, making financing more accessible and cost-effective for suppliers." },
  { q:"Is Supply Chain Financing secure?", a:"Yes. Modern Supply Chain Financing platforms use secure cloud infrastructure, encrypted transactions, access controls, and compliance standards to protect financial and supplier data." },
];

const efCredibility = [
  { stat:"20+",  label:"Financing Institutions Connected" },
  { stat:"80%",  label:"Reduced Manual Financing Operations" },
  { stat:"6+",   label:"Embedded Financing Products" },
  { stat:"70%+", label:"Faster Supplier Liquidity Access" },
];

/* ── FAQ Item ── */
function EFFAQItem({ f, isOpen, onToggle, isMobile }) {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);
  useEffect(() => { if (contentRef.current) setHeight(isOpen ? contentRef.current.scrollHeight : 0); }, [isOpen]);
  return (
    <div style={{ borderBottom:"1px solid #E2E8F0", overflow:"hidden" }}>
      <button onClick={onToggle} style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between", gap:16, padding:"22px 0", background:"transparent", border:"none", cursor:"pointer", textAlign:"left" }}>
        <span style={{ fontFamily:"var(--fb)", fontSize: isMobile ? 15 : 17, fontWeight:700, color:"#0F172A", letterSpacing:"-.01em", lineHeight:1.3 }}>{f.q}</span>
        <div style={{ width:32, height:32, borderRadius:"50%", background: isOpen ? "#6320E0" : "#F1F5F9", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"all .25s cubic-bezier(.22,1,.36,1)" }}>
          <span style={{ fontSize:18, color: isOpen ? "#fff" : "#6320E0", fontWeight:300, lineHeight:1, transition:"transform .25s cubic-bezier(.22,1,.36,1)", transform: isOpen ? "rotate(45deg)" : "none", display:"inline-block" }}>+</span>
        </div>
      </button>
      <div ref={contentRef} style={{ height:`${height}px`, overflow:"hidden", transition:"height .38s cubic-bezier(.22,1,.36,1)" }}>
        <p style={{ paddingBottom:24, fontSize:15, color:"#64748B", lineHeight:1.8, fontFamily:"var(--fb)" }}>{f.a}</p>
      </div>
    </div>
  );
}

/* ════════════════
   EF 1 — HERO
════════════════ */
function EFHero({ onNavigate }) {
  const w = useWidth(); const isMobile = w < 640;
  return (
    <section style={{
      minHeight:"100vh", position:"relative", overflow:"hidden",
      background:"linear-gradient(140deg,#0f0c29 0%,#14104A 30%,#1E1660 60%,#1a1258 100%)",
      display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
      padding: isMobile ? "110px 20px 64px" : "128px 5vw 80px", textAlign:"center",
    }}>
      {/* BG glows */}
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", background:"radial-gradient(ellipse 85% 65% at 50% 30%, rgba(99,32,224,.35) 0%, transparent 65%)" }} />
      <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"50%", pointerEvents:"none", background:"radial-gradient(ellipse 80% 60% at 50% 100%, rgba(245,166,35,.1) 0%, transparent 70%)" }} />
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", backgroundImage:"radial-gradient(rgba(255,255,255,.04) 1px,transparent 1px)", backgroundSize:"30px 30px" }} />

      <div style={{ position:"relative", zIndex:2, maxWidth:880, width:"100%" }}>
        {/* H1 */}
        <h1 className="fade-up d1" style={{
          fontFamily:"var(--fb)", fontWeight:900,
          fontSize: isMobile ? "clamp(27px,7.7vw,40px)" : "clamp(40px,4.7vw,65px)",
          lineHeight:1.08, letterSpacing:"-.05em", marginBottom:22,
          background:"linear-gradient(95deg,#fff 0%,#fff 30%,#F5D060 62%,#F5A623 100%)",
          WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
          paddingBottom:"0.12em",
        }}>
          Unlock Working Capital With<br />One Integrated Platform
        </h1>

        <p className="fade-up d2" style={{ fontSize: isMobile ? 15 : 16, color:"rgba(255,255,255,.52)", lineHeight:1.75, fontFamily:"var(--fb)", maxWidth:500, margin:"0 auto 36px" }}>
          Enable seamless early payment and working capital access through pre-integrated lenders, automated workflows, and compliant financing journeys — all inside NimbleS2P.
        </p>

        {/* CTAs */}
        <div className="fade-up d3" style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap", marginBottom:52 }}>
          <a onClick={e=>{ e.preventDefault(); if(typeof onNavigate==="function") onNavigate("getstarted"); }} href="#"
            style={{ display:"inline-flex", alignItems:"center", gap:7, background:"linear-gradient(135deg,#E8920A,#F5B020)", color:"#fff", border:"none", borderRadius:10, padding:"13px 32px", fontSize:15.5, fontWeight:700, cursor:"pointer", fontFamily:"var(--fb)", textDecoration:"none", letterSpacing:"-.01em", boxShadow:"0 4px 24px rgba(232,150,10,.48)", transition:"transform .2s,box-shadow .2s", width: isMobile ? "100%" : "auto" }}
            onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 10px 36px rgba(232,150,10,.62)";}}
            onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="0 4px 24px rgba(232,150,10,.48)";}}
          >Get Started →</a>
          <a href="#products"
            style={{ display:"inline-flex", alignItems:"center", gap:7, background:"rgba(99,32,224,.2)", color:"rgba(255,255,255,.85)", border:"1.5px solid rgba(139,92,246,.4)", borderRadius:10, padding:"12px 28px", fontSize:15, fontWeight:500, fontFamily:"var(--fb)", textDecoration:"none", backdropFilter:"blur(10px)", transition:"all .18s", width: isMobile ? "100%" : "auto" }}
            onMouseEnter={e=>{e.currentTarget.style.background="rgba(99,32,224,.35)";e.currentTarget.style.color="#fff";}}
            onMouseLeave={e=>{e.currentTarget.style.background="rgba(99,32,224,.2)";e.currentTarget.style.color="rgba(255,255,255,.85)";}}
          >Explore Products ↓</a>
        </div>

        {/* Credibility stats — VDD style */}
        <div className="fade-up d4" style={{
          display:"grid", gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(4,1fr)",
          gap:1, background:"rgba(255,255,255,.07)", border:"1px solid rgba(255,255,255,.1)",
          borderRadius:16, overflow:"hidden", backdropFilter:"blur(12px)",
        }}>
          {efCredibility.map((c,i) => (
            <div key={i} style={{
              padding: isMobile ? "18px 12px" : "22px 16px", textAlign:"center",
              borderRight: i < efCredibility.length-1 && !(isMobile && i%2===1) ? "1px solid rgba(255,255,255,.08)" : "none",
              borderBottom: isMobile && i < 2 ? "1px solid rgba(255,255,255,.08)" : "none",
            }}>
              <div style={{ fontFamily:"var(--fb)", fontSize: isMobile ? 24 : 30, fontWeight:900, color:"#fff", letterSpacing:"-.04em", lineHeight:1 }}>{c.stat}</div>
              <div style={{ fontSize:11, fontWeight:600, letterSpacing:".08em", textTransform:"uppercase", color:"rgba(255,255,255,.35)", marginTop:6, fontFamily:"var(--fb)" }}>{c.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Wave */}
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
   EF 2 — FINANCING PRODUCTS
════════════════════════════════════ */
function EFProducts() {
  const w = useWidth(); const isMobile = w < 640; const isTab = w < 900;
  const [hov, setHov] = useState(null);
  const ref = useReveal();
  const colors = ["#6320E0","#7C3AED","#8B5CF6","#A78BFA","#4F46E5","#6366F1"];
  return (
    <section id="products" style={{ background:"var(--slp)", position:"relative", overflow:"hidden", padding: isMobile ? "64px 20px" : "clamp(64px,9vh,104px) 5vw" }}>
      {/* Top accent line — same as VDD FAQs */}
      <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:"linear-gradient(90deg,var(--p500),var(--p300),#F59E0B)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(rgba(99,32,224,.06) 1px,transparent 1px)", backgroundSize:"28px 28px", pointerEvents:"none" }} />

      <div style={{ maxWidth:1080, margin:"0 auto", position:"relative", zIndex:1 }}>
        <div style={{ marginBottom: isMobile ? 36 : 52 }}>
          <Eyebrow>Financing Products</Eyebrow>
          <h2 style={{ fontFamily:"var(--fb)", fontSize: isMobile ? "clamp(22px,6vw,32px)" : "clamp(26px,3vw,42px)", fontWeight:700, letterSpacing:"-.04em", lineHeight:1.05, color:"#0F172A", marginBottom:10 }}>
            Six financing products.<br />One unified platform.
          </h2>
          <p style={{ fontSize:15, color:"#64748B", lineHeight:1.7, fontFamily:"var(--fb)", maxWidth:500 }}>From dealer finance to reverse factoring — every working capital need, covered.</p>
        </div>

        <div className="reveal" ref={ref} style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : isTab ? "repeat(2,1fr)" : "repeat(3,1fr)", gap:14 }}>
          {efProducts.map((p,i) => {
            const isH = hov === i;
            const c = colors[i];
            return (
              <div key={p.id} onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)}
                style={{
                  background: isH ? "#F5F3FF" : "#fff",
                  border:`1.5px solid ${isH ? c+"55" : "#E2E8F0"}`,
                  borderRadius:18, padding: isMobile ? "24px 20px" : "30px 26px",
                  position:"relative", overflow:"hidden",
                  transition:"all .22s cubic-bezier(.22,1,.36,1)",
                  transform: isH ? "translateY(-3px)" : "none",
                  boxShadow: isH ? `0 10px 36px ${c}18, 0 2px 12px rgba(0,0,0,.04)` : "0 2px 8px rgba(0,0,0,.04)",
                  cursor:"default",
                }}
              >
                {/* Short badge */}
                <div style={{ position:"absolute", top:16, right:18, fontFamily:"var(--fb)", fontSize:11, fontWeight:800, letterSpacing:".08em", color:c, background:`${c}12`, border:`1px solid ${c}33`, borderRadius:6, padding:"2px 8px" }}>{p.short}</div>

                <div style={{ width:48, height:48, borderRadius:14, background:`${c}14`, border:`1px solid ${c}22`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, marginBottom:16 }}>{p.icon}</div>
                <h3 style={{ fontFamily:"var(--fb)", fontSize: isMobile ? 17 : 19, fontWeight:800, color:"#0F172A", letterSpacing:"-.03em", lineHeight:1.2, marginBottom:8 }}>{p.label}</h3>
                <p style={{ fontSize:13.5, color:"#64748B", lineHeight:1.65, fontFamily:"var(--fb)", margin:0 }}>{p.desc}</p>

                {/* Bottom accent */}
                <div style={{ position:"absolute", bottom:0, left:0, right:0, height:3, background:`linear-gradient(90deg,${c},${c}55,transparent)`, opacity: isH ? 1 : 0.4, transition:"opacity .2s", borderRadius:"0 0 18px 18px" }} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════
   EF 3 — ECOSYSTEM VISUAL
════════════════════════════════════ */
function EFEcosystem() {
  const w = useWidth(); const isMobile = w < 640;
  const ref = useReveal();
  const [active, setActive] = useState(0);

  const flow = [
    {
      icon:"🗂",
      label:"ERP / Invoices",
      color:"#6320E0",
      desc:"Invoices ingested automatically from your ERP, supplier portal, or via API — eliminating manual entry and ensuring every financing event starts with clean, validated data.",
    },
    {
      icon:"🧠",
      label:"Risk Engine",
      color:"#0369A1",
      desc:"AI-powered eligibility checks validate each invoice against credit limits, program rules, supplier status, and lender criteria — in seconds, not days.",
    },
    {
      icon:"🏦",
      label:"Lender Marketplace",
      color:"#059669",
      desc:"Pre-integrated lender network matches eligible invoices to the right financing institution and presents competitive offers — no manual lender coordination needed.",
    },
    {
      icon:"🛡",
      label:"Compliance",
      color:"#D97706",
      desc:"Regulatory controls, KYC validations, audit trails, consent management, and multi-level approvals embedded at every step — always audit-ready.",
    },
    {
      icon:"💸",
      label:"Settlement",
      color:"#7C3AED",
      desc:"Funds disbursed directly to suppliers with real-time tracking. Buyer repayments to lenders reconciled automatically — with instant exception alerts.",
    },
  ];

  const step = flow[active];

  return (
    <section style={{ background:"#fff", position:"relative", overflow:"hidden", padding: isMobile ? "64px 20px" : "clamp(64px,9vh,104px) 5vw" }}>
      <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:"linear-gradient(90deg,var(--p500),var(--p300),#F59E0B)", pointerEvents:"none" }} />

      <div style={{ maxWidth:1080, margin:"0 auto" }}>
        <div className="reveal" ref={ref}>

          {/* Header */}
          <div style={{ marginBottom: isMobile ? 36 : 48 }}>
            <Eyebrow>Embedded Lending Infrastructure</Eyebrow>
            <h2 style={{ fontFamily:"var(--fb)", fontSize: isMobile ? "clamp(22px,6vw,32px)" : "clamp(26px,3vw,42px)", fontWeight:700, letterSpacing:"-.04em", lineHeight:1.05, color:"#0F172A", marginBottom:14 }}>
              One platform. Every step<br />of the financing lifecycle.
            </h2>
            <p style={{ fontSize: isMobile ? 14.5 : 16, color:"#64748B", lineHeight:1.75, fontFamily:"var(--fb)", maxWidth:660 }}>
              Unlike fragmented financing ecosystems, NimbleS2P combines financing workflows, invoice visibility, supplier onboarding, lender connectivity, compliance, approvals, and disbursement orchestration into one unified platform.
            </p>
          </div>

          {/* ── Horizontal flow track ── */}
          <div style={{ position:"relative", marginBottom: isMobile ? 32 : 40, overflowX: isMobile ? "auto" : "visible", paddingBottom: isMobile ? 8 : 0 }}>
            <div style={{ display:"flex", alignItems:"center", gap:0, minWidth: isMobile ? 520 : "auto" }}>
              {flow.map((node, i) => {
                const isAct = active === i;
                return (
                  <div key={node.label} style={{ display:"flex", alignItems:"center", flex:1 }}>
                    {/* Node */}
                    <div onClick={()=>setActive(i)} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:10, cursor:"pointer", flex:1, userSelect:"none" }}>
                      {/* Circle — fixed 52×52, scale transform only for active */}
                      <div style={{
                        width:52, height:52, borderRadius:"50%",
                        background: isAct ? `linear-gradient(135deg,${node.color},${node.color}cc)` : "#F8FAFF",
                        border:`2px solid ${isAct ? node.color : "#E2E8F0"}`,
                        display:"flex", alignItems:"center", justifyContent:"center",
                        fontSize:20,
                        boxShadow: isAct ? `0 6px 24px ${node.color}44, 0 0 0 6px ${node.color}14` : "0 2px 8px rgba(0,0,0,.05)",
                        transform: isAct ? "scale(1.12)" : "scale(1)",
                        transition:"background .3s, border-color .3s, box-shadow .3s, transform .3s cubic-bezier(.22,1,.36,1)",
                        flexShrink:0,
                      }}>{node.icon}</div>
                      {/* Label — fixed line-height so it never shifts */}
                      <div style={{ fontFamily:"var(--fb)", fontSize: isMobile ? 11 : 12.5, fontWeight: isAct ? 700 : 500, color: isAct ? node.color : "#94A3B8", textAlign:"center", lineHeight:1.3, transition:"color .25s, font-weight .25s", maxWidth:80, minHeight:"2.6em" }}>{node.label}</div>
                    </div>

                    {/* Arrow connector — vertically centered on the fixed 52px circle height */}
                    {i < flow.length - 1 && (
                      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"center", width:32, flexShrink:0, paddingTop:14 }}>
                        <svg width="28" height="12" viewBox="0 0 28 12" fill="none">
                          <path d="M0 6h22M18 1l6 5-6 5" stroke={active > i ? flow[i].color : "#CBD5E1"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition:"stroke .4s" }} />
                        </svg>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>

          {/* ── Detail card — fixed height 160px, all panels absolutely layered ── */}
          <div style={{ position:"relative", height: isMobile ? 200 : 160, borderRadius:20, background:"#FAFBFF", border:"1.5px solid #E2E8F0", boxShadow:"0 4px 20px rgba(0,0,0,.06)", overflow:"hidden" }}>
            {/* Left accent bar — always matches active color */}
            <div style={{ position:"absolute", left:0, top:0, bottom:0, width:4, background:`linear-gradient(180deg,${step.color},${step.color}66)`, borderRadius:"20px 0 0 20px", transition:"background .35s" }} />

            {flow.map((node, i) => {
              const isVis = active === i;
              return (
                <div key={node.label} style={{
                  position:"absolute", inset:0,
                  padding: isMobile ? "20px 20px 20px 28px" : "28px 36px 28px 40px",
                  display:"flex", alignItems:"center", gap: isMobile ? 14 : 24,
                  opacity: isVis ? 1 : 0,
                  transform: isVis ? "translateX(0)" : active > i ? "translateX(-10px)" : "translateX(10px)",
                  transition:"opacity .32s cubic-bezier(.22,1,.36,1), transform .32s cubic-bezier(.22,1,.36,1)",
                  pointerEvents: isVis ? "auto" : "none",
                }}>
                  {/* Icon */}
                  <div style={{ width: isMobile ? 40 : 52, height: isMobile ? 40 : 52, borderRadius:14, background:`linear-gradient(135deg,${node.color},${node.color}bb)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize: isMobile ? 20 : 26, flexShrink:0, boxShadow:`0 4px 16px ${node.color}44` }}>{node.icon}</div>
                  {/* Text — flex:1 forces it to fill all remaining width */}
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ display:"inline-flex", alignItems:"center", gap:5, background:`${node.color}12`, border:`1px solid ${node.color}28`, borderRadius:100, padding:"2px 9px", marginBottom:6 }}>
                      <span style={{ width:4, height:4, borderRadius:"50%", background:node.color, display:"inline-block" }} />
                      <span style={{ fontSize:9.5, fontWeight:800, letterSpacing:".1em", textTransform:"uppercase", color:node.color, fontFamily:"var(--fb)" }}>Step {i+1} of {flow.length}</span>
                    </div>
                    <h3 style={{ fontFamily:"var(--fb)", fontSize: isMobile ? 15 : 17, fontWeight:800, color:"#0F172A", letterSpacing:"-.03em", lineHeight:1.2, marginBottom:6 }}>{node.label}</h3>
                    <p style={{ fontFamily:"var(--fb)", fontSize: isMobile ? 12.5 : 13.5, color:"#64748B", lineHeight:1.65, margin:0, width:"100%" }}>{node.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Nav dots */}
          <div style={{ display:"flex", justifyContent:"center", gap:8, marginTop:20 }}>
            {flow.map((_,i) => (
              <button key={i} onClick={()=>setActive(i)} style={{ width: active===i ? 24 : 8, height:8, borderRadius:99, background: active===i ? flow[i].color : "#CBD5E1", border:"none", cursor:"pointer", padding:0, transition:"all .3s cubic-bezier(.22,1,.36,1)" }} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}


/* ════════════════════════════════════
   EF 4 — PLATFORM FEATURES
════════════════════════════════════ */
function EFFeatures() {
  const w = useWidth(); const isMobile = w < 640;
  const [active, setActive] = useState(0);
  const ref = useReveal();

  return (
    <section style={{ background:"linear-gradient(160deg,#1E1660 0%,#261d6b 50%,#1a1258 100%)", position:"relative", overflow:"hidden", padding: isMobile ? "64px 20px" : "clamp(64px,9vh,104px) 5vw" }}>
      <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(rgba(255,255,255,.04) 1px,transparent 1px)", backgroundSize:"28px 28px", pointerEvents:"none" }} />
      <div style={{ position:"absolute", top:"30%", left:`${(active % 3) * 33 + 8}%`, width:280, height:280, borderRadius:"50%", background:"radial-gradient(ellipse, rgba(99,32,224,.35) 0%, transparent 70%)", filter:"blur(48px)", transition:"left .5s cubic-bezier(.22,1,.36,1)", pointerEvents:"none" }} />

      <div style={{ maxWidth:1080, margin:"0 auto", position:"relative", zIndex:1 }}>
        <div style={{ marginBottom: isMobile ? 36 : 52 }}>
          <Eyebrow dark>Platform Features</Eyebrow>
          <h2 style={{ fontFamily:"var(--fb)", fontSize: isMobile ? "clamp(22px,6vw,32px)" : "clamp(26px,3vw,42px)", fontWeight:900, letterSpacing:"-.04em", lineHeight:1.05, background:"linear-gradient(95deg,#fff 0%,#fff 30%,#F5D060 62%,#F5A623 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", marginBottom:10 }}>
            Automation built for<br />financing at scale.
          </h2>
          <p style={{ fontSize:15, color:"rgba(255,255,255,.45)", lineHeight:1.7, fontFamily:"var(--fb)", maxWidth:480 }}>Nine capabilities that eliminate manual effort across every step of the financing lifecycle.</p>
        </div>

        <div className="reveal" ref={ref} style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap:20, alignItems:"start" }}>

          {/* Left — feature list: fixed row height, no layout shift */}
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {efFeatures.map((f,i) => {
              const isAct = active === i;
              return (
                <div key={f.label} onMouseEnter={()=>setActive(i)}
                  style={{
                    display:"flex", alignItems:"center", gap:14,
                    padding:"14px 20px",
                    borderRadius:14,
                    background: isAct ? "rgba(255,255,255,.1)" : "rgba(255,255,255,.04)",
                    border:`1.5px solid ${isAct ? "rgba(99,32,224,.6)" : "rgba(255,255,255,.08)"}`,
                    cursor:"default",
                    transition:"background .22s, border-color .22s, box-shadow .22s",
                    boxShadow: isAct ? "0 4px 20px rgba(99,32,224,.3)" : "none",
                  }}
                >
                  {/* Fixed-size icon box — no size change on active */}
                  <div style={{
                    width:40, height:40, borderRadius:12, flexShrink:0,
                    background: isAct ? "linear-gradient(135deg,#6320E0,#8B5CF6)" : "rgba(255,255,255,.08)",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontSize:18,
                    transition:"background .22s, box-shadow .22s",
                    boxShadow: isAct ? "0 4px 16px rgba(99,32,224,.5)" : "none",
                  }}>{f.icon}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontFamily:"var(--fb)", fontSize:14, fontWeight: isAct ? 700 : 500, color: isAct ? "#fff" : "rgba(255,255,255,.5)", transition:"color .2s, font-weight .2s", lineHeight:1.3 }}>{f.label}</div>
                  </div>
                  {/* Active dot indicator */}
                  <div style={{ width:6, height:6, borderRadius:"50%", background:"#F5A623", flexShrink:0, opacity: isAct ? 1 : 0, transition:"opacity .2s" }} />
                </div>
              );
            })}
          </div>

          {/* Right — fixed-height container with all panels stacked, only active visible */}
          <div style={{ position:"relative", height: isMobile ? "auto" : 340 }}>
            <div style={{
              position: isMobile ? "relative" : "sticky",
              top: isMobile ? "auto" : 0,
              width:"100%", height: isMobile ? "auto" : 340,
              borderRadius:24,
              background:"rgba(255,255,255,.07)",
              border:"1.5px solid rgba(99,32,224,.4)",
              backdropFilter:"blur(20px)",
              boxShadow:"0 16px 60px rgba(99,32,224,.25)",
              overflow:"hidden",
            }}>
              {efFeatures.map((f,i) => {
                const isVis = active === i;
                return (
                  <div key={f.label} style={{
                    position:"absolute", inset:0,
                    padding: isMobile ? "32px 24px" : "40px 36px",
                    display:"flex", flexDirection:"column", justifyContent:"center",
                    opacity: isVis ? 1 : 0,
                    transform: isVis ? "translateY(0)" : active > i ? "translateY(-10px)" : "translateY(10px)",
                    transition:"opacity .35s cubic-bezier(.22,1,.36,1), transform .35s cubic-bezier(.22,1,.36,1)",
                    pointerEvents: isVis ? "auto" : "none",
                  }}>
                    <div style={{ fontSize:44, marginBottom:18, lineHeight:1 }}>{f.icon}</div>
                    <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:"rgba(99,32,224,.25)", border:"1px solid rgba(139,92,246,.4)", borderRadius:100, padding:"4px 12px", marginBottom:14, width:"fit-content" }}>
                      <span style={{ fontSize:10, fontWeight:800, letterSpacing:".1em", textTransform:"uppercase", color:"#A78BFA", fontFamily:"var(--fb)" }}>Feature {String(i+1).padStart(2,"0")}</span>
                    </div>
                    <h3 style={{ fontFamily:"var(--fb)", fontSize: isMobile ? 18 : 22, fontWeight:900, color:"#fff", letterSpacing:"-.03em", lineHeight:1.2, marginBottom:10 }}>{f.label}</h3>
                    <p style={{ fontFamily:"var(--fb)", fontSize:13.5, color:"rgba(255,255,255,.5)", lineHeight:1.7, margin:0 }}>
                      Powered by NimbleS2P's intelligent automation engine — this capability reduces exceptions, eliminates manual steps, and keeps your financing pipeline moving without intervention.
                    </p>
                    {/* Progress dots */}
                    <div style={{ display:"flex", gap:6, marginTop:24 }}>
                      {efFeatures.map((_,j) => (
                        <div key={j} onClick={()=>setActive(j)} style={{ height:4, width: active===j ? 22 : 7, borderRadius:99, background: active===j ? "#F5A623" : "rgba(255,255,255,.2)", cursor:"pointer", transition:"all .3s cubic-bezier(.22,1,.36,1)" }} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
/* ════════════════════════════════════
   EF 5 — BENEFITS (dual tab)
════════════════════════════════════ */
function EFBenefits() {
  const w = useWidth(); const isMobile = w < 640; const isTab = w < 900;
  const [tab, setTab] = useState(0);
  const ref = useReveal();
  const tabs  = ["Suppliers & Dealers", "Anchors / Enterprises"];
  const lists = [efBenefitsSupplier, efBenefitsAnchor];
  return (
    <section style={{
      background:"linear-gradient(140deg,#0f0c29 0%,#14104A 30%,#1E1660 60%,#1a1258 100%)",
      position:"relative", overflow:"hidden",
      padding: isMobile ? "64px 20px" : "clamp(64px,9vh,104px) 5vw",
    }}>
      {/* BG glows */}
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", background:"radial-gradient(ellipse 70% 60% at 10% 30%, rgba(99,32,224,.28) 0%, transparent 65%)" }} />
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", background:"radial-gradient(ellipse 60% 50% at 90% 70%, rgba(245,166,35,.08) 0%, transparent 60%)" }} />
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", backgroundImage:"radial-gradient(rgba(255,255,255,.04) 1px,transparent 1px)", backgroundSize:"28px 28px" }} />

      <div style={{ maxWidth:1080, margin:"0 auto", position:"relative", zIndex:1 }}>
        <div style={{ marginBottom: isMobile ? 28 : 40 }}>
          <Eyebrow dark>Benefits</Eyebrow>
          <h2 style={{
            fontFamily:"var(--fb)", fontSize: isMobile ? "clamp(22px,6vw,32px)" : "clamp(26px,3vw,42px)",
            fontWeight:900, letterSpacing:"-.04em", lineHeight:1.05, marginBottom:10,
            background:"linear-gradient(95deg,#fff 0%,#fff 30%,#F5D060 62%,#F5A623 100%)",
            WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
          }}>
            Value for every stakeholder<br />in the financing chain.
          </h2>
        </div>

        {/* Smooth sliding toggle — dark bg variant */}
        <div style={{ position:"relative", display:"inline-flex", background:"rgba(255,255,255,.08)", border:"1px solid rgba(255,255,255,.1)", borderRadius:14, padding:5, marginBottom: isMobile ? 28 : 40 }}>
          {/* Sliding pill */}
          <div style={{
            position:"absolute", top:5, bottom:5,
            left: tab===0 ? 5 : "calc(50% + 2.5px)",
            width:"calc(50% - 7.5px)",
            background:"linear-gradient(135deg,#6320E0,#8B5CF6)",
            borderRadius:10,
            boxShadow:"0 4px 16px rgba(99,32,224,.5)",
            transition:"left .3s cubic-bezier(.22,1,.36,1)",
            pointerEvents:"none",
          }} />
          {tabs.map((t,i) => (
            <button key={t} onClick={()=>setTab(i)} style={{
              position:"relative", zIndex:1,
              fontFamily:"var(--fb)", fontSize: isMobile ? 13 : 14.5, fontWeight:700,
              border:"none", cursor:"pointer", borderRadius:10,
              padding: isMobile ? "10px 18px" : "11px 28px",
              background:"transparent",
              color: tab===i ? "#fff" : "rgba(255,255,255,.5)",
              transition:"color .25s cubic-bezier(.22,1,.36,1)",
              whiteSpace:"nowrap",
            }}>{t}</button>
          ))}
        </div>

        <div className="reveal" ref={ref} style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : isTab ? "1fr 1fr" : "repeat(3,1fr)", gap:14 }}>
          {lists[tab].map((b,i) => (
            <div key={b.title} style={{
              background:"rgba(255,255,255,.06)", border:"1.5px solid rgba(255,255,255,.1)", borderRadius:16,
              padding: isMobile ? "20px 18px" : "26px 22px",
              backdropFilter:"blur(8px)",
              transition:"all .22s cubic-bezier(.22,1,.36,1)",
            }}
              onMouseEnter={e=>{ e.currentTarget.style.background="rgba(255,255,255,.1)"; e.currentTarget.style.borderColor="rgba(99,32,224,.5)"; e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 8px 28px rgba(99,32,224,.2)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.background="rgba(255,255,255,.06)"; e.currentTarget.style.borderColor="rgba(255,255,255,.1)"; e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow=""; }}
            >
              <div style={{ width:40, height:40, borderRadius:12, background:"rgba(245,166,35,.15)", border:"1px solid rgba(245,166,35,.25)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, marginBottom:14 }}>{b.icon}</div>
              <h4 style={{ fontFamily:"var(--fb)", fontSize: isMobile ? 15 : 16.5, fontWeight:800, color:"#fff", letterSpacing:"-.02em", lineHeight:1.2, marginBottom:8 }}>{b.title}</h4>
              <p style={{ fontFamily:"var(--fb)", fontSize:13.5, color:"rgba(255,255,255,.5)", lineHeight:1.6, margin:0 }}>{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════
   EF 6 — JOURNEY
════════════════════════════════════ */
function EFJourney() {
  const w = useWidth(); const isMobile = w < 640;
  const [active, setActive] = useState(0);
  const ref = useReveal();
  useEffect(() => { const id = setInterval(() => setActive(a => (a+1) % efJourney.length), 2000); return () => clearInterval(id); }, []);

  return (
    <section style={{ background:"var(--slp)", position:"relative", overflow:"hidden", padding: isMobile ? "64px 20px" : "clamp(64px,9vh,104px) 5vw" }}>
      <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(rgba(99,32,224,.06) 1px,transparent 1px)", backgroundSize:"28px 28px", pointerEvents:"none" }} />
      <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:"linear-gradient(90deg,var(--p500),var(--p300),#F59E0B)", pointerEvents:"none" }} />

      <div style={{ maxWidth:960, margin:"0 auto", position:"relative", zIndex:1 }}>
        <div style={{ marginBottom: isMobile ? 36 : 52 }}>
          <Eyebrow>End-to-End Journey</Eyebrow>
          <h2 style={{ fontFamily:"var(--fb)", fontSize: isMobile ? "clamp(22px,6vw,32px)" : "clamp(26px,3vw,42px)", fontWeight:900, letterSpacing:"-.04em", lineHeight:1.05, color:"#0F172A", marginBottom:10, textAlign:"left" }}>
            Invoice to settlement.<br />Fully automated.
          </h2>
          <p style={{ fontSize:15, color:"#64748B", lineHeight:1.7, fontFamily:"var(--fb)", maxWidth:480, textAlign:"left" }}>Eight steps, zero manual intervention — from invoice generation to audit-ready reporting.</p>
        </div>

        <div className="reveal" ref={ref} style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "200px 1fr", gap: isMobile ? 24 : 48, alignItems:"start" }}>

          {/* Left — vertical step list with timeline spine */}
          <div style={{ position:"relative" }}>
            {/* Spine line */}
            <div style={{ position:"absolute", left: isMobile ? 19 : 21, top:24, bottom:24, width:2, background:"#E2E8F0", borderRadius:99 }} />
            {/* Fill progress */}
            <div style={{
              position:"absolute", left: isMobile ? 19 : 21, top:24,
              height:`${(active / (efJourney.length-1)) * 100}%`,
              width:2, background:"linear-gradient(180deg,#6320E0,#F5A623)", borderRadius:99,
              transition:"height .5s cubic-bezier(.22,1,.36,1)",
            }} />
            <div style={{ display:"flex", flexDirection:"column", gap: isMobile ? 14 : 16, position:"relative" }}>
              {efJourney.map((j,i) => {
                const isAct = active === i;
                const isDone = i < active;
                return (
                  <div key={j.step} onClick={()=>setActive(i)}
                    style={{ display:"flex", alignItems:"center", gap:14, cursor:"pointer", userSelect:"none" }}
                  >
                    {/* Node */}
                    <div style={{
                      width: isAct ? 44 : 40, height: isAct ? 44 : 40, borderRadius:"50%", flexShrink:0,
                      background: isAct ? "linear-gradient(135deg,#6320E0,#8B5CF6)" : isDone ? "#6320E020" : "#fff",
                      border:`2px solid ${isAct ? "#6320E0" : isDone ? "#6320E0" : "#E2E8F0"}`,
                      display:"flex", alignItems:"center", justifyContent:"center",
                      fontSize: isAct ? 18 : 16,
                      transition:"all .28s cubic-bezier(.22,1,.36,1)",
                      boxShadow: isAct ? "0 4px 20px rgba(99,32,224,.45), 0 0 0 4px rgba(99,32,224,.1)" : "0 1px 4px rgba(0,0,0,.06)",
                      zIndex:1, position:"relative",
                    }}>{isDone && !isAct ? <svg width="14" height="14" viewBox="0 0 12 12" fill="none"><path d="M2 6l3.5 3.5L10 2" stroke="#6320E0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> : j.icon}</div>

                    {/* Label */}
                    <div>
                      <div style={{ fontFamily:"var(--fb)", fontSize:9.5, fontWeight:800, letterSpacing:".1em", textTransform:"uppercase", color: isAct ? "#6320E0" : "#94A3B8", marginBottom:2, transition:"color .25s" }}>Step {j.step}</div>
                      <div style={{ fontFamily:"var(--fb)", fontSize: isMobile ? 13 : 14, fontWeight: isAct ? 700 : 600, color: isAct ? "#0F172A" : "#94A3B8", lineHeight:1.3, transition:"color .25s, font-weight .25s" }}>{j.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right — detail card */}
          <div style={{
            background:"#fff", borderRadius:22, border:"1.5px solid rgba(99,32,224,.2)",
            padding: isMobile ? "28px 22px" : "40px 36px",
            boxShadow:"0 8px 40px rgba(99,32,224,.1)",
            minHeight: isMobile ? "auto" : 320,
            display:"flex", flexDirection:"column", justifyContent:"center",
            position:"relative", overflow:"hidden",
          }}>
            {/* Background tint */}
            <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 80% 70% at 100% 0%, rgba(99,32,224,.04) 0%, transparent 60%)", pointerEvents:"none" }} />

            <div style={{ fontSize:52, marginBottom:16 }}>{efJourney[active].icon}</div>

            <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:"rgba(99,32,224,.1)", border:"1px solid rgba(99,32,224,.2)", borderRadius:100, padding:"4px 12px", marginBottom:14, width:"fit-content" }}>
              <span style={{ width:6, height:6, borderRadius:"50%", background:"#6320E0", display:"inline-block" }} />
              <span style={{ fontSize:10, fontWeight:800, letterSpacing:".1em", textTransform:"uppercase", color:"#6320E0", fontFamily:"var(--fb)" }}>Step {efJourney[active].step} of {efJourney.length}</span>
            </div>

            <h3 style={{ fontFamily:"var(--fb)", fontSize: isMobile ? 22 : 28, fontWeight:900, color:"#0F172A", letterSpacing:"-.04em", lineHeight:1.15, marginBottom:14 }}>{efJourney[active].label}</h3>

            <p style={{ fontFamily:"var(--fb)", fontSize:14.5, color:"#64748B", lineHeight:1.75, margin:0 }}>
              {["Every transaction starts here — invoices flow in automatically from your ERP, supplier portal, or via API, eliminating manual data entry.",
                "NimbleS2P's AI engine checks each invoice against program rules, credit limits, supplier eligibility, and lender criteria in seconds.",
                "The platform matches eligible invoices to the right lender from your connected institution network and presents optimised financing offers.",
                "Suppliers review and accept financing offers digitally — no paperwork, no back-and-forth, no delays.",
                "All KYC, agreements, and compliance documents are collected and verified digitally with zero manual touchpoints.",
                "Funds are released directly to the supplier's account, with real-time status tracking for all parties.",
                "Payments from buyers to lenders are tracked and reconciled automatically, with instant exception alerts.",
                "Complete digital audit trail, regulatory reporting, and financing analytics — always audit-ready."][active]}
            </p>

            {/* Navigation arrows */}
            <div style={{ display:"flex", gap:10, marginTop:28 }}>
              <button onClick={()=>setActive(Math.max(0,active-1))} disabled={active===0}
                style={{ width:40, height:40, borderRadius:10, border:"1.5px solid #E2E8F0", background:"#fff", cursor: active===0 ? "default" : "pointer", display:"flex", alignItems:"center", justifyContent:"center", opacity: active===0 ? 0.35 : 1, transition:"all .2s" }}
                onMouseEnter={e=>{ if(active>0){ e.currentTarget.style.borderColor="#6320E0"; e.currentTarget.style.background="#F5F3FF"; }}}
                onMouseLeave={e=>{ e.currentTarget.style.borderColor="#E2E8F0"; e.currentTarget.style.background="#fff"; }}
              ><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke="#6320E0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
              <button onClick={()=>setActive(Math.min(efJourney.length-1,active+1))} disabled={active===efJourney.length-1}
                style={{ width:40, height:40, borderRadius:10, border:"1.5px solid #E2E8F0", background:"#fff", cursor: active===efJourney.length-1 ? "default" : "pointer", display:"flex", alignItems:"center", justifyContent:"center", opacity: active===efJourney.length-1 ? 0.35 : 1, transition:"all .2s" }}
                onMouseEnter={e=>{ if(active<efJourney.length-1){ e.currentTarget.style.borderColor="#6320E0"; e.currentTarget.style.background="#F5F3FF"; }}}
                onMouseLeave={e=>{ e.currentTarget.style.borderColor="#E2E8F0"; e.currentTarget.style.background="#fff"; }}
              ><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 2l5 5-5 5" stroke="#6320E0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
              <div style={{ flex:1, display:"flex", alignItems:"center", gap:5, paddingLeft:6 }}>
                {efJourney.map((_,i) => <div key={i} onClick={()=>setActive(i)} style={{ height:4, width: active===i ? 20 : 6, borderRadius:99, background: active===i ? "#6320E0" : "#E2E8F0", cursor:"pointer", transition:"all .3s cubic-bezier(.22,1,.36,1)" }} />)}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════
   EF 7 — COMPARISON
════════════════════════════════════ */
function EFComparison() {
  const w = useWidth(); const isMobile = w < 640;
  const ref = useReveal();
  return (
    <section style={{ background:"#fff", padding: isMobile ? "64px 20px" : "clamp(64px,9vh,104px) 5vw" }}>
      <div style={{ maxWidth:1040, margin:"0 auto" }}>
        <div className="reveal" ref={ref}>
          <div style={{ marginBottom: isMobile ? 36 : 48 }}>
            <Eyebrow>Why NimbleS2P</Eyebrow>
            <h2 style={{ fontFamily:"var(--fb)", fontSize: isMobile ? "clamp(24px,6vw,34px)" : "clamp(28px,3.5vw,44px)", fontWeight:700, letterSpacing:"-.04em", lineHeight:1.05, color:"#0F172A", marginBottom:12 }}>
              With vs Without NimbleS2P
            </h2>
            <p style={{ fontSize: isMobile ? 14.5 : 16, color:"#64748B", lineHeight:1.7, fontFamily:"var(--fb)", maxWidth:500 }}>
              Every dimension of supply chain financing, compared side by side.
            </p>
          </div>

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
                  <div style={{ fontSize:11, color:"#F87171", fontFamily:"var(--fb)" }}>Traditional approach</div>
                </div>
              </div>
              <div style={{ background:"#F0FDF8", padding:"16px 24px", display:"flex", alignItems:"center", gap:10, borderLeft: isMobile ? "none" : "1px solid #C6F6E0", borderTop: isMobile ? "1px solid #C6F6E0" : "none" }}>
                <div style={{ width:26, height:26, borderRadius:"50%", background:"#D1FAE5", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <svg width="12" height="10" viewBox="0 0 12 10" fill="none"><path d="M1 5l3.5 3.5L11 1" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div>
                  <div style={{ fontSize:12, fontWeight:700, color:"#059669", fontFamily:"var(--fb)" }}>With NimbleS2P</div>
                  <div style={{ fontSize:11, color:"#34D399", fontFamily:"var(--fb)" }}>Financing Cloud</div>
                </div>
              </div>
            </div>

            {/* Rows */}
            {efComparison.map(([without, withNimble], i) => (
              <div key={i} style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "220px 1fr 1fr", borderTop:"1px solid #F1F5F9", transition:"background .15s" }}
                onMouseEnter={e=>e.currentTarget.style.background="#FAFBFF"}
                onMouseLeave={e=>e.currentTarget.style.background="transparent"}
              >
                <div style={{ padding:"15px 24px", display:"flex", alignItems:"center", background:"#FAFBFC" }}>
                  <span style={{ fontFamily:"var(--fb)", fontSize:13.5, fontWeight:700, color:"#334155" }}>
                    {["Lender Setup","Operations","Workload","Visibility","Onboarding","Compliance","Scalability"][i]}
                  </span>
                </div>
                <div style={{ padding:"15px 24px", display:"flex", alignItems:"flex-start", gap:10, borderLeft: isMobile ? "none" : "1px solid #F1F5F9", borderTop: isMobile ? "1px solid #FEF2F2" : "none" }}>
                  <span style={{ fontSize:10, color:"#EF4444", fontWeight:700, marginTop:3, flexShrink:0 }}>✕</span>
                  <span style={{ fontFamily:"var(--fb)", fontSize:13.5, color:"#64748B", lineHeight:1.55 }}>{without}</span>
                </div>
                <div style={{ padding:"15px 24px", display:"flex", alignItems:"flex-start", gap:10, borderLeft: isMobile ? "none" : "1px solid #D1FAE5", background: i%2===0 ? "rgba(240,253,248,.6)" : "transparent", borderTop: isMobile ? "1px solid #D1FAE5" : "none" }}>
                  <span style={{ fontSize:10, color:"#10B981", fontWeight:700, marginTop:3, flexShrink:0 }}>✓</span>
                  <span style={{ fontFamily:"var(--fb)", fontSize:13.5, fontWeight:600, color:"#0F5132", lineHeight:1.55 }}>{withNimble}</span>
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
   EF 8 — COMPLIANCE
════════════════════════════════════ */
function EFCompliance() {
  const w = useWidth(); const isMobile = w < 640;
  const [hov, setHov] = useState(null);
  const ref = useReveal();
  return (
    <section style={{ background:"var(--slp)", position:"relative", overflow:"hidden", padding: isMobile ? "64px 20px" : "clamp(64px,9vh,104px) 5vw" }}>
      <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(rgba(99,32,224,.06) 1px,transparent 1px)", backgroundSize:"28px 28px", pointerEvents:"none" }} />
      <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:"linear-gradient(90deg,var(--p500),var(--p300),#F59E0B)", pointerEvents:"none" }} />

      <div style={{ maxWidth:1080, margin:"0 auto", position:"relative", zIndex:1 }}>
        <div style={{ textAlign:"center", marginBottom: isMobile ? 36 : 52 }}>
          <Eyebrow>Compliance & Controls</Eyebrow>
          <h2 style={{ fontFamily:"var(--fb)", fontSize: isMobile ? "clamp(22px,6vw,32px)" : "clamp(26px,3vw,40px)", fontWeight:900, letterSpacing:"-.04em", lineHeight:1.05, color:"#0F172A", marginBottom:10 }}>
            Built for Enterprise-Grade Compliance
          </h2>
          <p style={{ fontSize:15, color:"#64748B", lineHeight:1.7, fontFamily:"var(--fb)", maxWidth:480, margin:"0 auto" }}>Twelve controls, embedded from day one — so your programs are always audit-ready.</p>
        </div>

        <div className="reveal" ref={ref} style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,1fr)", gap: isMobile ? 10 : 12 }}>
          {efCompliance.map((c,i) => {
            const isH = hov === i;
            return (
              <div key={c.label} onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)}
                style={{
                  background: isH ? "#F5F3FF" : "#fff",
                  border:`1.5px solid ${isH ? "rgba(99,32,224,.35)" : "#E2E8F0"}`,
                  borderRadius:14, padding: isMobile ? "16px 14px" : "20px 18px",
                  display:"flex", flexDirection:"column", alignItems:"flex-start", gap:10,
                  boxShadow: isH ? "0 6px 24px rgba(99,32,224,.12)" : "0 1px 4px rgba(0,0,0,.04)",
                  transition:"all .22s cubic-bezier(.22,1,.36,1)",
                  transform: isH ? "translateY(-2px)" : "none",
                  cursor:"default",
                }}
              >
                <div style={{ width:40, height:40, borderRadius:12, background: isH ? "rgba(99,32,224,.15)" : "rgba(99,32,224,.08)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, transition:"background .2s" }}>{c.icon}</div>
                <span style={{ fontFamily:"var(--fb)", fontSize: isMobile ? 12 : 13, fontWeight:700, color: isH ? "#391085" : "#334155", lineHeight:1.35, transition:"color .2s" }}>{c.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════
   EF 9 — ENTERPRISE READINESS
════════════════════════════════════ */
function EFEnterprise() {
  const w = useWidth(); const isMobile = w < 640;
  const ref = useReveal();
  const icons = ["🔌","🏢","🌍","⚙️","🔗","🔐","📋","⚡"];
  return (
    <section style={{ background:"linear-gradient(160deg,#1E1660 0%,#261d6b 50%,#1a1258 100%)", position:"relative", overflow:"hidden", padding: isMobile ? "64px 20px" : "clamp(64px,9vh,104px) 5vw" }}>
      <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(rgba(255,255,255,.04) 1px,transparent 1px)", backgroundSize:"28px 28px", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:"-10%", right:"-5%", width:"50%", height:"70%", background:"radial-gradient(ellipse, rgba(245,166,35,.1) 0%, transparent 65%)", pointerEvents:"none" }} />

      <div style={{ maxWidth:1080, margin:"0 auto", position:"relative", zIndex:1 }}>
        <div style={{ marginBottom: isMobile ? 36 : 52 }}>
          <Eyebrow dark>Compliance Ready</Eyebrow>
          <h2 style={{ fontFamily:"var(--fb)", fontSize: isMobile ? "clamp(22px,6vw,32px)" : "clamp(26px,3vw,42px)", fontWeight:900, letterSpacing:"-.04em", lineHeight:1.05, background:"linear-gradient(95deg,#fff 0%,#fff 30%,#F5D060 62%,#F5A623 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", marginBottom:10, textAlign:"left" }}>
            Designed for Enterprise Scale
          </h2>
          <p style={{ fontSize:15, color:"rgba(255,255,255,.45)", lineHeight:1.7, fontFamily:"var(--fb)", maxWidth:480 }}>Architecture for the complexities of large enterprises — multi-entity, multi-country, high-volume, and configurable.</p>
        </div>

        <div className="reveal" ref={ref} style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,1fr)", gap: isMobile ? 10 : 12 }}>
          {efEnterprise.map((item,i) => (
            <div key={item} style={{
              background:"rgba(255,255,255,.06)", border:"1.5px solid rgba(255,255,255,.1)", borderRadius:16,
              padding: isMobile ? "20px 16px" : "26px 20px",
              display:"flex", flexDirection:"column", alignItems:"center", gap:12, textAlign:"center",
              transition:"all .22s cubic-bezier(.22,1,.36,1)", cursor:"default",
            }}
              onMouseEnter={e=>{ e.currentTarget.style.background="rgba(255,255,255,.12)"; e.currentTarget.style.borderColor="rgba(245,166,35,.4)"; e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow="0 8px 28px rgba(245,166,35,.12)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.background="rgba(255,255,255,.06)"; e.currentTarget.style.borderColor="rgba(255,255,255,.1)"; e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow=""; }}
            >
              <div style={{ width:48, height:48, borderRadius:14, background:"rgba(245,166,35,.12)", border:"1px solid rgba(245,166,35,.2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>{icons[i]}</div>
              <span style={{ fontFamily:"var(--fb)", fontSize: isMobile ? 12 : 13.5, fontWeight:700, color:"rgba(255,255,255,.85)", lineHeight:1.35 }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════
   EF 10 — FAQs
════════════════════════════════════ */
function EFFAQs() {
  const w = useWidth(); const isMobile = w < 640;
  const [open, setOpen] = useState(null);
  const ref = useReveal();
  return (
    <section style={{ background:"var(--slp)", position:"relative", overflow:"hidden", padding: isMobile ? "64px 20px" : "clamp(64px,9vh,104px) 5vw" }}>
      <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:"linear-gradient(90deg,var(--p500),var(--p300),#F59E0B)", pointerEvents:"none" }} />
      <div style={{ maxWidth:1040, margin:"0 auto" }}>
        <div className="reveal" ref={ref} style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1.5fr", gap: isMobile ? 36 : 64, alignItems:"start" }}>

          {/* Left sticky header — exact VDD FAQ style */}
          <div style={{ position:"static" }}>
            <Eyebrow>FAQs</Eyebrow>
            <h2 style={{ fontFamily:"var(--fb)", fontSize: isMobile ? "clamp(24px,6vw,32px)" : "clamp(26px,3vw,38px)", fontWeight:700, letterSpacing:"-.04em", lineHeight:1.08, color:"#0F172A", marginBottom:16 }}>
              Questions<br />we get asked
            </h2>
            <p style={{ fontSize:15, color:"#64748B", lineHeight:1.7, fontFamily:"var(--fb)", marginBottom:28 }}>
              Everything you need to know about NimbleS2P's Supply Chain Financing platform.
            </p>
            <a href="#" style={{ display:"inline-flex", alignItems:"center", gap:6, fontSize:14, fontWeight:600, color:"var(--p600)", fontFamily:"var(--fb)", textDecoration:"none", borderBottom:"1.5px solid var(--p200)", paddingBottom:2, transition:"color .15s, border-color .15s" }}
              onMouseEnter={e=>{ e.currentTarget.style.color="var(--p700)"; e.currentTarget.style.borderColor="var(--p400)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.color="var(--p600)"; e.currentTarget.style.borderColor="var(--p200)"; }}
            >Talk to our team →</a>
          </div>

          {/* Right accordion — exact VDD FAQ style */}
          <div style={{ borderTop:"1px solid #E2E8F0", borderBottom:"1px solid #E2E8F0" }}>
            {efFaqs.map((f,i) => (
              <EFFAQItem key={i} f={f} isOpen={open===i} onToggle={()=>setOpen(open===i ? null : i)} isMobile={isMobile} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════
   EF 11 — CTA
════════════════════════════════════ */
function EFCTA({ onNavigate }) {
  const w = useWidth(); const isMobile = w < 640;
  const [email, setEmail] = useState(""); const [done, setDone] = useState(false);
  return (
    <section style={{ background:"linear-gradient(160deg,#0f0c29 0%,#1a1260 40%,#261d6b 70%,#1e1050 100%)", position:"relative", overflow:"hidden", padding: isMobile ? "72px 20px 88px" : "clamp(72px,9vh,110px) 5vw" }}>
      <div style={{ position:"absolute", top:"-15%", left:"-5%", width:"55%", height:"80%", background:"radial-gradient(ellipse at 20% 20%, rgba(99,32,224,.28) 0%, transparent 60%)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:"-15%", right:"-5%", width:"55%", height:"85%", background:"radial-gradient(ellipse at 80% 80%, rgba(245,166,35,.14) 0%, transparent 60%)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(rgba(255,255,255,.04) 1px,transparent 1px)", backgroundSize:"26px 26px", pointerEvents:"none" }} />

      <div style={{ maxWidth:1040, margin:"0 auto", position:"relative", zIndex:2 }}>
        <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 40 : 80, alignItems:"center" }}>
          <div>
            <div style={{ display:"inline-flex", alignItems:"center", gap:7, background:"rgba(245,166,35,.15)", border:"1px solid rgba(245,166,35,.35)", borderRadius:100, padding:"5px 14px", marginBottom:20 }}>
              <span style={{ width:6, height:6, borderRadius:"50%", background:"#F5A623", display:"inline-block", animation:"pulse-dot 2s infinite" }} />
              <span style={{ fontSize:11, fontWeight:700, color:"#F5D060", fontFamily:"var(--fb)", letterSpacing:".05em", textTransform:"uppercase" }}>Blog</span>
            </div>
            <h2 style={{ fontFamily:"var(--fb)", fontWeight:900, fontSize: isMobile ? "clamp(24px,7vw,34px)" : "clamp(26px,3.2vw,40px)", lineHeight:1.12, letterSpacing:"-.04em", background:"linear-gradient(95deg,#fff 0%,#fff 30%,#F5D060 62%,#F5A623 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", marginBottom:16, paddingBottom:8 }}>
              {PRODUCT_PAGE_RESOURCES.finance.label}
            </h2>
            <p style={{ fontSize: isMobile ? 14.5 : 16, color:"rgba(255,255,255,.48)", lineHeight:1.75, fontFamily:"var(--fb)" }}>
              Get your early financing programs live with pre-integrated lenders, automated workflows, and enterprise-grade compliance — all in one platform.
            </p>
          </div>
          <div style={{ background:"rgba(255,255,255,.06)", border:"1px solid rgba(255,255,255,.12)", borderRadius:20, padding: isMobile ? "28px 22px" : "36px 32px", backdropFilter:"blur(16px)" }}>
            {!done ? (
              <>
                <div style={{ fontSize:13, fontWeight:600, color:"rgba(255,255,255,.5)", fontFamily:"var(--fb)", marginBottom:20 }}>Enter your work email to get started</div>
                <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                  <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@company.com"
                    style={{ width:"100%", background:"rgba(255,255,255,.08)", border:"1.5px solid rgba(255,255,255,.16)", borderRadius:10, outline:"none", padding:"13px 16px", fontSize:15, color:"#fff", fontFamily:"var(--fb)", transition:"border-color .18s" }}
                    onFocus={e=>e.target.style.borderColor="rgba(245,166,35,.6)"}
                    onBlur={e=>e.target.style.borderColor="rgba(255,255,255,.16)"}
                  />
                  <button onClick={()=>{ if(email) setDone(true); }} style={{ width:"100%", background:"linear-gradient(135deg,#E8920A,#F5B020)", color:"#fff", border:"none", borderRadius:10, padding:"13px 24px", fontSize:15, fontWeight:700, cursor:"pointer", fontFamily:"var(--fb)", boxShadow:"0 6px 24px rgba(232,150,10,.45)", transition:"all .2s" }}
                    onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-1px)"; e.currentTarget.style.boxShadow="0 10px 32px rgba(232,150,10,.6)"; }}
                    onMouseLeave={e=>{ e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow="0 6px 24px rgba(232,150,10,.45)"; }}
                  >Book a Demo →</button>
                </div>
                <p style={{ fontSize:11.5, color:"rgba(255,255,255,.22)", marginTop:14, fontFamily:"var(--fb)", textAlign:"center" }}>No spam. Unsubscribe anytime.</p>
              </>
            ) : (
              <div style={{ textAlign:"center", padding:"20px 0" }}>
                <div style={{ fontSize:40, marginBottom:14 }}>✅</div>
                <div style={{ fontSize:16, fontWeight:700, color:"#F5D060", fontFamily:"var(--fb)", marginBottom:8 }}>We'll be in touch!</div>
                <div style={{ fontSize:14, color:"rgba(255,255,255,.45)", fontFamily:"var(--fb)" }}>Check your inbox at {email}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════
   EF ROOT PAGE
════════════════════════════════════ */
export default function EarlyFinancingPage({ onBack, onNavigate }) {
  return (
    <>
      <Nav onNavigate={onNavigate} onBack={onBack} pageName="Early Financing" />
      <main>
        <EFHero onNavigate={onNavigate} />
        <EFProducts />
        <EFEcosystem />
        <EFBenefits />
        <EFComparison />
        <EFEnterprise />
        <EFFAQs />
        <EFCTA onNavigate={onNavigate} />
      </main>
      <VDDFooter onNavigate={onNavigate} />
    </>
  );
}
