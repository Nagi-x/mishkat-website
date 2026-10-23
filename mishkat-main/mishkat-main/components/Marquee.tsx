import Image from "next/image";

export default function Marquee() {
  const items = ["INNOVATION", "WORLDWIDE LEARNERS", "UNIQUE KNOWLEDGE", "DREAM TODAY"]; 
  return (
    <section className="bg-primary-600 text-white py-4 overflow-hidden whitespace-nowrap">
      <div className="animate-marquee flex space-x-8">
        {items.map((item, i) => (
          <span key={i} className="text-lg font-bold uppercase tracking-widest">
            {item}
          </span>
        ))}
        {/* repeat for seamless scrolling */}
        {items.map((item, i) => (
          <span key={"r"+i} className="text-lg font-bold uppercase tracking-widest">
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
