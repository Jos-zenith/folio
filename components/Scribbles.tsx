/* Hand-drawn doodles for the notebook margins. All decorative (aria-hidden).
   Line drawings marked data-draw are traced in by DrawObserver when they scroll into view. */

type P = { className?: string; style?: React.CSSProperties };

export function Star({ className = "", style }: P) {
  return (
    <svg className={`scr ${className}`} style={style} width="34" height="34" viewBox="0 0 34 34" aria-hidden="true">
      <path className="twinkle" d="M17 3 L20 13 L31 13 L22 19 L26 30 L17 23 L8 30 L12 19 L3 13 L14 13 Z" />
    </svg>
  );
}

export function Spiral({ className = "", style }: P) {
  return (
    <svg className={`scr ${className}`} style={style} width="40" height="40" viewBox="0 0 40 40" aria-hidden="true" data-draw>
      <path d="M20 20 C 20 17, 24 17, 24 20 C 24 25, 16 25, 16 20 C 16 13, 28 13, 28 20 C 28 29, 12 29, 12 20 C 12 9, 32 9, 32 20 C 32 33, 8 33, 8 20" />
    </svg>
  );
}

export function Cube({ className = "", style }: P) {
  return (
    <svg className={`scr ${className}`} style={style} width="40" height="40" viewBox="0 0 40 40" aria-hidden="true" data-draw>
      <path d="M8 14 L24 14 L24 32 L8 32 Z M8 14 L16 6 L32 6 L24 14 M32 6 L32 24 L24 32" />
    </svg>
  );
}

export function Heart({ className = "", style }: P) {
  return (
    <svg className={`scr ${className}`} style={style} width="34" height="30" viewBox="0 0 34 30" aria-hidden="true" data-draw>
      <path className="red" d="M17 27 C 4 18, 2 10, 8 5 C 12 2, 16 5, 17 9 C 18 5, 22 2, 26 5 C 32 10, 30 18, 17 27" />
    </svg>
  );
}

export function Zigzag({ className = "", style }: P) {
  return (
    <svg className={`scr ${className}`} style={style} width="40" height="24" viewBox="0 0 40 24" aria-hidden="true" data-draw>
      <path d="M2 12 L8 4 L14 20 L20 4 L26 20 L32 4 L38 12" />
    </svg>
  );
}

export function PaperPlane({ className = "", style }: P) {
  return (
    <div className={`scr-wrap plane-wrap ${className}`} style={style} aria-hidden="true">
      <svg className="scr" viewBox="0 0 200 90">
        <path className="soft" d="M6 74 C 50 20, 90 90, 140 40 S 190 10, 196 18" />
      </svg>
      <svg className="scr plane" viewBox="0 0 34 24">
        <path d="M2 12 L32 2 L20 22 L16 14 Z M16 14 L32 2" />
      </svg>
    </div>
  );
}

export function RoadCar({ note }: { note?: string }) {
  return (
    <div className="scr-wrap road" aria-hidden="true">
      <svg className="scr car" viewBox="0 0 76 34">
        <path d="M6 24 L6 16 L18 15 L26 6 L48 6 L58 15 L70 17 L70 24" />
        <path d="M28 8 L28 15 M44 8 L46 15 M18 15 L58 15" />
        <g className="wheel"><circle cx="20" cy="26" r="6" /><path d="M20 20 L20 32" /></g>
        <g className="wheel"><circle cx="56" cy="26" r="6" /><path d="M56 20 L56 32" /></g>
        <path className="red" d="M2 12 L-6 12 M2 18 L-10 18" />
      </svg>
      {note && <span className="note">{note}</span>}
    </div>
  );
}

export function Gears({ className = "", style }: P) {
  return (
    <svg className={`scr ${className}`} style={style} width="120" height="90" viewBox="0 0 120 90" aria-hidden="true">
      <g className="gear">
        <circle cx="42" cy="46" r="24" strokeWidth="9" strokeDasharray="7 6" />
        <circle cx="42" cy="46" r="14" />
        <circle cx="42" cy="46" r="4" />
      </g>
      <g className="gear rev">
        <circle cx="88" cy="28" r="15" strokeWidth="7" strokeDasharray="5 5" />
        <circle cx="88" cy="28" r="7" />
      </g>
    </svg>
  );
}

export function CoinLock({ className = "", style }: P) {
  return (
    <svg className={`scr ${className}`} style={style} width="150" height="110" viewBox="0 0 150 110" aria-hidden="true">
      <g className="wobble">
        <circle cx="44" cy="58" r="30" />
        <circle cx="44" cy="58" r="23" strokeDasharray="3 4" />
        <text x="36" y="66" style={{ fontSize: 26 }}>₹</text>
      </g>
      <g className="wobble" style={{ animationDelay: "0.6s" }}>
        <path d="M96 56 L96 44 C 96 30, 122 30, 122 44 L122 56" />
        <rect x="88" y="56" width="42" height="36" rx="5" />
        <path className="red" d="M109 68 L109 80" />
      </g>
    </svg>
  );
}

export function Seedling({ className = "", style }: P) {
  return (
    <svg className={`scr ${className}`} style={style} width="140" height="120" viewBox="0 0 140 120" aria-hidden="true">
      <path d="M20 108 C 50 100, 90 100, 120 108" />
      <g className="grow">
        <path d="M70 104 C 70 80, 68 60, 72 42" />
        <path d="M71 70 C 52 66, 42 52, 44 40 C 60 42, 70 54, 71 70" />
        <path d="M72 52 C 84 40, 100 38, 108 42 C 104 56, 88 60, 72 52" />
      </g>
      <g>
        <path className="blink1" d="M112 20 L112 26" />
        <path className="blink2" d="M118 14 L118 26" />
        <path className="blink3" d="M124 8 L124 26" />
      </g>
    </svg>
  );
}

export function Pencil() {
  return (
    <div className="pencil-line" aria-hidden="true">
      <svg viewBox="0 0 96 20" className="scr">
        <path d="M2 16 L12 10 L12 18 Z" />
        <path d="M12 10 L80 10 L80 18 L12 18" />
        <path className="red" d="M80 10 L92 10 L92 18 L80 18" />
        <path d="M24 14 L70 14" strokeWidth="1" />
      </svg>
    </div>
  );
}

export function CircleMark() {
  return (
    <svg viewBox="0 0 100 60" preserveAspectRatio="none" aria-hidden="true" data-draw>
      <path d="M52 4 C 20 2, 2 16, 4 32 C 6 50, 40 58, 66 54 C 92 50, 100 30, 90 16 C 80 4, 50 2, 30 8" />
    </svg>
  );
}

export function DragHint({ label }: { label: string }) {
  return (
    <span className="drag-hint" aria-hidden="true">
      {label}
      <svg className="scr" width="44" height="18" viewBox="0 0 44 18">
        <path className="red" d="M2 10 C 14 6, 26 12, 40 8 M32 2 L40 8 L33 15" />
      </svg>
    </span>
  );
}
