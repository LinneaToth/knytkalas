import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// Use the generated Prisma client package
import { PrismaClient } from "../app/generated/prisma";
const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
});
