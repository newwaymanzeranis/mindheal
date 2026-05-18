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
  if (!(await columnExists("product", "mrp"))) {
    await prisma.$executeRawUnsafe(
      `ALTER TABLE product ADD COLUMN mrp DECIMAL(10,2) NOT NULL DEFAULT 400 AFTER description`
    );
    console.log("Added mrp column");
  }

  const hasDiscounted = await columnExists("product", "discounted_price");
  const hasPrice = await columnExists("product", "price");

  if (!hasDiscounted && hasPrice) {
    await prisma.$executeRawUnsafe(
      `ALTER TABLE product CHANGE COLUMN price discounted_price DECIMAL(10,2) NOT NULL DEFAULT 250`
    );
    console.log("Renamed price → discounted_price");
  } else if (!hasDiscounted) {
    await prisma.$executeRawUnsafe(
      `ALTER TABLE product ADD COLUMN discounted_price DECIMAL(10,2) NOT NULL DEFAULT 250`
    );
    console.log("Added discounted_price column");
  }

  await prisma.$executeRawUnsafe(`
    UPDATE product SET mrp = 400, discounted_price = 250
    WHERE mrp IS NULL OR mrp = 0 OR discounted_price IS NULL OR discounted_price = 0
  `);

  console.log("Product pricing migration completed (MRP 400, discounted 250)");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
