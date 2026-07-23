"use server";
import { getEvent } from "@/data/dal/event/getEvent";
import { updateEvent as updateEventDAL } from "@/data/dal/event/updateEvent";
import { getCurrentUser } from "@/features/auth/services/getCurrentUser";

export const updateEvent = async (eventId: number, formData: FormData) => {
  const occasion = formData.get("occasion") as string;
  const date = formData.get("date") as string;

  try {
    const [user, event] = await Promise.all([
      getCurrentUser(),
      getEvent(eventId),
    ]);

    if (!user) throw new Error("Cannot create event without signed in user");
    if (!event) throw new Error("Event not found");
    if (user.id != event.hostId)
      throw new Error("User is not authorized to update this event");

    if (new Date(date) < new Date())
      throw new Error("Event date must be in the future");

    const updatedEvent = await updateEventDAL(eventId, {
      occasion,
      date: new Date(date).toISOString(),
      responseDeadline: formData.get("responseDeadline")
        ? new Date(formData.get("responseDeadline") as string).toISOString()
        : null,
      description: formData.get("description") as string | null,
      location: formData.get("location") as string | null,
    });

    return updatedEvent;
  } catch (error) {
    console.error("Error updating event:", error);
    throw new Error("Failed to update event");
  }
};
