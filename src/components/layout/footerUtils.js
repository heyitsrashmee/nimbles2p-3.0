import {
  footerLabelToPage,
  footerLabelToResourceHash,
  isFooterPlaceholder,
} from "@/lib/routes";
import { trackCtaClick } from "@/lib/analytics";

export function goLegalPage(label, onNavigate) {
  if (typeof onNavigate !== "function") return;
  if (label === "Terms of Use" || label === "Terms & Conditions") window.location.hash = "";
  else if (label === "Privacy Policy") window.location.hash = "intro";
  else if (label === "Cookie Policy") window.location.hash = "analytics";
  onNavigate("terms");
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
