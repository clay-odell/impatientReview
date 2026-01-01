import { useState } from "react";

export default function HomePage() {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <main className="min-h-screen bg-slate-200 dark:bg-slate-800 ">
            <header className="pt-20 pb-6 text-center">
                <h1 className="font-calsans dark:text-white text-6xl md:text-8xl lg:text-9xl leading-tight tracking-tight">
                    Impatient Review
                </h1>
                <p className="font-dmsans text-2xl dark:text-white text-center">
                    A home for the creative procrastinator
                </p>
            </header>
            <div className="shrink-0">
            <img
              src="/ImpatientReviewLogo1.png"
              alt="Impatient Review Logo"
              className="w-48 h-48 md:w-64 md:h-64 rounded-full object-contain mx-auto drop-shadow-slate-900 drop-shadow-md"
            />
          </div>,
        </main>
    )
}