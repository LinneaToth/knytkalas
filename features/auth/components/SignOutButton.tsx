"use client";
import { signOut } from "@/utils/auth-client";
import { useRouter } from "next/navigation";
import { useSession } from "@/utils/auth-client";

export function SignOutButton() {
  const { data } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
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
