"use client";

"use client";

import Link from "next/link";
import { ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function CtaBanner() {
  const { t, dir } = useLanguage();
  const ArrowIcon = dir === "rtl" ? ArrowLeft : ArrowRight;

  return (
    <section id="trial" className="py-16 bg-gradient-to-r from-[#0b192e] via-[#0f2b5c] to-[#1e40af] text-white relative overflow-hidden border-y border-amber-400/20">

      {/* Background Shapes */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">

        <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest bg-amber-400/20 text-amber-300 px-4 py-1.5 rounded-full backdrop-blur-md border border-amber-400/30">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t.cta.tag}</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight max-w-4xl mx-auto text-white whitespace-pre-line">
          {t.cta.title}
        </h2>

        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          {t.cta.desc}
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="#trial"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#d97706] to-[#f59e0b] hover:from-[#b45309] hover:to-[#d97706] text-white text-xs font-bold uppercase tracking-wider px-8 py-4 rounded-full shadow-2xl transition transform hover:-translate-y-0.5"
          >
            <span>{t.cta.btn}</span>
            <ArrowIcon className="w-4 h-4 text-white" />
          </Link>
        </div>

      </div>
    </section>
  );
}
