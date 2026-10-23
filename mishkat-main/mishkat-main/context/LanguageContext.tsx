"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  dir: "ltr" | "rtl";
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  t: typeof translations.en;
}

export const translations = {
  en: {
    notice: {
      welcome: "Welcome to",
      brand: "Mishkat",
      tagline: "– Unlocking the Power of Knowledge!",
      support: "Support",
      faq: "FAQ",
      langSwitch: "العربية",
      login: "LOGIN",
      register: "REGISTER",
    },
    nav: {
      home: "Home",
      about: "About",
      pages: "Pages",
      courses: "Courses",
      shop: "Shop",
      blog: "Blog",
      contact: "Contact",
      freeTrial: "FREE TRIAL",
      allCourses: "All Courses",
      business: "Business & Innovation",
      cloud: "Cloud & Networking",
      design: "Graphic Design",
      ebooks: "E-Books",
      materials: "Study Materials",
      keyFeatures: "Key Features",
      instructors: "Instructors",
      testimonials: "Testimonials",
    },
    hero: {
      guarantee: "100% SATISFACTION GUARANTEE",
      headlinePrefix: "Growup Your Learning Skills with",
      subtext: "Mishkat: the ultimate destination for knowledge seekers and educators alike. We are committed to transforming education and empowering modern learners worldwide.",
      getStarted: "GET STARTED",
      findCourse: "FIND COURSE",
      ratings: "(4.7 Ratings)",
      dailyStudents: "Students learn daily with Mishkat platform",
      expertCount: "130+",
      expertLabel: "Expert Instructor",
      topRated: "4.9 Top Rated",
    },
    features: {
      tag: "CORE FEATURES",
      title: "Interactive Online Learning\nKey Features & Benefits",
      f1Title: "Learning Experiences",
      f1Desc: "The ultimate destination for knowledge. We are committed to transforming education through modern interactive platforms.",
      f2Title: "Professional Instructor",
      f2Desc: "Learn directly from world-class industry experts and certified professors committed to your skill mastery and career success.",
      f3Title: "Moneyback Guarantee",
      f3Desc: "100% risk-free 30-day moneyback guarantee. Try any course with total confidence and satisfaction guaranteed.",
      learnMore: "LEARN MORE",
    },
    about: {
      tag: "ABOUT US",
      badge: "LEARN ONLINE",
      libraryTitle: "Modern Library",
      libraryDesc: "10,000+ Digital Books",
      titlePrefix: "Who We Are – Introduction to",
      desc: "Mishkat is the ultimate destination for knowledge seekers and educators alike. We are committed to transforming education by providing top-tier, industry-accredited courses designed for modern skill development and real-world impact.",
      b1: "Innovative Learning System",
      b2: "Worldwide Intelligent Learner",
      s1Count: "30+",
      s1Text: "Expert & Professional Instructors",
      s2Count: "6k+",
      s2Text: "Enrolled Students All Over The World",
      moreAbout: "MORE ABOUT",
    },
    ticker: [
      "INNOVATION",
      "WORLDWIDE LEARNERS",
      "UNIQUE KNOWLEDGE",
      "DREAM TODAY",
      "EXPERT INSTRUCTORS",
      "FUTURE READY SKILLS",
    ],
    coursesSection: {
      tag: "OUR COURSES",
      title: "Our Courses – Comprehensive Available All Programs",
      exploreAll: "EXPLORE ALL COURSES",
      lessons: "Lessons",
      catAll: "All Categories",
      catWordpress: "WordPress",
      catBusiness: "Business",
      catNetworking: "Networking",
      catFinance: "Finance",
      catDesigning: "Designing",
    },
    video: {
      tag: "VIDEO TOUR",
      title: "Innovative and Effective Learning Approaches",
      desc: "Watch how our immersive online classrooms and interactive mentorship empower over 50,000+ students globally to land their dream careers.",
      b1: "HD Quality Interactive Live Seminars",
      b2: "1-on-1 Mentor Code Reviews & Feedback",
      b3: "Lifetime Access to Course Materials",
      watchDemo: "▶ Watch Demo Video (2:30)",
    },
    instructorsSection: {
      tag: "INSTRUCTORS",
      title: "Introducing the Educators and Professional Instructors",
    },
    testimonials: {
      tag: "TESTIMONIALS",
      title: "Real Experiences From Our Dedicated Learners",
      quote: `"Mishkat transformed my career! The hands-on project assignments and direct instructor feedback gave me the confidence to transition into full-time UI/UX design within 3 months."`,
      name: "Vanessa Miller",
      role: "UI/UX Lead at TechCorp",
      trustpilot: "★ Trustpilot",
      ratingScore: "| 4.9 out of 5",
      verified: "Verified Learner Review",
    },
    cta: {
      tag: "LIMITED TIME OFFER",
      title: "Learn Anytime, Anywhere!\nStart Your Free Trial Today!",
      desc: "Gain unlimited access to 500+ premium courses, expert mentorship, downloadable certificates, and career resources.",
      btn: "START YOUR 14-DAY FREE TRIAL",
    },
    blog: {
      tag: "OUR BLOG",
      title: "Read the Latest Insights and Updates Mishkat Blog",
      readMore: "READ MORE",
    },
    footer: {
      subscribeTitle: "SUBSCRIBE OUR NEWSLETTER",
      subscribeDesc: "Get the latest course updates, free tutorials, and discount offers directly to your inbox.",
      placeholder: "Enter your email address...",
      subscribeBtn: "SUBSCRIBE",
      desc: "Mishkat: the ultimate destination for knowledge seekers and educators alike. We are committed to transforming education worldwide.",
      platformTitle: "Online Platform",
      aboutLink: "About Mishkat",
      allProgramsLink: "All Programs & Courses",
      ourInstructorsLink: "Our Instructors",
      startTrialLink: "Start Free Trial",
      pricingLink: "Pricing & Membership",
      quickLinksTitle: "Quick Links",
      keyFeaturesLink: "Key Features",
      learnerReviewsLink: "Learner Reviews",
      mishkatBlogLink: "Mishkat Blog",
      termsLink: "Terms & Conditions",
      privacyLink: "Privacy Policy",
      recentPostsTitle: "Recent Posts",
      copyright: "All rights reserved. Built with Next.js & Tailwind CSS.",
    },
  },
  ar: {
    notice: {
      welcome: "مرحباً بكم في منصة",
      brand: "مشكاة",
      tagline: "– نُضيء آفاق المعرفة والتعليم!",
      support: "الدعم الفني",
      faq: "الأسئلة الشائعة",
      langSwitch: "English",
      login: "تسجيل الدخول",
      register: "حساب جديد",
    },
    nav: {
      home: "الرئيسية",
      about: "عن المنصة",
      pages: "الصفحات",
      courses: "الدورات التدريبية",
      shop: "المتجر الرقمي",
      blog: "المدونة",
      contact: "اتصل بنا",
      freeTrial: "تجربة مجانية",
      allCourses: "جميع الدورات",
      business: "الأعمال والابتكار",
      cloud: "الحوسبة والشبكات",
      design: "التصميم الجرافيكي",
      ebooks: "الكتب الإلكترونية",
      materials: "المواد الدراسية",
      keyFeatures: "المميزات الرئيسية",
      instructors: "المعلمون والمدربون",
      testimonials: "آراء الطلاب",
    },
    hero: {
      guarantee: "ضمان الجودة والتعلم 100%",
      headlinePrefix: "طوّر مهاراتك المستقبلية مع منصة",
      subtext: "مشكاة: الوجهة الأولى لطلاب العلم والمربين على حد سواء. نلتزم بتطوير التعليم وتمكين المتعلمين حول العالم بأحدث المناهج التفاعلية.",
      getStarted: "ابدأ التعلم الآن",
      findCourse: "تصفح الدورات",
      ratings: "(تقييم 4.7 من 5)",
      dailyStudents: "يتعلم الطلاب يومياً عبر منصة مشكاة",
      expertCount: "+130",
      expertLabel: "مدرب خبير ومعتمد",
      topRated: "4.9 الأعلى تقييماً",
    },
    features: {
      tag: "المميزات الرئيسية",
      title: "تجربة تعليمية تفاعلية عبر الإنترنت\nأبرز المزايا والفوائد",
      f1Title: "تجارب تعليمية متطورة",
      f1Desc: "الوجهة الأفضل لاكتساب المعرفة. نحن ملتزمون بتحويل مفهوم التعليم من خلال منصات تفاعلية حديثة.",
      f2Title: "نخبة من المدربين المحترفين",
      f2Desc: "تعلم مباشرة من أفضل الخبراء وأساتذة الجامعات المعتمدين الملتزمين بنجاحك وصقل مهاراتك.",
      f3Title: "ضمان استعادة الأموال",
      f3Desc: "ضمان استعادة كامل المبلغ خلال 30 يوماً بدون أي مخاطرة. جرب دوراتنا بثقة كاملة.",
      learnMore: "اعرف المزيد",
    },
    about: {
      tag: "عن مشكاة",
      badge: "التعليم عن بُعد",
      libraryTitle: "مكتبة رقمية شاملة",
      libraryDesc: "+10,000 كتاب ومصدر تعليمي",
      titlePrefix: "من نحن – نبذة عن منصة",
      desc: "منصة مشكاة هي البيئة التعليمية المتكاملة لطلاب العلم والمعلمين. نهدف إلى النهوض بالعملية التعليمية عبر تقديم دورات معتمدة دولياً ومصممة خصيصاً لسوق العمل الحديث.",
      b1: "نظام تعليم تفاعلي مبتكر",
      b2: "مجتمع تعليمي ذكي حول العالم",
      s1Count: "+30",
      s1Text: "مدرب ومعلم خبير ومتخصص",
      s2Count: "+6,000",
      s2Text: "طالب مسجل من مختلف دول العالم",
      moreAbout: "اقرأ المزيد عنا",
    },
    ticker: [
      "الابتكار والتميز",
      "طلاب من جميع أنحاء العالم",
      "معرفة عميقة وتطبيقات عملية",
      "حقّق طموحك اليوم",
      "مدربون خبراء ومعتمدون",
      "مهارات المستقبل الرقمية",
    ],
    coursesSection: {
      tag: "دوراتنا التدريبية",
      title: "دوراتنا التدريبية – البرامج التعليمية المتاحة كلياً",
      exploreAll: "استكشف جميع الدورات",
      lessons: "دروس",
      catAll: "جميع التصنيفات",
      catWordpress: "ووردبريس",
      catBusiness: "إدارة الأعمال",
      catNetworking: "الشبكات والسحابة",
      catFinance: "المالية والاستثمار",
      catDesigning: "التصميم والابتكار",
    },
    video: {
      tag: "جولة بالفيديو",
      title: "أساليب تعليمية مبتكرة وفعالة",
      desc: "شاهد كيف تمكن فصولنا التفاعلية وجلسات التوجيه المباشرة أكثر من 50,000 طالب من تحقيق أهدافهم المهنية.",
      b1: "محاضرات مباشرة عالية الجودة HD",
      b2: "مراجعة المشاريع وتوجيه فردي مباشر",
      b3: "وصول مدى الحياة لجميع المحتويات",
      watchDemo: "▶ شاهد الفيديو التعريفي (2:30)",
    },
    instructorsSection: {
      tag: "المعلمون والمدربون",
      title: "نخبة المحاضرين والمدربين المحترفين",
    },
    testimonials: {
      tag: "آراء الطلاب",
      title: "تجارب حقيقية من طلابنا المتميزين",
      quote: `"غيرت منصة مشكاة مساري المهني تماماً! المشاريع التطبيقية والتوجيه المباشر من المحاضرين منحاني الثقة للانتقال إلى عملي الجديد كمصممة UI/UX خلال 3 أشهر فقط."`,
      name: "فانيسا ميلر",
      role: "قائدة فريق التصميم في TechCorp",
      trustpilot: "★ Trustpilot",
      ratingScore: "| 4.9 من 5",
      verified: "تقييم طالب موثق",
    },
    cta: {
      tag: "عرض لفترة محدودة",
      title: "تعلم في أي وقت ومن أي مكان!\nابدأ تجربتك المجانية اليوم!",
      desc: "احصل على وصول غير محدود لأكثر من 500 دورة متميزة، وتوجيه شخصي، وشهادات معتمدة.",
      btn: "ابدأ تجربة مجانية لمدة 14 يوماً",
    },
    blog: {
      tag: "مدونة مشكاة",
      title: "أحدث المقالات والنصائح التعليمية من مدونة مشكاة",
      readMore: "اقرأ المقال",
    },
    footer: {
      subscribeTitle: "اشترك في نشرتنا البريدية",
      subscribeDesc: "احصل على أحدث التحديثات، والدورات المجانية، والعروض الحصرية مباشرة في بريدك.",
      placeholder: "أدخل بريدك الإلكتروني...",
      subscribeBtn: "اشتراك",
      desc: "مشكاة: الوجهة الأولى لطلاب العلم والمربين. نلتزم بتوفير أحدث الأدوات والحلول التعليمية عالمياً.",
      platformTitle: "المنصة التعليمية",
      aboutLink: "عن منصة مشكاة",
      allProgramsLink: "جميع البرامج والدورات",
      ourInstructorsLink: "المعلمون والمدربون",
      startTrialLink: "التجربة المجانية",
      pricingLink: "الأسعار والاشتراكات",
      quickLinksTitle: "روابط سريعة",
      keyFeaturesLink: "المميزات الرئيسية",
      learnerReviewsLink: "آراء وتقييمات الطلاب",
      mishkatBlogLink: "مدونة مشكاة",
      termsLink: "الشروط والأحكام",
      privacyLink: "سياسة الخصوصية",
      recentPostsTitle: "أحدث المقالات",
      copyright: "جميع الحقوق محفوظة منصة مشكاة 2026. تم التطوير باستخدام Next.js و Tailwind CSS.",
    },
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("mishkat_lang", lang);
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = lang;
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en");
  };

  useEffect(() => {
    const saved = localStorage.getItem("mishkat_lang") as Language;
    if (saved && (saved === "en" || saved === "ar")) {
      setLanguageState(saved);
      document.documentElement.dir = saved === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = saved;
    }
  }, []);

  const dir = language === "ar" ? "rtl" : "ltr";
  const t = translations[language];

  return (
    <LanguageContext.Provider
      value={{ language, dir, toggleLanguage, setLanguage, t }}
    >
      <div dir={dir} className={language === "ar" ? "font-arabic" : ""}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
