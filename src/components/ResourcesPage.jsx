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
import { useState, useEffect, useRef, useCallback } from "react";
import { resourceHashToFilter } from "@/lib/routes";
import { Nav } from "@/components/layout/SiteNav";
import { VDDFooter } from "@/components/layout/VDDFooter";

/* ── Design tokens (mirrors globalStyles in main artifact) ── */
const TOKEN = {
  fb: "'Inter', system-ui, sans-serif",
  p500: "#6320E0", p600: "#4B1A9E", p700: "#391085", p50: "#EDE9FE", p25: "#F5F3FF",
  slp: "#F5F3FF", t1: "#0F172A", t2: "#334155", t3: "#64748B", t4: "#94A3B8",
  bd: "#E2E8F0", bdP: "rgba(57,16,133,.18)",
};

/* ── Shared hooks ── */
function useWidth() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return w;
}

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

/* ══════════════════════════════════════════════════════════
   PLACEHOLDER / CMS DATA
   Replace these arrays with your CMS fetch in getStaticProps
══════════════════════════════════════════════════════════ */
const PLACEHOLDER_FEATURED = {  // ← CMS: featuredPost prop
  id:"f1", title:"The Enterprise Guide to AI-Powered Invoice Processing",
  excerpt:"How leading CFOs are cutting AP cycle time by 70% while eliminating manual exceptions — a comprehensive playbook for finance transformation.",
  category:"Playbook", readTime:"12 min read", date:"May 2025", slug:"/resources/ai-invoice-playbook",
  tag:"Featured", author:"NimbleS2P Research Team",
};

const PLACEHOLDER_POSTS = [  // ← CMS: posts prop
  { id:"p1", title:"5 Signs Your Supplier Onboarding Is Leaking Revenue",           category:"Blog",             readTime:"5 min",    date:"May 14, 2025",  slug:"/resources/supplier-onboarding-revenue", excerpt:"Most enterprises don't realise supplier friction starts before the first invoice." },
  { id:"p2", title:"3-Way Matching: The Complete Procurement Handbook",               category:"Guide",            readTime:"10 min",   date:"May 10, 2025",  slug:"/resources/3-way-matching-guide",        excerpt:"Everything you need to automate PO, GRN, and invoice reconciliation at scale." },
  { id:"p3", title:"How a ₹500Cr FMCG Reduced Supplier Disputes by 80%",             category:"Case Study",       readTime:"6 min",    date:"May 6, 2025",   slug:"/resources/fmcg-supplier-disputes",       excerpt:"A real-world walkthrough of the Supplier Portal implementation." },
  { id:"p4", title:"Automation Smile: Tata's Invoice-to-Pay Journey",                category:"Automation Smile", readTime:"3 min",    date:"Apr 29, 2025",  slug:"/resources/tata-automation-smile",        excerpt:"A visual story of 0→100% touchless processing in 8 weeks." },
  { id:"p5", title:"RFQ Best Practices for Indian Enterprise Procurement",           category:"Playbook",         readTime:"8 min",    date:"Apr 22, 2025",  slug:"/resources/rfq-best-practices",           excerpt:"Maximise supplier participation and negotiation outcomes on every event." },
  { id:"p6", title:"Supply Chain Finance Report 2025",                               category:"Whitepaper",       readTime:"20 min",   date:"Apr 15, 2025",  slug:"/resources/scf-report-2025",              excerpt:"Benchmark data on early payment adoption across 500+ Indian enterprises." },
  { id:"p7", title:"Why Supplier Analytics Is the CFO's New Dashboard",             category:"Blog",             readTime:"4 min",    date:"Apr 8, 2025",   slug:"/resources/supplier-analytics-cfo",       excerpt:"Real-time risk and compliance visibility — from a single analytics layer." },
  { id:"p8", title:"NimbleS2P VDD: Compliance Automation Deep Dive",                category:"Guide",            readTime:"9 min",    date:"Mar 31, 2025",  slug:"/resources/vdd-compliance-guide",         excerpt:"Step-by-step breakdown of automated KYC, GST, and risk scoring." },
  { id:"p9", title:"Webinar Recap: From Manual to Agentic Procurement",             category:"Webinar",          readTime:"Replay",   date:"Mar 24, 2025",  slug:"/resources/agentic-procurement-webinar",  excerpt:"Key takeaways from our live session with 400+ procurement leaders." },
];

const ALL_CATEGORIES = ["All", "Blog", "Playbook", "Guide", "Case Study", "Automation Smile", "Whitepaper", "Webinar"];

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
        {ALL_CATEGORIES.map(cat => {
          const isAct = active === cat;
          return (
            <button key={cat} onClick={() => onFilter(cat)} style={{
              padding:"7px 14px", borderRadius:100, border:`1.5px solid ${isAct ? TOKEN.p500 : TOKEN.bd}`,
              background: isAct ? TOKEN.p500 : "#fff", color: isAct ? "#fff" : TOKEN.t3,
              fontFamily:TOKEN.fb, fontSize:12.5, fontWeight: isAct ? 700 : 500, cursor:"pointer",
              transition:"all .18s cubic-bezier(.22,1,.36,1)",
              boxShadow: isAct ? `0 4px 16px ${TOKEN.p500}30` : "none",
            }}>{cat}</button>
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
          {/* Dot grid */}
          <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(rgba(255,255,255,.06) 1px,transparent 1px)", backgroundSize:"24px 24px", pointerEvents:"none" }} />
          {/* Glow */}
          <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 60% 60% at 50% 40%,rgba(99,32,224,.35) 0%,transparent 70%)", pointerEvents:"none" }} />
          {/* Placeholder icon */}
          <div style={{ position:"relative", zIndex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:10 }}>
            <div style={{ width:64, height:64, borderRadius:18, background:"rgba(255,255,255,.1)", border:"1.5px dashed rgba(255,255,255,.3)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:28 }}>📖</div>
            <span style={{ fontSize:10, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:"rgba(255,255,255,.3)", fontFamily:TOKEN.fb }}>Cover image</span>
          </div>
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
        background:"#fff", border:`1px solid ${TOKEN.bd}`, borderRadius:16,
        overflow:"hidden", height:"100%", display:"flex", flexDirection:"column",
        transition:"all .22s cubic-bezier(.22,1,.36,1)",
        boxShadow:"0 1px 4px rgba(0,0,0,.05)",
      }}
        onMouseEnter={e => { e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow="0 12px 36px rgba(57,16,133,.12)"; e.currentTarget.style.borderColor=TOKEN.p500+"44"; }}
        onMouseLeave={e => { e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow="0 1px 4px rgba(0,0,0,.05)"; e.currentTarget.style.borderColor=TOKEN.bd; }}
      >
        {/* Image placeholder */}
        <div style={{ height:160, background:`linear-gradient(135deg,#F5F3FF 0%,#EDE9FE 100%)`, position:"relative", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
          <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(rgba(99,32,224,.05) 1px,transparent 1px)", backgroundSize:"16px 16px" }} />
          <div style={{ width:48, height:48, borderRadius:14, background:"rgba(99,32,224,.08)", border:`1.5px dashed rgba(99,32,224,.2)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>
            {post.category === "Blog" ? "✍️" : post.category === "Case Study" ? "📈" : post.category === "Automation Smile" ? "😊" : post.category === "Webinar" ? "🎥" : post.category === "Whitepaper" ? "📄" : "📋"}
          </div>
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
          Insights That Drive<br />Smarter Procurement
        </h1>
        <p style={{ fontFamily:TOKEN.fb, fontSize: isMobile ? 15 : 17, color:"rgba(255,255,255,.52)", lineHeight:1.75, maxWidth:520, margin:"0 auto 36px" }}>
          Blogs, playbooks, guides, case studies, and automation stories — everything your team needs to lead procurement transformation.
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

/* ── Main content grid ── */
function ResourcesGrid({ featuredPost, posts, isMobile, sectionHash }) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const ref = useReveal();
  const gridRef = useRef(null);

  const applySectionHash = useCallback((hash) => {
    const filter = resourceHashToFilter(hash);
    if (filter) setActiveCategory(filter);
  }, []);

  useEffect(() => {
    if (!sectionHash) return;
    applySectionHash(sectionHash);
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

        {/* Featured post */}
        {activeCategory === "All" && !search && featuredPost && (
          <FeaturedCard post={featuredPost} isMobile={isMobile} />
        )}

        {/* Filter bar */}
        <FilterBar search={search} onSearch={setSearch} active={activeCategory} onFilter={setActiveCategory} isMobile={isMobile} />

        {/* Results count */}
        <div style={{ fontFamily:TOKEN.fb, fontSize:13, color:TOKEN.t4, marginBottom:20 }}>
          {filtered.length} {filtered.length === 1 ? "result" : "results"}{activeCategory !== "All" ? ` in ${activeCategory}` : ""}
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

/* ── Content type showcase strip ── */
function ContentTypeStrip({ isMobile }) {
  const types = [
    { icon:"✍️", label:"Blogs",             desc:"Thought leadership & trends",     sectionId:"blog" },
    { icon:"📋", label:"Playbooks",          desc:"Step-by-step implementation",     sectionId:null },
    { icon:"📖", label:"Guides",             desc:"Deep-dive technical guides",      sectionId:"guides-whitepapers" },
    { icon:"📈", label:"Case Studies",       desc:"Real enterprise outcomes",        sectionId:"case-studies" },
    { icon:"😊", label:"Automation Smiles",  desc:"Visual transformation stories", sectionId:"automation-smiles" },
    { icon:"📄", label:"Whitepapers",        desc:"Research & benchmark data",       sectionId:null },
  ];
  return (
    <section style={{ background:"#fff", padding: isMobile ? "48px 20px" : "clamp(48px,6vh,72px) 5vw", borderTop:`1px solid ${TOKEN.bd}` }}>
      <div style={{ maxWidth:1080, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom: isMobile ? 32 : 44 }}>
          <Eyebrow>Content Library</Eyebrow>
          <h2 style={{ fontFamily:TOKEN.fb, fontSize: isMobile ? "clamp(22px,6vw,30px)" : "clamp(24px,2.8vw,38px)", fontWeight:900, letterSpacing:"-.04em", lineHeight:1.06, color:TOKEN.t1, marginBottom:10 }}>
            Every format your team needs.
          </h2>
          <p style={{ fontFamily:TOKEN.fb, fontSize:15, color:TOKEN.t3, lineHeight:1.7, maxWidth:480, margin:"0 auto" }}>From quick reads to deep dives — curated for procurement leaders, finance teams, and tech buyers.</p>
        </div>
        <div style={{ display:"grid", gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(6,1fr)", gap:12 }}>
          {types.map(t => (
            <div key={t.label} id={t.sectionId ? `resources-${t.sectionId}` : undefined} style={{
              background:TOKEN.p25, border:`1px solid ${TOKEN.bdP}`, borderRadius:14, padding:"20px 14px",
              textAlign:"center", cursor:"pointer", transition:"all .2s cubic-bezier(.22,1,.36,1)",
              scrollMarginTop: 88,
            }}
              onMouseEnter={e => { e.currentTarget.style.background = TOKEN.p50; e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow=`0 6px 20px rgba(57,16,133,.1)`; }}
              onMouseLeave={e => { e.currentTarget.style.background = TOKEN.p25; e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow="none"; }}
            >
              <div style={{ fontSize:28, marginBottom:8 }}>{t.icon}</div>
              <div style={{ fontFamily:TOKEN.fb, fontSize:13, fontWeight:700, color:TOKEN.t1, marginBottom:4 }}>{t.label}</div>
              <div style={{ fontFamily:TOKEN.fb, fontSize:11, color:TOKEN.t3, lineHeight:1.4 }}>{t.desc}</div>
            </div>
          ))}
        </div>
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
  featuredPost = PLACEHOLDER_FEATURED,   // ← CMS: replace with real fetch
  posts = PLACEHOLDER_POSTS,            // ← CMS: replace with real fetch
  newsletterCta = null,                 // ← CMS: optional
  resourceSection = "",
}) {
  const w = useWidth();
  const isMobile = w < 640;
  const [sectionHash, setSectionHash] = useState(() =>
    typeof window !== "undefined" ? window.location.hash.replace(/^#/, "") : resourceSection
  );

  useEffect(() => {
    if (resourceSection) setSectionHash(resourceSection);
  }, [resourceSection]);

  useEffect(() => {
    const syncHash = () => {
      const fromUrl = window.location.hash.replace(/^#/, "");
      if (fromUrl) setSectionHash(fromUrl);
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
        <ContentTypeStrip isMobile={isMobile} />
        <ResourcesGrid featuredPost={featuredPost} posts={posts} isMobile={isMobile} sectionHash={sectionHash} />
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
