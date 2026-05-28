"use client";

import { useEffect, useRef, useState } from "react";
import { Nav } from "@/components/layout/SiteNav";
import { VDDFooter } from "@/components/layout/VDDFooter";

/* ═══════════════════════════════════════════════════════════
   Partner Program page — converted from the standalone HTML.
   Nav + Footer reuse the shared homepage components; the unique
   page content (hero, tracks, stats, why, process, CTA) lives
   here. Every selector is scoped under .partners-page and the
   keyframes are prefixed `pp-` so styles can't leak to other
   routes.
═══════════════════════════════════════════════════════════ */

/* Arrow glyph reused by the toggle and the "Apply" link */
const ArrowIcon = (
  <svg viewBox="0 0 14 14" fill="none">
    <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const HERO_TAGS = [
  ["#6320E0", "System Integration Partner"],
  ["#0EA5E9", "Strategic Partner"],
  ["#D97706", "Finance Consulting Partner"],
  ["#8B5CF6", "IT Consulting Partner"],
  ["#F59E0B", "Fintech Partner"],
];

const TRACKS = [
  {
    color: "#6320E0",
    delay: 1,
    badge: "Solution Delivery",
    title: "System Integration Partner",
    headline: "Architects of digital cohesion.",
    desc: "You're the hands-on expert who weaves NimbleS2P into complex client environments. You drive the deployment, ensuring our Source-to-Pay automation talks perfectly to existing ERPs and legacy systems — delivering a unified, glitch-free tech ecosystem that clients can rely on from day one.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="5" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="19" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="12" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="12" cy="19" r="2.5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M7.5 12h9M12 7.5v9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity=".4" />
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" fill="currentColor" opacity=".12" />
      </svg>
    ),
    perks: [
      ["Certified partner status", "Co-branded credentials and market positioning"],
      ["Technical enablement", "Dedicated training, sandbox access, and integration docs"],
      ["Deal registration", "Pipeline protection and preferential margin structure"],
      ["Implementation toolkit", "Pre-built connectors, test scripts, and deployment guides"],
    ],
  },
  {
    color: "#0EA5E9",
    delay: 2,
    badge: "Co-innovation",
    title: "Strategic Partner",
    headline: "Defining the market together.",
    desc: "This track is for visionaries looking to co-innovate rather than just resell. Our Strategic Partners work alongside us to open new geographies and set new standards in procurement automation — expanding mutual footprint and driving scalable, industry-wide impact.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" fill="currentColor" opacity=".08" />
        <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
        <path d="M12 3v2M12 19v2M3 12h2M19 12h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity=".45" />
      </svg>
    ),
    perks: [
      ["Joint GTM planning", "Shared pipeline, co-marketed campaigns, and field alignment"],
      ["Product co-development", "Early access to roadmap and ability to influence feature direction"],
      ["Executive sponsorship", "Direct access to NimbleS2P leadership for strategic alignment"],
      ["Revenue sharing model", "Attractive commercial model designed for long-term growth"],
    ],
  },
  {
    color: "#D97706",
    delay: 3,
    badge: "Advisory",
    title: "Finance Consulting Partner",
    headline: "Turning advice into operational savings.",
    desc: "CFOs rely on your guidance to navigate fiscal complexity — we provide the toolset to master it. Partner with NimbleS2P to bring tangible spend visibility and compliance to your clients. You provide the financial roadmap; we provide the automation vehicle to get them there.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M3 18l5-6 4 3 5-8 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 21h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity=".35" />
        <path d="M17 6h4v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity=".65" />
      </svg>
    ),
    perks: [
      ["Client ROI framework", "Pre-built business case templates and ROI calculators"],
      ["Compliance toolkit", "GST, TDS, and statutory compliance modules for your clients"],
      ["CFO-ready reporting", "Spend analytics, variance reports, and budget dashboards"],
      ["Advisory certification", "NimbleS2P Finance Advisory badge and case study co-authorship"],
    ],
  },
  {
    color: "#8B5CF6",
    delay: 1,
    badge: "Digital Transformation",
    title: "IT Consulting Partner",
    headline: "Modernise the stack without the headaches.",
    desc: "You guide enterprises through digital transformation — we provide the engine. As an IT Consulting Partner, recommend a procurement platform that respects the existing IT landscape. Help clients ditch legacy inefficiencies for a solution that prioritises security, agility, and rapid adoption.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" fill="currentColor" opacity=".1" />
        <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M8 8.5L6 11l2 2.5M16 8.5L18 11l-2 2.5M13 8l-2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    perks: [
      ["Architecture support", "Pre-sales technical support and solution design assistance"],
      ["Security documentation", "Full SOC 2, ISO 27001, and VAPT reports for client due diligence"],
      ["Migration playbooks", "Step-by-step guides for migrating off legacy procurement systems"],
      ["Training & certification", "NimbleS2P technical certification programme for your team"],
    ],
  },
  {
    color: "#F59E0B",
    delay: 2,
    badge: "Financial Enablement",
    title: "Fintech Partner",
    headline: "Closing the loop from Source to Pay.",
    desc: "We invite payment gateways, neo-banks, and financing providers to embed financial agility directly into the supply chain. Offer clients friction-free settlements and working capital solutions right where commerce happens.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M13 2L4 14h7l-1 8 9-12h-7l2-8z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" fill="currentColor" opacity=".12" />
      </svg>
    ),
    perks: [
      ["Embedded finance APIs", "Deep API access to embed your payment and financing products"],
      ["Supply chain finance", "Early payment, dynamic discounting, and invoice financing hooks"],
      ["Compliance integration", "NACH, UPI, and NEFT payment rails with full audit trail"],
      ["Joint merchant network", "Access to NimbleS2P’s enterprise vendor network for distribution"],
    ],
  },
];

const STATS = [
  ["$11B+", "WORTH OF TRANSACTIONS"],
  ["1M+", "SUPPLIERS ONBOARDED"],
  ["600M+", "ENTERPRISE ACTIONS"],
  ["10x", "FASTER DUE DILIGENCE"],
];

const WHY = [
  {
    delay: 1,
    title: "India-first platform",
    body: "Built for Indian compliance from the ground up — GST, TDS, MCA, e-invoicing. Your clients get a platform that speaks their regulatory language without workarounds.",
    icon: (
      <svg viewBox="0 0 20 20" fill="none">
        <path d="M10 2L3 7v5c0 4 3.5 7.5 7 8 3.5-.5 7-4 7-8V7l-7-5z" stroke="currentColor" strokeWidth="1.4" fill="currentColor" opacity=".1" />
        <path d="M7 10l2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    delay: 2,
    title: "Proven ROI story",
    body: "Documented client outcomes — average 40% reduction in invoice processing time, 60% fewer compliance exceptions. Give your clients a business case that holds up.",
    icon: (
      <svg viewBox="0 0 20 20" fill="none">
        <path d="M4 14l4-4 3 3 5-6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="2" y="2" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.4" fill="currentColor" opacity=".06" />
      </svg>
    ),
  },
  {
    delay: 1,
    title: "Dedicated partner success",
    body: "Every partner gets a named success manager, not a ticket queue. Onboarding support, deal support, and quarterly reviews — we invest in making you successful.",
    icon: (
      <svg viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="8" r="4" stroke="currentColor" strokeWidth="1.4" fill="currentColor" opacity=".1" />
        <path d="M3 18c0-3.3 3.1-6 7-6s7 2.7 7 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    delay: 2,
    title: "Open integration ecosystem",
    body: "12 live integrations across ERP, compliance, communication, and e-signatures. Your clients aren't locked in — and neither are you. New connectors added quarterly.",
    icon: (
      <svg viewBox="0 0 20 20" fill="none">
        <path d="M10 2v4M10 14v4M2 10h4M14 10h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.4" fill="currentColor" opacity=".1" />
      </svg>
    ),
  },
];

const PROCESS = [
  ["01", "Apply", "Fill in the partner application. Tell us about your focus area and the clients you work with. Takes 5 minutes."],
  ["02", "Get Matched", "Our partner team reviews your application and matches you to the right track within 2 business days."],
  ["03", "Get Certified", "Complete the NimbleS2P partner certification — product training, integration labs, and sales enablement."],
  ["04", "Go to Market", "Start bringing NimbleS2P to your clients with co-branded materials, deal support, and your success manager."],
];

/* Reveal-on-scroll managed in React state so the className stays in sync
   across re-renders (track cards re-render when expanded). */
function useInViewState() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function TrackCard({ track, expanded, onToggle, onApply }) {
  const [ref, visible] = useInViewState();
  const cls = `track-card sr sr-d${track.delay}${visible ? " visible" : ""}${expanded ? " expanded" : ""}`;
  return (
    <div
      ref={ref}
      className={cls}
      style={{
        "--track-color": track.color,
        "--track-color-faint": `${track.color}26`,
        "--track-color-bg": `${track.color}12`,
        "--track-color-border": `${track.color}22`,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="track-icon">{track.icon}</div>
      <span className="track-badge">{track.badge}</span>
      <div className="track-title">{track.title}</div>
      <div className="track-headline">{track.headline}</div>
      <p className="track-desc">{track.desc}</p>
      <button
        className="track-toggle"
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
      >
        <span className="toggle-label">{expanded ? "See less" : "See details"}</span>
        <span className="track-toggle-icon">{ArrowIcon}</span>
      </button>
      <div className="track-expandable">
        <div style={{ height: 14 }} />
        <div className="track-perks">
          {track.perks.map(([k, v]) => (
            <div className="track-perk" key={k}>
              <div className="track-perk-dot" />
              <span>
                <strong>{k}</strong> — {v}
              </span>
            </div>
          ))}
        </div>
        <a
          href="#contact"
          className="track-cta"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onApply();
          }}
        >
          Apply for this track
          {ArrowIcon}
        </a>
      </div>
    </div>
  );
}

export default function PartnersPage({ onBack, onNavigate }) {
  const rootRef = useRef(null);
  const [expanded, setExpanded] = useState(null);

  /* Reveal static .sr elements (track cards manage their own reveal state). */
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
    root.querySelectorAll(".sr:not(.track-card)").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  /* Collapse an expanded track card when clicking anywhere outside it. */
  useEffect(() => {
    if (expanded === null) return;
    const collapse = () => setExpanded(null);
    document.addEventListener("click", collapse);
    return () => document.removeEventListener("click", collapse);
  }, [expanded]);

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const goApply = () => {
    if (typeof onNavigate === "function") onNavigate("demo");
  };

  return (
    <div className="partners-page" ref={rootRef}>
      <style dangerouslySetInnerHTML={{ __html: PARTNERS_CSS }} />

      <Nav onNavigate={onNavigate} onBack={onBack} pageName="partners" />

      {/* ══ HERO ══ */}
      <section className="hero" id="hero">
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 90% 70% at 50% 35%,rgba(99,32,224,.32) 0%,transparent 65%)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "50%", pointerEvents: "none", background: "radial-gradient(ellipse 80% 60% at 50% 100%,rgba(245,166,35,.09) 0%,transparent 70%)" }} />
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "radial-gradient(rgba(255,255,255,.045) 1px,transparent 1px)", backgroundSize: "30px 30px" }} />
        <div style={{ position: "absolute", top: 72, left: 0, right: 0, height: 1, pointerEvents: "none", background: "linear-gradient(90deg,transparent,rgba(255,255,255,.08) 30%,rgba(255,255,255,.08) 70%,transparent)" }} />

        <div className="hero-inner">
          <h1>
            Let&rsquo;s Transform
            <br />
            Procurement, Together.
          </h1>
          <p className="hero-sub">
            We&rsquo;re building an ecosystem where sourcing and automation meet real expertise. Whether you&rsquo;re a consultant, a tech integrator, or a fintech provider &mdash; bring your strengths to the table. Find your track below.
          </p>
          <div className="hero-ctas">
            <a href="#partner-tracks" className="btn-primary" style={{ padding: "14px 32px", fontSize: 15 }} onClick={(e) => { e.preventDefault(); scrollToId("partner-tracks"); }}>
              Find Your Track &darr;
            </a>
            <a href="#contact" className="hero-text-link" onClick={(e) => { e.preventDefault(); scrollToId("contact"); }}>
              Talk to Us &rarr;
            </a>
          </div>
        </div>

        {/* Scrolling partner track labels */}
        <div className="hero-tracks-scroll">
          <div className="hero-tracks-inner">
            {[...HERO_TAGS, ...HERO_TAGS].map(([color, label], i) => (
              <div className="hero-track-tag" key={`${label}-${i}`}>
                <span style={{ background: color }} />
                {label}
              </div>
            ))}
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 48, overflow: "hidden", pointerEvents: "none" }}>
          <svg viewBox="0 0 1440 48" preserveAspectRatio="none" style={{ position: "absolute", bottom: 0, left: 0, width: "200%", height: "100%", animation: "pp-waveSlide 10s linear infinite" }}>
            <path d="M0,24 C240,6 480,40 720,24 C960,8 1200,40 1440,24 L1440,48 L0,48 Z" fill="rgba(255,255,255,.05)" />
          </svg>
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg,transparent,rgba(255,255,255,.1) 30%,rgba(255,255,255,.1) 70%,transparent)" }} />
        </div>
      </section>

      {/* ══ PARTNER TRACKS ══ */}
      <section className="section section-white" id="partner-tracks">
        <div className="section-inner">
          <div className="tracks-section-header sr">
            <div className="eyebrow">Find your fit</div>
            <h2 className="sec-title">Five tracks. One goal.</h2>
            <p className="sec-sub">Every partnership looks different. Find the track that matches how you work and what your clients need.</p>
          </div>
          <div className="tracks-grid">
            {TRACKS.map((track, i) => (
              <TrackCard
                key={track.title}
                track={track}
                expanded={expanded === i}
                onToggle={() => setExpanded((prev) => (prev === i ? null : i))}
                onApply={() => {
                  setExpanded(null);
                  goApply();
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══ STATS BANNER ══ */}
      <section className="stats-banner">
        <div className="stats-banner-glow" />
        <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div className="sr" style={{ marginBottom: 40 }}>
            <div className="eyebrow" style={{ color: "rgba(255,255,255,0.45)" }}>By the numbers</div>
            <h2 className="sec-title" style={{ color: "#fff", WebkitTextFillColor: "#fff", background: "none" }}>The numbers behind the partnership.</h2>
          </div>
          <div className="stats-row sr">
            {STATS.map(([num, label]) => (
              <div className="stat-block" key={label}>
                <span className="stat-num">{num}</span>
                <span className="stat-label">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WHY PARTNER ══ */}
      <section className="section section-alt">
        <div className="section-inner">
          <div className="section-header-block sr" style={{ marginBottom: 52 }}>
            <div className="eyebrow">Why partner with us</div>
            <h2 className="sec-title">What you get when you partner with us.</h2>
            <p className="sec-sub">Beyond the commercial model — the infrastructure, support, and credibility that make partnerships actually work.</p>
          </div>
          <div className="why-grid">
            {WHY.map((w) => (
              <div className={`why-item sr sr-d${w.delay}`} key={w.title}>
                <div className="why-icon">{w.icon}</div>
                <div className="why-body">
                  <h4>{w.title}</h4>
                  <p>{w.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ HOW IT WORKS ══ */}
      <div className="rgb-divider" aria-hidden="true" />

      <section className="section section-white">
        <div className="section-inner">
          <div className="section-header-block sr" style={{ marginBottom: 56 }}>
            <div className="eyebrow">How it works</div>
            <h2 className="sec-title">From application to first deal.</h2>
            <p className="sec-sub">We&rsquo;ve made the onboarding process as clean as the product.</p>
          </div>
          <div className="process-row sr">
            {PROCESS.map(([num, title, body]) => (
              <div className="process-step" key={num}>
                <div className="process-num">{num}</div>
                <h4>{title}</h4>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="partner-cta" id="contact">
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,#0f0c29 0%,#1a1260 40%,#261d6b 70%,#1e1050 100%)" }} />
          <div style={{ position: "absolute", bottom: "-10%", right: "-5%", width: "50%", height: "80%", background: "radial-gradient(ellipse at 80% 80%, rgba(245,166,35,.22) 0%, transparent 60%)" }} />
          <div style={{ position: "absolute", top: "-10%", left: "-5%", width: "55%", height: "75%", background: "radial-gradient(ellipse at 20% 20%, rgba(99,32,224,.38) 0%, transparent 60%)" }} />
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,.06) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        </div>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 52, overflow: "hidden", pointerEvents: "none" }}>
          <svg viewBox="0 0 1440 52" preserveAspectRatio="none" style={{ position: "absolute", top: 0, left: 0, width: "200%", height: "100%", animation: "pp-waveSlide 9s linear infinite" }}>
            <path d="M0,26 C200,8 400,44 600,26 C800,8 1000,44 1200,26 C1360,12 1440,36 1440,26 L1440,0 L0,0 Z" fill="rgba(99,32,224,.15)" />
            <path d="M0,36 C180,12 380,52 580,32 C780,12 980,48 1180,28 C1340,14 1440,38 1440,36 L1440,0 L0,0 Z" fill="rgba(130,80,230,.09)" />
          </svg>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg,transparent,rgba(139,92,246,.45) 30%,rgba(139,92,246,.45) 70%,transparent)" }} />
        </div>
        <div style={{ position: "relative", zIndex: 1 }}>
          <div className="cta-inner sr">
            <div className="cta-live-badge">
              <span className="cta-live-dot" />
              <span>Applications open now</span>
            </div>
            <div className="cta-title">Become a Partner.</div>
            <p className="cta-sub">
              We&rsquo;re selective about who we partner with &mdash; because being selective is how we stay good. If you&rsquo;re serious about transforming procurement for your clients, we&rsquo;d like to talk.
            </p>
            <div className="cta-actions">
              <a href="#" className="btn-cta-primary" onClick={(e) => { e.preventDefault(); goApply(); }}>
                Apply to Partner &rarr;
              </a>
            </div>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 52, overflow: "hidden", pointerEvents: "none" }}>
          <svg viewBox="0 0 1440 52" preserveAspectRatio="none" style={{ position: "absolute", bottom: 0, left: 0, width: "200%", height: "100%", animation: "pp-waveSlide 10s linear infinite" }}>
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
   PAGE STYLES — every selector scoped under .partners-page so it
   cannot leak into other routes. Keyframes are prefixed `pp-`.
═══════════════════════════════════════════════════════════ */
const PARTNERS_CSS = `
.partners-page{
  --f-t:var(--ft); --f-b:var(--fb); --f-m:var(--fm);
  --bg-v:linear-gradient(140deg,#14104A 0%,#1E1660 40%,#261d6b 70%,#1a1258 100%);
  --cta-start:#E8920A; --cta-end:#F5B020;
  background:#fff; color:var(--t1);
}
.partners-page h1,.partners-page h2,.partners-page h3,.partners-page h4{font-family:var(--f-t)}
.partners-page a{text-decoration:none}

@keyframes pp-fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes pp-scrollTracks{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
@keyframes pp-waveSlide{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@keyframes pp-livePulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.3);opacity:.7}}

/* ── Scroll reveal ── */
.partners-page .sr{opacity:0;transform:translateY(24px);transition:opacity .65s ease,transform .65s ease}
.partners-page .sr.visible{opacity:1;transform:translateY(0)}
.partners-page .sr-d1.visible{transition-delay:.1s}
.partners-page .sr-d2.visible{transition-delay:.2s}
.partners-page .sr-d3.visible{transition-delay:.3s}
.partners-page .sr-d4.visible{transition-delay:.4s}
.partners-page .sr-d5.visible{transition-delay:.5s}

/* ── Hero ── */
.partners-page .hero{
  min-height:100vh; background:var(--bg-v);
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  padding:100px 48px 80px; position:relative;overflow:hidden;text-align:center;
}
.partners-page .hero-inner{position:relative;z-index:2;max-width:820px;margin:0 auto;}
.partners-page .hero h1{
  font-size:clamp(38px,6vw,68px);font-weight:800;letter-spacing:-.04em;line-height:1.04;margin-bottom:24px;
  background:linear-gradient(95deg,rgb(255,255,255) 0%,rgb(255,255,255) 30%,rgb(245,208,96) 62%,rgb(245,166,35) 100%);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
  animation:pp-fadeUp .85s .08s ease both;
}
.partners-page .hero-sub{font-size:18px;line-height:1.75;color:rgba(255,255,255,.52);max-width:640px;margin:0 auto 40px;font-family:var(--f-b);animation:pp-fadeUp .85s .16s ease both;}
.partners-page .hero-ctas{display:flex;gap:12px;justify-content:center;align-items:center;flex-wrap:wrap;animation:pp-fadeUp .85s .24s ease both;}
.partners-page .btn-primary{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,#E8920A,#F5B020);color:#fff;border:none;border-radius:10px;padding:14px 30px;font-size:15px;font-weight:600;cursor:pointer;font-family:var(--f-b);box-shadow:0 6px 32px rgba(232,150,10,.52);transition:transform .2s,box-shadow .2s}
.partners-page .btn-primary:hover{opacity:.9;transform:translateY(-2px);box-shadow:0 8px 24px rgba(217,119,6,.45)}
.partners-page .hero-text-link{font-family:var(--f-b);font-size:15px;font-weight:500;color:rgba(255,255,255,.72);display:inline-flex;align-items:center;gap:6px;transition:color .2s;background:none;border:none;padding:0;cursor:pointer}
.partners-page .hero-text-link:hover{color:#fff}

.partners-page .hero-tracks-scroll{position:relative;z-index:2;margin-top:56px;width:calc(100% + 96px);margin-left:-48px;margin-right:-48px;overflow:hidden;animation:pp-fadeUp .85s .32s ease both;}
.partners-page .hero-tracks-inner{display:flex;gap:12px;animation:pp-scrollTracks 40s linear infinite;width:max-content;}
.partners-page .hero-track-tag{display:inline-flex;align-items:center;gap:9px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.14);border-radius:32px;padding:11px 22px;white-space:nowrap;font-family:var(--f-b);font-size:14px;font-weight:600;color:rgba(255,255,255,.7);letter-spacing:.01em;}
.partners-page .hero-track-tag span{width:8px;height:8px;border-radius:50%;flex-shrink:0;}

/* ── Section shell ── */
.partners-page .section{padding:88px 48px;}
.partners-page .section-inner{max-width:1100px;margin:0 auto;}
.partners-page .section-alt{background:var(--p25);}
.partners-page .section-white{background:#fff;}

.partners-page .eyebrow{display:flex;align-items:center;gap:8px;font-family:var(--f-b);font-size:11px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--p500);margin-bottom:16px;}
.partners-page .eyebrow::before{content:'';width:20px;height:2px;flex-shrink:0;border-radius:2px;background:linear-gradient(90deg,rgb(99,32,224),rgb(238,157,17));}
.partners-page .sec-title{font-family:var(--f-t);font-size:clamp(28px,3.5vw,42px);font-weight:800;letter-spacing:-.035em;line-height:1.1;color:var(--p700);margin-bottom:14px;}
.partners-page .sec-sub{font-size:15.5px;line-height:1.75;color:var(--t3);font-family:var(--f-b);max-width:580px;}

.partners-page .tracks-section-header{margin-bottom:48px;}
.partners-page .tracks-section-header .sec-title{font-size:clamp(32px,4vw,48px);color:var(--t1);background:none;-webkit-text-fill-color:var(--t1);margin-bottom:12px;}
.partners-page .tracks-section-header .sec-sub{max-width:480px;color:var(--t3);}
.partners-page .section-header-block{margin-bottom:40px;}
.partners-page .section-header-block .sec-title{color:var(--t1);background:none;-webkit-text-fill-color:var(--t1);}
.partners-page .section-header-block .sec-sub{max-width:480px;color:var(--t3);}

/* ── Partner track cards ── */
.partners-page .tracks-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:52px;}
.partners-page .track-card{
  background:#fff;border:1.5px solid var(--bd);border-top:3px solid var(--track-color,#6320E0);
  border-radius:20px;padding:28px;position:relative;overflow:visible;display:flex;flex-direction:column;
  transition:transform .3s cubic-bezier(.22,1,.36,1),box-shadow .3s ease,border-color .25s ease,border-radius .45s cubic-bezier(.22,1,.36,1);
  cursor:default;
}
.partners-page .track-card:hover{transform:translateY(-6px);box-shadow:0 24px 56px rgba(15,13,46,.10),0 8px 20px rgba(15,13,46,.06);border-color:var(--track-color-faint,rgba(99,32,224,.2));border-top-color:var(--track-color,#6320E0);}
.partners-page .track-icon{width:48px;height:48px;border-radius:14px;background:var(--track-color-bg,rgba(99,32,224,.08));border:1.5px solid var(--track-color-border,rgba(99,32,224,.15));display:flex;align-items:center;justify-content:center;margin-bottom:18px;color:var(--track-color,#6320E0);}
.partners-page .track-icon svg{width:22px;height:22px;}
.partners-page .track-badge{display:inline-flex;align-self:flex-start;font-size:9.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;padding:3px 9px;border-radius:6px;background:var(--track-color-bg,rgba(99,32,224,.08));color:var(--track-color,#6320E0);margin-bottom:12px;font-family:var(--f-b);}
.partners-page .track-title{font-family:var(--f-t);font-size:17px;font-weight:800;color:var(--p700);letter-spacing:-.02em;line-height:1.2;margin-bottom:6px;}
.partners-page .track-headline{font-family:var(--f-b);font-size:12.5px;font-weight:600;color:var(--track-color,#6320E0);margin-bottom:12px;}
.partners-page .track-desc{font-size:13.5px;line-height:1.72;color:var(--t2);font-family:var(--f-b);margin-bottom:20px;}
.partners-page .track-perks{display:flex;flex-direction:column;gap:9px;margin-bottom:22px;}
.partners-page .track-perk{display:flex;align-items:flex-start;gap:9px;font-size:12.5px;color:var(--t2);font-family:var(--f-b);}
.partners-page .track-perk-dot{width:5px;height:5px;border-radius:50%;background:var(--track-color,#6320E0);flex-shrink:0;margin-top:6px;opacity:.7;}
.partners-page .track-perk strong{color:var(--t1);font-weight:600;}
.partners-page .track-cta{display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:700;color:var(--track-color,#6320E0);font-family:var(--f-b);text-decoration:none;transition:gap .2s ease;cursor:pointer;}
.partners-page .track-cta:hover{gap:10px;}
.partners-page .track-cta svg{width:14px;height:14px;flex-shrink:0;}
.partners-page .tracks-grid .track-card:nth-child(4){grid-column:1;}
.partners-page .tracks-grid .track-card:nth-child(5){grid-column:2;}

/* Track card expand/collapse — absolute panel below card */
.partners-page .track-expandable{
  position:absolute;top:calc(100% - 20px);left:-1.5px;right:-1.5px;background:#fff;
  border:1.5px solid var(--track-color-faint,rgba(99,32,224,.15));border-top:none;border-radius:0 0 20px 20px;
  padding:0 28px;max-height:0;overflow:hidden;z-index:100;
  box-shadow:0 16px 40px rgba(15,13,46,.14),0 4px 12px rgba(15,13,46,.08);
  transition:max-height .45s cubic-bezier(.22,1,.36,1),padding .45s cubic-bezier(.22,1,.36,1);
}
.partners-page .track-card.expanded{z-index:99;border-radius:20px 20px 0 0;border-color:var(--track-color-faint,rgba(99,32,224,.15));}
.partners-page .track-card.expanded .track-toggle{margin-top:16px;padding-top:0;}
.partners-page .track-card.expanded .track-expandable{max-height:700px;padding:8px 28px 28px;}
.partners-page .track-toggle{display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:700;color:var(--track-color,#6320E0);font-family:var(--f-b);cursor:pointer;background:none;border:none;padding:0;margin-top:auto;padding-top:14px;transition:gap .2s;outline:none;}
.partners-page .track-toggle:hover{gap:10px;}
.partners-page .track-toggle-icon{display:inline-flex;width:14px;height:14px;flex-shrink:0;transition:transform .35s cubic-bezier(.22,1,.36,1);}
.partners-page .track-toggle-icon svg{width:14px;height:14px;}
.partners-page .track-card.expanded .track-toggle-icon{transform:rotate(90deg);}

/* ── Stats banner ── */
.partners-page .stats-banner{background:linear-gradient(140deg,#14104A 0%,#1E1660 40%,#261d6b 70%,#1a1258 100%);padding:72px 48px;position:relative;overflow:hidden;}
.partners-page .stats-banner-glow{position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse 60% 80% at 50% 0%,rgba(139,92,246,.18) 0%,transparent 70%);}
.partners-page .stats-row{display:flex;align-items:center;justify-content:center;gap:0;max-width:900px;margin:0 auto;}
.partners-page .stat-block{flex:1;text-align:center;padding:24px 32px;border-right:1px solid rgba(255,255,255,.08);}
.partners-page .stat-block:last-child{border-right:none;}
.partners-page .stat-num{font-family:var(--f-t);font-size:clamp(32px,4.5vw,48px);font-weight:800;line-height:1;background:linear-gradient(135deg,#fff 30%,var(--g300) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px;display:block;}
.partners-page .stat-label{font-family:var(--f-b);font-size:11px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.38);display:block;line-height:1.5;}

/* ── Why partner ── */
.partners-page .why-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:48px;}
.partners-page .why-item{display:flex;align-items:flex-start;gap:20px;padding:28px;background:#fff;border:1.5px solid var(--bd);border-radius:16px;transition:border-color .25s,box-shadow .25s;}
.partners-page .why-item:hover{border-color:rgba(99,32,224,.2);box-shadow:0 6px 20px rgba(15,13,46,.07);}
.partners-page .why-icon{width:42px;height:42px;border-radius:12px;flex-shrink:0;background:rgba(99,32,224,.07);border:1px solid rgba(99,32,224,.14);display:flex;align-items:center;justify-content:center;color:var(--p400);}
.partners-page .why-icon svg{width:20px;height:20px;}
.partners-page .why-body h4{font-family:var(--f-t);font-size:14.5px;font-weight:700;color:var(--p700);margin-bottom:5px;}
.partners-page .why-body p{font-size:13.5px;line-height:1.68;color:var(--t2);font-family:var(--f-b);}

/* ── Process timeline ── */
.partners-page .rgb-divider{height:3px;width:100%;background:linear-gradient(90deg,var(--p500),var(--p300),#F59E0B);display:block;}
.partners-page .process-row{display:grid;grid-template-columns:repeat(4,1fr);gap:0;margin-top:52px;position:relative;}
.partners-page .process-row::before{content:'';position:absolute;top:28px;left:12.5%;right:12.5%;height:1.5px;background:linear-gradient(90deg,var(--p100),var(--p300),var(--p100));z-index:0;}
.partners-page .process-step{display:flex;flex-direction:column;align-items:center;text-align:center;padding:0 16px;position:relative;z-index:1;}
.partners-page .process-num{width:56px;height:56px;border-radius:50%;background:#fff;border:2px solid var(--p100);display:flex;align-items:center;justify-content:center;font-family:var(--f-m);font-size:16px;font-weight:600;color:var(--p400);margin-bottom:18px;box-shadow:0 2px 12px rgba(99,32,224,.1);transition:border-color .3s,background .3s,color .3s;}
.partners-page .process-step:hover .process-num{background:var(--p600);color:#fff;border-color:var(--p600);}
.partners-page .process-step h4{font-family:var(--f-t);font-size:14px;font-weight:700;color:var(--p700);margin-bottom:8px;}
.partners-page .process-step p{font-size:12.5px;line-height:1.65;color:var(--t2);font-family:var(--f-b);}

/* ── CTA ── */
.partners-page .partner-cta{background:#0f0c29;padding:clamp(72px,9vh,110px) 5vw;text-align:center;position:relative;overflow:hidden;}
.partners-page .cta-inner{max-width:640px;margin:0 auto;position:relative;z-index:1;}
.partners-page .cta-title{font-size:clamp(28px,4.5vw,48px);font-weight:800;letter-spacing:-.035em;line-height:1.1;color:#fff;margin-bottom:16px;}
.partners-page .cta-sub{font-size:16px;color:rgba(255,255,255,.52);max-width:460px;margin:0 auto 44px;line-height:1.7;font-family:var(--f-b);}
.partners-page .cta-actions{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;}
.partners-page .cta-live-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(245,166,35,.12);border:1px solid rgba(245,166,35,.3);border-radius:100px;padding:6px 18px;margin-bottom:28px;font-family:var(--f-b);font-size:12px;font-weight:600;color:#F5D060;letter-spacing:.04em;}
.partners-page .cta-live-dot{width:7px;height:7px;border-radius:50%;background:#F5A623;flex-shrink:0;box-shadow:0 0 8px rgba(245,166,35,.8);animation:pp-livePulse 2.4s ease-in-out infinite;}
.partners-page .btn-cta-primary{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,#E8920A,#F5B020);color:#fff;border:none;border-radius:10px;padding:14px 32px;font-family:var(--f-b);font-size:15px;font-weight:700;cursor:pointer;text-decoration:none;box-shadow:0 6px 32px rgba(232,150,10,.52);transition:opacity .2s,transform .2s;}
.partners-page .btn-cta-primary:hover{opacity:.9;transform:translateY(-2px);}

/* ── Responsive ── */
@media(max-width:960px){
  .partners-page .tracks-grid{grid-template-columns:1fr 1fr;}
  .partners-page .tracks-grid .track-card:nth-child(4),
  .partners-page .tracks-grid .track-card:nth-child(5){grid-column:auto;}
  .partners-page .why-grid{grid-template-columns:1fr;}
  .partners-page .stats-row{flex-direction:column;}
  .partners-page .stat-block{border-right:none;border-bottom:1px solid rgba(255,255,255,.08);}
  .partners-page .process-row{grid-template-columns:1fr 1fr;gap:24px;}
  .partners-page .process-row::before{display:none;}
}
@media(max-width:640px){
  .partners-page .tracks-grid{grid-template-columns:1fr;}
  .partners-page .section{padding:56px 24px;}
  .partners-page .hero{padding:80px 24px 72px;}
}
`;
