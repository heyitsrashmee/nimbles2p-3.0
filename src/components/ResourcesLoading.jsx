"use client";

import { Nav } from "@/components/layout/SiteNav";
import { ResourcesGridSkeleton } from "@/components/ResourcesPage";

/** Instant shell while /resources server component fetches WordPress (shown via app/resources/loading.tsx). */
export default function ResourcesLoading() {
  return (
    <>
      <Nav />
      <main style={{ paddingTop: 72 }}>
        <section
          style={{
            background: "linear-gradient(140deg,#14104A 0%,#1E1660 40%,#261d6b 70%,#1a1258 100%)",
            padding: "128px 5vw 88px",
            textAlign: "center",
            minHeight: 280,
          }}
        />
        <ResourcesGridSkeleton isMobile={false} />
      </main>
    </>
  );
}
