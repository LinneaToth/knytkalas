"server-only";

import prisma from "@/prisma/utils/prismaUtils";
import { Prisma } from "@/generated/prisma";

type InviteCreateData = Prisma.InviteCreateInput;

export const createInvite = async (inviteData: InviteCreateData) => {
  return await prisma.invite.create({
    data: inviteData,
  });
};
