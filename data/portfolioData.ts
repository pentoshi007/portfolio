export const siteUrl = "https://aniketpandey.website";

export const personalInfo = {
  name: "Aniket Pandey",
  title: "Full-Stack Developer & Cybersecurity Analyst",
  email: "mail@aniketpandey.website",
  location: "Buxar, Bihar, India",
  linkedin: "https://linkedin.com/in/aniket00736",
  github: "https://github.com/pentoshi007",
  tryhackme: "https://tryhackme.com/p/pentoshi",
  npm: "https://www.npmjs.com/package/@pentoshi/clai",
  blog: "https://blogs.aniketpandey.website",
  summary: `Full-stack developer and cybersecurity analyst working across the MERN stack, Next.js and TypeScript, with hands-on SOC, threat detection and penetration testing experience. Creator of clai, an open-source AI coding and pentesting CLI with 100k+ npm downloads, and ranked in the top 1% on TryHackMe with 300+ labs completed.`,
};

export const skills = {
  frontend: [
    "React 19",
    "Next.js",
    "TypeScript",
    "Tailwind CSS v4",
    "Redux Toolkit",
    "Zustand",
    "React Query",
    "Framer Motion",
    "Zod",
    "Responsive Design",
  ],
  backend: [
    "Node.js",
    "Express.js",
    "Bun",
    "REST APIs",
    "Microservices",
    "RabbitMQ",
    "WebSockets (Socket.IO)",
    "JWT / OAuth 2.0",
    "RBAC",
    "Serverless",
  ],
  databases: [
    "MongoDB",
    "Mongoose",
    "MongoDB Atlas",
    "PostgreSQL",
    "Prisma",
    "Drizzle ORM",
    "Supabase",
    "Redis",
    "MySQL",
  ],
  languages: ["JavaScript (ES6+)", "TypeScript", "Python", "SQL", "Bash", "C", "C++"],
  devops: [
    "Git",
    "GitHub Actions",
    "Docker",
    "CI/CD Pipelines",
    "Nginx",
    "PM2",
    "Turborepo",
    "AWS (S3/Lambda)",
    "Vercel",
    "Render",
    "Cloudflare R2",
    "Linux (Kali/Ubuntu)",
  ],
  ai: [
    "LLM APIs (Gemini, Groq, OpenAI)",
    "Model Context Protocol (MCP)",
    "AI Agents",
    "AI Security",
    "TensorFlow",
    "Deep Learning",
  ],
  defense: [
    "SOC Operations",
    "SIEM",
    "Microsoft Sentinel",
    "Splunk",
    "ELK Stack",
    "KQL",
    "Microsoft Defender (EDR)",
    "SOAR",
    "Alert Triage",
    "Incident Response",
    "Threat Intelligence",
    "Log Analysis",
  ],
  cybersecurity: [
    "Web App Pentesting",
    "Vulnerability Assessment",
    "OWASP Top 10",
    "Privilege Escalation",
    "Active Directory Security",
    "MITRE ATT&CK",
    "Cyber Kill Chain",
    "NIST CSF",
  ],
  securityTools: [
    "Burp Suite",
    "OWASP ZAP",
    "Metasploit",
    "Nmap",
    "Gobuster",
    "Hydra",
    "Wireshark",
    "tcpdump",
    "Snort",
    "Zeek",
    "NetworkMiner",
  ],
};

export const experience = [
  {
    company: "Elevate Labs",
    role: "Cybersecurity Intern",
    duration: "Aug 2025 - Sep 2025",
    location: "Remote",
    highlights: [
      "Collaborated on a MERN-based cyber threat intelligence platform, integrating VirusTotal, AbuseIPDB and URLhaus APIs for IOC enrichment",
      "Optimized an asynchronous threat feed pipeline processing 1,000+ indicators daily, reducing manual analysis time by 75%",
      "Implemented real-time IOC correlation and role-based access control (RBAC) across 15+ REST API endpoints",
      "Delivered CSV/JSON export of enriched indicators, streamlining reporting for analysts",
    ],
  },
  {
    company: "InternPro",
    role: "Full Stack Developer Intern",
    duration: "Jun 2025 - Aug 2025",
    location: "Remote",
    highlights: [
      "Developed an event registration platform with React, TypeScript, Node.js and MongoDB, delivering features in Agile sprints",
      "Secured 15+ API endpoints with JWT authentication and RBAC, restricting admin operations to authorised users",
      "Created a responsive admin dashboard with real-time analytics in Tailwind CSS, improving page load time by 40%",
    ],
  },
];

export const education = [
  {
    institution: "Jawaharlal Nehru University",
    degree: "M.S. in Economics (World Economy)",
    duration: "Jul 2024 - May 2026",
    location: "New Delhi, India",
  },
  {
    institution: "Jawaharlal Nehru University",
    degree: "B.Tech in Electronics & Communications Engineering",
    duration: "Nov 2021 - May 2025",
    location: "New Delhi, India",
    description:
      "Dual degree program with coursework in programming, signal processing, and digital systems.",
  },
];

export type Project = {
  title: string;
  slug?: string;
  subtitle: string;
  tech: string[];
  description: string;
  highlights: string[];
  github?: string;
  live?: string;
  writeup?: string;
};

export const projects: Project[] = [
  {
    title: "clai",
    slug: "clai",
    subtitle: "AI Coding & Pentesting Agent (CLI)",
    tech: ["TypeScript", "Node.js", "CLI", "MCP", "LLM APIs", "npm"],
    description:
      "Open-source terminal agent for coding and scoped penetration testing, published on npm as @pentoshi/clai with 100k+ downloads.",
    highlights: [
      "Integrated 35+ AI providers with API key rotation and automatic fallback",
      "Reviewable file edits, shell and test execution, MCP tools and persistent sessions",
      "Scope-aware pentest mode chaining nmap, gobuster, ffuf, nikto and sqlmap behind a 3-tier safety classifier",
    ],
    github: "https://github.com/pentoshi007/clai",
    live: "https://clai.aniketpandey.website",
  },
  {
    title: "Tomato",
    slug: "tomato",
    subtitle: "Food Delivery Platform (Microservices)",
    tech: ["React 19", "TypeScript", "Express.js", "MongoDB", "RabbitMQ", "Socket.IO", "Docker"],
    description:
      "Food delivery platform built as a React 19 single-page app backed by six Express.js microservices.",
    highlights: [
      "Asynchronous order processing with RabbitMQ and live order tracking over Socket.IO",
      "Razorpay and Stripe payments with Google OAuth and JWT authentication",
      "Containerized with Docker and deployed on Render through CI pipelines",
    ],
    github: "https://github.com/pentoshi007/Tomato",
    live: "https://tomato.aniketpandey.website",
  },
  {
    title: "Sentinel SOC Lab",
    slug: "sentinel-lab",
    subtitle: "Cloud Security Operations Environment",
    tech: ["Microsoft Sentinel", "Azure", "KQL", "Azure Arc", "Logic Apps", "MITRE ATT&CK"],
    description:
      "Full SOC pipeline on Azure ingesting real endpoint telemetry into Microsoft Sentinel with custom detections and automated response.",
    highlights: [
      "Onboarded Windows 11 and Ubuntu via Azure Arc and AMA with custom Data Collection Rules",
      "ATT&CK-mapped KQL rules for brute force (4625), PowerShell abuse (4104), SSH attacks and impossible travel",
      "Logic Apps playbook (SOAR) sends enriched SOC email alerts on every new incident",
    ],
    writeup:
      "https://blogs.aniketpandey.website/building-a-real-soc-lab-with-microsoft-sentinel-from-scratch",
  },
  {
    title: "JobScope",
    slug: "jobscope",
    subtitle: "AI-Powered Job Aggregator",
    tech: ["Next.js 16", "TypeScript", "MongoDB Atlas", "Better Auth", "Gemini", "Cloudflare R2"],
    description:
      "Parses an uploaded resume and ranks matching jobs from 8 sources with a transparent 0-100 score.",
    highlights: [
      "Aggregates public job APIs and LinkedIn (via Apify) with a daily fetch, dedupe and skill-tagging cron",
      "AI cover letters, skill-gap analysis and a drag-and-drop application Kanban",
      "Next.js App Router, Tailwind CSS v4, Gemini/Groq and Resend, deployed on Vercel",
    ],
    github: "https://github.com/pentoshi007/jobscope-web",
    live: "https://jobscope.aniketpandey.website",
  },
  {
    title: "HTTP Smuggler",
    slug: "http-smuggler",
    subtitle: "Security Testing Tool",
    tech: ["Python", "AsyncIO", "HTTP/2", "Security Testing"],
    description:
      "Tool for detecting HTTP request smuggling vulnerabilities, including CL.TE and TE.CL desync.",
    highlights: [
      "Detection logic for CL.TE and TE.CL desync attacks",
      "AsyncIO-based concurrent scanning",
      "Custom HTTP client that sends raw, non-normalized requests",
    ],
    github: "https://github.com/pentoshi007/http-smuggler",
  },
  {
    title: "Vortex",
    slug: "vortex",
    subtitle: "Threat Intelligence Platform · Elevate Labs internship",
    tech: ["React", "TypeScript", "Node.js", "Express.js", "MongoDB", "TailwindCSS"],
    description:
      "Internship team project: a CTI platform for tracking, analyzing and enriching Indicators of Compromise (IOCs).",
    highlights: [
      "Contributed to auto-ingestion of URLhaus threat feeds",
      "VirusTotal and AbuseIPDB enrichment for every indicator",
      "RBAC with JWT authentication and CSV/JSON exports",
    ],
    github: "https://github.com/pentoshi007/vortex",
    live: "https://vortex-cti.vercel.app/",
  },
  {
    title: "Eventinity",
    slug: "eventinity",
    subtitle: "Event Registration Platform · InternPro internship",
    tech: ["React", "TypeScript", "Node.js", "Express.js", "MongoDB", "TailwindCSS"],
    description:
      "Internship project: event discovery, search and registration with admin tooling.",
    highlights: [
      "JWT authentication with role-based access for users and admins",
      "Registration tracking with capacity management",
      "Responsive admin dashboard with real-time analytics",
    ],
    github: "https://github.com/pentoshi007/event-registration",
    live: "https://eventinity.vercel.app/",
  },
  {
    title: "T-Finder",
    slug: "t-finder",
    subtitle: "Technician Services Platform",
    tech: ["MongoDB", "Express.js", "React", "Node.js", "TypeScript"],
    description:
      "Full-stack marketplace connecting technicians with customers.",
    highlights: [
      "JWT authentication and a REST API with 8+ endpoints",
      "Dual-role dashboards for technicians and customers, built on Mongoose",
      "Deployed on Vercel",
    ],
    github: "https://github.com/pentoshi007/t-finder",
    live: "https://t-finder-ani.vercel.app/",
  },
  {
    title: "Oh-My-Security (OMS)",
    slug: "oh-my-security",
    subtitle: "Automated Cybersecurity Education Platform",
    tech: ["Next.js", "TypeScript", "Supabase", "Google Gemini AI"],
    description:
      "Cybersecurity education platform that publishes daily AI-generated attack analyses.",
    highlights: [
      "Vercel cron automation covering 35+ attack methodologies",
      "newsdata.io integration for current security news",
    ],
    github: "https://github.com/pentoshi007/oh-my-security",
    live: "https://oh-my-security-web.vercel.app/",
  },
  {
    title: "ViTGPTNET",
    slug: "vitgptnet",
    subtitle: "Medical Report Generation",
    tech: ["Python", "TensorFlow", "Deep Learning", "Vision Transformer", "GPT-2"],
    description:
      "Deep learning system that generates medical reports from chest X-ray images.",
    highlights: [
      "Trained on 9,000+ X-ray images, reaching 81% accuracy",
      "Reduced manual report time by 68%",
    ],
  },
];

export const certifications = [
  {
    name: "AI Security",
    issuer: "TryHackMe",
    date: "Oct 2026",
    description:
      "Attacking and defending AI systems and LLM-powered applications.",
    link: "https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-QX42FPFBJK.pdf",
  },
  {
    name: "SOC Level 1",
    issuer: "TryHackMe",
    date: "Feb 2026",
    description:
      "Security operations, SIEM, intrusion detection, threat intelligence, and incident response workflows.",
    link: "https://tryhackme.com/certificate/THM-K2VTBO8L3Y",
  },
  {
    name: "Web Application Pentesting",
    issuer: "TryHackMe",
    date: "Jan 2026",
    description:
      "Web application penetration testing covering OWASP Top 10, SQL injection, XSS, and authentication bypasses.",
    link: "https://tryhackme.com/certificate/THM-OITJNUE8SG",
  },
  {
    name: "SQL (Advanced)",
    issuer: "HackerRank",
    date: "Oct 2025",
    description:
      "Advanced SQL including complex queries, window functions, CTEs, and query optimization.",
    link: "https://www.hackerrank.com/certificates/5c8bcb068cd3",
  },
  {
    name: "Jr Penetration Tester",
    issuer: "TryHackMe",
    date: "May 2025",
    description:
      "Hands-on penetration testing across web applications and network security assessments.",
    link: "https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-O4LIYWHHVA.pdf",
  },
  {
    name: "Junior Cybersecurity Analyst",
    issuer: "Cisco",
    date: "Sep 2024",
    description:
      "Network security and threat analysis, identifying common vulnerability types in enterprise environments.",
    link: "https://www.credly.com/badges/288be399-9b69-4f70-a296-d005c49abe56/linked_in_profile",
  },
  {
    name: "Cybersecurity Specialization",
    issuer: "Google",
    date: "Mar 2024",
    description:
      "Security frameworks, risk management, incident response, and OSINT techniques.",
    link: "https://www.credly.com/go/vugPQ6Ra",
  },
  {
    name: "Advanced Learning Algorithms",
    issuer: "Coursera",
    date: "Dec 2023",
    description:
      "Neural networks and deep learning with hands-on model implementation.",
    link: "https://www.coursera.org/account/accomplishments/verify/T3Q2A34R82EH",
  },
];
