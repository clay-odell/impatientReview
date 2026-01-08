import { useState } from "react";

import PoemDraftForm from "./PoetryDraftForm";
import PoemDraftList from "./PoemDraftList";
import CredentialList from "./CredentialList";

import ShortShortFictionDraftForm from "./ShortShortFictionDraftForm";
import ShortShortFictionDraftList from "./ShortShortFictionDraftList";

export default function AdminDashboard() {
  const [showPoemForm, setShowPoemForm] = useState(false);
  const [showDrafts, setShowDrafts] = useState(false);
  const [showCredentials, setShowCredentials] = useState(false);

  const [showShortForm, setShowShortForm] = useState(false);
  const [showShortDrafts, setShowShortDrafts] = useState(false);

  function hideAllExcept(setter) {
    setShowPoemForm(false);
    setShowDrafts(false);
    setShowCredentials(false);
    setShowShortForm(false);
    setShowShortDrafts(false);
    setter(true);
  }

  return (
    <main className="min-h-screen bg-slate-200 dark:bg-slate-800 px-6 py-12">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="font-calsans text-5xl md:text-6xl dark:text-white tracking-tight">
          Admin Dashboard
        </h1>
        <p className="font-dmsans text-xl dark:text-slate-300 mt-2">
          Welcome back. Let’s keep Impatient Review thriving.
        </p>
      </header>

      {/* Dashboard Container */}
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Action Panel */}
        <div className="bg-white dark:bg-slate-900 shadow-lg rounded-xl p-6 border border-slate-300 dark:border-slate-700">
          <h2 className="font-dmsans text-2xl dark:text-white mb-4">Actions</h2>

          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            {/* Create Poetry Draft */}
            <button
              onClick={() =>
                showPoemForm ? setShowPoemForm(false) : hideAllExcept(setShowPoemForm)
              }
              className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-dmsans text-lg transition"
            >
              {showPoemForm ? "Hide Poetry Draft Form" : "Create Poetry Draft"}
            </button>

            {/* View Poetry Drafts */}
            <button
              onClick={() =>
                showDrafts ? setShowDrafts(false) : hideAllExcept(setShowDrafts)
              }
              className="px-6 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-dmsans text-lg transition"
            >
              {showDrafts ? "Hide Poetry Drafts" : "View Poetry Drafts"}
            </button>

            {/* Create Short Fiction Draft */}
            <button
              onClick={() =>
                showShortForm ? setShowShortForm(false) : hideAllExcept(setShowShortForm)
              }
              className="px-6 py-3 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-dmsans text-lg transition"
            >
              {showShortForm ? "Hide Short Fiction Form" : "Create Short Fiction Draft"}
            </button>

            {/* View Short Fiction Drafts */}
            <button
              onClick={() =>
                showShortDrafts
                  ? setShowShortDrafts(false)
                  : hideAllExcept(setShowShortDrafts)
              }
              className="px-6 py-3 rounded-lg bg-yellow-600 hover:bg-yellow-700 text-white font-dmsans text-lg transition"
            >
              {showShortDrafts ? "Hide Short Fiction Drafts" : "View Short Fiction Drafts"}
            </button>

            {/* Credential Manager */}
            <button
              onClick={() =>
                showCredentials ? setShowCredentials(false) : hideAllExcept(setShowCredentials)
              }
              className="px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-dmsans text-lg transition"
            >
              {showCredentials ? "Hide Credentials" : "Manage Credentials"}
            </button>
          </div>
        </div>

        {/* Conditional Panels */}
        {showPoemForm && (
          <div className="mt-6">
            <PoemDraftForm onCreated={() => setShowPoemForm(false)} />
          </div>
        )}

        {showDrafts && (
          <div className="mt-6">
            <PoemDraftList />
          </div>
        )}

        {showShortForm && (
          <div className="mt-6">
            <ShortShortFictionDraftForm onCreated={() => setShowShortForm(false)} />
          </div>
        )}

        {showShortDrafts && (
          <div className="mt-6">
            <ShortShortFictionDraftList />
          </div>
        )}

        {showCredentials && (
          <div className="mt-6">
            <CredentialList />
          </div>
        )}
      </div>
    </main>
  );
}
