"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Star,
  Sparkles,
  GraduationCap,
  School,
  Search,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";

export default function Hero() {
  const { t, language, dir } = useLanguage();
  const { user, openAuthModal } = useAuth();
  const ArrowIcon = dir === "rtl" ? ArrowLeft : ArrowRight;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#fffbeb] via-[#fffdf5] to-white pt-10 pb-20 lg:pt-16 lg:pb-28">

      {/* Background soft ambient blobs */}
      <div className="absolute top-10 left-1/4 w-72 h-72 bg-[#f59e0b]/15 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#0f2b5c]/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Column Content */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">

            {/* Top Guarantee Pill */}
            <div className="inline-flex items-center gap-2 bg-[#fef3c7] text-[#92400e] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide border border-[#fde68a]">
              <CheckCircle2 className="w-4 h-4 text-[#d97706]" />
              <span>{t.hero.guarantee}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0f2b5c] tracking-tight leading-[1.15]">
              {t.hero.headlinePrefix} <span className="text-[#d97706] relative inline-block">
                Mishkat
                <svg className="absolute -bottom-2 left-0 w-full text-[#f59e0b]/40" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0,10 Q50,20 100,10" stroke="currentColor" strokeWidth="6" fill="none" />
                </svg>
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              {t.hero.subtext}
            </p>

            {/* Action Buttons with direct Student & Teacher registration triggers */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  if (user) {
                    const el = document.getElementById("courses");
                    el?.scrollIntoView({ behavior: "smooth" });
                  } else {
                    openAuthModal("register", "STUDENT");
                  }
                }}
                className="flex items-center gap-2 bg-gradient-to-r from-[#d97706] to-[#f59e0b] hover:from-[#b45309] hover:to-[#d97706] text-white text-xs sm:text-sm font-black uppercase tracking-wider px-6 sm:px-7 py-4 rounded-full shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5 cursor-pointer"
              >
                <GraduationCap className="w-4 h-4" />
                <span>
                  {user
                    ? language === "ar"
                      ? "تصفح الدورات"
                      : "Explore Courses"
                    : language === "ar"
                      ? "تسجيل كطالب"
                      : "Student Sign-Up"}
                </span>
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                  <ArrowIcon className="w-3.5 h-3.5 text-white" />
                </div>
              </button>

              {!user && (
                <button
                  type="button"
                  onClick={() => openAuthModal("register", "TEACHER")}
                  className="flex items-center gap-2 bg-[#0f2b5c] hover:bg-[#0b192e] text-amber-400 text-xs sm:text-sm font-black uppercase tracking-wider px-6 py-4 rounded-full shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5 cursor-pointer border border-amber-400/30"
                >
                  <School className="w-4 h-4" />
                  <span>{language === "ar" ? "تسجيل كمعلم / محاضر" : "Teacher Sign-Up"}</span>
                </button>
              )}

              <Link
                href="/courses"
                className="flex items-center gap-2 bg-white hover:bg-slate-50 text-[#0f2b5c] border-2 border-slate-200 text-xs sm:text-sm font-bold uppercase tracking-wider px-5 py-4 rounded-full transition shadow-xs hover:border-[#d97706]"
              >
                <span>{language === "ar" ? "فهرس الدورات" : "Course Catalog"}</span>
                <ArrowIcon className="w-4 h-4 text-slate-500" />
              </Link>
            </div>

            {/* Social Proof & Rating Box */}
            <div className="pt-6 flex flex-wrap items-center gap-6 border-t border-slate-200/80 w-full">
              {/* Avatars */}
              <div className="flex items-center -space-x-3 rtl:space-x-reverse">
                <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-slate-200">
                  <Image src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Student" width={40} height={40} className="object-cover" />
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-slate-200">
                  <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="Student" width={40} height={40} className="object-cover" />
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-slate-200">
                  <Image src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" alt="Student" width={40} height={40} className="object-cover" />
                </div>
                <div className="w-10 h-10 rounded-full bg-[#0f2b5c] border-2 border-white text-amber-400 text-xs font-bold flex items-center justify-center">
                  130+
                </div>
              </div>

              {/* Rating Text */}
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <div className="flex text-amber-500">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  </div>
                  <span className="text-sm font-bold text-slate-800 ml-1">{t.hero.ratings}</span>
                </div>
                <span className="text-xs text-slate-500 font-medium">
                  {t.hero.dailyStudents}
                </span>
              </div>
            </div>

          </div>

          {/* Right Column Visual Media */}
          <div className="lg:col-span-5 relative flex justify-center items-center">

            {/* Background Arch Pill */}
            <div className="relative w-full max-w-[420px] aspect-[4/5] bg-gradient-to-br from-[#0f2b5c] via-[#1e40af] to-[#0f2b5c] rounded-[48px] p-2 shadow-2xl overflow-hidden flex items-end justify-center border-2 border-amber-400/30">

              {/* Inner Decorative Amber Backdrop */}
              <div className="absolute inset-x-4 top-4 bottom-0 bg-[#fffbeb] rounded-[40px] -z-0" />

              {/* Generated Instructor Image */}
              <div className="relative z-10 w-full h-[95%] flex items-end justify-center">
                <Image
                  src="/images/hero_instructor.png"
                  alt="Mishkat Instructor"
                  width={380}
                  height={450}
                  className="object-cover object-top rounded-b-[40px] drop-shadow-xl"
                  priority
                />
              </div>

              {/* Floating Overlay Badge: 130+ Expert Instructor */}
              <div className="absolute top-8 left-4 rtl:left-auto rtl:right-4 z-20 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-amber-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#fef3c7] flex items-center justify-center text-[#d97706]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">{t.hero.expertCount}</div>
                  <div className="text-[11px] font-semibold text-slate-500">{t.hero.expertLabel}</div>
                </div>
              </div>

              {/* Floating Star Badge */}
              <div className="absolute bottom-10 right-4 rtl:right-auto rtl:left-4 z-20 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-full shadow-lg border border-amber-200 flex items-center gap-2">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="text-xs font-extrabold text-[#0f2b5c]">{t.hero.topRated}</span>
              </div>

            </div>

            {/* Background Decorative Graphic Elements */}
            <div className="absolute -top-6 -right-6 rtl:-left-6 rtl:right-auto w-20 h-20 text-[#d97706]/30 pointer-events-none">
              <svg viewBox="0 0 100 100" fill="currentColor">
                <circle cx="20" cy="20" r="6" />
                <circle cx="50" cy="20" r="6" />
                <circle cx="80" cy="20" r="6" />
                <circle cx="20" cy="50" r="6" />
                <circle cx="50" cy="50" r="6" />
                <circle cx="80" cy="50" r="6" />
                <circle cx="20" cy="80" r="6" />
                <circle cx="50" cy="80" r="6" />
                <circle cx="80" cy="80" r="6" />
              </svg>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
