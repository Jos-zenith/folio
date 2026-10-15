"use client";

import { useEffect, useRef, useState } from "react";

// Simplified Nolambur chain: 1 victim → 4 first-layer mules → 8 onward-hop accounts.
const V = { x: 50, y: 150 };
const L1 = [50, 116, 184, 250].map((y) => ({ x: 230, y }));
const L2 = [22, 58, 94, 130, 170, 206, 242, 278].map((y) => ({ x: 420, y }));

// step 0: idle · 1: instalments leave victim · 2: mules flagged · 3: onward hops held
const CAPTIONS = [
  { t: "t + 0s", text: "A victim under a fake 'digital arrest' pays in instalments, each under the ₹1 lakh UPI cap." },
  { t: "t + 40s", text: "The money lands in first-layer mule accounts, which start forwarding it within minutes." },
  { t: "t + 41s", text: "Rules summed over 24 h fire: inflow burst from new payers, rapid pass-through, splits under the cap. The graph model agrees." },
  { t: "t + 42s", text: "The decision router holds outbound transfers, so later instalments and onward hops stop. Every action lands in the audit chain." },
];

export default function MuleGraph() {
  // Resting state is the final frame, so the figure reads correctly before anyone presses play.
  const [step, setStep] = useState(3);
  const [playing, setPlaying] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const play = () => {
    timers.current.forEach(clearTimeout);
    setPlaying(true);
    setStep(0);
    timers.current = [
      setTimeout(() => setStep(1), 500),
      setTimeout(() => setStep(2), 1900),
      setTimeout(() => setStep(3), 3100),
      setTimeout(() => setPlaying(false), 3600),
    ];
  };

  const cap = CAPTIONS[step];

  return (
    <figure className="fig taped" style={{ margin: 0 }}>
      <div className="fig-cap">
        <b>Exhibit A · mule chain</b>
        <span className="note">press replay ↓</span>
      </div>
      <svg viewBox="0 0 470 300" role="img" aria-label="Diagram: money flows from a victim to four mule accounts, which are flagged, and eight onward-hop accounts whose transfers are held.">
        {L1.map((m, i) => (
          <line key={`e1${i}`} x1={V.x} y1={V.y} x2={m.x} y2={m.y} className={`mg-edge${step >= 1 ? " hot" : ""}`} />
        ))}
        {L1.map((m, i) =>
          [L2[i * 2], L2[i * 2 + 1]].map((c, j) => (
            <line key={`e2${i}${j}`} x1={m.x} y1={m.y} x2={c.x} y2={c.y} className="mg-edge" strokeDasharray={step >= 3 ? "4 4" : undefined} />
          ))
        )}

        {/* money packets */}
        {L1.map((m, i) => (
          <circle
            key={`p${i}`}
            r="6"
            cx={V.x}
            cy={V.y}
            className="mg-pkt"
            style={{
              transform: step >= 1 ? `translate(${m.x - V.x}px, ${m.y - V.y}px)` : "translate(0,0)",
              transitionDelay: `${i * 90}ms`,
              opacity: step === 0 ? 0 : 1,
            }}
          />
        ))}

        <circle cx={V.x} cy={V.y} r="16" className="mg-node victim" />
        <text x={V.x} y={V.y + 34} textAnchor="middle" className="mg-lbl">victim</text>
        <text x={V.x} y={V.y - 26} textAnchor="middle" className="mg-lbl big">Chennai</text>

        {L1.map((m, i) => (
          <circle key={`n1${i}`} cx={m.x} cy={m.y} r="13" className={`mg-node${step >= 2 ? " flag" : ""}`} />
        ))}
        <text x={230} y={20} textAnchor="middle" className={`mg-lbl${step >= 2 ? " red" : ""}`}>
          {step >= 2 ? "L1 mules · flagged" : "L1 accounts"}
        </text>

        {L2.map((c, i) => (
          <circle key={`n2${i}`} cx={c.x} cy={c.y} r="9" className={`mg-node${step >= 3 ? " pred" : ""}`} />
        ))}
        <text x={466} y={298} textAnchor="end" className={`mg-lbl${step >= 3 ? " red" : ""}`}>
          {step >= 3 ? "onward hop · held" : "L2 accounts"}
        </text>

        <text x={10} y={292} className="mg-clock">{cap.t}</text>
      </svg>
      <div className="fig-foot">
        <p aria-live="polite">{cap.text}</p>
        <button type="button" className="chipbtn" onClick={play} disabled={playing}>
          ↺ {playing ? "Playing…" : "Replay"}
        </button>
      </div>
    </figure>
  );
}
