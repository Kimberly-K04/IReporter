import { useRecords } from "../context/RecordsContext";
import { Shield } from "lucide-react";

export default function AdminDashboard() {
  const { records, updateStatus } = useRecords();

  const stats = {
    redFlags: records.filter(r => r.status === "red-flag").length,
    pending: records.filter(r => r.status === "under investigation").length,
    resolved: records.filter(r => r.status === "resolved").length,
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black italic text-white">ADMIN CONTROL</h1>
          <p className="text-slate-400 text-sm uppercase tracking-widest">Investigation Management</p>
        </div>
        <div className="bg-blue-600/10 text-blue-500 p-3 rounded-xl flex items-center gap-2 font-bold text-sm">
          <Shield size={18}/> AUTHORIZED ACCESS
        </div>
      </div>

      {/* LIVE STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-slate-800 rounded-3xl shadow-xl border-b-4 border-red-500">
          <h4 className="text-xs font-black text-slate-400 uppercase mb-2">Red-Flags</h4>
          <p className="text-4xl font-black italic text-white">{String(stats.redFlags).padStart(2, '0')}</p>
        </div>
        <div className="p-6 bg-slate-800 rounded-3xl shadow-xl border-b-4 border-orange-500">
          <h4 className="text-xs font-black text-slate-400 uppercase mb-2">Pending</h4>
          <p className="text-4xl font-black italic text-white">{String(stats.pending).padStart(2, '0')}</p>
        </div>
        <div className="p-6 bg-slate-800 rounded-3xl shadow-xl border-b-4 border-emerald-500">
          <h4 className="text-xs font-black text-slate-400 uppercase mb-2">Resolved</h4>
          <p className="text-4xl font-black italic text-white">{String(stats.resolved).padStart(2, '0')}</p>
        </div>
      </div>

      {/* RECORDS TABLE */}
      <div className="bg-slate-800 rounded-3xl shadow-xl overflow-hidden border border-slate-700">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-900 text-[10px] font-black uppercase tracking-widest text-slate-400">
              <th className="p-6">Incident Details</th>
              <th className="p-6">Type</th>
              <th className="p-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {records.map((record) => (
              <tr key={record.id} className="hover:bg-slate-700/30 transition-colors">
                <td className="p-6">
                  <p className="font-bold text-white">{record.title}</p>
                  <p className="text-xs text-slate-400">
                    {new Date(record.created_at).toLocaleString()}
                  </p>
                </td>
                <td className="p-6">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                    record.type === "red-flag"
                      ? "bg-red-500/10 text-red-400"
                      : "bg-blue-500/10 text-blue-400"
                  }`}>
                    {record.type}
                  </span>
                </td>
                <td className="p-6 text-right">
                  <select
                    value={record.status}
                    onChange={e => updateStatus(record.id, e.target.value)}
                    className="bg-slate-900 border border-slate-700 text-white p-2 rounded-lg text-xs font-bold outline-none cursor-pointer"
                  >
                    <option value="under investigation">Under Investigation</option>
                    <option value="resolved">Resolved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}