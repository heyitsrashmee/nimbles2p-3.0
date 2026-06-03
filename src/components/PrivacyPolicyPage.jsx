"use client";

import LegalPage from "@/components/shared/LegalPage";

/**
 * Privacy Policy. Content is declarative data rendered by the shared
 * <LegalPage/> layout. Placeholders in [square brackets] should be replaced
 * with the company's confirmed legal details before launch.
 */
const EFFECTIVE_DATE = "June 3, 2026";
const LAST_UPDATED = "June 3, 2026";
const PRIVACY_EMAIL = "info@techpanion.com";
const COMPANY_ADDRESS =
  "1/416 Vidyadhar Nagar, Jhotwada, Jaipur, Rajasthan 302023, India";

const SECTIONS = [
  {
    id: "intro",
    title: "Introduction",
    blocks: [
      'NimbleS2P is a source-to-pay platform operated by Techpanion Solutions Private Limited ("NimbleS2P", "we", "us", or "our"). We are committed to protecting the privacy of the enterprises, suppliers, partners, prospects, and website visitors who interact with us.',
      'This Privacy Policy explains what personal information we collect through our website at nimbles2p.com (the "Website"), how we use and share it, and the rights and choices available to you. It applies to information we collect on the Website and through related sales, marketing, and support activities.',
      {
        type: "callout",
        text:
          'This Privacy Policy describes our practices as a <b>data controller</b> for information collected through our Website and marketing activities. Where we process personal data on behalf of an enterprise customer within the NimbleS2P platform, we act as a <b>data processor</b>, and that processing is governed by the agreement (including any Data Processing Addendum) between us and that customer.',
      },
    ],
  },
  {
    id: "collect",
    title: "Information We Collect",
    blocks: [
      "We collect information in three broad ways: information you provide directly, information collected automatically when you use the Website, and information we receive from third parties such as our partners and service providers.",
      { type: "subheading", text: "Information you provide" },
      {
        type: "list",
        items: [
          { term: "Contact and identity data", desc: "name, business email address, phone number, job title, company name, and country." },
          { term: "Communication data", desc: "the content of messages, demo requests, support enquiries, and any information you choose to share with us." },
          { term: "Marketing and preference data", desc: "your subscription choices and consent records." },
        ],
      },
      { type: "subheading", text: "Information collected automatically" },
      {
        type: "list",
        items: [
          { term: "Technical data", desc: "IP address, browser type and version, device type, operating system, and time-zone setting." },
          { term: "Usage data", desc: "pages viewed, links and buttons clicked, referring pages, scroll depth, and session duration." },
          { term: "Cookie data", desc: "identifiers and preferences stored through cookies and similar technologies (see Cookies and Tracking Technologies below)." },
        ],
      },
      "We do not intentionally collect special categories of personal data (such as data revealing health, race, or religious beliefs) through the Website, and we ask that you do not submit such information to us.",
    ],
  },
  {
    id: "forms",
    title: "Information Collected Through Contact Forms and Demo Requests",
    blocks: [
      'When you submit a contact form, request a demo, talk to an expert, request information, or download gated content, we collect the details you enter — typically your name, work email, phone number, job title, and company — together with the context of your request.',
      "We use this information to respond to your enquiry, schedule and prepare for demos, provide the requested materials, qualify and follow up on business opportunities, and maintain a record of our communications with you.",
      "Providing this information is voluntary, but certain fields are necessary to fulfil your request — for example, we cannot schedule a demo without a way to contact you. Each form includes a consent checkbox confirming that you agree to the processing of your information in accordance with this Privacy Policy.",
    ],
  },
  {
    id: "newsletter",
    title: "Newsletter Subscriptions",
    blocks: [
      "If you subscribe to our newsletter or opt in to receive product updates, webinars, events, and industry insights, we collect your email address and any preferences you provide.",
      "We use this information solely to send the communications you have requested. Every marketing email includes an unsubscribe link, and you can opt out at any time. Unsubscribing from marketing messages does not affect transactional communications related to a demo, account, or support request.",
    ],
  },
  {
    id: "usage",
    title: "Platform Usage Data",
    blocks: [
      "When you interact with the Website, we automatically collect usage and diagnostic data to understand how our content performs, to improve the experience, and to keep the Website secure and reliable.",
      "This includes the pages and resources you engage with, the actions you take (such as clicking a call-to-action or starting a form), aggregated performance metrics, and error and security logs. Where this data can identify you, we treat it as personal information under this Privacy Policy.",
      'Personal data processed within the NimbleS2P platform by enterprise customers (for example, supplier records) is handled under our customer agreements and is not the subject of this Website Privacy Policy.',
    ],
  },
  {
    id: "cookies",
    title: "Cookies and Tracking Technologies",
    blocks: [
      "We and our service providers use cookies, tags, pixels, local storage, and similar technologies to operate the Website, remember your preferences, measure performance, and support our marketing.",
      'For full details of the categories of cookies we use, the specific technologies involved (such as Google Analytics, Google Tag Manager, and the LinkedIn Insight Tag), retention periods, and how to manage your choices, please see our <a href="/cookies">Cookie Policy</a>.',
      "Where required by law, we obtain your consent before placing non-essential cookies, and you can change your preferences at any time through our cookie consent tool or your browser settings.",
    ],
  },
  {
    id: "use",
    title: "How Information Is Used",
    blocks: [
      "We use the information we collect for the following purposes:",
      {
        type: "list",
        items: [
          "To respond to enquiries, schedule demos, and deliver requested content and materials.",
          "To provide, operate, maintain, secure, and improve the Website.",
          "To understand how visitors use the Website and to measure the effectiveness of our content and campaigns.",
          "To send you marketing communications where you have consented or where otherwise permitted by law.",
          "To manage business relationships with customers, suppliers, partners, and prospects.",
          "To detect, prevent, and address fraud, abuse, security incidents, and technical issues.",
          "To comply with legal obligations and to establish, exercise, or defend legal claims.",
        ],
      },
      "Where applicable law requires a legal basis for processing, we rely on your consent, the performance of a contract or steps taken at your request, our legitimate interests in operating and growing our business, and compliance with legal obligations.",
    ],
  },
  {
    id: "marketing",
    title: "Marketing Communications",
    blocks: [
      "We may send you marketing communications about our products, webinars, events, and industry insights where you have opted in or where we are otherwise permitted to do so.",
      "You can opt out of marketing at any time by using the unsubscribe link in any marketing email or by contacting us at the address below. We maintain suppression records so that we can honour your opt-out choices.",
    ],
  },
  {
    id: "providers",
    title: "Third-Party Service Providers",
    blocks: [
      "We share personal information with trusted third parties that perform services on our behalf, and only to the extent necessary for them to provide those services. These include:",
      {
        type: "list",
        items: [
          { term: "Hosting and infrastructure providers", desc: "that host the Website and store data securely." },
          { term: "Form, email, and communication providers", desc: "that deliver form submissions and transactional or marketing emails." },
          { term: "Analytics providers", desc: "that help us measure and improve Website performance." },
          { term: "CRM and marketing automation platforms", desc: "that help us manage relationships and communications." },
          { term: "Professional advisers", desc: "such as auditors, lawyers, and consultants, where required." },
        ],
      },
      "We require our service providers to protect personal information and to use it only for the purposes for which it was shared. We may also disclose information where required by law, to enforce our agreements, or in connection with a merger, acquisition, or sale of assets, in which case we will continue to protect your information.",
    ],
  },
  {
    id: "analytics",
    title: "Analytics and Advertising Platforms",
    blocks: [
      "We use analytics and advertising platforms to understand our audience and to deliver and measure marketing. These may include Google Analytics and Google Tag Manager, the LinkedIn Insight Tag, and similar tools provided by our marketing partners.",
      "These platforms may set cookies and collect technical and usage data, and they may combine it with information they hold to provide aggregated reporting and to support advertising. Their processing is governed by their own privacy policies.",
      'You can control these technologies through our <a href="/cookies">Cookie Policy</a> and consent tool, through your browser settings, and through the opt-out mechanisms each provider offers.',
    ],
  },
  {
    id: "security",
    title: "Data Security Measures",
    blocks: [
      "We maintain administrative, technical, and organisational measures designed to protect personal information against unauthorised access, disclosure, alteration, and destruction. These measures include encryption in transit, access controls, network protections, logging, and regular review of our security practices.",
      "No method of transmission or storage is completely secure. While we work to protect your information, we cannot guarantee absolute security, and you share information with us at your own risk. If we become aware of a security incident affecting your personal information, we will respond in line with applicable law.",
    ],
  },
  {
    id: "transfers",
    title: "International Data Transfers",
    blocks: [
      "We operate globally and may transfer, store, and process personal information in countries other than the one in which you reside, including countries that may not provide the same level of data protection as your home jurisdiction.",
      "Where we transfer personal data internationally, we put appropriate safeguards in place as required by applicable law — for example, Standard Contractual Clauses or transfers to recipients in jurisdictions recognised as providing adequate protection. You may contact us for more information about these safeguards.",
    ],
  },
  {
    id: "retention",
    title: "Data Retention",
    blocks: [
      "We retain personal information for as long as necessary to fulfil the purposes described in this Privacy Policy, including to provide our services and communications, to comply with our legal, accounting, and reporting obligations, and to resolve disputes.",
      "When personal information is no longer required, we securely delete or anonymise it. Retention periods vary depending on the type of information, the purpose for which it was collected, and applicable legal requirements.",
    ],
  },
  {
    id: "rights",
    title: "User Rights and Choices",
    blocks: [
      "Subject to applicable law, you have choices and rights regarding your personal information, including:",
      {
        type: "list",
        items: [
          "Accessing the personal information we hold about you and requesting a copy.",
          "Requesting correction of inaccurate or incomplete information.",
          "Requesting deletion of your personal information.",
          "Objecting to or requesting restriction of certain processing.",
          "Withdrawing consent where processing is based on consent.",
          "Opting out of marketing communications at any time.",
        ],
      },
      `To exercise any of these rights, contact us at <a href="mailto:${PRIVACY_EMAIL}">${PRIVACY_EMAIL}</a>. We will respond within the timeframes required by applicable law and may need to verify your identity before fulfilling your request.`,
    ],
  },
  {
    id: "gdpr",
    title: "GDPR Rights (Where Applicable)",
    blocks: [
      "If you are located in the European Economic Area, the United Kingdom, or Switzerland, you have additional rights under the General Data Protection Regulation (GDPR) and equivalent laws, including the rights to access, rectification, erasure, restriction, data portability, and to object to processing, as well as the right not to be subject to solely automated decisions producing legal or similarly significant effects.",
      "Where we rely on your consent, you may withdraw it at any time without affecting the lawfulness of processing carried out before withdrawal. You also have the right to lodge a complaint with your local data protection supervisory authority.",
      "We act as a data controller for personal data collected through our Website and marketing activities. For personal data processed within the NimbleS2P platform on behalf of an enterprise customer, that customer is the controller and we act as processor under our customer agreement.",
    ],
  },
  {
    id: "regional",
    title: "Other Regional Privacy Rights (Where Applicable)",
    blocks: [
      { type: "subheading", text: "United States (including California)" },
      "Depending on your state of residence, you may have rights to know what personal information we collect, to access and delete it, to correct it, and to opt out of the sale or sharing of personal information and certain targeted advertising. We do not sell personal information for money. We will not discriminate against you for exercising your rights.",
      { type: "subheading", text: "India" },
      "If you are in India, we handle personal data in accordance with applicable Indian data protection law, including providing notice, honouring your rights to access, correction, and erasure, and offering a means to raise grievances with us.",
      { type: "subheading", text: "Other jurisdictions" },
      "Residents of other jurisdictions may have similar rights under local law. We will honour valid requests to the extent required by the law applicable to you. To make a request, contact us using the details below.",
    ],
  },
  {
    id: "children",
    title: "Children's Privacy",
    blocks: [
      "Our Website and services are intended for businesses and professionals and are not directed to children. We do not knowingly collect personal information from children under the age of 16 (or the minimum age required by applicable local law).",
      "If you believe a child has provided us with personal information, please contact us and we will take steps to delete it.",
    ],
  },
  {
    id: "links",
    title: "Third-Party Links",
    blocks: [
      "The Website may contain links to third-party websites, services, and resources that are not operated by us. This Privacy Policy does not apply to those third parties, and we are not responsible for their content or privacy practices.",
      "We encourage you to review the privacy policy of every website you visit.",
    ],
  },
  {
    id: "changes",
    title: "Changes to This Policy",
    blocks: [
      "We may update this Privacy Policy from time to time to reflect changes in our practices, technologies, legal requirements, or other factors.",
      'When we make material changes, we will update the "Last Updated" date at the top of this page and, where appropriate, provide additional notice. We encourage you to review this Privacy Policy periodically.',
    ],
  },
  {
    id: "contact",
    title: "Contact Information",
    blocks: [
      "If you have questions, concerns, or requests regarding this Privacy Policy or our handling of your personal information, please contact us using the details below.",
    ],
  },
];

const CONTACT = {
  heading: "Contact our Privacy Team",
  body:
    "We're here to help with any questions about your personal information or this Privacy Policy.",
  company: "NimbleS2P by Techpanion Solutions Private Limited",
  email: PRIVACY_EMAIL,
  address: COMPANY_ADDRESS,
};

export default function PrivacyPolicyPage({ onNavigate, onBack }) {
  return (
    <LegalPage
      pageName="Privacy Policy"
      title="Privacy Policy"
      intro="How NimbleS2P collects, uses, shares, and protects the personal information of enterprises, suppliers, partners, prospects, and website visitors."
      effectiveDate={EFFECTIVE_DATE}
      lastUpdated={LAST_UPDATED}
      sections={SECTIONS}
      contact={CONTACT}
      onNavigate={onNavigate}
      onBack={onBack}
    />
  );
}
