import { useEffect, useState } from "react";
import API from "../../api";
import MarkdownToolbar from "./MarkdownToolbar";

export default function ShortShortFictionEditor({ id, onSaved, onPublished }) {
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [body, setBody] = useState("");
  const [citations, setCitations] = useState("");

  async function loadStory() {
    try {
      setLoading(true);
      const res = await API.getShortFiction(id);
      setStory(res.story);

      setTitle(res.story.title);
      setAuthor(res.story.author);
      setBody(res.story.body);
      setCitations(res.story.citations || "");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function saveDraft() {
    try {
      await API.updateShortFictionDraft(id, {
        title,
        author,
        body,
        citations,
      });
      if (onSaved) onSaved();
    } catch (err) {
      setError(err.message);
    }
  }

  async function publish() {
    try {
      await API.publishShortFiction(id);
      if (onPublished) onPublished();
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    loadStory();
  }, [id]);

  if (loading) {
    return (
      <p className="font-dmsans dark:text-slate-300">Loading story…</p>
    );
  }

  if (!story) {
    return (
      <p className="font-dmsans dark:text-slate-300">Story not found.</p>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 shadow-lg rounded-xl p-8 border border-slate-300 dark:border-slate-700 max-w-3xl mx-auto">
      <h2 className="font-calsans text-4xl mb-6 dark:text-white">
        Edit Short Fiction Draft
      </h2>

      {error && (
        <p className="text-red-600 dark:text-red-400 mb-4 font-dmsans">
          {error}
        </p>
      )}

      {/* Title */}
      <div className="mb-6">
        <label className="block font-dmsans dark:text-slate-300 mb-1">
          Title
        </label>
        <input
          className="w-full px-4 py-3 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 dark:text-white"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* Author */}
      <div className="mb-6">
        <label className="block font-dmsans dark:text-slate-300 mb-1">
          Author
        </label>
        <input
          className="w-full px-4 py-3 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 dark:text-white"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>

      {/* Body */}
      <div className="mb-6">
        <label className="block font-dmsans dark:text-slate-300 mb-1">
          Story Body
        </label>

        <MarkdownToolbar
          onInsert={(snippet) => {
            const textarea = document.getElementById("short-fiction-editor-body");
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
          id="short-fiction-editor-body"
          className="w-full h-56 px-4 py-3 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 dark:text-white"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </div>

      {/* Citations */}
      <div className="mb-6">
        <label className="block font-dmsans dark:text-slate-300 mb-1">
          Citations (optional)
        </label>
        <textarea
          className="w-full h-32 px-4 py-3 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 dark:text-white"
          value={citations}
          onChange={(e) => setCitations(e.target.value)}
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={saveDraft}
          className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-dmsans"
        >
          Save Draft
        </button>

        <button
          onClick={publish}
          className="px-6 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-dmsans"
        >
          Publish
        </button>
      </div>
    </div>
  );
}
