import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.dirname(fileURLToPath(import.meta.url)) + "/..";
const publicDir = path.join(root, "public");

const REQUIRED_LOGOS = [
  "customer-logos/Mafatlal-logo.jpg",
  "customer-logos/india-today-logo.png",
  "customer-logos/hero_future_energies_logo.jpeg",
  "customer-logos/Pernod_Ricard_logo.png",
  "customer-logos/oberoi-logo.jpeg",
  "customer-logos/sud_chemie_india_logo.jpeg",
  "customer-logos/cycle-logo.jpeg",
  "customer-logos/SJCPL-logo.jpg",
  "customer-logos/ucb.png",
];

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
  "mega-menu/vdd-cover.png",
  "mega-menu/supplier-portal-cover.png",
  "mega-menu/early-financing-cover.png",
  "mega-menu/supplier-analytics-cover.png",
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
