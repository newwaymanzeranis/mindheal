import { Router } from "express";
import * as ctrl from "../controllers/testimonialController.js";
import { authenticate, requireAdmin } from "../middleware/auth.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.get("/", asyncHandler(ctrl.list));
router.get("/:id", asyncHandler(ctrl.getById));
router.post("/", authenticate, requireAdmin, asyncHandler(ctrl.create));
router.put("/:id", authenticate, requireAdmin, asyncHandler(ctrl.update));
router.delete("/:id", authenticate, requireAdmin, asyncHandler(ctrl.remove));

export default router;
