import { useState, useEffect } from "react";
import API from "../services/api";
import NoteForm from "../components/NoteForm";
import NoteCard from "../components/NoteCard";
import SearchBar from "../components/SearchBar";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");

  const fetchNotes = async () => {
    try {
      const res = await API.get("/notes");
      setNotes(res.data.notes);
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  useEffect(() => { fetchNotes(); }, []);

  const filtered = notes.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#111110] px-7 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="font-[Playfair_Display] text-[28px] font-medium text-[#e8e4dc] tracking-tight">
            My Notes
          </h1>
          <p className="font-mono text-xs text-[#6b6760] mt-1">
            // {notes.length} thoughts captured
          </p>
        </div>

        <NoteForm onNoteAdded={fetchNotes} />
        <SearchBar search={search} setSearch={setSearch} />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {filtered.map((note, i) => (
            <NoteCard key={note.id} note={note} index={i + 1} onDelete={fetchNotes} />
          ))}
        </div>
      </div>
    </div>
  );
}
