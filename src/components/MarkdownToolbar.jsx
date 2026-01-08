export default function MarkdownToolbar({ onInsert }) {
  return (
    <div className="flex gap-2 mb-3 flex-wrap">
      <button
        type="button"
        onClick={() => onInsert("**bold text**")}
        className="px-3 py-1 bg-slate-300 dark:bg-slate-700 text-sm rounded hover:bg-slate-400 dark:hover:bg-slate-600 transition"
      >
        Bold
      </button>

      <button
        type="button"
        onClick={() => onInsert("*italic text*")}
        className="px-3 py-1 bg-slate-300 dark:bg-slate-700 text-sm rounded hover:bg-slate-400 dark:hover:bg-slate-600 transition"
      >
        Italic
      </button>

      <button
        type="button"
        onClick={() => onInsert("# Heading")}
        className="px-3 py-1 bg-slate-300 dark:bg-slate-700 text-sm rounded hover:bg-slate-400 dark:hover:bg-slate-600 transition"
      >
        H1
      </button>

      <button
        type="button"
        onClick={() => onInsert("## Subheading")}
        className="px-3 py-1 bg-slate-300 dark:bg-slate-700 text-sm rounded hover:bg-slate-400 dark:hover:bg-slate-600 transition"
      >
        H2
      </button>

      <button
        type="button"
        onClick={() => onInsert("[link text](https://example.com)")}
        className="px-3 py-1 bg-slate-300 dark:bg-slate-700 text-sm rounded hover:bg-slate-400 dark:hover:bg-slate-600 transition"
      >
        Link
      </button>

      <button
        type="button"
        onClick={() => onInsert("\n\n---\n\n")}
        className="px-3 py-1 bg-slate-300 dark:bg-slate-700 text-sm rounded hover:bg-slate-400 dark:hover:bg-slate-600 transition"
      >
        Divider
      </button>
    </div>
  );
}
