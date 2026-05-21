import API from "../services/api";

export default function NoteCard({ note, onDelete }) {
  const handleDelete = async () => {
    try {
      await API.delete(`/notes/${note._id}`);
      onDelete();
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  return (
    <div className="group relative bg-white border border-stone-100 rounded-2xl p-5 flex flex-col transition-all duration-200 hover:border-stone-200 overflow-hidden">
  
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-terracotta opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-t-2xl" />

      <h2 className="font-lora text-[15px] font-medium text-stone-800 mb-2 leading-snug">
        {note.title}
      </h2>
      <p className="text-[13px] text-stone-500 leading-relaxed flex-1 mb-4">
        {note.content}
      </p>

      <div className="flex justify-end">
        <button
          onClick={handleDelete}
          className="inline-flex items-center gap-1.5 text-xs text-stone-400 border border-stone-200 rounded-lg px-3 py-1.5 transition-all duration-150 hover:text-red-500 hover:border-red-300 hover:bg-red-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14H6L5 6" />
            <path d="M10 11v6M14 11v6" />
            <path d="M9 6V4h6v2" />
          </svg>
          Delete
        </button>
      </div>
    </div>
  );
}
