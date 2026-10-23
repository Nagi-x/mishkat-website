"use client";

"use client";

import { MonitorPlay, Users, ShieldCheck, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function CoreFeatures() {
  const { t } = useLanguage();

  const features = [
    {
      id: 1,
      title: t.features.f1Title,
      description: t.features.f1Desc,
      bgColor: "bg-[#fffbeb]",
      borderColor: "border-[#fde68a]",
      iconBg: "bg-[#d97706]",
      icon: MonitorPlay,
    },
    {
      id: 2,
      title: t.features.f2Title,
      description: t.features.f2Desc,
      bgColor: "bg-[#eff6ff]",
      borderColor: "border-[#dbeafe]",
      iconBg: "bg-[#0f2b5c]",
      icon: Users,
    },
    {
      id: 3,
      title: t.features.f3Title,
      description: t.features.f3Desc,
      bgColor: "bg-[#fefce8]",
      borderColor: "border-[#fef08a]",
      iconBg: "bg-[#ca8a04]",
      icon: ShieldCheck,
    },
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-[#d97706] bg-[#fef3c7] px-4 py-1.5 rounded-full border border-[#fde68a]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.features.tag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f2b5c] tracking-tight leading-tight whitespace-pre-line">
            {t.features.title}
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className={`${feature.bgColor} border ${feature.borderColor} rounded-3xl p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 flex flex-col justify-between group`}
              >
                <div>
                  <div className={`w-14 h-14 rounded-2xl ${feature.iconBg} text-white flex items-center justify-center shadow-md mb-6 group-hover:scale-110 transition duration-300`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#0f2b5c] mb-3 group-hover:text-[#d97706] transition">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-slate-200/50 flex items-center text-xs font-bold text-slate-700 group-hover:text-[#d97706] transition">
                  <span>{t.features.learnMore}</span>
                  <span className="mx-1 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition duration-200">→</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
