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

async function foreignKeyExists(table, column) {
  const rows = await prisma.$queryRawUnsafe(
    `SELECT CONSTRAINT_NAME AS name
     FROM information_schema.KEY_COLUMN_USAGE
     WHERE TABLE_SCHEMA = DATABASE()
       AND TABLE_NAME = ?
       AND COLUMN_NAME = ?
       AND REFERENCED_TABLE_NAME IS NOT NULL
     LIMIT 1`,
    table,
    column
  );
  return rows[0]?.name ?? null;
}

async function main() {
  if (!(await columnExists("product", "emotional_tags"))) {
    await prisma.$executeRawUnsafe(
      `ALTER TABLE product ADD COLUMN emotional_tags TEXT NULL`
    );
    console.log("Added product.emotional_tags");
  }

  if (await columnExists("product", "emotional_tag_id")) {
    if (await tableExists("emotional_tags")) {
      await prisma.$executeRawUnsafe(`
        UPDATE product p
        INNER JOIN emotional_tags et ON et.id = p.emotional_tag_id
        SET p.emotional_tags = et.slug
        WHERE p.emotional_tag_id IS NOT NULL
          AND (p.emotional_tags IS NULL OR TRIM(p.emotional_tags) = '')
      `);
      console.log("Copied emotional_tags slugs from emotional_tags table");
    }

    const fkName = await foreignKeyExists("product", "emotional_tag_id");
    if (fkName) {
      await prisma.$executeRawUnsafe(
        `ALTER TABLE product DROP FOREIGN KEY \`${fkName}\``
      );
      console.log(`Dropped foreign key ${fkName}`);
    }

    try {
      await prisma.$executeRawUnsafe(
        `ALTER TABLE product DROP INDEX product_emotional_tag_id_idx`
      );
    } catch {
      try {
        await prisma.$executeRawUnsafe(
          `ALTER TABLE product DROP INDEX emotional_tag_id`
        );
      } catch {
        // index may not exist or have another name
      }
    }

    await prisma.$executeRawUnsafe(
      `ALTER TABLE product DROP COLUMN emotional_tag_id`
    );
    console.log("Dropped product.emotional_tag_id");
  }

  if (await tableExists("emotional_tags")) {
    await prisma.$executeRawUnsafe(`DROP TABLE emotional_tags`);
    console.log("Dropped emotional_tags table");
  }

  console.log("Emotional tags string migration completed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
