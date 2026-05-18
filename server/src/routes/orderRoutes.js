import { Router } from "express";
import * as orderController from "../controllers/orderController.js";
import { authenticate, requireAdmin } from "../middleware/auth.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.use(authenticate);

router.post("/", asyncHandler(orderController.create));
router.get("/admin/stats", requireAdmin, asyncHandler(orderController.dashboardStats));
router.get("/admin/all", requireAdmin, asyncHandler(orderController.listAll));
router.get("/", asyncHandler(orderController.list));
router.get("/:id", asyncHandler(orderController.getOne));
router.patch("/:id/status", requireAdmin, asyncHandler(orderController.updateStatus));

export default router;
