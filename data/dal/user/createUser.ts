"server-only";

import prisma from "@/prisma/utils/prismaUtils";
import { getCurrentUser } from "./getCurrentUser";

import type { NewUser } from "@/types/entityTypes";

export const createUser = async (user: NewUser) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) throw new Error("Not authorized");

  //Check if user exists, log them in instead

  const newUser = await prisma.user.create({
    data: {
      email: user.email,
      name: user.name,
      avoids: user.avoids,
    },
  });

  return { name: newUser.name, id: newUser.id, avoids: newUser.avoids };
};
