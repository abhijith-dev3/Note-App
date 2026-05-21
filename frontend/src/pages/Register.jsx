import { AuthContext } from "../context/AuthContext";
import { useState,useContext } from "react";
import API from "../services/api";
import { useNavigate,Link } from "react-router-dom";

export default function Register(){
 const {setUser,setToken} = useContext(AuthContext);
    const navigate = useNavigate();

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [loading,setLoading] = useState(false);

    const handleRegister = async(e) => {
        e.preventDefault();

        try{
            setLoading(true)


               await API.post("/auth/register" ,{
                name,
                email,
                password
            })

            const loginRes = await API.post("/auth/login",{
                email,password
            })

            const {token,user} = loginRes.data

            setToken(token);
            setUser(user);
            localStorage.setItem("token",token)

            navigate("/dashboard")
        }catch(error){
            console.log(error.response?.data?.message|| "Registration failed");
        }finally{
            setLoading(false);
        }
    }
    return(
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-purple-100 via-white to-blue-100 px-4">
            <div className="w-full max-w-md bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl p-8 border-gray-100">
                <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Create Account</h2>

                <form onSubmit={handleRegister}
                className="space-y-4">
                    <input type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-3 focus:ring-purple-400 transition shadow-sm"/>

                    <input type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-3 focus:ring-purple-400 transition shadow-sm"/>

                    <input type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-3 focus:ring-purple-400 transition shadow-sm"/>

                    <button type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-purple-500 to-purple-700 transition text-white py-3 rounded-xl font-semibold hover:scale-[1.02] hover:shadow-lg">{loading ? "Registering..." : "Register"} </button>
                </form>

                <p className="text-center text-sm text-gray-600">Already have an account? 
                    <Link to="/" 
                    className="text-purple-600 font-semibold hover:underline">Login</Link>
                </p>
            </div>
        </div>
    )
}