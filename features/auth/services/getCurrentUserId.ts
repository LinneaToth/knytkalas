"use server";
import { getSessionUserId } from "@/features/auth/services/getSessionUserId";

export const getCurrentUserId = async () => {
  return await getSessionUserId();
};
