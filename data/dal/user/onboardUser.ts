import "server-only";

import prisma from "@/prisma/utils/prismaUtils";
import { getUser } from "./getUser";
import { getSessionUserId } from "@/features/auth/services/getSessionUserId";

import type { NewUser } from "@/types/entityTypes";

export const onboardUser = async (user: NewUser) => {
  const id = await getSessionUserId();
  const currentUser = await getUser(id);

  if (!currentUser) throw new Error("Session exists but user not found"); //Thrown error is valid, because there should be an active session if this function is ever fired

  if (currentUser.onboarded) {
    return { error: "User is already registered with Knytkalas" };
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
