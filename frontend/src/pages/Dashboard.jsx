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

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen bg-stone-50 p-6 md:p-10">
      <h1 className="font-lora text-3xl font-normal tracking-tight text-stone-800 mb-7">
        My <span className="text-terracotta">notes</span>
      </h1>

      <NoteForm onNoteAdded={fetchNotes} />
      <SearchBar search={search} setSearch={setSearch} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2">
        {notes
          .filter((note) =>
            note.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((note) => (
            <NoteCard key={note.id} note={note} onDelete={fetchNotes} />
          ))}
      </div>
    </div>
  );
}
