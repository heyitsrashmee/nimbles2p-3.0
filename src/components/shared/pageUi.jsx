"use client";

import { useState, useEffect, useRef } from "react";

export function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("visible"); obs.unobserve(el); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

export function useTypewriter(words, { typeSpeed=80, eraseSpeed=50, pauseMs=1600 } = {}) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [phase, setPhase]     = useState("typing");

  useEffect(() => {
    const word = words[wordIdx];
    let timeout;

    if (phase === "typing") {
      if (display.length < word.length) {
        timeout = setTimeout(() => setDisplay(word.slice(0, display.length + 1)), typeSpeed);
      } else {
        timeout = setTimeout(() => setPhase("pausing"), pauseMs);
      }
    } else if (phase === "pausing") {
      setPhase("erasing");
    } else {
      if (display.length > 0) {
        timeout = setTimeout(() => setDisplay(display.slice(0, -1)), eraseSpeed);
      } else {
        setWordIdx(i => (i + 1) % words.length);
        setPhase("typing");
      }
    }
    return () => clearTimeout(timeout);
  }, [display, phase, wordIdx, words, typeSpeed, eraseSpeed, pauseMs]);

  return display;
}

export function useWidth() {
  const [w, setW] = useState(1200);
  useEffect(() => {
    const update = () => setW(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return w;
}

export function Eyebrow({ children, dark }) {
  return (
    <div style={{ display:"inline-flex", alignItems:"center", gap:6, fontSize:11, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color: dark ? "rgba(255,255,255,.45)" : "var(--p600)", marginBottom:12, fontFamily:"var(--fb)" }}>
      <span style={{ width:16, height:2, background:"linear-gradient(90deg,var(--p500),var(--g400))", borderRadius:1, display:"inline-block" }} />
      {children}
    </div>
  );
}
