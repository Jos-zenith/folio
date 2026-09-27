"use client";

import { useEffect, useRef, useState } from "react";

type Job = { id: number; label: string; event: string; synced: boolean };

const ACTIONS = [
  { label: "Check paddy price", event: "market_price_viewed" },
  { label: "Apply for subsidy", event: "benefit_form_submitted" },
  { label: "Report a pest", event: "pest_photo_uploaded" },
];

export default function OfflineDemo() {
  const [online, setOnline] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([
    { id: 1, label: "Check paddy price", event: "market_price_viewed", synced: false },
    { id: 2, label: "Apply for subsidy", event: "benefit_form_submitted", synced: false },
  ]);
  const nextId = useRef(3);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  // When the signal returns, drain the queue one item at a time.
  useEffect(() => {
    if (!online) return;
    const pending = jobs.filter((j) => !j.synced);
    pending.forEach((j, i) => {
      timers.current.push(
        setTimeout(() => setJobs((all) => all.map((x) => (x.id === j.id ? { ...x, synced: true } : x))), 450 * (i + 1))
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [online]);

  const act = (a: (typeof ACTIONS)[number]) => {
    const job = { id: nextId.current++, label: a.label, event: a.event, synced: false };
    setJobs((all) => [job, ...all].slice(0, 5));
    if (online) {
      timers.current.push(setTimeout(() => setJobs((all) => all.map((x) => (x.id === job.id ? { ...x, synced: true } : x))), 400));
    }
  };

  const queued = jobs.filter((j) => !j.synced).length;

  return (
    <figure className="fig taped" style={{ margin: 0 }}>
      <div className="fig-cap">
        <b>Exhibit B · a farmer&apos;s phone</b>
        <span className="note">flip the signal →</span>
      </div>
      <div className="od-top">
        <button type="button" role="switch" aria-checked={online} className="signal" onClick={() => setOnline((o) => !o)}>
          <span className="sw" />
          {online ? "Signal back" : "No signal in the field"}
        </button>
        <span className={`bars${online ? " on" : ""}`} aria-hidden="true">
          <i style={{ height: 4 }} />
          <i style={{ height: 7 }} />
          <i style={{ height: 10 }} />
          <i style={{ height: 14 }} />
        </span>
      </div>
      <div className="od-actions">
        {ACTIONS.map((a) => (
          <button key={a.label} type="button" className="chipbtn" onClick={() => act(a)}>
            + {a.label}
          </button>
        ))}
      </div>
      <ul className="od-log" aria-live="polite">
        {jobs.map((j) => (
          <li key={j.id}>
            <div>
              {j.label}
              <small>event: {j.event}</small>
            </div>
            <span className={`st ${j.synced ? "s" : "q"}`}>{j.synced ? "Synced ✓" : "Saved on phone"}</span>
          </li>
        ))}
      </ul>
      <div className="fig-foot">
        <p>
          {queued > 0 ? (
            <>
              <b>{queued} waiting</b> in the sync queue. Nothing is lost while the network is down.
            </>
          ) : (
            <>Everything synced. Every action also sent a telemetry event, so each feature can show its impact.</>
          )}
        </p>
      </div>
    </figure>
  );
}
