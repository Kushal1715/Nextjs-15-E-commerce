import express from "express";
import { authenticateJwt, isSuperAdmin } from "../middleware/authMiddleware";
import { upload } from "../middleware/uploadMiddleware";
import {
  createProduct,
  deleteProductByAdmin,
  fetchAllProductsForAdmin,
  fetchProductById,
  updateProductByAdmin,
} from "../controllers/productController";

const router = express.Router();

router.post(
  "/create-new-product",
  authenticateJwt,
  isSuperAdmin,
  upload.array("images", 5),
  createProduct
);
router.get(
  "/fetch-admin-products",
  authenticateJwt,
  isSuperAdmin,
  fetchAllProductsForAdmin
);

router.get("/:id", authenticateJwt, fetchProductById);

router.patch("/:id", authenticateJwt, isSuperAdmin, updateProductByAdmin);

router.delete("/:id", authenticateJwt, isSuperAdmin, deleteProductByAdmin);

export default router;
