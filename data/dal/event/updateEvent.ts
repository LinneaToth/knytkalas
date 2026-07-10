"server-only";

import prisma from "@/prisma/utils/prismaUtils";
import { Prisma } from "@/generated/prisma";

type EventUpdateData = Prisma.EventUpdateInput;

export const updateEvent = async (id: number, eventData: EventUpdateData) => {
  return await prisma.event.update({
    where: { id: id },
    data: eventData,
  });
};
