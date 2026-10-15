import Link from "next/link";

export default function NotFound() {
  return (
    <main className="wrap nf">
      <span className="eyebrow">404</span>
      <h1>That page doesn&apos;t exist.</h1>
      <p>
        Go back to the <Link href="/#work">selected work</Link>, or press Ctrl K to search.
      </p>
    </main>
  );
}
