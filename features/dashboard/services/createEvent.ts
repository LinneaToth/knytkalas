"use server";
import { redirect } from "next/navigation";
import { createEvent as createEventDAL } from "@/data/dal/event/createEvent";
import { createInvite as createInviteDAL } from "@/data/dal/invite/createInvite";
import { getCurrentUser } from "@/features/auth/services/getCurrentUser";
import { getEventFormFields } from "../utils/eventFormFields";

export const createEvent = async (formData: FormData) => {
  const fields = getEventFormFields(formData);
  const { date } = fields;

  //Expected errors return the fields too, so the form can be refilled with what the user typed
  if (isNaN(new Date(date).getTime())) return { error: "Invalid date", fields };
  if (new Date(date) < new Date())
    return { error: "Event date must be in the future", fields };

  const user = await getCurrentUser();
  if (!user) throw new Error("Cannot create event without signed in user"); //Proxy ensures a signed in user in /dashboard; a missing user means something is broken. Error thrown.

  const event = await createEventDAL({
    occasion: fields.occasion,
    date: new Date(date).toISOString(),
    responseDeadline: fields.responseDeadline
      ? new Date(fields.responseDeadline).toISOString()
      : null,
    description: fields.description || null,
    location: fields.location || null,
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
    guestName: user.name ?? "EVENT HOST",
    status: "GOING",
  });

  //redirect() works by throwing, so nothing after it runs. It has to come after the host invite is created, and must not be inside a try/catch
  redirect(`/dashboard/events/${event.id}`);
};
