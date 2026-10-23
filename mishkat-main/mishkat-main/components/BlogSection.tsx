"use client";

"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function BlogSection() {
  const { t, dir } = useLanguage();
  const ArrowIcon = dir === "rtl" ? ArrowLeft : ArrowRight;

  const posts = [
    {
      id: 1,
      title: "10 Proven Strategies to Accelerate Your Online Learning Journey",
      category: "Education",
      date: "Sep 01, 2026",
      author: "Admin",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: 2,
      title: "The Future of AI in Modern Classroom Pedagogy and Skill Training",
      category: "Technology",
      date: "Aug 28, 2026",
      author: "Mishkat Team",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: 3,
      title: "How to Build a High-Paying Remote Career with Digital Certifications",
      category: "Career Support",
      date: "Aug 20, 2026",
      author: "Sarah J.",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80",
    },
  ];

  return (
    <section id="blog" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-[#d97706] bg-[#fef3c7] px-4 py-1.5 rounded-full border border-[#fde68a]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.blog.tag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f2b5c] tracking-tight leading-tight">
            {t.blog.title}
          </h2>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1.5"
            >
              {/* Thumbnail */}
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-4 left-4 bg-[#0f2b5c] text-amber-400 text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                  {post.category}
                </div>
              </div>

              {/* Info */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">

                <div className="space-y-3">
                  <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#d97706]" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-[#d97706]" />
                      <span>{post.author}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-[#0f2b5c] leading-snug group-hover:text-[#d97706] transition line-clamp-2">
                    {post.title}
                  </h3>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center text-xs font-bold text-[#d97706] group-hover:underline">
                  <span>{t.blog.readMore}</span>
                  <ArrowIcon className="w-3.5 h-3.5 ml-1.5 rtl:ml-0 rtl:mr-1.5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition duration-200" />
                </div>

              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
