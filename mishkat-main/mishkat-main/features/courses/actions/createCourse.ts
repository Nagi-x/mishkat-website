"use server";

import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/rbac";
import { createCourseSchema, createSectionSchema, createLessonSchema } from "../validations";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function createCourseAction(formData: FormData) {
  try {
    const session = await requireRole(["TEACHER", "ADMIN"]);

    const rawData = {
      title: formData.get("title"),
      titleAr: formData.get("titleAr") || undefined,
      description: formData.get("description"),
      price: formData.get("price") || 0,
      category: formData.get("category"),
      categoryAr: formData.get("categoryAr") || undefined,
      thumbnailUrl: formData.get("thumbnailUrl") || undefined,
    };

    const parsed = createCourseSchema.safeParse(rawData);
    if (!parsed.success) {
      return {
        success: false,
        message: "Invalid course information.",
        errors: parsed.error.flatten().fieldErrors,
      };
    }

    const { title, titleAr, description, price, category, categoryAr, thumbnailUrl } = parsed.data;

    const baseSlug = slugify(title) || "course";
    const slug = `${baseSlug}-${Date.now().toString(36)}`;

    const course = await prisma.course.create({
      data: {
        title,
        titleAr,
        slug,
        description,
        price,
        category,
        categoryAr,
        thumbnailUrl,
        teacherId: session.userId,
        status: "PUBLISHED",
      },
    });

    return {
      success: true,
      message: "Course created successfully!",
      course,
    };
  } catch (error: any) {
    console.error("Create Course Error:", error);
    return {
      success: false,
      message: error?.message || "Failed to create course.",
    };
  }
}

export async function addSectionAction(formData: FormData) {
  try {
    await requireRole(["TEACHER", "ADMIN"]);

    const rawData = {
      courseId: formData.get("courseId"),
      title: formData.get("title"),
      titleAr: formData.get("titleAr") || undefined,
      orderIndex: formData.get("orderIndex") || 0,
    };

    const parsed = createSectionSchema.safeParse(rawData);
    if (!parsed.success) {
      return { success: false, message: "Invalid section title." };
    }

    const section = await prisma.section.create({
      data: parsed.data,
    });

    return { success: true, section };
  } catch (error: any) {
    return { success: false, message: error?.message || "Failed to add section." };
  }
}

export async function addLessonAction(formData: FormData) {
  try {
    await requireRole(["TEACHER", "ADMIN"]);

    const rawData = {
      sectionId: formData.get("sectionId"),
      title: formData.get("title"),
      titleAr: formData.get("titleAr") || undefined,
      durationMinutes: formData.get("durationMinutes") || 0,
      videoUrl: formData.get("videoUrl") || undefined,
      content: formData.get("content") || undefined,
      isPreview: formData.get("isPreview") === "true",
      orderIndex: formData.get("orderIndex") || 0,
    };

    const parsed = createLessonSchema.safeParse(rawData);
    if (!parsed.success) {
      return { success: false, message: "Invalid lesson data." };
    }

    const lesson = await prisma.lesson.create({
      data: parsed.data,
    });

    return { success: true, lesson };
  } catch (error: any) {
    return { success: false, message: error?.message || "Failed to add lesson." };
  }
}
