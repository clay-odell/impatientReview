import { useState } from "react";
import API from "../../api";
import MarkdownToolbar from "./MarkdownToolbar";

export default function ShortShortFictionDraftForm({ onCreated }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [body, setBody] = useState("");
  const [citations, setCitations] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await API.createShortFictionDraft({
        title,
        author,
        body,
        citations,
      });

      setLoading(false);

      // Clear form
      setTitle("");
      setAuthor("");
      setBody("");
      setCitations("");

      if (onCreated) onCreated();
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-slate-900 shadow-lg rounded-xl p-8 border border-slate-300 dark:border-slate-700 max-w-3xl mx-auto"
    >
      <h2 className="font-calsans text-4xl mb-6 dark:text-white">
        Create Short Fiction Draft
      </h2>

      {error && (
        <p className="text-red-600 dark:text-red-400 mb-4 font-dmsans">
          {error}
        </p>
      )}

      {/* Title */}
      <div className="mb-6">
        <label className="block font-dmsans text-slate-700 dark:text-slate-300 mb-1">
          Title
        </label>
        <input
          type="text"
          className="w-full px-4 py-3 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-white"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      {/* Author */}
      <div className="mb-6">
        <label className="block font-dmsans text-slate-700 dark:text-slate-300 mb-1">
          Author
        </label>
        <input
          type="text"
          className="w-full px-4 py-3 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-white"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </div>

      {/* Body */}
      <div className="mb-6">
        <label className="block font-dmsans text-slate-700 dark:text-slate-300 mb-1">
          Story Body
        </label>

        <MarkdownToolbar
          onInsert={(snippet) => {
            const textarea = document.getElementById("short-fiction-body");
            if (!textarea) return;

            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;

            const before = body.substring(0, start);
            const after = body.substring(end);

            const newValue = before + snippet + after;
            setBody(newValue);

            setTimeout(() => {
              textarea.focus();
              textarea.selectionStart = textarea.selectionEnd =
                start + snippet.length;
            }, 0);
          }}
        />

        <textarea
          id="short-fiction-body"
          className="w-full px-4 py-3 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-white h-56"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
      </div>

      {/* Citations */}
      <div className="mb-6">
        <label className="block font-dmsans text-slate-700 dark:text-slate-300 mb-1">
          Citations (optional)
        </label>
        <textarea
          className="w-full px-4 py-3 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-white h-32"
          value={citations}
          onChange={(e) => setCitations(e.target.value)}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-dmsans text-lg transition"
      >
        {loading ? "Saving…" : "Save Draft"}
      </button>
    </form>
  );
}
