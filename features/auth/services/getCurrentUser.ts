//Server service function needed, since DAL will not communicate directly with client component

"use server";
import { getUser } from "@/data/dal/user/getUser";
import { getSessionUserId } from "./getSessionUserId";

export const getCurrentUser = async () => {
  const userId = await getSessionUserId();
  if (!userId) return null;
  return await getUser(userId);
};
