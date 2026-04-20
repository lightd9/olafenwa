
export interface Project {
  title: string;
  description: string;
  tags: string[];
  year: string;
  url?: string;
  repo?: string;
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
    { label: "LinkedIn", url: "https://www.linkedin.com/in/olafenwa-h-3a2434252/" },
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
      title: "Form Automation System",
      description:
        "An intelligent automation system designed to populate a KoboToolbox survey form with realistic data for testing adnd validation purposes",
      tags: ["Python", "Selenium WebDriver"],
      year: "",
      repo: "https://github.com/lightd9/Kobotool-automation-script",
    },
    {
      title: "Authentichain API Gateway",
      description:
        "A REST API that uses Ethereum smart contracts to create an immutable, verifiable chain of custody for physical products, with rate-limiting, circuit breaker patterns, and real-time obseravbility.",
      tags: ["TypeScript", "Node.js", "Ethers.js", "Solidity", "JavaScript", "JWT + bycryptjs"],
      year: "",
      repo: "https://github.com/lightd9/Authentichain",
    },
    {
      title: "Predicting Customer CHurn",
      description:
        "An app to demonstrate the ability to apply machine learning models to predict the likelihood of customer churn.",
      tags: ["Python", "Machine Learning"],
      year: "",
      repo: " https://github.com/lightd9/Customer-Churn-Prediction",
    },
    {
      title: "SmartScan APP",
      description:
        "Full-Blown Blockchain Authentication APP.",
      tags: ["JavaScript", "Solidity", "React", "Vite", "Node.JS", "Express", "PostgreSQL"],
      year: "",
      repo: "https://github.com/lightd9/SmartScan_Full_Code",
    },
    {
      title: "Ledger CLI",
      description:
        "Zero-dependency CLI tool for personal finance tracking. Parses bank CSV exports, generates reports, and syncs across devices via CRDTs.",
      tags: ["TypeScript", "Node.js", "SQLite"],
      year: "",
      repo: "https://github.com",
    },
    
  ],

  experience: [
    {
      role: " Software Engineer Intern",
      company: "NITDA Nigeria",
      period: "2025 — 2026",
      description: "Infrastructure & Developer Experience",
    },
        {
      role: "Junior Engineer",
      company: "Freelance",
      period: "2025",
      description: "Full-stack web & mobile",
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
      description: "Full-stack web & mobile",
    },
    {
      role: "Lead Graphic Designer",
      company: "Genesis",
      period: "2022",
      description: "Design Strategy for branding and digital campaigns",
    },
  ],
};