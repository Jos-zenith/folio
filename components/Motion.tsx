"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const NUM = /^(\D*?)(\d[\d,]*(?:\.\d+)?)(\D*)$/;

/** Animates a "₹3.6 L"-style string from zero to its value, keeping prefix, suffix, decimals and commas. */
function countUp(el: HTMLElement) {
  const target = el.dataset.final ?? el.textContent ?? "";
  const m = target.match(NUM);
  if (!m) return;
  const [, pre, raw, post] = m;
  const end = parseFloat(raw.replace(/,/g, ""));
  const decimals = raw.includes(".") ? raw.split(".")[1].length : 0;
  const commas = raw.includes(",");
  const fmt = (v: number) => {
    const s = v.toFixed(decimals);
    return commas ? Number(s).toLocaleString("en-IN", { minimumFractionDigits: decimals }) : s;
  };
  const t0 = performance.now();
  const dur = 1100;
  const tick = (t: number) => {
    const k = Math.min(1, (t - t0) / dur);
    const eased = 1 - Math.pow(1 - k, 3);
    el.textContent = pre + fmt(end * eased) + post;
    if (k < 1) requestAnimationFrame(tick);
    else el.textContent = target;
  };
  requestAnimationFrame(tick);
}

/**
 * Site-wide motion: a reading-progress bar, reveal-on-scroll for [data-reveal],
 * and count-up for [data-count]. Everything is off under prefers-reduced-motion,
 * and the server-rendered text is always the final value.
 */
export default function Motion() {
  const pathname = usePathname();
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? h.scrollTop / max : 0})`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [pathname]);

  useEffect(() => {
    const root = document.documentElement;
    const reveals = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.in)"));
    const counts = Array.from(document.querySelectorAll<HTMLElement>("[data-count]:not([data-done])"));
    const still = !root.classList.contains("motion") || !("IntersectionObserver" in window);

    if (still) {
      reveals.forEach((el) => el.classList.add("in"));
      return;
    }

    // Numbers below the fold start at zero; ones already on screen stay put.
    counts.forEach((el) => {
      el.dataset.final = el.textContent ?? "";
      if (el.getBoundingClientRect().top < window.innerHeight) {
        el.dataset.done = "1";
        return;
      }
      const m = el.dataset.final.match(NUM);
      if (m) el.textContent = m[1] + "0" + m[3];
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          if (el.hasAttribute("data-count") && !el.dataset.done) {
            el.dataset.done = "1";
            countUp(el);
          }
          if (el.hasAttribute("data-reveal")) el.classList.add("in");
          io.unobserve(el);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );
    reveals.forEach((el) => io.observe(el));
    counts.forEach((el) => !el.dataset.done && io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return <div className="progress" ref={bar} aria-hidden="true" />;
}
