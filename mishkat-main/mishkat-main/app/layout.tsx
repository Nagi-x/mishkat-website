import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Tajawal } from "next/font/google";
import "./globals.css";
import TopNoticeBar from "@/components/TopNoticeBar";
import Navbar from "@/components/Navbar";
import { LanguageProvider } from "@/context/LanguageContext";
import { AuthProvider } from "@/context/AuthContext";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic"],
  weight: ["400", "500", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Mishkat - Growup Your Learning Skills Online Platform",
  description: "Mishkat: the ultimate destination for knowledge seekers and educators alike. We are committed to transforming education with interactive courses, expert instructors, and worldwide intelligent learning.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${tajawal.variable} h-full antialiased font-sans scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-white text-slate-800">
        <AuthProvider>
          <LanguageProvider>
            <TopNoticeBar />
            <Navbar />
            <main className="flex-1 w-full">{children}</main>
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}