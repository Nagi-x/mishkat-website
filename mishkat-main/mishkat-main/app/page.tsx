import Hero from "@/components/Hero";
import CoreFeatures from "@/components/CoreFeatures";
import AboutUs from "@/components/AboutUs";
import TickerBanner from "@/components/TickerBanner";
import CoursesSection from "@/components/CoursesSection";
import VideoSection from "@/components/VideoSection";
// InstructorsSection and TestimonialsSection are hidden until connected to the production database
// import InstructorsSection from "@/components/InstructorsSection";
// import TestimonialsSection from "@/components/TestimonialsSection";
import CtaBanner from "@/components/CtaBanner";
import BlogSection from "@/components/BlogSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <CoreFeatures />
      <AboutUs />
      <TickerBanner />
      <CoursesSection />
      <VideoSection />
      {/* Hidden until connected to production database:
      <InstructorsSection />
      <TestimonialsSection />
      */}
      <CtaBanner />
      <BlogSection />
      <Footer />
    </div>
  );
}
