import "server-only";

import prisma from "@/prisma/utils/prismaUtils";

export const getContribution = async (id: number) => {
  const contribution = await prisma.contribution.findUnique({
    where: { id: id },
  });

  if (!contribution) throw new Error("No matching contribution found");

  const contributionData = {
    name: contribution.name,
    id: contribution.id,
    description: contribution.description,
    inviteId: contribution.inviteId,
    servings: contribution.servings,
    category: contribution.category,
    contains: contribution.contains,
  };

  return contributionData;
};
