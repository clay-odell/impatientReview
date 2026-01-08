import { useState } from "react";
import API from "../../api";
import MarkdownToolbar from "./MarkdownToolbar";
export default function PoemDraftForm({ onCreated }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [body, setBody] = useState("");
  const [citations, setCitations] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const poem = await API.createPoemDraft({
        title,
        author,
        body,
        citations,
      });

      // Optional callback for parent components
      if (onCreated) onCreated(poem);

      // Reset form
      setTitle("");
      setAuthor("");
      setBody("");
      setCitations("");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto mt-16 bg-white dark:bg-slate-900 shadow-xl rounded-xl p-8 border border-slate-300 dark:border-slate-700">
      <h2 className="font-calsans text-4xl text-center mb-6 dark:text-white">
        Create Poetry Draft
      </h2>

      {error && (
        <p className="text-red-600 dark:text-red-400 text-center mb-4 font-dmsans">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block font-dmsans text-slate-700 dark:text-slate-300 mb-1">
            Title
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-white"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Author */}
        <div>
          <label className="block font-dmsans text-slate-700 dark:text-slate-300 mb-1">
            Author
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-white"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>

        {/* Body */}
        {/* Body */}
<div>
  <label className="block font-dmsans text-slate-700 dark:text-slate-300 mb-1">
    Poem Body
  </label>

  <MarkdownToolbar
    onInsert={(snippet) => {
      const textarea = document.getElementById("poem-body");
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      const before = body.substring(0, start);
      const after = body.substring(end);

      const newValue = before + snippet + after;

      setBody(newValue);

      // Restore cursor position after insertion
      setTimeout(() => {
        textarea.focus();
        textarea.selectionStart = textarea.selectionEnd = start + snippet.length;
      }, 0);
    }}
  />

  <textarea
    id="poem-body"
    className="w-full px-4 py-3 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-white h-48"
    value={body}
    onChange={(e) => setBody(e.target.value)}
    required
  />
</div>


        {/* Citations */}
        <div>
          <label className="block font-dmsans text-slate-700 dark:text-slate-300 mb-1">
            Citations / References
          </label>
          <textarea
            className="w-full px-4 py-3 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-white h-32"
            value={citations}
            onChange={(e) => setCitations(e.target.value)}
            placeholder="Optional citations, links, or notes"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={saving}
          className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-dmsans text-lg transition disabled:opacity-50"
        >
          {saving ? "Saving Draft..." : "Save Draft"}
        </button>
      </form>
    </div>
  );
}
