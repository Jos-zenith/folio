import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono, Kalam, Fredoka } from "next/font/google";
import Nav from "@/components/Nav";
import CommandPalette from "@/components/CommandPalette";
import DrawObserver from "@/components/DrawObserver";
import "./globals.css";

const body = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-body" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-mono" });
const magnet = Fredoka({ subsets: ["latin"], weight: ["600"], variable: "--font-magnet" });
const hand = Kalam({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-hand" });

export const metadata: Metadata = {
  title: { default: "Zenith Joshua", template: "%s · Zenith Joshua" },
  description:
    "Zenith Joshua J: engineer, product builder and founder from Chennai. Fraud detection, offline-first platforms, compliance infrastructure, EVs and startups.",
  openGraph: {
    title: "Zenith Joshua",
    description: "Engineer, product builder and founder from Chennai.",
    type: "website",
    images: ["/img/ev-track-day.jpg"],
  },
};

const themeScript = `try{var t=localStorage.getItem('zj-theme');if(t)document.documentElement.setAttribute('data-theme',t)}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${body.variable} ${mono.variable} ${hand.variable} ${magnet.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Nav />
        {children}
        <CommandPalette />
        <DrawObserver />
      </body>
    </html>
  );
}
