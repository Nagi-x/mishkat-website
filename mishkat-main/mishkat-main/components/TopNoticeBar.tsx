"use client";

import Link from "next/link";
import { LogIn, User, Sparkles, Globe, LogOut, ShieldCheck, School, GraduationCap } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";

export default function TopNoticeBar() {
  const { t, language, toggleLanguage } = useLanguage();
  const { user, openAuthModal, logout } = useAuth();

  return (
    <div className="bg-[#0b192e] text-gray-300 text-xs py-2 px-4 border-b border-[#1e293b]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 font-medium">
          <span className="flex h-2 w-2 rounded-full bg-[#f59e0b] animate-ping" />
          <Sparkles className="w-3.5 h-3.5 text-[#f59e0b]" />
          <span>
            {t.notice.welcome} <strong className="text-amber-400">{t.notice.brand}</strong> {t.notice.tagline}
          </span>
        </div>

        <div className="flex items-center gap-5">
          <div className="hidden sm:flex items-center gap-4 text-slate-400">
            <Link
              href="/support"
              id="topbar-support-link"
              className="hover:text-amber-400 transition cursor-pointer"
            >
              {t.notice.support}
            </Link>
            <Link
              href="/faq"
              id="topbar-faq-link"
              className="hover:text-amber-400 transition cursor-pointer"
            >
              {t.notice.faq}
            </Link>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 bg-[#1e293b] hover:bg-amber-500 hover:text-slate-900 text-amber-400 px-2.5 py-1 rounded-full text-[11px] font-bold transition duration-200 cursor-pointer border border-amber-400/30"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{t.notice.langSwitch}</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 bg-[#1e293b] px-3 py-1 rounded-full border border-amber-400/20 text-white font-semibold">
                  {user.role === "TEACHER" ? (
                    <School className="w-3.5 h-3.5 text-amber-400" />
                  ) : user.role === "ADMIN" ? (
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
                  )}
                  <span>{user.name}</span>
                  <span className="text-[10px] text-amber-400/90 uppercase font-mono font-bold bg-amber-950/60 px-1.5 py-0.5 rounded">
                    {user.role}
                  </span>
                </div>

                <button
                  onClick={logout}
                  className="flex items-center gap-1 text-slate-400 hover:text-rose-400 transition cursor-pointer font-medium"
                  title="Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => openAuthModal("register", "STUDENT")}
                  className="flex items-center gap-1 text-amber-300 hover:text-white transition font-bold cursor-pointer"
                >
                  <GraduationCap className="w-3.5 h-3.5 text-[#f59e0b]" />
                  <span>{language === "ar" ? "تسجيل طالب" : "Student Sign-Up"}</span>
                </button>

                <span className="text-slate-600">|</span>

                <button
                  onClick={() => openAuthModal("register", "TEACHER")}
                  className="flex items-center gap-1 text-slate-300 hover:text-amber-400 transition font-medium cursor-pointer"
                >
                  <School className="w-3.5 h-3.5 text-[#f59e0b]" />
                  <span>{language === "ar" ? "تسجيل معلم" : "Teacher Sign-Up"}</span>
                </button>

                <span className="text-slate-600">|</span>

                <button
                  onClick={() => openAuthModal("login")}
                  className="flex items-center gap-1 text-slate-300 hover:text-amber-400 transition font-medium cursor-pointer"
                >
                  <LogIn className="w-3.5 h-3.5 text-[#f59e0b]" />
                  <span>{t.notice.login}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
