import "server-only";
import prisma from "@/prisma/utils/prismaUtils";

export const getInviteToken = async (invId: number) => {
  return await prisma.invite.findUnique({
    where: {
      id: invId,
    },
    select: {
      token: true,
    },
  });
};
