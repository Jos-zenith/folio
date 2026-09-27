"use client";

import { useState } from "react";

// Illustrative curve only; the live app runs the trained quantile model.
const MIN = 4;
const MAX = 20;

export default function CompSlider() {
  const [health, setHealth] = useState(60);
  const p50 = 7 + (health / 100) * 7.5;
  const p25 = p50 * 0.84;
  const p75 = p50 * 1.2;
  const pct = (v: number) => `${((v - MIN) / (MAX - MIN)) * 100}%`;

  return (
    <figure className="fig taped" style={{ margin: 0 }}>
      <div className="fig-cap">
        <b>Exhibit · health vs. pay</b>
        <span className="note">drag the slider</span>
      </div>
      <label htmlFor="health" style={{ fontSize: 14.5, color: "var(--pencil)" }}>
        Company health score: <b style={{ color: "var(--text)" }}>{health}</b> / 100
      </label>
      <input id="health" className="cs-range" type="range" min={0} max={100} value={health} onChange={(e) => setHealth(+e.target.value)} />
      <div className="cs-scale" aria-hidden="true">
        <div className="cs-axis" />
        <div className="cs-band" style={{ left: pct(p25), width: `calc(${pct(p75)} - ${pct(p25)})` }} />
        <div className="cs-mid" style={{ left: pct(p50) }} />
        {[4, 8, 12, 16, 20].map((t) => (
          <span key={t} className="cs-tick" style={{ left: pct(t) }}>
            {t}L
          </span>
        ))}
      </div>
      <div className="cs-vals">
        <div><small>P25</small><b>₹{p25.toFixed(1)}L</b></div>
        <div><small>P50</small><b>₹{p50.toFixed(1)}L</b></div>
        <div><small>P75</small><b>₹{p75.toFixed(1)}L</b></div>
      </div>
      <div className="fig-foot">
        <p>Same role, same city, same funding stage. Only business health changes. Illustrative numbers; the live app uses the trained model.</p>
      </div>
    </figure>
  );
}
