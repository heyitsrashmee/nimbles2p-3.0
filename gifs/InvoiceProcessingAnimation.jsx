"use client";

import { useState, useEffect, useRef, useCallback } from "react";

/* ─── inject styles once ─── */
const STYLES = `

/* ── keyframes (unchanged) ── */
@keyframes ia-spin       { to { transform:rotate(360deg) } }
@keyframes ia-pulse-dot  { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(.7)} }
@keyframes ia-fall       {
  0%   { opacity:0; transform:translateY(-110px) rotate(-8deg) scale(.8) }
  55%  { opacity:1; transform:translateY(8px)    rotate(1.5deg) scale(1.05) }
  75%  {            transform:translateY(-4px)   rotate(-.5deg) scale(.98) }
  100% { opacity:1; transform:translateY(0)      rotate(0)      scale(1) }
}
@keyframes ia-row-in  { from{opacity:0;transform:translateX(-10px)} to{opacity:1;transform:translateX(0)} }
@keyframes ia-slide-r { from{opacity:0;transform:translateX(8px)}  to{opacity:1;transform:translateX(0)} }
@keyframes ia-pop     {
  0%  { transform:scale(0) rotate(-15deg); opacity:0 }
  60% { transform:scale(1.22) rotate(4deg) }
  80% { transform:scale(.92)  rotate(-1deg) }
  100%{ transform:scale(1)    rotate(0);   opacity:1 }
}
@keyframes ia-banner-up {
  0%  { transform:translateY(100%); opacity:.7 }
  55% { transform:translateY(-5px) }
  100%{ transform:translateY(0);   opacity:1 }
}
@keyframes ia-shimmer {
  0%  { background-position:-200% center }
  100%{ background-position: 200% center }
}
@keyframes ia-scan-line {
  0%  { top:-4px; opacity:.8 }
  100%{ top:100%; opacity:0 }
}
@keyframes ia-card-in { from{opacity:0;transform:translateY(10px) scale(.97)} to{opacity:1;transform:translateY(0) scale(1)} }

/* ── root: pure white ── */
.ia2{
  width:100%;height:100%;
  font-family:var(--fb);
  display:flex;flex-direction:column;
  background:#ffffff;
  overflow:hidden;position:relative;
}

/* ── chrome bar: keep indigo — it's the browser chrome, stays dark ── */
.ia2-bar{
  display:flex;align-items:center;gap:10px;
  padding:10px 18px;flex-shrink:0;
  background:linear-gradient(90deg,#1E1B4B 0%,#2D2A6E 100%);
  border-bottom:1px solid rgba(99,32,224,.2);
  position:relative;z-index:10;
}
.ia2-bar::after{
  content:'';position:absolute;bottom:0;left:0;right:0;height:1px;
  background:linear-gradient(90deg,transparent,rgba(139,92,246,.5) 40%,rgba(245,166,35,.4) 70%,transparent);
}
.ia2-tl{display:flex;gap:5px}
.ia2-dot{width:9px;height:9px;border-radius:50%}
.ia2-bc{
  display:flex;align-items:center;gap:5px;
  margin-left:8px;font-size:10.5px;font-weight:500;letter-spacing:.02em;
}
.ia2-bc-dim{color:rgba(255,255,255,.35)}
.ia2-bc-sep{color:rgba(255,255,255,.2);font-size:9px}
.ia2-bc-act{color:#E0D9FF;font-weight:700;font-size:11px}
.ia2-live{
  margin-left:auto;display:flex;align-items:center;gap:5px;
  background:rgba(16,185,129,.15);border:1px solid rgba(16,185,129,.3);
  border-radius:100px;padding:3px 10px;
}
.ia2-live-dot{width:6px;height:6px;border-radius:50%;background:#10B981;animation:ia-pulse-dot 1.6s ease-in-out infinite}
.ia2-live-txt{font-size:9.5px;font-weight:800;color:#10B981;letter-spacing:.08em}

/* ── stage ── */
.ia2-stage{flex:1;position:relative;overflow:hidden;min-height:0}
.ia2-ph{
  position:absolute;inset:0;display:flex;flex-direction:column;
  transition:opacity .5s cubic-bezier(.4,0,.2,1),transform .5s cubic-bezier(.4,0,.2,1);
}
.ia2-ph.off{opacity:0;pointer-events:none;transform:translateY(16px)}
.ia2-ph.on {opacity:1;pointer-events:auto;transform:translateY(0)}

/* ════════════════════════
   PHASE 1 — UPLOAD (white bg)
════════════════════════ */
.ia2-upload{
  align-items:center;justify-content:flex-start;gap:16px;
  padding:22px 24px;
  background:linear-gradient(155deg,#F5F3FF 0%,#EEF2FF 50%,#F0F9FF 100%);
}

.ia2-uhead{text-align:center}
.ia2-utitle{
  font-size:10.5px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;
  color:#4F46E5;
  margin-bottom:4px;
}
.ia2-usub{font-size:11.5px;color:#6B7280;font-weight:400}

/* drop zone */
.ia2-drop{
  width:100%;max-width:360px;height:175px;
  border-radius:20px;
  border:2px dashed #C7D2FE;
  background:#ffffff;
  display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;
  position:relative;overflow:hidden;
  transition:border-color .35s,box-shadow .35s,background .35s,transform .25s;
  box-shadow:0 4px 24px rgba(99,102,241,.07),0 1px 4px rgba(0,0,0,.04);
}
.ia2-drop::before{
  content:'';position:absolute;inset:0;border-radius:20px;pointer-events:none;
  background:
    radial-gradient(circle at 0% 0%, rgba(99,102,241,.04) 0%, transparent 50%),
    radial-gradient(circle at 100% 100%, rgba(245,166,35,.03) 0%, transparent 50%);
}
.ia2-drop.hot{
  border-color:#F5A623;border-style:solid;
  background:#FFFBF2;
  box-shadow:0 0 0 4px rgba(245,166,35,.1),0 6px 32px rgba(245,166,35,.15);
  transform:scale(1.012);
}

/* upload icon */
.ia2-uico{
  width:54px;height:54px;border-radius:18px;
  background:linear-gradient(135deg,#EEF2FF 0%,#E0E7FF 100%);
  border:1px solid #C7D2FE;
  display:flex;align-items:center;justify-content:center;
  box-shadow:0 4px 16px rgba(99,102,241,.12);
}
.ia2-ulbl{font-size:13px;font-weight:700;color:#374151;letter-spacing:-.01em}
.ia2-usublbl{font-size:11px;color:#9CA3AF;margin-top:-4px}
.ia2-fmts{display:flex;gap:6px}
.ia2-fmt{
  font-size:9px;font-weight:700;letter-spacing:.05em;
  background:#EEF2FF;border:1px solid #C7D2FE;
  border-radius:5px;padding:2px 8px;color:#4F46E5;
}

/* PDF card — white/amber, clean */
.ia2-falling{animation:ia-fall .75s cubic-bezier(.22,1,.36,1) forwards}
.ia2-pdfcard{
  width:70px;height:84px;position:relative;
  background:linear-gradient(145deg,#FFFBF0 0%,#ffffff 100%);
  border:1.5px solid #FCD9A0;border-radius:14px;
  display:flex;flex-direction:column;align-items:center;justify-content:center;gap:7px;
  box-shadow:0 12px 36px rgba(245,166,35,.22),0 3px 10px rgba(0,0,0,.06);
}
/* dog-ear fold */
.ia2-pdfcard::before{
  content:'';position:absolute;top:0;right:0;width:0;height:0;
  border-style:solid;border-width:0 13px 13px 0;
  border-color:transparent #FCD9A0 transparent transparent;
}
.ia2-pdfcard::after{
  content:'';position:absolute;top:0;right:0;width:13px;height:13px;
  background:#FEF3C7;border-radius:0 14px 0 6px;
}
.ia2-pdftag{font-size:11px;font-weight:900;color:#F5A623;letter-spacing:.1em}
.ia2-pdflines{display:flex;flex-direction:column;gap:4px;width:36px}
.ia2-pdfline{height:2.5px;border-radius:2px;background:linear-gradient(90deg,#FDE68A,#FCD9A0)}
.ia2-pdfline.s{width:60%}
/* scan line — indigo on white card */
.ia2-pdfcard .ia2-scan{
  position:absolute;left:0;right:0;height:3px;
  background:linear-gradient(90deg,transparent,rgba(99,102,241,.6),transparent);
  animation:ia-scan-line 1.2s ease-in-out infinite;
  pointer-events:none;
}

/* progress bar */
.ia2-prog{width:100%;max-width:360px}
.ia2-prog-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}
.ia2-prog-name{display:flex;align-items:center;gap:7px;font-size:11px;font-weight:600;color:#374151}
.ia2-prog-name-ico{
  width:18px;height:18px;border-radius:5px;flex-shrink:0;
  background:linear-gradient(135deg,#FEF3C7,#FDE68A);
  border:1px solid #FCD9A0;
  display:flex;align-items:center;justify-content:center;font-size:9px;
}
.ia2-prog-pct{font-size:13px;font-weight:900;color:#F5A623;letter-spacing:-.03em}
.ia2-prog-track{
  height:7px;border-radius:100px;overflow:hidden;
  background:#E0E7FF;
  box-shadow:inset 0 1px 3px rgba(99,102,241,.1);
}
.ia2-prog-fill{
  height:100%;border-radius:100px;
  background:linear-gradient(90deg,#6366F1 0%,#8B5CF6 50%,#F5A623 100%);
  transition:width .06s linear;
  position:relative;overflow:hidden;
  box-shadow:0 0 8px rgba(245,166,35,.3);
}
.ia2-prog-fill::after{
  content:'';position:absolute;inset:0;
  background:linear-gradient(90deg,transparent 40%,rgba(255,255,255,.5) 60%,transparent 80%);
  background-size:200% 100%;
  animation:ia-shimmer 1.5s linear infinite;
}
.ia2-prog-status{
  display:flex;align-items:center;gap:5px;
  margin-top:8px;font-size:10px;color:#9CA3AF;
}
.ia2-prog-status-dot{
  width:5px;height:5px;border-radius:50%;background:#6366F1;
  animation:ia-pulse-dot 1.2s ease-in-out infinite;flex-shrink:0;
}

/* ════════════════════════
   PHASE 2 — CHECKS (white bg)
════════════════════════ */
.ia2-checks{
  padding:14px 16px;gap:8px;overflow:hidden;
  background:linear-gradient(155deg,#F9FAFB 0%,#F5F3FF 100%);
}
.ia2-chk-hdr{
  display:flex;align-items:center;justify-content:space-between;
  margin-bottom:6px;padding-bottom:10px;
  border-bottom:1px solid #E5E7EB;
}
.ia2-chk-hdr-left{display:flex;align-items:center;gap:8px}
.ia2-chk-hdr-title{
  font-size:10px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;
  color:#4F46E5;
}
.ia2-chk-hdr-dot{width:5px;height:5px;border-radius:50%;background:#8B5CF6;animation:ia-pulse-dot 1.4s ease-in-out infinite}
.ia2-chk-hdr-file{
  font-size:9.5px;font-weight:600;color:#6366F1;
  background:#EEF2FF;border:1px solid #C7D2FE;
  border-radius:100px;padding:2px 10px;
}

/* overall progress bar */
.ia2-chk-overall{height:3px;background:#E5E7EB;border-radius:100px;overflow:hidden;margin-bottom:10px}
.ia2-chk-overall-fill{height:100%;border-radius:100px;background:linear-gradient(90deg,#6366F1,#A78BFA);transition:width .5s cubic-bezier(.4,0,.2,1)}

/* individual check row */
.ia2-chk{
  display:flex;align-items:center;gap:12px;
  border-radius:14px;padding:11px 13px;
  background:#ffffff;
  border:1.5px solid #E5E7EB;
  transition:border-color .45s,box-shadow .45s,background .45s,opacity .35s;
  position:relative;overflow:hidden;
}
.ia2-chk.pending{opacity:.35;background:#FAFAFA}
.ia2-chk.running{
  border-color:#FBD38D;
  background:linear-gradient(135deg,#FFFBEB 0%,#FFFDF5 100%);
  box-shadow:0 0 0 3px rgba(245,166,35,.08),0 4px 18px rgba(245,166,35,.1);
}
.ia2-chk.done{
  border-color:#6EE7B7;
  background:linear-gradient(135deg,#ECFDF5 0%,#F0FDF9 100%);
  box-shadow:0 0 0 3px rgba(16,185,129,.06),0 2px 10px rgba(16,185,129,.07);
}

/* icon box */
.ia2-chk-ico{
  width:36px;height:36px;border-radius:10px;
  display:flex;align-items:center;justify-content:center;flex-shrink:0;
  transition:background .4s,box-shadow .4s;
}
.ia2-chk-ico.pending{background:#F3F4F6}
.ia2-chk-ico.running{
  background:linear-gradient(135deg,#FEF3C7 0%,#FDE68A 100%);
  border:1px solid #FCD9A0;
  box-shadow:0 2px 10px rgba(245,166,35,.18);
}
.ia2-chk-ico.done{
  background:linear-gradient(135deg,#D1FAE5 0%,#A7F3D0 100%);
  border:1px solid #6EE7B7;
  box-shadow:0 2px 10px rgba(16,185,129,.18);
  animation:ia-pop .4s cubic-bezier(.34,1.56,.64,1);
}
.ia2-spinner{
  width:16px;height:16px;border-radius:50%;
  border:2px solid rgba(245,166,35,.2);
  border-top-color:#F5A623;
  animation:ia-spin .65s linear infinite;
}

/* text */
.ia2-chk-body{flex:1;min-width:0}
.ia2-chk-name{font-size:12.5px;font-weight:700;color:#111827;letter-spacing:-.01em;transition:color .35s}
.ia2-chk.running .ia2-chk-name{color:#92400E}
.ia2-chk.done   .ia2-chk-name{color:#065F46}
.ia2-chk-sub{font-size:10px;color:#9CA3AF;margin-top:2px;transition:color .35s;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ia2-chk.done .ia2-chk-sub{color:#34D399;animation:ia-slide-r .3s ease both}

/* status pill */
.ia2-chk-pill{font-size:9.5px;font-weight:800;letter-spacing:.07em;padding:3px 9px;border-radius:100px;flex-shrink:0;transition:all .35s}
.ia2-chk-pill.pending{color:#D1D5DB;background:#F9FAFB;border:1px solid #E5E7EB}
.ia2-chk-pill.running{color:#B45309;background:#FEF3C7;border:1px solid #FCD9A0}
.ia2-chk-pill.done   {color:#065F46;background:#D1FAE5;border:1px solid #6EE7B7}

/* ════════════════════════
   PHASE 3 — SPLIT VIEW (white)
════════════════════════ */
.ia2-split{display:grid;grid-template-columns:1fr 1fr;position:static;background:#ffffff}
.ia2-split-col{display:flex;flex-direction:column;overflow:hidden}

/* panel headers */
.ia2-split-hdr{
  padding:10px 14px;
  display:flex;align-items:center;gap:7px;flex-shrink:0;
  background:#FAFBFF;
  border-bottom:1px solid #E5E7EB;
}
.ia2-split-title{font-size:11px;font-weight:700;color:#1E293B;letter-spacing:-.01em}
.ia2-split-badge{padding:2px 9px;border-radius:100px;font-size:9px;font-weight:800;letter-spacing:.04em}

/* extracted fields */
.ia2-fields{
  flex:1;padding:8px 14px;
  background:linear-gradient(160deg,#FAFBFF 0%,#F8F9FF 100%);
  display:flex;flex-direction:column;gap:0;overflow:hidden;
}
.ia2-field{
  display:flex;align-items:center;
  padding:5px 0;border-bottom:1px solid #F1F5F9;
  animation:ia-row-in .2s cubic-bezier(.4,0,.2,1) both;
}
.ia2-field:last-child{border-bottom:none}
.ia2-fk{font-size:9px;font-weight:700;color:#94A3B8;letter-spacing:.06em;min-width:72px;flex-shrink:0;text-transform:uppercase}
.ia2-fv{font-size:11.5px;font-weight:700;color:#0F172A;letter-spacing:-.01em;flex:1}
.ia2-fv.hi{
  font-size:13px;font-weight:900;
  background:linear-gradient(90deg,#4F46E5 0%,#7C3AED 60%,#F59E0B 100%);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
}

/* match panel */
.ia2-match-side{
  flex:1;padding:9px 11px;
  background:#F8FAFF;
  display:flex;flex-direction:column;gap:7px;
  border-left:1px solid #E5E7EB;overflow:hidden;
}

/* match cards */
.ia2-mc{
  background:#ffffff;
  border:1px solid #E2E8F0;
  border-radius:12px;padding:9px 12px;
  box-shadow:0 1px 6px rgba(99,102,241,.05),0 1px 2px rgba(0,0,0,.03);
  animation:ia-card-in .35s cubic-bezier(.4,0,.2,1) both;
  position:relative;overflow:hidden;
}
.ia2-mc::before{
  content:'';position:absolute;top:0;left:0;right:0;height:1px;
  background:linear-gradient(90deg,transparent,rgba(99,102,241,.15),transparent);
}
.ia2-mc:nth-child(2){animation-delay:.18s}
.ia2-mc-hdr{font-size:9px;font-weight:800;color:#64748B;letter-spacing:.09em;text-transform:uppercase;margin-bottom:7px;display:flex;align-items:center;gap:7px}
.ia2-mc-badge{font-size:8.5px;font-weight:800;padding:2px 8px;border-radius:5px;letter-spacing:.04em}
.ia2-ml{display:flex;flex-direction:column;gap:4px}
.ia2-mline{display:flex;justify-content:space-between;align-items:center;font-size:10px;padding:1px 0}
.ia2-mlk{color:#94A3B8;font-weight:500}
.ia2-mlv{font-weight:700;color:#1E293B;letter-spacing:-.01em}
.ia2-mfoot{display:flex;align-items:center;justify-content:space-between;margin-top:7px;padding-top:6px;border-top:1px solid #F1F5F9}
.ia2-mchip{display:flex;align-items:center;gap:5px;font-size:9.5px;font-weight:800;color:#059669}
.ia2-mtick{
  width:16px;height:16px;border-radius:50%;
  background:linear-gradient(135deg,#10B981,#34D399);
  display:flex;align-items:center;justify-content:center;flex-shrink:0;
  box-shadow:0 2px 8px rgba(16,185,129,.28);
}
.ia2-mtol{font-size:9px;color:#94A3B8;font-weight:500}

/* ── success banner (keep green, works on white) ── */
.ia2-banner{
  position:absolute;bottom:0;left:0;right:0;z-index:30;
  padding:14px 20px;
  display:flex;align-items:center;gap:14px;
  background:linear-gradient(135deg,#064E3B 0%,#059669 60%,#0D9488 100%);
  border-top:1px solid rgba(16,185,129,.25);
  box-shadow:0 -6px 24px rgba(5,150,105,.2);
  transform:translateY(100%);
  transition:transform .65s cubic-bezier(.22,1,.36,1);
}
.ia2-banner.on{transform:translateY(0);animation:ia-banner-up .65s cubic-bezier(.22,1,.36,1) both}
.ia2-banner-ico{
  width:38px;height:38px;border-radius:12px;flex-shrink:0;
  background:rgba(255,255,255,.18);border:1px solid rgba(255,255,255,.25);
  display:flex;align-items:center;justify-content:center;
  box-shadow:0 2px 8px rgba(0,0,0,.12);
}
.ia2-banner-texts{flex:1;min-width:0}
.ia2-banner-title{font-size:13.5px;font-weight:800;color:#fff;letter-spacing:-.02em;line-height:1.2}
.ia2-banner-sub{font-size:10px;color:rgba(167,243,208,.85);margin-top:2px;letter-spacing:.01em}
.ia2-banner-badge{
  font-size:9px;font-weight:800;
  color:rgba(167,243,208,.95);
  background:rgba(0,0,0,.18);border:1px solid rgba(255,255,255,.18);
  border-radius:7px;padding:4px 11px;letter-spacing:.07em;
  white-space:nowrap;flex-shrink:0;
}

`;

function injectStyles() {
  if (document.getElementById("ia2-styles")) return;
  const el = document.createElement("style");
  el.id = "ia2-styles";
  el.textContent = STYLES;
  document.head.appendChild(el);
}

/* ─── data ─── */
const CHECKS = [
  { id:"ocr", name:"OCR Extraction",      sub:"Extracted 23 fields from invoice PDF",          emoji:"🔍" },
  { id:"qr",  name:"QR Verification",     sub:"e-Invoice QR authenticated · IRN confirmed",    emoji:"📷" },
  { id:"dup", name:"Duplicate Detection", sub:"No match in 14,820 invoice records",             emoji:"🛡" },
  { id:"cls", name:"Auto Classification", sub:"3-Way Match · Material PO Invoice",              emoji:"🏷" },
];

const FIELDS = [
  ["VENDOR",   "Sud Chemie India Pvt Ltd"],
  ["GSTIN",    "27AAECS1234A1Z5"],
  ["INV NO",   "SCI/2024/08921"],
  ["DATE",     "14 May 2026"],
  ["PO REF",   "PO-7741"],
  ["AMOUNT",   "₹4,82,500"],
  ["GST 18%",  "₹86,850"],
  ["TOTAL",    "₹5,69,350"],
  ["TERMS",    "Net 30"],
];

const PO_ROWS  = [["PO Number","PO-7741"],["Vendor","Sud Chemie India"],["PO Value","₹5,00,000"],["Tolerance","±5%"]];
const GRN_ROWS = [["GRN No","GRN-2024-4412"],["Goods Recd","14 May 2026"],["Qty Match","100% ✓"]];

/* ─── tick icons ─── */
function GreenTick() {
  return (
    <svg width={15} height={15} viewBox="0 0 20 20" fill="none">
      <path d="M4 10l4 4 8-8" stroke="#34D399" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function WhiteTick() {
  return (
    <svg width={9} height={9} viewBox="0 0 10 10" fill="none">
      <path d="M2 5l2.5 2.5L8 3" stroke="#fff" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function UploadIcon() {
  return (
    <svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="17 8 12 3 7 8"/>
      <line x1="12" y1="3" x2="12" y2="15"/>
    </svg>
  );
}
function DocIcon() {
  return (
    <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
    </svg>
  );
}
function MatchIcon() {
  return (
    <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
      <path d="M9 11l3 3L22 4"/>
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
    </svg>
  );
}
function CheckIco() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round">
      <path d="M9 11l3 3L22 4"/>
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
    </svg>
  );
}

/* ─── main component ─── */
export default function InvoiceProcessingAnimation() {
  useEffect(() => { injectStyles(); }, []);

  // phase: "upload" | "dropping" | "uploading" | "checking" | "split"
  const [phase,   setPhase]  = useState("upload");
  const [prog,    setProg]   = useState(0);
  const [chkIdx,  setChkIdx] = useState(-1);
  const [passed,  setPassed] = useState([]);
  const [fields,  setFields] = useState(0);
  const [banner,  setBanner] = useState(false);
  const tmr = useRef(null);
  const clr = () => clearTimeout(tmr.current);

  const reset = useCallback(() => {
    setPhase("upload"); setProg(0); setChkIdx(-1);
    setPassed([]); setFields(0); setBanner(false);
  }, []);

  const go = useCallback(() => {
    setPhase("dropping");
    tmr.current = setTimeout(() => {
      setPhase("uploading");
      let p = 0;
      const iv = setInterval(() => {
        p += 2.5;
        setProg(Math.min(p, 100));
        if (p >= 100) { clearInterval(iv); setPhase("checking"); setChkIdx(0); }
      }, 45);
    }, 900);
  }, []);

  useEffect(() => { tmr.current = setTimeout(go, 700); return clr; }, [go]);

  useEffect(() => {
    if (phase !== "checking" || chkIdx < 0) return;
    if (chkIdx >= CHECKS.length) {
      tmr.current = setTimeout(() => { setPhase("split"); setFields(0); }, 400);
      return;
    }
    tmr.current = setTimeout(() => {
      setPassed(p => [...p, CHECKS[chkIdx].id]);
      setChkIdx(i => i + 1);
    }, 1100);
  }, [phase, chkIdx]);

  useEffect(() => {
    if (phase !== "split") return;
    if (fields >= FIELDS.length) { tmr.current = setTimeout(() => setBanner(true), 500); return; }
    tmr.current = setTimeout(() => setFields(n => n + 1), 100);
  }, [phase, fields]);

  useEffect(() => {
    if (!banner) return;
    tmr.current = setTimeout(() => { reset(); tmr.current = setTimeout(go, 500); }, 4200);
  }, [banner, reset, go]);

  useEffect(() => () => clr(), []);

  const st = id => {
    if (passed.includes(id)) return "done";
    if (CHECKS[chkIdx]?.id === id && phase === "checking") return "running";
    return "pending";
  };

  const isUp  = ["upload","dropping","uploading"].includes(phase);
  const isChk = phase === "checking";
  const isSpl = phase === "split";

  // overall check progress for the bar
  const checkProgress = Math.round((passed.length / CHECKS.length) * 100);

  return (
    <div className="ia2">

      {/* ── Chrome bar ── */}
      <div className="ia2-bar">
        <div className="ia2-tl">
          {["#FF5F57","#FEBC2E","#28C840"].map(c => (
            <div key={c} className="ia2-dot" style={{ background:c }}/>
          ))}
        </div>
        <div className="ia2-bc">
          <span className="ia2-bc-dim">AP Automation</span>
          <span className="ia2-bc-sep">/</span>
          <span className="ia2-bc-dim">Invoice Queue</span>
          <span className="ia2-bc-sep">/</span>
          <span className="ia2-bc-act">AI Processing</span>
        </div>
        <div className="ia2-live">
          <div className="ia2-live-dot"/>
          <span className="ia2-live-txt">LIVE</span>
        </div>
      </div>

      {/* ── Stage ── */}
      <div className="ia2-stage">

        {/* ════ PHASE 1: UPLOAD ════ */}
        <div className={`ia2-ph ia2-upload ${isUp ? "on" : "off"}`}>
          <div className="ia2-uhead">
            <div className="ia2-utitle">Invoice AI Processing</div>
            <div className="ia2-usub">Drop an invoice PDF to begin extraction &amp; 3-way match</div>
          </div>

          <div className={`ia2-drop${phase==="dropping"||phase==="uploading" ? " hot" : ""}`}>
            {phase === "upload" && (
              <>
                <div className="ia2-uico"><UploadIcon/></div>
                <div className="ia2-ulbl">Drop invoice PDF here</div>
                <div className="ia2-usublbl">or click to browse files</div>
                <div className="ia2-fmts">
                  {["PDF","XML","JSON"].map(f => <span key={f} className="ia2-fmt">{f}</span>)}
                </div>
              </>
            )}

            {(phase==="dropping" || phase==="uploading") && (
              <div className={phase === "dropping" ? "ia2-falling" : ""}>
                <div className="ia2-pdfcard">
                  <div className="ia2-pdftag">PDF</div>
                  <div className="ia2-pdflines">
                    <div className="ia2-pdfline"/>
                    <div className="ia2-pdfline s"/>
                    <div className="ia2-pdfline"/>
                    <div className="ia2-pdfline s"/>
                  </div>
                  {phase === "uploading" && <div className="ia2-scan"/>}
                </div>
              </div>
            )}
          </div>

          <div className="ia2-prog" style={{ visibility: phase === "uploading" ? "visible" : "hidden" }}>
            <div className="ia2-prog-top">
              <span className="ia2-prog-name">
                <span className="ia2-prog-name-ico">📄</span>
                SCI-2024-08921.pdf
              </span>
              <span className="ia2-prog-pct">{Math.round(prog)}%</span>
            </div>
            <div className="ia2-prog-track">
              <div className="ia2-prog-fill" style={{ width: prog + "%" }}/>
            </div>
            <div className="ia2-prog-status">
              <div className="ia2-prog-status-dot"/>
              Uploading to AI engine…
            </div>
          </div>
        </div>

        {/* ════ PHASE 2: CHECKS ════ */}
        <div className={`ia2-ph ia2-checks ${isChk ? "on" : "off"}`}>
          <div className="ia2-chk-hdr">
            <div className="ia2-chk-hdr-left">
              <div className="ia2-chk-hdr-dot"/>
              <div className="ia2-chk-hdr-title">AI Verification — 4 Checks</div>
            </div>
            <div className="ia2-chk-hdr-file">SCI-2024-08921.pdf</div>
          </div>

          {/* overall progress bar */}
          <div className="ia2-chk-overall">
            <div className="ia2-chk-overall-fill" style={{ width: checkProgress + "%" }}/>
          </div>

          {CHECKS.map((c, i) => {
            const s = st(c.id);
            return (
              <div key={c.id} className={`ia2-chk ${s}`}
                style={{ animationDelay: i * 60 + "ms" }}>
                <div className={`ia2-chk-ico ${s}`}>
                  {s === "done"    ? <GreenTick/> :
                   s === "running" ? <div className="ia2-spinner"/> :
                   <span style={{ fontSize:15, opacity:.5 }}>{c.emoji}</span>}
                </div>
                <div className="ia2-chk-body">
                  <div className="ia2-chk-name">{c.name}</div>
                  <div className="ia2-chk-sub">
                    {s === "done" ? c.sub : s === "running" ? "Processing…" : "Queued"}
                  </div>
                </div>
                <div className={`ia2-chk-pill ${s}`}>
                  {s === "done" ? "✓ PASSED" : s === "running" ? "RUNNING" : "PENDING"}
                </div>
              </div>
            );
          })}
        </div>

        {/* ════ PHASE 3: SPLIT VIEW ════ */}
        <div className={`ia2-ph ia2-split ${isSpl ? "on" : "off"}`}>

          {/* Left — Extracted fields */}
          <div className="ia2-split-col">
            <div className="ia2-split-hdr">
              <span style={{ color:"#A78BFA" }}><DocIcon/></span>
              <span className="ia2-split-title">Extracted Fields</span>
              <span className="ia2-split-badge"
                style={{ background:"rgba(167,139,250,.15)", color:"#C4B5FD", border:"1px solid rgba(167,139,250,.25)" }}>
                OCR ✓
              </span>
            </div>
            <div className="ia2-fields">
              {FIELDS.slice(0, fields).map(([k, v], i) => (
                <div key={k} className="ia2-field"
                  style={{ animationDelay: i * 28 + "ms" }}>
                  <span className="ia2-fk">{k}</span>
                  <span className={`ia2-fv${k === "TOTAL" ? " hi" : ""}`}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — 3-Way Match */}
          <div className="ia2-split-col">
            <div className="ia2-split-hdr">
              <span style={{ color:"#34D399" }}><MatchIcon/></span>
              <span className="ia2-split-title">3-Way Match</span>
              <span className="ia2-split-badge"
                style={{ background:"rgba(52,211,153,.12)", color:"#34D399", border:"1px solid rgba(52,211,153,.25)" }}>
                Auto ✓
              </span>
            </div>
            <div className="ia2-match-side">

              {/* PO Card */}
              <div className="ia2-mc">
                <div className="ia2-mc-hdr">
                  <span className="ia2-mc-badge"
                    style={{ background:"rgba(167,139,250,.15)", color:"#C4B5FD", border:"1px solid rgba(167,139,250,.2)" }}>
                    PO
                  </span>
                  Purchase Order
                </div>
                <div className="ia2-ml">
                  {PO_ROWS.map(([k,v]) => (
                    <div key={k} className="ia2-mline">
                      <span className="ia2-mlk">{k}</span>
                      <span className="ia2-mlv">{v}</span>
                    </div>
                  ))}
                </div>
                <div className="ia2-mfoot">
                  <div className="ia2-mchip">
                    <div className="ia2-mtick"><WhiteTick/></div>
                    PO Match Confirmed
                  </div>
                  <span className="ia2-mtol">Within ±5%</span>
                </div>
              </div>

              {/* GRN Card */}
              <div className="ia2-mc">
                <div className="ia2-mc-hdr">
                  <span className="ia2-mc-badge"
                    style={{ background:"rgba(52,211,153,.12)", color:"#34D399", border:"1px solid rgba(52,211,153,.2)" }}>
                    GRN
                  </span>
                  Goods Receipt Note
                </div>
                <div className="ia2-ml">
                  {GRN_ROWS.map(([k,v]) => (
                    <div key={k} className="ia2-mline">
                      <span className="ia2-mlk">{k}</span>
                      <span className="ia2-mlv">{v}</span>
                    </div>
                  ))}
                </div>
                <div className="ia2-mfoot">
                  <div className="ia2-mchip">
                    <div className="ia2-mtick"><WhiteTick/></div>
                    GRN Match Confirmed
                  </div>
                  <span className="ia2-mtol">Full delivery</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ── Success Banner ── */}
        <div className={`ia2-banner${banner ? " on" : ""}`}>
          <div className="ia2-banner-ico"><CheckIco/></div>
          <div className="ia2-banner-texts">
            <div className="ia2-banner-title">Invoice Auto-Accepted</div>
            <div className="ia2-banner-sub">Zero manual steps · Routed to payment queue · ERP synced</div>
          </div>
          <div className="ia2-banner-badge">INV AUTO-APPROVED</div>
        </div>

      </div>{/* /stage */}
    </div>
  );
}
