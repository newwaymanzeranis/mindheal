import "dotenv/config";
import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const hiDir = join(dirname(fileURLToPath(import.meta.url)), "hi");

/**
 * Each target maps one or more hi/<prefix>*.json files to a Prisma model.
 * Every JSON is an array of objects: { id, <field>Hi, ... }. Only the *Hi
 * fields present in an object are written, so translations can be applied
 * incrementally (in batches) and re-run safely.
 */
const TARGETS = [
  {
    prefix: "slides",
    model: "homeSlide",
    fields: ["titleHi", "subtitleHi"],
  },
  { prefix: "testimonials", model: "testimonial", fields: ["contentHi"] },
  {
    prefix: "products",
    model: "product",
    fields: ["nameHi", "descriptionHi", "shortDescriptionHi", "emotionalTagsHi"],
  },
  {
    prefix: "posts",
    model: "post",
    fields: ["titleHi", "excerptHi", "contentHi"],
  },
];

function filesFor(prefix) {
  return readdirSync(hiDir)
    .filter((f) => f.endsWith(".json") && f.startsWith(prefix))
    .sort();
}

async function applyTarget({ prefix, model, fields }) {
  const files = filesFor(prefix);
  if (files.length === 0) {
    console.log(`- ${prefix}*: no files, skipping`);
    return { updated: 0 };
  }
  let updated = 0;
  let skipped = 0;
  for (const file of files) {
    const rows = JSON.parse(readFileSync(join(hiDir, file), "utf8"));
    for (const row of rows) {
      if (row?.id == null) continue;
      const data = {};
      for (const f of fields) {
        if (row[f] != null && String(row[f]).trim() !== "") data[f] = row[f];
      }
      if (Object.keys(data).length === 0) {
        skipped += 1;
        continue;
      }
      await prisma[model].update({ where: { id: row.id }, data });
      updated += 1;
    }
  }
  console.log(
    `+ ${prefix}* (${files.length} file/s): updated=${updated} skipped(empty)=${skipped}`
  );
  return { updated };
}

async function main() {
  const only = process.argv[2]; // optional: slides|testimonials|products|posts
  let total = 0;
  for (const target of TARGETS) {
    if (only && target.prefix !== only) continue;
    const { updated } = await applyTarget(target);
    total += updated;
  }
  console.log(`\nDone. Total rows updated: ${total}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
