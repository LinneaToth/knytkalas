"use client";
import { useSession } from "@/utils/auth-client";

export function TempAuthStatus() {
  const { data, isPending, error } = useSession();

  if (isPending) return <p>Checking session…</p>;
  if (error) return <p>Something went wrong: {error.message}</p>;
  return (
    <p>{data ? `Logged in as ${data.user.email}` : "You're not logged in"}</p>
  );
}
