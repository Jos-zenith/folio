"use client";

import Link from "next/link";
import { useState } from "react";
import { statusClass, type Project } from "@/lib/data";

type Variant = "ledger" | "notes" | "parts";

/** The rest of a chapter's projects, drawn in that chapter's own paper format. */
export default function MorePages({ items, variant, chapterNo }: { items: Project[]; variant: Variant; chapterNo: string }) {
  const [open, setOpen] = useState(false);
  const limit = variant === "notes" ? 3 : items.length;
  const visible = open ? items : items.slice(0, limit);
  const hidden = items.length - limit;

  if (variant === "ledger") {
    return (
      <div className="ledger-tbl" role="table" aria-label="More projects in this chapter">
        <div className="ledger-cap">
          <span>Entries</span>
          <span>{items.length} more</span>
        </div>
        <div className="lg-row h" role="row">
          <span className="d" role="columnheader">Date</span>
          <span className="pt" role="columnheader">Particulars</span>
          <span className="st" role="columnheader">Status</span>
          <span role="columnheader" />
        </div>
        {items.map((p) => (
          <Link key={p.slug} href={`/work/${p.slug}`} className="lg-row" role="row">
            <span className="d" role="cell">{p.year || "—"}</span>
            <span className="pt" role="cell">
              <b>{p.title}</b>
              <small>{p.tagline}</small>
            </span>
            <span className="st" role="cell">
              <span className={`stamp ${statusClass[p.status]}`}>{p.status}</span>
            </span>
            <span className="go" role="cell">→</span>
          </Link>
        ))}
      </div>
    );
  }

  if (variant === "parts") {
    return (
      <div className="parts">
        {items.map((p, i) => (
          <Link key={p.slug} href={`/work/${p.slug}`} className="part">
            <span className="no">
              PART {chapterNo}-{String.fromCharCode(65 + i)} · {p.status.toUpperCase()}
            </span>
            <b>{p.title}</b>
            <span>{p.tagline}</span>
          </Link>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="notes">
        {visible.map((p) => (
          <Link key={p.slug} href={`/work/${p.slug}`} className="fnote">
            <span className="when">{p.year ? `field note, ${p.year}` : "field note"}</span>
            <b>{p.title}</b>
            <span>{p.tagline}</span>
            <span className={`stamp ${statusClass[p.status]}`}>{p.status}</span>
          </Link>
        ))}
      </div>
      {hidden > 0 && (
        <button type="button" className="turnmore" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
          {open ? "fold these notes back ↑" : `turn ${hidden} more note${hidden > 1 ? "s" : ""} ↓`}
        </button>
      )}
    </>
  );
}
