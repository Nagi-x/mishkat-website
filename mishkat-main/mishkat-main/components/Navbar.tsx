"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  GraduationCap,
  ChevronDown,
  Search,
  ShoppingCart,
  ArrowRight,
  ArrowLeft,
  Menu,
  X,
  Globe,
  School,
  LogOut,
  User,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import SearchModal from "./SearchModal";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const { t, language, toggleLanguage, dir } = useLanguage();
  const { user, openAuthModal, logout } = useAuth();

  const ArrowIcon = dir === "rtl" ? ArrowLeft : ArrowRight;

  // Global Ctrl+K / Cmd+K listener for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="h-12 w-10 overflow-hidden rounded-xl bg-black shadow-md group-hover:scale-105 transition border border-amber-400/20">
              <Image
                src="/images/logo.jpeg"
                alt="Mishkat logo"
                width={240}
                height={320}
                className="h-full w-full object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-extrabold tracking-tight text-[#0f2b5c]">
                Mishkat<span className="text-[#d97706]">.</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-700">
            <Link href="/" className="text-[#d97706] hover:text-[#b45309] transition">
              {t.nav.home}
            </Link>
            <Link href="/courses" className="hover:text-[#d97706] transition flex items-center gap-1">
              <span>{t.nav.courses}</span>
              <span className="bg-amber-100 text-amber-800 text-[10px] font-black px-1.5 py-0.5 rounded-full">
                New
              </span>
            </Link>
            <Link href="/#about" className="hover:text-[#d97706] transition">
              {t.nav.about}
            </Link>

            <div className="relative group py-2">
              <button className="flex items-center gap-1 hover:text-[#d97706] transition cursor-pointer">
                <span>{t.nav.pages}</span>
                <ChevronDown className="w-4 h-4 text-slate-400 group-hover:rotate-180 transition" />
              </button>
              <div className="absolute top-full left-0 hidden group-hover:flex flex-col bg-white shadow-xl rounded-2xl border border-gray-100 p-2 min-w-[200px] z-50">
                <Link href="/#features" className="px-4 py-2 hover:bg-amber-50/70 hover:text-[#d97706] rounded-xl transition text-xs font-bold">
                  {t.nav.keyFeatures}
                </Link>
                <Link href="/faq" className="px-4 py-2 hover:bg-amber-50/70 hover:text-[#d97706] rounded-xl transition text-xs font-bold">
                  {language === "ar" ? "الأسئلة الشائعة (FAQ)" : "FAQ"}
                </Link>
                <Link href="/support" className="px-4 py-2 hover:bg-amber-50/70 hover:text-[#d97706] rounded-xl transition text-xs font-bold">
                  {language === "ar" ? "الدعم الفني" : "Technical Support"}
                </Link>
              </div>
            </div>

            <Link href="/#blog" className="hover:text-[#d97706] transition">
              {t.nav.blog}
            </Link>

            <Link href="/#trial" className="hover:text-[#d97706] transition">
              {t.nav.contact}
            </Link>
          </nav>

          {/* Right CTA & Controls */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* Language Switch Button */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 bg-amber-50 text-[#d97706] hover:bg-[#d97706] hover:text-white px-3 py-1.5 rounded-full text-xs font-bold transition border border-amber-200 cursor-pointer"
              title="Switch Language / تغيير اللغة"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{language === "en" ? "العربية" : "EN"}</span>
            </button>

            {/* Interactive Search Trigger */}
            <button
              onClick={() => setSearchModalOpen(true)}
              aria-label="Search platform"
              className="p-2 text-slate-600 hover:text-[#d97706] hover:bg-amber-50 rounded-full transition cursor-pointer relative group"
              title="Search (Ctrl+K)"
            >
              <Search className="w-5 h-5" />
              <span className="hidden xl:inline-block absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition text-[10px] bg-slate-900 text-white px-1.5 py-0.5 rounded shadow pointer-events-none whitespace-nowrap">
                Ctrl+K
              </span>
            </button>

            {/* User Profile or Registration CTAs */}
            {user ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200/80 px-3 py-1.5 rounded-full border border-slate-200 transition">
                  {user.role === "TEACHER" ? (
                    <School className="w-4 h-4 text-amber-600" />
                  ) : (
                    <GraduationCap className="w-4 h-4 text-[#0f2b5c]" />
                  )}
                  <span className="text-xs font-bold text-slate-800 max-w-[120px] truncate">
                    {user.name}
                  </span>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-400 text-slate-950">
                    {user.role}
                  </span>
                </div>

                <button
                  onClick={logout}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-full transition cursor-pointer"
                  title="Log out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                {/* Teacher Sign-Up Direct Button */}
                <button
                  type="button"
                  onClick={() => openAuthModal("register", "TEACHER")}
                  className="hidden md:flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-[#0f2b5c] hover:text-[#d97706] hover:bg-amber-50/70 rounded-full transition cursor-pointer border border-slate-200"
                >
                  <School className="w-3.5 h-3.5 text-[#d97706]" />
                  <span>{language === "ar" ? "تسجيل معلم" : "Teach With Us"}</span>
                </button>

                {/* Student Registration / Get Started Primary Button */}
                <button
                  type="button"
                  onClick={() => openAuthModal("register", "STUDENT")}
                  className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-[#d97706] to-[#f59e0b] hover:from-[#b45309] hover:to-[#d97706] text-white text-xs font-black uppercase tracking-wider px-5 py-2.5 rounded-full shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>{language === "ar" ? "تسجيل طالب" : "Student Sign-Up"}</span>
                </button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-[#d97706] transition rounded-lg"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-gray-200 px-4 pt-3 pb-6 space-y-3">
            {/* Mobile Search Button */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setSearchModalOpen(true);
              }}
              className="w-full flex items-center justify-between px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 mb-2 cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Search className="w-4 h-4 text-[#d97706]" />
                <span>{language === "ar" ? "ابحث في الدورات والموقع..." : "Search courses & platform..."}</span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Search</span>
            </button>

            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-bold text-[#d97706]"
            >
              {t.nav.home}
            </Link>
            <Link
              href="/courses"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-semibold text-slate-700 hover:text-[#d97706]"
            >
              {t.nav.courses}
            </Link>
            <Link
              href="/#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-semibold text-slate-700 hover:text-[#d97706]"
            >
              {t.nav.about}
            </Link>
            <Link
              href="/faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-semibold text-slate-700 hover:text-[#d97706]"
            >
              {language === "ar" ? "الأسئلة الشائعة (FAQ)" : "FAQ"}
            </Link>
            <Link
              href="/support"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-semibold text-slate-700 hover:text-[#d97706]"
            >
              {language === "ar" ? "الدعم الفني" : "Technical Support"}
            </Link>

            {/* Mobile Auth Actions */}
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              {user ? (
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5 text-[#d97706]" />
                    <div>
                      <span className="text-xs font-bold block text-slate-800">{user.name}</span>
                      <span className="text-[10px] text-amber-600 font-bold uppercase">{user.role}</span>
                    </div>
                  </div>
                  <button
                    onClick={logout}
                    className="text-xs font-bold text-rose-600 hover:underline cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openAuthModal("register", "STUDENT");
                    }}
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#d97706] to-[#f59e0b] text-white text-xs font-black uppercase py-3 rounded-xl shadow-md cursor-pointer"
                  >
                    <GraduationCap className="w-4 h-4" />
                    <span>{language === "ar" ? "تسجيل حساب طالب جديد" : "Register as Student"}</span>
                  </button>

                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openAuthModal("register", "TEACHER");
                    }}
                    className="flex items-center justify-center gap-2 bg-[#0f2b5c] text-amber-400 text-xs font-black uppercase py-3 rounded-xl shadow-md cursor-pointer"
                  >
                    <School className="w-4 h-4" />
                    <span>{language === "ar" ? "تسجيل حساب معلم / محاضر" : "Register as Teacher"}</span>
                  </button>

                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openAuthModal("login");
                    }}
                    className="text-xs font-bold text-slate-600 hover:text-[#d97706] py-1.5 text-center cursor-pointer"
                  >
                    {language === "ar" ? "لديك حساب بالفعل؟ تسجيل الدخول" : "Already have an account? Sign In"}
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Spotlight Search Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />
    </>
  );
}