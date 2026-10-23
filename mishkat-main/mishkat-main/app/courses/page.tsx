"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Star,
  Clock,
  BookOpen,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Filter,
  CheckCircle,
  Eye,
  Layers,
  ChevronRight,
} from "lucide-react";
import { ALL_COURSES, CourseItem } from "@/lib/coursesData";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";

export default function CoursesPage() {
  const { language, dir } = useLanguage();
  const { user, openAuthModal } = useAuth();
  const ArrowIcon = dir === "rtl" ? ArrowLeft : ArrowRight;

  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedLevel, setSelectedLevel] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = [
    { code: "ALL", label: language === "ar" ? "كل التخصصات" : "All Categories" },
    { code: "BUSINESS", label: language === "ar" ? "إدارة الأعمال" : "Business" },
    { code: "NETWORKING", label: language === "ar" ? "سحابة وشبكات" : "Cloud & Networks" },
    { code: "DESIGN", label: language === "ar" ? "تصميم واجهات" : "UI/UX Design" },
    { code: "WORDPRESS", label: language === "ar" ? "برمجة ويب" : "Web Development" },
    { code: "FINANCE", label: language === "ar" ? "المالية" : "Finance" },
    { code: "AI", label: language === "ar" ? "الذكاء الاصطناعي" : "AI & Machine Learning" },
  ];

  const filteredCourses = ALL_COURSES.filter((course) => {
    const matchesCat = selectedCategory === "ALL" || course.category_code === selectedCategory;
    const matchesLvl = selectedLevel === "ALL" || course.level.toUpperCase() === selectedLevel.toUpperCase();

    if (!searchQuery.trim()) return matchesCat && matchesLvl;

    const query = searchQuery.toLowerCase().trim();
    return (
      matchesCat &&
      matchesLvl &&
      (course.title_en.toLowerCase().includes(query) ||
        course.title_ar.toLowerCase().includes(query) ||
        course.category_en.toLowerCase().includes(query) ||
        course.category_ar.toLowerCase().includes(query) ||
        course.author.name.toLowerCase().includes(query))
    );
  });

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-24">
      {/* Page Header Banner */}
      <div className="bg-gradient-to-r from-[#0b192e] via-[#0f2b5c] to-[#1e40af] text-white py-14 sm:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border border-amber-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === "ar" ? "فهرس الدورات الأكاديمية" : "COURSE DIRECTORY"}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            {language === "ar" ? "برامج تدريبية معتمدة وشهادات احترافية" : "Accredited Training Programs & Courses"}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            {language === "ar"
              ? "اختر من بين تشكيلة واسعة من الدورات المتقدمة في الأعمال، الحوسبة السحابية، التصميم، والذكاء الاصطناعي."
              : "Discover interactive courses designed by world-renowned instructors to boost your skills and advance your career."}
          </p>

          {/* Quick Breadcrumb */}
          <div className="pt-2 flex items-center justify-center gap-2 text-xs text-slate-400">
            <Link href="/" className="hover:text-amber-400 transition">
              {language === "ar" ? "الرئيسية" : "Home"}
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-500 rtl:rotate-180" />
            <span className="text-amber-400 font-bold">
              {language === "ar" ? "جميع الدورات" : "Courses Catalog"}
            </span>
          </div>
        </div>
      </div>

      {/* Main Catalog Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        {/* Search & Filter Bar */}
        <div className="bg-white p-5 rounded-3xl shadow-xl border border-slate-200/90 space-y-4 mb-10">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  language === "ar"
                    ? "ابحث بالاسم، التخصص، الكلمات المفتاحية، أو المحاضر..."
                    : "Search courses by keyword, instructor, skill..."
                }
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706] focus:bg-white transition"
              />
            </div>

            {/* Level Filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" />
                <span>{language === "ar" ? "المستوى:" : "Level:"}</span>
              </span>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="ALL">{language === "ar" ? "كل المستويات" : "All Levels"}</option>
                <option value="BEGINNER">{language === "ar" ? "مبتدئ" : "Beginner"}</option>
                <option value="INTERMEDIATE">{language === "ar" ? "متوسط" : "Intermediate"}</option>
                <option value="ADVANCED">{language === "ar" ? "متقدم" : "Advanced"}</option>
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-slate-100 no-scrollbar">
            {categories.map((cat) => {
              const active = selectedCategory === cat.code;
              return (
                <button
                  key={cat.code}
                  onClick={() => setSelectedCategory(cat.code)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition flex-shrink-0 cursor-pointer ${active
                    ? "bg-[#0f2b5c] text-amber-400 shadow-md"
                    : "bg-slate-50 text-slate-600 hover:bg-amber-50 hover:text-amber-800 border border-slate-200"
                    }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Overview */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-sm font-bold text-slate-700">
            {language === "ar" ? (
              <span>
                عرض <strong className="text-[#0f2b5c]">{filteredCourses.length}</strong> دورات متاحة
              </span>
            ) : (
              <span>
                Found <strong className="text-[#0f2b5c]">{filteredCourses.length}</strong> available courses
              </span>
            )}
          </div>

          {(selectedCategory !== "ALL" || selectedLevel !== "ALL" || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory("ALL");
                setSelectedLevel("ALL");
                setSearchQuery("");
              }}
              className="text-xs font-bold text-amber-600 hover:underline cursor-pointer"
            >
              {language === "ar" ? "مسح التصفية" : "Clear filters"}
            </button>
          )}
        </div>

        {/* Courses Grid or Empty State */}
        {filteredCourses.length === 0 ? (
          <div className="text-center py-20 px-6 bg-white rounded-3xl border border-dashed border-amber-300 shadow-sm max-w-xl mx-auto my-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-amber-50 text-[#d97706] flex items-center justify-center border border-amber-200">
              <Layers className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[#0f2b5c] mb-2">
              {ALL_COURSES.length === 0
                ? (language === "ar" ? "الدورات قيد الإعداد والإطلاق قريباً" : "Courses Coming Soon")
                : (language === "ar" ? "لم يتم العثور على دورات تطابق بحثك" : "No courses match your filter")}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed mb-6">
              {ALL_COURSES.length === 0
                ? (language === "ar"
                    ? "نعمل على تجهيز مناهج تعليمية وتدريبية متقدمة في مختلف التخصصات. ترقبوا الإطلاق الرسمي قريباً."
                    : "We are actively curating accredited courses across multiple disciplines. Stay tuned for the official launch.")
                : (language === "ar"
                    ? "حاول تغيير خيارات البحث أو التصفية للعثور على الدورات المناسبة."
                    : "Try adjusting your search criteria or resetting the category filter.")}
            </p>
            {ALL_COURSES.length === 0 ? (
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0f2b5c] text-amber-400 text-xs font-bold uppercase tracking-wider hover:bg-[#d97706] hover:text-white transition shadow-sm"
              >
                <span>{language === "ar" ? "العودة للرئيسية" : "Back to Home"}</span>
              </Link>
            ) : (
              <button
                onClick={() => {
                  setSelectedCategory("ALL");
                  setSelectedLevel("ALL");
                  setSearchQuery("");
                }}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0f2b5c] text-amber-400 text-xs font-bold uppercase tracking-wider hover:bg-[#d97706] hover:text-white transition shadow-sm cursor-pointer"
              >
                <span>{language === "ar" ? "إعادة تعيين الفلاتر" : "Reset Filters"}</span>
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => {
              const title = language === "ar" ? course.title_ar : course.title_en;
              const category = language === "ar" ? course.category_ar : course.category_en;
              const desc = language === "ar" ? course.description_ar : course.description_en;
              const level = language === "ar" ? course.level_ar : course.level;

              return (
                <div
                  key={course.id}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1.5"
                >
                  {/* Thumbnail */}
                  <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100">
                    <Image
                      src={course.image}
                      alt={title}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 bg-gradient-to-r from-[#d97706] to-[#f59e0b] text-white text-xs font-black px-3.5 py-1 rounded-full shadow-md">
                      {course.price}
                    </div>
                    <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4 bg-[#0f2b5c]/90 text-amber-300 text-[10px] font-black px-2.5 py-1 rounded-full uppercase">
                      {level}
                    </div>
                    <div className="absolute bottom-4 left-4 rtl:left-auto rtl:right-4 bg-white/95 text-[#0f2b5c] text-[11px] font-extrabold px-3 py-1 rounded-full shadow-xs border border-slate-200">
                      {category}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full overflow-hidden relative">
                            <Image src={course.author.avatar} alt={course.author.name} fill className="object-cover" />
                          </div>
                          <span className="font-bold text-slate-700">{course.author.name}</span>
                        </div>

                        <div className="flex items-center gap-1 text-amber-500 font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>{course.rating}</span>
                        </div>
                      </div>

                      <h3 className="text-lg font-bold text-[#0f2b5c] leading-snug group-hover:text-[#d97706] transition line-clamp-2">
                        <Link href={`/courses/${course.id}`}>{title}</Link>
                      </h3>

                      <p className="text-xs text-slate-500 line-clamp-2 mt-2 leading-relaxed">
                        {desc}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-slate-500 font-semibold">
                        <div className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4 text-[#d97706]" />
                          <span>{course.lessons}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-[#d97706]" />
                          <span>{course.duration}</span>
                        </div>
                      </div>

                      <Link
                        href={`/courses/${course.id}`}
                        className="px-4 py-2 rounded-xl bg-[#0f2b5c] hover:bg-[#d97706] text-white text-xs font-bold transition flex items-center gap-1 shadow-xs"
                      >
                        <span>{language === "ar" ? "التفاصيل" : "Details"}</span>
                        <ArrowIcon className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}