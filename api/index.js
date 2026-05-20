/**
 * Vercel serverless entry — Express API at /api/*
 * Set DATABASE_URL, JWT_SECRET, CLIENT_URL in Vercel env.
 */
import app from "../server/src/app.js";

export default app;
