import React, { useState, useEffect, useRef } from "react";

/* ============================================================
   RK.SPACE — Rishita Korapati · v3
   Cinematic scroll portfolio · finance / analytics / AI

   LINKS: only live destinations remain as proof buttons.
   Cards without live proof rely on the org link + Open details.
   External links open in a new tab.
   ============================================================ */

const LINKS = {
  email: "mailto:korapatirishita@gmail.com",
  linkedin: "https://www.linkedin.com/in/rishita-korapati/",
  github: "https://github.com/rishikor123",
};

/* ----------------------------- DATA ----------------------------- */

const SECTIONS = [
  { id: "hero", num: "00", label: "Start" },
  { id: "signal", num: "01", label: "Signal Path" },
  { id: "experience", num: "02", label: "Experience" },
  { id: "builder", num: "03", label: "Builder Mode" },
  { id: "projects", num: "04", label: "Projects" },
  { id: "competitive", num: "05", label: "Competitive Work" },
  { id: "methods", num: "06", label: "Methods" },
  { id: "about", num: "07", label: "About" },
  { id: "connect", num: "08", label: "Connect" },
];

const NAV = [
  { label: "Home", id: "hero" },
  { label: "Work", id: "experience" },
  { label: "Projects", id: "projects" },
  { label: "Methods", id: "methods" },
  { label: "About", id: "about" },
  { label: "Connect", id: "connect" },
];

const EXPERIENCES = [
  {
    slug: "purdue-research-foundation",
    org: "Purdue Research Foundation",
    orgHref: "https://prf.org/",
    role: "Data Analyst and Team Lead",
    roleSub: "Innovation and Entrepreneurship Benchmarking",
    context:
      "Analyzed how Purdue's innovation ecosystem compares against leading universities across founder outcomes, capital access, and startup infrastructure.",
    metrics: [
      { v: "30", l: "universities benchmarked" },
      { v: "628", l: "startups analyzed" },
      { v: "$19.05B", l: "funding mapped" },
      { v: "3-person", l: "team led" },
    ],
    bullets: [
      "Built executive-facing dashboards and strategic recommendations for Purdue leadership.",
      "Identified capital density and ecosystem coordination as key constraints limiting venture growth and funding velocity.",
    ],
    tags: ["PitchBook", "Excel", "Strategy Analytics", "Benchmarking", "Dashboarding", "Executive Communication"],
    links: [
      { label: "View Report", href: "https://www.canva.com/design/DAHBBCOSpgQ/Pw5oTcFR4p8Q9olH0blbsA/edit" },
    ],
  },
  {
    slug: "jpmorgan-connected-commerce",
    org: "J.P. Morgan Chase",
    orgHref: "https://www.jpmorganchase.com/",
    role: "CLDP Summer Analyst",
    roleSub: "Connected Commerce and Partner Data Exchange",
    context:
      "Supported partner data exchange delivery for a major financial services integration involving documentation, controls, and release readiness.",
    metrics: [
      { v: "1,000+", l: "customer data interfaces" },
      { v: "20+", l: "Jira stories" },
      { t: "Global release co-owned with VP" },
      { t: "Flagship airline partner" },
    ],
    bullets: [
      "Standardized technical specifications and delivery documentation to improve clarity, usability, and cross-functional alignment.",
      "Built sprint and release tracking assets that improved ownership, dependency visibility, and integration readiness.",
    ],
    tags: ["Jira", "Confluence", "Excel", "Controls", "Product Delivery", "Financial Services Operations"],
  },
  {
    slug: "girl-scouts-forecasting",
    org: "Krenicki Center / Girl Scouts of Central Indiana",
    orgParts: [
      { label: "Krenicki Center", href: "https://business.purdue.edu/centers/krenicki-center/" },
      { label: "Girl Scouts of Central Indiana", href: "https://www.girlscoutsindiana.org/" },
    ],
    role: "Data Scientist and Team Lead",
    roleSub: "Cookie Sales Forecasting and Optimization",
    context:
      "Built predictive forecasting models to support troop-level campaign planning, product demand, and inventory allocation.",
    metrics: [
      { v: "5+", l: "years of sales data" },
      { v: "1,401", l: "units" },
      { v: "8", l: "cookie types" },
      { v: "+12%", l: "accuracy" },
      { v: "181K+", l: "boxes forecasted" },
      { v: "$1.09M", l: "potential impact" },
    ],
    bullets: [
      "Engineered features from sales history, demographics, inventory turnover, and seasonality.",
      "Improved adaptive ridge regression accuracy and translated model results into campaign planning recommendations.",
    ],
    tags: ["Python", "Machine Learning", "Forecasting", "Ridge Regression", "Feature Engineering", "Data Storytelling"],
    links: [
      { label: "Read Case Study", href: "https://business.purdue.edu/news/features/2025/turning-data-into-impact.php" },
      { label: "Krenicki Center", href: "https://business.purdue.edu/centers/krenicki-center/" },
      { label: "Girl Scouts of Central Indiana", href: "https://www.girlscoutsindiana.org/" },
    ],
  },
  {
    slug: "caterpillar-digital",
    org: "Caterpillar Digital",
    orgHref: "https://digital.cat.com/",
    role: "Digital and Analytics Intern",
    roleSub: "Cat Rental Store",
    roleSubHref: "https://rent.cat.com/en_US/home.html",
    context:
      "Analyzed digital and operational performance for rental-store experiences, customer behavior, pricing, and utilization.",
    metrics: [
      { t: "GA3 → GA4 transition" },
      { t: "Regression analysis" },
      { t: "T-tests" },
      { t: "Pricing insights" },
      { t: "Utilization analysis" },
    ],
    bullets: [
      "Built GA4 reporting to improve visibility into customer behavior and digital performance.",
      "Used statistical testing and market analysis to translate operational signals into stakeholder-ready recommendations.",
    ],
    tags: ["GA4", "Excel", "Regression", "T-Tests", "SWOT", "Porter's Five Forces", "Digital Analytics"],
    links: [
      { label: "Cat Digital", href: "https://digital.cat.com/" },
      { label: "Cat Rental Store", href: "https://rent.cat.com/en_US/home.html" },
    ],
  },
];

/* Scroll-story stages. Each panel points at an experience (xp index). */
const STORY_STAGES = [
  { name: "Question", gloss: "Define the decision" },
  { name: "Signal", gloss: "Find what matters" },
  { name: "Model", gloss: "Build the tool" },
  { name: "Decision", gloss: "Make it usable" },
  { name: "Impact", gloss: "Prove it landed" },
];

const STORY_PANELS = [
  { kind: "thesis" },
  {
    xp: 0,
    chip: "Signal",
    hook: "628 startups and $19.05B in venture data, distilled into what Purdue leadership actually needed to see.",
    stats: [{ v: "628", l: "startups analyzed" }, { v: "$19.05B", l: "funding mapped" }],
  },
  {
    xp: 2,
    chip: "Model",
    hook: "Adaptive ridge regression across five years of cookie sales, engineered to be accurate and explainable.",
    stats: [{ v: "+12%", l: "accuracy lift" }, { v: "181K+", l: "boxes forecasted" }],
  },
  {
    xp: 3,
    chip: "Decision",
    hook: "Regression and t-tests on digital behavior, turned into pricing and utilization calls for Cat Rental Store.",
    stats: [{ t: "GA3 → GA4" }, { t: "Regression · T-tests" }],
  },
  {
    xp: 1,
    chip: "Impact",
    hook: "A global release co-owned with a VP, shipped across 1,000+ customer data interfaces for a flagship airline partner.",
    stats: [{ v: "1,000+", l: "data interfaces" }, { v: "20+", l: "Jira stories" }],
  },
];

const BUILDER = [
  {
    slug: "baim-finance",
    title: "VP of Finance",
    role: "BAIM Association",
    metrics: [
      { v: "$50K+", l: "budget managed" },
      { v: "5-person", l: "finance team" },
      { t: "Sponsorships" },
      { t: "Executive-board reporting" },
    ],
    copy:
      "Managed budgeting, reporting, sponsorships, fundraising, and financial planning while improving spend visibility and financial accountability.",
    more: [
      "Owned budgeting, reporting, and financial planning for a $50K+ organization budget.",
      "Led a 5-person finance team across sponsorships, fundraising, and executive-board reporting.",
    ],
  },
  {
    slug: "aidu",
    title: "Founder and Product Lead",
    role: "AIDU",
    metrics: [
      { v: "48", l: "hours to MVP" },
      { v: "100+", l: "user surveys" },
      { v: "30+", l: "Figma screens" },
      { t: "No-code AI MVP" },
    ],
    copy:
      "Founded and co-built an AI education platform during Rice Design-a-thon, translating user research into MVP requirements, user flows, feature priorities, and a beta roadmap.",
    more: [
      "Went from idea to a no-code AI MVP in 48 hours at Rice Design-a-thon.",
      "Translated 100+ user surveys into flows, feature priorities, 30+ Figma screens, and a beta roadmap.",
    ],
  },
  {
    slug: "perplexity-ai",
    title: "AI Business Fellow",
    role: "Perplexity AI",
    metrics: [
      { t: "No-code AI app" },
      { t: "Responsible AI research" },
      { t: "Fraud detection" },
      { t: "Fairness + explainability" },
    ],
    copy:
      "Explored GenAI business workflows and authored research on ethical AI in financial fraud detection: bias, false positives, explainability, confidence thresholds, and governance.",
    more: [
      "Prototyped GenAI business workflows as an AI Business Fellow.",
      "Authored research on ethical AI in fraud detection: bias, false positives, explainability, confidence thresholds, governance.",
    ],
  },
  {
    slug: "scope-consulting",
    title: "Business Consultant",
    role: "SCOPE Consulting",
    metrics: [
      { t: "Client-facing analysis" },
      { t: "Power BI dashboards" },
      { t: "Full-stack website" },
      { t: "Market + UI recommendations" },
    ],
    copy:
      "Worked with external partners on business analysis, dashboards, technology recommendations, and data visualization to turn stakeholder needs into practical next steps.",
    more: [
      "Client-facing analysis and Power BI dashboards for external partners.",
      "Delivered a full-stack website plus market and UI recommendations.",
    ],
  },
];

const PROJECTS = [
  {
    title: "Quant Finance Lab",
    kicker: "Four modules · one lab",
    metrics: [
      { v: "700+", l: "Excel formulas" },
      { v: "4", l: "linked workbooks" },
      { v: "20,000-trial", l: "Monte Carlo" },
      { v: "30,000", l: "credit records" },
      { v: "93.9%", l: "regime accuracy" },
    ],
    desc:
      "A finance and risk lab built around practical questions: What is this company worth? How much risk is in the portfolio? Can a credit decision be explained? When is the market regime changing?",
    modules: [
      { name: "Corporate Valuation Suite", detail: "700+ formulas across 4 linked workbooks." },
      { name: "Explainable Credit Default Risk Engine", detail: "Explainable credit default risk on 30,000 records." },
      { name: "Portfolio Risk and Monte Carlo Platform", detail: "Portfolio risk with a 20,000-trial Monte Carlo engine." },
      { name: "Hidden Markov Market Regime Detection", detail: "HMM regime detection at 93.9% accuracy." },
    ],
    more: [
      "Corporate Valuation Suite: 700+ formulas across 4 linked workbooks.",
      "Portfolio risk with a 20,000-trial Monte Carlo engine.",
      "Explainable credit default risk on 30,000 records; HMM regime detection at 93.9% accuracy.",
    ],
    links: [
      { label: "View GitHub", href: LINKS.github },
    ],
  },
  {
    title: "Financial AI Research Assistant",
    kicker: "RAG · grounded answers",
    metrics: [
      { t: "RAG pipeline" },
      { t: "SEC filings + earnings releases" },
      { v: "24-question", l: "benchmark" },
      { t: "Page-level citations" },
      { t: "Faithfulness testing" },
    ],
    desc:
      "A retrieval-based financial research assistant that answers questions from real filings and earnings releases with citations, retrieval evaluation, and hallucination checks.",
    feature:
      "Built to test a simple idea: analysts need faster answers, but those answers still need to be grounded, traceable, and trustworthy.",
    pipeline: ["Documents", "Chunking", "Retrieval", "Answer", "Citation Check", "Faithfulness Test"],
    more: [
      "Retrieval over SEC filings and earnings releases with page-level citations.",
      "24-question benchmark scoring retrieval quality, faithfulness, and hallucination risk.",
    ],
    links: [
      { label: "View GitHub", href: LINKS.github },
    ],
  },
];

const COMPETITIONS = [
  {
    title: "Purdue Federal Credit Union Loan Case Competition",
    metrics: [
      { v: "$6.26M", l: "loan assessment" },
      { v: "Top 5", l: "finalist" },
      { v: "30", l: "competing teams" },
    ],
    copy:
      "Built a commercial credit recommendation using projected financial statements, repayment capacity, market context, and credit ratios across liquidity, leverage, profitability, and coverage.",
  },
  {
    title: "JPMC Innovate for Impact",
    metrics: [
      { v: "Top 10", l: "national team" },
      { v: "40", l: "teams" },
      { v: "$1.77M", l: "projected net profit" },
      { v: "17.2%", l: "ROI, up from 12.9%" },
    ],
    copy:
      "Built financial analysis for a supplier sustainability initiative, evaluating ROI, budget allocation, breakeven timing, recurring costs, and long-term feasibility.",
  },
];

const METHODS = [
  { n: "01", title: "Frame the Decision", desc: "Before I build anything, I try to understand what decision the work is supposed to support." },
  { n: "02", title: "Find the Signal", desc: "I look for the patterns, assumptions, risks, and constraints that actually matter." },
  { n: "03", title: "Build the Tool", desc: "That could be a model, dashboard, research system, forecast, or financial analysis." },
  { n: "04", title: "Stress-Test the Output", desc: "I check whether the work holds up under edge cases, uncertainty, and stakeholder questions." },
  { n: "05", title: "Tell the Story", desc: "The work is not finished until someone else can understand it and use it." },
];

const ABOUT = [
  "I studied Business Analytics and Finance at Purdue, and I am starting my M.S. in Business Analytics at Cornell.",
  "Most of my work sits where finance, analytics, and technology meet. I have worked on financial services operations, forecasting, strategic benchmarking, digital analytics, AI research systems, and risk models.",
  "I am drawn to problems where the answer is not obvious at first. I like working through ambiguity, finding the signal, and turning the result into something clear enough for someone to use.",
  "Outside of analytics, I have always had a creative side. Photography, design, art, and visual storytelling shape how I think about analysis. I care about how information looks, how it feels, and whether people can actually understand it.",
];

/* ----------------------------- CSS ----------------------------- */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Space+Grotesk:wght@300;400;500;600&family=JetBrains+Mono:wght@300;400;500&display=swap');

:root{
  --ink:#04060b;
  --panel:rgba(255,255,255,.042);
  --stroke:rgba(160,175,215,.14);
  --stroke-hi:rgba(200,212,245,.32);
  --txt:#eef1f8;
  --mut:#8e96ab;
  --dim:#5b6377;
  --coral:#ff6f61;
  --coral-deep:#e5503f;
  --blue:#5d8bff;
  --violet:#9a7bff;
  --serif:'Instrument Serif', Georgia, 'Times New Roman', serif;
  --sans:'Space Grotesk', ui-sans-serif, system-ui, sans-serif;
  --mono:'JetBrains Mono', ui-monospace, 'SF Mono', monospace;
}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{background:var(--ink)}
.rk{
  background:
    radial-gradient(1200px 700px at 85% -10%, rgba(23,34,68,.55), transparent 60%),
    radial-gradient(900px 700px at -10% 30%, rgba(16,22,44,.6), transparent 55%),
    radial-gradient(760px 540px at 55% 108%, rgba(64,46,120,.22), transparent 62%),
    linear-gradient(180deg, #04060b 0%, #060a14 40%, #04060b 100%);
  color:var(--txt);
  font-family:var(--sans);
  font-weight:300;
  min-height:100vh;
  overflow-x:hidden;
  position:relative;
  -webkit-font-smoothing:antialiased;
}
.rk ::selection{background:rgba(255,111,97,.35);color:#fff}
.rk a{color:inherit;text-decoration:none}
.rk button{font-family:inherit;background:none;border:none;color:inherit;cursor:pointer}
.rk :focus-visible{outline:2px solid var(--coral);outline-offset:3px;border-radius:4px}

/* ---------- ambient layers ---------- */
.field{position:fixed;inset:0;z-index:0;pointer-events:none}
.gridlines{position:fixed;inset:0;z-index:0;pointer-events:none;opacity:.55;
  background-image:linear-gradient(rgba(150,170,230,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(150,170,230,.045) 1px,transparent 1px);
  background-size:76px 76px;
  -webkit-mask-image:radial-gradient(ellipse 95% 75% at 50% 32%, black 25%, transparent 78%);
  mask-image:radial-gradient(ellipse 95% 75% at 50% 32%, black 25%, transparent 78%)}
.hue{position:fixed;inset:0;z-index:0;pointer-events:none;opacity:0;transition:opacity 1.4s ease}
.hue.on{opacity:1}
.hue.c-coral{background:radial-gradient(52vw 46vh at 78% 18%, rgba(255,111,97,.075), transparent 65%)}
.hue.c-blue{background:radial-gradient(52vw 46vh at 18% 28%, rgba(93,139,255,.085), transparent 65%)}
.hue.c-violet{background:radial-gradient(52vw 46vh at 80% 60%, rgba(154,123,255,.08), transparent 65%)}
.grain{position:fixed;inset:0;z-index:1;pointer-events:none;opacity:.5;mix-blend-mode:overlay;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")}

.wrap{position:relative;z-index:2;max-width:1180px;margin:0 auto;padding:0 clamp(20px,5vw,56px)}
section{scroll-margin-top:80px}

/* ---------- top nav ---------- */
.nav{position:fixed;top:0;left:0;right:0;z-index:60;transition:background .5s,border-color .5s,backdrop-filter .5s;border-bottom:1px solid transparent}
.nav.scrolled{background:rgba(5,7,13,.62);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);border-color:rgba(160,175,215,.10)}
.nav-in{max-width:1180px;margin:0 auto;padding:0 clamp(20px,5vw,56px);height:70px;display:flex;align-items:center;justify-content:space-between}
.logo{font-family:var(--serif);font-size:1.3rem;letter-spacing:.04em}
.logo b{color:var(--coral);font-weight:400}
.nav-links{display:flex;gap:6px}
.nav-links a{font-family:var(--mono);font-size:.66rem;letter-spacing:.18em;text-transform:uppercase;color:var(--mut);padding:9px 13px;border-radius:99px;transition:color .3s,background .3s}
.nav-links a:hover{color:var(--txt);background:rgba(255,255,255,.05)}
.nav-links a.hot{color:var(--coral)}
.nav-cta{font-family:var(--mono);font-size:.66rem;letter-spacing:.16em;text-transform:uppercase;padding:10px 18px;border-radius:99px;border:1px solid rgba(255,111,97,.5);color:var(--coral);transition:all .35s}
.nav-cta:hover{background:rgba(255,111,97,.12);box-shadow:0 0 24px rgba(255,111,97,.3)}

/* ---------- mission-control tracker ---------- */
.tracker{position:fixed;right:clamp(12px,2.4vw,34px);top:50%;transform:translateY(-50%);z-index:55;display:flex;flex-direction:column;align-items:flex-end}
.trk-cap,.trk-foot{font-family:var(--mono);font-size:.55rem;letter-spacing:.28em;text-transform:uppercase;color:var(--dim);padding:2px 4px}
.trk-cap{margin-bottom:10px;display:flex;align-items:center;gap:8px}
.trk-cap::after{content:"";width:5px;height:5px;border-radius:50%;background:var(--coral);box-shadow:0 0 8px rgba(255,111,97,.9);animation:blink 2.6s ease-in-out infinite}
@keyframes blink{0%,100%{opacity:1}50%{opacity:.25}}
.trk-foot{margin-top:10px;color:var(--mut);font-variant-numeric:tabular-nums}
.trk-list{position:relative;display:flex;flex-direction:column;gap:2px;padding-right:2px}
.trk-rail{position:absolute;right:8px;top:14px;bottom:14px;width:1px;background:rgba(160,175,215,.14)}
.trk-rail i{position:absolute;top:0;left:0;width:100%;background:linear-gradient(180deg,var(--coral),var(--violet));box-shadow:0 0 8px rgba(255,111,97,.5);transition:height .2s linear}
.trk{display:flex;align-items:center;gap:10px;padding:7px 2px;justify-content:flex-end;position:relative;z-index:1}
.trk .t-lab{font-family:var(--mono);font-size:.58rem;letter-spacing:.18em;text-transform:uppercase;color:var(--dim);transition:all .4s;max-width:0;overflow:hidden;white-space:nowrap;opacity:0}
.trk .t-num{font-family:var(--mono);font-size:.6rem;letter-spacing:.12em;color:var(--dim);transition:color .4s;font-variant-numeric:tabular-nums}
.trk .t-dot{width:13px;height:13px;border-radius:50%;border:1px solid rgba(160,175,215,.3);background:var(--ink);position:relative;flex-shrink:0;transition:border-color .4s}
.trk .t-dot::after{content:"";position:absolute;inset:3px;border-radius:50%;background:var(--coral);transform:scale(0);transition:transform .4s cubic-bezier(.34,1.56,.64,1)}
.trk:hover .t-lab{max-width:150px;opacity:1;color:var(--mut)}
.trk:hover .t-num{color:var(--mut)}
.trk.on .t-num{color:var(--coral)}
.trk.on .t-lab{max-width:150px;opacity:1;color:var(--txt)}
.trk.on .t-dot{border-color:var(--coral);box-shadow:0 0 12px rgba(255,111,97,.7),0 0 26px rgba(255,111,97,.3)}
.trk.on .t-dot::after{transform:scale(1)}

/* ---------- mobile dock ---------- */
.dock{display:none;position:fixed;bottom:14px;left:50%;transform:translateX(-50%);z-index:60;
  background:rgba(8,11,20,.75);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);
  border:1px solid rgba(160,175,215,.16);border-radius:99px;padding:10px 14px;gap:9px;align-items:center;max-width:94vw}
.dk{display:flex;align-items:center;gap:6px;padding:4px 2px}
.dk .d-dot{width:6px;height:6px;border-radius:50%;background:var(--dim);transition:all .35s}
.dk .d-lab{display:none;font-family:var(--mono);font-size:.56rem;letter-spacing:.12em;text-transform:uppercase;color:var(--txt);white-space:nowrap}
.dk.on .d-dot{background:var(--coral);box-shadow:0 0 10px rgba(255,111,97,.9)}
.dk.on .d-lab{display:block}

/* ---------- type ---------- */
.eyebrow{font-family:var(--mono);font-size:.64rem;letter-spacing:.3em;text-transform:uppercase;color:var(--mut);display:flex;align-items:center;gap:14px;margin-bottom:24px}
.eyebrow::before{content:"";width:34px;height:1px;background:linear-gradient(90deg,var(--coral),transparent)}
.eyebrow .en{color:var(--coral)}
.h-serif{font-family:var(--serif);font-weight:400;line-height:1.03;letter-spacing:-.012em}
.h-xl{font-size:clamp(2.6rem,5.8vw,4.7rem)}
.h-it{font-style:italic;color:var(--coral)}
.h-it-b{font-style:italic;color:var(--blue)}
.h-it-v{font-style:italic;color:var(--violet)}
.sub{color:var(--mut);font-size:clamp(.95rem,1.3vw,1.05rem);line-height:1.75;max-width:580px;margin-top:18px}
.sechead{margin-bottom:clamp(40px,5.5vw,66px)}
.rule{margin-top:28px;height:1px;overflow:hidden}
.rule i{display:block;height:100%;width:min(420px,100%);background:linear-gradient(90deg,var(--coral),var(--violet),transparent);
  transform:scaleX(0);transform-origin:left;transition:transform 1.3s cubic-bezier(.16,1,.3,1);box-shadow:0 0 12px rgba(255,111,97,.35)}
.rule.go i{transform:scaleX(1)}

.kin .kw{display:inline-block;overflow:hidden;vertical-align:bottom;padding-bottom:.08em;margin-bottom:-.08em}
.kin .kw>span{display:inline-block;transform:translateY(115%);transition:transform .9s cubic-bezier(.16,1,.3,1)}
.kin.go .kw>span{transform:translateY(0)}

.rv{opacity:0;transform:translateY(26px);transition:opacity .9s cubic-bezier(.16,1,.3,1),transform .9s cubic-bezier(.16,1,.3,1)}
.rv.go{opacity:1;transform:none}

/* ---------- hero ---------- */
.hero{min-height:92vh;display:flex;align-items:center;position:relative;padding-top:100px;padding-bottom:44px;overflow:hidden}
.spiral-wrap{position:absolute;top:50%;right:-8%;transform:translateY(-50%);width:min(64vw,880px);aspect-ratio:1;z-index:0;pointer-events:none}
.spiral-wrap::before{content:"";position:absolute;inset:12%;border-radius:50%;
  background:radial-gradient(circle, rgba(255,111,97,.09), rgba(93,139,255,.05) 45%, transparent 70%);filter:blur(30px)}
.orbits{position:absolute;inset:0;transform:scaleY(.72);pointer-events:none}
.orb{position:absolute;inset:0;animation:spin var(--d) linear infinite}
.orb.rev{animation-direction:reverse}
.orb::after{content:"";position:absolute;top:50%;left:calc(50% + var(--r));width:7px;height:7px;margin:-3.5px 0 0 -3.5px;border-radius:50%;
  background:var(--c);box-shadow:0 0 12px var(--c),0 0 28px var(--c);opacity:.55}
@keyframes spin{to{transform:rotate(360deg)}}
.hero-scrim{position:absolute;left:0;top:0;bottom:0;width:64%;z-index:1;pointer-events:none;
  background:linear-gradient(90deg, rgba(4,6,11,.92) 20%, rgba(4,6,11,.55) 60%, transparent)}
.hero-in{position:relative;z-index:2;max-width:760px}
.hi-line{font-family:var(--serif);font-style:italic;font-size:clamp(1.15rem,1.9vw,1.5rem);color:var(--mut);margin-bottom:16px}
.hero h1{font-family:var(--serif);font-weight:400;font-size:clamp(2.8rem,6.6vw,5.6rem);line-height:1.01;letter-spacing:-.016em}
.hero-p{margin-top:26px;max-width:560px;color:var(--mut);font-size:clamp(.98rem,1.35vw,1.1rem);line-height:1.8}
.focus-row{margin-top:28px;display:flex;flex-wrap:wrap;gap:10px 8px;align-items:center;font-family:var(--mono);font-size:.66rem;letter-spacing:.18em;text-transform:uppercase;color:var(--mut)}
.focus-row .f-dot{width:3px;height:3px;border-radius:50%;background:var(--coral);opacity:.8}
.cred{margin-top:22px;font-size:.83rem;color:var(--dim);line-height:1.7;max-width:560px}
.cred b{color:var(--mut);font-weight:500}
.cta-row{margin-top:36px;display:flex;flex-wrap:wrap;gap:14px}
.btn{display:inline-flex;align-items:center;gap:10px;font-family:var(--mono);font-size:.68rem;letter-spacing:.16em;text-transform:uppercase;padding:15px 25px;border-radius:99px;transition:box-shadow .4s,background .4s,border-color .4s;will-change:transform;white-space:nowrap}
.btn .arr{transition:transform .35s}
.btn:hover .arr{transform:translateX(4px)}
.btn-solid{background:linear-gradient(135deg,var(--coral),var(--coral-deep));color:#0b0503;font-weight:500;box-shadow:0 8px 30px rgba(255,111,97,.28)}
.btn-solid:hover{box-shadow:0 10px 44px rgba(255,111,97,.45)}
.btn-blue{border:1px solid rgba(93,139,255,.5);color:#cfdcff;background:rgba(93,139,255,.06)}
.btn-blue:hover{background:rgba(93,139,255,.14);box-shadow:0 0 30px rgba(93,139,255,.25)}
.btn-ghost{border:1px solid var(--stroke-hi);color:var(--txt);background:rgba(255,255,255,.03)}
.btn-ghost:hover{border-color:rgba(255,255,255,.5);background:rgba(255,255,255,.07)}
.scroll-cue{position:absolute;bottom:22px;left:clamp(20px,5vw,56px);z-index:2;display:flex;align-items:center;gap:12px;font-family:var(--mono);font-size:.6rem;letter-spacing:.3em;color:var(--dim);text-transform:uppercase}
.scroll-cue .line{width:1px;height:44px;background:linear-gradient(180deg,var(--coral),transparent);animation:cue 2.2s ease-in-out infinite;transform-origin:top}
@keyframes cue{0%,100%{transform:scaleY(.35);opacity:.4}50%{transform:scaleY(1);opacity:1}}

/* ---------- scroll story (pinned) ---------- */
.story{position:relative;height:420vh}
.story-pin{position:sticky;top:0;height:100vh;overflow:hidden;display:flex;flex-direction:column;justify-content:center;padding:84px clamp(20px,5vw,56px) 48px}
.story-head{max-width:1180px;margin:0 auto clamp(20px,3.5vh,40px);width:100%}
.story-head h2{font-family:var(--serif);font-weight:400;font-size:clamp(1.7rem,3.4vw,2.7rem);line-height:1.08}
.story-grid{max-width:1180px;margin:0 auto;width:100%;flex:1;min-height:0;display:grid;grid-template-columns:290px 1fr;gap:clamp(28px,5vw,80px);align-items:center}
.stages{position:relative;padding-left:26px}
.stg-rail{position:absolute;left:6px;top:20px;bottom:20px;width:1px;background:rgba(160,175,215,.14)}
.stg-rail i{position:absolute;top:0;left:0;width:100%;background:linear-gradient(180deg,var(--coral),var(--violet),var(--blue));box-shadow:0 0 10px rgba(154,123,255,.6)}
.stg{display:block;width:100%;text-align:left;position:relative;padding:15px 0;transition:transform .5s cubic-bezier(.16,1,.3,1)}
.stg .g-dot{position:absolute;left:-26px;top:22px;width:13px;height:13px;border-radius:50%;border:1px solid rgba(160,175,215,.3);background:var(--ink);transition:border-color .4s}
.stg .g-dot::after{content:"";position:absolute;inset:3px;border-radius:50%;background:var(--coral);transform:scale(0);transition:transform .45s cubic-bezier(.34,1.56,.64,1)}
.stg .g-dot .ring{position:absolute;inset:-7px;border-radius:50%;border:1px solid rgba(255,111,97,.5);opacity:0}
.stg .g-name{font-family:var(--serif);font-size:clamp(1.25rem,2vw,1.7rem);color:var(--dim);transition:color .45s}
.stg .g-gloss{font-family:var(--mono);font-size:.58rem;letter-spacing:.22em;text-transform:uppercase;color:var(--dim);margin-top:5px;transition:color .45s;opacity:.7}
.stg.done .g-dot::after{transform:scale(1);background:var(--violet)}
.stg.done .g-dot{border-color:rgba(154,123,255,.5)}
.stg.done .g-name{color:var(--mut)}
.stg.lit{transform:translateX(6px)}
.stg.lit .g-dot{border-color:var(--coral)}
.stg.lit .g-dot::after{transform:scale(1);background:var(--coral)}
.stg.lit .g-dot .ring{animation:pulse 2.4s ease-out infinite}
.stg.lit .g-name{color:var(--txt)}
.stg.lit .g-gloss{color:var(--coral);opacity:1}
@keyframes pulse{0%{transform:scale(.6);opacity:.8}70%{transform:scale(2.1);opacity:0}100%{opacity:0}}

.panels{position:relative;height:min(60vh,520px)}
.panel{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;overflow:hidden;
  padding:clamp(24px,3.4vw,46px);border-radius:24px;background:var(--panel);border:1px solid var(--stroke);
  backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);
  opacity:0;transform:translateY(46px) scale(.985);pointer-events:none;
  transition:opacity .65s cubic-bezier(.16,1,.3,1),transform .65s cubic-bezier(.16,1,.3,1)}
.panel.is-prev{transform:translateY(-40px) scale(.985)}
.panel.is-cur{opacity:1;transform:none;pointer-events:auto}
.panel.is-cur::after{content:"";position:absolute;inset:0;pointer-events:none;
  background:linear-gradient(100deg,transparent 30%,rgba(200,215,255,.05) 45%,rgba(255,111,97,.06) 50%,transparent 65%);
  transform:translateX(-120%);animation:scan 1.1s .15s cubic-bezier(.3,.7,.4,1) forwards}
@keyframes scan{to{transform:translateX(120%)}}
.panel .p-chip{align-self:flex-start;font-family:var(--mono);font-size:.58rem;letter-spacing:.24em;text-transform:uppercase;color:var(--coral);border:1px solid rgba(255,111,97,.35);border-radius:99px;padding:6px 13px;margin-bottom:20px}
.panel .p-org{font-family:var(--serif);font-size:clamp(1.6rem,3.2vw,2.5rem);line-height:1.08}
.panel .p-role{font-family:var(--mono);font-size:.6rem;letter-spacing:.16em;text-transform:uppercase;color:var(--dim);margin-top:10px;line-height:1.8}
.panel .p-hook{margin-top:16px;color:var(--mut);font-size:clamp(.92rem,1.3vw,1.02rem);line-height:1.75;max-width:560px}
.panel .p-stats{display:flex;flex-wrap:wrap;gap:8px 40px;margin-top:26px}
.panel .p-stats .metric{border-right:none;padding-right:0;margin-right:0}
.panel .p-stats .mv{font-size:clamp(1.5rem,2.6vw,2.1rem)}
.panel .p-open{margin-top:26px;display:inline-flex;align-items:center;gap:8px;font-family:var(--mono);font-size:.62rem;letter-spacing:.2em;text-transform:uppercase;color:var(--txt)}
.panel .p-open .arr{color:var(--coral)}
.panel .p-thesis{font-family:var(--serif);font-style:italic;font-size:clamp(1.5rem,3vw,2.4rem);line-height:1.28;max-width:640px}
.panel .p-thesis b{color:var(--coral);font-weight:400}
.panel .p-scroll{margin-top:26px;font-family:var(--mono);font-size:.6rem;letter-spacing:.26em;text-transform:uppercase;color:var(--dim)}
.panel.clickable{cursor:pointer}
.panel.clickable:hover{border-color:var(--stroke-hi);box-shadow:0 24px 70px rgba(0,0,0,.5),0 0 0 1px rgba(255,111,97,.12)}
.ghost{position:absolute;right:-1%;bottom:2%;z-index:-1;font-family:var(--serif);font-style:italic;line-height:1;
  font-size:clamp(5rem,16vw,13rem);letter-spacing:.01em;color:transparent;
  -webkit-text-stroke:1px rgba(150,170,230,.10);opacity:0;transition:opacity .9s;pointer-events:none;user-select:none}
.ghost.on{opacity:1}
.stage-current{display:none;font-family:var(--mono);font-size:.62rem;letter-spacing:.22em;text-transform:uppercase;color:var(--txt);margin:14px 0 4px}
.stage-current b{color:var(--coral);font-weight:400}

/* ---------- glass cards ---------- */
.card{position:relative;overflow:hidden;border-radius:22px;background:var(--panel);border:1px solid var(--stroke);
  backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);
  transition:transform .6s cubic-bezier(.16,1,.3,1),border-color .5s,box-shadow .5s;transform-style:preserve-3d}
.card::before{content:"";position:absolute;inset:0;pointer-events:none;z-index:1;
  background:radial-gradient(340px circle at var(--mx,-300px) var(--my,-300px),rgba(255,255,255,.07),transparent 55%)}
.card .sheen{content:"";position:absolute;inset:-45%;pointer-events:none;opacity:0;transition:opacity .8s;
  background:conic-gradient(from 0deg, transparent 0 38%, rgba(154,123,255,.07) 48%, rgba(93,139,255,.05) 54%, transparent 64% 100%);
  animation:rot 10s linear infinite;animation-play-state:paused}
@keyframes rot{to{transform:rotate(360deg)}}
.card:hover{border-color:var(--stroke-hi);
  box-shadow:0 30px 74px rgba(0,0,0,.55),0 0 0 1px rgba(255,111,97,.12),0 0 70px rgba(93,139,255,.07)}
.card:hover .sheen{opacity:1;animation-play-state:running}
.card.clickable{cursor:pointer}
.card .open-hint{position:absolute;right:20px;bottom:18px;z-index:2;font-family:var(--mono);font-size:.56rem;letter-spacing:.2em;text-transform:uppercase;color:var(--coral);opacity:0;transform:translateY(4px);transition:all .4s}
.card:hover .open-hint{opacity:.9;transform:none}
.card-body{position:relative;z-index:2}

.xp{padding:clamp(26px,4vw,44px)}
.xp-top{display:flex;flex-wrap:wrap;gap:8px 24px;align-items:baseline;justify-content:space-between;margin-bottom:20px}
.xp-org{font-family:var(--serif);font-size:clamp(1.55rem,2.7vw,2.15rem);line-height:1.1}
.xp-role{font-family:var(--mono);font-size:.62rem;letter-spacing:.14em;text-transform:uppercase;color:var(--mut);line-height:1.8;max-width:460px}
.r1{display:block}
.r2{display:block;margin-top:3px;color:var(--dim)}
.org-link{position:relative;transition:color .3s,text-shadow .3s}
.org-link:hover{color:#ffb9b0;text-shadow:0 0 22px rgba(255,111,97,.35)}
.org-sep{color:var(--dim)}
.mstrip{display:flex;flex-wrap:wrap;gap:10px 0;align-items:stretch;border-top:1px solid var(--stroke);border-bottom:1px solid var(--stroke);padding:16px 0;margin-bottom:20px}
.metric{display:flex;flex-direction:column;gap:5px;padding:2px 24px 2px 0;margin-right:24px;border-right:1px solid rgba(160,175,215,.1)}
.metric:last-child{border-right:none;margin-right:0;padding-right:0}
.metric .mv{font-family:var(--mono);font-size:clamp(1.05rem,1.7vw,1.32rem);color:var(--txt);font-variant-numeric:tabular-nums;white-space:nowrap}
.metric .mv .acc{color:var(--coral)}
.metric .ml{font-family:var(--mono);font-size:.55rem;letter-spacing:.16em;text-transform:uppercase;color:var(--dim)}
.metric .mbar{height:2px;width:86px;background:rgba(160,175,215,.13);border-radius:2px;overflow:hidden;margin-top:4px}
.metric .mbar i{display:block;height:100%;width:0;background:linear-gradient(90deg,var(--coral),var(--violet));border-radius:2px}
.metric.txt-only .mv{font-size:.78rem;color:var(--mut);letter-spacing:.04em;margin:auto 0}
.xp-lines{max-width:760px;color:var(--mut);font-size:.92rem;line-height:1.76}
.xp-lines p+p{margin-top:8px}
.xp-bullets{list-style:none;margin-top:14px;display:flex;flex-direction:column;gap:9px;max-width:760px}
.xp-bullets li{display:flex;gap:12px;color:var(--mut);font-size:.9rem;line-height:1.7}
.xp-bullets li::before{content:"";width:5px;height:5px;border-radius:50%;background:var(--coral);box-shadow:0 0 8px rgba(255,111,97,.6);margin-top:8px;flex-shrink:0}
.impact{margin-top:20px;padding-left:18px;border-left:2px solid var(--coral);font-family:var(--serif);font-style:italic;font-size:clamp(1.05rem,1.7vw,1.3rem);line-height:1.5;color:#f6e9e6;max-width:720px}
.tagrow{margin-top:22px;display:flex;flex-wrap:wrap;gap:8px}
.tag{font-family:var(--mono);font-size:.56rem;letter-spacing:.14em;text-transform:uppercase;color:var(--mut);
  padding:7px 12px;border-radius:99px;border:1px solid var(--stroke);background:rgba(255,255,255,.02);transition:border-color .3s}
.card:hover .tag{border-color:rgba(160,175,215,.26)}
.linkrow{margin-top:22px;display:flex;flex-wrap:wrap;gap:8px;opacity:.6;transform:translateY(3px);transition:opacity .5s,transform .5s}
.card:hover .linkrow,.modal .linkrow{opacity:1;transform:none}
.plink{font-family:var(--mono);font-size:.6rem;letter-spacing:.14em;text-transform:uppercase;color:var(--mut);
  display:inline-flex;align-items:center;gap:8px;padding:9px 14px;border-radius:99px;border:1px solid var(--stroke);
  background:rgba(255,255,255,.02);transition:color .3s,border-color .3s,box-shadow .3s,background .3s}
.plink:hover{color:var(--txt);border-color:rgba(255,111,97,.55);background:rgba(255,111,97,.06);box-shadow:0 0 18px rgba(255,111,97,.18)}
.plink .arr{color:var(--coral);transition:transform .3s}
.plink:hover .arr{transform:translate(2px,-2px)}
.stack{display:flex;flex-direction:column;gap:22px}

/* ---------- builder / competitions ---------- */
.grid2{display:grid;grid-template-columns:1fr 1fr;gap:22px}
.bcard{padding:clamp(24px,3vw,34px)}
.bcard .card-body{display:flex;flex-direction:column;height:100%}
.bcard .b-title{font-family:var(--serif);font-size:clamp(1.25rem,2vw,1.55rem);line-height:1.2;margin-bottom:6px;padding-right:20px}
.bcard .b-org{font-family:var(--mono);font-size:.6rem;letter-spacing:.18em;text-transform:uppercase;color:var(--dim);margin-bottom:16px}
.bcard .mstrip{padding:13px 0;margin-bottom:16px}
.bcard .metric{padding-right:18px;margin-right:18px}
.bcard .metric .mv{font-size:1rem}
.bcard .metric .mbar{width:60px}
.bcard .b-copy{color:var(--mut);font-size:.88rem;line-height:1.72;flex:1}
.bcard .linkrow{margin-top:18px}

/* ---------- projects ---------- */
.proj{padding:clamp(28px,4vw,46px)}
.proj .p-title{font-family:var(--serif);font-size:clamp(1.75rem,3.1vw,2.5rem);display:flex;align-items:baseline;gap:16px;flex-wrap:wrap}
.proj .p-kicker{font-family:var(--mono);font-size:.58rem;letter-spacing:.24em;text-transform:uppercase;color:var(--blue)}
.proj .p-desc{margin-top:16px;color:var(--mut);font-size:.94rem;line-height:1.78;max-width:740px}
.modules{margin-top:22px;display:grid;grid-template-columns:1fr 1fr;gap:10px 26px;max-width:740px}
.module{display:flex;align-items:flex-start;gap:12px;font-size:.85rem;color:var(--txt);padding:11px 14px;border-radius:12px;border:1px solid var(--stroke);background:rgba(255,255,255,.02);transition:border-color .3s,background .3s}
.module:hover{border-color:rgba(154,123,255,.4);background:rgba(154,123,255,.06)}
.module .m-dot{width:6px;height:6px;border-radius:50%;background:var(--violet);box-shadow:0 0 8px rgba(154,123,255,.8);flex-shrink:0;margin-top:6px}
.module .mod-d{display:block;color:var(--mut);font-size:.78rem;line-height:1.5;margin-top:3px}
.qmods{margin-top:22px;max-width:740px;border-top:1px solid var(--stroke)}
.qmod{border-bottom:1px solid var(--stroke)}
.qmod-head{display:flex;align-items:center;gap:12px;width:100%;text-align:left;padding:14px 6px;transition:background .3s}
.qmod-head:hover{background:rgba(255,255,255,.02)}
.qmod .m-dot{width:6px;height:6px;border-radius:50%;background:var(--violet);box-shadow:0 0 8px rgba(154,123,255,.8);flex-shrink:0;transition:background .3s,box-shadow .3s}
.qmod .q-name{flex:1;font-size:.9rem;color:#c9cfdd;transition:color .3s,transform .4s cubic-bezier(.16,1,.3,1)}
.qmod .q-plus{font-family:var(--mono);font-size:1rem;color:var(--dim);transition:transform .45s,color .3s}
.qmod:hover .q-name,.qmod.open .q-name{color:var(--txt)}
.qmod.open .q-name{transform:translateX(4px)}
.qmod.open .q-plus{transform:rotate(45deg);color:var(--violet)}
.qmod.open .m-dot{background:var(--coral);box-shadow:0 0 10px rgba(255,111,97,.9)}
.qmod .q-detail{max-height:0;overflow:hidden;transition:max-height .5s cubic-bezier(.16,1,.3,1),padding .5s;padding:0 6px 0 24px;color:var(--mut);font-size:.86rem;line-height:1.7}
.qmod.open .q-detail{max-height:110px;padding-bottom:14px}
.pipe{margin-top:22px;display:flex;flex-wrap:wrap;align-items:center;gap:10px 6px;max-width:740px}
.pnode{display:inline-flex;align-items:center;gap:8px;font-family:var(--mono);font-size:.6rem;letter-spacing:.16em;text-transform:uppercase;
  color:var(--dim);border:1px solid var(--stroke);border-radius:99px;padding:8px 13px;background:rgba(255,255,255,.02);
  opacity:.4;transform:translateY(6px);transition:opacity .6s cubic-bezier(.16,1,.3,1),transform .6s cubic-bezier(.16,1,.3,1),color .6s,border-color .6s}
.pnode .n-dot{width:6px;height:6px;border-radius:50%;background:var(--dim);transition:background .5s}
.pipe.go .pnode{opacity:1;transform:none;color:var(--mut);border-color:rgba(93,139,255,.35)}
.pipe.go .pnode .n-dot{background:var(--blue);animation:nodeglow 2.6s ease-in-out infinite}
.parrow{color:var(--blue);opacity:.25;font-size:.75rem;transition:opacity .6s}
.pipe.go .parrow{opacity:.9}
@keyframes nodeglow{0%,100%{box-shadow:0 0 5px rgba(93,139,255,.45)}50%{box-shadow:0 0 14px rgba(93,139,255,1)}}
.feature{margin-top:22px;font-family:var(--serif);font-style:italic;font-size:clamp(1.02rem,1.6vw,1.24rem);line-height:1.55;color:#e7ecfb;max-width:680px;padding-left:18px;border-left:2px solid var(--blue)}
.ccard{padding:clamp(22px,3vw,32px)}
.ccard .b-copy{color:var(--mut);font-size:.88rem;line-height:1.72}

/* ---------- methods ---------- */
.mrow{border-bottom:1px solid var(--stroke);cursor:pointer;transition:background .4s;position:relative}
.mrow:first-child{border-top:1px solid var(--stroke)}
.mrow-in{display:grid;grid-template-columns:70px 1fr 40px;align-items:center;gap:20px;padding:25px 8px}
.mrow .m-n{font-family:var(--mono);font-size:.72rem;color:var(--dim);transition:color .4s}
.mrow .m-t{font-family:var(--serif);font-size:clamp(1.4rem,2.5vw,2rem);transition:color .4s,transform .5s cubic-bezier(.16,1,.3,1);color:#c9cfdd}
.mrow .m-plus{justify-self:end;font-family:var(--mono);font-size:1.1rem;color:var(--dim);transition:transform .45s,color .4s}
.mrow .m-desc{max-height:0;overflow:hidden;transition:max-height .55s cubic-bezier(.16,1,.3,1),padding .55s;padding:0 8px 0 90px;color:var(--mut);font-size:.92rem;line-height:1.72;max-width:720px}
.mrow:hover,.mrow.open{background:rgba(255,255,255,.022)}
.mrow:hover .m-n,.mrow.open .m-n{color:var(--coral)}
.mrow:hover .m-t,.mrow.open .m-t{color:var(--txt);transform:translateX(8px)}
.mrow.open .m-plus{transform:rotate(45deg);color:var(--coral)}
.mrow.open .m-desc{max-height:140px;padding-bottom:26px}
.mrow .m-bar{position:absolute;left:0;top:0;bottom:0;width:2px;background:var(--coral);transform:scaleY(0);transition:transform .5s;transform-origin:top}
.mrow.open .m-bar{transform:scaleY(1)}

/* ---------- about ---------- */
.about-grid{display:grid;grid-template-columns:5fr 6fr;gap:clamp(36px,6vw,84px);align-items:start}
.pull{position:sticky;top:130px}
.pull .p-big{font-family:var(--serif);font-size:clamp(1.9rem,3.6vw,3rem);line-height:1.16;letter-spacing:-.01em}
.pull .p-sig{margin-top:26px;display:flex;align-items:center;gap:14px;font-family:var(--mono);font-size:.6rem;letter-spacing:.26em;text-transform:uppercase;color:var(--dim)}
.pull .p-sig::before{content:"";width:34px;height:1px;background:var(--coral)}
.about-copy p{color:var(--mut);font-size:.95rem;line-height:1.82}
.about-copy p+p{margin-top:18px}
.about-copy p:first-child{color:#d7dcea}

/* ---------- connect ---------- */
.connect{text-align:center;padding-bottom:36px}
.connect .sub{margin-left:auto;margin-right:auto}
.email{display:inline-block;margin-top:34px;font-family:var(--mono);font-size:clamp(.95rem,2.4vw,1.5rem);letter-spacing:.04em;color:var(--txt);position:relative;padding-bottom:6px}
.email::after{content:"";position:absolute;left:0;bottom:0;width:100%;height:1px;background:linear-gradient(90deg,var(--coral),var(--violet),var(--blue));transform:scaleX(.3);opacity:.5;transform-origin:center;transition:transform .5s,opacity .5s}
.email:hover::after{transform:scaleX(1);opacity:1}
.connect .cta-row{justify-content:center}

/* ---------- modal ---------- */
.overlay{position:fixed;inset:0;z-index:100;background:rgba(3,5,10,.72);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);
  display:flex;align-items:center;justify-content:center;padding:clamp(14px,4vw,44px);animation:fade .35s ease}
@keyframes fade{from{opacity:0}}
.modal{position:relative;width:100%;max-width:780px;max-height:88vh;overflow-y:auto;border-radius:24px;
  background:linear-gradient(180deg, rgba(16,21,36,.96), rgba(8,11,20,.97));border:1px solid rgba(200,212,245,.18);
  box-shadow:0 40px 120px rgba(0,0,0,.7),0 0 0 1px rgba(255,111,97,.08),0 0 90px rgba(93,139,255,.08);
  padding:clamp(26px,4.5vw,52px);animation:pop .45s cubic-bezier(.16,1,.3,1)}
@keyframes pop{from{opacity:0;transform:translateY(24px) scale(.97)}}
.modal::-webkit-scrollbar{width:8px}
.modal::-webkit-scrollbar-thumb{background:rgba(160,175,215,.2);border-radius:8px}
.m-close{position:absolute;top:16px;right:16px;width:38px;height:38px;border-radius:50%;border:1px solid var(--stroke);
  display:flex;align-items:center;justify-content:center;font-family:var(--mono);font-size:.85rem;color:var(--mut);transition:all .3s;z-index:2}
.m-close:hover{color:var(--txt);border-color:var(--coral);box-shadow:0 0 18px rgba(255,111,97,.3);transform:rotate(90deg)}
.modal .mo-kicker{font-family:var(--mono);font-size:.6rem;letter-spacing:.22em;text-transform:uppercase;color:var(--coral);margin-bottom:14px}
.modal .mo-title{font-family:var(--serif);font-size:clamp(1.7rem,3.4vw,2.5rem);line-height:1.1;padding-right:40px}
.modal .mo-role{font-family:var(--mono);font-size:.62rem;letter-spacing:.14em;text-transform:uppercase;color:var(--mut);margin-top:12px;line-height:1.8}
.modal .mstrip{margin-top:22px}
.modal .mo-paras{color:var(--mut);font-size:.93rem;line-height:1.78;max-width:640px}
.modal .mo-paras p+p{margin-top:8px}
.modal .mo-label{font-family:var(--mono);font-size:.56rem;letter-spacing:.26em;text-transform:uppercase;color:var(--dim);margin:26px 0 12px;display:flex;align-items:center;gap:12px}
.modal .mo-label::after{content:"";flex:1;height:1px;background:var(--stroke)}
.modal .mo-more{list-style:none;display:flex;flex-direction:column;gap:10px}
.modal .mo-more li{display:flex;gap:12px;color:#cdd4e6;font-size:.9rem;line-height:1.65}
.modal .mo-more li::before{content:"";width:5px;height:5px;border-radius:50%;background:var(--coral);box-shadow:0 0 8px rgba(255,111,97,.7);margin-top:9px;flex-shrink:0}
.modal .pipe{opacity:1}

/* ---------- footer ---------- */
.footer{border-top:1px solid var(--stroke);margin-top:clamp(64px,8vw,100px)}
.foot-in{max-width:1180px;margin:0 auto;padding:36px clamp(20px,5vw,56px) 108px;display:flex;flex-wrap:wrap;gap:18px;align-items:baseline;justify-content:space-between}
.foot-brand{font-family:var(--serif);font-size:1.2rem}
.foot-brand b{color:var(--coral);font-weight:400}
.foot-tag{color:var(--dim);font-size:.8rem;margin-top:6px}
.foot-links{display:flex;flex-wrap:wrap;gap:8px;margin-top:16px}
.foot-meta{font-family:var(--mono);font-size:.58rem;letter-spacing:.2em;text-transform:uppercase;color:var(--dim)}

.sec-pad{padding:clamp(78px,11vw,140px) 0 0}

/* ---------- responsive ---------- */
@media(max-width:1140px){
  .tracker{display:none}
  .dock{display:flex}
  .spiral-wrap{opacity:.55;right:-26%}
}
@media(max-width:880px){
  .nav-links{display:none}
  .grid2{grid-template-columns:1fr}
  .modules{grid-template-columns:1fr}
  .about-grid{grid-template-columns:1fr}
  .pull{position:static}
  .xp-top{flex-direction:column;gap:10px}
  .mrow-in{grid-template-columns:44px 1fr 30px;gap:12px}
  .mrow .m-desc{padding-left:64px}
  .story{height:380vh}
  .story-grid{grid-template-columns:1fr;align-items:start;gap:0}
  .stages{display:flex;flex-direction:row;gap:0;padding-left:0;justify-content:flex-start}
  .stg{padding:10px 16px 10px 0;width:auto}
  .stg .g-name,.stg .g-gloss{display:none}
  .stg .g-dot{position:relative;left:auto;top:auto;display:block}
  .stg.lit{transform:none}
  .stg-rail{display:none}
  .stage-current{display:block}
  .panels{height:min(62vh,470px);margin-top:8px}
  .ghost{font-size:clamp(4rem,20vw,7rem);bottom:0;-webkit-text-stroke:1px rgba(150,170,230,.07)}
  .orbits{display:none}
  .parrow{display:none}
  .pipe{gap:8px}
}
@media(max-width:560px){
  .hero{padding-top:92px;min-height:88vh;padding-bottom:28px}
  .spiral-wrap{width:150vw;right:-52%;opacity:.35}
  .hero-scrim{width:100%;background:linear-gradient(180deg, rgba(4,6,11,.4), rgba(4,6,11,.75))}
  .metric{padding-right:16px;margin-right:16px}
  .cta-row .btn{flex:1 1 44%;justify-content:center}
  .scroll-cue{display:none}
  .panel{padding:22px}
}
@media(hover:none){
  .linkrow{opacity:1;transform:none}
  .card .open-hint{opacity:.8;transform:none}
}
@media(prefers-reduced-motion:reduce){
  *{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;scroll-behavior:auto!important}
  .rv,.kin .kw>span{opacity:1!important;transform:none!important}
  .panel{transition:none}
  .pipe .pnode{opacity:1!important;transform:none!important}
  .rule i{transform:scaleX(1)!important}
  .orbits{display:none}
}
`;

/* ----------------------------- HOOKS + HELPERS ----------------------------- */

function useOnce(margin) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") { setOn(true); return; }
    const ob = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) { setOn(true); ob.disconnect(); } },
      { rootMargin: margin || "0px 0px -10% 0px", threshold: 0.12 }
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, []);
  return [ref, on];
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const fn = (e) => setReduced(e.matches);
    mq.addEventListener ? mq.addEventListener("change", fn) : mq.addListener(fn);
    return () => { mq.removeEventListener ? mq.removeEventListener("change", fn) : mq.removeListener(fn); };
  }, []);
  return reduced;
}

function goTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

const clamp01 = (x) => Math.max(0, Math.min(1, x));
const isExternal = (href) => /^https?:\/\//.test(href || "");

/* cursor spotlight + gentle 3D tilt, shared by all glass cards */
function tiltMove(e) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const px = (e.clientX - r.left) / r.width - 0.5;
  const py = (e.clientY - r.top) / r.height - 0.5;
  el.style.setProperty("--mx", e.clientX - r.left + "px");
  el.style.setProperty("--my", e.clientY - r.top + "px");
  el.style.transform =
    "perspective(1000px) translateY(-4px) rotateX(" + (-py * 3.4).toFixed(2) + "deg) rotateY(" + (px * 4.2).toFixed(2) + "deg)";
}
function tiltLeave(e) {
  e.currentTarget.style.transform = "";
}

/* ----------------------------- ATOMS ----------------------------- */

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, on] = useOnce();
  return (
    <div ref={ref} className={"rv " + (on ? "go " : "") + className} style={{ transitionDelay: delay + "ms" }}>
      {children}
    </div>
  );
}

/* Kinetic word-by-word masked reveal. _underscored words_ = italic accent. */
function Kinetic({ text, as = "h2", className = "", accent = "h-it", stagger = 55, delay = 0 }) {
  const [ref, on] = useOnce();
  const Tag = as;
  const words = [];
  let italic = false;
  text.split(" ").forEach((raw) => {
    let w = raw;
    let isIt = italic;
    if (w.startsWith("_")) { italic = true; isIt = true; w = w.slice(1); }
    if (w.endsWith("_")) { italic = false; w = w.slice(0, -1); }
    words.push({ w, it: isIt });
  });
  return (
    <Tag ref={ref} className={"kin " + (on ? "go " : "") + className} aria-label={text.replace(/_/g, "")}>
      {words.map((x, i) => (
        <span className="kw" key={i} aria-hidden="true">
          <span style={{ transitionDelay: delay + i * stagger + "ms" }} className={x.it ? accent : ""}>
            {x.w}
          </span>
          {i < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </Tag>
  );
}

/* drawn gradient rule that scales in on reveal */
function Rule({ delay = 0 }) {
  const [ref, on] = useOnce();
  return (
    <div ref={ref} className={"rule" + (on ? " go" : "")} aria-hidden="true">
      <i style={{ transitionDelay: delay + "ms" }} />
    </div>
  );
}

/* Dashboard-style count-up metric with fill bar.
   Parses "$19.05B", "1,000+", "+12%", "Top 5", "20,000-trial".
   Pass `go` to drive activation externally (scroll story). */
function Metric({ v, l, t, go }) {
  const [ref, on] = useOnce("0px 0px -6% 0px");
  const [disp, setDisp] = useState("");
  const [bar, setBar] = useState(0);
  const parsed = useRef(null);
  const active = go === undefined ? on : go;

  if (!t && !parsed.current) {
    const m = String(v).match(/^([^0-9]*)([0-9][0-9,]*(?:\.[0-9]+)?)(.*)$/);
    if (m) {
      const num = parseFloat(m[2].replace(/,/g, ""));
      const dec = (m[2].split(".")[1] || "").length;
      parsed.current = { pre: m[1], num, dec, suf: m[3], comma: m[2].indexOf(",") >= 0 };
    } else {
      parsed.current = { raw: String(v) };
    }
  }

  useEffect(() => {
    const p = parsed.current;
    if (!active || !p || p.raw) return;
    let raf;
    const t0 = performance.now();
    const dur = 1400;
    const tick = (now) => {
      const k = Math.min(1, (now - t0) / dur);
      const e = 1 - Math.pow(1 - k, 4);
      const val = p.num * e;
      let s = val.toFixed(p.dec);
      if (p.comma || p.num >= 1000) {
        const parts = s.split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        s = parts.join(".");
      }
      setDisp(s);
      setBar(Math.round(e * 100));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active]);

  if (t) {
    return (
      <div className="metric txt-only">
        <span className="mv">{t}</span>
      </div>
    );
  }

  const p = parsed.current;
  return (
    <div className="metric" ref={ref}>
      <span className="mv">
        {p.raw ? p.raw : (
          <>
            {p.pre && <span className="acc">{p.pre}</span>}
            {active ? (disp || "0") : "0"}
            {p.suf && <span className="acc">{p.suf}</span>}
          </>
        )}
      </span>
      {l && <span className="ml">{l}</span>}
      {!p.raw && (
        <span className="mbar"><i style={{ width: bar + "%" }} /></span>
      )}
    </div>
  );
}

function MetricStrip({ metrics, go }) {
  return (
    <div className="mstrip">
      {metrics.map((m, i) => <Metric key={i} {...m} go={go} />)}
    </div>
  );
}

/* proof link chips — external links open in a new tab */
function ProofLinks({ links }) {
  return (
    <div className="linkrow" onClick={(e) => e.stopPropagation()}>
      {links.map((lk, i) => (
        <a
          className="plink" href={lk.href} key={i}
          {...(isExternal(lk.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {lk.label} <span className="arr">↗</span>
        </a>
      ))}
    </div>
  );
}

/* org name → live external link (single org or Krenicki / Girl Scouts pair) */
function OrgName({ org, orgHref, orgParts, className }) {
  const stop = (e) => e.stopPropagation();
  if (orgParts) {
    return (
      <h3 className={className}>
        {orgParts.map((p, i) => (
          <React.Fragment key={p.label}>
            {i > 0 && <span className="org-sep"> / </span>}
            <a className="org-link" href={p.href} target="_blank" rel="noopener noreferrer" onClick={stop}>
              {p.label}
            </a>
          </React.Fragment>
        ))}
      </h3>
    );
  }
  if (orgHref) {
    return (
      <h3 className={className}>
        <a className="org-link" href={orgHref} target="_blank" rel="noopener noreferrer" onClick={stop}>{org}</a>
      </h3>
    );
  }
  return <h3 className={className}>{org}</h3>;
}

/* role split onto two clean lines (no separator dashes) */
function RoleLines({ role, roleSub, roleSubHref, className }) {
  const stop = (e) => e.stopPropagation();
  return (
    <div className={className}>
      <span className="r1">{role}</span>
      {roleSub && (
        <span className="r2">
          {roleSubHref ? (
            <a className="org-link" href={roleSubHref} target="_blank" rel="noopener noreferrer" onClick={stop}>
              {roleSub}
            </a>
          ) : roleSub}
        </span>
      )}
    </div>
  );
}

/* animated RAG pipeline: nodes light up in sequence when scrolled into view */
function Pipeline({ stages }) {
  const [ref, on] = useOnce("0px 0px -4% 0px");
  return (
    <div ref={ref} className={"pipe" + (on ? " go" : "")}
      onClick={(e) => e.stopPropagation()}
      aria-label={"Pipeline: " + stages.join(", ")}>
      {stages.map((s, i) => (
        <React.Fragment key={s}>
          {i > 0 && (
            <span className="parrow" aria-hidden="true" style={{ transitionDelay: (i * 160 - 80) + "ms" }}>→</span>
          )}
          <span className="pnode" style={{ transitionDelay: i * 160 + "ms" }}>
            <span className="n-dot" style={{ animationDelay: (i * 260 + 600) + "ms" }} />
            {s}
          </span>
        </React.Fragment>
      ))}
    </div>
  );
}

/* expandable module accordion for Quant Finance Lab */
function ModuleAccordion({ modules }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="qmods" onClick={(e) => e.stopPropagation()}>
      {modules.map((m, i) => (
        <div key={m.name} className={"qmod" + (open === i ? " open" : "")}>
          <button className="qmod-head" aria-expanded={open === i}
            onClick={() => setOpen(open === i ? -1 : i)}>
            <span className="m-dot" />
            <span className="q-name">{m.name}</span>
            <span className="q-plus">+</span>
          </button>
          <div className="q-detail"><p>{m.detail}</p></div>
        </div>
      ))}
    </div>
  );
}

function Magnetic({ children }) {
  const ref = useRef(null);
  const move = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = "translate(" + x * 0.22 + "px," + y * 0.28 + "px)";
  };
  const leave = () => { const el = ref.current; if (el) el.style.transform = "translate(0,0)"; };
  return (
    <div ref={ref} onMouseMove={move} onMouseLeave={leave}
      style={{ display: "inline-block", transition: "transform .45s cubic-bezier(.16,1,.3,1)", willChange: "transform" }}>
      {children}
    </div>
  );
}

function SectionHead({ num, label, title, sub, accent }) {
  return (
    <div className="sechead">
      <Reveal>
        <div className="eyebrow"><span className="en">{num}</span> {label}</div>
      </Reveal>
      <Kinetic text={title} as="h2" className="h-serif h-xl" accent={accent || "h-it"} />
      {sub && <Reveal delay={200}><p className="sub">{sub}</p></Reveal>}
      <Rule delay={300} />
    </div>
  );
}

/* Generic glass card shell: spotlight + tilt + sheen + optional modal open */
function Glass({ className = "", onOpen, children }) {
  const handleKey = (e) => {
    if (onOpen && (e.key === "Enter" || e.key === " ") && e.target === e.currentTarget) {
      e.preventDefault();
      onOpen();
    }
  };
  return (
    <article
      className={"card " + (onOpen ? "clickable " : "") + className}
      onMouseMove={tiltMove}
      onMouseLeave={tiltLeave}
      onClick={onOpen}
      onKeyDown={handleKey}
      role={onOpen ? "button" : undefined}
      tabIndex={onOpen ? 0 : undefined}
    >
      <span className="sheen" aria-hidden="true" />
      <div className="card-body">{children}</div>
      {onOpen && <span className="open-hint">＋ Open details</span>}
    </article>
  );
}

/* ----------------------------- CANVASES ----------------------------- */

/* full-page drifting constellation */
function FieldCanvas({ reduced }) {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current;
    const ctx = cv.getContext("2d");
    let w, h, raf;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const N = 60;
    const pts = [];
    const size = () => {
      w = window.innerWidth; h = window.innerHeight;
      cv.width = w * dpr; cv.height = h * dpr;
      cv.style.width = w + "px"; cv.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    size();
    for (let i = 0; i < N; i++) {
      pts.push({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.15, vy: (Math.random() - 0.5) * 0.15,
        r: Math.random() * 1.3 + 0.4,
      });
    }
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < N; i++) {
        const p = pts[i];
        if (!reduced) {
          p.x += p.vx; p.y += p.vy;
          if (p.x < -10) p.x = w + 10; if (p.x > w + 10) p.x = -10;
          if (p.y < -10) p.y = h + 10; if (p.y > h + 10) p.y = -10;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(150,170,230,0.28)";
        ctx.fill();
      }
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d = dx * dx + dy * dy;
          if (d < 15000) {
            ctx.strokeStyle = "rgba(140,160,225," + 0.05 * (1 - d / 15000) + ")";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }
      if (!reduced) raf = requestAnimationFrame(draw);
    };
    draw();
    const onR = () => size();
    window.addEventListener("resize", onR);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onR); };
  }, [reduced]);
  return <canvas ref={ref} className="field" aria-hidden="true" />;
}

/* Hero orbital system: scattered data organizes into a spiral,
   flows inward to a decision core, then exits along a decision beam. */
function Spiral({ reduced }) {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current;
    const ctx = cv.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w, h, cx, cy, maxR, raf, running = true;
    const N = 150;
    const P = [];
    const pulses = [];
    const B = 0.16;
    let thetaMax = 1;

    const size = () => {
      const r = cv.parentElement.getBoundingClientRect();
      w = r.width; h = r.height;
      cv.width = w * dpr; cv.height = h * dpr;
      cv.style.width = w + "px"; cv.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = w / 2; cy = h / 2; maxR = Math.min(w, h) * 0.45;
      thetaMax = Math.log(Math.max(maxR, 20) / 5) / B;
      for (const p of P) { p.sx = Math.random() * w; p.sy = Math.random() * h; }
    };

    for (let i = 0; i < N; i++) {
      P.push({
        s: Math.random(),                       // position along spiral (1=outer)
        sp: 0.00035 + Math.random() * 0.0009,   // inward speed
        sx: 0, sy: 0,                            // scattered origin
        seed: Math.random() * Math.PI * 2,
        delay: Math.random() * 160,              // organization stagger (frames)
        o: reduced ? 1 : 0,                      // organization factor 0→1
        px: null, py: null,
      });
    }
    size();

    const col = (s) => {
      if (s > 0.55) {
        const k = (s - 0.55) / 0.45;
        return [93 + 61 * (1 - k), 139 - 16 * (1 - k), 255];
      }
      const k = s / 0.55;
      return [255 - 101 * k, 111 + 12 * k, 97 + 158 * k];
    };
    const spiralPos = (s, phi) => {
      const th = thetaMax * s;
      const r = 5 * Math.exp(B * th);
      return [cx + r * Math.cos(th + phi), cy + r * Math.sin(th + phi) * 0.72];
    };
    const easeIO = (x) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);

    /* decision beam: quadratic curve from core toward the right edge */
    const beamPoint = (t) => {
      const x0 = cx, y0 = cy;
      const x1 = cx + maxR * 0.75, y1 = cy - maxR * 0.1;
      const x2 = w + 60, y2 = cy - maxR * 0.42;
      const a = 1 - t;
      return [a * a * x0 + 2 * a * t * x1 + t * t * x2, a * a * y0 + 2 * a * t * y1 + t * t * y2];
    };
    const beamT = [0.1, 0.42, 0.74];

    let phi = 0;
    let frameN = 0;
    let lastPulse = 0;

    const frame = (now) => {
      ctx.clearRect(0, 0, w, h);
      frameN++;
      if (!reduced) phi += 0.0015;

      /* organization progress per particle */
      let orgAvg = 0;
      for (const p of P) {
        if (!reduced && frameN > p.delay && p.o < 1) p.o = Math.min(1, p.o + 0.008);
        orgAvg += p.o;
      }
      orgAvg /= N;

      /* faint spiral guide, fading in as the system organizes */
      ctx.beginPath();
      for (let s = 1; s >= 0.02; s -= 0.01) {
        const [x, y] = spiralPos(s, phi);
        s === 1 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = "rgba(150,165,230," + 0.07 * orgAvg + ")";
      ctx.lineWidth = 1;
      ctx.stroke();

      /* particles: lerp from scattered drift → spiral orbit */
      for (const p of P) {
        if (!reduced && p.o >= 0.98) {
          p.s -= p.sp;
          if (p.s <= 0.03) {
            p.s = 1; p.px = null; p.py = null;
            if (now - lastPulse > 850) { pulses.push({ r: 6, a: 0.55 }); lastPulse = now; }
          }
        }
        const wob = Math.sin(now * 0.0009 + p.seed) * 7;
        const [tx, ty] = spiralPos(p.s, phi);
        const k = easeIO(p.o);
        const x = (p.sx + wob) * (1 - k) + tx * k;
        const y = (p.sy + wob * 0.6) * (1 - k) + ty * k;
        const [r, g, b] = col(p.s);
        const a = (0.16 + k * 0.16) + (1 - p.s) * 0.55 * k;
        if (p.px !== null && k > 0.5) {
          ctx.strokeStyle = "rgba(" + (r | 0) + "," + (g | 0) + "," + (b | 0) + "," + a * 0.4 + ")";
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(p.px, p.py); ctx.lineTo(x, y); ctx.stroke();
        }
        ctx.beginPath();
        ctx.arc(x, y, 1 + (1 - p.s) * 1.6 * k + (1 - k) * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(" + (r | 0) + "," + (g | 0) + "," + (b | 0) + "," + a + ")";
        ctx.fill();
        p.px = x; p.py = y;
      }

      /* decision core */
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 64);
      glow.addColorStop(0, "rgba(255,111,97," + 0.5 * orgAvg + ")");
      glow.addColorStop(0.4, "rgba(255,111,97," + 0.12 * orgAvg + ")");
      glow.addColorStop(1, "rgba(255,111,97,0)");
      ctx.fillStyle = glow;
      ctx.beginPath(); ctx.arc(cx, cy, 64, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(cx, cy, 3.4, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,220,214," + (0.4 + 0.55 * orgAvg) + ")"; ctx.fill();

      /* decision beam + traveling pulses */
      if (w > 620 && orgAvg > 0.4) {
        const ba = (orgAvg - 0.4) / 0.6;
        ctx.beginPath();
        for (let t = 0; t <= 1.001; t += 0.05) {
          const [x, y] = beamPoint(t);
          t === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        const grad = ctx.createLinearGradient(cx, cy, w, cy - maxR * 0.42);
        grad.addColorStop(0, "rgba(255,111,97," + 0.3 * ba + ")");
        grad.addColorStop(1, "rgba(255,111,97,0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1;
        ctx.stroke();
        for (let i = 0; i < beamT.length; i++) {
          if (!reduced) beamT[i] = (beamT[i] + 0.0022) % 1;
          const [x, y] = beamPoint(beamT[i]);
          const fa = (1 - beamT[i]) * 0.8 * ba;
          ctx.beginPath(); ctx.arc(x, y, 2, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255,150,140," + fa + ")"; ctx.fill();
        }
      }

      /* decision pulses radiating from core */
      for (let i = pulses.length - 1; i >= 0; i--) {
        const q = pulses[i];
        q.r += 1.4; q.a -= 0.007;
        if (q.a <= 0) { pulses.splice(i, 1); continue; }
        ctx.strokeStyle = "rgba(255,111,97," + q.a + ")";
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.ellipse(cx, cy, q.r, q.r * 0.72, 0, 0, Math.PI * 2); ctx.stroke();
      }

      if (!reduced && running) raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const ob = new IntersectionObserver(([e]) => {
      running = e.isIntersecting;
      if (running && !reduced) { cancelAnimationFrame(raf); raf = requestAnimationFrame(frame); }
    });
    ob.observe(cv);

    const onR = () => size();
    window.addEventListener("resize", onR);
    return () => { running = false; cancelAnimationFrame(raf); ob.disconnect(); window.removeEventListener("resize", onR); };
  }, [reduced]);
  return <canvas ref={ref} style={{ width: "100%", height: "100%" }} aria-hidden="true" />;
}

/* slow orbiting nodes layered over the spiral */
function Orbits() {
  return (
    <div className="orbits" aria-hidden="true">
      <span className="orb" style={{ "--r": "26%", "--d": "34s", "--c": "rgba(255,111,97,.9)" }} />
      <span className="orb rev" style={{ "--r": "37%", "--d": "48s", "--c": "rgba(93,139,255,.9)" }} />
      <span className="orb" style={{ "--r": "47%", "--d": "64s", "--c": "rgba(154,123,255,.9)" }} />
    </div>
  );
}

/* ----------------------------- NAV ----------------------------- */

function TopNav({ active }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav className={"nav" + (scrolled ? " scrolled" : "")} aria-label="Primary">
      <div className="nav-in">
        <a href="#hero" className="logo" onClick={(e) => { e.preventDefault(); goTo("hero"); }}>
          RK<b>.</b>SPACE
        </a>
        <div className="nav-links">
          {NAV.map((n) => (
            <a key={n.id} href={"#" + n.id} className={active === n.id ? "hot" : ""}
              onClick={(e) => { e.preventDefault(); goTo(n.id); }}>
              {n.label}
            </a>
          ))}
        </div>
        <a href="#connect" className="nav-cta" onClick={(e) => { e.preventDefault(); goTo("connect"); }}>
          Let's Connect
        </a>
      </div>
    </nav>
  );
}

/* mission-control tracker: index cap, telemetry rail, % readout */
function Tracker({ active, pct }) {
  return (
    <div className="tracker" aria-label="Section navigator">
      <div className="trk-cap">Index</div>
      <div className="trk-list">
        <span className="trk-rail" aria-hidden="true"><i style={{ height: pct + "%" }} /></span>
        {SECTIONS.map((s) => (
          <button key={s.id} className={"trk" + (active === s.id ? " on" : "")} onClick={() => goTo(s.id)}>
            <span className="t-lab">{s.label}</span>
            <span className="t-num">{s.num}</span>
            <span className="t-dot" />
          </button>
        ))}
      </div>
      <div className="trk-foot">{String(pct).padStart(3, "0")}%</div>
    </div>
  );
}

function Dock({ active }) {
  return (
    <div className="dock" aria-label="Section navigator">
      {SECTIONS.map((s) => (
        <button key={s.id} className={"dk" + (active === s.id ? " on" : "")}
          onClick={() => goTo(s.id)} aria-label={s.num + " " + s.label}>
          <span className="d-dot" />
          <span className="d-lab">{s.num}</span>
        </button>
      ))}
    </div>
  );
}

/* ----------------------------- SECTIONS ----------------------------- */

function Hero({ reduced }) {
  return (
    <section id="hero" className="hero">
      <div className="spiral-wrap">
        <Spiral reduced={reduced} />
        {!reduced && <Orbits />}
      </div>
      <div className="hero-scrim" aria-hidden="true" />
      <div className="wrap" style={{ width: "100%" }}>
        <div className="hero-in">
          <Reveal><div className="hi-line">Hi, I'm Rishita.</div></Reveal>
          <Kinetic as="h1" stagger={70} delay={150}
            text="I'm a _creative data builder_ working across finance, analytics, and AI." />
          <Reveal delay={550}>
            <p className="hero-p">
              I like taking messy business questions and turning them into something useful: a model,
              a dashboard, a research system, or a story someone can actually act on.
            </p>
          </Reveal>
          <Reveal delay={660}>
            <div className="focus-row">
              <span>Financial Analytics</span><span className="f-dot" />
              <span>Risk &amp; Strategy</span><span className="f-dot" />
              <span>AI Decision Tools</span><span className="f-dot" />
              <span>Data Storytelling</span>
            </div>
          </Reveal>
          <Reveal delay={760}>
            <p className="cred">
              Previously worked across <b>J.P. Morgan</b>, <b>Caterpillar</b>, <b>Purdue Research
              Foundation</b>, and <b>Krenicki Center</b> analytics projects.
            </p>
          </Reveal>
          <Reveal delay={860}>
            <div className="cta-row">
              <Magnetic>
                <a href="#experience" className="btn btn-solid" onClick={(e) => { e.preventDefault(); goTo("experience"); }}>
                  View Work <span className="arr">→</span>
                </a>
              </Magnetic>
              <Magnetic>
                <a href="#projects" className="btn btn-blue" onClick={(e) => { e.preventDefault(); goTo("projects"); }}>
                  View Projects
                </a>
              </Magnetic>
              <Magnetic>
                <a href="#connect" className="btn btn-ghost" onClick={(e) => { e.preventDefault(); goTo("connect"); }}>
                  Let's Connect
                </a>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </div>
      <div className="scroll-cue"><span>Scroll</span><span className="line" /></div>
    </section>
  );
}

/* full-screen pinned scroll story */
function Story({ openModal }) {
  const secRef = useRef(null);
  const fillRef = useRef(null);
  const [stage, setStage] = useState(0);
  const stageRef = useRef(0);

  useEffect(() => {
    const sec = secRef.current;
    if (!sec) return;
    let raf = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        const rect = sec.getBoundingClientRect();
        const span = rect.height - window.innerHeight;
        const p = clamp01(-rect.top / Math.max(span, 1));
        if (fillRef.current) fillRef.current.style.height = (p * 100).toFixed(2) + "%";
        const s = Math.min(4, Math.floor(p * 5 + 0.35));
        if (s !== stageRef.current) { stageRef.current = s; setStage(s); }
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const jump = (i) => {
    const sec = secRef.current;
    if (!sec) return;
    const rect = sec.getBoundingClientRect();
    const top = window.scrollY + rect.top;
    const span = rect.height - window.innerHeight;
    window.scrollTo({ top: top + span * ((i + 0.15) / 5), behavior: "smooth" });
  };

  return (
    <section id="signal" className="story" ref={secRef}>
      <div className="story-pin">
        <div className="story-head">
          <div className="eyebrow"><span className="en">01</span> Signal Path</div>
          <h2>From messy questions to <span className="h-it">clearer decisions.</span></h2>
          <div className="stage-current">
            <b>{STORY_STAGES[stage].name}</b>{" · "}{STORY_STAGES[stage].gloss}
          </div>
        </div>

        <div className="story-grid">
          <div className="stages">
            <span className="stg-rail" aria-hidden="true"><i ref={fillRef} /></span>
            {STORY_STAGES.map((st, i) => (
              <button key={st.name}
                className={"stg" + (i === stage ? " lit" : "") + (i < stage ? " done" : "")}
                onClick={() => jump(i)}>
                <span className="g-dot"><span className="ring" /></span>
                <span className="g-name">{st.name}</span>
                <div className="g-gloss">{st.gloss}</div>
              </button>
            ))}
          </div>

          <div className="panels">
            {STORY_STAGES.map((st, i) => (
              <span key={st.name} className={"ghost" + (i === stage ? " on" : "")} aria-hidden="true">
                {st.name}
              </span>
            ))}
            {STORY_PANELS.map((pn, i) => {
              const cls = "panel " + (i === stage ? "is-cur" : i < stage ? "is-prev" : "is-next");
              if (pn.kind === "thesis") {
                return (
                  <div key="thesis" className={cls}>
                    <p className="p-thesis">
                      The problem is unclear. The data is imperfect. <b>Someone still needs to decide.</b>
                    </p>
                    <p className="p-scroll">Keep scrolling · five moves, four proofs ↓</p>
                  </div>
                );
              }
              const xp = EXPERIENCES[pn.xp];
              return (
                <div key={xp.org} className={cls + " clickable"} onClick={() => openModal("xp", xp)}
                  role="button" tabIndex={i === stage ? 0 : -1}
                  onKeyDown={(e) => { if (e.key === "Enter") openModal("xp", xp); }}>
                  <span className="p-chip">{pn.chip}</span>
                  <div className="p-org">{xp.org}</div>
                  <RoleLines className="p-role" role={xp.role} roleSub={xp.roleSub} roleSubHref={xp.roleSubHref} />
                  <p className="p-hook">{pn.hook}</p>
                  <div className="p-stats">
                    {pn.stats.map((m, j) => <Metric key={j} {...m} go={i === stage} />)}
                  </div>
                  <span className="p-open">Open the full story <span className="arr">↗</span></span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function Experience({ openModal }) {
  return (
    <section id="experience" className="sec-pad">
      <div className="wrap">
        <SectionHead num="02" label="Experience" title="Selected _Experience_" accent="h-it-v" />
        <div className="stack">
          {EXPERIENCES.map((x, i) => (
            <Reveal key={x.slug} delay={i * 80}>
              <Glass className="xp" onOpen={() => openModal("xp", x)}>
                <div className="xp-top">
                  <OrgName className="xp-org" org={x.org} orgHref={x.orgHref} orgParts={x.orgParts} />
                  <RoleLines className="xp-role" role={x.role} roleSub={x.roleSub} roleSubHref={x.roleSubHref} />
                </div>
                <MetricStrip metrics={x.metrics} />
                <div className="xp-lines">
                  <p>{x.context}</p>
                </div>
                <ul className="xp-bullets">
                  {x.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
                {x.impact && <p className="impact">{x.impact}</p>}
                <div className="tagrow">
                  {x.tags.map((tg) => <span className="tag" key={tg}>{tg}</span>)}
                </div>
                {x.links && x.links.length > 0 && <ProofLinks links={x.links} />}
              </Glass>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Builder({ openModal }) {
  return (
    <section id="builder" className="sec-pad">
      <div className="wrap">
        <SectionHead num="03" label="Builder Mode" title="Builder _Mode_"
          sub="Some of my best work has happened outside the job title: leading teams, building prototypes, managing budgets, and turning early ideas into something real." />
        <div className="grid2">
          {BUILDER.map((b, i) => (
            <Reveal key={b.slug} delay={(i % 2) * 110}>
              <Glass className="bcard" onOpen={() => openModal("builder", b)}>
                <h3 className="b-title">{b.title}</h3>
                <div className="b-org">{b.role}</div>
                <MetricStrip metrics={b.metrics} />
                <p className="b-copy">{b.copy}</p>
                {b.links && b.links.length > 0 && <ProofLinks links={b.links} />}
              </Glass>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects({ openModal }) {
  return (
    <section id="projects" className="sec-pad">
      <div className="wrap">
        <SectionHead num="04" label="Projects" title="_Experiments_ in Finance, Risk & AI" accent="h-it-b"
          sub="Projects where I tested ideas across valuation, credit risk, research, market regimes, and decision support." />
        <div className="stack">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 100}>
              <Glass className="proj" onOpen={() => openModal("project", p)}>
                <h3 className="p-title">
                  {p.title} <span className="p-kicker">{p.kicker}</span>
                </h3>
                <MetricStrip metrics={p.metrics} />
                <p className="p-desc">{p.desc}</p>
                {p.modules && <ModuleAccordion modules={p.modules} />}
                {p.pipeline && <Pipeline stages={p.pipeline} />}
                {p.feature && <p className="feature">{p.feature}</p>}
                {p.links && p.links.length > 0 && <ProofLinks links={p.links} />}
              </Glass>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Competitive({ openModal }) {
  return (
    <section id="competitive" className="sec-pad">
      <div className="wrap">
        <SectionHead num="05" label="Competitive Work" title="Competitive _Work_"
          sub="Case competitions where the analysis had to hold up under judges, time pressure, and real financial constraints." />
        <div className="grid2">
          {COMPETITIONS.map((c, i) => (
            <Reveal key={c.title} delay={(i % 2) * 110}>
              <Glass className="ccard" onOpen={() => openModal("comp", c)}>
                <h3 className="b-title">{c.title}</h3>
                <MetricStrip metrics={c.metrics} />
                <p className="b-copy">{c.copy}</p>
                {c.links && c.links.length > 0 && <ProofLinks links={c.links} />}
              </Glass>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Methods() {
  const [open, setOpen] = useState(0);
  return (
    <section id="methods" className="sec-pad">
      <div className="wrap">
        <SectionHead num="06" label="Methods" title="How I _Work_"
          sub="The tools change. The method stays pretty consistent." />
        <Reveal>
          <div>
            {METHODS.map((m, i) => (
              <div key={m.n}
                className={"mrow" + (open === i ? " open" : "")}
                onMouseEnter={() => setOpen(i)}
                onClick={() => setOpen(open === i ? -1 : i)}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpen(open === i ? -1 : i); } }}
                role="button" tabIndex={0} aria-expanded={open === i}>
                <span className="m-bar" />
                <div className="mrow-in">
                  <span className="m-n">{m.n}</span>
                  <span className="m-t">{m.title}</span>
                  <span className="m-plus">+</span>
                </div>
                <div className="m-desc"><p>{m.desc}</p></div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="sec-pad">
      <div className="wrap">
        <SectionHead num="07" label="About" title="A little more _about me_" accent="h-it-v" />
        <div className="about-grid">
          <div className="pull">
            <Kinetic as="div" className="p-big" stagger={55}
              text="Strong analysis turns complexity into judgment people can trust and _decisions they can act on._" />
            <Reveal delay={400}><div className="p-sig">Rishita Korapati</div></Reveal>
          </div>
          <div className="about-copy">
            {ABOUT.map((p, i) => (
              <Reveal key={i} delay={i * 90}><p>{p}</p></Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Connect() {
  return (
    <section id="connect" className="sec-pad connect">
      <div className="wrap">
        <Reveal>
          <div className="eyebrow" style={{ justifyContent: "center" }}>
            <span className="en">08</span> Connect
          </div>
        </Reveal>
        <Kinetic as="h2" className="h-serif h-xl" text="Let's _Connect._" />
        <Reveal delay={200}>
          <p className="sub">
            I'm always open to conversations around analytics, finance, AI, product, startups, or
            career opportunities. Whether you're hiring, building, researching, or just thinking
            through a hard problem, I'd love to connect.
          </p>
        </Reveal>
        <Reveal delay={320}>
          <a className="email" href={LINKS.email}>korapatirishita@gmail.com</a>
        </Reveal>
        <Reveal delay={420}>
          <div className="cta-row">
            <Magnetic>
              <a className="btn btn-solid" href={LINKS.email}>Email Me <span className="arr">→</span></a>
            </Magnetic>
            <Magnetic>
              <a className="btn btn-blue" href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn <span className="arr">↗</span>
              </a>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="foot-in">
        <div>
          <div className="foot-brand">RK<b>.</b>SPACE</div>
          <div className="foot-tag">Creative data builder working across finance, analytics, and AI.</div>
          <div className="foot-links">
            <a className="plink" href={LINKS.github} target="_blank" rel="noopener noreferrer">GitHub <span className="arr">↗</span></a>
            <a className="plink" href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <span className="arr">↗</span></a>
            <a className="plink" href={LINKS.email}>Email Me <span className="arr">→</span></a>
          </div>
        </div>
        <div className="foot-meta">© 2026 Rishita Korapati · Signals over noise</div>
      </div>
    </footer>
  );
}

/* ----------------------------- MODAL ----------------------------- */

function Modal({ modal, onClose }) {
  useEffect(() => {
    if (!modal) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [modal, onClose]);

  if (!modal) return null;
  const { kind, item } = modal;

  const title = item.org || item.title;
  const kickerMap = { xp: "Experience", builder: "Builder Mode", project: "Project", comp: "Competitive Work" };
  const paras = item.lines
    || (item.context ? [item.context] : item.desc ? [item.desc] : item.copy ? [item.copy] : []);
  const moreList = item.more || item.bullets;
  const quote = item.impact || item.feature;
  const roleLine = kind === "builder" ? null : item.role;

  return (
    <div className="overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog" aria-modal="true" aria-label={title}>
      <div className="modal">
        <button className="m-close" onClick={onClose} aria-label="Close details">✕</button>
        <div className="mo-kicker">
          {kickerMap[kind]}
          {kind === "builder" && item.role ? " · " + item.role : ""}
          {item.kicker ? " · " + item.kicker : ""}
        </div>
        <h3 className="mo-title">{title}</h3>
        {roleLine && (
          <div className="mo-role">
            <span className="r1">{roleLine}</span>
            {item.roleSub && <span className="r2">{item.roleSub}</span>}
          </div>
        )}
        <MetricStrip metrics={item.metrics} go={true} />
        <div className="mo-paras">
          {paras.map((p, i) => <p key={i}>{p}</p>)}
        </div>
        {quote && <p className="impact">{quote}</p>}
        {item.modules && (
          <>
            <div className="mo-label">Modules</div>
            <div className="modules">
              {item.modules.map((m) => {
                const name = m.name || m;
                return (
                  <div className="module" key={name}>
                    <span className="m-dot" />
                    <span>
                      {name}
                      {m.detail && <span className="mod-d">{m.detail}</span>}
                    </span>
                  </div>
                );
              })}
            </div>
          </>
        )}
        {item.pipeline && (
          <>
            <div className="mo-label">Pipeline</div>
            <Pipeline stages={item.pipeline} />
          </>
        )}
        {moreList && (
          <>
            <div className="mo-label">Inside the work</div>
            <ul className="mo-more">
              {moreList.map((m, i) => <li key={i}>{m}</li>)}
            </ul>
          </>
        )}
        {item.tags && (
          <div className="tagrow">
            {item.tags.map((tg) => <span className="tag" key={tg}>{tg}</span>)}
          </div>
        )}
        {item.links && item.links.length > 0 && (
          <>
            <div className="mo-label">Proof</div>
            <ProofLinks links={item.links} />
          </>
        )}
      </div>
    </div>
  );
}

/* ----------------------------- APP ----------------------------- */

const HUE_MAP = {
  hero: "c-coral", signal: "c-blue", experience: "c-violet", builder: "c-coral",
  projects: "c-blue", competitive: "c-violet", methods: "c-coral", about: "c-blue", connect: "c-violet",
};

export default function App() {
  const [active, setActive] = useState("hero");
  const [pct, setPct] = useState(0);
  const [modal, setModal] = useState(null);
  const reduced = useReducedMotion();

  /* section spy */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }); },
      { rootMargin: "-38% 0px -55% 0px", threshold: 0 }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  /* page progress for the tracker */
  useEffect(() => {
    let raf = null;
    const fn = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const p = Math.round(clamp01(window.scrollY / Math.max(max, 1)) * 100);
        setPct((prev) => (prev === p ? prev : p));
      });
    };
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    window.addEventListener("resize", fn);
    return () => { window.removeEventListener("scroll", fn); window.removeEventListener("resize", fn); };
  }, []);

  const openModal = (kind, item) => setModal({ kind, item });
  const hue = HUE_MAP[active] || "c-coral";

  return (
    <div className="rk">
      <style>{CSS}</style>
      <FieldCanvas reduced={reduced} />
      <div className="gridlines" aria-hidden="true" />
      <div className={"hue c-coral " + (hue === "c-coral" ? "on" : "")} />
      <div className={"hue c-blue " + (hue === "c-blue" ? "on" : "")} />
      <div className={"hue c-violet " + (hue === "c-violet" ? "on" : "")} />
      <div className="grain" aria-hidden="true" />

      <TopNav active={active} />
      <Tracker active={active} pct={pct} />
      <Dock active={active} />

      <main>
        <Hero reduced={reduced} />
        <Story openModal={openModal} />
        <Experience openModal={openModal} />
        <Builder openModal={openModal} />
        <Projects openModal={openModal} />
        <Competitive openModal={openModal} />
        <Methods />
        <About />
        <Connect />
      </main>
      <Footer />

      <Modal modal={modal} onClose={() => setModal(null)} />
    </div>
  );
}
