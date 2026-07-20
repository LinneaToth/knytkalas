"use server";
import { createEvent as createEventDAL } from "@/data/dal/event/createEvent";
import { getCurrentUserId } from "@/features/auth/services/getCurrentUserId";

export const createEvent = async (formData: FormData) => {
  const occasion = formData.get("occasion") as string;
  const date = formData.get("date") as string;

  try {
    const userId = await getCurrentUserId();

    if (!userId) throw new Error("Cannot create event without signed in user");

    const event = await createEventDAL({
      occasion,
      date: new Date(date).toISOString(),
      responseDeadline: formData.get("responseDeadline")
        ? new Date(formData.get("responseDeadline") as string).toISOString()
        : null,
      host: {
        connect: {
          id: userId,
        },
      },
    });
    return event;
  } catch (error) {
    console.error("Error creating event:", error);
    throw new Error("Failed to create event");
  }
};
