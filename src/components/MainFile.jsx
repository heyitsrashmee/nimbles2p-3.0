"use client";

import { useState, useEffect, useRef, useCallback, Fragment } from "react";
import { usePathname, useRouter } from "next/navigation";
import TermsPage from "./NimbleS2PTerms";
import ResourcesPage from "./ResourcesPage";
import CompliancePortalDemo from "@gifs/CompliancePortal";
import RFQAgentDemo from "@gifs/RFQAgent";
import SupplierPortalDemo from "@gifs/SupplierPortal";
import InvoiceProcessingDemo from "@gifs/InvoiceProcessing";
import SupplierAnalyticsDemo from "@gifs/SupplierAnalytics";
import { assetUrl } from "@/lib/assetUrl";
import { pageToPath, pathToPage, footerLabelToPage } from "@/lib/routes";
import WhyNimblePage from "./WhyNimblePage";
import PricingPage from "./PricingPage";
import { Nav } from "@/components/layout/SiteNav";
import { VDDFooter } from "@/components/layout/VDDFooter";
import { goFooterLink, goLegalPage } from "@/components/layout/footerUtils";
import { PRODUCT_PAGE_RESOURCES } from "@/components/layout/megaMenuData";
import { NimbleLogo } from "@/components/layout/logos";
import { useReveal, useWidth, useTypewriter, Eyebrow } from "@/components/shared/pageUi";


/* ─────────────────────────────────────────
   GLOBAL STYLES + DESIGN TOKENS
───────────────────────────────────────── */
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&family=Caveat:wght@400;500;600;700&family=Kalam:wght@300;400;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --ft: 'Inter', system-ui, sans-serif;
    --fb: 'Inter', system-ui, sans-serif;
    --fm: 'IBM Plex Mono', 'Courier New', monospace;
    --p900:#1E0B4B; --p800:#2D1270; --p700:#391085; --p600:#4B1A9E;
    --p500:#6320E0; --p400:#7C3AED; --p300:#8B5CF6; --p200:#A78BFA;
    --p100:#C4B5FD; --p50:#EDE9FE; --p25:#F5F3FF;
    --g700:#92400E; --g600:#B45309; --g500:#D97706; --g400:#EE9D11;
    --g300:#F59E0B; --g200:#FCD34D; --g100:#FDE68A; --g50:#FEF3C7; --g25:#FFFBEB;
    --em700:#047857; --em600:#059669; --em500:#10B981; --em400:#34D399; --em50:#ECFDF5;
    --er600:#DC2626; --er500:#EF4444; --er50:#FEF2F2;
    --am600:#D97706; --am500:#F59E0B; --am50:#FFFBEB;
    --sw:#FFFFFF; --slp:#F5F3FF; --ssp:#F0EDFB; --sm:#EDE9FE;
    --t1:#0F172A; --t2:#334155; --t3:#64748B; --t4:#94A3B8; --t5:#CBD5E1;
    --bd:#E2E8F0; --bd-p:rgba(57,16,133,.18); --bd-g:rgba(238,157,17,.35);
    --bd-dk:rgba(255,255,255,.1); --bd-dk-p:rgba(139,92,246,.3);
    --sh:0 1px 3px rgba(57,16,133,.06);
    --sh-md:0 4px 12px rgba(57,16,133,.1);
    --sh-p:0 4px 18px rgba(57,16,133,.22),0 2px 6px rgba(57,16,133,.12);
    --sh-g:0 4px 18px rgba(217,119,6,.26),0 2px 6px rgba(217,119,6,.14);
  }

  html { scroll-behavior: smooth; }
  body { font-family: var(--fb); background: var(--slp); color: var(--t1); overflow-x: hidden; -webkit-font-smoothing: antialiased; }

  /* ── BUTTONS ── */
  .btn-lp { display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,var(--p700),var(--p500));color:#fff;border:none;border-radius:8px;padding:11px 24px;font-size:14px;font-weight:500;cursor:pointer;font-family:var(--fb);box-shadow:var(--sh-p);transition:transform .2s cubic-bezier(.22,1,.36,1),box-shadow .2s ease;text-decoration:none;white-space:nowrap; }
  .btn-lp:hover { transform:translateY(-2px);box-shadow:0 8px 30px rgba(57,16,133,.34); }
  .btn-lp:active { transform:scale(.97); }
  .btn-ls { display:inline-flex;align-items:center;gap:8px;background:var(--sw);color:var(--p700);border:1.5px solid rgba(57,16,133,.3);border-radius:8px;padding:10px 22px;font-size:14px;font-weight:500;cursor:pointer;font-family:var(--fb);box-shadow:var(--sh);transition:background .18s,border-color .18s,transform .2s cubic-bezier(.22,1,.36,1),box-shadow .18s;text-decoration:none;white-space:nowrap; }
  .btn-ls:hover { background:var(--p50);border-color:rgba(57,16,133,.55);transform:translateY(-1px);box-shadow:0 4px 16px rgba(57,16,133,.14); }
  .btn-ls:active { transform:scale(.97); }
  .btn-lg { display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,var(--g500),var(--g400));color:#fff;border:none;border-radius:8px;padding:11px 24px;font-size:14px;font-weight:600;cursor:pointer;font-family:var(--fb);box-shadow:var(--sh-g);transition:transform .2s cubic-bezier(.22,1,.36,1),box-shadow .2s ease;text-decoration:none;white-space:nowrap; }
  .btn-lg:hover { transform:translateY(-2px) scale(1.02);box-shadow:0 8px 30px rgba(217,119,6,.4); }
  .btn-lg:active { transform:scale(.97); }
  .btn-dp { display:inline-flex;align-items:center;gap:8px;background:#fff;color:var(--p700);border:none;border-radius:8px;padding:11px 24px;font-size:14px;font-weight:600;cursor:pointer;font-family:var(--fb);box-shadow:0 2px 12px rgba(0,0,0,.22);transition:background .18s,transform .2s cubic-bezier(.22,1,.36,1),box-shadow .2s ease;text-decoration:none;white-space:nowrap; }
  .btn-dp:hover { background:var(--g50);color:var(--p800);transform:translateY(-2px);box-shadow:0 8px 32px rgba(0,0,0,.32),0 0 0 1.5px rgba(238,157,17,.45); }
  .btn-dp:active { transform:scale(.97); }
  .btn-ds { display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.1);color:rgba(255,255,255,.85);border:1.5px solid rgba(255,255,255,.25);border-radius:8px;padding:10px 22px;font-size:14px;font-weight:500;cursor:pointer;font-family:var(--fb);transition:background .18s,border-color .18s,transform .2s;text-decoration:none;white-space:nowrap; }
  .btn-ds:hover { background:rgba(255,255,255,.2);border-color:rgba(255,255,255,.55);color:#fff;transform:translateY(-1px); }
  .btn-ds:active { transform:scale(.97); }
  .btn-dg { display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,var(--g500),var(--g400));color:#fff;border:none;border-radius:8px;padding:11px 24px;font-size:14px;font-weight:600;cursor:pointer;font-family:var(--fb);box-shadow:0 2px 12px rgba(238,157,17,.3);transition:transform .2s cubic-bezier(.22,1,.36,1),box-shadow .2s ease;text-decoration:none;white-space:nowrap; }
  .btn-dg:hover { transform:translateY(-2px) scale(1.02);box-shadow:0 8px 32px rgba(238,157,17,.5); }
  .btn-dg:active { transform:scale(.97); }

  /* ── PILLS ── */
  .pill { display:inline-flex;align-items:center;gap:4px;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:500;font-family:var(--fb); }
  .pl-dk-gl { background:rgba(238,157,17,.12);color:#FCD34D;border:1px solid rgba(238,157,17,.28); }
  .pl-dk-pu { background:rgba(139,92,246,.15);color:var(--p100);border:1px solid var(--bd-dk-p); }

  /* ── ANIMATIONS ── */
  @keyframes fade-up { from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)} }
  @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)}50%{opacity:.6;transform:scale(.8)} }
  .fade-up { animation:fade-up .6s cubic-bezier(.22,1,.36,1) both; }
  .d1{animation-delay:.06s}.d2{animation-delay:.12s}.d3{animation-delay:.18s}.d4{animation-delay:.24s}
  .pulse-anim { animation:pulse-dot 2s ease-in-out infinite; }

  /* ── SCROLL REVEAL ── */
  .reveal { opacity:0;transform:translateY(20px);transition:opacity .6s cubic-bezier(.22,1,.36,1),transform .6s cubic-bezier(.22,1,.36,1); }
  .reveal.visible { opacity:1;transform:translateY(0); }

  /* ── NAV ── */
  .nav-links-desktop { display:flex;align-items:center;gap:36px;margin:0 auto; }
  .nav-cta-desktop   { display:inline-flex; }
  .hamburger { display:none;flex-direction:column;justify-content:center;gap:5px;width:36px;height:36px;background:transparent;border:none;cursor:pointer;padding:4px;margin-left:auto; }
  .hamburger span { display:block;height:2px;border-radius:2px;background:#fff;transition:transform .22s,opacity .22s; }
  @media(max-width:768px) {
    .nav-links-desktop { display:none !important; }
    .nav-cta-desktop   { display:none !important; }
    .hamburger         { display:flex; }
  }

  /* ── MOBILE MENU ── */
  .mobile-menu { display:none;flex-direction:column;position:fixed;top:72px;left:0;right:0;bottom:0;background:#1a1440;z-index:99;padding:24px 20px;gap:4px;overflow-y:auto; }
  .mobile-menu.open { display:flex; }
  .mobile-nav-link { font-size:17px;font-weight:500;color:rgba(255,255,255,.75);text-decoration:none;padding:14px 16px;border-radius:10px;font-family:var(--fb);transition:background .15s,color .15s;display:block; }
  .mobile-nav-link:hover { background:rgba(255,255,255,.07);color:#fff; }
  .mobile-divider { height:1px;background:rgba(255,255,255,.08);margin:12px 0; }

  /* ══════════════════════════════════════════════
     RESPONSIVE DESIGN SYSTEM — fold-based layout
     Each section targets min-height:100vh on desktop
     and auto-height (content-driven) on mobile
  ══════════════════════════════════════════════ */

  /* ── BASE SECTION PADDING ── */
  /* Desktop: generous top/bottom so section fills fold */
  .sec-pad { padding: clamp(62px,9vh,104px) clamp(20px,5vw,80px); }
  /* Inner content wrapper — consistent max-width */
  .sec-inner { max-width:1080px; margin:0 auto; width:100%; }

  /* ── SECTION HEADINGS ── */
  .sec-eyebrow { display:inline-flex;align-items:center;gap:10px;margin-bottom:14px; }
  .sec-h2 { font-family:var(--fb);font-size:clamp(24px,3.5vw,44px);font-weight:900;letter-spacing:-.03em;line-height:1.08;color:var(--t1);margin-bottom:12px; }
  .sec-sub { font-size:clamp(13px,1.4vw,16px);color:var(--t3);line-height:1.7;max-width:520px; }

  /* ── STATS BAR: 4→2x2 ── */
  .stats-bar { display:grid;grid-template-columns:repeat(4,1fr); }
  .stats-bar-cell { text-align:center; }
  @media(max-width:520px) { .stats-bar { grid-template-columns:repeat(2,1fr); } }

  /* ── PLATFORM MODULES ── */
  .pm-body { display:grid;grid-template-columns:240px 1fr;gap:16px;align-items:stretch; }
  @media(max-width:900px) { .pm-body { grid-template-columns:1fr;gap:16px; } }
  .pm-tabs { display:flex;align-items:center;gap:4px;padding:5px;background:#EEE9FB;border:1px solid var(--bd-p);border-radius:14px;margin-bottom:16px;overflow-x:auto;-webkit-overflow-scrolling:touch;scrollbar-width:none; }
  .pm-tabs::-webkit-scrollbar { display:none; }

  /* ── NIMBLE DIFFERENCE ── */
  .nd-rows { border-top:1px solid rgba(255,255,255,.1); }
  .nd-row { display:flex;align-items:center;gap:20px;padding:18px 0;border-bottom:1px solid rgba(255,255,255,.1); }
  @media(max-width:640px) { .nd-row { padding:14px 0;gap:14px; } }

  /* ── REAL RESULTS ── */
  .rr-card { display:grid;grid-template-columns:52% 48%;border-radius:18px;overflow:hidden;border:1px solid var(--bd);background:#fff;box-shadow:0 4px 24px rgba(0,0,0,.06); }
  @media(max-width:720px) { .rr-card { grid-template-columns:1fr; } }
  .rr-img { min-height:260px;position:relative; }
  @media(max-width:720px) { .rr-img { min-height:200px; } }

  /* ── SUPPLIER LOVE US ── */
  .slu-top { display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center; }
  @media(max-width:860px) { .slu-top { grid-template-columns:1fr;gap:28px; } }
  .slu-stats { display:grid;grid-template-columns:repeat(4,1fr); }
  @media(max-width:640px) { .slu-stats { grid-template-columns:repeat(2,1fr); } }

  /* ── HEAR FROM THEM ── */
  .hft-r1 { display:grid;grid-template-columns:1fr 1.1fr;gap:14px;margin-bottom:14px; }
  .hft-r2 { display:grid;grid-template-columns:1fr 1.1fr 1fr;gap:14px;margin-bottom:14px; }
  .hft-r3 { display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px; }
  @media(max-width:900px) {
    .hft-r1,.hft-r2,.hft-r3 { grid-template-columns:1fr;gap:12px;margin-bottom:12px; }
  }

  /* ── FOOTER ── */
  .ft-grid { display:grid;grid-template-columns:1.6fr 1fr 1fr 1fr;gap:40px; }
  @media(max-width:900px) { .ft-grid { grid-template-columns:1fr 1fr;gap:28px; } }
  @media(max-width:540px) { .ft-grid { grid-template-columns:1fr;gap:24px; } }
  .ft-bottom { border-top:1px solid rgba(255,255,255,.07);padding:20px 0 28px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px; }

  /* ── DOMAIN STATEMENT ── */
  .ds-wrap { max-width:760px;margin:0 auto;text-align:center; }

  /* ── LOGO MARQUEE ── */
  .lm-wrap { overflow:hidden;position:relative;padding:44px 0;background:#fff;border-top:1px solid rgba(0,0,0,.06);border-bottom:1px solid rgba(0,0,0,.06); }

  /* ── FOLD SECTIONS — min-height 100vh on large screens ── */
  @media(min-width:1024px) {
    .fold { min-height:100vh;display:flex;flex-direction:column;justify-content:center; }
    .fold-auto { min-height:auto; }
  }
  @keyframes waveSlide { from { transform: translateX(0); } to { transform: translateX(-50%); } }

  /* ── TYPEWRITER ── */
  @keyframes drift-x {
    0%   { transform: translate3d(-5%, 0, 0); }
    50%  { transform: translate3d(5%, -2%, 0); }
    100% { transform: translate3d(-5%, 0, 0); }
  }
  @keyframes drift-x-rev {
    0%   { transform: translate3d(5%, 0, 0); }
    50%  { transform: translate3d(-5%, 2%, 0); }
    100% { transform: translate3d(5%, 0, 0); }
  }
  @media (prefers-reduced-motion: reduce) {
    footer span { animation: none !important; }
  } 0%,100%{opacity:1}50%{opacity:0} }
  .tw-cursor { display:inline-block;width:2px;height:.85em;background:#A78BFA;margin-left:3px;vertical-align:middle;animation:blink .72s step-end infinite;border-radius:1px; }

  /* ── MARQUEE ANIMATION ── */
  @keyframes marqueeScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
`;

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
    {label:"4 hrs onboarding", dot:"#F5A623", border:"rgba(245,166,35,.38)", color:"#F5C060"},
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
            Trusted by finance leaders across <strong style={{ color:"rgba(255,255,255,.82)", fontWeight:600 }}>9+ industries</strong> worldwide
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


const WORKFLOW_W = 1394;
const WORKFLOW_H = 732;

const WORKFLOW_DEMOS = {
  vdd: CompliancePortalDemo,
  rfq: RFQAgentDemo,
  supplier: SupplierPortalDemo,
  invoice: InvoiceProcessingDemo,
  analytics: SupplierAnalyticsDemo,
};

function ScaledWorkflowDemo({ modId }) {
  const wrapRef = useRef(null);
  const [scale, setScale] = useState(0.4);
  const Demo = WORKFLOW_DEMOS[modId];

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const measure = () => {
      const { width, height } = el.getBoundingClientRect();
      if (width < 8 || height < 8) return;
      // Cover: fill the panel (no letterboxing top/bottom); sides clip via overflow:hidden.
      const s = Math.max(width / WORKFLOW_W, height / WORKFLOW_H);
      setScale(Math.max(0.12, s));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [modId]);

  if (!Demo) return null;

  return (
    <div
      ref={wrapRef}
      style={{
        width: "100%",
        height: "100%",
        minHeight: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "#F8FAFC",
      }}
    >
      <div
        style={{
          width: WORKFLOW_W,
          height: WORKFLOW_H,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
          flexShrink: 0,
        }}
      >
        <Demo />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   LOGO MARQUEE
───────────────────────────────────────── */
const LOGOS = [
  { label: "Mafatlal", src: "customer-logos/Mafatlal-logo.jpg" },
  { label: "India Today", src: "customer-logos/india-today-logo.png" },
  { label: "Hero Future Energies", src: "customer-logos/hero_future_energies_logo.jpeg" },
  { label: "Pernod Ricard", src: "customer-logos/Pernod_Ricard_logo.png" },
  { label: "The Oberoi", src: "customer-logos/oberoi-logo.jpeg" },
  { label: "Sud Chemie India", src: "customer-logos/sud_chemie_india_logo.jpeg" },
  { label: "Cycle", src: "customer-logos/cycle-logo.jpeg" },
  { label: "SJCPL", src: "customer-logos/SJCPL-logo.jpg" },
  { label: "UCB", src: "customer-logos/ucb.png" },
];

/* Each logo tile — spacing only, no box */
function LogoTile({ logo, showDivider }) {
  const src = assetUrl(logo.src);
  return (
    <div style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
      {showDivider && (
        <div style={{ width: 1, height: 28, background: "#E2E8F0", marginRight: 28, flexShrink: 0 }} />
      )}
      <div style={{ height: 40, minWidth: 88, maxWidth: 140, paddingRight: 28, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img
          src={src}
          alt={logo.label}
          draggable={false}
          style={{ maxHeight: 36, maxWidth: "100%", width: "auto", height: "auto", objectFit: "contain", display: "block" }}
        />
      </div>
    </div>
  );
}

function LogoMarquee() {
  const [paused, setPaused] = useState(false);
  const track = [...LOGOS, ...LOGOS];

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

      {/* Scrolling track */}
      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        style={{
          display:"flex",
          alignItems:"center",
          width:"max-content",
          animation:"marqueeScroll 36s linear infinite",
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {track.map((logo, i) => (
          <LogoTile key={`${logo.label}-${i}`} logo={logo} showDivider={i > 0} />
        ))}
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
    tab:"VDD & Onboarding",
    tabIcon:"🔍",
    badge:"SUPPLIER DUE DILIGENCE",
    title:"VDD & Onboarding",
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
              <div style={{ display:"inline-flex", alignItems:"center", gap:5, background:`${colour}0e`, border:`1px solid ${colour}22`, borderRadius:100, padding:"4px 12px" }}>
                <span style={{ width:5, height:5, borderRadius:"50%", background:colour, display:"inline-block" }} />
                <span style={{ fontSize:11, fontWeight:700, color:colour, fontFamily:"var(--fb)" }}>Live Preview</span>
              </div>
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
  const [active, setActive] = useState("steel");
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
            fontFamily:"var(--fb)", fontSize:"clamp(32px,4.5vw,56px)",
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
        <p style={{
          fontFamily:"'Kalam', cursive",
          fontSize: isMobile ? "clamp(24px,6.5vw,34px)" : "clamp(28px,3vw,44px)",
          fontWeight:700,
          lineHeight:1.45,
          color:"#1a1a3e",
          marginBottom: isMobile ? 32 : 48,
          letterSpacing:".005em",
          textAlign:"center",
        }}>
          We've baked decades of domain expertise into workflows that are{" "}
          <span style={{ color:"#3B2EC4", display:"inline-block", borderBottom:"3px solid #3B2EC4", paddingBottom:1 }}>ready-to-use</span>
          , AI that handles the{" "}
          <span style={{ color:"#3B2EC4", display:"inline-block", borderBottom:"3px solid #3B2EC4", paddingBottom:1 }}>heavy lifting</span>
          , and compliance that keeps you{" "}
          <span style={{ color:"#3B2EC4", display:"inline-block", borderBottom:"3px solid #3B2EC4", paddingBottom:1 }}>audit-proof</span>.
        </p>

        {/* Arrow */}
        <div style={{ display:"flex", justifyContent:"center", marginBottom: isMobile ? 20 : 28 }}>
          <img src={assetUrl("arrow.svg")} alt="" style={{ width: isMobile ? 60 : 80, height:"auto" }} />
        </div>

        {/* Sub-statement */}
        <p style={{
          fontFamily:"'Kalam', cursive",
          fontSize: isMobile ? "clamp(20px,5.5vw,28px)" : "clamp(22px,2.2vw,32px)",
          fontWeight:700,
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
          <h2 style={{ fontFamily:"var(--fb)", fontSize:"clamp(28px,4vw,48px)", fontWeight:700, letterSpacing:"-.035em", color:"#0F172A", lineHeight:1.05 }}>Hear From Them</h2>
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
              <h4 style={{ position:"relative", zIndex:1, fontFamily:"var(--fb)", fontSize:17, fontWeight:800, color:"#fff", lineHeight:1.28, letterSpacing:"-.02em" }}>How Indian Enterprises Cut Supplier Onboarding from 21 Days to 4 Hours</h4>
            </div>
            <div style={{ display:"flex", padding:"0 20px", marginTop:-14, marginBottom:12, position:"relative", zIndex:2 }}>
              <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:"#fff", border:"1px solid #E2E8F0", borderRadius:100, padding:"4px 12px", boxShadow:"0 2px 8px rgba(0,0,0,.1)" }}>
                <span style={{ fontFamily:"var(--fb)", fontSize:14, fontWeight:800, color:"#391085" }}>21→4</span>
                <span style={{ fontSize:11, color:"#64748B", fontFamily:"var(--fb)" }}>days to hours</span>
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
   FOOTER
───────────────────────────────────────── */
function Footer({ onNavigate }) {
  const w = useWidth();
  const isMobile = w < 640;
  const isTablet = w < 900;
  const twWord = useTypewriter(["Security","Diligence","Results","Compliance","Scale"]);

  const cols = [
    ["PRODUCT", ["Supplier Due Diligence","Supplier Portal","Invoice Processing","RFx Management","Supplier Analytics","Blackbox API"]],
    ["COMPANY", ["About Us","Careers","Press & Media","Partners","Contact"]],
    ["RESOURCES",["Blog","Case Studies","Automation Smiles","Guides & Whitepapers","Trust Center"]],
  ];

  const socials = [
    { label:"in", title:"LinkedIn" },
    { label:"𝕏",  title:"X / Twitter" },
    { label:"▶",  title:"YouTube" },
  ];

  const dots = [
    { left:"12%", top:"18%", size:1.5, op:.65 },
    { left:"67%", top:"12%", size:1,   op:.55 },
    { left:"83%", top:"58%", size:1.5, op:.50 },
    { left:"34%", top:"72%", size:1,   op:.60 },
    { left:"55%", top:"40%", size:1,   op:.45 },
  ];

  return (
    <footer style={{
      background:"oklch(0.08 0.02 270)",
      position:"relative", overflow:"hidden",
    }}>

      {/* ── Static depth glows ── */}
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", zIndex:0,
        background:`
          radial-gradient(ellipse 55% 60% at 10% 20%, oklch(0.25 0.08 280 / 0.35), transparent 70%),
          radial-gradient(ellipse 50% 55% at 88% 78%, oklch(0.22 0.10 270 / 0.30), transparent 70%)
        `,
      }} />

      {/* ── Constellation dots ── */}
      {dots.map((d,i)=>(
        <div key={i} style={{
          position:"absolute", left:d.left, top:d.top, zIndex:1, pointerEvents:"none",
          width:d.size, height:d.size, borderRadius:"50%",
          background:"radial-gradient(circle, oklch(0.85 0.08 280 / 0.9), transparent 70%)",
          opacity:d.op,
        }} />
      ))}

      {/* ── Infinite Drift Layers ── */}
      <span style={{ position:"absolute", inset:"-10%", pointerEvents:"none", zIndex:1,
        filter:"blur(60px)", willChange:"transform",
        background:"radial-gradient(50% 60% at 30% 50%, oklch(0.60 0.22 280 / 0.52), transparent 70%)",
        animation:"drift-x 30s ease-in-out infinite",
      }} />
      <span style={{ position:"absolute", inset:"-10%", pointerEvents:"none", zIndex:1,
        filter:"blur(60px)", willChange:"transform",
        background:"radial-gradient(45% 55% at 70% 60%, oklch(0.55 0.24 260 / 0.49), transparent 70%)",
        animation:"drift-x-rev 40s ease-in-out infinite",
      }} />
      <span style={{ position:"absolute", inset:"-10%", pointerEvents:"none", zIndex:1,
        filter:"blur(60px)", willChange:"transform",
        background:"radial-gradient(40% 50% at 50% 30%, oklch(0.55 0.20 300 / 0.38), transparent 70%)",
        animation:"drift-x 50s ease-in-out infinite",
      }} />

      {/* ── Main content ── */}
      <div style={{
        maxWidth:1080, margin:"0 auto",
        position:"relative", zIndex:10,
        padding: isMobile ? "47px 20px 0" : "62px 5vw 0",
      }}>
        <div className="ft-grid" style={{ paddingBottom: isMobile ? 31 : 42 }}>

          {/* ── Brand column ── */}
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:20 }}>
              <NimbleLogo height={20} />
            </div>
            <div style={{ marginBottom:14 }}>
              <p style={{ fontFamily:"var(--fb)", fontSize: isMobile ? 18 : 20, fontWeight:800, color:"#fff", lineHeight:1.25, letterSpacing:"-.02em" }}>
                Built with Intent.<br />
                Built for{" "}
                <span style={{ background:"linear-gradient(95deg,#8B7FF5,#A78BFA)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
                  {twWord}
                </span>
                <span className="tw-cursor" />
              </p>
            </div>
            <p style={{ fontSize:13, color:"rgba(255,255,255,.35)", lineHeight:1.7, fontFamily:"var(--fb)", maxWidth:260, marginBottom: isMobile ? 16 : "clamp(14px,2vh,24px)" }}>
              AI-orchestrated source-to-pay — purpose-built for the Indian enterprise.
            </p>
            <div style={{ display:"flex", gap:8 }}>
              {socials.map(s=>(
                <a key={s.label} href="#" title={s.title} style={{
                  width:36, height:36, borderRadius:8,
                  background:"rgba(255,255,255,.06)",
                  border:"1px solid rgba(255,255,255,.12)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:14, color:"rgba(255,255,255,.45)", textDecoration:"none",
                  transition:"background .18s, color .18s, border-color .18s",
                  fontFamily:"var(--fb)", fontWeight:500,
                }}
                  onMouseEnter={e=>{ e.currentTarget.style.background="rgba(255,255,255,.12)"; e.currentTarget.style.color="#fff"; e.currentTarget.style.borderColor="rgba(255,255,255,.25)"; }}
                  onMouseLeave={e=>{ e.currentTarget.style.background="rgba(255,255,255,.06)"; e.currentTarget.style.color="rgba(255,255,255,.45)"; e.currentTarget.style.borderColor="rgba(255,255,255,.12)"; }}
                >{s.label}</a>
              ))}
            </div>
          </div>

          {/* ── Link columns ── */}
          {cols.map(([title,links])=>(
            <div key={title}>
              <div style={{
                fontSize:10, fontWeight:700, letterSpacing:".15em",
                textTransform:"uppercase", color:"rgba(255,255,255,.22)",
                marginBottom:18, fontFamily:"var(--fb)",
              }}>{title}</div>
              <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                {links.map(l=>(
                  <a key={l} href="#" style={{
                    fontSize:14, color:"rgba(255,255,255,.5)",
                    textDecoration:"none", fontFamily:"var(--fb)",
                    fontWeight:400, transition:"color .15s",
                  }}
                    onClick={e=>{ if(footerLabelToPage(l)){ e.preventDefault(); goFooterLink(l, onNavigate); } }}
                    onMouseEnter={e=>e.target.style.color="rgba(255,255,255,.9)"}
                    onMouseLeave={e=>e.target.style.color="rgba(255,255,255,.5)"}
                  >{l}</a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ── Bottom bar ── */}
        <div style={{
          display:"flex", justifyContent:"space-between", alignItems:"center",
          flexWrap:"wrap", gap:10,
          borderTop:"1px solid rgba(255,255,255,.07)",
          padding: isMobile ? "21px 0 31px" : "26px 0 36px",
        }}>
          <div style={{ fontSize:12, color:"rgba(255,255,255,.22)", fontFamily:"var(--fb)" }}>
            © 2025 NimbleS2P. All rights reserved.
          </div>
          <div style={{ display:"flex", gap:20, flexWrap:"wrap" }}>
            {["Privacy Policy","Terms of Use","Cookie Policy"].map(l=>(
              <a key={l} href="#" style={{
                fontSize:12, color:"rgba(255,255,255,.28)",
                textDecoration:"none", fontFamily:"var(--fb)", transition:"color .15s",
              }}
                onClick={e=>{ e.preventDefault(); goLegalPage(l, onNavigate); }}
                onMouseEnter={e=>e.target.style.color="rgba(255,255,255,.7)"}
                onMouseLeave={e=>e.target.style.color="rgba(255,255,255,.28)"}
              >{l}</a>
            ))}
          </div>
        </div>
      </div>

    </footer>
  );
}

/* ─────────────────────────────────────────
   ROOT
───────────────────────────────────────── */
/* ── NAV — identical to homepage ── */
/* ═══════════════════════════════════════════════════════════
   SUPPLIER DUE DILIGENCE — PRODUCT PAGE
   Nav: same homepage Nav component with onBack breadcrumb
═══════════════════════════════════════════════════════════ */

/* ── DATA ── */
const tableRows = [
  ["Onboarding Speed","Weeks to months, manual & opaque","Onboard within hours"],
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
    { val:"4 hrs",   label:"Average onboarding" },
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
          fontSize: isMobile ? "clamp(30px,8.5vw,44px)" : "clamp(44px,5.2vw,72px)",
          lineHeight:.98, letterSpacing:"-.05em", marginBottom:22,
          background:"linear-gradient(160deg,#fff 0%,#fff 40%,#E2D9FE 60%,#F5C842 85%,#F5A623 100%)",
          WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
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
    { label:"Supplier onboarding time", prev:"45 days",     val:"4 hrs",  color:"#6320E0" },
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
                    From 45-day supplier cycles to 4 hours. NimbleS2P didn't just improve our process — it replaced it entirely.
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
            <h2 style={{ fontFamily:"var(--fb)", fontWeight:900, fontSize: isMobile ? "clamp(24px,7vw,34px)" : "clamp(26px,3.2vw,40px)", lineHeight:1.06, letterSpacing:"-.04em", background:"linear-gradient(95deg,#fff 0%,#fff 30%,#F5D060 62%,#F5A623 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", marginBottom:16 }}>
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
function VendorDueDiligencePage({ onBack, onNavigate }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);
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
          fontSize: isMobile ? "clamp(30px,8.5vw,44px)" : "clamp(44px,5.2vw,72px)",
          lineHeight:.98, letterSpacing:"-.05em", marginBottom:22,
          background:"linear-gradient(95deg,#fff 0%,#fff 30%,#F5D060 62%,#F5A623 100%)",
          WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
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
            <p style={{
              fontFamily:"'Kalam',cursive", fontWeight:700,
              fontSize: isMobile ? "clamp(22px,6vw,32px)" : "clamp(26px,2.9vw,44px)",
              lineHeight:1.35, letterSpacing:".005em",
              color:"#1a1a3e", margin:0,
            }}>
              If suppliers still chase you<br />through inboxes, you're not{" "}
              <span>"future-ready."</span>
              <br />
              <span style={{
                color:"#3B2EC4",
                display:"inline-block",
                borderBottom:"3px solid #3B2EC4",
                paddingBottom:2,
              }}>You're just future-pretending.</span>
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
function SupplierPortalPage({ onBack, onNavigate }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);
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
          fontSize: isMobile ? "clamp(30px,8.5vw,44px)" : "clamp(44px,5.2vw,72px)",
          lineHeight:.98, letterSpacing:"-.05em", marginBottom:22,
          background:"linear-gradient(160deg,#fff 0%,#fff 40%,#E2D9FE 60%,#F5C842 85%,#F5A623 100%)",
          WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
          paddingBottom:"0.1em",
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
            <div style={{ display:"flex", alignItems:"center", gap:6, flexWrap:"nowrap" }}>
              <Chip id="email"  icon="📧" label="Email"           color={C.purple} step={0} side="bottom" />
              <HArrow color={C.purple.dot} step={0} />
              <Chip id="portal" icon="🌐" label="Supplier Portal" color={C.purple} step={0} side="bottom" />
              <HArrow color={C.purple.dot} step={0} />
              <Chip id="scan"   icon="📁" label="Scan Drive"      color={C.purple} step={0} side="bottom" />
              <HArrow color={C.purple.dot} step={0} />
              <Chip id="api"    icon="🔌" label="API Integration" color={C.purple} step={0} side="bottom" />
            </div>
          </Lane>

          <VArrow color={C.blue.dot} step={0} />

          {/* ══ ROW 2: AI OPERATIONAL ══ */}
          <Lane color={C.blue} label="AI Operational Layer">
            <div style={{ display:"flex", alignItems:"center", gap:6, flexWrap:"nowrap" }}>

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
            <div style={{ display:"flex", alignItems:"center", gap:6 }}>
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
              <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                <Chip id="autopost" icon="⚡" label="Auto Posting" color={C.emerald} step={7} side="top" />
              </div>
            </Lane>

            {/* Exception path */}
            <Lane color={C.red} label="⚠️ Exception Path">
              <div style={{ display:"flex", alignItems:"center", gap:5, flexWrap:"nowrap" }}>
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
            <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"nowrap" }}>
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
            <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
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
            <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
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

function IPFAQs() {
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
            <a href="#" style={{ display:"inline-flex", alignItems:"center", gap:6, fontSize:14, fontWeight:600, color:"var(--p600)", fontFamily:"var(--fb)", textDecoration:"none", borderBottom:"1.5px solid var(--p200)", paddingBottom:2 }}
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

/* ════════════════════════════════════
   7. CTA — lead magnet
════════════════════════════════════ */
function IPCTA() {
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
            <div style={{ display:"inline-flex", alignItems:"center", gap:7, background:"rgba(245,166,35,.12)", border:"1px solid rgba(245,166,35,.28)", borderRadius:100, padding:"5px 14px", marginBottom:20 }}>
              <span style={{ width:6, height:6, borderRadius:"50%", background:"#F5A623", display:"inline-block", animation:"pulse-dot 2s infinite" }} />
              <span style={{ fontSize:11, fontWeight:700, color:"#F5D060", fontFamily:"var(--fb)", letterSpacing:".05em", textTransform:"uppercase" }}>Free Diagnostic</span>
            </div>
            <h2 style={{ fontFamily:"var(--fb)", fontWeight:900, fontSize: isMobile ? "clamp(24px,7vw,34px)" : "clamp(26px,3.2vw,40px)", lineHeight:1.06, letterSpacing:"-.04em", background:"linear-gradient(95deg,#fff 0%,#fff 30%,#F5D060 62%,#F5A623 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", marginBottom:16 }}>
              {PRODUCT_PAGE_RESOURCES.invoice.label}
            </h2>
            <p style={{ fontSize: isMobile ? 14.5 : 16, color:"rgba(255,255,255,.48)", lineHeight:1.75, fontFamily:"var(--fb)" }}>
              A practical self-assessment that benchmarks your current invoice workflow against best-in-class automation. Know exactly where your gaps are.
            </p>
          </div>
          <div style={{ background:"rgba(255,255,255,.06)", border:"1px solid rgba(255,255,255,.12)", borderRadius:20, padding: isMobile ? "28px 22px" : "36px 32px", backdropFilter:"blur(16px)" }}>
            {!done ? (
              <>
                <div style={{ fontSize:13, fontWeight:600, color:"rgba(255,255,255,.5)", fontFamily:"var(--fb)", marginBottom:20 }}>Enter your work email for instant access</div>
                <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                  <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@company.com"
                    style={{ width:"100%", background:"rgba(255,255,255,.08)", border:"1.5px solid rgba(255,255,255,.16)", borderRadius:10, outline:"none", padding:"13px 16px", fontSize:15, color:"#fff", fontFamily:"var(--fb)", transition:"border-color .18s" }}
                    onFocus={e=>e.target.style.borderColor="rgba(245,166,35,.6)"}
                    onBlur={e=>e.target.style.borderColor="rgba(255,255,255,.16)"}
                  />
                  <button onClick={()=>{ if(email) setDone(true); }} style={{ width:"100%", background:"linear-gradient(135deg,#E8920A,#F5B020)", color:"#fff", border:"none", borderRadius:10, padding:"13px 24px", fontSize:15, fontWeight:700, cursor:"pointer", fontFamily:"var(--fb)", boxShadow:"0 6px 24px rgba(232,150,10,.45)", transition:"all .2s" }}
                    onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-1px)"; e.currentTarget.style.boxShadow="0 10px 32px rgba(232,150,10,.6)"; }}
                    onMouseLeave={e=>{ e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow="0 6px 24px rgba(232,150,10,.45)"; }}
                  >Download Diagnostic →</button>
                </div>
                <p style={{ fontSize:11.5, color:"rgba(255,255,255,.22)", marginTop:14, fontFamily:"var(--fb)", textAlign:"center" }}>No spam. Unsubscribe anytime.</p>
              </>
            ) : (
              <div style={{ textAlign:"center", padding:"20px 0" }}>
                <div style={{ fontSize:40, marginBottom:14 }}>✅</div>
                <div style={{ fontSize:16, fontWeight:700, color:"#F5D060", fontFamily:"var(--fb)", marginBottom:8 }}>Diagnostic on its way!</div>
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
   ROOT PAGE
════════════════════════════════════ */
function InvoiceProcessingPage({ onBack, onNavigate }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <>
      <Nav onNavigate={onNavigate} onBack={onBack} pageName="Invoice Processing Automation" />
      <main>
        <IPHero onNavigate={onNavigate} />
        <IPArchitecture />
        <IPAIAgents />
        <IPFeatures />
        <IPVideo />
        <IPFAQs />
        <IPCTA />
      </main>
      <VDDFooter onNavigate={onNavigate} />
    </>
  );
}


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
          fontSize: isMobile ? "clamp(30px,8.5vw,44px)" : "clamp(44px,5.2vw,72px)",
          lineHeight:.98, letterSpacing:"-.05em", marginBottom:22,
          background:"linear-gradient(160deg,#fff 0%,#fff 40%,#E2D9FE 60%,#F5C842 85%,#F5A623 100%)",
          WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
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
function RFQFAQs() {
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
            <a href="#" style={{ display:"inline-flex", alignItems:"center", gap:6, fontSize:14, fontWeight:600, color:"var(--p600)", fontFamily:"var(--fb)", textDecoration:"none", borderBottom:"1.5px solid var(--p200)", paddingBottom:2, transition:"color .15s,border-color .15s" }}
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

/* ════════════════════════════════════
   6. CTA
════════════════════════════════════ */
function RFQCTA() {
  const w = useWidth(); const isMobile = w < 640;
  const [email, setEmail] = useState(""); const [done, setDone] = useState(false);
  const ref = useReveal();
  return (
    <section style={{ background:"linear-gradient(160deg,#0f0c29 0%,#1a1260 40%,#261d6b 70%,#1e1050 100%)", position:"relative", overflow:"hidden", padding: isMobile ? "64px 20px 80px" : "clamp(72px,9vh,110px) 5vw" }}>
      <div style={{ position:"absolute", bottom:"-15%", right:"-5%", width:"55%", height:"85%", background:"radial-gradient(ellipse at 80% 80%,rgba(245,166,35,.16) 0%,transparent 60%)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", top:"-15%", left:"-5%", width:"55%", height:"80%", background:"radial-gradient(ellipse at 20% 20%,rgba(99,32,224,.28) 0%,transparent 60%)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(rgba(255,255,255,.05) 1px,transparent 1px)", backgroundSize:"26px 26px", pointerEvents:"none" }} />
      <div style={{ maxWidth:1040, margin:"0 auto", position:"relative", zIndex:2 }}>
        <div className="reveal" ref={ref} style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 40 : 80, alignItems:"center" }}>
          <div>
            <div style={{ display:"inline-flex", alignItems:"center", gap:7, background:"rgba(245,166,35,.12)", border:"1px solid rgba(245,166,35,.28)", borderRadius:100, padding:"5px 14px", marginBottom:20 }}>
              <span style={{ width:6, height:6, borderRadius:"50%", background:"#F5A623", display:"inline-block", animation:"pulse-dot 2s infinite" }} />
              <span style={{ fontSize:11, fontWeight:700, color:"#F5D060", fontFamily:"var(--fb)", letterSpacing:".05em", textTransform:"uppercase" }}>Free Diagnostic</span>
            </div>
            <h2 style={{ fontFamily:"var(--fb)", fontWeight:900, fontSize: isMobile ? "clamp(24px,7vw,34px)" : "clamp(26px,3.2vw,40px)", lineHeight:1.06, letterSpacing:"-.04em", background:"linear-gradient(95deg,#fff 0%,#fff 30%,#F5D060 62%,#F5A623 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", marginBottom:16 }}>
              {PRODUCT_PAGE_RESOURCES.rfq.label}
            </h2>
            <p style={{ fontSize: isMobile ? 14.5 : 16, color:"rgba(255,255,255,.48)", lineHeight:1.75, fontFamily:"var(--fb)" }}>
              A short diagnostic that benchmarks RFQ maturity across speed, governance, collaboration, and AI enablement. Know exactly where your gaps are.
            </p>
          </div>
          <div style={{ background:"rgba(255,255,255,.06)", border:"1px solid rgba(255,255,255,.12)", borderRadius:20, padding: isMobile ? "28px 22px" : "36px 32px", backdropFilter:"blur(16px)" }}>
            {!done ? (
              <>
                <div style={{ fontSize:13, fontWeight:600, color:"rgba(255,255,255,.5)", fontFamily:"var(--fb)", marginBottom:20 }}>Enter your work email for instant access</div>
                <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                  <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@company.com"
                    style={{ width:"100%", background:"rgba(255,255,255,.08)", border:"1.5px solid rgba(255,255,255,.16)", borderRadius:10, outline:"none", padding:"13px 16px", fontSize:15, color:"#fff", fontFamily:"var(--fb)", transition:"border-color .18s" }}
                    onFocus={e=>e.target.style.borderColor="rgba(245,166,35,.6)"}
                    onBlur={e=>e.target.style.borderColor="rgba(255,255,255,.16)"}
                  />
                  <button onClick={()=>{if(email) setDone(true);}} style={{ width:"100%", background:"linear-gradient(135deg,#E8920A,#F5B020)", color:"#fff", border:"none", borderRadius:10, padding:"13px 24px", fontSize:15, fontWeight:700, cursor:"pointer", fontFamily:"var(--fb)", boxShadow:"0 6px 24px rgba(232,150,10,.45)", transition:"all .2s" }}
                    onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-1px)";e.currentTarget.style.boxShadow="0 10px 32px rgba(232,150,10,.6)";}}
                    onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="0 6px 24px rgba(232,150,10,.45)";}}
                  >Download Now →</button>
                </div>
                <p style={{ fontSize:11.5, color:"rgba(255,255,255,.22)", marginTop:14, fontFamily:"var(--fb)", textAlign:"center" }}>No spam. Unsubscribe anytime.</p>
              </>
            ) : (
              <div style={{ textAlign:"center", padding:"20px 0" }}>
                <div style={{ fontSize:40, marginBottom:14 }}>✅</div>
                <div style={{ fontSize:16, fontWeight:700, color:"#F5D060", fontFamily:"var(--fb)", marginBottom:8 }}>RFQ Reality Index on its way!</div>
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
        <p style={{
          fontFamily:"'Kalam', cursive",
          fontSize: isMobile ? "clamp(22px,6.5vw,32px)" : "clamp(28px,3vw,44px)",
          fontWeight:700,
          lineHeight:1.55,
          color:"#1a1a3e",
          marginBottom: isMobile ? 32 : 52,
          letterSpacing:".005em",
          textAlign:"center",
        }}>
          At{" "}
          <span style={{ color:"#3B2EC4", display:"inline-block", borderBottom:"3px solid #3B2EC4", paddingBottom:1 }}>USD 50 Million spend</span>
          {", inefficient sourcing silently leaks "}
          <span style={{ color:"#3B2EC4", display:"inline-block", borderBottom:"3px solid #3B2EC4", paddingBottom:1 }}>2–5% annually</span>
          {" while locking "}
          <span style={{ color:"#3B2EC4", whiteSpace:"nowrap", display:"inline-block", borderBottom:"3px solid #3B2EC4", paddingBottom:1 }}>20–30% of spend</span>
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

function RFQManagementPage({ onBack, onNavigate }) {
  useEffect(()=>{ window.scrollTo(0,0); },[]);
  return (
    <>
      <Nav onNavigate={onNavigate} onBack={onBack} pageName="RFx Management" />
      <main>
        <RFQHero onNavigate={onNavigate} />
        <RFQDomainStatement />
        <RFQAIAgents />
        <RFQFeatures />
        <RFQBenefits />
        <RFQFAQs />
        <RFQCTA />
      </main>
      <VDDFooter onNavigate={onNavigate} />
    </>
  );
}




/* ─────────────────────────────────────────
   ROOT — with routing
───────────────────────────────────────── */
/* ── Demo form helpers — defined at module level so they never remount ── */
/* ═══════════════════════════════════════════════════════════
   BOOK A DEMO PAGE
═══════════════════════════════════════════════════════════ */
function BookDemoPage({ onBack, onNavigate }) {
  const w = useWidth(); const isMobile = w < 640;
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending]     = useState(false);
  const [form, setForm] = useState({
    firstName:"", lastName:"", email:"", phone:"",
    company:"", title:"", employees:"", industry:"",
    modules:[], challenge:"", timeline:"", message:"",
  });
  const [errors,  setErrors]  = useState({});
  const [touched, setTouched] = useState({});

  useEffect(()=>{ window.scrollTo(0,0); },[]);

  const INDUSTRIES  = ["Manufacturing","Energy & Utilities","Chemical","FMCG","Infra & Construction","Textile","Hospitality","Media","Financial Services","Healthcare","Other"];
  const SIZES       = ["1–50","51–200","201–500","501–1000","1001–5000","5000+"];
  const TIMELINES   = ["Immediately","Within 1 month","1–3 months","3–6 months","Just exploring"];
  const MODULES_LIST= ["VDD & Onboarding","Supplier Portal","Invoice Processing","RFx Management","Early Financing","Supplier Analytics"];
  const REQUIRED    = ["firstName","lastName","email","company","title","employees","industry","timeline"];

  const set = (k,v) => {
    const next = {...form,[k]:v};
    setForm(next);
    if (touched[k]) validateForm(next);
  };
  const toggleModule = (m) => set("modules", form.modules.includes(m) ? form.modules.filter(x=>x!==m) : [...form.modules,m]);

  const validateForm = (f = form) => {
    const e = {};
    REQUIRED.forEach(k=>{ if (!f[k]) e[k]="Required"; });
    if (f.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email="Valid work email required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleBlur = (k) => { setTouched(t=>({...t,[k]:true})); validateForm(); };

  const handleSubmit = async () => {
    const allT = {}; REQUIRED.forEach(k=>allT[k]=true);
    setTouched(allT);
    if (!validateForm()) return;
    setSending(true);
    try {
      const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_nimbles2p";
      const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_demo_req";
      const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
      if (!PUBLIC_KEY) throw new Error("EmailJS not configured");
      if (!window.emailjs) {
        await new Promise((res,rej)=>{ const s=document.createElement("script"); s.src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"; s.onload=res; s.onerror=rej; document.head.appendChild(s); });
        window.emailjs.init({publicKey:PUBLIC_KEY});
      }
      await window.emailjs.send(SERVICE_ID,TEMPLATE_ID,{
        to_email:"rashmee@techpanion.com", cc_email:"info@techpanion.com",
        from_name:`${form.firstName} ${form.lastName}`, from_email:form.email, reply_to:form.email,
        phone:form.phone||"—", company:form.company, job_title:form.title,
        employees:form.employees, industry:form.industry,
        modules:form.modules.length?form.modules.join(", "):"—",
        challenge:form.challenge||"—", timeline:form.timeline, notes:form.message||"—",
        subject:`Demo Request — ${form.company} (${form.industry})`,
      });
      setSubmitted(true);
    } catch {
      const body = [`Name: ${form.firstName} ${form.lastName}`,`Email: ${form.email}`,`Phone: ${form.phone||"—"}`,`Company: ${form.company}`,`Title: ${form.title}`,`Size: ${form.employees}`,`Industry: ${form.industry}`,`Modules: ${form.modules.join(", ")||"—"}`,`Challenge: ${form.challenge||"—"}`,`Timeline: ${form.timeline}`,`Notes: ${form.message||"—"}`].join("\n");
      window.open(`mailto:rashmee@techpanion.com,info@techpanion.com?subject=${encodeURIComponent(`Demo Request — ${form.company}`)}&body=${encodeURIComponent(body)}`,"_blank");
      setSubmitted(true);
    } finally { setSending(false); }
  };

  /* ── Shared input style ── */
  const inp = (id) => {
    const hasErr = touched[id] && errors[id];
    const isOk   = touched[id] && !errors[id] && (Array.isArray(form[id]) ? form[id].length : form[id]);
    return {
      fontFamily:"var(--fb)", fontSize:14, color:"#0F172A",
      background: hasErr ? "#FFF5F5" : "#fff",
      border:`1.5px solid ${hasErr ? "#EF4444" : isOk ? "#059669" : "#CBD5E1"}`,
      borderRadius:10, padding:"11px 14px", outline:"none",
      transition:"border-color .18s, box-shadow .18s",
      boxShadow: hasErr ? "0 0 0 3px rgba(239,68,68,.1)" : isOk ? "0 0 0 3px rgba(5,150,105,.08)" : "none",
      width:"100%", boxSizing:"border-box",
    };
  };

  /* ── Field wrapper ── */
  const Field = ({ id, label, required:req, children }) => (
    <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
      <label style={{ fontFamily:"var(--fb)", fontSize:12.5, fontWeight:700, color:"#334155", letterSpacing:"-.01em" }}>
        {label}{req && <span style={{ color:"#6320E0", marginLeft:3 }}>*</span>}
      </label>
      {children}
      {touched[id] && errors[id] && (
        <div style={{ fontFamily:"var(--fb)", fontSize:11.5, color:"#EF4444", display:"flex", alignItems:"center", gap:4 }}>
          <span>⚠</span> {errors[id]}
        </div>
      )}
    </div>
  );

  /* ── Section header ── */
  const SectionHead = ({children}) => (
    <div style={{ fontSize:10.5, fontWeight:800, letterSpacing:".12em", textTransform:"uppercase", color:"#6320E0", fontFamily:"var(--fb)", marginBottom:16, paddingBottom:10, borderBottom:"1.5px solid rgba(99,32,224,.12)" }}>{children}</div>
  );

  return (
    <>
      <Nav onNavigate={onNavigate} onBack={onBack} pageName="Book a Demo" />
      <main>
        <section style={{
          minHeight:"100vh", position:"relative", overflow:"hidden",
          background:"#F5F3FF",
          display:"flex", alignItems:"flex-start", justifyContent:"center",
          padding: isMobile ? "110px 20px 60px" : "100px 5vw 80px",
        }}>
          {/* Top accent line */}
          <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:"linear-gradient(90deg,var(--p500),var(--p300),#F59E0B)", pointerEvents:"none" }} />
          {/* Dot grid */}
          <div style={{ position:"absolute", inset:0, pointerEvents:"none", backgroundImage:"radial-gradient(rgba(99,32,224,.07) 1px,transparent 1px)", backgroundSize:"28px 28px" }} />
          {/* Corner glows */}
          <div style={{ position:"absolute", top:"-10%", left:"-5%", width:"45%", height:"60%", background:"radial-gradient(ellipse, rgba(99,32,224,.08) 0%, transparent 65%)", pointerEvents:"none" }} />
          <div style={{ position:"absolute", bottom:"-10%", right:"-5%", width:"45%", height:"60%", background:"radial-gradient(ellipse, rgba(245,166,35,.06) 0%, transparent 65%)", pointerEvents:"none" }} />

          <div style={{ position:"relative", zIndex:2, width:"100%", maxWidth:1100, display:"grid", gridTemplateColumns: isMobile ? "1fr" : "380px 1fr", gap: isMobile ? 40 : 64, alignItems:"flex-start" }}>

            {/* ── LEFT COLUMN — copy + trust signals ── */}
            <div style={{ position: isMobile ? "static" : "sticky", top:32 }}>
              <div className="fade-up" style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(99,32,224,.1)", border:"1px solid rgba(99,32,224,.2)", borderRadius:100, padding:"6px 16px", marginBottom:24 }}>
                <span style={{ width:6, height:6, borderRadius:"50%", background:"#6320E0", display:"inline-block", animation:"pulse-dot 2s infinite" }} />
                <span style={{ fontSize:11, fontWeight:700, color:"#391085", fontFamily:"var(--fb)", letterSpacing:".08em", textTransform:"uppercase" }}>Book a Demo</span>
              </div>

              <h1 className="fade-up d1" style={{
                fontFamily:"var(--fb)", fontWeight:700, letterSpacing:"-.03em", lineHeight:1.05,
                fontSize: isMobile ? "clamp(26px,7vw,34px)" : "clamp(28px,3vw,42px)",
                color:"#0A0F1E", marginBottom:18,
              }}>
                See <span style={{ color:"#391085", fontWeight:900 }}>NimbleS2P</span><br />in Action.
              </h1>

              <p className="fade-up d2" style={{ fontSize: isMobile ? 14.5 : 16, color:"#475569", lineHeight:1.78, fontFamily:"var(--fb)", marginBottom:32 }}>
                A focused 30-minute session configured for your industry, your team, and the modules that matter most to you. Real product. Real answers. No slides.
              </p>

              {/* Trust signals */}
              <div className="fade-up d3" style={{ display:"flex", flexDirection:"column", gap:14 }}>
                {[
                  ["📅","30-min focused session","Configured around your procurement challenges."],
                  ["🏭","Industry-specific demo","Tailored to your sector, not a generic walkthrough."],
                  ["🤝","Talk to a specialist","A real product expert — not a sales script."],
                  ["🔒","Your data is safe","We never share or sell your information."],
                ].map(([icon,title,sub]) => (
                  <div key={title} style={{ display:"flex", alignItems:"center", gap:12 }}>
                    <div style={{ width:40, height:40, borderRadius:11, background:"rgba(99,32,224,.1)", border:"1px solid rgba(99,32,224,.18)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>{icon}</div>
                    <div>
                      <div style={{ fontFamily:"var(--fb)", fontSize:13.5, fontWeight:700, color:"#1E293B", lineHeight:1.2 }}>{title}</div>
                      <div style={{ fontFamily:"var(--fb)", fontSize:12, color:"#94A3B8", lineHeight:1.35, marginTop:2 }}>{sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT COLUMN — form card ── */}
            {!submitted ? (
              <div className="fade-up d2" style={{
                background:"#fff", border:"1.5px solid rgba(99,32,224,.15)",
                borderRadius:24, boxShadow:"0 8px 48px rgba(99,32,224,.1), 0 2px 8px rgba(0,0,0,.04)",
                overflow:"hidden", position:"relative",
              }}>
                {/* Top accent */}
                <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:"linear-gradient(90deg,#6320E0,#8B5CF6,#F5A623)", pointerEvents:"none" }} />

                {/* Card header */}
                <div style={{ padding: isMobile ? "28px 24px 20px" : "32px 40px 24px", borderBottom:"1px solid #F1F5F9", display:"flex", alignItems:"center", gap:14 }}>
                  <div style={{ width:44, height:44, borderRadius:12, background:"linear-gradient(135deg,#6320E0,#8B5CF6)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0, boxShadow:"0 6px 20px rgba(99,32,224,.35)" }}>📅</div>
                  <div>
                    <div style={{ fontFamily:"var(--fb)", fontSize: isMobile ? 17 : 20, fontWeight:900, color:"#0F172A", letterSpacing:"-.03em" }}>Request a Demo</div>
                    <div style={{ fontSize:12.5, color:"#94A3B8", fontFamily:"var(--fb)", marginTop:2 }}>Fields marked <span style={{ color:"#6320E0" }}>*</span> are required</div>
                  </div>
                </div>

                {/* Form body */}
                <div style={{ padding: isMobile ? "24px 24px 32px" : "32px 40px 40px", display:"flex", flexDirection:"column", gap:28 }}>

                  {/* Contact */}
                  <div>
                    <SectionHead>Contact Information</SectionHead>
                    <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap:14 }}>
                      <Field id="firstName" label="First Name" required>
                        <input style={inp("firstName")} value={form.firstName} onChange={e=>set("firstName",e.target.value)} onBlur={()=>handleBlur("firstName")} placeholder="Rajesh" onFocus={e=>e.target.style.borderColor="#6320E0"} />
                      </Field>
                      <Field id="lastName" label="Last Name" required>
                        <input style={inp("lastName")} value={form.lastName} onChange={e=>set("lastName",e.target.value)} onBlur={()=>handleBlur("lastName")} placeholder="Sharma" onFocus={e=>e.target.style.borderColor="#6320E0"} />
                      </Field>
                      <Field id="email" label="Work Email" required>
                        <input type="email" style={inp("email")} value={form.email} onChange={e=>set("email",e.target.value)} onBlur={()=>handleBlur("email")} placeholder="rajesh@company.com" onFocus={e=>e.target.style.borderColor="#6320E0"} />
                      </Field>
                      <Field id="phone" label="Phone Number">
                        <input type="tel" style={inp("phone")} value={form.phone} onChange={e=>set("phone",e.target.value)} onBlur={()=>handleBlur("phone")} placeholder="+91 98765 43210" onFocus={e=>e.target.style.borderColor="#6320E0"} />
                      </Field>
                    </div>
                  </div>

                  {/* Company */}
                  <div>
                    <SectionHead>Company Details</SectionHead>
                    <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap:14 }}>
                      <Field id="company" label="Company Name" required>
                        <input style={inp("company")} value={form.company} onChange={e=>set("company",e.target.value)} onBlur={()=>handleBlur("company")} placeholder="Acme Industries Ltd." onFocus={e=>e.target.style.borderColor="#6320E0"} />
                      </Field>
                      <Field id="title" label="Your Designation" required>
                        <input style={inp("title")} value={form.title} onChange={e=>set("title",e.target.value)} onBlur={()=>handleBlur("title")} placeholder="CFO / VP Procurement / CPO" onFocus={e=>e.target.style.borderColor="#6320E0"} />
                      </Field>
                      <Field id="employees" label="Company Size" required>
                        <select style={{...inp("employees"), appearance:"none", cursor:"pointer"}} value={form.employees} onChange={e=>set("employees",e.target.value)} onBlur={()=>handleBlur("employees")} onFocus={e=>e.target.style.borderColor="#6320E0"}>
                          <option value="">Select headcount range</option>
                          {SIZES.map(s=><option key={s} value={s}>{s} employees</option>)}
                        </select>
                      </Field>
                      <Field id="industry" label="Industry" required>
                        <select style={{...inp("industry"), appearance:"none", cursor:"pointer"}} value={form.industry} onChange={e=>set("industry",e.target.value)} onBlur={()=>handleBlur("industry")} onFocus={e=>e.target.style.borderColor="#6320E0"}>
                          <option value="">Select your industry</option>
                          {INDUSTRIES.map(i=><option key={i} value={i}>{i}</option>)}
                        </select>
                      </Field>
                    </div>
                  </div>

                  {/* Demo Preferences */}
                  <div>
                    <SectionHead>Demo Preferences</SectionHead>

                    {/* Module chips */}
                    <div style={{ marginBottom:18 }}>
                      <label style={{ fontFamily:"var(--fb)", fontSize:12.5, fontWeight:700, color:"#334155", display:"block", marginBottom:10 }}>Which modules are you interested in?</label>
                      <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                        {MODULES_LIST.map(m=>{
                          const sel = form.modules.includes(m);
                          return (
                            <button key={m} onClick={()=>toggleModule(m)} style={{ display:"inline-flex", alignItems:"center", gap:6, fontFamily:"var(--fb)", fontSize:13, fontWeight: sel?700:500, color: sel?"#fff":"#475569", background: sel?"#6320E0":"#F5F3FF", border:`1.5px solid ${sel?"#6320E0":"rgba(99,32,224,.2)"}`, borderRadius:100, padding:"7px 16px", cursor:"pointer", transition:"all .18s", boxShadow: sel?"0 4px 14px rgba(99,32,224,.3)":"none" }}>
                              {sel && <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 2" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                              {m}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap:14, marginBottom:14 }}>
                      <Field id="challenge" label="Primary Challenge">
                        <input style={inp("challenge")} value={form.challenge} onChange={e=>set("challenge",e.target.value)} placeholder="e.g. Manual invoice processing" onFocus={e=>e.target.style.borderColor="#6320E0"} />
                      </Field>
                      <Field id="timeline" label="Preferred Go-Live Timeline" required>
                        <select style={{...inp("timeline"), appearance:"none", cursor:"pointer"}} value={form.timeline} onChange={e=>set("timeline",e.target.value)} onBlur={()=>handleBlur("timeline")} onFocus={e=>e.target.style.borderColor="#6320E0"}>
                          <option value="">When do you want to go live?</option>
                          {TIMELINES.map(t=><option key={t} value={t}>{t}</option>)}
                        </select>
                      </Field>
                    </div>

                    <Field id="message" label="Anything else we should know?">
                      <textarea style={{...inp("message"), resize:"vertical", minHeight:90, lineHeight:1.6}} value={form.message} onChange={e=>set("message",e.target.value)} placeholder="Current ERP, number of suppliers, specific use case…" onFocus={e=>e.target.style.borderColor="#6320E0"} />
                    </Field>
                  </div>

                  {/* Submit row */}
                  <div style={{ paddingTop:8, borderTop:"1px solid #F1F5F9", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:16 }}>
                    <p style={{ fontSize:11.5, color:"#94A3B8", fontFamily:"var(--fb)", maxWidth:340, margin:0, lineHeight:1.6 }}>
                      By submitting, you agree to our <span style={{ color:"#6320E0", cursor:"pointer" }}>Privacy Policy</span>. We'll only use your info to schedule and prepare your demo.
                    </p>
                    <button onClick={handleSubmit} disabled={sending} style={{ display:"inline-flex", alignItems:"center", gap:8, background: sending?"rgba(99,32,224,.5)":"linear-gradient(135deg,#6320E0,#8B5CF6)", color:"#fff", borderRadius:12, padding:"14px 32px", fontSize:15, fontWeight:700, fontFamily:"var(--fb)", border:"none", cursor: sending?"not-allowed":"pointer", boxShadow: sending?"none":"0 6px 24px rgba(99,32,224,.4)", transition:"all .2s", letterSpacing:"-.01em", flexShrink:0 }}
                      onMouseEnter={e=>{ if(!sending){ e.currentTarget.style.transform="translateY(-1px)"; e.currentTarget.style.boxShadow="0 10px 32px rgba(99,32,224,.55)"; }}}
                      onMouseLeave={e=>{ e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow=sending?"none":"0 6px 24px rgba(99,32,224,.4)"; }}
                    >
                      {sending ? (
                        <>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ animation:"spin 1s linear infinite" }}><circle cx="8" cy="8" r="6" stroke="rgba(255,255,255,.3)" strokeWidth="2"/><path d="M8 2a6 6 0 0 1 6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
                          Sending…
                        </>
                      ) : "Book My Demo →"}
                    </button>
                  </div>

                </div>
              </div>

            ) : (
              /* ── SUCCESS STATE ── */
              <div className="fade-up" style={{
                background:"#fff", border:"1.5px solid rgba(99,32,224,.15)",
                borderRadius:24, boxShadow:"0 8px 48px rgba(99,32,224,.1)",
                padding: isMobile ? "40px 28px" : "60px 56px",
                textAlign:"center", position:"relative", overflow:"hidden",
              }}>
                <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:"linear-gradient(90deg,#6320E0,#8B5CF6,#F5A623)", pointerEvents:"none" }} />

                <div style={{ width:88, height:88, borderRadius:"50%", background:"linear-gradient(135deg,#059669,#10B981)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 28px", boxShadow:"0 8px 32px rgba(16,185,129,.3)" }}>
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><path d="M8 20l8 8L32 10" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>

                <h2 style={{ fontFamily:"var(--fb)", fontSize: isMobile ? 24 : 30, fontWeight:900, color:"#0F172A", letterSpacing:"-.04em", marginBottom:12 }}>
                  Demo Requested, {form.firstName}!
                </h2>
                <p style={{ fontFamily:"var(--fb)", fontSize:15, color:"#475569", lineHeight:1.75, maxWidth:420, margin:"0 auto 16px" }}>
                  A NimbleS2P specialist will reach out to <strong style={{ color:"#391085" }}>{form.email}</strong> within one business day to confirm your session.
                </p>
                <p style={{ fontFamily:"var(--fb)", fontSize:13.5, color:"#94A3B8", lineHeight:1.65, maxWidth:400, margin:"0 auto 32px" }}>
                  Your demo will be configured for <strong style={{ color:"#6320E0" }}>{form.company}</strong>{form.modules.length ? ` covering ${form.modules.join(", ")}` : ""}.
                </p>

                {form.modules.length > 0 && (
                  <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:8, marginBottom:32 }}>
                    {form.modules.map(m=>(
                      <span key={m} style={{ display:"inline-flex", alignItems:"center", gap:5, background:"rgba(99,32,224,.08)", border:"1px solid rgba(99,32,224,.18)", borderRadius:100, padding:"5px 14px", fontSize:12.5, fontWeight:600, color:"#391085", fontFamily:"var(--fb)" }}>
                        ✓ {m}
                      </span>
                    ))}
                  </div>
                )}

                <button onClick={()=>onNavigate("home")} style={{ display:"inline-flex", alignItems:"center", gap:7, background:"rgba(99,32,224,.08)", border:"1.5px solid rgba(99,32,224,.2)", borderRadius:10, padding:"12px 28px", fontSize:14, fontWeight:700, color:"#6320E0", cursor:"pointer", fontFamily:"var(--fb)", transition:"all .2s" }}
                  onMouseEnter={e=>{ e.currentTarget.style.background="rgba(99,32,224,.15)"; e.currentTarget.style.color="#391085"; }}
                  onMouseLeave={e=>{ e.currentTarget.style.background="rgba(99,32,224,.08)"; e.currentTarget.style.color="#6320E0"; }}
                >← Back to Home</button>
              </div>
            )}

          </div>
        </section>
      </main>
      <VDDFooter onNavigate={onNavigate} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </>
  );
}


export default function NimbleS2PHomepage() {
  const pathname = usePathname();
  const router = useRouter();
  const page = pathToPage(pathname);

  const navigate = useCallback(
    (p) => {
      const target = pageToPath(p);
      if (pathname !== target) router.push(target);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [pathname, router]
  );

  const goHome = useCallback(() => navigate("home"), [navigate]);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = globalStyles;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

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
      <>
        <Nav onNavigate={navigate} onBack={goHome} pageName="Resources" />
        <ResourcesPage />
        <VDDFooter onNavigate={navigate} />
      </>
    );
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
      <Footer onNavigate={navigate} />
    </div>
  );
}

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
          fontSize: isMobile ? "clamp(30px,8.5vw,44px)" : "clamp(36px,4vw,58px)",
          lineHeight:1.06, letterSpacing:"-.05em", marginBottom:22,
          paddingBottom:8,
          background:"linear-gradient(95deg,#fff 0%,#fff 30%,#F5D060 62%,#F5A623 100%)",
          WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
        }}>
          Turn Supplier Data Into Decisions<br />at Nimble Speed
        </h1>

        <p className="fade-up d2" style={{ fontSize: isMobile ? 15 : 18, color:"rgba(255,255,255,.52)", lineHeight:1.75, fontFamily:"var(--fb)", maxWidth:620, margin:"0 auto 36px" }}>
          Track supplier risk, compliance, performance, and operational health across your entire supplier ecosystem.
        </p>

        {/* CTA buttons */}
        <div className="fade-up d3" style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap", marginBottom:52 }}>
          <a onClick={e=>{ e.preventDefault(); if(typeof onNavigate==="function") onNavigate("getstarted"); }} href="#"
            style={{ display:"inline-flex", alignItems:"center", gap:7, background:"linear-gradient(135deg,#E8920A,#F5B020)", color:"#fff", border:"none", borderRadius:10, padding:"13px 32px", fontSize:15.5, fontWeight:700, cursor:"pointer", fontFamily:"var(--fb)", textDecoration:"none", letterSpacing:"-.01em", boxShadow:"0 4px 24px rgba(232,150,10,.48)", transition:"transform .2s,box-shadow .2s", width: isMobile ? "100%" : "auto" }}
            onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 10px 36px rgba(232,150,10,.62)";}}
            onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="0 4px 24px rgba(232,150,10,.48)";}}
          >Get Started →</a>
          <a href="#features"
            style={{ display:"inline-flex", alignItems:"center", gap:7, background:"rgba(99,32,224,.18)", color:"rgba(255,255,255,.85)", border:"1.5px solid rgba(139,92,246,.4)", borderRadius:10, padding:"12px 28px", fontSize:15, fontWeight:500, fontFamily:"var(--fb)", textDecoration:"none", backdropFilter:"blur(10px)", transition:"all .18s", width: isMobile ? "100%" : "auto" }}
            onMouseEnter={e=>{e.currentTarget.style.background="rgba(99,32,224,.35)";e.currentTarget.style.color="#fff";}}
            onMouseLeave={e=>{e.currentTarget.style.background="rgba(99,32,224,.18)";e.currentTarget.style.color="rgba(255,255,255,.85)";}}
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
            <p style={{
              fontFamily:"'Kalam', cursive",
              fontWeight:700,
              fontSize: isMobile ? "clamp(22px,6vw,34px)" : "clamp(32px,3vw,46px)",
              lineHeight:1.45, letterSpacing:".005em",
              color:"#1a1a3e", margin:0,
            }}>
              Without connected supplier analytics,{" "}
              <span style={{ color:"#3B2EC4", fontWeight:700 }}>critical supplier knowledge</span>
              {" "}remains buried across{" "}
              <span style={{ color:"#3B2EC4", fontWeight:700 }}>systems, reports, emails,</span>
              {" "}and teams — instead of driving{" "}
              <span style={{
                color:"#3B2EC4",
                display:"inline-block",
                borderBottom:"3px solid #3B2EC4",
                paddingBottom:2,
              }}>proactive decisions.</span>
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
function SAFAQs() {
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
            <a href="#" style={{ display:"inline-flex", alignItems:"center", gap:6, fontSize:14, fontWeight:600, color:"var(--p700)", fontFamily:"var(--fb)", textDecoration:"none", borderBottom:"1.5px solid var(--p200)", paddingBottom:2, transition:"color .15s, border-color .15s" }}
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
function SupplierAnalyticsPage({ onBack, onNavigate }) {
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
        <SAFAQs />
        <SACTA onNavigate={onNavigate} />
      </main>
      <VDDFooter onNavigate={onNavigate} />
    </>
  );
}

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
          fontSize: isMobile ? "clamp(30px,8.5vw,44px)" : "clamp(40px,4.8vw,64px)",
          lineHeight:1.06, letterSpacing:"-.05em", marginBottom:22,
          paddingBottom:8,
          background:"linear-gradient(95deg,#fff 0%,#fff 30%,#F5D060 62%,#F5A623 100%)",
          WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
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
function EarlyFinancingPage({ onBack, onNavigate }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);
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

/* ═══════════════════════════════════════════════════════════
   GET STARTED — LEAD CAPTURE PAGE
═══════════════════════════════════════════════════════════ */
const FREE_EMAIL_DOMAINS = ["gmail","yahoo","hotmail","outlook","rediffmail","icloud","aol","protonmail","ymail","live","msn","me","mac","googlemail","yandex","zoho"];

function isPersonalEmail(email) {
  const domain = (email.split("@")[1] || "").split(".")[0].toLowerCase();
  return FREE_EMAIL_DOMAINS.includes(domain);
}

function GetStartedPage({ onBack, onNavigate }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const w = useWidth(); const isMobile = w < 640;

  const [form, setForm]   = useState({ name:"", email:"", phone:"", designation:"", company:"" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validate = (fields) => {
    const e = {};
    if (!fields.name.trim())  e.name = "Full name is required";
    if (!fields.email.trim()) {
      e.email = "Work email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
      e.email = "Enter a valid email address";
    } else if (isPersonalEmail(fields.email)) {
      e.email = "Please use your professional / work email";
    }
    if (!fields.phone.trim()) {
      e.phone = "Phone number is required";
    } else if (!/^\+?[\d\s\-().]{7,20}$/.test(fields.phone.trim())) {
      e.phone = "Enter a valid phone number";
    }
    return e;
  };

  const handleChange = (field, value) => {
    const next = { ...form, [field]: value };
    setForm(next);
    if (touched[field]) {
      setErrors(validate(next));
    }
  };

  const handleBlur = (field) => {
    const next = { ...touched, [field]: true };
    setTouched(next);
    setErrors(validate(form));
  };

  const handleSubmit = () => {
    const allTouched = { name:true, email:true, phone:true, designation:true, company:true };
    setTouched(allTouched);
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setSubmitted(true); }, 1200);
  };

  /* ── Field component ── */
  const Field = ({ id, label, type="text", placeholder, required, half }) => {
    const err = errors[id];
    const isTouched = touched[id];
    const hasErr = isTouched && err;
    const isOk   = isTouched && !err && form[id].trim();
    return (
      <div style={{ display:"flex", flexDirection:"column", gap:6, gridColumn: half && !isMobile ? "span 1" : "span 1" }}>
        <label style={{ fontFamily:"var(--fb)", fontSize:13, fontWeight:700, color:"#334155", letterSpacing:"-.01em" }}>
          {label} {required && <span style={{ color:"#6320E0" }}>*</span>}
        </label>
        <div style={{ position:"relative" }}>
          <input
            type={type}
            value={form[id]}
            onChange={e => handleChange(id, e.target.value)}
            onBlur={() => handleBlur(id)}
            placeholder={placeholder}
            style={{
              width:"100%", fontFamily:"var(--fb)", fontSize:15, color:"#0F172A",
              background: hasErr ? "#FFF5F5" : "#fff",
              border:`1.5px solid ${hasErr ? "#EF4444" : isOk ? "#059669" : "#CBD5E1"}`,
              borderRadius:12, padding:"13px 44px 13px 16px", outline:"none",
              transition:"border-color .18s, background .18s, box-shadow .18s",
              boxShadow: hasErr ? "0 0 0 3px rgba(239,68,68,.1)" : isOk ? "0 0 0 3px rgba(5,150,105,.08)" : "none",
              boxSizing:"border-box",
            }}
            onFocus={e => { if (!hasErr) e.target.style.borderColor = "#6320E0"; e.target.style.boxShadow = "0 0 0 3px rgba(99,32,224,.1)"; }}
            onBlurCapture={e => { if (!hasErr && !isOk) { e.target.style.borderColor = "#CBD5E1"; e.target.style.boxShadow = "none"; } }}
          />
          {/* Status icon */}
          {isOk && (
            <div style={{ position:"absolute", right:14, top:"50%", transform:"translateY(-50%)" }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="8" fill="#059669"/><path d="M5 8l2.5 2.5L11 5.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          )}
          {hasErr && (
            <div style={{ position:"absolute", right:14, top:"50%", transform:"translateY(-50%)" }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="8" fill="#EF4444"/><path d="M8 5v3.5M8 10.5v.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/></svg>
            </div>
          )}
        </div>
        {hasErr && (
          <div style={{ fontFamily:"var(--fb)", fontSize:12, color:"#EF4444", display:"flex", alignItems:"center", gap:5 }}>
            <span>⚠</span> {err}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <Nav onNavigate={onNavigate} onBack={onBack} pageName="Get Started" />
      <main>

        {/* ── HERO BAND ── */}
        <section style={{
          minHeight:"100vh", position:"relative", overflow:"hidden",
          background:"#F5F3FF",
          display:"flex", alignItems:"center", justifyContent:"center",
          padding: isMobile ? "110px 20px 60px" : "128px 5vw 80px",
        }}>
          {/* Top accent line — same as Platform Modules */}
          <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:"linear-gradient(90deg,var(--p500),var(--p300),#F59E0B)", pointerEvents:"none" }} />
          {/* Subtle dot grid */}
          <div style={{ position:"absolute", inset:0, pointerEvents:"none", backgroundImage:"radial-gradient(rgba(99,32,224,.07) 1px,transparent 1px)", backgroundSize:"28px 28px" }} />
          {/* Soft corner glows */}
          <div style={{ position:"absolute", top:"-10%", left:"-5%", width:"45%", height:"60%", background:"radial-gradient(ellipse, rgba(99,32,224,.08) 0%, transparent 65%)", pointerEvents:"none" }} />
          <div style={{ position:"absolute", bottom:"-10%", right:"-5%", width:"45%", height:"60%", background:"radial-gradient(ellipse, rgba(245,166,35,.06) 0%, transparent 65%)", pointerEvents:"none" }} />

          <div style={{ position:"relative", zIndex:2, width:"100%", maxWidth:1040, display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 48 : 80, alignItems:"center" }}>

            {/* Left — copy */}
            <div>
              {/* Eyebrow */}
              <div className="fade-up" style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(99,32,224,.1)", border:"1px solid rgba(99,32,224,.2)", borderRadius:100, padding:"6px 16px", marginBottom:24 }}>
                <span style={{ width:6, height:6, borderRadius:"50%", background:"#6320E0", display:"inline-block", animation:"pulse-dot 2s infinite" }} />
                <span style={{ fontSize:11, fontWeight:700, color:"#391085", fontFamily:"var(--fb)", letterSpacing:".08em", textTransform:"uppercase" }}>Get Started</span>
              </div>

              <h1 className="fade-up d1" style={{
                fontFamily:"var(--fb)", fontWeight:700, letterSpacing:"-.03em", lineHeight:1.05,
                fontSize: isMobile ? "clamp(26px,7vw,34px)" : "clamp(28px,3vw,42px)",
                color:"#0A0F1E",
                marginBottom:20,
              }}>
                Your Smarter<br />S2P Journey<br /><span style={{ color:"#391085", fontWeight:900 }}>Starts Here.</span>
              </h1>

              <p className="fade-up d2" style={{ fontSize: isMobile ? 15 : 17, color:"#475569", lineHeight:1.78, fontFamily:"var(--fb)", marginBottom:36, maxWidth:480 }}>
                Tell us a little about yourself and your organisation. Our team will reach out within one business day to walk you through NimbleS2P — tailored to your procurement priorities.
              </p>

              {/* Trust signals */}
              <div className="fade-up d3" style={{ display:"flex", flexDirection:"column", gap:12 }}>
                {[
                  ["🔒", "Your data is safe", "We never share or sell your information."],
                  ["⚡", "Response within 1 business day", "A real human, not a bot, will reach out."],
                  ["🎯", "Personalised walkthrough", "Tailored to your industry and role."],
                ].map(([icon, title, sub]) => (
                  <div key={title} style={{ display:"flex", alignItems:"center", gap:12 }}>
                    <div style={{ width:38, height:38, borderRadius:11, background:"rgba(99,32,224,.1)", border:"1px solid rgba(99,32,224,.18)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:17, flexShrink:0 }}>{icon}</div>
                    <div>
                      <div style={{ fontFamily:"var(--fb)", fontSize:13.5, fontWeight:700, color:"#1E293B", lineHeight:1.2 }}>{title}</div>
                      <div style={{ fontFamily:"var(--fb)", fontSize:12, color:"#94A3B8", lineHeight:1.3, marginTop:2 }}>{sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — form card */}
            <div className="fade-up d2" style={{
              background:"#fff",
              border:"1.5px solid rgba(99,32,224,.15)",
              borderRadius:24,
              boxShadow:"0 8px 48px rgba(99,32,224,.1), 0 2px 8px rgba(0,0,0,.04)",
              padding: isMobile ? "28px 22px" : "40px 36px",
              position:"relative", overflow:"hidden",
            }}>
              {/* Card top accent */}
              <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:"linear-gradient(90deg,#6320E0,#8B5CF6,#F5A623)", borderRadius:"24px 24px 0 0", pointerEvents:"none" }} />

              {!submitted ? (
                <>
                  <div style={{ marginBottom:28 }}>
                    <div style={{ fontFamily:"var(--fb)", fontSize: isMobile ? 18 : 21, fontWeight:900, color:"#0F172A", letterSpacing:"-.03em", lineHeight:1.2, marginBottom:6 }}>Tell us about yourself</div>
                    <div style={{ fontFamily:"var(--fb)", fontSize:13, color:"#94A3B8" }}>Fields marked <span style={{ color:"#6320E0" }}>*</span> are required</div>
                  </div>

                  {/* Form fields */}
                  <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
                    <Field id="name"        label="Full Name"     placeholder="e.g. Rahul Sharma"    required />
                    <Field id="email"       label="Work Email"    type="email" placeholder="you@company.com" required />
                    <Field id="phone"       label="Phone Number"  type="tel"   placeholder="+91 98765 43210" required />
                    <Field id="designation" label="Designation"   placeholder="e.g. VP Procurement" />
                    <Field id="company"     label="Company Name"  placeholder="e.g. Tata Motors" />

                    {/* Submit */}
                    <button onClick={handleSubmit} disabled={submitting}
                      style={{
                        marginTop:4, width:"100%",
                        background: submitting ? "rgba(99,32,224,.5)" : "linear-gradient(135deg,#6320E0,#8B5CF6)",
                        color:"#fff", border:"none", borderRadius:12,
                        padding:"15px 24px", fontSize:16, fontWeight:700,
                        cursor: submitting ? "not-allowed" : "pointer",
                        fontFamily:"var(--fb)", letterSpacing:"-.01em",
                        boxShadow: submitting ? "none" : "0 6px 24px rgba(99,32,224,.4)",
                        transition:"all .2s",
                        display:"flex", alignItems:"center", justifyContent:"center", gap:10,
                      }}
                      onMouseEnter={e=>{ if(!submitting){ e.currentTarget.style.transform="translateY(-1px)"; e.currentTarget.style.boxShadow="0 10px 32px rgba(99,32,224,.55)"; }}}
                      onMouseLeave={e=>{ e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow=submitting?"none":"0 6px 24px rgba(99,32,224,.4)"; }}
                    >
                      {submitting ? (
                        <>
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ animation:"spin 1s linear infinite" }}>
                            <circle cx="9" cy="9" r="7" stroke="rgba(255,255,255,.3)" strokeWidth="2"/>
                            <path d="M9 2a7 7 0 0 1 7 7" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                          Submitting…
                        </>
                      ) : "Get Started →"}
                    </button>

                    <p style={{ fontFamily:"var(--fb)", fontSize:11.5, color:"#94A3B8", textAlign:"center", margin:0 }}>
                      By submitting, you agree to our <span style={{ color:"#6320E0", cursor:"pointer" }}>Privacy Policy</span>. No spam, ever.
                    </p>
                  </div>
                </>
              ) : (
                /* ── SUCCESS STATE ── */
                <div style={{ textAlign:"center", padding: isMobile ? "24px 0" : "40px 0" }}>
                  <div style={{ width:80, height:80, borderRadius:"50%", background:"linear-gradient(135deg,#059669,#10B981)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 24px", boxShadow:"0 8px 32px rgba(16,185,129,.3)" }}>
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                      <path d="M8 18l7 7L28 10" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div style={{ fontFamily:"var(--fb)", fontSize: isMobile ? 22 : 26, fontWeight:900, color:"#0F172A", letterSpacing:"-.03em", marginBottom:10 }}>You're on the list!</div>
                  <div style={{ fontFamily:"var(--fb)", fontSize:15, color:"#64748B", lineHeight:1.7, maxWidth:320, margin:"0 auto 32px" }}>
                    Thanks, <strong style={{ color:"#391085" }}>{form.name.split(" ")[0]}</strong>. Our team will be in touch at <strong style={{ color:"#6320E0" }}>{form.email}</strong> within one business day.
                  </div>
                  <button onClick={()=>onNavigate("home")}
                    style={{ display:"inline-flex", alignItems:"center", gap:7, background:"rgba(99,32,224,.08)", border:"1.5px solid rgba(99,32,224,.2)", borderRadius:10, padding:"11px 24px", fontSize:14, fontWeight:700, color:"#6320E0", cursor:"pointer", fontFamily:"var(--fb)", transition:"all .2s" }}
                    onMouseEnter={e=>{ e.currentTarget.style.background="rgba(99,32,224,.15)"; e.currentTarget.style.color="#391085"; }}
                    onMouseLeave={e=>{ e.currentTarget.style.background="rgba(99,32,224,.08)"; e.currentTarget.style.color="#6320E0"; }}
                  >← Back to Home</button>
                </div>
              )}
            </div>

          </div>
        </section>

      </main>
      <VDDFooter onNavigate={onNavigate} />

      {/* Spin animation for loader */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </>
  );
}
