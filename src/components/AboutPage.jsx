export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-200 dark:bg-slate-800 dark:text-white">
      <header className="pt-20 pb-5 text-center">
        <h1 className="font-calsans text-6xl md:text-8xl lg:text-9xl leading-tight tracking-tight">
          About
        </h1>
        <p className="font-dmsans text-2xl">If there's a story, this is it.</p>
      </header>
      <div className="font-dmsans text-justify mx-auto">
        <p className="pl-10 pr-10">
          Unable to reconcile my professional life with my personal passions, I
          started <em>Impatient</em> Review. I have designed this place in the
          hope that it will force me to be creative, to self-publish, and to
          share, even if it is just further shouting into the void.
        </p>
      </div>
    </main>
  );
}
