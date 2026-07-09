"server-only";
import prisma from "@/prisma/utils/prismaUtils";
import { any } from "better-auth";

//Events are never actually deleted, since there are relations. However, the event data will be wiped.

export const deleteEvent = async (id: number) => {
  await prisma.event.update({
    where: {
      id: id,
    },
    data: {
      deletedAt: new Date(),
    },
  });
};
