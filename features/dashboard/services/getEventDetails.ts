"use server";

import { getCurrentUserId } from "@/features/auth/services/getCurrentUserId";
import { getEvent } from "@/data/dal/event/getEvent";
import { getUser } from "@/data/dal/user/getUser";
import { getInvitesByEvent } from "@/data/dal/invite/getInvitesByEvent";

export const getEventDetails = async (eventId: number) => {
  try {
    const userId = await getCurrentUserId();
    if (!userId)
      throw new Error(
        "Only signed in members at Knytkalas are able to see event details",
      );

    const event = await getEvent(eventId);
    if (!event) throw new Error("No event found");

    const { name: hostName } = await getUser(event.hostId);
    const relatedInvites = await getInvitesByEvent(eventId);

    const guests = relatedInvites.map((invite) => ({
      id: invite.guestId,
      guestName: invite.guestName,
      status: invite.status,
      contributions: invite.contributions,
      totalGuests: invite.totalGuests,
    }));

    const userInvite = relatedInvites.find(
      (invite) => invite.guestId === userId,
    );

    const eventDetails = {
      ...event,
      hostName: hostName,
      guests: guests,
      status: userInvite?.status,
    };

    const isAuthorized = userId === event.hostId || !!userInvite;
    if (isAuthorized) return eventDetails;
    else throw new Error("User is not authorized to view this event");
  } catch (e) {
    //handle error, for now it is just logged:
    console.error(e);
  }
};
