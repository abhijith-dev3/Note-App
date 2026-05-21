import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user,setUser, setToken } = useContext(AuthContext);
  const navigate = useNavigate();


  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const initials = user?.name
    ? user.name.charAt(0).toUpperCase()
    : "?";

  return (
    <nav className="bg-white border-b border-stone-100 px-7 flex justify-between items-center h-[60px]">

   
      <div className="flex items-center gap-2">
        <span className="w-[7px] h-[7px] rounded-full bg-terracotta inline-block" />
        <span className="font-lora text-[18px] font-medium text-terracotta tracking-tight">
          Notes
        </span>
      </div>

  
      <div className="flex items-center gap-3.5">

        {user && (
          <div className="flex items-center gap-2 text-[13px] text-stone-500">
            <div className="w-7 h-7 rounded-full bg-terracotta/10 flex items-center justify-center text-[11px] font-medium text-terracotta">
              {initials}
            </div>
            <span>Hi, {user.name}</span>
          </div>
        )}

        <div className="w-px h-5 bg-stone-100" />

        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-1.5 text-[13px] text-stone-400 border border-stone-200 rounded-[9px] px-3.5 py-[7px] transition-all duration-150 hover:text-red-500 hover:border-red-300 hover:bg-red-50"
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
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Logout
        </button>

      </div>
    </nav>
  );
}
