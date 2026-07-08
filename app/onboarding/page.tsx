"use client";
import OnboardingForm from "@/features/onboarding/components/OnboardingForm";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useAuthRedirect } from "@/features/auth/hooks/useAuthRedirect";
import { GoogleLogInButton } from "@/features/auth/components/GoogleLogInButton";

export default function OnboardingPage() {
  const searchParams = useSearchParams();
  const callbackUrl = "/" + (searchParams.get("target-url") || "");
  const { isLoading, currentUser } = useAuthRedirect(callbackUrl);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (currentUser?.onboarded) {
        router.push(callbackUrl);
      }
    }
  }, [isLoading, callbackUrl, currentUser?.onboarded, router]);

  if (isLoading) {
    return <main className="flex items-center justify-center">Loading...</main>;
  }

  if (currentUser?.onboarded) return null;
  if (currentUser) return <OnboardingForm />;

  if (!currentUser) return <GoogleLogInButton />;
}
