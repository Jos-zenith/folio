import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Figure from "@/components/Figure";
import { projects, statusClass } from "@/lib/data";

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

export default async function CaseStudy({ params }: Params) {
  const { slug } = await params;
  const i = projects.findIndex((x) => x.slug === slug);
  if (i === -1) notFound();
  const p = projects[i];
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];
  const fig = Figure({ project: p });

  return (
    <main className="case wrap">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link href="/#work">Work</Link>
        <span aria-hidden="true">/</span>
        <Link href="/#projects">{p.category}</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{p.title}</span>
      </nav>

      <header className="case-head">
        <div className="card-top">
          <span className="area">{p.category}</span>
          {p.year && <span className="area">{p.year}</span>}
          <span className={`pill ${statusClass[p.status]}`}>{p.status}</span>
        </div>
        <h1>{p.title}</h1>
        <p className="tag">{p.tagline}</p>
        <p className="lede">{p.summary}</p>
        <div className="ctas">
          {p.live && (
            <a className="btn primary" href={p.live} target="_blank" rel="noopener">
              Open it live ↗
            </a>
          )}
          {p.code && (
            <a className="btn" href={p.code} target="_blank" rel="noopener">
              Read the code ↗
            </a>
          )}
          {p.docs?.map(([label, href]) => (
            <a key={href} className="btn ghost" href={href} target="_blank" rel="noopener">
              {label} ↗
            </a>
          ))}
        </div>
      </header>

      <div className="case-body">
        <div className="case-main">
          {fig && <div className="case-fig">{fig}</div>}

          <section className="case-sec">
            <h2>
              <span>01</span>The problem
            </h2>
            <p>{p.problem}</p>
          </section>

          <section className="case-sec">
            <h2>
              <span>02</span>Decisions and why
            </h2>
            <ol className="decisions">
              {p.decisions.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ol>
          </section>

          <section className="case-sec">
            <h2>
              <span>03</span>What came out of it
            </h2>
            <ul className="outcomes">
              {p.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="case-side">
          <div className="side-block">
            <h2>My role</h2>
            <p>{p.role}</p>
          </div>
          <div className="side-block">
            <h2>Key facts</h2>
            <dl className="facts">
              {p.facts.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="side-block">
            <h2>Built with</h2>
            <p className="chips">
              {p.stack.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </p>
          </div>
        </aside>
      </div>

      <nav className="pager" aria-label="More projects">
        <Link href={`/work/${prev.slug}`}>
          <small>← Previous</small>
          <b>{prev.title}</b>
        </Link>
        <Link className="nx" href={`/work/${next.slug}`}>
          <small>Next →</small>
          <b>{next.title}</b>
        </Link>
      </nav>
    </main>
  );
}
