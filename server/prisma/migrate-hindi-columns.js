import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function columnExists(table, column) {
  const rows = await prisma.$queryRawUnsafe(
    `SELECT COUNT(*) AS c FROM information_schema.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND COLUMN_NAME = ?`,
    table,
    column
  );
  return Number(rows[0]?.c ?? 0) > 0;
}

async function addColumn(table, column, definition, after) {
  if (await columnExists(table, column)) {
    console.log(`- ${table}.${column} already exists`);
    return;
  }
  const afterClause = after ? ` AFTER \`${after}\`` : "";
  await prisma.$executeRawUnsafe(
    `ALTER TABLE \`${table}\` ADD COLUMN \`${column}\` ${definition}${afterClause}`
  );
  console.log(`+ Added ${table}.${column}`);
}

async function main() {
  // Products
  await addColumn("product", "name_hi", "VARCHAR(500) NULL", "name");
  await addColumn("product", "description_hi", "LONGTEXT NULL", "description");
  await addColumn(
    "product",
    "short_description_hi",
    "TEXT NULL",
    "short_description"
  );
  await addColumn(
    "product",
    "emotional_tags_hi",
    "TEXT NULL",
    "emotional_tags"
  );

  // Posts
  await addColumn("posts", "title_hi", "VARCHAR(500) NULL", "title");
  await addColumn("posts", "excerpt_hi", "TEXT NULL", "excerpt");
  await addColumn("posts", "content_hi", "LONGTEXT NULL", "content");

  // Testimonials
  await addColumn("testimonials", "content_hi", "TEXT NULL", "content");

  // Home slides
  await addColumn("home_slides", "title_hi", "VARCHAR(500) NULL", "title");
  await addColumn("home_slides", "subtitle_hi", "TEXT NULL", "subtitle");

  // Team members
  await addColumn("team_members", "degree_hi", "VARCHAR(255) NULL", "degree");
  await addColumn("team_members", "bio_hi", "TEXT NULL", "bio");
  await addColumn("team_members", "expertise_hi", "LONGTEXT NULL", "expertise");
  await addColumn("team_members", "portfolio_hi", "LONGTEXT NULL", "portfolio");

  console.log("\nHindi columns migration completed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
