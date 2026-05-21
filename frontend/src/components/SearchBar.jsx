export default function SearchBar({ search, setSearch }) {
  return (
    <div className="relative mb-6">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>

      <input
        type="text"
        placeholder="Search notes…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full pl-11 pr-4 py-3 bg-white border border-stone-100 rounded-xl text-sm text-stone-800 placeholder-stone-400 outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/10"
      />
    </div>
  );
}
