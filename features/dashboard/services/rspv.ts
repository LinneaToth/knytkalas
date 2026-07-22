import { updateInvite } from "@/data/dal/invite/updateInvite";

export const rspv = async (
  id: number,
  newStatus: "PENDING" | "GOING" | "DECLINED",
) => {
  try {
    await updateInvite(id, { status: newStatus });
  } catch (e) {
    console.log(e);
    throw new Error("Failed to update RSVP status");
  }
};
