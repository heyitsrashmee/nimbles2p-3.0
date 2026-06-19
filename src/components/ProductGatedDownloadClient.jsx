"use client";

import { usePathname, useRouter } from "next/navigation";
import GatedResourceDownloadPage from "@/components/GatedResourceDownloadPage";
import { useSiteNavigation } from "@/lib/siteNavigation";

/**
 * /download/vdd, /download/supplier and /download/finance — Get Started layout + gated form.
 */
const BACK_LABELS = {
  vdd: "Supplier Due Diligence",
  supplier: "Supplier Portal",
  finance: "Early Financing",
};

export default function ProductGatedDownloadClient({ post }) {
  const pathname = usePathname();
  const router = useRouter();
  const { navigate } = useSiteNavigation(pathname, router);
  const backPage = post.productKey ?? "home";

  return (
    <GatedResourceDownloadPage
      post={post}
      onNavigate={navigate}
      onBack={() => navigate(backPage)}
      backLabel={BACK_LABELS[backPage] ?? "Resources"}
    />
  );
}
