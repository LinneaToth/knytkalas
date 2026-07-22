type EventWithInvites = {
  invites: { status: string; totalGuests: number }[];
};

export const countGuests = (
  response: string,
  event: EventWithInvites,
): number => {
  return event.invites.reduce(
    (guests: number, invite: (typeof event.invites)[number]) => {
      if (invite.status === response) {
        return guests + (invite.totalGuests || 0);
      }
      return guests;
    },
    0,
  );
};
