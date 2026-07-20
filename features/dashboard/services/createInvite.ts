"use server";
import { createInvite as createInviteDAL } from "@/data/dal/invite/createInvite";
import { getCurrentUserId } from "@/features/auth/services/getCurrentUserId";

export const createInvite = async (formData: FormData) => {
  const guestName = formData.get("guestName") as string;

  try {
    const invById = await getCurrentUserId();

    if (!invById)
      throw new Error("Cannot create invite without signed in user");

    const invite = await createInviteDAL({
      guestName,
      invBy: {
        connect: {
          id: invById,
        },
      },
      event: {
        connect: {
          id: Number(formData.get("eventId")),
        },
      },
    });
    return invite;
  } catch (error) {
    console.error("Error creating invite:", error);
    throw new Error("Failed to create invite");
  }
};
