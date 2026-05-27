"use client";

import { useEffect, useRef, useState } from "react";
import { Nav } from "@/components/layout/SiteNav";
import { VDDFooter } from "@/components/layout/VDDFooter";
import { TRUST_BADGES_SVG } from "./trustBadgesSvg";

/* ═══════════════════════════════════════════════════════════
   TRUST & SAFETY — security / compliance landing page
   (CHECKPOINT_2 design)
   Nav + Footer reuse the shared homepage components.
   Page-specific styling lives in a scoped (.trust-page) stylesheet;
   keyframes are prefixed `tp-` so nothing leaks into other routes.
═══════════════════════════════════════════════════════════ */

/* ── Security-pillar icons (verbatim from the design) ── */
const ICON_PRODUCT = `<svg viewBox="0 0 24 24" fill="none"><path d="M12 2L4 6v6c0 5.5 3.5 10.6 8 12 4.5-1.4 8-6.5 8-12V6L12 2z" stroke="#0070F2" stroke-width="1.8" fill="rgba(0,112,242,0.08)" stroke-linejoin="round"/><path d="M9 12l2 2 4-4" stroke="#0070F2" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const ICON_DATA = `<svg viewBox="0 0 24 24" fill="none"><ellipse cx="12" cy="5" rx="8" ry="3" stroke="#8B5CF6" stroke-width="1.8" fill="rgba(139,92,246,0.08)"/><path d="M4 5v7c0 1.66 3.58 3 8 3s8-1.34 8-3V5" stroke="#8B5CF6" stroke-width="1.8"/><path d="M4 12v4c0 1.66 3.58 3 8 3s8-1.34 8-3v-4" stroke="#8B5CF6" stroke-width="1.8"/><circle cx="17" cy="17" r="3" fill="#8B5CF6" opacity=".15" stroke="#8B5CF6" stroke-width="1.5"/><path d="M17 16v1l.7.7" stroke="#8B5CF6" stroke-width="1.3" stroke-linecap="round"/></svg>`;
const ICON_NETWORK = `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#10B981" stroke-width="1.8" fill="rgba(16,185,129,0.06)"/><path d="M12 3c-2.5 2-4 5-4 9s1.5 7 4 9M12 3c2.5 2 4 5 4 9s-1.5 7-4 9M3 12h18" stroke="#10B981" stroke-width="1.5" stroke-linecap="round"/><path d="M5 8h14M5 16h14" stroke="#10B981" stroke-width="1.3" stroke-linecap="round" opacity=".6"/></svg>`;
const ICON_APP = `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="3" stroke="#F59E0B" stroke-width="1.8" fill="rgba(245,158,11,0.07)"/><path d="M8 9l3 3-3 3M13 15h3" stroke="#F59E0B" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const ICON_ENDPOINT = `<svg viewBox="0 0 24 24" fill="none"><rect x="2" y="3" width="20" height="13" rx="2" stroke="#EC4899" stroke-width="1.8" fill="rgba(236,72,153,0.07)"/><path d="M8 20h8M12 16v4" stroke="#EC4899" stroke-width="1.8" stroke-linecap="round"/><circle cx="16" cy="8.5" r="2.5" stroke="#EC4899" stroke-width="1.5" fill="rgba(236,72,153,0.12)"/><path d="M15 8.5l.8.8 1.7-1.7" stroke="#EC4899" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const ICON_CORP = `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="7" width="18" height="14" rx="2" stroke="#6366F1" stroke-width="1.8" fill="rgba(99,102,241,0.07)"/><path d="M8 7V5a4 4 0 0 1 8 0v2" stroke="#6366F1" stroke-width="1.8" stroke-linecap="round"/><circle cx="12" cy="14" r="2" fill="#6366F1" opacity=".7"/><path d="M12 16v1.5" stroke="#6366F1" stroke-width="1.8" stroke-linecap="round"/></svg>`;

const POLICY_ICON = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 2h6l3 3v9H4V2z" stroke="rgba(196,181,253,0.7)" stroke-width="1.3" stroke-linejoin="round" fill="rgba(196,181,253,0.1)"/><path d="M10 2v3h3" stroke="rgba(196,181,253,0.45)" stroke-width="1.3"/><path d="M6 8h5M6 11h3" stroke="rgba(196,181,253,0.5)" stroke-width="1.2" stroke-linecap="round"/></svg>`;

/* ── DATA ── */
const PILLARS = [
  {
    cls: "pc-infra", icon: ICON_PRODUCT, delay: 0,
    title: "Product Security",
    desc: "Every release goes through structured reviews and incident awareness protocols. Problems get caught before they become problems.",
    points: ["Production System User Review", "Situational Awareness for Incidents"],
    cat: "Product",
  },
  {
    cls: "pc-compliance", icon: ICON_DATA, delay: 1,
    title: "Data Security",
    desc: "Your data is validated at every entry point, access-restricted by role, and protected behind multi-factor gates. Only the right eyes see the right things.",
    points: ["Identity Validation", "Production DB Access Restriction", "Multi-factor Authentication", "User Privileges Reviews"],
    cat: "Data",
  },
  {
    cls: "pc-access", icon: ICON_NETWORK, delay: 2,
    title: "Network Security",
    desc: "Tightly scoped connections, encrypted transmission paths, and impact analysis mean your data never travels without a bodyguard.",
    points: ["Impact Analysis", "Network Connection Limits", "External System Controls", "Transmission Confidentiality"],
    cat: "Network",
  },
  {
    cls: "pc-defense", icon: ICON_APP, delay: 0,
    title: "App Security",
    desc: "From privacy notices to change approvals, every touchpoint is governed and auditable. No unauthorized modification slips through unnoticed.",
    points: ["Privacy Notice Compliance", "Secure System Modification", "Approval of Changes", "Unauthorized Activity Monitoring"],
    cat: "Application",
  },
  {
    cls: "pc-infra", icon: ICON_ENDPOINT, delay: 1,
    title: "Endpoint Security",
    desc: "Every device touching your procurement data is encrypted, validated, and locked at session level. No device is trusted simply because it’s connected.",
    points: ["Anti-Malware Protection", "Device & Container Encryption", "Endpoint Security Validation", "Session Lock Controls"],
    cat: "Endpoint",
  },
  {
    cls: "pc-compliance", icon: ICON_CORP, delay: 2,
    title: "Corporate Security",
    desc: "Security isn’t just technical — it’s cultural. Our policies, org structure, and training programs make every person at NimbleS2P a line of defence.",
    points: ["Code of Business Conduct", "Organizational Structure", "Roles & Responsibilities", "Competency Screening"],
    cat: "Governance",
  },
];

const POLICIES = [
  "Acceptable Usage Policy",
  "Access Control Policy",
  "Access Control Procedure",
  "Business Continuity Plan",
  "Confidentiality Policy",
  "Data Protection Policy",
  "Disaster Recovery Policy",
];

const FAQS = [
  {
    q: "Can anyone intercept my data?",
    a: (
      <>It&rsquo;s not just password protection &mdash; it&rsquo;s math. We force strong encryption protocols (TLS 1.2 minimum) whenever data moves between your browser and our servers. When it sits still in our databases (AES-256), it&rsquo;s effectively noise to anyone without the specific decryption keys. Even our own database engineers can&rsquo;t just &ldquo;browse&rdquo; your sensitive fields.</>
    ),
  },
  {
    q: "Who on your team has access to my data?",
    a: (
      <>Our internal policy is simple: <strong>Default Deny.</strong> Engineers don&rsquo;t get access to production data unless there is a specific, documented incident requiring it. And even then, it&rsquo;s temporary, logged, and requires Multi-Factor Authentication. We conduct mandatory background checks and regular security training for every employee. No one gets a free pass.</>
    ),
  },
  {
    q: "What happens if a server fails?",
    a: (
      <>We assume things will break. Servers fail. Regions go offline. That&rsquo;s why your data isn&rsquo;t sitting on one box &mdash; it&rsquo;s replicated across multiple availability zones in real-time. If a primary data centre goes dark, the secondary kicks in automatically. You keep working. We handle the panic.</>
    ),
  },
  {
    q: "Do you vet your own vendors?",
    a: (
      <>You use us to manage your vendors, so we&rsquo;d be hypocrites if we didn&rsquo;t manage ours. We maintain a strict sub-processor policy. Any third-party tool we use undergoes a rigorous security review. If they don&rsquo;t meet our standards (SOC 2, ISO, GDPR), they don&rsquo;t touch your data. Period.</>
    ),
  },
];

const TERMINAL_LINES = [
  <><span className="prompt">&gt; </span><span className="cmd">ACCESS REQUEST INCOMING...</span></>,
  <><span className="prompt">&gt; </span><span className="cmd">VERIFYING IDENTITY<span className="term-blink">...</span></span></>,
  <><span className="prompt">&gt; </span><span className="ok">&#10003; MFA VERIFIED</span></>,
  <><span className="prompt">&gt; </span><span className="ok">&#10003; RBAC CHECK PASSED</span></>,
  <><span className="prompt">&gt; </span><span className="ok">&#10003; AUDIT LOG RECORDED</span></>,
  <><span className="prompt">&gt; </span><span className="warn">&#9888; SENSITIVE FIELDS MASKED</span></>,
  <><span className="prompt">&gt; </span><span className="granted">ACCESS: GRANTED</span><span className="term-cursor" /></>,
];

/* ── Animated access-log terminal ── */
function AccessTerminal() {
  const ref = useRef(null);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let timer;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          obs.disconnect();
          let i = 0;
          const tick = () => {
            i += 1;
            setShown(i);
            if (i < TERMINAL_LINES.length) timer = setTimeout(tick, 520);
          };
          timer = setTimeout(tick, 400);
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => { obs.disconnect(); clearTimeout(timer); };
  }, []);

  return (
    <div className="term-block">
      <div className="term-topbar">
        <div className="term-dot" style={{ background: "#FF5F57" }} />
        <div className="term-dot" style={{ background: "#FFBD2E" }} />
        <div className="term-dot" style={{ background: "#28C840" }} />
        <span style={{ marginLeft: 8, fontFamily: "var(--f-m)", fontSize: 11, color: "rgba(255,255,255,.2)" }}>nimbles2p-access-log</span>
      </div>
      <div className="term-lines" ref={ref}>
        {TERMINAL_LINES.map((line, i) => (
          <span
            key={i}
            className="tl"
            style={{
              opacity: i < shown ? 1 : 0,
              transform: i < shown ? "translateY(0)" : "translateY(4px)",
              transition: "opacity .3s ease, transform .3s ease",
            }}
          >
            {line}
          </span>
        ))}
      </div>
      <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,.06)", fontFamily: "var(--f-m)", fontSize: 10, color: "rgba(255,255,255,.2)" }}>
        Session logged &bull; IP verified &bull; Time-limited token issued
      </div>
    </div>
  );
}

/* ── FAQ accordion item ──
   Reveal is driven by React state (not the page-level imperative observer)
   because this element's className also toggles `open`. If reveal were added
   imperatively, React's re-render on toggle would clobber the `.visible`
   class and the item would snap back to opacity:0. */
function FaqItem({ f, delay, isOpen, onToggle }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={`faq-item sr${delay ? ` sr-delay-${delay}` : ""}${visible ? " visible" : ""}${isOpen ? " open" : ""}`}>
      <div className="faq-q" onClick={onToggle}>
        <span className="faq-qtxt">{f.q}</span>
        <div className="faq-toggle"><span className="faq-plus">+</span></div>
      </div>
      <div className="faq-a">
        <div className="faq-a-inner">{f.a}</div>
      </div>
    </div>
  );
}

export default function TrustSafetyPage({ onBack, onNavigate }) {
  const rootRef = useRef(null);
  const [openFaq, setOpenFaq] = useState(null);

  /* Scroll-reveal: add .visible to .sr elements as they enter the viewport */
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
    // FAQ items manage their own reveal (see FaqItem) — excluded here so the
    // imperative .visible isn't clobbered by React re-renders on toggle.
    root.querySelectorAll(".sr:not(.faq-item)").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const goDemo = () => { if (typeof onNavigate === "function") onNavigate("demo"); };

  return (
    <div className="trust-page" ref={rootRef}>
      <style dangerouslySetInnerHTML={{ __html: TRUST_CSS }} />

      <Nav onNavigate={onNavigate} onBack={onBack} pageName="trust" />

      {/* ══ HERO ══ */}
      <section className="hero" id="hero">
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 90% 70% at 50% 35%, rgba(99,32,224,.32) 0%, transparent 65%)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "50%", pointerEvents: "none", background: "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(245,166,35,.09) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "radial-gradient(rgba(255,255,255,.045) 1px,transparent 1px)", backgroundSize: "30px 30px" }} />
        <div style={{ position: "absolute", top: 72, left: 0, right: 0, height: 1, pointerEvents: "none", background: "linear-gradient(90deg,transparent,rgba(255,255,255,.08) 30%,rgba(255,255,255,.08) 70%,transparent)" }} />

        <div style={{ position: "relative", zIndex: 2, width: "100%", textAlign: "center", paddingTop: 48 }}>
          <h1>Enterprise&#8209;grade security.<br />Built for trust.</h1>
          <p className="hero-sub">We process billions in transactions. That responsibility drives everything we build. From the first click to the final audit, your data&rsquo;s safety is the default setting.</p>

          <div className="hero-ctas">
            <a href="#pillars" className="btn-primary" onClick={(e) => { e.preventDefault(); scrollToId("pillars"); }}>Explore Our Security &darr;</a>
            <a href="#faq" className="hero-text-link" onClick={(e) => { e.preventDefault(); scrollToId("faq"); }}>Read the FAQ &rarr;</a>
          </div>

          <div className="hero-badges-svg" dangerouslySetInnerHTML={{ __html: TRUST_BADGES_SVG }} />
        </div>

        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 48, overflow: "hidden", pointerEvents: "none" }}>
          <svg viewBox="0 0 1440 48" preserveAspectRatio="none" style={{ position: "absolute", bottom: 0, left: 0, width: "200%", height: "100%", animation: "tp-waveSlide 10s linear infinite" }}>
            <path d="M0,24 C240,6 480,40 720,24 C960,8 1200,40 1440,24 L1440,48 L0,48 Z" fill="rgba(255,255,255,.05)" />
          </svg>
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, pointerEvents: "none", background: "linear-gradient(90deg,transparent,rgba(255,255,255,.08) 30%,rgba(255,255,255,.08) 70%,transparent)" }} />
      </section>

      {/* ══ INTRO ══ */}
      <section className="intro-sec sr" id="intro">
        <div className="intro-inner">
          <div className="intro-left">
            <div className="sec-eyebrow">Our Promise</div>
            <h2>Designed for the <em>enterprise.</em></h2>
            <p>We secure your data not just because we have to, but because <strong>your business depends on it.</strong> Our comprehensive security program is designed to protect your information at every layer — from the moment it enters our system to the moment it reaches the right set of eyes.</p>
            <p style={{ marginTop: 16 }}>Think of us as the vault your procurement data deserves. <strong>We don&rsquo;t grade our own homework.</strong> Independent auditors verify us annually. And our policy isn&rsquo;t &ldquo;trust but verify&rdquo; &mdash; it&rsquo;s <strong>verify, then trust, then monitor forever.</strong></p>
          </div>
          <AccessTerminal />
        </div>
      </section>

      <div className="rgb-divider" aria-hidden="true" />

      {/* ══ SECURITY PILLARS ══ */}
      <section className="pillars-sec" id="pillars">
        <div className="pillars-inner">
          <div className="pillars-header sr">
            <div className="sec-eyebrow">Security Pillars</div>
            <div className="sec-title">Six layers. Zero compromises.</div>
            <p className="sec-sub">Every pillar is independently audited, continuously monitored, and engineered to fail safely — not silently.</p>
          </div>

          <div className="pillars-grid">
            {PILLARS.map((p) => (
              <div className={`pillar-card ${p.cls} sr${p.delay ? ` sr-delay-${p.delay}` : ""}`} key={p.title}>
                <div className="pillar-icon" dangerouslySetInnerHTML={{ __html: p.icon }} />
                <div className="pillar-title">{p.title}</div>
                <p className="pillar-desc">{p.desc}</p>
                <ul className="pillar-points">
                  {p.points.map((pt) => <li key={pt}>{pt}</li>)}
                </ul>
                <div className="pillar-cat">{p.cat}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ POLICIES ══ */}
      <section className="policies-sec">
        <div className="policies-sec-glow-a" />
        <div className="policies-sec-glow-b" />
        <div className="policies-inner">
          <div className="policies-header sr">
            <div className="policies-eyebrow">Our Policies</div>
            <h2>Documented. Audited. Transparent.</h2>
            <p>24 security policies underpinning every process at NimbleS2P — from access control to disaster recovery.</p>
          </div>
          <div className="policies-grid">
            {POLICIES.map((name) => (
              <div className="policy-card sr" key={name}>
                <div className="policy-card-icon" dangerouslySetInnerHTML={{ __html: POLICY_ICON }} />
                <div className="policy-card-name">{name}</div>
              </div>
            ))}
            <div className="policy-card-more sr">
              <div className="policy-more-count">+17</div>
              <div className="policy-more-label">More Policies</div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section className="faq-sec" id="faq">
        <div className="faq-inner">
          <div className="faq-header sr">
            <div className="sec-eyebrow">FAQs</div>
            <div className="sec-title">The questions you should be asking.</div>
            <div className="faq-header-sub-row">
              <p className="sec-sub" style={{ margin: 0, maxWidth: 480 }}>Security jargon hides weak answers. Here&rsquo;s exactly how we handle the things that matter.</p>
              <a href="#" className="faq-team-link" onClick={(e) => { e.preventDefault(); goDemo(); }}>Talk to our team &rarr;</a>
            </div>
          </div>

          <div className="faq-list">
            {FAQS.map((f, i) => (
              <FaqItem
                key={f.q}
                f={f}
                delay={i}
                isOpen={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="cta-sec" id="cta">
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,#0f0c29 0%,#1a1260 40%,#261d6b 70%,#1e1050 100%)" }} />
          <div style={{ position: "absolute", bottom: "-10%", right: "-5%", width: "50%", height: "80%", background: "radial-gradient(ellipse at 80% 80%, rgba(245,166,35,.22) 0%, transparent 60%)" }} />
          <div style={{ position: "absolute", top: "-10%", left: "-5%", width: "55%", height: "75%", background: "radial-gradient(ellipse at 20% 20%, rgba(99,32,224,.38) 0%, transparent 60%)" }} />
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,.06) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        </div>

        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 52, overflow: "hidden", pointerEvents: "none" }}>
          <svg viewBox="0 0 1440 52" preserveAspectRatio="none" style={{ position: "absolute", top: 0, left: 0, width: "200%", height: "100%", animation: "tp-waveSlide 9s linear infinite" }}>
            <path d="M0,26 C200,8 400,44 600,26 C800,8 1000,44 1200,26 C1360,12 1440,36 1440,26 L1440,0 L0,0 Z" fill="rgba(99,32,224,.15)" />
            <path d="M0,36 C180,12 380,52 580,32 C780,12 980,48 1180,28 C1340,14 1440,38 1440,36 L1440,0 L0,0 Z" fill="rgba(130,80,230,.09)" />
          </svg>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg,transparent,rgba(139,92,246,.45) 30%,rgba(139,92,246,.45) 70%,transparent)" }} />
        </div>

        <div style={{ position: "relative", zIndex: 1 }}>
          <div className="cta-inner sr">
            <div className="cta-live-badge">
              <span className="cta-live-dot" />
              <span>See NimbleS2P In Action</span>
            </div>
            <div className="cta-title">Your procurement deserves better infrastructure.</div>
            <p className="cta-sub">Built for enterprises that take compliance, supplier trust, and financial control seriously.</p>
            <div className="cta-actions">
              <a href="#" className="btn-cta-primary" onClick={(e) => { e.preventDefault(); goDemo(); }}>Book a Demo &rarr;</a>
            </div>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 52, overflow: "hidden", pointerEvents: "none" }}>
          <svg viewBox="0 0 1440 52" preserveAspectRatio="none" style={{ position: "absolute", bottom: 0, left: 0, width: "200%", height: "100%", animation: "tp-waveSlide 10s linear infinite" }}>
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
   PAGE STYLES — every selector scoped under .trust-page so it
   cannot leak into other routes. Keyframes are prefixed `tp-`.
═══════════════════════════════════════════════════════════ */
const TRUST_CSS = `
.trust-page{
  --f-t:var(--ft); --f-b:var(--fb); --f-m:var(--fm);
  --bg-v:linear-gradient(140deg,#14104A 0%,#1E1660 40%,#261d6b 70%,#1a1258 100%);
  --cta-start:#E8920A; --cta-end:#F5B020;
  background:#fff; color:var(--t1);
}
.trust-page h1,.trust-page h2,.trust-page h3,.trust-page h4{font-family:var(--f-t)}
.trust-page a{text-decoration:none}

@keyframes tp-fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
@keyframes tp-scanLine{0%{top:-2px;opacity:0}8%{opacity:1}92%{opacity:1}100%{top:calc(100% + 2px);opacity:0}}
@keyframes tp-termCursor{0%,100%{opacity:1}50%{opacity:0}}
@keyframes tp-livePulse{0%{box-shadow:0 0 0 0 rgba(245,166,35,0.7)}70%{box-shadow:0 0 0 7px rgba(245,166,35,0)}100%{box-shadow:0 0 0 0 rgba(245,166,35,0)}}
@keyframes tp-waveSlide{from{transform:translateX(0)}to{transform:translateX(-50%)}}

/* ── HERO ── */
.trust-page .hero{
  min-height:100vh; background:var(--bg-v);
  display:flex; flex-direction:column; align-items:center; justify-content:center;
  padding:128px 5vw 80px; position:relative; overflow:hidden; text-align:center;
}
.trust-page .hero h1{font-size:clamp(40px,4.7vw,65px);font-weight:800;letter-spacing:-.035em;line-height:1.12;padding-bottom:0.08em;margin-bottom:22px;background:linear-gradient(95deg,rgb(255,255,255) 0%,rgb(255,255,255) 30%,rgb(245,208,96) 62%,rgb(245,166,35) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:tp-fadeUp .85s .08s ease both}
.trust-page .hero-sub{font-family:var(--f-b);font-size:17.5px;font-weight:400;color:rgba(255,255,255,0.52);line-height:1.72;max-width:580px;margin:0 auto 32px;animation:tp-fadeUp .85s .16s ease both}
.trust-page .hero-ctas{display:flex;gap:16px;justify-content:center;align-items:center;flex-wrap:wrap;margin-bottom:56px;animation:tp-fadeUp .85s .24s ease both}
.trust-page .btn-primary{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,#E8920A,#F5B020);color:#fff;border:none;border-radius:10px;padding:14px 30px;font-size:15px;font-weight:600;cursor:pointer;font-family:var(--f-b);box-shadow:0 6px 32px rgba(232,150,10,.52);transition:transform .2s,box-shadow .2s}
.trust-page .btn-primary:hover{opacity:.9;transform:translateY(-2px);box-shadow:0 8px 24px rgba(217,119,6,.45)}
.trust-page .hero-text-link{font-family:var(--f-b);font-size:15px;font-weight:500;color:rgba(255,255,255,.72);text-decoration:none;display:inline-flex;align-items:center;gap:6px;transition:color .2s;background:none;border:none;padding:0;cursor:pointer}
.trust-page .hero-text-link:hover{color:#fff}
.trust-page .hero-badges-svg{margin-top:40px;padding:0 24px;animation:tp-fadeUp .85s .4s ease both;position:relative;max-width:640px;margin-left:auto;margin-right:auto}
.trust-page .hero-badges-svg::before{content:'';position:absolute;inset:-20px -40px;background:radial-gradient(ellipse 80% 60% at 50% 50%, rgba(99,32,224,.18) 0%, transparent 70%);pointer-events:none;z-index:-1}

/* ── SCROLL REVEAL ── */
.trust-page .sr{opacity:0;transform:translateY(22px);transition:opacity .6s ease,transform .6s ease}
.trust-page .sr.visible{opacity:1;transform:translateY(0)}
.trust-page .sr-delay-1.visible{transition-delay:.1s}
.trust-page .sr-delay-2.visible{transition-delay:.2s}
.trust-page .sr-delay-3.visible{transition-delay:.3s}
.trust-page .sr-delay-4.visible{transition-delay:.4s}

/* ── RGB DIVIDER ── */
.trust-page .rgb-divider{height:3px;width:100%;background:linear-gradient(90deg,var(--p500),var(--p300),#F59E0B);display:block}

/* ── INTRO ── */
.trust-page .intro-sec{background:#fff;padding:96px 48px;display:flex;justify-content:center}
.trust-page .intro-inner{max-width:1100px;width:100%;display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center}
.trust-page .intro-left h2{font-size:clamp(28px,4vw,44px);font-weight:800;letter-spacing:-.03em;line-height:1.12;color:var(--t1);margin-bottom:24px}
.trust-page .intro-left h2 em{font-style:normal;color:var(--t1)}
.trust-page .intro-left p{font-size:16px;line-height:1.8;color:var(--t2);font-family:var(--f-b)}
.trust-page .intro-left p strong{color:var(--p700);font-weight:600}
.trust-page .term-block{background:#0D0B24;border-radius:16px;padding:28px 28px 24px;position:relative;overflow:hidden;border:1px solid rgba(255,255,255,.06)}
.trust-page .term-topbar{display:flex;align-items:center;gap:6px;margin-bottom:20px}
.trust-page .term-dot{width:10px;height:10px;border-radius:50%}
.trust-page .term-lines{font-family:var(--f-m);font-size:12.5px;line-height:2}
.trust-page .tl{display:block}
.trust-page .tl .prompt{color:rgba(255,255,255,.2)}
.trust-page .tl .cmd{color:#C4B5FD}
.trust-page .tl .ok{color:#4ADE80;font-weight:600}
.trust-page .tl .warn{color:#FCD34D}
.trust-page .tl .granted{color:#A78BFA;font-weight:700;font-size:14px}
.trust-page .term-blink{animation:tp-termCursor 1s step-end infinite}
.trust-page .term-cursor{display:inline-block;width:2px;height:14px;background:#A78BFA;vertical-align:middle;margin-left:4px;animation:tp-termCursor .9s step-end infinite}

/* ── SECTION HEADINGS ── */
.trust-page .sec-eyebrow{display:inline-flex;align-items:center;gap:6px;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--g500);margin-bottom:14px;font-family:var(--f-b)}
.trust-page .sec-eyebrow::before{content:'';width:18px;height:1.5px;background:currentColor;border-radius:2px}
.trust-page .sec-title{font-size:clamp(26px,3.5vw,40px);font-weight:800;letter-spacing:-.03em;line-height:1.14;color:var(--p700);margin-bottom:14px;font-family:var(--f-t)}
.trust-page .sec-sub{font-size:15px;color:var(--t3);max-width:540px;line-height:1.7;font-family:var(--f-b)}

/* ── SECURITY PILLARS ── */
.trust-page .pillars-sec{background:var(--p25);padding:96px 48px;scroll-margin-top:90px}
.trust-page .pillars-inner{max-width:1100px;margin:0 auto}
.trust-page .pillars-header{text-align:left;margin-bottom:56px}
.trust-page .pillars-header .sec-title{color:var(--t1)}
.trust-page .pillars-header .sec-sub{margin-left:0;text-align:left;max-width:600px}
.trust-page .pillars-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.trust-page .pillar-card{background:#fff;border:1.5px solid rgba(30,27,75,.07);border-radius:18px;padding:28px 24px 60px;position:relative;overflow:hidden;transition:transform .3s cubic-bezier(.22,1,.36,1),box-shadow .3s ease,border-color .25s ease;cursor:default}
.trust-page .pillar-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;border-radius:18px 18px 0 0;transition:opacity .25s}
.trust-page .pillar-card::after{content:'';position:absolute;left:0;right:0;height:1.5px;top:-2px;background:linear-gradient(90deg,transparent 0%,var(--card-beam,rgba(99,32,224,.8)) 40%,rgba(255,255,255,.95) 50%,var(--card-beam,rgba(99,32,224,.8)) 60%,transparent 100%);pointer-events:none;opacity:0}
.trust-page .pillar-card:hover::after{opacity:1;animation:tp-scanLine 1.8s ease-in-out infinite}
.trust-page .pillar-card:hover{transform:translateY(-5px);box-shadow:0 16px 40px rgba(15,13,46,.1),0 4px 12px rgba(15,13,46,.06)}
.trust-page .pc-compliance::before{background:linear-gradient(90deg,#059669,#34D399)}
.trust-page .pc-compliance{--card-beam:rgba(52,211,153,.8)}
.trust-page .pc-compliance:hover{border-color:rgba(52,211,153,.35)}
.trust-page .pc-compliance .pillar-icon{background:rgba(16,185,129,.08);border-color:rgba(16,185,129,.15)}
.trust-page .pc-compliance .pillar-cat{position:absolute;bottom:24px;left:24px;background:rgba(16,185,129,.1);color:#047857}
.trust-page .pc-access::before{background:linear-gradient(90deg,#6320E0,#8B5CF6)}
.trust-page .pc-access{--card-beam:rgba(139,92,246,.8)}
.trust-page .pc-access:hover{border-color:rgba(139,92,246,.35)}
.trust-page .pc-access .pillar-icon{background:rgba(99,32,224,.06);border-color:rgba(99,32,224,.14)}
.trust-page .pc-access .pillar-cat{position:absolute;bottom:24px;left:24px;background:rgba(99,32,224,.08);color:#5B21B6}
.trust-page .pc-infra::before{background:linear-gradient(90deg,#0070F2,#60A5FA)}
.trust-page .pc-infra{--card-beam:rgba(96,165,250,.8)}
.trust-page .pc-infra:hover{border-color:rgba(96,165,250,.35)}
.trust-page .pc-infra .pillar-icon{background:rgba(0,112,242,.06);border-color:rgba(0,112,242,.14)}
.trust-page .pc-infra .pillar-cat{position:absolute;bottom:24px;left:24px;background:rgba(0,112,242,.08);color:#1D4ED8}
.trust-page .pc-defense::before{background:linear-gradient(90deg,#D97706,#FCD34D)}
.trust-page .pc-defense{--card-beam:rgba(252,211,77,.9)}
.trust-page .pc-defense:hover{border-color:rgba(252,211,77,.45)}
.trust-page .pc-defense .pillar-icon{background:rgba(217,119,6,.06);border-color:rgba(217,119,6,.14)}
.trust-page .pc-defense .pillar-cat{position:absolute;bottom:24px;left:24px;background:rgba(217,119,6,.1);color:#B45309}
.trust-page .pillar-icon{width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:18px;border:1.5px solid;transition:transform .3s ease}
.trust-page .pillar-card:hover .pillar-icon{transform:scale(1.06) translateY(-2px)}
.trust-page .pillar-icon svg{width:22px;height:22px}
.trust-page .pillar-title{font-family:var(--f-t);font-size:15px;font-weight:700;color:var(--p700);margin-bottom:8px;line-height:1.3}
.trust-page .pillar-desc{font-size:12.5px;line-height:1.7;color:var(--t3);font-family:var(--f-b)}
.trust-page .pillar-cat{position:absolute;bottom:24px;left:24px;display:inline-flex;align-items:center;margin-top:16px;font-size:9.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;padding:3px 9px;border-radius:6px;font-family:var(--f-b)}
.trust-page .pillar-points{list-style:none;margin:14px 0 16px;padding:0;display:flex;flex-direction:column;gap:7px}
.trust-page .pillar-points li{display:flex;align-items:flex-start;gap:8px;font-size:12.5px;color:var(--t2);font-family:var(--f-b);line-height:1.45}
.trust-page .pillar-points li::before{content:'';width:14px;height:14px;border-radius:4px;flex-shrink:0;margin-top:1px;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3 7l3 3 5-5' stroke='%23059669' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");background-repeat:no-repeat;background-size:contain}
.trust-page .pc-access .pillar-points li::before{background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3 7l3 3 5-5' stroke='%238B5CF6' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")}
.trust-page .pc-infra .pillar-points li::before{background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3 7l3 3 5-5' stroke='%230070F2' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")}
.trust-page .pc-defense .pillar-points li::before{background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3 7l3 3 5-5' stroke='%23D97706' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")}

/* ── POLICIES ── */
.trust-page .policies-sec{background:var(--bg-v);padding:80px 48px;position:relative;overflow:hidden}
.trust-page .policies-sec-glow-a{position:absolute;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(99,32,224,0.25) 0%,transparent 68%);top:-20%;left:-10%;pointer-events:none;filter:blur(60px)}
.trust-page .policies-sec-glow-b{position:absolute;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(238,157,17,0.12) 0%,transparent 65%);bottom:-10%;right:-8%;pointer-events:none;filter:blur(70px)}
.trust-page .policies-inner{max-width:1100px;margin:0 auto;position:relative;z-index:1}
.trust-page .policies-header{margin-bottom:40px}
.trust-page .policies-eyebrow{display:inline-flex;align-items:center;gap:8px;font-family:var(--f-b);font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,0.45);margin-bottom:14px}
.trust-page .policies-eyebrow::before{content:'';display:block;width:16px;height:2px;flex-shrink:0;border-radius:1px;background:linear-gradient(90deg,rgb(99,32,224),rgb(238,157,17))}
.trust-page .policies-header h2{font-family:var(--f-t);font-size:clamp(28px,3.5vw,40px);font-weight:800;letter-spacing:-.03em;line-height:1.1;background:linear-gradient(95deg,rgb(255,255,255) 0%,rgb(255,255,255) 30%,rgb(245,208,96) 62%,rgb(245,166,35) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;padding-bottom:.05em;margin-bottom:8px}
.trust-page .policies-header p{font-family:var(--f-b);font-size:15px;color:rgba(255,255,255,.6);line-height:1.6}
.trust-page .policies-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
.trust-page .policy-card{background:rgba(255,255,255,.055);border:1px solid rgba(255,255,255,.1);border-radius:14px;padding:20px;display:flex;align-items:flex-start;gap:12px;transition:background .25s,border-color .25s,transform .25s}
.trust-page .policy-card:hover{background:rgba(255,255,255,.09);border-color:rgba(255,255,255,.2);transform:translateY(-3px)}
.trust-page .policy-card-icon{width:32px;height:32px;border-radius:8px;flex-shrink:0;background:rgba(255,255,255,.08);display:flex;align-items:center;justify-content:center}
.trust-page .policy-card-name{font-family:var(--f-b);font-size:13px;font-weight:600;color:rgba(255,255,255,.82);line-height:1.4;padding-top:3px}
.trust-page .policy-card-more{background:rgba(255,255,255,.03);border:1px dashed rgba(255,255,255,.15);border-radius:14px;padding:20px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;transition:background .25s,border-color .25s}
.trust-page .policy-card-more:hover{background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.25)}
.trust-page .policy-more-count{font-family:var(--f-m);font-size:26px;font-weight:600;color:rgba(255,255,255,.5);line-height:1}
.trust-page .policy-more-label{font-family:var(--f-b);font-size:10.5px;font-weight:600;color:rgba(255,255,255,.28);letter-spacing:.08em;text-transform:uppercase}

/* ── FAQ ── */
.trust-page .faq-sec{background:#fff;padding:96px 48px;scroll-margin-top:90px}
.trust-page .faq-inner{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:1fr 1.6fr;gap:80px;align-items:start}
.trust-page .faq-header{position:sticky;top:100px}
.trust-page .faq-header .sec-title{font-size:clamp(28px,3.5vw,44px);color:var(--t1);letter-spacing:-.03em;line-height:1.1}
.trust-page .faq-header-sub-row{display:flex;flex-direction:column;align-items:flex-start;gap:20px;margin-top:12px}
.trust-page .faq-team-link{display:inline-flex;align-items:center;gap:6px;font-family:var(--f-b);font-size:14px;font-weight:600;color:var(--p500);text-decoration:none;border-bottom:1.5px solid var(--p500);padding-bottom:1px;white-space:nowrap;transition:color .2s,border-color .2s}
.trust-page .faq-team-link:hover{color:var(--p400);border-color:var(--p400)}
.trust-page .faq-list{display:flex;flex-direction:column;border-top:1px solid var(--bd)}
.trust-page .faq-item{border-bottom:1px solid var(--bd);overflow:hidden}
.trust-page .faq-q{display:flex;align-items:center;justify-content:space-between;padding:20px 0;cursor:pointer;gap:16px;transition:color .2s;user-select:none}
.trust-page .faq-q:hover .faq-qtxt{color:var(--t1)}
.trust-page .faq-qtxt{font-family:var(--f-b);font-size:15px;font-weight:600;color:var(--t1);flex:1;line-height:1.4;transition:color .2s}
.trust-page .faq-toggle{width:28px;height:28px;border-radius:50%;flex-shrink:0;border:1.5px solid var(--bd);display:flex;align-items:center;justify-content:center;transition:border-color .2s,background .2s,transform .3s}
.trust-page .faq-q:hover .faq-toggle{border-color:var(--p300);background:var(--p25)}
.trust-page .faq-plus{font-size:16px;font-weight:400;color:var(--t3);line-height:1;transition:transform .3s ease,color .2s;display:block}
.trust-page .faq-item.open .faq-plus{transform:rotate(45deg);color:#fff}
.trust-page .faq-item.open .faq-toggle{border-color:var(--p500);background:var(--p500)}
.trust-page .faq-a{max-height:0;overflow:hidden;transition:max-height .4s cubic-bezier(0.22,1,0.36,1)}
.trust-page .faq-item.open .faq-a{max-height:400px}
.trust-page .faq-a-inner{padding:0 40px 20px 0;font-family:var(--f-b);font-size:14.5px;color:var(--t2);line-height:1.8}
.trust-page .faq-a-inner strong{color:var(--p700);font-weight:600}

/* ── CTA ── */
.trust-page .cta-sec{background:var(--bg-v);padding:100px 48px;position:relative;overflow:hidden;text-align:center}
.trust-page .cta-live-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(245,166,35,.12);border:1px solid rgba(245,166,35,.3);border-radius:100px;padding:6px 18px;margin-bottom:28px;font-family:var(--f-b);font-size:12px;font-weight:600;color:#F5D060;letter-spacing:.04em}
.trust-page .cta-live-dot{width:7px;height:7px;border-radius:50%;background:#F5A623;flex-shrink:0;box-shadow:0 0 8px rgba(245,166,35,.8);animation:tp-livePulse 2.4s ease-in-out infinite}
.trust-page .cta-title{font-size:clamp(28px,4.5vw,48px);font-weight:800;letter-spacing:-.035em;line-height:1.1;max-width:700px;margin:0 auto 18px;background:linear-gradient(95deg,rgb(255,255,255) 0%,rgb(255,255,255) 30%,rgb(245,208,96) 62%,rgb(245,166,35) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.trust-page .cta-sub{font-size:16px;color:rgba(255,255,255,.45);max-width:520px;margin:0 auto 44px;line-height:1.7;font-family:var(--f-b)}
.trust-page .cta-actions{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
.trust-page .btn-cta-primary{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,var(--cta-start),var(--cta-end));color:#fff;border:none;border-radius:10px;padding:14px 32px;font-family:var(--f-b);font-size:15px;font-weight:700;cursor:pointer;text-decoration:none;box-shadow:0 4px 16px rgba(232,146,10,.35);transition:opacity .2s,transform .2s}
.trust-page .btn-cta-primary:hover{opacity:.9;transform:translateY(-2px)}

/* ── RESPONSIVE ── */
@media(max-width:900px){
  .trust-page .hero{padding:96px 24px 80px}
  .trust-page .pillars-grid{grid-template-columns:repeat(2,1fr)}
  .trust-page .intro-inner{grid-template-columns:1fr;gap:40px}
  .trust-page .faq-inner{grid-template-columns:1fr;gap:40px}
  .trust-page .faq-header{position:static;top:auto}
  .trust-page .pillars-sec,.trust-page .intro-sec,.trust-page .faq-sec{padding:64px 24px}
  .trust-page .policies-sec{padding:64px 24px}
  .trust-page .cta-sec{padding:64px 24px}
  .trust-page .policies-grid{grid-template-columns:repeat(2,1fr)}
}
@media(max-width:580px){
  .trust-page .pillars-grid{grid-template-columns:1fr}
  .trust-page .policies-grid{grid-template-columns:1fr}
}
`;
