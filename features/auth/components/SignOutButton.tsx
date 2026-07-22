"use client";
import { signOut } from "@/data/auth/auth-client";
import { useRouter } from "next/navigation";
import Button from "@/ui/components/Button";

export function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <Button variant="outline" onClick={handleSignOut} width="full">
      Sign out
    </Button>
  );
}
