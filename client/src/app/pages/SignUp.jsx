import { useState } from "react";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">

      <div className="bg-slate-800 p-6 rounded-xl w-80 space-y-4">

        <h1 className="text-xl font-bold">Sign Up</h1>

        <input
          placeholder="Email"
          className="w-full p-2 rounded bg-slate-700"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Password"
          type="password"
          className="w-full p-2 rounded bg-slate-700"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-green-500 p-2 rounded">
          Create Account
        </button>

      </div>
    </div>
  );
}