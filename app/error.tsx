//Based on https://nextjs.org/docs/app/getting-started/error-handling#nested-error-boundaries 2026-10-09

"use client"; // Error boundaries must be Client Components
import Link from "next/link";

export default function ErrorPage({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <div className="mt-10 w-full text-center">
      <h2>Something went wrong!</h2>
      <p>It&apos;s not you, it&apos;s us. Promise. Please try again!</p>
    </div>
  );
}
