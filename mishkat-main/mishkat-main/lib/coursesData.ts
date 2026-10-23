export interface CourseItem {
  id: number | string;
  title_en: string;
  title_ar: string;
  slug: string;
  category_en: string;
  category_ar: string;
  category_code: "BUSINESS" | "NETWORKING" | "DESIGN" | "WORDPRESS" | "FINANCE" | "AI" | string;
  level: "Beginner" | "Intermediate" | "Advanced" | string;
  level_ar: "مبتدئ" | "متوسط" | "متقدم" | string;
  price: string;
  originalPrice?: string;
  rating: number;
  reviews: number;
  lessons: number;
  duration: string;
  image: string;
  description_en: string;
  description_ar: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  syllabus?: {
    title: string;
    title_ar: string;
    lessons: string[];
  }[];
  outcomes?: string[];
  outcomes_ar?: string[];
}

export const CATEGORIES = [
  {
    code: "ALL",
    label_en: "All Categories",
    label_ar: "جميع التخصصات",
    count: 0,
    icon: "Layers",
  },
  {
    code: "BUSINESS",
    label_en: "Business & Innovation",
    label_ar: "إدارة الأعمال والابتكار",
    count: 0,
    icon: "Briefcase",
  },
  {
    code: "NETWORKING",
    label_en: "Cloud & Networks",
    label_ar: "الشبكات والحوسبة السحابية",
    count: 0,
    icon: "Cloud",
  },
  {
    code: "DESIGN",
    label_en: "UI/UX & Product Design",
    label_ar: "تصميم واجهات المستخدم",
    count: 0,
    icon: "Palette",
  },
  {
    code: "WORDPRESS",
    label_en: "Web Development",
    label_ar: "تطوير الويب والبرمجة",
    count: 0,
    icon: "Code",
  },
  {
    code: "FINANCE",
    label_en: "Finance & Accounting",
    label_ar: "المالية والمحاسبة",
    count: 0,
    icon: "TrendingUp",
  },
  {
    code: "AI",
    label_en: "AI & Machine Learning",
    label_ar: "الذكاء الاصطناعي",
    count: 0,
    icon: "Cpu",
  },
] as const;

/**
 * All mock/fake courses have been deleted.
 * Ready for database connection (PostgreSQL / Prisma) in production.
 */
export const ALL_COURSES: CourseItem[] = [];
