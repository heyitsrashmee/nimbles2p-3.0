/**
 * Root-relative URL for files in /public (customer-logos, images, arrow.svg, etc.).
 * Works on Vercel and local dev after prepare-public runs.
 */
export function assetUrl(relPath) {
  const normalized = relPath.replace(/^\//, "");
  return `/${normalized}`;
}
