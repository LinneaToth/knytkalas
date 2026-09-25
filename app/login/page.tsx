"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { GoogleLogInButton } from "@/features/auth/components/GoogleLogInButton";
import ContentBox from "@/ui/components/ContentBox";
import NavBar from "@/features/pageFrame/components/NavBar";

function GoogleLogInButtonWithCallback() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("target-url") || "";
  return <GoogleLogInButton callbackUrl={callbackUrl} />;
}

export default function LoginPage() {
  return (
    <>
      <NavBar mode="notSignedIn" />
      <main className="bg-opacity-30 flex h-screen w-full flex-col items-center justify-center bg-[url('/graphics/bg.svg')] bg-cover p-10 backdrop-blur-lg">
        <ContentBox styling="gap-5 text-center" glass={true}>
          <h1 className="text-h1">Welcome back to Knytkalas!</h1>
          <h2 className="uppercase">
            Please sign in using your Google account
          </h2>

          {/* Suspense attempts to render whatever children is in there; if something is missing it takes a fallback argument */}
          <Suspense fallback={<GoogleLogInButton callbackUrl="" />}>
            <GoogleLogInButtonWithCallback />
          </Suspense>

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
