"use server";
import { getSessionUserId } from "@/features/auth/services/getSessionUserId";

export const getCurrentUserId = async () => {
  try {
    return await getSessionUserId();
  } catch {
    return undefined;
  }
};
