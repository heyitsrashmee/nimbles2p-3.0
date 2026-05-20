import manifest from "../../customer-logos/logos.manifest.json";

/** @typedef {{ label: string, file: string }} CustomerLogo */

/** @type {CustomerLogo[]} */
export const CUSTOMER_LOGOS = manifest;

/** @param {string} file */
export function customerLogoPath(file) {
  return `customer-logos/${file}`;
}
