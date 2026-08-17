"use server";
import { getUser } from "@/data/dal/user/getUser";
import { updateInvite } from "@/data/dal/invite/updateInvite";
import { getInviteByToken } from "@/data/dal/invite/getInviteByToken";
import { getCurrentUserId } from "@/features/auth/services/getCurrentUserId";
import { revalidatePath } from "next/cache";

export const claimInvite = async (token: string) => {
  const invite = await getInviteByToken(token);
  if (!invite) throw new Error("Invite not found");

  const currentUser = await getCurrentUserId();
  if (!currentUser)
    throw new Error("You must be signed in to join this event");
  if (invite.guestId)
    throw new Error("This invite has already been claimed");
  if (currentUser === invite.invById)
    throw new Error("You can't claim your own invite");

  const guest = await getUser(currentUser);
  await updateInvite(invite.id, {
    guest: { connect: { id: currentUser } },
    guestName: guest.name,
  });

  if (invite.event) revalidatePath(`/dashboard/events/${invite.event.id}`);
};
