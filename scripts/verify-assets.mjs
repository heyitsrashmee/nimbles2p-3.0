import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.dirname(fileURLToPath(import.meta.url)) + "/..";
const publicDir = path.join(root, "public");

const logoManifest = JSON.parse(
  fs.readFileSync(path.join(root, "customer-logos", "logos.manifest.json"), "utf8")
);
const REQUIRED_LOGOS = logoManifest.map(({ file }) => `customer-logos/${file}`);

const REQUIRED_IMAGES = [
  "images/chemical.jpg",
  "images/energy.jpg",
  "images/fmcg.jpg",
  "images/hospitality.jpg",
  "images/construction.jpg",
  "images/iron-steel.jpg",
  "images/media.jpg",
  "images/textile.jpg",
];

const REQUIRED_STATIC = ["arrow.png", "favicon.png"];

const MEGA_MENU_COVERS = [
  "mega-menu/vdd-cover.webp",
  "mega-menu/supplier-portal-cover.webp",
  "mega-menu/invoice-processing-cover.webp",
  "mega-menu/rfx-management-cover.webp",
  "mega-menu/early-financing-cover.webp",
  "mega-menu/supplier-analytics-cover.webp",
];

const GIF_MODULES = [
  "gifs/VDDAnimation.jsx",
  "gifs/RFQAgent.jsx",
  "gifs/SupplierPortalAnimation.jsx",
  "gifs/InvoiceProcessing.jsx",
  "gifs/SupplierAnalytics.jsx",
];

let failed = 0;

function check(rel) {
  const full = path.join(root, rel);
  if (!fs.existsSync(full)) {
    console.error(`✗ missing: ${rel}`);
    failed++;
    return;
  }
  console.log(`✓ ${rel}`);
}

console.log("--- source gifs ---");
GIF_MODULES.forEach(check);

console.log("\n--- public assets (run npm run prebuild first) ---");
[...REQUIRED_LOGOS, ...REQUIRED_IMAGES, ...REQUIRED_STATIC, ...MEGA_MENU_COVERS].forEach((rel) =>
  check(path.join("public", rel))
);

if (failed) {
  console.error(`\n${failed} check(s) failed`);
  process.exit(1);
}
console.log("\nAll asset checks passed.");
