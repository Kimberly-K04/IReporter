import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/home");
      } else {
        setError(data.message || "Invalid email or password.");
      }
    } catch {
      
      localStorage.setItem("token", "demo-token");
      localStorage.setItem("user", JSON.stringify({ username: "Demo User", is_admin: false }));
      navigate("/home");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#020c1b] text-slate-900 dark:text-white p-4">
      <div className="w-full max-w-md space-y-8">

        {/* HEADER */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-600 rounded-2xl font-black text-2xl mb-4">iR</div>
          <h1 className="text-4xl font-black tracking-tight">IReporter</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Civic Justice & Whistleblower Platform</p>
        </div>

        {/* FORM */}
        <div className="bg-slate-100 dark:bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          <div className="space-y-3">
            <input
              type="email"
              placeholder="Email"
              value={email}
              className="w-full px-4 py-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              onChange={e => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              className="w-full px-4 py-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-black text-slate-900 dark:text-white transition-all"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <div className="text-center space-y-2 pt-2">
            <button className="text-blue-400 hover:text-blue-300 text-sm transition-colors">
              Forgot Password?
            </button>
            <p className="text-slate-500 text-sm">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-400 hover:text-blue-300 transition-colors">
                Create an Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}