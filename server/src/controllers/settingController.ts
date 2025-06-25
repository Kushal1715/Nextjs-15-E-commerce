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
