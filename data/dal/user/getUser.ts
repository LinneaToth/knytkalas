import "server-only";

import prisma from "@/prisma/utils/prismaUtils";

export const getUser = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id: id },
  });

  if (!user) throw new Error("No matching user found in Database");

  if (!user.onboarded)
    return {
      name: user.name,
      email: user.email,
      onboarded: user.onboarded,
      id: user.id,
    };

  const userData = {
    name: user.name,
    email: user.email,
    onboarded: user.onboarded,
    id: user.id,
    avoids: user.avoids,
  };

  return userData;
};
