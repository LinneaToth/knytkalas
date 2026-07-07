"use client";
import Button from "@/components/ui/Button";
import { signIn } from "@/data/auth/auth-client";

export function GoogleLogInButton() {
  return (
    <Button
      variant="success"
      onClick={() => signIn.social({ provider: "google" })}>
      Sign in with Google
    </Button>
  );
}
