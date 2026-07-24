"use client";

import { useState, useEffect } from "react";
import { assetUrl } from "@/lib/assetUrl";
import { pageToPath } from "@/lib/routes";
import { getProductGatedDownloadHref } from "@/lib/gatedResourceConfig";
import { MEGA_PRODUCTS } from "./megaMenuData";

export function MegaMenu({ onClose, onNavigate }) {
  const items = MEGA_PRODUCTS.integrated;
  const [hovered, setHovered] = useState(items[0].id);
  const [wpFeatured, setWpFeatured] = useState(null);

  useEffect(() => {
    fetch("/api/mega-menu-resources")
      .then((r) => (r.ok ? r.json() : {}))
      .then((data) => setWpFeatured(data && typeof data === "object" ? data : null))
      .catch(() => setWpFeatured(null));
  }, []);

  const active = items.find((i) => i.id === hovered) || items[0];
  const res = wpFeatured?.[active.id] ?? active.resource;

  // Products with a gated download form (vdd, supplier, finance, analytics) point the
  // card CTA at their /download/<key> form instead of generic Get Started.
  const gatedDownloadHref = getProductGatedDownloadHref(active.id);
  const ctaHref = gatedDownloadHref ?? pageToPath("getstarted");
  const ctaNavTarget = gatedDownloadHref ? `download/${active.id}` : "getstarted";
  const ctaLabel = gatedDownloadHref ? "Download →" : "Get Started →";

  const TAG = {
    "New":      { bg:"#EEF2FF", color:"#4338CA", border:"#C7D2FE", dot:"#818CF8" },
    "Trending": { bg:"#FFFBEB", color:"#92400E", border:"#FDE68A", dot:"#F59E0B" },
    "Beta":     { bg:"#FDF2F8", color:"#9D174D", border:"#FBCFE8", dot:"#EC4899" },
  };

  /* Single product row */
  const Item = ({ item }) => {
    const on = hovered === item.id;
    const t  = item.tag ? TAG[item.tag] : null;
    return (
      <button
        onMouseEnter={()=>setHovered(item.id)}
        onClick={()=>{ onClose(); if(item.id==="vdd" && onNavigate) onNavigate("vdd"); if(item.id==="supplier" && onNavigate) onNavigate("supplier"); if(item.id==="invoice" && onNavigate) onNavigate("invoice"); if(item.id==="rfq" && onNavigate) onNavigate("rfq"); if(item.id==="analytics" && onNavigate) onNavigate("analytics"); if(item.id==="finance" && onNavigate) onNavigate("finance"); }}
        style={{
          display:"flex", alignItems:"center", gap:13,
          width:"100%", textAlign:"left",
          background: on ? "#F8FAFF" : "transparent",
          border:`1.5px solid ${on ? item.color+"30" : "transparent"}`,
          borderRadius:14, padding:"11px 13px",
          cursor:"pointer",
          boxShadow: on ? `0 2px 16px ${item.color}1a, 0 1px 3px rgba(0,0,0,.05)` : "none",
          transition:"all .18s cubic-bezier(.22,1,.36,1)",
        }}
      >
        {/* Icon */}
        <div style={{
          width:40, height:40, borderRadius:11, flexShrink:0,
          display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:18, transition:"all .18s",
          background: on
            ? `linear-gradient(140deg,${item.color},${item.color}99)`
            : `${item.color}12`,
          boxShadow: on ? `0 4px 14px ${item.color}3a` : "none",
        }}>{item.icon}</div>

        {/* Text */}
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:3 }}>
            <span style={{
              fontFamily:"var(--fb)", fontSize:13.5, fontWeight:700,
              letterSpacing:"-.01em",
              color:"#0F172A",
              transition:"color .18s",
            }}>{item.name}</span>
            {t && (
              <span style={{
                display:"inline-flex", alignItems:"center", gap:4,
                fontSize:9, fontWeight:700, letterSpacing:".06em",
                textTransform:"uppercase", padding:"2px 8px", borderRadius:100,
                background:t.bg, color:t.color, border:`1px solid ${t.border}`,
                fontFamily:"var(--fb)", lineHeight:1.7,
              }}>
                <span style={{ width:4, height:4, borderRadius:"50%", background:t.dot, display:"inline-block" }} />
                {item.tag}
              </span>
            )}
          </div>
          <p style={{
            fontFamily:"var(--fb)", fontSize:12, lineHeight:1.55,
            color: on ? "#334155" : "#64748B",
            margin:0, transition:"color .18s",
          }}>{item.desc}</p>
        </div>

        {/* Chevron */}
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
          style={{ flexShrink:0, opacity: on ? 0.5 : 0, transition:"opacity .18s" }}>
          <path d="M5 3l4 4-4 4" stroke={item.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    );
  };

  return (
    <>
      {/* Click-away */}
      <div onClick={onClose} style={{ position:"fixed", inset:0, zIndex:98 }} />

      {/* Panel */}
      <div style={{
        position:"fixed", top:72, left:0, right:0, zIndex:99,
        background:"#fff",
        boxShadow:"0 8px 40px rgba(15,23,42,.1), 0 1px 0 #f1f5f9",
        borderBottom:"1px solid #E2E8F0",
        animation:"fade-up .18s cubic-bezier(.22,1,.36,1) both",
      }}>

        {/* ── Top spectrum bar ── */}
        <div style={{
          height:3,
          background:"linear-gradient(90deg,#6366F1,#8B5CF6 20%,#A855F7 38%,#EC4899 55%,#F97316 72%,#EAB308 85%,#22C55E)",
        }} />

        {/* ── Body grid ── */}
        <div style={{
          maxWidth:1280, margin:"0 auto",
          display:"grid", gridTemplateColumns:"1fr 1fr 420px",
          padding:"0 40px",
          gap:0,
        }}>

          {/* COL 1 — first 3 products */}
          <div style={{ padding:"18px 20px 18px 0", borderRight:"1px solid #E2E8F0" }}>

            <div style={{ display:"flex", flexDirection:"column", gap:3 }}>
              {items.slice(0,3).map(item=><Item key={item.id} item={item} />)}
            </div>
          </div>

          {/* COL 2 — last 3 products */}
          <div style={{ padding:"18px 20px", borderRight:"1px solid #E2E8F0" }}>
            {/* Spacer to align with col 1 header */}

            <div style={{ display:"flex", flexDirection:"column", gap:3 }}>
              {items.slice(3,6).map(item=><Item key={item.id} item={item} />)}
            </div>
          </div>

          {/* COL 3 — dynamic resource panel */}
          <div style={{
            padding:"18px 0 0 24px",
            display:"flex", flexDirection:"column",
          }}>
            {/* Card */}
            <div style={{
              borderRadius:18, overflow:"hidden",
              border:`1.5px solid ${active.color}28`,
              boxShadow:`0 6px 32px ${active.color}14, 0 2px 8px rgba(0,0,0,.06)`,
              flex:1, display:"flex", flexDirection:"column",
              transition:"border-color .3s, box-shadow .3s",
              marginBottom:14,
              background:"#fff",
            }}>

              {/* ── IMAGE — takes max space ── */}
              <div style={{
                flex:1, position:"relative", overflow:"hidden",
                minHeight:200,
                background:`linear-gradient(145deg,${active.color}18 0%,${active.color}08 100%)`,
              }}>
                {res.coverImage ? (
                  <img
                    key={`${active.id}-wp-${res.slug}`}
                    src={res.coverImage}
                    alt={res.coverAlt || ""}
                    draggable={false}
                    style={{
                      position:"absolute", inset:0,
                      width:"100%", height:"100%",
                      objectFit:"cover",
                      objectPosition: "center center",
                      display:"block",
                    }}
                  />
                ) : active.cover ? (
                  <img
                    key={active.id}
                    src={assetUrl(active.cover.src)}
                    alt=""
                    draggable={false}
                    style={{
                      position:"absolute", inset:0,
                      width:"100%", height:"100%",
                      objectFit:"cover",
                      objectPosition: active.cover.objectPosition ?? "center center",
                      display:"block",
                    }}
                  />
                ) : (
                  <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", zIndex:2 }}>
                    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:8 }}>
                      <div style={{ width:56, height:56, borderRadius:16, background:`${active.color}18`, border:`1.5px dashed ${active.color}50`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:26 }}>{res.icon}</div>
                      <span style={{ fontSize:9, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:active.color, fontFamily:"var(--fb)", opacity:.6 }}>Cover image placeholder</span>
                    </div>
                  </div>
                )}

                <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(rgba(0,0,0,.04) 1px,transparent 1px)", backgroundSize:"12px 12px", pointerEvents:"none", zIndex:1 }} />

                {/* ── Overlay band at bottom of image ── */}
                <div style={{
                  position:"absolute", bottom:0, left:0, right:0, zIndex:3,
                  background:`linear-gradient(0deg, ${active.color}f0 0%, ${active.color}cc 60%, transparent 100%)`,
                  padding:"28px 16px 14px",
                }}>
                  <div style={{ fontSize:8.5, fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", color:"rgba(255,255,255,.6)", fontFamily:"var(--fb)", marginBottom:3 }}>{res.type}</div>
                  <div style={{ fontSize:13, fontWeight:800, color:"#fff", lineHeight:1.25, fontFamily:"var(--fb)", letterSpacing:"-.02em" }}>{res.label}</div>
                </div>
              </div>

              {/* ── Footer strip — meta + compact CTA side by side ── */}
              <div style={{
                padding:"10px 14px",
                display:"flex", alignItems:"center", justifyContent:"space-between", gap:10,
                borderTop:`1px solid ${active.color}14`,
                flexShrink:0,
              }}>
                {/* Meta */}
                <div style={{ display:"flex", alignItems:"center", gap:5 }}>
                  <div style={{ width:18, height:18, borderRadius:5, background:`${active.color}12`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, flexShrink:0 }}>🕐</div>
                  <span style={{ fontSize:11, color:"#64748B", fontFamily:"var(--fb)" }}>{res.meta}</span>
                </div>

                {/* Compact CTA pill */}
                <a
                  href={ctaHref}
                  onClick={(e) => {
                    e.preventDefault();
                    onClose();
                    if (typeof onNavigate === "function") onNavigate(ctaNavTarget);
                  }}
                  style={{
                  display:"inline-flex", alignItems:"center", gap:5, flexShrink:0,
                  background:`linear-gradient(135deg,${active.color},${active.color}cc)`,
                  color:"#fff", borderRadius:100,
                  padding:"6px 14px",
                  fontSize:11.5, fontWeight:700, textDecoration:"none", fontFamily:"var(--fb)",
                  letterSpacing:"-.01em", boxShadow:`0 3px 12px ${active.color}3a`,
                  whiteSpace:"nowrap", transition:"all .18s",
                }}
                  onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-1px)"; e.currentTarget.style.boxShadow=`0 6px 18px ${active.color}50`; }}
                  onMouseLeave={e=>{ e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow=`0 3px 12px ${active.color}3a`; }}
                >{ctaLabel}</a>
              </div>

            </div>


          </div>
        </div>

        {/* ── Footer trust bar ── */}
        <div style={{
          borderTop:"1px solid rgba(0,0,0,.07)",
          padding:"10px 40px",
          background:"#F8FAFC",
          display:"flex", alignItems:"center", justifyContent:"space-between",
        }}>
          <div style={{ display:"flex", alignItems:"center", gap:6 }}>
            <span style={{ fontSize:10.5, color:"#64748B", fontFamily:"var(--fb)", marginRight:8 }}>Trusted enterprise standard:</span>
            {[["#22C55E","SOC 2 Type II"],["#22C55E","ISO 27001"]].map(([dot,label])=>(
              <span key={label} style={{
                display:"inline-flex", alignItems:"center", gap:5, padding:"3px 10px",
                background:"#F0FDF4", borderRadius:100, fontSize:10.5, fontWeight:600,
                color:"#166534", fontFamily:"var(--fb)", border:"1px solid #BBF7D0",
              }}>
                <span style={{ width:5, height:5, borderRadius:"50%", background:dot, display:"inline-block" }} />
                {label}
              </span>
            ))}
          </div>
          <span style={{ fontSize:11, color:"#CBD5E1", fontFamily:"var(--fb)", display:"flex", alignItems:"center", gap:6 }}>
            Press
            <kbd style={{ background:"#fff", border:"1px solid #E2E8F0", borderRadius:6, padding:"2px 8px",
              fontSize:10.5, color:"#475569", fontWeight:600, fontFamily:"var(--fm)",
              boxShadow:"0 1px 3px rgba(0,0,0,.07), 0 1px 0 rgba(0,0,0,.04)" }}>Esc</kbd>
            to close
          </span>
        </div>
      </div>
    </>
  );
}
