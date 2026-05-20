/**
 * Vercel serverless entry — serves Express API at /api/*
 * Requires DATABASE_URL (and JWT_SECRET, CLIENT_URL) in Vercel env.
 */
import app from "../server/src/app.js";

export default app;
