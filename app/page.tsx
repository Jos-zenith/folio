import Image from "next/image";
import Link from "next/link";
import Contents from "@/components/Contents";
import MorePages from "@/components/MorePages";
import Story from "@/components/Story";
import Figure from "@/components/Figure";
import CopyButton from "@/components/CopyButton";
import Greeting from "@/components/Greeting";
import Diary from "@/components/Diary";
import {
  CircleMark,
  CoinLock,
  Cube,
  DragHint,
  Gears,
  Heart,
  PaperPlane,
  Pencil,
  RoadCar,
  Seedling,
  Spiral,
  Star,
} from "@/components/Scribbles";
import { awards, beyond, chapters, learning, now, profile, projects, skills, stats, statusClass, type Project } from "@/lib/data";

function DateBox({ date = "", page }: { date?: string; page: string }) {
  return (
    <div className="datebox" aria-hidden="true">
      <span>
        DATE<b>{date || "__ / __ / __"}</b>
      </span>
      <span>
        PAGE NO.<b>{page}</b>
      </span>
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <div className="book">
        {/* ============ COVER ============ */}
        <section className="leaf kraft cover" id="top" aria-label="Cover">
          <div className="inner">
            <div className="cover-grid">
              <div>
                <Greeting />
                <div className="label">
                  <div className="label-top">NOTEBOOK</div>
                  <div className="field name">
                    <span>NAME</span>
                    <b>Zenith Joshua J</b>
                  </div>
                  <div className="field">
                    <span>SUBJECT</span>
                    <b>Things I&apos;ve built (and a few I broke)</b>
                  </div>
                  <div className="field split">
                    <span>CLASS</span>
                    <b>B.Tech IT &apos;27</b>
                    <span>SEC</span>
                    <b>LICET, Chennai</b>
                  </div>
                </div>
                <p className="statement">
                  I take real problems and build my way out of them. <mark>A ₹22.5L scam.</mark>{" "}
                  <mark className="pink">A farm with no signal.</mark> <mark className="green">A car that didn&apos;t exist yet.</mark>
                </p>
                <div className="ctas">
                  <a className="btn pen" href="#index">
                    Open the notebook
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 5v14M6 13l6 6 6-6" />
                    </svg>
                  </a>
                  <a className="textlink" href={profile.resume} target="_blank" rel="noopener">
                    Résumé
                  </a>
                  <a className="textlink" href={profile.github} target="_blank" rel="noopener">
                    GitHub
                  </a>
                </div>
              </div>

              <div className="cover-side">
                <div className="sticker star" aria-hidden="true">
                  <span>
                    7
                    <br />
                    podiums
                  </span>
                </div>
                <figure className="polaroid taped">
                  <Image
                    src="/img/ev-track-day.jpg"
                    alt="Our electric four-wheeler on test day, two drivers in helmets, team watching"
                    width={1080}
                    height={864}
                    priority
                    sizes="(max-width: 960px) 90vw, 430px"
                  />
                  <figcaption>Turbonites, test day. I captained this team.</figcaption>
                </figure>
                <div className="sticker round" aria-hidden="true">
                  20+
                  <br />
                  crew
                </div>
                <aside className="sticky" aria-label="What I'm doing now">
                  <h4>Right now</h4>
                  <ul>
                    {now.slice(0, 3).map((n) => (
                      <li key={n}>{n}</li>
                    ))}
                  </ul>
                </aside>
              </div>
            </div>
          </div>
        </section>

        {/* ============ DIARY ============ */}
        <section className="leaf ruled" id="diary">
          <a className="tab t-orange" href="#diary">Diary</a>
          <div className="inner">
            <DateBox page="00" />
            <div className="mdoodles" aria-hidden="true">
              <Heart />
              <Spiral />
              <Star />
            </div>
            <Diary />
          </div>
        </section>

        {/* ============ CONTENTS (printed page) ============ */}
        <section className="leaf ruled" id="index">
          <a className="tab t-red" href="#index">Contents</a>
          <div className="inner">
            <DateBox page="01" />
            <div className="mdoodles" aria-hidden="true">
              <Star />
              <Spiral />
              <Cube />
              <Heart />
            </div>
            <div className="facts" aria-label="Quick facts">
              {stats.map((s) => (
                <div className="fact" key={s.label}>
                  <span className="num">
                    {s.value}
                    <CircleMark />
                  </span>
                  <p>{s.label}</p>
                </div>
              ))}
            </div>
            <div className="printed">
              <span className="kicker">Page 1</span>
              <div className="rule2" />
              <h2>Contents</h2>
              <div className="rule2" />
              <p>
                Three chapters, {projects.length} projects. Jump to one, or keep scrolling and read in order. Every project has its own page with the
                problem, the decisions and what came out of it.
              </p>
            </div>
            <Contents />
            <p className="note toc-hint">psst, Ctrl K finds any page instantly</p>
          </div>
        </section>

        {/* ============ CH. 1: PASSBOOK ============ */}
        {(() => {
          const c = chapters[0];
          const feat = projects.find((p) => p.slug === c.featured)!;
          const rest = projects.filter((p) => p.category === c.name && p.slug !== c.featured);
          return (
            <section className="leaf passbook" id={c.id}>
              <a className="tab t-yellow" href={`#${c.id}`}>
                Ch. 1
              </a>
              <div className="inner" style={{ paddingLeft: "clamp(18px, 5vw, 70px)" }}>
                <div className="pb-band">
                  <div className="bank">
                    Passbook of trust
                    <small>Chapter 1 · {c.name}</small>
                  </div>
                  <div className="acno">
                    A/C NO.
                    <b>0001 · ZEN · 2026</b>
                  </div>
                  <div className="pb-seal" aria-hidden="true">
                    VERIFIED
                    <br />★
                  </div>
                </div>
                <div className="pb-intro">
                  <div>
                    <h2>{c.title}</h2>
                    <p>{c.intro}</p>
                  </div>
                  <div className="ch-art">
                    <CoinLock />
                    <span className="note">keep it locked</span>
                  </div>
                </div>
                <Exhibit feat={feat} />
                <MorePages items={rest} variant="ledger" chapterNo="01" />
              </div>
            </section>
          );
        })()}

        {/* ============ CH. 2: FIELD JOURNAL ============ */}
        {(() => {
          const c = chapters[1];
          const feat = projects.find((p) => p.slug === c.featured)!;
          const rest = projects.filter((p) => p.category === c.name && p.slug !== c.featured);
          return (
            <section className="leaf graph" id={c.id}>
              <a className="tab t-green" href={`#${c.id}`}>
                Ch. 2
              </a>
              <div className="inner">
                <div className="mdoodles" aria-hidden="true">
                  <Spiral />
                  <Heart />
                  <Star />
                </div>
                <div className="ch-head">
                  <div className="ch-num" aria-hidden="true">
                    <small>Ch.</small>
                    {c.num}
                  </div>
                  <div>
                    <span className="kicker">Field journal · {c.name}</span>
                    <h2>{c.title}</h2>
                    <p>{c.intro}</p>
                    <span className="note">← {c.note}</span>
                  </div>
                  <div className="ch-art">
                    <Seedling />
                    <span className="note">even with one bar of signal</span>
                  </div>
                </div>
                <Exhibit feat={feat} reverse />
                <MorePages items={rest} variant="notes" chapterNo="02" />
              </div>
            </section>
          );
        })()}

        {/* ============ CH. 3: BLUEPRINT ============ */}
        {(() => {
          const c = chapters[2];
          const feat = projects.find((p) => p.slug === c.featured)!;
          const rest = projects.filter((p) => p.category === c.name && p.slug !== c.featured);
          return (
            <section className="leaf blueprint" id={c.id}>
              <a className="tab t-blue" href={`#${c.id}`}>
                Ch. 3
              </a>
              <div className="inner" style={{ paddingLeft: "clamp(18px, 4.5vw, 60px)" }}>
                <div className="sheet-frame">
                  <div className="dwg-head">
                    <div className="dwg-no">
                      Dwg no.
                      <b>03</b>
                    </div>
                    <div className="dwg-title">
                      <span className="kicker">Chapter 3 · {c.name}</span>
                      <h2>{c.title}</h2>
                      <p>{c.intro}</p>
                    </div>
                    <div className="ch-art">
                      <Gears />
                    </div>
                  </div>
                  <RoadCar note="our EV, not to scale" />
                  <div style={{ marginTop: 40 }}>
                    <Exhibit feat={feat} />
                  </div>
                  <MorePages items={rest} variant="parts" chapterNo="03" />
                  <div className="titleblock" aria-label="Drawing title block">
                    <div>
                      Drawn by<b>Zenith J.</b>
                    </div>
                    <div>
                      Checked<b>Turbonites</b>
                    </div>
                    <div>
                      Scale<b>1 : 1</b>
                    </div>
                    <div>
                      Parts<b>{rest.length + 1}</b>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })()}

        {/* ============ STORY ============ */}
        <section className="leaf ruled" id="story">
          <a className="tab t-pink" href="#story">Story</a>
          <div className="inner">
            <DateBox date="2023 → now" page="—" />
            <div className="mdoodles" aria-hidden="true">
              <Cube />
              <Star />
            </div>
            <div className="shead">
              <div className="tape-title">
                <h2>The story so far, one year per page</h2>
              </div>
              <DragHint label="keep scrolling, the pages turn" />
            </div>
            <Story />
          </div>
        </section>

        {/* ============ BEYOND: FRIDGE DOOR ============ */}
        <section className="leaf fridge" id="beyond">
          <a className="tab t-purple" href="#beyond">Beyond</a>
          <div className="fridge-handle" aria-hidden="true" />
          <div className="inner">
            <span className="kicker">On the fridge door</span>
            <h2 className="sr">The people side</h2>
            <MagnetWord text="THE PEOPLE SIDE" />
            <p className="fridge-sub">Clubs, communities and founders I spend my evenings on. Stuck up where I see them every day.</p>
            <div className="wall">
              {beyond.map((b) => (
                <div className={`sticky ${b.tone}`} key={b.title}>
                  <h4>{b.title}</h4>
                  <div className="big">{b.big}</div>
                  <p>{b.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ REPORT CARD ============ */}
        <section className="leaf plain" id="report">
          <a className="tab t-green" href="#report">Report</a>
          <div className="inner" style={{ paddingLeft: "clamp(18px, 5vw, 70px)" }}>
            <div className="report-title">
              <span className="kicker">Marks &amp; remarks</span>
              <h2>Report card</h2>
              <p>Competitions I placed in, and what&apos;s on my desk to learn next.</p>
              <span className="rstamp">Promoted ★</span>
            </div>
            <div className="duo">
              <div className="report">
                <span className="grade" aria-hidden="true">★</span>
                <div className="report-head">
                  <b>Progress report</b>
                  <span>2023 – 2026 · {awards.length} entries</span>
                </div>
                <div className="rrow h">
                  <span>Event</span>
                  <span className="res">Result</span>
                  <span className="rem">Remarks</span>
                </div>
                {awards.map((a) => (
                  <div className="rrow" key={a.event}>
                    <span className="ev">{a.event}</span>
                    <span className="res">{a.place}</span>
                    <span className="rem">{a.detail}</span>
                  </div>
                ))}
              </div>

              <div className="desk">
                <div>
                  <h3>On my desk now</h3>
                  <ul>
                    {learning
                      .filter((l) => l.state === "active")
                      .map((l) => (
                        <li className="active" key={l.title}>
                          <b>{l.title}</b>
                          <small>{l.detail}</small>
                        </li>
                      ))}
                  </ul>
                </div>
                <div>
                  <h3>Finished</h3>
                  <ul>
                    {learning
                      .filter((l) => l.state === "done")
                      .map((l) => (
                        <li className="done" key={l.title}>
                          <b>{l.title}</b>
                          <small>{l.detail}</small>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="toolbox">
              {skills.map((s) => (
                <div key={s.group}>
                  <h3>{s.group}</h3>
                  <p>
                    {s.items.map((i) => (
                      <span key={i}>{i}</span>
                    ))}
                  </p>
                </div>
              ))}
              <div>
                <h3>Languages</h3>
                <p>
                  {profile.languages.map((l) => (
                    <span key={l}>{l}</span>
                  ))}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============ LETTER: AIRMAIL ============ */}
        <section className="leaf airmail" id="contact">
          <a className="tab t-kraft" href="#contact">Letter</a>
          <div className="inner">
            <div className="post-head">
              <div className="postmark" aria-hidden="true">
                CHENNAI
                <br />
                AIR MAIL
                <br />
                2026
              </div>
              <div>
                <span className="kicker">Last page · par avion</span>
                <h2>Write to me</h2>
              </div>
              <PaperPlane className="scr-corner" />
            </div>
            <div className="letter-wrap">
              <div className="letter">
                <p>Dear reader,</p>
                <p>thanks for flipping this far.</p>
                <p>If something here made you curious, a project,</p>
                <p>an idea, a team you&apos;re building, write to me.</p>
                <p>I reply to every message.</p>
                <span className="sign">– Zenith</span>
              </div>
              <div className="envelope">
                <div className="postage" aria-hidden="true">
                  CHENNAI
                  <b>600 034</b>
                  INDIA
                </div>
                <div className="addr">
                  <span>Email</span>
                  <div className="line">
                    <a href={`mailto:${profile.email}`}>{profile.email}</a>
                    <CopyButton value={profile.email} />
                  </div>
                </div>
                <div className="addr">
                  <span>Phone</span>
                  <div className="line">
                    <b>{profile.phone}</b>
                    <CopyButton value={profile.phoneRaw} />
                  </div>
                </div>
                <div className="addr">
                  <span>Elsewhere</span>
                  <div className="line">
                    <a href={profile.linkedin} target="_blank" rel="noopener">LinkedIn ↗</a>
                    <a href={profile.github} target="_blank" rel="noopener">GitHub ↗</a>
                    <a href={profile.leetcode} target="_blank" rel="noopener">LeetCode ↗</a>
                  </div>
                </div>
              </div>
            </div>
            <Pencil />
          </div>
        </section>

        {/* ============ BACK COVER ============ */}
        <footer className="leaf kraft backcover">
          <div className="inner">
            <p>Made by hand in Chennai · © 2026 {profile.name}</p>
            <p style={{ fontSize: 16, opacity: 0.8 }}>Ctrl K to search the notebook · moon icon for the night version</p>
            <div className="barcode">
              <i />
              <span>VOL. 04 · {projects.length} PAGES</span>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}

function Exhibit({ feat, reverse = false }: { feat: Project; reverse?: boolean }) {
  return (
    <div className={`exhibit${reverse ? " rev" : ""}`}>
      <div>
        <div className="label-row">
          featured page <span className={`stamp ${statusClass[feat.status]}`}>{feat.status}</span>
        </div>
        <h3>{feat.title}</h3>
        <p className="tag">{feat.tagline}</p>
        <p className="sum">{feat.summary}</p>
        <ul className="decisions">
          {feat.decisions.slice(0, 3).map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
        <div className="links">
          <Link className="btn" href={`/work/${feat.slug}`}>
            Read the full page →
          </Link>
          {feat.live && (
            <a className="textlink" href={feat.live} target="_blank" rel="noopener">
              Live
            </a>
          )}
          {feat.code && (
            <a className="textlink" href={feat.code} target="_blank" rel="noopener">
              Code
            </a>
          )}
        </div>
      </div>
      <Figure project={feat} />
    </div>
  );
}

const MAGNET_COLORS = ["#e0603f", "#1f5f73", "#f2b632", "#2f8a64", "#9b59b6", "#e0603f", "#3a8fd6"];

function MagnetWord({ text }: { text: string }) {
  return (
    <div className="magnets" aria-hidden="true">
      {text.split("").map((ch, i) =>
        ch === " " ? (
          <span key={i} className="gap" />
        ) : (
          <span key={i} style={{ "--c": MAGNET_COLORS[i % MAGNET_COLORS.length], "--r": `${((i * 37) % 13) - 6}deg` } as React.CSSProperties}>
            {ch}
          </span>
        )
      )}
    </div>
  );
}
