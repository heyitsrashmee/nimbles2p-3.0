"use client";

import { useEffect, useRef, useState } from "react";
import { Nav } from "@/components/layout/SiteNav";
import { VDDFooter } from "@/components/layout/VDDFooter";
import { useWidth, useReveal, Eyebrow } from "@/components/shared/pageUi";
import ProductPageBottomCta from "@/components/shared/ProductPageBottomCta";

/* ═══════════════════════════════════════════════════════════
   Partners page
   Structure: hero → three-step program (timeline + visual) →
   platform modules → FAQs → bottom CTA. Nav, footer, FAQ and CTA reuse the
   shared product-page patterns; page CSS is scoped under
   .partners-page.
═══════════════════════════════════════════════════════════ */

const STEPS = [
  {
    title: "Connect Your Customers To Smarter Source-to-Pay",
    desc: "Bring NimbleS2P into the conversations you are already having with finance and procurement leaders. We give you the positioning, demos and enablement to make the introduction count.",
    bullets: [
      "Joint discovery and demo support from our team",
      "Ready-to-use messaging for procurement and finance buyers",
      "A named partner manager from day one",
    ],
    visual: "connect",
  },
  {
    title: "Build And Deliver Together",
    desc: "Integrate with NimbleS2P or implement it alongside your own services. Our platform is built to sit on top of the ERP and finance systems enterprises already run.",
    bullets: [
      "Integration guidance for ERP and finance systems",
      "Implementation playbooks and technical enablement",
      "Shared delivery plans for faster go-live",
    ],
    visual: "deliver",
  },
  {
    title: "Grow Revenue As The Platform Scales",
    desc: "As your customers expand across supplier due diligence, invoice processing, RFx and early financing, the value of the relationship grows with them.",
    bullets: [
      "Co-selling across the full source-to-pay suite",
      "Joint account planning and pipeline reviews",
      "Visibility into customer outcomes and adoption",
    ],
    visual: "grow",
  },
];

/* Platform modules partners take to market (copy from web.nimbles2p.com). */
const MODULES = [
  {
    icon: "🛡️",
    title: "Compliance That Never Sleeps",
    desc: "Automated statutory, financial, GST, MCA, PAN, legal and risk checks across 50+ real-time parameters, with continuous monitoring and a full audit trail.",
    pills: [["✅", "50+ Real-Time Parameters"], ["🔔", "Expiry Alerts"], ["🧾", "Full Audit Trail"]],
  },
  {
    icon: "🌐",
    title: "One Digital Window For Suppliers",
    desc: "A supplier portal for POs, GRNs, invoices, payments and queries on web and mobile, with automated follow-ups. Suppliers master it in hours.",
    pills: [["📱", "Web & Mobile"], ["💬", "Automated Follow-Ups"], ["⚡", "Mastered In Hours"]],
  },
  {
    icon: "🧾",
    title: "Invoice Processing At Lightning Speed",
    desc: "AI OCR, agentic 3-way matching, instant approvals, duplicate detection and audit logs, built for accuracy at scale.",
    pills: [["🔍", "AI OCR"], ["🔗", "Agentic 3-Way Matching"], ["📉", "60% Cut In Cycle Time"]],
  },
  {
    icon: "📋",
    title: "Smarter RFQs",
    desc: "Create and publish RFQs, let AI follow up with suppliers, and compare and score responses without manual chasing.",
    pills: [["📤", "RFQ Creation & Publishing"], ["🤖", "AI-Powered Follow-Ups"], ["⚖️", "Comparison & Scoring"]],
  },
  {
    icon: "📊",
    title: "Spend, X-Rayed",
    desc: "Real-time dashboards, category and cost-centre insights, compliance-linked spend and anomaly detection.",
    pills: [["📈", "Real-Time Dashboards"], ["🗂️", "Category Insights"], ["🚨", "Anomaly Detection"]],
  },
  {
    icon: "🤖",
    title: "AI Agents That Work Like Assistants",
    desc: "Vendor Scoring, 3-Way Matching, Follow-Up, Data Cleanup and Query Resolution agents working across the platform.",
    pills: [["⭐", "Vendor Scoring"], ["🔗", "3-Way Matching"], ["🧹", "Data Cleanup"]],
  },
];

const FAQS = [
  {
    q: "Who can become a NimbleS2P partner?",
    a: "Technology and ERP vendors, banks and financing providers, consulting and implementation firms, and referral partners who work with finance, procurement and supply chain teams.",
  },
  {
    q: "What does the partnership involve?",
    a: "It depends on the partner type. Technology partners focus on integration, implementation partners on delivery and enablement, and channel partners on co-selling and referrals. We agree a clear plan together before we start.",
  },
  {
    q: "Do I need technical integration to partner with NimbleS2P?",
    a: "No. Referral and consulting partners can work with us without building an integration. Technology partners get integration guidance from our team.",
  },
  {
    q: "What support do partners receive?",
    a: "Product training, demo support, sales and delivery enablement, and a named partner manager to help with joint accounts.",
  },
  {
    q: "How do I get started?",
    a: "Reach out through the Become a Partner button on this page. Our team will understand your business and customer base, and walk you through the right programme.",
  },
];

/* ── Step visuals (CSS illustrations in the platform palette) ── */
function StepVisual({ kind }) {
  if (kind === "connect") {
    return (
      <div className="pt-visual">
        <div className="pt-vcard">
          <div className="pt-vcard-title">Partner introductions</div>
          {[
            ["Enterprise finance team", "Intro scheduled"],
            ["Procurement leadership", "Demo booked"],
            ["Shared services group", "Discovery call"],
          ].map(([a, b]) => (
            <div className="pt-vrow" key={a}>
              <span className="pt-vdot" />
              <span className="pt-vrow-main">{a}</span>
              <span className="pt-vrow-tag">{b}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (kind === "deliver") {
    return (
      <div className="pt-visual">
        <div className="pt-vcard">
          <div className="pt-vcard-title">Implementation plan</div>
          {[
            ["ERP integration", 92],
            ["Supplier onboarding", 74],
            ["Go-live readiness", 58],
          ].map(([a, p]) => (
            <div className="pt-vbar" key={a}>
              <div className="pt-vbar-head">
                <span>{a}</span>
                <span>{p}%</span>
              </div>
              <div className="pt-vbar-track">
                <div className="pt-vbar-fill" style={{ width: `${p}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="pt-visual">
      <div className="pt-vcard">
        <div className="pt-vcard-title">Suite adoption</div>
        {[
          ["Supplier Due Diligence", "Live"],
          ["Invoice Processing", "Live"],
          ["RFx Management", "Rolling out"],
          ["Early Financing", "Planned"],
        ].map(([a, b]) => (
          <div className="pt-vrow" key={a}>
            <span className="pt-vdot" />
            <span className="pt-vrow-main">{a}</span>
            <span className="pt-vrow-tag">{b}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ModulesSection() {
  const w = useWidth();
  const isMobile = w < 640;
  const [active, setActive] = useState(0);
  const ag = MODULES[active];
  const ref = useReveal();
  return (
    <section style={{ background: "linear-gradient(160deg,#0F0C2A 0%,#1a1260 45%,#221868 100%)", position: "relative", overflow: "hidden", padding: isMobile ? "64px 20px" : "clamp(64px,9vh,104px) 5vw" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "radial-gradient(rgba(255,255,255,.04) 1px,transparent 1px)", backgroundSize: "26px 26px" }} />
      <div style={{ position: "absolute", top: 0, right: "10%", width: "40%", height: "60%", background: "radial-gradient(ellipse,rgba(99,32,224,.2) 0%,transparent 65%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 0, left: "5%", width: "35%", height: "50%", background: "radial-gradient(ellipse,rgba(245,166,35,.08) 0%,transparent 65%)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1080, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div className="reveal" ref={ref}>
          <div style={{ marginBottom: isMobile ? 36 : 52 }}>
            <Eyebrow dark>The Platform</Eyebrow>
            <h2 style={{ fontFamily: "var(--fb)", fontSize: isMobile ? "clamp(24px,6vw,34px)" : "clamp(28px,3.5vw,46px)", fontWeight: 900, letterSpacing: "-.04em", lineHeight: 1.1, background: "linear-gradient(95deg,#fff 0%,#fff 30%,#F5D060 62%,#F5A623 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", paddingBottom: "0.12em", marginBottom: 14 }}>
              All Modules. One Intelligent Platform.<br />Zero Chaos.
            </h2>
            <p style={{ fontSize: isMobile ? 14.5 : 16, color: "rgba(255,255,255,.45)", lineHeight: 1.72, fontFamily: "var(--fb)", maxWidth: 520 }}>
              Everything your customers need across compliance, suppliers, invoices, sourcing and spend &mdash; ready to take to market together.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : w < 900 ? "repeat(2,1fr)" : "repeat(3,1fr)", gap: 12, marginBottom: 20 }}>
            {MODULES.map((a, i) => {
              const isAct = active === i;
              return (
                <div key={a.title} onClick={() => setActive(i)} style={{
                  position: "relative", overflow: "hidden", borderRadius: 18, cursor: "pointer",
                  border: isAct ? "1.5px solid rgba(255,255,255,.7)" : "1.5px solid rgba(255,255,255,.08)",
                  background: isAct ? "rgba(255,255,255,.18)" : "rgba(255,255,255,.04)",
                  padding: isMobile ? "22px 18px" : "28px 24px",
                  backdropFilter: "blur(10px)",
                  transition: "all .25s cubic-bezier(.22,1,.36,1)",
                  boxShadow: isAct ? "0 8px 32px rgba(255,255,255,.15), 0 0 0 1px rgba(255,255,255,.2) inset" : "none",
                  transform: isAct ? "translateY(-2px)" : "none",
                }}
                  onMouseEnter={(e) => { if (!isAct) { e.currentTarget.style.background = "rgba(255,255,255,.10)"; e.currentTarget.style.borderColor = "rgba(255,255,255,.24)"; e.currentTarget.style.transform = "translateY(-2px)"; } }}
                  onMouseLeave={(e) => { if (!isAct) { e.currentTarget.style.background = "rgba(255,255,255,.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,.08)"; e.currentTarget.style.transform = ""; } }}
                >
                  <div style={{ fontSize: 32, marginBottom: 14, lineHeight: 1 }}>{a.icon}</div>
                  <h3 style={{ fontFamily: "var(--fb)", fontSize: isMobile ? 16 : 18, fontWeight: 800, color: "#fff", letterSpacing: "-.025em", lineHeight: 1.2, marginBottom: 8 }}>{a.title}</h3>
                  <p style={{ fontSize: isMobile ? 12.5 : 13.5, color: isAct ? "rgba(255,255,255,.8)" : "rgba(255,255,255,.42)", lineHeight: 1.6, fontFamily: "var(--fb)", margin: 0, transition: "color .25s" }}>{a.desc}</p>
                  {isAct && <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg,rgba(255,255,255,.9),rgba(255,255,255,.4),transparent)" }} />}
                </div>
              );
            })}
          </div>

          <div style={{ background: "rgba(255,255,255,.12)", border: "1.5px solid rgba(255,255,255,.35)", borderRadius: 14, padding: isMobile ? "18px 16px" : "20px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 14, backdropFilter: "blur(12px)", boxShadow: "0 4px 24px rgba(255,255,255,.08)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
              <div style={{ width: 38, height: 38, borderRadius: 11, background: "rgba(255,255,255,.2)", border: "1.5px solid rgba(255,255,255,.4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{ag.icon}</div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,.6)", fontFamily: "var(--fb)", letterSpacing: ".06em", textTransform: "uppercase", marginBottom: 2 }}>Active Module</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", fontFamily: "var(--fb)", letterSpacing: "-.02em" }}>{ag.title}</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {ag.pills.map(([icon, label]) => (
                <span key={label} style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "rgba(255,255,255,.15)", border: "1.5px solid rgba(255,255,255,.4)", borderRadius: 100, padding: "6px 14px", fontSize: 12.5, fontWeight: 700, color: "#fff", fontFamily: "var(--fb)", letterSpacing: "-.01em" }}>{icon} {label}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqItem({ f, isOpen, onToggle, isMobile }) {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);
  useEffect(() => {
    if (contentRef.current) setHeight(isOpen ? contentRef.current.scrollHeight : 0);
  }, [isOpen]);
  return (
    <div style={{ borderBottom: "1px solid #F1F5F9", overflow: "hidden" }}>
      <button
        onClick={onToggle}
        style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "22px 0", background: "transparent", border: "none", cursor: "pointer", textAlign: "left" }}
      >
        <span style={{ fontFamily: "var(--fb)", fontSize: isMobile ? 15 : 17, fontWeight: 700, color: "#0F172A", letterSpacing: "-.01em", lineHeight: 1.3 }}>{f.q}</span>
        <div style={{ width: 32, height: 32, borderRadius: "50%", background: isOpen ? "var(--p500)" : "#F1F5F9", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all .25s cubic-bezier(.22,1,.36,1)" }}>
          <span style={{ fontSize: 18, color: isOpen ? "#fff" : "var(--p500)", fontWeight: 300, lineHeight: 1, transition: "transform .25s cubic-bezier(.22,1,.36,1)", transform: isOpen ? "rotate(45deg)" : "none", display: "inline-block" }}>+</span>
        </div>
      </button>
      <div ref={contentRef} style={{ height: `${height}px`, overflow: "hidden", transition: "height .38s cubic-bezier(.22,1,.36,1)" }}>
        <p style={{ paddingBottom: 24, fontSize: 15, color: "#64748B", lineHeight: 1.8, fontFamily: "var(--fb)" }}>{f.a}</p>
      </div>
    </div>
  );
}

function PartnerFaqs({ onNavigate }) {
  const w = useWidth();
  const isMobile = w < 640;
  const [open, setOpen] = useState(0);
  const ref = useReveal();
  return (
    <section style={{ background: "#fff", position: "relative", overflow: "hidden", padding: isMobile ? "64px 20px" : "clamp(64px,9vh,104px) 5vw" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg,var(--p500),var(--p300),#F59E0B)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1040, margin: "0 auto" }}>
        <div className="reveal" ref={ref} style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1.5fr", gap: isMobile ? 36 : 64, alignItems: "start" }}>
          <div>
            <Eyebrow>FAQs</Eyebrow>
            <h2 style={{ fontFamily: "var(--fb)", fontSize: isMobile ? "clamp(24px,6vw,32px)" : "clamp(26px,3vw,38px)", fontWeight: 700, letterSpacing: "-.04em", lineHeight: 1.08, color: "#0F172A", marginBottom: 16 }}>
              Questions<br />we get asked.
            </h2>
            <p style={{ fontSize: 15, color: "#64748B", lineHeight: 1.7, fontFamily: "var(--fb)", marginBottom: 28 }}>Everything about partnering with NimbleS2P, answered clearly.</p>
            <a
              href="/demo"
              onClick={(e) => {
                e.preventDefault();
                if (typeof onNavigate === "function") onNavigate("demo");
              }}
              style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 600, color: "var(--p700)", fontFamily: "var(--fb)", textDecoration: "none", borderBottom: "1.5px solid var(--p200)", paddingBottom: 2 }}
            >Talk to our team →</a>
          </div>
          <div style={{ borderTop: "1px solid #E2E8F0" }}>
            {FAQS.map((f, i) => (
              <FaqItem key={f.q} f={f} isOpen={open === i} onToggle={() => setOpen(open === i ? null : i)} isMobile={isMobile} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function PartnersPage({ onBack, onNavigate }) {
  const rootRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
    <div className="partners-page" ref={rootRef}>
      <style dangerouslySetInnerHTML={{ __html: PARTNERS_CSS }} />

      <Nav onNavigate={onNavigate} onBack={onBack} pageName="Partners" />

      <main>
        {/* ══ HERO ══ */}
        <section className="pt-hero">
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(140deg,#14104A 0%,#1E1660 40%,#261d6b 70%,#1a1258 100%)" }} />
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 90% 70% at 50% 35%, rgba(99,32,224,.32) 0%, transparent 65%)" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "50%", background: "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(245,166,35,.08) 0%, transparent 70%)" }} />
            <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,.04) 1px,transparent 1px)", backgroundSize: "30px 30px" }} />
          </div>

          <div className="pt-hero-inner">
            <h1>
              Your Next Growth
              <br />
              Opportunity Starts Here.
            </h1>
            <p>
              You’ve already built the relationships. Now imagine what they could be worth. As enterprises invest in <strong>AI, e-invoicing and compliance mandates</strong>, the demand for solutions like NimbleS2P is growing. You bring the relationships. We bring the technology and expertise. Together, we can turn your existing network into enterprise opportunities worth <strong>upto ₹2 crore</strong>.
            </p>
            <div className="pt-hero-btns">
              <a href="/demo" className="pt-btn-primary" onClick={(e) => { e.preventDefault(); goDemo(); }}>
                Become a Partner &rarr;
              </a>
              <a href="#program" className="pt-btn-ghost">Explore the Programme &darr;</a>
            </div>
            <div className="pt-hero-pills">
              <span>Zero Product Development Cost</span>
              <span>Enterprise-Trusted SaaS Platform</span>
              <span>Faster Go-to-Market in Enterprise Segment</span>
            </div>
          </div>

          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 52, overflow: "hidden", pointerEvents: "none" }}>
            <svg viewBox="0 0 1440 52" preserveAspectRatio="none" style={{ position: "absolute", bottom: 0, left: 0, width: "200%", height: "100%", animation: "waveSlide 10s linear infinite" }}>
              <path d="M0,26 C200,8 400,44 600,26 C800,8 1000,42 1200,26 C1360,12 1440,34 1440,26 L1440,52 L0,52 Z" fill="rgba(99,32,224,.12)" />
              <path d="M0,36 C180,14 380,50 580,32 C780,14 980,46 1180,30 C1340,16 1440,38 1440,36 L1440,52 L0,52 Z" fill="rgba(130,80,230,.07)" />
            </svg>
          </div>
        </section>

        <div className="pt-divider" aria-hidden="true" />

        {/* ══ PROGRAMME STEPS ══ */}
        <section className="pt-section" id="program">
          <div className="pt-inner">
            <div className="pt-section-head sr">
              <Eyebrow>How Partnering Works</Eyebrow>
              <h2>
                One Partnership.
                <br />
                Three Ways To Create Value.
              </h2>
            </div>

            <div className="pt-steps">
              {STEPS.map((s, i) => (
                <div className={`pt-step sr${i % 2 ? " pt-step-alt" : ""}`} key={s.title}>
                  <div className="pt-step-text">
                    <div className="pt-step-num">0{i + 1}</div>
                    <h3>{s.title}</h3>
                    <p>{s.desc}</p>
                    <ul>
                      {s.bullets.map((b) => (
                        <li key={b}>
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                            <path d="M2.5 7.5l3 3 6-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <StepVisual kind={s.visual} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ PLATFORM MODULES ══ */}
        <ModulesSection />

        <PartnerFaqs onNavigate={onNavigate} />

        <ProductPageBottomCta
          eyebrow="Partner With Us"
          eyebrowStyle="orange"
          title="Make every vendor transaction compliant, automated and maximized"
          description="Let's explore how NimbleS2P can transform your vendor, sourcing and finance workflows together."
          ctaLabel="Become a Partner →"
          ctaHref="/demo"
        />
      </main>

      <VDDFooter onNavigate={onNavigate} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PAGE STYLES — every selector scoped under .partners-page so it
   cannot leak into other routes.
═══════════════════════════════════════════════════════════ */
const PARTNERS_CSS = `
.partners-page{background:#fff;color:var(--t1);}
.partners-page h1,.partners-page h2,.partners-page h3{font-family:var(--fb);}
.partners-page a{text-decoration:none;}

/* ── Scroll reveal ── */
.partners-page .sr{opacity:0;transform:translateY(22px);transition:opacity .6s ease,transform .6s ease;}
.partners-page .sr.visible{opacity:1;transform:translateY(0);}
.partners-page .sr-d2.visible{transition-delay:.16s;}
.partners-page .sr-d3.visible{transition-delay:.24s;}

/* ── Hero ── */
.partners-page .pt-hero{position:relative;overflow:hidden;min-height:78vh;display:flex;align-items:center;justify-content:center;text-align:center;padding:140px 5vw 100px;background:#14104A;}
.partners-page .pt-hero-inner{position:relative;z-index:2;max-width:860px;width:100%;}
.partners-page .pt-hero h1{font-weight:900;font-size:clamp(34px,4.7vw,62px);line-height:1.08;letter-spacing:-.05em;margin-bottom:22px;padding-bottom:.12em;background:linear-gradient(95deg,#fff 0%,#fff 30%,#F5D060 62%,#F5A623 100%);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;}
.partners-page .pt-hero p{font-family:var(--fb);font-size:18px;line-height:1.75;color:rgba(255,255,255,.52);max-width:800px;margin:0 auto 36px;}
.partners-page .pt-hero p strong{font-weight:700;color:rgba(255,255,255,.9);}
.partners-page .pt-hero-btns{display:flex;gap:18px;justify-content:center;flex-wrap:wrap;align-items:center;margin-bottom:40px;}
.partners-page .pt-btn-primary{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,#E8920A,#F5B020);color:#fff;border-radius:12px;padding:14px 34px;font-size:16px;font-weight:700;font-family:var(--fb);letter-spacing:-.01em;box-shadow:0 6px 32px rgba(232,150,10,.52);transition:transform .2s,box-shadow .2s;}
.partners-page .pt-btn-primary:hover{transform:translateY(-2px);box-shadow:0 10px 36px rgba(232,150,10,.62);}
.partners-page .pt-btn-ghost{font-family:var(--fb);font-size:15px;font-weight:500;color:rgba(255,255,255,.6);transition:color .18s;}
.partners-page .pt-btn-ghost:hover{color:#fff;}
.partners-page .pt-hero-pills{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;}
.partners-page .pt-hero-pills span{font-family:var(--fb);font-size:12.5px;font-weight:600;color:rgba(255,255,255,.7);background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);border-radius:100px;padding:7px 16px;}

.partners-page .pt-divider{height:3px;width:100%;background:linear-gradient(90deg,var(--p500),var(--p300),#F59E0B);display:block;}

/* ── Sections ── */
.partners-page .pt-section{padding:clamp(64px,9vh,104px) 5vw;background:#fff;}
.partners-page .pt-section-tint{background:#F7F8FC;}
.partners-page .pt-inner{max-width:1080px;margin:0 auto;}
.partners-page .pt-section-head{margin-bottom:56px;}
.partners-page .pt-section-head h2{font-size:clamp(26px,3vw,40px);font-weight:900;letter-spacing:-.04em;line-height:1.08;color:#0F172A;margin-bottom:10px;}
.partners-page .pt-section-head p{font-family:var(--fb);font-size:15px;color:#64748B;line-height:1.7;max-width:520px;}

/* ── Steps (timeline + visual) ── */
.partners-page .pt-steps{position:relative;display:flex;flex-direction:column;gap:72px;padding-left:36px;}
.partners-page .pt-steps::before{content:'';position:absolute;left:5px;top:12px;bottom:12px;width:2px;background:linear-gradient(180deg,var(--p500),var(--p300) 60%,#E2E8F0);}
.partners-page .pt-step{position:relative;display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:center;}
.partners-page .pt-step::before{content:'';position:absolute;left:-36px;top:10px;width:12px;height:12px;border-radius:50%;background:var(--p500);box-shadow:0 0 0 4px rgba(99,32,224,.15);}
.partners-page .pt-step-num{font-family:var(--fb);font-size:12px;font-weight:800;letter-spacing:.12em;color:var(--p500);margin-bottom:10px;}
.partners-page .pt-step h3{font-size:clamp(19px,2vw,24px);font-weight:800;letter-spacing:-.03em;line-height:1.2;color:#0F172A;margin-bottom:12px;}
.partners-page .pt-step p{font-family:var(--fb);font-size:15px;color:#64748B;line-height:1.75;margin-bottom:18px;}
.partners-page .pt-step ul{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:10px;}
.partners-page .pt-step li{display:flex;align-items:center;gap:10px;font-family:var(--fb);font-size:14px;color:#334155;}
.partners-page .pt-step li svg{color:var(--p500);flex-shrink:0;}
.partners-page .pt-step-alt .pt-visual{order:-1;}

.partners-page .pt-visual{border-radius:20px;padding:36px;background:linear-gradient(140deg,#14104A 0%,#1E1660 45%,#2d1f80 100%);position:relative;overflow:hidden;}
.partners-page .pt-visual::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 80% 70% at 80% 10%,rgba(245,166,35,.18),transparent 60%),radial-gradient(ellipse 70% 70% at 10% 90%,rgba(99,32,224,.4),transparent 60%);}
.partners-page .pt-vcard{position:relative;background:rgba(255,255,255,.96);border-radius:14px;padding:20px;box-shadow:0 18px 50px rgba(0,0,0,.28);}
.partners-page .pt-vcard-title{font-family:var(--fb);font-size:13px;font-weight:800;color:#0F172A;margin-bottom:14px;}
.partners-page .pt-vrow{display:flex;align-items:center;gap:10px;padding:11px 0;border-top:1px solid #EEF0F6;}
.partners-page .pt-vdot{width:8px;height:8px;border-radius:50%;background:var(--p500);flex-shrink:0;}
.partners-page .pt-vrow-main{font-family:var(--fb);font-size:13px;font-weight:600;color:#334155;flex:1;}
.partners-page .pt-vrow-tag{font-family:var(--fb);font-size:11px;font-weight:700;color:var(--p700);background:#F1ECFD;border-radius:100px;padding:4px 10px;white-space:nowrap;}
.partners-page .pt-vbar{padding:9px 0;}
.partners-page .pt-vbar-head{display:flex;justify-content:space-between;font-family:var(--fb);font-size:13px;font-weight:600;color:#334155;margin-bottom:7px;}
.partners-page .pt-vbar-track{height:8px;border-radius:100px;background:#EEF0F6;overflow:hidden;}
.partners-page .pt-vbar-fill{height:100%;border-radius:100px;background:linear-gradient(90deg,var(--p500),var(--p300));}

/* ── Responsive ── */
@media(max-width:900px){
  .partners-page .pt-step{grid-template-columns:1fr;gap:28px;}
  .partners-page .pt-step-alt .pt-visual{order:0;}
}
@media(max-width:640px){
  .partners-page .pt-hero{padding:116px 20px 80px;min-height:0;}
  .partners-page .pt-hero p{font-size:15px;}
  .partners-page .pt-section{padding:64px 20px;}
  .partners-page .pt-steps{padding-left:28px;gap:56px;}
  .partners-page .pt-step::before{left:-28px;}
  .partners-page .pt-visual{padding:22px;}
}
`;
