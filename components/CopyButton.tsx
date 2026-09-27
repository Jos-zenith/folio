"use client";

import { useState } from "react";

export default function CopyButton({ value }: { value: string }) {
  const [label, setLabel] = useState("Copy");
  return (
    <button
      type="button"
      className="copy"
      onClick={() => {
        navigator.clipboard
          ?.writeText(value)
          .then(() => setLabel("Copied"))
          .catch(() => setLabel("Select it above"))
          .finally(() => setTimeout(() => setLabel("Copy"), 1600));
      }}
    >
      {label}
    </button>
  );
}
