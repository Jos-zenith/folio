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
  note?: string;
  image?: string;
  imageAlt?: string;
};

export const profile = {
  name: "Zenith Joshua J",
  short: "Zenith Joshua",
  handle: "Jos-zenith",
  location: "Chennai, Tamil Nadu",
  email: "joshuajzenith@gmail.com",
  phone: "+91 74483 43632",
  phoneRaw: "+917448343632",
  github: "https://github.com/Jos-zenith",
  linkedin: "https://www.linkedin.com/in/zenith-joshua-7178a623a/",
  leetcode: "https://leetcode.com/u/Zenith_Joshua/",
  unstop: "https://unstop.com/u/zenitjos7470",
  resume: "/resume.pdf",
  education: "B.Tech Information Technology, Loyola-ICAM College of Engineering & Technology (2023–2027)",
  languages: ["English", "Tamil", "German (A2)"],
};

export const stats: { value: string; label: string }[] = [
  { value: "36", label: "public repositories" },
  { value: "20+", label: "engineers led as EV team captain" },
  { value: "500+", label: "attendees at a national symposium I led" },
  { value: "7", label: "top-5 finishes in competitions" },
  { value: "2", label: "ventures founded" },
];

export const projects: Project[] = [
  {
    slug: "operation-nolambur",
    title: "Operation Nolambur",
    tagline: "Real-time UPI mule-chain detection",
    category: "Money & Trust",
    year: "2026",
    status: "Prototype",
    featured: true,
    role: "Solo: problem framing, data, model, dashboard",
    summary:
      "A graph-ML system that spots money-mule accounts in UPI transfers within seconds, modelled on a real digital-arrest scam in Chennai.",
    problem:
      "A Nolambur resident was held under a fake CBI 'digital arrest' and transferred ₹22.5L in ₹5L bursts, sized to stay under low-value alerts. The money reached 8 first-layer mule accounts, then 35 cash-out accounts, in under 4 hours. Blacklists only react after an account is known to be bad.",
    decisions: [
      "Detect behavioural intent instead of known bad accounts: the rhythm of money movement matters more than the account IDs.",
      "Defined a four-signal 'Mule Pulse': in-degree velocity, receipt-to-withdrawal time, geo-mismatch, and amount clustering near ₹5L. A real mule scores high on all four at once.",
      "Pre-trained on a public 5M-transaction AML graph, then fine-tuned on a synthetic dataset built to match the Nolambur pattern exactly.",
      "Published the low F1 score in the repo along with the path to 0.30+. Hiding it would be dishonest.",
    ],
    highlights: [
      "Five-page dashboard: command centre, cluster graph, account drill-down, case timeline, model health",
      "Synthetic UPI data generator with VPAs, ₹ amounts and state codes",
      "FastAPI endpoints for scoring, streaming, graph, freeze and report",
    ],
    facts: [
      ["Pre-train set", "IBM AML HI-Small"],
      ["Transactions", "5,078,345"],
      ["Graph nodes", "515,088"],
      ["Illicit ratio", "0.10%"],
      ["Fine-tune set", "~30,400 txns"],
      ["Flag latency target", "< 1 s"],
    ],
    stack: ["PyTorch Geometric", "GIN", "Neo4j", "FastAPI", "SSE", "Next.js 14", "react-force-graph", "Zustand"],
    code: "https://github.com/Jos-zenith/nolambur_case",
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
    ],
    highlights: [
      "What-if slider that recomputes the range live as health changes",
      "Side-by-side offer comparison between two companies",
      "SaaS metrics calculator: ARR, CAC, LTV, NDR, Rule of 40, Magic Number, TAM/SAM/SOM",
      "Offer compliance check against wage-code, HRA, EPF and gratuity rules",
    ],
    facts: [
      ["Model", "Quantile gradient boosting"],
      ["Output", "P25 / P50 / P75 CTC"],
      ["Explainability", "SHAP per feature"],
      ["ESOP", "FMV + risk-adjusted value"],
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
      "A serverless platform where DPDP Act and RBI data rules are enforced by the platform itself, so product teams don't rebuild compliance in every service.",
    problem:
      "Regulated teams need data-localisation and consent guarantees they can prove to an auditor. A line in a config file saying 'compliant' isn't proof.",
    decisions: [
      "Made compliance a platform layer: every request passes a consent gateway before it reaches any function.",
      "Ran functions in a WebAssembly sandbox for isolation, with eBPF rules watching behaviour at runtime.",
      "Kept data in India-region infrastructure and wrote an L1–L5 maturity model as the roadmap.",
    ],
    highlights: [
      "Consent-aware API gateway with an auto-initialised consent database",
      "'Attack vs. Shield' demo proofs",
      "Forensic audit and research documentation",
    ],
    facts: [
      ["Entry", "Consent Gateway"],
      ["Isolation", "Wasm runtime"],
      ["Enforcement", "eBPF · Falco / Tetragon"],
      ["Residency", "AWS Mumbai / Hyderabad"],
      ["Observability", "SigNoz"],
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
    slug: "phishshield",
    title: "PhishShield",
    tagline: "Scam awareness where scams actually arrive",
    category: "Money & Trust",
    year: "2026",
    status: "Building",
    role: "Product and full-stack developer",
    summary:
      "Checks links and messages for phishing and lets people report scams straight from WhatsApp.",
    problem:
      "Most scam links reach people on WhatsApp, and few will install a separate app just to check a link.",
    decisions: [
      "Took reports over WhatsApp via Twilio instead of asking people to switch apps.",
      "Combined reputation feeds (VirusTotal, PhishTank) with LLM analysis of the message text.",
      "Runs in a safe local-only mode until the backend schema is deployed.",
    ],
    highlights: ["URL and message scanning", "Training progress and leaderboard", "Threat reports"],
    facts: [
      ["Channels", "Web + WhatsApp"],
      ["Signals", "VirusTotal · PhishTank · LLM"],
    ],
    stack: ["Next.js", "Supabase", "Anthropic API", "Twilio", "VirusTotal"],
    code: "https://github.com/Jos-zenith/phishshield",
  },
  {
    slug: "victori",
    title: "VICTORI",
    tagline: "Household carbon-credit monitoring",
    category: "Machines",
    year: "2026",
    status: "Prototype",
    role: "System design, firmware, dashboard",
    summary:
      "Scores a household's carbon balance from tree telemetry and vehicle emissions on a live cloud dashboard.",
    problem:
      "Households have no simple, trustworthy way to see their environmental footprint or earn credit for trees they maintain.",
    decisions: [
      "Used low-cost ESP32 sensors instead of industrial hardware to keep the product affordable.",
      "Buffers readings on the device so data survives network drops.",
      "Added ML tree-species identification from bark images to estimate carbon capture.",
    ],
    highlights: ["Two modules: tree telemetry and vehicle emissions", "Real-time Vue dashboard", "Firebase Cloud Functions backend"],
    facts: [
      ["Hardware", "ESP32"],
      ["ML", "BarkVisionAI"],
      ["Backend", "Firebase"],
    ],
    stack: ["Vue 3", "TypeScript", "Firebase", "PL/pgSQL", "Arduino", "Python"],
    code: "https://github.com/Jos-zenith/victori",
  },
  {
    slug: "intellect",
    title: "Intellect",
    tagline: "RAG grading and study assistant",
    category: "Field Problems",
    year: "2026",
    status: "Prototype",
    role: "Design Spark Challenge '26 (Purple Fabric AI)",
    summary:
      "An AI teaching assistant that aligns faculty rubrics with student submissions and cites every answer back to course material.",
    problem:
      "Faculty don't trust AI answers they can't trace, and students need practice that matches what was actually taught that week.",
    decisions: [
      "Weekly rhythm: ingest lectures Monday, align with the syllabus Tuesday, generate rubric-aware mock exams Wednesday.",
      "A router agent sends each student to one of six tutor personas.",
      "Every answer carries citations and is written to an audit log.",
    ],
    highlights: ["Layout-aware OCR with LlamaParse", "Whisper transcription of lectures", "Audit trail of every answer"],
    facts: [
      ["Personas", "6"],
      ["Vector store", "ChromaDB"],
      ["Audit", "SQLite event log"],
    ],
    stack: ["FastAPI", "LlamaParse", "ChromaDB", "Whisper", "OpenAI"],
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
      "Turned customer interviews into prioritised features.",
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
      ["Stack", "IoT + cloud + mobile"],
    ],
    stack: ["ESP32", "IoT sensors", "Cloud backend", "Mobile app"],
    image: "/img/parkintoday-logo.jpg",
    imageAlt: "ParkinToday logo: a P shaped like a location pin",
  },
  {
    slug: "turbonites-ev",
    title: "Turbonites EV",
    tagline: "Electric four-wheeler, national competition",
    category: "Machines",
    year: "2025",
    status: "Award",
    featured: true,
    role: "Team Captain, 20+ members",
    summary:
      "Led a team across mechanical, electrical, electronics and IT to design and build an electric four-wheeler for SAEISS EFWDC.",
    problem:
      "Building a road-worthy EV in one competition cycle means four engineering disciplines have to work as one team, on a student budget.",
    decisions: [
      "Ran the team in Agile sprints with clear owners per subsystem.",
      "Worked on vehicle design and dynamics alongside project planning.",
      "Mentored juniors on embedded systems so knowledge carries over to the next season.",
    ],
    highlights: [
      "3rd place nationally, Chairman's Special Category (EFWDC '25)",
      "4th place and ₹10,000 at EFWDC '24",
    ],
    facts: [
      ["Team", "20+"],
      ["Result '25", "3rd · National"],
      ["Result '24", "4th · ₹10,000"],
    ],
    stack: ["NX CAD", "AutoCAD", "Vehicle dynamics", "Embedded systems", "Jira"],
    image: "/img/ev-track-day.jpg",
    imageAlt: "The Turbonites electric four-wheeler on test day, two drivers in helmets, team watching",
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
  },
  {
    slug: "glaucoma-monitor",
    title: "Glaucoma Pressure Monitor",
    tagline: "Low-cost eye-pressure measurement",
    category: "Machines",
    year: "",
    status: "Award",
    role: "Hardware and prototyping",
    summary: "An IoT device that measures eye pressure to help screen for glaucoma early.",
    problem: "Tonometry equipment is expensive and rarely available outside urban hospitals.",
    decisions: ["Sensor-based pressure reading on a microcontroller", "Designed for low-cost screening camps"],
    highlights: ["2nd place at INDIA@2047"],
    facts: [["Result", "2nd · INDIA@2047"]],
    stack: ["Arduino", "Pressure sensor", "IoT"],
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
  {
    slug: "karuvelam",
    title: "Karuvelam",
    tagline: "Invasive weed → bio-preservative",
    category: "Field Problems",
    year: "2026",
    status: "Live",
    role: "Concept and web",
    summary: "A venture concept that turns the invasive Seemai Karuvelam tree into commercial bio-preservatives.",
    problem: "Seemai Karuvelam drains groundwater across Tamil Nadu, and clearing it costs money without earning any.",
    decisions: ["Gave the clearing work a revenue stream", "Presented it as a product story as well as a research project"],
    highlights: ["Live product site"],
    facts: [["Region", "Tamil Nadu"]],
    stack: ["React", "Vite"],
    live: "https://karuvelam.vercel.app/",
    code: "https://github.com/Jos-zenith/karuvelam",
  },
  {
    slug: "jalodayam",
    title: "Jalodayam",
    tagline: "Village water data for community action",
    category: "Field Problems",
    year: "2026",
    status: "Live",
    role: "Product and front-end",
    summary: "Turns village water data into a shared tool that Kerala communities can act on.",
    problem: "Water data sits in reports that the people most affected never see.",
    decisions: ["Designed for the community first and officials second", "Built on simple, readable visuals"],
    highlights: ["Live deployment"],
    facts: [["Region", "Kerala"]],
    stack: ["TypeScript", "React"],
    live: "https://e-jalodayam.vercel.app/",
  },
  {
    slug: "trident3d",
    title: "Trident3D",
    tagline: "Rural climate-risk intelligence",
    category: "Field Problems",
    year: "2026",
    status: "Building",
    role: "Architecture and roadmap",
    summary:
      "An open, low-cost climate-risk stack for rural India that serves farmers, rural lenders and planners from one data layer.",
    problem: "Climate and agri-risk data is scattered across sources, and none of it arrives in a form that helps a decision.",
    decisions: [
      "Three layers: data integration APIs, hazard forecasting, and dashboards with alerts",
      "Anchored on DiCRA open data",
      "3D terrain maps and printable STL outputs",
    ],
    highlights: ["Unified dataset catalogue endpoint", "Hazard and advisory API contracts"],
    facts: [["Users", "Farmers · lenders · planners"]],
    stack: ["FastAPI", "Python", "Web 3D"],
    code: "https://github.com/Jos-zenith/Trident-D3D",
  },
  {
    slug: "ride-hailing-device",
    title: "Ride-Hailing Companion",
    tagline: "A device for drivers and passengers to talk",
    category: "Machines",
    year: "",
    status: "Award",
    role: "Embedded design and prototyping",
    summary: "An in-cab device that lets ride-hailing drivers and passengers communicate without phones or shared language.",
    problem: "Drivers and passengers often don't share a language, and drivers shouldn't be reading a phone while driving.",
    decisions: ["A dedicated in-cab device instead of another app screen", "Simple, glanceable interaction for the driver"],
    highlights: ["4th place at ImpactX 2.0"],
    facts: [["Result", "4th · ImpactX 2.0"]],
    stack: ["Embedded C", "IoT", "Microcontroller"],
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
      "Farmers without signal. Graduates filtered out for their accent. Villages whose water data sits in reports nobody reads. These projects began with a person and a constraint, not a framework.",
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
    featured: "turbonites-ev",
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
  body: string;
};

export const experience: Role[] = [
  {
    period: "Jun 2026 – now",
    title: "Associate Product Manager Intern",
    org: "Upskillmate",
    kind: "Work",
    current: true,
    body: "Research competitor landscapes, find market gaps and benchmark features. Combine qualitative and quantitative data into recommendations on product direction.",
  },
  {
    period: "2026 – now",
    title: "President",
    org: "GRAIT Club, Dept. of IT, LICET",
    kind: "Leadership",
    current: true,
    body: "Led a national-level symposium with 8 events and 500+ participants, from event design and sponsors to operations on the day.",
  },
  {
    period: "2026 – now",
    title: "Student Convener, Idea Cafe",
    org: "Institution's Innovation Council (IIC)",
    kind: "Leadership",
    current: true,
    body: "Started a campus programme where students pitch ideas, get mentoring and track progress from idea to prototype.",
  },
  {
    period: "2026 – now",
    title: "Event Strategy & Marketing",
    org: "Speak with Ikigai",
    kind: "Leadership",
    current: true,
    body: "Planning the event strategy and marketing for the community's career conclave.",
  },
  {
    period: "2026 – now",
    title: "Startup Mentor",
    org: "Early-stage student ventures",
    kind: "Venture",
    current: true,
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
    period: "Oct 2025 – now",
    title: "Founder",
    org: "Panjaayathu Wellness",
    kind: "Venture",
    current: true,
    body: "Building a mental-health platform based on CBT frameworks for the 1 : 7,500 psychologist-to-student gap in Indian universities.",
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
    body: "Led 20+ engineers to 3rd place nationally in the Chairman's Special Category.",
  },
  {
    period: "Jun – Jul 2025",
    title: "AI & Emerging Tech Intern",
    org: "Edunet Foundation (AICTE)",
    kind: "Work",
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
  { title: "Cross-Border Payments", detail: "SWIFT, correspondent banking, Nostro/Vostro, settlement, FX, ISO 20022", state: "active" },
  { title: "Postman API Student Expert", detail: "Certification practice tests", state: "active" },
  { title: "Hooked, by Nir Eyal", detail: "Reading: habit-forming product design", state: "active" },
  { title: "Mixpanel", detail: "Product analytics: funnels, retention, cohorts", state: "done" },
  { title: "B2B SaaS Metrics 2026", detail: "ARR, churn, CAC, LTV, unit economics", state: "done" },
  { title: "HubSpot Inbound + Sales", detail: "HubSpot Academy", state: "done" },
  { title: "Digital Product Management", detail: "Coursera", state: "done" },
  { title: "AI for Product Managers", detail: "Alison", state: "done" },
  { title: "PSPO I preparation", detail: "Udemy", state: "done" },
  { title: "Becoming an Agile Business Analyst", detail: "Udemy", state: "done" },
  { title: "Artificial Intelligence Masterclass", detail: "Udemy", state: "done" },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Product", items: ["PRDs", "Roadmapping", "Prioritisation", "User research", "Personas & journeys", "Agile / Scrum", "Design thinking", "Market research", "Go-to-market"] },
  { group: "Data", items: ["SQL", "PostgreSQL", "PL/pgSQL", "Firestore", "Neo4j / Cypher", "Mixpanel", "PostHog", "Pandas", "scikit-learn", "SHAP"] },
  { group: "Engineering", items: ["TypeScript", "JavaScript", "React", "Next.js", "Vue", "Node.js", "FastAPI", "Flask", "Supabase", "Firebase", "Python", "Java", "C / C++", "Dart / Flutter"] },
  { group: "Hardware", items: ["ESP32", "Arduino", "Raspberry Pi", "NX CAD", "AutoCAD", "Vehicle dynamics"] },
  { group: "Tools", items: ["Jira", "Notion", "Figma", "Postman", "GitHub", "Vercel", "Unity", "Android Studio"] },
];

export const now: string[] = [
  "Associate Product Manager intern at Upskillmate",
  "Running GRAIT Club and the Idea Cafe programme on campus",
  "Planning the Speak with Ikigai career conclave",
  "Building the NDVI payload for CanSat '26",
  "Studying cross-border payments and ISO 20022",
  "Reading Hooked",
];

export const story: { year: string; mood: string; items: string[] }[] = [
  {
    year: "2023",
    mood: "first page",
    items: [
      "Joined LICET for B.Tech in Information Technology",
      "Won 1st at Envision '23 with a gesture-controlled wheelchair",
    ],
  },
  {
    year: "2024",
    mood: "things get serious",
    items: [
      "Joined Turbonites and built our first electric 4-wheeler: 4th at EFWDC '24",
      "Co-founded ParkinToday as CTO in September",
      "Started pitching: business competitions, judges, investors",
    ],
  },
  {
    year: "2025",
    mood: "leading people",
    items: [
      "Became Team Captain of Turbonites: 20+ engineers, 4 disciplines",
      "3rd nationally at EFWDC '25, Chairman's Special Category",
      "AI internship at Edunet, then data analytics at Happieloop",
      "Founded Panjaayathu, a mental-health platform for students",
    ],
  },
  {
    year: "2026",
    mood: "product, on purpose",
    items: [
      "Associate Product Manager intern at Upskillmate",
      "President of GRAIT Club: a national symposium for 500+ people",
      "Started Idea Cafe under IIC to mentor student founders",
      "Built Nolambur, CompIntel, Sovereign FaaS and more",
      "Joined Team Starc for IN-SPACe CanSat '26",
    ],
  },
];

export const beyond: { title: string; big: string; body: string; tone: "yellow" | "blue" | "pink" | "green" }[] = [
  { title: "GRAIT Club", big: "500+", body: "As President, I led a national-level symposium: 8 events, 500+ participants.", tone: "yellow" },
  { title: "Idea Cafe · IIC", big: "Convener", body: "A campus space where students pitch ideas to me, get mentoring and track progress to a prototype.", tone: "blue" },
  { title: "Turbonites", big: "20+", body: "Captained engineers across mechanical, electrical, electronics and IT to a national podium.", tone: "green" },
  { title: "Speak with Ikigai", big: "Conclave", body: "Planning event strategy and marketing for the community's career conclave.", tone: "pink" },
  { title: "Startup mentoring", big: "Early-stage", body: "Helping a few student founders validate problems and scope their first version.", tone: "yellow" },
];

export const diary = {
  title: "A different kind of success story",
  quote: "I have not failed. I've just found 10,000 ways that won't work.",
  opening: [
    "I read that line on the Loyola wall one day, and it got me thinking about what I could actually share here. Something real.",
    "We're obsessed with success stories, with people who \u201cmade it\u201d. So here is the other side of that mirror. It wasn't success that shaped me. It was rejection, discouragement and loss. Across every part of my life, career and personal, that's what built the person writing this.",
  ],
  turns: [
    { lost: "Rejected from Team Turbonites.", won: "Came back as its captain." },
    { lost: "Turned down as paper presentation coordinator.", won: "Became president of the club." },
    { lost: "Betrayed by my own team.", won: "Became co-founder of that same startup." },
    {
      lost: "Rejected as an office bearer in the ED Cell and MAD Club.",
      won: "Took on bigger roles across inter-college communities: Speak With Ikigai, FlutterFlow and more.",
    },
    { lost: "Lost out on a co-founder role.", won: "Became an APM at an ed-tech startup run by one of our alumni." },
  ],
  fall:
    "But when that same alumnus ghosted me the moment the work was done, something in me broke. I lost the track completely and drifted into the 9-to-5 job market, a place I never fit into.",
  rise: [
    "It took real reflection to find my way back. When I did, I came back stronger.",
    "Now I'm being shaped into a startup evangelist by professionals who see something in me, working across startups and communities in one space. Next: launching Idea Café under IIC, where junior students' project ideas get real mentorship from my team.",
  ],
  lesson: "The path doesn't get easier. Stay in it until it shapes you, and come back better than when you left.",
};
