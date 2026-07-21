"server-only";
import { getInvitesByUser } from "@/data/dal/invite/getInvitesByUser";

export const getContributionsByUser = async (id: string) => {
  const invites = await getInvitesByUser(id, "received");
  const contributions: {
    contributions: Awaited<
      ReturnType<typeof getInvitesByUser>
    >[number]["contributions"];
    eventOccasion: string;
    eventId: number;
    inviteId: number;
    guestId: string;
    guestName: string;
  }[] = [];

  invites.forEach((invite) =>
    contributions.push({
      contributions: invite.contributions,
      eventOccasion: invite.event.occasion,
      eventId: invite.eventId,
      inviteId: invite.id,
      guestId: invite.guestId ?? "",
      guestName: invite.guestName ?? "",
    }),
  );

  return contributions;
};
