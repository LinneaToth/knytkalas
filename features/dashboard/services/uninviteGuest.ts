"use server";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/features/auth/services/getCurrentUser";
import { getInvite } from "@/data/dal/invite/getInvite";

import { deleteInvite } from "@/data/dal/invite/deleteInvite";

export const uninviteGuest = async (inviteId: number) => {
  const [user, invite] = await Promise.all([
    getCurrentUser(),
    getInvite(inviteId),
  ]);

  if (!user) throw new Error("User not found"); //A proper user can only trigger this from /dashboard, where proxy.ts requires a session. No session means a direct call or something broken. Not expected, error thrown.
  if (!invite) return { error: "Invite not found" };

  const notInviting =
    user.id !== invite.invById && user.id !== invite.event.hostId;

  if (notInviting)
    throw new Error("User is not authorized to uninvite this guest");

  if (invite.guestId === user.id)
    throw new Error("User cannot uninvite themselves");

  const deletedInvite = await deleteInvite(inviteId);
  revalidatePath(`/dashboard/events/${deletedInvite.eventId}`);
};
