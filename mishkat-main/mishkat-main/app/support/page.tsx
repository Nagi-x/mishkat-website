"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Headphones,
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  AlertCircle,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  FileQuestion,
  RefreshCw,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Footer from "@/components/Footer";

export default function SupportPage() {
  const { language, dir } = useLanguage();
  const ArrowIcon = dir === "rtl" ? ArrowLeft : ArrowRight;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "video",
    priority: "normal",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<{
    ticketId: string;
    name: string;
    email: string;
    subject: string;
  } | null>(null);

  const categories = [
    { value: "video", label_en: "Video Playback & Lecture Streaming", label_ar: "مشاكل تشغيل الفيديو والمحاضرات" },
    { value: "account", label_en: "Account Login & Access", label_ar: "تسجيل الدخول والوصول للحساب" },
    { value: "certificate", label_en: "Course Certificate & Verification", label_ar: "الشهادات والتحقق من الاعتماد" },
    { value: "payment", label_en: "Billing & Invoicing Inquiries", label_ar: "استفسارات الدفع والاشتراكات" },
    { value: "instructor", label_en: "Instructor Tools & Uploading", label_ar: "أدوات المعلمين ورفع المحتوى" },
    { value: "other", label_en: "Other Technical Issue", label_ar: "مشكلة تقنية أخرى" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) return;

    setIsSubmitting(true);

    // Simulate reliable API ticket creation
    setTimeout(() => {
      const generatedId = `MSK-${Math.floor(10000 + Math.random() * 90000)}`;
      setSubmittedTicket({
        ticketId: generatedId,
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
      });
      setIsSubmitting(false);
    }, 600);
  };

  const handleResetForm = () => {
    setSubmittedTicket(null);
    setFormData({
      name: "",
      email: "",
      category: "video",
      priority: "normal",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans" dir={dir}>
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#0b192e] via-[#0f2b5c] to-[#0b192e] text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-amber-400/20 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-4">
          {/* Breadcrumb */}
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 bg-slate-900/60 px-3.5 py-1.5 rounded-full border border-slate-700/60">
            <Link href="/" className="hover:text-amber-400 transition">
              {language === "ar" ? "الرئيسية" : "Home"}
            </Link>
            <span className="text-slate-600">/</span>
            <span className="text-amber-400 font-bold">
              {language === "ar" ? "الدعم الفني" : "Technical Support"}
            </span>
          </div>

          <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest bg-amber-400/20 text-amber-300 px-4 py-1.5 rounded-full backdrop-blur-md border border-amber-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === "ar" ? "مركز المساعدة والمساندة التقنية" : "DEDICATED SUPPORT DESK"}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {language === "ar" ? (
              <>فريق <span className="text-amber-400">الدعم الفني</span> في خدمتك</>
            ) : (
              <>Technical <span className="text-amber-400">Support Desk</span></>
            )}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            {language === "ar"
              ? "هل تواجه مشكلة تقنية أو صعوبة في تشغيل الدروس؟ تواصل مع فريقنا المتخصص وسنقوم بمساعدتك وحل المشكلة فوراً."
              : "Need help with video playback, your account, or course access? Submit a support ticket or contact our technical team directly."}
          </p>
        </div>
      </section>

      {/* Main Support Grid */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Contact Info & Shortcuts (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Contact Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {language === "ar" ? "قنوات التواصل المباشرة" : "Direct Support Channels"}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {language === "ar"
                    ? "يمكنك الاتصال بنا هاتفياً أو مراسلتنا في أي وقت وسنكون سعداء بمساعدتك."
                    : "Reach out directly via phone or email for prompt assistance."}
                </p>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                <a
                  href="tel:0780984056"
                  className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-50 hover:bg-amber-50/70 border border-slate-100 hover:border-amber-200 transition group"
                >
                  <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold text-slate-400 uppercase">
                      {language === "ar" ? "الهاتف المباشر" : "Direct Phone Support"}
                    </span>
                    <span className="font-bold text-slate-800 text-sm" dir="ltr">
                      0780984056
                    </span>
                  </div>
                </a>

                <a
                  href="mailto:mishkatclub4@gmail.com"
                  className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-50 hover:bg-amber-50/70 border border-slate-100 hover:border-amber-200 transition group"
                >
                  <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold text-slate-400 uppercase">
                      {language === "ar" ? "البريد الإلكتروني" : "Official Support Email"}
                    </span>
                    <span className="font-bold text-slate-800 text-sm">
                      mishkatclub4@gmail.com
                    </span>
                  </div>
                </a>

                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold text-slate-400 uppercase">
                      {language === "ar" ? "المقر الرئيسي" : "Headquarters"}
                    </span>
                    <span className="font-bold text-slate-800 text-sm">
                      Touggourt, Algeria
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold text-slate-400 uppercase">
                      {language === "ar" ? "أوقات العمل" : "Operating Hours"}
                    </span>
                    <span className="font-semibold text-slate-700 text-xs">
                      {language === "ar"
                        ? "الأحد - الخميس: 09:00 ص - 06:00 م"
                        : "Sunday - Thursday: 09:00 AM - 06:00 PM (GMT+1)"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  {language === "ar"
                    ? "استجابة مؤكدة خلال 24 ساعة كحد أقصى."
                    : "Guaranteed support reply within 24 hours."}
                </span>
              </div>
            </div>

            {/* Check FAQ Card */}
            <div className="bg-gradient-to-br from-[#0b192e] to-[#0f2b5c] text-white rounded-2xl p-6 border border-amber-400/20 shadow-md space-y-3">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <HelpCircle className="w-4 h-4" />
                <span>{language === "ar" ? "إجابات فورية" : "INSTANT ANSWERS"}</span>
              </div>
              <h4 className="text-base font-bold text-white">
                {language === "ar" ? "تصفح الأسئلة الشائعة" : "Looking for Instant Solutions?"}
              </h4>
              <p className="text-slate-300 text-xs leading-relaxed">
                {language === "ar"
                  ? "قد تجد إجابة استفسارك مسجلة وموثقة في قسم الأسئلة الشائعة دون الحاجة للانتظار."
                  : "Your question may already be answered in our FAQ library. Check it out before filing a ticket."}
              </p>
              <div className="pt-2">
                <Link
                  href="/faq"
                  className="inline-flex items-center gap-2 bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 hover:text-white px-4 py-2 rounded-full text-xs font-bold transition border border-amber-400/30"
                >
                  <span>{language === "ar" ? "الانتقال للأسئلة الشائعة" : "Browse Mishkat FAQ"}</span>
                  <ArrowIcon className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Support Ticket Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              {submittedTicket ? (
                /* Ticket Success State */
                <div className="text-center py-8 space-y-5">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-inner">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-2xl font-extrabold text-slate-900">
                      {language === "ar" ? "تم استلام تذكرتك بنجاح!" : "Ticket Submitted Successfully!"}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                      {language === "ar"
                        ? "شكراً لتواصلك معنا. قام فريق الدعم الفني بتسجيل طلبك وسنقوم بالرد على بريدك الإلكتروني قريباً."
                        : "Thank you for reaching out. Our support team has logged your request and will contact you shortly."}
                    </p>
                  </div>

                  {/* Ticket Details Summary Card */}
                  <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 text-left rtl:text-right text-xs space-y-2.5 max-w-md mx-auto">
                    <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                      <span className="text-slate-500 font-medium">
                        {language === "ar" ? "رقم التذكرة:" : "Ticket ID:"}
                      </span>
                      <span className="font-mono font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        {submittedTicket.ticketId}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 font-medium">
                        {language === "ar" ? "الاسم:" : "Name:"}
                      </span>
                      <span className="font-bold text-slate-800">{submittedTicket.name}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 font-medium">
                        {language === "ar" ? "البريد الإلكتروني:" : "Email:"}
                      </span>
                      <span className="font-bold text-slate-800">{submittedTicket.email}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 font-medium">
                        {language === "ar" ? "الموضوع:" : "Subject:"}
                      </span>
                      <span className="font-bold text-slate-800 truncate max-w-[200px]">
                        {submittedTicket.subject}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                    <button
                      onClick={handleResetForm}
                      className="inline-flex items-center gap-2 bg-[#0f2b5c] hover:bg-[#1e40af] text-white text-xs font-bold px-6 py-3 rounded-full transition shadow cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>{language === "ar" ? "إرسال تذكرة أخرى" : "Submit Another Ticket"}</span>
                    </button>

                    <Link
                      href="/"
                      className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-6 py-3 rounded-full transition"
                    >
                      <span>{language === "ar" ? "العودة للرئيسية" : "Return to Home"}</span>
                    </Link>
                  </div>
                </div>
              ) : (
                /* Ticket Submission Form */
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="border-b border-slate-100 pb-4">
                    <h3 className="text-xl font-extrabold text-slate-900">
                      {language === "ar" ? "فتح تذكرة دعم فني جديدة" : "Submit a Technical Support Ticket"}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      {language === "ar"
                        ? "املأ البيانات أدناه وسيتولى مهندسو الدعم التقني متابعة مشكلتك وحلها فوراً."
                        : "Fill out the fields below and our technical engineers will inspect and resolve your issue."}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        {language === "ar" ? "الاسم الكامل *" : "Full Name *"}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={language === "ar" ? "مثال: أحمد محمد" : "e.g. John Doe"}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-slate-50/50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        {language === "ar" ? "البريد الإلكتروني *" : "Email Address *"}
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@example.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-slate-50/50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        {language === "ar" ? "نوع المشكلة *" : "Category of Issue *"}
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
                      >
                        {categories.map((c) => (
                          <option key={c.value} value={c.value}>
                            {language === "ar" ? c.label_ar : c.label_en}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        {language === "ar" ? "مستوى الأهمية" : "Priority"}
                      </label>
                      <select
                        value={formData.priority}
                        onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
                      >
                        <option value="normal">{language === "ar" ? "عادي (Normal)" : "Normal"}</option>
                        <option value="high">{language === "ar" ? "مرتفع (High)" : "High"}</option>
                        <option value="urgent">{language === "ar" ? "عاجل (Urgent)" : "Urgent"}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      {language === "ar" ? "عنوان المشكلة / الموضوع *" : "Subject / Short Summary *"}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder={
                        language === "ar"
                          ? "مثال: الفيديو لا يعمل في الدرس الثالث من دورة بايثون"
                          : "e.g. Video player error on Lesson 3 of Web Development"
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      {language === "ar" ? "تفاصيل المشكلة والخطوات *" : "Detailed Description *"}
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={
                        language === "ar"
                          ? "يرجى كتابة تفاصيل المشكلة (نوع الجهاز، المتصفح، أو رسالة الخطأ التي ظهرت لك)..."
                          : "Describe what happened, what device or browser you are using, and any error messages..."
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-slate-50/50 resize-y"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#d97706] to-[#f59e0b] hover:from-[#b45309] hover:to-[#d97706] text-white text-xs font-bold uppercase tracking-wider py-3.5 px-6 rounded-full shadow-lg transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>{language === "ar" ? "جارٍ إرسال التذكرة..." : "Submitting Ticket..."}</span>
                      </>
                    ) : (
                      <>
                        <span>{language === "ar" ? "إرسال تذكرة الدعم الفني" : "Submit Support Ticket"}</span>
                        <Send className="w-3.5 h-3.5 rtl:rotate-180" />
                      </>
                    )}
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
