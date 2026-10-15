"use client";

import { useState } from "react";
import { bottlenecks, profile } from "@/lib/data";

/** "Throw me a problem": pick a founder bottleneck, see the first-week plan I'd run. */
export default function ProblemPicker() {
  const [pick, setPick] = useState(0);
  const b = bottlenecks[pick];

  return (
    <div className="picker">
      <div className="picker-tabs" role="tablist" aria-label="Pick a problem">
        {bottlenecks.map((x, i) => (
          <button
            key={x.label}
            type="button"
            role="tab"
            id={`pk-tab-${i}`}
            aria-selected={pick === i}
            aria-controls="pk-panel"
            onClick={() => setPick(i)}
          >
            <small>Problem {String(i + 1).padStart(2, "0")}</small>
            {x.label}
          </button>
        ))}
      </div>
      <div className="picker-panel" role="tabpanel" id="pk-panel" aria-labelledby={`pk-tab-${pick}`} key={pick}>
        <p className="picker-ask">“{b.ask}”</p>
        <ol className="picker-plan">
          {b.plan.map(([when, what]) => (
            <li key={when}>
              <span>{when}</span>
              <p>{what}</p>
            </li>
          ))}
        </ol>
        <div className="picker-foot">
          <p>
            <b>The number I&apos;d watch:</b> {b.watch}
          </p>
          <a className="btn" href={profile.problemMail}>
            Send me your real one →
          </a>
        </div>
      </div>
    </div>
  );
}
