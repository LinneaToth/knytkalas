import Link from "next/link";
import { GoogleLogInButton } from "@/features/auth/components/GoogleLogInButton";

export default function LoginPage() {
  return (
    <main className="flex flex-col items-center justify-center">
      <h1>Welcome back</h1>
      <h2>Please sign in using your Google account!</h2>
      <GoogleLogInButton />
      <p>
        Don&apos;t have an account yet?{" "}
        <Link href="/onboarding">Join the party!</Link>
      </p>
    </main>
  );
}
