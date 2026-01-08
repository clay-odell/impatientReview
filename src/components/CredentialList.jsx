import { useEffect, useState } from "react";
import API from "../../api";

export default function CredentialList() {
  const [credentials, setCredentials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadCredentials() {
    try {
      setLoading(true);
      const res = await API.listCredentials();
      setCredentials(res.credentials || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this credential? This cannot be undone.")) return;

    try {
      await API.deleteCredential(id);
      setCredentials((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      alert(err.message);
    }
  }

  useEffect(() => {
    loadCredentials();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-12 bg-white dark:bg-slate-900 shadow-xl rounded-xl p-8 border border-slate-300 dark:border-slate-700">
      <h2 className="font-calsans text-4xl text-center mb-6 dark:text-white">
        Registered Credentials
      </h2>

      {error && (
        <p className="text-red-600 dark:text-red-400 text-center mb-4 font-dmsans">
          {error}
        </p>
      )}

      {loading ? (
        <p className="text-center font-dmsans dark:text-slate-300">
          Loading credentials…
        </p>
      ) : credentials.length === 0 ? (
        <p className="text-center font-dmsans dark:text-slate-300">
          No credentials registered.
        </p>
      ) : (
        <table className="w-full border-collapse font-dmsans">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800 text-left">
              <th className="p-3 text-slate-700 dark:text-slate-300">Name</th>
              <th className="p-3 text-slate-700 dark:text-slate-300">Created</th>
              <th className="p-3 text-slate-700 dark:text-slate-300">Actions</th>
            </tr>
          </thead>

          <tbody>
            {credentials.map((cred) => (
              <tr
                key={cred.id}
                className="border-b border-slate-200 dark:border-slate-700"
              >
                <td className="p-3 dark:text-white">
                  {cred.credential_nickname || "Unnamed Credential"}
                </td>

                <td className="p-3 dark:text-slate-300">
                  {new Date(cred.created_at).toLocaleString()}
                </td>

                <td className="p-3">
                  <button
                    onClick={() => handleDelete(cred.id)}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
