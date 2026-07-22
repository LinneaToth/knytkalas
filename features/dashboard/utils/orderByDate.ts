export const orderByDate = (
  events: Awaited<
    ReturnType<typeof import("../services/getUsersEvents").getUsersEvents>
  >[number][],
) => {
  if (events.length <= 1) return [...events];
  return [...events].sort((a, b) => a.date.getTime() - b.date.getTime());
};
