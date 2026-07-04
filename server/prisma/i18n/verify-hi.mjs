import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const filled = (v) => v != null && String(v).trim() !== "";

async function main() {
  const products = await prisma.product.findMany({
    select: { id: true, nameHi: true, descriptionHi: true, shortDescriptionHi: true, emotionalTagsHi: true },
  });
  const posts = await prisma.post.findMany({
    select: { id: true, titleHi: true, excerptHi: true, contentHi: true },
  });
  const testimonials = await prisma.testimonial.findMany({ select: { id: true, contentHi: true } });
  const slides = await prisma.homeSlide.findMany({ select: { id: true, title: true, titleHi: true, subtitleHi: true } });

  const prodMissing = products.filter(
    (p) => !filled(p.nameHi) || !filled(p.descriptionHi) || !filled(p.shortDescriptionHi) || !filled(p.emotionalTagsHi)
  );
  const postMissing = posts.filter((p) => !filled(p.titleHi) || !filled(p.excerptHi) || !filled(p.contentHi));
  const testMissing = testimonials.filter((t) => !filled(t.contentHi));
  // Slide id 4 has empty English title/subtitle, so skip it in the "missing" check.
  const slideMissing = slides.filter((s) => filled(s.title) && (!filled(s.titleHi) || !filled(s.subtitleHi)));

  console.log(`Products : ${products.length - prodMissing.length}/${products.length} fully translated`);
  console.log(`Posts    : ${posts.length - postMissing.length}/${posts.length} fully translated`);
  console.log(`Testimon.: ${testimonials.length - testMissing.length}/${testimonials.length} translated`);
  console.log(`Slides   : ${slides.length - slideMissing.length}/${slides.length} (id 4 has blank English)`);

  if (prodMissing.length) console.log("  Product ids missing Hindi:", prodMissing.map((p) => p.id));
  if (postMissing.length) console.log("  Post ids missing Hindi:", postMissing.map((p) => p.id));
  if (testMissing.length) console.log("  Testimonial ids missing Hindi:", testMissing.map((t) => t.id));
  if (slideMissing.length) console.log("  Slide ids missing Hindi:", slideMissing.map((s) => s.id));

  const ok = !prodMissing.length && !postMissing.length && !testMissing.length && !slideMissing.length;
  console.log(ok ? "\n✅ All target Hindi columns populated." : "\n⚠️  Some Hindi columns still empty (see above).");
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
