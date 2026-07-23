import "server-only";

import prisma from "@/prisma/utils/prismaUtils";
import { Prisma } from "@/generated/prisma";

type ContributionCreateData = Prisma.ContributionCreateInput;

export const createContribution = async (
  contributionData: ContributionCreateData,
) => {
  return await prisma.contribution.create({
    data: contributionData,
  });
};
