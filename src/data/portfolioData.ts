export const personalInfo = {
  name: 'Aniket Pandey',
  title: 'Full-Stack Developer & Cybersecurity Analyst',
  email: 'aniket00736@gmail.com',
  linkedin: 'https://linkedin.com/in/aniket00736',
  github: 'https://github.com/pentoshi007',
  summary: `Full-stack web developer and cybersecurity analyst with hands-on experience in MERN stack development, penetration testing, and threat intelligence. Built and deployed 4+ production-ready web applications with secure authentication and RESTful APIs. Finished 150+ cybersecurity challenges ranking in top 2% on TryHackMe.`,
};

export const skills = {
  frontend: ['React', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Responsive Design'],
  backend: ['Node.js', 'Express.js', 'Flask', 'RESTful APIs', 'JWT Authentication', 'Cloud Technologies'],
  databases: ['MongoDB', 'Mongoose', 'PostgreSQL', 'Supabase', 'MongoDB Atlas'],
  programming: ['Python', 'JavaScript', 'TypeScript', 'C/C++', 'SQL'],
  cybersecurity: ['Penetration Testing', 'Vulnerability Assessment', 'OSINT', 'Web Application Security', 'Threat Analysis'],
  securityTools: ['Burp Suite', 'Metasploit', 'Nmap', 'Hydra', 'Wireshark', 'Netcat', 'Gobuster'],
  devops: ['Git', 'GitHub', 'Vercel', 'Render', 'Docker', 'CI/CD'],
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
