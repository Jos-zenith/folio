import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "@/components/PrintButton";
import { profile, resume } from "@/lib/data";

export const metadata: Metadata = {
  title: "Résumé",
  description: `${profile.name}: résumé for ${profile.seeking}.`,
};

/** One printable page. The wording lives in `resume` in lib/data.ts. */
export default function Resume() {
  const { education: edu } = resume;

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
            <a href={`tel:${profile.phoneRaw}`}>{profile.phone}</a>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <span className="r-links">
              <a href={profile.site}>Portfolio</a> · <a href={profile.linkedin}>LinkedIn</a> ·{" "}
              <a href={profile.github}>GitHub</a> · <a href={profile.leetcode}>LeetCode</a>
            </span>
          </p>
        </header>

        <section>
          <h2>Summary</h2>
          <p>{resume.summary}</p>
        </section>

        <section>
          <h2>Experience</h2>
          <ul className="r-list">
            {resume.roles.map((r) => (
              <li key={r.title + r.org}>
                <div className="r-line">
                  <b>
                    {r.title}, {r.org}
                    {r.note && <span className="r-kind"> ({r.note})</span>}
                  </b>
                  <span>{r.period}</span>
                </div>
                <ul className="r-bullets">
                  {r.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <p className="r-also">
            <b>Also:</b> {resume.also}
          </p>
        </section>

        <section>
          <h2>Key projects</h2>
          <ul className="r-bullets r-projects">
            {resume.projects.map((p) => (
              <li key={p.slug}>
                <b>
                  <a href={`${profile.site}/work/${p.slug}`}>{p.name}</a> [{p.tag}]:
                </b>{" "}
                {p.body}
              </li>
            ))}
            <li>
              <b>Also shipped:</b> {resume.alsoShipped}
            </li>
          </ul>
        </section>

        <section>
          <h2>Education</h2>
          <div className="r-line">
            <b>{edu.school}</b>
            <span>{edu.period}</span>
          </div>
          <p>
            {edu.degree} · CGPA {edu.cgpa}
          </p>
        </section>

        <section>
          <h2>Skills</h2>
          <ul className="r-bullets r-projects">
            {resume.skills.map(([group, items]) => (
              <li key={group}>
                <b>{group}:</b> {items}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2>Achievements and certifications</h2>
          <ul className="r-bullets r-projects">
            {resume.achievements.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </section>
      </article>
    </main>
  );
}
