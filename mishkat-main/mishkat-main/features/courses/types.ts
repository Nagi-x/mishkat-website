export type CourseStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export interface LessonItem {
  id: string;
  title: string;
  titleAr?: string | null;
  durationMinutes: number;
  videoUrl?: string | null;
  content?: string | null;
  orderIndex: number;
  isPreview: boolean;
  sectionId: string;
  assignmentsCount?: number;
}

export interface SectionItem {
  id: string;
  title: string;
  titleAr?: string | null;
  orderIndex: number;
  courseId: string;
  lessons: LessonItem[];
}

export interface CourseItem {
  id: string;
  title: string;
  titleAr?: string | null;
  slug: string;
  description: string;
  price: number;
  category: string;
  categoryAr?: string | null;
  thumbnailUrl?: string | null;
  status: CourseStatus;
  teacherId: string;
  teacher?: {
    name: string;
    avatarUrl?: string | null;
    bio?: string | null;
  };
  sections?: SectionItem[];
  enrollmentsCount?: number;
  averageRating?: number;
  reviewsCount?: number;
  createdAt: Date;
}
