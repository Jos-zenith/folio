import type { Metadata } from "next";
import { Bricolage_Grotesque, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import Nav from "@/components/Nav";
import CommandPalette from "@/components/CommandPalette";
import Motion from "@/components/Motion";
import { profile } from "@/lib/data";
import "./globals.css";

const body = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-body" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-mono" });
const display = Bricolage_Grotesque({ subsets: ["latin"], axes: ["wdth", "opsz"], variable: "--font-display" });

const description =
  "Zenith Joshua J: operator and product builder from Chennai, open to Founder's Office and APM roles. Capacity models and strategy memos, a 20+ person EV team, an 8-event technical symposium, and live products in fintech, agriculture and hardware.";

export const metadata: Metadata = {
  metadataBase: new URL(profile.site),
  title: { default: "Zenith Joshua · Founder's Office & Product", template: "%s · Zenith Joshua" },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Zenith Joshua · Founder's Office & Product",
    description,
    url: "/",
    siteName: "Zenith Joshua",
    type: "website",
    images: [{ url: "/img/ev-track-day.jpg", alt: "The Turbonites electric four-wheeler on test day" }],
  },
  twitter: { card: "summary_large_image", title: "Zenith Joshua · Founder's Office & Product", description },
};

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: "Product & Founder's Office",
  email: `mailto:${profile.email}`,
  url: profile.site,
  address: { "@type": "PostalAddress", addressLocality: "Chennai", addressRegion: "Tamil Nadu", addressCountry: "IN" },
  alumniOf: "Loyola-ICAM College of Engineering & Technology",
  sameAs: [profile.linkedin, profile.github],
};

const themeScript = `try{var t=localStorage.getItem('zj-theme');if(t)document.documentElement.setAttribute('data-theme',t)}catch(e){}if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('motion');`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${body.variable} ${mono.variable} ${display.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
      </head>
      <body>
        <div className="guides" aria-hidden="true">
          <div className="wrap">
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>
        <Nav />
        {children}
        <CommandPalette />
        <Motion />
      </body>
    </html>
  );
}
