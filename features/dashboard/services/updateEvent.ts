"use server";
import { getEvent } from "@/data/dal/event/getEvent";
import { updateEvent as updateEventDAL } from "@/data/dal/event/updateEvent";
import { getCurrentUser } from "@/features/auth/services/getCurrentUser";
import { getEventFormFields } from "../utils/eventFormFields";

export const updateEvent = async (eventId: number, formData: FormData) => {
  const fields = getEventFormFields(formData);
  const { date } = fields;

  //Expected errors return the fields too, so the form can be refilled with what the user typed
  if (isNaN(new Date(date).getTime())) return { error: "Invalid date", fields };
  if (new Date(date) < new Date())
    return { error: "Event date must be in the future", fields }; //User may well be expected to enter an old or invalid date, no error thrown

  const [user, event] = await Promise.all([
    getCurrentUser(),
    getEvent(eventId),
  ]);

  if (!user) throw new Error("Cannot update event without signed in user"); //Proxy ensures a signed in user if they are in /dashboard; a missing user means something is broken. Error thrown.
  if (!event) throw new Error("Event not found"); //If they get here from an event details page without an event; something went unexpectedly wrong.
  if (user.id !== event.hostId)
    throw new Error("User is not authorized to update this event"); //controls should not appear if user is not the host.

  await updateEventDAL(eventId, {
    occasion: fields.occasion,
    date: new Date(date).toISOString(),
    responseDeadline: fields.responseDeadline
      ? new Date(fields.responseDeadline).toISOString()
      : null,
    description: fields.description || null,
    location: fields.location || null,
  });
};
