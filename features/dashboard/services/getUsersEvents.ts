"use server";

import { getHostedEventsByUser } from "@/data/dal/event/getHostedEventsByUser";
import { getSessionUserId } from "@/features/auth/services/getSessionUserId";
import { getInvitedEventsByUser } from "@/data/dal/event/getInvitedEventsByUser";

export const getUsersEvents = async (attendance: "guest" | "host") => {
  const userId = await getSessionUserId();
  let events;
  if (attendance === "host") events = await getHostedEventsByUser(userId);
  else events = await getInvitedEventsByUser(userId);

  return events.filter(
    (e) =>
      e.date.getTime() > new Date().getTime() - 7 * 24 * 12 * 60 * 60 * 1000,
  );
};
