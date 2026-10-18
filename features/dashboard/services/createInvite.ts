"use server";
import { getEvent } from "@/data/dal/event/getEvent";
import { createInvite as createInviteDAL } from "@/data/dal/invite/createInvite";
import { getCurrentUserId } from "@/features/auth/services/getCurrentUserId";
import { revalidatePath } from "next/cache";

export const createInvite = async (formData: FormData) => {
  const guestName = formData.get("guestName") as string;
  if (guestName.trim().length < 1) return { error: "A guest name is needed" };

  const eventId = Number(formData.get("eventId") as string);
  const currentUserId = await getCurrentUserId();
  if (!currentUserId) throw new Error("No session found"); //If someone is inside /dashboard, proxy should ensure that the person is logged in. If not, thats an error.
  const event = await getEvent(eventId);

  //eventId could potentially be changed in devtool. The check below ensures that the user is actually the host
  if (!event || event.hostId !== currentUserId) {
    throw new Error(
      "User is not authorized to create an invite for this event",
    );
  }

  await createInviteDAL({
    guestName,
    invBy: {
      connect: {
        id: currentUserId,
      },
    },
    event: {
      connect: {
        id: eventId,
      },
    },
  });

  revalidatePath(`/dashboard/events/${eventId}`);
};
