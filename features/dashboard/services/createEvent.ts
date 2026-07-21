"use server";
import { createEvent as createEventDAL } from "@/data/dal/event/createEvent";
import { createInvite as createInviteDAL } from "@/data/dal/invite/createInvite";
import { getCurrentUser } from "@/features/auth/services/getCurrentUser";

export const createEvent = async (formData: FormData) => {
  const occasion = formData.get("occasion") as string;
  const date = formData.get("date") as string;

  try {
    const user = await getCurrentUser();

    if (!user) throw new Error("Cannot create event without signed in user");

    if (new Date(date) < new Date())
      throw new Error("Event date must be in the future");

    const event = await createEventDAL({
      occasion,
      date: new Date(date).toISOString(),
      responseDeadline: formData.get("responseDeadline")
        ? new Date(formData.get("responseDeadline") as string).toISOString()
        : null,
      host: {
        connect: {
          id: user.id,
        },
      },
    });

    await createInviteDAL({
      event: { connect: { id: event.id } },
      invBy: { connect: { id: user.id } },
      guest: { connect: { id: user.id } },
      guestName: user?.name ?? "EVENT HOST",
      status: "GOING",
    });

    return event;
  } catch (error) {
    console.error("Error creating event:", error);
    throw new Error("Failed to create event");
  }
};
