import { PrismaClient } from "@prisma/client";
import { PrismaNeonHttp } from "@prisma/adapter-neon";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

let prismaClient: PrismaClient;

const connectionString = process.env.DATABASE_URL || process.env.DIRECT_URL || "";

try {
  if (connectionString) {
    const adapter = new PrismaNeonHttp(connectionString, {});
    prismaClient = new PrismaClient({ adapter });
  } else {
    prismaClient = new PrismaClient();
  }
} catch {
  prismaClient = new PrismaClient();
}

export const prisma = global.prisma ?? prismaClient;

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}
