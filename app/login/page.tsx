"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { GoogleLogInButton } from "@/features/auth/components/GoogleLogInButton";

export default function LoginPage() {
  const callbackUrl = useSearchParams().get("target-url") || "/";

  return (
    <main className="flex flex-col items-center justify-center">
      <h1>Welcome back</h1>
      <h2>Please sign in using your Google account!</h2>
      <GoogleLogInButton callbackUrl={callbackUrl} />
      <p>
        Don&apos;t have an account yet?
        <Link href="/onboarding">Join the party!</Link>
      </p>
    </main>
  );
}
