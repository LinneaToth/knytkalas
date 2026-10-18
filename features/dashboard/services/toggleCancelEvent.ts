"use server";
import { getEvent } from "@/data/dal/event/getEvent";
import { updateEvent } from "@/data/dal/event/updateEvent";
import { getCurrentUserId } from "@/features/auth/services/getCurrentUserId";

export const toggleCancelEvent = async (eventId: number) => {
  const event = await getEvent(eventId);
  if (!event) throw new Error("No event with matching id found"); //If event is loaded but not found, something is broken. Error thrown.
  const currentUserId = await getCurrentUserId();
  if (!currentUserId) throw new Error("No session found"); //Proxy.ts guarantees a user with an active session when someone's in /dashboard, so a missing session means something is broken. Error thrown.
  const userIsHost = currentUserId === event.hostId;

  if (!userIsHost)
    throw new Error("Only the host of an event can cancel or republish it"); //Should only be presented to host. If someone else got access and tried to manipulate the status, that truly is unexpected.

  return await updateEvent(eventId, {
    deletedAt: event.deletedAt ? null : new Date().toISOString(),
  });
};
