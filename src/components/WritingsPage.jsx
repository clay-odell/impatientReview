export default function WritingsPage() {
  return (
    <main className="min-h-screen bg-slate-200 dark:bg-slate-800">
      <header className="pt-20 pb-6 text-center">
        <h1 className="font-calsans dark:text-white text-6xl md:text-8xl lg:text-9xl leading-tight tracking-tight">
          Writings
        </h1>
        <p className="font-dmsans text-2xl dark:text-white text-center">
          Short, short fiction, poetry, etc.
        </p>
      </header>

      <div className="flex items-center gap-10 pl-6">
        <a
          href="/shortshorts"
          className="font-calsans text-4xl text-slate-800 dark:text-slate-200
                     transition-colors duration-200 ease-in-out
                     hover:text-slate-900 dark:hover:text-slate-50
                     px-2 py-1 rounded-sm hover:bg-slate-300 dark:hover:bg-slate-700
                     transform hover:scale-105"
        >
          Short, Short Fiction
        </a>

        <a
          href="/poetry"
          className="font-calsans text-4xl text-slate-800 dark:text-slate-200
                     transition-colors duration-200 ease-in-out
                     hover:text-slate-900 dark:hover:text-slate-50
                     px-2 py-1 rounded-sm hover:bg-slate-300 dark:hover:bg-slate-700
                     transform hover:scale-105"
        >
          Poetry
        </a>

        <a
          href="/fiction"
          className="font-calsans text-4xl text-slate-800 dark:text-slate-200
                     transition-colors duration-200 ease-in-out
                     hover:text-slate-900 dark:hover:text-slate-50
                     px-2 py-1 rounded-sm hover:bg-slate-300 dark:hover:bg-slate-700
                     transform hover:scale-105"
        >
          Fiction
        </a>
      </div>
    </main>
  );
}
