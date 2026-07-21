"server-only";

import prisma from "@/prisma/utils/prismaUtils";
export const getInviteByToken = async (token: string) => {
  return await prisma.invite.findUnique({
    where: {
      token: token,
    },
    select: {
      id: true,
      createdAt: true,
      status: true,
      invById: true,
      guestId: true,
      guestName: true,

      event: {
        select: {
          id: true,
          occasion: true,
          date: true,
          description: true,
          responseDeadline: true,
          deletedAt: true,
          location: true,
          host: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });
};
