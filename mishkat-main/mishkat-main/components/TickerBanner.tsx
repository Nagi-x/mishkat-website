"use client";

"use client";

import { Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function TickerBanner() {
  const { t } = useLanguage();
  const items = t.ticker;

  return (
    <div className="bg-[#0f2b5c] text-white py-4 overflow-hidden shadow-inner border-y border-amber-400/20">
      <div className="flex animate-marquee whitespace-nowrap">
        {/* Repeat list twice to create seamless loop */}
        {[...items, ...items, ...items, ...items].map((item, index) => (
          <div key={index} className="flex items-center mx-8">
            <span className="text-sm sm:text-base font-extrabold uppercase tracking-widest font-mono text-slate-100">
              {item}
            </span>
            <Sparkles className="w-4 h-4 ml-8 rtl:ml-0 rtl:mr-8 text-amber-400 flex-shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}
