"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, CheckCircle2, Sparkles, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function VideoSection() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#0b192e] via-[#0f2b5c] to-[#1e40af] rounded-3xl p-8 sm:p-12 lg:p-16 text-white relative shadow-2xl overflow-hidden border border-amber-400/20">

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

            {/* Right Video Thumbnail Card */}
            <div className="lg:col-span-6 relative flex justify-center">
              <div
                onClick={() => setIsVideoOpen(true)}
                className="relative w-full max-w-md aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-amber-400/30 cursor-pointer group"
              >
                <Image
                  src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop&q=80"
                  alt="Mishkat Video Intro"
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition" />

                {/* Pulse Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative flex items-center justify-center">
                    <div className="absolute w-20 h-20 rounded-full bg-amber-400/40 animate-ping" />
                    <div className="w-16 h-16 rounded-full bg-amber-400 text-[#0f2b5c] flex items-center justify-center shadow-xl group-hover:scale-110 transition duration-300">
                      <Play className="w-7 h-7 fill-[#0f2b5c] ml-1 rtl:mr-1 rtl:ml-0" />
                    </div>
                  </div>
                </div>

                {/* Tag Overlay */}
                <div className="absolute bottom-4 left-4 rtl:left-auto rtl:right-4 bg-[#0b192e]/90 backdrop-blur-md text-amber-400 text-xs font-bold px-3.5 py-1.5 rounded-lg border border-amber-400/30">
                  {t.video.watchDemo}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Video Modal Popup */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
          <div className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 text-white bg-slate-900/80 hover:bg-amber-500 hover:text-slate-900 rounded-full transition cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="aspect-video w-full">
              <iframe
                className="w-full h-full"
                src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Mishkat Overview Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
