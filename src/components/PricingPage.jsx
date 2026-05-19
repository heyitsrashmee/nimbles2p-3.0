"use client";

import { useState, useEffect } from "react";
import { useWidth, useReveal, Eyebrow } from "@/components/shared/pageUi";
import { Nav } from "@/components/layout/SiteNav";
import { VDDFooter } from "@/components/layout/VDDFooter";

/* ═══════════════════════════════════════════════════════════
   PRICING PAGE
═══════════════════════════════════════════════════════════ */

const PRICING_MODULES = [
  {
    id:"vdd",
    label:"VDD & Onboarding",
    icon:"🔍",
    tagline:"Automate supplier onboarding, KYC, and compliance.",
    features:[
      "Create Supplier Invite","Supplier Logins (Supplier Portal)","Realtime Verifications",
      "Domestic & International Forms","Onboarding Toll Gate","Approval Workflow",
      "Recommendations","Clarification & Query","Document Storage",
      "AI Document Validation","Audit Trail","ERP Integration (SDK)",
      "Periodic Compliance","Supplier Modification & Extension","Active Reporting",
      "Reminders & Notifications","Nimble ID","FDD & Legal","Enterprise Users",
    ],
  },
  {
    id:"rfq",
    label:"RFx Automation",
    icon:"☰",
    tagline:"Structured sourcing with AI-augmented evaluation.",
    features:[
      "Create RFQ","AI Technical Spec Creator","AI Commercial Spec Creator",
      "Excel/PDF/Doc Upload","Workflow Approval","Scoring Setup","PR Flip",
      "ERP Integration (SDK)","Supplier Logins (Supplier Portal)","Help Videos",
      "Follow Up Agent","Tech Evaluation","Price Comparison","Supplier Selection (Recommendation)",
      "SOPs","Negotiation","PR to PO","Active Reporting","e-Auction",
      "Pre Evaluation / RFI","Audit Trail","Notification & Reminders","Broadcast","Query Management",
    ],
  },
  {
    id:"supplier",
    label:"Supplier Portal",
    icon:"👤",
    tagline:"One window for every supplier transaction.",
    features:[
      "Supplier Login Count","Admin Users","Dashboard","Profile Management",
      "ASN","PO Listing","PO Acknowledgement","Upload Doc (Invoice, Credit Note, etc)",
      "Query Management","Declaration Management","Consent Management",
      "Broadcast","Supplier Inbox","ERP Integration (SDK)","Active Reporting",
      "Payment Tracking","Audit Trail","Notification & Reminders",
    ],
  },
  {
    id:"invoice",
    label:"Invoice Processing",
    icon:"🗒",
    tagline:"Touchless invoice processing, end to end.",
    features:[
      "Admin Login (GCC Portal)","Dashboard","Submit Invoice (On Behalf)",
      "Email Monitor","AI Doc Operation (OCR & Classification)","Validation (QR & Header)",
      "AI Line Item Extraction","2 / 3 Way Matching Agent","Workflow Automation",
      "Business Roles Library","ERP Integration (SDK)","Notification & Reminders",
      "Active Reporting","Audit Trail","GCC Control Center","User Management",
      "Agentic Master Management",
    ],
  },
  {
    id:"finance",
    label:"Early Financing",
    icon:"💰",
    tagline:"Supply chain financing and early payment options.",
    features:[
      "Create Campaign","Choose Lenders / Lending Mode","Approval Workflow",
      "Integration with Lending Network","Track Status","Multi Program",
      "Query Management","AI Recommendations","Reminders & Notifications",
      "Audit Trail","Active Reporting",
    ],
  },
  {
    id:"analytics",
    label:"Supplier Analytics",
    icon:"📊",
    tagline:"Actionable procurement insights and spend visibility.",
    features:[
      "Spend Dashboard","Category-wise Analytics","Supplier Performance Scorecard",
      "PO vs Invoice Variance","Cycle Time Analysis","Compliance Health Index",
      "Savings Tracker","Exception Reports","Custom Report Builder",
      "ERP Data Sync","Audit Trail","Active Reporting",
    ],
    placeholder:true,
  },
];

/* Check mark SVG */
function CheckIcon({ color }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink:0, marginTop:2 }}>
      <circle cx="8" cy="8" r="8" fill={color + "18"} />
      <path d="M4.5 8l2.5 2.5 4.5-4" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

const MODULE_COLOURS = {
  vdd:"#231a67", rfq:"#717C89", supplier:"#6DB657",
  invoice:"#1a1a2e", finance:"#E06B72", analytics:"#48A9A6",
};

/* ════════════════════════════════════
   PRICING HERO
════════════════════════════════════ */
function PricingHero() {
  const w = useWidth(); const isMobile = w < 640;
  return (
    <section style={{
      background:"linear-gradient(140deg,#14104A 0%,#1E1660 40%,#261d6b 70%,#1a1258 100%)",
      position:"relative", overflow:"hidden",
      padding: isMobile ? "110px 20px 64px" : "128px 5vw 80px",
      textAlign:"center",
    }}>
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", background:"radial-gradient(ellipse 90% 70% at 50% 35%, rgba(99,32,224,.32) 0%, transparent 65%)" }} />
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", backgroundImage:"radial-gradient(rgba(255,255,255,.045) 1px,transparent 1px)", backgroundSize:"30px 30px" }} />

      <div style={{ position:"relative", zIndex:2, maxWidth:700 , margin:"0 auto" }}>
        

        <h1 className="fade-up d1" style={{ fontFamily:"var(--fb)", fontWeight:900, fontSize: isMobile ? "clamp(28px,8vw,42px)" : "clamp(38px,4.5vw,58px)", lineHeight:1.0, letterSpacing:"-.04em", marginBottom:18, background:"linear-gradient(160deg,#fff 0%,#fff 40%,#E2D9FE 60%,#F5C842 85%,#F5A623 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
          Transparent Pricing.<br />Tailored for Enterprise.
        </h1>

        <p className="fade-up d2" style={{ fontSize: isMobile ? 15 : 17, color:"rgba(255,255,255,.52)", lineHeight:1.75, fontFamily:"var(--fb)", maxWidth:520, margin:"0 auto 32px" }}>
          Every module priced for your scale. No surprises, no hidden fees — just a plan built around how your enterprise actually works.
        </p>

        {/* Trust badges */}
        <div className="fade-up d3" style={{ display:"flex", justifyContent:"center", gap:8, flexWrap:"wrap" }}>
          {[{label:"Hypercare Onboarding",dot:"#34D399"},{label:"High-touch Customer Success",dot:"#A78BFA"},{label:"Dedicated Enterprise Support",dot:"#F5A623"}].map(p=>(
            <div key={p.label} style={{ display:"inline-flex", alignItems:"center", gap:5, background:"rgba(255,255,255,.07)", border:"1px solid rgba(255,255,255,.14)", borderRadius:100, padding:"5px 14px", fontSize:12, fontWeight:500, color:"rgba(255,255,255,.75)", fontFamily:"var(--fb)" }}>
              <span style={{ width:5, height:5, borderRadius:"50%", background:p.dot, display:"inline-block" }} />
              {p.label}
            </div>
          ))}
        </div>
      </div>

      <div style={{ position:"absolute", bottom:0, left:0, right:0, height:48, overflow:"hidden", pointerEvents:"none" }}>
        <svg viewBox="0 0 1440 48" preserveAspectRatio="none" style={{ position:"absolute", bottom:0, left:0, width:"200%", height:"100%", animation:"waveSlide 10s linear infinite" }}>
          <path d="M0,24 C240,6 480,40 720,24 C960,8 1200,40 1440,24 L1440,48 L0,48 Z" fill="rgba(255,255,255,.05)" />
        </svg>
      </div>
    </section>
  );
}

/* ════════════════════════════════════
   PRICING TABS
════════════════════════════════════ */
function PricingTabs() {
  const w = useWidth(); const isMobile = w < 640; const isTablet = w < 960;
  const [active, setActive] = useState("vdd");
  const mod = PRICING_MODULES.find(m=>m.id===active) || PRICING_MODULES[0];
  const colour = MODULE_COLOURS[active] || MODULE_COLOURS[PRICING_MODULES[0].id];
  const ref = useReveal();
  const tx = "#fff";
  const txMuted = "rgba(255,255,255,.72)";
  const txDim = "rgba(255,255,255,.55)";
  const dotGrid = "rgba(255,255,255,.1)";
  const glow = "rgba(255,255,255,.1)";
  const placeholder = "rgba(255,255,255,.15)";
  const placeholderBdr = "rgba(255,255,255,.25)";
  const placeholderTx = "rgba(255,255,255,.85)";

  return (
    <section style={{ background:"var(--slp)", padding: isMobile ? "48px 20px 72px" : "clamp(52px,7vh,80px) 5vw clamp(64px,9vh,100px)" }}>
      <div style={{ maxWidth:1080, margin:"0 auto" }}>

        {/* ── MODULE TAB BAR — single line segmented control ── */}
        <div style={{
          background:"#fff",
          borderRadius:16,
          border:"1px solid #E2E8F0",
          padding:"6px",
          display:"grid",
          gridTemplateColumns:`repeat(${PRICING_MODULES.length},1fr)`,
          gap:4,
          marginBottom: isMobile ? 28 : 40,
          boxShadow:"0 2px 12px rgba(0,0,0,.06)",
          overflowX:"auto",
          WebkitOverflowScrolling:"touch",
          scrollbarWidth:"none",
          minWidth:0,
        }}>
          {PRICING_MODULES.map(m=>{
            const isAct = active===m.id;
            const c = MODULE_COLOURS[m.id];
            return (
              <button key={m.id} onClick={()=>setActive(m.id)} style={{
                display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
                gap:5,
                fontFamily:"var(--fb)",
                fontWeight: isAct ? 700 : 400,
                color: isAct ? "#fff" : "#64748B",
                background: isAct ? c : "transparent",
                border:"none",
                borderRadius:11,
                padding: isMobile ? "8px 6px" : "10px 8px",
                cursor:"pointer",
                transition:"all .22s cubic-bezier(.22,1,.36,1)",
                boxShadow: isAct ? `0 3px 14px ${c}44` : "none",
                whiteSpace:"nowrap",
                minWidth:0,
              }}>
                <span style={{ fontSize: isMobile ? 18 : 20 }}>{m.icon}</span>
                <span style={{ fontSize: isMobile ? 10 : 11.5, lineHeight:1.2, textAlign:"center" }}>
                  {m.label}
                  {m.placeholder && (
                    <span style={{ display:"block", fontSize:8, fontWeight:700, opacity:.7, letterSpacing:".04em" }}>BETA</span>
                  )}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── MAIN PRICING CARD — fixed height, no jump ── */}
          <div className="reveal" ref={ref} style={{
          borderRadius:24,
          border:`1.5px solid ${colour}22`,
          boxShadow:`0 8px 48px ${colour}10, 0 2px 8px rgba(0,0,0,.05)`,
          overflow:"hidden",
          display:"grid",
          gridTemplateColumns: isTablet ? "1fr" : "280px 1fr",
          height: isMobile ? "auto" : 560,
          transition:"border-color .25s, box-shadow .25s",
        }}>

          {/* ── LEFT SIDEBAR — fixed, never resizes ── */}
          <div style={{
            background:`linear-gradient(160deg,${colour} 0%,${colour}dd 100%)`,
            padding: isMobile ? "28px 24px" : "40px 32px",
            display:"flex", flexDirection:"column", justifyContent:"space-between",
            position:"relative", overflow:"hidden",
            transition:"background .3s",
          }}>
            <div style={{ position:"absolute", inset:0, backgroundImage:`radial-gradient(${dotGrid} 1px,transparent 1px)`, backgroundSize:"18px 18px", pointerEvents:"none" }} />
            <div style={{ position:"absolute", bottom:"-20%", right:"-20%", width:"70%", height:"70%", borderRadius:"50%", background:glow, pointerEvents:"none" }} />

            <div style={{ position:"relative", zIndex:1 }}>
              <div style={{ width:52, height:52, borderRadius:15, background:"rgba(255,255,255,.2)", border:"1px solid rgba(255,255,255,.3)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, marginBottom:18 }}>{mod.icon}</div>
              <div style={{ fontFamily:"var(--fb)", fontSize: isMobile ? 20 : 24, fontWeight:900, color:tx, letterSpacing:"-.03em", lineHeight:1.1, marginBottom:8 }}>{mod.label}</div>
              {mod.placeholder && (
                <div style={{ display:"inline-flex", alignItems:"center", gap:5, background:placeholder, border:`1px solid ${placeholderBdr}`, borderRadius:100, padding:"3px 10px", marginBottom:8 }}>
                  <span style={{ fontSize:9.5, fontWeight:700, color:placeholderTx, letterSpacing:".06em", fontFamily:"var(--fb)" }}>PLACEHOLDER</span>
                </div>
              )}
              <p style={{ fontSize:13, fontWeight:700, color:txMuted, fontFamily:"var(--fb)", lineHeight:1.65, margin:0 }}>{mod.tagline}</p>
            </div>

            <div style={{ position:"relative", zIndex:1 }}>
              {/* CTA */}
              <a href="#" style={{
                display:"flex", alignItems:"center", justifyContent:"center", gap:7,
                background:"#fff", color:colour,
                borderRadius:10, padding:"12px 20px",
                fontSize:14.5, fontWeight:800, textDecoration:"none",
                fontFamily:"var(--fb)", letterSpacing:"-.01em",
                boxShadow:"0 4px 16px rgba(0,0,0,.15)",
                transition:"all .2s",
              }}
                onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 8px 28px rgba(0,0,0,.2)"; }}
                onMouseLeave={e=>{ e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow="0 4px 16px rgba(0,0,0,.15)"; }}
              >Get Pricing →</a>
            </div>
          </div>

          {/* ── RIGHT — scrollable feature list, always same height ── */}
          <div style={{ display:"flex", flexDirection:"column", overflow:"hidden" }}>

            {/* Sticky inner header */}
            <div style={{ padding: isMobile ? "20px 24px 14px" : "24px 36px 16px", borderBottom:`1px solid ${colour}14`, display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0 }}>
              <span style={{ fontFamily:"var(--fb)", fontSize:15, fontWeight:700, color:"#0F172A", letterSpacing:"-.01em" }}>What's included</span>
              <div style={{ display:"inline-flex", alignItems:"center", gap:5, background:`${colour}0e`, border:`1px solid ${colour}22`, borderRadius:100, padding:"4px 12px" }}>
                <span style={{ width:5, height:5, borderRadius:"50%", background:colour, display:"inline-block" }} />
                <span style={{ fontSize:11, fontWeight:700, color:colour, fontFamily:"var(--fb)" }}>All-inclusive</span>
              </div>
            </div>

            {/* Scrollable feature area — fixed height, overflow scroll */}
            <div style={{
              flex:1,
              overflowY:"auto",
              padding: isMobile ? "16px 24px" : "20px 36px",
              scrollbarWidth:"thin",
              scrollbarColor:`${colour}33 transparent`,
              background:"#fff",
            }}>
              <style>{`
                .pricing-scroll::-webkit-scrollbar { width: 4px; }
                .pricing-scroll::-webkit-scrollbar-track { background: transparent; }
                .pricing-scroll::-webkit-scrollbar-thumb { background: ${colour}44; border-radius: 2px; }
              `}</style>
              <div className="pricing-scroll" style={{
                display:"grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: isMobile ? 6 : 8,
                alignContent:"start",
              }}>
                {mod.features.map((feat, i) => (
                  <div key={feat} style={{
                    display:"flex", alignItems:"center", gap:9,
                    padding:"9px 12px",
                    borderRadius:9,
                    background: `${colour}0a`,
                    border:`1px solid ${colour}20`,
                    transition:"all .16s",
                  }}
                    onMouseEnter={e=>{ e.currentTarget.style.background=`${colour}12`; e.currentTarget.style.borderColor=`${colour}2a`; e.currentTarget.style.transform="translateX(2px)"; }}
                    onMouseLeave={e=>{ e.currentTarget.style.background=`${colour}0a`; e.currentTarget.style.borderColor=`${colour}20`; e.currentTarget.style.transform=""; }}
                  >
                    {/* Check */}
                    <div style={{ width:18, height:18, borderRadius:"50%", background:`${colour}18`, border:`1px solid ${colour}30`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      <svg width="9" height="7" viewBox="0 0 9 7" fill="none"><path d="M1 3.5l2 2L8 1" stroke={colour} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <span style={{ fontFamily:"var(--fb)", fontSize: isMobile ? 12.5 : 13.5, color:"#334155", lineHeight:1.3, fontWeight:500 }}>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Fixed bottom strip */}
            <div style={{ padding: isMobile ? "12px 24px" : "14px 36px", borderTop:`1px solid ${colour}14`, background:"#FAFBFF", display:"flex", alignItems:"center", gap:8, flexShrink:0 }}>
              <span style={{ fontSize:11, color:"#94A3B8", fontFamily:"var(--fb)" }}>💡</span>
              <span style={{ fontSize:12, color:"#94A3B8", fontFamily:"var(--fb)", lineHeight:1.4 }}>Pricing scales with supplier count, invoice volume &amp; business units.</span>
            </div>

          </div>
        </div>

        <div style={{ textAlign:"center", marginTop:20 }}>
          <p style={{ fontSize:13, color:"#94A3B8", fontFamily:"var(--fb)", lineHeight:1.7, margin:0 }}>
            Every plan is built for global operations, cross-functional collaboration, and scalable process automation.
          </p>
        </div>

      </div>
    </section>
  );
}

/* ════════════════════════════════════
   PRICING ENTERPRISE NOTE
════════════════════════════════════ */
function PricingEnterpriseNote() {
  const w = useWidth(); const isMobile = w < 640; const isTablet = w < 900;
  const ref = useReveal();

  const items = [
    { icon:"🏗️", title:"Custom implementation", desc:"Tailored onboarding with dedicated project management and ERP configuration." },
    { icon:"📞", title:"Dedicated success team", desc:"A named account team available throughout your contract, not just at renewal." },
    { icon:"🔐", title:"Enterprise security", desc:"SOC 2 Type II, ISO 27001. SSO and full audit trails included." },
    { icon:"📈", title:"Outcome-driven collaboration", desc:"Focused on transformation success, stakeholder adoption, and measurable operational improvements." },
  ];

  return (
    <section style={{ background:"linear-gradient(160deg,#0F0C2A 0%,#1a1260 45%,#221868 100%)", position:"relative", overflow:"hidden", padding: isMobile ? "64px 20px" : "clamp(64px,9vh,104px) 5vw" }}>
      <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(rgba(255,255,255,.04) 1px,transparent 1px)", backgroundSize:"26px 26px", pointerEvents:"none" }} />
      <div style={{ position:"absolute", top:0, right:"15%", width:"40%", height:"65%", background:"radial-gradient(ellipse,rgba(99,32,224,.2) 0%,transparent 65%)", pointerEvents:"none" }} />

      <div style={{ maxWidth:1080, margin:"0 auto", position:"relative", zIndex:1 }}>
        <div className="reveal" ref={ref}>
          <div style={{ display:"grid", gridTemplateColumns: isTablet ? "1fr" : "1fr 1.5fr", gap: isTablet ? 36 : 64, alignItems:"center" }}>

            {/* Left */}
            <div>
              <Eyebrow dark>Enterprise Plans</Eyebrow>
              <h2 style={{ fontFamily:"var(--fb)", fontSize: isMobile ? "clamp(24px,6vw,32px)" : "clamp(26px,3vw,40px)", letterSpacing:"-.04em", lineHeight:1.08, background:"linear-gradient(95deg,#fff 0%,#fff 30%,#F5D060 62%,#F5A623 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", fontWeight:900, marginBottom:16 }}>
                Every plan built<br />around your enterprise.
              </h2>
              <p style={{ fontSize:15, color:"rgba(255,255,255,.45)", lineHeight:1.75, fontFamily:"var(--fb)", marginBottom:28 }}>
                A pricing model that respects the complexity of enterprise procurement.
              </p>
              <a href="#" style={{ display:"inline-flex", alignItems:"center", gap:7, background:"linear-gradient(135deg,#E8920A,#F5B020)", color:"#fff", borderRadius:10, padding:"13px 32px", fontSize:15.5, fontWeight:700, textDecoration:"none", fontFamily:"var(--fb)", boxShadow:"0 6px 28px rgba(232,150,10,.5)", transition:"transform .2s,box-shadow .2s" }}
                onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 12px 40px rgba(232,150,10,.65)"; }}
                onMouseLeave={e=>{ e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow="0 6px 28px rgba(232,150,10,.5)"; }}
              >Talk to Sales →</a>
            </div>

            {/* Right — 2×2 feature grid */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
              {items.map(item=>(
                <div key={item.title} style={{ background:"rgba(255,255,255,.05)", border:"1px solid rgba(255,255,255,.09)", borderRadius:16, padding: isMobile ? "18px 16px" : "22px 20px", backdropFilter:"blur(8px)", transition:"all .2s cubic-bezier(.22,1,.36,1)" }}
                  onMouseEnter={e=>{ e.currentTarget.style.background="rgba(255,255,255,.09)"; e.currentTarget.style.borderColor="rgba(255,255,255,.18)"; e.currentTarget.style.transform="translateY(-2px)"; }}
                  onMouseLeave={e=>{ e.currentTarget.style.background="rgba(255,255,255,.05)"; e.currentTarget.style.borderColor="rgba(255,255,255,.09)"; e.currentTarget.style.transform=""; }}
                >
                  <div style={{ fontSize:24, marginBottom:12 }}>{item.icon}</div>
                  <div style={{ fontFamily:"var(--fb)", fontSize:15, fontWeight:700, color:"#fff", letterSpacing:"-.015em", marginBottom:6 }}>{item.title}</div>
                  <div style={{ fontSize:13, color:"rgba(255,255,255,.42)", lineHeight:1.6, fontFamily:"var(--fb)" }}>{item.desc}</div>
                </div>
              ))}
            </div>
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
export default function PricingPage({ onBack, onNavigate }) {
  useEffect(()=>{ window.scrollTo(0,0); },[]);
  return (
    <>
      <Nav onNavigate={onNavigate} onBack={onBack} pageName="Pricing" />
      <main>
        <PricingHero />
        <PricingTabs />
        <PricingEnterpriseNote />
      </main>
      <VDDFooter onNavigate={onNavigate} />
    </>
  );
}
