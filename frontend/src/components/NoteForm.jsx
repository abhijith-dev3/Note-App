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
    <form onSubmit={handleSubmit} className="bg-[#181715] border border-[#2a2825] rounded-2xl p-5 mb-3">
      <p className="font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-[#6b6760] mb-4 flex items-center gap-3 after:flex-1 after:h-px after:bg-[#2a2825]">
        new note
      </p>

      <input
        type="text"
        placeholder="Title…"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full bg-[#111110] border border-[#2a2825] rounded-xl px-4 py-2.5 font-mono text-sm text-[#e8e4dc] placeholder-[#4a4845] outline-none mb-2.5 focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/20 transition"
      />

      <textarea
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={3}
        className="w-full bg-[#111110] border border-[#2a2825] rounded-xl px-4 py-2.5 font-mono text-sm text-[#e8e4dc] placeholder-[#4a4845] outline-none resize-none mb-4 focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/20 transition leading-relaxed"
      />

      <button
        type="submit"
        className="inline-flex items-center gap-2 bg-amber-400 text-[#111110] font-mono text-xs font-medium px-4 py-2 rounded-lg hover:bg-amber-300 transition-all active:scale-95"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="12" y1="5" x2="12" y2="19"/>
          <line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
        add note
      </button>
    </form>
  );
}
