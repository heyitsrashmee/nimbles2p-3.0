"use client";

import { useState, useEffect } from "react";
import { useWidth, useReveal, Eyebrow } from "@/components/shared/pageUi";
import {
  ShieldCheckIcon,
  ActivityIcon,
  LayersIcon,
  ZapIcon,
  UsersIcon,
} from "@/components/shared/whyIcons";
import { Nav } from "@/components/layout/SiteNav";
import { VDDFooter } from "@/components/layout/VDDFooter";

/* ═══════════════════════════════════════════════════════════
   WHY NIMBLES2P — PAGE
═══════════════════════════════════════════════════════════ */

/* ════════════════════════════════════
   1. HERO
════════════════════════════════════ */
function WhyHero({ onNavigate }) {
  const w = useWidth(); const isMobile = w < 640;
  return (
    <section style={{
      minHeight: isMobile ? "70vh" : "80vh",
      position:"relative", overflow:"hidden",
      background:"linear-gradient(140deg,#14104A 0%,#1E1660 40%,#261d6b 70%,#1a1258 100%)",
      display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
      padding: isMobile ? "110px 20px 64px" : "128px 5vw 80px",
      textAlign:"center",
    }}>
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", background:"radial-gradient(ellipse 90% 70% at 50% 35%, rgba(99,32,224,.32) 0%, transparent 65%)" }} />
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", backgroundImage:"radial-gradient(rgba(255,255,255,.045) 1px,transparent 1px)", backgroundSize:"30px 30px" }} />

      <div style={{ position:"relative", zIndex:2, maxWidth:800, width:"100%" }}>
        

        <h1 className="fade-up d1" style={{
          fontFamily:"var(--fb)", fontWeight:900,
          fontSize: isMobile ? "clamp(28px,8vw,42px)" : "clamp(40px,4.5vw,64px)",
          lineHeight:1.0, letterSpacing:"-.04em", marginBottom:22, paddingBottom:8,
          background:"linear-gradient(160deg,#fff 0%,#fff 40%,#E2D9FE 60%,#F5C842 85%,#F5A623 100%)",
          WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
        }}>
          Enterprise AI, Designed Right.
        </h1>

        <p className="fade-up d2" style={{ fontSize: isMobile ? 15 : 18, color:"rgba(255,255,255,.52)", lineHeight:1.75, fontFamily:"var(--fb)", maxWidth:620, margin:"0 auto 36px" }}>
          From day one, NimbleS2P brings clarity to supplier operations — every transaction visible, every action traceable.
        </p>

        <div className="fade-up d3" style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
          <a href="#story" style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", gap:7, background:"linear-gradient(135deg,#E8920A,#F5B020)", color:"#fff", border:"none", borderRadius:10, padding:"12px 32px", fontSize: isMobile ? 14.5 : 15.5, fontWeight:700, cursor:"pointer", fontFamily:"var(--fb)", textDecoration:"none", letterSpacing:"-.01em", boxShadow:"0 4px 24px rgba(232,150,10,.48),0 1px 0 rgba(255,255,255,.15) inset", transition:"transform .2s,box-shadow .2s", width: isMobile ? "100%" : "auto" }}
            onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 10px 36px rgba(232,150,10,.62)";}}
            onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="0 4px 24px rgba(232,150,10,.48),0 1px 0 rgba(255,255,255,.15) inset";}}
          >See the Full Story ↓</a>
          <a onClick={e=>{ e.preventDefault(); if(typeof onNavigate==="function") onNavigate("getstarted"); }} href="#" style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", gap:7, background:"rgba(16,10,46,.55)", color:"rgba(255,255,255,.8)", border:"1.5px solid rgba(255,255,255,.22)", borderRadius:10, padding:"11px 28px", fontSize: isMobile ? 14.5 : 15.5, fontWeight:500, fontFamily:"var(--fb)", textDecoration:"none", backdropFilter:"blur(10px)", transition:"all .18s", width: isMobile ? "100%" : "auto" }}
            onMouseEnter={e=>{e.currentTarget.style.background="rgba(38,26,88,.75)";e.currentTarget.style.color="#fff";}}
            onMouseLeave={e=>{e.currentTarget.style.background="rgba(16,10,46,.55)";e.currentTarget.style.color="rgba(255,255,255,.8)";}}
          >Get Started →</a>
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
   2. PARAGRAPH STORY
════════════════════════════════════ */
const storyPoints = [
  { icon:"🔒", color:"#059669", heading:"Compliance-First Architecture", text:"Built to ensure governance, traceability, control, and enterprise-wide accountability without slowing operations." },
  { icon:"🔧", color:"#D97706", heading:"Hyper-Configurable",            text:"Adapts to your processes — not the other way around. Configure workflows, rules, and approvals without writing a line of code." },
  { icon:"⚡", color:"#0369A1", heading:"High-Performance Architecture", text:"Speed, stability, and reliability at enterprise scale. Built to handle millions of transactions without breaking a sweat." },
  { icon:"🤝", color:"#7C3AED", heading:"Responsive Partnership",          text:"A team that ensures continuity at every step — from implementation to scale, always on, always responsive." },
];

const STORY_CARD_HEIGHT = 420;

function WhyStory() {
  const w = useWidth(); const isMobile = w < 640; const isTablet = w < 960;
  const [active, setActive] = useState(0);
  const ref = useReveal();
  const ap = storyPoints[active];

  return (
    <section id="story" style={{ background:"#fff", padding: isMobile ? "64px 20px" : "clamp(64px,9vh,104px) 5vw" }}>
      <div style={{ maxWidth:1080, margin:"0 auto" }}>

        {/* Eyebrow + intro — full width top */}
        <div style={{ marginBottom: isMobile ? 40 : 56 }}>
          <Eyebrow>Our Promise</Eyebrow>
          <h2 style={{ fontFamily:"var(--fb)", fontSize: isMobile ? "clamp(24px,6vw,34px)" : "clamp(28px,3vw,42px)", fontWeight:700, letterSpacing:"-.04em", lineHeight:1.06, color:"#0F172A", margin:0 }}>
            Where supplier experience meets finance control.
          </h2>
        </div>

        {/* Main content — LHS fixed height; RHS matches for top/bottom alignment */}
        <div className="reveal" ref={ref} style={{
          display:"grid",
          gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr" : "1fr 1fr",
          gap: isMobile ? 24 : 32,
          alignItems: isMobile ? "start" : "stretch",
        }}>

          {/* LEFT — fixed-size feature card */}
          <div style={{
            background:`linear-gradient(145deg,${ap.color}0c 0%,${ap.color}04 100%)`,
            border:`1.5px solid ${ap.color}28`,
            borderRadius:24, padding: isMobile ? "32px 24px" : "44px 44px",
            boxSizing:"border-box",
            width:"100%",
            height: isMobile ? "auto" : STORY_CARD_HEIGHT,
            minHeight: isMobile ? 300 : STORY_CARD_HEIGHT,
            flexShrink:0,
            display:"flex", flexDirection:"column", justifyContent:"space-between",
            boxShadow:`0 8px 40px ${ap.color}10`,
            transition:"background .35s cubic-bezier(.22,1,.36,1), border-color .35s cubic-bezier(.22,1,.36,1), box-shadow .35s cubic-bezier(.22,1,.36,1)",
            overflow:"hidden", position:"relative",
          }}>
            {/* Background glow */}
            <div style={{ position:"absolute", top:"-20%", right:"-10%", width:"60%", height:"60%", borderRadius:"50%", background:`radial-gradient(circle,${ap.color}14 0%,transparent 70%)`, pointerEvents:"none", transition:"background .35s" }} />

            <div style={{ position:"relative", zIndex:1, flex:1, minHeight:0, overflow:"hidden" }}>
              <div style={{ width:64, height:64, borderRadius:18, background:`linear-gradient(135deg,${ap.color},${ap.color}bb)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:28, marginBottom:24, boxShadow:`0 8px 28px ${ap.color}44` }}>{ap.icon}</div>
              <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:`${ap.color}12`, border:`1px solid ${ap.color}28`, borderRadius:100, padding:"3px 12px", marginBottom:16 }}>
                <span style={{ fontSize:9.5, fontWeight:800, letterSpacing:".1em", textTransform:"uppercase", color:ap.color, fontFamily:"var(--fb)" }}>{String(active+1).padStart(2,"0")} of {storyPoints.length}</span>
              </div>
              <h3 style={{ fontFamily:"var(--fb)", fontSize: isMobile ? 22 : 28, fontWeight:800, color:"#0F172A", letterSpacing:"-.03em", lineHeight:1.15, marginBottom:16 }}>{ap.heading}</h3>
              <p style={{ fontSize: isMobile ? 14.5 : 16, color:"#475569", lineHeight:1.78, fontFamily:"var(--fb)", margin:0 }}>{ap.text}</p>
            </div>

            {/* Progress dots */}
            <div style={{ display:"flex", gap:6, marginTop:32, position:"relative", zIndex:1 }}>
              {storyPoints.map((_,i)=>(
                <button key={i} onClick={()=>setActive(i)} style={{ height:3, flex: active===i ? 3 : 1, borderRadius:2, background: active===i ? ap.color : `${ap.color}28`, border:"none", cursor:"pointer", padding:0, transition:"all .3s cubic-bezier(.22,1,.36,1)" }} />
              ))}
            </div>
          </div>

          {/* RIGHT — same height as LHS; rows share space evenly */}
          <div style={{
            display:"flex", flexDirection:"column", gap:4,
            height: isMobile ? "auto" : STORY_CARD_HEIGHT,
            minHeight: isMobile ? 0 : STORY_CARD_HEIGHT,
            boxSizing:"border-box",
          }}>
            {storyPoints.map((p, i) => {
              const isAct = active === i;
              return (
                <button key={p.heading} onClick={()=>setActive(i)} style={{
                  display:"flex", alignItems: isAct ? "flex-start" : "center", gap:14,
                  flex: isMobile ? "0 0 auto" : 1,
                  minHeight: isMobile ? undefined : 0,
                  overflow:"hidden",
                  background: isAct ? `${p.color}08` : "transparent",
                  border:`1px solid ${isAct ? p.color+"28" : "transparent"}`,
                  borderRadius:14, padding: isMobile ? "14px 16px" : "16px 20px",
                  cursor:"pointer", textAlign:"left", width:"100%",
                  transition:"background .2s cubic-bezier(.22,1,.36,1), border-color .2s cubic-bezier(.22,1,.36,1), box-shadow .2s cubic-bezier(.22,1,.36,1)",
                }}>
                  <div style={{
                    width:46, height:46, borderRadius:12, flexShrink:0,
                    background: isAct ? `linear-gradient(135deg,${p.color},${p.color}bb)` : "#F8FAFC",
                    border: isAct ? "none" : "1px solid #E2E8F0",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontSize:20, transition:"all .2s",
                    boxShadow: isAct ? `0 4px 14px ${p.color}44` : "none",
                  }}>{p.icon}</div>
                  <div style={{ flex:1, minWidth:0, minHeight:0, overflow:"hidden" }}>
                    <div style={{ fontFamily:"var(--fb)", fontSize: isMobile ? 14.5 : 16, fontWeight:700, color: isAct ? "#0F172A" : "#475569", letterSpacing:"-.015em", lineHeight:1.2, marginBottom: isAct ? 5 : 0, transition:"color .2s" }}>{p.heading}</div>
                    {isAct && <div style={{ fontSize:13, color:"#64748B", lineHeight:1.55, fontFamily:"var(--fb)", overflow:"hidden" }}>{p.text}</div>}
                  </div>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink:0, opacity: isAct ? 1 : 0.25, transition:"opacity .2s, transform .2s", transform: isAct ? "rotate(90deg)" : "none" }}>
                    <path d="M6 4l4 4-4 4" stroke={isAct ? p.color : "#94A3B8"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════
   3. BEFORE / AFTER
════════════════════════════════════ */
const beforeAfterRows = [
  { before:"Slow, labour-intensive onboarding taking weeks",           after:"21-minute self-service onboarding" },
  { before:"Compliance gaps & regulatory fines",                       after:"100% all-time audit-ready compliance" },
  { before:"Email-driven sourcing",                                    after:"60% faster sourcing" },
  { before:"High manual workload & frequent errors",                   after:"40%+ straight-through processing" },
  { before:"Delays & payment discrepancies",                           after:"Automated matching & de-duplication" },
  { before:"No real-time collaboration or visibility",                 after:"Data-driven decisions & live dashboards" },
  { before:"Team time lost in supplier clarifications",                after:"Automated query resolution & smart alerts" },
];

function WhyBeforeAfter() {
  const w = useWidth(); const isMobile = w < 640;
  const ref = useReveal();
  return (
    <section style={{
      background:"linear-gradient(160deg,#0F0C2A 0%,#1a1260 45%,#221868 100%)",
      position:"relative", overflow:"hidden",
      padding: isMobile ? "64px 20px" : "clamp(64px,9vh,104px) 5vw",
    }}>
      <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(rgba(255,255,255,.04) 1px,transparent 1px)", backgroundSize:"26px 26px", pointerEvents:"none" }} />
      <div style={{ position:"absolute", top:0, right:"10%", width:"40%", height:"60%", background:"radial-gradient(ellipse,rgba(99,32,224,.2) 0%,transparent 65%)", pointerEvents:"none" }} />

      <div style={{ maxWidth:1080, margin:"0 auto", position:"relative", zIndex:1 }}>
        <div style={{ marginBottom: isMobile ? 36 : 52 }}>
          <Eyebrow dark>The Transformation</Eyebrow>
          <h2 style={{ fontFamily:"var(--fb)", fontSize: isMobile ? "clamp(24px,6vw,34px)" : "clamp(28px,3.5vw,44px)", fontWeight:900, letterSpacing:"-.04em", lineHeight:1.05, background:"linear-gradient(95deg,#fff 0%,#fff 30%,#F5D060 62%,#F5A623 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", marginBottom:12 }}>
            Life before and after<br />NimbleS2P
          </h2>
          <p style={{ fontSize:15, color:"rgba(255,255,255,.42)", lineHeight:1.7, fontFamily:"var(--fb)", maxWidth:480 }}>Seven transformations your team will feel from day one.</p>
        </div>

        {/* Column headers */}
        <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 56px 1fr", gap: isMobile ? 0 : 0, marginBottom:12 }}>
          <div style={{ padding:"10px 20px", display:"flex", alignItems:"center", gap:8 }}>
            <div style={{ width:22, height:22, borderRadius:"50%", background:"rgba(239,68,68,.2)", border:"1px solid rgba(239,68,68,.4)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 2l6 6M8 2l-6 6" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </div>
            <span style={{ fontFamily:"var(--fb)", fontSize:12, fontWeight:700, color:"rgba(239,68,68,.8)", letterSpacing:".06em", textTransform:"uppercase" }}>Before</span>
          </div>
          {!isMobile && <div />}
          <div style={{ padding:"10px 20px", display:"flex", alignItems:"center", gap:8 }}>
            <div style={{ width:22, height:22, borderRadius:"50%", background:"rgba(16,185,129,.2)", border:"1px solid rgba(16,185,129,.4)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <svg width="11" height="9" viewBox="0 0 11 9" fill="none"><path d="M1 4.5l3 3.5L10 1" stroke="#10B981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <span style={{ fontFamily:"var(--fb)", fontSize:12, fontWeight:700, color:"rgba(16,185,129,.8)", letterSpacing:".06em", textTransform:"uppercase" }}>After NimbleS2P</span>
          </div>
        </div>

        <div className="reveal" ref={ref} style={{ display:"flex", flexDirection:"column", gap:8 }}>
          {beforeAfterRows.map((row, i) => (
            <div key={i} style={{
              display:"grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 56px 1fr",
              borderRadius:14, overflow:"hidden",
            }}>
              {/* Before */}
              <div style={{ background:"rgba(239,68,68,.06)", border:"1px solid rgba(239,68,68,.12)", borderRadius: isMobile ? "14px 14px 0 0" : "14px 0 0 14px", padding: isMobile ? "16px 18px" : "18px 24px", display:"flex", alignItems:"center", gap:12 }}>
                <span style={{ fontSize:11, color:"#EF4444", fontWeight:700, flexShrink:0 }}>✕</span>
                <span style={{ fontFamily:"var(--fb)", fontSize: isMobile ? 13.5 : 14.5, color:"rgba(255,255,255,.5)", lineHeight:1.5 }}>{row.before}</span>
              </div>

              {/* Arrow divider */}
              {!isMobile ? (
                <div style={{ background:"rgba(255,255,255,.04)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, color:"rgba(255,255,255,.2)" }}>→</div>
              ) : (
                <div style={{ background:"rgba(255,255,255,.04)", padding:"6px 0", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, color:"rgba(255,255,255,.2)" }}>↓</div>
              )}

              {/* After */}
              <div style={{ background:"rgba(16,185,129,.07)", border:"1px solid rgba(16,185,129,.15)", borderRadius: isMobile ? "0 0 14px 14px" : "0 14px 14px 0", padding: isMobile ? "16px 18px" : "18px 24px", display:"flex", alignItems:"center", gap:12 }}>
                <span style={{ fontSize:11, color:"#10B981", fontWeight:700, flexShrink:0 }}>✓</span>
                <span style={{ fontFamily:"var(--fb)", fontSize: isMobile ? 13.5 : 14.5, fontWeight:600, color:"rgba(255,255,255,.85)", lineHeight:1.5 }}>{row.after}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════
   4. NUMBERS — flip card + proof panel
════════════════════════════════════ */
function WhyNumbers() {
  const w = useWidth(); const isMobile = w < 640;
  const ref = useReveal();
  const [flipped, setFlipped] = useState(false);

  const proofRows = [
    {
      icon: <ShieldCheckIcon size={18} color="var(--em700)" />,
      iconBg:"var(--em50)",
      name:"SOC 2 Type II + ISO 27001 certified",
      desc:"Independently audited. Your security team won't need to ask twice.",
      badge:{ label:"Verified", bg:"var(--em50)", color:"var(--em700)" },
    },
    {
      icon: <ActivityIcon size={18} color="var(--p700)" />,
      iconBg:"var(--p50)",
      name:"99.97% uptime SLA",
      desc:"Contractually guaranteed. Not a marketing claim.",
      badge:{ label:"SLA-bound", bg:"var(--am50)", color:"var(--am600)" },
    },
    {
      icon: <LayersIcon size={18} color="var(--p600)" />,
      iconBg:"var(--p50)",
      name:"Multi-plant · Multi-BU · Multi-currency",
      desc:"Complex org structures out of the box — no custom dev required.",
      badge: null,
    },
    {
      icon: <ZapIcon size={18} color="var(--g700)" />,
      iconBg:"var(--g50)",
      name:"SAP · Oracle · Dynamics — native",
      desc:"Direct connectors. No middleware. No data sync headaches.",
      badge: null,
    },
    {
      icon: <UsersIcon size={18} color="var(--em600)" />,
      iconBg:"var(--em50)",
      name:"Customer success driven implementation",
      desc:"A dedicated CS team runs your rollout — not a ticket queue.",
      badge: null,
    },
  ];

  return (
    <section style={{ background:"var(--slp)", padding: isMobile ? "64px 20px" : "clamp(64px,9vh,104px) 5vw", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(rgba(57,16,133,.07) 1px,transparent 1px)", backgroundSize:"28px 28px", pointerEvents:"none" }} />

      <div style={{ maxWidth:1080, margin:"0 auto", position:"relative", zIndex:1 }}>

        {/* Header */}
        <div style={{ marginBottom: isMobile ? 36 : 52 }}>
          <Eyebrow>The Nimble Advantage</Eyebrow>
          <h2 className="sec-h2">
            Most implementations drag on for <span style={{ color:"var(--p500)" }}>years.</span>
            <br />
            Ours doesn't.
          </h2>
          <p className="sec-sub">
            Real numbers from real enterprises — running on NimbleS2P today.
          </p>
        </div>

        {/* Two-column grid */}
        <div className="reveal" ref={ref} style={{
          display:"grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap:20,
          alignItems:"stretch",
        }}>

          {/* LEFT — Flip Card */}
          <div
            onClick={() => setFlipped(f => !f)}
            style={{
              borderRadius:16, overflow:"hidden", cursor:"pointer",
              minHeight: isMobile ? 300 : 360,
              position:"relative",
            }}
          >
            {/* FRONT */}
            <div style={{
              position:"absolute", inset:0,
              background:"#717C89",
              padding:"36px 30px",
              display:"flex", flexDirection:"column",
              opacity: flipped ? 0 : 1,
              transform: flipped ? "translateY(-16px)" : "translateY(0)",
              transition:"opacity 0.45s ease, transform 0.45s ease",
              zIndex: flipped ? 1 : 2,
              overflow:"hidden",
            }}>
              <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(rgba(255,255,255,.1) 1px,transparent 1px)", backgroundSize:"18px 18px", pointerEvents:"none" }} />
              <div style={{ position:"absolute", bottom:"-20%", right:"-20%", width:"70%", height:"70%", borderRadius:"50%", background:"rgba(255,255,255,.1)", pointerEvents:"none" }} />
              <div style={{ position:"relative", zIndex:1, display:"flex", flexDirection:"column", flex:1, height:"100%" }}>
              <Eyebrow dark>The industry reality</Eyebrow>
              <div style={{ display:"flex", alignItems:"flex-end", gap:8 }}>
                <span style={{ fontFamily:"var(--fb)", fontSize:60, fontWeight:900, color:"var(--sw)", lineHeight:1 }}>9–14</span>
                <span style={{ fontFamily:"var(--fb)", fontSize:26, color:"var(--sw)", opacity:0.55, paddingBottom:6 }}>mo</span>
              </div>
              <p style={{ marginTop:14, fontSize:14, color:"rgba(255,255,255,0.6)", lineHeight:1.65, fontStyle:"italic", fontFamily:"var(--fb)" }}>
                "The average enterprise procurement implementation takes 9 to 14 months before a single supplier goes live."
              </p>
              <div style={{ marginTop:"auto", paddingTop:28, display:"flex", alignItems:"center", gap:8 }}>
                <span className="pulse-anim" style={{ width:6, height:6, borderRadius:"50%", background:"rgba(255,255,255,0.4)", flexShrink:0, display:"inline-block" }} />
                <span style={{ fontSize:11, color:"rgba(255,255,255,0.35)", fontFamily:"var(--fb)" }}>Click to see the NimbleS2P difference</span>
              </div>
              </div>
            </div>

            {/* BACK */}
            <div style={{
              position:"absolute", inset:0,
              background:"#391085",
              padding:"36px 30px",
              display:"flex", flexDirection:"column",
              opacity: flipped ? 1 : 0,
              transform: flipped ? "translateY(0)" : "translateY(16px)",
              transition:"opacity 0.45s ease, transform 0.45s ease",
              zIndex: flipped ? 2 : 1,
              overflow:"hidden",
            }}>
              <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(rgba(255,255,255,.1) 1px,transparent 1px)", backgroundSize:"18px 18px", pointerEvents:"none" }} />
              <div style={{ position:"absolute", bottom:"-20%", right:"-20%", width:"70%", height:"70%", borderRadius:"50%", background:"rgba(255,255,255,.1)", pointerEvents:"none" }} />
              <div style={{ position:"relative", zIndex:1, display:"flex", flexDirection:"column", flex:1, height:"100%" }}>
              <div style={{
                display:"inline-flex", alignItems:"center", gap:6,
                fontSize:11, fontWeight:700, letterSpacing:"0.12em", color:"rgba(255,255,255,0.45)",
                marginBottom:22, width:"fit-content", fontFamily:"var(--fb)",
              }}>
                <span style={{ width:16, height:2, background:"linear-gradient(90deg,var(--p500),var(--g400))", borderRadius:1, display:"inline-block", flexShrink:0 }} />
                <span style={{ letterSpacing:"0.04em" }}>NimbleS2P</span>
              </div>
              <div style={{ display:"flex", alignItems:"flex-end", gap:4 }}>
                <span style={{ fontFamily:"var(--fb)", fontSize:68, fontWeight:900, color:"var(--sw)", lineHeight:1 }}>90</span>
                <span style={{ fontFamily:"var(--fb)", fontSize:34, color:"var(--sw)", opacity:0.65, paddingBottom:8 }}>%</span>
              </div>
              <p style={{ marginTop:10, fontSize:14, color:"rgba(255,255,255,0.8)", lineHeight:1.55, fontFamily:"var(--fb)" }}>
                Supplier adoption in just 60 days. Not 9 months. Not a year. 60 days.
              </p>
              <div style={{ marginTop:"auto", paddingTop:28, display:"flex", alignItems:"center", gap:8 }}>
                <span className="pulse-anim" style={{ width:6, height:6, borderRadius:"50%", background:"rgba(255,255,255,0.4)", flexShrink:0, display:"inline-block" }} />
                <span style={{ fontSize:11, color:"rgba(255,255,255,0.35)", fontFamily:"var(--fb)" }}>Click to flip back</span>
              </div>
              </div>
            </div>
          </div>

          {/* RIGHT — Enterprise Proof Panel */}
          <div style={{
            background:"var(--sw)",
            borderRadius:16,
            border:"1px solid var(--bd-p)",
            boxShadow:"var(--sh-md)",
            padding:"32px 28px",
            display:"flex", flexDirection:"column",
          }}>
            <div style={{ marginBottom:28 }}>
              <div style={{ fontSize:15, fontWeight:700, color:"var(--t1)", fontFamily:"var(--fb)", marginBottom:4 }}>
                Built for enterprise. Proven at scale.
              </div>
              <div style={{ fontSize:12, color:"var(--t3)", lineHeight:1.5, fontFamily:"var(--fb)" }}>
                The things procurement committees actually ask about — answered.
              </div>
            </div>

            {proofRows.map((row, i) => (
              <div key={i} style={{
                display:"flex", alignItems:"flex-start", gap:14,
                padding:"16px 0",
                borderTop:"1px solid var(--bd)",
              }}>
                <div style={{
                  width:36, height:36, borderRadius:10,
                  background:row.iconBg,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  flexShrink:0,
                }}>
                  {row.icon}
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:13, fontWeight:600, color:"var(--t1)", marginBottom:2, lineHeight:1.3, fontFamily:"var(--fb)" }}>{row.name}</div>
                  <div style={{ fontSize:12, color:"var(--t3)", lineHeight:1.5, fontFamily:"var(--fb)" }}>{row.desc}</div>
                </div>
                {row.badge && (
                  <div style={{
                    marginLeft:"auto", alignSelf:"center",
                    fontSize:10, fontWeight:700,
                    padding:"3px 8px", borderRadius:100,
                    letterSpacing:"0.04em",
                    background:row.badge.bg, color:row.badge.color,
                    fontFamily:"var(--fb)", whiteSpace:"nowrap",
                  }}>
                    {row.badge.label}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════
   5. CTA
════════════════════════════════════ */
function WhyCTA() {
  const w = useWidth(); const isMobile = w < 640;
  const ref = useReveal();
  return (
    <section style={{
      background:"linear-gradient(160deg,#0f0c29 0%,#1a1260 40%,#261d6b 70%,#1e1050 100%)",
      position:"relative", overflow:"hidden",
      padding: isMobile ? "72px 20px 88px" : "clamp(80px,10vh,120px) 5vw",
    }}>
      <div style={{ position:"absolute", bottom:"-15%", right:"-5%", width:"55%", height:"85%", background:"radial-gradient(ellipse at 80% 80%,rgba(245,166,35,.16) 0%,transparent 60%)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", top:"-15%", left:"-5%", width:"55%", height:"80%", background:"radial-gradient(ellipse at 20% 20%,rgba(99,32,224,.28) 0%,transparent 60%)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(rgba(255,255,255,.05) 1px,transparent 1px)", backgroundSize:"26px 26px", pointerEvents:"none" }} />

      <div style={{ maxWidth:720, margin:"0 auto", textAlign:"center", position:"relative", zIndex:2 }}>
        <div className="reveal" ref={ref}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:7, background:"rgba(245,166,35,.12)", border:"1px solid rgba(245,166,35,.28)", borderRadius:100, padding:"5px 16px", marginBottom: isMobile ? 16 : "clamp(14px,2vh,24px)" }}>
            <span style={{ width:6, height:6, borderRadius:"50%", background:"#F5A623", display:"inline-block", animation:"pulse-dot 2s infinite" }} />
            <span style={{ fontSize:11, fontWeight:700, color:"#F5D060", fontFamily:"var(--fb)", letterSpacing:".05em", textTransform:"uppercase" }}>Ready to see it live?</span>
          </div>

          <h2 style={{ fontFamily:"var(--fb)", fontWeight:900, fontSize: isMobile ? "clamp(26px,7vw,38px)" : "clamp(32px,3.8vw,52px)", lineHeight:1.05, letterSpacing:"-.04em", color:"#fff", marginBottom:20 }}>
            See NimbleS2P in action<br />
            <em style={{ fontStyle:"normal", fontWeight:900, background:"linear-gradient(95deg,#fff 0%,#fff 30%,#F5D060 62%,#F5A623 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>in 30 minutes.</em>
          </h2>

          <p style={{ fontSize: isMobile ? 15 : 17, color:"rgba(255,255,255,.48)", lineHeight:1.75, fontFamily:"var(--fb)", marginBottom:40, maxWidth:520, margin:"0 auto 40px" }}>
            No long sales cycles. No generic demos. A focused session built around your specific procurement challenges — with answers on the day.
          </p>

          <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>

            <a href="#" style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", gap:7, background:"rgba(255,255,255,.07)", color:"rgba(255,255,255,.8)", border:"1.5px solid rgba(255,255,255,.22)", borderRadius:10, padding:"13px 32px", fontSize:16, fontWeight:500, textDecoration:"none", fontFamily:"var(--fb)", backdropFilter:"blur(10px)", transition:"all .18s" }}
              onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,.14)";e.currentTarget.style.color="#fff";}}
              onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,.07)";e.currentTarget.style.color="rgba(255,255,255,.8)";}}
            >Browse Products →</a>
          </div>

          {/* Social proof */}
          <div style={{ marginTop:40, display:"flex", alignItems:"center", justifyContent:"center", gap:12, flexWrap:"wrap" }}>
            <div style={{ display:"flex" }}>
              {[{bg:"#C0392B",i:"RP"},{bg:"#16A085",i:"SK"},{bg:"#8E44AD",i:"AN"},{bg:"#2980B9",i:"LP"},{bg:"#E67E22",i:"DW"}].map((a,idx)=>(
                <div key={a.i} style={{ width:30, height:30, borderRadius:"50%", background:a.bg, border:"2px solid rgba(16,9,48,.85)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"var(--fb)", fontSize:8, fontWeight:700, color:"#fff", marginLeft: idx>0 ? -8 : 0, position:"relative", zIndex:5-idx }}>{a.i}</div>
              ))}
            </div>
            <span style={{ fontSize:13, color:"rgba(255,255,255,.4)", fontFamily:"var(--fb)" }}>
              Trusted across <strong style={{ color:"rgba(255,255,255,.75)", fontWeight:600 }}>9+ strategic industry verticals</strong> around the world
            </span>
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
export default function WhyNimblePage({ onBack, onNavigate }) {
  useEffect(()=>{ window.scrollTo(0,0); },[]);
  return (
    <>
      <Nav onNavigate={onNavigate} onBack={onBack} pageName="Why NimbleS2P" />
      <main>
        <WhyHero onNavigate={onNavigate} />
        <WhyStory />
        <WhyBeforeAfter />
        <WhyNumbers />
        <WhyCTA />
      </main>
      <VDDFooter onNavigate={onNavigate} />
    </>
  );
}
