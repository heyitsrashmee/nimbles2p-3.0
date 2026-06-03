"use client";

import LegalPage from "@/components/shared/LegalPage";

/**
 * Cookie Policy. Declarative content rendered by the shared <LegalPage/>.
 * Placeholders in [square brackets] should be confirmed before launch.
 */
const EFFECTIVE_DATE = "June 3, 2026";
const LAST_UPDATED = "June 3, 2026";
const PRIVACY_EMAIL = "info@techpanion.com";
const COMPANY_ADDRESS =
  "1/416 Vidyadhar Nagar, Jhotwada, Jaipur, Rajasthan 302023, India";

const SECTIONS = [
  {
    id: "what",
    title: "What Cookies Are",
    blocks: [
      'NimbleS2P, operated by Techpanion Solutions Private Limited ("NimbleS2P", "we", "us", or "our"), uses cookies and similar technologies on our website at nimbles2p.com (the "Website").',
      "Cookies are small text files placed on your device when you visit a website. They are widely used to make websites work, to make them more efficient, and to provide reporting information. We also use related technologies such as pixels, tags, software development kits, and local storage; in this policy we refer to all of these as “cookies”.",
      {
        type: "list",
        items: [
          { term: "Session cookies", desc: "temporary cookies that expire when you close your browser." },
          { term: "Persistent cookies", desc: "cookies that remain on your device until they expire or you delete them." },
          { term: "First-party cookies", desc: "set by NimbleS2P." },
          { term: "Third-party cookies", desc: "set by our service and marketing partners." },
        ],
      },
    ],
  },
  {
    id: "why",
    title: "Why Cookies Are Used",
    blocks: [
      "We use cookies to operate and secure the Website, to remember your preferences, to understand how the Website is used so we can improve it, and to measure and support our marketing.",
      "Some cookies are necessary for the Website to function, while others are optional and are only used where you have given consent (where required by law). The sections below describe each category.",
    ],
  },
  {
    id: "essential",
    title: "Essential Cookies",
    blocks: [
      "These cookies are strictly necessary for the Website to function and cannot be switched off in our systems. They are usually set in response to actions you take, such as setting your privacy preferences, submitting a form, or navigating the site.",
      "They support core functionality, security, load balancing, and the storage of your cookie consent choices. Because they are essential, they do not require consent, but you can block them through your browser — though parts of the Website may then not work.",
    ],
  },
  {
    id: "functional",
    title: "Functional Cookies",
    blocks: [
      "Functional cookies allow the Website to provide enhanced functionality and personalisation, such as remembering your preferences and choices.",
      "If you do not allow these cookies, some or all of these features may not function properly.",
    ],
  },
  {
    id: "analytics",
    title: "Analytics Cookies",
    blocks: [
      "Analytics cookies help us understand how visitors interact with the Website by collecting and reporting information such as pages visited, time on page, and navigation paths. This helps us measure performance and improve content and usability.",
      "We use Google Analytics and Google Tag Manager for this purpose. The information collected is typically aggregated and used to produce reporting. Where required, these cookies are only set after you provide consent.",
    ],
  },
  {
    id: "marketing",
    title: "Marketing and Advertising Cookies",
    blocks: [
      "Marketing and advertising cookies are used to make advertising more relevant to you, to measure the effectiveness of campaigns, and to help us reach professionals who may be interested in our solutions.",
      "We may use the LinkedIn Insight Tag and similar technologies from advertising partners. These cookies may be set by us or by third parties and may track your activity across websites. Where required, they are only set after you provide consent.",
    ],
  },
  {
    id: "third-party",
    title: "Third-Party Cookies",
    blocks: [
      "Some cookies are placed by third parties that provide services to us or deliver advertising on our behalf. These parties may collect information about your online activities over time and across different websites.",
      "Common third-party technologies we may use include:",
      {
        type: "list",
        items: [
          { term: "Google Analytics", desc: "website analytics and performance measurement." },
          { term: "Google Tag Manager", desc: "tag management that helps us deploy and control other tags." },
          { term: "LinkedIn Insight Tag", desc: "campaign measurement and professional audience advertising." },
          { term: "CRM and marketing automation platforms", desc: "engagement tracking and lead management." },
        ],
      },
      "These third parties process data in accordance with their own privacy and cookie policies, which we encourage you to review.",
    ],
  },
  {
    id: "categories",
    title: "Cookie Categories at a Glance",
    blocks: [
      {
        type: "table",
        head: ["Category", "Purpose", "Consent required", "Example technologies"],
        rows: [
          ["Essential", "Core functionality, security, consent storage", "No", "First-party session cookies"],
          ["Functional", "Preferences and enhanced features", "Yes (where required)", "First-party preference cookies"],
          ["Analytics", "Usage measurement and improvement", "Yes (where required)", "Google Analytics, Google Tag Manager"],
          ["Marketing", "Advertising and campaign measurement", "Yes (where required)", "LinkedIn Insight Tag, partner pixels"],
        ],
      },
    ],
  },
  {
    id: "consent",
    title: "Cookie Consent Management",
    blocks: [
      "Where required by applicable law, we ask for your consent before placing non-essential cookies. You can give, withdraw, or change your consent at any time using our cookie consent tool.",
      {
        type: "callout",
        text:
          "<b>Consent banner implementation guidance.</b> A cookie consent banner should appear on a visitor's first visit and: (1) block non-essential cookies (analytics and marketing) until consent is given; (2) offer clear “Accept all”, “Reject all”, and “Manage preferences” options with equal prominence; (3) record the consent choice and timestamp; (4) allow visitors to revisit and change their choice at any time via a persistent link; and (5) re-request consent when categories or vendors materially change. Essential cookies may load without consent.",
      },
      "Until a consent management banner is configured, the Website should be operated so that non-essential cookies are not set without a lawful basis. The consent tool, once enabled, becomes the primary way to manage analytics and marketing cookies.",
    ],
  },
  {
    id: "browser",
    title: "Browser Controls",
    blocks: [
      "Most browsers let you view, manage, delete, and block cookies through their settings. The exact steps vary by browser:",
      {
        type: "list",
        items: [
          "Google Chrome: Settings → Privacy and security → Cookies and other site data.",
          "Mozilla Firefox: Settings → Privacy & Security → Cookies and Site Data.",
          "Apple Safari: Settings/Preferences → Privacy.",
          "Microsoft Edge: Settings → Cookies and site permissions.",
        ],
      },
      "Blocking all cookies may affect how the Website functions. You can also opt out of certain analytics and advertising through the tools provided by the relevant third parties.",
    ],
  },
  {
    id: "retention",
    title: "Retention Periods",
    blocks: [
      "The length of time a cookie remains on your device depends on its type and purpose. Session cookies are deleted when you close your browser, while persistent cookies remain until they expire or you delete them.",
      "Retention periods vary by provider — analytics and marketing cookies typically range from a few days up to approximately two years. You can delete cookies at any time through your browser, and we periodically review the cookies we use.",
    ],
  },
  {
    id: "changes",
    title: "Changes to This Policy",
    blocks: [
      "We may update this Cookie Policy from time to time to reflect changes in the cookies we use or for operational, legal, or regulatory reasons.",
      'When we make changes, we will update the "Last Updated" date at the top of this page. We encourage you to review this Cookie Policy periodically to stay informed about our use of cookies.',
    ],
  },
  {
    id: "contact",
    title: "Contact Information",
    blocks: [
      'If you have any questions about our use of cookies, please contact us using the details below. For more on how we handle personal information, see our <a href="/privacy">Privacy Policy</a>.',
    ],
  },
];

const CONTACT = {
  heading: "Questions about cookies?",
  body: "Contact us and we'll be happy to help with anything related to this Cookie Policy.",
  company: "NimbleS2P by Techpanion Solutions Private Limited",
  email: PRIVACY_EMAIL,
  address: COMPANY_ADDRESS,
};

export default function CookiePolicyPage({ onNavigate, onBack }) {
  return (
    <LegalPage
      pageName="Cookie Policy"
      title="Cookie Policy"
      intro="How NimbleS2P uses cookies and similar technologies on our website, and how you can manage your preferences."
      effectiveDate={EFFECTIVE_DATE}
      lastUpdated={LAST_UPDATED}
      sections={SECTIONS}
      contact={CONTACT}
      onNavigate={onNavigate}
      onBack={onBack}
    />
  );
}
