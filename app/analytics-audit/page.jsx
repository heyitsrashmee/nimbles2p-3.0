import AnalyticsAudit from "@/components/analytics/AnalyticsAudit";

export const metadata = {
  title: "Analytics Audit — NimbleS2P (internal)",
  robots: { index: false, follow: false },
};

/**
 * Internal QA dashboard for the analytics layer. Not linked from the site and
 * excluded from search engines. Visit /analytics-audit to verify tracking.
 */
export default function AnalyticsAuditPage() {
  return <AnalyticsAudit />;
}
