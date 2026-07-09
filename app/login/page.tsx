"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { GoogleLogInButton } from "@/features/auth/components/GoogleLogInButton";
import ContentBox from "@/ui/components/ContentBox";
import FeatureHeadline from "@/ui/components/FeatureHeadline";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const callbackUrl = "/" + (searchParams.get("target-url") || "");

  return (
    <main className="flex h-full flex-col items-center justify-center">
      <ContentBox>
        <FeatureHeadline extraStyling="-mt-20 mb-5" size="medium">
          Welcome back!
        </FeatureHeadline>
        <h2>Please sign in using your Google account!</h2>
        <GoogleLogInButton callbackUrl={callbackUrl} />
        <p>
          Don&apos;t have an account yet?{" "}
          <Link href="/onboarding">Join the party!</Link>
        </p>
      </ContentBox>
    </main>
  );
}
