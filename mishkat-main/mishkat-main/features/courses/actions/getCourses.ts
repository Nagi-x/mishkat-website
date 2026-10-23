"use server";

import { prisma } from "@/lib/prisma";

export async function getCoursesAction(category?: string, searchQuery?: string) {
  try {
    const where: any = {
      status: "PUBLISHED",
    };

    if (category && category !== "all") {
      where.category = { equals: category, mode: "insensitive" };
    }

    if (searchQuery && searchQuery.trim() !== "") {
      where.OR = [
        { title: { contains: searchQuery, mode: "insensitive" } },
        { description: { contains: searchQuery, mode: "insensitive" } },
      ];
    }

    const courses = await prisma.course.findMany({
      where,
      include: {
        teacher: {
          select: { name: true, avatarUrl: true, bio: true },
        },
        sections: {
          include: {
            lessons: true,
          },
        },
        _count: {
          select: { enrollments: true, reviews: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return {
      success: true,
      courses: courses.map((c: any) => ({
        id: c.id,
        title: c.title,
        titleAr: c.titleAr,
        slug: c.slug,
        description: c.description,
        price: Number(c.price),
        category: c.category,
        categoryAr: c.categoryAr,
        thumbnailUrl: c.thumbnailUrl,
        status: c.status,
        teacherId: c.teacherId,
        teacher: c.teacher,
        sections: c.sections,
        enrollmentsCount: c._count.enrollments,
        reviewsCount: c._count.reviews,
        createdAt: c.createdAt,
      })),
    };
  } catch (error: any) {
    console.error("Get Courses Error:", error);
    return {
      success: false,
      courses: [],
      message: error?.message || "Failed to load courses from database.",
    };
  }
}
