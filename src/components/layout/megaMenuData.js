/* ─────────────────────────────────────────
   MEGA MENU DATA — resources synced to each product page CTA
───────────────────────────────────────── */
export const PRODUCT_PAGE_RESOURCES = {
  vdd:       { type:"guide",      label:"7 Most Expensive Onboarding Mistakes", meta:"Free guide",       icon:"📋" },
  supplier:  { type:"case study", label:"Behind the scenes of supplier experience transformation", meta:"Case study", icon:"📈" },
  invoice:   { type:"diagnostic", label:"Get the CFO Diagnostic: How Mature Is Your Invoice Process?", meta:"Free diagnostic", icon:"📋" },
  rfq:       { type:"diagnostic", label:"The RFQ Reality Index", meta:"Free diagnostic", icon:"📋" },
  finance:   { type:"blog",       label:"Launch Scalable SCF Programs Faster", meta:"Blog", icon:"✍️" },
  analytics: { type:"blog",      label:"Your Supplier Network Is Talking. Are You Listening?", meta:"Blog", icon:"✍️" },
};

export const MEGA_PRODUCTS = {
  integrated: [
    {
      id:"vdd",
      icon:"🔍",
      name:"Supplier Due Diligence",
      desc:"Automate supplier onboarding, KYC, compliance checks, and risk validation.",
      color:"#231a67",
      tag:"Trending",
      resource: PRODUCT_PAGE_RESOURCES.vdd,
      cover: { src: "mega-menu/vdd-cover.png", objectPosition: "center 12%" },
    },
    {
      id:"supplier",
      icon:"👤",
      name:"Supplier Portal",
      desc:"Unified interface for suppliers to manage onboarding, documents, communication, and transactions.",
      color:"#6DB657",
      resource: PRODUCT_PAGE_RESOURCES.supplier,
      cover: { src: "mega-menu/supplier-portal-cover.png", objectPosition: "left 8%" },
    },
    {
      id:"invoice",
      icon:"🗒",
      name:"Invoice Processing Automation",
      desc:"Agentic 2-way and 3-way matching automation for every invoice type — material, service, and non-PO — with enterprise-scale exception management.",
      color:"#1a1a2e",
      resource: PRODUCT_PAGE_RESOURCES.invoice,
    },
    {
      id:"rfq",
      icon:"☰",
      name:"RFx Management",
      desc:"Create, distribute, and evaluate RFQs with supplier comparison and selection.",
      color:"#717C89",
      resource: PRODUCT_PAGE_RESOURCES.rfq,
    },
    {
      id:"finance",
      icon:"💰",
      name:"Early Financing",
      desc:"Enable supply chain financing and early payment options for vendors.",
      color:"#E06B72",
      tag:"New",
      resource: PRODUCT_PAGE_RESOURCES.finance,
      cover: { src: "mega-menu/early-financing-cover.png", objectPosition: "center 40%" },
    },
    {
      id:"analytics",
      icon:"📊",
      name:"Supplier Analytics",
      desc:"Monitor supplier health, exposure, compliance, and operational performance from one analytics layer",
      color:"#48A9A6",
      tag:"Beta",
      resource: PRODUCT_PAGE_RESOURCES.analytics,
      cover: { src: "mega-menu/supplier-analytics-cover.png", objectPosition: "center 22%" },
    },
  ],
};
