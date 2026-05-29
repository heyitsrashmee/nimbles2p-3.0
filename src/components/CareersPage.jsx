"use client";

import { useEffect, useRef, useState } from "react";
import { Nav } from "@/components/layout/SiteNav";
import { VDDFooter } from "@/components/layout/VDDFooter";

/* ═══════════════════════════════════════════════════════════
   Careers page — converted from the standalone HTML.
   Nav + Footer reuse the shared homepage components. The unique
   content (hero, scale typewriter, benefits, values, open roles,
   CTA) lives here. Every selector is scoped under .careers-page
   and keyframes are prefixed `cr-` so styles can't leak to other
   routes.
═══════════════════════════════════════════════════════════ */

const TW_LINE1 = "Our scale is massive,";
const TW_LINE2 = "but our ambition is bigger.";
const TW_TOTAL = TW_LINE1.length + 1 + TW_LINE2.length;

const BENEFITS = [
  {
    num: "01",
    title: "Real Work-Life Balance",
    desc: "We don’t just say it — we practice it. Enjoy realistic deadlines, a respect for your personal time, and a well-structured paid leave policy for when you need to recharge.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" stroke="rgba(255,255,255,.88)" strokeWidth="1.7" />
        <path d="M12 3a4.5 4.5 0 000 9 4.5 4.5 0 010 9" fill="rgba(255,255,255,.2)" stroke="none" />
        <circle cx="12" cy="7.5" r="2" fill="rgba(255,255,255,.95)" stroke="none" />
        <circle cx="12" cy="16.5" r="2" fill="rgba(255,255,255,.08)" stroke="rgba(255,255,255,.6)" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Remote Fridays",
    desc: "Start your weekend vibes early. We offer remote work flexibility every Friday so you can plan your weekend travel or just work from your couch.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.88)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="22" x2="12" y2="10" />
        <path d="M12 10C9 7 5 7 3 9c3 0 6 2 9 1z" fill="rgba(255,255,255,.25)" />
        <path d="M12 10C15 7 19 7 21 9c-3 0-6 2-9 1z" fill="rgba(255,255,255,.25)" />
        <path d="M12 14C9 11 4 12 3 15c3-1 6 0 9-1z" fill="rgba(255,255,255,.15)" />
        <path d="M12 14C15 11 20 12 21 15c-3-1-6 0-9-1z" fill="rgba(255,255,255,.15)" />
        <path d="M10 22h4" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Rewarding Compensation",
    desc: "We value both impact and loyalty. Apart from statutory PF, we offer variable pay that rewards high performance and long-term commitment to the team.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2.5" y="15" width="4" height="7" rx="1" fill="rgba(255,255,255,.2)" stroke="rgba(255,255,255,.6)" strokeWidth="1.5" />
        <rect x="10" y="10" width="4" height="12" rx="1" fill="rgba(255,255,255,.34)" stroke="rgba(255,255,255,.78)" strokeWidth="1.5" />
        <rect x="17.5" y="5" width="4" height="17" rx="1" fill="rgba(255,255,255,.52)" stroke="rgba(255,255,255,.95)" strokeWidth="1.5" />
        <polyline points="6 5.5 9.5 2.5 13 5.5" stroke="rgba(255,255,255,.82)" strokeWidth="1.6" fill="none" />
        <line x1="9.5" y1="2.5" x2="9.5" y2="9.5" stroke="rgba(255,255,255,.65)" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Health & Family First",
    desc: "We’ve got you covered. We provide health insurance for employees and offer paternity leave to support you when your family grows.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.88)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 12a11.05 11.05 0 00-22 0zm-5 7a3 3 0 01-6 0v-7" fill="rgba(255,255,255,.12)" />
        <path d="M12 2v2" strokeWidth="1.5" />
        <circle cx="7" cy="6.5" r="1" fill="rgba(255,255,255,.7)" stroke="none" />
        <circle cx="12" cy="5" r="1" fill="rgba(255,255,255,.7)" stroke="none" />
        <circle cx="17" cy="6.5" r="1" fill="rgba(255,255,255,.7)" stroke="none" />
      </svg>
    ),
  },
  {
    num: "05",
    title: "Career Velocity",
    desc: "Don’t just work — grow. We prioritize internal promotions, offering on-the-job training and opportunities to lead cross-functional projects.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.88)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C7.5 7.5 7.5 13 12 16c4.5-3 4.5-8.5 0-14z" fill="rgba(255,255,255,.18)" />
        <circle cx="12" cy="9.5" r="2" fill="rgba(255,255,255,.15)" stroke="rgba(255,255,255,.8)" strokeWidth="1.5" />
        <path d="M9 16l-3 5 4.5-1.5M15 16l3 5-4.5-1.5" strokeWidth="1.5" />
        <path d="M7 13c-2.5.5-4 2.5-4 4.5" strokeWidth="1.4" strokeDasharray="2 1.5" />
        <path d="M17 13c2.5.5 4 2.5 4 4.5" strokeWidth="1.4" strokeDasharray="2 1.5" />
      </svg>
    ),
  },
  {
    num: "06",
    title: "Stability You Can Trust",
    desc: "Join a business built on long-term client partnerships. We offer job security and a transparent, collaborative culture where your voice is heard.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.88)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="5" r="3" fill="rgba(255,255,255,.15)" />
        <line x1="12" y1="8" x2="12" y2="21" />
        <path d="M5 13H2a10 10 0 0020 0h-3" />
        <line x1="8" y1="5" x2="16" y2="5" />
      </svg>
    ),
  },
];

const VALUES = [
  { num: "01", title: "Balance", tagline: "Life happens off-screen.", desc: "We work efficiently so we can unplug fully. Burnout isn’t a badge of honor here — a rested mind is our sharpest tool." },
  { num: "02", title: "Trust", tagline: "No hidden agendas.", desc: "We say what we mean and do what we say. We own our mistakes, share the wins, and have each other’s backs." },
  { num: "03", title: "Sharp", tagline: "Cut through the noise.", desc: "We value precision over volume. We dig deep to find the smartest, simplest answer — not just the easiest one." },
  { num: "04", title: "Quick", tagline: "Speed is safety.", desc: "We don’t wait for permission to be great. We decide fast, ship often, and fix things on the fly." },
];

const DarkWaves = ({ topAnim = "cr-waveSlide 9s linear infinite", bottomAnim = "cr-waveSlide 10s linear infinite" }) => (
  <>
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,#0f0c29 0%,#1a1260 40%,#261d6b 70%,#1e1050 100%)" }} />
      <div style={{ position: "absolute", bottom: "-10%", right: "-5%", width: "50%", height: "80%", background: "radial-gradient(ellipse at 80% 80%,rgba(245,166,35,.22) 0%,transparent 60%)" }} />
      <div style={{ position: "absolute", top: "-10%", left: "-5%", width: "55%", height: "75%", background: "radial-gradient(ellipse at 20% 20%,rgba(99,32,224,.38) 0%,transparent 60%)" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle,rgba(255,255,255,.06) 1px,transparent 1px)", backgroundSize: "28px 28px" }} />
    </div>
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 52, overflow: "hidden", pointerEvents: "none" }}>
      <svg viewBox="0 0 1440 52" preserveAspectRatio="none" style={{ position: "absolute", top: 0, left: 0, width: "200%", height: "100%", animation: topAnim }}>
        <path d="M0,26 C200,8 400,44 600,26 C800,8 1000,44 1200,26 C1360,12 1440,36 1440,26 L1440,0 L0,0 Z" fill="rgba(99,32,224,.15)" />
        <path d="M0,36 C180,12 380,52 580,32 C780,12 980,48 1180,28 C1340,14 1440,38 1440,36 L1440,0 L0,0 Z" fill="rgba(130,80,230,.09)" />
      </svg>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg,transparent,rgba(139,92,246,.45) 30%,rgba(139,92,246,.45) 70%,transparent)" }} />
    </div>
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 52, overflow: "hidden", pointerEvents: "none" }}>
      <svg viewBox="0 0 1440 52" preserveAspectRatio="none" style={{ position: "absolute", bottom: 0, left: 0, width: "200%", height: "100%", animation: bottomAnim }}>
        <path d="M0,26 C200,8 400,44 600,26 C800,8 1000,42 1200,26 C1360,12 1440,34 1440,26 L1440,52 L0,52 Z" fill="rgba(99,32,224,.12)" />
        <path d="M0,36 C180,14 380,50 580,32 C780,14 980,46 1180,30 C1340,16 1440,38 1440,36 L1440,52 L0,52 Z" fill="rgba(130,80,230,.07)" />
      </svg>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg,transparent,rgba(139,92,246,.4) 30%,rgba(139,92,246,.4) 70%,transparent)" }} />
    </div>
  </>
);

export default function CareersPage({ onBack, onNavigate }) {
  const rootRef = useRef(null);
  const headingRef = useRef(null);
  const [twCount, setTwCount] = useState(0);
  const [twDone, setTwDone] = useState(false);

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

  /* Typewriter for the scale heading — triggers once on scroll into view. */
  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;
    let started = false;
    let timer;
    const tick = (n) => {
      if (n > TW_TOTAL) {
        timer = setTimeout(() => setTwDone(true), 600);
        return;
      }
      setTwCount(n);
      const delay = n === TW_LINE1.length ? 320 : 38;
      timer = setTimeout(() => tick(n + 1), delay);
    };
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          started = true;
          timer = setTimeout(() => tick(0), 300);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el.closest("section") || el);
    return () => {
      obs.disconnect();
      clearTimeout(timer);
    };
  }, []);

  const line1 = TW_LINE1.slice(0, Math.min(twCount, TW_LINE1.length));
  const showBreak = twCount > TW_LINE1.length;
  const line2 = twCount > TW_LINE1.length ? TW_LINE2.slice(0, twCount - TW_LINE1.length - 1) : "";

  return (
    <div className="careers-page" ref={rootRef}>
      <style dangerouslySetInnerHTML={{ __html: CAREERS_CSS }} />

      <Nav onNavigate={onNavigate} onBack={onBack} pageName="careers" />

      {/* ══ HERO ══ */}
      <section className="hero">
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,#0f0c29 0%,#1a1260 40%,#261d6b 70%,#1e1050 100%)" }} />
          <div style={{ position: "absolute", bottom: "-10%", right: "-5%", width: "50%", height: "80%", background: "radial-gradient(ellipse at 80% 80%,rgba(245,166,35,.18) 0%,transparent 60%)" }} />
          <div style={{ position: "absolute", top: "-10%", left: "-5%", width: "55%", height: "75%", background: "radial-gradient(ellipse at 20% 20%,rgba(99,32,224,.38) 0%,transparent 60%)" }} />
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,.045) 1px,transparent 1px)", backgroundSize: "30px 30px" }} />
        </div>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 52, overflow: "hidden", pointerEvents: "none" }}>
          <svg viewBox="0 0 1440 52" preserveAspectRatio="none" style={{ position: "absolute", top: 0, left: 0, width: "200%", height: "100%", animation: "cr-waveSlide 9s linear infinite" }}>
            <path d="M0,26 C200,8 400,44 600,26 C800,8 1000,44 1200,26 C1360,12 1440,36 1440,26 L1440,0 L0,0 Z" fill="rgba(99,32,224,.15)" />
            <path d="M0,36 C180,12 380,52 580,32 C780,12 980,48 1180,28 C1340,14 1440,38 1440,36 L1440,0 L0,0 Z" fill="rgba(130,80,230,.09)" />
          </svg>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg,transparent,rgba(139,92,246,.45) 30%,rgba(139,92,246,.45) 70%,transparent)" }} />
        </div>

        <div style={{ position: "relative", zIndex: 2, width: "100%", textAlign: "center" }}>
          <h1>Let&apos;s build the engine<br />that powers global commerce.</h1>
          <p className="hero-sub">NimbleS2P is the #1 choice for CFOs at the world&apos;s largest enterprises. We aren&apos;t just simplifying the supply chain &mdash; we are rewriting the logic of how billions of dollars move.</p>
          <div className="hero-ctas">
            <a href="#roles" className="btn-primary">View Open Roles &rarr;</a>
            <a href="#roles" className="hero-text-link">Why Join Us? &rarr;</a>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 48, overflow: "hidden", pointerEvents: "none" }}>
          <svg viewBox="0 0 1440 48" preserveAspectRatio="none" style={{ position: "absolute", bottom: 0, left: 0, width: "200%", height: "100%", animation: "cr-waveSlide 10s linear infinite" }}>
            <path d="M0,24 C240,6 480,40 720,24 C960,8 1200,40 1440,24 L1440,48 L0,48 Z" fill="rgba(255,255,255,.05)" />
          </svg>
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg,transparent,rgba(255,255,255,.1) 30%,rgba(255,255,255,.1) 70%,transparent)" }} />
        </div>
      </section>

      {/* ══ SCALE SECTION ══ */}
      <section className="scale-sec sr" id="scale">
        <div className="scale-sec-inner">
          <div className="scale-left">
            <div className="scale-grow-tag visible" style={{ marginBottom: 28 }}>Grow With Us</div>
            <div className="scale-heading" ref={headingRef}>
              {line1}
              {showBreak && <br />}
              {line2}
              <span className="tw-cursor" style={{ display: twDone ? "none" : undefined }} />
            </div>
          </div>

          <div className="scale-right">
            <p className="scale-body">
              The opportunity at NimbleS2P is <em>massive and tangible.</em> We have already earned our place as the trusted partner for <em>200,000+ enterprise users,</em> processing more than <em>$9.6 billion in transactions</em> across the globe. By uniting over <em>1 million vendors</em> on a single, streamlined platform, we&apos;ve created a procurement ecosystem that just works.
            </p>
            <div className="quote-border">
              <div className="scale-quote">
                <p>Numbers only tell half the story. The rest is about the people who make it happen. We are growing fast, and we&apos;re looking for talent that wants to solve real-world problems at enterprise scale.</p>
                <div className="scale-quote-author">NimbleS2P &middot; Built for Enterprise Leadership</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ BENEFITS SECTION ══ */}
      <section className="benefits-sec" id="why">
        <div className="benefits-inner">
          <div className="benefits-header sr">
            <div className="eyebrow" style={{ color: "rgba(255,255,255,0.45)" }}>Why Join Us</div>
            <div className="sec-title" style={{ color: "#fff", textAlign: "left" }}>Why Join NimbleS2P?</div>
            <p className="sec-sub" style={{ color: "rgba(255,255,255,0.52)", maxWidth: 480 }}>We believe in stable careers, real balance, and rewarding good work. Here is how we take care of our team.</p>
          </div>

          <div className="benefits-grid">
            {BENEFITS.map((b, i) => (
              <div key={b.num} className={`benefit-card sr${i % 3 === 1 ? " sr-delay-1" : i % 3 === 2 ? " sr-delay-2" : ""}`} data-num={b.num}>
                <div className="benefit-icon">{b.icon}</div>
                <div className="benefit-title">{b.title}</div>
                <p className="benefit-desc">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ VALUES SECTION ══ */}
      <section className="values-sec" id="values">
        <div className="values-accent-bar" />
        <div className="values-glow-a" />
        <div className="values-glow-b" />
        <div className="values-glow-c" />

        <div className="values-inner">
          <div className="values-header sr">
            <div className="eyebrow">Our Culture</div>
            <div className="sec-title" style={{ color: "var(--t1)" }}>Our Values</div>
            <p className="sec-sub" style={{ color: "var(--t3)", maxWidth: 480, margin: 0 }}>Four principles that define how we work, think, and grow together.</p>
          </div>

          <div className="values-grid">
            {VALUES.map((v, i) => (
              <div key={v.num} className={`value-card sr${i > 0 ? ` sr-delay-${i}` : ""}`}>
                <div className="value-number">{v.num}</div>
                <div className="value-title">{v.title}</div>
                <div className="value-tagline">{v.tagline}</div>
                <p className="value-desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="rgb-divider" aria-hidden="true" />

      {/* ══ OPEN ROLES SECTION ══ */}
      <section className="roles-sec" id="roles">
        <div className="roles-inner">
          <div className="sr" style={{ marginBottom: 40 }}>
            <div className="eyebrow">Open Positions</div>
            <div className="sec-title" style={{ color: "var(--t1)" }}>Current Openings</div>
            <p className="sec-sub" style={{ color: "var(--t3)", maxWidth: 480, margin: 0 }}>Real roles. Real impact. No fluff.</p>
          </div>

          <div className="roles-empty-wrap sr">
            <div className="roles-empty">
              <div className="roles-empty-icon">📋</div>
              <div className="roles-empty-title">No open roles right now</div>
              <p className="roles-empty-sub">We&apos;re not hiring just to hire. When the right role opens, you&apos;ll find it here. Drop us a line and we&apos;ll keep you in mind.</p>
              <a href="mailto:careers@nimbles2p.com" className="btn-gold">Send Your Resume &rarr;</a>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CTA SECTION ══ */}
      <section className="cta-sec" id="cta">
        <DarkWaves />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div className="cta-inner sr">
            <div className="cta-live-badge">
              <span className="cta-live-dot" />
              <span>We&apos;re Hiring &middot; Join the Team</span>
            </div>
            <div className="cta-title">Build something that matters.</div>
            <p className="cta-sub">Build the engine of global commerce without the grind. We value shipping great work just as much as unplugging on Remote Fridays.</p>
            <div className="cta-actions">
              <a href="#roles" className="btn-cta-primary">View Open Roles &rarr;</a>
            </div>
          </div>
        </div>
      </section>

      <VDDFooter onNavigate={onNavigate} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PAGE STYLES — every selector scoped under .careers-page so it
   cannot leak into other routes. Keyframes are prefixed `cr-`.
═══════════════════════════════════════════════════════════ */
const CAREERS_CSS = `
.careers-page{
  --f-t:var(--ft); --f-b:var(--fb); --f-m:var(--fm);
  background:#fff; color:var(--t1);
}
.careers-page h1,.careers-page h2,.careers-page h3,.careers-page h4{font-family:var(--f-t)}
.careers-page a{text-decoration:none}

@keyframes cr-waveSlide{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@keyframes cr-caretBlink{0%,100%{opacity:1}50%{opacity:0}}
@keyframes cr-spinBorder{to{transform:rotate(360deg)}}
@keyframes cr-livePulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.3);opacity:.7}}
@keyframes cr-rolesFlow{0%{background-position:0% 0%}100%{background-position:100% 100%}}
@keyframes cr-glowDrift{0%{transform:translate(0,0) scale(1)}33%{transform:translate(4%,3%) scale(1.06)}66%{transform:translate(-3%,5%) scale(.95)}100%{transform:translate(0,0) scale(1)}}

/* ── Scroll reveal ── */
.careers-page .sr{opacity:0;transform:translateY(22px);transition:opacity .6s ease,transform .6s ease}
.careers-page .sr.visible{opacity:1;transform:translateY(0)}
.careers-page .sr-delay-1.visible{transition-delay:.1s}
.careers-page .sr-delay-2.visible{transition-delay:.2s}
.careers-page .sr-delay-3.visible{transition-delay:.3s}

/* ── Section anchors clear the fixed nav ── */
.careers-page section[id]{scroll-margin-top:90px}

/* ── Shared atoms ── */
.careers-page .eyebrow{display:flex;align-items:center;gap:8px;font-family:var(--f-b);font-size:11px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--p500);margin-bottom:16px;}
.careers-page .eyebrow::before{content:'';width:20px;height:2px;flex-shrink:0;border-radius:2px;background:linear-gradient(90deg,rgb(99,32,224),rgb(238,157,17));}
.careers-page .sec-title{font-size:clamp(28px,4vw,44px);font-weight:800;letter-spacing:-.028em;line-height:1.12;font-family:var(--f-t);margin-bottom:12px;}
.careers-page .sec-sub{font-size:15.5px;line-height:1.75;color:var(--t3);font-family:var(--f-b);max-width:560px;margin-top:0;}
.careers-page .rgb-divider{height:3px;width:100%;background:linear-gradient(90deg,var(--p500),var(--p300),#F59E0B);display:block;}

/* ── Hero ── */
.careers-page .hero{min-height:100vh;background:linear-gradient(140deg,#14104A 0%,#1E1660 40%,#261d6b 70%,#1a1258 100%);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:100px 48px 100px;position:relative;overflow:hidden;text-align:center;}
.careers-page .hero h1{font-size:clamp(40px,4.7vw,65px);font-weight:800;letter-spacing:-.035em;line-height:1.12;padding-bottom:.08em;margin-bottom:22px;background:linear-gradient(160deg,#C4B5FD 0%,#fff 44%,#F5C96A 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
.careers-page .hero-sub{font-family:var(--f-b);font-size:17.5px;font-weight:400;color:rgba(255,255,255,.52);line-height:1.72;max-width:580px;margin:0 auto 32px;}
.careers-page .hero-ctas{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-bottom:0;align-items:center;}
.careers-page .btn-primary{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,#E8920A,#F5B020);color:#fff;border:none;border-radius:12px;padding:14px 34px;font-size:16px;font-weight:700;cursor:pointer;font-family:var(--f-b);letter-spacing:-.01em;box-shadow:0 6px 32px rgba(232,150,10,.52);transition:transform .2s,box-shadow .2s;}
.careers-page .btn-primary:hover{opacity:.9;transform:translateY(-2px);box-shadow:0 8px 24px rgba(217,119,6,.45)}
.careers-page .hero-text-link{font-family:var(--f-b);font-size:15px;font-weight:500;color:rgba(255,255,255,.72);text-decoration:none;display:inline-flex;align-items:center;gap:6px;transition:color .2s;background:none;border:none;padding:0;}
.careers-page .hero-text-link:hover{color:#fff;}

/* ── Scale section ── */
.careers-page .scale-sec{background:#fff;padding:96px 48px;border-bottom:1px solid var(--bd);position:relative;overflow:hidden;}
.careers-page .scale-sec::before{content:'';position:absolute;inset:0;pointer-events:none;background-image:radial-gradient(var(--bd) 1px,transparent 1px);background-size:32px 32px;opacity:.5;}
.careers-page .scale-sec::after{content:'';position:absolute;top:-100px;right:-80px;width:500px;height:500px;border-radius:50%;pointer-events:none;background:radial-gradient(circle,rgba(99,32,224,.05) 0%,transparent 68%);}
.careers-page .scale-sec-inner{max-width:1100px;margin:0 auto;position:relative;z-index:1;display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;}
.careers-page .scale-grow-tag{display:flex;align-items:center;gap:8px;font-family:var(--f-b);font-size:11px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--p500);opacity:0;transition:opacity .5s ease;}
.careers-page .scale-grow-tag::before{content:'';width:20px;height:2px;flex-shrink:0;border-radius:2px;background:linear-gradient(90deg,rgb(99,32,224),rgb(238,157,17));}
.careers-page .scale-grow-tag.visible{opacity:1}
.careers-page .scale-heading{font-family:var(--f-t);font-size:clamp(32px,4.2vw,54px);font-weight:800;letter-spacing:-.035em;line-height:1.1;color:var(--t1);margin-bottom:0;height:calc(54px * 1.1 * 3);overflow:visible;}
.careers-page .scale-heading .tw-cursor{display:inline-block;width:3px;height:.82em;background:var(--p300);border-radius:2px;margin-left:4px;vertical-align:middle;animation:cr-caretBlink .75s step-end infinite;}
.careers-page .scale-right{position:relative;padding-left:48px;}
.careers-page .scale-right::before{content:'';position:absolute;left:0;top:5%;bottom:5%;width:1px;background:linear-gradient(to bottom,transparent,var(--bd) 20%,var(--bd) 80%,transparent);}
.careers-page .scale-body{font-size:16px;color:var(--t2);line-height:1.85;font-family:var(--f-b);margin-bottom:32px;}
.careers-page .scale-body em{font-style:normal;color:var(--p600);font-weight:600;}
.careers-page .quote-border{position:relative;border-radius:2px 18px 18px 2px;padding:2px;overflow:hidden;}
.careers-page .quote-border::before{content:'';position:absolute;inset:-120%;background:conic-gradient(from 0deg,rgba(99,32,224,.25) 0deg,rgba(99,32,224,.25) 80deg,rgba(99,32,224,.4) 120deg,rgba(196,181,253,.7) 150deg,rgba(255,255,255,.92) 175deg,rgba(255,255,255,1) 180deg,rgba(255,255,255,.92) 185deg,rgba(196,181,253,.7) 210deg,rgba(99,32,224,.4) 240deg,rgba(99,32,224,.25) 280deg,rgba(99,32,224,.25) 360deg);animation:cr-spinBorder 10s linear infinite;border-radius:50%;}
.careers-page .scale-quote{position:relative;padding:32px 32px 28px 32px;background:var(--p25);border-radius:0 16px 16px 0;overflow:hidden;z-index:1;}
.careers-page .scale-quote::before{content:'\\201C';position:absolute;top:-20px;left:8px;font-family:var(--f-t);font-size:160px;font-weight:800;line-height:1;letter-spacing:-.04em;background:linear-gradient(135deg,var(--p300) 0%,var(--p100) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;opacity:.2;pointer-events:none;user-select:none;z-index:0;}
.careers-page .scale-quote p{font-size:15px;font-style:italic;color:var(--t2);font-family:var(--f-b);line-height:1.82;position:relative;z-index:1;margin:0;font-weight:500;letter-spacing:.01em;}
.careers-page .scale-quote-author{margin-top:20px;padding-top:16px;border-top:1px solid var(--bd-p);font-size:11px;font-weight:700;color:var(--p400);font-family:var(--f-b);letter-spacing:.08em;text-transform:uppercase;position:relative;z-index:1;}

/* ── Benefits section ── */
.careers-page .benefits-sec{background:linear-gradient(160deg,rgb(30,22,96) 0%,rgb(38,29,107) 40%,rgb(26,18,88) 100%);padding:96px 48px;position:relative;overflow:hidden;}
.careers-page .benefits-sec::after{content:'';position:absolute;inset:0;z-index:0;pointer-events:none;background-image:radial-gradient(rgba(255,255,255,.03) 1px,transparent 1px);background-size:28px 28px;}
.careers-page .benefits-sec::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 60% 50% at 10% 60%,rgba(238,157,17,.07) 0%,transparent 55%),radial-gradient(ellipse 50% 40% at 90% 20%,rgba(99,32,224,.3) 0%,transparent 55%);pointer-events:none;}
.careers-page .benefits-inner{max-width:1100px;margin:0 auto;padding:0 24px;position:relative;z-index:1;}
.careers-page .benefits-header{margin-bottom:56px;text-align:left;}
.careers-page .benefits-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}
.careers-page .benefit-card{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:20px;padding:36px 28px 32px;position:relative;overflow:hidden;transition:transform .35s cubic-bezier(.22,1,.36,1),background .35s,border-color .35s,box-shadow .35s;cursor:default;display:flex;flex-direction:column;gap:0;}
.careers-page .benefit-card:hover{transform:translateY(-7px);background:rgba(255,255,255,.08);}
.careers-page .benefit-card:nth-child(1):hover{border-color:rgba(139,92,246,.55);box-shadow:0 0 0 1px rgba(139,92,246,.2),0 8px 32px rgba(99,32,224,.35),0 24px 56px rgba(99,32,224,.2);}
.careers-page .benefit-card:nth-child(2):hover{border-color:rgba(16,185,129,.55);box-shadow:0 0 0 1px rgba(16,185,129,.2),0 8px 32px rgba(16,185,129,.32),0 24px 56px rgba(4,120,87,.18);}
.careers-page .benefit-card:nth-child(3):hover{border-color:rgba(238,157,17,.55);box-shadow:0 0 0 1px rgba(238,157,17,.2),0 8px 32px rgba(217,119,6,.35),0 24px 56px rgba(180,83,9,.2);}
.careers-page .benefit-card:nth-child(4):hover{border-color:rgba(59,130,246,.55);box-shadow:0 0 0 1px rgba(59,130,246,.2),0 8px 32px rgba(59,130,246,.32),0 24px 56px rgba(29,78,216,.18);}
.careers-page .benefit-card:nth-child(5):hover{border-color:rgba(139,92,246,.55);box-shadow:0 0 0 1px rgba(139,92,246,.2),0 8px 32px rgba(99,32,224,.35),0 24px 56px rgba(99,32,224,.2);}
.careers-page .benefit-card:nth-child(6):hover{border-color:rgba(16,185,129,.55);box-shadow:0 0 0 1px rgba(16,185,129,.2),0 8px 32px rgba(16,185,129,.32),0 24px 56px rgba(4,120,87,.18);}
.careers-page .benefit-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;border-radius:20px 20px 0 0;transition:opacity .3s;}
.careers-page .benefit-card:nth-child(1)::before{background:linear-gradient(90deg,var(--p300),var(--p100))}
.careers-page .benefit-card:nth-child(2)::before{background:linear-gradient(90deg,var(--em700),var(--em400))}
.careers-page .benefit-card:nth-child(3)::before{background:linear-gradient(90deg,var(--g500),var(--g300))}
.careers-page .benefit-card:nth-child(4)::before{background:linear-gradient(90deg,#3B82F6,#93C5FD)}
.careers-page .benefit-card:nth-child(5)::before{background:linear-gradient(90deg,#8B5CF6,var(--p100))}
.careers-page .benefit-card:nth-child(6)::before{background:linear-gradient(90deg,var(--em500),#6EE7B7)}
.careers-page .benefit-card::after{content:attr(data-num);position:absolute;bottom:-8px;right:16px;font-family:var(--f-t);font-size:88px;font-weight:800;letter-spacing:-.04em;line-height:1;color:rgba(255,255,255,.04);pointer-events:none;user-select:none;transition:color .4s ease;}
.careers-page .benefit-card:nth-child(1):hover::after{color:rgba(139,92,246,.28)}
.careers-page .benefit-card:nth-child(2):hover::after{color:rgba(16,185,129,.25)}
.careers-page .benefit-card:nth-child(3):hover::after{color:rgba(238,157,17,.25)}
.careers-page .benefit-card:nth-child(4):hover::after{color:rgba(59,130,246,.28)}
.careers-page .benefit-card:nth-child(5):hover::after{color:rgba(139,92,246,.28)}
.careers-page .benefit-card:nth-child(6):hover::after{color:rgba(16,185,129,.25)}
.careers-page .benefit-icon{width:58px;height:58px;border-radius:16px;display:flex;align-items:center;justify-content:center;margin-bottom:24px;flex-shrink:0;border:1px solid transparent;transition:transform .35s cubic-bezier(.22,1,.36,1),box-shadow .35s;}
.careers-page .benefit-card:nth-child(1) .benefit-icon{background:linear-gradient(135deg,rgba(99,32,224,.4),rgba(139,92,246,.18));border-color:rgba(139,92,246,.45);box-shadow:0 6px 16px rgba(99,32,224,.25);}
.careers-page .benefit-card:nth-child(2) .benefit-icon{background:linear-gradient(135deg,rgba(4,120,87,.4),rgba(16,185,129,.18));border-color:rgba(16,185,129,.45);box-shadow:0 6px 16px rgba(16,185,129,.22);}
.careers-page .benefit-card:nth-child(3) .benefit-icon{background:linear-gradient(135deg,rgba(180,83,9,.4),rgba(245,158,11,.18));border-color:rgba(238,157,17,.45);box-shadow:0 6px 16px rgba(217,119,6,.22);}
.careers-page .benefit-card:nth-child(4) .benefit-icon{background:linear-gradient(135deg,rgba(29,78,216,.4),rgba(59,130,246,.18));border-color:rgba(59,130,246,.45);box-shadow:0 6px 16px rgba(59,130,246,.22);}
.careers-page .benefit-card:nth-child(5) .benefit-icon{background:linear-gradient(135deg,rgba(99,32,224,.4),rgba(139,92,246,.18));border-color:rgba(139,92,246,.45);box-shadow:0 6px 16px rgba(99,32,224,.25);}
.careers-page .benefit-card:nth-child(6) .benefit-icon{background:linear-gradient(135deg,rgba(4,120,87,.4),rgba(16,185,129,.18));border-color:rgba(16,185,129,.45);box-shadow:0 6px 16px rgba(16,185,129,.22);}
.careers-page .benefit-card:hover .benefit-icon{transform:scale(1.12) rotate(-5deg);box-shadow:0 10px 28px rgba(0,0,0,.3);}
.careers-page .benefit-icon svg{width:26px;height:26px;display:block;flex-shrink:0;}
.careers-page .benefit-title{font-family:var(--f-t);font-size:17px;font-weight:700;color:#fff;margin-bottom:12px;letter-spacing:-.015em;line-height:1.25;}
.careers-page .benefit-desc{font-size:13.5px;color:rgba(255,255,255,.52);line-height:1.75;font-family:var(--f-b);}

/* ── Values section ── */
.careers-page .values-sec{background:#fff;padding:96px 48px;position:relative;overflow:hidden;border-top:1px solid var(--bd);border-bottom:1px solid var(--bd);}
.careers-page .values-sec::after{content:'';position:absolute;inset:0;opacity:1;pointer-events:none;z-index:0;background-image:radial-gradient(rgba(30,27,75,.035) 1px,transparent 1px);background-size:32px 32px;}
.careers-page .values-glow-a{position:absolute;width:700px;height:700px;border-radius:50%;background:radial-gradient(circle,rgba(99,32,224,.06) 0%,transparent 68%);top:-20%;left:-10%;pointer-events:none;z-index:0;filter:blur(60px);animation:cr-glowDrift 26s ease-in-out infinite;}
.careers-page .values-glow-b{position:absolute;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(99,32,224,.05) 0%,transparent 65%);bottom:-20%;right:-8%;pointer-events:none;z-index:0;filter:blur(60px);animation:cr-glowDrift 32s 6s ease-in-out infinite reverse;}
.careers-page .values-glow-c{position:absolute;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(238,157,17,.04) 0%,transparent 60%);top:30%;right:20%;pointer-events:none;z-index:0;filter:blur(50px);animation:cr-glowDrift 22s 3s ease-in-out infinite;}
.careers-page .values-accent-bar{position:absolute;top:0;left:0;right:0;height:1px;z-index:2;background:linear-gradient(90deg,transparent 0%,rgba(130,120,210,.2) 15%,rgba(194,193,232,.5) 38%,rgba(255,255,255,.3) 50%,rgba(194,193,232,.5) 62%,rgba(130,120,210,.2) 85%,transparent 100%);}
.careers-page .values-inner{max-width:1100px;margin:0 auto;position:relative;z-index:1;}
.careers-page .values-header{text-align:left;margin-bottom:64px;}
.careers-page .values-header .sec-title{font-size:clamp(32px,4vw,48px);background:linear-gradient(140deg,var(--p600) 0%,var(--p700) 55%,var(--g500) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
.careers-page .values-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;}
.careers-page .value-card{background:#fff;border:1px solid var(--bd);box-shadow:0 2px 12px rgba(15,13,46,.06);border-radius:24px;padding:40px 28px 36px;position:relative;overflow:hidden;transition:background .35s,border-color .35s,transform .35s cubic-bezier(.22,1,.36,1),box-shadow .35s;cursor:default;display:flex;flex-direction:column;}
.careers-page .value-card:hover{background:var(--p25);transform:translateY(-8px);}
.careers-page .value-card:nth-child(1):hover{border-color:rgba(196,181,253,.5);box-shadow:inset 0 0 0 1px rgba(196,181,253,.3),inset 0 0 90px rgba(196,181,253,.15),0 24px 64px rgba(0,0,0,.4);}
.careers-page .value-card:nth-child(2):hover{border-color:rgba(74,222,128,.5);box-shadow:inset 0 0 0 1px rgba(74,222,128,.3),inset 0 0 90px rgba(74,222,128,.13),0 24px 64px rgba(0,0,0,.4);}
.careers-page .value-card:nth-child(3):hover{border-color:rgba(34,211,238,.5);box-shadow:inset 0 0 0 1px rgba(34,211,238,.3),inset 0 0 90px rgba(34,211,238,.13),0 24px 64px rgba(0,0,0,.4);}
.careers-page .value-card:nth-child(4):hover{border-color:rgba(251,146,60,.5);box-shadow:inset 0 0 0 1px rgba(251,146,60,.3),inset 0 0 90px rgba(251,146,60,.15),0 24px 64px rgba(0,0,0,.4);}
.careers-page .value-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;border-radius:24px 24px 0 0;opacity:0;transition:opacity .4s;}
.careers-page .value-card:nth-child(1)::before{background:linear-gradient(90deg,#A78BFA,#DDD6FE)}
.careers-page .value-card:nth-child(2)::before{background:linear-gradient(90deg,#34D399,#86EFAC)}
.careers-page .value-card:nth-child(3)::before{background:linear-gradient(90deg,#22D3EE,#A5F3FC)}
.careers-page .value-card:nth-child(4)::before{background:linear-gradient(90deg,#FB923C,#FDE68A)}
.careers-page .value-card:hover::before{opacity:1}
.careers-page .value-card::after{content:'';position:absolute;inset:0;border-radius:24px;opacity:0;transition:opacity .55s cubic-bezier(.22,1,.36,1);pointer-events:none;z-index:0;}
.careers-page .value-card:nth-child(1)::after{background:radial-gradient(ellipse 160% 140% at 50% 50%,rgba(196,181,253,.22) 0%,transparent 65%),linear-gradient(160deg,rgba(196,181,253,.09) 0%,rgba(167,139,250,.05) 100%);}
.careers-page .value-card:nth-child(2)::after{background:radial-gradient(ellipse 160% 140% at 50% 50%,rgba(74,222,128,.18) 0%,transparent 65%),linear-gradient(160deg,rgba(74,222,128,.07) 0%,rgba(52,211,153,.04) 100%);}
.careers-page .value-card:nth-child(3)::after{background:radial-gradient(ellipse 160% 140% at 50% 50%,rgba(34,211,238,.18) 0%,transparent 65%),linear-gradient(160deg,rgba(34,211,238,.07) 0%,rgba(165,243,252,.04) 100%);}
.careers-page .value-card:nth-child(4)::after{background:radial-gradient(ellipse 160% 140% at 50% 50%,rgba(251,146,60,.22) 0%,transparent 65%),linear-gradient(160deg,rgba(251,146,60,.09) 0%,rgba(253,230,138,.05) 100%);}
.careers-page .value-card:hover::after{opacity:1}
.careers-page .value-number{font-family:var(--f-m);font-size:11px;font-weight:600;color:var(--t4);letter-spacing:.14em;margin-bottom:24px;position:relative;z-index:1;}
.careers-page .value-title{font-family:var(--f-t);font-size:30px;font-weight:800;letter-spacing:-.035em;line-height:1.08;margin-bottom:12px;color:var(--t1);position:relative;z-index:1;}
.careers-page .value-tagline{font-size:13px;font-weight:700;color:var(--t3);letter-spacing:.04em;margin-bottom:18px;font-family:var(--f-b);position:relative;z-index:1;transition:color .45s ease;}
.careers-page .value-card:nth-child(1):hover .value-tagline{color:#C4B5FD}
.careers-page .value-card:nth-child(2):hover .value-tagline{color:#4ADE80}
.careers-page .value-card:nth-child(3):hover .value-tagline{color:#22D3EE}
.careers-page .value-card:nth-child(4):hover .value-tagline{color:#FB923C}
.careers-page .value-desc{font-size:14px;color:var(--t2);line-height:1.78;font-family:var(--f-b);flex:1;position:relative;z-index:1;}

/* ── Open roles section ── */
.careers-page .roles-sec{background:var(--p25);padding:96px 48px;}
.careers-page .roles-inner{max-width:1100px;margin:0 auto;}
.careers-page .roles-empty-wrap{padding:2px;border-radius:22px;background:linear-gradient(135deg,var(--p200) 0%,var(--bd-p) 20%,rgba(255,255,255,.1) 35%,var(--p100) 50%,rgba(255,255,255,.1) 65%,var(--bd-p) 80%,var(--p200) 100%);background-size:300% 300%;animation:cr-rolesFlow 10s cubic-bezier(.45,0,.55,1) infinite alternate;}
.careers-page .roles-empty{text-align:center;padding:72px 48px;background:#fff;border:none;border-radius:20px;}
.careers-page .roles-empty-icon{font-size:40px;margin-bottom:20px;opacity:.5}
.careers-page .roles-empty-title{font-family:var(--f-t);font-size:20px;font-weight:700;color:var(--t2);margin-bottom:10px;}
.careers-page .roles-empty-sub{font-size:14px;color:var(--t4);line-height:1.7;font-family:var(--f-b);max-width:360px;margin:0 auto 28px;}
.careers-page .btn-gold{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,#E8920A,#F5B020);color:#fff;border:none;border-radius:10px;padding:13px 28px;font-family:var(--f-b);font-size:14.5px;font-weight:700;cursor:pointer;text-decoration:none;box-shadow:0 6px 24px rgba(232,150,10,.42);transition:opacity .2s,transform .2s;}
.careers-page .btn-gold:hover{opacity:.9;transform:translateY(-2px);}

/* ── CTA section ── */
.careers-page .cta-sec{background:#0f0c29;padding:clamp(72px,9vh,110px) 5vw;text-align:center;position:relative;overflow:hidden;}
.careers-page .cta-inner{max-width:640px;margin:0 auto;position:relative;z-index:1;}
.careers-page .cta-title{font-size:clamp(28px,4.5vw,48px);font-weight:800;letter-spacing:-.035em;line-height:1.1;color:#fff;margin-bottom:16px;font-family:var(--f-t);}
.careers-page .cta-sub{font-size:16px;color:rgba(255,255,255,.52);max-width:460px;margin:0 auto 44px;line-height:1.7;font-family:var(--f-b);}
.careers-page .cta-actions{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;}
.careers-page .cta-live-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(245,166,35,.12);border:1px solid rgba(245,166,35,.3);border-radius:100px;padding:6px 18px;margin-bottom:28px;font-family:var(--f-b);font-size:12px;font-weight:600;color:#F5D060;letter-spacing:.04em;}
.careers-page .cta-live-dot{width:7px;height:7px;border-radius:50%;background:#F5A623;flex-shrink:0;box-shadow:0 0 8px rgba(245,166,35,.8);animation:cr-livePulse 2.4s ease-in-out infinite;}
.careers-page .btn-cta-primary{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,#E8920A,#F5B020);color:#fff;border:none;border-radius:10px;padding:14px 32px;font-family:var(--f-b);font-size:15px;font-weight:700;cursor:pointer;text-decoration:none;box-shadow:0 6px 32px rgba(232,150,10,.52);transition:opacity .2s,transform .2s;}
.careers-page .btn-cta-primary:hover{opacity:.9;transform:translateY(-2px);}

/* ── Responsive ── */
@media(max-width:1024px){
  .careers-page .scale-sec-inner{grid-template-columns:1fr;gap:48px}
  .careers-page .scale-right::before{display:none}
  .careers-page .scale-right{padding-left:0}
  .careers-page .scale-heading{height:auto;min-height:2.8em}
}
@media(max-width:900px){
  .careers-page .benefits-grid{grid-template-columns:1fr 1fr}
  .careers-page .values-grid{grid-template-columns:1fr 1fr}
  .careers-page .hero{padding:80px 24px 100px}
  .careers-page .scale-sec,.careers-page .benefits-sec,.careers-page .values-sec,.careers-page .roles-sec{padding:72px 24px}
}
@media(max-width:580px){
  .careers-page .benefits-grid,.careers-page .values-grid{grid-template-columns:1fr}
  .careers-page .hero-ctas{flex-direction:column;align-items:center}
}
`;
