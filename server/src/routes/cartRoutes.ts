import express from "express";
import {
  addToCart,
  clearEntireCart,
  deleteFromCart,
  getCart,
  updateCartItemQuantity,
} from "../controllers/cartController";
import { authenticateJwt } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/add", authenticateJwt, addToCart);
router.get("/get", authenticateJwt, getCart);
router.delete(`/delete/:id`, authenticateJwt, deleteFromCart);
router.put("/update/:id", authenticateJwt, updateCartItemQuantity);
router.put("/clear", authenticateJwt, clearEntireCart);

export default router;
