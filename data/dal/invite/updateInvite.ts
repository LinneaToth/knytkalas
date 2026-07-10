"server-only";

import prisma from "@/prisma/utils/prismaUtils";
import { Prisma } from "@/generated/prisma";

type InviteUpdateData = Prisma.InviteUpdateInput;

export const updateInvite = async (
  id: number,
  inviteData: InviteUpdateData,
) => {
  return await prisma.invite.update({
    where: { id: id },
    data: { ...inviteData, updatedAt: new Date() },
  });
};
