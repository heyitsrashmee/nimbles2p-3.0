"use client";

import { useState } from "react";
import { Nav } from "@/components/layout/SiteNav";
import { VDDFooter } from "@/components/layout/VDDFooter";
import { useWidth } from "@/components/shared/pageUi";
import { submitGetStartedForm } from "@/lib/web3forms";

/* ═══════════════════════════════════════════════════════════
   GET STARTED — LEAD CAPTURE PAGE
═══════════════════════════════════════════════════════════ */
const FREE_EMAIL_DOMAINS = ["gmail","yahoo","hotmail","outlook","rediffmail","icloud","aol","protonmail","ymail","live","msn","me","mac","googlemail","yandex","zoho"];

function isPersonalEmail(email) {
  const domain = (email.split("@")[1] || "").split(".")[0].toLowerCase();
  return FREE_EMAIL_DOMAINS.includes(domain);
}

/* Defined at module scope so React does not remount inputs on every parent re-render. */
function FormField({
  id,
  label,
  type = "text",
  placeholder,
  required,
  half,
  isMobile,
  value,
  error,
  isTouched,
  onChange,
  onBlur,
}) {
  const hasErr = isTouched && error;
  const isOk = isTouched && !error && value.trim();
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:6, gridColumn: half && !isMobile ? "span 1" : "span 1" }}>
      <label htmlFor={id} style={{ fontFamily:"var(--fb)", fontSize:13, fontWeight:700, color:"#334155", letterSpacing:"-.01em" }}>
        {label} {required && <span style={{ color:"#6320E0" }}>*</span>}
      </label>
      <div style={{ position:"relative" }}>
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          style={{
            width:"100%", fontFamily:"var(--fb)", fontSize:15, color:"#0F172A",
            background: hasErr ? "#FFF5F5" : "#fff",
            border:`1.5px solid ${hasErr ? "#EF4444" : isOk ? "#059669" : "#CBD5E1"}`,
            borderRadius:12, padding:"13px 44px 13px 16px", outline:"none",
            transition:"border-color .18s, background .18s, box-shadow .18s",
            boxShadow: hasErr ? "0 0 0 3px rgba(239,68,68,.1)" : isOk ? "0 0 0 3px rgba(5,150,105,.08)" : "none",
            boxSizing:"border-box",
          }}
          onFocus={(e) => { if (!hasErr) { e.target.style.borderColor = "#6320E0"; e.target.style.boxShadow = "0 0 0 3px rgba(99,32,224,.1)"; } }}
          onBlurCapture={(e) => { if (!hasErr && !isOk) { e.target.style.borderColor = "#CBD5E1"; e.target.style.boxShadow = "none"; } }}
        />
        {isOk && (
          <div style={{ position:"absolute", right:14, top:"50%", transform:"translateY(-50%)" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="8" fill="#059669"/><path d="M5 8l2.5 2.5L11 5.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        )}
        {hasErr && (
          <div style={{ position:"absolute", right:14, top:"50%", transform:"translateY(-50%)" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="8" fill="#EF4444"/><path d="M8 5v3.5M8 10.5v.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/></svg>
          </div>
        )}
      </div>
      {hasErr && (
        <div style={{ fontFamily:"var(--fb)", fontSize:12, color:"#EF4444", display:"flex", alignItems:"center", gap:5 }}>
          <span>⚠</span> {error}
        </div>
      )}
    </div>
  );
}

export default function GetStartedPage({ onBack, onNavigate }) {
  const w = useWidth(); const isMobile = w < 640;

  const [form, setForm]   = useState({ name:"", email:"", phone:"", designation:"", company:"" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const validate = (fields) => {
    const e = {};
    if (!fields.name.trim())  e.name = "Full name is required";
    if (!fields.email.trim()) {
      e.email = "Work email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
      e.email = "Enter a valid email address";
    } else if (isPersonalEmail(fields.email)) {
      e.email = "Please use your professional / work email";
    }
    if (!fields.phone.trim()) {
      e.phone = "Phone number is required";
    } else if (!/^\+?[\d\s\-().]{7,20}$/.test(fields.phone.trim())) {
      e.phone = "Enter a valid phone number";
    }
    return e;
  };

  const handleChange = (field, value) => {
    const next = { ...form, [field]: value };
    setForm(next);
    if (touched[field]) {
      setErrors(validate(next));
    }
  };

  const handleBlur = (field) => {
    const next = { ...touched, [field]: true };
    setTouched(next);
    setErrors(validate(form));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const allTouched = { name:true, email:true, phone:true, designation:true, company:true };
    setTouched(allTouched);
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    setSubmitError("");
    try {
      await submitGetStartedForm(form);
      setSubmitted(true);
    } catch {
      setSubmitError("Something went wrong. Please try again or email us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Nav onNavigate={onNavigate} onBack={onBack} pageName="Get Started" />
      <main>

        {/* ── HERO BAND ── */}
        <section style={{
          minHeight:"100vh", position:"relative", overflow:"hidden",
          background:"#F5F3FF",
          display:"flex", alignItems:"center", justifyContent:"center",
          padding: isMobile ? "110px 20px 60px" : "128px 5vw 80px",
        }}>
          {/* Top accent line — same as Platform Modules */}
          <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:"linear-gradient(90deg,var(--p500),var(--p300),#F59E0B)", pointerEvents:"none" }} />
          {/* Subtle dot grid */}
          <div style={{ position:"absolute", inset:0, pointerEvents:"none", backgroundImage:"radial-gradient(rgba(99,32,224,.07) 1px,transparent 1px)", backgroundSize:"28px 28px" }} />
          {/* Soft corner glows */}
          <div style={{ position:"absolute", top:"-10%", left:"-5%", width:"45%", height:"60%", background:"radial-gradient(ellipse, rgba(99,32,224,.08) 0%, transparent 65%)", pointerEvents:"none" }} />
          <div style={{ position:"absolute", bottom:"-10%", right:"-5%", width:"45%", height:"60%", background:"radial-gradient(ellipse, rgba(245,166,35,.06) 0%, transparent 65%)", pointerEvents:"none" }} />

          <div style={{ position:"relative", zIndex:2, width:"100%", maxWidth:1040, display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 48 : 80, alignItems:"center" }}>

            {/* Left — copy */}
            <div>
              {/* Eyebrow */}
              <div className="fade-up" style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(99,32,224,.1)", border:"1px solid rgba(99,32,224,.2)", borderRadius:100, padding:"6px 16px", marginBottom:24 }}>
                <span style={{ width:6, height:6, borderRadius:"50%", background:"#6320E0", display:"inline-block", animation:"pulse-dot 2s infinite" }} />
                <span style={{ fontSize:11, fontWeight:700, color:"#391085", fontFamily:"var(--fb)", letterSpacing:".08em", textTransform:"uppercase" }}>Get Started</span>
              </div>

              <h1 className="fade-up d1" style={{
                fontFamily:"var(--fb)", fontWeight:700, letterSpacing:"-.03em", lineHeight:1.05,
                fontSize: isMobile ? "clamp(26px,7vw,34px)" : "clamp(28px,3vw,42px)",
                color:"#0A0F1E",
                marginBottom:20,
              }}>
                Your Smarter<br />S2P Journey<br /><span style={{ color:"#391085", fontWeight:900 }}>Starts Here.</span>
              </h1>

              <p className="fade-up d2" style={{ fontSize: isMobile ? 15 : 17, color:"#475569", lineHeight:1.78, fontFamily:"var(--fb)", marginBottom:36, maxWidth:480 }}>
                Tell us a little about yourself and your organisation. Our team will reach out within one business day to walk you through NimbleS2P — tailored to your procurement priorities.
              </p>

              {/* Trust signals */}
              <div className="fade-up d3" style={{ display:"flex", flexDirection:"column", gap:12 }}>
                {[
                  ["🔒", "Your data is safe", "We never share or sell your information."],
                  ["⚡", "Response within 1 business day", "A real human, not a bot, will reach out."],
                  ["🎯", "Personalised walkthrough", "Tailored to your industry and role."],
                ].map(([icon, title, sub]) => (
                  <div key={title} style={{ display:"flex", alignItems:"center", gap:12 }}>
                    <div style={{ width:38, height:38, borderRadius:11, background:"rgba(99,32,224,.1)", border:"1px solid rgba(99,32,224,.18)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:17, flexShrink:0 }}>{icon}</div>
                    <div>
                      <div style={{ fontFamily:"var(--fb)", fontSize:13.5, fontWeight:700, color:"#1E293B", lineHeight:1.2 }}>{title}</div>
                      <div style={{ fontFamily:"var(--fb)", fontSize:12, color:"#94A3B8", lineHeight:1.3, marginTop:2 }}>{sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — form card */}
            <div className="fade-up d2" style={{
              background:"#fff",
              border:"1.5px solid rgba(99,32,224,.15)",
              borderRadius:24,
              boxShadow:"0 8px 48px rgba(99,32,224,.1), 0 2px 8px rgba(0,0,0,.04)",
              padding: isMobile ? "28px 22px" : "40px 36px",
              position:"relative", overflow:"hidden",
            }}>
              {/* Card top accent */}
              <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:"linear-gradient(90deg,#6320E0,#8B5CF6,#F5A623)", borderRadius:"24px 24px 0 0", pointerEvents:"none" }} />

              {!submitted ? (
                <>
                  <div style={{ marginBottom:28 }}>
                    <div style={{ fontFamily:"var(--fb)", fontSize: isMobile ? 18 : 21, fontWeight:900, color:"#0F172A", letterSpacing:"-.03em", lineHeight:1.2, marginBottom:6 }}>Tell us about yourself</div>
                    <div style={{ fontFamily:"var(--fb)", fontSize:13, color:"#94A3B8" }}>Fields marked <span style={{ color:"#6320E0" }}>*</span> are required</div>
                  </div>

                  <form onSubmit={handleSubmit} noValidate style={{ display:"flex", flexDirection:"column", gap:16 }}>
                    <FormField id="name" label="Full Name" placeholder="e.g. Rahul Sharma" required isMobile={isMobile} value={form.name} error={errors.name} isTouched={touched.name} onChange={(v) => handleChange("name", v)} onBlur={() => handleBlur("name")} />
                    <FormField id="email" label="Work Email" type="email" placeholder="you@company.com" required isMobile={isMobile} value={form.email} error={errors.email} isTouched={touched.email} onChange={(v) => handleChange("email", v)} onBlur={() => handleBlur("email")} />
                    <FormField id="phone" label="Phone Number" type="tel" placeholder="+91 98765 43210" required isMobile={isMobile} value={form.phone} error={errors.phone} isTouched={touched.phone} onChange={(v) => handleChange("phone", v)} onBlur={() => handleBlur("phone")} />
                    <FormField id="designation" label="Designation" placeholder="e.g. VP Procurement" isMobile={isMobile} value={form.designation} error={errors.designation} isTouched={touched.designation} onChange={(v) => handleChange("designation", v)} onBlur={() => handleBlur("designation")} />
                    <FormField id="company" label="Company Name" placeholder="e.g. Tata Motors" isMobile={isMobile} value={form.company} error={errors.company} isTouched={touched.company} onChange={(v) => handleChange("company", v)} onBlur={() => handleBlur("company")} />

                    {submitError && (
                      <p style={{ fontFamily:"var(--fb)", fontSize:13, color:"#EF4444", margin:0, textAlign:"center" }}>
                        {submitError}
                      </p>
                    )}

                    {/* Submit */}
                    <button type="submit" disabled={submitting}
                      style={{
                        marginTop:4, width:"100%",
                        background: submitting ? "rgba(99,32,224,.5)" : "linear-gradient(135deg,#6320E0,#8B5CF6)",
                        color:"#fff", border:"none", borderRadius:12,
                        padding:"15px 24px", fontSize:16, fontWeight:700,
                        cursor: submitting ? "not-allowed" : "pointer",
                        fontFamily:"var(--fb)", letterSpacing:"-.01em",
                        boxShadow: submitting ? "none" : "0 6px 24px rgba(99,32,224,.4)",
                        transition:"all .2s",
                        display:"flex", alignItems:"center", justifyContent:"center", gap:10,
                      }}
                      onMouseEnter={e=>{ if(!submitting){ e.currentTarget.style.transform="translateY(-1px)"; e.currentTarget.style.boxShadow="0 10px 32px rgba(99,32,224,.55)"; }}}
                      onMouseLeave={e=>{ e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow=submitting?"none":"0 6px 24px rgba(99,32,224,.4)"; }}
                    >
                      {submitting ? (
                        <>
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ animation:"spin 1s linear infinite" }}>
                            <circle cx="9" cy="9" r="7" stroke="rgba(255,255,255,.3)" strokeWidth="2"/>
                            <path d="M9 2a7 7 0 0 1 7 7" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                          Submitting…
                        </>
                      ) : "Get Started →"}
                    </button>

                    <p style={{ fontFamily:"var(--fb)", fontSize:11.5, color:"#94A3B8", textAlign:"center", margin:0 }}>
                      By submitting, you agree to our <span style={{ color:"#6320E0", cursor:"pointer" }}>Privacy Policy</span>. No spam, ever.
                    </p>
                  </form>
                </>
              ) : (
                /* ── SUCCESS STATE ── */
                <div style={{ textAlign:"center", padding: isMobile ? "24px 0" : "40px 0" }}>
                  <div style={{ width:80, height:80, borderRadius:"50%", background:"linear-gradient(135deg,#059669,#10B981)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 24px", boxShadow:"0 8px 32px rgba(16,185,129,.3)" }}>
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                      <path d="M8 18l7 7L28 10" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div style={{ fontFamily:"var(--fb)", fontSize: isMobile ? 22 : 26, fontWeight:900, color:"#0F172A", letterSpacing:"-.03em", marginBottom:10 }}>You're on the list!</div>
                  <div style={{ fontFamily:"var(--fb)", fontSize:15, color:"#64748B", lineHeight:1.7, maxWidth:320, margin:"0 auto 32px" }}>
                    Thanks, <strong style={{ color:"#391085" }}>{form.name.split(" ")[0]}</strong>. Our team will be in touch at <strong style={{ color:"#6320E0" }}>{form.email}</strong> within one business day.
                  </div>
                  <button onClick={()=>onNavigate("home")}
                    style={{ display:"inline-flex", alignItems:"center", gap:7, background:"rgba(99,32,224,.08)", border:"1.5px solid rgba(99,32,224,.2)", borderRadius:10, padding:"11px 24px", fontSize:14, fontWeight:700, color:"#6320E0", cursor:"pointer", fontFamily:"var(--fb)", transition:"all .2s" }}
                    onMouseEnter={e=>{ e.currentTarget.style.background="rgba(99,32,224,.15)"; e.currentTarget.style.color="#391085"; }}
                    onMouseLeave={e=>{ e.currentTarget.style.background="rgba(99,32,224,.08)"; e.currentTarget.style.color="#6320E0"; }}
                  >← Back to Home</button>
                </div>
              )}
            </div>

          </div>
        </section>

      </main>
      <VDDFooter onNavigate={onNavigate} />

      {/* Spin animation for loader */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </>
  );
}
