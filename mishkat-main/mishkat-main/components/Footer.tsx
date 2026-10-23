"use client";

import Link from "next/link";
import Image from "next/image";
import { GraduationCap, Mail, Phone, MapPin, Send } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-[#0b192e] text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Newsletter Subscribe Bar */}
        <div className="bg-gradient-to-r from-[#0f2b5c] via-[#1e40af] to-[#0f2b5c] rounded-2xl p-6 sm:p-8 mb-16 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-amber-400/20">
          <div className="space-y-1 text-center md:text-left rtl:md:text-right">
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              {t.footer.subscribeTitle}
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm">
              {t.footer.subscribeDesc}
            </p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="w-full md:w-auto flex items-center max-w-md bg-white rounded-full p-1.5 shadow-lg">
            <input
              type="email"
              placeholder={t.footer.placeholder}
              className="flex-1 px-4 py-2 text-xs sm:text-sm text-slate-800 focus:outline-none bg-transparent"
              required
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-[#d97706] to-[#f59e0b] hover:from-[#b45309] hover:to-[#d97706] text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-full flex items-center gap-2 transition cursor-pointer"
            >
              <span>{t.footer.subscribeBtn}</span>
              <Send className="w-3.5 h-3.5 rtl:rotate-180" />
            </button>
          </form>
        </div>

        {/* Multi-column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">

          {/* Column 1: Logo & About */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="h-11 w-9 overflow-hidden rounded-xl bg-black shadow-md border border-amber-400/20">
                <Image
                  src="/images/logo.jpeg"
                  alt="Mishkat logo"
                  width={240}
                  height={320}
                  className="h-full w-full object-contain"
                />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white">
                Mishkat<span className="text-[#f59e0b]">.</span>
              </span>
            </Link>

            <p className="text-slate-400 text-xs leading-relaxed">
              {t.footer.desc}
            </p>

            <div className="space-y-2 text-xs text-slate-400 pt-2">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#f59e0b] shrink-0" />
                <a href="tel:0780984056" className="hover:text-amber-400 transition" dir="ltr">
                  0780984056
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#f59e0b] shrink-0" />
                <a href="mailto:mishkatclub4@gmail.com" className="hover:text-amber-400 transition">
                  mishkatclub4@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#f59e0b] shrink-0" />
                <span>Touggourt</span>
              </div>
            </div>
          </div>

          {/* Column 2: Online Platform */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 rtl:border-l-0 rtl:border-r-2 border-[#f59e0b] pl-3 rtl:pl-0 rtl:pr-3">
              {t.footer.platformTitle}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><Link href="#about" className="hover:text-amber-400 transition">{t.footer.aboutLink}</Link></li>
              <li><Link href="#courses" className="hover:text-amber-400 transition">{t.footer.allProgramsLink}</Link></li>
              <li><Link href="#trial" className="hover:text-amber-400 transition">{t.footer.startTrialLink}</Link></li>
              <li><Link href="#pricing" className="hover:text-amber-400 transition">{t.footer.pricingLink}</Link></li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 rtl:border-l-0 rtl:border-r-2 border-[#f59e0b] pl-3 rtl:pl-0 rtl:pr-3">
              {t.footer.quickLinksTitle}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><Link href="/#features" className="hover:text-amber-400 transition">{t.footer.keyFeaturesLink}</Link></li>
              <li><Link href="/#blog" className="hover:text-amber-400 transition">{t.footer.mishkatBlogLink}</Link></li>
              <li><Link href="/faq" className="hover:text-amber-400 transition">{language === "ar" ? "الأسئلة الشائعة" : "FAQ"}</Link></li>
              <li><Link href="/support" className="hover:text-amber-400 transition">{language === "ar" ? "الدعم الفني" : "Technical Support"}</Link></li>
              <li><Link href="#terms" className="hover:text-amber-400 transition">{t.footer.termsLink}</Link></li>
              <li><Link href="#privacy" className="hover:text-amber-400 transition">{t.footer.privacyLink}</Link></li>
            </ul>
          </div>

          {/* Column 4: Recent Posts */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 rtl:border-l-0 rtl:border-r-2 border-[#f59e0b] pl-3 rtl:pl-0 rtl:pr-3">
              {t.footer.recentPostsTitle}
            </h4>
            <div className="space-y-3">
              <div className="flex gap-3 items-center">
                <div className="w-12 h-12 rounded-lg bg-slate-800 flex-shrink-0 overflow-hidden relative">
                  <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=100&auto=format&fit=crop&q=80" alt="Post" className="object-cover w-full h-full" />
                </div>
                <div>
                  <Link href="#blog" className="text-xs font-semibold text-white hover:text-amber-400 transition line-clamp-2">
                    10 Proven Strategies to Accelerate Learning
                  </Link>
                  <span className="text-[10px] text-slate-500">Sep 01, 2026</span>
                </div>
              </div>

              <div className="flex gap-3 items-center">
                <div className="w-12 h-12 rounded-lg bg-slate-800 flex-shrink-0 overflow-hidden relative">
                  <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=100&auto=format&fit=crop&q=80" alt="Post" className="object-cover w-full h-full" />
                </div>
                <div>
                  <Link href="#blog" className="text-xs font-semibold text-white hover:text-amber-400 transition line-clamp-2">
                    The Future of AI in Modern Classrooms
                  </Link>
                  <span className="text-[10px] text-slate-500">Aug 28, 2026</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 <strong className="text-slate-300">Mishkat</strong>. {t.footer.copyright}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://web.facebook.com/people/Mish-Kat/61573295143518/?rdid=tP226ecVOfwIsmiU&share_url=https%3A%2F%2Fweb.facebook.com%2Fshare%2F19cp7win18%2F%3F_rdc%3D1%26_rdr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-[#d97706] transition flex items-center justify-center cursor-pointer"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg>
            </a>
            <a
              href="https://www.instagram.com/mishkat_club"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-[#d97706] transition flex items-center justify-center cursor-pointer"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
