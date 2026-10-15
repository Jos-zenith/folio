"use client";

export default function PrintButton() {
  return (
    <button className="btn primary" type="button" onClick={() => window.print()}>
      Save as PDF
    </button>
  );
}
