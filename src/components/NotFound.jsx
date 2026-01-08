export default function NotFound(){

    return (
        <main className="min-h-screen bg-slate-200 dark:bg-slate-900 dark:text-white">
            <header className="pt-20 pb-6 text-center">
                <h1 className="font-calsans text-6xl md:text-8xl lg:text-9xl leading-tight tracking-tight">
                    404 Not Found
                </h1>
                <p className="font-dmsans text-2xl ">
                    The page you're looking for couldn't be found or doesn't exist.
                </p>
            </header>
            <div className="shrink-0">
                <img src="ImpatientReviewOOPS-2.png" 
                alt="Impatient Review Oops Logo"
                className="w-48 h-48 md:w-64 md:h-64 rounded-full object-contain mx-auto drop-shadow-slate-900 drop-shadow-md"/>
            </div>
        </main>
    )
}