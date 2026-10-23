"use client";

import Image from "next/image";
import { Star, Sparkles, Quote, CheckCircle2, User as UserIcon } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export interface TestimonialItem {
  id: string | number;
  name: string;
  role?: string;
  quote: string;
  rating?: number;
  image?: string;
  verified?: boolean;
}

export interface TestimonialsSectionProps {
  testimonials?: TestimonialItem[];
}

export default function TestimonialsSection({ testimonials = [] }: TestimonialsSectionProps) {
  const { t } = useLanguage();

  // If no testimonials exist from DB yet, render nothing
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section id="testimonials" className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-[#d97706] bg-[#fef3c7] px-4 py-1.5 rounded-full border border-[#fde68a]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.testimonials.tag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f2b5c] tracking-tight leading-tight">
            {t.testimonials.title}
          </h2>
        </div>

        {/* Dynamic Reviews from DB */}
        <div className="space-y-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-gradient-to-br from-[#fffbeb] via-white to-[#fffdf5] rounded-3xl p-8 sm:p-12 border border-[#fde68a] shadow-xl relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <Quote className="absolute top-6 right-8 rtl:right-auto rtl:left-8 w-24 h-24 text-[#d97706]/10 pointer-events-none" />

              {/* Student Avatar / Badge */}
              <div className="lg:col-span-4 flex justify-center">
                <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full p-2 bg-gradient-to-tr from-[#0f2b5c] to-[#1e40af] shadow-xl">
                  <div className="w-full h-full rounded-full overflow-hidden relative border-4 border-white bg-slate-100 flex items-center justify-center">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <UserIcon className="w-16 h-16 text-slate-400" />
                    )}
                  </div>
                  {item.verified && (
                    <div className="absolute -bottom-2 right-4 rtl:right-auto rtl:left-4 bg-[#d97706] text-white p-2.5 rounded-full shadow-lg border-2 border-white" title="Verified Learner">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                  )}
                </div>
              </div>

              {/* Quote Content */}
              <div className="lg:col-span-8 space-y-4 text-slate-800">
                {item.rating && item.rating > 0 && (
                  <div className="flex text-amber-500 gap-1">
                    {Array.from({ length: Math.min(5, Math.max(1, Math.round(item.rating))) }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                )}

                <blockquote className="text-xl sm:text-2xl font-semibold italic text-[#0f2b5c] leading-relaxed">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>

                <div>
                  <div className="text-lg font-bold text-slate-900">{item.name}</div>
                  {item.role && (
                    <div className="text-sm font-semibold text-[#d97706]">{item.role}</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
