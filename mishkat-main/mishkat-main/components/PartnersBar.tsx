"use client";

export default function PartnersBar() {
  const partners = ["Walmart", "amazon", "Deloitte.", "Google", "Microsoft", "Spotify"];

  return (
    <div className="py-12 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-8">
          OUR TRUSTED GLOBAL PARTNERS & CORPORATE SPONSORS
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition duration-300">
          {partners.map((partner, idx) => (
            <span
              key={idx}
              className="text-2xl sm:text-3xl font-extrabold font-serif text-slate-700 tracking-tight hover:text-[#d97706] transition cursor-pointer select-none"
            >
              {partner}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
