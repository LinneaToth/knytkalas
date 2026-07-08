import { getEventsByUser } from "@/data/dal/event/getEventsByUser";
import { getSessionUserId } from "@/data/auth/getSessionUserId";

export const getHostedEvents = async () => {
  const userId = await getSessionUserId();
  const hostedEvents = await getEventsByUser(userId);
  return hostedEvents;
};
