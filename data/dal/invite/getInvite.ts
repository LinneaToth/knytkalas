"server-only";

import prisma from "@/prisma/utils/prismaUtils";

export const getInvite = async (invId: number) => {
  return await prisma.invite.findUnique({
    where: {
      id: invId,
    },
    select: {
      id: true,
      createdAt: true,
      status: true,
      invById: true,
      guestId: true,
      contributions: true,

      event: {
        select: {
          id: true,
          occasion: true,
          date: true,
          description: true,
          activeCategories: true,
          responseDeadline: true,
          deletedAt: true,
        },
      },
    },
  });
};
