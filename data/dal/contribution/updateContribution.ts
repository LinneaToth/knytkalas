"server-only";

import prisma from "@/prisma/utils/prismaUtils";
import { Prisma } from "@/generated/prisma";

type ContributionUpdateData = Prisma.ContributionUpdateInput;

export const updateContribution = async (
  id: number,
  contributionData: ContributionUpdateData,
) => {
  return await prisma.contribution.update({
    where: { id: id },
    data: contributionData,
  });
};
