"use client";

import { useState, useEffect, useRef, Fragment } from "react";
import { Nav } from "@/components/layout/SiteNav";
import { VDDFooter } from "@/components/layout/VDDFooter";
import { useWidth, useReveal, Eyebrow } from "@/components/shared/pageUi";

/* ═══════════════════════════════════════════════════════════
   INVOICE PROCESSING AUTOMATION — PRODUCT PAGE
═══════════════════════════════════════════════════════════ */

const ipFaqs = [
  { q:"What problems does manual invoice processing create?", a:"Manual invoice processing leads to delays of 8–25 days per invoice, mismatched invoices, lost documents, working capital blockage, high FTE cost, missing ITC, and poor visibility of liabilities. Enterprises often discover the true cost only during audits or month-end crises." },
  { q:"Can Invoice Processing Automation eliminate invoice duplication and fraud?", a:"Yes. With pattern-matching, duplicate detection, supplier behaviour analysis, and OCR validation, NimbleS2P automation eliminates duplicate entries and flags suspicious invoices the moment they enter the system — before they cause financial damage." },
  { q:"What is 3-Way Matching in invoice automation?", a:"3-Way Matching automatically compares Invoice ↔ PO ↔ GRN to ensure quantity, price, tax, tolerance, and line items match before the invoice is approved. Any discrepancy is flagged instantly with a percentage estimate and routed to the right team." },
  { q:"What types of invoices can be automatically processed with NimbleS2P?", a:"PO Invoices, Non-PO Invoices, Service Invoices, Recurring/Contract Invoices, Debit/Credit Notes, Advance Invoices, Logistics & Customs Invoices. Every type enters the right workflow automatically — no manual categorization needed." },
  { q:"What is Touchless Invoice Processing?", a:"Touchless processing means invoices flow from receipt → OCR → match → validation → posting without any manual intervention, except for true exceptions. The goal is zero-touch for 80%+ of invoices." },
  { q:"How does NimbleS2P handle exceptions?", a:"Exception workflows automatically route invoices to the right stakeholder, highlight exactly what mismatched, attach supporting evidence, and capture every action with a full audit trail — eliminating endless email threads and confusion." },
];

const ipAgents = [
  { icon:"🔍", num:"01", title:"AI OCR Agent", desc:"Extracts every invoice detail with intelligent OCR, auto-validates fields against master data, and converts documents into clean, structured, ERP-ready data.", color:"#6320E0" },
  { icon:"⚖️", num:"02", title:"3-Way Matching Agent", desc:"Performs instant Invoice–PO–GRN matching with tolerance checks, flags mismatches with percentage estimation, and routes only true exceptions for action.", color:"#0369A1" },
  { icon:"🛡", num:"03", title:"Compliance Agent", desc:"Validates every invoice for tax, statutory, and supplier compliance, preventing ITC loss, errors, and audit exposure before posting.", color:"#059669" },
];

const ipFeatures = [
  { icon:"🗂", title:"Intelligent Classification, Without the Manual Sorting", desc:"NimbleS2P auto-detects PO, Non-PO, Service, Recurring, and Credit/Debit Notes so invoices enter the right workflow instantly — without anyone choosing categories or correcting mistakes later." },
  { icon:"📥", title:"Invoice Intake That Fits Every Supplier's Workflow", desc:"Email, portal upload, API, or any other stream — vendors submit invoices in the channel they prefer, without learning a new system or adjusting to rigid formats." },
  { icon:"🔄", title:"Exception Handling That Ends the Back-and-Forth", desc:"Whenever a mismatch occurs, the platform explains what went wrong, shows what's missing, and routes it to the right team automatically — no endless email threads, no confusion, no delays." },
  { icon:"🔒", title:"Duplicate Detection That Protects Every Rupee", desc:"NimbleS2P flags suspicious or repeated invoices the moment they enter the system, eliminating double payments, fraud risks, and month-end surprises." },
  { icon:"⚡", title:"Approvals That Move Forward Themselves", desc:"Smart rules push invoices to the right approver based on value, department, plant, or PO owner — keeping approvals flowing without manual nudges or blockers." },
  { icon:"🏦", title:"Posting That's Clean, Verified, and ERP-Ready", desc:"Every validated invoice flows into SAP, Oracle, Dynamics, or any ERP with accuracy — ensuring books stay clean, compliant, and month-end doesn't turn into a fire drill." },
  { icon:"📋", title:"Audit Trails That Leave No Question Unanswered", desc:"Every match, comment, validation, and decision is captured with timestamps — so audit queries that once took days can now be answered in minutes, with confidence." },
];

const ipStats = [
  ["<1","%","Exception Leakage Rate"],
  ["3","x","Faster Invoice Cycle Times"],
  ["70","%","Lower AP Operational Costs"],
  ["100","%","Audit-Traceable"],
];

/* ── IP FAQ Item ── */
function IPFAQItem({ f, isOpen, onToggle, isMobile }) {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);
  useEffect(() => {
    if (contentRef.current) setHeight(isOpen ? contentRef.current.scrollHeight : 0);
  }, [isOpen]);
  return (
    <div style={{ borderBottom:"1px solid #F1F5F9" }}>
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
function IPHero({ onNavigate }) {
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
          Invoice Automation That Thinks Like Your AP Team
        </h1>

        {/* Sub */}
        <p className="fade-up d2" style={{ fontSize: isMobile ? 15 : 17.5, color:"rgba(255,255,255,.52)", lineHeight:1.72, fontFamily:"var(--fb)", maxWidth:620, margin:"0 auto 36px" }}>
          Automate every invoice scenario — including material, service, advance payment, and credit note processing — with AI-led validation, ERP-connected workflows, and context based exception handling.
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
          >See How It Works ↓</a>
        </div>

        {/* Stats tiles — same design as VDD/SP */}
        <div className="fade-up d4" style={{ width:"100%" }}>
          <div style={{ display:"grid", gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(4,1fr)",
          gap:1,
          background:"rgba(255,255,255,.07)", border:"1px solid rgba(255,255,255,.1)",
          borderRadius:16, overflow:"hidden", backdropFilter:"blur(12px)",
        }}>
          {ipStats.map(([main,sup,label],i)=>(
            <div key={label} style={{
              padding: isMobile ? "18px 12px" : "22px 16px", textAlign:"center",
              borderRight: i < ipStats.length-1 && !(isMobile && i%2===1) ? "1px solid rgba(255,255,255,.08)" : "none",
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
   2. ARCHITECTURE DIAGRAM
════════════════════════════════════ */
/* ═══════════════════════════════════════════════
   INVOICE PROCESSING — ANIMATED ARCHITECTURE DIAGRAM (HORIZONTAL)
═══════════════════════════════════════════════ */
function IPArchDiagram() {
  const [animating, setAnimating] = useState(true);
  const [currentFlow, setCurrentFlow] = useState(0);
  const [tooltip, setTooltip] = useState(null); // { id, x, y }
  const TOTAL_STEPS = 11;

  useEffect(() => {
    if (!animating) return;
    const iv = setInterval(() => setCurrentFlow(f => (f + 1) % TOTAL_STEPS), 900);
    return () => clearInterval(iv);
  }, [animating]);

  const C = {
    purple: { bg:"#EDE9FE", border:"#7C3AED", text:"#391085", dot:"#6320E0", light:"#F5F3FF" },
    blue:   { bg:"#EFF6FF", border:"#3B82F6", text:"#1E40AF", dot:"#2563EB", light:"#F0F7FF" },
    amber:  { bg:"#FFFBEB", border:"#F59E0B", text:"#92400E", dot:"#D97706", light:"#FFFDF5" },
    green:  { bg:"#F0FDF4", border:"#22C55E", text:"#14532D", dot:"#16A34A", light:"#F7FEF9" },
    violet: { bg:"#FDF4FF", border:"#A855F7", text:"#581C87", dot:"#9333EA", light:"#FEF9FF" },
    yellow: { bg:"#FEF9C3", border:"#EAB308", text:"#713F12", dot:"#CA8A04", light:"#FEFCE8" },
    emerald:{ bg:"#ECFDF5", border:"#10B981", text:"#064E3B", dot:"#059669", light:"#F0FDF8" },
    red:    { bg:"#FEF2F2", border:"#EF4444", text:"#7F1D1D", dot:"#DC2626", light:"#FFF5F5" },
    indigo: { bg:"#EEF2FF", border:"#6366F1", text:"#1E1B4B", dot:"#4F46E5", light:"#F5F7FF" },
  };

  /* ── Tooltip registry ── */
  const TIPS = {
    email:      { title:"Email Intake",           items:["SMTP / IMAP parsing","Attachment extraction","Sender validation","Auto-routing by domain"] },
    portal:     { title:"Supplier Portal",        items:["Self-service upload","Format validation on entry","Real-time status feedback","Bulk submission support"] },
    scan:       { title:"Scan Drive",             items:["OCR pipeline trigger","Shared folder polling","Quality pre-check","Metadata tagging"] },
    api:        { title:"API Integration",        items:["REST / EDI connectors","Webhook receivers","Real-time push","Schema normalization"] },
    hygiene:    { title:"Hygiene Check",          items:["File format validation","Duplicate detection","Virus / security scan","Image quality scoring"] },
    classify:   { title:"AI Classification",      items:["Document type identification","Supplier matching","Template selection","Confidence scoring"] },
    extract:    { title:"AI Data Extraction",     items:["OCR text extraction","Header field parsing","Line-item extraction","Structured output generation"] },
    sop:        { title:"SOPs & Business Rules",  items:["Mandatory field checks","Tax validation","Business policy rules","Compliance gate"] },
    erp:        { title:"ERP Integration Sync",   items:["Master data sync","Vendor validation","PO / AP reference retrieval","Status synchronization"] },
    matching:   { title:"Agentic Matching",       items:["2-way PO matching","3-way GRN matching","Variance tolerance checks","Confidence-based routing"] },
    decision:   { title:"Decision Gate",          items:["Match status evaluation","Compliance score check","Auto-approve threshold","Exception trigger logic"] },
    autopost:   { title:"Auto Posting (STP)",     items:["Real-time ERP posting","Zero-touch processing","Audit event generation","Confirmation notification"] },
    workorq:    { title:"Workflow Orchestration", items:["Role-based routing","Approval hierarchy","Delegation rules","SLA countdown"] },
    excmgmt:    { title:"Exception Management",   items:["Auto-flagging by rule","Exception dashboard","Collaboration threads","Re-submission handling"] },
    human:      { title:"Human-in-the-Loop",      items:["Reviewer assignment","Approve / reject actions","Comment & escalation","Manual override"] },
    manpost:    { title:"Manual Posting",         items:["Reviewer-triggered post","Audit trail preserved","Reconciliation flag","ERP update confirmation"] },
    apipost:    { title:"API Auto Posting",       items:["Real-time ERP write","Idempotent requests","Error retry logic","Response acknowledgement"] },
    filepost:   { title:"File-Based Scheduling",  items:["Flat-file generation","Scheduled dispatch","Delivery confirmation","Reconciliation report"] },
    botpost:    { title:"BOT-Based Posting",      items:["Legacy system RPA","Non-API ERP support","Screen-based automation","Fallback orchestration"] },
    mastermgmt: { title:"Agentic Master Mgmt",    items:["Data validation","Event-driven scheduling","Updates & retries","Posting orchestration"] },
    audit:      { title:"Audit Trail",            items:["Immutable event logs","User activity tracking","Full traceability","Tamper-evident records"] },
    notif:      { title:"Notifications",          items:["Email / in-app alerts","Escalation triggers","SLA breach alerts","Stakeholder digest"] },
    reporting:  { title:"AI Active Reporting",    items:["KPI dashboards","Operational insights","Real-time analytics","Anomaly detection"] },
    gcc:        { title:"GCC Control Centre",     items:["Access control matrix","Compliance governance","Encryption & residency","Role audit reports"] },
  };

  /* ── Tooltip component ── */
  const Tip = ({ id, color, children, style: extraStyle, side = "bottom" }) => {
    const [show, setShow] = useState(false);
    const t = TIPS[id];
    const tipStyle = side === "top"
      ? { bottom:"calc(100% + 10px)", left:"50%", transform:"translateX(-50%)" }
      : side === "left"
      ? { right:"calc(100% + 10px)", top:"50%", transform:"translateY(-50%)" }
      : side === "right"
      ? { left:"calc(100% + 10px)", top:"50%", transform:"translateY(-50%)" }
      : { top:"calc(100% + 10px)", left:"50%", transform:"translateX(-50%)" };

    return (
      <div
        style={{ position:"relative", display:"inline-flex", ...extraStyle }}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        {children}
        {show && t && (
          <div style={{
            position:"absolute", zIndex:200,
            background:"#0F172A",
            border:`1px solid ${color.border}`,
            borderRadius:12,
            padding:"12px 14px",
            minWidth:200, maxWidth:240,
            boxShadow:`0 8px 32px rgba(0,0,0,.28), 0 0 0 1px ${color.border}22`,
            pointerEvents:"none",
            ...tipStyle,
          }}>
            <div style={{ fontFamily:"var(--fb)", fontSize:11.5, fontWeight:700, color:"#F8FAFC", marginBottom:8, letterSpacing:"-.01em" }}>{t.title}</div>
            <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
              {t.items.map((item,i) => (
                <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:7, fontSize:11, color:"#94A3B8", fontFamily:"var(--fb)", lineHeight:1.4 }}>
                  <div style={{ width:4, height:4, borderRadius:"50%", background:color.dot, flexShrink:0, marginTop:4 }} />
                  {item}
                </div>
              ))}
            </div>
            {/* Arrow pointer */}
            {side === "bottom" && <div style={{ position:"absolute", top:-5, left:"50%", transform:"translateX(-50%)", width:10, height:5, overflow:"hidden" }}>
              <div style={{ width:10, height:10, background:"#0F172A", border:`1px solid ${color.border}`, transform:"rotate(45deg)", marginTop:3 }} />
            </div>}
            {side === "top" && <div style={{ position:"absolute", bottom:-5, left:"50%", transform:"translateX(-50%)", width:10, height:5, overflow:"hidden" }}>
              <div style={{ width:10, height:10, background:"#0F172A", border:`1px solid ${color.border}`, transform:"rotate(45deg)", marginBottom:3 }} />
            </div>}
          </div>
        )}
      </div>
    );
  };

  /* ── Mini node chip ── */
  const Chip = ({ id, icon, label, color, step, side }) => {
    const active = currentFlow === step && animating;
    return (
      <Tip id={id} color={color} side={side}>
        <div style={{
          display:"flex", alignItems:"center", gap:6,
          background: active ? color.bg : "#fff",
          border:`1.5px solid ${active ? color.border : "#E2E8F0"}`,
          borderRadius:9, padding:"7px 10px", cursor:"default",
          transition:"all .35s cubic-bezier(.22,1,.36,1)",
          boxShadow: active ? `0 3px 16px ${color.border}30` : "0 1px 2px rgba(0,0,0,.04)",
          transform: active ? "translateY(-2px)" : "none",
          whiteSpace:"nowrap",
        }}>
          <span style={{ fontSize:14 }}>{icon}</span>
          <span style={{ fontFamily:"var(--fb)", fontSize:11, fontWeight:700, color: active ? color.text : "#334155", letterSpacing:"-.01em" }}>{label}</span>
          {active && <div style={{ width:5, height:5, borderRadius:"50%", background:color.dot, animation:"pulse-dot 1s ease-in-out infinite" }} />}
        </div>
      </Tip>
    );
  };

  /* ── Section wrapper (horizontal lane) ── */
  const Lane = ({ color, label, children, style: s }) => (
    <div style={{ position:"relative", border:`1.5px solid ${color.border}`, borderRadius:14, background:color.light, padding:"20px 14px 14px", ...s }}>
      <div style={{
        position:"absolute", top:-10, left:12,
        background:color.bg, border:`1px solid ${color.border}`,
        borderRadius:20, padding:"1px 10px",
        fontSize:9.5, fontWeight:700, letterSpacing:".07em", textTransform:"uppercase",
        color:color.text, fontFamily:"var(--fb)", whiteSpace:"nowrap",
      }}>{label}</div>
      {children}
    </div>
  );

  /* ── Horizontal arrow connector ── */
  const HArrow = ({ color, step, label }) => {
    const active = currentFlow === step && animating;
    return (
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", flexShrink:0, minWidth:32, gap:2 }}>
        {label && <div style={{ fontSize:9, fontWeight:600, color:"#94A3B8", fontFamily:"var(--fb)", letterSpacing:".04em", textTransform:"uppercase", textAlign:"center", lineHeight:1.2 }}>{label}</div>}
        <div style={{ display:"flex", alignItems:"center" }}>
          <div style={{
            height:2, borderRadius:1,
            width: active ? 28 : 20,
            background: active ? color : "#CBD5E1",
            transition:"all .4s cubic-bezier(.22,1,.36,1)",
            boxShadow: active ? `0 0 6px ${color}99` : "none",
          }} />
          <svg width="7" height="10" viewBox="0 0 7 10" style={{ flexShrink:0 }}>
            <path d="M0 1L6 5L0 9" stroke={active ? color : "#CBD5E1"} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ transition:"stroke .4s" }} />
          </svg>
        </div>
      </div>
    );
  };

  /* ── Vertical arrow (for decision split & convergence) ── */
  const VArrow = ({ color, step, label }) => {
    const active = currentFlow === step && animating;
    return (
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", margin:"4px 0", gap:1 }}>
        {label && <div style={{ fontSize:9, fontWeight:600, color:"#94A3B8", fontFamily:"var(--fb)", letterSpacing:".04em", textTransform:"uppercase" }}>{label}</div>}
        <div style={{ width:2, height:14, borderRadius:1, background: active ? color : "#CBD5E1", transition:"background .4s", boxShadow: active ? `0 0 6px ${color}88`:"none" }} />
        <svg width="10" height="6" viewBox="0 0 10 6"><path d="M0 0L5 6L10 0" fill={active ? color : "#CBD5E1"} style={{ transition:"fill .4s" }} /></svg>
      </div>
    );
  };

  return (
    <div style={{ background:"#fff", border:"1px solid #E2E8F0", borderRadius:20, overflow:"hidden", boxShadow:"0 4px 32px rgba(57,16,133,.08)" }}>

      {/* ── Chrome header ── */}
      <div style={{ background:"#F8F7FF", borderBottom:"1px solid #E2E8F0", padding:"10px 18px", display:"flex", alignItems:"center", justifyContent:"space-between", gap:12, flexWrap:"wrap" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ display:"flex", gap:5 }}>
            {["#EF4444","#F59E0B","#10B981"].map(col=>(
              <div key={col} style={{ width:9, height:9, borderRadius:"50%", background:col }} />
            ))}
          </div>
          <span style={{ fontSize:11, fontWeight:600, color:"#6320E0", fontFamily:"var(--fm)", letterSpacing:".04em" }}>
            Invoice Processing — System Architecture
          </span>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ fontSize:10.5, color:"#94A3B8", fontFamily:"var(--fb)" }}>Hover nodes to explore details</div>
          <div style={{ display:"flex", alignItems:"center", gap:5, fontSize:11, color:animating?"#059669":"#94A3B8", fontFamily:"var(--fb)", fontWeight:600 }}>
            <div style={{ width:6, height:6, borderRadius:"50%", background:animating?"#10B981":"#CBD5E1", animation: animating?"pulse-dot 1.5s ease-in-out infinite":"none" }} />
            {animating ? "Live flow" : "Paused"}
          </div>
          <button onClick={()=>setAnimating(a=>!a)} style={{
            background: animating?"#FEF2F2":"#F0FDF4", border:`1px solid ${animating?"#FCA5A5":"#86EFAC"}`,
            borderRadius:6, padding:"3px 10px", fontSize:11, fontWeight:600,
            color: animating?"#DC2626":"#16A34A", cursor:"pointer", fontFamily:"var(--fb)",
          }}>{animating ? "⏸ Pause" : "▶ Play"}</button>
        </div>
      </div>

      {/* ── Diagram body ── */}
      <div style={{ padding:"24px 20px 28px", overflowX:"auto" }}>
        <div style={{ minWidth:900, display:"flex", flexDirection:"column", gap:10 }}>

          {/* ══ ROW 1: INTAKE ══ */}
          <Lane color={C.purple} label="Invoice Intake — Sequential Start">
            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:6, flexWrap:"nowrap" }}>
              <Chip id="email"  icon="📧" label="Email"           color={C.purple} step={0} side="bottom" />
              <div style={{ width:1, height:28, background:"#DDD6FE", flexShrink:0 }} />
              <Chip id="portal" icon="🌐" label="Supplier Portal" color={C.purple} step={0} side="bottom" />
              <div style={{ width:1, height:28, background:"#DDD6FE", flexShrink:0 }} />
              <Chip id="scan"   icon="📁" label="Scan Drive"      color={C.purple} step={0} side="bottom" />
              <div style={{ width:1, height:28, background:"#DDD6FE", flexShrink:0 }} />
              <Chip id="api"    icon="🔌" label="API Integration" color={C.purple} step={0} side="bottom" />
            </div>
          </Lane>

          <VArrow color={C.blue.dot} step={0} />

          {/* ══ ROW 2: AI OPERATIONAL ══ */}
          <Lane color={C.blue} label="AI Operational Layer">
            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:6, flexWrap:"nowrap" }}>

              {/* Hygiene */}
              <Chip id="hygiene" icon="🧹" label="Hygiene Check" color={C.blue} step={1} side="bottom" />
              <HArrow color={C.blue.dot} step={1} />

              {/* AI Doc Ops parallel group */}
              <div style={{ border:"1.5px dashed #93C5FD", borderRadius:11, padding:"8px 10px", background:"rgba(239,246,255,.6)", position:"relative" }}>
                <div style={{ position:"absolute", top:-9, left:10, background:"#EFF6FF", border:"1px solid #93C5FD", borderRadius:20, padding:"1px 8px", fontSize:9, fontWeight:700, color:"#1E40AF", fontFamily:"var(--fb)", letterSpacing:".06em", textTransform:"uppercase", whiteSpace:"nowrap" }}>Parallel</div>
                <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                  <Chip id="classify" icon="🏷️" label="AI Classification" color={C.blue} step={2} side="bottom" />
                  <div style={{ width:1, height:28, background:"#BFDBFE", flexShrink:0 }} />
                  <Chip id="extract"  icon="🔍" label="AI Extraction"      color={C.blue} step={2} side="bottom" />
                </div>
              </div>
              <HArrow color={C.amber.dot} step={2} />

              {/* SOPs */}
              <Chip id="sop" icon="📋" label="SOPs & Rules" color={C.amber} step={3} side="bottom" />
              <HArrow color={C.green.dot} step={3} />

              {/* ERP Sync */}
              <Chip id="erp" icon="🔄" label="ERP Sync" color={C.green} step={4} side="bottom" />
            </div>
          </Lane>

          <VArrow color={C.violet.dot} step={4} />

          {/* ══ ROW 3: AGENTIC MATCHING ══ */}
          <Lane color={C.violet} label="Agentic Workflow Layer">
            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
              <Chip id="matching" icon="🤖" label="Agentic Matching" color={C.violet} step={5} side="bottom" />
              <HArrow color={C.yellow.dot} step={5} />

              {/* Decision diamond */}
              <Tip id="decision" color={C.yellow} side="bottom">
                <div style={{
                  background: currentFlow === 6 && animating ? C.yellow.bg : "#FFFEF0",
                  border:`2px solid ${currentFlow===6&&animating ? C.yellow.border : "#FCD34D"}`,
                  borderRadius:10, padding:"8px 14px", cursor:"default",
                  transition:"all .35s",
                  boxShadow: currentFlow===6&&animating ? "0 4px 18px #EAB30840" : "none",
                  transform: currentFlow===6&&animating ? "translateY(-2px)" : "none",
                }}>
                  <div style={{ fontFamily:"var(--fb)", fontSize:11, fontWeight:800, color:"#92400E", whiteSpace:"nowrap" }}>⚖️ Decision Gate</div>
                  <div style={{ fontFamily:"var(--fb)", fontSize:9.5, color:"#B45309", marginTop:2, whiteSpace:"nowrap" }}>Match & Compliance</div>
                </div>
              </Tip>
            </div>
          </Lane>

          <VArrow color="#94A3B8" step={6} />

          {/* ══ ROW 4: SPLIT — STP + EXCEPTION ══ */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>

            {/* STP path */}
            <Lane color={C.emerald} label="✅ STP Path — Auto">
              <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
                <Chip id="autopost" icon="⚡" label="Auto Posting" color={C.emerald} step={7} side="top" />
              </div>
            </Lane>

            {/* Exception path */}
            <Lane color={C.red} label="⚠️ Exception Path">
              <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:5, flexWrap:"nowrap" }}>
                <Chip id="workorq" icon="🔀" label="Workflow Orchestration" color={C.red} step={8} side="top" />
                <HArrow color={C.red.dot} step={8} />
                <Chip id="excmgmt" icon="🚨" label="Exception Mgmt"        color={C.red} step={9} side="top" />
                <HArrow color={C.red.dot} step={9} />
                <Chip id="human"   icon="👤" label="Human-in-Loop"          color={C.red} step={10} side="top" />
                <HArrow color={C.red.dot} step={10} />
                <Chip id="manpost" icon="📝" label="Manual Posting"         color={C.red} step={10} side="top" />
              </div>
            </Lane>
          </div>

          <VArrow color={C.indigo.dot} step={10} />

          {/* ══ ROW 5: POSTING LAYER ══ */}
          <Lane color={C.indigo} label="Posting Layer — Parallel Options">
            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, flexWrap:"nowrap" }}>
              <Chip id="apipost"  icon="🔗" label="API Auto Posting"      color={C.indigo} step={10} side="top" />
              <div style={{ width:1, height:28, background:"#C7D2FE", flexShrink:0 }} />
              <Chip id="filepost" icon="📂" label="File-Based Scheduling" color={C.indigo} step={10} side="top" />
              <div style={{ width:1, height:28, background:"#C7D2FE", flexShrink:0 }} />
              <Chip id="botpost"  icon="🤖" label="BOT-Based Posting"     color={C.indigo} step={10} side="top" />
              <HArrow color={C.violet.dot} step={10} />
              <Tip id="mastermgmt" color={C.violet} side="top">
                <div style={{
                  background:C.violet.bg, border:`1.5px solid ${C.violet.border}`, borderRadius:9,
                  padding:"7px 12px", cursor:"default", whiteSpace:"nowrap",
                }}>
                  <div style={{ fontFamily:"var(--fb)", fontSize:11, fontWeight:700, color:C.violet.text }}>🗂 Agentic Master Mgmt</div>
                </div>
              </Tip>
            </div>
          </Lane>

          {/* ══ ROW 6: CONTINUOUS OVERSIGHT ══ */}
          <div style={{ background:"#0F172A", borderRadius:14, padding:"14px 16px", border:"1px solid #1E293B", marginTop:2 }}>
            <div style={{ fontSize:9.5, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", color:"#94A3B8", fontFamily:"var(--fb)", marginBottom:10 }}>
              ⟳ Continuous Parallel Oversight
            </div>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, flexWrap:"wrap" }}>
              {[
                { id:"audit",     icon:"📜", label:"Audit Trail",         color:{ border:"#475569", dot:"#64748B", bg:"rgba(255,255,255,.05)", text:"#E2E8F0", light:"transparent" } },
                { id:"notif",     icon:"🔔", label:"Notifications",        color:{ border:"#475569", dot:"#64748B", bg:"rgba(255,255,255,.05)", text:"#E2E8F0", light:"transparent" } },
                { id:"reporting", icon:"📊", label:"AI Active Reporting",  color:{ border:"#475569", dot:"#64748B", bg:"rgba(255,255,255,.05)", text:"#E2E8F0", light:"transparent" } },
                { id:"gcc",       icon:"🏛️", label:"GCC Control Centre",   color:{ border:"#475569", dot:"#64748B", bg:"rgba(255,255,255,.05)", text:"#E2E8F0", light:"transparent" } },
              ].map(({ id, icon, label, color }) => (
                <Tip key={id} id={id} color={{ ...color, border:"#6366F1", dot:"#818CF8" }} side="top">
                  <div style={{
                    display:"flex", alignItems:"center", gap:6,
                    background:"rgba(255,255,255,.05)", border:"1px solid rgba(255,255,255,.1)",
                    borderRadius:9, padding:"7px 12px", cursor:"default",
                    transition:"background .2s, border-color .2s",
                  }}
                    onMouseEnter={e=>{e.currentTarget.style.background="rgba(99,102,241,.15)";e.currentTarget.style.borderColor="rgba(99,102,241,.5)";}}
                    onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,.05)";e.currentTarget.style.borderColor="rgba(255,255,255,.1)";}}
                  >
                    <span style={{ fontSize:14 }}>{icon}</span>
                    <span style={{ fontFamily:"var(--fb)", fontSize:11, fontWeight:600, color:"#E2E8F0", whiteSpace:"nowrap" }}>{label}</span>
                  </div>
                </Tip>
              ))}
            </div>
          </div>

          {/* ══ ROW 7: FOUNDATION ══ */}
          <div style={{ background:"#1E1B4B", borderRadius:14, padding:"11px 16px", border:"1px solid #312E81" }}>
            <div style={{ fontSize:9.5, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", color:"#818CF8", fontFamily:"var(--fb)", marginBottom:8 }}>
              ⚙️ Foundation Layer — Always Active
            </div>
            <div style={{ display:"flex", justifyContent:"center", flexWrap:"wrap", gap:6 }}>
              {["🔒 Security","⚙️ Hyper Configuration","📈 Scalability","✅ Reliability","👁️ Observability"].map(item => (
                <div key={item} style={{ background:"rgba(129,140,248,.12)", border:"1px solid rgba(129,140,248,.28)", borderRadius:20, padding:"4px 12px", fontSize:11, fontWeight:600, color:"#C7D2FE", fontFamily:"var(--fb)" }}>{item}</div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function IPArchitecture() {
  const w = useWidth(); const isMobile = w < 640;
  const ref = useReveal();
  return (
    <section style={{ background:"var(--slp)", padding: isMobile ? "64px 20px" : "clamp(64px,9vh,104px) 5vw" }}>
      <div style={{ maxWidth:1080, margin:"0 auto" }}>
        <div className="reveal" ref={ref}>
          <Eyebrow>Architecture</Eyebrow>
          <h2 style={{ fontFamily:"var(--fb)", fontSize: isMobile ? "clamp(22px,6vw,32px)" : "clamp(26px,3vw,40px)", fontWeight:700, letterSpacing:"-.04em", lineHeight:1.06, color:"#0F172A", marginBottom:12 }}>
            Architecture for Invoice<br />Processing Automation
          </h2>
          <p style={{ fontSize:15, color:"#64748B", lineHeight:1.7, fontFamily:"var(--fb)", maxWidth:520, marginBottom: isMobile ? 32 : 44 }}>
            A fully integrated pipeline — from invoice capture to ERP posting — with AI at every step.
          </p>

          <IPArchDiagram />

        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════
   3. AI AGENTS — same card-grid design
════════════════════════════════════ */
function IPAIAgents() {
  const w = useWidth(); const isMobile = w < 640; const isTablet = w < 900;
  const [active, setActive] = useState(0);
  const ag = ipAgents[active];
  const ref = useReveal();
  return (
    <section style={{ background:"linear-gradient(160deg,#0F0C2A 0%,#1a1260 45%,#221868 100%)", position:"relative", overflow:"hidden", padding: isMobile ? "64px 20px" : "clamp(64px,9vh,104px) 5vw" }}>
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", backgroundImage:"radial-gradient(rgba(255,255,255,.04) 1px,transparent 1px)", backgroundSize:"26px 26px" }} />
      <div style={{ position:"absolute", top:0, right:"10%", width:"40%", height:"60%", background:"radial-gradient(ellipse, rgba(99,32,224,.2) 0%, transparent 65%)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:0, left:"5%", width:"35%", height:"50%", background:"radial-gradient(ellipse, rgba(245,166,35,.08) 0%, transparent 65%)", pointerEvents:"none" }} />
      <div style={{ maxWidth:1080, margin:"0 auto", position:"relative", zIndex:1 }}>
        <div className="reveal" ref={ref}>
          <div style={{ marginBottom: isMobile ? 36 : 52 }}>
            <Eyebrow dark>AI Agents</Eyebrow>
            <h2 style={{ fontFamily:"var(--fb)", fontSize: isMobile ? "clamp(24px,6vw,34px)" : "clamp(28px,3.5vw,46px)", letterSpacing:"-.04em", lineHeight:1.0, background:"linear-gradient(95deg,#fff 0%,#fff 30%,#F5D060 62%,#F5A623 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", fontWeight:900, marginBottom:14 }}>
              Every Invoice Checked.<br />Every Risk Controlled.
            </h2>
            <p style={{ fontSize: isMobile ? 14.5 : 16, color:"rgba(255,255,255,.45)", lineHeight:1.72, fontFamily:"var(--fb)", maxWidth:520 }}>
              Purpose-built AI agents working in sequence — so invoices arrive clean, matched, and compliant.
            </p>
          </div>

          {/* 3 cards */}
          <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap:12, marginBottom:20 }}>
            {ipAgents.map((a,i)=>{
              const isAct = active===i;
              return (
                <div key={a.title} onClick={()=>setActive(i)} style={{ position:"relative", overflow:"hidden", borderRadius:18, cursor:"pointer", border: isAct ? "1.5px solid rgba(255,255,255,.7)" : "1.5px solid rgba(255,255,255,.08)", background: isAct ? "rgba(255,255,255,.18)" : "rgba(255,255,255,.04)", padding: isMobile ? "22px 18px" : "28px 24px", backdropFilter:"blur(10px)", transition:"all .25s cubic-bezier(.22,1,.36,1)", boxShadow: isAct ? "0 8px 32px rgba(255,255,255,.15), 0 0 0 1px rgba(255,255,255,.2) inset" : "none", transform: isAct ? "translateY(-2px)" : "none" }}
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

          {/* Detail strip */}
          <div style={{ background:"rgba(255,255,255,.12)", border:"1.5px solid rgba(255,255,255,.35)", borderRadius:14, padding: isMobile ? "18px 16px" : "20px 28px", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:14, backdropFilter:"blur(12px)", boxShadow:"0 4px 24px rgba(255,255,255,.08)" }}>
            <div style={{ display:"flex", alignItems:"center", gap:12, flexShrink:0 }}>
              <div style={{ width:38, height:38, borderRadius:11, background:"rgba(255,255,255,.2)", border:"1.5px solid rgba(255,255,255,.4)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 }}>{ag.icon}</div>
              <div>
                <div style={{ fontSize:11, fontWeight:700, color:"rgba(255,255,255,.6)", fontFamily:"var(--fb)", letterSpacing:".06em", textTransform:"uppercase", marginBottom:2 }}>Active Agent</div>
                <div style={{ fontSize:14, fontWeight:700, color:"#fff", fontFamily:"var(--fb)", letterSpacing:"-.02em" }}>{ag.title}</div>
              </div>
            </div>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              {([
                [["📝","Zero Manual Data Entry"],["✅","Reduced Processing Errors"],["🔍","Automated Field Verification"]],
                [["🎯","Intelligent Variance Detection"],["⚡","Straight-Through Invoice Processing"],["🔒","Audit-Ready Match Controls"]],
                [["🛡","ITC Risk Prevention"],["📉","Reduced Audit Exposure"],["✅","Pre-Posting Compliance Controls"]],
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
   4. FEATURES — tabbed selector layout
════════════════════════════════════ */
function IPFeatures() {
  const w = useWidth(); const isMobile = w < 640; const isTablet = w < 900;
  const ref = useReveal();

  const features = [
    { icon:"🗂", color:"#6320E0", tag:"Classification",   title:"Intelligent Classification",        desc:"Auto-detects PO, Non-PO, Service, Recurring, and Credit/Debit Notes — invoices enter the right workflow instantly, zero manual sorting." },
    { icon:"📥", color:"#0369A1", tag:"Intake",           title:"Invoice Intake, Any Channel",        desc:"Email, portal, API — vendors submit invoices however they prefer, without learning a new system or adjusting to rigid formats." },
    { icon:"🔄", color:"#DB2777", tag:"Exceptions",       title:"Exception Handling",                 desc:"Platform explains mismatches, shows what's missing, and routes to the right team automatically — no email threads, no delays." },
    { icon:"🔒", color:"#D97706", tag:"Fraud Prevention", title:"Duplicate Detection",                desc:"Flags suspicious or repeated invoices the moment they enter — eliminating double payments, fraud risks, and month-end surprises before they cost you." },
    { icon:"⚡", color:"#059669", tag:"Approvals",        title:"Approvals That Move Themselves",     desc:"Smart rules push invoices to the right approver by value, department, plant, or PO owner — no manual nudges, no blockers." },
    { icon:"🏦", color:"#7C3AED", tag:"ERP Posting",      title:"Clean, Verified ERP Posting",        desc:"Every validated invoice posts into SAP, Oracle, Dynamics 365, or any ERP with full accuracy — clean books, every month-end." },
    { icon:"📋", color:"#0F766E", tag:"Audit",            title:"Audit Trails, Instant Answers",      desc:"Every match, comment, and decision captured with timestamps — audit queries that once took days now resolved in minutes." },
  ];

  /* Layout: row 1 = 3 cards, row 2 = 2 cards, row 3 = 2 cards */
  const rows = [features.slice(0,3), features.slice(3,5), features.slice(5,7)];

  const Card = ({ f, wide }) => (
    <div style={{
      background:"#fff",
      borderRadius:16,
      border:"1px solid #F1F5F9",
      padding: isMobile ? "20px 16px" : wide ? "28px 28px" : "22px 22px",
      display:"flex", flexDirection:"column", gap:12,
      boxShadow:"0 1px 4px rgba(0,0,0,.04)",
      transition:"all .2s cubic-bezier(.22,1,.36,1)",
      cursor:"default", position:"relative", overflow:"hidden",
    }}
      onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow=`0 8px 28px ${f.color}14`; e.currentTarget.style.borderColor=`${f.color}30`; }}
      onMouseLeave={e=>{ e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow="0 1px 4px rgba(0,0,0,.04)"; e.currentTarget.style.borderColor="#F1F5F9"; }}
    >
      {/* Coloured left edge bar */}
      <div style={{ position:"absolute", top:0, left:0, bottom:0, width:3, background:`linear-gradient(180deg,${f.color},${f.color}44)`, borderRadius:"16px 0 0 16px" }} />

      {/* Icon + tag row */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", paddingLeft:10 }}>
        <div style={{ width:40, height:40, borderRadius:11, background:`${f.color}0f`, border:`1px solid ${f.color}20`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:19 }}>{f.icon}</div>
        <span style={{ fontSize:9.5, fontWeight:700, letterSpacing:".07em", textTransform:"uppercase", color:f.color, background:`${f.color}0e`, border:`1px solid ${f.color}22`, borderRadius:100, padding:"2px 9px", fontFamily:"var(--fb)" }}>{f.tag}</span>
      </div>

      {/* Title + desc */}
      <div style={{ paddingLeft:10 }}>
        <h3 style={{ fontFamily:"var(--fb)", fontSize: wide ? 17 : 15.5, fontWeight:700, color:"#0F172A", letterSpacing:"-.02em", lineHeight:1.25, marginBottom:7 }}>{f.title}</h3>
        <p style={{ fontSize: wide ? 14 : 13, color:"#64748B", lineHeight:1.68, fontFamily:"var(--fb)", margin:0 }}>{f.desc}</p>
      </div>
    </div>
  );

  return (
    <section id="features" style={{ background:"#fff", padding: isMobile ? "64px 20px" : "clamp(64px,9vh,104px) 5vw" }}>
      <div style={{ maxWidth:1080, margin:"0 auto" }}>

        {/* Header */}
        <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", flexWrap:"wrap", gap:16, marginBottom: isMobile ? 32 : 44 }}>
          <div>
            <Eyebrow>Features</Eyebrow>
            <h2 style={{ fontFamily:"var(--fb)", fontSize: isMobile ? "clamp(22px,6vw,32px)" : "clamp(26px,3vw,40px)", fontWeight:700, letterSpacing:"-.04em", lineHeight:1.06, color:"#0F172A", marginBottom:8 }}>
              Seven capabilities.<br />One invoice. Zero effort.
            </h2>
            <p style={{ fontSize:14.5, color:"#64748B", lineHeight:1.7, fontFamily:"var(--fb)", maxWidth:460, margin:0 }}>Every feature removes a specific bottleneck from your invoice workflow.</p>
          </div>

        </div>

        {/* Grid rows */}
        <div className="reveal" ref={ref} style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {rows.map((row, ri) => (
            <div key={ri} style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : `repeat(${row.length},1fr)`, gap:12 }}>
              {row.map(f => <Card key={f.title} f={f} wide={row.length === 2} />)}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

function IPVideo() {
  const w = useWidth(); const isMobile = w < 640; const isTablet = w < 900;
  const ref = useReveal();

  const gridStats = [
    {
      val:"3×",     sub:"more invoices same team",
      title:"Scale without headcount",
      desc:"Process 3× more invoices with the same team — or reduce AP effort by up to 70%.",
    },
    {
      val:"~0%",    sub:"intervention needed",
      title:"Near straight-through processing",
      desc:"Move from 1 in 3 invoices needing manual touch to near-zero exceptions.",
    },
    {
      val:"80%",    sub:"less audit effort",
      title:"Audit-ready, always",
      desc:"Cut audit effort by 80% while eliminating compliance risks with a full digital trail.",
    },
    {
      val:"100%",   sub:"real-time visibility",
      title:"No month-end surprises",
      desc:"Eliminate blind spots with 100% real-time liability visibility across every payable.",
    },
  ];

  const bottomStat = {
    val:"1–2",  sup:"%",
    sub:"of working capital freed",
    title:"Working capital freed up through precise payment control",
    desc:"Stop leaving money on the table. Precise payment timing unlocks 1–2% of working capital — without renegotiating a single contract.",
  };

  const StatBar = ({ color }) => (
    <div style={{ marginTop:"auto", paddingTop:16 }}>
      <div style={{ height:2, borderRadius:1, background:`linear-gradient(90deg,${color},${color}66,rgba(255,255,255,.06))` }} />
    </div>
  );

  return (
    <section style={{
      background:"linear-gradient(160deg,#0F0C2A 0%,#1a1260 45%,#221868 100%)",
      padding: isMobile ? "64px 20px" : "clamp(64px,9vh,104px) 5vw",
      position:"relative", overflow:"hidden",
    }}>
      {/* Same dot grid + glow as AI Agents */}
      <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(rgba(255,255,255,.04) 1px,transparent 1px)", backgroundSize:"26px 26px", pointerEvents:"none" }} />
      <div style={{ position:"absolute", top:0, right:"10%", width:"40%", height:"60%", background:"radial-gradient(ellipse, rgba(99,32,224,.2) 0%, transparent 65%)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:0, left:"5%", width:"35%", height:"50%", background:"radial-gradient(ellipse, rgba(245,166,35,.08) 0%, transparent 65%)", pointerEvents:"none" }} />

      <div style={{ maxWidth:1080, margin:"0 auto", position:"relative", zIndex:1 }}>
        <div className="reveal" ref={ref}>

          {/* Eyebrow + heading — matching all other sections */}
          <div style={{ marginBottom: isMobile ? 32 : 48 }}>
            <Eyebrow dark>Business Impact</Eyebrow>
            <h2 style={{
              fontFamily:"var(--fb)", fontWeight:700,
              fontSize: isMobile ? "clamp(24px,6vw,34px)" : "clamp(28px,3.5vw,44px)",
              letterSpacing:"-.04em", lineHeight:1.05,
              color:"#fff", margin:0,
            }}>
              Real impact,{" "}
              <em style={{ fontStyle:"normal", fontWeight:900, background:"linear-gradient(95deg,#fff 0%,#fff 30%,#F5D060 62%,#F5A623 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>real numbers.</em>
            </h2>
          </div>

          {/* Main card */}
          <div style={{
            background:"rgba(255,255,255,.05)",
            border:"1px solid rgba(255,255,255,.1)",
            borderRadius:20,
            overflow:"hidden",
          }}>

            {/* 2×2 grid */}
            <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr" }}>
              {gridStats.map((s, i) => (
                <div key={s.title} style={{
                  padding: isMobile ? "28px 24px" : "36px 36px",
                  display:"flex", flexDirection:"column",
                  borderRight: !isMobile && i % 2 === 0 ? "1px solid rgba(255,255,255,.1)" : "none",
                  borderBottom: i < 2 ? "1px solid rgba(255,255,255,.1)" : "none",
                }}>
                  <div style={{ display:"grid", gridTemplateColumns:"120px 1fr", gap:"0 20px", alignItems:"start", flex:1 }}>
                    {/* Left: metric */}
                    <div>
                      <div style={{ fontFamily:"var(--fb)", fontWeight:900, fontSize: isMobile ? 38 : 46, lineHeight:1, letterSpacing:"-.04em", color:"#F5A623" }}>{s.val}</div>
                      <div style={{ fontSize:11, color:"rgba(255,255,255,.35)", fontFamily:"var(--fb)", lineHeight:1.4, marginTop:5, whiteSpace:"pre-line" }}>{s.sub}</div>
                    </div>
                    {/* Right: title + desc */}
                    <div>
                      <div style={{ fontFamily:"var(--fb)", fontSize: isMobile ? 15 : 16.5, fontWeight:700, color:"#fff", letterSpacing:"-.02em", lineHeight:1.25, marginBottom:8 }}>{s.title}</div>
                      <div style={{ fontSize:13.5, color:"rgba(255,255,255,.45)", fontFamily:"var(--fb)", lineHeight:1.65 }}>{s.desc}</div>
                    </div>
                  </div>
                  <StatBar color="var(--p400)" />
                </div>
              ))}
            </div>

            {/* Full-width bottom row */}
            <div style={{
              borderTop:"1px solid rgba(255,255,255,.1)",
              padding: isMobile ? "28px 24px" : "32px 36px",
              display:"grid",
              gridTemplateColumns: isMobile ? "1fr" : "auto 1px 1fr",
              gap: isMobile ? 20 : 40,
              alignItems:"center",
            }}>
              {/* Stat — same treatment as grid cells */}
              <div style={{ minWidth:160 }}>
                <div style={{ display:"flex", alignItems:"baseline", gap:0 }}>
                  <div style={{ fontFamily:"var(--fb)", fontWeight:900, fontSize: isMobile ? 40 : 50, lineHeight:1, letterSpacing:"-.04em", color:"#F5A623" }}>{bottomStat.val}</div>
                  <span style={{ fontFamily:"var(--fb)", fontWeight:900, fontSize: isMobile ? 22 : 26, color:"#F5A623", lineHeight:1 }}>{bottomStat.sup}</span>
                </div>
                <div style={{ fontSize:11, color:"rgba(255,255,255,.35)", fontFamily:"var(--fb)", lineHeight:1.4, marginTop:5 }}>{bottomStat.sub}</div>
              </div>

              {/* Vertical divider */}
              {!isMobile && <div style={{ width:1, alignSelf:"stretch", background:"rgba(255,255,255,.1)" }} />}

              {/* Title + desc */}
              <div>
                <div style={{ fontFamily:"var(--fb)", fontSize: isMobile ? 16 : 18, fontWeight:700, color:"#fff", letterSpacing:"-.02em", lineHeight:1.25, marginBottom:10 }}>{bottomStat.title}</div>
                <div style={{ fontSize:14, color:"rgba(255,255,255,.45)", fontFamily:"var(--fb)", lineHeight:1.7, maxWidth:520 }}>{bottomStat.desc}</div>
                <StatBar color="var(--p400)" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

function IPFAQs({ onNavigate }) {
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
            <p style={{ fontSize:15, color:"#64748B", lineHeight:1.7, fontFamily:"var(--fb)", marginBottom:28 }}>Everything about Invoice Processing Automation, answered.</p>
            <a
              href="/getstarted"
              onClick={(e) => {
                e.preventDefault();
                if (typeof onNavigate === "function") onNavigate("getstarted");
              }}
              style={{ display:"inline-flex", alignItems:"center", gap:6, fontSize:14, fontWeight:600, color:"var(--p600)", fontFamily:"var(--fb)", textDecoration:"none", borderBottom:"1.5px solid var(--p200)", paddingBottom:2, cursor:"pointer" }}
              onMouseEnter={e=>{ e.currentTarget.style.color="var(--p700)"; e.currentTarget.style.borderColor="var(--p400)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.color="var(--p600)"; e.currentTarget.style.borderColor="var(--p200)"; }}
            >Talk to our team →</a>
          </div>
          <div style={{ borderTop:"1px solid #E2E8F0" }}>
            {ipFaqs.map((f,i)=>(
              <IPFAQItem key={i} f={f} isOpen={open===i} onToggle={()=>setOpen(open===i ? null : i)} isMobile={isMobile} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Invoice Processing bottom CTA → WordPress resource */
const IP_CTA_RESOURCE_HREF = "/resources/invoice-management-for-enterprises";

/* ════════════════════════════════════
   7. CTA — matches homepage FinalCTA
════════════════════════════════════ */
function IPCTA() {
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
          9 Ways to Transform Invoice Management for Enterprises
        </h2>

        <p style={{
          fontSize: isMobile ? 14 : 16, color:"rgba(255,255,255,.52)",
          lineHeight:1.75, fontFamily:"var(--fb)",
          margin:"0 auto 40px", maxWidth:640,
        }}>
          Learn how leading organizations accelerate invoice approvals, eliminate manual bottlenecks, strengthen controls, and transform accounts payable into a strategic business function.
        </p>

        <a
          href={IP_CTA_RESOURCE_HREF}
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
export default function InvoiceProcessingPage({ onBack, onNavigate }) {
  return (
    <>
      <Nav onNavigate={onNavigate} onBack={onBack} pageName="Invoice Processing Automation" />
      <main>
        <IPHero onNavigate={onNavigate} />
        <IPArchitecture />
        <IPAIAgents />
        <IPFeatures />
        <IPVideo />
        <IPFAQs onNavigate={onNavigate} />
        <IPCTA />
      </main>
      <VDDFooter onNavigate={onNavigate} />
    </>
  );
}
