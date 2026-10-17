"use server";
import { getContribution } from "@/data/dal/contribution/getContribution";
import { deleteContribution as deleteContributionDAL } from "@/data/dal/contribution/deleteContribution";
import { getInvite } from "@/data/dal/invite/getInvite";
import { getCurrentUser } from "@/features/auth/services/getCurrentUser";
import { revalidatePath } from "next/cache";

export const deleteContribution = async (contributionId: number) => {
  const [currentUser, contribution] = await Promise.all([
    getCurrentUser(),
    getContribution(contributionId),
  ]);

  if (!contribution) return { error: "Contribution not found" };
  const invite = await getInvite(contribution.inviteId);

  if (!currentUser) throw new Error("User not found"); //If there is no user but there is a contribution, something is broken. Not expected. Error thrown.
  if (invite?.guestId !== currentUser.id)
    throw new Error("User is not authorized to delete this contribution"); //Proxy.ts guarantees a session when someone's in /dashboard, so a missing user means something is broken. Error thrown.

  await deleteContributionDAL(contributionId);

  revalidatePath(`/dashboard/events/${invite.event.id}`);
};
