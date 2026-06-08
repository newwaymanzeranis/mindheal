import "dotenv/config";

import app from "./app.js";
import { verifySmtpConnection } from "./lib/mailer.js";
import { prisma } from "./lib/prisma.js";

const PORT = process.env.PORT || 4000;

async function start() {
  try {
    await prisma.$connect();
    console.log("Database connected");
    await verifySmtpConnection();

    app.listen(PORT, () => {
      console.log(`Mind Heal API running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
}

start();

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});
