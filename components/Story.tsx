"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { story } from "@/lib/data";

const BAR = 60; // sticky top offset: height of the top bar

/**
 * Year-per-page story. On wide screens the section pins while you scroll and
 * the pages slide sideways, so every page is seen before the site moves on.
 * On phones it falls back to a swipeable row.
 */
export default function Story() {
  const outer = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const dist = useRef(0);
  const [pinned, setPinned] = useState(false);
  const [cur, setCur] = useState(0);
  const total = story.length + 1; // plus the blank "to be continued" page

  const update = useCallback(() => {
    const o = outer.current;
    const t = track.current;
    if (!o || !t || !dist.current) return;
    const top = o.getBoundingClientRect().top - BAR;
    const p = Math.min(1, Math.max(0, -top / dist.current));
    t.style.transform = `translate3d(${-p * dist.current}px,0,0)`;
    if (bar.current) bar.current.style.width = `${p * 100}%`;
    setCur(Math.round(p * (total - 1)));
  }, [total]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 760px)");
    let raf = 0;
    const measure = () => {
      const o = outer.current;
      const t = track.current;
      if (!o || !t) return;
      if (!mq.matches) {
        setPinned(false);
        dist.current = 0;
        o.style.height = "";
        t.style.transform = "";
        return;
      }
      setPinned(true);
      const frame = o.querySelector<HTMLElement>(".hs-frame");
      const visible = frame ? frame.clientWidth : o.clientWidth;
      dist.current = Math.max(0, t.scrollWidth - visible);
      o.style.height = `calc(100vh - ${BAR}px + ${dist.current}px)`;
      update();
    };
    const onScroll = () => {
      if (!mq.matches) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    mq.addEventListener("change", measure);
    document.fonts?.ready.then(measure);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      mq.removeEventListener("change", measure);
    };
  }, [update]);

  // Phone fallback: track which page is in view of the swipe row.
  useEffect(() => {
    if (pinned) return;
    const t = track.current;
    if (!t) return;
    const onScroll = () => {
      const w = (t.children[0] as HTMLElement)?.offsetWidth || 1;
      setCur(Math.round(t.scrollLeft / (w + 24)));
    };
    t.addEventListener("scroll", onScroll, { passive: true });
    return () => t.removeEventListener("scroll", onScroll);
  }, [pinned]);

  const go = (i: number) => {
    const n = Math.max(0, Math.min(total - 1, i));
    const o = outer.current;
    const t = track.current;
    if (!o || !t) return;
    if (pinned) {
      const start = o.getBoundingClientRect().top + window.scrollY - BAR;
      window.scrollTo({ top: start + (n / (total - 1)) * dist.current + 1, behavior: "smooth" });
    } else {
      const page = t.children[n] as HTMLElement;
      t.scrollTo({ left: page.offsetLeft - t.offsetLeft, behavior: "smooth" });
    }
  };

  return (
    <div ref={outer} className={`hs${pinned ? " pinned" : ""}`}>
      <div className="hs-sticky">
        <div className="story-nav">
          <div className="years" role="tablist" aria-label="Years">
            {story.map((s, i) => (
              <button key={s.year} type="button" aria-current={cur === i} onClick={() => go(i)}>
                {s.year}
              </button>
            ))}
            <button type="button" aria-current={cur === story.length} onClick={() => go(story.length)}>
              next…
            </button>
          </div>
          <div className="arrows">
            <button type="button" className="iconbtn" aria-label="Previous page" onClick={() => go(cur - 1)} disabled={cur === 0}>
              ←
            </button>
            <button type="button" className="iconbtn" aria-label="Next page" onClick={() => go(cur + 1)} disabled={cur === total - 1}>
              →
            </button>
          </div>
        </div>
        <div className="hs-frame">
          <div ref={track} className="pages">
            {story.map((s, i) => (
              <article className="page" key={s.year} aria-label={`${s.year}: ${s.mood}`}>
                <div className="yr">{s.year}</div>
                <div className="mood">{s.mood}</div>
                <ul>
                  {s.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
                <span className="pno">pg. {i + 1}</span>
                {i === 1 && <span className="coffee" aria-hidden="true" />}
              </article>
            ))}
            <article className="page blank" aria-label="The next page, not written yet">
              <div className="yr">20__</div>
              <div className="mood">to be continued…</div>
              <p>This page is still blank. I&apos;m writing it now.</p>
              <span className="pno">pg. {story.length + 1}</span>
            </article>
          </div>
        </div>
        <div className="hs-progress" aria-hidden="true">
          <span ref={bar} />
        </div>
      </div>
    </div>
  );
}
