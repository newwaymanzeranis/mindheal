import { Router } from "express";
import * as authController from "../controllers/authController.js";
import { authenticate } from "../middleware/auth.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.post("/register", asyncHandler(authController.register));
router.post("/login", asyncHandler(authController.login));
router.post("/forgot-password", asyncHandler(authController.forgotPassword));
router.post("/verify-otp", asyncHandler(authController.verifyOtp));
router.post("/reset-password", asyncHandler(authController.resetPassword));
router.get("/me", authenticate, asyncHandler(authController.me));

export default router;
