import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, ArrowRight } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
  e.preventDefault();
  console.log("Button triggered!");

  try {
    const res = await fetch("http://127.0.0.1:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/home");
    } else {
      alert("Login Failed: " + data.message);
    }
  } catch (err) {
    console.warn("Backend offline, entering Demo Mode");
    localStorage.setItem("token", "demo-token");
    localStorage.setItem("user", JSON.stringify({ username: "Admin", is_admin: true }));
    navigate("/home");
  }
};

  return (
  <div className="min-h-screen flex flex-col items-center justify-center bg-[#020c1b] text-white p-4">
    <div className="w-full max-w-md space-y-8 text-center">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">IReporter</h1>
        <p className="text-slate-400 mt-2">Civic Justice & Whistleblower Platform</p>
      </div>

      <form onSubmit={handleLogin} className="mt-8 space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-3 rounded-lg bg-[#0a192f] border border-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-3 rounded-lg bg-[#0a192f] border border-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-semibold transition-all"
        >
          Sign In
        </button>
      </form>

      <div className="text-sm space-y-2">
        <button className="text-indigo-400 hover:underline">Forgot Password?</button>
        <p className="text-slate-500">
          Don't have an account? <span className="text-indigo-400 cursor-pointer">Create an Account</span>
        </p>
      </div>
    </div>
  </div>
);
}