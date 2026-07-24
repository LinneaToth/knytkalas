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
  const invite = await getInvite(contribution.inviteId);

  if (!currentUser) throw new Error("User not found");
  if (!contribution) throw new Error("Contribution not found");
  if (invite?.guestId !== currentUser.id)
    throw new Error("User is not authorized to delete this contribution");

  await deleteContributionDAL(contributionId);

  revalidatePath(`/dashboard/events/${invite.event.id}`);
};
