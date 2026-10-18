"use server";
import { getCurrentUserId } from "@/features/auth/services/getCurrentUserId";
import { updateInvite } from "@/data/dal/invite/updateInvite";
import { getInvite } from "@/data/dal/invite/getInvite";
import { revalidatePath } from "next/cache";

export const rspv = async (
  id: number,
  newStatus?: "PENDING" | "GOING" | "DECLINED",
  guestChange?: number,
) => {
  const invite = await getInvite(id);
  if (!invite) return { error: "Invite not found" }; //Invites may very well be deleted. Expected error not to find them.

  const currentUserId = await getCurrentUserId();
  if (!currentUserId) throw new Error("No session found"); //Server actions are public endpoints, so proxy.ts doesn't protect them. Without this, null (no session) === null (unclaimed invite) would pass the check below

  const userIsGuest = currentUserId === invite.guestId;
  if (!userIsGuest)
    throw new Error("User is not authorized to change this RSVP"); //The buttons should only appear on one's own invite, if you see them for someone else that's an unexpected error.

  const updatedData: {
    status?: "PENDING" | "GOING" | "DECLINED";
    totalGuests?: number;
  } = {};
  if (newStatus) updatedData.status = newStatus;
  if (guestChange)
    updatedData.totalGuests = Math.max(1, invite.totalGuests + guestChange); //We dont want negative guests

  await updateInvite(id, updatedData);
  revalidatePath(`/dashboard/events/${invite.event.id}`);
};
