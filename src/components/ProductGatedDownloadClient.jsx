"use client";

import { usePathname, useRouter } from "next/navigation";
import GatedResourceDownloadPage from "@/components/GatedResourceDownloadPage";
import { useSiteNavigation } from "@/lib/siteNavigation";

/**
 * /download/vdd and /download/supplier — Get Started layout + gated form.
 */
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
      backLabel={backPage === "vdd" ? "Supplier Due Diligence" : "Supplier Portal"}
    />
  );
}
