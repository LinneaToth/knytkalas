import { getHostedEventsByUser } from "@/data/dal/event/getHostedEventsByUser";
import { getInvitedEventsByUser } from "@/data/dal/event/getInvitedEventsByUser";

export const isGuestAtEvent = async (userId: string, eventId: number) => {
  const hostedEvents = await getHostedEventsByUser(userId);
  const invitedEvents = await getInvitedEventsByUser(userId);
  const allEvents = [...hostedEvents, ...invitedEvents];

  return allEvents.some((event) => event.id === eventId);
};
