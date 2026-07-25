import { PrismaClient } from "@prisma/client";
import { PrismaNeonHttp } from "@prisma/adapter-neon";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

let prismaClient: PrismaClient;

if (process.env.NODE_ENV !== "production" && !process.env.NODE_TLS_REJECT_UNAUTHORIZED) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

const connectionString = process.env.DATABASE_URL || process.env.DIRECT_URL || "";
const adapter = new PrismaNeonHttp(connectionString, {});
prismaClient = new PrismaClient({ adapter });

export const prisma = global.prisma ?? prismaClient;

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}
