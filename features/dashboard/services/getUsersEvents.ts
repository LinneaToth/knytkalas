"use server";

import { getSessionUserId } from "@/features/auth/services/getSessionUserId";
import { getEventsByUser } from "@/data/dal/event/getEventsByUser";

export const getUsersEvents = async (
  attendance: "guest" | "host" | "all",
  archivePastDays = 7,
) => {
  const userId = await getSessionUserId();
  if (!userId) throw new Error("No session found"); //Proxy.ts guarantees a user with an active session when someone's in /dashboard, so a missing session means something is broken. Error thrown.

  let events: Awaited<ReturnType<typeof getEventsByUser>> = [];

  if (attendance === "host") events = await getEventsByUser(userId, "host");
  if (attendance === "all") {
    const [hosted, invited] = await Promise.all([
      getEventsByUser(userId, "host"),
      getEventsByUser(userId, "guest"),
    ]);
    events = [...hosted, ...invited];
  } else if (attendance === "guest")
    events = await getEventsByUser(userId, "guest");

  const currentEvents = events.filter(
    (e) =>
      e.date.getTime() >
      new Date().getTime() - archivePastDays * 24 * 60 * 60 * 1000,
  );

  return currentEvents;
};
