"server-only";
import prisma from "@/prisma/utils/prismaUtils";
import { softDeleteEvent } from "../event/deleteEvent";
import { getHostedEventsByUser } from "../event/getHostedEventsByUser";

//Hard delete would mess up the database in terms of many hardwired relations. For GDPR and integrity reasons, personal data is scrambled. Sessions and accounts, handled by Prisma and used to identify user with auth service, are deleted.

export const softDeleteUser = async (userId: string) => {
  const usersEvents = await getHostedEventsByUser(userId);

  if (usersEvents.length > 0) {
    await Promise.all(
      usersEvents.map((e: { id: number }) => {
        return softDeleteEvent(e.id);
      }),
    );
  }

  await prisma.session.deleteMany({
    where: { userId: userId },
  });

  await prisma.account.deleteMany({
    where: { userId: userId },
  });

  return await prisma.user.update({
    where: { id: userId },
    data: {
      deletedAt: new Date(),
      email: `${userId}@deleted.user`,
      name: "Deleted User",
      image: null,
    },
  });
};
