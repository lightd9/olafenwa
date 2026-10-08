import type { Metadata } from "next";
import { DM_Sans, DM_Mono } from "next/font/google";
import { portfolio } from "@/data/olafenwa";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-sans",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-mono",
});

const SITE_URL = "https://olafenwa.vercel.app";
const TITLE = "Hassan Olafenwa — Software Developer";
const DESCRIPTION =
  "Portfolio of Hassan Olafenwa, software developer focused on robust systems and thoughtful interfaces. Selected work, experience, and contact.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s — Hassan Olafenwa",
  },
  description: DESCRIPTION,
  keywords: [
    "Hassan Olafenwa",
    "software developer",
    "portfolio",
    "TypeScript",
    "React",
    "Node.js",
    "Python",
    "Nigeria",
  ],
  authors: [{ name: portfolio.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: portfolio.name,
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    creator: "@ol4fenwa",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/icon.svg",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: portfolio.name,
  url: SITE_URL,
  email: `mailto:${portfolio.email}`,
  jobTitle: "Software Developer",
  sameAs: portfolio.social
    .filter((s) => s.url.startsWith("http"))
    .map((s) => s.url),
  knowsAbout: portfolio.skills,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${dmMono.variable}`}>
      <body className="font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
