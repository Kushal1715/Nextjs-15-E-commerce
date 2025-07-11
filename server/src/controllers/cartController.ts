import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/authMiddleware";
import { prisma } from "../server";

export const addToCart = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const { productId, quantity, size, color } = req.body;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "user is not authenticated",
      });
      return;
    }

    const cart = await prisma.cart.upsert({
      where: { userId },
      create: { userId },
      update: {},
    });

    const cartItem = await prisma.cartItem.upsert({
      where: {
        cartId_productId_size_color: {
          cartId: cart.id,
          productId: productId,
          size: size || null,
          color: color || null,
        },
      },
      update: {
        quantity: { increment: quantity },
      },
      create: {
        cartId: cart.id,
        productId,
        quantity,
        size: size,
        color: color || null,
      },
    });

    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: { name: true, price: true, images: true },
    });

    const responseItem = {
      id: cartItem.id,
      productId: cartItem.productId,
      name: product?.name,
      price: product?.price,
      image: product?.images[0],
      color: cartItem?.color,
      size: cartItem?.size,
      quantity: cartItem.quantity,
    };
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: "failed to add to cart",
    });
  }
};

export const getCart = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "user is not authenticated",
      });
      return;
    }

    const cart = await prisma.cart.findUnique({
      where: { userId },
      select: { items: true },
    });

    if (!cart) {
      res.status(404).json({
        success: false,
        message: "cart not found",
      });
      return;
    }

    const cartItemsWithProducts = await Promise.all(
      cart?.items.map(async (item) => {
        const product = await prisma.product.findUnique({
          where: { id: item.productId },
        });

        return {
          id: item.id,
          productId: item?.productId,
          name: product?.name,
          price: product?.price,
          image: product?.images[0],
          color: item.color,
          size: item.size,
          quantity: item.quantity,
        };
      })
    );

    res.status(200).json({
      success: true,
      message: "cart items fetched successfully",
      data: cartItemsWithProducts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "failed to get cart items",
    });
  }
};

export const deleteFromCart = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const { id } = req.params;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "user is not authenticated",
      });
      return;
    }

    await prisma.cartItem.delete({ where: { id, cart: { userId } } });

    res.status(200).json({
      success: true,
      message: "Item is removed from the cart",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "failed to delete",
    });
  }
};

export const updateCartItemQuantity = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const { id } = req.params;
    const { quantity } = req.body;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "user is not authenticated",
      });
      return;
    }

    const updateQuantity = await prisma.cartItem.update({
      where: { id, cart: { userId } },
      data: { quantity },
    });

    const product = await prisma.product.findUnique({
      where: { id: updateQuantity.productId },
      select: {
        name: true,
        price: true,
        images: true,
      },
    });

    const responseItem = {
      id: updateQuantity?.id,
      productId: updateQuantity?.productId,
      name: product?.name,
      price: product?.price,
      image: product?.images[0],
      color: updateQuantity.color,
      size: updateQuantity.size,
      quantity: updateQuantity.quantity,
    };

    res.status(200).json({
      success: true,
      message: "cart item quantity updated successfully",
      data: responseItem,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "failed to delete",
    });
  }
};

export const clearEntireCart = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Unauthenticated user",
      });

      return;
    }

    await prisma.cartItem.deleteMany({
      where: {
        cart: { userId },
      },
    });

    res.status(200).json({
      success: true,
      message: "cart cleared successfully!",
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Failed to clear cart!",
    });
  }
};
