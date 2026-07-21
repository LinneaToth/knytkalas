"server-only";

import prisma from "@/prisma/utils/prismaUtils";

export const getEvent = async (id: number) => {
  const event = await prisma.event.findUnique({
    where: { id: id },
  });

  if (!event) throw new Error("No matching event found in Database");

  const eventData = {
    occasion: event.occasion,
    id: event.id,
    createdAt: event.createdAt,
    description: event.description,

    date: event.date,
    location: event.location,
    responseDeadline: event.responseDeadline,
    hostId: event.hostId,
    deletedAt: event.deletedAt,
  };

  return eventData;
};
