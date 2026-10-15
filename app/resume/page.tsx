import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "@/components/PrintButton";
import { awards, experience, profile, projects, samples, selected, skills } from "@/lib/data";

export const metadata: Metadata = {
  title: "Résumé",
  description: `${profile.name}: résumé for ${profile.seeking}.`,
};

const bare = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

/** One printable page, generated from the same data as the site so the two never drift apart. */
export default function Resume() {
  const roles = experience.filter((r) => r.kind !== "Education" && !r.minor);
  const live = projects.filter((p) => p.status === "Live").length;

  return (
    <main className="resume wrap">
      <div className="no-print resume-bar">
        <Link href="/">← Back to the portfolio</Link>
        <PrintButton />
      </div>

      <article className="sheet">
        <header className="r-head">
          <div>
            <h1>{profile.name}</h1>
            <p className="r-role">
              {profile.seeking} · {profile.location}
            </p>
          </div>
          <p className="r-contact">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <a href={`tel:${profile.phoneRaw}`}>{profile.phone}</a>
            <a href={profile.site}>{bare(profile.site)}</a>
            <a href={profile.linkedin}>{bare(profile.linkedin)}</a>
            <a href={profile.github}>{bare(profile.github)}</a>
          </p>
        </header>

        <p className="r-summary">
          I take a messy problem from the first question to a shipped, measured result. Co-founder and CTO of a smart-parking
          startup, captain of a 20+ person EV team that placed 3rd nationally, president of a club that ran a 500-person
          symposium from a ₹0 budget, and builder of {live} live products, each with a written case study. I do the arithmetic
          before the plan and publish what didn&apos;t work.
        </p>

        <section>
          <h2>Work samples</h2>
          <ul className="r-list">
            {samples.map((s) => {
              const p = projects.find((x) => x.slug === s.slug)!;
              return (
                <li key={s.slug}>
                  <b>{p.title}</b> <span className="r-kind">· {s.kind}</span>
                  <p>
                    {s.problem} {s.verdict}
                  </p>
                </li>
              );
            })}
          </ul>
        </section>

        <section>
          <h2>Experience and leadership</h2>
          <ul className="r-list">
            {roles.map((r) => (
              <li key={r.title + r.org}>
                <div className="r-line">
                  <b>
                    {r.title}, {r.org}
                  </b>
                  <span>{r.period}</span>
                </div>
                <p>{r.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2>Selected products</h2>
          <ul className="r-list">
            {selected
              .filter(({ slug }) => !samples.some((s) => s.slug === slug))
              .map(({ slug, metrics }) => {
              const p = projects.find((x) => x.slug === slug)!;
              return (
                <li key={slug}>
                  <div className="r-line">
                    <b>
                      {p.title} <span className="r-kind">· {p.tagline}</span>
                    </b>
                    <a href={`${profile.site}/work/${slug}`}>case study</a>
                  </div>
                  <p>{metrics.map(([v, l]) => `${v} ${l}`).join(" · ")}</p>
                </li>
              );
            })}
          </ul>
        </section>

        <section>
          <h2>Recognition</h2>
          <p className="r-inline">
            {awards
              .slice(0, 7)
              .map((a) => `${a.place} ${a.event} (${a.detail})`)
              .join(" · ")}
          </p>
        </section>

        <section>
          <h2>Toolkit and education</h2>
          <ul className="r-plain">
            {skills.slice(0, 3).map((s) => (
              <li key={s.group}>
                <b>{s.group}:</b> {s.core.join(", ")}
              </li>
            ))}
            <li>
              <b>Also:</b> {skills.slice(3).flatMap((s) => s.core).join(", ")}. <b>Languages:</b> {profile.languages.join(", ")}
            </li>
            <li>
              <b>Education:</b> {profile.education}
            </li>
          </ul>
        </section>
      </article>
    </main>
  );
}
