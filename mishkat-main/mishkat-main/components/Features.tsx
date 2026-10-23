import Link from "next/link";
import Image from "next/image";

export default function Features() {
  const items = [
    {title: "Expert Instructors", description: "Learn from industry leaders.", icon: "/icons/instructor.svg"},
    {title: "Lifetime Access", description: "Learn at your own pace.", icon: "/icons/lifetime.svg"},
    {title: "Certificate", description: "Get recognized credentials.", icon: "/icons/certificate.svg"},
  ];
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item) => (
            <div key={item.title} className="flex flex-col items-center text-center p-6 rounded-lg bg-gray-50 dark:bg-gray-800 hover:shadow-lg transition-shadow">
              <Image src={item.icon} alt={item.title} width={64} height={64} className="mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
