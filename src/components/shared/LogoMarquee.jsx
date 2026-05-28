"use client";

import { useLayoutEffect, useRef } from "react";
import { assetUrl } from "@/lib/assetUrl";

/**
 * Reuses the homepage logo marquee layout (.lm-*) from `app/globals.css`.
 * @param {{ heading: string, logos: Array<{ label: string, src: string }> }} props
 */
export function LogoMarquee({ heading = "", logos = [] }) {
  const trackRef = useRef(null);
  const setRef = useRef(null);

  useLayoutEffect(() => {
    const track = trackRef.current;
    const set = setRef.current;
    if (!track || !set) return;

    const measure = () => {
      const w = set.offsetWidth;
      if (w > 0) track.style.setProperty("--marquee-shift", `${-w}px`);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(set);
    window.addEventListener("resize", measure);

    const imgs = set.querySelectorAll("img");
    const onImg = () => measure();
    imgs.forEach((img) => {
      if (!img.complete) img.addEventListener("load", onImg, { once: true });
      img.addEventListener("error", onImg, { once: true });
    });

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      imgs.forEach((img) => {
        img.removeEventListener("load", onImg);
        img.removeEventListener("error", onImg);
      });
    };
  }, []);

  if (!Array.isArray(logos) || logos.length === 0) return null;

  const renderSet = (keyPrefix) =>
    logos.map((logo) => (
      <div className="lm-tile" key={`${keyPrefix}-${logo.label}`}>
        <div className="lm-logo">
          <img
            src={assetUrl(logo.src)}
            alt={logo.label}
            draggable={false}
            loading="eager"
            decoding="async"
          />
        </div>
        <div className="lm-divider" aria-hidden="true" />
      </div>
    ));

  return (
    <div className="lm-wrap" style={{ position: "relative" }}>
      {/* Fade masks */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          width: 100,
          zIndex: 2,
          background: "linear-gradient(90deg,#fff,transparent)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: 100,
          zIndex: 2,
          background: "linear-gradient(270deg,#fff,transparent)",
          pointerEvents: "none",
        }}
      />

      {/* Heading */}
      <div
        style={{
          textAlign: "center",
          marginBottom: 26,
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: ".14em",
          textTransform: "uppercase",
          color: "#1E3A5F",
          fontFamily: "var(--fb)",
        }}
      >
        {heading}
      </div>

      {/* Two identical sets; pixel-accurate --marquee-shift = seamless loop */}
      <div className="lm-track" ref={trackRef}>
        <div className="lm-set" ref={setRef}>
          {renderSet("a")}
        </div>
        <div className="lm-set" aria-hidden="true">
          {renderSet("b")}
        </div>
      </div>
    </div>
  );
}

