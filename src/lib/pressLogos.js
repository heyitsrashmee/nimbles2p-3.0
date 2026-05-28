import manifest from "../../press-logos/logos.manifest.json";

/** @typedef {{ label: string, file: string }} PressLogo */

/** @type {PressLogo[]} */
export const PRESS_LOGOS = manifest;

/** @param {string} file */
export function pressLogoPath(file) {
  return `press-logos/${file}`;
}

