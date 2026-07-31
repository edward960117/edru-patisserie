import "dotenv/config";
import { UserRole } from "@prisma/client";
import argon2 from "argon2";
import { prisma } from "../lib/prisma";

async function ensureSchema() {
  await prisma.$executeRawUnsafe(`
    DO $$ BEGIN
      CREATE TYPE "UserRole" AS ENUM ('staff', 'customer');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
  `);

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "Category" (
      "id" SERIAL PRIMARY KEY,
      "slug" TEXT NOT NULL UNIQUE,
      "name" TEXT NOT NULL,
      "name_cn" TEXT NOT NULL,
      "emoji" TEXT NOT NULL,
      "description" TEXT NOT NULL
    );
  `);

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "Cake" (
      "id" SERIAL PRIMARY KEY,
      "category_id" INTEGER NOT NULL,
      "name" TEXT NOT NULL,
      "name_cn" TEXT NOT NULL DEFAULT '',
      "slug" TEXT NOT NULL UNIQUE,
      "description" TEXT NOT NULL,
      "description_cn" TEXT NOT NULL DEFAULT '',
      "ingredients" TEXT NOT NULL,
      "image_url" TEXT NOT NULL,
      "lead_time_days" INTEGER NOT NULL,
      "featured" BOOLEAN NOT NULL DEFAULT false,
      "active" BOOLEAN NOT NULL DEFAULT true,
      "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      CONSTRAINT "Cake_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE
    );
  `);

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "CakeSize" (
      "id" SERIAL PRIMARY KEY,
      "cake_id" INTEGER NOT NULL,
      "size" TEXT NOT NULL,
      "price" DOUBLE PRECISION NOT NULL,
      "available" BOOLEAN NOT NULL DEFAULT true,
      CONSTRAINT "CakeSize_cake_id_fkey" FOREIGN KEY ("cake_id") REFERENCES "Cake"("id") ON DELETE CASCADE ON UPDATE CASCADE
    );
  `);

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "User" (
      "id" SERIAL PRIMARY KEY,
      "username" TEXT NOT NULL UNIQUE,
      "password_hash" TEXT NOT NULL,
      "role" "UserRole" NOT NULL,
      "active" BOOLEAN NOT NULL DEFAULT true,
      "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
}

async function main() {
  await ensureSchema();

  const categories = [
    {
      slug: "todays-recommendation",
      name: "Today's Recommendation",
      name_cn: "今日推荐",
      emoji: "✨",
      description: "Chef's featured cakes for the day.",
    },
    {
      slug: "for-him",
      name: "For Him",
      name_cn: "男生款",
      emoji: "🕴️",
      description: "Bold flavors and elegant finishes.",
    },
    {
      slug: "for-her",
      name: "For Her",
      name_cn: "女生款",
      emoji: "🌸",
      description: "Light, floral and refined profiles.",
    },
    {
      slug: "custom-cakes",
      name: "Custom Cakes",
      name_cn: "蛋糕定制",
      emoji: "🎂",
      description: "Tailored cakes for your occasion.",
    },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: category,
      create: category,
    });
  }

  const categoryMap = await prisma.category.findMany();
  const cat = Object.fromEntries(categoryMap.map((item) => [item.slug, item.id]));

  const cakes = [
    {
      category_id: cat["todays-recommendation"],
      name: "Lemon Cheesecake Flower",
      name_cn: "柠檬芝士花语",
      slug: "lemon-cheesecake-flower",
      description: "Tangy lemon cheesecake mousse with floral piping and citrus notes.",
      description_cn: "清爽柠檬芝士慕斯，搭配花朵裱花与柑橘香气。",
      ingredients: "Cream cheese, lemon zest, mascarpone, flour, eggs, butter, vanilla",
      image_url: "/cakes/lemon-cheesecake-flower.jpg",
      lead_time_days: 3,
      featured: true,
      active: true,
      sizes: [
        { size: '6"', price: 68, available: true },
        { size: '8"', price: 92, available: true },
        { size: '10"', price: 128, available: true },
      ],
    },
    {
      category_id: cat["todays-recommendation"],
      name: "Pistachio Berry Silk",
      name_cn: "开心果莓果丝绒",
      slug: "pistachio-berry-silk",
      description: "Pistachio sponge layered with berry cream and crunchy praline.",
      description_cn: "开心果蛋糕胚夹层莓果奶油与香脆果仁糖。",
      ingredients: "Pistachio paste, raspberry puree, cream, flour, eggs, sugar",
      image_url: "/cakes/pistachio-berry-silk.jpg",
      lead_time_days: 3,
      featured: false,
      active: true,
      sizes: [
        { size: '6"', price: 66, available: true },
        { size: '8"', price: 90, available: true },
        { size: '10"', price: 124, available: true },
      ],
    },
    {
      category_id: cat["for-him"],
      name: "Dark Opera Signature",
      name_cn: "黑金欧培拉",
      slug: "dark-opera-signature",
      description: "Layered almond sponge, espresso buttercream and dark chocolate glaze.",
      description_cn: "杏仁蛋糕层叠浓缩咖啡奶油霜与黑巧克力淋面。",
      ingredients: "Almond flour, coffee extract, dark chocolate, cream, eggs, butter",
      image_url: "/cakes/dark-opera-signature.jpg",
      lead_time_days: 4,
      featured: false,
      active: true,
      sizes: [
        { size: '6"', price: 72, available: true },
        { size: '8"', price: 99, available: true },
        { size: '10"', price: 136, available: false },
      ],
    },
    {
      category_id: cat["for-him"],
      name: "Hazelnut Noir Crunch",
      name_cn: "榛果黑巧脆层",
      slug: "hazelnut-noir-crunch",
      description: "Intense cocoa mousse with roasted hazelnut crunch and sea salt caramel.",
      description_cn: "浓郁可可慕斯融合烘烤榛果脆层与海盐焦糖。",
      ingredients: "Dark chocolate, hazelnut praline, butter, eggs, sea salt, caramel",
      image_url: "/cakes/hazelnut-noir-crunch.jpg",
      lead_time_days: 4,
      featured: true,
      active: true,
      sizes: [
        { size: '6"', price: 74, available: true },
        { size: '8"', price: 102, available: true },
        { size: '10"', price: 140, available: true },
      ],
    },
    {
      category_id: cat["for-her"],
      name: "Apricot Rose Velvet",
      name_cn: "杏桃玫瑰丝绒",
      slug: "apricot-rose-velvet",
      description: "Apricot compote and rose cream layered in a soft sponge finish.",
      description_cn: "柔软蛋糕中夹入杏桃果酱与玫瑰奶油层次。",
      ingredients: "Apricot puree, rose water, mascarpone, flour, eggs, sugar",
      image_url: "/cakes/apricot-rose-velvet.jpg",
      lead_time_days: 3,
      featured: false,
      active: true,
      sizes: [
        { size: '6"', price: 70, available: true },
        { size: '8"', price: 96, available: true },
        { size: '10"', price: 132, available: true },
      ],
    },
    {
      category_id: cat["for-her"],
      name: "Lychee Jasmine Pearl",
      name_cn: "荔枝茉莉珍珠",
      slug: "lychee-jasmine-pearl",
      description: "Floral jasmine mousse with lychee center and vanilla chiffon.",
      description_cn: "花香茉莉慕斯包裹荔枝夹心与香草戚风。",
      ingredients: "Jasmine tea, lychee, vanilla, cream, flour, eggs, sugar",
      image_url: "/cakes/lychee-jasmine-pearl.jpg",
      lead_time_days: 3,
      featured: true,
      active: true,
      sizes: [
        { size: '6"', price: 73, available: true },
        { size: '8"', price: 98, available: true },
        { size: '10"', price: 134, available: true },
      ],
    },
    {
      category_id: cat["custom-cakes"],
      name: "Celebration Number Cake",
      name_cn: "庆典数字蛋糕",
      slug: "celebration-number-cake",
      description: "Custom number-shaped cake with seasonal berries and cream flowers.",
      description_cn: "可定制数字造型，搭配当季莓果与奶油花饰。",
      ingredients: "Vanilla sponge, whipped cream, berries, buttercream, sugar flowers",
      image_url: "/cakes/celebration-number-cake.jpg",
      lead_time_days: 5,
      featured: true,
      active: true,
      sizes: [
        { size: '6"', price: 98, available: true },
        { size: '8"', price: 138, available: true },
        { size: '10"', price: 188, available: true },
      ],
    },
    {
      category_id: cat["custom-cakes"],
      name: "Golden Anniversary Crown",
      name_cn: "金禧纪念皇冠",
      slug: "golden-anniversary-crown",
      description: "Custom celebration cake with gold accents, roses and layered cream finish.",
      description_cn: "定制庆典蛋糕，金色点缀、玫瑰装饰与层次奶油收边。",
      ingredients: "Vanilla sponge, Swiss meringue buttercream, berry compote, edible gold",
      image_url: "/cakes/golden-anniversary-crown.jpg",
      lead_time_days: 6,
      featured: false,
      active: true,
      sizes: [
        { size: '6"', price: 108, available: true },
        { size: '8"', price: 148, available: true },
        { size: '10"', price: 198, available: true },
      ],
    },
  ];

  for (const cake of cakes) {
    const { sizes, ...cakeData } = cake;
    const existing = await prisma.cake.upsert({
      where: { slug: cake.slug },
      update: cakeData,
      create: cakeData,
    });

    await prisma.cakeSize.deleteMany({ where: { cake_id: existing.id } });
    await prisma.cakeSize.createMany({
      data: sizes.map((size) => ({ ...size, cake_id: existing.id })),
    });
  }

  const password_hash = await argon2.hash("990207");
  await prisma.user.upsert({
    where: { username: "0001" },
    update: { password_hash, role: UserRole.staff, active: true },
    create: {
      username: "0001",
      password_hash,
      role: UserRole.staff,
      active: true,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
