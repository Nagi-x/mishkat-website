"use client";

import Image from "next/image";
import { Star, Sparkles, User as UserIcon } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export interface InstructorItem {
  id: string | number;
  name: string;
  role?: string;
  rating?: number;
  image?: string;
  bio?: string;
  bgColor?: string;
}

export interface InstructorsSectionProps {
  instructors?: InstructorItem[];
}

export default function InstructorsSection({ instructors = [] }: InstructorsSectionProps) {
  const { t } = useLanguage();

  // If no instructors exist from DB yet, render nothing
  if (!instructors || instructors.length === 0) {
    return null;
  }

  return (
    <section id="instructors" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-[#d97706] bg-[#fef3c7] px-4 py-1.5 rounded-full border border-[#fde68a]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.instructorsSection.tag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f2b5c] tracking-tight leading-tight">
            {t.instructorsSection.title}
          </h2>
        </div>

        {/* Grid of Real Instructors from DB */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {instructors.map((ins) => (
            <div
              key={ins.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group hover:-translate-y-1.5"
            >
              {/* Photo Box */}
              <div className={`relative w-full aspect-square rounded-2xl overflow-hidden mb-5 ${ins.bgColor || "bg-amber-50"}`}>
                {ins.image ? (
                  <Image
                    src={ins.image}
                    alt={ins.name}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400">
                    <UserIcon className="w-16 h-16" />
                  </div>
                )}
              </div>

              {/* Info */}
              <h3 className="text-xl font-bold text-[#0f2b5c] mb-1 group-hover:text-[#d97706] transition">
                {ins.name}
              </h3>
              {ins.role && (
                <p className="text-xs text-slate-500 font-semibold mb-3">
                  {ins.role}
                </p>
              )}

              {typeof ins.rating === "number" && (
                <div className="flex items-center gap-1 text-xs text-amber-500 font-bold bg-amber-50 px-3 py-1 rounded-full border border-amber-200 mt-auto">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{ins.rating.toFixed(1)} Rating</span>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
