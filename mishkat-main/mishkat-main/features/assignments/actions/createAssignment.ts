"use server";

import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/rbac";
import { createAssignmentSchema } from "../validations";

export async function createAssignmentAction(formData: FormData) {
  try {
    const session = await requireRole(["TEACHER", "ADMIN"]);

    const rawData = {
      lessonId: formData.get("lessonId"),
      title: formData.get("title"),
      instructions: formData.get("instructions"),
      maxScore: formData.get("maxScore") || 100,
      dueDate: formData.get("dueDate") || undefined,
    };

    const parsed = createAssignmentSchema.safeParse(rawData);
    if (!parsed.success) {
      return {
        success: false,
        message: "Invalid assignment details.",
        errors: parsed.error.flatten().fieldErrors,
      };
    }

    const { lessonId, title, instructions, maxScore, dueDate } = parsed.data;

    const assignment = await prisma.assignment.create({
      data: {
        lessonId,
        title,
        instructions,
        maxScore,
        dueDate: dueDate ? new Date(dueDate) : null,
      },
    });

    return {
      success: true,
      message: "Assignment created successfully!",
      assignment,
    };
  } catch (error: any) {
    console.error("Create Assignment Error:", error);
    return {
      success: false,
      message: error?.message || "Failed to create assignment.",
    };
  }
}
