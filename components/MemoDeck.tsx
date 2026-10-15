"use client";

import Link from "next/link";
import { useRef, useState, type KeyboardEvent } from "react";
import { samples } from "@/lib/data";

/** Capacity meter: what two interns can reach by phone against the 80% promise. */
function WeekdayViz() {
  return (
    <figure className="viz" aria-label="Share of 500 requests booked: ceiling by phone 49%, target 80%">
      <figcaption>Share of the 500 nightly requests booked within 24 h</figcaption>
      <div className="meter">
        <div className="meter-fill" style={{ width: "49%" }} title="Ceiling by phone: 49%" />
        <div className="meter-gap" style={{ left: "49%", width: "31%" }} title="Gap to target: 31 points" />
        <div className="meter-mark" style={{ left: "80%" }} title="Target: 80%" />
      </div>
      <div className="meter-labels">
        <span style={{ left: "49%" }}>
          <b>49%</b> ceiling, even if every call books
        </span>
        <span className="right" style={{ left: "80%" }}>
          <b>80%</b> promised
        </span>
      </div>
      <p className="viz-note">
        The 31-point gap can&apos;t be closed by calling harder. It needs self-booking, more people, or both.
      </p>
    </figure>
  );
}

/** Precision meter on a 0–3% scale: what the model projects against what pays. */
function TrustifyViz() {
  return (
    <figure className="viz" aria-label="Alert precision: projected 0.4%, break-even 2.7%">
      <figcaption>Alert precision needed for a 50-a-day review queue to pay</figcaption>
      <div className="meter">
        <div className="meter-fill" style={{ width: `${(0.4 / 3) * 100}%` }} title="Projected at the real UPI fraud rate: 0.4%" />
        <div className="meter-gap" style={{ left: `${(0.4 / 3) * 100}%`, width: `${(2.3 / 3) * 100}%` }} title="Shortfall: 2.3 points" />
        <div className="meter-mark" style={{ left: `${(2.7 / 3) * 100}%` }} title="Break-even: 2.7%" />
      </div>
      <div className="meter-labels">
        <span style={{ left: `${(0.4 / 3) * 100}%` }}>
          <b>0.4%</b> projected
        </span>
        <span className="right" style={{ left: `${(2.7 / 3) * 100}%` }}>
          <b>2.7%</b> break-even
        </span>
      </div>
      <p className="viz-note">
        About <b>7× short</b>. Accuracy looked fine; the economics didn&apos;t. Rules and graded holds do the work instead.
      </p>
    </figure>
  );
}

/** Where the money is: payment fees are zero, so revenue moves to what payments make possible. */
function VinaViz() {
  const streams: [string, string, boolean?][] = [
    ["Reconciliation", "shop pays a small monthly fee"],
    ["Loan distribution", "lender pays on disbursal", true],
    ["Verified payouts", "per-payout fee"],
    ["Invoice discounting", "fee on discounted value"],
  ];
  return (
    <figure className="viz" aria-label="Vina business model">
      <figcaption>Where the money is, once UPI fees are zero</figcaption>
      <div className="flow">
        <div className="flow-free">
          <s>Payment fees</s>
          <small>0% MDR on merchant UPI</small>
          <b>Billing, stock, GST: free</b>
          <small>the distribution, not the product</small>
        </div>
        <span className="flow-arrow" aria-hidden="true">
          →
        </span>
        <ul className="flow-paid">
          {streams.map(([k, v, big]) => (
            <li key={k} className={big ? "big" : undefined}>
              <b>{k}</b>
              <small>
                {v}
                {big && " · largest pool"}
              </small>
            </li>
          ))}
        </ul>
      </div>
    </figure>
  );
}

/** The result I dropped: struck through, with what replaced it. */
function VgateViz() {
  return (
    <figure className="viz viz-strike" aria-label="31% fewer false alarms in-sample; 0 methods transferred to unseen noise">
      <figcaption>Fewer false alarms than raising the threshold</figcaption>
      <div className="strike-row">
        <div>
          <span className="strike-num">31%</span>
          <small>tuned on the test set</small>
        </div>
        <span className="flow-arrow" aria-hidden="true">
          →
        </span>
        <div>
          <span className="strike-zero">0</span>
          <small>methods that held up on unseen noise</small>
        </div>
      </div>
      <p className="viz-note">A check written down in advance caught it. v1.0 shipped without the gate.</p>
    </figure>
  );
}

const viz: Record<string, () => React.JSX.Element> = {
  "weekday-desk": WeekdayViz,
  "operation-nolambur": TrustifyViz,
  vina: VinaViz,
  vgate: VgateViz,
};

/** Founder memos as a deck: pick one, see its chart and its quick take. Arrow keys move between tabs. */
export default function MemoDeck() {
  const [i, setI] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const s = samples[i];
  const Viz = viz[s.slug];

  const onKey = (e: KeyboardEvent) => {
    const d = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const n = (i + d + samples.length) % samples.length;
    setI(n);
    tabs.current[n]?.focus();
  };

  return (
    <div className="deck">
      <div className="deck-tabs" role="tablist" aria-label="Founder memos" aria-orientation="vertical" onKeyDown={onKey}>
        {samples.map((x, k) => (
          <button
            key={x.slug}
            ref={(el) => {
              tabs.current[k] = el;
            }}
            type="button"
            role="tab"
            id={`memo-tab-${k}`}
            aria-selected={i === k}
            aria-controls="memo-panel"
            tabIndex={i === k ? 0 : -1}
            onClick={() => setI(k)}
          >
            <span className="deck-num">{x.numbers[0][0]}</span>
            <span className="deck-title">
              <b>{x.title.split(":")[0]}</b>
              <small>{x.kind}</small>
            </span>
          </button>
        ))}
      </div>

      <div className="deck-panel" role="tabpanel" id="memo-panel" aria-labelledby={`memo-tab-${i}`} key={s.slug}>
        <h3>{s.title}</h3>
        {Viz && <Viz />}
        <dl className="quick">
          <div>
            <dt>Problem</dt>
            <dd>{s.problem}</dd>
          </div>
          <div>
            <dt>What&apos;s usually missed</dt>
            <dd>{s.insight}</dd>
          </div>
          <div className="decision">
            <dt>Decision &amp; impact</dt>
            <dd>{s.decision}</dd>
          </div>
        </dl>
        <div className="deck-links">
          <a className="btn primary" href={s.doc[1]} target="_blank" rel="noopener">
            {s.doc[0]} ↗
          </a>
          <Link className="btn" href={`/work/${s.slug}`}>
            Case study →
          </Link>
        </div>
      </div>
    </div>
  );
}
