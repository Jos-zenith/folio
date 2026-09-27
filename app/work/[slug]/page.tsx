import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Figure from "@/components/Figure";
import { chapters, projects, statusClass } from "@/lib/data";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  return { title: p.title, description: p.summary };
}

const tabColor: Record<string, string> = { money: "t-yellow", field: "t-green", machines: "t-blue" };

const pg = (n: number) => `p. ${String(n).padStart(2, "0")}`;

export default async function CaseStudy({ params }: Params) {
  const { slug } = await params;
  const i = projects.findIndex((x) => x.slug === slug);
  if (i === -1) notFound();
  const p = projects[i];
  const ch = chapters.find((c) => c.name === p.category)!;
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];
  const prevN = ((i - 1 + projects.length) % projects.length) + 1;
  const nextN = ((i + 1) % projects.length) + 1;

  return (
    <main>
      <div className="book">
      <section className="leaf ruled">
        <a className={`tab ${tabColor[ch.id]}`} href={`/#${ch.id}`}>
          Ch. {ch.num}
        </a>
        <div className="inner">
        <header className="case-head">
          <div className="crumbs">
            <Link href="/#index">← Contents</Link>
            <span>/</span>
            <Link href={`/#${ch.id}`}>
              Ch. {ch.num} · {ch.name}
            </Link>
            <span>/</span>
            <span>{pg(i + 1)}</span>
          </div>
          <span className={`stamp bigstamp ${statusClass[p.status]}`}>{p.status}</span>
          <h1>{p.title}</h1>
          <p className="tagline">
            <mark>{p.tagline}</mark>
          </p>
          <p className="lede">{p.summary}</p>
          <div className="case-actions">
            {p.live && (
              <a className="btn pen" href={p.live} target="_blank" rel="noopener">
                Open it live ↗
              </a>
            )}
            {p.code && (
              <a className="btn" href={p.code} target="_blank" rel="noopener">
                Read the code ↗
              </a>
            )}
          </div>
        </header>

        <div className="case-body">
          <div>
            <div className="case-fig">
              <Figure project={p} />
            </div>

            <section className="qa">
              <div className="q">
                <span>Q1.</span>
                <h2>What was broken?</h2>
              </div>
              <div className="a">
                <span>Ans.</span>
                <p>{p.problem}</p>
              </div>
            </section>

            <section className="qa">
              <div className="q">
                <span>Q2.</span>
                <h2>What did I decide, and why?</h2>
              </div>
              <div className="a">
                <span>Ans.</span>
                <ul>
                  {p.decisions.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="qa">
              <div className="q">
                <span>Q3.</span>
                <h2>What came out of it?</h2>
              </div>
              <div className="a">
                <span>Ans.</span>
                <ul>
                  {p.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </div>
            </section>
          </div>

          <aside className="side">
            <div>
              <p className="note red" style={{ fontSize: 16 }}>my role</p>
              <p className="role">{p.role}</p>
            </div>
            <div className="spec taped">
              <h3>Spec sheet</h3>
              <dl>
                {p.year && (
                  <div>
                    <dt>Year</dt>
                    <dd>{p.year}</dd>
                  </div>
                )}
                {p.facts.map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <p className="note red" style={{ fontSize: 16 }}>built with</p>
              <p className="stackline">
                {p.stack.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </p>
            </div>
          </aside>
        </div>

        <nav className="pager" aria-label="Turn the page">
          <Link href={`/work/${prev.slug}`}>
            <small>← {pg(prevN)}</small>
            <b>{prev.title}</b>
          </Link>
          <Link className="nx" href={`/work/${next.slug}`}>
            <small>{pg(nextN)} →</small>
            <b>{next.title}</b>
          </Link>
        </nav>
        </div>
      </section>
      </div>
    </main>
  );
}
