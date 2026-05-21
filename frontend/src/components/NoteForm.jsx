import { useState } from "react";
import API from "../services/api";

export default function NoteForm({ onNoteAdded }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/notes", { title, content });
      setTitle("");
      setContent("");
      onNoteAdded();
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-stone-100 rounded-2xl p-5 mb-4"
    >
      <p className="text-[11px] font-medium uppercase tracking-widest text-stone-400 mb-4">
        New note
      </p>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-2.5 px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-800 placeholder-stone-400 outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/10"
      />

      <textarea
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={3}
        className="w-full mb-4 px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-800 placeholder-stone-400 outline-none resize-none leading-relaxed transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/10"
      />

      <button
        type="submit"
        className="inline-flex items-center gap-1.5 text-[13px] text-stone-400 border border-stone-200 rounded-[9px] px-3.5 py-[7px] transition-all duration-150 hover:text-blue-500 hover:border-blue-300 hover:bg-blue-50 "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        Add note
      </button>
    </form>
  );
}
