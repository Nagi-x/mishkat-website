import { z } from "zod";

export const createCourseSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  titleAr: z.string().optional(),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.coerce.number().min(0, "Price must be 0 or greater").default(0),
  category: z.string().min(2, "Category is required"),
  categoryAr: z.string().optional(),
  thumbnailUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

export const createSectionSchema = z.object({
  courseId: z.string().min(1, "Course ID is required"),
  title: z.string().min(2, "Section title is required"),
  titleAr: z.string().optional(),
  orderIndex: z.coerce.number().default(0),
});

export const createLessonSchema = z.object({
  sectionId: z.string().min(1, "Section ID is required"),
  title: z.string().min(2, "Lesson title is required"),
  titleAr: z.string().optional(),
  durationMinutes: z.coerce.number().min(0).default(0),
  videoUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  content: z.string().optional(),
  isPreview: z.boolean().default(false),
  orderIndex: z.coerce.number().default(0),
});

export type CreateCourseInput = z.infer<typeof createCourseSchema>;
export type CreateSectionInput = z.infer<typeof createSectionSchema>;
export type CreateLessonInput = z.infer<typeof createLessonSchema>;
