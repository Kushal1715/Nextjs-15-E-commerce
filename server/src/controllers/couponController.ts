import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/authMiddleware";
import { prisma } from "../server";

export const createCoupon = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { code, discountPercent, startDate, endDate, usageLimit } = req.body;

    const newCoupon = await prisma.coupon.create({
      data: {
        code,
        discountPercent: parseInt(discountPercent),
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        usageLimit,
        usageCount: 0,
      },
    });

    res.status(201).json({
      success: true,
      message: "new coupon created successfully",
      coupon: newCoupon,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: "failed to create a coupon",
    });
  }
};

export const fetchAllCoupons = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const coupons = prisma.coupon.findMany({
      orderBy: { createdAt: "asc" },
    });

    res.status(201).json({
      success: true,
      coupons,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: "failed to create a coupon",
    });
  }
};

export const deleteCoupon = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    await prisma.coupon.delete({
      where: { id },
    });

    res.status(200).json({
      success: true,
      message: "coupon deleted successfully",
      id: id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: "failed to create a coupon",
    });
  }
};
