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

async function main() {
  if (!(await columnExists("product", "short_description"))) {
    await prisma.$executeRawUnsafe(
      `ALTER TABLE product ADD COLUMN short_description TEXT NULL AFTER description`
    );
    console.log("Added product.short_description");
  } else {
    console.log("product.short_description already exists");
  }

  await prisma.$executeRawUnsafe(`
    UPDATE product
    SET short_description = LEFT(description, 500)
    WHERE (short_description IS NULL OR TRIM(short_description) = '')
      AND description IS NOT NULL
      AND TRIM(description) != ''
  `);
  console.log("Copied existing descriptions into short_description where empty");

  console.log("Short description migration completed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
