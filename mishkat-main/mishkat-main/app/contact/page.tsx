"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  Sparkles,
  Headphones,
  HelpCircle,
  Clock,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const { language, dir } = useLanguage();
  const ArrowIcon = dir === "rtl" ? ArrowLeft : ArrowRight;

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans" dir={dir}>
      {/* Header */}
      <section className="bg-gradient-to-b from-[#0b192e] via-[#0f2b5c] to-[#0b192e] text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-amber-400/20 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 bg-slate-900/60 px-3.5 py-1.5 rounded-full border border-slate-700/60">
            <Link href="/" className="hover:text-amber-400 transition">
              {language === "ar" ? "الرئيسية" : "Home"}
            </Link>
            <span className="text-slate-600">/</span>
            <span className="text-amber-400 font-bold">
              {language === "ar" ? "اتصل بنا" : "Contact Us"}
            </span>
          </div>

          <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest bg-amber-400/20 text-amber-300 px-4 py-1.5 rounded-full backdrop-blur-md border border-amber-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === "ar" ? "تواصل مع مشكاة" : "GET IN TOUCH"}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {language === "ar" ? (
              <>نحن هنا <span className="text-amber-400">للاستماع</span> إليك</>
            ) : (
              <>We are Here to <span className="text-amber-400">Help You</span></>
            )}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            {language === "ar"
              ? "لديك استفسار عام، شراكة، أو ترغب في معرفة المزيد عن برامجنا؟ تواصل معنا عبر النموذج أو قنوات الاتصال."
              : "Have a general question, partnership opportunity, or want to know more? Contact us directly."}
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Info Side */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-5">
              <h3 className="text-lg font-bold text-slate-900">
                {language === "ar" ? "معلومات التواصل" : "Contact Information"}
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <a
                  href="tel:0780984056"
                  className="flex items-start gap-3.5 p-3 rounded-xl bg-slate-50 hover:bg-amber-50/70 border border-slate-100 hover:border-amber-200 transition"
                >
                  <Phone className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                  <div>
                    <span className="block text-[11px] font-bold text-slate-400 uppercase">
                      {language === "ar" ? "الهاتف" : "Phone"}
                    </span>
                    <span className="font-bold text-slate-800" dir="ltr">0780984056</span>
                  </div>
                </a>

                <a
                  href="mailto:mishkatclub4@gmail.com"
                  className="flex items-start gap-3.5 p-3 rounded-xl bg-slate-50 hover:bg-amber-50/70 border border-slate-100 hover:border-amber-200 transition"
                >
                  <Mail className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                  <div>
                    <span className="block text-[11px] font-bold text-slate-400 uppercase">
                      {language === "ar" ? "البريد الإلكتروني" : "Email"}
                    </span>
                    <span className="font-bold text-slate-800">mishkatclub4@gmail.com</span>
                  </div>
                </a>

                <div className="flex items-start gap-3.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <MapPin className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                  <div>
                    <span className="block text-[11px] font-bold text-slate-400 uppercase">
                      {language === "ar" ? "العنوان" : "Address"}
                    </span>
                    <span className="font-bold text-slate-800">Touggourt, Algeria</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <Clock className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <div>
                    <span className="block text-[11px] font-bold text-slate-400 uppercase">
                      {language === "ar" ? "ساعات العمل" : "Hours"}
                    </span>
                    <span className="font-semibold text-slate-700">
                      {language === "ar" ? "الأحد - الخميس: 09:00 - 18:00" : "Sun - Thu: 09:00 - 18:00"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Direct Support Shortcut */}
              <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                <Link
                  href="/support"
                  className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-[#0f2b5c] to-[#1e40af] text-white text-xs font-bold hover:opacity-95 transition"
                >
                  <span className="flex items-center gap-2">
                    <Headphones className="w-4 h-4 text-amber-400" />
                    <span>{language === "ar" ? "تحتاج دعم فني متخصص؟" : "Need Technical Support?"}</span>
                  </span>
                  <ArrowIcon className="w-3.5 h-3.5 text-amber-400" />
                </Link>

                <Link
                  href="/faq"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs font-bold transition"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-[#d97706]" />
                    <span>{language === "ar" ? "الأسئلة الشائعة (FAQ)" : "Browse FAQ"}</span>
                  </span>
                  <ArrowIcon className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              {submitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">
                    {language === "ar" ? "تم إرسال رسالتك بنجاح!" : "Message Sent Successfully!"}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
                    {language === "ar"
                      ? "شكراً لتواصلك معنا. سنقوم بالرد عليك عبر بريدك الإلكتروني في أقرب وقت."
                      : "Thank you for getting in touch. We will reply to your email as soon as possible."}
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", message: "" });
                    }}
                    className="inline-flex items-center gap-2 bg-[#0f2b5c] text-white text-xs font-bold px-6 py-2.5 rounded-full hover:bg-[#1e40af] transition cursor-pointer"
                  >
                    <span>{language === "ar" ? "إرسال رسالة أخرى" : "Send Another Message"}</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-xl font-extrabold text-slate-900">
                      {language === "ar" ? "أرسل لنا رسالة" : "Send Us a Message"}
                    </h3>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {language === "ar" ? "الاسم *" : "Your Name *"}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {language === "ar" ? "البريد الإلكتروني *" : "Your Email *"}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {language === "ar" ? "الرسالة *" : "Message *"}
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-slate-50/50 resize-y"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#d97706] to-[#f59e0b] hover:from-[#b45309] hover:to-[#d97706] text-white text-xs font-bold uppercase tracking-wider py-3.5 px-6 rounded-full shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{language === "ar" ? "إرسال الرسالة" : "Send Message"}</span>
                    <Send className="w-3.5 h-3.5 rtl:rotate-180" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}