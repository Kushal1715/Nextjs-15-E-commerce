import { Request, Response } from "express";
import { prisma } from "../server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

const generateToken = (userId: string, email: string, role: string) => {
  const accessToken = jwt.sign(
    { userId, email, role },
    process.env.JWT_SECRET!,
    { expiresIn: "60m" }
  );

  const refreshToken = uuidv4();

  return { accessToken, refreshToken };
};

const setToken = async (
  res: Response,
  accessToken: string,
  refreshToken: string
) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 1000,
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60,
  });
};

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

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const userAlreadyExists = await prisma.user.findUnique({
      where: { email },
    });

    if (!userAlreadyExists) {
      res.status(400).json({
        success: false,
        message: "invalid credentials",
      });
      return;
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      userAlreadyExists.password
    );

    if (!isPasswordValid) {
      res.status(400).json({
        success: false,
        message: "invalid credentials",
      });
      return;
    }

    const { accessToken, refreshToken } = generateToken(
      userAlreadyExists.id,
      userAlreadyExists.email,
      userAlreadyExists.role
    );

    await setToken(res, accessToken, refreshToken);

    res.status(200).json({
      success: true,
      message: "login successful",
      user: {
        id: userAlreadyExists.id,
        name: userAlreadyExists.name,
        email: userAlreadyExists.email,
        role: userAlreadyExists.role,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "login failed",
    });
  }
};
