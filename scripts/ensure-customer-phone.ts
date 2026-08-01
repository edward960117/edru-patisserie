import { prisma } from "../lib/prisma";

async function main() {
  await prisma.$executeRawUnsafe(
    'ALTER TABLE "Customer" ADD COLUMN IF NOT EXISTS "phone" TEXT NOT NULL DEFAULT \'\''
  );
  console.log("Customer.phone ensured");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
