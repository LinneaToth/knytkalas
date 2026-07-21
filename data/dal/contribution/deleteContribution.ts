"server-only";
import prisma from "@/prisma/utils/prismaUtils";

export const deleteContribution = async (id: number) => {
  await prisma.contribution.delete({
    where: {
      id: id,
    },
  });
};
