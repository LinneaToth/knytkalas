"server-only";

import prisma from "@/prisma/utils/prismaUtils";

export const getInvitesByEvent = async (eventId: number) => {
  return await prisma.invite.findMany({
    where: {
      eventId: eventId,
    },
    select: {
      id: true,
      createdAt: true,
      status: true,
      invById: true,
      guestId: true,
      contributions: true,
      eventId: true,
      guestName: true,
      totalGuests: true,

      event: {
        select: {
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
