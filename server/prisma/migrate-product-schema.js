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

async function tableExists(table) {
  const rows = await prisma.$queryRawUnsafe(
    `SELECT COUNT(*) AS c FROM information_schema.TABLES 
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ?`,
    table
  );
  return Number(rows[0]?.c ?? 0) > 0;
}

async function main() {
  if (!(await columnExists("product", "mind_heal_no"))) {
    await prisma.$executeRawUnsafe(
      `ALTER TABLE product ADD COLUMN mind_heal_no VARCHAR(20) NULL AFTER id`
    );
  }

  if (!(await columnExists("product", "emotional_tag_id"))) {
    await prisma.$executeRawUnsafe(
      `ALTER TABLE product ADD COLUMN emotional_tag_id INT NULL`
    );
  }

  if (await tableExists("product_emotional_tags")) {
    await prisma.$executeRawUnsafe(`
      UPDATE product p
      INNER JOIN (
        SELECT product_id, MIN(emotional_tag_id) AS emotional_tag_id
        FROM product_emotional_tags
        GROUP BY product_id
      ) pet ON pet.product_id = p.id
      SET p.emotional_tag_id = pet.emotional_tag_id
      WHERE p.emotional_tag_id IS NULL
    `);

    await prisma.$executeRawUnsafe(`DROP TABLE product_emotional_tags`);
    console.log("Dropped product_emotional_tags");
  }

  await prisma.$executeRawUnsafe(`
    UPDATE product
    SET mind_heal_no = LPAD(sort_order + 1, 2, '0')
    WHERE mind_heal_no IS NULL OR mind_heal_no = ''
  `);

  await prisma.$executeRawUnsafe(`
    ALTER TABLE product MODIFY mind_heal_no VARCHAR(20) NOT NULL
  `);

  try {
    await prisma.$executeRawUnsafe(`
      ALTER TABLE product ADD UNIQUE INDEX product_mind_heal_no_key (mind_heal_no)
    `);
  } catch {
    // index may already exist
  }

  console.log("Product schema migration completed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
