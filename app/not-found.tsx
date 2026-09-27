import Link from "next/link";

export default function NotFound() {
  return (
    <main className="wrap" style={{ paddingBlock: "120px" }}>
      <p className="note red">p. 404, torn out</p>
      <h1 style={{ fontSize: "clamp(36px,6vw,64px)", marginTop: 12 }}>That page doesn&apos;t exist.</h1>
      <p className="lede">
        Try the <Link href="/#index">index</Link> or press Ctrl K to search.
      </p>
    </main>
  );
}
