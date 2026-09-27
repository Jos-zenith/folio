"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Pen effects that play when an element scrolls into view:
 *  - svg[data-draw]: the doodle is traced in stroke by stroke.
 *  - [data-reveal]: gets .is-in (used for the red-pen strike-throughs in the diary).
 * Without JS, or with reduced motion, everything simply shows in its finished state.
 */
export default function DrawObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const svgs = Array.from(document.querySelectorAll<SVGSVGElement>("svg[data-draw]"));
    const reveals = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    const shapes = (svg: SVGSVGElement) => svg.querySelectorAll<SVGGeometryElement>("path, circle, ellipse, rect");
    svgs.forEach((svg) =>
      shapes(svg).forEach((el) => {
        const len = Math.ceil(el.getTotalLength?.() ?? 0);
        if (!len) return;
        el.style.strokeDasharray = `${len}`;
        el.style.strokeDashoffset = `${len}`;
      })
    );
    reveals.forEach((el) => el.classList.add("pre"));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const t = e.target as HTMLElement;
          if (t instanceof SVGSVGElement) {
            shapes(t).forEach((el, i) => {
              el.style.transition = `stroke-dashoffset 1.3s ${0.15 * i}s ease-out`;
              el.style.strokeDashoffset = "0";
            });
          } else {
            t.classList.add("is-in");
          }
          io.unobserve(t);
        });
      },
      { rootMargin: "0px 0px -12% 0px" }
    );
    [...svgs, ...reveals].forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
