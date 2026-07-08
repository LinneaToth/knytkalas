"server-only";

import prisma from "@/prisma/utils/prismaUtils";

export const getEventsByUser = async (id: string) => {
  const usersEvents = await prisma.event.findMany({
    where: { hostId: id },
  });

  if (usersEvents.length === 0) return [];

  const usersEventsData = usersEvents.map((event) => {
    return {
      occasion: event.occasion,
      date: event.date,
      id: event.id,
    };
  });

  return usersEventsData;
};
