export default function SearchBar({ search, setSearch }) {
  return (
    <div className="relative mb-7">
      <svg
        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4a4845] pointer-events-none"
        width="13" height="13" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      >
        <circle cx="11" cy="11" r="8"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
      <input
        type="text"
        placeholder="search notes…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full bg-[#181715] border border-[#2a2825] rounded-xl pl-10 pr-4 py-3 font-mono text-sm text-[#e8e4dc] placeholder-[#4a4845] outline-none focus:border-amber-400/40 focus:ring-1 focus:ring-amber-400/10 transition"
      />
    </div>
  );
}
