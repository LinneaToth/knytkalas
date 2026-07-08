import { Event as PrismaEvent } from "@/generated/prisma";

export const orderByDate = (events: PrismaEvent[]) => {
  return [...events].sort((a, b) => a.date.getTime() - b.date.getTime());
};
