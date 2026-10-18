"use server";

import { getInviteToken } from "@/data/dal/invite/getInviteToken";
import { getCurrentUserId } from "@/features/auth/services/getCurrentUserId";

//Explicit return type, so the client can tell the two shapes apart with "error" in result
export const getInviteLink = async (
  invId: number,
): Promise<{ error: string } | { link: string }> => {
  const activeUserId = await getCurrentUserId();
  if (!activeUserId) throw new Error("No session found"); //Server actions are public endpoints, so check the session here. A real user only reaches this from /dashboard. Not expected, error thrown.

  const inviteToken = await getInviteToken(invId);
  if (!inviteToken) return { error: "Invite not found" }; //The guest may have been uninvited in another tab. Expected, error returned.

  if (activeUserId !== inviteToken.invById)
    throw new Error("User is not authorized to get this invite link"); //The copy button is only shown to the host. Not expected, error thrown.

  return {
    link: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/invite/${inviteToken.token}`,
  };
};
