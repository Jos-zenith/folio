"use client";

import { useEffect, useRef, useState } from "react";

const STAGES = [
  { name: "Consent gateway", body: "Is there valid user consent for this purpose?" },
  { name: "Wasm sandbox", body: "The function runs isolated from every other tenant." },
  { name: "eBPF monitor", body: "Runtime rules watch what the code actually touches." },
  { name: "India-region data", body: "Data stays in Mumbai / Hyderabad." },
];

export default function Pipeline() {
  const [lit, setLit] = useState<number>(4);
  const [blocked, setBlocked] = useState(false);
  const [busy, setBusy] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const send = (withConsent: boolean) => {
    timers.current.forEach(clearTimeout);
    setBusy(true);
    setBlocked(false);
    setLit(0);
    if (!withConsent) {
      timers.current = [
        setTimeout(() => {
          setBlocked(true);
          setLit(1);
        }, 400),
        setTimeout(() => setBusy(false), 700),
      ];
      return;
    }
    timers.current = [1, 2, 3, 4].map((n) => setTimeout(() => setLit(n), n * 380));
    timers.current.push(setTimeout(() => setBusy(false), 4 * 380 + 100));
  };

  const cls = (i: number) => {
    if (blocked) return i === 0 ? "block" : "";
    return i < lit ? "pass" : "";
  };

  const done = !busy && lit === 4 && !blocked;

  return (
    <figure className="fig taped" style={{ margin: 0 }}>
      <div className="fig-cap">
        <b>Exhibit · a request&apos;s journey</b>
        <span className="note">send one ↓</span>
      </div>
      <div className="pl">
        {STAGES.map((s, i) => (
          <div key={s.name} className={cls(i)}>
            <span className="n">{i + 1}.</span>
            <b>{s.name}</b>
            <small>{s.body}</small>
          </div>
        ))}
      </div>
      <p className={`pl-verdict ${blocked ? "no" : done ? "ok" : ""}`} aria-live="polite">
        {blocked ? "✗ Stopped at the gate. No consent, no processing." : done ? "✓ Processed, logged and kept in India." : " "}
      </p>
      <div className="fig-foot">
        <p>Compliance is enforced by the platform, so product teams don&apos;t rebuild it for every service.</p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button type="button" className="chipbtn" onClick={() => send(true)} disabled={busy}>Send with consent</button>
          <button type="button" className="chipbtn" onClick={() => send(false)} disabled={busy}>Send without</button>
        </div>
      </div>
    </figure>
  );
}
