"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const sections = [
  { id: "samples", label: "Memos" },
  { id: "problem", label: "Try me" },
  { id: "work", label: "Products" },
  { id: "operations", label: "Operations" },
  { id: "projects", label: "All projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export function toggleTheme() {
  const root = document.documentElement;
  const cur = root.getAttribute("data-theme") ?? "dark";
  const next = cur === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  try {
    localStorage.setItem("zj-theme", next);
  } catch {}
}

/** "Ctrl" on Windows and Linux, "⌘" on a Mac. "Ctrl" until mounted to avoid a hydration mismatch. */
export function useModKey() {
  const [mod, setMod] = useState("Ctrl");
  useEffect(() => {
    if (/Mac|iPhone|iPad/.test(navigator.userAgent)) setMod("⌘");
  }, []);
  return mod;
}

const istFormat = new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", hour12: false });

/** Local time in Chennai, so a visitor abroad knows when I'll reply. Blank until mounted to avoid a hydration mismatch. */
function Clock() {
  const [now, setNow] = useState("");
  useEffect(() => {
    const tick = () => setNow(istFormat.format(new Date()));
    tick();
    const t = setInterval(tick, 20_000);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="clock" aria-label={now ? `Chennai time ${now} IST` : "Chennai time"}>
      Chennai <b>{now || "--:--"}</b> IST
    </span>
  );
}

const roles = ["Founder's Office · Product", "writes the memos", "ships the code", "runs the team", "reads the data"];

/** The line under my name types itself through what I actually do, then settles back on the title. Static without motion. */
function RoleTicker() {
  const [text, setText] = useState(roles[0]);
  useEffect(() => {
    if (!document.documentElement.classList.contains("motion")) return;
    let i = 0;
    let n = roles[0].length;
    let dir = -1;
    let t: ReturnType<typeof setTimeout>;
    const tick = () => {
      n += dir;
      if (n < 0) {
        i = (i + 1) % roles.length;
        n = 0;
        dir = 1;
      }
      setText(roles[i].slice(0, n));
      let delay = dir < 0 ? 24 : 55;
      if (dir > 0 && n === roles[i].length) {
        dir = -1;
        delay = i === 0 ? 6000 : 1700;
      }
      t = setTimeout(tick, delay);
    };
    t = setTimeout(tick, 4000);
    return () => clearTimeout(t);
  }, []);
  return (
    <small className="role" aria-hidden="true">
      {text}
      <i className="caret" />
    </small>
  );
}

/** The masthead: monogram, a numbered section index, the local clock, and a reading-progress rule along its foot. */
export default function Nav() {
  const pathname = usePathname();
  const mod = useModKey();
  const home = pathname === "/";
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!home) return;
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [home]);

  const href = (id: string) => (home ? `#${id}` : `/#${id}`);
  const num = (i: number) => String(i + 1).padStart(2, "0");

  return (
    <header className="bar">
      <div className="wrap row">
        <Link className="brand" href="/" aria-label="Zenith Joshua, Founder's Office and Product, home">
          <span className="mark" aria-hidden="true">
            ZJ
            <span className="dot" title="Open to Founder's Office and APM roles" />
          </span>
          <span>
            <b>Zenith Joshua</b>
            <RoleTicker />
          </span>
        </Link>
        <nav className="nav" aria-label="Sections">
          {sections.map((s, i) => (
            <a key={s.id} href={href(s.id)} className={active === s.id ? "on" : undefined} title={`Press ${i + 1}`}>
              <i>{num(i)}</i>
              {s.label}
            </a>
          ))}
        </nav>
        <div className="tools">
          <Clock />
          <button className="toolbtn" type="button" aria-label="Search the site" onClick={() => window.dispatchEvent(new Event("open-palette"))}>
            <svg className="search-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <span className="kbd">
              <kbd className="key">{mod}</kbd>
              <kbd className="key">B</kbd>
            </span>
          </button>
          <button className="toolbtn keys-btn" type="button" aria-label="Keyboard shortcuts" title="Keyboard shortcuts (?)" onClick={() => window.dispatchEvent(new Event("open-shortcuts"))}>
            <kbd className="key">?</kbd>
          </button>
          <button className="toolbtn" type="button" aria-label="Toggle dark mode" onClick={toggleTheme}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
            </svg>
          </button>
          <button className="toolbtn menu-btn" type="button" aria-label="Menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>
      <nav className={`mobile-nav wrap${open ? " open" : ""}`} aria-label="Sections">
        {sections.map((s, i) => (
          <a key={s.id} href={href(s.id)} onClick={() => setOpen(false)}>
            <i>{num(i)}</i>
            {s.label}
          </a>
        ))}
      </nav>
      <div className="progress" id="read-progress" aria-hidden="true" />
    </header>
  );
}
