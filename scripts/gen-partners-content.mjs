// One-shot generator: extracts the Partners page CSS + body markup from the
// standalone HTML export and writes them as scoped strings the React component
// can render. Run once; the generated module (src/components/partnersContent.js)
// is committed and self-contained.
import { readFileSync, writeFileSync } from "node:fs";

const SRC = "/Users/irashmeepandey/Downloads/partners.html";
const OUT = new URL("../src/components/partnersContent.js", import.meta.url);

const html = readFileSync(SRC, "utf8");

/* ── CSS: everything inside the single <style> block ── */
let css = html.split("<style>")[1].split("</style>")[0];

// Scope the global resets/tokens under .partners-page so they can't leak into
// the shared Nav/Footer that render on the same route. Custom properties are
// defined on .partners-page and inherit to every descendant, so the remaining
// class selectors (.hero, .section, …) resolve tokens correctly while only ever
// matching elements inside this page.
css = css.replace(":root {", ".partners-page {");
css = css.replace(
  "body{font-family:var(--f-b);color:var(--t1);background:#fff;overflow-x:hidden}",
  ".partners-page{font-family:var(--f-b);color:var(--t1);background:#fff;overflow-x:hidden}"
);
css = css.replace(
  "h1,h2,h3,h4{font-family:var(--f-t)}",
  ".partners-page h1,.partners-page h2,.partners-page h3,.partners-page h4{font-family:var(--f-t)}"
);
css = css.replace(/(^|\n)a\{text-decoration:none\}/, "$1.partners-page a{text-decoration:none}");

// Map the page's font tokens onto the site's loaded fonts (Inter / mono).
css += "\n.partners-page{--f-t:var(--ft);--f-b:var(--fb);--f-m:var(--fm);}\n";

/* ── Body: hero … partner-cta (drop the standalone nav + footer) ── */
const bodyStart = html.indexOf('<section class="hero" id="hero">');
const bodyEnd = html.indexOf("<footer");
let body = html.slice(bodyStart, bodyEnd).trimEnd();

if (body.includes("`") || body.includes("${")) {
  throw new Error("Body contains template-literal-unsafe characters");
}
if (css.includes("`") || css.includes("${")) {
  throw new Error("CSS contains template-literal-unsafe characters");
}

const out = `/* AUTO-GENERATED from the Partners HTML export by scripts/gen-partners-content.mjs.
   Holds the page's scoped CSS and verbatim body markup so PartnersPage can render
   it without a brittle hand HTML→JSX conversion of the inline SVG charts. */

export const PARTNERS_CSS = \`${css}\`;

export const PARTNERS_HTML = \`${body}\`;
`;

writeFileSync(OUT, out, "utf8");
console.log("Wrote", OUT.pathname);
console.log("CSS bytes:", css.length, "HTML bytes:", body.length);
