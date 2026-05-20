import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const publicDir = path.join(root, "public");

const MAX_WIDTH = 1920;
const JPEG_QUALITY = 82;

const STATIC_DIRS = ["customer-logos"];

async function optimizeImage(srcPath, destPath) {
  const ext = path.extname(srcPath).toLowerCase();
  const pipeline = sharp(srcPath).rotate().resize({
    width: MAX_WIDTH,
    withoutEnlargement: true,
  });

  if (ext === ".png") {
    await pipeline.png({ quality: 80, compressionLevel: 9 }).toFile(destPath);
    return;
  }

  await pipeline
    .jpeg({ quality: JPEG_QUALITY, progressive: true })
    .toFile(destPath.endsWith(".jpg") ? destPath : destPath.replace(/\.[^.]+$/, ".jpg"));
}

function copyDirSync(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDirSync(from, to);
    else fs.copyFileSync(from, to);
  }
}

async function syncImages() {
  const srcDir = path.join(root, "images");
  const destDir = path.join(publicDir, "images");
  if (!fs.existsSync(srcDir)) {
    console.warn("[prepare-public] skip missing: images/");
    return;
  }

  fs.rmSync(destDir, { recursive: true, force: true });
  fs.mkdirSync(destDir, { recursive: true });

  const files = fs.readdirSync(srcDir).filter((f) => !f.startsWith("."));

  for (const file of files) {
    const srcPath = path.join(srcDir, file);
    if (!fs.statSync(srcPath).isFile()) continue;

    const base = path.parse(file).name;
    const ext = path.extname(file).toLowerCase();
    const outName = ext === ".png" ? `${base}.png` : `${base}.jpg`;
    const destPath = path.join(destDir, outName);

    await optimizeImage(srcPath, destPath);
    console.log(`[prepare-public]   ${file} → images/${outName}`);
  }
}

function validateCustomerLogos() {
  const manifestPath = path.join(root, "customer-logos", "logos.manifest.json");
  if (!fs.existsSync(manifestPath)) {
    console.warn("[prepare-public] skip: customer-logos/logos.manifest.json missing");
    return;
  }
  const entries = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  const logosDir = path.join(root, "customer-logos");
  for (const { label, file } of entries) {
    const filePath = path.join(logosDir, file);
    if (!fs.existsSync(filePath)) {
      throw new Error(`[prepare-public] missing customer logo for "${label}": ${file}`);
    }
  }
  console.log(`[prepare-public] validated ${entries.length} customer logos`);
}

async function main() {
  fs.mkdirSync(publicDir, { recursive: true });

  validateCustomerLogos();

  for (const name of STATIC_DIRS) {
    const src = path.join(root, name);
    const dest = path.join(publicDir, name);
    if (!fs.existsSync(src)) {
      console.warn(`[prepare-public] skip missing: ${name}/`);
      continue;
    }
    fs.rmSync(dest, { recursive: true, force: true });
    copyDirSync(src, dest);
    console.log(`[prepare-public] copied ${name}/ → public/${name}/`);
  }

  await syncImages();
  console.log("[prepare-public] done");
}

main().catch((err) => {
  console.error("[prepare-public] failed:", err);
  process.exit(1);
});
