"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const sections = [
  { id: "diary", label: "Diary" },
  { id: "index", label: "Contents" },
  { id: "money", label: "Chapters" },
  { id: "story", label: "Story" },
  { id: "beyond", label: "Beyond code" },
  { id: "report", label: "Report card" },
  { id: "contact", label: "Write to me" },
];

const chapterIds = ["money", "field", "machines"];

export function toggleTheme() {
  const root = document.documentElement;
  let cur = root.getAttribute("data-theme");
  if (!cur) cur = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  const next = cur === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  try {
    localStorage.setItem("zj-theme", next);
  } catch {}
}

export default function Nav() {
  const pathname = usePathname();
  const home = pathname === "/";
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!home) return;
    const ids = [...sections.map((s) => s.id), ...chapterIds];
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(chapterIds.includes(e.target.id) ? "money" : e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [home]);

  const href = (id: string) => (home ? `#${id}` : `/#${id}`);

  return (
    <header className="bar">
      <div className="wrap row">
        <Link className="brand" href="/" aria-label="Zenith Joshua, home">
          <b>Zenith</b>
          <small>NOTEBOOK · VOL. 04</small>
        </Link>
        <nav className="nav" aria-label="Sections">
          {sections.map((s) => (
            <a key={s.id} href={href(s.id)} className={active === s.id ? "on" : undefined}>
              {s.label}
            </a>
          ))}
        </nav>
        <div className="tools">
          <button
            className="iconbtn"
            type="button"
            aria-label="Search the notebook"
            onClick={() => window.dispatchEvent(new Event("open-palette"))}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <span className="kbd">Ctrl K</span>
          </button>
          <button className="iconbtn" type="button" aria-label="Switch between paper and blueprint mode" onClick={toggleTheme}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
            </svg>
          </button>
          <button
            className="iconbtn menu-btn"
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>
      <nav className={`mobile-nav wrap${open ? " open" : ""}`} aria-label="Sections">
        {sections.map((s) => (
          <a key={s.id} href={href(s.id)} onClick={() => setOpen(false)}>
            {s.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
