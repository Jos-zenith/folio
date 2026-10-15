"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/lib/data";
import { sections, toggleTheme, useModKey } from "./Nav";

/** Show a short message at the foot of the screen. Anything on the page can call this. */
export function toast(msg: string) {
  window.dispatchEvent(new CustomEvent("zj-toast", { detail: msg }));
}

export function copyEmail() {
  navigator.clipboard
    ?.writeText(profile.email)
    .then(() => toast(`Copied ${profile.email}`))
    .catch(() => toast(profile.email));
}

const KONAMI = ["arrowup", "arrowup", "arrowdown", "arrowdown", "arrowleft", "arrowright", "arrowleft", "arrowright", "b", "a"];

type Row = { keys: string[]; label: string; id: string };

/** Site-wide single-key shortcuts, the "?" cheat sheet, and the toast they report back through. */
export default function Shortcuts() {
  const router = useRouter();
  const pathname = usePathname();
  const mod = useModKey();
  const [sheet, setSheet] = useState(false);
  const [hit, setHit] = useState("");
  const [msg, setMsg] = useState<{ text: string; n: number } | null>(null);
  const trail = useRef<string[]>([]);

  const rows: Row[] = [
    { id: "mod-b", keys: [mod, "B"], label: "Search everything" },
    { id: "/", keys: ["/"], label: "Search, the quick way" },
    { id: "1", keys: ["1", "–", String(sections.length)], label: "Jump to a section" },
    { id: "j", keys: ["J", "K"], label: "Next / previous section" },
    { id: "0", keys: ["0"], label: "Back to the top" },
    { id: "d", keys: ["D"], label: "Dark / light" },
    { id: "e", keys: ["E"], label: "Copy my email" },
    { id: "p", keys: ["P"], label: "Pitch me a problem" },
    { id: "r", keys: ["R"], label: "Open résumé" },
    { id: "g", keys: ["G"], label: "GitHub" },
    { id: "l", keys: ["L"], label: "LinkedIn" },
    { id: "?", keys: ["?"], label: "This sheet" },
  ];

  useEffect(() => {
    const onToast = (e: Event) => setMsg({ text: (e as CustomEvent<string>).detail, n: Date.now() });
    const onOpen = () => setSheet(true);
    window.addEventListener("zj-toast", onToast);
    window.addEventListener("open-shortcuts", onOpen);
    return () => {
      window.removeEventListener("zj-toast", onToast);
      window.removeEventListener("open-shortcuts", onOpen);
    };
  }, []);

  useEffect(() => {
    if (!msg) return;
    const t = setTimeout(() => setMsg(null), 2600);
    return () => clearTimeout(t);
  }, [msg]);

  useEffect(() => {
    const home = pathname === "/";
    const go = (id: string) => {
      if (home) document.getElementById(id)?.scrollIntoView();
      else router.push(`/#${id}`);
    };
    /** Step to the next or previous section from wherever the reader is now. */
    const step = (dir: 1 | -1) => {
      if (!home) return go(sections[0].id);
      const tops = sections.map((s) => document.getElementById(s.id)?.getBoundingClientRect().top ?? 0);
      const edge = 90;
      const idx = dir === 1 ? tops.findIndex((t) => t > edge) : tops.findLastIndex((t) => t < 40);
      if (idx === -1) {
        if (dir === -1) window.scrollTo({ top: 0 });
        return;
      }
      go(sections[idx].id);
    };
    const ext = (url: string) => window.open(url, "_blank", "noopener");

    const flash = (id: string) => {
      setHit(id);
      setTimeout(() => setHit((h) => (h === id ? "" : h)), 200);
    };

    const onKey = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      trail.current = [...trail.current, key].slice(-KONAMI.length);
      if (trail.current.join() === KONAMI.join()) {
        trail.current = [];
        document.documentElement.classList.add("konami");
        setTimeout(() => document.documentElement.classList.remove("konami"), 1400);
        navigator.clipboard?.writeText(profile.email).catch(() => {});
        toast("Cheat code accepted. +30 lives, and my email is on your clipboard.");
        return;
      }

      if (e.ctrlKey || e.metaKey || e.altKey || e.repeat) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      if (document.getElementById("palette-search")) return;
      if (e.shiftKey && key !== "?") return;

      const n = Number(key);
      let act: (() => void) | null = null;
      let id = key;
      let close = true;

      if (key === "?") {
        act = () => setSheet((s) => !s);
        close = false;
      } else if (key === "escape" && sheet) act = () => {};
      else if (key === "/") act = () => window.dispatchEvent(new Event("open-palette"));
      else if (key === "0") act = () => (home ? window.scrollTo({ top: 0 }) : router.push("/"));
      else if (n >= 1 && n <= sections.length) {
        id = "1";
        act = () => go(sections[n - 1].id);
      } else if (key === "j" || key === "k") {
        id = "j";
        act = () => step(key === "j" ? 1 : -1);
      } else if (key === "d") {
        act = toggleTheme;
        close = false;
      } else if (key === "e") {
        act = copyEmail;
        close = false;
      } else if (key === "p") act = () => (window.location.href = profile.problemMail);
      else if (key === "r") act = () => router.push(profile.resume);
      else if (key === "g") act = () => ext(profile.github);
      else if (key === "l") act = () => ext(profile.linkedin);

      if (!act) return;
      e.preventDefault();
      flash(id);
      if (close) setSheet(false);
      act();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pathname, router, sheet]);

  return (
    <>
      {sheet && (
        <div className="pal-backdrop" onMouseDown={() => setSheet(false)}>
          <div className="pal keys" role="dialog" aria-modal="true" aria-label="Keyboard shortcuts" onMouseDown={(e) => e.stopPropagation()}>
            <div className="keys-head">
              <b>Keyboard shortcuts</b>
              <span>For people who live in Linear and Superhuman. Try one now.</span>
            </div>
            <ul className="keys-list">
              {rows.map((r) => (
                <li key={r.id} className={hit === r.id ? "hit" : undefined}>
                  <span className="keys-caps">
                    {r.keys.map((k, i) => (k === "–" ? <i key={i}>–</i> : <kbd key={i} className="key">{k}</kbd>))}
                  </span>
                  {r.label}
                </li>
              ))}
            </ul>
            <div className="pal-foot">
              <span>There&apos;s one more. Anyone who grew up with a NES knows it.</span>
              <span className="keys-esc">esc close</span>
            </div>
          </div>
        </div>
      )}
      <div className="toast-host" role="status" aria-live="polite">
        {msg && (
          <div key={msg.n} className="toast">
            <span className="dot" aria-hidden="true" />
            {msg.text}
          </div>
        )}
      </div>
    </>
  );
}
