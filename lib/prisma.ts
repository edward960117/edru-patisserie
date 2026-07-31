import { PrismaClient } from "@prisma/client";
import { PrismaNeonHttp } from "@prisma/adapter-neon";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

let prismaClient: PrismaClient;

const connectionString = process.env.DATABASE_URL || process.env.DIRECT_URL;
const fallbackConnectionString = "postgresql://user:password@localhost:5432/db";

// Temporary local workaround: some Windows environments cannot validate Neon TLS chain.
// Disable TLS verification only outside production unless explicitly opted out.
if (process.env.NODE_ENV !== "production" && process.env.TEMP_ALLOW_INSECURE_TLS_FOR_DB !== "false") {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

// NOTE: the WebSocket-based PrismaNeon adapter (`ws` package) breaks under Next.js's
// webpack-bundled server runtime ("bufferUtil.mask is not a function") - stick with the
// HTTP adapter here, which also works fine standalone (seed/mock scripts) and is Neon's
// recommended choice for serverless/edge runtimes anyway.
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
