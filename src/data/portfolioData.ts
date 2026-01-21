export const personalInfo = {
  name: 'Aniket Pandey',
  title: 'Full-Stack Developer & Cybersecurity Analyst',
  email: 'aniket00736@gmail.com',
  linkedin: 'https://linkedin.com/in/aniket00736',
  github: 'https://github.com/pentoshi007',
  summary: `Full-stack web developer and cybersecurity analyst with hands-on experience in MERN stack development, penetration testing, and threat intelligence. Built and deployed 4+ production-ready web applications with secure authentication and RESTful APIs. Finished 180+ cybersecurity challenges ranking in top 2% on TryHackMe.`,
};

export const skills = {
  frontend: ['React', 'Next.js', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Responsive Design', 'Redux'],
  backend: ['Node.js', 'Express.js', 'Flask', 'FastAPI', 'RESTful APIs', 'GraphQL', 'JWT Authentication', 'WebSockets', 'Cloud Technologies'],
  databases: ['MongoDB', 'Mongoose', 'PostgreSQL', 'MySQL', 'Redis', 'Supabase', 'MongoDB Atlas', 'Prisma ORM'],
  programming: ['Python', 'JavaScript', 'TypeScript', 'C/C++', 'SQL'],
  cybersecurity: ['Penetration Testing', 'Vulnerability Assessment', 'OSINT', 'Web Application Security', 'Threat Analysis', 'Network Security', 'Privilege Escalation', 'CTF Challenges'],
  securityTools: ['Burp Suite', 'Metasploit', 'Nmap', 'Hydra', 'Wireshark', 'Netcat', 'Gobuster', 'SQLMap', 'Hashcat', 'John the Ripper', 'Nikto', 'Dirb'],
  devops: ['Git', 'GitHub', 'Vercel', 'Render', 'Docker', 'CI/CD', 'Linux', 'Nginx', 'AWS'],
};

export const experience = [
  {
    company: 'Elevate Labs',
    role: 'Cybersecurity Intern',
    duration: 'Aug 2025 - Sep 2025',
    location: 'Remote',
    highlights: [
      'Developed cyber threat intelligence platform using Flask and React, integrating VirusTotal, AbuseIPDB, and URLhaus APIs for automated IOC enrichment',
      'Built async ingestion pipeline processing 1,000+ malicious indicators daily, reducing manual analysis time by 75%',
      'Implemented RBAC, RESTful API with 20+ endpoints, and multi-format export capabilities',
    ],
  },
  {
    company: 'InternPro',
    role: 'Full Stack Web Developer Intern',
    duration: 'Jun 2025 - Aug 2025',
    location: 'Remote',
    highlights: [
      'Engineered full-stack Event Registration Platform using React, Node.js, and MongoDB with TypeScript',
      'Developed 20+ RESTful API endpoints secured with JWT and RBAC, reducing unauthorized access by 95%',
      'Built responsive Tailwind CSS UI and Admin Dashboard, improving page load time by 40%',
    ],
  },
];

export const education = [
  {
    institution: 'Jawaharlal Nehru University',
    degree: 'M.S. in Economics (World Economy)',
    duration: 'Jul 2024 - May 2026',
    location: 'New Delhi, India',
  },
  {
    institution: 'Jawaharlal Nehru University',
    degree: 'B.Tech in Electronics & Communications Engineering',
    duration: 'Nov 2021 - May 2025',
    location: 'New Delhi, India',
    description: 'Dual degree program with coursework in programming, signal processing, and digital systems.',
  },
];

export const projects = [
  {
    title: 'HTTP Smuggler',
    subtitle: 'Security Testing Tool',
    tech: ['Python', 'AsyncIO', 'HTTP/2', 'Security Testing'],
    description: 'Advanced tool for detecting HTTP Request Smuggling vulnerabilities including CL.TE and TE.CL.',
    highlights: [
      'Implemented detection logic for CL.TE and TE.CL desync attacks',
      'Built with AsyncIO for high-performance concurrent scanning',
      'Custom HTTP client implementation to bypass standard library protections',
    ],
    github: 'https://github.com/pentoshi007/http-smuggler',
  },
  {
    title: 'T-Finder',
    subtitle: 'Technician Services Platform',
    tech: ['MongoDB', 'Express.js', 'React', 'Node.js'],
    description: 'Full-stack technician marketplace connecting service providers with customers.',
    highlights: [
      'JWT authentication and RESTful API with 8+ endpoints',
      'Dual-role dashboard system with Mongoose ODM',
      'Deployed on Vercel with 99% uptime',
    ],
    github: 'https://github.com/pentoshi007',
    live: 'https://t-finder-ani.vercel.app/',
  },
  {
    title: 'Vortex',
    subtitle: 'Cyber Threat Intelligence Dashboard',
    tech: ['React', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB', 'TailwindCSS'],
    description: 'Full-stack CTI platform for tracking, analyzing, and enriching Indicators of Compromise (IOCs).',
    highlights: [
      'IOC management with auto-ingestion from URLHaus threat feeds',
      'VirusTotal & AbuseIPDB integration for threat enrichment',
      'Role-based access control with JWT authentication and CSV/JSON exports',
    ],
    github: 'https://github.com/pentoshi007/vortex',
    live: 'https://vortex-cti.vercel.app/',
  },
  {
    title: 'Eventinity',
    subtitle: 'Event Discovery & Registration Platform',
    tech: ['React', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB', 'TailwindCSS'],
    description: 'Full-stack web app for event discovery, search, and registration with admin tooling.',
    highlights: [
      'JWT authentication with role-based access for users and admins',
      'Real-time registration tracking with capacity management',
      'Modern glassmorphism UI with responsive design and smooth animations',
    ],
    github: 'https://github.com/pentoshi007/event-registration',
    live: 'https://eventinity.vercel.app/',
  },
  {
    title: 'Oh-My-Security (OMS)',
    subtitle: 'Automated Cybersecurity Education Platform',
    tech: ['Next.js', 'TypeScript', 'Supabase', 'Google Gemini AI'],
    description: 'Engineered automated cybersecurity education platform delivering daily AI-generated attack analysis.',
    highlights: [
      'Implemented Vercel cron automation processing 35+ attack methodologies',
      'newsdata.io API integration with 99.9% uptime',
    ],
    github: 'https://github.com/pentoshi007',
    live: 'https://oh-my-security-web.vercel.app/',
  },
  {
    title: 'ViTGPTNET',
    subtitle: 'Medical Report Generation',
    tech: ['Python', 'TensorFlow', 'Deep Learning', 'Vision Transformer', 'GPT-2'],
    description: 'AI system for automated medical report generation from X-ray images.',
    highlights: [
      'Processing 9,000+ X-ray images achieving 81% accuracy',
      'Reduced manual report time by 68%',
    ],
    github: 'https://github.com/pentoshi007',
  },
];


export const certifications = [
  {
    name: 'Web Application Pentesting',
    issuer: 'TryHackMe',
    date: 'Jan 2026',
    description: 'Comprehensive web application penetration testing covering OWASP Top 10, SQL injection, XSS, and authentication bypasses.',
    link: 'https://tryhackme.com/certificate/THM-OITJNUE8SG',
  },
  {
    name: 'SQL (Advanced)',
    issuer: 'HackerRank',
    date: 'Oct 2025',
    description: 'Advanced SQL proficiency including complex queries, window functions, CTEs, and database optimization techniques.',
    link: 'https://www.hackerrank.com/certificates/5c8bcb068cd3',
  },
  {
    name: 'Jr Penetration Tester',
    issuer: 'TryHackMe',
    date: 'May 2025',
    description: 'Achieved 90% success rate in hands-on penetration testing labs across web applications and network security assessments.',
    link: 'https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-O4LIYWHHVA.pdf',
  },
  {
    name: 'Junior Cybersecurity Analyst',
    issuer: 'Cisco',
    date: 'Sep 2024',
    description: 'Trained in network security and threat analysis, identifying 10+ vulnerability types in enterprise environments.',
    link: 'https://www.credly.com/badges/288be399-9b69-4f70-a296-d005c49abe56/linked_in_profile',
  },
  {
    name: 'Cybersecurity Specialization',
    issuer: 'Google',
    date: 'Mar 2024',
    description: 'Learned security frameworks, risk management, and incident response covering 20+ security scenarios and OSINT techniques.',
    link: 'https://www.credly.com/go/vugPQ6Ra',
  },
  {
    name: 'Advanced Learning Algorithms',
    issuer: 'Coursera',
    date: 'Dec 2023',
    description: 'Fulfilled neural networks and deep learning training with hands-on implementation achieving 88%+ model accuracy.',
    link: 'https://www.coursera.org/account/accomplishments/verify/T3Q2A34R82EH',
  },
];
