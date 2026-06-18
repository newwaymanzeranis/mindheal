import { Router } from "express";
import * as ctrl from "../controllers/appointmentController.js";
import { authenticate } from "../middleware/auth.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.use(authenticate);

router.post("/", asyncHandler(ctrl.create));
router.get("/mine", asyncHandler(ctrl.listMine));
router.get("/staff/all", asyncHandler(ctrl.listStaff));
router.get("/:id", asyncHandler(ctrl.getOne));
router.patch("/:id/status", asyncHandler(ctrl.updateStatus));
router.patch("/:id/schedule", asyncHandler(ctrl.schedule));

export default router;
