"use client";

import Link from "next/link";
import { useState } from "react";
import { categories, projects, statusClass, type Category } from "@/lib/data";

type Filter = "All" | Category;

/** Rows shown before "Show all". */
const FIRST = 8;

/** Every project as one filterable table: year, name, area, status and links. */
export default function ProjectIndex() {
  const [filter, setFilter] = useState<Filter>("All");
  const [all, setAll] = useState(false);
  const filters: Filter[] = ["All", ...categories];
  const rows = projects
    .filter((p) => filter === "All" || p.category === filter)
    .sort((a, b) => (b.year || "0").localeCompare(a.year || "0"));
  const shown = all ? rows : rows.slice(0, FIRST);

  return (
    <div className="pindex">
      <div className="filters" role="group" aria-label="Filter projects by area">
        {filters.map((f) => {
          const n = f === "All" ? projects.length : projects.filter((p) => p.category === f).length;
          return (
            <button key={f} type="button" aria-pressed={filter === f} onClick={() => setFilter(f)}>
              {f} <span>{n}</span>
            </button>
          );
        })}
      </div>
      <ul className="ptable">
        <li className="ptable-head" aria-hidden="true">
          <span>Year</span>
          <span>Project</span>
          <span>Area</span>
          <span>Status</span>
          <span>Links</span>
        </li>
        {shown.map((p) => (
          <li key={p.slug}>
            <span className="yr">{p.year || "—"}</span>
            <span className="nm">
              <Link href={`/work/${p.slug}`}>{p.title}</Link>
              <small>{p.tagline}</small>
            </span>
            <span className="ar">{p.category}</span>
            <span className="st">
              <span className={`pill ${statusClass[p.status]}`}>{p.status}</span>
            </span>
            <span className="lk">
              {p.live && (
                <a href={p.live} target="_blank" rel="noopener" aria-label={`${p.title}, live site`}>
                  Live ↗
                </a>
              )}
              {p.code && (
                <a href={p.code} target="_blank" rel="noopener" aria-label={`${p.title}, source code`}>
                  Code ↗
                </a>
              )}
            </span>
          </li>
        ))}
      </ul>
      {rows.length > FIRST && (
        <button type="button" className="more" aria-expanded={all} onClick={() => setAll((a) => !a)}>
          {all ? "Show fewer" : `Show all ${rows.length}`}
        </button>
      )}
    </div>
  );
}
