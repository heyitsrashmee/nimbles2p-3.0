"use client";

import Image from "next/image";
import { Nav } from "@/components/layout/SiteNav";
import { VDDFooter } from "@/components/layout/VDDFooter";
import { useWidth } from "@/components/shared/pageUi";

/* ════════════════════════════════════════════
   DESIGN TOKENS
════════════════════════════════════════════ */
const T = {
  fb:"'Inter',system-ui,sans-serif",
  fm:"'IBM Plex Mono','Courier New',monospace",
  p500:"#6320E0", p600:"#4B1A9E", p700:"#391085",
  p50:"#EDE9FE",  p25:"#F5F3FF",
  slp:"#F5F3FF",  t1:"#0F172A",  t2:"#334155",
  t3:"#64748B",   t4:"#94A3B8",
  bd:"#E2E8F0",   bdP:"rgba(57,16,133,.18)",
};

/* ── Content renderer ── */
function ContentBlock({block}){
  const prose={fontFamily:T.fb,fontSize:17,color:T.t2,lineHeight:1.85,margin:"0 0 24px"};
  if(block.type==="lead")    return <p style={{...prose,fontSize:19,color:T.t1,fontWeight:500,lineHeight:1.7,borderLeft:`3px solid ${T.p500}`,paddingLeft:20}}>{block.text}</p>;
  if(block.type==="h2")      return <h2 style={{fontFamily:T.fb,fontSize:24,fontWeight:800,color:T.t1,letterSpacing:"-.03em",lineHeight:1.2,margin:"44px 0 16px"}}>{block.text}</h2>;
  if(block.type==="p")       return <p style={prose}>{block.text}</p>;
  if(block.type==="callout") return <div style={{background:T.p25,border:`1px solid ${T.p500}22`,borderLeft:`4px solid ${T.p500}`,borderRadius:"0 12px 12px 0",padding:"18px 22px",margin:"28px 0",display:"flex",gap:14,alignItems:"flex-start"}}><span style={{fontSize:22,flexShrink:0,marginTop:2}}>{block.icon}</span><p style={{fontFamily:T.fb,fontSize:15.5,color:T.p600,lineHeight:1.65,margin:0,fontWeight:500}}>{block.text}</p></div>;
  if(block.type==="html")    return <div className="wp-article" dangerouslySetInnerHTML={{__html:block.html}}/>;
  return null;
}

/* ════════════════════════════════════════════
   PAGE ROOT
════════════════════════════════════════════ */
export default function BlogPostPage({ onBack, onNavigate, post }){
  const w=useWidth(); const isMobile=w<640; const isTablet=w<1024;

  return (
    <div style={{fontFamily:T.fb,background:"#fff",minHeight:"100vh"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
        @keyframes waveSlide{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @keyframes pulseDot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.6;transform:scale(.8)}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes driftX{0%{transform:translate3d(-5%,0,0)}50%{transform:translate3d(5%,-2%,0)}100%{transform:translate3d(-5%,0,0)}}
        @keyframes driftXRev{0%{transform:translate3d(5%,0,0)}50%{transform:translate3d(-5%,2%,0)}100%{transform:translate3d(5%,0,0)}}

        /* WordPress article body — mirrors the inline prose tokens used above */
        .wp-article{font-family:${T.fb};font-size:17px;color:${T.t2};line-height:1.85;}
        .wp-article p{margin:0 0 24px;}
        .wp-article h2{font-size:24px;font-weight:800;color:${T.t1};letter-spacing:-.03em;line-height:1.2;margin:44px 0 16px;}
        .wp-article h3{font-size:20px;font-weight:800;color:${T.t1};letter-spacing:-.02em;line-height:1.25;margin:36px 0 14px;}
        .wp-article h4{font-size:17px;font-weight:700;color:${T.t1};margin:28px 0 12px;}
        .wp-article ul,.wp-article ol{margin:0 0 24px;padding-left:24px;}
        .wp-article li{margin:0 0 10px;}
        .wp-article a{color:${T.p600};text-decoration:underline;}
        .wp-article strong{font-weight:700;color:${T.t1};}
        .wp-article img{max-width:100%;height:auto;border-radius:12px;margin:24px 0;}
        .wp-article blockquote{margin:28px 0;padding:4px 0 4px 20px;border-left:3px solid ${T.p500};color:${T.t1};font-style:italic;}
      `}</style>

      {/* ── Header — shared homepage Nav ── */}
      <Nav onNavigate={onNavigate} onBack={onBack} pageName="Blog" />
      <div style={{height:72}}/>

      {/* ── HERO — exact Resources hero background ── */}
      <header style={{background:"linear-gradient(140deg,#14104A 0%,#1E1660 40%,#261d6b 70%,#1a1258 100%)",padding:isMobile?"64px 20px 56px":"88px 5vw 72px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,pointerEvents:"none",background:"radial-gradient(ellipse 90% 70% at 50% 35%,rgba(99,32,224,.32) 0%,transparent 65%)"}}/>
        <div style={{position:"absolute",bottom:0,left:0,right:0,height:"50%",pointerEvents:"none",background:"radial-gradient(ellipse 80% 60% at 50% 100%,rgba(245,166,35,.09) 0%,transparent 70%)"}}/>
        <div style={{position:"absolute",inset:0,pointerEvents:"none",backgroundImage:"radial-gradient(rgba(255,255,255,.045) 1px,transparent 1px)",backgroundSize:"30px 30px"}}/>
        <div style={{position:"absolute",top:0,left:0,right:0,height:1,pointerEvents:"none",background:"linear-gradient(90deg,transparent,rgba(255,255,255,.08) 30%,rgba(255,255,255,.08) 70%,transparent)"}}/>

        <div style={{maxWidth:820,margin:"0 auto",position:"relative",zIndex:1}}>
          {/* Breadcrumb */}
          <nav aria-label="breadcrumb" style={{marginBottom:18}}>
            <ol style={{display:"flex",alignItems:"center",gap:6,listStyle:"none",padding:0,margin:0,flexWrap:"wrap"}}>
              {[
                {label:"Home", page:"home"},
                {label:"Resources", page:"resources"},
                {label:"Blog", page:"resources", hash:"blog"},
                {label:post.category},
              ].map(({label,page,hash},i)=>{
                const href = page ? (page==="home" ? "/" : hash ? `/${page}#${hash}` : `/${page}`) : null;
                return (
                  <li key={`${label}-${i}`} style={{display:"flex",alignItems:"center",gap:6}}>
                    {i>0&&<span style={{color:"rgba(255,255,255,.25)",fontSize:12}}>›</span>}
                    {href
                      ? <a href={href} onClick={e=>{e.preventDefault(); onNavigate?.(page, hash?{hash}:undefined);}} style={{fontSize:12,color:"rgba(255,255,255,.45)",textDecoration:"none",fontFamily:T.fb,fontWeight:500,cursor:"pointer"}}>{label}</a>
                      : <span style={{fontSize:12,color:"rgba(255,255,255,.7)",fontFamily:T.fb,fontWeight:600}}>{label}</span>}
                  </li>
                );
              })}
            </ol>
          </nav>

          {/* Meta row */}
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:18,flexWrap:"wrap"}}>
            <span style={{display:"inline-flex",alignItems:"center",gap:5,background:"rgba(99,32,224,.3)",border:"1px solid rgba(139,92,246,.4)",borderRadius:100,padding:"4px 12px",fontSize:11,fontWeight:700,letterSpacing:".06em",textTransform:"uppercase",color:"#C4B5FD",fontFamily:T.fb}}>✍️ Blog</span>
            <span style={{fontSize:12,color:"rgba(255,255,255,.4)",fontFamily:T.fb}}>{post.readTime}</span>
            <span style={{width:3,height:3,borderRadius:"50%",background:"rgba(255,255,255,.25)",display:"inline-block"}}/>
            <time dateTime={post.publishedAt} style={{fontSize:12,color:"rgba(255,255,255,.4)",fontFamily:T.fb}}>{post.publishedAtDisplay}</time>
          </div>

          <h1 style={{fontFamily:T.fb,fontWeight:900,fontSize:isMobile?"clamp(24px,7vw,34px)":"clamp(30px,3.5vw,48px)",lineHeight:1.08,letterSpacing:"-.04em",color:"#fff",marginBottom:18,paddingBottom:4}}>{post.title}</h1>
          <p style={{fontFamily:T.fb,fontSize:isMobile?15:17,color:"rgba(255,255,255,.6)",lineHeight:1.75,maxWidth:640,marginBottom:26}}>{post.excerpt}</p>

          {/* Author */}
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <div style={{width:40,height:40,borderRadius:"50%",background:"linear-gradient(135deg,#6320E0,#A78BFA)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:700,color:"#fff",fontFamily:T.fb,flexShrink:0}}>{post.author.initials}</div>
            <div>
              <div style={{fontFamily:T.fb,fontSize:14,fontWeight:700,color:"#fff"}}>{post.author.name}</div>
              <div style={{fontFamily:T.fb,fontSize:12,color:"rgba(255,255,255,.45)"}}>{post.author.title}</div>
            </div>
          </div>
        </div>

        {/* Bottom wave matching Resources page */}
        <div style={{position:"absolute",bottom:0,left:0,right:0,height:48,overflow:"hidden",pointerEvents:"none"}}>
          <svg viewBox="0 0 1440 48" preserveAspectRatio="none" style={{position:"absolute",bottom:0,left:0,width:"200%",height:"100%",animation:"waveSlide 10s linear infinite"}}>
            <path d="M0,24 C240,6 480,40 720,24 C960,8 1200,40 1440,24 L1440,48 L0,48 Z" fill="rgba(255,255,255,.05)"/>
            <path d="M0,34 C200,14 440,46 720,30 C960,14 1200,44 1440,28 L1440,48 L0,48 Z" fill="rgba(99,32,224,.09)"/>
          </svg>
          <div style={{position:"absolute",bottom:0,left:0,right:0,height:1,background:"linear-gradient(90deg,transparent,rgba(255,255,255,.1) 30%,rgba(255,255,255,.1) 70%,transparent)"}}/>
        </div>
      </header>

      {/* ── CONTENT ── */}
      <div style={{maxWidth:1200,margin:"0 auto",paddingLeft:isMobile?20:"5vw",paddingRight:isMobile?20:"5vw",display:"grid",gridTemplateColumns:isTablet?"1fr":"1fr 300px",gap:60,paddingTop:56,paddingBottom:80}}>

        {/* Article */}
        <article>
          {/* Cover image placeholder */}
          <div style={{height:isMobile?180:300,background:"linear-gradient(135deg,#F5F3FF 0%,#EDE9FE 100%)",borderRadius:16,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:40,position:"relative",overflow:"hidden",border:`1px solid ${T.bdP}`}}>
            {post.coverImage ? (
              <Image
                src={post.coverImage}
                alt={post.coverAlt||post.title}
                fill
                unoptimized
                sizes={isMobile ? "100vw" : "(max-width: 1200px) 70vw, 840px"}
                style={{objectFit:"cover"}}
              />
            ) : (
              <>
                <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(rgba(99,32,224,.05) 1px,transparent 1px)",backgroundSize:"20px 20px"}}/>
                <div style={{position:"relative",zIndex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:8}}>
                  <div style={{width:52,height:52,borderRadius:15,background:"rgba(99,32,224,.1)",border:"1.5px dashed rgba(99,32,224,.3)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24}}>✍️</div>
                  <span style={{fontSize:11,fontWeight:600,color:"rgba(99,32,224,.4)",fontFamily:T.fb,letterSpacing:".08em",textTransform:"uppercase"}}>Cover image</span>
                </div>
              </>
            )}
          </div>

          <div style={{maxWidth:680}}>
            {post.content.map((block,i)=><ContentBlock key={i} block={block}/>)}
          </div>

          {/* Tags */}
          <div style={{marginTop:44,paddingTop:24,borderTop:`1px solid ${T.bd}`,display:"flex",flexWrap:"wrap",gap:8,alignItems:"center"}}>
            <span style={{fontFamily:T.fb,fontSize:12,fontWeight:600,color:T.t4}}>Tagged:</span>
            {post.tags.map(tag=>(
              <a key={tag} href="/resources" style={{background:T.p25,border:`1px solid ${T.bdP}`,borderRadius:100,padding:"4px 12px",fontSize:12,fontWeight:600,color:T.p600,textDecoration:"none",fontFamily:T.fb,transition:"background .15s"}}
                onMouseEnter={e=>e.currentTarget.style.background=T.p50}
                onMouseLeave={e=>e.currentTarget.style.background=T.p25}>#{tag}</a>
            ))}
          </div>

          {/* Share */}
          <div style={{marginTop:20,display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
            <span style={{fontFamily:T.fb,fontSize:12,fontWeight:600,color:T.t4}}>Share:</span>
            {[["LinkedIn","🔗"],["X/Twitter","𝕏"],["Copy link","📋"]].map(([label,icon])=>(
              <button key={label} style={{display:"inline-flex",alignItems:"center",gap:5,background:"#fff",border:`1px solid ${T.bd}`,borderRadius:8,padding:"6px 12px",fontFamily:T.fb,fontSize:12,fontWeight:600,color:T.t2,cursor:"pointer",transition:"all .18s"}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=T.p500;e.currentTarget.style.color=T.p500;}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=T.bd;e.currentTarget.style.color=T.t2;}}>
                {icon} {label}
              </button>
            ))}
          </div>
        </article>

        {/* Sidebar */}
        {!isTablet&&(
          <aside style={{position:"sticky",top:88,display:"flex",flexDirection:"column",gap:16}}>
            <div style={{background:T.p25,border:`1px solid ${T.bdP}`,borderRadius:16,padding:"20px"}}>
              <div style={{fontFamily:T.fb,fontSize:11,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",color:T.p600,marginBottom:14}}>Related Reading</div>
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                {post.relatedPosts.map(rp=>(
                  <a key={rp.slug} href={`/resources/${rp.slug}`} style={{display:"flex",flexDirection:"column",gap:3,padding:"12px",background:"#fff",borderRadius:10,border:`1px solid ${T.bd}`,textDecoration:"none",transition:"all .18s"}}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor=T.p500+"44";e.currentTarget.style.boxShadow="0 4px 16px rgba(57,16,133,.1)";}}
                    onMouseLeave={e=>{e.currentTarget.style.borderColor=T.bd;e.currentTarget.style.boxShadow="";}}>
                    <span style={{fontFamily:T.fb,fontSize:10.5,fontWeight:600,color:T.p600,letterSpacing:".04em",textTransform:"uppercase"}}>{rp.category}</span>
                    <span style={{fontFamily:T.fb,fontSize:13,fontWeight:700,color:T.t1,lineHeight:1.3}}>{rp.title}</span>
                    <span style={{fontFamily:T.fb,fontSize:11.5,color:T.t4}}>{rp.readTime}</span>
                  </a>
                ))}
              </div>
            </div>
            <div style={{background:"linear-gradient(140deg,#14104A 0%,#1E1660 100%)",borderRadius:16,padding:"24px 20px",border:"1px solid rgba(255,255,255,.1)"}}>
              <div style={{fontSize:20,marginBottom:10}}>🎯</div>
              <div style={{fontFamily:T.fb,fontSize:14.5,fontWeight:800,color:"#fff",lineHeight:1.3,marginBottom:8}}>See it live in 30 minutes</div>
              <p style={{fontFamily:T.fb,fontSize:13,color:"rgba(255,255,255,.5)",lineHeight:1.6,marginBottom:16}}>Book a personalised demo configured for your industry.</p>
              <a href="/demo" onClick={e=>{e.preventDefault(); onNavigate?.("demo");}} style={{display:"flex",alignItems:"center",justifyContent:"center",background:"linear-gradient(135deg,#E8920A,#F5A623)",color:"#fff",borderRadius:9,padding:"11px 18px",fontFamily:T.fb,fontSize:13.5,fontWeight:700,textDecoration:"none",boxShadow:"0 4px 16px rgba(232,150,10,.4)",cursor:"pointer"}}>Book a Demo →</a>
            </div>
          </aside>
        )}
      </div>

      {/* ── Footer — shared homepage VDDFooter ── */}
      <VDDFooter onNavigate={onNavigate} />
    </div>
  );
}
