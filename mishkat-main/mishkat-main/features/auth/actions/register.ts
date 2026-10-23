"use server";

import { createSession } from "@/lib/session";
import { findUserByEmail, createUser } from "@/lib/userService";
import { registerSchema } from "../validations";
import { AuthState } from "../types";

export async function registerAction(
  prevState: AuthState | null,
  formData: FormData
): Promise<AuthState> {
  const rawData: Record<string, string> = {};
  formData.forEach((value, key) => {
    if (typeof value === "string") {
      rawData[key] = value;
    }
  });

  const parsed = registerSchema.safeParse(rawData);
  if (!parsed.success) {
    return {
      success: false,
      message: "Please fix the validation errors below.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const { name, email, password, role } = parsed.data;

  try {
    const existing = await findUserByEmail(email);

    if (existing) {
      return {
        success: false,
        message: "An account with this email address already exists.",
        errors: { email: ["Email is already registered"] },
      };
    }

    const user = await createUser({
      name,
      email,
      password,
      role: role as "STUDENT" | "TEACHER",
    });

    // Create secure session
    await createSession({
      userId: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });

    return {
      success: true,
      message: `Account created successfully! Welcome to Mishkat as a ${role === "TEACHER" ? "Teacher" : "Student"}.`,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  } catch (error: any) {
    console.error("Register Error:", error);
    return {
      success: false,
      message: error?.message || "Failed to create account. Please try again.",
    };
  }
}
