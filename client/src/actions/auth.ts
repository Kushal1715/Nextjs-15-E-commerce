"use server";
import { request } from "@arcjet/next";

export const protectSignupAction = async (email: string) => {
  const req = await request();
};
