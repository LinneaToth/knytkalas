"server-only";

import prisma from "@/prisma/utils/prismaUtils";

export const getInvitesByUser = async (
  userId: string,
  attendance: "sent" | "received",
) => {
  const key = attendance === "sent" ? "invById" : "guestId";

  return await prisma.invite.findMany({
    where: {
      [key]: userId,
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

      event: {
        select: {
          occasion: true,
          date: true,
          description: true,
          responseDeadline: true,
          deletedAt: true,
        },
      },
    },
  });
};
