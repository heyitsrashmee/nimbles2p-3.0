"use client";

import { useState, useEffect } from "react";
import { useWidth } from "@/components/shared/pageUi";
import { NimbleLogo, NimbleColorLogo } from "./logos";
import { MegaMenu } from "./MegaMenu";
import { MEGA_PRODUCTS } from "./megaMenuData";

export function Nav({ onNavigate, onBack, pageName }) {
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
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      setMegaOpen(false);
    };
    window.addEventListener("scroll", onScroll, { passive:true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = e => { if(e.key==="Escape") setMegaOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const bg      = scrolled ? "#ffffff" : "#221868";
  const linkClr = scrolled ? "rgba(15,23,42,.65)" : "rgba(255,255,255,.7)";
  const linkHov = scrolled ? "#0F172A" : "#fff";
  const border  = scrolled ? "rgba(0,0,0,.08)" : "rgba(255,255,255,.1)";
  const hamClr  = scrolled ? "#0F172A" : "#fff";

  const navLinks = ["Why NimbleS2P","Pricing"];

  return (
    <>
      <nav style={{
        position:"fixed", top:0, left:0, right:0, zIndex:100,
        background:bg,
        borderBottom:`1px solid ${border}`,
        transition:"background .3s ease, border-color .3s ease",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        boxShadow: scrolled ? "0 1px 20px rgba(0,0,0,.08)" : "none",
      }}>
        <div style={{
          maxWidth:1400, margin:"0 auto",
          display:"flex", alignItems:"center",
          height:NAV_H,
          padding: isMobile ? "0 20px" : "0 36px",
          position:"relative",
        }}>
          {/* Logo */}
          <a href="#" onClick={e=>{ e.preventDefault(); if(onBack) onBack(); window.scrollTo({top:0,behavior:"smooth"}); }} style={{ display:"flex", alignItems:"center", textDecoration:"none", flexShrink:0 }}>
            {scrolled ? <NimbleColorLogo height={isMobile ? 22 : 26} /> : <NimbleLogo height={isMobile ? 22 : 26} />}
          </a>

          {/* Desktop links — always shown on every page */}
          <div
            className="nav-links-desktop"
            style={{
              display: isMobile ? "none" : "flex",
              alignItems: "center",
              gap: 36,
              margin: "0 auto",
            }}
          >
            <button onClick={()=>setMegaOpen(o=>!o)} style={{
              display:"inline-flex", alignItems:"center", gap:5,
              fontSize:14.5, fontWeight: megaOpen ? 600 : 400,
              color: megaOpen ? (scrolled ? "#0F172A" : "#fff") : linkClr,
              background:"none", border:"none", cursor:"pointer",
              fontFamily:"var(--fb)", letterSpacing:"-.01em",
              padding:0, transition:"color .2s",
            }}>
              Products
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ opacity:.6, transform: megaOpen ? "rotate(180deg)" : "none", transition:"transform .2s" }}>
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {navLinks.map(l => (
              <a key={l} href="#" onClick={e=>{ e.preventDefault(); if(l==="Why NimbleS2P" && onNavigate) onNavigate("why"); if(l==="Pricing" && onNavigate) onNavigate("pricing"); }} style={{
                fontSize:14.5, fontWeight:400,
                color:linkClr, textDecoration:"none",
                fontFamily:"var(--fb)", letterSpacing:"-.01em",
                transition:"color .2s",
              }}
                onMouseEnter={e=>e.target.style.color=linkHov}
                onMouseLeave={e=>e.target.style.color=linkClr}
              >{l}</a>
            ))}
            {megaOpen && <MegaMenu onClose={()=>setMegaOpen(false)} onNavigate={onNavigate} />}
          </div>

          {/* CTA */}
          <a onClick={e=>{ e.preventDefault(); if(typeof onNavigate==="function") onNavigate("demo", { cta: { ctaLocation: "nav", buttonText: "Book a Demo" } }); }} className="nav-cta-desktop" href="#" style={{
            display: isMobile ? "none" : "inline-flex", alignItems:"center", gap:6,
            background:"linear-gradient(135deg,#E8960A,#F5A623)",
            color:"#fff", border:"none", borderRadius:9,
            padding:"10px 26px", fontSize:14.5, fontWeight:700,
            cursor:"pointer", fontFamily:"var(--fb)", textDecoration:"none",
            letterSpacing:"-.01em",
            boxShadow:"0 4px 20px rgba(232,150,10,.38)",
            transition:"transform .2s cubic-bezier(.22,1,.36,1), box-shadow .2s",
            flexShrink:0,
          }}
            onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-1px)"; e.currentTarget.style.boxShadow="0 8px 30px rgba(232,150,10,.55)"; }}
            onMouseLeave={e=>{ e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow="0 4px 20px rgba(232,150,10,.38)"; }}
          >Book a Demo →</a>

          {/* Hamburger */}
          <button
            className="hamburger"
            onClick={() => setOpen(o=>!o)}
            aria-label="Toggle menu"
            style={{
              display: isMobile ? "flex" : "none",
              flexDirection: "column",
              justifyContent: "center",
              gap: 5,
              width: 36,
              height: 36,
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: 4,
              marginLeft: "auto",
            }}
          >
            <span style={{ background:hamClr, transform: open ? "rotate(45deg) translate(5px,5px)" : "none" }} />
            <span style={{ background:hamClr, opacity: open ? 0 : 1 }} />
            <span style={{ background:hamClr, transform: open ? "rotate(-45deg) translate(5px,-5px)" : "none" }} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer — only mount on small screens */}
      {isMobile && (
      <div
        className={`mobile-menu${open ? " open" : ""}`}
        style={{
          display: open ? "flex" : "none",
          flexDirection: "column",
          position: "fixed",
          top: NAV_H,
          left: 0,
          right: 0,
          bottom: 0,
          background: "#1a1440",
          zIndex: 99,
          padding: "24px 20px",
          gap: 4,
          overflowY: "auto",
        }}
      >
        {/* Products accordion on mobile */}
        <div style={{ padding:"14px 16px", borderRadius:10 }}>
          <div style={{ fontSize:17, fontWeight:600, color:"rgba(255,255,255,.75)", fontFamily:"var(--fb)", marginBottom:12 }}>Products</div>
          {MEGA_PRODUCTS.integrated.map(item=>(
            <a key={item.id} href="#" className="mobile-nav-link" style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 0" }} onClick={()=>{ setOpen(false); if(onNavigate) onNavigate(item.id==="analytics" ? "analytics" : item.id==="vdd" ? "vdd" : item.id==="supplier" ? "supplier" : item.id==="invoice" ? "invoice" : item.id==="rfq" ? "rfq" : item.id==="finance" ? "finance" : item.id); }}>
              <span style={{ fontSize:16 }}>{item.icon}</span>
              <span>{item.name}</span>
            </a>
          ))}
        </div>
        <div className="mobile-divider" />
        {["Why NimbleS2P","Pricing"].map(l => <a key={l} href="#" className="mobile-nav-link" onClick={()=>{ setOpen(false); if(l==="Why NimbleS2P" && onNavigate) onNavigate("why"); if(l==="Pricing" && onNavigate) onNavigate("pricing"); }}>{l}</a>)}
        <div className="mobile-divider" />
        <a href="#" style={{
          display:"flex", justifyContent:"center", alignItems:"center",
          background:"linear-gradient(135deg,#E8960A,#F5A623)",
          color:"#fff", borderRadius:10, padding:"14px 24px",
          fontSize:16, fontWeight:700, textDecoration:"none",
          fontFamily:"var(--fb)", boxShadow:"0 4px 20px rgba(232,150,10,.4)",
          marginTop:8,
        }} onClick={()=>{ setOpen(false); if(onNavigate) onNavigate("demo", { cta: { ctaLocation: "nav_mobile", buttonText: "Book a Demo" } }); }}>Book a Demo →</a>
      </div>
      )}
    </>
  );
}
