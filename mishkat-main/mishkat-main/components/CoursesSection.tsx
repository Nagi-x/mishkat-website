"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  Clock,
  BookOpen,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Briefcase,
  Cloud,
  Palette,
  Code,
  TrendingUp,
  Cpu,
  Layers,
  Search,
  CheckCircle,
  Eye,
  X,
  GraduationCap,
  ShieldCheck,
} from "lucide-react";
import { ALL_COURSES, CourseItem } from "@/lib/coursesData";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";

export interface CoursesSectionProps {
  courses?: CourseItem[];
}

export default function CoursesSection({ courses = ALL_COURSES }: CoursesSectionProps) {
  const { language, dir } = useLanguage();
  const { user, openAuthModal } = useAuth();
  const ArrowIcon = dir === "rtl" ? ArrowLeft : ArrowRight;

  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedLevel, setSelectedLevel] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeCourseModal, setActiveCourseModal] = useState<CourseItem | null>(null);
  const [enrolledCourseId, setEnrolledCourseId] = useState<number | string | null>(null);

  // Category Boxes Definition
  const categoryBoxes = [
    {
      code: "ALL",
      title_en: "All Disciplines",
      title_ar: "جميع التخصصات",
      desc_en: "Browse the entire comprehensive catalog",
      desc_ar: "استكشف الكتالوج التعليمي الشامل",
      count: 0,
      icon: Layers,
      color: "from-amber-500/20 to-amber-600/10 text-amber-600 border-amber-200",
    },
    {
      code: "BUSINESS",
      title_en: "Business & Strategy",
      title_ar: "إدارة الأعمال والريادة",
      desc_en: "Leadership, growth & venture building",
      desc_ar: "القيادة ونماذج النمو وإطلاق المشاريع",
      count: 0,
      icon: Briefcase,
      color: "from-blue-500/20 to-blue-600/10 text-blue-600 border-blue-200",
    },
    {
      code: "NETWORKING",
      title_en: "Cloud & Networks",
      title_ar: "السحابة والشبكات المتقدمة",
      desc_en: "AWS, Azure, Kubernetes & security",
      desc_ar: "الحوسبة السحابية وأمن البنى التحتية",
      count: 0,
      icon: Cloud,
      color: "from-sky-500/20 to-sky-600/10 text-sky-600 border-sky-200",
    },
    {
      code: "DESIGN",
      title_en: "UI/UX & Product Design",
      title_ar: "تصميم واجهات وتجربة المستخدم",
      desc_en: "Figma systems, prototyping & design",
      desc_ar: "أنظمة فيجما والنمذجة والتصميم التفاعلي",
      count: 0,
      icon: Palette,
      color: "from-rose-500/20 to-rose-600/10 text-rose-600 border-rose-200",
    },
    {
      code: "WORDPRESS",
      title_en: "Web Development",
      title_ar: "تطوير وبرمجة المواقع",
      desc_en: "Next.js, TypeScript & modern CMS",
      desc_ar: "تطوير الويب الحديث وبناء التطبيقات",
      count: 0,
      icon: Code,
      color: "from-emerald-500/20 to-emerald-600/10 text-emerald-600 border-emerald-200",
    },
    {
      code: "AI",
      title_en: "AI & Machine Learning",
      title_ar: "الذكاء الاصطناعي والتعلم الآلي",
      desc_en: "LLMs, RAG, prompt engineering & agents",
      desc_ar: "نماذج اللغات الكبيرة وهندسة الأوامر والوكلاء",
      count: 0,
      icon: Cpu,
      color: "from-purple-500/20 to-purple-600/10 text-purple-600 border-purple-200",
    },
  ];

  // Filter courses based on category, level, and keyword
  const filteredCourses = courses.filter((course) => {
    const matchesCategory =
      selectedCategory === "ALL" || course.category_code === selectedCategory;

    const matchesLevel =
      selectedLevel === "ALL" || course.level.toUpperCase() === selectedLevel.toUpperCase();

    if (!searchQuery.trim()) return matchesCategory && matchesLevel;

    const query = searchQuery.toLowerCase().trim();
    const matchesTitle =
      course.title_en.toLowerCase().includes(query) ||
      course.title_ar.toLowerCase().includes(query) ||
      course.category_en.toLowerCase().includes(query) ||
      course.category_ar.toLowerCase().includes(query) ||
      course.author.name.toLowerCase().includes(query);

    return matchesCategory && matchesLevel && matchesTitle;
  });

  const handleEnrollClick = (course: CourseItem) => {
    if (!user) {
      openAuthModal("login");
      return;
    }
    setEnrolledCourseId(course.id);
    setTimeout(() => setEnrolledCourseId(null), 3000);
  };

  return (
    <section id="courses" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#d97706] bg-[#fef3c7] px-4 py-1.5 rounded-full border border-[#fde68a]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === "ar" ? "برامجنا ودوراتنا التعليمية" : "OUR COURSES CATALOG"}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f2b5c] tracking-tight leading-tight">
            {language === "ar"
              ? "استكشف دورات احترافية مصنفة حسب التخصص والمستوى"
              : "Explore Professional Courses by Category & Skill Level"}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            {language === "ar"
              ? "مناهج معتمدة تم إعدادها بواسطة نخبة من كبار المدربين والأكاديميين لتمكينك من مهارات المستقبل."
              : "Industry-accredited curricula designed by top educators and engineers to accelerate your professional mastery."}
          </p>
        </div>

        {/* 1. Category Designation Boxes / Grid */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-extrabold text-[#0f2b5c] uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#d97706]" />
              <span>{language === "ar" ? "التصنيفات المعتمدة" : "Designated Course Categories"}</span>
            </h3>
            <span className="text-xs text-slate-500 font-semibold">
              {language === "ar" ? "اختر تصنيفاً للتصفية السريعة" : "Click any box to filter courses"}
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {categoryBoxes.map((box) => {
              const Icon = box.icon;
              const isSelected = selectedCategory === box.code;
              const title = language === "ar" ? box.title_ar : box.title_en;
              const desc = language === "ar" ? box.desc_ar : box.desc_en;

              return (
                <button
                  key={box.code}
                  type="button"
                  onClick={() => setSelectedCategory(box.code)}
                  className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between group hover:-translate-y-1 ${isSelected
                    ? "bg-white border-[#d97706] ring-2 ring-[#d97706]/40 shadow-lg"
                    : "bg-white border-slate-200/80 hover:border-slate-300 hover:shadow-md"
                    }`}
                >
                  <div className="flex items-center justify-between mb-3 w-full">
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${box.color} flex items-center justify-center border shadow-xs`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span
                      className={`text-[10px] font-black px-2 py-0.5 rounded-full ${isSelected
                        ? "bg-[#0f2b5c] text-amber-400"
                        : "bg-slate-100 text-slate-600"
                        }`}
                    >
                      {box.count} {language === "ar" ? "دورات" : "Courses"}
                    </span>
                  </div>

                  <div>
                    <h4
                      className={`text-xs sm:text-sm font-bold leading-snug ${isSelected ? "text-[#0f2b5c]" : "text-slate-800"
                        }`}
                    >
                      {title}
                    </h4>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-1 font-normal">
                      {desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Interactive Search & Level Filter Toolbar */}
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/90 shadow-sm mb-10 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Real-time search inside courses */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                language === "ar"
                  ? "ابحث باسم الدورة أو المدرب أو المهارة..."
                  : "Filter by title, instructor, skill..."
              }
              className="w-full pl-10 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706] focus:bg-white transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Level Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">
              {language === "ar" ? "المستوى:" : "Level:"}
            </span>
            {[
              { id: "ALL", label: language === "ar" ? "كل المستويات" : "All Levels" },
              { id: "BEGINNER", label: language === "ar" ? "مبتدئ" : "Beginner" },
              { id: "INTERMEDIATE", label: language === "ar" ? "متوسط" : "Intermediate" },
              { id: "ADVANCED", label: language === "ar" ? "متقدم" : "Advanced" },
            ].map((lvl) => {
              const active = selectedLevel === lvl.id;
              return (
                <button
                  key={lvl.id}
                  onClick={() => setSelectedLevel(lvl.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${active
                    ? "bg-[#0f2b5c] text-amber-400 shadow-xs scale-105"
                    : "bg-slate-100 text-slate-600 hover:bg-amber-50 hover:text-amber-700"
                    }`}
                >
                  {lvl.label}
                </button>
              );
            })}
          </div>

          {/* Result Count Badge */}
          <div className="text-xs font-bold text-slate-500 self-center lg:self-auto">
            {language === "ar" ? (
              <span>
                عرض <strong className="text-[#0f2b5c]">{filteredCourses.length}</strong> من أصل {courses.length} دورة
              </span>
            ) : (
              <span>
                Showing <strong className="text-[#0f2b5c]">{filteredCourses.length}</strong> of {courses.length} courses
              </span>
            )}
          </div>
        </div>

        {/* 3. Courses Cards Grid */}
        {courses.length === 0 ? (
          <div className="text-center py-20 px-6 bg-white rounded-3xl border border-dashed border-amber-300/80 shadow-xs max-w-xl mx-auto">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-amber-50 text-[#d97706] flex items-center justify-center border border-amber-200">
              <GraduationCap className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-[#0f2b5c] mb-2">
              {language === "ar" ? "الدورات قيد الإعداد والإطلاق قريباً" : "Courses Coming Soon"}
            </h4>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
              {language === "ar"
                ? "نقوم حالياً بإعداد باقة من الدورات والبرامج المعتمدة مع نخبة من المدربين والأكاديميين. سيتم فتح باب التسجيل قريباً."
                : "We are currently curating accredited programs and professional courses. Course registration will open soon."}
            </p>
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center py-16 px-4 bg-white rounded-3xl border border-dashed border-slate-300">
            <Search className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h4 className="text-lg font-bold text-slate-800 mb-1">
              {language === "ar" ? "لم يتم العثور على دورات تطابق خياراتك" : "No courses match your criteria"}
            </h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
              {language === "ar"
                ? "حاول تغيير التصنيف أو مسح عبارة البحث للعثور على الدورات المناسبة."
                : "Try selecting another category or clearing the search box to view available courses."}
            </p>
            <button
              onClick={() => {
                setSelectedCategory("ALL");
                setSelectedLevel("ALL");
                setSearchQuery("");
              }}
              className="px-5 py-2.5 rounded-full bg-[#0f2b5c] text-amber-400 text-xs font-bold uppercase tracking-wider hover:bg-[#d97706] transition cursor-pointer"
            >
              {language === "ar" ? "إعادة تعيين الفلاتر" : "Reset All Filters"}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => {
              const title = language === "ar" ? course.title_ar : course.title_en;
              const category = language === "ar" ? course.category_ar : course.category_en;
              const desc = language === "ar" ? course.description_ar : course.description_en;
              const level = language === "ar" ? course.level_ar : course.level;
              const isEnrolled = enrolledCourseId === course.id;

              return (
                <div
                  key={course.id}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col group hover:-translate-y-2"
                >
                  {/* Thumbnail Container */}
                  <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100">
                    <Image
                      src={course.image}
                      alt={title}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-500"
                    />

                    {/* Price Pill Badge */}
                    <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 bg-gradient-to-r from-[#d97706] to-[#f59e0b] text-white text-xs font-black px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                      <span>{course.price}</span>
                      {course.originalPrice && (
                        <span className="text-[10px] text-amber-100 line-through font-normal">
                          {course.originalPrice}
                        </span>
                      )}
                    </div>

                    {/* Level Badge */}
                    <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4 bg-[#0f2b5c]/90 backdrop-blur-md text-amber-300 text-[10px] font-black px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
                      {level}
                    </div>

                    {/* Category Pill Badge */}
                    <div className="absolute bottom-4 left-4 rtl:left-auto rtl:right-4 bg-white/95 backdrop-blur-md text-[#0f2b5c] text-[11px] font-extrabold px-3 py-1 rounded-full shadow-md border border-slate-200">
                      {category}
                    </div>
                  </div>

                  {/* Course Info Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      {/* Rating & Author */}
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full overflow-hidden relative border border-slate-200">
                            <Image src={course.author.avatar} alt={course.author.name} fill className="object-cover" />
                          </div>
                          <div>
                            <span className="font-bold text-slate-800 block text-xs">{course.author.name}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 text-amber-500 font-bold bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>{course.rating}</span>
                          <span className="text-slate-400 font-normal text-[10px]">({course.reviews})</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-base sm:text-lg font-extrabold text-[#0f2b5c] leading-snug group-hover:text-[#d97706] transition line-clamp-2">
                        <Link href={`/courses/${course.id}`}>{title}</Link>
                      </h3>

                      {/* Description snippet */}
                      <p className="text-xs text-slate-500 line-clamp-2 mt-2 leading-relaxed">
                        {desc}
                      </p>
                    </div>

                    {/* Stats & Actions */}
                    <div className="pt-4 border-t border-slate-100 space-y-3">
                      <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                        <div className="flex items-center gap-1.5">
                          <BookOpen className="w-4 h-4 text-[#d97706]" />
                          <span>
                            {course.lessons} {language === "ar" ? "درساً" : "Lessons"}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-[#d97706]" />
                          <span>{course.duration}</span>
                        </div>
                      </div>

                      {/* Card Action Buttons */}
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => setActiveCourseModal(course)}
                          className="py-2.5 px-3 rounded-xl border border-slate-200 hover:border-amber-400 hover:bg-amber-50/60 text-[#0f2b5c] text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5 text-slate-500" />
                          <span>{language === "ar" ? "نظرة سريعة" : "Quick View"}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleEnrollClick(course)}
                          className={`py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs cursor-pointer ${isEnrolled
                            ? "bg-emerald-600 text-white"
                            : "bg-[#0f2b5c] hover:bg-[#d97706] text-white"
                            }`}
                        >
                          {isEnrolled ? (
                            <>
                              <CheckCircle className="w-3.5 h-3.5" />
                              <span>{language === "ar" ? "تم التسجيل!" : "Enrolled!"}</span>
                            </>
                          ) : (
                            <>
                              <span>{language === "ar" ? "التسجيل الآن" : "Enroll Now"}</span>
                              <ArrowIcon className="w-3 h-3" />
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* View All Courses Link */}
        <div className="text-center mt-14">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 bg-[#0f2b5c] hover:bg-[#d97706] text-white text-xs font-black uppercase tracking-wider px-8 py-4 rounded-full shadow-xl transition transform hover:-translate-y-0.5 duration-200"
          >
            <span>{language === "ar" ? "تصفح كامل الفهرس والمسارات" : "EXPLORE ALL COURSES & PATHWAYS"}</span>
            <ArrowIcon className="w-4 h-4 text-amber-400" />
          </Link>
        </div>

      </div>

      {/* 4. Quick View Syllabus Modal */}
      {activeCourseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[85vh]">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#0b192e] to-[#0f2b5c] p-6 text-white relative">
              <button
                onClick={() => setActiveCourseModal(null)}
                aria-label="Close"
                className="absolute top-4 right-4 text-slate-300 hover:text-white transition p-1.5 rounded-full hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 uppercase">
                  {language === "ar" ? activeCourseModal.category_ar : activeCourseModal.category_en}
                </span>
                <span className="text-[10px] font-semibold text-slate-300">
                  {language === "ar" ? activeCourseModal.level_ar : activeCourseModal.level}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white leading-snug">
                {language === "ar" ? activeCourseModal.title_ar : activeCourseModal.title_en}
              </h3>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              <div className="flex items-center justify-between text-xs text-slate-600 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden relative">
                    <Image src={activeCourseModal.author.avatar} alt={activeCourseModal.author.name} fill className="object-cover" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-800 block">{activeCourseModal.author.name}</span>
                    <span className="text-[11px] text-slate-400">{activeCourseModal.author.role}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-base font-black text-[#0f2b5c] block">{activeCourseModal.price}</span>
                  <span className="text-[11px] text-amber-600 font-bold">★ {activeCourseModal.rating} ({activeCourseModal.reviews} reviews)</span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
                  {language === "ar" ? "عن الدورة التدريبية" : "Course Overview"}
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {language === "ar" ? activeCourseModal.description_ar : activeCourseModal.description_en}
                </p>
              </div>

              {activeCourseModal.outcomes && (
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3">
                    {language === "ar" ? "ماذا ستتعلم في هذا البرنامج" : "Key Learning Objectives"}
                  </h4>
                  <div className="space-y-2">
                    {(language === "ar" && activeCourseModal.outcomes_ar
                      ? activeCourseModal.outcomes_ar
                      : activeCourseModal.outcomes
                    ).map((outcome, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                        <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-4">
              <Link
                href={`/courses/${activeCourseModal.id}`}
                onClick={() => setActiveCourseModal(null)}
                className="text-xs font-bold text-[#0f2b5c] hover:text-[#d97706] underline"
              >
                {language === "ar" ? "الانتقال لصفحة الدورة الكاملة" : "Go to full course page"}
              </Link>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setActiveCourseModal(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  {language === "ar" ? "إغلاق" : "Close"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleEnrollClick(activeCourseModal);
                    setActiveCourseModal(null);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#d97706] to-[#f59e0b] hover:from-[#b45309] hover:to-[#d97706] text-white text-xs font-black uppercase tracking-wider shadow-md hover:shadow-lg transition cursor-pointer"
                >
                  {language === "ar" ? "التسجيل في الدورة" : "Enroll in Course"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}