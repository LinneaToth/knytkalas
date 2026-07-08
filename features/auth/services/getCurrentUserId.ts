"use server";
import { getSessionUserId } from "@/data/auth/getSessionUserId";

export const getCurrentUserId = async () => {
  try {
    return await getSessionUserId();
  } catch {
    return undefined;
  }
};
