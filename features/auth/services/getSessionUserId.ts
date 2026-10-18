import "server-only";
import { cache } from "react";
import { auth } from "../../../data/auth/auth";
import { headers } from "next/headers";

export const getSessionUserId = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) return null;

  const { id } = session.user;

  return id;
});
