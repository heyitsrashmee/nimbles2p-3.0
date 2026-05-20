"use client";

import { useState, useEffect, useRef } from "react";
import { footerLabelToPage } from "@/lib/routes";
import { goFooterLink, goLegalPage } from "@/components/layout/footerUtils";
import { VDDFooter } from "@/components/layout/VDDFooter";

/* ─── Global CSS ─────────────────────────────────────────────────────────── */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
  :root {
    --fb: 'Inter', system-ui, sans-serif;
    --fm: 'IBM Plex Mono', monospace;
    --p700:#391085;--p600:#4B1A9E;--p300:#8B5CF6;--p25:#F5F3FF;
    --t2:#334155;--t3:#64748B;--t4:#94A3B8;
    --bd:#E2E8F0;
    --bg-v:linear-gradient(140deg,#14104A 0%,#1E1660 40%,#261d6b 70%,#1a1258 100%);
  }
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  html{scroll-behavior:smooth}
  body{font-family:var(--fb);color:#0F172A;background:#fff;overflow-x:hidden}
  ::-webkit-scrollbar{width:5px}
  ::-webkit-scrollbar-track{background:var(--p25)}
  ::-webkit-scrollbar-thumb{background:var(--p300);border-radius:3px}
  a{text-decoration:none}

  /* Nav desktop/mobile helpers */
  .nav-links-desktop{display:flex;align-items:center;gap:28px;flex:1;justify-content:center}
  .nav-cta-desktop{display:inline-flex}
  .hamburger{display:none;flex-direction:column;justify-content:center;gap:5px;width:36px;height:36px;background:none;border:none;cursor:pointer;padding:4px;margin-left:auto}
  .hamburger span{display:block;height:2px;border-radius:2px;transition:transform .25s,opacity .25s}
  @media(max-width:767px){
    .nav-links-desktop{display:none}
    .nav-cta-desktop{display:none}
    .hamburger{display:flex}
  }
  .mobile-menu{position:fixed;left:0;right:0;bottom:0;background:#1a1060;z-index:99;overflow-y:auto;transform:translateX(100%);transition:transform .3s cubic-bezier(.22,1,.36,1);padding:20px 20px 32px}
  .mobile-menu.open{transform:translateX(0)}
  .mobile-nav-link{display:block;font-size:16px;font-weight:500;color:rgba(255,255,255,.8);font-family:var(--fb);padding:12px 0;text-decoration:none;transition:color .15s}
  .mobile-nav-link:hover{color:#fff}
  .mobile-divider{border:none;border-top:1px solid rgba(255,255,255,.1);margin:10px 0}

  /* Footer grid */
  .ft-grid{display:grid;grid-template-columns:1.6fr 1fr 1fr 1fr;gap:40px}
  @media(max-width:860px){.ft-grid{grid-template-columns:1fr 1fr;gap:32px}}
  @media(max-width:540px){.ft-grid{grid-template-columns:1fr;gap:24px}}

  /* Typewriter cursor */
  .tw-cursor{display:inline-block;width:2px;height:.85em;background:rgba(194,193,232,.7);margin-left:2px;vertical-align:middle;border-radius:1px;animation:blink .8s step-end infinite}
  @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}

  /* Footer bg drifts */
  @keyframes drift-x{0%,100%{transform:translate3d(-4%,-2%,0)}50%{transform:translate3d(4%,2%,0)}}
  @keyframes drift-x-rev{0%,100%{transform:translate3d(4%,2%,0)}50%{transform:translate3d(-4%,-2%,0)}}

  /* Mega menu entrance */
  @keyframes fade-up{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}

  /* Hero glows */
  @keyframes glowDrift{0%{transform:translate(0,0) scale(1)}33%{transform:translate(4%,3%) scale(1.06)}66%{transform:translate(-3%,5%) scale(.95)}100%{transform:translate(0,0) scale(1)}}
  .glow-a,.glow-b{position:absolute;border-radius:50%;pointer-events:none;z-index:0;filter:blur(60px)}
  .glow-a{width:600px;height:600px;top:-20%;left:-10%;background:radial-gradient(circle,rgba(99,32,224,.25) 0%,transparent 68%);animation:glowDrift 24s ease-in-out infinite}
  .glow-b{width:500px;height:500px;bottom:-10%;right:-8%;background:radial-gradient(circle,rgba(238,157,17,.12) 0%,transparent 65%);animation:glowDrift 30s 8s ease-in-out infinite reverse}

  /* Terms body */
  .terms-hero{background:var(--bg-v);padding:140px 48px 80px;text-align:center;position:relative;overflow:hidden}
  .terms-hero-inner{position:relative;z-index:2;max-width:700px;margin:0 auto}
  .terms-hero h1{font-size:clamp(36px,5vw,56px);font-weight:800;letter-spacing:-.03em;line-height:1.08;margin-bottom:16px;background:linear-gradient(95deg,#fff 0%,#fff 30%,#F5D060 62%,#F5A623 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;padding-bottom:.06em}
  .terms-meta{display:inline-flex;align-items:center;gap:10px;font-size:13px;color:rgba(255,255,255,.42)}
  .terms-meta-dot{width:4px;height:4px;border-radius:50%;background:rgba(255,255,255,.25)}
  .terms-hero-wave{position:absolute;bottom:-1px;left:0;width:100%;pointer-events:none}
  .terms-body{background:#fff;padding:72px 48px 96px}
  .terms-inner{max-width:900px;margin:0 auto;display:grid;grid-template-columns:200px 1fr;gap:56px;align-items:start}
  .terms-toc{position:sticky;top:90px;background:var(--p25);border:1.5px solid var(--bd);border-radius:14px;padding:20px}
  .terms-toc-label{font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--t4);margin-bottom:12px}
  .terms-toc-list{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:1px}
  .terms-toc-list a{display:block;padding:6px 10px;border-radius:7px;font-size:12px;font-weight:500;color:var(--t3);text-decoration:none;transition:background .15s,color .15s;line-height:1.45}
  .terms-toc-list a:hover{background:rgba(99,32,224,.08);color:var(--p300)}
  .terms-toc-list a.active{background:rgba(99,32,224,.1);color:var(--p600);font-weight:600}
  .terms-content{min-width:0}
  .terms-section{margin-bottom:44px;padding-bottom:44px;border-bottom:1px solid var(--bd);scroll-margin-top:100px}
  .terms-section:last-child{border-bottom:none;margin-bottom:0;padding-bottom:0}
  .terms-section-title{font-size:19px;font-weight:800;color:var(--p700);letter-spacing:-.02em;margin-bottom:14px;display:flex;align-items:center;gap:10px}
  .terms-num{font-family:var(--fm);font-size:10.5px;font-weight:600;color:var(--t4);letter-spacing:.06em;background:var(--p25);border:1px solid var(--bd);padding:3px 8px;border-radius:6px;white-space:nowrap}
  .terms-p{font-size:14.5px;line-height:1.85;color:var(--t2);margin-bottom:12px}
  .terms-p:last-child{margin-bottom:0}
  .terms-p a{color:var(--p300)}
  .terms-p a:hover{text-decoration:underline}
  .terms-caps{font-size:13.5px;font-weight:700;line-height:1.75;color:var(--p700);background:var(--p25);padding:18px 22px;border-radius:10px;border-left:3px solid var(--p300);margin-bottom:12px}
  .terms-list{list-style:none;padding:0;margin:12px 0;display:flex;flex-direction:column;gap:8px}
  .terms-list li{display:flex;align-items:flex-start;gap:10px;font-size:14px;color:var(--t2);line-height:1.7}
  .terms-list li::before{content:'';width:6px;height:6px;border-radius:50%;background:var(--p300);flex-shrink:0;margin-top:8px}
  .terms-contact-card{background:var(--bg-v);border-radius:16px;padding:28px 32px;display:flex;align-items:center;gap:20px;margin-top:8px}
  .terms-contact-icon{width:44px;height:44px;border-radius:11px;flex-shrink:0;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.15);display:flex;align-items:center;justify-content:center}
  .terms-contact-label{font-size:10.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:rgba(255,255,255,.38);margin-bottom:4px}
  .terms-contact-value{font-size:15px;font-weight:600;color:#fff;text-decoration:none}
  .terms-contact-value:hover{text-decoration:underline}
  .ai-points{display:flex;flex-direction:column;gap:12px;margin:16px 0}
  .ai-point{display:grid;grid-template-columns:180px 1fr;gap:16px;padding:14px 18px;border-radius:10px;background:var(--p25);border:1px solid var(--bd);align-items:start}
  .ai-point-label{font-size:13px;font-weight:700;color:var(--p600);line-height:1.4;padding-top:1px}
  .ai-point-text{font-size:14px;color:var(--t2);line-height:1.75}
  .sr{opacity:0;transform:translateY(22px);transition:opacity .6s ease,transform .6s ease}
  .sr.visible{opacity:1;transform:translateY(0)}

  @media(max-width:900px){
    .terms-inner{grid-template-columns:1fr}
    .terms-toc{position:static}
    .terms-body{padding:48px 24px 72px}
    .terms-hero{padding:120px 24px 80px}
  }
  @media(max-width:600px){
    .ai-point{grid-template-columns:1fr}
  }
`;

/* ─── Data ───────────────────────────────────────────────────────────────── */
const TOC_ITEMS = [
  ["intro","Introduction"],["comms","Communications"],["contests","Contests & Promotions"],
  ["ai","AI & Automated Features"],["content","Content"],["prohibited","Prohibited Uses"],
  ["analytics","Analytics"],["minors","No Use By Minors"],["ip","Intellectual Property"],
  ["dmca","Copyright & DMCA"],["feedback","Error Reporting"],["links","Links To Other Sites"],
  ["disclaimer","Disclaimer & Liability"],["termination","Termination & Governing Law"],
  ["changes","Changes & Amendments"],["waiver","Waiver And Severability"],
  ["acknowledgment","Acknowledgment"],["contact","Contact Us"],
];

const AI_POINTS = [
  ["AI outputs are advisory","Results generated by AI Features — including risk scores, recommendations, or flagged anomalies — are intended to assist human decision-making and should not be relied upon as the sole basis for any financial, procurement, or compliance decision."],
  ["Human oversight is required","You are responsible for reviewing, validating, and approving any output generated by AI Features before acting on it. NimbleS2P does not accept liability for decisions made solely on the basis of automated outputs."],
  ["Your data trains the platform","Aggregated and anonymised usage data may be used to improve the accuracy and performance of AI Features. No personally identifiable information or confidential business data is used for model training without explicit consent."],
  ["AI Features may evolve","We continuously update and improve AI capabilities. The behaviour of AI Features may change over time as models are retrained or updated. We will endeavour to communicate material changes."],
  ["Accuracy is not guaranteed","While we strive for accuracy, AI Features may produce incorrect, incomplete, or biassed outputs. Techpanion Solutions Pvt Ltd makes no warranty as to the accuracy, reliability, or fitness of any AI-generated output for a particular purpose."],
  ["No unlawful use of AI outputs","You agree not to use AI-generated outputs from our Service in any manner that violates applicable law, including laws governing automated decision-making, data protection, or financial compliance."],
];

const PROHIBITED = [
  "In any way that violates any applicable national or international law or regulation.",
  "For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way.",
  "To transmit, or procure the sending of, any unsolicited or unauthorized advertising or promotional material.",
  "To impersonate or attempt to impersonate Company, a Company employee, another user, or any other person or entity.",
  "In any way that infringes upon the rights of others, or in any way is illegal, threatening, fraudulent, or harmful.",
  "To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of Service.",
];

const MEGA_PRODUCTS = {
  integrated: [
    { id:"vdd",      icon:"🔍", name:"Supplier Due Diligence",          desc:"Automate supplier onboarding, KYC, compliance checks, and risk validation.",                                                                              color:"#231a67", tag:"Trending", resource:{ type:"guide", label:"Due Diligence Playbook",           meta:"8 min read",    icon:"📋" } },
    { id:"supplier", icon:"👤", name:"Supplier Portal",                  desc:"Unified interface for suppliers to manage onboarding, documents, communication, and transactions.",                                                        color:"#6DB657",              resource:{ type:"case",  label:"How Tata Cut Onboarding 80%",       meta:"Case study",    icon:"📈" } },
    { id:"invoice",  icon:"🗒", name:"Invoice Processing Automation",    desc:"Agentic 2-way and 3-way matching automation for every invoice type — material, service, and non-PO — with enterprise-scale exception management.",        color:"#1a1a2e",              resource:{ type:"demo",  label:"Watch: 3-Way Match in 60s",         meta:"2 min demo",    icon:"▶"  } },
    { id:"rfq",      icon:"☰", name:"RFx Management",                   desc:"Create, distribute, and evaluate RFQs with supplier comparison and selection.",                                                                            color:"#717C89",              resource:{ type:"guide", label:"RFQ Best Practices Guide",           meta:"6 min read",    icon:"📋" } },
    { id:"finance",  icon:"💰", name:"Early Financing",                  desc:"Enable supply chain financing and early payment options for vendors.",                                                                                     color:"#E06B72", tag:"New",  resource:{ type:"report",label:"Supply Chain Finance Report 2026",   meta:"Whitepaper",    icon:"📄" } },
    { id:"analytics",icon:"📊", name:"Supplier Analytics",               desc:"Monitor supplier health, exposure, compliance, and operational performance from one analytics layer",                                                      color:"#48A9A6", tag:"Beta", resource:{ type:"demo",  label:"Live Analytics Dashboard",          meta:"Interactive demo",icon:"▶"  } },
  ],
};

/* ─── Hooks ──────────────────────────────────────────────────────────────── */
function useWidth() {
  const [w, setW] = useState(1200);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    h();
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return w;
}

function useTypewriter(words, { typeSpeed=80, eraseSpeed=50, pauseMs=1600 } = {}) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [phase, setPhase] = useState("typing");
  useEffect(() => {
    const word = words[wordIdx];
    let timeout;
    if (phase === "typing") {
      if (display.length < word.length) {
        timeout = setTimeout(() => setDisplay(word.slice(0, display.length + 1)), typeSpeed);
      } else {
        timeout = setTimeout(() => setPhase("pausing"), pauseMs);
      }
    } else if (phase === "pausing") {
      setPhase("erasing");
    } else {
      if (display.length > 0) {
        timeout = setTimeout(() => setDisplay(display.slice(0, -1)), eraseSpeed);
      } else {
        setWordIdx(i => (i + 1) % words.length);
        setPhase("typing");
      }
    }
    return () => clearTimeout(timeout);
  }, [display, phase, wordIdx, words, typeSpeed, eraseSpeed, pauseMs]);
  return display;
}

/* ─── Logo SVGs ──────────────────────────────────────────────────────────── */
function NimbleLogo({ height = 28 }) {
  const width = Math.round((457 / 91) * height);
  return (
    <svg width={width} height={height} viewBox="0 0 457 91" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display:"block" }}>
      <path d="M48.46 37.27H16.3C14.33 37.27 12.73 38.87 12.73 40.84C12.73 42.81 14.33 44.41 16.3 44.41H48.46C50.43 44.41 52.03 42.81 52.03 40.84C52.03 38.87 50.43 37.27 48.46 37.27Z" fill="white"/>
      <path d="M7.96002 37.4C9.93002 37.4 11.53 39 11.53 40.97C11.53 42.94 9.93002 44.54 7.96002 44.54C5.99002 44.54 4.39001 42.94 4.39001 40.97C4.39001 39 5.99002 37.4 7.96002 37.4Z" fill="white"/>
      <path d="M48.46 55.06H24.64C22.71 55.06 21.14 53.49 21.14 51.56C21.14 49.63 22.71 48.06 24.64 48.06H48.46C50.39 48.06 51.96 49.63 51.96 51.56C51.96 53.49 50.39 55.06 48.46 55.06Z" fill="white"/>
      <path d="M40.55 65.21H16.73C14.8 65.21 13.23 63.64 13.23 61.71C13.23 59.78 14.8 58.21 16.73 58.21H40.55C42.48 58.21 44.05 59.78 44.05 61.71C44.05 63.64 42.48 65.21 40.55 65.21Z" fill="white"/>
      <path d="M44.79 25.35H30.21C28.24 25.35 26.64 26.95 26.64 28.92C26.64 30.89 28.24 32.49 30.21 32.49H47.7C47.03 30.53 45.97 27.95 44.79 25.34V25.35Z" fill="white"/>
      <path d="M65.95 25.35H54.2C58.07 27.94 61.97 30.56 64.83 32.5H65.95C67.92 32.5 69.52 30.9 69.52 28.93C69.52 26.96 67.92 25.36 65.95 25.36V25.35Z" fill="white"/>
      <path d="M43.32 19.4C43.53 19.68 43.75 19.97 43.97 20.26C49.61 26.94 75.98 43.8 87.39 45.73C71.9 46.8 56.04 63.28 43.96 71.81C65.43 49.08 52.89 32.14 43.96 20.26C43.7 19.95 43.48 19.66 43.31 19.4H43.32Z" fill="white"/>
      <path d="M345.3 67.53C342.1 67.53 339.05 67.01 336.14 65.96C333.23 64.91 330.72 63.36 328.62 61.31L332.06 55.08C334.3 56.89 336.5 58.23 338.64 59.09C340.84 59.95 342.94 60.38 344.94 60.38C346.8 60.38 348.28 60.05 349.38 59.38C350.53 58.71 351.1 57.71 351.1 56.37C351.1 55.46 350.79 54.77 350.17 54.29C349.55 53.77 348.64 53.31 347.45 52.93C346.3 52.55 344.9 52.12 343.23 51.64C340.46 50.73 338.15 49.85 336.29 48.99C334.43 48.13 333.02 47.06 332.07 45.77C331.16 44.43 330.71 42.74 330.71 40.69C330.71 38.21 331.33 36.09 332.57 34.32C333.86 32.51 335.62 31.1 337.87 30.1C340.16 29.1 342.83 28.6 345.89 28.6C348.56 28.6 351.09 29.03 353.48 29.89C355.87 30.7 358.04 32.04 359.99 33.9L356.12 39.98C354.21 38.5 352.4 37.43 350.68 36.76C348.96 36.04 347.22 35.69 345.45 35.69C344.45 35.69 343.49 35.81 342.59 36.05C341.73 36.29 341.01 36.69 340.44 37.27C339.92 37.79 339.65 38.56 339.65 39.56C339.65 40.47 339.89 41.18 340.37 41.71C340.89 42.19 341.66 42.62 342.66 43C343.71 43.38 344.97 43.81 346.45 44.29C349.46 45.15 351.99 46.03 354.04 46.94C356.14 47.85 357.71 48.97 358.76 50.3C359.81 51.59 360.34 53.38 360.34 55.67C360.34 59.39 358.98 62.3 356.26 64.4C353.54 66.5 349.89 67.55 345.31 67.55L345.3 67.53Z" fill="white"/>
      <path d="M384.23 58.67L398.2 38.42C399.66 36.34 400.7 34.4 401.3 32.65C401.9 30.85 402.21 29 402.21 27.15C402.21 24 401.42 21.13 399.86 18.62C398.31 16.13 396.22 14.12 393.65 12.67C391.07 11.21 388.17 10.46 385.05 10.46C381.93 10.46 379.01 11.2 376.39 12.67C373.81 14.13 371.72 16.13 370.18 18.62C368.62 21.13 367.83 24.01 367.83 27.15C367.83 29.75 368.52 32.39 369.89 35L370.28 35.75H383.24L380.15 33.27C378.06 31.59 377.04 29.59 377.04 27.15C377.04 24.94 377.78 23.12 379.3 21.6C380.87 20.07 382.73 19.32 384.99 19.32C387.25 19.32 389.11 20.07 390.68 21.6C392.24 23.13 393 24.94 393 27.15C393 27.94 392.83 28.82 392.47 29.82C392.15 30.81 391.53 32.01 390.61 33.4L367.66 67.53H403.22V58.67H384.24H384.23Z" fill="white"/>
      <path d="M129.62 36.34C128.15 33.75 126.19 31.75 123.82 30.41C121.47 29.02 118.86 28.31 116.08 28.31C113.3 28.31 110.94 28.93 108.63 30.14C107.54 30.73 106.53 31.45 105.63 32.3V29.02H96.89V67.53H106.11V46.31C106.11 43.28 106.92 41.06 108.58 39.54C110.31 37.95 112.2 37.17 114.36 37.17C116.98 37.17 118.93 38.06 120.35 39.92C121.87 41.83 122.61 43.98 122.61 46.49V67.53H131.83V45.6C131.83 42 131.09 38.88 129.62 36.34Z" fill="white"/>
      <path d="M144.45 25.39C148.045 25.39 150.96 22.4754 150.96 18.88C150.96 15.2846 148.045 12.37 144.45 12.37C140.855 12.37 137.94 15.2846 137.94 18.88C137.94 22.4754 140.855 25.39 144.45 25.39Z" fill="white"/>
      <path d="M149.06 29.03H139.84V67.54H149.06V29.03Z" fill="white"/>
      <path d="M213.6 36.28C212.17 33.76 210.19 31.78 207.72 30.4C205.3 29.01 202.58 28.31 199.65 28.31C196.99 28.31 194.42 28.9 192.01 30.06C190.2 30.95 188.62 32.19 187.3 33.75C186.13 32.3 184.71 31.11 183.08 30.22C180.85 28.95 178.38 28.31 175.72 28.31C173.29 28.31 170.94 28.86 168.75 29.94C167.68 30.45 166.7 31.1 165.81 31.87V29.03H157.07V67.54H166.29V45.61C166.29 43.55 166.68 41.9 167.44 40.71C168.22 39.49 169.16 38.62 170.31 38.06C171.54 37.48 172.81 37.18 174.06 37.18C175.31 37.18 176.55 37.49 177.78 38.16C178.98 38.76 179.92 39.66 180.67 40.92C181.44 42.16 181.83 43.79 181.83 45.78V67.53H191.05V45.6C191.05 43.57 191.42 41.93 192.14 40.76C192.92 39.54 193.86 38.67 195.01 38.11C196.24 37.53 197.52 37.23 198.82 37.23C200.89 37.23 202.66 37.94 204.26 39.44C205.83 40.84 206.59 42.92 206.59 45.78V67.53H215.81V45C215.81 41.66 215.06 38.72 213.6 36.27V36.28Z" fill="white"/>
      <path d="M260.28 38.35C258.58 35.38 256.25 32.98 253.38 31.25C250.51 29.45 247.25 28.54 243.71 28.54C241.2 28.54 238.8 29 236.58 29.89C235.32 30.4 234.13 31.03 233.02 31.77V7.59H223.8V67.53H232.54V64.41C233.69 65.23 234.93 65.93 236.25 66.53C238.56 67.51 241.06 68.01 243.7 68.01C247.24 68.01 250.49 67.12 253.36 65.36C256.25 63.58 258.57 61.17 260.26 58.21C262.01 55.23 262.89 51.89 262.89 48.28C262.89 44.67 262 41.33 260.27 38.36L260.28 38.35ZM253.69 47.8C253.69 49.84 253.19 51.73 252.21 53.42C251.26 55.07 249.94 56.43 248.29 57.45C246.7 58.42 244.88 58.91 242.88 58.91C240.88 58.91 239.04 58.42 237.43 57.46C235.8 56.43 234.47 55.07 233.5 53.43C232.55 51.74 232.07 49.85 232.07 47.8C232.07 45.75 232.55 43.89 233.49 42.25C234.48 40.56 235.8 39.2 237.42 38.21C239.08 37.19 240.86 36.69 242.88 36.69C244.9 36.69 246.65 37.18 248.3 38.22C249.97 39.21 251.24 40.52 252.22 42.26C253.21 43.92 253.69 45.73 253.69 47.8Z" fill="white"/>
      <path d="M277.58 7.6H268.36V67.54H277.58V7.6Z" fill="white"/>
      <path d="M297.36 50.75H322.09V46.74C322.09 43.12 321.2 39.83 319.44 36.96C317.7 34.11 315.32 31.82 312.4 30.17C309.46 28.46 306.18 27.6 302.65 27.6C299.12 27.6 295.76 28.49 292.77 30.24C289.84 31.98 287.47 34.37 285.74 37.33C283.99 40.27 283.1 43.6 283.1 47.21C283.1 50.82 284 54.45 285.8 57.57C287.62 60.62 290.14 63.07 293.28 64.86C296.45 66.64 300.07 67.54 304.02 67.54C306.62 67.54 309.12 67.13 311.45 66.33C313.81 65.49 315.93 64.31 317.75 62.82L318.43 62.26L315.7 51.08L313.93 53.61C312.87 55.12 311.46 56.36 309.72 57.28C307.99 58.2 306.09 58.66 304.06 58.66C301.01 58.66 298.44 57.72 296.23 55.8C294.53 54.3 293.39 52.55 292.79 50.5C293.22 50.54 293.64 50.58 294.07 50.62C295.17 50.7 296.26 50.74 297.33 50.74L297.36 50.75ZM311.9 42.72C311.02 42.64 310.12 42.6 309.21 42.6H297.36C295.86 42.6 294.35 42.68 292.86 42.85C293.53 41.28 294.55 39.9 295.96 38.67C297.9 36.95 300.08 36.11 302.65 36.11C305.22 36.11 307.34 36.9 309.34 38.54C310.81 39.72 311.85 41.11 312.49 42.76C312.29 42.75 312.09 42.74 311.89 42.73L311.9 42.72Z" fill="white"/>
      <path d="M448.96 42.56C448.1 40.22 446.88 38.17 445.31 36.4C443.74 34.59 441.88 33.18 439.73 32.18C437.63 31.18 435.32 30.68 432.79 30.68C429.97 30.68 427.47 31.32 425.27 32.61C423.07 33.85 421.26 35.57 419.83 37.76V31.32H411.45V84.07H421.04V62.24C422.28 64.48 424 66.27 426.19 67.61C428.43 68.9 431.01 69.54 433.92 69.54C437.12 69.54 439.93 68.68 442.37 66.96C444.85 65.19 446.78 62.83 448.17 59.87C449.6 56.91 450.32 53.62 450.32 49.99C450.32 47.32 449.87 44.84 448.96 42.55V42.56ZM439.8 54.3C439.37 55.64 438.7 56.85 437.79 57.95C436.93 59 435.91 59.83 434.71 60.46C433.52 61.08 432.18 61.39 430.7 61.39C429.36 61.39 428.05 61.08 426.76 60.46C425.47 59.79 424.33 58.89 423.32 57.74C422.37 56.59 421.6 55.33 421.03 53.95V45.15C421.32 44.24 421.77 43.41 422.39 42.64C423.06 41.88 423.82 41.21 424.68 40.64C425.54 40.07 426.42 39.64 427.33 39.35C428.28 39.02 429.22 38.85 430.12 38.85C431.6 38.85 432.96 39.14 434.2 39.71C435.49 40.28 436.61 41.09 437.56 42.14C438.51 43.14 439.23 44.31 439.71 45.65C440.24 46.99 440.5 48.44 440.5 50.02C440.5 51.5 440.26 52.93 439.78 54.31L439.8 54.3Z" fill="white"/>
    </svg>
  );
}

function NimbleColorLogo({ height = 28 }) {
  const width = Math.round((457 / 91) * height);
  return (
    <svg width={width} height={height} viewBox="0 0 457 91" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display:"block" }}>
      {/* Icon mark — bars use #3E2C80, arc uses #3E2C80, top bars use #FCB216 */}
      <path d="M48.46 37.27H16.3C14.33 37.27 12.73 38.87 12.73 40.84C12.73 42.81 14.33 44.41 16.3 44.41H48.46C50.43 44.41 52.03 42.81 52.03 40.84C52.03 38.87 50.43 37.27 48.46 37.27Z" fill="#3E2C80"/>
      <path d="M7.96002 37.4C9.93002 37.4 11.53 39 11.53 40.97C11.53 42.94 9.93002 44.54 7.96002 44.54C5.99002 44.54 4.39001 42.94 4.39001 40.97C4.39001 39 5.99002 37.4 7.96002 37.4Z" fill="#3E2C80"/>
      <path d="M48.46 55.06H24.64C22.71 55.06 21.14 53.49 21.14 51.56C21.14 49.63 22.71 48.06 24.64 48.06H48.46C50.39 48.06 51.96 49.63 51.96 51.56C51.96 53.49 50.39 55.06 48.46 55.06Z" fill="#3E2C80"/>
      <path d="M40.55 65.21H16.73C14.8 65.21 13.23 63.64 13.23 61.71C13.23 59.78 14.8 58.21 16.73 58.21H40.55C42.48 58.21 44.05 59.78 44.05 61.71C44.05 63.64 42.48 65.21 40.55 65.21Z" fill="#3E2C80"/>
      <path d="M44.79 25.35H30.21C28.24 25.35 26.64 26.95 26.64 28.92C26.64 30.89 28.24 32.49 30.21 32.49H47.7C47.03 30.53 45.97 27.95 44.79 25.34V25.35Z" fill="#FCB216"/>
      <path d="M65.95 25.35H54.2C58.07 27.94 61.97 30.56 64.83 32.5H65.95C67.92 32.5 69.52 30.9 69.52 28.93C69.52 26.96 67.92 25.36 65.95 25.36V25.35Z" fill="#FCB216"/>
      <path d="M43.32 19.4C43.53 19.68 43.75 19.97 43.97 20.26C49.61 26.94 75.98 43.8 87.39 45.73C71.9 46.8 56.04 63.28 43.96 71.81C65.43 49.08 52.89 32.14 43.96 20.26C43.7 19.95 43.48 19.66 43.31 19.4H43.32Z" fill="#3E2C80"/>
      {/* Wordmark — all #3E2C80 */}
      <path d="M345.3 67.53C342.1 67.53 339.05 67.01 336.14 65.96C333.23 64.91 330.72 63.36 328.62 61.31L332.06 55.08C334.3 56.89 336.5 58.23 338.64 59.09C340.84 59.95 342.94 60.38 344.94 60.38C346.8 60.38 348.28 60.05 349.38 59.38C350.53 58.71 351.1 57.71 351.1 56.37C351.1 55.46 350.79 54.77 350.17 54.29C349.55 53.77 348.64 53.31 347.45 52.93C346.3 52.55 344.9 52.12 343.23 51.64C340.46 50.73 338.15 49.85 336.29 48.99C334.43 48.13 333.02 47.06 332.07 45.77C331.16 44.43 330.71 42.74 330.71 40.69C330.71 38.21 331.33 36.09 332.57 34.32C333.86 32.51 335.62 31.1 337.87 30.1C340.16 29.1 342.83 28.6 345.89 28.6C348.56 28.6 351.09 29.03 353.48 29.89C355.87 30.7 358.04 32.04 359.99 33.9L356.12 39.98C354.21 38.5 352.4 37.43 350.68 36.76C348.96 36.04 347.22 35.69 345.45 35.69C344.45 35.69 343.49 35.81 342.59 36.05C341.73 36.29 341.01 36.69 340.44 37.27C339.92 37.79 339.65 38.56 339.65 39.56C339.65 40.47 339.89 41.18 340.37 41.71C340.89 42.19 341.66 42.62 342.66 43C343.71 43.38 344.97 43.81 346.45 44.29C349.46 45.15 351.99 46.03 354.04 46.94C356.14 47.85 357.71 48.97 358.76 50.3C359.81 51.59 360.34 53.38 360.34 55.67C360.34 59.39 358.98 62.3 356.26 64.4C353.54 66.5 349.89 67.55 345.31 67.55L345.3 67.53Z" fill="#3E2C80"/>
      <path d="M384.23 58.67L398.2 38.42C399.66 36.34 400.7 34.4 401.3 32.65C401.9 30.85 402.21 29 402.21 27.15C402.21 24 401.42 21.13 399.86 18.62C398.31 16.13 396.22 14.12 393.65 12.67C391.07 11.21 388.17 10.46 385.05 10.46C381.93 10.46 379.01 11.2 376.39 12.67C373.81 14.13 371.72 16.13 370.18 18.62C368.62 21.13 367.83 24.01 367.83 27.15C367.83 29.75 368.52 32.39 369.89 35L370.28 35.75H383.24L380.15 33.27C378.06 31.59 377.04 29.59 377.04 27.15C377.04 24.94 377.78 23.12 379.3 21.6C380.87 20.07 382.73 19.32 384.99 19.32C387.25 19.32 389.11 20.07 390.68 21.6C392.24 23.13 393 24.94 393 27.15C393 27.94 392.83 28.82 392.47 29.82C392.15 30.81 391.53 32.01 390.61 33.4L367.66 67.53H403.22V58.67H384.24H384.23Z" fill="#3E2C80"/>
      <path d="M129.62 36.34C128.15 33.75 126.19 31.75 123.82 30.41C121.47 29.02 118.86 28.31 116.08 28.31C113.3 28.31 110.94 28.93 108.63 30.14C107.54 30.73 106.53 31.45 105.63 32.3V29.02H96.89V67.53H106.11V46.31C106.11 43.28 106.92 41.06 108.58 39.54C110.31 37.95 112.2 37.17 114.36 37.17C116.98 37.17 118.93 38.06 120.35 39.92C121.87 41.83 122.61 43.98 122.61 46.49V67.53H131.83V45.6C131.83 42 131.09 38.88 129.62 36.34Z" fill="#3E2C80"/>
      <path d="M144.45 25.39C148.045 25.39 150.96 22.4754 150.96 18.88C150.96 15.2846 148.045 12.37 144.45 12.37C140.855 12.37 137.94 15.2846 137.94 18.88C137.94 22.4754 140.855 25.39 144.45 25.39Z" fill="#3E2C80"/>
      <path d="M149.06 29.03H139.84V67.54H149.06V29.03Z" fill="#3E2C80"/>
      <path d="M213.6 36.28C212.17 33.76 210.19 31.78 207.72 30.4C205.3 29.01 202.58 28.31 199.65 28.31C196.99 28.31 194.42 28.9 192.01 30.06C190.2 30.95 188.62 32.19 187.3 33.75C186.13 32.3 184.71 31.11 183.08 30.22C180.85 28.95 178.38 28.31 175.72 28.31C173.29 28.31 170.94 28.86 168.75 29.94C167.68 30.45 166.7 31.1 165.81 31.87V29.03H157.07V67.54H166.29V45.61C166.29 43.55 166.68 41.9 167.44 40.71C168.22 39.49 169.16 38.62 170.31 38.06C171.54 37.48 172.81 37.18 174.06 37.18C175.31 37.18 176.55 37.49 177.78 38.16C178.98 38.76 179.92 39.66 180.67 40.92C181.44 42.16 181.83 43.79 181.83 45.78V67.53H191.05V45.6C191.05 43.57 191.42 41.93 192.14 40.76C192.92 39.54 193.86 38.67 195.01 38.11C196.24 37.53 197.52 37.23 198.82 37.23C200.89 37.23 202.66 37.94 204.26 39.44C205.83 40.84 206.59 42.92 206.59 45.78V67.53H215.81V45C215.81 41.66 215.06 38.72 213.6 36.27V36.28Z" fill="#3E2C80"/>
      <path d="M260.28 38.35C258.58 35.38 256.25 32.98 253.38 31.25C250.51 29.45 247.25 28.54 243.71 28.54C241.2 28.54 238.8 29 236.58 29.89C235.32 30.4 234.13 31.03 233.02 31.77V7.59H223.8V67.53H232.54V64.41C233.69 65.23 234.93 65.93 236.25 66.53C238.56 67.51 241.06 68.01 243.7 68.01C247.24 68.01 250.49 67.12 253.36 65.36C256.25 63.58 258.57 61.17 260.26 58.21C262.01 55.23 262.89 51.89 262.89 48.28C262.89 44.67 262 41.33 260.27 38.36L260.28 38.35ZM253.69 47.8C253.69 49.84 253.19 51.73 252.21 53.42C251.26 55.07 249.94 56.43 248.29 57.45C246.7 58.42 244.88 58.91 242.88 58.91C240.88 58.91 239.04 58.42 237.43 57.46C235.8 56.43 234.47 55.07 233.5 53.43C232.55 51.74 232.07 49.85 232.07 47.8C232.07 45.75 232.55 43.89 233.49 42.25C234.48 40.56 235.8 39.2 237.42 38.21C239.08 37.19 240.86 36.69 242.88 36.69C244.9 36.69 246.65 37.18 248.3 38.22C249.97 39.21 251.24 40.52 252.22 42.26C253.21 43.92 253.69 45.73 253.69 47.8Z" fill="#3E2C80"/>
      <path d="M277.58 7.6H268.36V67.54H277.58V7.6Z" fill="#3E2C80"/>
      <path d="M297.36 50.75H322.09V46.74C322.09 43.12 321.2 39.83 319.44 36.96C317.7 34.11 315.32 31.82 312.4 30.17C309.46 28.46 306.18 27.6 302.65 27.6C299.12 27.6 295.76 28.49 292.77 30.24C289.84 31.98 287.47 34.37 285.74 37.33C283.99 40.27 283.1 43.6 283.1 47.21C283.1 50.82 284 54.45 285.8 57.57C287.62 60.62 290.14 63.07 293.28 64.86C296.45 66.64 300.07 67.54 304.02 67.54C306.62 67.54 309.12 67.13 311.45 66.33C313.81 65.49 315.93 64.31 317.75 62.82L318.43 62.26L315.7 51.08L313.93 53.61C312.87 55.12 311.46 56.36 309.72 57.28C307.99 58.2 306.09 58.66 304.06 58.66C301.01 58.66 298.44 57.72 296.23 55.8C294.53 54.3 293.39 52.55 292.79 50.5C293.22 50.54 293.64 50.58 294.07 50.62C295.17 50.7 296.26 50.74 297.33 50.74L297.36 50.75ZM311.9 42.72C311.02 42.64 310.12 42.6 309.21 42.6H297.36C295.86 42.6 294.35 42.68 292.86 42.85C293.53 41.28 294.55 39.9 295.96 38.67C297.9 36.95 300.08 36.11 302.65 36.11C305.22 36.11 307.34 36.9 309.34 38.54C310.81 39.72 311.85 41.11 312.49 42.76C312.29 42.75 312.09 42.74 311.89 42.73L311.9 42.72Z" fill="#3E2C80"/>
      <path d="M448.96 42.56C448.1 40.22 446.88 38.17 445.31 36.4C443.74 34.59 441.88 33.18 439.73 32.18C437.63 31.18 435.32 30.68 432.79 30.68C429.97 30.68 427.47 31.32 425.27 32.61C423.07 33.85 421.26 35.57 419.83 37.76V31.32H411.45V84.07H421.04V62.24C422.28 64.48 424 66.27 426.19 67.61C428.43 68.9 431.01 69.54 433.92 69.54C437.12 69.54 439.93 68.68 442.37 66.96C444.85 65.19 446.78 62.83 448.17 59.87C449.6 56.91 450.32 53.62 450.32 49.99C450.32 47.32 449.87 44.84 448.96 42.55V42.56ZM439.8 54.3C439.37 55.64 438.7 56.85 437.79 57.95C436.93 59 435.91 59.83 434.71 60.46C433.52 61.08 432.18 61.39 430.7 61.39C429.36 61.39 428.05 61.08 426.76 60.46C425.47 59.79 424.33 58.89 423.32 57.74C422.37 56.59 421.6 55.33 421.03 53.95V45.15C421.32 44.24 421.77 43.41 422.39 42.64C423.06 41.88 423.82 41.21 424.68 40.64C425.54 40.07 426.42 39.64 427.33 39.35C428.28 39.02 429.22 38.85 430.12 38.85C431.6 38.85 432.96 39.14 434.2 39.71C435.49 40.28 436.61 41.09 437.56 42.14C438.51 43.14 439.23 44.31 439.71 45.65C440.24 46.99 440.5 48.44 440.5 50.02C440.5 51.5 440.26 52.93 439.78 54.31L439.8 54.3Z" fill="#3E2C80"/>
    </svg>
  );
}

/* ─── MegaMenu ───────────────────────────────────────────────────────────── */
function MegaMenu({ onClose, onNavigate }) {
  const items = MEGA_PRODUCTS.integrated;
  const [hovered, setHovered] = useState(items[0].id);
  const active = items.find(i => i.id === hovered) || items[0];
  const res = active.resource;

  const TAG = {
    "New":      { bg:"#EEF2FF", color:"#4338CA", border:"#C7D2FE", dot:"#818CF8" },
    "Trending": { bg:"#FFFBEB", color:"#92400E", border:"#FDE68A", dot:"#F59E0B" },
    "Beta":     { bg:"#FDF2F8", color:"#9D174D", border:"#FBCFE8", dot:"#EC4899" },
  };

  const Item = ({ item }) => {
    const on = hovered === item.id;
    const t  = item.tag ? TAG[item.tag] : null;
    return (
      <button
        onMouseEnter={() => setHovered(item.id)}
        onClick={() => { onClose(); if (onNavigate) onNavigate(item.id); }}
        style={{ display:"flex", alignItems:"center", gap:13, width:"100%", textAlign:"left", background: on ? "#F8FAFF" : "transparent", border:`1.5px solid ${on ? item.color+"30" : "transparent"}`, borderRadius:14, padding:"11px 13px", cursor:"pointer", boxShadow: on ? `0 2px 16px ${item.color}1a,0 1px 3px rgba(0,0,0,.05)` : "none", transition:"all .18s cubic-bezier(.22,1,.36,1)" }}
      >
        <div style={{ width:40, height:40, borderRadius:11, flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, transition:"all .18s", background: on ? `linear-gradient(140deg,${item.color},${item.color}99)` : `${item.color}12`, boxShadow: on ? `0 4px 14px ${item.color}3a` : "none" }}>{item.icon}</div>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:3 }}>
            <span style={{ fontFamily:"var(--fb)", fontSize:13.5, fontWeight:700, letterSpacing:"-.01em", color:"#0F172A" }}>{item.name}</span>
            {t && (
              <span style={{ display:"inline-flex", alignItems:"center", gap:4, fontSize:9, fontWeight:700, letterSpacing:".06em", textTransform:"uppercase", padding:"2px 8px", borderRadius:100, background:t.bg, color:t.color, border:`1px solid ${t.border}`, fontFamily:"var(--fb)", lineHeight:1.7 }}>
                <span style={{ width:4, height:4, borderRadius:"50%", background:t.dot, display:"inline-block" }} />{item.tag}
              </span>
            )}
          </div>
          <p style={{ fontFamily:"var(--fb)", fontSize:12, lineHeight:1.55, color: on ? "#334155" : "#64748B", margin:0 }}>{item.desc}</p>
        </div>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink:0, opacity: on ? 0.5 : 0, transition:"opacity .18s" }}>
          <path d="M5 3l4 4-4 4" stroke={item.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    );
  };

  return (
    <>
      <div onClick={onClose} style={{ position:"fixed", inset:0, zIndex:98 }} />
      <div style={{ position:"fixed", top:72, left:0, right:0, zIndex:99, background:"#fff", boxShadow:"0 8px 40px rgba(15,23,42,.1),0 1px 0 #f1f5f9", borderBottom:"1px solid #E2E8F0", animation:"fade-up .18s cubic-bezier(.22,1,.36,1) both" }}>
        <div style={{ height:3, background:"linear-gradient(90deg,#6366F1,#8B5CF6 20%,#A855F7 38%,#EC4899 55%,#F97316 72%,#EAB308 85%,#22C55E)" }} />
        <div style={{ maxWidth:1280, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr 420px", padding:"0 40px", gap:0 }}>
          <div style={{ padding:"18px 20px 18px 0", borderRight:"1px solid #E2E8F0" }}>
            <div style={{ display:"flex", flexDirection:"column", gap:3 }}>{items.slice(0,3).map(item => <Item key={item.id} item={item} />)}</div>
          </div>
          <div style={{ padding:"18px 20px", borderRight:"1px solid #E2E8F0" }}>
            <div style={{ display:"flex", flexDirection:"column", gap:3 }}>{items.slice(3,6).map(item => <Item key={item.id} item={item} />)}</div>
          </div>
          <div style={{ padding:"18px 0 0 24px", display:"flex", flexDirection:"column" }}>
            <div style={{ borderRadius:18, overflow:"hidden", border:`1.5px solid ${active.color}28`, boxShadow:`0 6px 32px ${active.color}14,0 2px 8px rgba(0,0,0,.06)`, flex:1, display:"flex", flexDirection:"column", transition:"border-color .3s,box-shadow .3s", marginBottom:14, background:"#fff" }}>
              <div style={{ flex:1, position:"relative", overflow:"hidden", minHeight:0, background:`linear-gradient(145deg,${active.color}18 0%,${active.color}08 100%)` }}>
                <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(rgba(0,0,0,.05) 1px,transparent 1px)", backgroundSize:"12px 12px", pointerEvents:"none", zIndex:1 }} />
                <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", zIndex:2 }}>
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:8 }}>
                    <div style={{ width:56, height:56, borderRadius:16, background:`${active.color}18`, border:`1.5px dashed ${active.color}50`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:26 }}>{res.icon}</div>
                    <span style={{ fontSize:9, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:active.color, fontFamily:"var(--fb)", opacity:.6 }}>Cover image placeholder</span>
                  </div>
                </div>
                <div style={{ position:"absolute", bottom:0, left:0, right:0, zIndex:3, background:`linear-gradient(0deg,${active.color}f0 0%,${active.color}cc 60%,transparent 100%)`, padding:"28px 16px 14px" }}>
                  <div style={{ fontSize:8.5, fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", color:"rgba(255,255,255,.6)", fontFamily:"var(--fb)", marginBottom:3 }}>{res.type}</div>
                  <div style={{ fontSize:13, fontWeight:800, color:"#fff", lineHeight:1.25, fontFamily:"var(--fb)", letterSpacing:"-.02em" }}>{res.label}</div>
                </div>
              </div>
              <div style={{ padding:"10px 14px", display:"flex", alignItems:"center", justifyContent:"space-between", gap:10, borderTop:`1px solid ${active.color}14`, flexShrink:0 }}>
                <div style={{ display:"flex", alignItems:"center", gap:5 }}>
                  <div style={{ width:18, height:18, borderRadius:5, background:`${active.color}12`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, flexShrink:0 }}>🕐</div>
                  <span style={{ fontSize:11, color:"#64748B", fontFamily:"var(--fb)" }}>{res.meta}</span>
                </div>
                <a href="#" onClick={onClose} style={{ display:"inline-flex", alignItems:"center", gap:5, flexShrink:0, background:`linear-gradient(135deg,${active.color},${active.color}cc)`, color:"#fff", borderRadius:100, padding:"6px 14px", fontSize:11.5, fontWeight:700, textDecoration:"none", fontFamily:"var(--fb)", letterSpacing:"-.01em", boxShadow:`0 3px 12px ${active.color}3a`, whiteSpace:"nowrap", transition:"all .18s" }}
                  onMouseEnter={e => { e.currentTarget.style.transform="translateY(-1px)"; e.currentTarget.style.boxShadow=`0 6px 18px ${active.color}50`; }}
                  onMouseLeave={e => { e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow=`0 3px 12px ${active.color}3a`; }}
                >Access →</a>
              </div>
            </div>
          </div>
        </div>
        <div style={{ borderTop:"1px solid rgba(0,0,0,.07)", padding:"10px 40px", background:"#F8FAFC", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ display:"flex", alignItems:"center", gap:6 }}>
            <span style={{ fontSize:10.5, color:"#64748B", fontFamily:"var(--fb)", marginRight:8 }}>Trusted enterprise standard:</span>
            {[["#22C55E","SOC 2 Type II"],["#22C55E","ISO 27001"],["#6366F1","99.9% Uptime"]].map(([dot,label]) => (
              <span key={label} style={{ display:"inline-flex", alignItems:"center", gap:5, padding:"3px 10px", background:dot==="#6366F1"?"#EEF2FF":"#F0FDF4", borderRadius:100, fontSize:10.5, fontWeight:600, color:dot==="#6366F1"?"#4338CA":"#166534", fontFamily:"var(--fb)", border:`1px solid ${dot==="#6366F1"?"#C7D2FE":"#BBF7D0"}` }}>
                <span style={{ width:5, height:5, borderRadius:"50%", background:dot, display:"inline-block" }} />{label}
              </span>
            ))}
          </div>
          <span style={{ fontSize:11, color:"#CBD5E1", fontFamily:"var(--fb)", display:"flex", alignItems:"center", gap:6 }}>Press <kbd style={{ background:"#fff", border:"1px solid #E2E8F0", borderRadius:6, padding:"2px 8px", fontSize:10.5, color:"#475569", fontWeight:600 }}>Esc</kbd> to close</span>
        </div>
      </div>
    </>
  );
}

/* ─── Nav ────────────────────────────────────────────────────────────────── */
function Nav({ onNavigate, onBack, pageName }) {
  const [open, setOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const w = useWidth();
  const isMobile = w < 768;
  const NAV_H = 72;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const onScroll = () => { setScrolled(window.scrollY > 60); setMegaOpen(false); };
    window.addEventListener("scroll", onScroll, { passive:true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = e => { if (e.key === "Escape") setMegaOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const bg      = scrolled ? "#ffffff" : "#221868";
  const linkClr = scrolled ? "rgba(15,23,42,.65)" : "rgba(255,255,255,.7)";
  const linkHov = scrolled ? "#0F172A" : "#fff";
  const border  = scrolled ? "rgba(0,0,0,.08)" : "rgba(255,255,255,.1)";
  const hamClr  = scrolled ? "#0F172A" : "#fff";

  return (
    <>
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, background:bg, borderBottom:`1px solid ${border}`, transition:"background .3s ease,border-color .3s ease", backdropFilter: scrolled ? "blur(12px)" : "none", boxShadow: scrolled ? "0 1px 20px rgba(0,0,0,.08)" : "none" }}>
        <div style={{ maxWidth:1400, margin:"0 auto", display:"flex", alignItems:"center", height:NAV_H, padding: isMobile ? "0 20px" : "0 36px", position:"relative" }}>
          <a href="#" onClick={e => { e.preventDefault(); if (onBack) onBack(); window.scrollTo({ top:0, behavior:"smooth" }); }} style={{ display:"flex", alignItems:"center", textDecoration:"none", flexShrink:0 }}>
            {scrolled ? <NimbleColorLogo height={isMobile ? 22 : 26} /> : <NimbleLogo height={isMobile ? 22 : 26} />}
          </a>
          <div className="nav-links-desktop">
            <button onClick={() => setMegaOpen(o => !o)} style={{ display:"inline-flex", alignItems:"center", gap:5, fontSize:14.5, fontWeight: megaOpen ? 600 : 400, color: megaOpen ? (scrolled ? "#0F172A" : "#fff") : linkClr, background:"none", border:"none", cursor:"pointer", fontFamily:"var(--fb)", letterSpacing:"-.01em", padding:0, transition:"color .2s" }}>
              Products
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ opacity:.6, transform: megaOpen ? "rotate(180deg)" : "none", transition:"transform .2s" }}>
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {["Why NimbleS2P","Pricing"].map(l => (
              <a key={l} href="#" onClick={e => { e.preventDefault(); if (l === "Why NimbleS2P" && onNavigate) onNavigate("why"); if (l === "Pricing" && onNavigate) onNavigate("pricing"); }} style={{ fontSize:14.5, fontWeight:400, color:linkClr, textDecoration:"none", fontFamily:"var(--fb)", letterSpacing:"-.01em", transition:"color .2s" }}
                onMouseEnter={e => e.target.style.color = linkHov}
                onMouseLeave={e => e.target.style.color = linkClr}
              >{l}</a>
            ))}
            {megaOpen && <MegaMenu onClose={() => setMegaOpen(false)} onNavigate={onNavigate} />}
          </div>
          <a onClick={e => { e.preventDefault(); if (typeof onNavigate === "function") onNavigate("demo"); }} className="nav-cta-desktop" href="#" style={{ display:"inline-flex", alignItems:"center", gap:6, background:"linear-gradient(135deg,#E8960A,#F5A623)", color:"#fff", border:"none", borderRadius:9, padding:"10px 26px", fontSize:14.5, fontWeight:700, cursor:"pointer", fontFamily:"var(--fb)", textDecoration:"none", letterSpacing:"-.01em", boxShadow:"0 4px 20px rgba(232,150,10,.38)", transition:"transform .2s cubic-bezier(.22,1,.36,1),box-shadow .2s", flexShrink:0 }}
            onMouseEnter={e => { e.currentTarget.style.transform="translateY(-1px)"; e.currentTarget.style.boxShadow="0 8px 30px rgba(232,150,10,.55)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow="0 4px 20px rgba(232,150,10,.38)"; }}
          >Book a Demo →</a>
          <button className="hamburger" onClick={() => setOpen(o => !o)} aria-label="Toggle menu">
            <span style={{ background:hamClr, transform: open ? "rotate(45deg) translate(5px,5px)" : "none" }} />
            <span style={{ background:hamClr, opacity: open ? 0 : 1 }} />
            <span style={{ background:hamClr, transform: open ? "rotate(-45deg) translate(5px,-5px)" : "none" }} />
          </button>
        </div>
      </nav>
      <div className={`mobile-menu${open ? " open" : ""}`} style={{ top:NAV_H }}>
        <div style={{ padding:"14px 16px", borderRadius:10 }}>
          <div style={{ fontSize:17, fontWeight:600, color:"rgba(255,255,255,.75)", fontFamily:"var(--fb)", marginBottom:12 }}>Products</div>
          {MEGA_PRODUCTS.integrated.map(item => (
            <a key={item.id} href="#" className="mobile-nav-link" style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 0" }} onClick={() => { setOpen(false); if (onNavigate) onNavigate(item.id); }}>
              <span style={{ fontSize:16 }}>{item.icon}</span>
              <span>{item.name}</span>
            </a>
          ))}
        </div>
        <div className="mobile-divider" />
        {["Why NimbleS2P","Pricing"].map(l => (
          <a key={l} href="#" className="mobile-nav-link" onClick={() => { setOpen(false); if (l === "Why NimbleS2P" && onNavigate) onNavigate("why"); if (l === "Pricing" && onNavigate) onNavigate("pricing"); }}>{l}</a>
        ))}
        <div className="mobile-divider" />
        <a href="#" style={{ display:"flex", justifyContent:"center", alignItems:"center", background:"linear-gradient(135deg,#E8960A,#F5A623)", color:"#fff", borderRadius:10, padding:"14px 24px", fontSize:16, fontWeight:700, textDecoration:"none", fontFamily:"var(--fb)", boxShadow:"0 4px 20px rgba(232,150,10,.4)", marginTop:8 }} onClick={() => { setOpen(false); if (onNavigate) onNavigate("demo"); }}>Book a Demo →</a>
      </div>
    </>
  );
}


/* ─── ScrollReveal Section wrapper ───────────────────────────────────────── */
function Section({ id, num, title, children }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} id={id} className={`terms-section sr${visible ? " visible" : ""}`}>
      <div className="terms-section-title">
        <span className="terms-num">{num}</span> {title}
      </div>
      {children}
    </div>
  );
}

/* ─── Main Page ──────────────────────────────────────────────────────────── */
export default function TermsPage({ onNavigate, onBack }) {
  const [activeId, setActiveId] = useState("intro");

  useEffect(() => {
    const hash = (window.location.hash || "").replace(/^#/, "");
    if (hash) {
      requestAnimationFrame(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + 120;
      for (const [slug] of [...TOC_ITEMS].reverse()) {
        const el = document.getElementById(slug);
        if (el && el.offsetTop <= y) { setActiveId(slug); break; }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{CSS}</style>

      <Nav onNavigate={onNavigate} onBack={onBack} pageName="Terms and Conditions" />

      {/* HERO */}
      <section className="terms-hero">
        <div className="glow-a" /><div className="glow-b" />
        <div className="terms-hero-inner">
          <h1>Terms and Conditions</h1>
          <div className="terms-meta">
            <span>Techpanion Solutions Pvt Ltd</span>
            <span className="terms-meta-dot" />
            <span>Effective 1 Jan 2025</span>
            <span className="terms-meta-dot" />
            <span>India</span>
          </div>
        </div>
        <svg className="terms-hero-wave" viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,40 C200,10 400,70 600,40 C800,10 1000,60 1200,40 C1320,28 1400,50 1440,40 L1440,80 L0,80 Z" fill="rgba(107,53,184,0.2)">
            <animate attributeName="d" dur="7s" repeatCount="indefinite"
              values="M0,40 C200,10 400,70 600,40 C800,10 1000,60 1200,40 C1320,28 1400,50 1440,40 L1440,80 L0,80 Z;M0,52 C200,72 400,22 600,52 C800,72 1000,28 1200,52 C1320,62 1400,42 1440,52 L1440,80 L0,80 Z;M0,40 C200,10 400,70 600,40 C800,10 1000,60 1200,40 C1320,28 1400,50 1440,40 L1440,80 L0,80 Z"
            />
          </path>
          <path d="M0,55 C200,35 400,65 600,55 C800,35 1000,68 1200,55 C1320,46 1400,58 1440,55 L1440,80 L0,80 Z" fill="rgba(46,30,122,0.26)" />
          <path d="M0,65 C200,52 400,72 600,65 C800,52 1000,74 1200,65 C1320,58 1400,68 1440,65 L1440,80 L0,80 Z" fill="rgba(31,21,88,0.32)" />
        </svg>
      </section>

      {/* BODY */}
      <section className="terms-body">
        <div className="terms-inner">
          {/* TOC */}
          <aside className="terms-toc">
            <div className="terms-toc-label">On this page</div>
            <ul className="terms-toc-list">
              {TOC_ITEMS.map(([slug, label]) => (
                <li key={slug}><a href={`#${slug}`} className={activeId === slug ? "active" : ""}>{label}</a></li>
              ))}
            </ul>
          </aside>

          {/* CONTENT */}
          <div className="terms-content">

            <Section id="intro" num="01" title="Introduction">
              <p className="terms-p">Welcome to Techpanion Solutions Pvt Ltd ("Company", "we", "our", "us")!</p>
              <p className="terms-p">These Terms of Service govern your use of our website located at <a href="https://www.techpanion.com">www.techpanion.com</a> &amp; <a href="https://www.nimbles2p.com">www.nimbles2p.com</a> operated by Techpanion Solutions Pvt Ltd.</p>
              <p className="terms-p">Our Privacy Policy also governs your use of our Service and explains how we collect, safeguard and disclose information from your use of our web pages.</p>
              <p className="terms-p">Your agreement with us includes these Terms and our Privacy Policy. You acknowledge that you have read and understood the Agreements. If you do not agree, please emailing <a href="mailto:info@techpanion.com">info@techpanion.com</a>.</p>
            </Section>

            <Section id="comms" num="02" title="Communications">
              <p className="terms-p">By using our Service, you agree to receive newsletters, marketing or promotional materials. You may opt out at any time by following the unsubscribe link or emailing <a href="mailto:info@techpanion.com">info@techpanion.com</a>.</p>
            </Section>

            <Section id="contests" num="03" title="Contests, Sweepstakes & Promotions">
              <p className="terms-p">Any promotions made available through Service may be governed by rules separate from these Terms of Service. If rules for a Promotion conflict with these Terms, Promotion rules will apply.</p>
            </Section>

            <Section id="ai" num="04" title="AI & Automated Features">
              <p className="terms-p">NimbleS2P leverages artificial intelligence and machine learning to power features including automated invoice processing, supplier risk scoring, spend analytics, anomaly detection, and procurement recommendations ("AI Features").</p>
              <p className="terms-p">By using our Service, you acknowledge and agree to the following with respect to AI Features:</p>
              <div className="ai-points">
                {AI_POINTS.map(([label, text]) => (
                  <div key={label} className="ai-point">
                    <div className="ai-point-label">{label}</div>
                    <div className="ai-point-text">{text}</div>
                  </div>
                ))}
              </div>
              <p className="terms-p">If you have concerns about how AI Features have processed your data, please contact us at <a href="mailto:info@techpanion.com">info@techpanion.com</a>.</p>
            </Section>

            <Section id="content" num="05" title="Content">
              <p className="terms-p">Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for Content you post, including its legality, reliability, and appropriateness.</p>
              <p className="terms-p">By posting Content, you represent and warrant that: (i) Content is yours and you have the right to use it, and (ii) posting your Content does not violate the rights of any person or entity. We reserve the right to terminate accounts found infringing on copyright.</p>
            </Section>

            <Section id="prohibited" num="06" title="Prohibited Uses">
              <p className="terms-p">You may use Service only for lawful purposes. You agree not to use Service:</p>
              <ul className="terms-list">
                {PROHIBITED.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </Section>

            <Section id="analytics" num="07" title="Analytics">
              <p className="terms-p">We may use third-party Service Providers such as Google Analytics to monitor and analyze the use of our Service.</p>
            </Section>

            <Section id="minors" num="08" title="No Use By Minors">
              <p className="terms-p">Service is intended only for individuals at least eighteen (18) years old. By accessing or using Service, you warrant that you are at least eighteen (18) years of age.</p>
            </Section>

            <Section id="ip" num="09" title="Intellectual Property">
              <p className="terms-p">Service and its original content, features and functionality are and will remain the exclusive property of Techpanion Solutions Pvt Ltd and its licensors. Our trademarks and trade dress may not be used without our prior written consent.</p>
            </Section>

            <Section id="dmca" num="10" title="Copyright Policy & DMCA">
              <p className="terms-p">We respect intellectual property rights and respond to copyright infringement claims. Please submit claims via email to <a href="mailto:info@techpanion.com">info@techpanion.com</a> with the subject line "Copyright Infringement" and a detailed description of the alleged infringement.</p>
            </Section>

            <Section id="feedback" num="11" title="Error Reporting and Feedback">
              <p className="terms-p">You may provide feedback at <a href="mailto:info@techpanion.com">info@techpanion.com</a>. You acknowledge that: (i) you shall not retain any intellectual property right in the Feedback; (ii) Company may have development ideas similar to the Feedback; (iii) Feedback does not contain confidential information from you or any third party.</p>
            </Section>

            <Section id="links" num="12" title="Links To Other Web Sites">
              <p className="terms-p">Our Service may contain links to third-party websites not owned or controlled by Techpanion Solutions Pvt Ltd. We have no control over, and assume no responsibility for the content, privacy policies, or practices of any third-party websites.</p>
            </Section>

            <Section id="disclaimer" num="13" title="Disclaimer of Warranty & Limitation of Liability">
              <div className="terms-caps">THESE SERVICES ARE PROVIDED BY COMPANY ON AN "AS IS" AND "AS AVAILABLE" BASIS. COMPANY MAKES NO REPRESENTATIONS OR WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, AS TO THE OPERATION OF THEIR SERVICES, OR THE INFORMATION, CONTENT OR MATERIALS INCLUDED THEREIN.</div>
              <div className="terms-caps">EXCEPT AS PROHIBITED BY LAW, YOU WILL HOLD US AND OUR OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS HARMLESS FOR ANY INDIRECT, PUNITIVE, SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGE, HOWEVER IT ARISES, INCLUDING ATTORNEYS' FEES AND ALL RELATED COSTS AND EXPENSES OF LITIGATION AND ARBITRATION.</div>
            </Section>

            <Section id="termination" num="14" title="Termination & Governing Law">
              <p className="terms-p">We may terminate or suspend your account immediately, without prior notice or liability, for any reason including a breach of Terms.</p>
              <p className="terms-p">These Terms shall be governed and construed in accordance with the laws of India. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.</p>
            </Section>

            <Section id="changes" num="15" title="Changes & Amendments">
              <p className="terms-p">We reserve the right to withdraw or amend our Service in our sole discretion without notice. We may amend Terms at any time by posting amended terms on this site. Your continued use of the Platform following posting of revised Terms means you accept the changes.</p>
            </Section>

            <Section id="waiver" num="16" title="Waiver And Severability">
              <p className="terms-p">No waiver by Company of any term or condition shall be deemed a further or continuing waiver. If any provision of Terms is held to be invalid or unenforceable, such provision shall be eliminated to the minimum extent such that remaining provisions continue in full force and effect.</p>
            </Section>

            <Section id="acknowledgment" num="17" title="Acknowledgment">
              <div className="terms-caps">BY USING SERVICE OR OTHER SERVICES PROVIDED BY US, YOU ACKNOWLEDGE THAT YOU HAVE READ THESE TERMS OF SERVICE AND AGREE TO BE BOUND BY THEM.</div>
            </Section>

            <Section id="contact" num="18" title="Contact Us">
              <p className="terms-p">Please send your feedback, comments, requests for technical support by email:</p>
              <div className="terms-contact-card">
                <div className="terms-contact-icon">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect x="2" y="4" width="16" height="12" rx="2" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" />
                    <path d="M2 6l8 5 8-5" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <div className="terms-contact-label">Email us at</div>
                  <a href="mailto:info@techpanion.com" className="terms-contact-value">info@techpanion.com</a>
                </div>
              </div>
            </Section>

          </div>
        </div>
      </section>

      <VDDFooter onNavigate={onNavigate} />
    </>
  );
}
