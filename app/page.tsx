import { TempAuthStatus } from "@/components/TempAuthStatus";
import { GoogleSignInButton } from "@/features/auth/components/GoogleLogInButton";
import { SignOutButton } from "@/features/auth/components/SignOutButton";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      {/* <OneTapButton clientId={process.env.GOOGLE_CLIENT_ID!} /> */}
      <GoogleSignInButton />
      <TempAuthStatus />
      <SignOutButton />
    </div>
  );
}
