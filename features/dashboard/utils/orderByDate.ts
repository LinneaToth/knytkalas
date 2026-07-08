import { EventData } from "@/types/entityTypes";

export const orderByDate = (events: EventData[]) => {
  if (events.length <= 1) return [...events];
  return [...events].sort((a, b) => a.date.getTime() - b.date.getTime());
};
