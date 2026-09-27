import Link from "next/link";
import { chapters, projects } from "@/lib/data";

const extras = [
  { id: "story", label: "The story so far", note: "one year per page" },
  { id: "beyond", label: "The people side", note: "clubs, communities, founders" },
  { id: "report", label: "Report card", note: "podiums and what I'm learning" },
  { id: "contact", label: "Write to me", note: "the last page" },
];

/** A notebook-style table of contents: chapters with dotted leaders and their pages as small tags. */
export default function Contents() {
  let page = 2;
  return (
    <ol className="toc">
      {chapters.map((c) => {
        const list = projects.filter((p) => p.category === c.name);
        const from = page;
        page += list.length;
        return (
          <li key={c.id} className={`toc-item tone-${c.id}`}>
            <a className="toc-row" href={`#${c.id}`}>
              <span className="toc-num">Ch. {c.num}</span>
              <span className="toc-main">
                <b>{c.name}</b>
                <small>{c.title}</small>
              </span>
              <span className="toc-dots" aria-hidden="true" />
              <span className="toc-pg">
                p. {String(from).padStart(2, "0")}–{String(page - 1).padStart(2, "0")}
              </span>
            </a>
            <div className="toc-chips">
              {list.map((p) => (
                <Link key={p.slug} href={`/work/${p.slug}`}>
                  {p.title}
                </Link>
              ))}
            </div>
          </li>
        );
      })}
      {extras.map((e) => (
        <li key={e.id} className="toc-item minor">
          <a className="toc-row" href={`#${e.id}`}>
            <span className="toc-num">✎</span>
            <span className="toc-main">
              <b>{e.label}</b>
              <small>{e.note}</small>
            </span>
            <span className="toc-dots" aria-hidden="true" />
            <span className="toc-pg">→</span>
          </a>
        </li>
      ))}
    </ol>
  );
}
