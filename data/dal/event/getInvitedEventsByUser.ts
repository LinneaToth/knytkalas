"server-only";

import { getInvitesByUser } from "../invite/getInvitesByUser";

export const getInvitedEventsByUser = async (id: string) => {
  const usersInvitedEventsData = await getInvitesByUser(id, "received");

  const usersEventsData = usersInvitedEventsData.map((i) => {
    return {
      occasion: i.event.occasion,
      date: i.event.date,
      id: i.eventId,
      deletedAt: i.event.deletedAt,
    };
  });

  return usersEventsData;
};
