import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold">404</h1>
        <div className="h-6 w-px bg-gray-400" />
        <p>This page could not be found.</p>
      </div>
      <Link href="/" className="mt-4 underline">
        TO HOME
      </Link>
    </section>
  );
}
