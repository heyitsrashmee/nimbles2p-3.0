/** @type {import('next').NextConfig} */

/**
 * 301 redirects from legacy WordPress URLs to their new equivalents.
 * The site migrated from WordPress to this Next.js app with new URL slugs;
 * without these, the old indexed URLs silently render the homepage (soft-404)
 * and lose all their search equity. Targets must never themselves be redirected.
 */
const legacyRedirects = [
  // Core pages
  { source: "/about-us", destination: "/why", permanent: true },
  { source: "/our-pricing", destination: "/pricing", permanent: true },
  { source: "/our-pricing/login", destination: "/pricing", permanent: true },
  { source: "/supplier-portal", destination: "/supplier", permanent: true },
  { source: "/vendor-portal", destination: "/supplier", permanent: true },
  { source: "/contact", destination: "/demo", permanent: true },
  { source: "/book-a-personalized-demo", destination: "/demo", permanent: true },
  { source: "/jobs", destination: "/careers", permanent: true },
  { source: "/job-apply-form", destination: "/careers", permanent: true },
  { source: "/job/:slug*", destination: "/careers", permanent: true },
  { source: "/terms-and-conditions", destination: "/terms", permanent: true },
  { source: "/inquiry-lp-1", destination: "/getstarted", permanent: true },
  // Legal / misc → closest existing page
  { source: "/privacy", destination: "/terms", permanent: true },
  { source: "/disclaimer", destination: "/terms", permanent: true },
  { source: "/refund-policy", destination: "/terms", permanent: true },
  { source: "/thank-you", destination: "/", permanent: true },
  { source: "/solutions", destination: "/", permanent: true },
  { source: "/procure-to-pay", destination: "/", permanent: true },
  { source: "/shared-service-automation", destination: "/", permanent: true },
  { source: "/contract-management", destination: "/", permanent: true },
  { source: "/invoice-management-for-enterprises", destination: "/invoice", permanent: true },
  { source: "/v2/modules", destination: "/", permanent: true },
  { source: "/nimble", destination: "/", permanent: true },
  { source: "/testing", destination: "/", permanent: true },
  // Blog → resources hub (the in-app /blog route is legacy/unused)
  { source: "/blog", destination: "/resources", permanent: true },
  { source: "/blog/:path*", destination: "/resources", permanent: true },
  // Legacy blog articles → resources hub (exact new slugs differ)
  { source: "/aadhar-pan-card-linking-mandate", destination: "/resources", permanent: true },
  { source: "/best-accounts-payable-automation-software", destination: "/resources", permanent: true },
  { source: "/blockchain-for-contract-management", destination: "/resources", permanent: true },
  { source: "/bulk-vendor-data-compliance-mandatory-for-evolving-indian-landscape", destination: "/resources", permanent: true },
  { source: "/from-bottlenecks-to-breakthroughs-how-pr-to-po-automation-unlocks-business-agility", destination: "/resources", permanent: true },
  { source: "/from-physical-to-digital-vendor-invoice-management-from-a-suppliers-perspective", destination: "/resources", permanent: true },
  { source: "/future-eprocurement-trends", destination: "/resources", permanent: true },
  { source: "/how-to-choose-supplier-portal-software-for-business", destination: "/resources", permanent: true },
  { source: "/laserfiche-in-india", destination: "/resources", permanent: true },
  { source: "/navigating-vendor-compliance-guide", destination: "/resources", permanent: true },
  { source: "/streamlining-your-supply-chain-procure-to-pay-automation", destination: "/resources", permanent: true },
  { source: "/supplier-data-quality-compliance", destination: "/resources", permanent: true },
  { source: "/supplier-portal-a-prerequisite-for-supply-chain-finance", destination: "/resources", permanent: true },
  { source: "/supplier-portal-beyond-usual-benefits", destination: "/resources", permanent: true },
  { source: "/supply-chain-financing", destination: "/finance", permanent: true },
  { source: "/think-beyond-accounts-payable-automation", destination: "/resources", permanent: true },
  { source: "/vendor-compliance-the-cornerstone-of-enhanced-supply-management-financing", destination: "/resources", permanent: true },
  { source: "/vendor-query-management-impact-on-customer-satisfaction", destination: "/resources", permanent: true },
];

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.wordpress.com" },
      { protocol: "https", hostname: "**.wp.com" },
      { protocol: "https", hostname: "secure.gravatar.com" },
    ],
  },
  async redirects() {
    return legacyRedirects;
  },
};

export default nextConfig;
