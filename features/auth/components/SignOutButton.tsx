"use client";
import { signOut } from "@/data/auth/auth-client";
import { useRouter } from "next/navigation";
import { useSession } from "@/data/auth/auth-client";

export function SignOutButton() {
  const { data } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <>
      {data && (
        <button
          className="cursor-pointer bg-blue-700 text-white"
          onClick={handleSignOut}>
          Sign out
        </button>
      )}
    </>
  );
}
