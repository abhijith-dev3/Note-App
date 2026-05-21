import { useState,useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate,Link } from "react-router-dom";

export default function Login(){
    const {setUser,setToken} = useContext(AuthContext)
    const navigate = useNavigate();

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [loading,setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        try{
            setLoading(true)

            const res = await API.post("/auth/login",{
                email,
                password
            })

            const {token,user} = res.data;

            setToken(token);
            setUser(user);

            localStorage.setItem("token",token);
            localStorage.setItem("user", JSON.stringify(user));

            navigate("/dashboard");
        }catch(error){
            console.log(error.response?.data?.message || "Login failed");
        }finally{
            setLoading(false)
        }
    }

    return(
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-100 via-white to-purple-100  px-4">
            <div className="w-full max-w-md bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl p-8 border border-gray-100 sm:p-8">
                <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800"
                >Welcome Back</h2>

                <form onSubmit={handleLogin}
                className="space-y-4">

                    <input 
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-sm"/>

                    <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-sm"/>

                    <button type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-xl font-semibold hover:scale-[1.02] hover:shadow-lg transition">{loading ? "Logging in..." : "Login"} </button>
                </form>

                <p className="text-center text-sm mt-4">Don't have account?
                    <Link to="/register"
                    className="text-blue-600 hover:underline">Register</Link>
                </p>
            </div>
        </div>
    )
}