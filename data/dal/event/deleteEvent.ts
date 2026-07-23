import "server-only";
import prisma from "@/prisma/utils/prismaUtils";

//Hard delete would mess up the database in terms of many hardwired relations.

export const softDeleteEvent = async (id: number) => {
  await prisma.event.update({
    where: {
      id: id,
    },
    data: {
      deletedAt: new Date(),
    },
  });
};
