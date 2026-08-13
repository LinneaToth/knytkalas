"use server";

import { getInviteToken } from "@/data/dal/invite/getInviteToken";

export const getInviteLink = async (invId: number) => {
  try {
    const result = await getInviteToken(invId);
    if (!result || !result.token) throw new Error("Invite token not found");

    return `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/invite/${result.token}`;
  } catch {}
};
