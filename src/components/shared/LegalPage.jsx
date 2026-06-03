"use client";

/**
 * Shared layout for legal/policy pages (Privacy Policy, Cookie Policy, …).
 *
 * Renders the standard site chrome (Nav + VDDFooter), a gradient hero with
 * effective/last-updated dates, a sticky table of contents, and a declarative
 * section renderer. Pages supply only data (`sections`) — see
 * PrivacyPolicyPage / CookiePolicyPage.
 *
 * Section block grammar (each block is one of):
 *   "a paragraph string"
 *   { type: "subheading", text }
 *   { type: "list", items: [string | {term, desc}] }
 *   { type: "callout", text }
 *   { type: "table", head: [..], rows: [[..], ..] }
 */
import { useEffect, useRef, useState } from "react";
import { Nav } from "@/components/layout/SiteNav";
import { VDDFooter } from "@/components/layout/VDDFooter";

const CSS = `
  .lp-scope{--p700:#391085;--p600:#4B1A9E;--p300:#8B5CF6;--p25:#F5F3FF;--t2:#334155;--t3:#64748B;--t4:#94A3B8;--bd:#E2E8F0;--bg-v:linear-gradient(140deg,#14104A 0%,#1E1660 40%,#261d6b 70%,#1a1258 100%);}
  .lp-hero{background:var(--bg-v);padding:140px 48px 72px;text-align:center;position:relative;overflow:hidden}
  .lp-hero-inner{position:relative;z-index:2;max-width:760px;margin:0 auto}
  .lp-eyebrow{display:inline-flex;align-items:center;gap:8px;font-size:11px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#C4B5FD;margin-bottom:18px}
  .lp-eyebrow-dot{width:6px;height:6px;border-radius:50%;background:#8B5CF6}
  .lp-hero h1{font-size:clamp(34px,5vw,52px);font-weight:800;letter-spacing:-.03em;line-height:1.08;margin-bottom:16px;background:linear-gradient(95deg,#fff 0%,#fff 32%,#F5D060 64%,#F5A623 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;padding-bottom:.06em}
  .lp-hero p{font-size:clamp(15px,1.6vw,17px);color:rgba(255,255,255,.62);line-height:1.7;max-width:620px;margin:0 auto 26px}
  .lp-meta{display:inline-flex;align-items:center;gap:12px;flex-wrap:wrap;justify-content:center}
  .lp-meta-pill{display:inline-flex;align-items:center;gap:7px;font-size:12.5px;color:rgba(255,255,255,.7);background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);border-radius:100px;padding:7px 14px;font-weight:500}
  .lp-meta-pill b{color:#fff;font-weight:600}
  .lp-glow{position:absolute;border-radius:50%;pointer-events:none;z-index:0;filter:blur(70px)}
  .lp-glow-a{width:520px;height:520px;top:-30%;left:-8%;background:radial-gradient(circle,rgba(99,32,224,.3) 0%,transparent 68%)}
  .lp-glow-b{width:440px;height:440px;bottom:-30%;right:-6%;background:radial-gradient(circle,rgba(238,157,17,.14) 0%,transparent 65%)}
  .lp-body{background:#fff;padding:64px 48px 96px}
  .lp-inner{max-width:1040px;margin:0 auto;display:grid;grid-template-columns:230px 1fr;gap:56px;align-items:start}
  .lp-toc{position:sticky;top:90px;background:var(--p25);border:1.5px solid var(--bd);border-radius:14px;padding:20px;max-height:calc(100vh - 120px);overflow:auto}
  .lp-toc-label{font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--t4);margin-bottom:12px}
  .lp-toc-list{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:1px}
  .lp-toc-list a{display:block;padding:6px 10px;border-radius:7px;font-size:12px;font-weight:500;color:var(--t3);text-decoration:none;transition:background .15s,color .15s;line-height:1.45}
  .lp-toc-list a:hover{background:rgba(99,32,224,.08);color:var(--p300)}
  .lp-toc-list a.active{background:rgba(99,32,224,.1);color:var(--p600);font-weight:600}
  .lp-content{min-width:0}
  .lp-section{margin-bottom:40px;padding-bottom:40px;border-bottom:1px solid var(--bd);scroll-margin-top:96px}
  .lp-section:last-child{border-bottom:none;margin-bottom:0;padding-bottom:0}
  .lp-section-title{font-size:19px;font-weight:800;color:var(--p700);letter-spacing:-.02em;margin-bottom:14px;display:flex;align-items:center;gap:10px}
  .lp-num{font-family:'IBM Plex Mono',monospace;font-size:10.5px;font-weight:600;color:var(--t4);letter-spacing:.06em;background:var(--p25);border:1px solid var(--bd);padding:3px 8px;border-radius:6px;white-space:nowrap}
  .lp-p{font-size:14.5px;line-height:1.85;color:var(--t2);margin-bottom:12px}
  .lp-p:last-child{margin-bottom:0}
  .lp-p a{color:var(--p600);font-weight:500}
  .lp-p a:hover{text-decoration:underline}
  .lp-sub{font-size:15px;font-weight:700;color:#1E293B;margin:20px 0 8px;letter-spacing:-.01em}
  .lp-callout{font-size:13.5px;font-weight:500;line-height:1.75;color:var(--p700);background:var(--p25);padding:16px 20px;border-radius:10px;border-left:3px solid var(--p300);margin:14px 0}
  .lp-list{list-style:none;padding:0;margin:12px 0;display:flex;flex-direction:column;gap:9px}
  .lp-list li{display:flex;align-items:flex-start;gap:10px;font-size:14px;color:var(--t2);line-height:1.7}
  .lp-list li::before{content:'';width:6px;height:6px;border-radius:50%;background:var(--p300);flex-shrink:0;margin-top:8px}
  .lp-list li b{color:#1E293B;font-weight:700}
  .lp-table-wrap{overflow-x:auto;margin:14px 0;border:1px solid var(--bd);border-radius:12px}
  .lp-table{width:100%;border-collapse:collapse;font-size:13px;min-width:480px}
  .lp-table th{background:var(--p25);color:var(--p700);font-weight:700;text-align:left;padding:11px 14px;border-bottom:1px solid var(--bd);font-size:11.5px;letter-spacing:.02em;text-transform:uppercase}
  .lp-table td{padding:11px 14px;border-bottom:1px solid var(--bd);color:var(--t2);line-height:1.6;vertical-align:top}
  .lp-table tr:last-child td{border-bottom:none}
  .lp-contact{background:var(--bg-v);border-radius:16px;padding:26px 30px;margin-top:8px;color:#fff}
  .lp-contact-h{font-size:16px;font-weight:800;margin-bottom:6px}
  .lp-contact-p{font-size:13.5px;color:rgba(255,255,255,.62);line-height:1.7;margin-bottom:14px}
  .lp-contact-grid{display:flex;flex-wrap:wrap;gap:10px 28px}
  .lp-contact-item{display:flex;flex-direction:column;gap:2px}
  .lp-contact-label{font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:rgba(255,255,255,.4)}
  .lp-contact-val{font-size:14px;font-weight:600;color:#fff;text-decoration:none}
  .lp-contact-val:hover{text-decoration:underline}
  @media(max-width:900px){
    .lp-inner{grid-template-columns:1fr;gap:8px}
    .lp-toc{position:static;max-height:none;margin-bottom:24px}
    .lp-toc-list{flex-direction:row;flex-wrap:wrap;gap:6px}
    .lp-toc-list a{font-size:11.5px;background:#fff;border:1px solid var(--bd)}
    .lp-body{padding:48px 22px 72px}
    .lp-hero{padding:116px 22px 64px}
  }
`;

function Block({ block }) {
  if (typeof block === "string") {
    return <p className="lp-p" dangerouslySetInnerHTML={{ __html: block }} />;
  }
  if (block.type === "subheading") return <h3 className="lp-sub">{block.text}</h3>;
  if (block.type === "callout") {
    return <div className="lp-callout" dangerouslySetInnerHTML={{ __html: block.text }} />;
  }
  if (block.type === "list") {
    return (
      <ul className="lp-list">
        {block.items.map((it, i) =>
          typeof it === "string" ? (
            <li key={i} dangerouslySetInnerHTML={{ __html: it }} />
          ) : (
            <li key={i}>
              <span>
                <b>{it.term}</b> — <span dangerouslySetInnerHTML={{ __html: it.desc }} />
              </span>
            </li>
          )
        )}
      </ul>
    );
  }
  if (block.type === "table") {
    return (
      <div className="lp-table-wrap">
        <table className="lp-table">
          <thead>
            <tr>{block.head.map((h, i) => <th key={i}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {block.rows.map((row, ri) => (
              <tr key={ri}>{row.map((c, ci) => <td key={ci} dangerouslySetInnerHTML={{ __html: c }} />)}</tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  return null;
}

export default function LegalPage({
  pageName,
  title,
  intro,
  effectiveDate,
  lastUpdated,
  sections,
  contact,
  onNavigate,
  onBack,
}) {
  const [active, setActive] = useState(sections[0]?.id);
  const contentRef = useRef(null);

  // Highlight the TOC entry for the section currently in view.
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const nodes = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-90px 0px -70% 0px", threshold: 0 }
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [sections]);

  return (
    <div className="lp-scope">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <Nav onNavigate={onNavigate} onBack={onBack} pageName={pageName} />

      <header className="lp-hero">
        <div className="lp-glow lp-glow-a" />
        <div className="lp-glow lp-glow-b" />
        <div className="lp-hero-inner">
          <div className="lp-eyebrow"><span className="lp-eyebrow-dot" />Legal</div>
          <h1>{title}</h1>
          {intro && <p>{intro}</p>}
          <div className="lp-meta">
            {effectiveDate && (
              <span className="lp-meta-pill">Effective Date: <b>{effectiveDate}</b></span>
            )}
            {lastUpdated && (
              <span className="lp-meta-pill">Last Updated: <b>{lastUpdated}</b></span>
            )}
          </div>
        </div>
      </header>

      <div className="lp-body">
        <div className="lp-inner">
          <nav className="lp-toc" aria-label="Table of contents">
            <div className="lp-toc-label">On this page</div>
            <ul className="lp-toc-list">
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className={active === s.id ? "active" : ""}>
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lp-content" ref={contentRef}>
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} className="lp-section">
                <h2 className="lp-section-title">
                  <span className="lp-num">{String(i + 1).padStart(2, "0")}</span>
                  {s.title}
                </h2>
                {s.blocks.map((b, bi) => <Block key={bi} block={b} />)}
                {s.id === "contact" && contact && (
                  <div className="lp-contact">
                    <div className="lp-contact-h">{contact.heading}</div>
                    <p className="lp-contact-p">{contact.body}</p>
                    <div className="lp-contact-grid">
                      <div className="lp-contact-item">
                        <span className="lp-contact-label">Company</span>
                        <span className="lp-contact-val">{contact.company}</span>
                      </div>
                      <div className="lp-contact-item">
                        <span className="lp-contact-label">Email</span>
                        <a className="lp-contact-val" href={`mailto:${contact.email}`}>{contact.email}</a>
                      </div>
                      <div className="lp-contact-item">
                        <span className="lp-contact-label">Address</span>
                        <span className="lp-contact-val">{contact.address}</span>
                      </div>
                    </div>
                  </div>
                )}
              </section>
            ))}
          </div>
        </div>
      </div>

      <VDDFooter onNavigate={onNavigate} />
    </div>
  );
}
