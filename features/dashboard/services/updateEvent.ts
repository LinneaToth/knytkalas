"use server";
import { getEvent } from "@/data/dal/event/getEvent";
import { updateEvent as updateEventDAL } from "@/data/dal/event/updateEvent";
import { getCurrentUser } from "@/features/auth/services/getCurrentUser";

export const updateEvent = async (eventId: number, formData: FormData) => {
  const occasion = formData.get("occasion") as string;
  const date = formData.get("date") as string;

  if (isNaN(new Date(date).getTime())) return { error: "Invalid date" };
  if (new Date(date) < new Date())
    return { error: "Event date must be in the future" }; //User may well be expected to enter an old or invalid date, no error thrown

  const [user, event] = await Promise.all([
    getCurrentUser(),
    getEvent(eventId),
  ]);

  if (!user) throw new Error("Cannot update event without signed in user"); //Proxy ensures a signed in user if they are in /dashboard; a missing user means something is broken. Error thrown.
  if (!event) throw new Error("Event not found"); //If they get here from an event details page without an event; something went unexpectedly wrong.
  if (user.id !== event.hostId)
    throw new Error("User is not authorized to update this event"); //controls should not appear if user is not the host.

  await updateEventDAL(eventId, {
    occasion,
    date: new Date(date).toISOString(),
    responseDeadline: formData.get("responseDeadline")
      ? new Date(formData.get("responseDeadline") as string).toISOString()
      : null,
    description: formData.get("description") as string | null,
    location: formData.get("location") as string | null,
  });
};
