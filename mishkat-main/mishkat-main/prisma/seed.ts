import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // Clean existing data in reverse order of relationships
  await prisma.review.deleteMany();
  await prisma.submission.deleteMany();
  await prisma.assignment.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.section.deleteMany();
  await prisma.course.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await bcrypt.hash("Password123!", 10);

  // 1. Create Teacher
  const teacher = await prisma.user.create({
    data: {
      name: "Dr. Tariq Al-Mansoor",
      email: "teacher@mishkat.com",
      passwordHash,
      role: "TEACHER",
      bio: "Senior Software Architect & EdTech Lead with 12+ years of industry experience.",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    },
  });

  // 2. Create Student
  const student = await prisma.user.create({
    data: {
      name: "Sami Benali",
      email: "student@mishkat.com",
      passwordHash,
      role: "STUDENT",
      bio: "Lifelong learner interested in Cloud and Web Development.",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    },
  });

  // 3. Create Sample Course 1: Full-Stack Web Development
  const course1 = await prisma.course.create({
    data: {
      title: "Full-Stack Web Development with Next.js & TypeScript",
      titleAr: "تطوير تطبيقات الويب الكاملة باستخدام Next.js و TypeScript",
      slug: "full-stack-web-development-nextjs",
      description: "Master modern web engineering from database architecture to responsive UI with real-world production projects.",
      price: 49.99,
      category: "Development",
      categoryAr: "تطوير البرمجيات",
      thumbnailUrl: "/images/course_business.png",
      status: "PUBLISHED",
      teacherId: teacher.id,
      sections: {
        create: [
          {
            title: "Module 1: Architecture & Foundations",
            titleAr: "الوحدة 1: المعمارية والأساسيات",
            orderIndex: 1,
            lessons: {
              create: [
                {
                  title: "Introduction to Next.js App Router & Server Components",
                  titleAr: "مقدمة إلى App Router ومكونات الخادم",
                  durationMinutes: 18,
                  videoUrl: "https://www.youtube.com/watch?v=wm5gMKuwSYk",
                  content: "In this lesson, we explore how React Server Components execute on the server and stream HTML to the browser.",
                  isPreview: true,
                  orderIndex: 1,
                },
                {
                  title: "Database Modeling with Prisma & Postgres",
                  titleAr: "تصميم قواعد البيانات مع Prisma و Postgres",
                  durationMinutes: 25,
                  videoUrl: "https://www.youtube.com/watch?v=RebA5J-rlhU",
                  content: "Learn schema design, relational modeling, and atomic migrations.",
                  isPreview: false,
                  orderIndex: 2,
                  assignments: {
                    create: [
                      {
                        title: "Homework 1: Design your Database Schema",
                        titleAr: "الواجب 1: تصميم مخطط قاعدة البيانات",
                        instructions: "Create a 3-table schema for a blogging system with Users, Posts, and Comments. Submit your Prisma schema text or a GitHub repository link.",
                        maxScore: 100,
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            title: "Module 2: Authentication & Security",
            titleAr: "الوحدة 2: التوثيق والأمان",
            orderIndex: 2,
            lessons: {
              create: [
                {
                  title: "Role-Based Access Control (RBAC)",
                  titleAr: "التحكم في الوصول القائم على الأدوار",
                  durationMinutes: 22,
                  videoUrl: "https://www.youtube.com/watch?v=DJvM2lSPn6w",
                  content: "Enforcing role security on Server Actions and route handlers.",
                  isPreview: false,
                  orderIndex: 1,
                },
              ],
            },
          },
        ],
      },
    },
  });

  // 4. Create Enrollment & Progress for Student
  const enrollment = await prisma.enrollment.create({
    data: {
      userId: student.id,
      courseId: course1.id,
      progressPercentage: 50,
      completedLessonIds: [],
    },
  });

  console.log("✅ Seed completed successfully!");
  console.log("👤 Teacher account: teacher@mishkat.com / Password123!");
  console.log("👤 Student account: student@mishkat.com / Password123!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
