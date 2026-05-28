/**
 * NimbleS2P — Resources Page
 * Next.js / Headless CMS
 *
 * ─── CMS DATA CONTRACT ────────────────────────────────────────────────────────
 * This component expects props hydrated from your CMS (Contentful, Sanity, etc.)
 * All placeholder data is marked with  // ← CMS
 * Replace each section's static array with your getStaticProps / getServerSideProps fetch.
 *
 * Props shape:
 *   featuredPost   : ResourcePost        — single pinned featured article
 *   posts          : ResourcePost[]      — all content items (paginated in CMS)
 *   categories     : string[]            — content type labels from CMS taxonomy
 *   newsletterCta  : { heading, sub }    — optional CMS-controlled CTA copy
 *
 * ResourcePost shape:
 *   { id, title, excerpt, category, readTime, date, slug, coverAlt, tag?, author? }
 *
 * ─── USAGE ───────────────────────────────────────────────────────────────────
 * // pages/resources/index.jsx (or app/resources/page.jsx for App Router)
 * import ResourcesPage from "@/components/ResourcesPage";
 * export default function Resources({ featuredPost, posts }) {
 *   return <ResourcesPage featuredPost={featuredPost} posts={posts} />;
 * }
 * export async function getStaticProps() {
 *   // fetch from CMS here
 *   return { props: { featuredPost: ..., posts: [...] } };
 * }
 * ─────────────────────────────────────────────────────────────────────────────
 */

"use client";
import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import { resourceHashToFilter, resourceFilterToHash } from "@/lib/routes";
import { Nav } from "@/components/layout/SiteNav";
import { VDDFooter } from "@/components/layout/VDDFooter";
import { useWidth } from "@/components/shared/pageUi";

/* ── Design tokens (mirrors globalStyles in main artifact) ── */
const TOKEN = {
  fb: "'Inter', system-ui, sans-serif",
  p500: "#6320E0", p600: "#4B1A9E", p700: "#391085", p50: "#EDE9FE", p25: "#F5F3FF",
  slp: "#F5F3FF", t1: "#0F172A", t2: "#334155", t3: "#64748B", t4: "#94A3B8",
  bd: "#E2E8F0", bdP: "rgba(57,16,133,.18)",
};

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.style.opacity = "1"; el.style.transform = "translateY(0)"; obs.unobserve(el); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ── Eyebrow (matches site design system) ── */
function Eyebrow({ children, dark }) {
  return (
    <div style={{ display:"inline-flex", alignItems:"center", gap:6, fontSize:11, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color: dark ? "rgba(255,255,255,.45)" : TOKEN.p600, marginBottom:12, fontFamily:TOKEN.fb }}>
      <span style={{ width:16, height:2, background:"linear-gradient(90deg,#6320E0,#F59E0B)", borderRadius:1, display:"inline-block" }} />
      {children}
    </div>
  );
}

/* ── Category colour map ── */
const CAT_COLOR = {
  "Blog":              { bg:"#EDE9FE", color:"#4B1A9E", border:"#C4B5FD" },
  "Playbook":          { bg:"#FFF7ED", color:"#92400E", border:"#FCD34D" },
  "Guide":             { bg:"#F0FDF4", color:"#14532D", border:"#86EFAC" },
  "Case Study":        { bg:"#EFF6FF", color:"#1E40AF", border:"#93C5FD" },
  "Automation Smile":  { bg:"#FDF4FF", color:"#581C87", border:"#E879F9" },
  "Whitepaper":        { bg:"#FFFBEB", color:"#78350F", border:"#FDE68A" },
  "Webinar":           { bg:"#F0F9FF", color:"#0C4A6E", border:"#7DD3FC" },
};
function catStyle(cat) { return CAT_COLOR[cat] || { bg:"#F1F5F9", color:"#334155", border:"#CBD5E1" }; }

const FILTER_PILLS = [
  { label:"All", value:"All" },
  { label:"Blogs", value:"Blog" },
  { label:"Playbooks", value:"Playbook" },
  { label:"Guides", value:"Guide" },
  { label:"Case Studies", value:"Case Study" },
  { label:"Automation Smiles", value:"Automation Smile" },
  { label:"Whitepapers", value:"Whitepaper" },
  { label:"Webinars", value:"Webinar" },
];

function filterLabel(value) {
  return FILTER_PILLS.find((pill) => pill.value === value)?.label || value;
}

/* ══════════════════════════════════════════════════════════
   SUB-COMPONENTS
══════════════════════════════════════════════════════════ */

/* ── Search + Filter bar ── */
function FilterBar({ search, onSearch, active, onFilter, isMobile }) {
  return (
    <div style={{ display:"flex", flexDirection: isMobile ? "column" : "row", gap:12, alignItems: isMobile ? "stretch" : "center", marginBottom:40 }}>
      {/* Search input */}
      <div style={{ position:"relative", flex:"0 0 auto", width: isMobile ? "100%" : 280 }}>
        <div style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", pointerEvents:"none", color:TOKEN.t4, fontSize:15 }}>🔍</div>
        <input
          type="text" placeholder="Search resources…" value={search} onChange={e => onSearch(e.target.value)}
          style={{ width:"100%", padding:"10px 14px 10px 38px", border:`1.5px solid ${TOKEN.bd}`, borderRadius:10, fontFamily:TOKEN.fb, fontSize:14, color:TOKEN.t1, outline:"none", background:"#fff", transition:"border-color .18s", boxSizing:"border-box" }}
          onFocus={e => e.target.style.borderColor = TOKEN.p500}
          onBlur={e => e.target.style.borderColor = TOKEN.bd}
        />
      </div>

      {/* Category pills */}
      <div style={{ display:"flex", gap:6, flexWrap:"wrap", flex:1 }}>
        {FILTER_PILLS.map((pill) => {
          const isAct =
            active === pill.value ||
            (active === "Guides & Whitepapers" && (pill.value === "Guide" || pill.value === "Whitepaper"));
          return (
            <button key={pill.value} onClick={() => onFilter(pill.value)} style={{
              padding:"7px 14px", borderRadius:100, border:`1.5px solid ${isAct ? TOKEN.p500 : TOKEN.bd}`,
              background: isAct ? TOKEN.p500 : "#fff", color: isAct ? "#fff" : TOKEN.t3,
              fontFamily:TOKEN.fb, fontSize:12.5, fontWeight: isAct ? 700 : 500, cursor:"pointer",
              transition:"all .18s cubic-bezier(.22,1,.36,1)",
              boxShadow: isAct ? `0 4px 16px ${TOKEN.p500}30` : "none",
            }}>{pill.label}</button>
          );
        })}
      </div>
    </div>
  );
}

/* ── Featured hero card ── */
function FeaturedCard({ post, isMobile }) {
  const cs = catStyle(post.category);
  return (
    <a href={post.slug} style={{ textDecoration:"none", display:"block", marginBottom:48 }}>
      <div style={{
        display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
        borderRadius:20, overflow:"hidden", border:`1.5px solid ${TOKEN.bdP}`,
        boxShadow:`0 8px 40px rgba(57,16,133,.1)`, background:"#fff",
        transition:"transform .25s cubic-bezier(.22,1,.36,1), box-shadow .25s",
      }}
        onMouseEnter={e => { e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow="0 16px 56px rgba(57,16,133,.18)"; }}
        onMouseLeave={e => { e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow=`0 8px 40px rgba(57,16,133,.1)`; }}
      >
        {/* Cover image placeholder */}
        <div style={{
          minHeight: isMobile ? 200 : 340, position:"relative", overflow:"hidden",
          background:"linear-gradient(140deg,#14104A 0%,#1E1660 50%,#261d6b 100%)",
          display:"flex", alignItems:"center", justifyContent:"center",
        }}>
          {/* Featured image (WordPress) — fills the existing cover slot; placeholder shows when absent */}
          {post.coverImage && (
            <Image
              src={post.coverImage}
              alt={post.coverAlt || post.title}
              fill
              unoptimized
              sizes={isMobile ? "100vw" : "50vw"}
              style={{ objectFit:"cover" }}
            />
          )}
          {/* Dot grid */}
          <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(rgba(255,255,255,.06) 1px,transparent 1px)", backgroundSize:"24px 24px", pointerEvents:"none" }} />
          {/* Glow */}
          <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 60% 60% at 50% 40%,rgba(99,32,224,.35) 0%,transparent 70%)", pointerEvents:"none" }} />
          {/* Placeholder icon — only when no WordPress cover image */}
          {!post.coverImage && (
            <div style={{ position:"relative", zIndex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:10 }}>
              <div style={{ width:64, height:64, borderRadius:18, background:"rgba(255,255,255,.1)", border:"1.5px dashed rgba(255,255,255,.3)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:28 }}>📖</div>
              <span style={{ fontSize:10, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:"rgba(255,255,255,.3)", fontFamily:TOKEN.fb }}>Cover image</span>
            </div>
          )}
          {/* Featured badge */}
          <div style={{ position:"absolute", top:16, left:16, display:"inline-flex", alignItems:"center", gap:5, background:"linear-gradient(135deg,#E8960A,#F5A623)", borderRadius:100, padding:"5px 12px" }}>
            <span style={{ width:5, height:5, borderRadius:"50%", background:"#fff", display:"inline-block" }} />
            <span style={{ fontSize:10, fontWeight:800, letterSpacing:".08em", textTransform:"uppercase", color:"#fff", fontFamily:TOKEN.fb }}>Featured</span>
          </div>
        </div>

        {/* Text content */}
        <div style={{ padding: isMobile ? "28px 24px" : "40px 40px", display:"flex", flexDirection:"column", justifyContent:"center" }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:16 }}>
            <span style={{ display:"inline-flex", alignItems:"center", gap:5, background:cs.bg, border:`1px solid ${cs.border}`, borderRadius:100, padding:"3px 10px", fontSize:10.5, fontWeight:700, letterSpacing:".05em", textTransform:"uppercase", color:cs.color, fontFamily:TOKEN.fb }}>{post.category}</span>
            <span style={{ fontSize:12, color:TOKEN.t4, fontFamily:TOKEN.fb }}>{post.readTime}</span>
            <span style={{ width:3, height:3, borderRadius:"50%", background:TOKEN.t4 }} />
            <span style={{ fontSize:12, color:TOKEN.t4, fontFamily:TOKEN.fb }}>{post.date}</span>
          </div>
          <h2 style={{ fontFamily:TOKEN.fb, fontSize: isMobile ? 22 : 27, fontWeight:900, color:TOKEN.t1, letterSpacing:"-.03em", lineHeight:1.2, marginBottom:16, paddingBottom:0 }}>{post.title}</h2>
          <p style={{ fontFamily:TOKEN.fb, fontSize:15, color:TOKEN.t3, lineHeight:1.75, marginBottom:24 }}>{post.excerpt}</p>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <div style={{ width:32, height:32, borderRadius:"50%", background:`linear-gradient(135deg,${TOKEN.p500},${TOKEN.p600})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, color:"#fff", fontWeight:700, fontFamily:TOKEN.fb, flexShrink:0 }}>N</div>
            <span style={{ fontFamily:TOKEN.fb, fontSize:13, color:TOKEN.t2, fontWeight:600 }}>{post.author || "NimbleS2P Team"}</span>
            <span style={{ marginLeft:"auto", display:"inline-flex", alignItems:"center", gap:5, color:TOKEN.p500, fontFamily:TOKEN.fb, fontSize:13.5, fontWeight:700 }}>
              Read →
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}

/* ── Resource card ── */
function ResourceCard({ post, isMobile }) {
  const cs = catStyle(post.category);
  return (
    <a href={post.slug} style={{ textDecoration:"none", display:"block" }}>
      <div style={{
        background:"#fff", borderWidth:1, borderStyle:"solid", borderColor:TOKEN.bd, borderRadius:16,
        overflow:"hidden", height:"100%", display:"flex", flexDirection:"column",
        transition:"all .22s cubic-bezier(.22,1,.36,1)",
        boxShadow:"0 1px 4px rgba(0,0,0,.05)",
      }}
        onMouseEnter={e => { e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow="0 12px 36px rgba(57,16,133,.12)"; e.currentTarget.style.borderColor=TOKEN.p500+"44"; }}
        onMouseLeave={e => { e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow="0 1px 4px rgba(0,0,0,.05)"; e.currentTarget.style.borderColor=TOKEN.bd; }}
      >
        {/* Image — WordPress featured image, falling back to the icon placeholder */}
        <div style={{ height:160, background:`linear-gradient(135deg,#F5F3FF 0%,#EDE9FE 100%)`, position:"relative", overflow:"hidden", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
          {post.coverImage && (
            <Image
              src={post.coverImage}
              alt={post.coverAlt || post.title}
              fill
              unoptimized
              sizes={isMobile ? "100vw" : "(max-width: 1080px) 33vw, 360px"}
              style={{ objectFit:"cover" }}
            />
          )}
          <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(rgba(99,32,224,.05) 1px,transparent 1px)", backgroundSize:"16px 16px" }} />
          {!post.coverImage && (
            <div style={{ width:48, height:48, borderRadius:14, background:"rgba(99,32,224,.08)", border:`1.5px dashed rgba(99,32,224,.2)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>
              {post.category === "Blog" ? "✍️" : post.category === "Case Study" ? "📈" : post.category === "Automation Smile" ? "😊" : post.category === "Webinar" ? "🎥" : post.category === "Whitepaper" ? "📄" : "📋"}
            </div>
          )}
        </div>

        {/* Card body */}
        <div style={{ padding:"18px 20px 20px", display:"flex", flexDirection:"column", flex:1, gap:10 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <span style={{ display:"inline-flex", alignItems:"center", background:cs.bg, border:`1px solid ${cs.border}`, borderRadius:100, padding:"2px 9px", fontSize:10, fontWeight:700, letterSpacing:".05em", textTransform:"uppercase", color:cs.color, fontFamily:TOKEN.fb }}>{post.category}</span>
            <span style={{ fontSize:11.5, color:TOKEN.t4, fontFamily:TOKEN.fb, marginLeft:"auto" }}>{post.readTime}</span>
          </div>
          <h3 style={{ fontFamily:TOKEN.fb, fontSize:15.5, fontWeight:800, color:TOKEN.t1, letterSpacing:"-.02em", lineHeight:1.3, flex:1 }}>{post.title}</h3>
          <p style={{ fontFamily:TOKEN.fb, fontSize:13, color:TOKEN.t3, lineHeight:1.65, margin:0 }}>{post.excerpt}</p>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginTop:4, paddingTop:12, borderTop:`1px solid ${TOKEN.bd}` }}>
            <span style={{ fontFamily:TOKEN.fb, fontSize:11.5, color:TOKEN.t4 }}>{post.date}</span>
            <span style={{ fontFamily:TOKEN.fb, fontSize:13, fontWeight:700, color:TOKEN.p500 }}>Read →</span>
          </div>
        </div>
      </div>
    </a>
  );
}

/* ══════════════════════════════════════════════════════════
   PAGE SECTIONS
══════════════════════════════════════════════════════════ */

/* ── Hero ── */
function ResourcesHero({ isMobile }) {
  return (
    <section style={{
      background:"linear-gradient(140deg,#14104A 0%,#1E1660 40%,#261d6b 70%,#1a1258 100%)",
      padding: isMobile ? "110px 20px 72px" : "128px 5vw 88px",
      textAlign:"center", position:"relative", overflow:"hidden",
    }}>
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", background:"radial-gradient(ellipse 80% 60% at 50% 40%,rgba(99,32,224,.3) 0%,transparent 65%)" }} />
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", backgroundImage:"radial-gradient(rgba(255,255,255,.04) 1px,transparent 1px)", backgroundSize:"28px 28px" }} />

      <div style={{ position:"relative", zIndex:1, maxWidth:720, margin:"0 auto" }}>
        <h1 style={{
          fontFamily:TOKEN.fb, fontWeight:900,
          fontSize: isMobile ? "clamp(28px,8vw,40px)" : "clamp(38px,4.5vw,60px)",
          lineHeight:1.08, letterSpacing:"-.05em", marginBottom:20, paddingBottom:6,
          background:"linear-gradient(95deg,#fff 0%,#fff 30%,#F5D060 62%,#F5A623 100%)",
          WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
        }}>
          Powering The Future Of Supplier Transformation
        </h1>
        <p style={{ fontFamily:TOKEN.fb, fontSize: isMobile ? 15 : 17, color:"rgba(255,255,255,.52)", lineHeight:1.75, maxWidth:520, margin:"0 auto 36px" }}>
          Explore insights, practical playbooks, customer success stories, and industry trends that help enterprises transform supplier and procurement operations.
        </p>

        {/* Hero search */}
        <div style={{ maxWidth:480, margin:"0 auto", position:"relative" }}>
          <div style={{ position:"absolute", left:16, top:"50%", transform:"translateY(-50%)", fontSize:16, pointerEvents:"none" }}>🔍</div>
          <input type="text" placeholder="Search resources, topics, or content type…"
            style={{ width:"100%", padding:"14px 20px 14px 46px", borderRadius:12, border:"1.5px solid rgba(255,255,255,.15)", background:"rgba(255,255,255,.08)", backdropFilter:"blur(10px)", color:"#fff", fontFamily:TOKEN.fb, fontSize:14.5, outline:"none", boxSizing:"border-box", transition:"border-color .18s" }}
            onFocus={e => e.target.style.borderColor = "rgba(255,255,255,.45)"}
            onBlur={e => e.target.style.borderColor = "rgba(255,255,255,.15)"}
          />
        </div>
      </div>

      {/* Bottom wave */}
      <div style={{ position:"absolute", bottom:0, left:0, right:0, height:48, overflow:"hidden", pointerEvents:"none" }}>
        <svg viewBox="0 0 1440 48" preserveAspectRatio="none" style={{ position:"absolute", bottom:0, left:0, width:"200%", height:"100%", animation:"waveSlide 10s linear infinite" }}>
          <path d="M0,24 C240,6 480,40 720,24 C960,8 1200,40 1440,24 L1440,48 L0,48 Z" fill="rgba(255,255,255,.05)" />
        </svg>
        <div style={{ position:"absolute", bottom:0, left:0, right:0, height:1, background:"linear-gradient(90deg,transparent,rgba(255,255,255,.1) 30%,rgba(255,255,255,.1) 70%,transparent)" }} />
      </div>
    </section>
  );
}

function categoryMatchesFilter(postCategory, activeCategory) {
  if (activeCategory === "All") return true;
  if (activeCategory === "Guides & Whitepapers") {
    return postCategory === "Guide" || postCategory === "Whitepaper";
  }
  return postCategory === activeCategory;
}

/* ── Loading skeleton (avoids flashing placeholder cards before WP data) ── */
export function ResourcesGridSkeleton({ isMobile }) {
  const shimmer = {
    background: "linear-gradient(90deg, #EDE9FE 0%, #F5F3FF 50%, #EDE9FE 100%)",
    backgroundSize: "200% 100%",
    animation: "resourcesShimmer 1.2s ease-in-out infinite",
    borderRadius: 16,
  };
  return (
    <section style={{ background: TOKEN.slp, padding: isMobile ? "48px 20px 72px" : "clamp(48px,7vh,88px) 5vw" }}>
      <style>{`@keyframes resourcesShimmer{0%{background-position:100% 0}100%{background-position:-100% 0}}`}</style>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div style={{ ...shimmer, height: isMobile ? 320 : 280, marginBottom: 32, borderRadius: 20 }} />
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: 16 }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} style={{ ...shimmer, height: 220 }} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Main content grid ── */
function ResourcesGrid({ featuredPost, posts, isMobile, sectionHash }) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const ref = useReveal();
  const gridRef = useRef(null);

  const applySectionHash = useCallback((hash) => {
    const filter = resourceHashToFilter(hash);
    setActiveCategory(filter || "All");
  }, []);

  const handleFilter = useCallback((value) => {
    setActiveCategory(value);
    const hash = resourceFilterToHash(value);
    const base = window.location.pathname;
    const url = hash ? `${base}#${hash}` : base;
    window.history.replaceState(null, "", url);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  }, []);

  useEffect(() => {
    applySectionHash(sectionHash || "");
    if (!sectionHash) return;
    const t = setTimeout(() => {
      const anchor = document.getElementById(`resources-${sectionHash}`) ?? gridRef.current;
      anchor?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150);
    return () => clearTimeout(t);
  }, [sectionHash, applySectionHash]);

  const filtered = posts.filter(p => {
    const matchCat = categoryMatchesFilter(p.category, activeCategory);
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <section
      id="resources-grid"
      ref={gridRef}
      style={{ background:TOKEN.slp, padding: isMobile ? "48px 20px 72px" : "clamp(48px,7vh,88px) 5vw", scrollMarginTop: 88 }}
    >
      <div style={{ maxWidth:1080, margin:"0 auto" }}>

        {/* Featured post — pinned for every category tab (hidden while searching) */}
        {!search && featuredPost && (
          <FeaturedCard post={featuredPost} isMobile={isMobile} />
        )}

        {/* Filter bar */}
        <FilterBar
          search={search}
          onSearch={setSearch}
          active={activeCategory}
          onFilter={handleFilter}
          isMobile={isMobile}
        />

        {/* Results count */}
        <div style={{ fontFamily:TOKEN.fb, fontSize:13, color:TOKEN.t4, marginBottom:20 }}>
          {filtered.length} {filtered.length === 1 ? "result" : "results"}{activeCategory !== "All" ? ` in ${filterLabel(activeCategory)}` : ""}
        </div>

        {/* Grid */}
        <div ref={ref} style={{
          opacity:0, transform:"translateY(20px)", transition:"opacity .6s cubic-bezier(.22,1,.36,1), transform .6s cubic-bezier(.22,1,.36,1)",
          display:"grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
          gap:16,
        }}>
          {filtered.length > 0
            ? filtered.map(post => <ResourceCard key={post.id} post={post} isMobile={isMobile} />)
            : (
              <div style={{ gridColumn:"1/-1", textAlign:"center", padding:"64px 20px", color:TOKEN.t4, fontFamily:TOKEN.fb }}>
                <div style={{ fontSize:40, marginBottom:12 }}>🔍</div>
                <div style={{ fontSize:16, fontWeight:600, color:TOKEN.t2, marginBottom:6 }}>No results found</div>
                <div style={{ fontSize:14 }}>Try a different keyword or category</div>
              </div>
            )
          }
        </div>

        {/* Load more — CMS: replace with pagination/infinite scroll */}
        {filtered.length > 0 && (
          <div style={{ textAlign:"center", marginTop:48 }}>
            <button style={{
              display:"inline-flex", alignItems:"center", gap:8,
              background:"#fff", color:TOKEN.p600, border:`1.5px solid ${TOKEN.bdP}`,
              borderRadius:10, padding:"12px 32px", fontSize:14.5, fontWeight:700,
              fontFamily:TOKEN.fb, cursor:"pointer", boxShadow:"0 2px 10px rgba(57,16,133,.08)",
              transition:"all .2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = TOKEN.p50; e.currentTarget.style.boxShadow="0 4px 20px rgba(57,16,133,.14)"; e.currentTarget.style.transform="translateY(-1px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.boxShadow="0 2px 10px rgba(57,16,133,.08)"; e.currentTarget.style.transform=""; }}
            >
              {/* ← CMS: wire to pagination / CMS cursor */}
              Load more resources ↓
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

/* ── Newsletter CTA ── */
function NewsletterCTA({ isMobile, data }) {  // ← CMS: data prop for heading/sub copy
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const heading = data?.heading || "Stay ahead of procurement.";  // ← CMS
  const sub = data?.sub || "Get the latest insights, playbooks, and automation stories delivered to your inbox.";  // ← CMS

  return (
    <section style={{
      background:"linear-gradient(140deg,#14104A 0%,#1E1660 50%,#261d6b 100%)",
      padding: isMobile ? "64px 20px" : "clamp(64px,9vh,96px) 5vw",
      position:"relative", overflow:"hidden", textAlign:"center",
    }}>
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", backgroundImage:"radial-gradient(rgba(255,255,255,.04) 1px,transparent 1px)", backgroundSize:"26px 26px" }} />
      <div style={{ position:"absolute", top:0, right:"10%", width:"40%", height:"80%", background:"radial-gradient(ellipse,rgba(245,166,35,.08) 0%,transparent 65%)", pointerEvents:"none" }} />

      <div style={{ position:"relative", zIndex:1, maxWidth:560, margin:"0 auto" }}>
        <Eyebrow dark>Newsletter</Eyebrow>
        <h2 style={{ fontFamily:TOKEN.fb, fontWeight:900, fontSize: isMobile ? "clamp(22px,6vw,30px)" : "clamp(26px,3vw,38px)", lineHeight:1.1, letterSpacing:"-.04em", color:"#fff", marginBottom:12, paddingBottom:0 }}>
          {heading}
        </h2>
        <p style={{ fontFamily:TOKEN.fb, fontSize: isMobile ? 14.5 : 16, color:"rgba(255,255,255,.5)", lineHeight:1.72, marginBottom:32 }}>{sub}</p>

        {submitted ? (
          <div style={{ background:"rgba(16,185,129,.15)", border:"1px solid rgba(16,185,129,.4)", borderRadius:12, padding:"16px 24px", color:"#34D399", fontFamily:TOKEN.fb, fontWeight:700, fontSize:15 }}>
            ✅ You're in! First issue lands in your inbox soon.
          </div>
        ) : (
          <div style={{ display:"flex", gap:10, maxWidth:440, margin:"0 auto", flexDirection: isMobile ? "column" : "row" }}>
            <input type="email" placeholder="Your work email" value={email} onChange={e => setEmail(e.target.value)}
              style={{ flex:1, padding:"12px 16px", borderRadius:9, border:"1.5px solid rgba(255,255,255,.15)", background:"rgba(255,255,255,.08)", color:"#fff", fontFamily:TOKEN.fb, fontSize:14.5, outline:"none", backdropFilter:"blur(8px)", transition:"border-color .18s" }}
              onFocus={e => e.target.style.borderColor = "rgba(255,255,255,.5)"}
              onBlur={e => e.target.style.borderColor = "rgba(255,255,255,.15)"}
            />
            <button onClick={() => email && setSubmitted(true)} style={{
              background:"linear-gradient(135deg,#E8960A,#F5A623)", color:"#fff", border:"none", borderRadius:9,
              padding:"12px 24px", fontFamily:TOKEN.fb, fontSize:14.5, fontWeight:700, cursor:"pointer",
              boxShadow:"0 4px 20px rgba(232,150,10,.4)", transition:"transform .2s, box-shadow .2s", whiteSpace:"nowrap",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform="translateY(-1px)"; e.currentTarget.style.boxShadow="0 8px 28px rgba(232,150,10,.6)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow="0 4px 20px rgba(232,150,10,.4)"; }}
            >Subscribe →</button>
          </div>
        )}
        <p style={{ fontFamily:TOKEN.fb, fontSize:11.5, color:"rgba(255,255,255,.25)", marginTop:14 }}>No spam. Unsubscribe anytime.</p>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   PAGE ROOT
   Props are injected by Next.js getStaticProps / getServerSideProps
══════════════════════════════════════════════════════════ */
export default function ResourcesPage({
  onBack,
  onNavigate,
  featuredPost: featuredProp = null,
  posts: postsProp = [],
  fetchState = "success",
  errorMessage = "",
  newsletterCta = null,
  resourceSection = "",
}) {
  const w = useWidth();
  const isMobile = w < 640;
  const featuredPost = featuredProp;
  const posts = (Array.isArray(postsProp) ? postsProp : []).filter(Boolean);
  const [sectionHash, setSectionHash] = useState(resourceSection ?? "");

  useEffect(() => {
    if (resourceSection) setSectionHash(resourceSection);
  }, [resourceSection]);

  useEffect(() => {
    const syncHash = () => {
      setSectionHash(window.location.hash.replace(/^#/, ""));
    };
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  useEffect(() => {
    if (!sectionHash && !resourceSection) window.scrollTo(0, 0);
  }, [sectionHash, resourceSection]);

  return (
    <>
      <Nav onNavigate={onNavigate} onBack={onBack} pageName="Resources" />
      <main style={{ paddingTop:72 /* NAV_H */ }}>
        <ResourcesHero isMobile={isMobile} />
        {fetchState === "error" ? (
          <div style={{ maxWidth: 1080, margin: "0 auto", padding: "48px 0", textAlign: "center", fontFamily: TOKEN.fb, color: TOKEN.t3 }}>
            {errorMessage || "Unable to load resources right now. Please refresh or try again shortly."}
          </div>
        ) : !featuredPost && posts.length === 0 ? (
          <section style={{ background: TOKEN.slp, padding: isMobile ? "48px 20px 72px" : "clamp(48px,7vh,88px) 5vw" }}>
            <div style={{ maxWidth: 1080, margin: "0 auto" }}>
              <div style={{ background:"#fff", border:`1px solid ${TOKEN.bd}`, borderRadius:20, padding: isMobile ? "40px 24px" : "56px 32px", textAlign:"center", boxShadow:"0 8px 40px rgba(57,16,133,.06)" }}>
                <div style={{ fontSize:40, marginBottom:12 }}>🗂️</div>
                <div style={{ fontFamily:TOKEN.fb, fontSize: isMobile ? 20 : 24, fontWeight:800, color:TOKEN.t1, letterSpacing:"-.03em", marginBottom:10 }}>
                  No resources published yet
                </div>
                <div style={{ fontFamily:TOKEN.fb, fontSize:14.5, color:TOKEN.t3, lineHeight:1.7, maxWidth:520, margin:"0 auto" }}>
                  New insights, playbooks, and customer stories from WordPress will appear here automatically as soon as they are published.
                </div>
              </div>
            </div>
          </section>
        ) : (
          <ResourcesGrid featuredPost={featuredPost} posts={posts} isMobile={isMobile} sectionHash={sectionHash} />
        )}
        <NewsletterCTA isMobile={isMobile} data={newsletterCta} />
      </main>
      <VDDFooter onNavigate={onNavigate} />
    </>
  );
}

/*
 * ── getStaticProps template ──────────────────────────────────────────────────
 *
 * export async function getStaticProps() {
 *   const client = createClient({ space: process.env.CONTENTFUL_SPACE_ID, accessToken: process.env.CONTENTFUL_ACCESS_TOKEN });
 *
 *   const [featuredRes, postsRes] = await Promise.all([
 *     client.getEntries({ content_type: "resourcePost", "fields.featured": true, limit: 1 }),
 *     client.getEntries({ content_type: "resourcePost", order: "-fields.date", limit: 24 }),
 *   ]);
 *
 *   return {
 *     props: {
 *       featuredPost: featuredRes.items[0]?.fields ?? null,
 *       posts: postsRes.items.map(i => i.fields),
 *     },
 *     revalidate: 60,
 *   };
 * }
 *
 * ── Sanity (GROQ) equivalent ─────────────────────────────────────────────────
 *
 * const QUERY = groq`{
 *   "featuredPost": *[_type == "resourcePost" && featured == true][0],
 *   "posts": *[_type == "resourcePost"] | order(date desc)[0..23]
 * }`;
 * export const dynamic = "force-static";
 * export const revalidate = 60;
 * ─────────────────────────────────────────────────────────────────────────────
 */
