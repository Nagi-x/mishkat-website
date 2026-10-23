"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowLeft, CheckCircle2, Sparkles, BookOpen } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutUs() {
  const { t, dir } = useLanguage();
  const ArrowIcon = dir === "rtl" ? ArrowLeft : ArrowRight;

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-white to-[#fffbeb] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Visual Image Composition */}
          <div className="lg:col-span-6 relative flex justify-center">
            {/* Background Circle Decorative Ring */}
            <div className="absolute w-[440px] h-[440px] rounded-full border-2 border-dashed border-[#d97706]/30 animate-spin-slow -z-0" />

            <div className="relative z-10 w-full max-w-lg aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
              <Image
                src="/images/about_students.png"
                alt="Students studying online"
                fill
                className="object-cover hover:scale-105 transition duration-500"
              />
            </div>

            {/* Floating Badge "LEARN ONLINE" */}
            <div className="absolute top-6 left-2 rtl:left-auto rtl:right-2 z-20 bg-gradient-to-r from-[#d97706] to-[#f59e0b] text-white px-5 py-2.5 rounded-full shadow-xl text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 border-2 border-white">
              <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
              <span>{t.about.badge}</span>
            </div>

            {/* Floating Decorative 3D Books Box */}
            <div className="absolute -bottom-6 right-2 rtl:right-auto rtl:left-2 z-20 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-amber-200 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#0f2b5c] to-[#1e40af] text-amber-400 flex items-center justify-center shadow-md">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm font-bold text-[#0f2b5c]">{t.about.libraryTitle}</div>
                <div className="text-xs text-slate-500 font-medium">{t.about.libraryDesc}</div>
              </div>
            </div>
          </div>

          {/* Right Text Content */}
          <div className="lg:col-span-6 space-y-6">

            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-[#d97706] bg-[#fef3c7] px-4 py-1.5 rounded-full border border-[#fde68a]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.about.tag}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f2b5c] tracking-tight leading-tight">
              {t.about.titlePrefix}<br />
              <span className="text-[#d97706]">Mishkat</span>
            </h2>

            <p className="text-slate-600 text-base leading-relaxed">
              {t.about.desc}
            </p>

            {/* Bullet Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-slate-100 shadow-xs">
                <CheckCircle2 className="w-5 h-5 text-[#d97706] flex-shrink-0" />
                <span className="text-sm font-bold text-[#0f2b5c]">{t.about.b1}</span>
              </div>

              <div className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-slate-100 shadow-xs">
                <CheckCircle2 className="w-5 h-5 text-[#d97706] flex-shrink-0" />
                <span className="text-sm font-bold text-[#0f2b5c]">{t.about.b2}</span>
              </div>
            </div>

            {/* Stat Counters */}
            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-slate-200/80">
              <div className="flex items-center gap-4">
                <div className="text-4xl font-extrabold text-[#d97706]">{t.about.s1Count}</div>
                <div className="text-xs font-semibold text-slate-600 leading-snug">
                  {t.about.s1Text}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-4xl font-extrabold text-[#0f2b5c]">{t.about.s2Count}</div>
                <div className="text-xs font-semibold text-slate-600 leading-snug">
                  {t.about.s2Text}
                </div>
              </div>
            </div>

            {/* Button */}
            <div className="pt-4">
              <Link
                href="#about"
                className="inline-flex items-center gap-2 bg-[#0f2b5c] hover:bg-[#0b192e] text-white text-xs font-bold uppercase tracking-wider px-7 py-4 rounded-full shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5"
              >
                <span>{t.about.moreAbout}</span>
                <ArrowIcon className="w-4 h-4 text-amber-400" />
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
