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
  if (!invite) throw new Error("Invite not found");
  try {
    const updatedData: {
      status?: "PENDING" | "GOING" | "DECLINED";
      totalGuests?: number;
    } = {};
    if (newStatus) updatedData.status = newStatus;
    if (guestChange) updatedData.totalGuests = invite.totalGuests + guestChange;

    const userIsGuest = (await getCurrentUserId()) === invite.guestId;
    if (!userIsGuest)
      throw new Error("User is not authorized to change this RSVP");
    await updateInvite(id, updatedData);
    revalidatePath(`/dashboard/events/${invite.event.id}`);
  } catch (e) {
    console.log(e);
    throw new Error("Failed to update RSVP status");
  }
};
