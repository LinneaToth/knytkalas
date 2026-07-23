import "server-only";
import prisma from "@/prisma/utils/prismaUtils";

export const deleteInvite = async (id: number) => {
  return await prisma.invite.delete({
    where: {
      id: id,
    },
  });
};
