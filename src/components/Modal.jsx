// components/Modal.jsx
import { useEffect } from "react";

export default function Modal({ open, title, children, onConfirm, onCancel, confirmLabel = "Confirm", cancelLabel = "Cancel", confirmDisabled = false }) {
  useEffect(() => {
    if (!open) return;

    function onKey(e) {
      if (e.key === "Escape") onCancel();
    }

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onCancel}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="relative z-10 w-full max-w-lg mx-4 bg-white dark:bg-slate-900 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 p-6"
      >
        <h3 id="modal-title" className="text-xl font-semibold dark:text-white mb-3">
          {title}
        </h3>

        <div className="mb-6 text-sm text-slate-700 dark:text-slate-300">
          {children}
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-md bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition"
          >
            {cancelLabel}
          </button>

          <button
            onClick={onConfirm}
            disabled={confirmDisabled}
            className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white transition disabled:opacity-50"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
