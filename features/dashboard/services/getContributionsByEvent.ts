"server-only";
import { getInvitesByEvent } from "@/data/dal/invite/getInvitesByEvent";

export const getContributionsByEvent = async (id: number) => {
  const invites = await getInvitesByEvent(Number(id));
  const contributions: {
    contribution: Awaited<
      ReturnType<typeof getInvitesByEvent>
    >[number]["contributions"][number];
    inviteId: number;
    guestId: string;
    guestName: string;
  }[] = [];

  invites.forEach((invite) => {
    invite.contributions.forEach((contribution) => {
      contributions.push({
        contribution: contribution,
        inviteId: invite.id,
        guestId: invite.guestId ?? "",
        guestName: invite.guestName ?? "",
      });
    });
  });

  return contributions;
};
