import { diary } from "@/lib/data";
import { Heart } from "./Scribbles";

/** The "path" doodle: small knocks and comebacks, one real fall, then the climb back. */
function PathDoodle() {
  return (
    <svg className="scr path-doodle" viewBox="0 0 300 200" aria-hidden="true" data-draw>
      <path className="soft" d="M10 186 L290 186" />
      <path d="M12 120 C 22 132, 30 132, 36 112 C 42 96, 50 126, 60 124 C 70 122, 72 92, 84 96 C 94 100, 98 120, 108 114 C 118 108, 118 84, 130 86 C 140 88, 144 104, 152 98 C 158 90, 160 76, 166 80 C 176 90, 180 150, 196 170 C 204 178, 212 172, 218 156 C 230 124, 250 82, 286 34" />
      <path className="red" d="M190 162 l6 8 m0 -8 l-6 8" />
      <path d="M280 28 l6 6 m-6 0 l6 -6 M283 22 v18 M274 31 h18" />
    </svg>
  );
}

export default function Diary() {
  return (
    <div className="diary">
      <div className="shead">
        <span className="kicker">Page 0 · before the index</span>
        <h2 className="squig">{diary.title}</h2>
      </div>

      <div className="diary-grid">
        <div className="diary-main">
          {diary.opening.map((p, i) => (
            <p key={i} className={i === 0 ? "first" : undefined}>
              {p}
            </p>
          ))}

          <ol className="turns">
            {diary.turns.map((t) => (
              <li key={t.lost}>
                <span className="lost" data-reveal>
                  <s>{t.lost}</s>
                </span>
                <span className="won" data-reveal>
                  {t.won}
                </span>
              </li>
            ))}
          </ol>

          <div className="fall">
            <p>{diary.fall}</p>
          </div>

          {diary.rise.map((p) => (
            <p key={p} className="rise">
              {p}
            </p>
          ))}

          <p className="lesson">
            <span>So here&apos;s what I&apos;ve learned:</span>
            <mark>{diary.lesson}</mark>
          </p>
          <div className="diary-sign">
            – Zenith <Heart />
          </div>
        </div>

        <aside className="diary-side">
          <blockquote className="wallquote">
            <p>&ldquo;{diary.quote}&rdquo;</p>
            <cite>seen on the Loyola wall</cite>
          </blockquote>
          <figure className="path-fig">
            <PathDoodle />
            <figcaption>
              <span>knocked down, got up</span>
              <span className="red">the real fall</span>
              <span>now ↗</span>
            </figcaption>
          </figure>
        </aside>
      </div>
    </div>
  );
}
