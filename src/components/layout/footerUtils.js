import { footerLabelToPage } from "@/lib/routes";

export function goLegalPage(label, onNavigate) {
  if (typeof onNavigate !== "function") return;
  if (label === "Terms of Use" || label === "Terms & Conditions") window.location.hash = "";
  else if (label === "Privacy Policy") window.location.hash = "intro";
  else if (label === "Cookie Policy") window.location.hash = "analytics";
  onNavigate("terms");
}

export function goFooterLink(label, onNavigate) {
  const page = footerLabelToPage(label);
  if (page) onNavigate(page);
}
