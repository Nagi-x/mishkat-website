"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  X,
  BookOpen,
  Star,
  Clock,
  ArrowRight,
  Compass,
  GraduationCap,
  School,
  Sparkles,
  Layers,
  ChevronRight,
} from "lucide-react";
import { ALL_COURSES, CourseItem } from "@/lib/coursesData";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCourse?: (course: CourseItem) => void;
}

export default function SearchModal({ isOpen, onClose, onSelectCourse }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const inputRef = useRef<HTMLInputElement>(null);
  const { language, dir } = useLanguage();
  const { openAuthModal } = useAuth();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const cleanQuery = query.trim().toLowerCase();

  // Filter courses
  const filteredCourses = ALL_COURSES.filter((course) => {
    const matchesCategory =
      selectedCategory === "ALL" || course.category_code === selectedCategory;

    if (!cleanQuery) return matchesCategory;

    const titleEn = course.title_en.toLowerCase();
    const titleAr = course.title_ar.toLowerCase();
    const catEn = course.category_en.toLowerCase();
    const catAr = course.category_ar.toLowerCase();
    const instructor = course.author.name.toLowerCase();
    const level = course.level.toLowerCase();

    const matchesSearch =
      titleEn.includes(cleanQuery) ||
      titleAr.includes(cleanQuery) ||
      catEn.includes(cleanQuery) ||
      catAr.includes(cleanQuery) ||
      instructor.includes(cleanQuery) ||
      level.includes(cleanQuery);

    return matchesCategory && matchesSearch;
  });

  // Navigation shortcuts
  const navShortcuts = [
    { title: language === "ar" ? "الرئيسية" : "Home", href: "/", icon: Compass },
    { title: language === "ar" ? "جميع الدورات" : "All Courses Catalog", href: "#courses", icon: BookOpen },
    { title: language === "ar" ? "من نحن" : "About Mishkat", href: "#about", icon: Sparkles },
    { title: language === "ar" ? "نخبة المدربين" : "Expert Instructors", href: "#instructors", icon: School },
    { title: language === "ar" ? "آراء الطلاب" : "Student Testimonials", href: "#testimonials", icon: Star },
    { title: language === "ar" ? "المدونة التعليمية" : "Educational Blog", href: "#blog", icon: Layers },
  ].filter((item) => !cleanQuery || item.title.toLowerCase().includes(cleanQuery));

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-20 px-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Search Header Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center gap-3 bg-white">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 border border-amber-200 flex-shrink-0">
            <Search className="w-5 h-5" />
          </div>

          <div className="relative flex-1">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                language === "ar"
                  ? "ابحث عن دورة، تخصص، مهارة، أو مدرب (مثال: سحابة، تصميم، ووردبريس)..."
                  : "Search courses, topics, skills, instructors (e.g. Cloud, Design, React, Leadership)..."
              }
              className="w-full text-slate-800 placeholder-slate-400 bg-transparent text-sm sm:text-base font-medium focus:outline-none pr-8"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-block text-[11px] font-mono text-slate-400 bg-slate-100 px-2 py-1 rounded-md border border-slate-200">
              ESC
            </span>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Filter Categories */}
        <div className="px-5 py-3 bg-slate-50/80 border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto text-xs font-semibold no-scrollbar">
          <span className="text-slate-400 text-[11px] uppercase font-bold mr-1 flex-shrink-0">
            {language === "ar" ? "تصفية:" : "Filter:"}
          </span>
          {[
            { id: "ALL", label: language === "ar" ? "الكل" : "All" },
            { id: "BUSINESS", label: language === "ar" ? "إدارة الأعمال" : "Business" },
            { id: "NETWORKING", label: language === "ar" ? "سحابة وشبكات" : "Cloud" },
            { id: "DESIGN", label: language === "ar" ? "تصميم واجهات" : "UI/UX" },
            { id: "WORDPRESS", label: language === "ar" ? "برمجة ويب" : "Web Dev" },
            { id: "AI", label: language === "ar" ? "ذكاء اصطناعي" : "AI & ML" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition flex-shrink-0 cursor-pointer ${selectedCategory === cat.id
                ? "bg-[#0f2b5c] text-amber-400 shadow-xs"
                : "bg-white text-slate-600 hover:bg-amber-50 hover:text-[#d97706] border border-slate-200"
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Scrollable Results Area */}
        <div className="overflow-y-auto p-4 sm:p-5 space-y-6 flex-1">
          {/* Quick Registration & Access Action Bar */}
          {!cleanQuery && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  openAuthModal("register", "STUDENT");
                }}
                className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 text-left hover:bg-amber-100/60 transition flex items-center gap-3 cursor-pointer group"
              >
                <div className="w-9 h-9 rounded-xl bg-[#d97706] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-bold text-[#0f2b5c] flex items-center justify-between">
                    <span>{language === "ar" ? "تسجيل حساب طالب جديد" : "Student Registration"}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-amber-600 group-hover:translate-x-1 transition" />
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {language === "ar" ? "ابدأ التعلم وانضم لأكثر من 6000 طالب" : "Enroll, study projects & gain verified certificate"}
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  openAuthModal("register", "TEACHER");
                }}
                className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200 text-left hover:bg-blue-100/60 transition flex items-center gap-3 cursor-pointer group"
              >
                <div className="w-9 h-9 rounded-xl bg-[#0f2b5c] text-amber-400 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <School className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-bold text-[#0f2b5c] flex items-center justify-between">
                    <span>{language === "ar" ? "انضم كمعلم ومحاضر" : "Teacher Registration"}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#0f2b5c] group-hover:translate-x-1 transition" />
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {language === "ar" ? "انشر دوراتك ودرب الكفاءات العالمية" : "Publish curriculum & mentor next generation"}
                  </div>
                </div>
              </button>
            </div>
          )}

          {/* Courses List Section */}
          <div>
            <div className="flex items-center justify-between mb-3 text-xs font-extrabold uppercase tracking-wider text-slate-400">
              <span>
                {language === "ar" ? "الدورات التعليمية" : "Courses"} ({filteredCourses.length})
              </span>
              {filteredCourses.length > 0 && (
                <Link
                  href="/courses"
                  onClick={onClose}
                  className="text-amber-600 hover:text-amber-700 normal-case font-bold"
                >
                  {language === "ar" ? "عرض صفحة الدورات كاملة ←" : "View full catalog page →"}
                </Link>
              )}
            </div>

            {filteredCourses.length === 0 ? (
              <div className="text-center py-10 px-4 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <Search className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-sm font-bold text-slate-700">
                  {language === "ar" ? "لم يتم العثور على دورات مطابقة" : "No courses matching your search"}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  {language === "ar"
                    ? "جرب البحث بكلمات عامة مثل: إدارة، سحابة، ووردبريس، فيجما، أو تصفح الأقسام"
                    : "Try searching with broader terms like 'cloud', 'design', 'react', 'strategy', or clear filters"}
                </p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {filteredCourses.map((course) => {
                  const title = language === "ar" ? course.title_ar : course.title_en;
                  const category = language === "ar" ? course.category_ar : course.category_en;

                  return (
                    <div
                      key={course.id}
                      className="p-3 rounded-2xl border border-slate-200/80 hover:border-amber-400 hover:shadow-md transition bg-white flex items-center justify-between gap-4 group"
                    >
                      <div className="flex items-center gap-3.5 flex-1 min-w-0">
                        {/* Thumbnail */}
                        <div className="relative w-16 h-14 sm:w-20 sm:h-16 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                          <Image src={course.image} alt={title} fill className="object-cover group-hover:scale-105 transition" />
                        </div>

                        {/* Title & Metadata */}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                              {category}
                            </span>
                            <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                              {language === "ar" ? course.level_ar : course.level}
                            </span>
                          </div>

                          <h4 className="text-xs sm:text-sm font-bold text-[#0f2b5c] truncate group-hover:text-amber-600 transition">
                            {title}
                          </h4>

                          <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-1 flex-wrap">
                            <span className="font-semibold text-slate-700">{course.author.name}</span>
                            <span>•</span>
                            <div className="flex items-center gap-1 text-amber-500 font-bold">
                              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                              <span>{course.rating}</span>
                            </div>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-slate-400" />
                              <span>{course.duration}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Price & Action Button */}
                      <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 sm:gap-3 flex-shrink-0">
                        <div className="text-right">
                          <span className="text-sm font-black text-[#0f2b5c]">{course.price}</span>
                          {course.originalPrice && (
                            <span className="hidden sm:block text-[10px] text-slate-400 line-through">
                              {course.originalPrice}
                            </span>
                          )}
                        </div>

                        <Link
                          href={`/courses/${course.id}`}
                          onClick={onClose}
                          className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#0f2b5c] to-[#1e3a8a] hover:from-[#d97706] hover:to-[#f59e0b] text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
                        >
                          <span>{language === "ar" ? "التفاصيل" : "View"}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Navigation Shortcuts */}
          {navShortcuts.length > 0 && (
            <div>
              <div className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-2">
                {language === "ar" ? "روابط سريعة للمنصة" : "Platform Navigation"}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {navShortcuts.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={idx}
                      href={item.href}
                      onClick={onClose}
                      className="px-3 py-2.5 rounded-xl border border-slate-200/70 hover:border-amber-300 hover:bg-amber-50/40 text-slate-700 hover:text-[#d97706] transition flex items-center gap-2 text-xs font-semibold"
                    >
                      <Icon className="w-4 h-4 text-slate-400 group-hover:text-amber-600" />
                      <span className="truncate">{item.title}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
          <span>
            {language === "ar"
              ? "استخدم مفتاح ESC للإغلاق، أو انقر على أي دورة للانتقال إليها"
              : "Use ESC to close, or click any course to explore full curriculum"}
          </span>
          <span className="font-bold text-[#0f2b5c]">
            Mishkat<span className="text-[#d97706]">.</span>
          </span>
        </div>
      </div>
    </div>
  );
}
