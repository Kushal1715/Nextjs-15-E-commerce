import { Response } from "express";
import cloudinary from "../config/cloudinary";
import fs from "fs";
import { AuthenticatedRequest } from "../middleware/authMiddleware";
import { prisma } from "../server";

//create a product
export const createProduct = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const {
      name,
      brand,
      description,
      category,
      gender,
      sizes,
      colors,
      price,
      stock,
    } = req.body;

    const files = req.files as Express.Multer.File[];

    //upload all images to cloudinary
    const uploadPromises = files.map((file) =>
      cloudinary.uploader.upload(file.path, {
        folder: "ecommerce",
      })
    );

    const uploadresults = await Promise.all(uploadPromises);
    const imageUrls = uploadresults.map((result) => result.secure_url);

    const newlyCreatedProduct = await prisma.product.create({
      data: {
        name,
        brand,
        category,
        description,
        gender,
        sizes: sizes.split(","),
        colors: colors.split(","),
        price: parseFloat(price),
        stock: parseInt(stock),
        images: imageUrls,
        soldCount: 0,
        rating: 0,
      },
    });

    //clean the uploaded files
    files.forEach((file) => fs.unlinkSync(file.path));
    res.status(201).json(newlyCreatedProduct);
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: "Some error occured!" });
  }
};

//fetch all products for admin
export const fetchAllProductsForAdmin = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const products = await prisma.product.findMany();
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: "something went wrong",
    });
  }
};

export const fetchProductById = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({ where: { id } });

    if (!product) {
      res.status(404).json({
        success: false,
        message: "product not found",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: "something went wrong",
    });
  }
};

export const updateProductByAdmin = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const {
      name,
      brand,
      description,
      category,
      gender,
      sizes,
      colors,
      price,
      stock,
      rating,
    } = req.body;

    const data: any = {};

    if (name) data.name = name;
    if (brand) data.brand = brand;
    if (description) data.description = description;
    if (category) data.category = category;
    if (gender) data.gender = gender;
    if (sizes) data.sizes = sizes.split(",");
    if (colors) data.colors = colors.split(",");
    if (price) data.price = parseFloat(price);
    if (stock) data.stock = parseInt(stock);
    if (rating) data.rating = parseInt(rating);

    const updateProduct = await prisma.product.update({
      where: { id },
      data,
    });

    res.status(200).json({
      success: true,
      message: "product updated successfully",
      updateProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: "something went wrong",
    });
  }
};

export const deleteProductByAdmin = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    await prisma.product.delete({ where: { id } });

    res.status(200).json({
      success: true,
      message: "product deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: "something went wrong",
    });
  }
};
