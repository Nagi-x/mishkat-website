"use server";

import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/rbac";

export async function enrollInCourseAction(courseId: string) {
  try {
    const session = await requireAuth();

    const existing = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: session.userId,
          courseId,
        },
      },
    });

    if (existing) {
      return {
        success: true,
        message: "You are already enrolled in this course.",
        enrollment: existing,
      };
    }

    const enrollment = await prisma.enrollment.create({
      data: {
        userId: session.userId,
        courseId,
        progressPercentage: 0,
        completedLessonIds: [],
      },
    });

    return {
      success: true,
      message: "Successfully enrolled in course!",
      enrollment,
    };
  } catch (error: any) {
    console.error("Enrollment Error:", error);
    return {
      success: false,
      message: error?.message || "Failed to enroll. Please log in first.",
    };
  }
}

export async function updateLessonProgressAction(courseId: string, lessonId: string) {
  try {
    const session = await requireAuth();

    const enrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: session.userId,
          courseId,
        },
      },
      include: {
        course: {
          include: {
            sections: {
              include: { lessons: true },
            },
          },
        },
      },
    });

    if (!enrollment) {
      return { success: false, message: "Enrollment not found." };
    }

    const completed = new Set(enrollment.completedLessonIds);
    completed.add(lessonId);

    const completedList = Array.from(completed);
    const totalLessons = enrollment.course.sections.reduce(
      (sum: number, sec: any) => sum + sec.lessons.length,
      0
    );

    const progressPercentage =
      totalLessons > 0 ? Math.min(100, Math.round((completedList.length / totalLessons) * 100)) : 100;

    const updated = await prisma.enrollment.update({
      where: { id: enrollment.id },
      data: {
        completedLessonIds: completedList,
        progressPercentage,
        isCompleted: progressPercentage >= 100,
      },
    });

    return {
      success: true,
      progressPercentage,
      isCompleted: updated.isCompleted,
    };
  } catch (error: any) {
    return { success: false, message: error?.message || "Failed to update progress." };
  }
}

export async function getStudentEnrollmentsAction() {
  try {
    const session = await requireAuth();

    const enrollments = await prisma.enrollment.findMany({
      where: { userId: session.userId },
      include: {
        course: {
          include: {
            teacher: { select: { name: true } },
            sections: {
              include: {
                lessons: {
                  include: { assignments: true },
                },
              },
            },
          },
        },
      },
      orderBy: { enrolledAt: "desc" },
    });

    return { success: true, enrollments };
  } catch (error: any) {
    return { success: false, enrollments: [], message: error?.message };
  }
}
