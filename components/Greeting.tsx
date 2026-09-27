"use client";

import { useState } from "react";

/** A ballpoint doodle of Zenith greeting the visitor: right hand to heart, a small nod, a beating heart. */
export default function Greeting() {
  const [run, setRun] = useState(0);
  return (
    <div className="greet">
      <button type="button" onClick={() => setRun((r) => r + 1)} aria-label="Greet me again">
        <svg key={run} viewBox="40 0 120 175" role="img" aria-label="A doodle of me placing my right hand on my heart">
          <g className="gr-head">
            <circle className="gr" cx="100" cy="36" r="20" />
            <path className="gr" d="M92 31 v1 M108 31 v1" />
            <path className="gr" d="M91 42 Q100 50 109 42" />
            <path className="gr" d="M82 28 Q90 12 104 15 Q116 17 119 30" />
          </g>
          <path className="gr" d="M100 56 L100 128" />
          <path className="gr" d="M100 72 L120 100 L124 126" />
          <path className="gr gr-arm" d="M100 72 L84 96 L110 86" />
          <path className="gr" d="M100 128 L86 166 M100 128 L114 166" />
          <path className="gr-heart" d="M111 92 C 103 86, 103 79, 108 79 C 110 79, 111 81, 111 82 C 111 81, 112 79, 114 79 C 119 79, 119 86, 111 92 Z" />
        </svg>
      </button>
      <div className="bubble">
        Hi! Glad our paths crossed.
        <small>hand on heart, that&apos;s how I say hello</small>
      </div>
    </div>
  );
}
