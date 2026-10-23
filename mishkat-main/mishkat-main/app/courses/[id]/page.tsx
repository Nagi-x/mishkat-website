import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Star,
  Clock,
  BookOpen,
  CheckCircle,
  Award,
  Video,
  FileText,
  User,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Share2,
} from "lucide-react";
import { ALL_COURSES, CourseItem } from "@/lib/coursesData";
import { prisma } from "@/lib/prisma";

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let course: CourseItem | undefined = ALL_COURSES.find(
    (c) => String(c.id) === id || c.slug === id
  );

  // If not found in memory, query PostgreSQL database via Prisma
  if (!course) {
    try {
      const dbCourse = await prisma.course.findFirst({
        where: {
          OR: [{ id }, { slug: id }],
          status: "PUBLISHED",
        },
        include: {
          teacher: { select: { name: true, avatarUrl: true, bio: true } },
          sections: { include: { lessons: true } },
          _count: { select: { enrollments: true, reviews: true } },
        },
      });

      if (dbCourse) {
        course = {
          id: dbCourse.id,
          title_en: dbCourse.title,
          title_ar: dbCourse.titleAr || dbCourse.title,
          slug: dbCourse.slug,
          category_en: dbCourse.category,
          category_ar: dbCourse.categoryAr || dbCourse.category,
          category_code: dbCourse.category,
          level: "Intermediate",
          level_ar: "متوسط",
          price: `$${Number(dbCourse.price).toFixed(2)}`,
          rating: 5.0,
          reviews: dbCourse._count.reviews,
          lessons: dbCourse.sections.reduce((acc: number, s: any) => acc + s.lessons.length, 0),
          duration: `${dbCourse.sections.reduce((acc: number, s: any) => acc + s.lessons.reduce((lacc: number, l: any) => lacc + l.durationMinutes, 0), 0)} min`,
          image: dbCourse.thumbnailUrl || "/images/course_business.png",
          description_en: dbCourse.description,
          description_ar: dbCourse.description,
          author: {
            name: dbCourse.teacher?.name || "Instructor",
            role: dbCourse.teacher?.bio || "Lead Educator",
            avatar: dbCourse.teacher?.avatarUrl || "/icons/instructor.svg",
          },
          syllabus: dbCourse.sections.map((sec: any) => ({
            title: sec.title,
            title_ar: sec.titleAr || sec.title,
            lessons: sec.lessons.map((l: any) => l.title),
          })),
        };
      }
    } catch {
      // Prisma offline or DB not seeded
    }
  }

  if (!course) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-24">
      {/* Top Breadcrumb & Hero */}
      <div className="bg-gradient-to-r from-[#0b192e] via-[#0f2b5c] to-[#1e40af] text-white py-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <Link href="/" className="hover:text-amber-400 transition">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link href="/courses" className="hover:text-amber-400 transition">
              Courses
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-amber-400 font-bold truncate max-w-xs">{course.title_en}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-amber-400 text-slate-950 font-extrabold text-[11px] px-3 py-1 rounded-full uppercase tracking-wider">
              {course.category_en}
            </span>
            <span className="bg-white/10 text-white font-semibold text-[11px] px-3 py-1 rounded-full">
              Level: {course.level}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white max-w-4xl tracking-tight leading-tight">
            {course.title_en}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
            {course.description_en}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-slate-200">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full overflow-hidden relative border border-white/20">
                <Image src={course.author.avatar} alt={course.author.name} fill className="object-cover" />
              </div>
              <span className="font-bold">{course.author.name}</span>
            </div>

            <div className="flex items-center gap-1 text-amber-400 font-bold">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{course.rating}</span>
              <span className="text-slate-400">({course.reviews} reviews)</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Duration: {course.duration}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>{course.lessons} Lectures & Labs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Syllabus & Learning Objectives */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* What You'll Learn Box */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
              <h2 className="text-xl font-extrabold text-[#0f2b5c] flex items-center gap-2">
                <Award className="w-5 h-5 text-[#d97706]" />
                <span>What You Will Master in This Course</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {course.outcomes?.map((outcome, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-1" />
                    <span>{outcome}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Content / Curriculum */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-extrabold text-[#0f2b5c] flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#d97706]" />
                  <span>Curriculum & Lesson Modules</span>
                </h2>
                <span className="text-xs text-slate-500 font-semibold">{course.lessons} Total Lessons</span>
              </div>

              <div className="divide-y divide-slate-100 pt-2">
                {[
                  {
                    module: "Module 01: Foundations & Architecture Setup",
                    lessons: "4 lectures • 1h 20m",
                  },
                  {
                    module: "Module 02: Core Methodologies, Design Tokens & Patterns",
                    lessons: "8 lectures • 3h 15m",
                  },
                  {
                    module: "Module 03: Hands-On Production Project & Exercises",
                    lessons: "10 lectures • 4h 45m",
                  },
                  {
                    module: "Module 04: Real-World Deployment, Testing & Security",
                    lessons: "6 lectures • 2h 30m",
                  },
                  {
                    module: "Module 05: Final Capstone Review & Certification",
                    lessons: "4 lectures • 2h 00m",
                  },
                ].map((mod, i) => (
                  <div key={i} className="py-4 flex items-center justify-between group hover:bg-slate-50 px-2 rounded-xl transition">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-xs">
                        0{i + 1}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-800">{mod.module}</h4>
                        <span className="text-xs text-slate-400">{mod.lessons}</span>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
                      Preview
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructor Spotlight */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
              <h2 className="text-xl font-extrabold text-[#0f2b5c] flex items-center gap-2">
                <User className="w-5 h-5 text-[#d97706]" />
                <span>Meet Your Instructor</span>
              </h2>

              <div className="flex items-start gap-4 pt-2">
                <div className="w-16 h-16 rounded-2xl overflow-hidden relative flex-shrink-0 border-2 border-amber-300">
                  <Image src={course.author.avatar} alt={course.author.name} fill className="object-cover" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-black text-[#0f2b5c]">{course.author.name}</h3>
                  <p className="text-xs font-semibold text-[#d97706]">{course.author.role}</p>
                  <p className="text-xs text-slate-600 leading-relaxed pt-1">
                    Certified industry educator with over a decade of hands-on experience guiding thousands of engineers, product managers, and entrepreneurs toward skill mastery.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Pricing & Enrollment Action Card */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden p-6 space-y-6">
              
              {/* Thumbnail Container */}
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-100 border border-slate-100 shadow-inner">
                <Image src={course.image} alt={course.title_en} fill className="object-cover" />
                <div className="absolute inset-0 bg-slate-900/30 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white text-[#d97706] flex items-center justify-center shadow-xl hover:scale-110 transition cursor-pointer">
                    <Video className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>
              </div>

              {/* Price Row */}
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-3xl font-black text-[#0f2b5c]">{course.price}</span>
                  {course.originalPrice && (
                    <span className="text-sm text-slate-400 line-through ml-2">
                      {course.originalPrice}
                    </span>
                  )}
                </div>
                <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                  50% OFF Limited Offer
                </span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Link
                  href="/#courses"
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#d97706] to-[#f59e0b] hover:from-[#b45309] hover:to-[#d97706] text-white text-xs font-black uppercase tracking-wider shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Enroll in Course Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/courses"
                  className="w-full py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center justify-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Browse All Other Courses</span>
                </Link>
              </div>

              {/* Course Includes List */}
              <div className="pt-4 border-t border-slate-100 space-y-3 text-xs text-slate-600 font-medium">
                <span className="block font-black text-slate-800 uppercase tracking-wider text-[11px]">
                  This Course Includes:
                </span>
                <div className="flex items-center gap-2">
                  <Video className="w-4 h-4 text-[#d97706]" />
                  <span>{course.duration} on-demand video</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#d97706]" />
                  <span>Interactive exercises & code templates</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#d97706]" />
                  <span>Full lifetime access on mobile and desktop</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#d97706]" />
                  <span>Official Certificate of Completion</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}