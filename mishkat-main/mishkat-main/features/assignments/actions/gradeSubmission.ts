"use server";

import { prisma } from "@/lib/prisma";
import { requireAuth, requireRole } from "@/lib/rbac";
import { submitAssignmentSchema, gradeSubmissionSchema } from "../validations";

export async function submitAssignmentAction(formData: FormData) {
  try {
    const session = await requireAuth();

    const rawData = {
      assignmentId: formData.get("assignmentId"),
      content: formData.get("content") || undefined,
      fileUrl: formData.get("fileUrl") || undefined,
    };

    const parsed = submitAssignmentSchema.safeParse(rawData);
    if (!parsed.success) {
      return {
        success: false,
        message: "Invalid submission details.",
        errors: parsed.error.flatten().fieldErrors,
      };
    }

    const { assignmentId, content, fileUrl } = parsed.data;

    // Check if previous submission exists
    const existing = await prisma.submission.findFirst({
      where: {
        assignmentId,
        studentId: session.userId,
      },
    });

    let submission;
    if (existing) {
      submission = await prisma.submission.update({
        where: { id: existing.id },
        data: {
          content,
          fileUrl,
          status: "SUBMITTED",
          submittedAt: new Date(),
        },
      });
    } else {
      submission = await prisma.submission.create({
        data: {
          assignmentId,
          studentId: session.userId,
          content,
          fileUrl,
          status: "SUBMITTED",
        },
      });
    }

    return {
      success: true,
      message: "Assignment submitted successfully!",
      submission,
    };
  } catch (error: any) {
    console.error("Submit Assignment Error:", error);
    return {
      success: false,
      message: error?.message || "Failed to submit assignment.",
    };
  }
}

export async function gradeSubmissionAction(formData: FormData) {
  try {
    // Only teachers or admins can grade
    await requireRole(["TEACHER", "ADMIN"]);

    const rawData = {
      submissionId: formData.get("submissionId"),
      grade: formData.get("grade"),
      feedback: formData.get("feedback") || undefined,
      status: formData.get("status") || "GRADED",
    };

    const parsed = gradeSubmissionSchema.safeParse(rawData);
    if (!parsed.success) {
      return {
        success: false,
        message: "Invalid grade input.",
        errors: parsed.error.flatten().fieldErrors,
      };
    }

    const { submissionId, grade, feedback, status } = parsed.data;

    const submission = await prisma.submission.update({
      where: { id: submissionId },
      data: {
        grade,
        feedback,
        status: status as any,
        gradedAt: new Date(),
      },
      include: {
        student: { select: { name: true, email: true } },
        assignment: { select: { title: true, maxScore: true } },
      },
    });

    return {
      success: true,
      message: `Graded successfully: ${grade}/${submission.assignment.maxScore}`,
      submission,
    };
  } catch (error: any) {
    console.error("Grade Submission Error:", error);
    return {
      success: false,
      message: error?.message || "Failed to grade submission.",
    };
  }
}
