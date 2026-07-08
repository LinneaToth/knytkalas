//Server service function needed, since DAL will not communicate directly with client component

"use server";
import { getUser } from "@/data/dal/user/getUser";

export const getCurrentUser = async (id: string) => {
  try {
    return await getUser(id);
  } catch {
    return undefined;
  }
};
