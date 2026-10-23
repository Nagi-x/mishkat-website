"use client";

import { useState } from "react";
import Link from "next/link";
import {
  HelpCircle,
  Search,
  ChevronDown,
  MessageCircle,
  Phone,
  Mail,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  UserCheck,
  Award,
  Headphones,
  CheckCircle2,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Footer from "@/components/Footer";

interface FAQItem {
  id: string;
  category: "courses" | "enrollment" | "certificates" | "tech";
  question_en: string;
  question_ar: string;
  answer_en: string;
  answer_ar: string;
}

const FAQS_DATA: FAQItem[] = [
  {
    id: "faq-1",
    category: "courses",
    question_en: "How do I choose the right course for my skill level?",
    question_ar: "كيف أختار الدورة المناسبة لمستواي ومهاراتي؟",
    answer_en:
      "Each course page outlines prerequisites, targeted skill level (Beginner, Intermediate, Advanced), and a comprehensive syllabus. You can preview the course objectives and curriculum before enrolling.",
    answer_ar:
      "توضح صفحة كل دورة تدريبية المتطلبات المسبقة، والمستوى المستهدف (مبتدئ، متوسط، متقدم)، والمنهج التفصيلي للدورة، كما يمكنك معاينة محاور وأهداف الدورة قبل بدء التعلم.",
  },
  {
    id: "faq-2",
    category: "courses",
    question_en: "Are courses self-paced or do they follow a live schedule?",
    question_ar: "هل الدورات مسجلة بالكامل أم أنها مواعيد مباشرة؟",
    answer_en:
      "Mishkat offers both options! Most courses provide on-demand lifetime access to video lectures and materials so you can learn at your own pace, while specialized workshops feature live interactive sessions with mentors.",
    answer_ar:
      "توفر منصة مشكاة كلا الخيارين! تتيح أغلب الدورات وصولاً غير محدود للمحاضرات المسجلة لتتعلم بالسرعة التي تناسبك، بالإضافة إلى ورشات عمل تفاعلية وجلسات مباشرة دورية مع المدربين.",
  },
  {
    id: "faq-3",
    category: "enrollment",
    question_en: "How can I register an account as a student or instructor?",
    question_ar: "كيف يمكنني إنشاء حساب كطالب أو كمعلم في المنصة؟",
    answer_en:
      "Click the 'Student Sign-Up' or 'Teacher Sign-Up' buttons at the top of the page. Enter your name, email, and password. Your account will be activated immediately without waiting.",
    answer_ar:
      "اضغط على زر 'تسجيل طالب' أو 'تسجيل معلم' في الشريط العلوي للموقع. املأ بياناتك الأساسية (الاسم، البريد الإلكتروني، وكلمة المرور) وسيتم تفعيل حسابك فوراً.",
  },
  {
    id: "faq-4",
    category: "enrollment",
    question_en: "What should I do if I forgot my account password?",
    question_ar: "ماذا أفعل إذا نسيت كلمة مرور حسابي؟",
    answer_en:
      "Click 'LOGIN' in the top bar, select 'Forgot Password', and enter your registered email. You will receive an instant link to securely reset your password.",
    answer_ar:
      "افتح نافذة تسجيل الدخول من الشريط العلوي، ثم اختر 'نسيت كلمة المرور' وأدخل بريدك الإلكتروني المسجل لتصلك تعليمات استعادة وتعيين كلمة المرور فوراً.",
  },
  {
    id: "faq-5",
    category: "certificates",
    question_en: "Do I receive a verified certificate upon completing a course?",
    question_ar: "هل أحصل على شهادة معتمدة بعد إتمام الدورة التدريبية؟",
    answer_en:
      "Yes! Upon successfully completing all video modules and quizzes in a course, an official Mishkat completion certificate with a unique verification code is generated for download in your dashboard.",
    answer_ar:
      "نعم بالتأكيد! بعد إنهاء جميع متطلبات الدورة ومحاضراتها بنجاح، تصدر لك منصة مشكاة شهادة إتمام إلكترونية موثقة برقم تحقق فريد يمكنك تحميلها ومشاركتها.",
  },
  {
    id: "faq-6",
    category: "certificates",
    question_en: "Can I add Mishkat certificates to LinkedIn or my resume?",
    question_ar: "هل يمكنني إضافة شهادة مشكاة إلى LinkedIn وسيرتي الذاتية؟",
    answer_en:
      "Absolutely. All certificates provide a printable PDF copy and a public credential verification link that you can showcase on your LinkedIn profile, CV, or online portfolio.",
    answer_ar:
      "نعم، تتضمن جميع شهاداتنا نسخة PDF قابلة للطباعة ورابط تحقق رقمي يمكنك مشاركته بسهولة على حسابك في LinkedIn أو تضمينه في سيرتك الذاتية.",
  },
  {
    id: "faq-7",
    category: "tech",
    question_en: "What should I do if video playback is buffering or not loading?",
    question_ar: "ماذا أفعل إذا واجهت مشكلة في تشغيل الفيديو أو بطء التحميل؟",
    answer_en:
      "Ensure you have a stable internet connection and try refreshing your browser. If issues persist, check your browser extensions, clear your cache, or lower video quality in the player. You can also contact our Technical Support team.",
    answer_ar:
      "تأكد من استقرار اتصال الإنترنت وقم بتحديث الصفحة. إذا استمرت المشكلة، يُرجى مسح الذاكرة المؤقتة للمتصفح أو تقليل دقة الفيديو، أو مراسلة فريق الدعم الفني لمساعدتك فوراً.",
  },
  {
    id: "faq-8",
    category: "tech",
    question_en: "Does the Mishkat platform work on mobile phones and tablets?",
    question_ar: "هل تعمل منصة مشكاة بسلاسة على الهواتف الذكية والأجهزة اللوحية؟",
    answer_en:
      "Yes, Mishkat is built with a responsive modern design that works seamlessly on all iOS, Android, tablet, and desktop devices without requiring additional software installations.",
    answer_ar:
      "نعم، تم تصميم منصة مشكاة بتوافق كامل مع شاشات الهواتف الذكية والأجهزة اللوحية لتتمتع بتجربة تصفح وتعلم سلسة دون الحاجة لتثبيت أي تطبيقات إضافية.",
  },
  {
    id: "faq-9",
    category: "tech",
    question_en: "How can I contact the Mishkat Technical Support team directly?",
    question_ar: "كيف أتواصل مباشرة مع فريق الدعم الفني لمنصة مشكاة؟",
    answer_en:
      "You can visit our Technical Support page (/support), call us at 0780984056, or email mishkatclub4@gmail.com. Our support team typically replies within 24 hours.",
    answer_ar:
      "يمكنك التوجه مباشرة إلى صفحة الدعم الفني (/support)، أو الاتصال بنا على 0780984056، أو مراسلتنا عبر البريد الإلكتروني mishkatclub4@gmail.com. فريقنا يرد خلال 24 ساعة.",
  },
];

export default function FAQPage() {
  const { language, dir } = useLanguage();
  const ArrowIcon = dir === "rtl" ? ArrowLeft : ArrowRight;

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({ "faq-1": true, "faq-3": true });

  const toggleAccordion = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const categories = [
    { id: "all", label_en: "All Questions", label_ar: "جميع الأسئلة", icon: HelpCircle },
    { id: "courses", label_en: "Courses & Programs", label_ar: "الدورات والبرامج", icon: BookOpen },
    { id: "enrollment", label_en: "Account & Access", label_ar: "الحساب والتسجيل", icon: UserCheck },
    { id: "certificates", label_en: "Certificates", label_ar: "الشهادات والاعتمادات", icon: Award },
    { id: "tech", label_en: "Technical Support", label_ar: "الدعم الفني والتقني", icon: Headphones },
  ];

  const filteredFAQs = FAQS_DATA.filter((faq) => {
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
    if (!matchesCategory) return false;

    if (!searchQuery.trim()) return true;

    const query = searchQuery.toLowerCase().trim();
    const qText = language === "ar" ? faq.question_ar : faq.question_en;
    const aText = language === "ar" ? faq.answer_ar : faq.answer_en;

    return (
      qText.toLowerCase().includes(query) ||
      aText.toLowerCase().includes(query) ||
      faq.question_en.toLowerCase().includes(query) ||
      faq.question_ar.includes(query)
    );
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans" dir={dir}>
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#0b192e] via-[#0f2b5c] to-[#0b192e] text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-amber-400/20 relative overflow-hidden">
        {/* Background Ambient Glows */}
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
              {language === "ar" ? "الأسئلة الشائعة" : "FAQ"}
            </span>
          </div>

          <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest bg-amber-400/20 text-amber-300 px-4 py-1.5 rounded-full backdrop-blur-md border border-amber-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === "ar" ? "مركز المساعدة والمعلومات" : "HELP & KNOWLEDGE CENTER"}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {language === "ar" ? (
              <>الأسئلة <span className="text-amber-400">الشائعة</span> والمتكررة</>
            ) : (
              <>Frequently Asked <span className="text-amber-400">Questions</span></>
            )}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            {language === "ar"
              ? "إجابات واضحة وشاملة لجميع استفساراتك حول منصة مشكاة، الدورات التدريبية، الشهادات، والدعم التقني."
              : "Find instant, clear answers to common questions about our platform, learning courses, certificates, and technical support."}
          </p>

          {/* Search Box */}
          <div className="pt-4 max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  language === "ar"
                    ? "ابحث في الأسئلة الشائعة (مثلاً: شهادات، تسجيل، فيديو)..."
                    : "Search questions (e.g. certificates, registration, videos)..."
                }
                className="w-full bg-white text-slate-800 placeholder-slate-400 text-sm rounded-full pl-12 pr-12 py-3.5 shadow-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-400 transition rtl:pr-12 rtl:pl-12"
              />
              <Search className="w-5 h-5 text-slate-400 absolute top-1/2 -translate-y-1/2 left-4 rtl:left-auto rtl:right-4 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute top-1/2 -translate-y-1/2 right-4 rtl:right-auto rtl:left-4 text-xs font-bold text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 px-2 py-0.5 rounded-full transition"
                >
                  {language === "ar" ? "مسح" : "Clear"}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full space-y-8">
        {/* Category Pills Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition cursor-pointer border ${
                  isSelected
                    ? "bg-[#0f2b5c] text-amber-400 border-amber-400/40 shadow-md"
                    : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border-slate-200"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-amber-400" : "text-slate-400"}`} />
                <span>{language === "ar" ? cat.label_ar : cat.label_en}</span>
              </button>
            );
          })}
        </div>

        {/* FAQs Accordion List */}
        <div className="space-y-4">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
              <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-800">
                {language === "ar" ? "لم نجد نتائج مطابقة لبحثك" : "No matching questions found"}
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm mt-1 max-w-md mx-auto">
                {language === "ar"
                  ? "جرب استخدام كلمات بحث مختلفة، أو تواصل مباشرة مع فريق الدعم الفني وسنساعدك فوراً."
                  : "Try searching with different terms or contact our Technical Support team directly for assistance."}
              </p>
              <div className="mt-5">
                <Link
                  href="/support"
                  className="inline-flex items-center gap-2 bg-[#0f2b5c] hover:bg-[#1e40af] text-amber-400 text-xs font-bold px-6 py-2.5 rounded-full transition shadow"
                >
                  <Headphones className="w-4 h-4" />
                  <span>{language === "ar" ? "التواصل مع الدعم الفني" : "Contact Technical Support"}</span>
                </Link>
              </div>
            </div>
          ) : (
            filteredFAQs.map((faq) => {
              const isOpen = !!openIds[faq.id];
              const question = language === "ar" ? faq.question_ar : faq.question_en;
              const answer = language === "ar" ? faq.answer_ar : faq.answer_en;

              return (
                <div
                  key={faq.id}
                  className={`bg-white rounded-2xl border transition shadow-xs overflow-hidden ${
                    isOpen ? "border-amber-400/60 ring-1 ring-amber-400/30" : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full text-left rtl:text-right p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition ${
                          isOpen ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        <HelpCircle className="w-4 h-4" />
                      </div>
                      <span className="text-sm sm:text-base font-bold text-slate-800 leading-snug">
                        {question}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-amber-600" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-6 pt-1 border-t border-slate-100 text-slate-600 text-xs sm:text-sm leading-relaxed bg-slate-50/50">
                      <div className="pt-2">{answer}</div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Still Need Help CTA Banner */}
        <div className="bg-gradient-to-r from-[#0b192e] via-[#0f2b5c] to-[#1e40af] text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-amber-400/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left rtl:md:text-right">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
              <Headphones className="w-3.5 h-3.5" />
              <span>{language === "ar" ? "فريق الدعم الفني جاهز" : "SUPPORT TEAM READY"}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              {language === "ar" ? "هل لديك استفسار آخر لم تجد إجابته؟" : "Still Have Questions?"}
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm max-w-lg">
              {language === "ar"
                ? "فريق الدعم الفني لمنصة مشكاة متواجد لمساعدتك وحل أي عقبة تواجهك في أسرع وقت."
                : "Our dedicated support team is available to assist you with any questions or technical inquiries."}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <Link
              href="/support"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#d97706] to-[#f59e0b] hover:from-[#b45309] hover:to-[#d97706] text-white text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-full shadow-lg transition transform hover:-translate-y-0.5"
            >
              <span>{language === "ar" ? "فتح تذكرة دعم فني" : "Contact Technical Support"}</span>
              <ArrowIcon className="w-3.5 h-3.5" />
            </Link>

            <a
              href="tel:0780984056"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-4 py-3.5 rounded-full border border-white/20 transition"
              dir="ltr"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>0780984056</span>
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
