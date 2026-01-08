import { useEffect, useState } from "react";
import API from "../api";
import { poemMarkdownToHtml } from "../utils/poemMarkdownToHtml";

export default function PublishedPoemsPage() {
  const [poems, setPoems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadPoems() {
    try {
      setLoading(true);
      const res = await API.listPoems("published");
      setPoems(res.poems || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPoems();
  }, []);

  return (
    <main className="min-h-screen bg-slate-200 dark:bg-slate-800 px-6 py-12">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="font-calsans text-5xl md:text-6xl dark:text-white tracking-tight">
          Poems
        </h1>
        <p className="font-dmsans text-xl dark:text-slate-300 mt-2">
          A growing collection from Impatient Review
        </p>
      </header>

      {/* Poems List */}
      <div className="max-w-3xl mx-auto space-y-16">
        {error && (
          <p className="text-red-600 dark:text-red-400 text-center font-dmsans">
            {error}
          </p>
        )}

        {loading ? (
          <p className="text-center font-dmsans dark:text-slate-300">
            Loading poems…
          </p>
        ) : poems.length === 0 ? (
          <p className="text-center font-dmsans dark:text-slate-300">
            No poems have been published yet.
          </p>
        ) : (
          poems.map((poem) => {
            const html = poemMarkdownToHtml(poem.body);

            return (
              <article
                key={poem.id}
                className="bg-white dark:bg-slate-900 shadow-lg rounded-xl p-8 border border-slate-300 dark:border-slate-700"
              >
                <h2 className="font-calsans text-4xl mb-2 dark:text-white">
                  {poem.title}
                </h2>

                <p className="font-dmsans text-slate-700 dark:text-slate-300 mb-6">
                  by {poem.author}
                </p>

                <div
                  className="prose dark:prose-invert max-w-none font-dmsans"
                  dangerouslySetInnerHTML={{ __html: html }}
                />

                {poem.citations && (
                  <div className="mt-6 pt-4 border-t border-slate-300 dark:border-slate-700">
                    <h3 className="font-dmsans text-lg dark:text-white mb-2">
                      References
                    </h3>
                    <pre className="whitespace-pre-wrap text-sm dark:text-slate-300">
                      {poem.citations}
                    </pre>
                  </div>
                )}
              </article>
            );
          })
        )}
      </div>
    </main>
  );
}
