import { useState } from "react";
import { User, Mail, Save } from 'lucide-react';

export default function Settings() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") || '{"username":"User","email":"user@mail.com"}')
  );

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="text-3xl font-black italic text-white">SETTINGS</h1>

      <div className="bg-slate-800 rounded-3xl shadow-xl border border-slate-700 overflow-hidden">
        <div className="p-8 space-y-6">

          {/* Username */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Username
            </label>
            <div className="relative">
              <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"/>
              <input
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-900 border border-slate-700 text-white outline-none focus:border-blue-500 transition-colors"
                value={user.username}
                onChange={e => setUser({...user, username: e.target.value})}
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Email Address
            </label>
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"/>
              <input
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-900 border border-slate-700 text-white outline-none focus:border-blue-500 transition-colors"
                value={user.email}
                onChange={e => setUser({...user, email: e.target.value})}
              />
            </div>
          </div>

          {/* Save */}
          <button className="w-full py-4 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2 hover:bg-blue-700 transition-all">
            <Save size={18}/> SAVE CHANGES
          </button>

        </div>
      </div>
    </div>
  );
}