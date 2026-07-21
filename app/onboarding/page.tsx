import OnboardingForm from "@/features/onboarding/components/OnboardingForm";
import { GoogleLogInButton } from "@/features/auth/components/GoogleLogInButton";
import ContentBox from "@/ui/components/ContentBox";
import FeatureHeadline from "@/ui/components/FeatureHeadline";
import { isPathSafe } from "@/features/auth/utils/isPathSafe";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/features/auth/services/getCurrentUser";

export default async function OnboardingPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>; //type from https://nextjs.org/docs/app/api-reference/file-conventions/page#searchparams-optional
}) {
  const params = await searchParams;
  const targetParam = "" + params["target-url"];
  const slashFreeTarget = targetParam?.startsWith("/")
    ? targetParam.slice(1)
    : targetParam;
  const target = "/" + slashFreeTarget;
  const callbackUrl = isPathSafe(target) ? target : "/";
  const user = await getCurrentUser();

  if (user?.onboarded) {
    redirect(callbackUrl);
  }

  return (
    <main className="flex h-full items-center justify-center">
      {" "}
      <ContentBox>
        <FeatureHeadline extraStyling="-mt-20 mb-5" size="medium">
          Join the party!
        </FeatureHeadline>
        {user && <OnboardingForm callbackUrl={callbackUrl} />}
        {!user && (
          <GoogleLogInButton
            callbackUrl={`/onboarding?target-url=${callbackUrl}`}
          />
        )}
      </ContentBox>
    </main>
  );
}
