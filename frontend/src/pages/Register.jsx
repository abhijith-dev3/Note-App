import { useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const { setUser, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await API.post("/auth/register", { name, email, password });
      const loginRes = await API.post("/auth/login", { email, password });
      const { token, user } = loginRes.data;
      setToken(token);
      setUser(user);
      localStorage.setItem("token", token);
      navigate("/dashboard");
    } catch (error) {
      console.log(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#111110] px-4">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
            <span className="font-[Playfair_Display] text-[17px] font-medium text-amber-400">Notes</span>
          </div>
          <h2 className="font-[Playfair_Display] text-3xl font-medium text-[#e8e4dc] tracking-tight">
            Create account
          </h2>
          <p className="font-mono text-xs text-[#6b6760] mt-2">// start capturing your thoughts</p>
        </div>

        {/* Form card */}
        <form onSubmit={handleRegister} className="bg-[#181715] border border-[#2a2825] rounded-2xl p-7 space-y-4">
          <div>
            <label className="font-mono text-[10px] uppercase tracking-widest text-[#6b6760] block mb-1.5">
              Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#111110] border border-[#2a2825] rounded-xl px-4 py-2.5 font-mono text-sm text-[#e8e4dc] placeholder-[#4a4845] outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/20 transition"
            />
          </div>
          <div>
            <label className="font-mono text-[10px] uppercase tracking-widest text-[#6b6760] block mb-1.5">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#111110] border border-[#2a2825] rounded-xl px-4 py-2.5 font-mono text-sm text-[#e8e4dc] placeholder-[#4a4845] outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/20 transition"
            />
          </div>
          <div>
            <label className="font-mono text-[10px] uppercase tracking-widest text-[#6b6760] block mb-1.5">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#111110] border border-[#2a2825] rounded-xl px-4 py-2.5 font-mono text-sm text-[#e8e4dc] placeholder-[#4a4845] outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/20 transition"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-400 text-[#111110] font-mono text-sm font-medium py-2.5 rounded-xl hover:bg-amber-300 transition-all active:scale-[0.98] disabled:opacity-60"
          >
            {loading ? "creating account…" : "register"}
          </button>
        </form>

        <p className="font-mono text-xs text-[#6b6760] text-center mt-5">
          have an account?{" "}
          <Link to="/" className="text-amber-400 hover:text-amber-300 transition">
            login
          </Link>
        </p>
      </div>
    </div>
  );
}
