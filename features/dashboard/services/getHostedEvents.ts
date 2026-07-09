import { getEventsByUser } from "@/data/dal/event/getEventsByUser";
import { getSessionUserId } from "@/features/auth/services/getSessionUserId";

export const getHostedEvents = async () => {
  const userId = await getSessionUserId();
  const hostedEvents = await getEventsByUser(userId);
  return hostedEvents;
};
