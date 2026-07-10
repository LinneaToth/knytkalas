"server-only";

import prisma from "@/prisma/utils/prismaUtils";
import { Prisma } from "@/generated/prisma";

type EventCreateData = Prisma.EventCreateInput;

export const createEvent = async (eventData: EventCreateData) => {
  return await prisma.event.create({
    data: eventData,
  });
};
