/** WordPress post meta keys for gated PDF / guide downloads. */

const GATED_KEYS = ["nimbles_gated_resource", "gated_resource", "is_gated_resource"];
const DOWNLOAD_URL_KEYS = ["nimbles_download_url", "download_url", "gated_download_url"];
const DOWNLOAD_FILENAME_KEYS = [
  "nimbles_download_filename",
  "download_filename",
  "gated_download_filename",
];

/** @param {unknown} value */
export function isTruthyMeta(value) {
  return value === true || value === 1 || value === "1" || value === "true" || value === "yes";
}

/** @param {Record<string, unknown>|undefined} meta @param {string[]} keys */
function metaValue(meta, keys) {
  if (!meta || typeof meta !== "object") return "";
  for (const key of keys) {
    const v = meta[key];
    if (v !== undefined && v !== null && String(v).trim() !== "") {
      return String(v).trim();
    }
  }
  return "";
}

/**
 * @param {object} post — raw WP REST post
 * @returns {{ gated: boolean, downloadUrl: string, downloadFilename: string }}
 */
export function extractGatedResourceMeta(post) {
  const meta = post?.meta;
  const gated = isTruthyMeta(metaValue(meta, GATED_KEYS));
  const downloadUrl = metaValue(meta, DOWNLOAD_URL_KEYS);
  const downloadFilename = metaValue(meta, DOWNLOAD_FILENAME_KEYS);
  return {
    gated: gated && Boolean(downloadUrl),
    downloadUrl,
    downloadFilename,
  };
}

/** @param {string} slug */
export function gatedUnlockKey(slug) {
  return `nimbles_gated_unlock_${slug}`;
}

/** @param {string} slug */
export function hasGatedUnlock(slug) {
  if (typeof window === "undefined") return false;
  try {
    return sessionStorage.getItem(gatedUnlockKey(slug)) === "1";
  } catch {
    return false;
  }
}

/** @param {string} slug */
export function setGatedUnlock(slug) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(gatedUnlockKey(slug), "1");
  } catch {
    /* ignore quota errors */
  }
}

/**
 * Trigger browser download / open file URL after gate unlock.
 * @param {{ url: string, filename?: string }} opts
 */
export function triggerResourceDownload({ url, filename }) {
  if (!url) return;
  const a = document.createElement("a");
  a.href = url;
  if (filename) a.download = filename;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  document.body.appendChild(a);
  a.click();
  a.remove();
}
