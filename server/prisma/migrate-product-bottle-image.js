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
  if (!(await columnExists("product", "product_bottle_image"))) {
    await prisma.$executeRawUnsafe(
      `ALTER TABLE product ADD COLUMN product_bottle_image VARCHAR(500) NULL AFTER image`
    );
    console.log("Added product.product_bottle_image");
  } else {
    console.log("product.product_bottle_image already exists");
  }

  console.log("Product bottle image migration completed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
