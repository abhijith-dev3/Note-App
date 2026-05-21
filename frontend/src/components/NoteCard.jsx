import API from "../services/api";

export default function NoteCard({ note, index, onDelete }) {
  const handleDelete = async () => {
    try {
      await API.delete(`/notes/${note._id}`);
      onDelete();
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  return (
    <div className="bg-[#181715] border border-[#2a2825] rounded-2xl p-5 flex flex-col hover:border-[#3d3a35] transition-all duration-200">
      <p className="font-mono text-[10px] text-[#4a4845] mb-2.5">
        {String(index).padStart(2, "0")} —
      </p>
      <h2 className="font-[Playfair_Display] text-[15px] font-medium text-[#e8e4dc] mb-2 leading-snug">
        {note.title}
      </h2>
      <p className="font-mono text-xs text-[#6b6760] leading-relaxed flex-1 mb-5">
        {note.content}
      </p>
      <div className="flex justify-end pt-3 border-t border-[#2a2825]">
        <button
          onClick={handleDelete}
          className="font-mono text-[11px] text-[#4a4845] border border-[#2a2825] rounded-lg px-3 py-1.5 flex items-center gap-1.5 hover:text-red-400 hover:border-red-900/50 hover:bg-red-950/20 transition-all"
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6l-1 14H6L5 6"/>
            <path d="M9 6V4h6v2"/>
          </svg>
          delete
        </button>
      </div>
    </div>
  );
}
