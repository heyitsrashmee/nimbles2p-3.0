"use client";

import { useEffect, useRef, useState } from "react";
import { Nav } from "@/components/layout/SiteNav";
import { VDDFooter } from "@/components/layout/VDDFooter";
import { useWidth, useReveal, Eyebrow } from "@/components/shared/pageUi";
import ConsentCheckboxes from "@/components/shared/ConsentCheckboxes";
import { submitPartnerForm, isValidEmail } from "@/lib/web3forms";
import { trackLead, trackFormError } from "@/lib/analytics";

/* ═══════════════════════════════════════════════════════════
   Partners page
   Structure: hero → statement → opportunity (timeline + market card) →
   platform modules → partner types → enrol form. Nav, footer reuse the
   shared product-page patterns; page CSS is scoped under
   .partners-page.
═══════════════════════════════════════════════════════════ */

const OPPORTUNITY = [
  {
    title: "Compliance Is Now Continuous",
    desc: "E-invoicing and GST mandates mean every supplier and invoice gets checked live, not at audit time.",
    tag: "50+ real-time checks",
  },
  {
    title: "AI Pays Off First In Payables",
    desc: "Invoices outgrow finance teams. AI agents match, flag and chase, with results in the first billing cycle.",
    tag: "Agentic 3-way matching",
  },
  {
    title: "The Mid-Market Is Wide Open",
    desc: "Legacy suites were built for the Fortune 500. Your clients need modular S2P on the ERP they already run.",
    tag: "Any ERP · Start with one module",
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

const PARTNER_TYPES = [
  {
    title: "ERP Implementation Partners",
    desc: "Your ERP go-live stops at the purchase order. Extend the project into supplier onboarding, invoice automation and RFx — on SAP, Oracle, Dynamics or whichever ERP the client runs.",
    tag: "Resell & implement",
    icon: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
        <path d="M10 6.5h2.5a1.5 1.5 0 0 1 1.5 1.5v6" />
      </>
    ),
  },
  {
    title: "Financial Consulting & CA Firms",
    desc: "Your audits keep finding duplicate payments, non-compliant vendors and GST mismatches. Recommend the system that stops them recurring — and earn on every client you introduce.",
    tag: "Refer",
    icon: (
      <>
        <rect x="4" y="3" width="16" height="18" rx="2.5" />
        <path d="M8.5 12.5l2.5 2.5 4.5-5" />
      </>
    ),
  },
  {
    title: "Fintech & Financing Providers",
    desc: "An invoice that's verified, matched and approved is an invoice you can finance. Plug into a platform where supplier and invoice data is already clean and compliant.",
    tag: "Strategic alliance",
    icon: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2.5" />
        <path d="M7 14h4" />
        <path d="M7 10h10" />
      </>
    ),
  },
  {
    title: "IT Services & System Integrators",
    desc: "Add a ready-made S2P practice to your catalogue. Integration, data migration and managed support become recurring revenue on a platform you didn't have to build.",
    tag: "Resell & implement",
    icon: (
      <>
        <path d="M8 8l-4 4 4 4" />
        <path d="M16 8l4 4-4 4" />
        <path d="M13.5 6l-3 12" />
      </>
    ),
  },
];

const ENROLL_STEPS = [
  { title: "Tell Us About Your Practice", desc: "Two minutes. Who you serve, where you operate and how you'd like to work together." },
  { title: "Meet Your Partner Manager", desc: "A focused call to agree your partnership model, territory and first target accounts." },
  { title: "Get Enabled And Go To Market", desc: "Training, a demo environment, pitch material — and our team alongside you on your first deals." },
];

const PRACTICE_OPTIONS = [
  "ERP Implementation Partner",
  "Financial Consulting / CA Firm",
  "Fintech & Financing Provider",
  "IT Services / System Integrator",
  "Other",
];

const MODEL_OPTIONS = ["Not sure yet", "Resell & implement", "Refer", "Strategic alliance"];

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

function PartnerTypes() {
  return (
    <section className="pt-types">
      <div className="pt-inner">
        <div className="pt-types-head sr">
          <div>
            <Eyebrow>Who Partners With Us</Eyebrow>
            <h2>
              Built For Firms That Already
              <br />
              <span>Sit With Finance.</span>
            </h2>
          </div>
          <p>If CFOs and procurement heads already trust you, you have the hardest part of an enterprise sale. We bring the rest.</p>
        </div>
        <div className="pt-types-grid">
          {PARTNER_TYPES.map((t, i) => (
            <div className={`pt-type-card sr${i ? ` sr-d${Math.min(i + 1, 3)}` : ""}`} key={t.title}>
              <div className="pt-type-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {t.icon}
                </svg>
              </div>
              <h3>{t.title}</h3>
              <p>{t.desc}</p>
              <span className="pt-type-tag">{t.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PartnerEnroll() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", country: "", practice: "", model: "Not sure yet", message: "" });
  const [consent, setConsent] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidEmail(form.email)) {
      setError("Please enter a valid work email.");
      return;
    }
    if (!consent) {
      setError("Please agree to the Privacy Policy to continue.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      await submitPartnerForm({ ...form, marketingOptIn: marketing });
      setSubmitted(true);
      trackLead("partner_enquiry", { form_type: "lead" });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "";
      trackFormError("partner_enquiry", { form_type: "lead", message: msg || "submit_failed" });
      setError(
        msg.includes("not configured")
          ? "Form is temporarily unavailable. Please email us directly."
          : "Something went wrong. Please try again or email us directly.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="pt-enroll" id="enroll">
      <div className="pt-enroll-inner">
        <div className="pt-enroll-left sr">
          <Eyebrow dark>How To Enroll</Eyebrow>
          <h2>
            From First Conversation
            <br />
            To First Deal. <span>In 3 Steps.</span>
          </h2>
          <div className="pt-enroll-steps">
            {ENROLL_STEPS.map((st, i) => (
              <div className="pt-enroll-step" key={st.title}>
                <div className={`pt-enroll-num${i === 2 ? " pt-enroll-num-gold" : ""}`}>{i + 1}</div>
                <div>
                  <h3>{st.title}</h3>
                  <p>{st.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-enroll-card sr sr-d2">
          {submitted ? (
            <div className="pt-enroll-done">
              <div className="pt-enroll-check">
                <svg width="26" height="26" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2.5 7.5l3 3 6-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3>Thank you!</h3>
              <p>Our partner team will reach out within 1 business day.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h3 className="pt-form-title">Want More Details?</h3>
              <p className="pt-form-sub">Talk to our partner team. We reply within 1 business day.</p>
              <div className="pt-form-grid">
                <label>Full name<span className="pt-req">*</span>
                  <input type="text" required autoComplete="name" value={form.name} onChange={set("name")} />
                </label>
                <label>Work email<span className="pt-req">*</span>
                  <input type="email" required autoComplete="email" value={form.email} onChange={set("email")} />
                </label>
                <label>Phone (with country code)<span className="pt-req">*</span>
                  <input type="tel" required autoComplete="tel" placeholder="+91" value={form.phone} onChange={set("phone")} />
                </label>
                <label>Company<span className="pt-req">*</span>
                  <input type="text" required autoComplete="organization" value={form.company} onChange={set("company")} />
                </label>
                <label>Country<span className="pt-req">*</span>
                  <input type="text" required autoComplete="country-name" value={form.country} onChange={set("country")} />
                </label>
                <label>Your practice<span className="pt-req">*</span>
                  <select required value={form.practice} onChange={set("practice")}>
                    <option value="" disabled>Select</option>
                    {PRACTICE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </label>
                <label className="pt-form-full">How would you like to partner?
                  <select value={form.model} onChange={set("model")}>
                    {MODEL_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </label>
                <label className="pt-form-full">Anything we should know? (optional)
                  <textarea rows={3} value={form.message} onChange={set("message")} />
                </label>
              </div>
              <ConsentCheckboxes
                idPrefix="partner"
                consent={consent}
                onConsentChange={setConsent}
                marketing={marketing}
                onMarketingChange={setMarketing}
                style={{ marginTop: 16 }}
              />
              {error && <p className="pt-form-error" role="alert">{error}</p>}
              <button type="submit" className="pt-form-submit" disabled={submitting || !consent}>
                {submitting ? "Sending…" : "Request Partner Details →"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   Statement section (placeholder copy, mirrors Supplier Portal urgency block)
═══════════════════════════════════════════════════════════ */
function PartnersStatement() {
  const w = useWidth(); const isMobile = w < 640;
  const lineCount = 36;
  const ref = useReveal();
  return (
    <section style={{
      position: "relative", overflow: "hidden",
      background: [
        "radial-gradient(ellipse 55% 60% at 0% 0%,   #FCC96B 0%, transparent 65%)",
        "radial-gradient(ellipse 50% 55% at 100% 0%,  #FCBB4A 0%, transparent 60%)",
        "radial-gradient(ellipse 40% 50% at 100% 100%,#F5C86A 0%, transparent 55%)",
        "radial-gradient(ellipse 30% 40% at 0% 80%,   #FDD08A 0%, transparent 55%)",
        "#ffffff",
      ].join(","),
      minHeight: "80vh",
      display: "flex", flexDirection: "column", justifyContent: "center",
      padding: isMobile ? "52px 20px 62px" : "clamp(62px,9vh,104px) 5vw",
    }}>
      <div style={{ position: "absolute", inset: 0, display: "flex", pointerEvents: "none", zIndex: 0, WebkitMaskImage: "linear-gradient(90deg, transparent 0%, rgba(0,0,0,.08) 25%, rgba(0,0,0,.28) 50%, rgba(0,0,0,.55) 70%, rgba(0,0,0,.7) 100%)", maskImage: "linear-gradient(90deg, transparent 0%, rgba(0,0,0,.08) 25%, rgba(0,0,0,.28) 50%, rgba(0,0,0,.55) 70%, rgba(0,0,0,.7) 100%)" }}>
        {Array.from({ length: lineCount }).map((_, i) => (
          <div key={i} style={{ flex: 1, borderRight: "1px dashed rgba(200,140,40,.35)" }} />
        ))}
      </div>

      <div style={{ maxWidth: 1040, margin: "0 auto", position: "relative", zIndex: 1, width: "100%", textAlign: "center" }}>
        <div className="reveal" ref={ref} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{
            fontFamily: "Georgia, serif", fontSize: isMobile ? 120 : 200,
            lineHeight: .7, color: "#C8930A", opacity: .22,
            userSelect: "none", marginBottom: isMobile ? -24 : -48,
          }}>"</div>
          <blockquote style={{ margin: 0, padding: 0 }}>
            <p className="kalam" style={{
              fontSize: isMobile ? "clamp(22px,6vw,32px)" : "clamp(26px,2.9vw,44px)",
              lineHeight: 1.35, letterSpacing: ".005em",
              color: "#1a1a3e", margin: 0,
            }}>
              Introducing NimbleS2P, a{" "}
              <span className="kalam-highlight">compliance-first AI platform</span>{" "}
              designed around how enterprises actually work — supplier-heavy, process-intensive, approval-driven, and audit-sensitive.
            </p>
          </blockquote>
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

        <PartnersStatement />

        <div className="pt-divider" aria-hidden="true" />

        {/* ══ THE OPPORTUNITY ══ */}
        <section className="pt-section" id="program">
          <div className="pt-inner pt-opp">
            <div className="pt-opp-left">
              <div className="sr">
                <Eyebrow>The Opportunity</Eyebrow>
                <h2>
                  Why Source-to-Pay Just Moved Up <span>The CFO's Agenda.</span>
                </h2>
              </div>
              <div className="pt-steps">
                {OPPORTUNITY.map((o, i) => (
                  <div className="pt-step sr" key={o.title}>
                    <div className="pt-step-num">0{i + 1}</div>
                    <h3>{o.title}</h3>
                    <p>{o.desc}</p>
                    <span className="pt-step-tag">{o.tag}</span>
                  </div>
                ))}
              </div>
            </div>

            <aside className="pt-market sr sr-d2">
              <Eyebrow dark>Global S2P Market</Eyebrow>
              <div className="pt-market-big">$9B+</div>
              <p className="pt-market-sub">in 2025, growing about 10% a year through 2035.</p>
              <div className="pt-market-chart">
                <div className="pt-market-bars">
                  <div className="pt-market-col">
                    <div className="pt-market-bar pt-market-bar-a" style={{ height: `${(9 / 22.9) * 100}%` }} />
                  </div>
                  <div className="pt-market-col">
                    <div className="pt-market-bar pt-market-bar-b" style={{ height: "100%" }} />
                  </div>
                </div>
                <div className="pt-market-labels">
                  <span>2025 · $9.0B</span>
                  <span>2035 · $22.9B</span>
                </div>
              </div>
              <p className="pt-market-src">Source: Emergen Research, Source to Pay Market Report (2025–2035). Estimates vary by firm.</p>
            </aside>
          </div>
        </section>

        {/* ══ PLATFORM MODULES ══ */}
        <ModulesSection />

        <PartnerTypes />

        <PartnerEnroll />
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
.partners-page .pt-enroll{background:linear-gradient(160deg,#0F0C2A 0%,#1a1260 45%,#221868 100%);padding:clamp(56px,8vh,96px) 5vw;position:relative;overflow:hidden;}
.partners-page .pt-enroll-inner{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:start;}
.partners-page .pt-enroll-left h2{font-size:clamp(30px,3.6vw,48px);font-weight:900;letter-spacing:-.045em;line-height:1.05;color:#fff;margin-bottom:44px;}
.partners-page .pt-enroll-left h2 span{background:linear-gradient(95deg,#F5D060,#F5A623);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;}
.partners-page .pt-enroll-steps{display:flex;flex-direction:column;gap:14px;}
.partners-page .pt-enroll-step{display:flex;gap:16px;align-items:flex-start;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:18px;padding:22px;}
.partners-page .pt-enroll-num{width:44px;height:44px;border-radius:12px;background:#3B1FA3;color:#fff;font-weight:800;font-size:18px;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-family:var(--fb);}
.partners-page .pt-enroll-num-gold{background:linear-gradient(135deg,#E8920A,#F5B020);box-shadow:0 6px 22px rgba(232,150,10,.4);}
.partners-page .pt-enroll-step h3{font-size:18px;font-weight:800;letter-spacing:-.02em;color:#fff;margin-bottom:4px;}
.partners-page .pt-enroll-step p{font-family:var(--fb);font-size:15px;line-height:1.6;color:rgba(255,255,255,.62);}
.partners-page .pt-enroll-card{background:#fff;border-radius:24px;padding:36px;box-shadow:0 24px 70px rgba(0,0,0,.35);}
.partners-page .pt-form-title{font-size:24px;font-weight:900;letter-spacing:-.035em;color:#0F172A;margin-bottom:6px;}
.partners-page .pt-form-sub{font-family:var(--fb);font-size:14px;color:#64748B;margin-bottom:22px;}
.partners-page .pt-form-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px 16px;}
.partners-page .pt-form-grid label{display:flex;flex-direction:column;gap:7px;font-family:var(--fb);font-size:13px;font-weight:600;color:#1E293B;}
.partners-page .pt-form-full{grid-column:1/-1;}
.partners-page .pt-req{color:#6320E0;margin-left:3px;}
.partners-page .pt-form-grid input,.partners-page .pt-form-grid select,.partners-page .pt-form-grid textarea{width:100%;font-family:var(--fb);font-size:15px;font-weight:400;color:#0F172A;background:#F8F7FF;border:1px solid #E2DDF5;border-radius:12px;padding:13px 14px;outline:none;transition:border-color .2s,box-shadow .2s;}
.partners-page .pt-form-grid textarea{resize:vertical;min-height:84px;}
.partners-page .pt-form-grid input:focus,.partners-page .pt-form-grid select:focus,.partners-page .pt-form-grid textarea:focus{border-color:#8B5CF6;box-shadow:0 0 0 3px rgba(139,92,246,.18);}
.partners-page .pt-form-error{font-family:var(--fb);font-size:13px;color:#DC2626;margin-top:12px;}
.partners-page .pt-form-submit{width:100%;margin-top:18px;border:none;cursor:pointer;background:linear-gradient(135deg,#E8920A,#F5B020);color:#fff;border-radius:12px;padding:16px;font-size:16px;font-weight:700;font-family:var(--fb);box-shadow:0 6px 28px rgba(232,150,10,.4);transition:transform .2s,opacity .2s;}
.partners-page .pt-form-submit:hover:not(:disabled){transform:translateY(-2px);}
.partners-page .pt-form-submit:disabled{opacity:.55;cursor:not-allowed;}
.partners-page .pt-enroll-done{text-align:center;padding:48px 8px;}
.partners-page .pt-enroll-done h3{font-size:26px;font-weight:900;color:#0F172A;margin:16px 0 8px;}
.partners-page .pt-enroll-done p{font-family:var(--fb);color:#64748B;font-size:15px;}
.partners-page .pt-enroll-check{width:56px;height:56px;border-radius:50%;background:#EEE8FD;color:#6320E0;display:inline-flex;align-items:center;justify-content:center;}
.partners-page .pt-types{padding:clamp(64px,9vh,104px) 5vw;background:#F3F0FF;}
.partners-page .pt-types-head{display:grid;grid-template-columns:1.2fr 1fr;gap:64px;align-items:center;margin-bottom:44px;}
.partners-page .pt-types-head h2{font-size:clamp(28px,3.4vw,46px);font-weight:900;letter-spacing:-.045em;line-height:1.06;color:#0F172A;}
.partners-page .pt-types-head h2 span{color:var(--p600,#5B21D8);}
.partners-page .pt-types-head p{font-family:var(--fb);font-size:16px;line-height:1.7;color:#5B6580;max-width:440px;}
.partners-page .pt-types-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;align-items:stretch;}
.partners-page .pt-type-card{display:flex;flex-direction:column;background:#fff;border:1px solid #E4DDFA;border-radius:20px;padding:24px;transition:transform .25s ease,box-shadow .25s ease,border-color .25s ease;}
.partners-page .pt-type-card:hover{transform:translateY(-4px);border-color:#B9A6F2;box-shadow:0 16px 40px rgba(99,32,224,.14);}
.partners-page .pt-type-icon{width:48px;height:48px;border-radius:14px;background:#EEE8FD;color:var(--p600,#5B21D8);display:flex;align-items:center;justify-content:center;margin-bottom:22px;}
.partners-page .pt-type-card h3{font-size:18px;font-weight:800;letter-spacing:-.02em;line-height:1.3;color:#0F172A;margin-bottom:12px;}
.partners-page .pt-type-card p{font-family:var(--fb);font-size:15px;line-height:1.65;color:#5B6580;margin-bottom:22px;}
.partners-page .pt-type-tag{margin-top:auto;align-self:flex-start;background:#EEE8FD;color:#2E1065;font-family:var(--fb);font-size:11px;font-weight:700;padding:4px 10px;border-radius:999px;}
.partners-page .pt-section{padding:clamp(64px,9vh,104px) 5vw;background:#fff;}
.partners-page .pt-section-tint{background:#F7F8FC;}
.partners-page .pt-inner{max-width:1080px;margin:0 auto;}
.partners-page .pt-section-head{margin-bottom:56px;}
.partners-page .pt-section-head h2{font-size:clamp(26px,3vw,40px);font-weight:900;letter-spacing:-.04em;line-height:1.08;color:#0F172A;margin-bottom:10px;}
.partners-page .pt-section-head p{font-family:var(--fb);font-size:15px;color:#64748B;line-height:1.7;max-width:520px;}

/* ── The opportunity (timeline + market card) ── */
.partners-page .pt-opp{display:grid;grid-template-columns:1.1fr .9fr;gap:72px;align-items:stretch;}
.partners-page .pt-opp-left h2{font-size:clamp(30px,3.6vw,48px);font-weight:900;letter-spacing:-.045em;line-height:1.05;color:#0F172A;margin-bottom:44px;}
.partners-page .pt-opp-left h2 span{color:var(--p600,#5B21D8);}
.partners-page .pt-steps{position:relative;display:flex;flex-direction:column;gap:34px;padding-left:48px;}
.partners-page .pt-steps::before{content:'';position:absolute;left:11px;top:12px;bottom:12px;width:2px;background:linear-gradient(180deg,var(--p500),var(--p300) 60%,#E2E8F0);}
.partners-page .pt-step{position:relative;}
.partners-page .pt-step::before{content:'';position:absolute;left:-48px;top:-1px;width:24px;height:24px;border-radius:50%;background:var(--p500);box-shadow:0 0 0 4px rgba(99,32,224,.14);}
.partners-page .pt-step-num{font-family:var(--fb);font-size:12px;font-weight:800;letter-spacing:.12em;color:var(--p500);margin-bottom:6px;}
.partners-page .pt-step h3{font-size:clamp(20px,2vw,26px);font-weight:800;letter-spacing:-.03em;line-height:1.2;color:#0F172A;margin-bottom:8px;}
.partners-page .pt-step p{font-family:var(--fb);font-size:16px;color:#64748B;line-height:1.65;margin-bottom:14px;max-width:460px;}
.partners-page .pt-step-tag{display:inline-block;background:#EEE8FD;color:#2E1065;font-family:var(--fb);font-size:12px;font-weight:700;padding:6px 12px;border-radius:999px;}
.partners-page .pt-market{position:relative;overflow:hidden;display:flex;flex-direction:column;border-radius:28px;padding:40px 32px 32px;background:linear-gradient(160deg,#0F0C2A 0%,#1a1260 50%,#221868 100%);color:#fff;}
.partners-page .pt-market::before{content:'';position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse 60% 40% at 90% 0%,rgba(245,166,35,.2),transparent 65%);}
.partners-page .pt-market>*{position:relative;}
.partners-page .pt-market-big{font-family:var(--fb);font-size:clamp(72px,8vw,120px);font-weight:900;letter-spacing:-.06em;line-height:1;margin:4px 0 14px;background:linear-gradient(95deg,#fff 0%,#fff 45%,#F5D060 100%);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;}
.partners-page .pt-market-sub{font-family:var(--fb);font-size:18px;line-height:1.6;color:rgba(255,255,255,.7);max-width:340px;}
.partners-page .pt-market-chart{margin-top:auto;padding:22px;border-radius:20px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);}
.partners-page .pt-market-bars{display:grid;grid-template-columns:1fr 1fr;gap:12px;align-items:end;height:150px;}
.partners-page .pt-market-col{height:100%;display:flex;align-items:flex-end;}
.partners-page .pt-market-bar{width:100%;border-radius:12px 12px 0 0;}
.partners-page .pt-market-bar-a{background:linear-gradient(180deg,#8B5CF6,#5B21D8);}
.partners-page .pt-market-bar-b{background:linear-gradient(180deg,#E8A030,#F0B040);box-shadow:0 0 36px rgba(245,166,35,.3);}
.partners-page .pt-market-labels{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:10px;font-family:var(--fb);font-size:14px;font-weight:600;color:rgba(255,255,255,.85);}
.partners-page .pt-market-src{font-family:var(--fb);font-size:13px;line-height:1.55;color:rgba(255,255,255,.5);margin-top:18px;}

/* ── Responsive ── */
@media(max-width:900px){
  .partners-page .pt-opp{grid-template-columns:1fr;gap:48px;}
  .partners-page .pt-market{min-height:420px;}
  .partners-page .pt-types-grid{grid-template-columns:repeat(2,1fr);}
  .partners-page .pt-enroll-inner{grid-template-columns:1fr;gap:40px;}
  .partners-page .pt-types-head{gap:32px;}
}
@media(max-width:640px){
  .partners-page .pt-hero{padding:116px 20px 80px;min-height:0;}
  .partners-page .pt-hero p{font-size:15px;}
  .partners-page .pt-section{padding:64px 20px;}
  .partners-page .pt-types{padding:64px 20px;}
  .partners-page .pt-enroll{padding:64px 20px;}
  .partners-page .pt-enroll-card{padding:24px 20px;}
  .partners-page .pt-form-grid{grid-template-columns:1fr;}
  .partners-page .pt-types-head{grid-template-columns:1fr;gap:16px;}
  .partners-page .pt-types-grid{grid-template-columns:1fr;}
  .partners-page .pt-steps{padding-left:40px;gap:28px;}
  .partners-page .pt-step::before{left:-40px;}
  .partners-page .pt-market{padding:32px 22px 24px;}
}
`;
