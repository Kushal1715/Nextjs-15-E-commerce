import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/authMiddleware";
import cloudinary from "../config/cloudinary";
import { prisma } from "../server";
import fs from "fs";

export const addFeatureBanners = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
      res.status(400).json({
        success: false,
        error: "No files uploaded",
      });
      return;
    }

    const uploadPromises = files.map((file) =>
      cloudinary.uploader.upload(file.path, {
        folder: "e-commerce-feature-banners",
      })
    );

    const uploadedResults = await Promise.all(uploadPromises);

    const banner = await Promise.all(
      uploadedResults.map((result) =>
        prisma.featureBanner.create({
          data: {
            imageUrl: result.secure_url,
          },
        })
      )
    );

    // Clean up local files after upload

    files.forEach((file) => fs.unlinkSync(file.path));

    res.status(201).json({
      success: true,
      message: "Feature banners added successfully",
      banners: banner,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: "something went wrong",
    });
  }
};

export const fetchAllFeatureBanners = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const featureBanners = await prisma.featureBanner.findMany({
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({
      success: true,
      featureBanners,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: "failed to fetch feature banners",
    });
  }
};

export const updateFeaturedProducts = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { productIds } = req.body;

    if (!Array.isArray(productIds) && productIds.length > 8) {
      res.status(400).json({
        success: false,
        error: "Invalid product Ids or too many products",
      });
      return;
    }

    await prisma.product.updateMany({
      data: { isFeatured: false },
    });

    const updatedProducts = await prisma.product.updateMany({
      where: { id: { in: productIds } },
      data: { isFeatured: true },
    });

    res.status(200).json({
      success: true,
      message: "featured products updated successfully",
      updatedProducts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: "failed to update featured products",
    });
  }
};
export const fetchFeatureProducts = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const featuredProducts = await prisma.product.findMany({
      where: { isFeatured: true },
    });

    res.status(200).json({
      success: true,
      featuredProducts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: "failed to fetch feature products",
    });
  }
};
