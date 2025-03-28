import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";


export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("client"); // Default role
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMsg(""); // Reset error message
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { role } }, // Store role in metadata
    });

    if (error) {
      setErrorMsg(error.message);
      console.error("Signup error:", error.message);
    } else if (data.user) {
      console.log("Signed up:", data.user);
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Signup</h2>
        {errorMsg && <p className="text-red-500 text-center">{errorMsg}</p>}
        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="email"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <select
            className="w-full p-2 border border-gray-300 rounded"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="admin">Admin</option>
            <option value="lawyer">Lawyer</option>
            <option value="client">Client</option>
            <option value="paralegal">Paralegal</option>
          </select>
          <button className="w-full bg-blue-600 text-white py-2 rounded">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}
