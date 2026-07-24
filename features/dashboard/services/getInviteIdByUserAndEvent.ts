"use server";
import { getInvitesByUser } from "@/data/dal/invite/getInvitesByUser";

export const getInviteIdByUserAndEvent = async (
  userId: string,
  eventId: number,
) => {
  const usersInvites = await getInvitesByUser(userId, "received");

  if (!usersInvites) throw new Error("User has no invites");

  const inviteId = usersInvites.find(
    (invite) => invite.eventId === eventId,
  )?.id;
  if (!inviteId) throw new Error("User has no invite for this event");

  return inviteId;
};
