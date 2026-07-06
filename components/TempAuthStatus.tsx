"use client";
import { useSession } from "@/data/auth/auth-client";
import OnboardingForm from "@/features/onboarding/components/OnboardingForm";

export function TempAuthStatus() {
  const { data, isPending, error } = useSession();

  if (isPending) return <p>Checking session…</p>;
  if (error) return <p>Something went wrong: {error.message}</p>;
  return (
    <>
      <p>{!data && "You're not logged in"}</p>
      {data && <OnboardingForm />}
    </>
  );
}
