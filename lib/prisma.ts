import { PrismaClient } from "@prisma/client";

declare global {
  var prismaInstance: PrismaClient | undefined
}
export const prismaInstance = globalThis.prismaInstance || new PrismaClient();

if (process.env.NODE_ENV === "production") { globalThis.prismaInstance = prismaInstance }

