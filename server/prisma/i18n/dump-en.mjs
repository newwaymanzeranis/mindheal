import "dotenv/config";
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const dir = join(dirname(fileURLToPath(import.meta.url)), "en");

async function main() {
  const products = await prisma.product.findMany({
    orderBy: { id: "asc" },
    select: {
      id: true,
      mindHealNo: true,
      name: true,
      description: true,
      shortDescription: true,
      emotionalTags: true,
    },
  });
  const posts = await prisma.post.findMany({
    orderBy: { id: "asc" },
    select: { id: true, title: true, excerpt: true, content: true },
  });
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { id: "asc" },
    select: { id: true, name: true, content: true },
  });
  const slides = await prisma.homeSlide.findMany({
    orderBy: { id: "asc" },
    select: { id: true, title: true, subtitle: true },
  });

  writeFileSync(join(dir, "products.json"), JSON.stringify(products, null, 2));
  writeFileSync(join(dir, "posts.json"), JSON.stringify(posts, null, 2));
  writeFileSync(
    join(dir, "testimonials.json"),
    JSON.stringify(testimonials, null, 2)
  );
  writeFileSync(join(dir, "slides.json"), JSON.stringify(slides, null, 2));

  console.log(
    `Dumped: products=${products.length} posts=${posts.length} testimonials=${testimonials.length} slides=${slides.length}`
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
