//Server service function needed, since DAL will not communicate directly with client component

"use server";
import { getUser } from "@/data/dal/user/getUser";
import { getSessionUserId } from "./getSessionUserId";

export const getCurrentUser = async () => {
  try {
    const userId = await getSessionUserId();
    return await getUser(userId);
  } catch {
    return undefined;
  }
};
