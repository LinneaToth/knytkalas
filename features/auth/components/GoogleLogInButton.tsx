"use client";
import Button from "@/components/ui/Button";
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
    <Button variant="success" onClick={() => signIn.social(config)}>
      Sign in with Google
    </Button>
  );
}
