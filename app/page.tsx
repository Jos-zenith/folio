import Link from "next/link";
import CopyButton from "@/components/CopyButton";
import MemoDeck from "@/components/MemoDeck";
import NumberCycler from "@/components/NumberCycler";
import ProblemPicker from "@/components/ProblemPicker";
import ProjectIndex from "@/components/ProjectIndex";
import {
  awards,
  experience,
  learning,
  now,
  operatingLog,
  operations,
  profile,
  projects,
  selected,
  skills,
  statusClass,
  ticker,
} from "@/lib/data";

/** Bento sizes for the selected products, in the order they're laid out. */
const bento: [string, "xl" | "wide" | "sm"][] = [
  ["operation-nolambur", "xl"],
  ["vina", "wide"],
  ["impact-ledger", "sm"],
  ["uzhavan", "sm"],
  ["compintel", "wide"],
  ["blastwatch", "wide"],
];

/** A plain number ("8+", "0.961", "₹3.6 L") counts up on scroll; ranges and words stay as they are. */
const countable = (v: string) => /^[^\d–]*\d[\d,]*(\.\d+)?[^\d–]*$/.test(v);

/** Trustify's story in one picture: a victim's instalments fan out to mules and on to cash-out within minutes. */
function MoneyTrail() {
  const mules = [28, 75, 122];
  const layer2 = [48, 102];
  return (
    <figure className="trail" aria-label="How a UPI scam moves money: victim to first-layer mules to a second layer to cash-out">
      <svg viewBox="0 0 520 150" aria-hidden="true">
        {mules.map((y) => (
          <path key={`v${y}`} className="trail-edge hot" d={`M44 75 C 110 75, 110 ${y}, 176 ${y}`} />
        ))}
        {mules.map((y, i) => (
          <path
            key={`m${y}`}
            className={`trail-edge${i !== 1 ? " hot" : ""}`}
            d={`M204 ${y} C 260 ${y}, 260 ${layer2[i === 2 ? 1 : 0]}, 316 ${layer2[i === 2 ? 1 : 0]}`}
          />
        ))}
        {layer2.map((y) => (
          <path key={`l${y}`} className="trail-edge hot" d={`M344 ${y} C 400 ${y}, 400 75, 456 75`} />
        ))}
        <circle className="trail-node victim" cx="30" cy="75" r="14" />
        {mules.map((y, i) => (
          <circle key={`n${y}`} className={`trail-node${i !== 1 ? " flag" : ""}`} cx="190" cy={y} r="12" />
        ))}
        {layer2.map((y) => (
          <circle key={`n2${y}`} className="trail-node flag" cx="330" cy={y} r="12" />
        ))}
        <circle className="trail-node" cx="470" cy="75" r="14" />
        <text className="trail-lbl" x="30" y="112" textAnchor="middle">victim</text>
        <text className="trail-lbl" x="190" y="148" textAnchor="middle">first-layer mules</text>
        <text className="trail-lbl" x="330" y="136" textAnchor="middle">layer 2</text>
        <text className="trail-lbl" x="470" y="112" textAnchor="middle">cash-out</text>
      </svg>
      <figcaption className="trail-cap">Instalments under the ₹1 lakh cap, forwarded in minutes. Green: held before payout.</figcaption>
    </figure>
  );
}

function SectionHead({ num, label, title, lede }: { num: string; label: string; title: string; lede?: string }) {
  return (
    <header className="shead" data-reveal>
      <span className="kicker">
        <i>{num}</i>
        {label}
      </span>
      <h2>{title}</h2>
      {lede && <p>{lede}</p>}
    </header>
  );
}

export default function Home() {
  const live = projects.filter((p) => p.status === "Live").length;
  const work = experience.filter((r) => r.kind === "Work" || r.kind === "Venture");
  const lead = experience.filter((r) => r.kind === "Leadership" || r.kind === "Education");

  return (
    <main>
      {/* ============ HERO ============ */}
      <section className="hero wrap" id="top" aria-labelledby="hero-name">
        <div className="hero-main">
          <span className="eyebrow status">
            <i className="dot" aria-hidden="true" />
            Open to {profile.seeking}
          </span>
          <h1 id="hero-name">
            Zenith
            <br />
            Joshua J
          </h1>
          <p className="hero-line">
            I do the <mark>arithmetic</mark> before the plan, then I ship it.
          </p>
          <p className="hero-sub">
            Co-founder &amp; CTO, EV team captain, club president, APM intern. {live} live products, each with a written case
            study. B.Tech IT &apos;27, LICET, {profile.location}.
          </p>
          <div className="ctas">
            <a className="btn primary" href={profile.problemMail}>
              Send me a problem →
            </a>
            <Link className="btn" href={profile.resume}>
              Résumé
            </Link>
            <a className="btn ghost" href={profile.linkedin} target="_blank" rel="noopener">
              LinkedIn ↗
            </a>
            <a className="btn ghost" href={profile.github} target="_blank" rel="noopener">
              GitHub ↗
            </a>
          </div>
          <p className="cta-note">Two sentences about a problem on your desk; a one-page memo back within 24 hours.</p>
        </div>
        <NumberCycler />
      </section>

      <div className="ticker" aria-label="Highlights">
        <div className="ticker-track">
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1 ? true : undefined}>
              {ticker.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      {/* ============ FOUNDER MEMOS ============ */}
      <section className="section wrap" id="samples">
        <SectionHead
          num="01"
          label="Founder memos"
          title="Three times the numbers changed the plan."
          lede="Most founder's-office work is deciding what not to do. Pick a memo: the chart, the quick take, and the document behind it."
        />
        <div data-reveal>
          <MemoDeck />
        </div>
      </section>

      {/* ============ THROW ME A PROBLEM ============ */}
      <section className="section band" id="problem">
        <div className="wrap">
          <SectionHead
            num="02"
            label="Throw me a problem"
            title="Pick a fire. Here's my first week."
            lede="Every plan starts with the arithmetic and ends with one number to watch."
          />
          <div data-reveal>
            <ProblemPicker />
          </div>
        </div>
      </section>

      {/* ============ PRODUCTS ============ */}
      <section className="section wrap" id="work">
        <SectionHead
          num="03"
          label="Products"
          title="Built, shipped, measured."
          lede="Six flagships with live builds and public code. Each case study covers the decisions and what didn't work."
        />
        <div className="bento">
          {bento.map(([slug, size]) => {
            const sel = selected.find((x) => x.slug === slug)!;
            const p = projects.find((x) => x.slug === slug)!;
            const [lead, ...rest] = sel.metrics;
            return (
              <article className={`tile tile-${size}`} key={slug} data-reveal>
                <div className="tile-top">
                  <span>{p.category}</span>
                  <span className={`pill ${statusClass[p.status]}`}>{p.status}</span>
                </div>
                <h3>
                  <Link className="tile-link" href={`/work/${slug}`}>
                    {p.title}
                  </Link>
                </h3>
                <p className="tile-tag">{p.tagline}</p>
                {size === "xl" && <MoneyTrail />}
                <p className="tile-big">
                  <span {...(countable(lead[0]) ? { "data-count": "" } : {})}>{lead[0]}</span>
                  <small>{lead[1]}</small>
                </p>
                {size !== "sm" && <p className="tile-problem">{sel.problem}</p>}
                {size === "xl" && (
                  <dl className="tile-more">
                    {rest.map(([v, l]) => (
                      <div key={l}>
                        <dd>{v}</dd>
                        <dt>{l}</dt>
                      </div>
                    ))}
                  </dl>
                )}
                <div className="tile-links">
                  <span className="tile-go" aria-hidden="true">
                    Case study →
                  </span>
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noopener">
                      Live ↗
                    </a>
                  )}
                  {p.code && (
                    <a href={p.code} target="_blank" rel="noopener">
                      Code ↗
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ============ OPERATIONS ============ */}
      <section className="section ink" id="operations">
        <div className="wrap">
          <SectionHead
            num="04"
            label="Operations"
            title="Teams, budgets and deadlines I've run."
            lede="Founder's-office work from the plan to the day itself. Two of these began with a “no”. Open any card for what I built."
          />
          <div className="wall">
            {operations.map((o) => (
              <article className="wall-item" key={o.title} data-reveal>
                <p className="wall-num">
                  <span data-count="">{o.big}</span>
                </p>
                <p className="wall-label">{o.bigLabel}</p>
                <h3>
                  {o.title}
                  <small>{o.role}</small>
                </h3>
                {o.origin && (
                  <p className="wall-origin">
                    <span>Started with a no</span>
                    <s>{o.origin[0]}</s> → {o.origin[1]}
                  </p>
                )}
                <p className="wall-problem">{o.problem}</p>
                {o.link && (
                  <a className="wall-link" href={o.link[1]} target="_blank" rel="noopener">
                    {o.link[0]} ↗
                  </a>
                )}
                <details>
                  <summary>What I built</summary>
                  <ul>
                    {o.built.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                  {o.numbers.length > 0 && (
                    <p className="wall-facts">{o.numbers.map(([k, v]) => `${k}: ${v}`).join(" · ")}</p>
                  )}
                </details>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ HOW I OPERATE ============ */}
      <section className="section wrap" id="operate">
        <SectionHead num="05" label="How I operate" title="Four rules I actually follow." />
        <ol className="rules">
          {operatingLog.rules.map((r, i) => (
            <li key={r.title} data-reveal>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <b>{r.title}</b>
              <p>{r.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ============ ALL PROJECTS ============ */}
      <section className="section band" id="projects">
        <div className="wrap">
          <SectionHead
            num="06"
            label="All projects"
            title={`Everything, ${projects.length} in all.`}
            lede="Filter by area. Each one opens to a case study."
          />
          <div data-reveal>
            <ProjectIndex />
          </div>
        </div>
      </section>

      {/* ============ EXPERIENCE ============ */}
      <section className="section wrap" id="experience">
        <SectionHead num="07" label="Experience" title="Where I've worked and what I've led." />
        <div className="two">
          {[
            { h: "Work & ventures", rows: work },
            { h: "Leadership & education", rows: lead },
          ].map((col) => (
            <div key={col.h} data-reveal>
              <h3 className="col-h">{col.h}</h3>
              <ol className="roles">
                {col.rows.map((r) => (
                  <li key={r.title + r.org} className={r.current ? "current" : undefined}>
                    <span className="when">
                      {r.period}
                    </span>
                    <div>
                      <b>{r.title}</b>
                      <span className="org">{r.org}</span>
                      <p>{r.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </section>

      {/* ============ RECOGNITION & SKILLS ============ */}
      <section className="section band" id="recognition">
        <div className="wrap">
          <SectionHead num="08" label="Recognition & skills" title="Podiums, toolkit, and what's next." />
          <ul className="podium">
            {awards.map((a) => (
              <li key={a.event} data-reveal>
                <span className="place">{a.place}</span>
                <b>{a.event}</b>
                <small>{a.detail}</small>
              </li>
            ))}
          </ul>
          <div className="two toolkit">
            <div data-reveal>
              <h3 className="col-h">Toolkit</h3>
              <dl className="skills">
                {skills.map((s) => (
                  <div key={s.group}>
                    <dt>{s.group}</dt>
                    <dd>
                      {s.core.map((i) => (
                        <span key={i} className="core">
                          {i}
                        </span>
                      ))}
                      {s.familiar.map((i) => (
                        <span key={i}>{i}</span>
                      ))}
                    </dd>
                  </div>
                ))}
                <div>
                  <dt>Languages</dt>
                  <dd>
                    {profile.languages.map((l) => (
                      <span key={l}>{l}</span>
                    ))}
                  </dd>
                </div>
              </dl>
              <p className="legend">
                <span className="core">Bold</span> = used across several shipped projects. Plain = one or two.
              </p>
            </div>
            <div data-reveal>
              <h3 className="col-h">Now</h3>
              <ul className="now-list">
                {now.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
              <details className="learn-more">
                <summary>Courses and reading ({learning.length})</summary>
                <ul className="learn">
                  {learning.map((l) => (
                    <li key={l.title}>
                      <span className={`pill ${l.state === "active" ? "warn" : "ok"}`}>
                        {l.state === "active" ? "Now" : "Done"}
                      </span>
                      <div>
                        <b>{l.title}</b>
                        <small>{l.detail}</small>
                      </div>
                    </li>
                  ))}
                </ul>
              </details>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CONTACT ============ */}
      <section className="section ink" id="contact">
        <div className="wrap contact">
          <div data-reveal>
            <span className="kicker">
              <i>09</i>Contact
            </span>
            <h2>
              Got a messy problem on your desk <mark>right now</mark>?
            </h2>
            <p>
              Send me two sentences about it. I&apos;ll send back a one-page strategy memo within 24 hours, so you can see how I
              think before we talk.
            </p>
            <div className="ctas">
              <a className="btn primary" href={profile.problemMail}>
                Send me a problem →
              </a>
              <Link className="btn" href={profile.resume}>
                Résumé
              </Link>
            </div>
          </div>
          <dl className="reach" data-reveal>
            <div>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
                <CopyButton value={profile.email} />
              </dd>
            </div>
            <div>
              <dt>Phone</dt>
              <dd>
                <a href={`tel:${profile.phoneRaw}`}>{profile.phone}</a>
                <CopyButton value={profile.phoneRaw} />
              </dd>
            </div>
            <div>
              <dt>Elsewhere</dt>
              <dd>
                <a href={profile.linkedin} target="_blank" rel="noopener">
                  LinkedIn ↗
                </a>
                <a href={profile.github} target="_blank" rel="noopener">
                  GitHub ↗
                </a>
                <a href={profile.leetcode} target="_blank" rel="noopener">
                  LeetCode ↗
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <footer className="foot wrap">
        <p>
          © 2026 {profile.name} · {profile.location}
        </p>
        <p>Press ? for keyboard shortcuts · 1–7 to jump · Ctrl B to search</p>
      </footer>
    </main>
  );
}
