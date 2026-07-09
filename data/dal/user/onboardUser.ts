"server-only";

import prisma from "@/prisma/utils/prismaUtils";
import { getUser } from "./getUser";
import { getSessionUserId } from "@/features/auth/services/getSessionUserId";

import type { NewUser } from "@/types/entityTypes";

export const onboardUser = async (user: NewUser) => {
  const id = await getSessionUserId();
  const currentUser = await getUser(id);

  if (currentUser.onboarded) {
    throw new Error("User is already registered with Knytkalas");
  }

  await prisma.user.update({
    where: { id },
    data: {
      name: user.name || currentUser.name,
      avoids: user.avoids,
      onboarded: true,
    },
  });
};
