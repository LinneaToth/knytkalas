import "server-only";

import prisma from "@/prisma/utils/prismaUtils";
import { countGuests } from "@/utils/countGuests";

export const getEventsByUser = async (id: string, role: "host" | "guest") => {
  const usersEvents = await prisma.event.findMany({
    where:
      role === "host"
        ? { hostId: id }
        : { invites: { some: { guestId: id } }, hostId: { not: id } },
    select: {
      id: true,
      occasion: true,
      location: true,
      date: true,
      deletedAt: true,
      createdAt: true,
      description: true,
      responseDeadline: true,
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

  if (usersEvents.length === 0) return [];

  const usersEventsData = usersEvents.map((event) => {
    const totalGuestsAccepted = countGuests("GOING", event);
    const totalGuestsPending = countGuests("PENDING", event);
    const totalGuestsDeclined = countGuests("DECLINED", event);

    const userInvite = event.invites.find((invite) => invite.guestId === id);

    return {
      occasion: event.occasion,
      location: event.location,
      date: event.date,
      id: event.id,
      deletedAt: event.deletedAt,
      invites: event.invites,
      role: id === event.hostId ? "host" : "guest",
      acceptedStatus: userInvite?.status,
      hostName: event.host.name,
      usersGuests: userInvite?.totalGuests ?? 1,
      guestsAccepted: totalGuestsAccepted,
      guestsPending: totalGuestsPending,
      guestsDeclined: totalGuestsDeclined,
    };
  });

  return usersEventsData;
};
