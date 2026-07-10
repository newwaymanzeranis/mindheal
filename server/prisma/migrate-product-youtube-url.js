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
  if (!(await columnExists("product", "youtube_url"))) {
    await prisma.$executeRawUnsafe(
      `ALTER TABLE product ADD COLUMN youtube_url VARCHAR(500) NULL AFTER product_bottle_image`
    );
    console.log("Added product.youtube_url");
  } else {
    console.log("product.youtube_url already exists");
  }

  console.log("Product YouTube URL migration completed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
