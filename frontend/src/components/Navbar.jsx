import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, setUser, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const initials = user?.name ? user.name.charAt(0).toUpperCase() : "?";

  return (
    <nav className="sticky top-0 z-50 bg-[#111110]/90 backdrop-blur border-b border-[#2a2825] h-14 flex items-center justify-between px-7">
      {/* Logo */}
      <div className="flex items-center gap-2.5">
        <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
        <span className="font-[Playfair_Display] text-[17px] font-medium text-amber-400 tracking-tight">
          Notes
        </span>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {user && (
          <div className="flex items-center gap-2 font-mono text-xs text-[#6b6760]">
            <div className="w-7 h-7 rounded-full bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-[10px] font-medium text-amber-400">
              {initials}
            </div>
            {user.name}
          </div>
        )}
        <div className="w-px h-4 bg-[#2a2825]" />
        <button
          onClick={handleLogout}
          className="font-mono text-xs text-[#6b6760] border border-[#2a2825] rounded-lg px-3 py-1.5 flex items-center gap-1.5 hover:text-red-400 hover:border-red-900/60 hover:bg-red-950/30 transition-all"
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          logout
        </button>
      </div>
    </nav>
  );
}
