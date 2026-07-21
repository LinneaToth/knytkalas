"use server";
import { getUser } from "@/data/dal/user/getUser";
import { updateInvite } from "@/data/dal/invite/updateInvite";
import { getInviteByToken } from "@/data/dal/invite/getInviteByToken";

export const claimInvite = async (
  currentUser: string,
  invite: Awaited<ReturnType<typeof getInviteByToken>>,
) => {
  const guest = await getUser(currentUser);
  if (!invite) throw new Error("Invite was not claimed");
  await updateInvite(invite.id, {
    guest: { connect: { id: currentUser } },
    guestName: guest.name,
  });
};
