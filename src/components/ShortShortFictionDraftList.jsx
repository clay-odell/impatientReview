import { useEffect, useState } from "react";
import API from "../../api";
import ShortShortFictionEditor from "./ShortShortFictionEditor";

export default function ShortShortFictionDraftList() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadDrafts() {
    try {
      setLoading(true);
      const res = await API.listShortFiction("draft");
      setStories(res.stories || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handlePublish(id) {
    try {
      await API.publishShortFiction(id);
      loadDrafts();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this draft?")) return;
    try {
      await API.deleteShortFiction(id);
      loadDrafts();
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    loadDrafts();
  }, []);

  return (
    <div className="bg-white dark:bg-slate-900 shadow-lg rounded-xl p-8 border border-slate-300 dark:border-slate-700">
      <h2 className="font-calsans text-4xl mb-6 dark:text-white">
        Short Fiction Drafts
      </h2>

      {error && (
        <p className="text-red-600 dark:text-red-400 mb-4 font-dmsans">
          {error}
        </p>
      )}

      {loading ? (
        <p className="font-dmsans dark:text-slate-300">Loading drafts…</p>
      ) : stories.length === 0 ? (
        <p className="font-dmsans dark:text-slate-300">
          No short fiction drafts found.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full font-dmsans">
            <thead>
              <tr className="text-left border-b border-slate-300 dark:border-slate-700">
                <th className="py-3 pr-4 dark:text-white">Title</th>
                <th className="py-3 pr-4 dark:text-white">Author</th>
                <th className="py-3 pr-4 dark:text-white">Created</th>
                <th className="py-3 pr-4 dark:text-white">Actions</th>
              </tr>
            </thead>

            <tbody>
              {stories.map((story) => (
                <tr
                  key={story.id}
                  className="border-b border-slate-200 dark:border-slate-700"
                >
                  <td className="py-3 pr-4 dark:text-slate-200">
                    {story.title}
                  </td>
                  <td className="py-3 pr-4 dark:text-slate-200">
                    {story.author}
                  </td>
                  <td className="py-3 pr-4 dark:text-slate-400">
                    {new Date(story.created_at).toLocaleDateString()}
                  </td>

                  <td className="py-3 pr-4 flex gap-3">
                    <button
                      onClick={() => handlePublish(story.id)}
                      className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 text-white text-sm transition"
                    >
                      Publish
                    </button>

                    <button
                      onClick={() => handleDelete(story.id)}
                      className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white text-sm transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
