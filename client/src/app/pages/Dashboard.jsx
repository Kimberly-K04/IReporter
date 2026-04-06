import { useNavigate } from "react-router-dom";
import "../../styles/dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-6">Control Panel</h1>

      <div className="grid grid-cols-2 gap-4">
        <div onClick={() => navigate("/home")} className="p-6 bg-slate-800 rounded-xl cursor-pointer hover:bg-slate-700">
          🌍 Map
        </div>

        <div onClick={() => navigate("/home/activity")} className="p-6 bg-slate-800 rounded-xl cursor-pointer hover:bg-slate-700">
          📋 Activity
        </div>

        <div onClick={() => navigate("/home/admin")} className="p-6 bg-slate-800 rounded-xl cursor-pointer hover:bg-slate-700">
          📊 Admin
        </div>
      </div>
    </div>
  );
}

