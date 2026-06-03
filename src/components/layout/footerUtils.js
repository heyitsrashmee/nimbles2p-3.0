import {
  footerLabelToPage,
  footerLabelToResourceHash,
  isFooterPlaceholder,
} from "@/lib/routes";
import { trackCtaClick } from "@/lib/analytics";

/** Footer legal label → dedicated page slug. */
export function legalLabelToPage(label) {
  if (label === "Privacy Policy") return "privacy";
  if (label === "Cookie Policy") return "cookies";
  return "terms"; // "Terms of Use" / "Terms & Conditions"
}

export function goLegalPage(label, onNavigate) {
  if (typeof onNavigate !== "function") return;
  const page = legalLabelToPage(label);
  trackCtaClick({ ctaLocation: "footer_legal", buttonText: label, destination: page });
  onNavigate(page);
}

export function goFooterLink(label, onNavigate) {
  const page = footerLabelToPage(label);
  if (!page || typeof onNavigate !== "function") return;
  const hash = footerLabelToResourceHash(label);
  if (hash) onNavigate(page, { hash });
  else onNavigate(page);
}

/** Footer link click — navigates when mapped, no-op for placeholders */
export function handleFooterLinkClick(e, label, onNavigate) {
  e.preventDefault();
  if (isFooterPlaceholder(label)) return;
  if (footerLabelToPage(label)) {
    trackCtaClick({ ctaLocation: "footer", buttonText: label, destination: footerLabelToPage(label) });
    goFooterLink(label, onNavigate);
  }
}
