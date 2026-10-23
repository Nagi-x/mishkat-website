import Image from "next/image";
import Link from "next/link";

export default function CourseCard({title, description, image, href}: {
  title: string;
  description: string;
  image: string;
  href: string;
}) {
  return (
    <Link href={href} className="group block rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 w-full overflow-hidden">
        <Image src={image} alt={title} fill className="object-cover group-hover:scale-105 transition-transform" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300" dangerouslySetInnerHTML={{__html: description}} />
      </div>
    </Link>
  );
}
