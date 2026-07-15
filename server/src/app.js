import cors from "cors";
import express from "express";

import { errorHandler } from "./middleware/errorHandler.js";
import authRoutes from "./routes/authRoutes.js";
import blogCategoryRoutes from "./routes/blogCategoryRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import homeSlideRoutes from "./routes/homeSlideRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import testimonialRoutes from "./routes/testimonialRoutes.js";
import teamMemberRoutes from "./routes/teamMemberRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";

const app = express();

function corsOrigins() {
  const list = [
    process.env.CLIENT_URL,
    process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`,
    process.env.VERCEL_BRANCH_URL,
    "http://localhost:5175",
  ].filter(Boolean);
  return [...new Set(list)];
}

app.use(
  cors({
    origin(origin, callback) {
      const allowed = corsOrigins();
      if (!origin || allowed.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, allowed[0] || true);
      }
    },
    credentials: true,
  })
);
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));

const clientUrl = process.env.CLIENT_URL || "http://localhost:5175";

app.get("/api/health", async (req, res) => {
  const hasDbUrl = Boolean(process.env.DATABASE_URL);
  if (!hasDbUrl) {
    return res.status(503).json({
      success: false,
      message: "DATABASE_URL is not set (add it in Vercel → Environment Variables)",
      database: "missing",
    });
  }

  try {
    const { prisma } = await import("./lib/prisma.js");
    await prisma.$queryRaw`SELECT 1`;
    return res.json({
      success: true,
      message: "Mind Heal API is running",
      database: "connected",
    });
  } catch (error) {
    return res.status(503).json({
      success: false,
      message: error.message || "Database connection failed",
      database: "error",
    });
  }
});

// Admin UI lives on the React app (Vite), not on this API server
app.get(/^\/m1i2n3d4_h5e6a7l8(\/.*)?$/, (req, res) => {
  res.redirect(`${clientUrl}${req.path}`);
});

app.use("/api/auth", authRoutes);
app.use("/api/blog-categories", blogCategoryRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/products", productRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/team-members", teamMemberRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/home-slides", homeSlideRoutes);
app.use("/api/orders", orderRoutes);

app.use((req, res) => {
  if (req.path.startsWith("/m1i2n3d4_h5e6a7l8")) {
    return res.status(404).json({
      success: false,
      message: "Admin panel is on the frontend.",
    });
  }
  res.status(404).json({ success: false, message: "Route not found" });
});

app.use(errorHandler);

export default app;
