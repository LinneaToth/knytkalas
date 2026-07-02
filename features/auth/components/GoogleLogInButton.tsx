"use client";
import { signIn } from "@/utils/auth-client";
import { useSession } from "@/utils/auth-client";

export function GoogleSignInButton() {
  const { data } = useSession();
  return (
    <>
      {!data && (
        <button
          className="cursor-pointer  bg-green-700 text-white"
          onClick={() => signIn.social({ provider: "google" })}>
          Sign in with Google
        </button>
      )}
    </>
  );
}
