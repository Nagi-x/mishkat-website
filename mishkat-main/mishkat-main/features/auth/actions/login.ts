"use server";

import bcrypt from "bcryptjs";
import { createSession, destroySession } from "@/lib/session";
import { findUserByEmail } from "@/lib/userService";
import { loginSchema } from "../validations";
import { AuthState } from "../types";

export async function loginAction(
  prevState: AuthState | null,
  formData: FormData
): Promise<AuthState> {
  const rawData: Record<string, string> = {};
  formData.forEach((value, key) => {
    if (typeof value === "string") {
      rawData[key] = value;
    }
  });

  const parsed = loginSchema.safeParse(rawData);
  if (!parsed.success) {
    return {
      success: false,
      message: "Please enter a valid email and password.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const { email, password } = parsed.data;

  try {
    const user = await findUserByEmail(email);

    if (!user) {
      return {
        success: false,
        message: "Invalid email or password.",
      };
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return {
        success: false,
        message: "Invalid email or password.",
      };
    }

    // Create secure session
    await createSession({
      userId: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });

    return {
      success: true,
      message: `Welcome back, ${user.name}!`,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  } catch (error: any) {
    console.error("Login Error:", error);
    return {
      success: false,
      message: error?.message || "Failed to log in. Please try again.",
    };
  }
}

export async function logoutAction() {
  await destroySession();
}
