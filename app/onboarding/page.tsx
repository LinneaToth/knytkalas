import OnboardingForm from "@/features/onboarding/components/OnboardingForm";
import { GoogleLogInButton } from "@/features/auth/components/GoogleLogInButton";
import ContentBox from "@/ui/components/ContentBox";
import FeatureHeadline from "@/ui/components/FeatureHeadline";
import { isPathSafe } from "@/features/auth/utils/isPathSafe";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/features/auth/services/getCurrentUser";
import NavBar from "@/features/pageFrame/components/NavBar";

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
    <>
      <NavBar mode="onboarding" />
      <main className="bg-opacity-30 flex h-screen w-screen flex-col items-center justify-center bg-[url('/graphics/bg.svg')] bg-cover p-10 backdrop-blur-lg">
        <ContentBox
          styling="gap-5 text-center bg-opacity-30 backdrop-blur-lg p-10"
          glass={true}
        >
          <h1 className="text-4xl">Join the party!</h1>

          {user && (
            <>
              <h2 className="uppercase">
                We need a few details to get you started
              </h2>
              <OnboardingForm callbackUrl={callbackUrl} />
            </>
          )}
          {!user && (
            <>
              <h2 className="uppercase">
                Sign in with your Google account to get started
              </h2>
              <GoogleLogInButton
                callbackUrl={`/onboarding?target-url=${callbackUrl}`}
              />
            </>
          )}
        </ContentBox>
      </main>
    </>
  );
}
