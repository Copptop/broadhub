import { PrismaClient } from "@prisma/client";


// Global object to store the Prisma client based on the environment in which the application is running
declare global {
  var prismaInstance: PrismaClient | undefined
}
export const prismaInstance = globalThis.prismaInstance || new PrismaClient();

if (process.env.NODE_ENV === "production") { globalThis.prismaInstance = prismaInstance }

