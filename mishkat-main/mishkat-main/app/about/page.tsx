export default function AboutPage() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <header className="bg-white dark:bg-black/50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-center text-black dark:text-zinc-50">
            About Mishkat
          </h1>
          <p className="mt-2 text-center text-zinc-600 dark:text-zinc-400 max-w-md mx-auto">
            Learn more about our mission and team.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-black/50 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-black dark:text-zinc-50 mb-4">
            Our Mission
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            At Mishkat, we believe in making quality education accessible to everyone.
            Our platform offers a wide range of courses designed to help you gain
            practical skills and advance your career.
          </p>
          <h2 className="text-xl font-semibold text-black dark:text-zinc-50 mb-4">
            Meet the Team
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="text-center">
              <h3 className="font-medium text-black dark:text-zinc-50">John Doe</h3>
              <p className="text-zinc-500 dark:text-zinc-400">Founder & CEO</p>
            </div>
            <div className="text-center">
              <h3 className="font-medium text-black dark:text-zinc-50">Jane Smith</h3>
              <p className="text-zinc-500 dark:text-zinc-400">Head of Curriculum</p>
            </div>
            <div className="text-center">
              <h3 className="font-medium text-black dark:text-zinc-50">Mike Johnson</h3>
              <p className="text-zinc-500 dark:text-zinc-400">Lead Instructor</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}