export type Category = "Money & Trust" | "Field Problems" | "Machines";

export type Status = "Live" | "Shipped" | "Prototype" | "Building" | "Award";

export const statusClass: Record<Status, string> = {
  Live: "ok",
  Shipped: "ok",
  Award: "stamp",
  Prototype: "blue",
  Building: "warn",
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  category: Category;
  year: string;
  status: Status;
  featured?: boolean;
  role: string;
  summary: string;
  problem: string;
  decisions: string[];
  highlights: string[];
  facts: [string, string][];
  stack: string[];
  live?: string;
  code?: string;
  /** Written work behind the project: memos, plans, PRDs, study write-ups. */
  docs?: [string, string][];
  note?: string;
  image?: string;
  imageAlt?: string;
};

export const profile = {
  name: "Zenith Joshua J",
  short: "Zenith Joshua",
  headline: "Technical Product Manager & Systems Builder",
  pitch:
    "I've written the code, run the teams and read the data behind what I've built. I bring all three to the roadmap.",
  handle: "Jos-zenith",
  location: "Chennai, Tamil Nadu",
  email: "joshuajzenith@gmail.com",
  phone: "+91 74483 43632",
  phoneRaw: "+917448343632",
  github: "https://github.com/Jos-zenith",
  linkedin: "https://www.linkedin.com/in/zenith-joshua-7178a623a/",
  leetcode: "https://leetcode.com/u/Zenith_Joshua/",
  unstop: "https://unstop.com/u/zenitjos7470",
  site: "https://ejos-zenith.vercel.app",
  resume: "/resume",
  seeking: "Founder's Office and APM roles",
  /** Pre-filled email for the "send me a problem" offer. */
  problemMail:
    "mailto:joshuajzenith@gmail.com?subject=" +
    encodeURIComponent("A problem for a 1-page memo") +
    "&body=" +
    encodeURIComponent("The problem, in two sentences:\n\n\nWhat we've tried so far (optional):\n"),
  education: "B.Tech Information Technology, Loyola-ICAM College of Engineering & Technology (2023–2027)",
  languages: ["English", "Tamil", "German (A2)"],
};

export const projects: Project[] = [
  {
    slug: "operation-nolambur",
    title: "Trustify",
    tagline: "UPI mule detection for payment aggregators · Operation Nolambur",
    category: "Money & Trust",
    year: "2026",
    status: "Live",
    featured: true,
    role: "Solo: problem framing, data, rules, model, ingest, console",
    summary:
      "A payment aggregator's own risk layer for UPI. It scores every payment as it arrives with rules and a graph neural network, places graded holds on mule accounts and fake merchants' payouts, and logs every decision in a tamper-evident audit trail.",
    problem:
      "A Nolambur resident held under a fake CBI 'digital arrest' lost ₹22.5L. Scams like this pay in instalments under NPCI's ₹1 lakh per-transfer cap, into first-layer mules that forward the money within minutes. UPI fraud cost ₹981 crore across 12.64 lakh incidents in FY 2024–25. Banks watch their own accounts and I4C shares mule IDs, but only an aggregator sees its merchants' settlement accounts and payment-link traffic. Nobody was building for that view.",
    decisions: [
      "Rules sum over 1, 6 and 24 h windows, because a ₹5 lakh scam arrives as several transfers under the ₹1 lakh cap. A per-transfer threshold would either never fire or be trivially evaded.",
      "Graded actions, not a freeze button: alert, delay settlement, hold outbound, full hold. Restrictions only escalate automatically. Lifting one takes a person, an expiry or an appeal.",
      "Wrote every test protocol before opening its data, and published the failures. On real Elliptic data the GIN missed all three pass marks and a Random Forest beat it.",
      "Priced the alert queue: break-even precision is about 2.7% at 50 reviews a day. At the real UPI fraud rate the projected 0.4% isn't worth running as designed, and the README says so.",
      "Kept the graph model as a secondary signal. Rules, features and the hold policy do the work.",
    ],
    highlights: [
      "Ingest from webhook, Kafka, Kinesis or CSV replay. Offsets commit only after the engine does, with back-pressure at 20,000 queued and a dead-letter table",
      "Hash-chained audit log: each decision's SHA-256 covers the previous row, and one endpoint names the first altered row",
      "Role-based access for analyst, supervisor and admin; an outbox to the gateway webhook, the 1930 portal, SMS and a suspect registry (sandboxed)",
      "Merchant-side detectors that hold settlement payouts: every fake merchant flagged before its first settlement",
      "58–77% of mules caught on held-out days; 0 of 27 held accounts were innocent in a full replay",
      "4,900–6,150 payments a second on a 15 W laptop, each scored 0.3–0.7 s after arrival",
    ],
    facts: [
      ["Dataset", "83,067 payments · 5,680 accounts"],
      ["Held-out AP", "0.93 (ROC AUC 0.999)"],
      ["Mules caught", "58–77%"],
      ["Innocents held", "0 of 27"],
      ["Throughput", "4,900–6,150 / s"],
      ["Break-even precision", "≈ 2.7%"],
      ["Elliptic F1 (GIN)", "0.323 · failed"],
    ],
    stack: ["PyTorch Geometric", "GINe", "FastAPI", "SQLAlchemy", "Postgres", "Kafka", "Kinesis", "Neo4j", "Next.js", "d3", "Render"],
    live: "https://vict.onrender.com",
    code: "https://github.com/Jos-zenith/nolambur_case",
    docs: [["Read the evaluation, failures included", "https://github.com/Jos-zenith/nolambur_case#readme"]],
  },
  {
    slug: "compintel",
    title: "CompIntel",
    tagline: "SaaS unit economics → compensation intelligence",
    category: "Money & Trust",
    year: "2026",
    status: "Live",
    featured: true,
    role: "Solo: product, modelling, web app",
    summary:
      "Predicts a P25/P50/P75 salary range for roles at Indian SaaS companies using the company's actual business health, not just its funding stage.",
    problem:
      "Two SaaS companies at the same funding round can have very different ability to pay. Salary tools that only use a stage label can't tell them apart.",
    decisions: [
      "Built a health score from real unit economics: Rule of 40 (30%), NDR (30%), LTV:CAC (20%) and ARR per employee (20%). It's documented as my own weighting, not an industry formula.",
      "Returned a range with SHAP explanations instead of a single number, so users can see what drove the estimate.",
      "Made the cross-border vs. domestic pay premium a named, testable function rather than a hidden constant.",
      "Benchmarked against a linear baseline and checked with 5-fold cross-validation (R² 0.959 ± 0.003), so the held-out score isn't a lucky split.",
      "Kept the first version, which converted a US model's output with a flat exchange rate, in the archive with a note on why it was wrong.",
    ],
    highlights: [
      "What-if slider that recomputes the range live as health changes",
      "Side-by-side offer comparison between two companies",
      "SaaS metrics calculator: ARR, CAC, LTV, NDR, Rule of 40, Magic Number, TAM/SAM/SOM",
      "Offer compliance check against wage-code, HRA, EPF and gratuity rules",
      "CTC breakup (Basic, HRA, EPF, gratuity, LTA, bonus) that sums exactly to the median estimate",
    ],
    facts: [
      ["Model", "Quantile gradient boosting"],
      ["R² (P50)", "0.961 vs 0.884 baseline"],
      ["MAE", "±1.95 LPA (baseline ±3.80)"],
      ["Training data", "~24,500 rows, synthetic, benchmark-calibrated"],
      ["Output", "P25 / P50 / P75 CTC"],
      ["Explainability", "SHAP per feature"],
    ],
    stack: ["Python", "scikit-learn", "SHAP", "Pandas", "Flask", "fpdf2"],
    live: "https://salary-predictor-e72v.onrender.com/",
    code: "https://github.com/Jos-zenith/Salary_Predictor",
  },
  {
    slug: "sovereign-faas",
    title: "VICT Sovereign FaaS",
    tagline: "Compliance-first serverless platform for India",
    category: "Money & Trust",
    year: "2026",
    status: "Live",
    featured: true,
    role: "Architecture, compliance model, demo portal",
    summary:
      "A compliance-first platform for digital lenders. The DPDP Act's consent rules and RBI's data rules are enforced by the platform, so product teams don't rebuild compliance in every service, and an NBFC partner can check the audit trail for itself.",
    problem:
      "Lending service providers and their NBFC partners need consent and data-localisation guarantees they can prove to an auditor. A line in a config file saying 'compliant' isn't proof, and the NBFC has to trust the LSP's own logs.",
    decisions: [
      "Made compliance a platform layer: every request passes a consent gateway before it reaches any function.",
      "Added a consent-gated egress proxy and a thin SDK, so an LSP can enforce consent on outbound calls without rewriting its code into Wasm.",
      "Let the NBFC checkpoint the ledger. A dishonest LSP can rebuild a chain that still verifies, but it no longer matches the NBFC's checkpoint.",
      "Ran functions in a WebAssembly sandbox for isolation, with eBPF rules watching behaviour at runtime, and wrote an L1–L5 maturity model as the roadmap.",
    ],
    highlights: [
      "Seven 'try to break it' demo missions, including withdrawing consent mid-stream and rewriting the log as a dishonest LSP",
      "Egress blocked for any host not on the allow-list, before the network call is made",
      "A regulation page mapping RBI's Digital Lending Directions and the DPDP Act to what the platform enforces",
      "Self-host guide for AWS Mumbai with costs, open gaps and a production-readiness plan",
    ],
    facts: [
      ["Users", "Lending LSPs + NBFC partners"],
      ["Entry", "Consent Gateway"],
      ["Egress", "Consent-gated CONNECT proxy"],
      ["Isolation", "Wasm runtime"],
      ["Enforcement", "eBPF · Falco / Tetragon"],
      ["Residency", "AWS Mumbai / Hyderabad"],
    ],
    stack: ["Python", "FastAPI", "WebAssembly", "eBPF", "AWS Graviton", "SigNoz"],
    live: "https://vict-os.vercel.app",
    code: "https://github.com/Jos-zenith/Sovereign-Portal",
  },
  {
    slug: "uzhavan",
    title: "Uzhavan",
    tagline: "Offline-first digital agriculture platform",
    category: "Field Problems",
    year: "2026",
    status: "Live",
    featured: true,
    role: "Product lead and full-stack developer",
    summary:
      "A farmer-services platform for Tamil Nadu that keeps working without signal, built on an SDK that makes every feature prove its value.",
    problem:
      "Field work happens in low-connectivity areas, and teams struggle to show whether a feature helped because every feature tracks different numbers.",
    decisions: [
      "Offline first: local storage plus a sync queue with retries and status tracking.",
      "Introduced 'measure before ship': a feature can't be released without a KPI, a telemetry event and an ROI hook.",
      "Built telemetry, governance, attribution and ROI as SDK modules, so every new module inherits them.",
    ],
    highlights: [
      "8+ modules: subsidy registration, seed and fertiliser stock, machinery, market prices, weather and reservoirs, officer directory, pest ID",
      "Standardised telemetry schema with a KPI catalogue",
      "Release-readiness governance checks",
      "Its ROI layer grew into a product of its own: Impact Ledger, the next page",
    ],
    facts: [
      ["Modules", "8+"],
      ["Mode", "Offline-first"],
      ["Analytics", "PostHog"],
      ["Storage", "expo-sqlite"],
    ],
    stack: ["React 19", "TypeScript", "React Native Web", "Expo", "PostHog", "Jest"],
    live: "https://victo-sdk.vercel.app/",
    code: "https://github.com/Jos-zenith/uzhavan",
  },
  {
    slug: "impact-ledger",
    title: "Impact Ledger",
    tagline: "Feature ROI, measured honestly",
    category: "Field Problems",
    year: "2026",
    status: "Live",
    featured: true,
    role: "Solo: process design, telemetry SDK, statistics, dashboard",
    summary:
      "A process and telemetry system that makes every feature prove its value in rupees before it scales, and switches it off on its own if it causes harm.",
    problem:
      "Features ship with ad-hoc or missing metrics, so nobody can prove whether they earn revenue, cut cost or improve experience. Investment decisions become political.",
    decisions: [
      "Spec before code: each feature declares 1–3 primary KPIs from a shared catalogue, each with a baseline, a target and a ₹ value range with its source, plus up to 2 guardrail KPIs it must not make worse.",
      "An attribution plan with a power check (A/B test, phased rollout, or pre/post with holdout districts), so no test starts that can't reach a verdict.",
      "Four-way sign-off: product, engineering and analytics approve the spec, and finance approves the ₹ values. Each signer is named and logged.",
      "Release gate: a feature can't ship until every event its KPIs need is already arriving.",
      "Fixed-horizon tests (Holm-corrected) give the verdict; always-valid sequential tests (mSPRT) watch live. Only proven effects become rupees, shown as a low / base / high band.",
    ],
    highlights: [
      "Kill switch: guardrails are re-tested on every batch of events, and significant harm serves the control version to everyone and opens an incident",
      "Holdout netting caught a 'win' that was really the harvest season. Naive pre/post would have scaled it",
      "Sample-ratio-mismatch check on every split; difference-in-differences for seasonal KPIs",
      "Shared SDK with consent, an offline queue and gzip; a versioned event schema with a personal-data guard",
      "Live view over Server-Sent Events: running tests, sample size per group against the minimum, days until decidable",
      "Scale opens a roadmap ticket; retire opens a removal ticket with its monthly saving",
    ],
    facts: [
      ["Gates", "Spec · development · release"],
      ["Statistics", "Holm · mSPRT · SRM · DiD"],
      ["Warehouse", "Postgres (Neon)"],
      ["Demo data", "Illustrative scenario with known true effects"],
    ],
    stack: ["Next.js", "TypeScript", "Prisma", "Postgres", "Server-Sent Events", "Vercel"],
    live: "https://victo-delta.vercel.app/",
    code: "https://github.com/Jos-zenith/uzhavan_roi",
  },
  {
    slug: "blastwatch",
    title: "BlastWatch",
    tagline: "Rice blast early warning for field officers",
    category: "Field Problems",
    year: "2026",
    status: "Live",
    role: "Solo: product, data pipeline, risk model, officer view",
    summary:
      "Combines FAOSTAT crop data, GenBank resistance genes and live weather into a district-level rice blast warning for agricultural officers across 18 rice-growing districts of Tamil Nadu, including all seven Cauvery delta districts.",
    problem:
      "Rice blast spreads on warm, wet nights. The warning that would get farmers scouting in time rarely reaches the block officer who could send it, and a forecast that triggers blanket spraying does more harm than good.",
    decisions: [
      "Built for the officer, not the farmer: officers get an action per district and a ready-made Tamil and English message to review and forward. Farmers never need the dashboard.",
      "Every message says scout first, spray only if lesions are found, because the model forecasts weather that favours blast, not outbreaks.",
      "An alert fires only when 2 of the next 3 days are High, the forecast is fresh, and the district had no alert in the last 5 days. That keeps alert fatigue down.",
      "Leaf wetness comes from the best signal available each hour: field sensor, then modelled leaf wetness, then dew-point depression, then humidity. The officer view shows which one was used.",
    ],
    highlights: [
      "Forecast confidence from 122 ensemble members (ECMWF, GEFS, ICON): each night shows the chance of High risk and where weather centres disagree",
      "Provider fallback (Open-Meteo, then MET Norway) with retries, and fresh / stale / expired states that pause alerts on old data",
      "A field advisor in Tamil and English that scores one field by weather, variety, crop stage, nitrogen and water, with the IRRI EPIRICE model as a second opinion",
      "Consent-first farmer enrolment: officers forward stage-specific alerts from an outbox, record replies, and confirm or reject reports after a field visit",
      "A data source counts as live only when the path from retrieval to risk engine runs and is logged; everything else is labelled backtest-only or not integrated",
      "States its main limit up front: a weather-favourability score, not yet calibrated against outbreak data",
    ],
    facts: [
      ["Districts", "18 (Tamil Nadu pilot)"],
      ["Refresh", "Every 3 h · ensemble every 6 h"],
      ["Ensemble", "122 members"],
      ["Risk model", "rules-v3 + EPIRICE"],
      ["Sources", "FAOSTAT · GenBank · Open-Meteo"],
    ],
    stack: ["Python", "FastAPI", "SQLAlchemy", "PostgreSQL", "Vue 3", "Server-Sent Events", "APScheduler", "Render"],
    live: "https://blast-watch.onrender.com/",
    code: "https://github.com/Jos-zenith/BlastWatch",
  },
  {
    slug: "vina",
    title: "Vina",
    tagline: "Billing that collects itself, books that become credit",
    category: "Money & Trust",
    year: "2026",
    status: "Live",
    featured: true,
    role: "Solo: strategy memo, PRDs, product, engine, tests",
    summary:
      "Billing, stock and GST for Indian small shops on a cheap phone, with or without internet. Every bill's UPI QR confirms its own payment, and a Credit Passport turns the shop's own books into loan-readiness evidence. Formerly MSME Builder.",
    problem:
      "A shop's bill stops being useful once it's printed. Static UPI QRs carry no bill reference, so owners match credits to bills by hand every evening and can't tell a real payment from a fake screenshot. Merchant UPI earns no MDR, so there's no business in payment fees, and lenders turn shops away for lack of cash-flow data they can verify.",
    decisions: [
      "Wrote the strategy memo before the code: every bill collectable (Smart Collect), every payment provable (the bank's UTR on the record), the history financeable (Credit Passport). Three PRDs and a technical design followed.",
      "Smart Collect gives each bill's QR its own reference. The bank's signed webhook marks that bill paid with the UTR on every device, a reused UTR is refused, and a typed or copied UTR never counts as bank-confirmed.",
      "Credit Passport scores 0–100 across 8 explainable factors and suggests a limit on the Nayak Committee 20%-of-turnover norm. It's labelled indicative, and the consented export never includes customer names or individual bills.",
      "Started from six real Vyapar complaints and reproduced each one with real keystrokes in a browser test before fixing it.",
      "Local-first with no frameworks and no build step: the whole app is about 130 KB gzipped and keeps billing through an outage.",
    ],
    highlights: [
      "A first bill in one question: the app opens on the billing counter and shows the stock it moved and the receipt it prepared",
      "GST that files: CGST/SGST/IGST split live, GSTR-1 JSON and CSV, GSTR-3B with ITC set-off, e-way bill JSON",
      "Owner and staff PINs: staff can bill but never see cost prices, settings or the Credit Passport",
      "Drag-and-drop forms, if–then workflows and dashboards in English, Hindi, Tamil and Telugu",
      "Renamed without breaking a single shop: old databases, backups and caches all carry over, with tests",
      "139 unit tests and 32 browser scenarios, run in CI on Linux and Windows. An 'Honest limits' section lists what still breaks",
    ],
    facts: [
      ["Size", "≈ 130 KB gzipped"],
      ["Credit factors", "8, explainable"],
      ["Payments", "UPI, bank-confirmed by UTR"],
      ["Languages", "4"],
      ["Tests", "139 unit · 32 browser"],
      ["Docs", "Strategy memo · 3 PRDs · tech design"],
    ],
    stack: ["JavaScript", "IndexedDB", "Service Worker", "Node.js", "UPI webhooks", "Puppeteer", "node:test"],
    live: "https://eazylogs.vercel.app",
    code: "https://github.com/Jos-zenith/VIna",
    docs: [
      ["Strategy memo: from khata to credit", "https://github.com/Jos-zenith/VIna/blob/main/docs/strategy/khata-to-credit.md"],
      ["PRDs", "https://github.com/Jos-zenith/VIna/tree/main/docs/prd"],
    ],
  },
  {
    slug: "engineerfit",
    title: "EngineerFit",
    tagline: "Psychometric job profiling for early-career engineers",
    category: "Field Problems",
    year: "2026",
    status: "Live",
    featured: true,
    role: "Product and engineering",
    summary:
      "Measures engineering students on problem-solving evidence instead of resume polish, and gives recruiters an explained fit score.",
    problem:
      "Capable graduates from tier-2 and tier-3 colleges get filtered out on fluency and pedigree before anyone sees how they think.",
    decisions: [
      "An adaptive IRT test picks each next question based on the candidate's answers so far.",
      "Deterministic matching: the same candidate and role always give the same, explainable score.",
      "Built two surfaces from one engine: a student career-fit report and a recruiter screening dashboard.",
    ],
    highlights: [
      "IRT-driven adaptive assessment",
      "Recruiter dashboard with threshold-based screening",
      "Vector similarity between roles and candidates",
      "PDF reports for students",
    ],
    facts: [
      ["Scoring", "IRT adaptive"],
      ["Matching", "Vector similarity"],
      ["Users", "Students + recruiters"],
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "Prisma", "NextAuth", "Recharts", "Tailwind"],
    live: "https://victengineerfit.vercel.app/",
    code: "https://github.com/Jos-zenith/engineerfit_",
  },
  {
    slug: "ai-usage-monitor",
    title: "AI Usage Monitor",
    tagline: "Safe prompt capture and agent governance",
    category: "Money & Trust",
    year: "2026",
    status: "Live",
    featured: true,
    role: "Research, prioritisation and build",
    summary:
      "Lets a company see how employees and agents use AI tools without storing anything sensitive.",
    problem:
      "After the 2023 Samsung–ChatGPT leak, companies want to know what goes into AI tools, but a log of raw prompts is itself a data leak.",
    decisions: [
      "Started from three personas (an engineer who never opens dashboards, a governance lead who needs evidence, a sceptical backend engineer), then used a priority–impact matrix.",
      "Put the effort into two things: redacting prompts before storage, and comparing each agent's declared data scope with what it actually accessed.",
      "Documented a capability matrix of what the system cannot see, instead of claiming full visibility.",
    ],
    highlights: [
      "PII redaction with regex, a Luhn check for card numbers and NER for names",
      "Per-tool monitoring toggle without a redeploy",
      "Tests that check real effects, not just HTTP 200 responses",
      "Caught a raw-vs-sanitised text bug before release",
    ],
    facts: [
      ["PII detection", "Regex + Luhn + NER"],
      ["Raw text stored", "Never"],
      ["Agent audit", "Declared vs observed"],
    ],
    stack: ["Python", "FastAPI", "React", "NER"],
    live: "https://vict-ai.vercel.app",
    code: "https://github.com/Jos-zenith/FLY.AI",
  },
  {
    slug: "vict-emotion-cipher",
    title: "VICT Emotion Cipher",
    tagline: "Encryption keyed by emotional fingerprints",
    category: "Money & Trust",
    year: "2026",
    status: "Live",
    role: "Concept, cryptography design, UI",
    summary:
      "Secure messaging where the sender's emotion is part of the key, so the same text sent with a different emotion produces completely different ciphertext.",
    problem:
      "Messaging apps treat tone as metadata that anyone can read or strip away. I wanted to test whether tone could be bound into the encryption itself.",
    decisions: [
      "SHA-256 of the emotion mix salts a PBKDF2 key derivation with 600,000 iterations.",
      "Every message gets a random IV, so repeated messages never produce the same ciphertext.",
      "A versioned header keeps emotions readable while the payload stays sealed, and older formats still decrypt.",
    ],
    highlights: [
      "Emotion confidence scores (for example Joy 92%, Anxiety 45%)",
      "The UI changes colour to reflect the detected emotion",
      "One-click copy and a scramble-reveal animation",
    ],
    facts: [
      ["Cipher", "AES-256"],
      ["KDF", "PBKDF2 · 600K"],
      ["Header", "v1.0 | EMO | DATA"],
    ],
    stack: ["JavaScript", "TypeScript", "Web Crypto", "CSS"],
    live: "https://vict-emotion-cipher.vercel.app",
    code: "https://github.com/Jos-zenith/mini-Emotion-Cipher",
  },
  {
    slug: "victori",
    title: "HCCMS",
    tagline: "Household carbon-credit monitoring",
    category: "Machines",
    year: "2026",
    status: "Live",
    role: "System design, firmware, dashboard · Team Tech Bloomers",
    summary:
      "Links a household's real emissions to the carbon its own trees absorb, using low-cost ESP32 sensor modules and a cloud carbon engine that turns the result into a Green Score and carbon credits.",
    problem:
      "Tree planting is encouraged but never measured, and households have no simple, trustworthy way to link their emissions to the trees they look after. In Chennai, city-wide air averages hide hotspots running 30% above them.",
    decisions: [
      "Measured tree carbon the way foresters do: the Chave et al. (2014) equation from wood density, trunk diameter and height. Only growth earns credit.",
      "Sensors drive care alerts and the Tree Care score but never change the carbon figures. The MQ135 reading is shown as an indicative trend only.",
      "Vehicle CO₂ comes from fuel bought × IPCC factors, the standard inventory method, not from a sensor that mostly measures the street.",
    ],
    highlights: [
      "6-hour on-device ring buffer with batched, idempotent uploads keyed by device and timestamp",
      "Per-device bearer keys and server-side plausibility checks against tampering",
      "Three modules: tree, leaf camera, and vehicle and ambient air",
      "ResNet50 bark-species ID and a leaf-colour care signal, run on the server",
    ],
    facts: [
      ["Hardware", "ESP32 · ESP32-CAM"],
      ["Carbon model", "Chave et al. 2014"],
      ["Offline buffer", "6 h"],
      ["Backend", "Next.js · PostgreSQL"],
      ["Team", "Tech Bloomers, LICET"],
    ],
    stack: ["ESP32", "Arduino", "Next.js", "PostgreSQL", "PyTorch", "Vercel"],
    live: "https://tree-care-omega.vercel.app",
    code: "https://github.com/Jos-zenith/HCCMS",
  },
  {
    slug: "vgate",
    title: "vgate",
    tagline: "ECG signal-quality gating against false alarms",
    category: "Machines",
    year: "2026",
    status: "Building",
    role: "Final-year project: study design, detectors, C core, ESP32-S3 firmware",
    summary:
      "A pre-registered study of whether a signal-quality gate cuts false ventricular-beat alarms on a wearable chest strap better than raising the classifier's threshold. The gate looked good in-sample, didn't transfer, and was dropped. v1.0 is frozen without it. A research proof of concept, not a medical device.",
    problem:
      "ECG monitors raise so many false alarms on noisy signal that staff learn to tune them out, and the usual fix, a stricter threshold, also hides real beats.",
    decisions: [
      "Pre-registered every study before running it, with the pass bar written down, and locked the test set in code: the loader refuses DS2 records unless the frozen run asks for them.",
      "Dropped the gate when the evidence said to. It gave 31% fewer false alarms than a raised threshold (95% CI 22.8–40.9%), but those operating points were matched on the test set. Cut-offs fixed in advance didn't transfer to unseen noise.",
      "Froze v1.0 as threshold-only, with signal-quality shown to a reviewer but never used as a decision.",
      "Ported the full chain to a C core with fixed-size state and no dynamic allocation, generated from the frozen config, so the ESP32 runs exactly what was validated.",
    ],
    highlights: [
      "C and Python agree on 536,821 beats across 220 record copies; all 14 features are bit-identical",
      "Beat detection on clean data: 99.7% sensitivity, 99.0% positive predictivity",
      "V-beat retention 0.91 on held-out patients, with false alarms per hour reported for every noise type and level",
      "Phase 2 (real strap noise and a reference Holter) pre-registered, with an ethics application drafted",
    ],
    facts: [
      ["Data", "MIT-BIH + NSTDB"],
      ["Split", "Inter-patient, test set locked"],
      ["V retention", "0.91 (held-out patients)"],
      ["Gate", "Tried, didn't transfer, dropped"],
      ["Target", "ESP32-S3 · ≈ 160 KB state"],
    ],
    stack: ["Python", "SciPy", "C", "CMake", "ESP32-S3"],
    code: "https://github.com/Jos-zenith/vict",
    docs: [["Read the study write-up", "https://github.com/Jos-zenith/vict#readme"]],
  },
  {
    slug: "intellect",
    title: "Intellect",
    tagline: "Study-to-grade copilot",
    category: "Field Problems",
    year: "2026",
    status: "Live",
    role: "Product and build · Design Spark Challenge '26 (Purple Fabric AI)",
    summary:
      "Connects what is taught, what is studied and how answers are graded through one knowledge base. Students see where they'll lose marks; teachers get criterion-level feedback with every source cited.",
    problem:
      "Faculty don't trust AI marks they can't trace, and students practise for exams without knowing what was actually taught or how the rubric scores an answer.",
    decisions: [
      "Anything that has to be right is computed in code, not by the model: topic coverage from the lesson log, the total mark, the grade band.",
      "Every mark needs a quote from the student's draft, checked word for word in code. A quote that isn't there is discarded and the mark is flagged for a human.",
      "A range, not a point: each criterion carries a low–high band, and accuracy is claimed only after teachers enter real marks.",
      "BM25 retrieval rebuilt per query, so a newly logged class is searchable immediately. A corpus this small doesn't need an embedding service.",
    ],
    highlights: [
      "An off-topic gate forces an answer to the wrong question to 0",
      "Handwritten pages are transcribed, corrected by the student, then graded",
      "Calibration loop: a teacher's corrections become cited context for future grading",
      "One logged class ripples through: lesson → topic status → study session → practice question, with the diff computed in code",
      "Recorded results and fallbacks, so the demo never waits on the API",
    ],
    facts: [
      ["Knowledge base", "24 lessons · 27 past questions"],
      ["Grading", "Per criterion, low–high band"],
      ["Retrieval", "BM25 + agent tools"],
      ["Model", "Claude, structured output"],
    ],
    stack: ["Next.js", "TypeScript", "Claude API", "Structured output", "BM25"],
    live: "https://intellect-ochre.vercel.app",
    code: "https://github.com/Jos-zenith/intellect",
  },
  {
    slug: "soilsense",
    title: "SoilSense Thozhan",
    tagline: "Tamil-first soil prescriptions for small farmers",
    category: "Field Problems",
    year: "2026",
    status: "Prototype",
    role: "Product design and front-end",
    summary:
      "Turns TNAU soil science into plain fertiliser advice, read aloud in Tamil, and works offline.",
    problem:
      "Blanket fertiliser doses waste money, and soil-test science rarely reaches marginal farmers in a form they can use.",
    decisions: [
      "Shows rupees saved per hectare first and chemistry second.",
      "Tamil voice output and a 16px minimum font size for reading outdoors.",
      "Offline PWA with the full 50-crop database cached on the device.",
    ],
    highlights: ["STCR-IPNS prescription engine", "Yield-gap and ROI dashboard", "Community-leader view for self-help groups"],
    facts: [
      ["Crops", "50"],
      ["Mode", "Offline PWA"],
      ["Language", "Tamil voice"],
    ],
    stack: ["Vue 3", "Pinia", "PrimeVue", "Chart.js", "Web Speech API"],
    code: "https://github.com/Jos-zenith/soilsense",
  },
  {
    slug: "parkintoday",
    title: "ParkinToday",
    tagline: "Real-time smart parking",
    category: "Machines",
    year: "2024–26",
    status: "Shipped",
    featured: true,
    role: "Co-founder & CTO",
    summary:
      "An IoT startup that shows drivers live parking availability in busy Indian cities. I took it from concept to launch.",
    problem:
      "Drivers in tier-1 cities spend a long time circling for parking, and lot operators have no live view of how their space is used.",
    decisions: [
      "Owned product vision, roadmap and technical execution, keeping business goals and user needs aligned.",
      "Started from 200+ conversations with drivers in Chennai and turned them into prioritised features: live occupancy, discovery, booking and payments.",
      "Balanced sensor cost against accuracy for a network of IoT sensors with a cloud backend and mobile app.",
    ],
    highlights: [
      "Pitched to investors and judges at several business competitions",
      "5th place, KSR Innovative Business Pitch",
      "Best pitch recognition for real-time parking management",
    ],
    facts: [
      ["Role", "Co-founder & CTO"],
      ["Period", "Sep 2024 – Jan 2026"],
      ["User research", "200+ driver conversations"],
      ["Stack", "IoT + cloud + mobile"],
    ],
    stack: ["ESP32", "IoT sensors", "Cloud backend", "Mobile app"],
    live: "https://parkin-olive.vercel.app/",
    image: "/img/parkintoday-logo.jpg",
    imageAlt: "ParkinToday logo: a P shaped like a location pin",
  },
  {
    slug: "gesture-wheelchair",
    title: "Gesture Wheelchair",
    tagline: "Hand-gesture controlled mobility",
    category: "Machines",
    year: "2023",
    status: "Award",
    role: "Hardware and firmware",
    summary: "An IoT wheelchair that people with limited mobility can steer with hand gestures.",
    problem: "Joystick wheelchairs are hard to use for people with limited grip or hand control.",
    decisions: ["Gesture sensing mapped to motor control", "Kept costs low with off-the-shelf microcontrollers"],
    highlights: ["1st place at Envision '23 with a ₹10,000 prize"],
    facts: [["Result", "1st · Envision '23"]],
    stack: ["Arduino", "Accelerometer", "Motor drivers"],
    code: "https://github.com/Jos-zenith/Gesture-controlled-Wheelchair",
  },
  {
    slug: "mars-rover",
    title: "Storm-Resilient Rover",
    tagline: "Sandstorm-resistant Mars rover concept",
    category: "Machines",
    year: "2026",
    status: "Prototype",
    role: "Hardware Hackathon 2.0",
    summary: "A rover designed to keep navigating through sandstorms.",
    problem: "Dust storms blind cameras and clog mechanisms, which ends many rover missions.",
    decisions: ["Sealed mechanical design", "Navigation that doesn't depend on cameras alone"],
    highlights: ["Built at Hardware Hackathon 2.0"],
    facts: [["Event", "Hardware Hackathon 2.0"]],
    stack: ["Embedded C", "Sensors", "Navigation"],
    code: "https://github.com/Jos-zenith/sand-strom-resistant-rover",
    image: "/img/rover-cad.jpg",
    imageAlt: "CAD render of the sealed rover body",
  },
];

export const chapters: { id: string; num: string; name: Category; title: string; intro: string; note: string; featured: string }[] = [
  {
    id: "money",
    num: "1",
    name: "Money & Trust",
    title: "Where money moves, someone is trying to take it.",
    intro:
      "I like building the parts of a system that make people trust it: fraud detection, consent, encryption, and metrics that tell the truth. Most of my recent work lives here.",
    note: "the chapter I keep adding pages to",
    featured: "operation-nolambur",
  },
  {
    id: "field",
    num: "2",
    name: "Field Problems",
    title: "Start from the person in the field, then work back to the tech.",
    intro:
      "Farmers without signal. Officers who hear about crop disease too late. Shops stuck with billing apps they can't change. Graduates filtered out for their accent. These projects began with a person and a constraint, not a framework.",
    note: "offline first, always",
    featured: "uzhavan",
  },
  {
    id: "machines",
    num: "3",
    name: "Machines",
    title: "Hardware taught me to plan before I build.",
    intro:
      "Before I wrote product specs I was wiring motors and cutting chassis. You can't patch a car after the weld, so you think harder up front. I bring that habit to software.",
    note: "grease under the fingernails",
    featured: "parkintoday",
  },
];

export const categories: Category[] = chapters.map((c) => c.name);

export type Kind = "Work" | "Venture" | "Leadership" | "Education";

export type Role = {
  period: string;
  title: string;
  org: string;
  kind: Kind;
  current?: boolean;
  /** Left off the one-page résumé; still shown on the site. */
  minor?: boolean;
  body: string;
};

export const experience: Role[] = [
  {
    period: "Oct 2026 – now",
    title: "Founding Keeper",
    org: "The Rookery",
    kind: "Venture",
    current: true,
    body: "Founded an 8-week online builder programme: cohorts of 25–30 students in huddles of 4–5, each shipping a fix for a real problem sponsored by a local clinic, NGO or shop. Designed the programme, the level system and the sponsor model, and built the site.",
  },
  {
    period: "Jun 2026 – 2026",
    title: "Associate Product Manager Intern",
    org: "Upskillmate",
    kind: "Work",
    body: "Research competitor landscapes, find market gaps and benchmark features. Combine qualitative and quantitative data into recommendations on product direction.",
  },
  {
    period: "2026 – now",
    title: "President",
    org: "GRAIT Club, Dept. of IT, LICET",
    kind: "Leadership",
    current: true,
    body: "Led FLAIR 2K26, LICET's flagship technical symposium: 8 sub-events and 500+ participants. Coordinated event leads, coordinators, judges and sponsors on one run-of-show, and ran the registration funnel.",
  },
  {
    period: "2026 – now",
    title: "Club Lead",
    org: "LICET Pattarai",
    kind: "Leadership",
    current: true,
    body: "Founded a daily build-and-mentoring activity where members solve real problems with design thinking.",
  },
  {
    period: "2026 – now",
    title: "Convenor, Idea Cafe",
    org: "Institution's Innovation Council (IIC)",
    kind: "Leadership",
    current: true,
    body: "Students and early PhD faculty lacked structured research training. As convenor, curriculum designer and facilitator, I built the nine-module journey, the pod model and the engagement system.",
  },
  {
    period: "2026 – now",
    title: "Event Strategy & Marketing",
    org: "Speak with Ikigai",
    kind: "Leadership",
    current: true,
    minor: true,
    body: "Planning the event strategy and marketing for the community's career conclave.",
  },
  {
    period: "2026 – now",
    title: "Startup Mentor",
    org: "Early-stage student ventures",
    kind: "Venture",
    current: true,
    minor: true,
    body: "Mentor early-stage founders on problem validation, lean canvas and first-version scope.",
  },
  {
    period: "May 2026 – now",
    title: "Core Team Member",
    org: "Team Starc, IN-SPACe CanSat '26",
    kind: "Work",
    current: true,
    body: "Defining product scope and architecture for the NDVI payload subsystem, turning remote-sensing goals into data-capture pipelines and telemetry requirements.",
  },
  {
    period: "Dec 2025 – 2026",
    title: "Data Analytics Intern",
    org: "Happieloop",
    kind: "Work",
    body: "Built Python and SQL dashboards and automated data pipelines.",
  },
  {
    period: "Sep 2024 – Jan 2026",
    title: "Co-Founder & CTO",
    org: "ParkinToday",
    kind: "Venture",
    body: "Took a smart-parking product from concept to launch. Owned vision, roadmap and technical execution, and pitched to investors.",
  },
  {
    period: "Feb 2025 – Jan 2026",
    title: "Team Captain",
    org: "Turbonites, SAEISS EFWDC '25",
    kind: "Leadership",
    body: "Ran 20+ engineers across 4 disciplines in Agile sprints, owning the budget and procurement plan, to 3rd place nationally in the Chairman's Special Category.",
  },
  {
    period: "Jun – Jul 2025",
    title: "AI & Emerging Tech Intern",
    org: "Edunet Foundation (AICTE)",
    kind: "Work",
    minor: true,
    body: "Structured AI/ML internship with an applied capstone project.",
  },
  {
    period: "2023 – 2027",
    title: "B.Tech, Information Technology",
    org: "Loyola-ICAM College of Engineering & Technology",
    kind: "Education",
    current: true,
    body: "Chennai, Tamil Nadu.",
  },
];

export const awards: { place: string; event: string; detail: string }[] = [
  { place: "1st", event: "Envision '23", detail: "Gesture-controlled wheelchair · ₹10,000" },
  { place: "1st", event: "ECircle B-Pitch", detail: "Business pitch competition" },
  { place: "2nd", event: "INDIA@2047", detail: "Glaucoma pressure monitor" },
  { place: "3rd", event: "SAEISS EFWDC '25", detail: "Chairman's Special Category" },
  { place: "4th", event: "SAEISS EFWDC '24", detail: "Electric 4-wheeler · ₹10,000" },
  { place: "4th", event: "ImpactX 2.0", detail: "Innovation challenge" },
  { place: "5th", event: "KSR Business Pitch", detail: "ParkinToday smart parking" },
  { place: "Pick", event: "Pitch to I, Venture Immersive", detail: "Selected to pitch to investors" },
  { place: "Build", event: "Design Spark Challenge '26", detail: "RAG grading assistant · Purple Fabric AI" },
  { place: "Alum", event: "Magis NextgenX 1.0", detail: "Cambridge-certified entrepreneurship bootcamp" },
];

export const learning: { title: string; detail: string; state: "done" | "active" }[] = [
  { title: "Mixpanel", detail: "Product analytics: funnels, retention, cohorts", state: "done" },
  { title: "B2B SaaS Metrics 2026", detail: "ARR, churn, CAC, LTV, unit economics", state: "done" },
  { title: "HubSpot Inbound + Sales", detail: "HubSpot Academy", state: "done" },
  { title: "AI for Product Managers", detail: "Alison", state: "done" },
  { title: "PSPO I preparation", detail: "Udemy", state: "done" },
  { title: "Becoming an Agile Business Analyst", detail: "Udemy", state: "done" },
  { title: "Artificial Intelligence Masterclass", detail: "Udemy", state: "done" },
];

/** core = used across several shipped projects; familiar = used in one or two. */
export const skills: { group: string; core: string[]; familiar: string[] }[] = [
  {
    group: "Product",
    core: ["PRDs", "Roadmapping", "Prioritisation", "User research", "Personas & journeys", "Agile / Scrum"],
    familiar: ["Design thinking", "Market research", "Go-to-market"],
  },
  {
    group: "Data",
    core: ["SQL", "PostgreSQL", "Pandas", "Mixpanel", "PostHog"],
    familiar: ["PL/pgSQL", "Firestore", "Neo4j / Cypher", "scikit-learn", "SHAP"],
  },
  {
    group: "Engineering",
    core: ["TypeScript", "JavaScript", "React", "Next.js", "Python", "FastAPI"],
    familiar: ["Vue", "Node.js", "Flask", "Supabase", "Firebase", "Java", "C / C++", "Dart / Flutter"],
  },
  { group: "Hardware", core: ["ESP32", "Arduino"], familiar: ["Raspberry Pi", "NX CAD", "AutoCAD", "Vehicle dynamics"] },
  { group: "Tools", core: ["Jira", "Notion", "Figma", "GitHub", "Postman"], familiar: ["Vercel", "Unity", "Android Studio"] },
];

/** Homepage flagship work, in reading order: a short problem and three numbers each. */
export const selected: { slug: string; problem: string; metrics: [string, string][] }[] = [
  {
    slug: "operation-nolambur",
    problem: "UPI scams move money through mule accounts in minutes. Aggregators see signals banks don't, but had no risk layer built for that view.",
    metrics: [
      ["58–77%", "mules caught on held-out days"],
      ["0 / 27", "held accounts innocent"],
      ["0.3–0.7 s", "to score a payment"],
    ],
  },
  {
    slug: "impact-ledger",
    problem: "Features shipped without proof they worked, so roadmap decisions came down to opinion.",
    metrics: [
      ["3", "gates: spec, development, release"],
      ["mSPRT", "sequential tests watching live"],
      ["Auto", "kill switch when a guardrail is harmed"],
    ],
  },
  {
    slug: "uzhavan",
    problem: "Farmer services stop working where there's no signal, and no team could show whether a feature helped.",
    metrics: [
      ["8+", "service modules"],
      ["Offline", "sync queue with retries"],
      ["KPI", "required before any release"],
    ],
  },
  {
    slug: "vina",
    problem: "Shops match UPI credits to bills by hand, can't trust payment screenshots, and can't prove their cash flow to a lender.",
    metrics: [
      ["UTR", "bank confirms each bill's payment"],
      ["8", "explainable credit-readiness factors"],
      ["139 + 32", "unit and browser tests"],
    ],
  },
  {
    slug: "compintel",
    problem: "Two SaaS companies at the same funding round can pay very differently. Salary tools that only read the stage label can't tell them apart.",
    metrics: [
      ["0.961", "R², against a 0.884 baseline"],
      ["±1.95", "LPA mean error"],
      ["P25–P75", "range, explained with SHAP"],
    ],
  },
  {
    slug: "blastwatch",
    problem: "Rice blast warnings rarely reach the block officers who could get farmers scouting in time.",
    metrics: [
      ["18", "districts in the pilot"],
      ["122", "ensemble forecasts behind each night's risk"],
      ["2 of 3", "High days before an alert"],
    ],
  },
];

export const now: string[] = [
  "Launching The Rookery, an 8-week builder programme",
  "Running GRAIT Club, Pattarai and Idea Cafe on campus",
  "Building the NDVI payload for CanSat '26",
  "vgate Phase 2: real strap noise, pending ethics approval",
  "Planning the Speak with Ikigai career conclave",
];

export type Sample = {
  slug: string;
  kind: string;
  title: string;
  /** Quick take: the problem in one sentence, what's usually missed, and the decision with its number. */
  problem: string;
  insight: string;
  decision: string;
  /** One-line version for the résumé, read after `problem`. */
  verdict: string;
  numbers: [string, string][];
  doc: [string, string];
};

/** Written work where the arithmetic changed the plan. Each links to the document itself. */
export const samples: Sample[] = [
  {
    slug: "vina",
    kind: "Strategy memo + 3 PRDs",
    title: "Vina: from khata to credit",
    problem: "Small shops won't pay for billing software, and merchant UPI carries 0% MDR, so payment fees earn nothing.",
    insight:
      "Payments are the way in, not the revenue. Give billing away as distribution, charge shops for reconciliation, and earn from lenders on credit built from the shop's bank-confirmed books.",
    decision:
      "Wrote the memo and 3 PRDs before any code. Then I shipped the free core with Smart Collect and a Credit Passport, aimed at a ₹25.8 lakh crore MSME credit gap.",
    verdict: "Made billing the free distribution, with revenue from reconciliation and lender fees. Memo and 3 PRDs, then the build.",
    numbers: [
      ["0%", "MDR on merchant UPI"],
      ["4", "revenue streams to test"],
      ["₹25.8 L cr", "MSME credit gap (IFC)"],
    ],
    doc: ["Read the memo", "https://github.com/Jos-zenith/VIna/blob/main/docs/strategy/khata-to-credit.md"],
  },
  {
    slug: "operation-nolambur",
    kind: "Unit economics",
    title: "Trustify: the price of a fraud queue",
    problem: "A payment aggregator wants a mule-detection model in front of its review team.",
    insight:
      "Model accuracy is the wrong question. Every alert costs analyst time: at 50 reviews a day it pays only above about 2.7% precision, and at the real UPI fraud rate it projects 0.4%.",
    decision:
      "Recommended against running the model as designed. Rules and graded holds carry the load instead: 58–77% of mules caught, and 0 of 27 held accounts innocent.",
    verdict: "Break-even precision is about 2.7% and the projection is 0.4%, so I recommended against running it as designed.",
    numbers: [
      ["2.7%", "break-even precision"],
      ["0.4%", "projected at the real fraud rate"],
      ["0 / 27", "held accounts innocent"],
    ],
    doc: ["Read the evaluation", "https://github.com/Jos-zenith/nolambur_case#readme"],
  },
  {
    slug: "vgate",
    kind: "Pre-registered study",
    title: "vgate: dropping my own best result",
    problem: "Heart monitors raise so many false alarms on noisy signal that staff learn to tune them out.",
    insight:
      "My signal-quality gate cut false alarms by 31%, but on settings tuned against the test set. A check written down in advance showed that no fixed setting held up on noise it hadn't seen.",
    decision:
      "Shipped v1.0 without the gate and published the failure. Losing a headline number was better than shipping a claim that wouldn't hold up in the field.",
    verdict: "31% fewer false alarms in-sample, but no fixed cut-off transferred to unseen noise, so v1.0 ships without it.",
    numbers: [
      ["31%", "fewer false alarms, in-sample"],
      ["0", "methods that transferred"],
      ["536,821", "beats matched, C vs Python"],
    ],
    doc: ["Read the study", "https://github.com/Jos-zenith/vict#readme"],
  },
];

export type Bottleneck = { label: string; ask: string; plan: [string, string][]; watch: string };

/** "Throw me a problem": hypothetical founder bottlenecks and the first-week plan I'd run for each. */
export const bottlenecks: Bottleneck[] = [
  {
    label: "Our CAC doubled",
    ask: "Customer acquisition cost doubled in a quarter and nobody agrees why.",
    plan: [
      [
        "Day 1",
        "Split it before solving it. Break CAC down by channel and by month, and check that tracking didn't change: a new attribution setting or a broken UTM can 'double' CAC without changing a single customer.",
      ],
      [
        "Days 2–3",
        "Find the channel that moved. Usually one channel saturates or one funnel step drops. Compare that channel step by step against the last good month, and pause the worst-performing tenth of spend.",
      ],
      [
        "Day 7",
        "Weigh the fix against LTV. If LTV:CAC still clears 3, keep spending while the funnel is fixed. If not, move budget to the channels that do, and run two cheap tests with the pass bar written down first.",
      ],
    ],
    watch: "CAC and payback months by channel, weekly",
  },
  {
    label: "200 tickets a day, one intern",
    ask: "Support gets about 200 tickets a day and one intern answers them.",
    plan: [
      [
        "Day 1",
        "Do the capacity arithmetic. At about 6 minutes a ticket, one intern clears around 70 in a day, so the backlog grows by about 130 a day however hard they work. Effort alone can't fix it.",
      ],
      [
        "Days 2–3",
        "Tag one full day of tickets and find the three reasons behind most of them. Write ready-made answers and help pages for those, and send the top product bug to engineering with its ticket count.",
      ],
      [
        "Day 7",
        "Triage, not first in, first out. Rank by revenue at risk and age, with a response target for each tier. Measure how many tickets the fixes prevented before deciding to hire.",
      ],
    ],
    watch: "Tickets per 100 active customers, and first response time for the top tier",
  },
  {
    label: "Scope an MVP in 7 days",
    ask: "We need to scope and test an MVP in a week.",
    plan: [
      [
        "Day 1",
        "Write a one-page spec: who it's for, the one job it does, the one number that says it worked, and what's out. Talk to five target users the same day.",
      ],
      [
        "Days 2–5",
        "Build the thinnest path that does the job end to end, and do the rest by hand behind the scenes. Set up tracking for that one number before the first user touches it.",
      ],
      [
        "Days 6–7",
        "Put it in front of the five users and measure. Then decide to scale, change or kill it against the pass bar written on day 1, not against how the demo felt.",
      ],
    ],
    watch: "Real users completing the one job, against the day-1 bar",
  },
];

export type OpsCard = {
  title: string;
  role: string;
  big: string;
  bigLabel: string;
  problem: string;
  built: string[];
  numbers: [string, string][];
  /** How it started, if it started with a "no": what I was turned down for, and what I did instead. */
  origin?: [string, string];
  /** A public page for the work itself, e.g. the event site. */
  link?: [string, string];
  tone: "yellow" | "blue" | "pink" | "green";
};

/** Founder's-office work: problem, my role, what I built, and the numbers. */
export const operations: OpsCard[] = [
  {
    title: "FLAIR 2K26",
    role: "President, GRAIT Club",
    origin: ["Not chosen as paper-presentation coordinator", "ran the club as President instead"],
    big: "8",
    bigLabel: "sub-events, one symposium",
    problem:
      "LICET's flagship technical symposium: eight sub-events on one day, each with its own coordinators, judges and format, and all of it had to feel like one happy, useful day for 500+ participants.",
    built: [
      "The line-up: prompt engineering, research presentations, UI design, a debugging relay, a startup pitch, a digital treasure hunt and two quick-fire games",
      "One run-of-show coordinating event leads, coordinators, judges, sponsors and the team that built the site, with a named owner and a deadline for every sub-event",
      "An outreach-to-registration funnel across colleges, tuned as sign-ups came in",
    ],
    numbers: [
      ["Sub-events", "8"],
      ["Participants", "500+"],
      ["Date", "8 Aug 2026"],
    ],
    link: ["flair2k26.live", "https://www.flair2k26.live/"],
    tone: "yellow",
  },
  {
    title: "Turbonites EV",
    role: "Team Captain",
    origin: ["Not selected for the team", "rejoined, took on design and planning, made captain"],
    big: "20+",
    bigLabel: "engineers, 4 disciplines",
    problem: "One season to take an electric car from CAD to the track, on a fixed student budget.",
    built: [
      "Agile sprints with one named owner per subsystem, tracked in Jira",
      "The budget and a procurement plan ordered against the build schedule",
      "Embedded-systems mentoring so the next season starts ahead",
    ],
    numbers: [
      ["Result '24", "4th national"],
      ["Result '25", "3rd national"],
    ],
    tone: "green",
  },
  {
    title: "The Rookery",
    role: "Founding Keeper",
    big: "25–30",
    bigLabel: "builders per 8-week cohort",
    problem: "Student builders rarely work on a real problem for a real user, so club projects stop at the demo.",
    built: [
      "The programme: five stages from define to showcase, cohorts of 25–30 in cross-college huddles of 4–5",
      "A level system from Starter to Mentor, where the top level means bringing up two newcomers, so the programme staffs itself",
      "The sponsor model: clinics, NGOs and shops bring the problems, and CSR teams fund tools and expert time",
      "The website, built in Astro, with 'opens soon' states until each form is ready",
    ],
    numbers: [
      ["Cohort", "25–30"],
      ["Huddles", "4–5 people"],
      ["Status", "Pre-launch"],
    ],
    tone: "pink",
  },
  {
    title: "Idea Cafe · IIC",
    role: "Convenor, curriculum designer, facilitator",
    big: "9",
    bigLabel: "module journey",
    problem: "Students and early PhD faculty lacked structured research training.",
    built: ["The nine-module research journey", "The pod model", "The engagement system"],
    numbers: [["Audience", "Students + early PhD faculty"]],
    tone: "blue",
  },
];

/** Operating principles, each backed by something on this site. */
export const operatingLog = {
  rules: [
    {
      title: "Bias to action",
      body: "Ship a rough v1 in days, then let the numbers steer. BlastWatch went live with alerts the day after its first commit.",
    },
    {
      title: "Ruthless prioritisation",
      body: "If it doesn't move the primary metric, it waits. Impact Ledger turns that into a gate: no KPI and no tracking event, no ship.",
    },
    {
      title: "Owners and deadlines in writing",
      body: "Many people, one plan. FLAIR's eight sub-events ran on one run-of-show with a named lead for each, and Turbonites ran with one owner per subsystem.",
    },
    {
      title: "Honest post-mortems",
      body: "Publish the misses next to the wins. Trustify's model failed on real data and vgate's best result didn't transfer, and both are on the record.",
    },
  ],
};

/** The hero's rotating numbers: one fact each, linking to its evidence. */
export const heroNumbers: { value: string; strike?: boolean; label: string; tag: string; href: string }[] = [
  { value: "8", label: "Sub-events I brought together under FLAIR 2K26, LICET's flagship technical symposium, for 500+ participants.", tag: "FLAIR 2K26", href: "#operations" },
  { value: "2.7%", label: "Precision a fraud-review queue needs to pay for itself. The model projected 0.4%.", tag: "Trustify", href: "#samples" },
  { value: "31%", strike: true, label: "My best result, thrown out because it didn't hold up on unseen data.", tag: "vgate", href: "#samples" },
  { value: "4→3", label: "National rank, 4th to 3rd, the season I captained a 20+ person EV team.", tag: "Turbonites", href: "#operations" },
];

/** Credentials for the marquee under the hero. */
export const ticker: string[] = [
  "Co-founder & CTO · ParkinToday",
  "3rd nationally · SAEISS EFWDC '25",
  "President · GRAIT Club",
  "8 sub-events · FLAIR 2K26",
  "Founding Keeper · The Rookery",
  "APM Intern · Upskillmate",
  "1st · Envision '23",
  "1st · ECircle B-Pitch",
  "2nd · INDIA@2047",
  "Captain · 20+ engineers",
  "Convenor · Idea Cafe (IIC)",
];
