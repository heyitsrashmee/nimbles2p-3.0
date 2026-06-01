"use client";

import { useState } from "react";
import { Nav } from "@/components/layout/SiteNav";
import { VDDFooter } from "@/components/layout/VDDFooter";
import { useWidth } from "@/components/shared/pageUi";
import { submitBookDemoForm } from "@/lib/web3forms";
import { trackLead } from "@/lib/analytics";

const INDUSTRIES = ["Manufacturing","Energy & Utilities","Chemical","FMCG","Infra & Construction","Textile","Hospitality","Media","Financial Services","Healthcare","Other"];
const SIZES = ["1–50","51–200","201–500","501–1000","1001–5000","5000+"];
const TIMELINES = ["Immediately","Within 1 month","1–3 months","3–6 months","Just exploring"];
const MODULES_LIST = ["VDD & Onboarding","Supplier Portal","Invoice Processing","RFx Management","Early Financing","Supplier Analytics"];
const REQUIRED = ["firstName","lastName","email","company","title","employees","industry","timeline"];

function inputStyle(hasErr, isOk) {
  return {
    fontFamily:"var(--fb)", fontSize:14, color:"#0F172A",
    background: hasErr ? "#FFF5F5" : "#fff",
    border:`1.5px solid ${hasErr ? "#EF4444" : isOk ? "#059669" : "#CBD5E1"}`,
    borderRadius:10, padding:"11px 14px", outline:"none",
    transition:"border-color .18s, box-shadow .18s",
    boxShadow: hasErr ? "0 0 0 3px rgba(239,68,68,.1)" : isOk ? "0 0 0 3px rgba(5,150,105,.08)" : "none",
    width:"100%", boxSizing:"border-box",
  };
}

function DemoSectionHead({ children }) {
  return (
    <div style={{ fontSize:10.5, fontWeight:800, letterSpacing:".12em", textTransform:"uppercase", color:"#6320E0", fontFamily:"var(--fb)", marginBottom:16, paddingBottom:10, borderBottom:"1.5px solid rgba(99,32,224,.12)" }}>
      {children}
    </div>
  );
}

function DemoFormField({ id, label, required: req, error, isTouched, children }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
      <label htmlFor={id} style={{ fontFamily:"var(--fb)", fontSize:12.5, fontWeight:700, color:"#334155", letterSpacing:"-.01em" }}>
        {label}{req && <span style={{ color:"#6320E0", marginLeft:3 }}>*</span>}
      </label>
      {children}
      {isTouched && error && (
        <div style={{ fontFamily:"var(--fb)", fontSize:11.5, color:"#EF4444", display:"flex", alignItems:"center", gap:4 }}>
          <span>⚠</span> {error}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   BOOK A DEMO PAGE
═══════════════════════════════════════════════════════════ */
export default function BookDemoPage({ onBack, onNavigate }) {
  const w = useWidth(); const isMobile = w < 640;
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending]     = useState(false);
  const [form, setForm] = useState({
    firstName:"", lastName:"", email:"", phone:"",
    company:"", title:"", employees:"", industry:"",
    modules:[], challenge:"", timeline:"", message:"",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitError, setSubmitError] = useState("");

  const set = (k,v) => {
    const next = {...form,[k]:v};
    setForm(next);
    if (touched[k]) validateForm(next);
  };
  const toggleModule = (m) => set("modules", form.modules.includes(m) ? form.modules.filter(x=>x!==m) : [...form.modules,m]);

  const validateForm = (f = form) => {
    const e = {};
    REQUIRED.forEach(k=>{ if (!f[k]) e[k]="Required"; });
    if (f.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email="Valid work email required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleBlur = (k) => { setTouched(t=>({...t,[k]:true})); validateForm(); };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const allT = {}; REQUIRED.forEach(k=>allT[k]=true);
    setTouched(allT);
    if (!validateForm()) return;
    setSending(true);
    setSubmitError("");
    try {
      await submitBookDemoForm(form);
      setSubmitted(true);
      trackLead("book_demo");
    } catch {
      setSubmitError("Something went wrong. Please try again or email us at info@techpanion.com.");
    } finally {
      setSending(false);
    }
  };

  const fieldState = (id) => {
    const hasErr = touched[id] && errors[id];
    const isOk = touched[id] && !errors[id] && (Array.isArray(form[id]) ? form[id].length : form[id]);
    return { hasErr, isOk, style: inputStyle(hasErr, isOk) };
  };

  return (
    <>
      <Nav onNavigate={onNavigate} onBack={onBack} pageName="Book a Demo" />
      <main>
        <section style={{
          minHeight:"100vh", position:"relative", overflow:"hidden",
          background:"#F5F3FF",
          display:"flex", alignItems:"flex-start", justifyContent:"center",
          padding: isMobile ? "110px 20px 60px" : "100px 5vw 80px",
        }}>
          {/* Top accent line */}
          <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:"linear-gradient(90deg,var(--p500),var(--p300),#F59E0B)", pointerEvents:"none" }} />
          {/* Dot grid */}
          <div style={{ position:"absolute", inset:0, pointerEvents:"none", backgroundImage:"radial-gradient(rgba(99,32,224,.07) 1px,transparent 1px)", backgroundSize:"28px 28px" }} />
          {/* Corner glows */}
          <div style={{ position:"absolute", top:"-10%", left:"-5%", width:"45%", height:"60%", background:"radial-gradient(ellipse, rgba(99,32,224,.08) 0%, transparent 65%)", pointerEvents:"none" }} />
          <div style={{ position:"absolute", bottom:"-10%", right:"-5%", width:"45%", height:"60%", background:"radial-gradient(ellipse, rgba(245,166,35,.06) 0%, transparent 65%)", pointerEvents:"none" }} />

          <div style={{ position:"relative", zIndex:2, width:"100%", maxWidth:1100, display:"grid", gridTemplateColumns: isMobile ? "1fr" : "380px 1fr", gap: isMobile ? 40 : 64, alignItems:"flex-start" }}>

            {/* ── LEFT COLUMN — copy + trust signals ── */}
            <div style={{ position: isMobile ? "static" : "sticky", top:32 }}>
              <div className="fade-up" style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(99,32,224,.1)", border:"1px solid rgba(99,32,224,.2)", borderRadius:100, padding:"6px 16px", marginBottom:24 }}>
                <span style={{ width:6, height:6, borderRadius:"50%", background:"#6320E0", display:"inline-block", animation:"pulse-dot 2s infinite" }} />
                <span style={{ fontSize:11, fontWeight:700, color:"#391085", fontFamily:"var(--fb)", letterSpacing:".08em", textTransform:"uppercase" }}>Book a Demo</span>
              </div>

              <h1 className="fade-up d1" style={{
                fontFamily:"var(--fb)", fontWeight:700, letterSpacing:"-.03em", lineHeight:1.05,
                fontSize: isMobile ? "clamp(26px,7vw,34px)" : "clamp(28px,3vw,42px)",
                color:"#0A0F1E", marginBottom:18,
              }}>
                See <span style={{ color:"#391085", fontWeight:900 }}>NimbleS2P</span><br />in Action.
              </h1>

              <p className="fade-up d2" style={{ fontSize: isMobile ? 14.5 : 16, color:"#475569", lineHeight:1.78, fontFamily:"var(--fb)", marginBottom:32 }}>
                A focused 30-minute session configured for your industry, your team, and the modules that matter most to you. Real product. Real answers. No slides.
              </p>

              {/* Trust signals */}
              <div className="fade-up d3" style={{ display:"flex", flexDirection:"column", gap:14 }}>
                {[
                  ["📅","30-min focused session","Configured around your procurement challenges."],
                  ["🏭","Industry-specific demo","Tailored to your sector, not a generic walkthrough."],
                  ["🤝","Talk to a specialist","A real product expert — not a sales script."],
                  ["🔒","Your data is safe","We never share or sell your information."],
                ].map(([icon,title,sub]) => (
                  <div key={title} style={{ display:"flex", alignItems:"center", gap:12 }}>
                    <div style={{ width:40, height:40, borderRadius:11, background:"rgba(99,32,224,.1)", border:"1px solid rgba(99,32,224,.18)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>{icon}</div>
                    <div>
                      <div style={{ fontFamily:"var(--fb)", fontSize:13.5, fontWeight:700, color:"#1E293B", lineHeight:1.2 }}>{title}</div>
                      <div style={{ fontFamily:"var(--fb)", fontSize:12, color:"#94A3B8", lineHeight:1.35, marginTop:2 }}>{sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT COLUMN — form card ── */}
            {!submitted ? (
              <div className="fade-up d2" style={{
                background:"#fff", border:"1.5px solid rgba(99,32,224,.15)",
                borderRadius:24, boxShadow:"0 8px 48px rgba(99,32,224,.1), 0 2px 8px rgba(0,0,0,.04)",
                overflow:"hidden", position:"relative",
              }}>
                {/* Top accent */}
                <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:"linear-gradient(90deg,#6320E0,#8B5CF6,#F5A623)", pointerEvents:"none" }} />

                {/* Card header */}
                <div style={{ padding: isMobile ? "28px 24px 20px" : "32px 40px 24px", borderBottom:"1px solid #F1F5F9", display:"flex", alignItems:"center", gap:14 }}>
                  <div style={{ width:44, height:44, borderRadius:12, background:"linear-gradient(135deg,#6320E0,#8B5CF6)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0, boxShadow:"0 6px 20px rgba(99,32,224,.35)" }}>📅</div>
                  <div>
                    <div style={{ fontFamily:"var(--fb)", fontSize: isMobile ? 17 : 20, fontWeight:900, color:"#0F172A", letterSpacing:"-.03em" }}>Request a Demo</div>
                    <div style={{ fontSize:12.5, color:"#94A3B8", fontFamily:"var(--fb)", marginTop:2 }}>Fields marked <span style={{ color:"#6320E0" }}>*</span> are required</div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} noValidate style={{ padding: isMobile ? "24px 24px 32px" : "32px 40px 40px", display:"flex", flexDirection:"column", gap:28 }}>

                  {/* Contact */}
                  <div>
                    <DemoSectionHead>Contact Information</DemoSectionHead>
                    <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap:14 }}>
                      <DemoFormField id="firstName" label="First Name" required error={errors.firstName} isTouched={touched.firstName}>
                        <input id="firstName" name="firstName" style={fieldState("firstName").style} value={form.firstName} onChange={e=>set("firstName",e.target.value)} onBlur={()=>handleBlur("firstName")} placeholder="Rajesh" onFocus={e=>e.target.style.borderColor="#6320E0"} />
                      </DemoFormField>
                      <DemoFormField id="lastName" label="Last Name" required error={errors.lastName} isTouched={touched.lastName}>
                        <input id="lastName" name="lastName" style={fieldState("lastName").style} value={form.lastName} onChange={e=>set("lastName",e.target.value)} onBlur={()=>handleBlur("lastName")} placeholder="Sharma" onFocus={e=>e.target.style.borderColor="#6320E0"} />
                      </DemoFormField>
                      <DemoFormField id="email" label="Work Email" required error={errors.email} isTouched={touched.email}>
                        <input id="email" name="email" type="email" style={fieldState("email").style} value={form.email} onChange={e=>set("email",e.target.value)} onBlur={()=>handleBlur("email")} placeholder="rajesh@company.com" onFocus={e=>e.target.style.borderColor="#6320E0"} />
                      </DemoFormField>
                      <DemoFormField id="phone" label="Phone Number" error={errors.phone} isTouched={touched.phone}>
                        <input id="phone" name="phone" type="tel" style={fieldState("phone").style} value={form.phone} onChange={e=>set("phone",e.target.value)} onBlur={()=>handleBlur("phone")} placeholder="+91 98765 43210" onFocus={e=>e.target.style.borderColor="#6320E0"} />
                      </DemoFormField>
                    </div>
                  </div>

                  {/* Company */}
                  <div>
                    <DemoSectionHead>Company Details</DemoSectionHead>
                    <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap:14 }}>
                      <DemoFormField id="company" label="Company Name" required error={errors.company} isTouched={touched.company}>
                        <input id="company" name="company" style={fieldState("company").style} value={form.company} onChange={e=>set("company",e.target.value)} onBlur={()=>handleBlur("company")} placeholder="Acme Industries Ltd." onFocus={e=>e.target.style.borderColor="#6320E0"} />
                      </DemoFormField>
                      <DemoFormField id="title" label="Your Designation" required error={errors.title} isTouched={touched.title}>
                        <input id="title" name="title" style={fieldState("title").style} value={form.title} onChange={e=>set("title",e.target.value)} onBlur={()=>handleBlur("title")} placeholder="CFO / VP Procurement / CPO" onFocus={e=>e.target.style.borderColor="#6320E0"} />
                      </DemoFormField>
                      <DemoFormField id="employees" label="Company Size" required error={errors.employees} isTouched={touched.employees}>
                        <select id="employees" name="employees" style={{...fieldState("employees").style, appearance:"none", cursor:"pointer"}} value={form.employees} onChange={e=>set("employees",e.target.value)} onBlur={()=>handleBlur("employees")} onFocus={e=>e.target.style.borderColor="#6320E0"}>
                          <option value="">Select headcount range</option>
                          {SIZES.map(s=><option key={s} value={s}>{s} employees</option>)}
                        </select>
                      </DemoFormField>
                      <DemoFormField id="industry" label="Industry" required error={errors.industry} isTouched={touched.industry}>
                        <select id="industry" name="industry" style={{...fieldState("industry").style, appearance:"none", cursor:"pointer"}} value={form.industry} onChange={e=>set("industry",e.target.value)} onBlur={()=>handleBlur("industry")} onFocus={e=>e.target.style.borderColor="#6320E0"}>
                          <option value="">Select your industry</option>
                          {INDUSTRIES.map(i=><option key={i} value={i}>{i}</option>)}
                        </select>
                      </DemoFormField>
                    </div>
                  </div>

                  {/* Demo Preferences */}
                  <div>
                    <DemoSectionHead>Demo Preferences</DemoSectionHead>

                    {/* Module chips */}
                    <div style={{ marginBottom:18 }}>
                      <label style={{ fontFamily:"var(--fb)", fontSize:12.5, fontWeight:700, color:"#334155", display:"block", marginBottom:10 }}>Which modules are you interested in?</label>
                      <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                        {MODULES_LIST.map(m=>{
                          const sel = form.modules.includes(m);
                          return (
                            <button type="button" key={m} onClick={()=>toggleModule(m)} style={{ display:"inline-flex", alignItems:"center", gap:6, fontFamily:"var(--fb)", fontSize:13, fontWeight: sel?700:500, color: sel?"#fff":"#475569", background: sel?"#6320E0":"#F5F3FF", border:`1.5px solid ${sel?"#6320E0":"rgba(99,32,224,.2)"}`, borderRadius:100, padding:"7px 16px", cursor:"pointer", transition:"all .18s", boxShadow: sel?"0 4px 14px rgba(99,32,224,.3)":"none" }}>
                              {sel && <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 2" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                              {m}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap:14, marginBottom:14 }}>
                      <DemoFormField id="challenge" label="Primary Challenge" error={errors.challenge} isTouched={touched.challenge}>
                        <input id="challenge" name="challenge" style={fieldState("challenge").style} value={form.challenge} onChange={e=>set("challenge",e.target.value)} placeholder="e.g. Manual invoice processing" onFocus={e=>e.target.style.borderColor="#6320E0"} />
                      </DemoFormField>
                      <DemoFormField id="timeline" label="Preferred Go-Live Timeline" required error={errors.timeline} isTouched={touched.timeline}>
                        <select id="timeline" name="timeline" style={{...fieldState("timeline").style, appearance:"none", cursor:"pointer"}} value={form.timeline} onChange={e=>set("timeline",e.target.value)} onBlur={()=>handleBlur("timeline")} onFocus={e=>e.target.style.borderColor="#6320E0"}>
                          <option value="">When do you want to go live?</option>
                          {TIMELINES.map(t=><option key={t} value={t}>{t}</option>)}
                        </select>
                      </DemoFormField>
                    </div>

                    <DemoFormField id="message" label="Anything else we should know?" error={errors.message} isTouched={touched.message}>
                      <textarea id="message" name="message" style={{...fieldState("message").style, resize:"vertical", minHeight:90, lineHeight:1.6}} value={form.message} onChange={e=>set("message",e.target.value)} placeholder="Current ERP, number of suppliers, specific use case…" onFocus={e=>e.target.style.borderColor="#6320E0"} />
                    </DemoFormField>
                  </div>

                  {submitError && (
                    <p style={{ fontFamily:"var(--fb)", fontSize:13, color:"#EF4444", margin:0, textAlign:"center" }}>{submitError}</p>
                  )}

                  {/* Submit row */}
                  <div style={{ paddingTop:8, borderTop:"1px solid #F1F5F9", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:16 }}>
                    <p style={{ fontSize:11.5, color:"#94A3B8", fontFamily:"var(--fb)", maxWidth:340, margin:0, lineHeight:1.6 }}>
                      By submitting, you agree to our <span style={{ color:"#6320E0", cursor:"pointer" }}>Privacy Policy</span>. We'll only use your info to schedule and prepare your demo.
                    </p>
                    <button type="submit" disabled={sending} style={{ display:"inline-flex", alignItems:"center", gap:8, background: sending?"rgba(99,32,224,.5)":"linear-gradient(135deg,#6320E0,#8B5CF6)", color:"#fff", borderRadius:12, padding:"14px 32px", fontSize:15, fontWeight:700, fontFamily:"var(--fb)", border:"none", cursor: sending?"not-allowed":"pointer", boxShadow: sending?"none":"0 6px 24px rgba(99,32,224,.4)", transition:"all .2s", letterSpacing:"-.01em", flexShrink:0 }}
                      onMouseEnter={e=>{ if(!sending){ e.currentTarget.style.transform="translateY(-1px)"; e.currentTarget.style.boxShadow="0 10px 32px rgba(99,32,224,.55)"; }}}
                      onMouseLeave={e=>{ e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow=sending?"none":"0 6px 24px rgba(99,32,224,.4)"; }}
                    >
                      {sending ? (
                        <>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ animation:"spin 1s linear infinite" }}><circle cx="8" cy="8" r="6" stroke="rgba(255,255,255,.3)" strokeWidth="2"/><path d="M8 2a6 6 0 0 1 6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
                          Sending…
                        </>
                      ) : "Book My Demo →"}
                    </button>
                  </div>

                </form>
              </div>

            ) : (
              /* ── SUCCESS STATE ── */
              <div className="fade-up" style={{
                background:"#fff", border:"1.5px solid rgba(99,32,224,.15)",
                borderRadius:24, boxShadow:"0 8px 48px rgba(99,32,224,.1)",
                padding: isMobile ? "40px 28px" : "60px 56px",
                textAlign:"center", position:"relative", overflow:"hidden",
              }}>
                <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:"linear-gradient(90deg,#6320E0,#8B5CF6,#F5A623)", pointerEvents:"none" }} />

                <div style={{ width:88, height:88, borderRadius:"50%", background:"linear-gradient(135deg,#059669,#10B981)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 28px", boxShadow:"0 8px 32px rgba(16,185,129,.3)" }}>
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><path d="M8 20l8 8L32 10" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>

                <h2 style={{ fontFamily:"var(--fb)", fontSize: isMobile ? 24 : 30, fontWeight:900, color:"#0F172A", letterSpacing:"-.04em", marginBottom:12 }}>
                  Demo Requested, {form.firstName}!
                </h2>
                <p style={{ fontFamily:"var(--fb)", fontSize:15, color:"#475569", lineHeight:1.75, maxWidth:420, margin:"0 auto 16px" }}>
                  A NimbleS2P specialist will reach out to <strong style={{ color:"#391085" }}>{form.email}</strong> within one business day to confirm your session.
                </p>
                <p style={{ fontFamily:"var(--fb)", fontSize:13.5, color:"#94A3B8", lineHeight:1.65, maxWidth:400, margin:"0 auto 32px" }}>
                  Your demo will be configured for <strong style={{ color:"#6320E0" }}>{form.company}</strong>{form.modules.length ? ` covering ${form.modules.join(", ")}` : ""}.
                </p>

                {form.modules.length > 0 && (
                  <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:8, marginBottom:32 }}>
                    {form.modules.map(m=>(
                      <span key={m} style={{ display:"inline-flex", alignItems:"center", gap:5, background:"rgba(99,32,224,.08)", border:"1px solid rgba(99,32,224,.18)", borderRadius:100, padding:"5px 14px", fontSize:12.5, fontWeight:600, color:"#391085", fontFamily:"var(--fb)" }}>
                        ✓ {m}
                      </span>
                    ))}
                  </div>
                )}

                <button onClick={()=>onNavigate("home")} style={{ display:"inline-flex", alignItems:"center", gap:7, background:"rgba(99,32,224,.08)", border:"1.5px solid rgba(99,32,224,.2)", borderRadius:10, padding:"12px 28px", fontSize:14, fontWeight:700, color:"#6320E0", cursor:"pointer", fontFamily:"var(--fb)", transition:"all .2s" }}
                  onMouseEnter={e=>{ e.currentTarget.style.background="rgba(99,32,224,.15)"; e.currentTarget.style.color="#391085"; }}
                  onMouseLeave={e=>{ e.currentTarget.style.background="rgba(99,32,224,.08)"; e.currentTarget.style.color="#6320E0"; }}
                >← Back to Home</button>
              </div>
            )}

          </div>
        </section>
      </main>
      <VDDFooter onNavigate={onNavigate} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </>
  );
}
