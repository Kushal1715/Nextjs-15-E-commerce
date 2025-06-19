import express from "express";
import { authenticateJwt, isSuperAdmin } from "../middleware/authMiddleware";
import {
  createCoupon,
  deleteCoupon,
  fetchAllCoupons,
} from "../controllers/couponController";

const router = express.Router();

router.post("/create-coupon", authenticateJwt, isSuperAdmin, createCoupon);
router.get(
  "/fetch-all-coupons",
  authenticateJwt,
  isSuperAdmin,
  fetchAllCoupons
);
router.delete(
  "/delete-coupon/:id",
  authenticateJwt,
  isSuperAdmin,
  deleteCoupon
);

export default router;
