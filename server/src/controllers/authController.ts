import { Request, Response } from "express";
import { prisma } from "../server";
import bcrypt from "bcryptjs";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      res.status(400).json({ success: false, message: "user already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword, role: "USER" },
    });

    res.status(201).json({
      success: true,
      message: "user registered successfully",
      userId: newUser.id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "registration failed" });
  }
};
