"use client";
import { LogIn } from "lucide-react";
import Button from "@/ui/components/Button";
import { signIn } from "@/data/auth/auth-client";
import { isPathSafe } from "../utils/isPathSafe";

type Props = {
  callbackUrl?: string;
};

export function GoogleLogInButton({ callbackUrl }: Props) {
  const url = callbackUrl || "/";
  const pathIsSafe = isPathSafe(url);
  const config = {
    provider: "google",
    callbackURL: pathIsSafe ? url : "/",
  };
  return (
    <Button
      variant="success"
      onClick={() => signIn.social(config)}
      variant="dark"
    >
      <LogIn /> Sign in with Google
    </Button>
  );
}
