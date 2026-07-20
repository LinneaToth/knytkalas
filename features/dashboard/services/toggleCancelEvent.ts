"use server";
import { getEvent } from "@/data/dal/event/getEvent";
import { updateEvent } from "@/data/dal/event/updateEvent";
import { getCurrentUserId } from "@/features/auth/services/getCurrentUserId";

export const toggleCancelEvent = async (eventId: number) => {
  const event = await getEvent(eventId);
  if (!event) throw new Error("No event with matching id found");
  const currentUserId = await getCurrentUserId();
  const userIsHost = currentUserId === event.hostId;

  if (!userIsHost)
    throw new Error("Only the host of an event can cancel or republish it");

  return await updateEvent(eventId, {
    deletedAt: event.deletedAt ? null : new Date().toISOString(),
  });
};
