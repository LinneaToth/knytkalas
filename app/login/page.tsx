"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { GoogleLogInButton } from "@/features/auth/components/GoogleLogInButton";
import ContentBox from "@/ui/components/ContentBox";
import NavBar from "@/features/pageFrame/components/NavBar";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("target-url") || "";

  return (
    <>
      <NavBar mode="notSignedIn" />
      <main className="bg-opacity-30 flex h-screen w-screen flex-col items-center justify-center bg-[url('/graphics/bg.svg')] bg-cover p-10 backdrop-blur-lg">
        <ContentBox
          styling="gap-5 text-center bg-opacity-30 backdrop-blur-lg p-10"
          glass={true}
        >
          <h1 className="text-4xl">Welcome back to Knytkalas!</h1>
          <h2 className="uppercase">
            Please sign in using your Google account
          </h2>
          <GoogleLogInButton callbackUrl={callbackUrl} />
          <p>
            Don&apos;t have an account yet?{" "}
            <Link href="/onboarding" className="underline">
              Join the party!
            </Link>
          </p>
        </ContentBox>
      </main>
    </>
  );
}
