import cors from "cors";
import express from "express";

import { errorHandler } from "./middleware/errorHandler.js";
import authRoutes from "./routes/authRoutes.js";
import blogCategoryRoutes from "./routes/blogCategoryRoutes.js";
import emotionalTagRoutes from "./routes/emotionalTagRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import homeSlideRoutes from "./routes/homeSlideRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import testimonialRoutes from "./routes/testimonialRoutes.js";

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

app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Mind Heal API is running" });
});

// Admin UI lives on the React app (Vite), not on this API server
app.get(/^\/admin(\/.*)?$/, (req, res) => {
  res.redirect(`${clientUrl}${req.path}`);
});

app.use("/api/auth", authRoutes);
app.use("/api/blog-categories", blogCategoryRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/emotional-tags", emotionalTagRoutes);
app.use("/api/products", productRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/home-slides", homeSlideRoutes);
app.use("/api/orders", orderRoutes);

app.use((req, res) => {
  if (req.path.startsWith("/admin")) {
    return res.status(404).json({
      success: false,
      message: "Admin panel is on the frontend. Open " + clientUrl + "/admin/login",
    });
  }
  res.status(404).json({ success: false, message: "Route not found" });
});

app.use(errorHandler);

export default app;
