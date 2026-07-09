"use client";
import { signOut } from "@/data/auth/auth-client";
import { useRouter } from "next/navigation";
import { useSession } from "@/data/auth/auth-client";
import Button from "@/ui/components/Button";

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
        <Button variant="ghost" onClick={handleSignOut}>
          Sign out
        </Button>
      )}
    </>
  );
}
