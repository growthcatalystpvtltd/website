import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash(
    process.env.ADMIN_PASSWORD ?? "admin123",
    12
  );

  const admin = await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL ?? "admin@growthcatalyst.com.np" },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL ?? "admin@growthcatalyst.com.np",
      password,
      name: "Admin",
    },
  });

  const categories = await Promise.all(
    ["Technology", "Process", "Business Growth"].map((name) =>
      prisma.blogCategory.upsert({
        where: { slug: name.toLowerCase().replace(/\s+/g, "-") },
        update: {},
        create: {
          name,
          slug: name.toLowerCase().replace(/\s+/g, "-"),
        },
      })
    )
  );

  await prisma.siteSetting.upsert({
    where: { key: "hero_headline" },
    update: {},
    create: {
      key: "hero_headline",
      value: "We catalyze growth through disciplined process.",
    },
  });

  await prisma.siteSetting.upsert({
    where: { key: "hero_subheadline" },
    update: {},
    create: {
      key: "hero_subheadline",
      value:
        "Growth Catalyst delivers software & IT consulting — from eCommerce and FinTech to ERP and AI — with a rigorous, process-first methodology that accelerates your business.",
    },
  });

  const clients = [
    "FinCorp Nepal",
    "RetailPro",
    "TechVentures",
    "AgriLink",
    "HealthPlus",
    "EduStream",
  ];

  for (let i = 0; i < clients.length; i++) {
    await prisma.client.upsert({
      where: { id: `seed-client-${i}` },
      update: {},
      create: {
        id: `seed-client-${i}`,
        name: clients[i],
        order: i,
        active: true,
      },
    });
  }

  await prisma.blogPost.upsert({
    where: { slug: "why-process-matters" },
    update: {},
    create: {
      title: "Why Process Matters in Software Development",
      slug: "why-process-matters",
      excerpt:
        "Discover how a process-oriented approach eliminates risk and accelerates delivery.",
      content:
        "At Growth Catalyst, we believe that great software is the result of disciplined process, not luck. Our six-step methodology ensures every project delivers measurable business value.\n\nFrom discovery to post-launch optimization, we partner with enterprises and SMEs across Nepal to build solutions that scale.",
      published: true,
      categoryId: categories[1].id,
      authorId: admin.id,
    },
  });

  console.log("Seed completed.");
  console.log(`Admin: ${admin.email} / ${process.env.ADMIN_PASSWORD ?? "admin123"}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
