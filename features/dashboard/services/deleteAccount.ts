"use server";
import { softDeleteUser } from "@/data/dal/user/deleteUser";

export const deleteAccount = async (id: string) => {
  return await softDeleteUser(id);
};
