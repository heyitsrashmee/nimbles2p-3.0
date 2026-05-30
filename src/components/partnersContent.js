/* AUTO-GENERATED from the Partners HTML export by scripts/gen-partners-content.mjs.
   Holds the page's scoped CSS and verbatim body markup so PartnersPage can render
   it without a brittle hand HTML→JSX conversion of the inline SVG charts. */

export const PARTNERS_CSS = `.footer{padding:80px 48px 40px;position:relative;overflow:hidden;background-color:#0C0A1A;background-image:radial-gradient(50% 60% at 30% 50%,rgba(99,32,224,0.52),transparent 70%),radial-gradient(45% 55% at 70% 60%,rgba(67,56,202,0.49),transparent 70%),radial-gradient(40% 50% at 50% 30%,rgba(124,58,237,0.38),transparent 70%);}
.footer::before{content:'';position:absolute;inset:0;z-index:0;pointer-events:none;}
.footer::after{content:'';position:absolute;inset:0;z-index:0;pointer-events:none;background-image:radial-gradient(rgba(255,255,255,.025) 1px, transparent 1px);background-size:80px 80px;}
.footer-accent-bar{
  position:absolute;top:0;left:0;right:0;height:1px;z-index:2;
  background:linear-gradient(90deg,transparent 0%,rgba(130,120,210,.2) 15%,rgba(194,193,232,.55) 38%,rgba(255,255,255,.35) 50%,rgba(194,193,232,.55) 62%,rgba(130,120,210,.2) 85%,transparent 100%);
}
.footer-col h5{font-family:var(--f-b);font-size:10px;font-weight:800;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.22);margin-bottom:14px;}
.footer-col a{font-size:13px;color:rgba(255,255,255,.38);text-decoration:none;transition:color .18s;font-family:var(--f-b);display:inline-flex;align-items:center;gap:5px;}
.footer-col a:hover{color:rgba(255,255,255,.82)}
.f-copy{font-size:11px;color:rgba(255,255,255,.18);font-family:var(--f-b)}
.f-links{display:flex;gap:24px}
.f-links a{font-size:11px;color:rgba(255,255,255,.2);text-decoration:none;transition:color .2s;font-family:var(--f-b)}
.footer-socials{display:flex;gap:8px}
.footer-tagline-sub{font-size:13px;color:rgba(255,255,255,.35);font-family:var(--f-b);line-height:1.6;margin-bottom:24px;}
.footer-kw-cursor{display:inline-block;width:2px;height:.85em;background:rgba(194,193,232,.6);margin-left:2px;vertical-align:middle;border-radius:1px;animation:kwBlink .8s step-end infinite;}
.kw-visible{opacity:1;transform:translateY(0);transition:opacity .28s ease,transform .28s ease}


/* ════════════════════════════════════════
   ROOT TOKENS — exact from homepage
════════════════════════════════════════ */
.partners-page {
  --f-t:'Inter',system-ui,sans-serif;
  --f-b:'Inter',system-ui,sans-serif;
  --f-m:'IBM Plex Mono',monospace;
  --p900:#1E0B4B;--p800:#2D1270;--p700:#391085;--p600:#4B1A9E;--p500:#6320E0;--p400:#7C3AED;--p300:#8B5CF6;--p200:#A78BFA;--p100:#C4B5FD;--p50:#EDE9FE;--p25:#F5F3FF;
  --g700:#92400E;--g600:#B45309;--g500:#D97706;--g400:#EE9D11;--g300:#F59E0B;--g200:#FCD34D;--g100:#FDE68A;--g50:#FEF3C7;--g25:#FFFBEB;--g50:#FEF3C7;--g25:#FFFBEB;
  --em500:#3B82F6;--em400:#60A5FA;--em700:#047857;--em50:#ECFDF5;
  --er500:#EF4444;--er50:#FEF2F2;
  --t1:#0F172A;--t2:#334155;--t3:#64748B;--t4:#94A3B8;
  --bd:#E2E8F0;--bd-p:rgba(30,27,75,0.2);--bd-g:rgba(238,157,17,0.35);
  --bd-dk:rgba(255,255,255,0.09);--bd-dk-p:rgba(99,32,224,0.28);
  --sh:0 1px 3px rgba(15,13,46,.06);--sh-md:0 4px 12px rgba(15,13,46,.1);
  --sh-p:0 4px 16px rgba(15,13,46,.22),0 2px 6px rgba(15,13,46,.12);--sh-g:0 4px 16px rgba(217,119,6,.22);
  --cta-start:#E8920A;--cta-end:#F5B020;--ease-spring:cubic-bezier(0.22,1,0.36,1);
  --bg-v:linear-gradient(140deg,#14104A 0%,#1E1660 40%,#261d6b 70%,#1a1258 100%);
}

/* ════════════════════════════════════════
   BASE RESET — exact from homepage
════════════════════════════════════════ */
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
.partners-page{font-family:var(--f-b);color:var(--t1);background:#fff;overflow-x:hidden}
::-webkit-scrollbar{width:5px}
::-webkit-scrollbar-track{background:var(--p25)}
::-webkit-scrollbar-thumb{background:var(--p300);border-radius:3px}
.partners-page h1,.partners-page h2,.partners-page h3,.partners-page h4{font-family:var(--f-t)}
.partners-page a{text-decoration:none}

/* ════════════════════════════════════════
   KEYFRAMES — all from homepage verbatim
════════════════════════════════════════ */
@keyframes glowDrift{
  0%  {transform:translate(0,0) scale(1);}
  33% {transform:translate(4%,3%) scale(1.06);}
  66% {transform:translate(-3%,5%) scale(0.95);}
  100%{transform:translate(0,0) scale(1);}
}
@keyframes breathe{0%,100%{opacity:.4;transform:scale(1)}50%{opacity:1;transform:scale(1.35)}}
@keyframes fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes kwBlink{0%,100%{opacity:1}50%{opacity:0}}
@keyframes livePulse{0%{box-shadow:0 0 0 0 rgba(238,157,17,0.7)}70%{box-shadow:0 0 0 7px rgba(238,157,17,0)}100%{box-shadow:0 0 0 0 rgba(238,157,17,0)}}

/* ════════════════════════════════════════
   NAVBAR — verbatim from homepage
   Structure: grid 1fr auto 1fr | logo | links | cta
   NO login button — homepage has ONLY btn-nav-cta
════════════════════════════════════════ */
.nav{
  position:fixed;top:0;left:0;right:0;z-index:100;
  display:grid;grid-template-columns:1fr auto 1fr;
  align-items:center;
  padding:0 48px;height:70px;
  background:#1F1558;
  border-bottom:1px solid rgba(255,255,255,0.08);
  transition:background .35s, border-color .35s, box-shadow .35s;
}
.nav.scrolled{
  background:#ffffff;
  border-bottom:1px solid rgba(0,0,0,0.09);
  box-shadow:0 2px 16px rgba(0,0,0,0.08);
}
.nav.scrolled .nav-links a{color:var(--t2)}
.nav.scrolled .nav-links a:hover{color:var(--t1);background:var(--p25)}
.nav.scrolled .nav-links a.active{color:var(--p600);background:var(--p25)}
.nav.light-bar{background:#ffffff;border-bottom:1px solid rgba(0,0,0,0.09);box-shadow:0 2px 16px rgba(0,0,0,0.08)}
.nav.light-bar .nav-links a{color:var(--t2)}
.nav.light-bar .nav-links a:hover{color:var(--t1);background:var(--p25)}
.nav.light-bar .nav-links a.active{color:var(--p600);background:var(--p25)}
.nav-logo{line-height:0}
.nav-logo .logo-white{height:28px;object-fit:contain;display:block;transition:opacity .3s}
.nav-logo .logo-color{height:28px;object-fit:contain;display:none;transition:opacity .3s}
.nav.light-bar .logo-white{display:none}
.nav.light-bar .logo-color{display:block}
.nav-links{display:flex;gap:6px;list-style:none;justify-content:center}
.nav-links a{font-size:14px;font-weight:500;color:rgba(255,255,255,0.62);transition:color .2s;padding:6px 14px;border-radius:8px}
.nav-links a:hover{color:#fff;background:rgba(255,255,255,0.07)}
.nav-links a.active{color:#fff;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.14)}
.nav-right{display:flex;align-items:center;gap:12px;justify-content:flex-end}
.btn-nav-cta{background:linear-gradient(135deg,#E8920A,#F5B020);color:#fff;border:none;padding:9px 20px;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;font-family:var(--f-b);box-shadow:0 4px 12px rgba(217,119,6,.3);transition:opacity .15s,transform .15s}
.btn-nav-cta:hover{opacity:.9;transform:translateY(-1px)}

/* ════════════════════════════════════════
   HERO — exact homepage structure:
   padding:100px 48px 140px (not 72vh)
   min-height:100vh
   wave-bottom SVG at bottom
   content wrapped in z-index:2 div
════════════════════════════════════════ */
.hero{
  min-height:100vh;
  background:linear-gradient(140deg,#14104A 0%,#1E1660 40%,#261d6b 70%,#1a1258 100%);
  display:flex;flex-direction:column;
  align-items:center;justify-content:center;
  padding:128px 5vw 80px;
  position:relative;overflow:hidden;text-align:center;
}
.hero-orb{display:none}
.hero-orb2{display:none}

.glow-a,.glow-b,
.glow-a{width:800px;height:800px;background:radial-gradient(circle,rgba(139,92,246,0.28) 0%,transparent 70%);top:-20%;left:-10%;animation:glowDrift 24s ease-in-out infinite;}
.glow-b{width:700px;height:700px;background:radial-gradient(circle,rgba(99,32,224,0.22) 0%,transparent 65%);bottom:-25%;right:-5%;animation:glowDrift 30s 8s ease-in-out infinite reverse;}

.wave-bottom{position:absolute;bottom:-1px;left:0;width:100%;pointer-events:none}

/* Hero content atoms — verbatim from homepage */
.hero-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(57,16,133,0.28);border:1px solid rgba(139,92,246,0.32);padding:6px 16px;border-radius:24px;margin-bottom:14px;animation:fadeUp .8s ease both}
.hero-badge-dot{width:7px;height:7px;border-radius:50%;background:var(--g400);animation:breathe 2.2s ease-in-out infinite}
.hero-badge span{font-size:12px;font-weight:500;color:var(--p100)}
.hero h1{font-size:clamp(22px,2.2vw,32px);font-weight:800;letter-spacing:-.035em;line-height:1.12;padding-bottom:0.08em;margin-bottom:22px;background:linear-gradient(95deg,rgb(255,255,255) 0%,rgb(255,255,255) 30%,rgb(245,208,96) 62%,rgb(245,166,35) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:fadeUp .85s .08s ease both}
.hero-sub{font-family:var(--f-b);font-size:17.5px;font-weight:400;color:rgba(255,255,255,0.52);line-height:1.72;max-width:580px;margin:0 auto 32px;animation:fadeUp .85s .16s ease both}
.hero-ctas{display:flex;gap:24px;justify-content:center;flex-wrap:wrap;margin-bottom:56px;animation:fadeUp .85s .24s ease both}
.btn-primary{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,#E8920A,#F5B020);color:#fff;border:none;border-radius:10px;padding:14px 30px;font-size:15px;font-weight:600;cursor:pointer;font-family:var(--f-b);box-shadow:0 4px 16px rgba(217,119,6,.35),0 2px 6px rgba(217,119,6,.2);box-shadow:0 6px 32px rgba(232,150,10,.52);transition:all .2s}
.btn-primary:hover{opacity:.9;transform:translateY(-2px);box-shadow:0 8px 24px rgba(217,119,6,.45)}
.btn-ghost{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.06);color:rgba(255,255,255,.75);border:1.5px solid rgba(255,255,255,0.18);border-radius:10px;padding:13px 24px;font-size:15px;font-weight:500;cursor:pointer;font-family:var(--f-b);transition:all .2s}
.btn-ghost:hover{background:rgba(255,255,255,.12);color:#fff;border-color:rgba(255,255,255,.35)}

/* Hero stats — verbatim from homepage */
.hero-stats{
  display:inline-flex;position:relative;border-radius:20px;padding:1.5px;
  background:linear-gradient(105deg,rgba(139,92,246,0.55) 0%,rgba(255,255,255,0.08) 45%,rgba(238,157,17,0.5) 100%);
  animation:fadeUp .85s .32s ease both;
}
.hero-stats-inner{
  display:flex;border-radius:18.5px;
  background:rgba(10,5,28,0.72);
  backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);overflow:hidden;
}
.hero-stat{
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  padding:22px 38px;position:relative;cursor:default;transition:background .3s;
}
.hero-stat::after{content:'';position:absolute;right:0;top:20%;bottom:20%;width:1px;background:rgba(255,255,255,0.07);}
.hero-stat:last-child::after{display:none}
.hero-stat:hover{background:rgba(255,255,255,0.04)}
.hero-stat:hover .hs-accent{transform:scaleX(1);opacity:1}
.hero-stat:hover .hs-num{-webkit-text-fill-color:transparent;background:linear-gradient(135deg,#fff 30%,var(--g300) 100%);-webkit-background-clip:text;background-clip:text}
.hs-accent{position:absolute;bottom:0;left:15%;right:15%;height:2px;background:linear-gradient(90deg,transparent,var(--g400),transparent);border-radius:2px;transform:scaleX(0.2);opacity:0;transition:transform .4s cubic-bezier(.22,1,.36,1),opacity .3s;}
.hs-num{font-family:var(--f-m);font-size:34px;font-weight:500;letter-spacing:-.02em;color:#fff;line-height:1;margin-bottom:7px;transition:all .3s;white-space:nowrap;}
.hs-suffix{font-size:22px;font-weight:400;color:var(--g300);font-family:var(--f-m)}
.hs-label{font-family:var(--f-b);font-size:10px;font-weight:600;letter-spacing:.13em;text-transform:uppercase;color:rgba(255,255,255,.35);white-space:nowrap;}

/* ════════════════════════════════════════
   FILTER TABS STRIP — sticky below nav
════════════════════════════════════════ */
.filter-strip{
  background:#fff;border-bottom:1px solid var(--bd);
  padding:0 48px;position:sticky;top:70px;z-index:50;
}
.filter-strip-inner{
  max-width:1100px;margin:0 auto;
  display:flex;align-items:center;gap:6px;
  padding:14px 0;overflow-x:auto;scrollbar-width:none;
}
.filter-strip-inner::-webkit-scrollbar{display:none}
.tab{
  display:inline-flex;align-items:center;gap:7px;
  padding:8px 18px;border-radius:24px;
  font-size:13px;font-weight:500;font-family:var(--f-b);
  cursor:pointer;transition:all .22s cubic-bezier(.22,1,.36,1);
  border:1.5px solid var(--bd);background:#fff;color:var(--t3);
  user-select:none;white-space:nowrap;flex-shrink:0;
}
.tab:hover{background:var(--p25);color:var(--t2);border-color:var(--bd-p)}
.tab.active{background:var(--p700);color:#fff;border-color:var(--p700);box-shadow:var(--sh-p)}
.tab-count{font-size:10px;font-weight:700;border-radius:10px;padding:1px 6px;font-family:var(--f-m);}
.tab.active .tab-count{background:rgba(255,255,255,0.2);color:#fff}
.tab:not(.active) .tab-count{background:var(--p50);color:var(--p600)}

/* ════════════════════════════════════════
   INTEGRATIONS GRID
════════════════════════════════════════ */

/* ── Keyframes (grid-specific) ── */
@keyframes accentFlow{
  0%  {background-position:0%   50%}
  100%{background-position:200% 50%}
}
@keyframes flowDot{
  0%  {left:-12px;opacity:0}
  10% {opacity:1}
  90% {opacity:1}
  100%{left:calc(100% + 12px);opacity:0}
}
@keyframes cardIn{
  from{opacity:0;transform:translateY(22px)}
  to  {opacity:1;transform:translateY(0)}
}
@keyframes dashMove{
  to{stroke-dashoffset:-24}
}
@keyframes hubPulse{
  0%,100%{box-shadow:0 0 0 0 rgba(99,32,224,.35)}
  50%    {box-shadow:0 0 0 8px rgba(99,32,224,0)}
}
@keyframes connectorFade{
  from{opacity:0;transform:scaleX(.6)}
  to  {opacity:1;transform:scaleX(1)}
}

/* ── Section shell ── */


/* ── Scroll reveal ─────────────────────────────────────────── */
.sr{opacity:0;transform:translateY(24px);transition:opacity .65s ease,transform .65s ease}
.sr.visible{opacity:1;transform:translateY(0)}
.sr-d1.visible{transition-delay:.1s}
.sr-d2.visible{transition-delay:.2s}
.sr-d3.visible{transition-delay:.3s}
.sr-d4.visible{transition-delay:.4s}
.sr-d5.visible{transition-delay:.5s}

/* ── Hero ─────────────────────────────────────────────────── */
.hero{
  min-height:100vh;
  background:var(--bg-v);
  display:flex;flex-direction:column;
  align-items:center;justify-content:center;
  padding:100px 48px 80px;
  position:relative;overflow:hidden;text-align:center;
}
.glow-a{position:absolute;width:700px;height:700px;border-radius:50%;background:radial-gradient(circle,rgba(139,92,246,.28) 0%,transparent 70%);top:-10%;left:-8%;animation:glowDrift 22s ease-in-out infinite;pointer-events:none;z-index:0;filter:blur(60px);}
.glow-b{position:absolute;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(99,32,224,.2) 0%,transparent 65%);bottom:-20%;right:-5%;animation:glowDrift 28s 6s ease-in-out infinite reverse;pointer-events:none;z-index:0;filter:blur(60px);}




/* Network dots background */


.hero-inner{position:relative;z-index:2;max-width:820px;margin:0 auto;padding-top:80px;}
.hero-badge{
  display:inline-flex;align-items:center;gap:8px;
  background:rgba(57,16,133,.28);border:1px solid rgba(139,92,246,.32);
  padding:6px 16px;border-radius:24px;margin-bottom:32px;
  animation:fadeUp .8s ease both;
}
.hero-badge-dot{width:7px;height:7px;border-radius:50%;background:var(--em400);animation:breathe 2.2s ease-in-out infinite;}
.hero-badge span{font-size:12px;font-weight:600;color:rgba(255,255,255,.85);font-family:var(--f-b);letter-spacing:.02em;}

.hero h1{
  font-size:clamp(38px,6vw,68px);
  font-weight:800;letter-spacing:-.04em;line-height:1.04;
  margin-bottom:24px;
  background:linear-gradient(95deg,rgb(255,255,255) 0%,rgb(255,255,255) 30%,rgb(245,208,96) 62%,rgb(245,166,35) 100%);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
  animation:fadeUp .85s .08s ease both;
}
.hero-sub{
  font-size:18px;line-height:1.75;color:rgba(255,255,255,.52);
  max-width:640px;margin:0 auto 40px;
  font-family:var(--f-b);animation:fadeUp .85s .16s ease both;
}
.hero-ctas{
  display:flex;gap:12px;justify-content:center;flex-wrap:wrap;
  animation:fadeUp .85s .24s ease both;
}




.hero-track-tag span{
  width:8px;height:8px;border-radius:50%;flex-shrink:0;
}
@keyframes scrollTracks{
  0%{transform:translateX(0)} 100%{transform:translateX(-50%)}
}
@keyframes fadeUp{
  from{opacity:0;transform:translateY(20px)}
  to{opacity:1;transform:translateY(0)}
}

/* ── Wave ─────────────────────────────────────────────────── */
.wave-bottom{position:absolute;bottom:-1px;left:0;width:100%;pointer-events:none;z-index:1;}

/* ── Section shell ─────────────────────────────────────────── */


.section section-white .section-inner, #partner-tracks 
.section-alt{background:var(--p25);}
.section-dark{background:var(--p700);}
.section-white{background:#fff;}


.sec-title{text-align:left;
  font-family:var(--f-t);font-size:clamp(28px,3.5vw,42px);font-weight:800;color:var(--t1);
  letter-spacing:-.035em;line-height:1.1;color:var(--p700);margin-bottom:14px;
}


/* ── Partner track cards ───────────────────────────────────── */
.tracks-grid{
  display:grid;grid-template-columns:repeat(3,1fr);gap:20px;
  margin-top:52px;
}
.track-card{
  background:#fff;
  border:1.5px solid var(--bd);
  border-top:3px solid var(--track-color,#6320E0);
  border-radius:20px;
  padding:28px;
  position:relative;overflow:visible;
  display:flex;flex-direction:column;
  transition:transform .3s cubic-bezier(.22,1,.36,1),
             box-shadow .3s ease,
             border-color .25s ease,
             border-radius .45s cubic-bezier(.22,1,.36,1);
  cursor:default;
}
.track-card::before{content:''}
.track-card:hover{
  transform:translateY(-6px);
  box-shadow:0 24px 56px rgba(15,13,46,.10),0 8px 20px rgba(15,13,46,.06);
  border-color:var(--track-color-faint,rgba(99,32,224,.2));
  border-top-color:var(--track-color,#6320E0);
}
.track-icon{
  width:48px;height:48px;border-radius:14px;
  background:var(--track-color-bg,rgba(99,32,224,.08));
  border:1.5px solid var(--track-color-border,rgba(99,32,224,.15));
  display:flex;align-items:center;justify-content:center;
  margin-bottom:18px;
  color:var(--track-color,#6320E0);
}
.track-icon svg{width:22px;height:22px;}
.track-badge{
  display:inline-flex;align-self:flex-start;font-size:9.5px;font-weight:700;letter-spacing:.06em;
  text-transform:uppercase;padding:3px 9px;border-radius:6px;
  background:var(--track-color-bg,rgba(99,32,224,.08));
  color:var(--track-color,#6320E0);margin-bottom:12px;
  font-family:var(--f-b);
}
.track-title{
  font-family:var(--f-t);font-size:17px;font-weight:800;
  color:var(--p700);letter-spacing:-.02em;line-height:1.2;margin-bottom:6px;
}
.track-headline{
  font-family:var(--f-b);font-size:12.5px;font-weight:600;
  color:var(--track-color,#6320E0);margin-bottom:12px;
}
.track-desc{
  font-size:13.5px;line-height:1.72;color:var(--t2);
  font-family:var(--f-b);margin-bottom:14px;
}
.track-perks{display:flex;flex-direction:column;gap:9px;margin-bottom:22px;}
.track-perk{
  display:flex;align-items:flex-start;gap:9px;
  font-size:12.5px;color:var(--t2);font-family:var(--f-b);
}
.track-perk-dot{
  width:5px;height:5px;border-radius:50%;
  background:var(--track-color,#6320E0);flex-shrink:0;margin-top:6px;opacity:.7;
}
.track-perk strong{color:var(--t1);font-weight:600;}
.track-cta{
  display:inline-flex;align-items:center;gap:6px;
  font-size:13px;font-weight:700;color:var(--track-color,#6320E0);
  font-family:var(--f-b);text-decoration:none;
  transition:gap .2s ease;
}
.track-cta:hover{gap:10px;}
.track-cta svg{width:14px;height:14px;flex-shrink:0;}

/* Last row: 2 cards centered */
.tracks-grid .track-card:nth-child(4){grid-column:1;}
.tracks-grid .track-card:nth-child(5){grid-column:2;}

/* ── Stats banner ──────────────────────────────────────────── */
.stats-banner{
  background:linear-gradient(140deg,#14104A 0%,#1E1660 40%,#261d6b 70%,#1a1258 100%);
  padding:72px 48px;
  position:relative;overflow:hidden;
}
.stats-banner-glow{
  position:absolute;inset:0;pointer-events:none;
  background:radial-gradient(ellipse 60% 80% at 50% 0%,rgba(139,92,246,.18) 0%,transparent 70%);
}
.stats-row{
  display:flex;align-items:center;justify-content:center;
  gap:0;max-width:900px;margin:0 auto;
}
.stat-block{
  flex:1;text-align:center;
  padding:24px 32px;
  border-right:1px solid rgba(255,255,255,.08);
}
.stat-block:last-child{border-right:none;}
.stat-num{
  font-family:var(--f-t);font-size:clamp(32px,4.5vw,48px);
  font-weight:800;line-height:1;
  background:linear-gradient(135deg,#fff 30%,var(--g300) 100%);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
  margin-bottom:10px;display:block;
}
.stat-label{
  font-family:var(--f-b);font-size:11px;font-weight:600;
  letter-spacing:.1em;text-transform:uppercase;
  color:rgba(255,255,255,.38);display:block;
  line-height:1.5;
}

/* ── Why partner section ───────────────────────────────────── */
.why-grid{
  display:grid;grid-template-columns:1fr 1fr;
  gap:28px;margin-top:48px;
}
.why-item{
  display:flex;align-items:flex-start;gap:20px;
  padding:28px;background:#fff;
  border:1.5px solid var(--bd);border-radius:16px;
  transition:border-color .25s,box-shadow .25s;
}
.why-item:hover{
  border-color:rgba(99,32,224,.2);
  box-shadow:0 6px 20px rgba(15,13,46,.07);
}

.why-icon svg{width:20px;height:20px;}
.why-body h4{
  font-family:var(--f-t);font-size:14.5px;font-weight:700;
  color:var(--p700);margin-bottom:5px;
}
.why-body p{
  font-size:13.5px;line-height:1.68;color:var(--t2);font-family:var(--f-b);
}

/* ── Process timeline ──────────────────────────────────────── */
.process-row{
  display:grid;grid-template-columns:repeat(4,1fr);
  gap:0;margin-top:52px;position:relative;
}
.process-row::before{
  content:'';position:absolute;top:28px;left:12.5%;right:12.5%;height:1.5px;
  background:linear-gradient(90deg,var(--p100),var(--p300),var(--p100));
  z-index:0;
}
.process-step{
  display:flex;flex-direction:column;align-items:center;
  text-align:center;padding:0 16px;position:relative;z-index:1;
}
.process-num{
  width:56px;height:56px;border-radius:50%;
  background:#fff;border:2px solid var(--p100);
  display:flex;align-items:center;justify-content:center;
  font-family:var(--f-m);font-size:16px;font-weight:600;
  color:var(--p400);margin-bottom:18px;
  box-shadow:0 2px 12px rgba(99,32,224,.1);
  transition:border-color .3s,background .3s,color .3s;
}
.process-step:hover .process-num{
  background:var(--p600);color:#fff;border-color:var(--p600);
}
.process-step h4{
  font-family:var(--f-t);font-size:14px;font-weight:700;
  color:var(--p700);margin-bottom:8px;
}
.process-step p{
  font-size:12.5px;line-height:1.65;color:var(--t2);font-family:var(--f-b);
}

/* ── CTA section ───────────────────────────────────────────── */
.partner-cta{
  background:var(--bg-v);
  padding:96px 48px 100px;
  text-align:center;
  position:relative;overflow:hidden;
}

.partner-cta-title{
  font-size:clamp(30px,4.5vw,52px);font-weight:800;letter-spacing:-.04em;
  background:linear-gradient(140deg,#C4B5FD 0%,#fff 40%,#EE9D11 100%);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
  margin-bottom:16px;line-height:1.06;
}
.partner-cta-sub{
  font-size:17px;color:rgba(255,255,255,.45);
  max-width:480px;margin:0 auto 36px;line-height:1.75;font-family:var(--f-b);
}

/* ── Responsive ─────────────────────────────────────────────── */
@media(max-width:960px){
  .tracks-grid{grid-template-columns:1fr 1fr;}
  .tracks-grid .track-card:nth-child(4),
  .tracks-grid .track-card:nth-child(5){grid-column:auto;}
  .why-grid{grid-template-columns:1fr;}
  .stats-row{flex-direction:column;}
  .stat-block{border-right:none;border-bottom:1px solid rgba(255,255,255,.08);}
  .process-row{grid-template-columns:1fr 1fr;gap:24px;}
  .process-row::before{display:none;}
}
@media(max-width:640px){
  .tracks-grid{grid-template-columns:1fr;}
  
  .hero{padding:80px 24px 72px;}
}

.footer::before{content:'';position:absolute;inset:0;z-index:0;pointer-events:none;}
.footer::after{content:'';position:absolute;inset:0;z-index:0;pointer-events:none;background-image:radial-gradient(rgba(255,255,255,.025) 1px, transparent 1px);background-size:80px 80px;}
.footer-accent-bar{
  position:absolute;top:0;left:0;right:0;height:1px;z-index:2;
  background:linear-gradient(90deg,transparent 0%,rgba(130,120,210,.2) 15%,rgba(194,193,232,.55) 38%,rgba(255,255,255,.35) 50%,rgba(194,193,232,.55) 62%,rgba(130,120,210,.2) 85%,transparent 100%);
}
.footer-grid{position:relative;z-index:2;max-width:1100px;margin:0 auto;display:grid;grid-template-columns:300px repeat(3,1fr);gap:56px;margin-bottom:64px;position:relative;z-index:1;}
.footer-kw-widget{display:flex;flex-direction:column;gap:0;}
.footer-logo-wrap{margin-bottom:24px}
.footer-logo-wrap img{height:22px;display:block;opacity:.9}
.footer-tagline{font-family:var(--f-t);font-size:22px;font-weight:800;color:#fff;letter-spacing:-.03em;line-height:1.35;margin-bottom:6px;}
.footer-tagline .footer-kw-word{font-family:var(--f-t);font-size:22px;font-weight:800;letter-spacing:-.03em;background:linear-gradient(90deg,#C4B5FD,#A78BFA);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;}
.footer-kw-cursor{display:inline-block;width:2px;height:.85em;background:rgba(194,193,232,.6);margin-left:2px;vertical-align:middle;border-radius:1px;animation:kwBlink .8s step-end infinite;}
.footer-kw-word{font-family:var(--f-b);font-size:13px;font-weight:700;color:#C4B5FD;display:inline-block;opacity:1;transform:translateY(0);transition:opacity .22s ease,transform .22s ease;white-space:nowrap;}
.footer-kw-word.kw-exit{opacity:0;transform:translateY(-7px)}
.footer-kw-word.kw-enter{opacity:0;transform:translateY(7px)}
.footer-kw-word.kw-visible{opacity:1;transform:translateY(0);transition:opacity .28s ease,transform .28s ease}
.footer-tagline-sub{font-size:13px;color:rgba(255,255,255,.35);font-family:var(--f-b);line-height:1.6;margin-bottom:24px;}
.footer-socials{display:flex;gap:8px}
.social-btn{width:34px;height:34px;border-radius:9px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,.35);font-size:12px;cursor:pointer;transition:all .2s;font-family:var(--f-b);font-weight:700;}
.social-btn:hover{background:rgba(99,32,224,.2);border-color:rgba(99,32,224,.4);color:rgba(255,255,255,.85);}
.footer-col{padding-top:4px}
.footer-col h5{font-family:var(--f-b);font-size:10px;font-weight:800;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.22);margin-bottom:14px;}
.footer-col ul{list-style:none;display:flex;flex-direction:column;gap:13px}
.footer-col a{font-size:13px;color:rgba(255,255,255,.38);text-decoration:none;transition:color .18s;font-family:var(--f-b);display:inline-flex;align-items:center;gap:5px;}
.footer-col a:hover{color:rgba(255,255,255,.82)}
.footer-col a::before{content:'';display:inline-block;width:4px;height:4px;border-radius:50%;background:rgba(130,130,200,.7);opacity:0;transform:translateX(-4px);transition:all .18s;flex-shrink:0;}
.footer-col a:hover::before{opacity:1;transform:translateX(0)}
.footer-bottom{max-width:1100px;margin:0 auto;padding-top:28px;border-top:1px solid rgba(255,255,255,.06);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;position:relative;z-index:1;}
.footer-logo-wrap{margin-bottom:24px}
.footer-tagline{font-family:var(--f-t);font-size:22px;font-weight:800;color:#fff;letter-spacing:-.03em;line-height:1.35;margin-bottom:6px;}
.footer-kw-word{font-family:var(--f-t);font-size:22px;font-weight:800;letter-spacing:-.03em;background:linear-gradient(90deg,#C4B5FD,#A78BFA);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;}
.footer-col{padding-top:4px}

/* Track card expand/collapse — absolute panel below card */
.track-expandable{
  position:absolute;
  top:calc(100% - 20px); /* overlap slightly for seamless join */
  left:-1.5px;right:-1.5px;
  background:#fff;
  border:1.5px solid var(--track-color-faint,rgba(99,32,224,.15));
  border-top:none;
  border-radius:0 0 20px 20px;
  padding:0 28px;
  max-height:0;overflow:hidden;
  z-index:100;
  background:#fff;
  box-shadow:0 16px 40px rgba(15,13,46,.14),0 4px 12px rgba(15,13,46,.08);
  transition:max-height .45s cubic-bezier(.22,1,.36,1),
             padding .45s cubic-bezier(.22,1,.36,1);
}
.track-card.expanded{
  z-index:99;
  border-radius:20px 20px 0 0;
  border-color:var(--track-color-faint,rgba(99,32,224,.15));
}
.track-card.expanded .track-toggle{
  margin-top:16px;
  padding-top:0;
}
.track-card.expanded .track-expandable{
  max-height:700px;
  padding:8px 28px 28px;
}
.track-toggle{
  display:inline-flex;align-items:center;gap:6px;
  font-size:13px;font-weight:700;
  color:var(--track-color,#6320E0);font-family:var(--f-b);
  cursor:pointer;background:none;border:none;padding:0;
  margin-top:auto;padding-top:14px;transition:gap .2s;
  outline:none;
}
.track-toggle:hover{gap:10px;}
.track-toggle-icon{
  width:14px;height:14px;flex-shrink:0;
  transition:transform .35s cubic-bezier(.22,1,.36,1);
}
.track-card.expanded .track-toggle-icon{transform:rotate(90deg);}

.rgb-divider{height:3px;width:100%;background:linear-gradient(90deg,var(--p500),var(--p300),#F59E0B);display:block;}
@keyframes waveSlide{from{transform:translateX(0);}to{transform:translateX(-50%);}}
.sec-eyebrow,
.sec-eyebrow::before,.eyebrow::before{
  content:'';width:20px;height:2px;
  flex-shrink:0;border-radius:2px;
  background:linear-gradient(90deg,rgb(99,32,224),rgb(238,157,17));
}
.partner-cta .sec-title,.partner-cta h2{
  color:#fff;background:none;-webkit-text-fill-color:#fff;
}
.hero-text-link{
  font-family:var(--f-b);font-size:15px;font-weight:500;
  color:rgba(255,255,255,.72);text-decoration:none;
  display:inline-flex;align-items:center;gap:6px;
  transition:color .2s;background:none;border:none;padding:0;
}
.hero-text-link:hover{color:#fff;}
.tracks-section-header{
  margin-bottom:48px;
}
.tracks-section-header .sec-title{
  font-size:clamp(32px,4vw,48px);
  color:var(--t1);
  background:none;
  -webkit-text-fill-color:var(--t1);
  margin-bottom:12px;
}
.tracks-section-header 

.section-header-block .sec-title{
  color:var(--t1);background:none;-webkit-text-fill-color:var(--t1);
}
.section-header-block 


.partner-cta{background:#0f0c29;padding:clamp(72px,9vh,110px) 5vw;text-align:center;position:relative;overflow:hidden;}
.cta-inner{max-width:640px;margin:0 auto;position:relative;z-index:1;}
.cta-title{font-size:clamp(28px,4.5vw,48px);font-weight:800;letter-spacing:-.035em;line-height:1.1;color:#fff;margin-bottom:16px;}
.cta-sub{font-size:16px;color:rgba(255,255,255,.52);max-width:460px;margin:0 auto 44px;line-height:1.7;font-family:var(--f-b);}
.cta-actions{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;}
.cta-live-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(245,166,35,.12);border:1px solid rgba(245,166,35,.3);border-radius:100px;padding:6px 18px;margin-bottom:14px;font-family:var(--f-b);font-size:12px;font-weight:600;color:#F5D060;letter-spacing:.04em;}
.cta-live-dot{width:7px;height:7px;border-radius:50%;background:#F5A623;flex-shrink:0;box-shadow:0 0 8px rgba(245,166,35,.8);animation:livePulse 2.4s ease-in-out infinite;}
@keyframes livePulse{0%,100%{transform:scale(1);opacity:1;}50%{transform:scale(1.3);opacity:.7;}}
.btn-cta-primary{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,#E8920A,#F5B020);color:#fff;border:none;border-radius:10px;padding:14px 32px;font-family:var(--f-b);font-size:15px;font-weight:700;cursor:pointer;text-decoration:none;box-shadow:0 6px 32px rgba(232,150,10,.52);transition:opacity .2s,transform .2s;}
.btn-cta-primary:hover{opacity:.9;transform:translateY(-2px);}


/* ── SECTION LAYOUT ─────────────────────── */
.section-light{background:#F8F7FF;}
.section-dark{background:linear-gradient(135deg,#0f0c29 0%,#1a1260 40%,#261d6b 70%,#1e1050 100%);position:relative;overflow:hidden;}
.section-white{background:#fff;}


.sec-title{font-family:var(--f-t);font-size:clamp(28px,3.8vw,48px);font-weight:800;letter-spacing:-.03em;line-height:1.1;color:var(--t1);margin-bottom:16px;}


.eyebrow::before{content:'';width:20px;height:2px;border-radius:2px;background:linear-gradient(90deg,rgb(99,32,224),rgb(238,157,17));flex-shrink:0;}
.rgb-divider{height:3px;background:linear-gradient(90deg,var(--p500),var(--p300),#F59E0B);}

/* ── OPPORTUNITY ─────────────────────────── */
.opp-table th{color:var(--t4);font-weight:600;font-size:11px;letter-spacing:.06em;text-transform:uppercase;padding:4px 8px;text-align:left;border-bottom:1px solid var(--bd);}
.opp-table td{padding:8px 8px;color:var(--t2);border-bottom:1px solid var(--bd);}
.opp-table tr:last-child td{border-bottom:none;}

/* ── WHY US ──────────────────────────────── */
.why-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:28px;}
.why-card{background:#fff;border:1.5px solid rgba(99,32,224,.12);border-radius:20px;padding:40px 32px;display:flex;flex-direction:column;gap:0;position:relative;overflow:hidden;transition:transform .2s,box-shadow .2s;box-shadow:0 4px 24px rgba(99,32,224,.06);}
.why-card:hover{box-shadow:0 8px 32px rgba(99,32,224,.12);transform:translateY(-3px);}

.why-title{font-family:var(--f-t);font-size:16px;font-weight:700;color:var(--t1);}
.why-body{font-family:var(--f-b);font-size:14px;color:var(--t2);line-height:1.6;}

/* ── WHICH PARTNER WINS ──────────────────── */
.pfits-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;}
.pfit-card{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12);border-radius:16px;padding:28px 24px;display:flex;flex-direction:column;gap:12px;transition:background .2s;}
.pfit-card:hover{background:rgba(255,255,255,.12);}
.pfit-icon{width:28px;height:28px;color:rgba(255,255,255,.6);}
.pfit-title{font-family:var(--f-t);font-size:16px;font-weight:700;color:#fff;}
.pfit-body{font-family:var(--f-b);font-size:14px;color:rgba(255,255,255,.6);line-height:1.65;}
.pfit-body strong{color:rgba(255,255,255,.9);font-weight:600;}

/* ── CFO MATH ────────────────────────────── */
.cfo-grid{display:grid;grid-template-columns:1fr 1.4fr;gap:24px;align-items:start;}
.cfo-cost-card{background:#fff;border:1.5px solid var(--bd);border-radius:16px;padding:32px;}
.cfo-cost-card h3{font-family:var(--f-t);font-size:17px;font-weight:700;color:var(--t1);margin-bottom:14px;}
.cfo-list{list-style:none;display:flex;flex-direction:column;gap:12px;}
.cfo-list li{font-family:var(--f-b);font-size:14px;color:var(--t2);line-height:1.6;padding-left:20px;position:relative;}
.cfo-list li::before{content:'';position:absolute;left:0;top:8px;width:8px;height:8px;border-radius:50%;background:var(--p500);}
.cfo-roi-card{background:linear-gradient(135deg,#2D1270,#391085);border-radius:16px;padding:32px;}
.cfo-roi-header{font-family:var(--f-b);font-size:14px;color:rgba(255,255,255,.7);margin-bottom:14px;font-weight:600;}
.cfo-roi-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
.cfo-roi-item{background:rgba(255,255,255,.1);border-radius:10px;padding:16px;}
.cfo-roi-num{font-family:var(--f-t);font-size:20px;font-weight:800;color:#F5D060;margin-bottom:4px;}
.cfo-roi-label{font-family:var(--f-b);font-size:12px;color:rgba(255,255,255,.6);line-height:1.4;}

/* ── PARTNER TIERS ───────────────────────── */
.tiers-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:20px;align-items:stretch;}
.tier-card{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12);border-radius:20px;padding:32px;display:flex;flex-direction:column;gap:16px;position:relative;transition:background .2s;}
.tier-featured{border:1.5px solid rgba(245,208,96,.5);box-shadow:0 8px 40px rgba(245,166,35,.18);margin-top:0;}
.tier-popular{position:absolute;top:-14px;left:50%;transform:translateX(-50%);background:var(--p600);color:#fff;font-family:var(--f-b);font-size:11px;font-weight:700;padding:5px 16px;border-radius:100px;white-space:nowrap;}
.tier-tag{font-family:var(--f-b);font-size:10px;font-weight:700;letter-spacing:.1em;color:rgba(255,255,255,.45);text-transform:uppercase;}
.tier-name{font-family:var(--f-t);font-size:22px;font-weight:800;color:#fff;}
.tier-rate{font-family:var(--f-t);font-size:32px;font-weight:900;color:#F5D060;}
.tier-rate span{font-size:15px;font-weight:500;color:var(--t3);}
.tier-list{list-style:none;display:flex;flex-direction:column;gap:10px;flex:1;}
.tier-list li{font-family:var(--f-b);font-size:13.5px;color:var(--t2);padding-left:22px;position:relative;line-height:1.5;}
.tier-list li::before{content:'';position:absolute;left:0;top:6px;width:14px;height:14px;border-radius:50%;border:1.5px solid var(--p400);background:var(--p50);}
.tier-btn{display:block;text-align:center;font-family:var(--f-b);font-size:14px;font-weight:700;padding:12px;border-radius:10px;text-decoration:none;transition:all .2s;}
.tier-btn-outline{border:1.5px solid rgba(255,255,255,.25);color:rgba(255,255,255,.8);}
.tier-btn-outline:hover{border-color:rgba(255,255,255,.5);color:#fff;background:rgba(255,255,255,.06);}
.tier-btn-primary{background:linear-gradient(135deg,var(--p600),var(--p400));color:#fff;box-shadow:0 4px 20px rgba(99,32,224,.35);}
.tier-btn-primary:hover{opacity:.9;transform:translateY(-1px);}

/* ── ENABLEMENT ──────────────────────────── */
.enablement-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
.enablement-item{display:flex;align-items:center;gap:12px;background:#F8F7FF;border:1px solid var(--bd);border-radius:12px;padding:16px 20px;font-family:var(--f-b);font-size:14.5px;color:var(--t1);font-weight:500;}
.enablement-item svg{flex-shrink:0;width:20px;height:20px;}

/* ── EARNINGS TABLE ──────────────────────── */
.earnings-table-wrap{border-radius:16px;overflow:hidden;box-shadow:0 4px 32px rgba(0,0,0,.08);}
.earnings-table{width:100%;border-collapse:collapse;font-family:var(--f-b);}
.earnings-table thead tr{background:var(--p700);color:#fff;}
.earnings-table th{padding:16px 20px;font-size:13px;font-weight:600;letter-spacing:.04em;text-align:left;}
.earnings-table td{padding:18px 20px;font-size:14px;color:var(--t2);background:#fff;border-bottom:1px solid var(--bd);}
.earn-num{color:var(--p500);font-weight:700;font-size:16px;text-align:right;}
.earn-top{background:var(--p25);}
.earn-top td{background:var(--p25);}
.earn-big{font-size:18px;color:var(--p600);}

/* ── TRUST CERTS ─────────────────────────── */
.trust-certs-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;}
.trust-cert{background:#fff;border:1.5px solid var(--bd);border-radius:16px;padding:28px 24px;text-align:center;display:flex;flex-direction:column;align-items:center;gap:12px;transition:box-shadow .2s,transform .2s;}
.trust-cert:hover{box-shadow:0 6px 24px rgba(99,32,224,.1);transform:translateY(-2px);}
.trust-cert-icon{width:48px;height:48px;}
.trust-cert-name{font-family:var(--f-t);font-size:16px;font-weight:700;color:var(--t1);}
.trust-cert-sub{font-family:var(--f-b);font-size:12px;color:var(--t3);line-height:1.5;}
.trust-upcoming{display:inline-block;background:var(--t1);color:#fff;font-size:10px;font-weight:700;padding:3px 10px;border-radius:100px;margin-top:8px;}

/* ── RESPONSIVE ──────────────────────────── */
@media(max-width:900px){
  .opp-grid,.pfits-grid,.tiers-grid,.cfo-grid{grid-template-columns:1fr;}
  .why-grid,.trust-certs-grid{grid-template-columns:1fr 1fr;}
  .enablement-grid{grid-template-columns:1fr;}
  .cfo-roi-grid{grid-template-columns:1fr 1fr;}
}
@media(max-width:580px){
  .why-grid,.trust-certs-grid,.cfo-roi-grid{grid-template-columns:1fr;}
}


.section{padding:80px 48px;text-align:left;}
.section-inner{max-width:1100px;margin:0 auto;text-align:left;}
.section-header-block{text-align:left;margin-bottom:14px;}
.eyebrow{display:flex;align-items:center;justify-content:flex-start;gap:8px;font-family:var(--f-b);font-size:11px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--p500);margin-bottom:16px;}
.eyebrow::before{content:'';width:20px;height:2px;border-radius:2px;background:linear-gradient(90deg,rgb(99,32,224),rgb(238,157,17));flex-shrink:0;}
.sec-sub{font-family:var(--f-b);font-size:15.5px;line-height:1.75;color:var(--t3);max-width:580px;margin:0;text-align:left;}

/* ── OPP CARDS ── */
.opp-grid{display:grid;grid-template-columns:1fr 1fr;gap:28px;margin-top:8px;}
.opp-card{position:relative;border-radius:24px;border:1.5px solid rgba(99,32,224,.12);overflow:hidden;background:#fff;box-shadow:0 4px 32px rgba(99,32,224,.06);}
.opp-card-bg{position:absolute;inset:0;background:linear-gradient(135deg,rgba(99,32,224,.05) 0%,rgba(245,158,11,.03) 100%);pointer-events:none;}
.opp-card-content{position:relative;z-index:1;padding:28px;}
.opp-region-row{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:20px;}
.opp-region{font-family:var(--f-t);font-size:20px;font-weight:800;color:var(--t1);letter-spacing:-.02em;margin-bottom:4px;}
.opp-label{font-family:var(--f-b);font-size:12px;color:var(--t3);font-weight:500;}
.opp-total-badge{flex-shrink:0;background:linear-gradient(135deg,rgba(99,32,224,.1),rgba(99,32,224,.06));border:1.5px solid rgba(99,32,224,.18);border-radius:12px;padding:8px 14px;font-family:var(--f-t);font-size:17px;font-weight:800;color:var(--p600);white-space:nowrap;}
.opp-visual-row{display:flex;align-items:center;gap:20px;margin-bottom:20px;}
.opp-donut-wrap{flex-shrink:0;}
.opp-bars{flex:1;display:flex;flex-direction:column;gap:11px;}
.opp-bar-row{display:flex;flex-direction:column;gap:4px;}
.opp-bar-label{display:flex;align-items:center;font-family:var(--f-b);font-size:12px;font-weight:600;color:var(--t2);}
.opp-dot{display:inline-block;width:8px;height:8px;border-radius:50%;margin-right:7px;flex-shrink:0;}
.opp-bar-track{height:6px;background:rgba(99,32,224,.07);border-radius:99px;overflow:hidden;}
.opp-bar-fill{height:100%;border-radius:99px;transition:width 1.2s ease;}
.opp-bar-meta{display:flex;align-items:center;gap:8px;}
.opp-spend{font-family:var(--f-t);font-size:12px;font-weight:700;color:var(--t1);}
.opp-cagr{font-family:var(--f-b);font-size:11px;font-weight:700;color:#3B82F6;background:rgba(16,185,129,.1);padding:1px 6px;border-radius:5px;}
.opp-footnote{display:flex;align-items:flex-start;gap:8px;font-family:var(--f-b);font-size:11px;color:var(--t3);line-height:1.5;padding-top:16px;border-top:1px solid rgba(99,32,224,.08);}
.opp-digi-badge{flex-shrink:0;background:rgba(99,32,224,.08);border:1px solid rgba(99,32,224,.16);border-radius:6px;padding:2px 7px;font-size:10px;font-weight:700;color:var(--p600);white-space:nowrap;}
@keyframes oppDraw1{from{stroke-dasharray:0 503}to{stroke-dasharray:251 252}}
@keyframes oppDraw2{from{stroke-dasharray:0 503}to{stroke-dasharray:126 377}}
@keyframes oppDraw3{from{stroke-dasharray:0 503}to{stroke-dasharray:95 408}}

.why-card::before{content:"";position:absolute;inset:0;background:linear-gradient(135deg,rgba(99,32,224,.04) 0%,rgba(245,166,35,.02) 100%);pointer-events:none;}
.why-card:hover{transform:translateY(-4px);box-shadow:0 16px 48px rgba(99,32,224,.18);}
.why-title{font-family:var(--f-t);font-size:18px;font-weight:800;color:var(--t1);margin-bottom:8px;letter-spacing:-.02em;}
.why-body{font-family:var(--f-b);font-size:14.5px;color:var(--t3);line-height:1.65;}
.why-icon-wrap{position:relative;width:56px;height:56px;margin-bottom:18px;}
.why-icon-ring{position:absolute;inset:-5px;border-radius:18px;background:linear-gradient(135deg,rgba(99,32,224,.2),rgba(245,166,35,.15));z-index:0;}
.why-icon-wrap svg{position:relative;z-index:1;filter:drop-shadow(0 8px 20px rgba(99,32,224,.45));}

.tier-card:hover{background:rgba(255,255,255,.12);}
.tier-list li{font-family:var(--f-b);font-size:14px;color:rgba(255,255,255,.7);display:flex;align-items:flex-start;gap:9px;}
.tier-list li::before{content:"✓";color:#F5D060;font-weight:700;flex-shrink:0;}
.tiers-grid-wrap{padding-top:18px;}
.partners-page{--f-t:var(--ft);--f-b:var(--fb);--f-m:var(--fm);}
`;

export const PARTNERS_HTML = `<section class="hero" id="hero">
  <div style="position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse 90% 70% at 50% 35%,rgba(99,32,224,.32) 0%,transparent 65%)"></div>
  <div style="position:absolute;bottom:0;left:0;right:0;height:50%;pointer-events:none;background:radial-gradient(ellipse 80% 60% at 50% 100%,rgba(245,166,35,.09) 0%,transparent 70%)"></div>
  <div style="position:absolute;inset:0;pointer-events:none;background-image:radial-gradient(rgba(255,255,255,.045) 1px,transparent 1px);background-size:30px 30px"></div>
  <div style="position:absolute;top:72px;left:0;right:0;height:1px;pointer-events:none;background:linear-gradient(90deg,transparent,rgba(255,255,255,.08) 30%,rgba(255,255,255,.08) 70%,transparent)"></div>
  <div class="hero-inner">

    <h1>The world is automating <em style="font-style:normal;background:linear-gradient(95deg,#F5D060,#F5A623);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">Source-to-Pay.</em><br><span style="white-space:nowrap">Be the partner who leads it.</span></h1>

    <p class="hero-sub">NimbleS2P is a compliance-first, AI-augmented S2P platform built for mid-to-large enterprises worldwide. Partner with us &mdash; deal protection, real enablement and a market moving fast. strengths to the table. Find your track below.</p>

    <div class="hero-ctas">
      <a href="#partner-tracks" class="btn-primary" style="padding:14px 32px;font-size:15px">Find Your Track &darr;</a>
      <a href="#contact" class="hero-text-link">Talk to Us &rarr;</a>
    </div>
  </div>

  <!-- Scrolling partner track labels -->
  

  
<div style="position:absolute;bottom:0;left:0;right:0;height:48px;overflow:hidden;pointer-events:none"><svg viewBox="0 0 1440 48" preserveAspectRatio="none" style="position:absolute;bottom:0;left:0;width:200%;height:100%;animation:waveSlide 10s linear infinite"><path d="M0,24 C240,6 480,40 720,24 C960,8 1200,40 1440,24 L1440,48 L0,48 Z" fill="rgba(255,255,255,.05)"></path></svg><div style="position:absolute;bottom:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,.1) 30%,rgba(255,255,255,.1) 70%,transparent)"></div>
</section>
<!-- ── THE OPPORTUNITY ─────────────────────────────────────────── -->
<section class="section section-light" id="opportunity">
  <div class="section-inner">
    <div class="section-header-block sr">
      <div class="eyebrow">The Opportunity</div>
      <h2 class="sec-title">The market is wide open &mdash; and it&rsquo;s exploding.</h2>
      <p class="sec-sub">Most mid-market enterprises across these regions still run procurement on Excel, email and disconnected ERP modules. The conversion opportunity is massive.</p>
    </div>

    <div class="opp-grid sr">

  <!-- ── SOUTHEAST ASIA ── -->
  <div class="opp-card">
    <div class="opp-card-bg"></div>
    <div class="opp-card-content">

      <div class="opp-region-row">
        <div>
          <div class="opp-region">Southeast Asia</div>
          <div class="opp-label">Enterprise Procurement Spend</div>
        </div>
        <div class="opp-total-badge">$200B</div>
      </div>

      <div class="opp-visual-row">
        <div class="opp-donut-wrap">
          <svg viewBox="0 0 220 220" width="180" height="180">
            <defs>
              <filter id="glow-sea">
                <feGaussianBlur stdDeviation="3" result="blur"/>
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>
            <!-- Track -->
            <circle cx="110" cy="110" r="80" fill="none" stroke="rgba(99,32,224,.1)" stroke-width="22"/>
            <!-- Indonesia -->
            <circle cx="110" cy="110" r="80" fill="none" stroke="#6320E0" stroke-width="22"
              stroke-dasharray="251 252" stroke-dashoffset="0"
              transform="rotate(-90 110 110)" filter="url(#glow-sea)"
              style="animation:oppDraw1 1.4s .2s ease both"/>
            <!-- Singapore -->
            <circle cx="110" cy="110" r="80" fill="none" stroke="#3B82F6" stroke-width="22"
              stroke-dasharray="126 377" stroke-dashoffset="-251"
              transform="rotate(-90 110 110)"
              style="animation:oppDraw2 1.4s .4s ease both"/>
            <!-- Vietnam -->
            <circle cx="110" cy="110" r="80" fill="none" stroke="#22C55E" stroke-width="22"
              stroke-dasharray="95 408" stroke-dashoffset="-377"
              transform="rotate(-90 110 110)"
              style="animation:oppDraw3 1.4s .6s ease both"/>
            <!-- Others -->
            <circle cx="110" cy="110" r="80" fill="none" stroke="rgba(196,181,253,.5)" stroke-width="22"
              stroke-dasharray="36 466" stroke-dashoffset="-472"
              transform="rotate(-90 110 110)"/>
            <!-- Inner fill -->
            <circle cx="110" cy="110" r="67" fill="url(#opp-inner-sea)"/>
            <defs>
              <radialGradient id="opp-inner-sea" cx="50%" cy="50%">
                <stop offset="0%" stop-color="#F5F3FF"/>
                <stop offset="100%" stop-color="#fff"/>
              </radialGradient>
            </defs>
            <text x="110" y="104" text-anchor="middle" font-family="Inter,sans-serif" font-size="22" font-weight="900" fill="#0F172A">$200B</text>
            <text x="110" y="122" text-anchor="middle" font-family="Inter,sans-serif" font-size="11" font-weight="600" letter-spacing="2" fill="#6320E0">SEA</text>
          </svg>
        </div>

        <div class="opp-bars">
          <div class="opp-bar-row">
            <div class="opp-bar-label"><span class="opp-dot" style="background:#6320E0"></span>Indonesia</div>
            <div class="opp-bar-track"><div class="opp-bar-fill" style="width:42.5%;background:linear-gradient(90deg,#6320E0,#8B5CF6)"></div></div>
            <div class="opp-bar-meta"><span class="opp-spend">$85B</span><span class="opp-cagr">↑17%</span></div>
          </div>
          <div class="opp-bar-row">
            <div class="opp-bar-label"><span class="opp-dot" style="background:#3B82F6"></span>Singapore</div>
            <div class="opp-bar-track"><div class="opp-bar-fill" style="width:22.5%;background:linear-gradient(90deg,#3B82F6,#60A5FA)"></div></div>
            <div class="opp-bar-meta"><span class="opp-spend">$45B</span><span class="opp-cagr">↑12%</span></div>
          </div>
          <div class="opp-bar-row">
            <div class="opp-bar-label"><span class="opp-dot" style="background:#22C55E"></span>Vietnam</div>
            <div class="opp-bar-track"><div class="opp-bar-fill" style="width:19%;background:linear-gradient(90deg,#22C55E,#86EFAC)"></div></div>
            <div class="opp-bar-meta"><span class="opp-spend">$38B</span><span class="opp-cagr">↑19%</span></div>
          </div>
          <div class="opp-bar-row">
            <div class="opp-bar-label"><span class="opp-dot" style="background:#C4B5FD"></span>Others</div>
            <div class="opp-bar-track"><div class="opp-bar-fill" style="width:16%;background:linear-gradient(90deg,#C4B5FD,#DDD6FE)"></div></div>
            <div class="opp-bar-meta"><span class="opp-spend">$32B</span><span class="opp-cagr" style="color:var(--t4)">&mdash;</span></div>
          </div>
        </div>
      </div>

      <div class="opp-footnote"><span class="opp-digi-badge">&lt;12% digitised</span>Key driver: ERP modernisation, LKPP reforms, manufacturing</div>
    </div>
  </div>

  <!-- ── GCC / MIDDLE EAST ── -->
  <div class="opp-card">
    <div class="opp-card-bg" style="background:linear-gradient(135deg,rgba(79,26,158,.06) 0%,rgba(16,185,129,.04) 100%)"></div>
    <div class="opp-card-content">

      <div class="opp-region-row">
        <div>
          <div class="opp-region">GCC / Middle East</div>
          <div class="opp-label">Enterprise Procurement Spend</div>
        </div>
        <div class="opp-total-badge" style="background:linear-gradient(135deg,rgba(245,166,35,.15),rgba(245,208,96,.08));border-color:rgba(245,166,35,.35);color:#B45309">$200B</div>
      </div>

      <div class="opp-visual-row">
        <div class="opp-donut-wrap">
          <svg viewBox="0 0 220 220" width="180" height="180">
            <defs>
              <filter id="glow-gcc">
                <feGaussianBlur stdDeviation="3" result="blur"/>
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>
            <circle cx="110" cy="110" r="80" fill="none" stroke="rgba(79,26,158,.1)" stroke-width="22"/>
            <!-- Saudi Arabia -->
            <circle cx="110" cy="110" r="80" fill="none" stroke="#4B1A9E" stroke-width="22"
              stroke-dasharray="299 204" stroke-dashoffset="0"
              transform="rotate(-90 110 110)" filter="url(#glow-gcc)"
              style="animation:oppDraw1 1.4s .2s ease both"/>
            <!-- UAE -->
            <circle cx="110" cy="110" r="80" fill="none" stroke="#3B82F6" stroke-width="22"
              stroke-dasharray="204 299" stroke-dashoffset="-299"
              transform="rotate(-90 110 110)"
              style="animation:oppDraw2 1.4s .4s ease both"/>
            <!-- Others -->
            <circle cx="110" cy="110" r="80" fill="none" stroke="rgba(196,181,253,.5)" stroke-width="22"
              stroke-dasharray="100 403" stroke-dashoffset="-503"
              transform="rotate(-90 110 110)"/>
            <circle cx="110" cy="110" r="67" fill="url(#opp-inner-gcc)"/>
            <defs>
              <radialGradient id="opp-inner-gcc" cx="50%" cy="50%">
                <stop offset="0%" stop-color="#F5F0FF"/>
                <stop offset="100%" stop-color="#fff"/>
              </radialGradient>
            </defs>
            <text x="110" y="104" text-anchor="middle" font-family="Inter,sans-serif" font-size="22" font-weight="900" fill="#0F172A">$200B</text>
            <text x="110" y="122" text-anchor="middle" font-family="Inter,sans-serif" font-size="11" font-weight="600" letter-spacing="2" fill="#4B1A9E">GCC</text>
          </svg>
        </div>

        <div class="opp-bars">
          <div class="opp-bar-row">
            <div class="opp-bar-label"><span class="opp-dot" style="background:#4B1A9E"></span>Saudi Arabia</div>
            <div class="opp-bar-track"><div class="opp-bar-fill" style="width:47.5%;background:linear-gradient(90deg,#4B1A9E,#7C3AED)"></div></div>
            <div class="opp-bar-meta"><span class="opp-spend">$95B</span><span class="opp-cagr">↑21%</span></div>
          </div>
          <div class="opp-bar-row">
            <div class="opp-bar-label"><span class="opp-dot" style="background:#3B82F6"></span>UAE</div>
            <div class="opp-bar-track"><div class="opp-bar-fill" style="width:32.5%;background:linear-gradient(90deg,#3B82F6,#60A5FA)"></div></div>
            <div class="opp-bar-meta"><span class="opp-spend">$65B</span><span class="opp-cagr">↑18%</span></div>
          </div>
          <div class="opp-bar-row">
            <div class="opp-bar-label"><span class="opp-dot" style="background:#C4B5FD"></span>Others</div>
            <div class="opp-bar-track"><div class="opp-bar-fill" style="width:20%;background:linear-gradient(90deg,#C4B5FD,#DDD6FE)"></div></div>
            <div class="opp-bar-meta"><span class="opp-spend">$40B</span><span class="opp-cagr" style="color:var(--t4)">&mdash;</span></div>
          </div>
        </div>
      </div>

      <div class="opp-footnote"><span class="opp-digi-badge" style="background:rgba(79,26,158,.08);border-color:rgba(79,26,158,.18);color:#4B1A9E">&lt;15% digitised</span>Key driver: Vision 2030, Giga-projects, supply-chain nationalisation</div>
    </div>
  </div>

</div>
  </div>
</section>

<div class="rgb-divider" aria-hidden="true"></div>

<!-- ── WHY US ─────────────────────────────────────────────────── -->
<section class="section section-white" id="why-us">
  <div class="section-inner">
    <div class="section-header-block sr">
      <div class="eyebrow">Why Us</div>
      <h2 class="sec-title">Hyper-configurable. <em style="font-style:normal;color:var(--p500)">AI-augmented.</em> Compliance-first.</h2>
      <p class="sec-sub">Built for medium to large, complex organisations that need speed, compliance and control in a single connected system.</p>
    </div>
    <div class="why-grid sr">

  <div class="why-card">
    <div class="why-icon-wrap">
      <div class="why-icon-ring"></div>
      <svg viewBox="0 0 64 64" width="56" height="56" fill="none">
        <defs>
          <radialGradient id="bg1" cx="30%" cy="30%"><stop offset="0%" stop-color="#7C3AED"/><stop offset="100%" stop-color="#3B0764"/></radialGradient>
          <linearGradient id="gold1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#F5D060"/><stop offset="100%" stop-color="#F5A623"/></linearGradient>
          <filter id="glow1"><feGaussianBlur stdDeviation="2.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>
        <rect width="64" height="64" rx="18" fill="url(#bg1)"/>
        <rect x="1" y="1" width="62" height="62" rx="17" stroke="rgba(255,255,255,.12)" stroke-width="1.5" fill="none"/>
        <!-- Hub nodes -->
        <circle cx="32" cy="32" r="5" fill="url(#gold1)" filter="url(#glow1)"/>
        <circle cx="14" cy="20" r="3.5" fill="rgba(255,255,255,.75)"/>
        <circle cx="50" cy="20" r="3.5" fill="rgba(255,255,255,.75)"/>
        <circle cx="14" cy="44" r="3.5" fill="rgba(255,255,255,.75)"/>
        <circle cx="50" cy="44" r="3.5" fill="rgba(255,255,255,.75)"/>
        <line x1="17" y1="21.5" x2="27" y2="29" stroke="rgba(255,255,255,.3)" stroke-width="1.5"/>
        <line x1="47" y1="21.5" x2="37" y2="29" stroke="rgba(255,255,255,.3)" stroke-width="1.5"/>
        <line x1="17" y1="42.5" x2="27" y2="35" stroke="rgba(255,255,255,.3)" stroke-width="1.5"/>
        <line x1="47" y1="42.5" x2="37" y2="35" stroke="rgba(255,255,255,.3)" stroke-width="1.5"/>
        <!-- Gavel -->
        <path d="M38 16l8 8-3 3-8-8z" fill="url(#gold1)" filter="url(#glow1)"/>
        <path d="M34 20l3 3" stroke="url(#gold1)" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M36 26l-10 10" stroke="rgba(255,255,255,.5)" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </div>
    <div class="why-title">Sourcing</div>
    <div class="why-body">RFQ / RFP, e-Auctions, bid evaluation &amp; award.</div>
  </div>

  <div class="why-card">
    <div class="why-icon-wrap">
      <div class="why-icon-ring"></div>
      <svg viewBox="0 0 64 64" width="56" height="56" fill="none">
        <defs>
          <radialGradient id="bg2" cx="30%" cy="30%"><stop offset="0%" stop-color="#6320E0"/><stop offset="100%" stop-color="#2D1270"/></radialGradient>
          <linearGradient id="gold2" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#F5D060"/><stop offset="100%" stop-color="#F5A623"/></linearGradient>
          <filter id="glow2"><feGaussianBlur stdDeviation="2.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>
        <rect width="64" height="64" rx="18" fill="url(#bg2)"/>
        <rect x="1" y="1" width="62" height="62" rx="17" stroke="rgba(255,255,255,.12)" stroke-width="1.5" fill="none"/>
        <!-- Person 1 (main) -->
        <circle cx="22" cy="22" r="7" fill="rgba(255,255,255,.85)"/>
        <path d="M8 42c0-6 6-10 14-10s14 4 14 10" stroke="rgba(255,255,255,.6)" stroke-width="2" stroke-linecap="round" fill="none"/>
        <!-- Person 2 (faded) -->
        <circle cx="42" cy="22" r="5" fill="rgba(255,255,255,.4)"/>
        <path d="M30 42c0-5 5-8 12-8s12 3 12 8" stroke="rgba(255,255,255,.25)" stroke-width="1.8" stroke-linecap="round" fill="none"/>
        <!-- Gold verified badge -->
        <circle cx="46" cy="12" r="8" fill="url(#gold2)" filter="url(#glow2)"/>
        <path d="M42.5 12l2.5 2.5 4.5-5" stroke="#3B0764" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    <div class="why-title">Supplier Management</div>
    <div class="why-body">Onboarding, KYC, risk scoring, and more.</div>
  </div>

  <div class="why-card">
    <div class="why-icon-wrap">
      <div class="why-icon-ring"></div>
      <svg viewBox="0 0 64 64" width="56" height="56" fill="none">
        <defs>
          <radialGradient id="bg3" cx="30%" cy="30%"><stop offset="0%" stop-color="#7C3AED"/><stop offset="100%" stop-color="#3B0764"/></radialGradient>
          <linearGradient id="gold3" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#F5D060"/><stop offset="100%" stop-color="#EE9D11"/></linearGradient>
          <filter id="glow3"><feGaussianBlur stdDeviation="2.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>
        <rect width="64" height="64" rx="18" fill="url(#bg3)"/>
        <rect x="1" y="1" width="62" height="62" rx="17" stroke="rgba(255,255,255,.12)" stroke-width="1.5" fill="none"/>
        <!-- Invoice doc -->
        <rect x="12" y="12" width="30" height="38" rx="5" fill="rgba(255,255,255,.15)" stroke="rgba(255,255,255,.4)" stroke-width="1.5"/>
        <line x1="18" y1="22" x2="36" y2="22" stroke="rgba(255,255,255,.5)" stroke-width="1.8" stroke-linecap="round"/>
        <line x1="18" y1="28" x2="36" y2="28" stroke="rgba(255,255,255,.35)" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="18" y1="34" x2="28" y2="34" stroke="rgba(255,255,255,.35)" stroke-width="1.5" stroke-linecap="round"/>
        <!-- Gold check stamp -->
        <circle cx="44" cy="44" r="11" fill="url(#gold3)" filter="url(#glow3)"/>
        <path d="M39 44l3.5 3.5 5.5-7" stroke="#3B0764" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    <div class="why-title">Invoice &amp; Payables</div>
    <div class="why-body">3-way match, e-invoicing, AP automation.</div>
  </div>

  <div class="why-card">
    <div class="why-icon-wrap">
      <div class="why-icon-ring"></div>
      <svg viewBox="0 0 64 64" width="56" height="56" fill="none">
        <defs>
          <radialGradient id="bg4" cx="30%" cy="30%"><stop offset="0%" stop-color="#6320E0"/><stop offset="100%" stop-color="#2D1270"/></radialGradient>
          <linearGradient id="gold4" x1="0" y1="48" x2="64" y2="16" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#F5D060"/><stop offset="100%" stop-color="#F5A623"/></linearGradient>
          <filter id="glow4"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>
        <rect width="64" height="64" rx="18" fill="url(#bg4)"/>
        <rect x="1" y="1" width="62" height="62" rx="17" stroke="rgba(255,255,255,.12)" stroke-width="1.5" fill="none"/>
        <!-- Bars -->
        <rect x="10" y="40" width="9" height="14" rx="2.5" fill="rgba(255,255,255,.25)"/>
        <rect x="22" y="30" width="9" height="24" rx="2.5" fill="rgba(255,255,255,.45)"/>
        <rect x="34" y="20" width="9" height="34" rx="2.5" fill="rgba(255,255,255,.65)"/>
        <!-- Gold trend line -->
        <polyline points="14,39 27,28 39,18 52,10" stroke="url(#gold4)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none" filter="url(#glow4)"/>
        <!-- Gold dot -->
        <circle cx="52" cy="10" r="5" fill="url(#gold4)" filter="url(#glow4)"/>
      </svg>
    </div>
    <div class="why-title">Supply Chain Finance</div>
    <div class="why-body">Dynamic discounting, vendor financing.</div>
  </div>

</div>
  </div>
</section>

<!-- ── WHICH PARTNER WINS ─────────────────────────────────────── -->
<section class="section section-dark" id="partner-fit">
  <div class="section-inner">
    <div class="section-header-block sr">
      <div class="eyebrow" style="color:rgba(255,255,255,0.45)">Which Partner Wins</div>
      <h2 class="sec-title" style="color:#fff;-webkit-text-fill-color:#fff;background:none">Leverage what you do &mdash; &amp; <em style="font-style:normal;color:#F5D060">go to the next level</em> with us.</h2>
    </div>
    <div class="pfits-grid sr">
      <div class="pfit-card">
        <div class="pfit-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 17.5h7M17.5 14v7"/></svg></div>
        <div class="pfit-title">ERP Implementers &amp; VARs</div>
        <div class="pfit-body">Already trusted by your CFOs. NimbleS2P attaches to every ERP project &mdash; <strong>same client, bigger deal.</strong></div>
      </div>
      <div class="pfit-card">
        <div class="pfit-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M3 3h18v4H3zM3 11h18v2H3zM3 17h12v4H3z"/></svg></div>
        <div class="pfit-title">Finance &amp; Mgmt Consultants</div>
        <div class="pfit-body">S2P is the technology arm of your transformation advisory. <strong>Credibility transfers instantly.</strong></div>
      </div>
      <div class="pfit-card">
        <div class="pfit-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg></div>
        <div class="pfit-title">CA &amp; Audit Firms</div>
        <div class="pfit-body">Deep CFO relationships. Especially strong post-audit &mdash; <strong>&ldquo;here&rsquo;s what&rsquo;s broken, here&rsquo;s the fix.&rdquo;</strong></div>
      </div>
      <div class="pfit-card">
        <div class="pfit-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg></div>
        <div class="pfit-title">Fintechs &amp; Neobanks</div>
        <div class="pfit-body">If you already touch AP/payments, <strong>S2P is the upstream complement that lifts wallet share.</strong></div>
      </div>
    </div>
  </div>
</section>

<div class="rgb-divider" aria-hidden="true"></div>

<!-- ── THE CFO MATH ───────────────────────────────────────────── -->
<section class="section section-white" id="cfo-math">
  <div class="section-inner">
    <div class="section-header-block sr">
      <div class="eyebrow">The CFO Math</div>
      <h2 class="sec-title">Why CFOs sign $100K&ndash;$1M deals <em style="font-style:normal;color:var(--p500)">without flinching.</em></h2>
      <p class="sec-sub">The cost of NOT automating is higher. The business case writes itself.</p>
    </div>
    <div class="cfo-grid sr">
      <div class="cfo-cost-card">
        <h3>What it&rsquo;s costing them today</h3>
        <ul class="cfo-list">
          <li>3&ndash;8% of annual spend lost to maverick / off-contract purchasing</li>
          <li>$15&ndash;40 per invoice manual vs. $2&ndash;4 automated</li>
          <li>18&ndash;45 day invoice cycles vs. 3&ndash;7 days automated</li>
          <li>Supplier fraud, duplicate payments, audit penalties</li>
        </ul>
      </div>
      <div class="cfo-roi-card">
        <div class="cfo-roi-header">ROI on a $50M procurement spend</div>
        <div class="cfo-roi-grid">
          <div class="cfo-roi-item">
            <div class="cfo-roi-num">$2.5M</div>
            <div class="cfo-roi-label">5% maverick spend recovered</div>
          </div>
          <div class="cfo-roi-item">
            <div class="cfo-roi-num">$300&ndash;600K</div>
            <div class="cfo-roi-label">Annual invoice processing reduction</div>
          </div>
          <div class="cfo-roi-item">
            <div class="cfo-roi-num">$400K&ndash;1M</div>
            <div class="cfo-roi-label">Early-payment discount capture</div>
          </div>
          <div class="cfo-roi-item">
            <div class="cfo-roi-num">3&times;&ndash;8&times;</div>
            <div class="cfo-roi-label">Year-1 ROI on $200&ndash;400K platform</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ── THREE PARTNER TIERS ───────────────────────────────────── -->
<section class="section section-dark" id="partner-tracks">
  <div class="section-inner">
    <div class="section-header-block sr">
      <div class="eyebrow" style="color:rgba(255,255,255,0.45)">Three Paths</div>
      <h2 class="sec-title" style="color:#fff;-webkit-text-fill-color:#fff;background:none">Choose your level. <em style="font-style:normal;color:#F5D060;-webkit-text-fill-color:#F5D060">Grow into the next.</em></h2>
      <p class="sec-sub" style="color:rgba(255,255,255,0.52)">All tiers include deal registration protection &mdash; no channel conflict, ever.</p>
    </div>
    <div class="tiers-grid-wrap"><div class="tiers-grid sr">
      <div class="tier-card">
        <div class="tier-tag">INTRODUCE. EARN.</div>
        <div class="tier-name">Referral Partner</div>
        <div class="tier-rate">5% <span>commission</span></div>
        <ul class="tier-list">
          <li>Paid on contract value once the deal closes</li>
          <li>Share qualified leads &amp; make introductions</li>
          <li>No sales ownership, no implementation</li>
          <li>Ideal for CA firms &amp; independent consultants</li>
        </ul>
        <a href="#contact" class="tier-btn tier-btn-outline">Apply as Referral &rarr;</a>
      </div>
      <div class="tier-card tier-featured">
        <div class="tier-popular">Most popular</div>
        <div class="tier-tag">SELL. IMPLEMENT. SCALE.</div>
        <div class="tier-name">Solution Partner</div>
        <div class="tier-rate">15&ndash;18% <span>commission</span></div>
        <ul class="tier-list">
          <li>Co-sell with NimbleS2P pre-sales support</li>
          <li>Optional implementation revenue stream</li>
          <li>Deal registration &amp; territory protection</li>
          <li>Ideal for boutique consultancies &amp; SI shops</li>
        </ul>
        <a href="#contact" class="tier-btn tier-btn-primary">Apply as Solution &rarr;</a>
      </div>
      <div class="tier-card">
        <div class="tier-tag">OWN THE MARKET.</div>
        <div class="tier-name">Strategic Partner</div>
        <div class="tier-rate">20%+ <span>commission</span></div>
        <ul class="tier-list">
          <li>Scale your revenue with dynamic growth</li>
          <li>$1M annual revenue target &mdash; practice-building</li>
          <li>Joint business plan &amp; co-branded GTM</li>
          <li>Dedicated Partner Success Manager</li>
        </ul>
        <a href="#contact" class="tier-btn tier-btn-outline">Apply as Strategic &rarr;</a>
      </div>
    </div></div>
  </div>
</section>

<!-- ── WHAT YOU GET ───────────────────────────────────────────── -->
<section class="section section-white" id="enablement">
  <div class="section-inner">
    <div class="section-header-block sr">
      <div class="eyebrow">What You Get</div>
      <h2 class="sec-title">Real enablement. <em style="font-style:normal;color:var(--p500)">Real margin.</em></h2>
    </div>
    <div class="enablement-grid sr">
      <div class="enablement-item"><svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" stroke="var(--p400)" stroke-width="1.5"/><path d="M6 10l3 3 5-6" stroke="var(--p400)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>Partner portal &mdash; deal registration &amp; pipeline visibility</div>
      <div class="enablement-item"><svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" stroke="var(--p400)" stroke-width="1.5"/><path d="M6 10l3 3 5-6" stroke="var(--p400)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>Sales playbooks, ROI calculators, proposal templates</div>
      <div class="enablement-item"><svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" stroke="var(--p400)" stroke-width="1.5"/><path d="M6 10l3 3 5-6" stroke="var(--p400)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>Pre-sales and solutioning support on every deal</div>
      <div class="enablement-item"><svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" stroke="var(--p400)" stroke-width="1.5"/><path d="M6 10l3 3 5-6" stroke="var(--p400)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>Co-branded marketing collateral and campaigns</div>
      <div class="enablement-item"><svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" stroke="var(--p400)" stroke-width="1.5"/><path d="M6 10l3 3 5-6" stroke="var(--p400)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>Certified training (online + live cohorts)</div>
      <div class="enablement-item"><svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" stroke="var(--p400)" stroke-width="1.5"/><path d="M6 10l3 3 5-6" stroke="var(--p400)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>Dedicated Partner Success Manager</div>
    </div>
  </div>
</section>

<!-- ── THE NUMBERS ────────────────────────────────────────────── -->
<div class="rgb-divider" aria-hidden="true"></div>
<section class="section section-light" id="earnings">
  <div class="section-inner">
    <div class="section-header-block sr">
      <div class="eyebrow">The Numbers</div>
      <h2 class="sec-title">How much can you <em style="font-style:normal;color:var(--g400)">make?</em></h2>
    </div>
    <div class="earnings-table-wrap sr">
      <table class="earnings-table">
        <thead>
          <tr>
            <th>Scenario</th>
            <th>Deal size</th>
            <th>Tier</th>
            <th>Annual earn</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>1 solution deal per year</td><td>$200K</td><td>Referral 5%</td><td class="earn-num">$10,000</td></tr>
          <tr><td>3 solution deals/yr, mid-market</td><td>$250K avg</td><td>Solution 18%</td><td class="earn-num">$135,000</td></tr>
          <tr><td>Strategic, 8 deals/yr</td><td>$350K avg</td><td>Strategic 20%</td><td class="earn-num">$560,000</td></tr>
          <tr class="earn-top"><td>Strategic scaled (Yr 2&ndash;3)</td><td>$500K &middot; 15 deals</td><td>Strategic 20%+</td><td class="earn-num earn-big">$1.500M+</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</section>

<!-- ── TRUST / SECURITY ───────────────────────────────────────── -->
<section class="section section-white" id="trust">
  <div class="section-inner">
    <div class="section-header-block sr">
      <div class="eyebrow">Trust</div>
      <h2 class="sec-title">Enterprise-grade security at <em style="font-style:normal;color:var(--p500)">every layer.</em></h2>
    </div>
    <div class="trust-certs-grid sr">
      <div class="trust-cert">
        <div class="trust-cert-icon"><svg viewBox="0 0 32 32" fill="none"><path d="M16 3L4 8v9c0 7 6 12 12 13.5C22 28 28 23 28 17V8L16 3z" stroke="var(--p500)" stroke-width="1.8" stroke-linejoin="round"/><path d="M11 16l4 4 7-8" stroke="var(--p500)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
        <div class="trust-cert-name">SOC 1 Type II</div>
        <div class="trust-cert-sub">Financial reporting controls</div>
      </div>
      <div class="trust-cert">
        <div class="trust-cert-icon"><svg viewBox="0 0 32 32" fill="none"><rect x="9" y="14" width="14" height="12" rx="3" stroke="var(--p500)" stroke-width="1.8"/><path d="M12 14v-4a4 4 0 018 0v4" stroke="var(--p500)" stroke-width="1.8" stroke-linecap="round"/><circle cx="16" cy="20" r="2" fill="var(--p500)"/></svg></div>
        <div class="trust-cert-name">SOC 2 Type I</div>
        <div class="trust-cert-sub">Security &amp; availability</div>
      </div>
      <div class="trust-cert">
        <div class="trust-cert-icon"><svg viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="11" stroke="var(--p500)" stroke-width="1.8"/><circle cx="16" cy="16" r="5" stroke="var(--p500)" stroke-width="1.8"/><path d="M16 5v4M16 23v4M5 16h4M23 16h4" stroke="var(--p500)" stroke-width="1.8" stroke-linecap="round"/></svg></div>
        <div class="trust-cert-name">ISO 27001</div>
        <div class="trust-cert-sub">Information security mgmt</div>
      </div>
      <div class="trust-cert">
        <div class="trust-cert-icon"><svg viewBox="0 0 32 32" fill="none"><path d="M16 3l10 4v8c0 6-4 10-10 12C10 25 6 21 6 15V7L16 3z" stroke="var(--p500)" stroke-width="1.8"/><path d="M12 15l2.5 2.5L20 11" stroke="var(--p400)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
        <div class="trust-cert-name">ISO 42001:2023</div>
        <div class="trust-cert-sub">AI Management System</div><span class="trust-upcoming">Upcoming</span>
      </div>
    </div>
  </div>
</section>

<div class="rgb-divider" aria-hidden="true"></div>

<section class="partner-cta" id="contact">
  <div style="position:absolute;inset:0;pointer-events:none">
    <div style="position:absolute;inset:0;background:linear-gradient(135deg,#0f0c29 0%,#1a1260 40%,#261d6b 70%,#1e1050 100%)"></div>
    <div style="position:absolute;bottom:-10%;right:-5%;width:50%;height:80%;background:radial-gradient(ellipse at 80% 80%, rgba(245,166,35,.22) 0%, transparent 60%)"></div>
    <div style="position:absolute;top:-10%;left:-5%;width:55%;height:75%;background:radial-gradient(ellipse at 20% 20%, rgba(99,32,224,.38) 0%, transparent 60%)"></div>
    <div style="position:absolute;inset:0;background-image:radial-gradient(circle, rgba(255,255,255,.06) 1px, transparent 1px);background-size:28px 28px"></div>
  </div>
  <div style="position:absolute;top:0;left:0;right:0;height:52px;overflow:hidden;pointer-events:none"><svg viewBox="0 0 1440 52" preserveAspectRatio="none" style="position:absolute;top:0;left:0;width:200%;height:100%;animation:waveSlide 9s linear infinite"><path d="M0,26 C200,8 400,44 600,26 C800,8 1000,44 1200,26 C1360,12 1440,36 1440,26 L1440,0 L0,0 Z" fill="rgba(99,32,224,.15)"></path><path d="M0,36 C180,12 380,52 580,32 C780,12 980,48 1180,28 C1340,14 1440,38 1440,36 L1440,0 L0,0 Z" fill="rgba(130,80,230,.09)"></path></svg><div style="position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(139,92,246,.45) 30%,rgba(139,92,246,.45) 70%,transparent)"></div></div>
  <div style="position:relative;z-index:1">
    <div class="cta-inner sr">
      <div class="cta-live-badge">
        <span class="cta-live-dot"></span>
        <span>Applications open now</span>
      </div>
      <div class="cta-title">Become a Partner.</div>
      <p class="cta-sub">We&rsquo;re selective about who we partner with &mdash; because being selective is how we stay good. If you&rsquo;re serious about transforming procurement for your clients, we&rsquo;d like to talk.</p>
      <div class="cta-actions">
        <a href="#" class="btn-cta-primary">Apply to Partner &rarr;</a>
      </div>
    </div>
  </div>
  <div style="position:absolute;bottom:0;left:0;right:0;height:52px;overflow:hidden;pointer-events:none"><svg viewBox="0 0 1440 52" preserveAspectRatio="none" style="position:absolute;bottom:0;left:0;width:200%;height:100%;animation:waveSlide 10s linear infinite"><path d="M0,26 C200,8 400,44 600,26 C800,8 1000,42 1200,26 C1360,12 1440,34 1440,26 L1440,52 L0,52 Z" fill="rgba(99,32,224,.12)"></path><path d="M0,36 C180,14 380,50 580,32 C780,14 980,46 1180,30 C1340,16 1440,38 1440,36 L1440,52 L0,52 Z" fill="rgba(130,80,230,.07)"></path></svg><div style="position:absolute;bottom:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(139,92,246,.4) 30%,rgba(139,92,246,.4) 70%,transparent)"></div></div>
</section>`;
