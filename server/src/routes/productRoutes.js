import { Router } from "express";
import * as ctrl from "../controllers/productController.js";
import { authenticate, requireAdmin } from "../middleware/auth.js";
import { optionalAuth } from "../middleware/optionalAuth.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.get("/", optionalAuth, asyncHandler(ctrl.list));
router.get("/slug/:slug", asyncHandler(ctrl.getBySlug));
router.get("/:id", asyncHandler(ctrl.getById));
router.post("/", authenticate, requireAdmin, asyncHandler(ctrl.create));
router.put("/:id", authenticate, requireAdmin, asyncHandler(ctrl.update));
router.delete("/:id", authenticate, requireAdmin, asyncHandler(ctrl.remove));

export default router;
