import { PrismaClient } from "@prisma/client";
import { PrismaNeonHttp } from "@prisma/adapter-neon";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

let prismaClient: PrismaClient;

const connectionString = process.env.DATABASE_URL || process.env.DIRECT_URL;
const fallbackConnectionString = "postgresql://user:password@localhost:5432/db";

try {
  const adapter = new PrismaNeonHttp(connectionString || fallbackConnectionString, {});
  prismaClient = new PrismaClient({ adapter });
} catch {
  const adapter = new PrismaNeonHttp(fallbackConnectionString, {});
  prismaClient = new PrismaClient({ adapter });
}

export const prisma = global.prisma ?? prismaClient;

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}
