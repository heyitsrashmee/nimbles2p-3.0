"use client";

import { useWidth, useTypewriter } from "@/components/shared/pageUi";
import { NimbleLogo } from "./logos";
import { FOOTER_COLUMNS, footerHref, isFooterPlaceholder, pageToPath } from "@/lib/routes";
import { goLegalPage, handleFooterLinkClick, legalLabelToPage } from "./footerUtils";

export function VDDFooter({ onNavigate }) {
  const w = useWidth(); const isMobile = w < 640;
  const twWord = useTypewriter(["Security","Diligence","Results","Compliance","Scale"]);
  const cols = FOOTER_COLUMNS;
  const socials = [
    { label:"in", title:"LinkedIn", href:"https://www.linkedin.com/company/techpanion/", external:true },
  ];

  /* Constellation dots — 5 fixed positions, pale violet */
  const dots = [
    { left:"12%",  top:"18%", size:1.5, op:.65 },
    { left:"67%",  top:"12%", size:1,   op:.55 },
    { left:"83%",  top:"58%", size:1.5, op:.50 },
    { left:"34%",  top:"72%", size:1,   op:.60 },
    { left:"55%",  top:"40%", size:1,   op:.45 },
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

      {/* ── Content ── */}
      <div style={{ maxWidth:1080, margin:"0 auto", position:"relative", zIndex:10, padding: isMobile ? "47px 20px 0" : "62px 5vw 0" }}>
        <div className="ft-grid" style={{ paddingBottom: isMobile ? 31 : 42 }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:20 }}><NimbleLogo height={20} /></div>
            <div style={{ marginBottom:14 }}>
              <p style={{ fontFamily:"var(--fb)", fontSize: isMobile ? 18 : 20, fontWeight:800, color:"#fff", lineHeight:1.25, letterSpacing:"-.02em" }}>
                Built with Intent.<br />Built for{" "}
                <span style={{ background:"linear-gradient(95deg,#8B7FF5,#A78BFA)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>{twWord}</span>
                <span className="tw-cursor" />
              </p>
            </div>
            <p style={{ fontSize:13, color:"rgba(255,255,255,.35)", lineHeight:1.7, fontFamily:"var(--fb)", maxWidth:260, marginBottom: isMobile ? 16 : "clamp(14px,2vh,24px)" }}>AI-orchestrated source-to-pay — purpose-built for the Indian enterprise.</p>
            <div style={{ display:"flex", gap:8 }}>
              {socials.map(s=>(
                <a
                  key={s.title}
                  href={s.href}
                  title={s.title}
                  {...(s.external ? { target:"_blank", rel:"noopener noreferrer" } : {})}
                  style={{ width:36, height:36, borderRadius:8, background:"rgba(255,255,255,.06)", border:"1px solid rgba(255,255,255,.12)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, color:"rgba(255,255,255,.45)", textDecoration:"none", transition:"background .18s,color .18s,border-color .18s", fontFamily:"var(--fb)", fontWeight:500 }}
                  onMouseEnter={e=>{ e.currentTarget.style.background="rgba(255,255,255,.12)"; e.currentTarget.style.color="#fff"; e.currentTarget.style.borderColor="rgba(255,255,255,.25)"; }}
                  onMouseLeave={e=>{ e.currentTarget.style.background="rgba(255,255,255,.06)"; e.currentTarget.style.color="rgba(255,255,255,.45)"; e.currentTarget.style.borderColor="rgba(255,255,255,.12)"; }}
                >{s.label}</a>
              ))}
            </div>
          </div>
          {cols.map(([title,links])=>(
            <div key={title}>
              <div style={{ fontSize:10, fontWeight:700, letterSpacing:".15em", textTransform:"uppercase", color:"rgba(255,255,255,.22)", marginBottom:18, fontFamily:"var(--fb)" }}>{title}</div>
              <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                {links.map(l=>{
                  const placeholder = isFooterPlaceholder(l);
                  const href = footerHref(l) ?? "#";
                  return (
                  <a key={l} href={href} title={placeholder ? "Coming soon" : undefined}
                    style={{
                      fontSize:14, color: placeholder ? "rgba(255,255,255,.28)" : "rgba(255,255,255,.5)",
                      textDecoration:"none", fontFamily:"var(--fb)", fontWeight:400,
                      transition:"color .15s", cursor: placeholder ? "default" : "pointer",
                    }}
                    onClick={e=>handleFooterLinkClick(e, l, onNavigate)}
                    onMouseEnter={e=>{ if(!placeholder) e.target.style.color="rgba(255,255,255,.9)"; }}
                    onMouseLeave={e=>{ if(!placeholder) e.target.style.color="rgba(255,255,255,.5)"; }}
                  >{l}</a>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:10, borderTop:"1px solid rgba(255,255,255,.07)", padding: isMobile ? "21px 0 31px" : "26px 0 36px" }}>
          <div style={{ fontSize:12, color:"rgba(255,255,255,.22)", fontFamily:"var(--fb)" }}>© 2026 NimbleS2P. All rights reserved.</div>
          <div style={{ display:"flex", gap:20, flexWrap:"wrap" }}>
            {["Privacy Policy","Terms of Use","Cookie Policy"].map(l=>(
              <a key={l} href={pageToPath(legalLabelToPage(l))} style={{ fontSize:12, color:"rgba(255,255,255,.28)", textDecoration:"none", fontFamily:"var(--fb)", transition:"color .15s" }}
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
