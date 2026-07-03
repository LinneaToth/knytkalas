"use client";
import { signIn } from "@/data/auth/auth-client";
import { useSession } from "@/data/auth/auth-client";

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
