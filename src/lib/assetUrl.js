/**
 * Root-relative URL for files in /public (customer-logos, images, arrow.svg, etc.).
 * Works on Vercel and local dev after prepare-public runs.
 */
export function assetUrl(relPath) {
  const base = import.meta.env.BASE_URL || "/";
  const normalized = relPath.replace(/^\//, "");
  return `${base}${normalized}`;
}
