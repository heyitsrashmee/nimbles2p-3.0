"use client";

import { useState, useEffect, useLayoutEffect, useRef, useCallback, Fragment } from "react";
import { usePathname, useRouter } from "next/navigation";
import TermsPage from "./NimbleS2PTerms";
import ResourcesPage from "./ResourcesPage";
import VDDAnimation from "@gifs/VDDAnimation";
import RFQAgentDemo from "@gifs/RFQAgent";
import SupplierPortalAnimation from "@gifs/SupplierPortalAnimation";
import InvoiceProcessingDemo from "@gifs/InvoiceProcessing";
import SupplierAnalyticsDemo from "@gifs/SupplierAnalytics";
import { assetUrl } from "@/lib/assetUrl";
import { CUSTOMER_LOGOS, customerLogoPath } from "@/lib/customerLogos";
import { useSiteNavigation } from "@/lib/siteNavigation";
import WhyNimblePage from "./WhyNimblePage";
import PricingPage from "./PricingPage";
import VendorDueDiligencePage from "./VendorDueDiligencePage";
import SupplierPortalPage from "./SupplierPortalPage";
import InvoiceProcessingPage from "./InvoiceProcessingPage";
import RFQManagementPage from "./RFQManagementPage";
import BookDemoPage from "./BookDemoPage";
import SupplierAnalyticsPage from "./SupplierAnalyticsPage";
import EarlyFinancingPage from "./EarlyFinancingPage";
import GetStartedPage from "./GetStartedPage";
import BlogPostPage from "./BlogPostPage";

import { Nav } from "@/components/layout/SiteNav";
import { VDDFooter } from "@/components/layout/VDDFooter";
import { useReveal, useWidth, Eyebrow } from "@/components/shared/pageUi";


/* ─────────────────────────────────────────
   HOOKS
───────────────────────────────────────── */

function H2({ children, center, inv, mb }) {
  return (
    <h2 style={{ fontFamily:"var(--fb)", fontSize:"clamp(24px,4vw,44px)", fontWeight:800, lineHeight:1.1, letterSpacing:"-.025em", color: inv ? "#fff" : "var(--t1)", marginBottom: mb ?? 16, textAlign: center ? "center" : "left" }}>
      {children}
    </h2>
  );
}

function SubP({ children, center, inv, maxW }) {
  return (
    <p style={{ fontSize:"clamp(14px,1.5vw,17px)", color: inv ? "rgba(255,255,255,.5)" : "var(--t3)", maxWidth: maxW ?? 520, lineHeight:1.7, fontFamily:"var(--fb)", margin: center ? "0 auto" : undefined }}>
      {children}
    </p>
  );
}

/* ─────────────────────────────────────────
   HERO
───────────────────────────────────────── */
function Hero({ onNavigate }) {
  const w = useWidth();
  const isMobile  = w < 480;
  const isTablet  = w < 860;

  const avatars = [
    {initials:"RP",bg:"#C0392B"},{initials:"SK",bg:"#E67E22"},
    {initials:"AN",bg:"#16A085"},{initials:"LP",bg:"#8E44AD"},{initials:"DW",bg:"#2980B9"},
  ];

  const statsData = [
    ["$11","B+","WORTH OF TRANSACTIONS"],
    ["1","M+","SUPPLIERS ONBOARDED"],
    ["600","M+","ENTERPRISE ACTIONS"],
    ["10","x","FASTER DUE DILIGENCE"],
  ];

  const pills = [
    {label:"21 minutes onboarding", dot:"#F5A623", border:"rgba(245,166,35,.38)", color:"#F5C060"},
    {label:"100% compliance",  dot:"#34D399", border:"rgba(52,211,153,.32)", color:"#6EE7B7"},
    {label:"Live in 8 weeks",  dot:null,      border:"rgba(167,139,250,.3)", color:"#C4B5FD"},
  ];

  return (
    <section style={{
      minHeight:"100vh",
      background:"linear-gradient(140deg,#14104A 0%,#1E1660 40%,#261d6b 70%,#1a1258 100%)",
      position:"relative",
      overflow:"hidden",
      display:"flex",
      flexDirection:"column",
      alignItems:"center",
      justifyContent:"center",
      padding: isMobile ? "110px 20px 64px" : "128px 5vw 80px",
      textAlign:"center",
    }}>

      {/* Background — matches VDD exactly */}
      <div style={{ position:"absolute", inset:0, pointerEvents:"none",
        background:"radial-gradient(ellipse 90% 70% at 50% 35%, rgba(99,32,224,.32) 0%, transparent 65%)" }} />
      <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"50%", pointerEvents:"none",
        background:"radial-gradient(ellipse 80% 60% at 50% 100%, rgba(245,166,35,.09) 0%, transparent 70%)" }} />
      <div style={{ position:"absolute", inset:0, pointerEvents:"none",
        backgroundImage:"radial-gradient(rgba(255,255,255,.045) 1px,transparent 1px)",
        backgroundSize:"30px 30px" }} />
      <div style={{ position:"absolute", top:72, left:0, right:0, height:1, pointerEvents:"none",
        background:"linear-gradient(90deg,transparent,rgba(255,255,255,.08) 30%,rgba(255,255,255,.08) 70%,transparent)" }} />

      {/* ── CONTENT COLUMN — maxWidth:860 matches VDD ── */}
      <div style={{
        position:"relative", zIndex:2,
        width:"100%", maxWidth:860,
        display:"flex", flexDirection:"column", alignItems:"center",
      }}>


        {/* 2. HEADLINE — VDD: clamp(44px,5.2vw,72px), lineHeight:.98, letterSpacing:-.05em, marginBottom:22 */}
        <h1 className="fade-up d1" style={{
          fontFamily:"var(--fb)", fontWeight:900,
          fontSize: isMobile ? "clamp(27px,7.7vw,40px)" : "clamp(40px,4.7vw,65px)",
          lineHeight:1.08,
          letterSpacing:"-.05em",
          marginBottom:22,
          background:"linear-gradient(95deg,#fff 0%,#fff 30%,#F5D060 62%,#F5A623 100%)",
          WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
          paddingBottom:"0.12em",
        }}>
          <span style={{ display:"block" }}>Purpose Built for Suppliers,</span>
          <span style={{ display:"block" }}>Procurement &amp; Payables</span>
        </h1>

        {/* 3. SUBHEADLINE */}
        <p className="fade-up d2" style={{
          fontSize: isMobile ? 15 : 17.5,
          color:"rgba(255,255,255,.52)",
          lineHeight:1.72, fontFamily:"var(--fb)", fontWeight:400,
          maxWidth:620, margin:"0 auto 36px",
        }}>
          NimbleS2P is a compliance-first AI platform designed around how enterprises actually work — supplier-heavy, process-intensive, approval-driven, and audit-sensitive.
        </p>

        {/* 4. CTAs — VDD: gap:12, marginBottom:56, padding:14px 34px, borderRadius:12, fontSize:16 */}
        <div className="fade-up d3" style={{
          display:"flex", gap:12,
          justifyContent:"center",
          flexWrap:"wrap",
          marginBottom:56,
        }}>
          <a href="#"
            onClick={e=>{ e.preventDefault(); if(typeof onNavigate==="function") onNavigate("getstarted"); }}
            style={{
              display:"inline-flex", alignItems:"center", justifyContent:"center", gap:8,
              background:"linear-gradient(135deg,#E8920A,#F5B020)", color:"#fff",
              borderRadius:12, padding: isMobile ? "13px 28px" : "14px 34px",
              fontSize: isMobile ? 15 : 16, fontWeight:700,
              textDecoration:"none", fontFamily:"var(--fb)", letterSpacing:"-.01em",
              boxShadow:"0 6px 32px rgba(232,150,10,.52)",
              transition:"transform .2s, box-shadow .2s",
              width: isMobile ? "100%" : "auto",
            }}
            onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 14px 44px rgba(232,150,10,.65)";}}
            onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="0 6px 32px rgba(232,150,10,.52)";}}
          >Get Started →</a>
          
        </div>

        {/* 5. STATS — VDD style, no spacer needed (marginBottom:56 on CTAs covers it) */}
        <div className="fade-up d4" style={{
          display:"grid", gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(4,1fr)",
          gap:1,
          background:"rgba(255,255,255,.07)", border:"1px solid rgba(255,255,255,.1)",
          borderRadius:16, overflow:"hidden", backdropFilter:"blur(12px)",
          width:"100%",
        }}>
          {statsData.map(([main,sup,label],i)=>(
            <div key={label} style={{
              padding: isMobile ? "18px 12px" : "22px 16px", textAlign:"center",
              borderRight: i < statsData.length-1 && !(isMobile && i%2===1) ? "1px solid rgba(255,255,255,.08)" : "none",
              borderBottom: isMobile && i < 2 ? "1px solid rgba(255,255,255,.08)" : "none",
            }}>
              <div style={{ fontFamily:"var(--fb)", fontWeight:900, color:"#fff", letterSpacing:"-.04em", lineHeight:1, display:"inline-flex", alignItems:"flex-start", gap:1 }}>
                <span style={{ fontSize: isMobile ? 24 : 30 }}>{main}</span>
                <span style={{ fontSize: isMobile ? 13 : 15, fontWeight:800, lineHeight:1, marginTop: isMobile ? 3 : 4, opacity:.85 }}>{sup}</span>
              </div>
              <div style={{ fontSize:11, fontWeight:600, letterSpacing:".08em", textTransform:"uppercase", color:"rgba(255,255,255,.35)", marginTop:6, fontFamily:"var(--fb)" }}>{label}</div>
            </div>
          ))}
        </div>

        {/* 6. TRUST STRIP */}
        <div className="fade-up d4" style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:10, padding: isMobile ? "10px 4px" : "10px 4px", marginTop:10, width:"100%" }}>
          <div style={{ display:"flex" }}>
            {[{bg:"#C0392B",i:"RP"},{bg:"#16A085",i:"SK"},{bg:"#8E44AD",i:"AN"},{bg:"#2980B9",i:"LP"},{bg:"#E67E22",i:"DW"}].map((a,idx)=>(
              <div key={a.i} style={{ width: isMobile ? 26 : 28, height: isMobile ? 26 : 28, borderRadius:"50%", background:a.bg, border:"2px solid rgba(16,9,48,.85)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"var(--fb)", fontSize: isMobile ? 7.5 : 8, fontWeight:700, color:"#fff", marginLeft: idx>0 ? -7 : 0, position:"relative", zIndex:5-idx }}>{a.i}</div>
            ))}
          </div>
          <span style={{ fontSize: isMobile ? 11 : 12.5, color:"rgba(255,255,255,.42)", fontFamily:"var(--fb)" }}>
            Trusted across <strong style={{ color:"rgba(255,255,255,.82)", fontWeight:600 }}>9+ strategic industry verticals</strong> around the world
          </span>
        </div>

      </div>

      {/* Wave — matches VDD */}
      <div style={{ position:"absolute", bottom:0, left:0, right:0, height:48, overflow:"hidden", pointerEvents:"none" }}>
        <svg viewBox="0 0 1440 48" preserveAspectRatio="none" style={{ position:"absolute", bottom:0, left:0, width:"200%", height:"100%", animation:"waveSlide 10s linear infinite" }}>
          <path d="M0,24 C240,6 480,40 720,24 C960,8 1200,40 1440,24 L1440,48 L0,48 Z" fill="rgba(255,255,255,.05)" />
        </svg>
        <div style={{ position:"absolute", bottom:0, left:0, right:0, height:1, background:"linear-gradient(90deg,transparent,rgba(255,255,255,.1) 30%,rgba(255,255,255,.1) 70%,transparent)" }} />
      </div>

    </section>
  );
}


const WORKFLOW_DEFAULT = { w: 1394, h: 732, fit: "cover" };
const WORKFLOW_LAYOUTS = {
  vdd: { fit: "fill" },
  rfq: { fit: "fill" },
  supplier: { fit: "fill", zoom: 1.12 },
  invoice: { fit: "fill" },
  analytics: { fit: "fill" },
};

const WORKFLOW_DEMOS = {
  vdd: VDDAnimation,
  rfq: RFQAgentDemo,
  supplier: SupplierPortalAnimation,
  invoice: InvoiceProcessingDemo,
  analytics: SupplierAnalyticsDemo,
};

function ScaledWorkflowDemo({ modId }) {
  const wrapRef = useRef(null);
  const [scale, setScale] = useState(0.4);
  const Demo = WORKFLOW_DEMOS[modId];
  const layout = WORKFLOW_LAYOUTS[modId] || WORKFLOW_DEFAULT;
  const fit = layout.fit || WORKFLOW_DEFAULT.fit;
  const workflowW = layout.w ?? WORKFLOW_DEFAULT.w;
  const workflowH = layout.h ?? WORKFLOW_DEFAULT.h;

  useEffect(() => {
    if (fit === "fill") return;
    const el = wrapRef.current;
    if (!el) return;
    const measure = () => {
      const { width, height } = el.getBoundingClientRect();
      if (width < 8 || height < 8) return;
      const sx = width / workflowW;
      const sy = height / workflowH;
      const s = fit === "contain" ? Math.min(sx, sy) : Math.max(sx, sy);
      setScale(Math.max(0.12, s));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [modId, workflowW, workflowH, fit]);

  if (!Demo) return null;

  const shellStyle = {
    width: "100%",
    height: "100%",
    minHeight: 0,
    overflow: "hidden",
    background: "#F8FAFC",
  };

  if (fit === "fill") {
    const zoom = layout.zoom ?? 1;
    return (
      <div
        ref={wrapRef}
        style={{
          ...shellStyle,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: zoom > 1 ? `${100 / zoom}%` : "100%",
            height: zoom > 1 ? `${100 / zoom}%` : "100%",
            minWidth: 0,
            minHeight: 0,
            transform: zoom !== 1 ? `scale(${zoom})` : undefined,
            transformOrigin: "center center",
          }}
        >
          <Demo />
        </div>
      </div>
    );
  }

  const scaledW = workflowW * scale;
  const scaledH = workflowH * scale;

  return (
    <div
      ref={wrapRef}
      style={{
        ...shellStyle,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ width: scaledW, height: scaledH, overflow: "hidden", flexShrink: 0 }}>
        <div
          style={{
            width: workflowW,
            height: workflowH,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          <Demo />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   LOGO MARQUEE
───────────────────────────────────────── */
const LOGOS = CUSTOMER_LOGOS.map(({ label, file }) => ({
  label,
  src: customerLogoPath(file),
}));

/* Each logo tile — logo then trailing divider (divider after every logo = loop seams stay consistent) */
function LogoTile({ logo }) {
  const src = assetUrl(logo.src);
  return (
    <div className="lm-tile">
      <div className="lm-logo">
        <img
          src={src}
          alt={logo.label}
          draggable={false}
          loading="eager"
          decoding="async"
        />
      </div>
      <div className="lm-divider" aria-hidden="true" />
    </div>
  );
}

function LogoMarquee() {
  const trackRef = useRef(null);
  const setRef = useRef(null);

  useLayoutEffect(() => {
    const track = trackRef.current;
    const set = setRef.current;
    if (!track || !set) return;

    const measure = () => {
      const w = set.offsetWidth;
      if (w > 0) track.style.setProperty("--marquee-shift", `${-w}px`);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(set);
    window.addEventListener("resize", measure);

    const imgs = set.querySelectorAll("img");
    const onImg = () => measure();
    imgs.forEach((img) => {
      if (!img.complete) img.addEventListener("load", onImg, { once: true });
      img.addEventListener("error", onImg, { once: true });
    });

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      imgs.forEach((img) => {
        img.removeEventListener("load", onImg);
        img.removeEventListener("error", onImg);
      });
    };
  }, []);

  const renderSet = (keyPrefix) =>
    LOGOS.map((logo) => (
      <LogoTile key={`${keyPrefix}-${logo.label}`} logo={logo} />
    ));

  return (
    <div className="lm-wrap" style={{ position:"relative" }}>

      {/* Fade masks */}
      <div style={{ position:"absolute", top:0, left:0, bottom:0, width:100, zIndex:2, background:"linear-gradient(90deg,#fff,transparent)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", top:0, right:0, bottom:0, width:100, zIndex:2, background:"linear-gradient(270deg,#fff,transparent)", pointerEvents:"none" }} />

      {/* Heading */}
      <div style={{
        textAlign:"center",
        marginBottom:26,
        fontSize:11, fontWeight:700,
        letterSpacing:".14em",
        textTransform:"uppercase",
        color:"#1E3A5F",
        fontFamily:"var(--fb)",
      }}>
        The CFO's #1 Choice — Powering 1M+ suppliers across enterprises
      </div>

      {/* Two identical sets; pixel-accurate --marquee-shift = seamless loop */}
      <div className="lm-track" ref={trackRef}>
        <div className="lm-set" ref={setRef}>
          {renderSet("a")}
        </div>
        <div className="lm-set" aria-hidden="true">
          {renderSet("b")}
        </div>
      </div>
    </div>
  );
}



/* ─────────────────────────────────────────
   PLATFORM MODULES  (replaces How It Works)
───────────────────────────────────────── */
const MODULES = [
  {
    id:"vdd",
    tab:"Supplier Due Diligence",
    tabIcon:"🔍",
    badge:"SUPPLIER DUE DILIGENCE",
    title:"Supplier Due Diligence",
    desc:"Real-time compliance scoring for every supplier and contract — flag risks before they become breaches.",
  },
  {
    id:"rfq",
    tab:"RFQ",
    tabIcon:"☰",
    badge:"AI FOLLOW-UP AGENT",
    title:"RFx Management",
    desc:"AI agent tracks every supplier's response status and nudges them intelligently — so no bid goes missing.",
  },
  {
    id:"supplier",
    tab:"Supplier Portal",
    tabIcon:"👤",
    badge:"SUPPLIER ONBOARDING",
    title:"Supplier Portal",
    desc:"Onboard suppliers in days, not weeks. Automated screening, document collection, and risk profiling.",
  },
  {
    id:"invoice",
    tab:"Invoice Processing",
    tabIcon:"🗒",
    badge:"AP AUTOMATION",
    title:"Invoice Processing",
    desc:"Agentic 2-way and 3-way matching automation for every invoice type — material, service, and non-PO — with enterprise-scale exception management.",
  },
  {
    id:"analytics",
    tab:"Supplier Analytics",
    tabIcon:"📊",
    badge:"SPEND INTELLIGENCE",
    title:"Supplier Analytics",
    desc:"Monitor supplier health, exposure, compliance, and operational performance from one analytics layer",
  },
];


function PlatformUIPanel({ mod }) {
  return (
    <div style={{
      flex: 1, display: "flex", flexDirection: "column",
      height: "100%", background: "#fff", overflow: "hidden",
      minHeight: 0,
    }}>
      <ScaledWorkflowDemo key={mod.id} modId={mod.id} />
    </div>
  );
}

const MOD_COLOURS = {
  vdd:"#231a67", rfq:"#717C89", supplier:"#6DB657",
  invoice:"#1a1a2e", finance:"#E06B72", analytics:"#48A9A6", compliance:"#6366F1",
};

function PlatformModules({ onNavigate }) {
  const [active, setActive] = useState("vdd");
  const mod = MODULES.find(m=>m.id===active) || MODULES[0];
  const ref = useReveal();
  const w = useWidth();
  const isMobile = w < 640;
  const isTablet = w < 960;
  const colour = MOD_COLOURS[active] || "#391085";

  return (
    <section className="sec-pad" style={{ background:"var(--slp)", position:"relative", overflow:"hidden" }}>
      {/* Top accent line */}
      <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:"linear-gradient(90deg,var(--p500),var(--p300),#F59E0B)", pointerEvents:"none" }} />

      <div style={{ maxWidth:1100, margin:"0 auto" }}>

        {/* ── Header ── */}
        <div style={{ marginBottom: isMobile ? 28 : 36 }}>
          <Eyebrow>Platform Modules</Eyebrow>
          <h2 style={{
            fontFamily:"var(--fb)",
            fontSize: isMobile ? "clamp(18px,4.9vw,27px)" : "clamp(25px,2.8vw,39px)",
            fontWeight:700, letterSpacing:"-.04em", lineHeight:1.0,
            color:"#0A0F1E", marginBottom:0,
          }}>
            Agentic Automation Across Every Workflow.
          </h2>
        </div>

        {/* ── TAB BAR — Pricing segmented control style ── */}
        <div style={{
          background:"#fff",
          borderRadius:16,
          border:"1px solid #E2E8F0",
          padding:"6px",
          display:"flex",
          gap:4,
          marginBottom: isMobile ? 16 : 20,
          boxShadow:"0 2px 12px rgba(0,0,0,.06)",
          overflowX:"auto",
          WebkitOverflowScrolling:"touch",
          scrollbarWidth:"none",
        }}>
          {MODULES.map(m=>{
            const isAct = active===m.id;
            const mc = MOD_COLOURS[m.id] || "#391085";
            return (
              <button key={m.id} onClick={()=>setActive(m.id)} style={{
                flex:1,
                display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
                gap:5,
                fontFamily:"var(--fb)",
                fontWeight: isAct ? 700 : 400,
                color: isAct ? "#fff" : "#64748B",
                background: isAct ? mc : "transparent",
                border:"none",
                borderRadius:11,
                padding: isMobile ? "8px 10px" : "10px 12px",
                cursor:"pointer",
                transition:"all .22s cubic-bezier(.22,1,.36,1)",
                boxShadow: isAct ? `0 3px 14px ${mc}44` : "none",
                whiteSpace:"nowrap",
                minWidth: isMobile ? 72 : 100,
              }}>
                <span style={{ fontSize: isMobile ? 16 : 20 }}>{m.tabIcon}</span>
                <span style={{ fontSize: isMobile ? 9 : 11, lineHeight:1.2, textAlign:"center" }}>
                  {isMobile ? m.tab.split(" ")[0] : m.tab}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── MAIN CARD — Pricing card layout ── */}
        <div ref={ref} className="reveal" style={{
          background:"#fff",
          borderRadius:24,
          border:`1.5px solid ${colour}22`,
          boxShadow:`0 8px 48px ${colour}10, 0 2px 8px rgba(0,0,0,.05)`,
          overflow:"hidden",
          display:"grid",
          gridTemplateColumns: isTablet ? "1fr" : "280px 1fr",
          height: isMobile ? "auto" : 560,
          transition:"border-color .25s, box-shadow .25s",
        }}>

          {/* LEFT SIDEBAR — Pricing sidebar style, existing content kept */}
          <div style={{
            background:`linear-gradient(160deg,${colour} 0%,${colour}dd 100%)`,
            padding: isMobile ? "28px 24px" : "40px 32px",
            display:"flex", flexDirection:"column", justifyContent:"space-between",
            position:"relative", overflow:"hidden",
            transition:"background .3s",
          }}>
            <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(rgba(255,255,255,.1) 1px,transparent 1px)", backgroundSize:"18px 18px", pointerEvents:"none" }} />
            <div style={{ position:"absolute", bottom:"-20%", right:"-20%", width:"70%", height:"70%", borderRadius:"50%", background:"rgba(255,255,255,.1)", pointerEvents:"none" }} />

            <div style={{ position:"relative", zIndex:1 }}>
              {/* Badge */}
              <div style={{ display:"inline-flex", alignItems:"center", gap:6, marginBottom:16 }}>
                <span style={{ width:7, height:7, borderRadius:"50%", background:"rgba(255,255,255,.8)", display:"inline-block" }} />
                <span style={{ fontSize:9.5, fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", color:"rgba(255,255,255,.7)", fontFamily:"var(--fb)" }}>{mod.badge}</span>
              </div>
              {/* Icon */}
              <div style={{ fontSize:28, marginBottom:14 }}>{mod.tabIcon}</div>
              {/* Title */}
              <div style={{ fontFamily:"var(--fb)", fontSize: isMobile ? 20 : 24, fontWeight:900, color:"#fff", letterSpacing:"-.03em", lineHeight:1.1, marginBottom:10 }}>{mod.title}</div>
              {/* Desc */}
              <p style={{ fontSize:13, fontWeight:700, color:"rgba(255,255,255,.72)", fontFamily:"var(--fb)", lineHeight:1.65, margin:0 }}>{mod.desc}</p>
            </div>

            {/* CTAs pinned to bottom */}
            <div style={{ position:"relative", zIndex:1, marginTop:28, display:"flex", flexDirection:"column", gap:10 }}>
              <a href="#" style={{
                display:"flex", alignItems:"center", justifyContent:"center",
                background:"#fff", color:colour,
                borderRadius:10, padding:"11px 20px",
                fontSize:13.5, fontWeight:800, textDecoration:"none",
                fontFamily:"var(--fb)", letterSpacing:"-.01em",
                boxShadow:"0 4px 16px rgba(0,0,0,.15)",
                transition:"all .2s",
              }}
                onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-1px)"; e.currentTarget.style.boxShadow="0 8px 24px rgba(0,0,0,.2)"; }}
                onMouseLeave={e=>{ e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow="0 4px 16px rgba(0,0,0,.15)"; }}
              >Know More →</a>
              <a onClick={e=>{ e.preventDefault(); if(typeof onNavigate==="function") onNavigate("getstarted"); }} href="#" style={{
                display:"flex", alignItems:"center", justifyContent:"center",
                background:"rgba(255,255,255,.15)", color:"#fff",
                border:"1px solid rgba(255,255,255,.3)", borderRadius:10,
                padding:"10px 20px", fontSize:13.5, fontWeight:500,
                textDecoration:"none", fontFamily:"var(--fb)",
                transition:"background .18s",
              }}
                onMouseEnter={e=>{ e.currentTarget.style.background="rgba(255,255,255,.25)"; }}
                onMouseLeave={e=>{ e.currentTarget.style.background="rgba(255,255,255,.15)"; }}
              >Get Started →</a>
            </div>
          </div>

          {/* RIGHT — GIF panel, scrollable */}
          <div style={{ display:"flex", flexDirection:"column", overflow:"hidden", height: isMobile ? 420 : "100%" }}>
            {/* Sticky inner header */}
            <div style={{ padding: isMobile ? "16px 20px 12px" : "20px 32px 14px", borderBottom:`1px solid ${colour}14`, display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0 }}>
              <span style={{ fontFamily:"var(--fb)", fontSize:14, fontWeight:700, color:"#0F172A" }}>{mod.tab}</span>
              {mod.id !== "vdd" && (
                <div style={{ display:"inline-flex", alignItems:"center", gap:5, background:`${colour}0e`, border:`1px solid ${colour}22`, borderRadius:100, padding:"4px 12px" }}>
                  <span style={{ width:5, height:5, borderRadius:"50%", background:colour, display:"inline-block" }} />
                  <span style={{ fontSize:11, fontWeight:700, color:colour, fontFamily:"var(--fb)" }}>Live Preview</span>
                </div>
              )}
            </div>

            {/* GIF placeholder — intact */}
            <div style={{ flex:1, overflow:"hidden" }}>
              <PlatformUIPanel mod={mod} />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}



/* ─────────────────────────────────────────
   THE NIMBLE DIFFERENCE
───────────────────────────────────────── */
const DIFF_ROWS = [
  { n:"01", text:"No disconnected agents" },
  { n:"02", text:"No legacy workflows" },
  { n:"03", text:"No siloed automations" },
];

function NimbleDifference() {
  const w = useWidth();
  const isMobile = w < 640;

  return (
    <section className="fold" style={{
      background:"linear-gradient(160deg,#1E1660 0%,#261d6b 40%,#1a1258 100%)",
      position:"relative", overflow:"hidden",
      padding: isMobile ? "52px 20px 62px" : "clamp(62px,9vh,104px) 5vw",
    }}>
      {/* Subtle right-side radial bloom */}
      <div style={{ position:"absolute", top:"-10%", right:"-8%", width:"55%", height:"130%", pointerEvents:"none",
        background:"radial-gradient(ellipse at 80% 40%, rgba(99,32,224,.22) 0%, transparent 65%)"
      }} />

      <div className="sec-inner" style={{ position:"relative", zIndex:1 }}>

        <Eyebrow dark>The Nimble Difference</Eyebrow>

        {/* ── Strikethrough rows ── */}
        <div style={{ marginBottom: isMobile ? 28 : 40 }}>
          {DIFF_ROWS.map((row, i) => {
            const ref = useReveal();
            return (
              <div key={row.n} ref={ref} className="reveal" style={{
                transitionDelay:`${i * 80}ms`,
                borderTop:"1px solid rgba(255,255,255,.1)",
                padding: isMobile ? "14px 0" : "20px 0",
                display:"flex", alignItems:"center",
                gap: isMobile ? 16 : 28,
              }}>
                {/* Number */}
                <span style={{
                  fontFamily:"var(--fm)", fontSize: isMobile ? 10 : 12,
                  fontWeight:500, color:"rgba(255,255,255,.22)",
                  letterSpacing:".04em", flexShrink:0,
                  minWidth: isMobile ? 20 : 28,
                }}>
                  {row.n}
                </span>
                {/* Strikethrough text */}
                <span style={{
                  fontFamily:"var(--fb)", fontWeight:900,
                  fontSize: isMobile
                    ? "clamp(22px,6.5vw,32px)"
                    : "clamp(28px,3.2vw,42px)",
                  lineHeight:1.0, letterSpacing:"-.03em",
                  color:"rgba(255,255,255,.16)",
                  textDecoration:"line-through",
                  textDecorationColor:"rgba(255,255,255,.12)",
                  textDecorationThickness: isMobile ? 2 : 3,
                }}>
                  {row.text}
                </span>
              </div>
            );
          })}
          {/* Closing border */}
          <div style={{ borderTop:"1px solid rgba(255,255,255,.1)" }} />
        </div>

        {/* ── Closing statement ── */}
        {(() => {
          const ref = useReveal();
          return (
            <p ref={ref} className="reveal" style={{
              fontFamily:"var(--fb)", fontWeight:800,
              fontSize: isMobile
                ? "clamp(22px,6.5vw,32px)"
                : "clamp(28px,3.2vw,42px)",
              lineHeight:1.35, letterSpacing:"-.025em",
              color:"#fff",
              maxWidth: isMobile ? "100%" : "90%",
            }}>
              One <span style={{ background:"linear-gradient(95deg,#F5D060,#F5A623)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>hyper-configurable,</span> <span style={{ background:"linear-gradient(95deg,#F5D060,#F5A623)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>domain-aware orchestration</span>{" "}
              built for <span style={{ background:"linear-gradient(95deg,#F5D060,#F5A623)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>high-scale</span>{" "}
              enterprise operations.
            </p>
          );
        })()}

      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   REAL RESULTS  (replaces AI Features)
───────────────────────────────────────── */
const INDUSTRIES = [
  {
    id:"chemical",
    num:"01",
    label:"Chemical",
    tag:"CHEMICAL",
    tagColor:"#717C89",
    imgSrc: "images/chemical.jpg",
    category:"COMPLIANCE MANAGEMENT",
    headline:"Centralized Compliance Verification for Audit-Ready Supplier Governance",
    body:"Automated bulk and single supplier compliance verification through a centralized compliance portal used across vendors and distributors. Replaced heavily manual statutory validation processes with real-time verification workflows, giving audit teams a single, always up-to-date system for compliance tracking, governance, and audit readiness.",
    stats:[
      { val:"90%+",  label:"REDUCTION IN MANUAL VERIFICATION" },
      { val:"1000+", label:"VENDOR CHECKS MONTHLY" },
      { val:"100%",  label:"REAL-TIME COMPLIANCE VISIBILITY" },
    ],
  },
  {
    id:"energy",
    num:"02",
    label:"Energy",
    tag:"ENERGY",
    tagColor:"#48A9A6",
    imgSrc: "images/energy.jpg",
    category:"SOURCING",
    headline:"Transforming RFx Operations with Faster Sourcing & Transparent Comparisons",
    body:"Reduced RFQ creation time by 60% through automated RFx workflows, internal coordination, and supplier communication management. Standardized quote comparison and evaluation processes enabled unbiased sourcing decisions while giving procurement leaders clear visibility into realized savings across every transaction.",
    stats:[
      { val:"60%",  label:"FASTER RFQ CYCLES" },
      { val:"100%", label:"AUTOMATED INTERNAL & SUPPLIER COORDINATION" },
      { val:"100%", label:"TRANSPARENCY IN TRANSACTION LEVEL" },
    ],
  },
  {
    id:"fmcg",
    num:"03",
    label:"FMCG",
    tag:"FMCG",
    tagColor:"#E06B72",
    imgSrc: "images/fmcg.jpg",
    category:"SUPPLIER PORTAL",
    headline:"30% Faster Invoice Booking with 100% Supplier Visibility Adoption",
    body:"Enabled suppliers to seamlessly submit invoices, credit notes, and service queries through a centralized supplier portal tightly integrated with ERP and internal finance systems. Automated validation controls, SOP-driven invoice acceptance, and structured query workflows significantly reduced manual effort while improving compliance, visibility, and operational coordination.",
    stats:[
      { val:"80%", label:"REDUCTION IN MANUAL QUERY RESOLUTION" },
      { val:"30%", label:"FASTER INVOICE BOOKING TURNAROUND TIME" },
      { val:"100%", label:"POSITIVE SUPPLIER ADOPTION" },
    ],
  },
  {
    id:"hospitality",
    num:"04",
    label:"Hospitality",
    tag:"HOSPITALITY",
    tagColor:"#231a67",
    imgSrc: "images/hospitality.jpg",
    category:"SUPPLIER MANAGEMENT",
    headline:"Modernizing Supplier Compliance & Onboarding Operations",
    body:"Automated legacy verification, periodic compliance reviews, and supplier onboarding into a unified self-service workflow. Suppliers now onboard faster with instant statutory validation and reduced dependency on procurement teams.",
    stats:[
      { val:"80%+", label:"FASTER SUPPLIER ONBOARDING CYCLES" },
      { val:"100%", label:"PERIODIC COMPLIANCE VALIDATION" },
      { val:"75%",  label:"REDUCTION IN MANUAL COORDINATION" },
    ],
  },
  {
    id:"infra",
    num:"05",
    label:"Infra & Construction",
    tag:"INFRA & CONSTRUCTION",
    tagColor:"#6DB657",
    imgSrc: "images/construction.jpg",
    category:"PAYABLES",
    headline:"99% Supplier Digital Adoption for Complex Invoice Operations",
    body:"Transformed fragmented invoice operations across contract labour, timesheets, project, non-project, and PO-based invoicing into a centralized digital workflow. Improved compliance controls, supplier collaboration, and payment processing efficiency enterprise-wide.",
    stats:[
      { val:"99%",  label:"SUPPLIERS DIGITALLY ENABLED" },
      { val:"70%+", label:"REDUCTION IN MANUAL EFFORT" },
      { val:"100%", label:"INVOICE & PAYMENT COMPLIANCE CONTROLS" },
    ],
  },
  {
    id:"steel",
    num:"06",
    label:"Iron & Steel",
    tag:"IRON & STEEL",
    tagColor:"#231a67",
    imgSrc: "images/iron-steel.jpg",
    category:"GCC P2P",
    headline:"45% Reduction in Finance Operations Overheads Through Automated Invoice Processing",
    body:"Centralized GCC invoice operations with automated matching, exception workflows, and real-time visibility — reducing manual effort while improving accuracy, governance, and processing efficiency.",
    stats:[
      { val:"₹2.5Cr+", label:"ANNUAL OPERATIONAL IMPACT" },
      { val:"45%",      label:"REDUCTION IN FINANCE OPS OVERHEADS" },
      { val:"100%",     label:"CENTRALIZED REPORTING & VISIBILITY" },
    ],
  },
  {
    id:"media",
    num:"07",
    label:"Media",
    tag:"MEDIA",
    tagColor:"#6DB657",
    imgSrc: "images/media.jpg",
    category:"SUPPLIER MANAGEMENT",
    headline:"Accelerating Multi-Entity Supplier Onboarding with Automated Compliance Controls",
    body:"Automated legacy verification, periodic compliance reviews, and supplier onboarding into a unified self-service workflow. Suppliers now onboard faster with instant statutory validation and reduced dependency on procurement teams.",
    stats:[
      { val:"80%+", label:"FASTER SUPPLIER ONBOARDING CYCLES" },
      { val:"100%", label:"PERIODIC COMPLIANCE VALIDATION" },
      { val:"75%",  label:"REDUCTION IN MANUAL COORDINATION" },
    ],
  },
  {
    id:"textile",
    num:"08",
    label:"Textile",
    tag:"TEXTILE",
    tagColor:"#1a1a2e",
    imgSrc: "images/textile.jpg",
    category:"SUPPLIER DUE DILIGENCE",
    headline:"Accelerating Vendor Due Diligence with Unified Risk & Compliance Screening",
    body:"Enabled procurement and compliance teams to perform comprehensive vendor due diligence across statutory, financial, and legal parameters through a centralized screening platform independent of ERP systems. NimbleS2P transformed fragmented manual verification into a single workflow delivering detailed vendor analysis and audit-ready reports in under 10 minutes.",
    stats:[
      { val:"<10 min", label:"END-TO-END VENDOR SCREENING" },
      { val:"100%",    label:"UNIFIED STATUTORY, FINANCIAL & LEGAL RISK ANALYSIS" },
      { val:"70%",     label:"REDUCTION IN MANUAL WORK LOAD" },
    ],
  },
];

function IndustryIllustration({ ind }) {
  const w = useWidth();
  const isMobile = w < 640;
  const src = assetUrl(ind.imgSrc);
  return (
    <div style={{
      position: "relative",
      minHeight: isMobile ? 220 : "100%",
      height: isMobile ? 220 : "100%",
      borderRadius: isMobile ? "16px 16px 0 0" : "16px 0 0 16px",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "flex-end",
      background: "#E2E8F0",
    }}>
      <img
        src={src}
        alt={`${ind.label} — customer story`}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      <div style={{
        position: "absolute",
        inset: 0,
        background: `linear-gradient(180deg, transparent 35%, ${ind.tagColor || "#334155"}55 100%)`,
        pointerEvents: "none",
      }} />
    </div>
  );
}

function RealResults() {
  const [active, setActive] = useState("chemical");
  const ind = INDUSTRIES.find(i => i.id === active) || INDUSTRIES[0];
  const ref = useReveal();
  const w = useWidth();
  const isMobile = w < 640;

  return (
    <section id="features" className="sec-pad fold" style={{ background:"var(--slp)" }}>
      <div className="sec-inner">

        {/* ── Header ── */}
        <div style={{ marginBottom:20 }}>
          <Eyebrow>Outcomes That Follow</Eyebrow>
          <h2 style={{
            fontFamily:"var(--fb)",
            fontSize: isMobile ? "clamp(18px,4.9vw,27px)" : "clamp(25px,2.8vw,39px)",
            fontWeight:700, letterSpacing:"-.03em", color:"#0F172A",
            lineHeight:1.08, marginBottom:14,
          }}>
            Proven Where It Matters.
          </h2>
          <p style={{ fontSize:"clamp(14px,1.5vw,17px)", color:"var(--t3)", maxWidth:520, lineHeight:1.65, fontFamily:"var(--fb)" }}>
            Measurable impact across finance, procurement, and supplier operations — from day one.
          </p>
        </div>

        {/* ── Industry tabs ── */}
        <div style={{ display:"flex", gap:8, marginBottom:28, flexWrap:"wrap" }}>
          {INDUSTRIES.map(i => {
            const isAct = active===i.id;
            return (
              <button key={i.id} onClick={() => setActive(i.id)} style={{
                display:"inline-flex", alignItems:"center", gap:8,
                fontFamily:"var(--fb)", fontSize:13, fontWeight: isAct ? 700 : 500,
                color: isAct ? "#fff" : "var(--t2)",
                background: isAct ? (i.tagColor || "#391085") : "#fff",
                border: `1.5px solid ${isAct ? (i.tagColor || "#391085") : "var(--bd)"}`,
                borderRadius:100, padding:"8px 20px",
                cursor:"pointer",
                boxShadow: isAct ? `0 3px 14px ${i.tagColor || "#391085"}55` : "none",
                transition:"all .22s cubic-bezier(.22,1,.36,1)",
              }}
                onMouseEnter={e=>{ if(!isAct){ e.currentTarget.style.borderColor="var(--t2)"; e.currentTarget.style.color="var(--t1)"; }}}
                onMouseLeave={e=>{ if(!isAct){ e.currentTarget.style.borderColor="var(--bd)"; e.currentTarget.style.color="var(--t2)"; }}}
              >
                <span style={{ fontSize:10, fontWeight:700, color: isAct ? "rgba(255,255,255,.5)" : "var(--t4)", letterSpacing:".04em" }}>{i.num}</span>
                {i.label}
              </button>
            );
          })}
        </div>

        {/* ── Card — fixed height regardless of content ── */}
        <div ref={ref} className="reveal" style={{
          display:"grid", gridTemplateColumns: isMobile ? "1fr" : "52% 48%",
          borderRadius:18, overflow:"hidden",
          border:"1px solid var(--bd)", background:"#fff",
          boxShadow:"0 4px 24px rgba(0,0,0,.06)",
          height: isMobile ? "auto" : 500,
          minHeight: isMobile ? "auto" : 500,
        }}>
          {/* Left: industry illustration — fills full height */}
          <IndustryIllustration ind={ind} />

          {/* Right: result detail */}
          <div style={{
            padding: isMobile ? "28px 24px" : "28px 32px",
            display:"flex", flexDirection:"column",
            justifyContent:"space-between",
            height:"100%",
            overflow:"hidden",
          }}>
            <div style={{ overflow:"hidden" }}>
              {/* Category chip */}
              <div style={{
                display:"inline-flex", alignItems:"center",
                background:"#F1F5F9", borderRadius:6,
                padding:"4px 10px", marginBottom:14,
                fontSize:10, fontWeight:700, letterSpacing:".1em",
                textTransform:"uppercase", color:"#64748B",
                fontFamily:"var(--fb)",
                flexShrink:0,
              }}>
                {ind.category}
              </div>

              {/* Headline — full, no clamp */}
              <h3 style={{
                fontFamily:"var(--fb)", fontSize:"clamp(16px,1.9vw,22px)",
                fontWeight:800, color:"#0F172A", letterSpacing:"-.025em",
                lineHeight:1.25, marginBottom:12,
              }}>
                {ind.headline}
              </h3>

              {/* Body — full, no clamp */}
              <p style={{
                fontSize:13.5, color:"#64748B", lineHeight:1.7,
                fontFamily:"var(--fb)", marginBottom:20,
              }}>
                {ind.body}
              </p>
            </div>

            {/* Stats row — always at bottom */}
            <div style={{ flexShrink:0 }}>
              <div style={{ height:1, background:"#E2E8F0", marginBottom:20 }} />
              <div style={{ display:"grid", gridTemplateColumns:`repeat(${ind.stats.length},1fr)`, gap:0 }}>
                {ind.stats.map((s,i) => (
                  <div key={s.label} style={{
                    paddingRight: i < ind.stats.length-1 ? 20 : 0,
                    paddingLeft: i > 0 ? 20 : 0,
                    borderRight: i < ind.stats.length-1 ? "1px solid #E2E8F0" : "none",
                  }}>
                    <div style={{ fontFamily:"var(--fb)", fontSize:"clamp(20px,2.2vw,28px)", fontWeight:900, color:"#0F172A", letterSpacing:"-.03em", lineHeight:1, marginBottom:7 }}>
                      {s.val}
                    </div>
                    <div style={{ fontSize:9.5, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:"#94A3B8", lineHeight:1.4, fontFamily:"var(--fb)" }}>
                      {s.label}
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


/* ─────────────────────────────────────────
   DOMAIN EXPERTISE STATEMENT
───────────────────────────────────────── */
function DomainStatement() {
  const w = useWidth();
  const isMobile = w < 640;
  const lineCount = 36;

  return (
    <section id="solutions" className="fold" style={{
      position:"relative",
      overflow:"hidden",
      /* Radial amber glows in top-left and top-right corners, white centre — matching image */
      background:[
        "radial-gradient(ellipse 55% 60% at 0% 0%,   #FCC96B 0%, transparent 65%)",
        "radial-gradient(ellipse 50% 55% at 100% 0%,  #FCBB4A 0%, transparent 60%)",
        "radial-gradient(ellipse 40% 50% at 100% 100%,#F5C86A 0%, transparent 55%)",
        "radial-gradient(ellipse 30% 40% at 0% 80%,   #FDD08A 0%, transparent 55%)",
        "#ffffff",
      ].join(","),
      padding: isMobile ? "52px 20px 62px" : "clamp(62px,9vh,104px) 5vw",
      textAlign:"center",
    }}>

      {/* Dashed vertical lines — more dense on the right, fading on the left */}
      <div style={{
        position:"absolute", inset:0, display:"flex",
        pointerEvents:"none", zIndex:0,
        /* Fade mask: fully visible right 60%, fading out to the left */
        WebkitMaskImage:"linear-gradient(90deg, transparent 0%, rgba(0,0,0,.08) 25%, rgba(0,0,0,.28) 50%, rgba(0,0,0,.55) 70%, rgba(0,0,0,.7) 100%)",
        maskImage:"linear-gradient(90deg, transparent 0%, rgba(0,0,0,.08) 25%, rgba(0,0,0,.28) 50%, rgba(0,0,0,.55) 70%, rgba(0,0,0,.7) 100%)",
      }}>
        {Array.from({ length: lineCount }).map((_,i) => (
          <div key={i} style={{
            flex:1,
            borderRight:"1px dashed rgba(200,140,40,.35)",
          }} />
        ))}
      </div>

      {/* Content */}
      <div style={{ position:"relative", zIndex:1, maxWidth: isMobile ? "100%" : 960, margin:"0 auto", textAlign:"center" }}>

        {/* Large decorative open quote — same as SP domain statement */}
        <div style={{
          fontFamily:"Georgia, serif", fontSize: isMobile ? 120 : 200,
          lineHeight:.7, color:"#C8930A", opacity:.22,
          userSelect:"none", marginBottom: isMobile ? -24 : -48,
        }}>"</div>

        {/* Main statement */}
        <p className="kalam" style={{
          fontSize: isMobile ? "clamp(24px,6.5vw,34px)" : "clamp(28px,3vw,44px)",
          lineHeight:1.45,
          color:"#1a1a3e",
          marginBottom: isMobile ? 32 : 48,
          letterSpacing:".005em",
          textAlign:"center",
        }}>
          We've baked decades of domain expertise into workflows that are{" "}
          <span className="kalam-highlight">ready-to-use</span>
          , AI that handles the{" "}
          <span className="kalam-highlight">heavy lifting</span>
          , and compliance that keeps you{" "}
          <span className="kalam-highlight">audit-proof</span>.
        </p>

        {/* Arrow */}
        <div style={{ display:"flex", justifyContent:"center", marginBottom: isMobile ? 20 : 28 }}>
          <img src={assetUrl("arrow.png")} alt="" style={{ width: isMobile ? 60 : 80, height:"auto" }} />
        </div>

        {/* Sub-statement */}
        <p className="kalam" style={{
          fontSize: isMobile ? "clamp(20px,5.5vw,28px)" : "clamp(22px,2.2vw,32px)",
          color:"#2a2a50",
          lineHeight:1.5,
          fontStyle:"normal",
          textAlign:"center",
        }}>
          Because when it comes to{" "}
          <strong style={{ fontWeight:700, fontStyle:"normal" }}>Suppliers</strong>
          , we speak the language better than anyone.
        </p>

      </div>
    </section>
  );
}


/* ─────────────────────────────────────────
   WHY SUPPLIERS LOVE US  (replaces Integrations)
───────────────────────────────────────── */
const SUPPLIER_CAPS = [
  { label:"Onboarding",           dot:"#A78BFA", active:true  },
  { label:"ASN Submission",       dot:"#F59E0B", active:true  },
  { label:"Invoice Uploads",      dot:"#10B981", active:true  },
  { label:"Payment Tracking",     dot:"#60A5FA", active:true  },
  { label:"Declarations",         dot:"#F472B6", active:true  },
  { label:"PO Visibility",        dot:"#A78BFA", active:true  },
  { label:"Dispute Resolution",   dot:"#34D399", active:true  },
  { label:"Compliance Status",    dot:"#60A5FA", active:true  },
  { label:"Early Payment Access", dot:"#F59E0B", active:true  },
];

const SUPPLIER_STATS = [
  { val:"100%",  label:"TRANSPARENCY IN\nPAYMENT STATUS" },
  { val:"95%+",  label:"SUPPLIER ADOPTION RATE" },
  { val:"4.9+",  label:"SUPPLIER SATISFACTION\nRATING" },
  { val:"50%",   label:"FASTER QUERY RESOLUTION" },
];

function SupplierLoveUs() {
  const w = useWidth();
  const isMobile = w < 768;
  const ref = useReveal();

  return (
    <section className="fold" style={{
      background:"#1e1760",
      overflow:"hidden", position:"relative",
    }}>

      {/* Subtle background radial glow */}
      <div style={{ position:"absolute", inset:0, pointerEvents:"none",
        background:"radial-gradient(ellipse 70% 60% at 20% 40%, rgba(99,60,200,.28) 0%, transparent 65%)"
      }} />

      {/* ── TOP: two-column hero copy ── */}
      <div style={{
        maxWidth:1080, margin:"0 auto",
        padding: isMobile ? "52px 0 36px" : "clamp(62px,9vh,94px) 0 clamp(42px,5vh,62px)",
        display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
        gap: isMobile ? 24 : 40, alignItems:"center",
        position:"relative", zIndex:1,
      }}>

        {/* Left: giant headline */}
        <div>
          <Eyebrow dark>Supplier Experience</Eyebrow>

          <h2 style={{
            fontFamily:"var(--fb)", fontWeight:900,
            fontSize: isMobile ? "clamp(32px,9vw,48px)" : "clamp(40px,4.5vw,60px)",
            lineHeight:1.08, letterSpacing:"-.04em",
            marginBottom:24, paddingBottom:"0.1em",
          }}>
            <span style={{ display:"block", background:"linear-gradient(95deg,#fff 0%,#fff 28%,#F5D060 60%,#F5A623 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>Why</span>
            <span style={{ display:"block", background:"linear-gradient(95deg,#fff 0%,#fff 28%,#F5D060 60%,#F5A623 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>Suppliers</span>
            <span style={{ display:"block", background:"linear-gradient(95deg,#fff 0%,#fff 28%,#F5D060 60%,#F5A623 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>Love Us.</span>
          </h2>
        </div>

        {/* Right: value prop copy */}
        <div style={{ display:"flex", alignItems:"center" }}>
          <div>
            <p style={{
              fontFamily:"var(--fb)", fontWeight:800,
              fontSize: isMobile ? "clamp(17px,4vw,22px)" : "clamp(18px,1.9vw,24px)",
              lineHeight:1.35, letterSpacing:"-.02em",
              marginBottom:20,
              color:"#fff",
            }}>
              Easy to use{" "}
              <span style={{ background:"linear-gradient(95deg,#F5D060,#F5A623)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>from day one.</span>
              {" "}All the tools you need, with full visibility and{" "}
              <span style={{ background:"linear-gradient(95deg,#F5D060,#F5A623)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>zero complexity.</span>
            </p>
            <p style={{ fontSize: isMobile ? 13.5 : 15.5, color:"rgba(255,255,255,.48)", lineHeight:1.72, fontFamily:"var(--fb)", maxWidth:480 }}>
              Do it all with ease — from onboarding and ASN to invoice uploads, payment tracking, and declarations — all in the way that works best for you.
            </p>
          </div>
        </div>
      </div>

      {/* ── STATS BAR ── */}
      <div style={{
        borderTop:"1px solid rgba(255,255,255,.1)",
        borderBottom:"1px solid rgba(255,255,255,.1)",
        background:"rgba(0,0,0,.15)",
      }}>
        <div style={{
          maxWidth:1080, margin:"0 auto",
          display:"grid", gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(4,1fr)", /* slu-stats */
          padding: isMobile ? "0 0" : "0 0",
        }}>
          {SUPPLIER_STATS.map((s,i) => (
            <div key={s.label} style={{
              padding: isMobile ? "18px 12px" : "22px 16px",
              borderRight: (isMobile ? i%2!==1 : i<3) ? "1px solid rgba(255,255,255,.1)" : "none",
              borderBottom: isMobile && i<2 ? "1px solid rgba(255,255,255,.1)" : "none",
            }}>
              <div style={{
                fontFamily:"var(--fb)", fontWeight:900,
                fontSize: isMobile ? "clamp(22px,6vw,32px)" : "clamp(24px,2.6vw,36px)",
                color:"#fff", letterSpacing:"-.03em", lineHeight:1, marginBottom:10,
              }}>{s.val}</div>
              <div style={{
                fontSize: isMobile ? 9 : 10, fontWeight:700, letterSpacing:".12em",
                textTransform:"uppercase", color:"rgba(255,255,255,.32)",
                fontFamily:"var(--fb)", lineHeight:1.5,
                whiteSpace:"pre-line",
              }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── WHAT SUPPLIERS CAN DO ── */}
      <div ref={ref} className="reveal" style={{
        maxWidth:1080, margin:"0 auto",
        padding: isMobile ? "26px 0 47px" : "36px 0 52px",
        position:"relative", zIndex:1,
      }}>
        <div style={{
          fontSize:10, fontWeight:700, letterSpacing:".16em",
          textTransform:"uppercase", color:"rgba(255,255,255,.3)",
          fontFamily:"var(--fb)", marginBottom:20,
        }}>WHAT SUPPLIERS CAN DO</div>

        {/* Pill tags — two wrapping rows */}
        <div style={{ display:"flex", flexWrap:"wrap", gap: isMobile ? 8 : 10 }}>
          {SUPPLIER_CAPS.map((cap,i) => (
            <div key={cap.label} style={{
              display:"inline-flex", alignItems:"center", gap:7,
              background: cap.active ? "rgba(255,255,255,.09)" : "transparent",
              border:"1px solid rgba(255,255,255,.14)",
              borderRadius:100,
              padding: isMobile ? "8px 16px" : "10px 20px",
              transition:"background .18s, transform .18s",
              cursor:"default",
            }}
              onMouseEnter={e=>{ e.currentTarget.style.background="rgba(255,255,255,.16)"; e.currentTarget.style.transform="translateY(-2px)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.background=cap.active?"rgba(255,255,255,.09)":"transparent"; e.currentTarget.style.transform=""; }}
            >
              {cap.dot && (
                <span style={{ width:7, height:7, borderRadius:"50%", background:cap.dot, display:"inline-block", flexShrink:0, boxShadow:`0 0 6px ${cap.dot}` }} />
              )}
              <span style={{
                fontFamily:"var(--fb)", fontSize: isMobile ? 13 : 14.5, fontWeight:700,
                color: cap.active ? "#fff" : "rgba(255,255,255,.35)",
                letterSpacing:"-.01em",
              }}>{cap.label}</span>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}


/* ─────────────────────────────────────────
   HEAR FROM THEM  (replaces Testimonials + Pricing)
───────────────────────────────────────── */
function HearFromThem() {
  const w = useWidth();
  const isMobile = w < 640;
  const isTablet = w < 960;

  const quoteIcon = (
    <svg width="28" height="22" viewBox="0 0 28 22" fill="none" style={{ opacity:.1, position:"absolute", top:18, right:18 }}>
      <path d="M0 22V13.2C0 5.9 4.7 1.5 14 0l1.4 2.6C10.2 3.8 7.6 6.3 7 10h5V22H0zm16 0V13.2C16 5.9 20.7 1.5 30 0l1.4 2.6C26.2 3.8 23.6 6.3 23 10h5V22H16z" fill="#6320E0"/>
    </svg>
  );

  const stars = <div style={{ color:"#F59E0B", fontSize:13, letterSpacing:2, marginBottom:12 }}>★★★★★</div>;

  const Avatar = ({initials, bg, name, role, dark}) => (
    <div style={{ display:"flex", alignItems:"center", gap:10, marginTop:"auto", paddingTop:14, borderTop:`1px solid ${dark?"rgba(255,255,255,.1)":"#F1F5F9"}` }}>
      <div style={{ width:34, height:34, borderRadius:"50%", background:bg, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"var(--fb)", fontSize:12, fontWeight:700, color:"#fff", flexShrink:0 }}>{initials}</div>
      <div>
        <div style={{ fontSize:13, fontWeight:600, color:dark?"#fff":"#0F172A", fontFamily:"var(--fb)" }}>{name}</div>
        <div style={{ fontSize:11, color:dark?"rgba(255,255,255,.4)":"#94A3B8", fontFamily:"var(--fb)" }}>{role}</div>
      </div>
    </div>
  );

  const lc = { background:"#fff", borderRadius:18, padding:24, border:"1px solid #E2E8F0", position:"relative", overflow:"hidden", boxShadow:"0 2px 12px rgba(0,0,0,.05)", display:"flex", flexDirection:"column" };
  const dc = { background:"linear-gradient(145deg,#1e1760 0%,#261d6b 100%)", borderRadius:18, padding:24, position:"relative", overflow:"hidden", border:"1px solid rgba(255,255,255,.1)", display:"flex", flexDirection:"column" };

  return (
    <section className="sec-pad fold" style={{ background:"var(--slp)" }}>
      <div className="sec-inner">
        <div style={{ marginBottom:32 }}>
          <Eyebrow>Testimonials</Eyebrow>
          <h2 style={{
            fontFamily:"var(--fb)",
            fontSize: isMobile ? "clamp(18px,4.9vw,27px)" : "clamp(25px,2.8vw,39px)",
            fontWeight:700, letterSpacing:"-.035em", color:"#0F172A", lineHeight:1.05,
          }}>Hear From Them</h2>
        </div>

        {/*
          BENTO LAYOUT (desktop):
          ┌──────────────┬───────────────────────────────┐
          │  Quote A     │  Video (spans rows 1+2)       │
          ├──────────────┤                               │
          │  Purple      │                               │
          ├──────┬───────┴──────────────────────────────┤
          │ Blog │  Quote C          │  Playbook        │
          └──────┴───────────────────┴──────────────────┘
        */}
        <div style={{
          display: isMobile ? "flex" : "grid",
          flexDirection: isMobile ? "column" : undefined,
          gridTemplateColumns: isTablet ? "1fr 1fr" : "1fr 1fr 1fr",
          gridTemplateRows: "auto auto auto",
          gap:14,
        }}>

          {/* Quote A — top-left */}
          <div style={{ ...lc, gridColumn:1, gridRow:1 }}>
            {quoteIcon}{stars}
            <p style={{ fontSize:14.5, color:"#334155", lineHeight:1.72, fontFamily:"var(--fb)", flex:1, marginBottom:16 }}>"NimbleS2P turned our compliance checks into a one-click task. What earlier required team's coordination across departments now runs with minimal oversight!"</p>
            <Avatar initials="RP" bg="#391085" name="Sooraj PS" role="Asst Manager Internal Audit, Sud Chemie" />
          </div>

          {/* Video — spans col 2-3, rows 1-2 */}
          <div style={{
            position:"relative", borderRadius:18, overflow:"hidden",
            gridColumn: isTablet ? "2" : "2 / 4",
            gridRow: isTablet ? "1" : "1 / 3",
            minHeight: isMobile ? 260 : 360,
            display:"flex", flexDirection:"column", justifyContent:"flex-end",
            background:"linear-gradient(135deg,#0f0c29,#302b63,#24243e)",
            boxShadow:"0 8px 32px rgba(0,0,0,.22)", cursor:"pointer",
          }}>
            <div style={{ position:"absolute", inset:0, pointerEvents:"none", background:"radial-gradient(ellipse 70% 60% at 25% 30%, rgba(99,60,200,.35) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 80% 70%, rgba(245,166,35,.18) 0%, transparent 55%)" }} />
            <div style={{ position:"absolute", inset:0, pointerEvents:"none", backgroundImage:"linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px)", backgroundSize:"32px 32px" }} />
            <div style={{ position:"absolute", top:16, right:16, zIndex:3, background:"rgba(0,0,0,.6)", backdropFilter:"blur(8px)", borderRadius:6, padding:"3px 10px", fontSize:11, fontWeight:700, color:"#fff", fontFamily:"var(--fm)", border:"1px solid rgba(255,255,255,.15)" }}>2:34</div>
            <div style={{ position:"absolute", top:16, left:16, zIndex:3, display:"inline-flex", alignItems:"center", gap:6, background:"rgba(245,166,35,.18)", backdropFilter:"blur(8px)", border:"1px solid rgba(245,166,35,.4)", borderRadius:100, padding:"4px 12px" }}>
              <span style={{ width:6, height:6, borderRadius:"50%", background:"#F5A623", display:"inline-block", boxShadow:"0 0 6px #F5A623", animation:"pulse-dot 2s ease-in-out infinite" }} />
              <span style={{ fontSize:10, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:"#F5D060", fontFamily:"var(--fb)" }}>Video Testimonial</span>
            </div>
            <div style={{ position:"absolute", top:"45%", left:"50%", transform:"translate(-50%,-50%)", width:64, height:64, borderRadius:"50%", background:"rgba(255,255,255,.15)", backdropFilter:"blur(12px)", border:"2px solid rgba(255,255,255,.35)", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 0 0 8px rgba(255,255,255,.06), 0 8px 24px rgba(0,0,0,.3)", transition:"transform .2s, background .2s", zIndex:3 }}
              onMouseEnter={e=>{ e.currentTarget.style.background="rgba(245,166,35,.35)"; e.currentTarget.style.transform="translate(-50%,-50%) scale(1.08)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.background="rgba(255,255,255,.15)"; e.currentTarget.style.transform="translate(-50%,-50%) scale(1)"; }}
            ><svg width="22" height="22" viewBox="0 0 22 22" fill="white"><path d="M7 4l12 7-12 7V4z"/></svg></div>
            <div style={{ position:"relative", zIndex:3, background:"linear-gradient(0deg, rgba(0,0,0,.82) 0%, rgba(0,0,0,.4) 70%, transparent 100%)", padding: isMobile ? "24px 20px 20px" : "28px 36px 22px", display:"flex", alignItems:"flex-end", justifyContent:"space-between", gap:24, flexWrap: isMobile ? "wrap" : "nowrap" }}>
              <p style={{ fontSize: isMobile ? 14 : 16, fontWeight:600, color:"rgba(255,255,255,.92)", fontFamily:"var(--fb)", lineHeight:1.4, margin:0, flex:1, letterSpacing:"-.01em" }}>"From 45-day invoice cycles to 2 days. This is what transformation looks like."</p>
              <div style={{ display:"flex", alignItems:"center", gap:10, flexShrink:0 }}>
                <div style={{ width:36, height:36, borderRadius:"50%", background:"#F59E0B", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"var(--fb)", fontSize:12, fontWeight:700, color:"#fff", flexShrink:0 }}>SK</div>
                <div>
                  <div style={{ fontSize:13, fontWeight:600, color:"#fff", fontFamily:"var(--fb)" }}>Sanjana Kumar</div>
                  <div style={{ fontSize:11, color:"rgba(255,255,255,.5)", fontFamily:"var(--fb)" }}>Head of Finance Ops, FMCG Group</div>
                </div>
                <div style={{ marginLeft:16, fontSize:11, color:"rgba(255,255,255,.55)", fontFamily:"var(--fb)", fontWeight:500, whiteSpace:"nowrap" }}>Watch Story →</div>
              </div>
            </div>
          </div>

          {/* Purple testimonial — col 1, row 2 */}
          <div style={{
            background:"linear-gradient(145deg,#1e1760 0%,#261d6b 100%)",
            borderRadius:18, padding:24, position:"relative", overflow:"hidden",
            border:"1px solid rgba(255,255,255,.1)",
            display:"flex", flexDirection:"column", justifyContent:"space-between",
            gridColumn:1, gridRow:2,
            boxShadow:"0 8px 32px rgba(57,16,133,.28)",
          }}>
            <div style={{ position:"absolute", top:"-20%", right:"-20%", width:"70%", height:"70%", borderRadius:"50%", background:"radial-gradient(ellipse, rgba(99,32,224,.4) 0%, transparent 70%)", pointerEvents:"none" }} />
            <div style={{ position:"absolute", inset:0, pointerEvents:"none", backgroundImage:"radial-gradient(rgba(255,255,255,.06) 1px,transparent 1px)", backgroundSize:"20px 20px" }} />
            <div style={{ position:"relative", zIndex:1 }}>
              <div style={{ color:"#F59E0B", fontSize:12, letterSpacing:2, marginBottom:14 }}>★★★★★</div>
              <div style={{ fontFamily:"Georgia, serif", fontSize:52, lineHeight:.7, color:"rgba(167,139,250,.25)", userSelect:"none", marginBottom:12 }}>"</div>
              <p style={{ fontSize:13.5, color:"rgba(255,255,255,.82)", lineHeight:1.68, fontFamily:"var(--fb)", margin:0 }}>"As a supplier, getting paid on time used to mean endless follow-ups. With NimbleS2P, I submit invoices, track approvals, and receive payments — all without chasing anyone."</p>
            </div>
            <div style={{ position:"relative", zIndex:1, display:"flex", alignItems:"center", gap:10, paddingTop:16, borderTop:"1px solid rgba(255,255,255,.1)", marginTop:16 }}>
              <div style={{ width:34, height:34, borderRadius:"50%", background:"linear-gradient(135deg,#6320E0,#8B5CF6)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"var(--fb)", fontSize:12, fontWeight:700, color:"#fff", flexShrink:0 }}>AM</div>
              <div>
                <div style={{ fontSize:12.5, fontWeight:600, color:"#fff", fontFamily:"var(--fb)" }}>Ramesh Verma</div>
                <div style={{ fontSize:11, color:"rgba(255,255,255,.4)", fontFamily:"var(--fb)" }}>Director, Precision Parts Supplier</div>
              </div>
            </div>
          </div>

          {/* Blog — row 3, col 1 */}
          <div style={{ background:"#fff", border:"1px solid #E2E8F0", borderRadius:18, overflow:"hidden", display:"flex", flexDirection:"column", boxShadow:"0 2px 12px rgba(0,0,0,.05)", gridColumn:1, gridRow:3 }}>
            <div style={{ background:"linear-gradient(135deg,#1E1660 0%,#391085 60%,#6320E0 100%)", padding:"22px 22px 30px", position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", inset:0, pointerEvents:"none", backgroundImage:"radial-gradient(circle, rgba(255,255,255,.12) 1px, transparent 1px)", backgroundSize:"18px 18px" }} />
              <div style={{ position:"relative", zIndex:1, display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
                <span style={{ fontSize:10, fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", background:"rgba(255,255,255,.15)", border:"1px solid rgba(255,255,255,.25)", borderRadius:100, padding:"4px 12px", color:"#fff", fontFamily:"var(--fb)" }}>✦ Blog</span>
                <span style={{ fontSize:11, color:"rgba(255,255,255,.5)", fontFamily:"var(--fb)" }}>5 min read</span>
              </div>
              <h4 style={{ position:"relative", zIndex:1, fontFamily:"var(--fb)", fontSize:17, fontWeight:800, color:"#fff", lineHeight:1.28, letterSpacing:"-.02em" }}>How Indian Enterprises Cut Supplier Onboarding from 21 Days to 21 Minutes</h4>
            </div>
            <div style={{ display:"flex", padding:"0 20px", marginTop:-14, marginBottom:12, position:"relative", zIndex:2 }}>
              <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:"#fff", border:"1px solid #E2E8F0", borderRadius:100, padding:"4px 12px", boxShadow:"0 2px 8px rgba(0,0,0,.1)" }}>
                <span style={{ fontFamily:"var(--fb)", fontSize:14, fontWeight:800, color:"#391085" }}>21d→21m</span>
                <span style={{ fontSize:11, color:"#64748B", fontFamily:"var(--fb)" }}>days to minutes</span>
              </div>
            </div>
            <div style={{ padding:"0 22px", flex:1 }}>
              <p style={{ fontSize:13, color:"#64748B", lineHeight:1.65, fontFamily:"var(--fb)", margin:0 }}>How Nimble's compliance engine and automated onboarding workflows collapsed timelines that used to take weeks.</p>
            </div>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 22px", borderTop:"1px solid #F1F5F9", marginTop:14 }}>
              <div style={{ display:"flex", gap:6 }}>
                <span style={{ fontSize:10, fontWeight:600, color:"#6320E0", background:"#EDE9FE", borderRadius:100, padding:"3px 10px", fontFamily:"var(--fb)" }}>Procurement</span>
                <span style={{ fontSize:10, fontWeight:600, color:"#0369A1", background:"#E0F2FE", borderRadius:100, padding:"3px 10px", fontFamily:"var(--fb)" }}>Case Study</span>
              </div>
              <a href="#" style={{ fontSize:12.5, fontWeight:700, color:"#391085", fontFamily:"var(--fb)", textDecoration:"none", display:"inline-flex", alignItems:"center", gap:4, transition:"gap .15s" }}
                onMouseEnter={e=>e.currentTarget.style.gap="8px"} onMouseLeave={e=>e.currentTarget.style.gap="4px"}>Read →</a>
            </div>
          </div>

          {/* Quote C — row 3, col 2 */}
          <div style={{ ...dc, background:"#fff", border:"1px solid #E2E8F0", boxShadow:"0 2px 12px rgba(0,0,0,.05)", gridColumn: isTablet ? 1 : 2, gridRow: isTablet ? 4 : 3 }}>
            {quoteIcon}{stars}
            <p style={{ fontSize:14.5, color:"#334155", lineHeight:1.72, fontFamily:"var(--fb)", flex:1, marginBottom:16 }}>"NimbleS2P creates balance between automation and compliance. So, we move fast, yet stay fully compliant and in control."</p>
            <Avatar initials="PM" bg="#8B5CF6" name="Raghvendra" role="Finance Team, N. Ranga Rao" />
          </div>

          {/* Playbook — row 3, col 3 */}
          <div style={{ background:"#FFFBEB", border:"1px solid #FDE68A", borderRadius:18, padding:24, display:"flex", flexDirection:"column", position:"relative", overflow:"hidden", gridColumn: isTablet ? 2 : 3, gridRow: isTablet ? 3 : 3 }}>
            <div style={{ position:"absolute", bottom:-20, right:-20, width:80, height:80, borderRadius:"50%", background:"#FCD34D", opacity:.25 }} />
            <span style={{ display:"inline-flex", alignItems:"center", gap:6, fontSize:10, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", background:"#FEF3C7", border:"1px solid #FCD34D", borderRadius:6, padding:"3px 10px", color:"#92400E", fontFamily:"var(--fb)", marginBottom:14, width:"fit-content" }}>
              <span style={{ width:6, height:6, borderRadius:"50%", background:"#F59E0B", display:"inline-block" }} />PLAYBOOK
            </span>
            <h4 style={{ fontFamily:"var(--fb)", fontSize:17, fontWeight:800, color:"#1E1B4B", letterSpacing:"-.02em", lineHeight:1.25, marginBottom:14 }}>The Enterprise S2P Transformation Playbook</h4>
            <div style={{ display:"flex", flexDirection:"column", gap:9, flex:1 }}>
              {["Map your supplier landscape","Automate compliance checks","Connect spend to outcomes","Scale with AI-driven decisions"].map((step,i) => (
                <div key={step} style={{ display:"flex", alignItems:"flex-start", gap:10 }}>
                  <div style={{ width:18, height:18, borderRadius:"50%", background:"#F59E0B", display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, fontWeight:700, color:"#fff", flexShrink:0, marginTop:2 }}>{i+1}</div>
                  <span style={{ fontSize:13, color:"#1E1B4B", fontFamily:"var(--fb)", lineHeight:1.4 }}>{step}</span>
                </div>
              ))}
            </div>
            <a href="#" style={{ marginTop:16, fontSize:13, fontWeight:700, color:"#B45309", fontFamily:"var(--fb)", textDecoration:"none", display:"inline-flex", alignItems:"center", gap:4 }}
              onMouseEnter={e=>e.currentTarget.style.color="#92400E"} onMouseLeave={e=>e.currentTarget.style.color="#B45309"}>Download Free →</a>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   FINAL CTA
───────────────────────────────────────── */
function FinalCTA({ onNavigate }) {
  const w = useWidth();
  const isMobile = w < 640;
  const isTablet = w < 960;

  const features = [
    { icon:"⚡", label:"Live demo in 30 min" },
    { icon:"🎯", label:"Configured for your industry" },
    { icon:"🔒", label:"No commitment required" },
    { icon:"🤝", label:"Real product, real answers" },
  ];

  return (
    <section style={{
      position:"relative", overflow:"hidden",
      background:"#0f0c29",
      padding: isMobile ? "62px 20px 78px" : "clamp(72px,9vh,110px) 5vw",
    }}>

      {/* ── Rich background — layered gradients + mesh ── */}
      <div style={{ position:"absolute", inset:0, pointerEvents:"none" }}>
        {/* Deep purple gradient base */}
        <div style={{ position:"absolute", inset:0,
          background:"linear-gradient(135deg,#0f0c29 0%,#1a1260 40%,#261d6b 70%,#1e1050 100%)"
        }} />
        {/* Amber glow — bottom right */}
        <div style={{ position:"absolute", bottom:"-10%", right:"-5%", width:"50%", height:"80%",
          background:"radial-gradient(ellipse at 80% 80%, rgba(245,166,35,.22) 0%, transparent 60%)"
        }} />
        {/* Purple glow — top left */}
        <div style={{ position:"absolute", top:"-10%", left:"-5%", width:"55%", height:"75%",
          background:"radial-gradient(ellipse at 20% 20%, rgba(99,32,224,.38) 0%, transparent 60%)"
        }} />
        {/* Dot grid */}
        <div style={{ position:"absolute", inset:0,
          backgroundImage:"radial-gradient(circle, rgba(255,255,255,.06) 1px, transparent 1px)",
          backgroundSize:"28px 28px"
        }} />
      </div>

      {/* ── Top wave ── */}
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

      {/* ── CONTENT — centred single column ── */}
      <div style={{
        position:"relative", zIndex:2,
        maxWidth:1000, margin:"0 auto",
        textAlign:"center",
        display:"flex", flexDirection:"column", alignItems:"center",
      }}>

        {/* Eyebrow */}
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

        {/* Headline */}
        <h2 style={{
          fontFamily:"var(--fb)", fontWeight:900,
          fontSize: isMobile ? "clamp(26px,7vw,38px)" : "clamp(36px,4vw,56px)",
          lineHeight:1.1, letterSpacing:"-.04em",
          background:"linear-gradient(95deg,#fff 0%,#fff 30%,#F5D060 62%,#F5A623 100%)",
          WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
          margin:"0 auto 20px",
          maxWidth:900,
        }}>
          Comply, Automate, and Maximize Supplier Transactions.
        </h2>

        {/* Sub */}
        <p style={{
          fontSize: isMobile ? 14 : 16, color:"rgba(255,255,255,.52)",
          lineHeight:1.75, fontFamily:"var(--fb)",
          margin:"0 auto 40px", maxWidth:480,
        }}>
          A live walkthrough of how enterprises unify supplier operations, sourcing and payables with NimbleS2P.
        </p>

        {/* CTA */}
        <a onClick={e=>{ e.preventDefault(); if(typeof onNavigate==="function") onNavigate("getstarted"); }} href="#" style={{
          display:"inline-flex", alignItems:"center", justifyContent:"center", gap:8,
          background:"linear-gradient(135deg,#E8920A,#F5B020)", color:"#fff",
          borderRadius:12, padding: isMobile ? "13px 36px" : "15px 48px",
          fontSize: isMobile ? 15 : 16.5, fontWeight:700,
          textDecoration:"none", fontFamily:"var(--fb)", letterSpacing:"-.01em",
          boxShadow:"0 6px 28px rgba(232,150,10,.5), 0 1px 0 rgba(255,255,255,.15) inset",
          transition:"transform .2s cubic-bezier(.22,1,.36,1), box-shadow .2s",
        }}
          onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 14px 40px rgba(232,150,10,.65)"; }}
          onMouseLeave={e=>{ e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow="0 6px 28px rgba(232,150,10,.5), 0 1px 0 rgba(255,255,255,.15) inset"; }}
        >Get Started →</a>

      </div>

      {/* ── Bottom wave ── */}
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


/* ─────────────────────────────────────────
   ROOT
───────────────────────────────────────── */
/* ── NAV — identical to homepage ── */
export default function NimbleS2PHomepage() {
  const pathname = usePathname();
  const router = useRouter();
  const { navigate, resourceSection, page } = useSiteNavigation(pathname, router);

  const goHome = useCallback(() => navigate("home"), [navigate]);

  if (page === "vdd") {
    return <VendorDueDiligencePage onBack={goHome} onNavigate={navigate} />;
  }
  if (page === "supplier") {
    return <SupplierPortalPage onBack={goHome} onNavigate={navigate} />;
  }
  if (page === "invoice") {
    return <InvoiceProcessingPage onBack={goHome} onNavigate={navigate} />;
  }
  if (page === "rfq") {
    return <RFQManagementPage onBack={goHome} onNavigate={navigate} />;
  }
  if (page === "why") {
    return <WhyNimblePage onBack={goHome} onNavigate={navigate} />;
  }
  if (page === "pricing") {
    return <PricingPage onBack={goHome} onNavigate={navigate} />;
  }
  if (page === "demo") {
    return <BookDemoPage onBack={goHome} onNavigate={navigate} />;
  }
  if (page === "analytics") {
    return <SupplierAnalyticsPage onBack={goHome} onNavigate={navigate} />;
  }
  if (page === "finance") {
    return <EarlyFinancingPage onBack={goHome} onNavigate={navigate} />;
  }
  if (page === "getstarted") {
    return <GetStartedPage onBack={goHome} onNavigate={navigate} />;
  }
  if (page === "terms") {
    return <TermsPage onBack={goHome} onNavigate={navigate} />;
  }
  if (page === "resources") {
    return (
      <ResourcesPage
        onBack={goHome}
        onNavigate={navigate}
        resourceSection={resourceSection}
      />
    );
  }
  if (page === "blog") {
    return <BlogPostPage onBack={goHome} onNavigate={navigate} />;
  }

  return (
    <div>
      <Nav onNavigate={navigate} onBack={() => { navigate("home"); window.scrollTo({ top: 0, behavior: "smooth" }); }} />
      <Hero onNavigate={navigate} />
      <LogoMarquee />
      <PlatformModules onNavigate={navigate} />
      <NimbleDifference />
      <RealResults />
      <DomainStatement />
      <SupplierLoveUs />
      <HearFromThem />
      <FinalCTA onNavigate={navigate} />
      <VDDFooter onNavigate={navigate} />
    </div>
  );
}
