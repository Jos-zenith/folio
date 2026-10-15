"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { profile, projects } from "@/lib/data";
import { sections, toggleTheme } from "./Nav";
import { copyEmail } from "./Shortcuts";

type Item = { group: string; label: string; hint?: string; key?: string; run: () => void };

export default function CommandPalette() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && !e.altKey && !e.shiftKey && e.key.toLowerCase() === "b") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-palette", onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQ("");
      setSel(0);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  const items: Item[] = useMemo(() => {
    const go = (id: string) => () => {
      if (pathname === "/") document.getElementById(id)?.scrollIntoView();
      else router.push(`/#${id}`);
    };
    const ext = (url: string) => () => window.open(url, "_blank", "noopener");
    return [
      ...sections.map((s, i) => ({ group: "Jump to", label: s.label, key: String(i + 1), run: go(s.id) })),
      ...projects.map((p) => ({
        group: "Projects",
        label: p.title,
        hint: p.category,
        run: () => router.push(`/work/${p.slug}`),
      })),
      { group: "Actions", label: "Toggle dark mode", key: "D", run: toggleTheme },
      { group: "Actions", label: "Copy email address", hint: profile.email, key: "E", run: copyEmail },
      { group: "Actions", label: "Pitch me a problem", hint: "1-page memo back", key: "P", run: () => (window.location.href = profile.problemMail) },
      { group: "Actions", label: "Open résumé", hint: "printable", key: "R", run: () => router.push(profile.resume) },
      { group: "Actions", label: "Keyboard shortcuts", key: "?", run: () => window.dispatchEvent(new Event("open-shortcuts")) },
      { group: "Links", label: "GitHub", hint: profile.handle, key: "G", run: ext(profile.github) },
      { group: "Links", label: "LinkedIn", key: "L", run: ext(profile.linkedin) },
      { group: "Links", label: "LeetCode", run: ext(profile.leetcode) },
    ];
  }, [pathname, router]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return items;
    return items.filter((i) => `${i.label} ${i.hint ?? ""} ${i.group}`.toLowerCase().includes(s));
  }, [items, q]);

  if (!open) return null;

  const run = (i: Item) => {
    setOpen(false);
    i.run();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") setOpen(false);
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSel((v) => Math.min(v + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSel((v) => Math.max(v - 1, 0));
    } else if (e.key === "Enter" && filtered[sel]) {
      run(filtered[sel]);
    }
  };

  let lastGroup = "";
  return (
    <div className="pal-backdrop" onMouseDown={() => setOpen(false)}>
      <div className="pal" role="dialog" aria-modal="true" aria-label="Command menu" onMouseDown={(e) => e.stopPropagation()}>
        <div className="pal-in">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            id="palette-search"
            ref={inputRef}
            value={q}
            placeholder="Search projects, sections, links…"
            onChange={(e) => {
              setQ(e.target.value);
              setSel(0);
            }}
            onKeyDown={onKeyDown}
            aria-label="Search"
          />
        </div>
        <ul className="pal-list" role="listbox">
          {filtered.length === 0 && <li className="pal-group">No matches</li>}
          {filtered.map((i, idx) => {
            const header = i.group !== lastGroup ? i.group : null;
            lastGroup = i.group;
            return (
              <li key={`${i.group}-${i.label}`}>
                {header && <div className="pal-group">{header}</div>}
                <div
                  className="pal-item"
                  role="option"
                  aria-selected={idx === sel}
                  onMouseEnter={() => setSel(idx)}
                  onClick={() => run(i)}
                >
                  {i.label}
                  {i.hint && <small>{i.hint}</small>}
                  {i.key && <kbd className="key">{i.key}</kbd>}
                </div>
              </li>
            );
          })}
        </ul>
        <div className="pal-foot">
          <span>↑↓ move</span>
          <span>↵ open</span>
          <span>esc close</span>
        </div>
      </div>
    </div>
  );
}
