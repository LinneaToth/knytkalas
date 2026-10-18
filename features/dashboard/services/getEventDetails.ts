import "server-only";

import { getCurrentUserId } from "@/features/auth/services/getCurrentUserId";
import { getEvent } from "@/data/dal/event/getEvent";
import { getUser } from "@/data/dal/user/getUser";
import { getInvitesByEvent } from "@/data/dal/invite/getInvitesByEvent";

export const getEventDetails = async (eventId: number) => {
  const userId = await getCurrentUserId();
  if (!userId)
    throw new Error(
      "Only signed in members at Knytkalas are able to see event details", //Proxy.ts should prevent non-signed-in users from getting here, hence the thrown error
    );

  const event = await getEvent(eventId);
  if (!event) return null; //Plain old 404

  const host = await getUser(event.hostId);
  if (!host) throw new Error("Event host not found"); //Data is broken if event doesnt have a host; which is an unexpected error that warrants a throw
  const hostName = host.name;

  const relatedInvites = await getInvitesByEvent(eventId);

  const guests = relatedInvites.map((invite) => ({
    inviteId: invite.id,
    id: invite.guestId,
    guestName: invite.guestName,
    status: invite.status,
    contributions: invite.contributions,
    totalGuests: invite.totalGuests,
  }));

  const userInvite = relatedInvites.find((invite) => invite.guestId === userId);

  const eventDetails = {
    ...event,
    hostName: hostName,
    guests: guests,
    status: userInvite?.status,
    userInviteId: userInvite?.id,
    userInviteGuests: userInvite?.totalGuests,
  };

  const isAuthorized = userId === event.hostId || !!userInvite;
  if (isAuthorized) return eventDetails;
  else return null; //Not your event? Nope, you can't see it. 404 instead of 403 so you don't guess around for other events.
};
