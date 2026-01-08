// components/PoemDraftList.jsx
import { useEffect, useState } from "react";
import API from "../../api";
import Modal from "./Modal";
import PoetryEditor from "./PoetryEditor";

export default function PoemDraftList() {
  const [drafts, setDrafts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const [confirmModal, setConfirmModal] = useState({ open: false, poem: null });

  async function loadDrafts() {
    try {
      setLoading(true);
      const res = await API.listPoems("draft");
      setDrafts(res.poems || []);
      setError("");
    } catch (err) {
      setError(err.message || "Failed to load drafts");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDrafts();
  }, []);

  function openDeleteModal(poem) {
    setConfirmModal({ open: true, poem });
  }

  function closeDeleteModal() {
    setConfirmModal({ open: false, poem: null });
  }

  async function confirmDelete() {
    const poem = confirmModal.poem;
    if (!poem) return;

    setDeletingId(poem.id);
    const previous = drafts;
    setDrafts((prev) => prev.filter((p) => p.id !== poem.id));
    closeDeleteModal();

    try {
      await API.deletePoem(poem.id);
      setError("");
    } catch (err) {
      setDrafts(previous);
      setError(err.message || "Failed to delete draft");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="max-w-3xl mx-auto mt-12 bg-white dark:bg-slate-900 shadow-xl rounded-xl p-8 border border-slate-300 dark:border-slate-700">
      <h2 className="font-calsans text-4xl text-center mb-6 dark:text-white">
        Draft Poems
      </h2>

      {error && (
        <p className="text-red-600 dark:text-red-400 text-center mb-4 font-dmsans">
          {error}
        </p>
      )}

      {/* ✅ EDITOR MODE */}
      {editingId ? (
        <PoetryEditor
          id={editingId}
          onSaved={() => {
            setEditingId(null);
            loadDrafts();
          }}
          onPublished={() => {
            setEditingId(null);
            loadDrafts();
          }}
        />
      ) : loading ? (
        <p className="text-center font-dmsans dark:text-slate-300">
          Loading drafts…
        </p>
      ) : drafts.length === 0 ? (
        <p className="text-center font-dmsans dark:text-slate-300">
          No drafts yet.
        </p>
      ) : (
        <table className="w-full border-collapse font-dmsans">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800 text-left">
              <th className="p-3 text-slate-700 dark:text-slate-300">Title</th>
              <th className="p-3 text-slate-700 dark:text-slate-300">Author</th>
              <th className="p-3 text-slate-700 dark:text-slate-300">
                Created
              </th>
              <th className="p-3 text-slate-700 dark:text-slate-300">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {drafts.map((poem) => (
              <tr
                key={poem.id}
                className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
              >
                <td className="p-3 dark:text-white">{poem.title}</td>
                <td className="p-3 dark:text-slate-300">{poem.author}</td>
                <td className="p-3 dark:text-slate-300">
                  {new Date(poem.created_at).toLocaleString()}
                </td>
                <td className="p-3">
                  <button
                    onClick={() => setEditingId(poem.id)}
                    className="px-3 py-1 mr-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => openDeleteModal(poem)}
                    disabled={deletingId === poem.id}
                    className="px-3 py-1 rounded-md bg-red-600 hover:bg-red-700 text-white text-sm transition disabled:opacity-50"
                  >
                    {deletingId === poem.id ? "Deleting…" : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Modal
        open={confirmModal.open}
        title="Delete Draft"
        onConfirm={confirmDelete}
        onCancel={closeDeleteModal}
        confirmLabel={deletingId ? "Deleting…" : "Delete"}
        cancelLabel="Cancel"
        confirmDisabled={!!deletingId}
      >
        <p>
          Are you sure you want to permanently delete the draft{" "}
          <strong className="dark:text-white">
            {confirmModal.poem?.title}
          </strong>
          ?
        </p>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          This action cannot be undone.
        </p>
      </Modal>
    </div>
  );
}
