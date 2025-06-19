import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/authMiddleware";
import { prisma } from "../server";

export const createCoupon = async (
  req: AuthenticatedRequest,
  res: Response
) => {
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

    return res.status(201).json({
      success: true,
      message: "new coupon created successfully",
      coupon: newCoupon,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "failed to create a coupon",
    });
  }
};
