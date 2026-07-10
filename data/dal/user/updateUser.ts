"server-only";
import prisma from "@/prisma/utils/prismaUtils";
import { Prisma } from "@/generated/prisma";

type UserUpdateData = Prisma.UserUpdateInput;

// Note for later, when relational fields need updating (implement this in relevant method and delete this comment):
// await updateUser({
//   name: "New Name",
//   sentInvites: {
//     // Connect existing invites to this user by their IDs
//     connect: [{ id: 1 }, { id: 2 }]
//   }
// }, "user-id-whatever");

export const updateUser = async (userData: UserUpdateData, id: string) => {
  return prisma.user.update({
    where: { id: id },
    data: userData,
  });
};
