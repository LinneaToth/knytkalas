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

  if (!invite || !user) throw new Error("Invite or user not found");

  const notInviting =
    user.id !== invite.invById && user.id !== invite.event.hostId;

  if (notInviting)
    throw new Error("User is not authorized to uninvite this guest");

  if (invite.guestId === user.id)
    throw new Error("User cannot uninvite themselves");

  const deletedInvite = await deleteInvite(inviteId);
  revalidatePath(`/dashboard/events/${deletedInvite.eventId}`);
};
