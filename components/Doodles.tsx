export function CurlyArrow({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={`doodle ${className}`} style={style} width="90" height="60" viewBox="0 0 90 60" aria-hidden="true">
      <path d="M4 8 C 30 0, 60 10, 52 30 C 46 44, 26 40, 34 28 C 42 16, 70 30, 80 50" />
      <path d="M70 46 L 80 51 L 83 40" />
    </svg>
  );
}

export function Squiggle({ className = "" }: { className?: string }) {
  return (
    <svg className={`doodle ${className}`} width="120" height="14" viewBox="0 0 120 14" aria-hidden="true">
      <path d="M2 8 Q 12 0, 22 8 T 42 8 T 62 8 T 82 8 T 102 8 T 118 8" />
    </svg>
  );
}
