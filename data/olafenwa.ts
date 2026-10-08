export interface ProjectImage {
  src: string;
  width: number;
  height: number;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  year?: string;
  url?: string;
  repo?: string;
  images?: ProjectImage[];
  details?: string[];
  hidden?: boolean;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface SocialLink {
  label: string;
  url: string;
}

export interface PortfolioData {
  name: string;
  role: string;
  bio: string;
  email: string;
  twitter: string;
  availableForWork: boolean;
  social: SocialLink[];
  skills: string[];
  projects: Project[];
  experience: Experience[];
}

export const portfolio: PortfolioData = {
  name: "Hassan Olafenwa",
  role: "cracked Software Developer",
  bio: "I build robust systems and thoughtful interfaces.",
  email: "aolafenwa@gmail.com",
  availableForWork: true,
  twitter: "https://x.com/ol4fenwa/",

  social: [
    { label: "GitHub", url: "https://github.com/lightd9" },
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/olafenwa-h-3a2434252/",
    },
    { label: "Resume", url: "/resume.pdf" },
  ],

  skills: [
    "TypeScript",
    "React",
    "Node.js",
    "Python",
    "Go",
    "Rust",
    "Kubernetes",
    "AWS",
    "GraphQL",
  ],

  projects: [
    {
      slug: "atlas",
      title: "Atlas Learning ",
      description:
        "An e-learning platform for schools that brings students, teachers, and administrators together in one digital learning environment. Built features for managing courses, learning activities, assessments, and academic workflows through a scalable web platform.",
      tags: ["Next.js", "TypeScript", "React"],
      year: "2026",
      url: "https://cbt.atlassupport.co.uk/",
      repo: "https://github.com/lightd9/atlas-learning-platform",
      images: [
        { src: "/projects/atlas1.png", width: 1892, height: 907 },
        { src: "/projects/atlas2.png", width: 1916, height: 902 },
        { src: "/projects/atlas3.png", width: 1897, height: 906 },
      ],
    },
    {
      slug: "ivaccess",
      title: "IVACCESS",
      description:
        "An event management platform that enables hosts to create events, send digital invitations, manage guests, and streamline event entry across devices. Built the marketing website to showcase the platform, its features, and subscription plans with a premium, responsive interface.",
      tags: ["React", "Vite"],
      year: "2026",
      url: "https://www.theivaccess.com/",
      images: [
        { src: "/projects/ivaccess1.png", width: 1892, height: 911 },
        { src: "/projects/ivaccess2.png", width: 1880, height: 907 },
        { src: "/projects/ivaccess3.png", width: 1897, height: 877 },
      ],
    },
    {
      slug: "layer-21",
      title: "Layer 21",
      description:
        "An e-invoicing and tax-compliance infrastructure platform built to help businesses integrate with Nigeria's Revenue Service (NRS) requirements. Developed APIs and backend systems for invoice generation, tax compliance workflows, payment tracking, and integration with external systems.",
      tags: ["Next.js", "TypeScript", "Tailwind CSS"],
      year: "2026",
      url: "https://layer21.com.ng/",
      repo: "https://github.com/lightd9/layer21-ng",
      images: [
        { src: "/projects/layer21-1.png", width: 1892, height: 906 },
        { src: "/projects/layer21-2.png", width: 1627, height: 791 },
        { src: "/projects/layer21-3.png", width: 1896, height: 796 },
      ],
    },
    {
      slug: "form-automation-system",
      title: "Form Automation System",
      description:
        "An intelligent automation system designed to populate a KoboToolbox survey form with realistic data for testing and validation purposes.",
      tags: ["Python", "Selenium WebDriver"],
      year: "2026",
      repo: "https://github.com/lightd9/Kobotool-automation-script",
    },
    {
      slug: "authentichain-api-gateway",
      title: "Authentichain API Gateway",
      description:
        "A REST API that uses Ethereum smart contracts to create an immutable, verifiable chain of custody for physical products, with rate-limiting, circuit breaker patterns, and real-time observability.",
      tags: [
        "TypeScript",
        "Node.js",
        "Ethers.js",
        "Solidity",
        "JWT",
        "bcryptjs",
      ],
      year: "2026",
      repo: "https://github.com/lightd9/Authentichain",
    },
    {
      slug: "smartscan-app",
      title: "SmartScan App",
      description:
        "A blockchain authentication application for verifying product authenticity end to end, from smart contract to consumer-facing scan.",
      tags: [
        "JavaScript",
        "Solidity",
        "React",
        "Vite",
        "Express",
        "PostgreSQL",
      ],
      year: "2025",
      repo: "https://github.com/lightd9/SmartScan_Full_Code",
    },
    {
      slug: "predicting-customer-churn",
      title: "Predicting Customer Churn",
      hidden: true,
      description:
        "An app that applies machine learning models to predict the likelihood of customer churn, with an interactive reporting interface.",
      tags: ["Python", "Machine Learning"],
      year: "2025",
      repo: "https://github.com/lightd9/Customer-Churn-Prediction",
    },
    {
      slug: "ledger-cli",
      title: "Ledger CLI",
      hidden: true,
      description:
        "Zero-dependency CLI tool for personal finance tracking. Parses bank CSV exports, generates reports, and syncs across devices via CRDTs.",
      tags: ["TypeScript", "Node.js", "SQLite"],
    },
  ],

  experience: [
    {
      role: "Full Stack Developer",
      company: "Layer21",
      period: "March 2026 — Present",
      description:
        "End-to-end web, mobile & SaaS applications — RESTful APIs, database design, payment integrations, and cloud deployment",
    },
    {
      role: "Software Engineer Intern",
      company: "NITDA Nigeria",
      period: "2025 — 2026",
      description: "Infrastructure & developer experience tooling",
    },
    {
      role: "Full Stack Developer",
      company: "Freelance",
      period: "2025",
      description: "Full-stack web & mobile delivery for clients",
    },
    {
      role: "Hardware Engineering Intern",
      company: "L.Cornerstone Technologies",
      period: "2024",
      description: "Hardware prototyping and testing",
    },
    {
      role: "Commercial Data Analyst Intern",
      company: "Seven Up Bottling Company",
      period: "2024",
      description: "Commercial data analysis and reporting dashboards",
    },
    {
      role: "Lead Graphic Designer",
      company: "Genesis",
      period: "2022",
      description: "Design strategy for branding and digital campaigns",
    },
  ],
};
