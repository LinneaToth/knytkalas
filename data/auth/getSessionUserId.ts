"server-only";
import { auth } from "./auth";
import { headers } from "next/headers";

export const getSessionUserId = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) throw new Error("No user is currently signed in");

  const { id } = session.user;

  return id;
};
