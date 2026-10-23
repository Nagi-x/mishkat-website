"use client";

import { CheckCircle2, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function VideoSection() {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-white dark:bg-slate-900 relative overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#0b192e] via-[#0f2b5c] to-[#1e40af] dark:from-[#070f1e] dark:via-[#0a1c3d] dark:to-[#13286b] rounded-3xl p-8 sm:p-12 lg:p-16 text-white relative shadow-2xl overflow-hidden border border-amber-400/20 dark:border-amber-400/30">

          {/* Ambient Background Circles */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">

            {/* Left Text Info */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest bg-amber-400/20 text-amber-300 px-4 py-1.5 rounded-full backdrop-blur-md border border-amber-400/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t.video.tag}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white">
                {t.video.title}
              </h2>

              <p className="text-slate-300 text-base leading-relaxed">
                {t.video.desc}
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0" />
                  <span className="font-semibold text-sm">{t.video.b1}</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0" />
                  <span className="font-semibold text-sm">{t.video.b2}</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0" />
                  <span className="font-semibold text-sm">{t.video.b3}</span>
                </div>
              </div>
            </div>

            {/* Centered Placeholder */}
            <div className="lg:col-span-6 relative flex justify-center items-center">
              <div className="w-full max-w-md aspect-video rounded-2xl border-2 border-dashed border-amber-400/40 bg-white/5 dark:bg-black/30 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center shadow-xl">
                <span className="text-3xl sm:text-4xl font-extrabold text-amber-400 tracking-wide">
                  قريباً
                </span>
                <span className="text-xs sm:text-sm font-semibold text-slate-300 dark:text-slate-400 mt-2 uppercase tracking-widest">
                  Coming soon
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

