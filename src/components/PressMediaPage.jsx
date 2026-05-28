"use client";

import { useEffect, useRef } from "react";
import { Nav } from "@/components/layout/SiteNav";
import { VDDFooter } from "@/components/layout/VDDFooter";
import { LogoMarquee } from "@/components/shared/LogoMarquee";
import { PRESS_LOGOS, pressLogoPath } from "@/lib/pressLogos";

/* ═══════════════════════════════════════════════════════════
   Press & Media page — converted from the standalone HTML.
   Nav + Footer reuse the shared homepage components. The unique
   content (hero, "as seen in" logo marquee, press coverage grid,
   CTA) lives here. Every selector is scoped under .press-page and
   keyframes are prefixed `pr-` so styles can't leak to other
   routes.
═══════════════════════════════════════════════════════════ */

/* Bar colour cycles through the brand palette, per the source page. */
const CARD_COLORS = ["#6320E0", "#0EA5E9", "#D97706", "#8B5CF6", "#10B981"];

const PRESS_ARTICLES = [
  { pub: "BW Businessworld", title: "Investing In Procurement Makes Organizations More Resilient", excerpt: "As organizations centre less around efficiency and more on resilience, procurement becomes integral to the procedure.", href: "http://bwdisrupt.businessworld.in/article/Investing-In-Procurement-Makes-Organizations-More-Resilient/28-10-2021-410237/" },
  { pub: "CXO Outlook", title: "Reimagining International Grade Procurement & Supply Chain Management", excerpt: "Technology is the way forward for end-to-end supply chain processes and international grade procurement.", href: "https://www.cxooutlook.com/reimagining-international-grade-procurement-and-supply-chain-management/" },
  { pub: "PCQuest", title: "How Business Automation Regulates Medium and Large Enterprises", excerpt: "Technological advancements have become critical for processes such as finance, procurement, and operations.", href: "https://www.pcquest.com/business-automation-regulating-verticals-across-medium-large-enterprises/" },
  { pub: "DigitalFirst", title: "Automating Supplier Management Chain", excerpt: "Procurement automation is certainly offering several new opportunities to businesses and optimizing savings.", href: "https://www.digitalfirstmagazine.com/procurement-technology-structuring-and-automating-supplier-management-chain/" },
  { pub: "Silicon India", title: "What Goes Into Making a Robust Supplier Network?", excerpt: "The digital revolution of the logistics segment has paved the way for smarter supply chain management.", href: "https://www.siliconindia.com/viewpoint/cxoinsights/what-goes-into-making-a-business-continuity-robust-supplier-network-nwid-30639.html" },
  { pub: "EtherWire.Ai", title: "Let’s talk Ethics in AI", excerpt: "A conversation on responsible AI, trade-offs, and what ethics looks like in real deployments.", href: "https://www.youtube.com/watch?v=QQI-I5PAIpE&list=PLXywe-2BKYeT4FMJjR3jPRagVKfqQPpQm&index=4" },
  { pub: "Dataquest", title: "NimbleS2P Automates Manual Activities for Buyers", excerpt: "Techpanion's technology solutions automate critical processes in finance, procurement, and operations.", href: "https://www.dqindia.com/techpanions-nimbles2p-automates-manual-activities-for-buyers/" },
  { pub: "CEO Insights", title: "What Benefits Are Brought for Smart Business Continuity?", excerpt: "Technology in big and small functions helps businesses avail themselves of the best-possible continuity perks.", href: "https://www.ceoinsightsindia.com/startups/what-benefits-does-digital-transformation-like-automation-bring-to-a-business-for-smart-continuity-nwid-8788.html" },
  { pub: "iTVoice", title: "Why and How a Company Must Focus on Procure-to-Pay Solutions", excerpt: "Procurement and supply chain management have embraced technology given rapid global adoption.", href: "https://www.itvoice.in/why-and-how-a-company-must-focus-on-procure-to-pay-solutions" },
  { pub: "CXO Outlook", title: "Reimagining International Grade Procurement and Supply Chain Management", excerpt: "Technology is the way forward for end-to-end supply chain processes and international grade procurement.", href: "https://www.cxooutlook.com/reimagining-international-grade-procurement-and-supply-chain-management/" },
  { pub: "The Economic Times", title: "How to Build Strong Relationships With Your Suppliers", excerpt: "Successful organizations understand the crucial role of suppliers and treat them as indispensable partners.", href: "https://economictimes.indiatimes.com/news/how-to/how-to-build-strong-relationships-with-your-suppliers/articleshow/100763933.cms" },
  { pub: "Silicon India", title: "Leveraging Technology for Better Supplier Relationship Management", excerpt: "Modern firms consistently strive to adapt to extraordinary market changes with tech-driven strategies.", href: "https://www.siliconindia.com/viewpoint/cxoinsights/the-future-of-procurement-leveraging-technology-for-better-supplier-relationship-management-nwid-38773.html" },
  { pub: "Techickpe", title: "Best Practices for a Smooth Procure-to-Pay Process", excerpt: "As businesses grow, their procurement processes get more complex — automation is the answer.", href: "https://www.techiexpert.com/a-guide-to-streamlining-accounts-payable-best-practices-for-a-smooth-procure-to-pay-process/" },
  { pub: "CEO Insights", title: "Advantages of Centralized Procurement Operations", excerpt: "Procurement is crucial — sourcing, purchasing, and managing goods and services required for business ops.", href: "https://www.ceoinsightsindia.com/magazines/ceos-in-marketing-may-2023/#page=16" },
  { pub: "BW Retail World", title: "Major Steps To Improve Your Supplier Performance Management", excerpt: "Organizations must constantly adapt to changing market conditions and supply chain disruptions.", href: "https://bwretailworld.businessworld.in/news/major-steps-to-improve-your-supplier-performance-management" },
  { pub: "The Times Of India", title: "Predictive Procurement; Relevance for Supply Chain", excerpt: "Managing supplier performance is more important than ever in today's fast-paced business environment.", href: "https://timesofindia.indiatimes.com/blogs/voices/predictive-procurement-relevance-for-supply-chain-functioning-across-organizations/" },
];

const ReadArrow = (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function PressMediaPage({ onBack, onNavigate }) {
  const rootRef = useRef(null);

  /* Scroll-reveal: add .visible to .sr elements as they enter the viewport. */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    root.querySelectorAll(".sr").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const goDemo = () => {
    if (typeof onNavigate === "function") onNavigate("demo");
  };

  return (
    <div className="press-page" ref={rootRef}>
      <style dangerouslySetInnerHTML={{ __html: PRESS_CSS }} />

      <Nav onNavigate={onNavigate} onBack={onBack} pageName="press" />

      {/* ══ HERO ══ */}
      <section className="press-hero">
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,#0f0c29 0%,#1a1260 40%,#261d6b 70%,#1e1050 100%)" }} />
          <div style={{ position: "absolute", bottom: "-10%", right: "-5%", width: "50%", height: "80%", background: "radial-gradient(ellipse at 80% 80%,rgba(245,166,35,.18) 0%,transparent 60%)" }} />
          <div style={{ position: "absolute", top: "-10%", left: "-5%", width: "55%", height: "75%", background: "radial-gradient(ellipse at 20% 20%,rgba(99,32,224,.38) 0%,transparent 60%)" }} />
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,.045) 1px,transparent 1px)", backgroundSize: "30px 30px" }} />
        </div>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 52, overflow: "hidden", pointerEvents: "none" }}>
          <svg viewBox="0 0 1440 52" preserveAspectRatio="none" style={{ position: "absolute", top: 0, left: 0, width: "200%", height: "100%", animation: "pr-waveSlide 9s linear infinite" }}>
            <path d="M0,26 C200,8 400,44 600,26 C800,8 1000,44 1200,26 C1360,12 1440,36 1440,26 L1440,0 L0,0 Z" fill="rgba(99,32,224,.15)" />
            <path d="M0,36 C180,12 380,52 580,32 C780,12 980,48 1180,28 C1340,14 1440,38 1440,36 L1440,0 L0,0 Z" fill="rgba(130,80,230,.09)" />
          </svg>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg,transparent,rgba(139,92,246,.45) 30%,rgba(139,92,246,.45) 70%,transparent)" }} />
        </div>

        <div className="press-hero-inner sr">
          <h1>What everyone is talking about.</h1>
          <p>NimbleS2P in the press &mdash; from enterprise procurement to supply chain innovation.</p>
        </div>

        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 48, overflow: "hidden", pointerEvents: "none" }}>
          <svg viewBox="0 0 1440 48" preserveAspectRatio="none" style={{ position: "absolute", bottom: 0, left: 0, width: "200%", height: "100%", animation: "pr-waveSlide 10s linear infinite" }}>
            <path d="M0,24 C240,6 480,40 720,24 C960,8 1200,40 1440,24 L1440,48 L0,48 Z" fill="rgba(255,255,255,.05)" />
          </svg>
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg,transparent,rgba(255,255,255,.1) 30%,rgba(255,255,255,.1) 70%,transparent)" }} />
        </div>
      </section>

      {/* ══ AS SEEN IN — logo marquee ══ */}
      <LogoMarquee
        heading="As Seen In"
        logos={PRESS_LOGOS.map(({ label, file }) => ({ label, src: pressLogoPath(file) }))}
      />
      <div className="rgb-divider" aria-hidden="true" />

      {/* ══ PRESS COVERAGE GRID ══ */}
      <section className="press-section">
        <div className="press-section-inner">
          <div className="press-section-header sr">
            <h2>In the media</h2>
            <p>Read what India&rsquo;s top publications are saying about NimbleS2P and the future of procurement.</p>
          </div>
          <div className="press-grid">
            {PRESS_ARTICLES.map((a, i) => {
              const delay = ["", " sr-d2", " sr-d3"][i % 3];
              return (
                <a className={`press-card sr${delay}`} href={a.href} target="_blank" rel="noopener noreferrer" key={a.href}>
                  <div className="press-card-bar" style={{ background: CARD_COLORS[i % CARD_COLORS.length] }} />
                  <div className="press-card-body">
                    <div className="press-pub">{a.pub}</div>
                    <div className="press-title">{a.title}</div>
                    <p className="press-excerpt">{a.excerpt}</p>
                  </div>
                  <div className="press-card-footer">
                    <span className="press-read">Read Article</span>
                    {ReadArrow}
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="press-cta">
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,#0f0c29 0%,#1a1260 40%,#261d6b 70%,#1e1050 100%)" }} />
          <div style={{ position: "absolute", bottom: "-10%", right: "-5%", width: "50%", height: "80%", background: "radial-gradient(ellipse at 80% 80%,rgba(245,166,35,.22) 0%,transparent 60%)" }} />
          <div style={{ position: "absolute", top: "-10%", left: "-5%", width: "55%", height: "75%", background: "radial-gradient(ellipse at 20% 20%,rgba(99,32,224,.38) 0%,transparent 60%)" }} />
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle,rgba(255,255,255,.06) 1px,transparent 1px)", backgroundSize: "28px 28px" }} />
        </div>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 52, overflow: "hidden", pointerEvents: "none" }}>
          <svg viewBox="0 0 1440 52" preserveAspectRatio="none" style={{ position: "absolute", top: 0, left: 0, width: "200%", height: "100%", animation: "pr-waveSlide 9s linear infinite" }}>
            <path d="M0,26 C200,8 400,44 600,26 C800,8 1000,44 1200,26 C1360,12 1440,36 1440,26 L1440,0 L0,0 Z" fill="rgba(99,32,224,.15)" />
            <path d="M0,36 C180,12 380,52 580,32 C780,12 980,48 1180,28 C1340,14 1440,38 1440,36 L1440,0 L0,0 Z" fill="rgba(130,80,230,.09)" />
          </svg>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg,transparent,rgba(139,92,246,.45) 30%,rgba(139,92,246,.45) 70%,transparent)" }} />
        </div>
        <div style={{ position: "relative", zIndex: 1 }}>
          <div className="press-cta-inner sr">
            <div className="cta-live-badge">
              <span className="cta-live-dot" />
              <span>Ready to see it yourself?</span>
            </div>
            <h2>Power your organization with NimbleS2P</h2>
            <p>
              Top industry publications agree &mdash; the future of procurement is resilient, automated, and centralized. See firsthand how we&rsquo;re transforming financial operations for Indian enterprises.
            </p>
            <div className="press-cta-btns">
              <a href="#" className="btn-primary-cta" onClick={(e) => { e.preventDefault(); goDemo(); }}>
                See NimbleS2P in Action &rarr;
              </a>
            </div>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 52, overflow: "hidden", pointerEvents: "none" }}>
          <svg viewBox="0 0 1440 52" preserveAspectRatio="none" style={{ position: "absolute", bottom: 0, left: 0, width: "200%", height: "100%", animation: "pr-waveSlide 10s linear infinite" }}>
            <path d="M0,26 C200,8 400,44 600,26 C800,8 1000,42 1200,26 C1360,12 1440,34 1440,26 L1440,52 L0,52 Z" fill="rgba(99,32,224,.12)" />
            <path d="M0,36 C180,14 380,50 580,32 C780,14 980,46 1180,30 C1340,16 1440,38 1440,36 L1440,52 L0,52 Z" fill="rgba(130,80,230,.07)" />
          </svg>
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg,transparent,rgba(139,92,246,.4) 30%,rgba(139,92,246,.4) 70%,transparent)" }} />
        </div>
      </section>

      <VDDFooter onNavigate={onNavigate} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PAGE STYLES — every selector scoped under .press-page so it
   cannot leak into other routes. Keyframes are prefixed `pr-`.
═══════════════════════════════════════════════════════════ */
const PRESS_CSS = `
.press-page{
  --f-t:var(--ft); --f-b:var(--fb); --f-m:var(--fm);
  background:#fff; color:var(--t1);
}
.press-page h1,.press-page h2,.press-page h3,.press-page h4{font-family:var(--f-t)}
.press-page a{text-decoration:none}

@keyframes pr-scrollLogos{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
@keyframes pr-waveSlide{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@keyframes pr-livePulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.3);opacity:.7}}

/* ── Scroll reveal ── */
.press-page .sr{opacity:0;transform:translateY(22px);transition:opacity .6s ease,transform .6s ease}
.press-page .sr.visible{opacity:1;transform:translateY(0)}
.press-page .sr-d2.visible{transition-delay:.16s}
.press-page .sr-d3.visible{transition-delay:.24s}

/* ── Hero ── */
.press-page .press-hero{background:#0f0c29;padding:140px 48px 120px;text-align:center;position:relative;overflow:hidden;}
.press-page .press-hero-inner{position:relative;z-index:2;max-width:600px;margin:0 auto;}
.press-page .press-hero h1{font-family:var(--f-t);font-size:clamp(40px,4.7vw,65px);font-weight:800;letter-spacing:-.03em;line-height:1.07;margin-bottom:16px;background:linear-gradient(95deg,rgb(255,255,255) 0%,rgb(255,255,255) 30%,rgb(245,208,96) 62%,rgb(245,166,35) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;padding-bottom:.06em;}
.press-page .press-hero p{font-family:var(--f-b);font-size:17.5px;font-weight:400;line-height:1.72;color:rgba(255,255,255,.52);}

/* ── Featured / "As seen in" marquee ── */
.press-page .featured-label-row{text-align:center;padding:28px 48px 0;background:#fff;}
.press-page .featured-label-text{font-family:var(--f-b);font-size:11px;font-weight:700;color:var(--t3);letter-spacing:.18em;text-transform:uppercase;}
.press-page .featured-banner{background:#fff;border-bottom:1px solid var(--bd);padding:20px 0 24px;overflow:hidden;position:relative;}
.press-page .featured-banner::before,.press-page .featured-banner::after{content:'';position:absolute;top:0;bottom:0;width:100px;z-index:2;pointer-events:none;}
.press-page .featured-banner::before{left:0;background:linear-gradient(to right,#fff,transparent);}
.press-page .featured-banner::after{right:0;background:linear-gradient(to left,#fff,transparent);}
.press-page .featured-inner{display:flex;align-items:center;gap:0;animation:pr-scrollLogos 28s linear infinite;width:max-content;}
.press-page .featured-inner:hover{animation-play-state:paused;}
.press-page .featured-logo-img-wrap{padding:8px 28px;display:flex;align-items:center;justify-content:center;height:56px;flex-shrink:0;border-right:1px solid #e8e8f0;transition:opacity .2s;}
.press-page .featured-logo-img-wrap:hover{opacity:.75;}
.press-page .featured-logo-img-wrap svg{height:30px;width:auto;max-width:160px;display:block;}

/* ── Divider ── */
.press-page .rgb-divider{height:3px;width:100%;background:linear-gradient(90deg,var(--p500),var(--p300),#F59E0B);display:block;}

/* ── Press coverage grid ── */
.press-page .press-section{padding:72px 48px 96px;background:#fff;}
.press-page .press-section-inner{max-width:1100px;margin:0 auto;}
.press-page .press-section-header{margin-bottom:48px;}
.press-page .press-section-header h2{font-family:var(--f-t);font-size:clamp(28px,3.5vw,42px);font-weight:800;color:var(--t1);letter-spacing:-.03em;margin-bottom:8px;}
.press-page .press-section-header p{font-family:var(--f-b);font-size:15px;color:var(--t3);}
.press-page .press-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;}
.press-page .press-card{background:#fff;border:1.5px solid var(--bd);border-radius:16px;overflow:hidden;display:flex;flex-direction:column;text-decoration:none;transition:transform .25s cubic-bezier(.22,1,.36,1),box-shadow .25s,border-color .25s;}
.press-page .press-card:hover{transform:translateY(-5px);box-shadow:0 16px 40px rgba(15,13,46,.1);border-color:rgba(30,27,75,.12);}
.press-page .press-card-bar{height:3px;width:100%;flex-shrink:0;}
.press-page .press-card-body{padding:20px 20px 14px;flex:1;}
.press-page .press-pub{font-family:var(--f-b);font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--t4);margin-bottom:8px;}
.press-page .press-title{font-family:var(--f-t);font-size:14.5px;font-weight:700;color:var(--p700);line-height:1.45;margin-bottom:10px;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;}
.press-page .press-excerpt{font-family:var(--f-b);font-size:12.5px;color:var(--t3);line-height:1.65;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
.press-page .press-card-footer{display:flex;align-items:center;justify-content:space-between;padding:12px 20px 16px;border-top:1px solid var(--bd);margin-top:auto;}
.press-page .press-read{font-family:var(--f-b);font-size:11.5px;font-weight:700;color:var(--p300);}
.press-page .press-card svg{color:var(--p300);}

/* ── CTA ── */
.press-page .press-cta{background:#0f0c29;padding:clamp(72px,9vh,110px) 5vw;text-align:center;position:relative;overflow:hidden;}
.press-page .press-cta-inner{position:relative;z-index:1;max-width:640px;margin:0 auto;}
.press-page .press-cta h2{font-family:var(--f-t);font-size:clamp(28px,4.5vw,48px);font-weight:800;letter-spacing:-.035em;line-height:1.1;color:#fff;margin-bottom:16px;}
.press-page .press-cta p{font-family:var(--f-b);font-size:15px;color:rgba(255,255,255,.5);line-height:1.7;margin-bottom:32px;}
.press-page .press-cta-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;}
.press-page .btn-primary-cta{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,#E8920A,#F5B020);color:#fff;border:none;border-radius:10px;padding:14px 28px;font-family:var(--f-b);font-size:14px;font-weight:700;cursor:pointer;text-decoration:none;box-shadow:0 6px 32px rgba(232,150,10,.52);transition:opacity .2s,transform .2s;}
.press-page .btn-primary-cta:hover{opacity:.9;transform:translateY(-1px);}
.press-page .cta-live-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(245,166,35,.12);border:1px solid rgba(245,166,35,.3);border-radius:100px;padding:6px 18px;margin-bottom:28px;font-family:var(--f-b);font-size:12px;font-weight:600;color:#F5D060;letter-spacing:.04em;}
.press-page .cta-live-dot{width:7px;height:7px;border-radius:50%;background:#F5A623;flex-shrink:0;box-shadow:0 0 8px rgba(245,166,35,.8);animation:pr-livePulse 2.4s ease-in-out infinite;}

/* ── Responsive ── */
@media(max-width:1024px){.press-page .press-grid{grid-template-columns:repeat(3,1fr);}}
@media(max-width:768px){.press-page .press-grid{grid-template-columns:repeat(2,1fr);}.press-page .press-section{padding:60px 24px;}.press-page .press-hero{padding:120px 24px 100px;}}
@media(max-width:480px){.press-page .press-grid{grid-template-columns:1fr;}}
`;
