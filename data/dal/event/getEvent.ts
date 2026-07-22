"server-only";

import prisma from "@/prisma/utils/prismaUtils";
import { countGuests } from "@/utils/countGuests";

export const getEvent = async (id: number) => {
  const event = await prisma.event.findUnique({
    where: { id: id },
    select: {
      id: true,
      occasion: true,
      location: true,
      date: true,
      createdAt: true,
      description: true,
      responseDeadline: true,
      deletedAt: true,
      hostId: true,
      host: {
        select: {
          name: true,
        },
      },
      invites: {
        select: {
          id: true,
          status: true,
          invById: true,
          guestId: true,
          contributions: true,
          totalGuests: true,
        },
      },
    },
  });

  if (!event) throw new Error("No matching event found in Database");

  const totalGuestsAccepted = countGuests("GOING", event);
  const totalGuestsPending = countGuests("PENDING", event);
  const totalGuestsDeclined = countGuests("DECLINED", event);

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
    guestsAccepted: totalGuestsAccepted,
    guestsPending: totalGuestsPending,
    guestsDeclined: totalGuestsDeclined,
  };

  return eventData;
};
