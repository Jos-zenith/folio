"use client";

import { useEffect, useState } from "react";
import { heroNumbers } from "@/lib/data";

const EVERY = 5200;

/** The hero's signature: one big number at a time, each with the fact behind it. Pauses on hover and focus. */
export default function NumberCycler() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [still, setStill] = useState(true);

  useEffect(() => {
    setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (paused || still) return;
    const t = setTimeout(() => setI((n) => (n + 1) % heroNumbers.length), EVERY);
    return () => clearTimeout(t);
  }, [i, paused, still]);

  const n = heroNumbers[i];

  return (
    <aside
      className="cycler"
      aria-label="Numbers behind my work"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="cycler-top">
        <span>By the numbers</span>
        <span>
          {String(i + 1).padStart(2, "0")} / {String(heroNumbers.length).padStart(2, "0")}
        </span>
      </div>
      <a className="cycler-body" href={n.href} key={i}>
        <span className={`cycler-num${n.strike ? " struck" : ""}`}>{n.value}</span>
        <span className="cycler-label">{n.label}</span>
        <span className="cycler-tag">{n.tag} →</span>
      </a>
      <div className="cycler-dots" role="group" aria-label="Choose a number">
        {heroNumbers.map((h, k) => (
          <button
            key={h.tag}
            type="button"
            aria-label={`${h.value}: ${h.tag}`}
            aria-current={k === i}
            onClick={() => setI(k)}
          >
            {k === i &&
              (paused || still ? (
                <i className="full" />
              ) : (
                <i key={`${i}-${paused}`} className="run" style={{ animationDuration: `${EVERY}ms` }} />
              ))}
          </button>
        ))}
      </div>
    </aside>
  );
}
