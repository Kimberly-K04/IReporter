import { useNavigate } from "react-router-dom";
import { useRecords } from "../context/RecordsContext";
import imagesData from "../../data/images.json";

export default function Activity() {
  const navigate = useNavigate();
  const { records, loading } = useRecords();

  const incidents = records.map((record) => {
    const image = imagesData.images.find(img => img.record_id === record.id);
    return {
      id: record.id,
      title: record.title,
      status: record.status,
      type: record.type,
      timestamp: new Date(record.created_at).toLocaleString(),
      location: `${record.latitude}, ${record.longitude}`,
      thumbnail: image?.image_url || "https://via.placeholder.com/400",
    };
  });

  if (loading) return (
    <div className="flex items-center justify-center h-full text-slate-500 dark:text-slate-500 dark:text-slate-400">
      Loading incidents...
    </div>
  );

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-black italic text-slate-900 dark:text-slate-900 dark:text-white">ACTIVITY FEED</h1>

      <div className="space-y-4">
        {incidents.map((incident) => (
          <div
            key={incident.id}
            onClick={() => navigate(`/home/incident/${incident.id}`)}
            className="bg-white dark:bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden cursor-pointer hover:border-blue-500 transition-all"
          >
            <img
              src={incident.thumbnail}
              alt={incident.title}
              className="w-full h-44 object-cover"
            />
            <div className="p-4 space-y-1">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-slate-900 dark:text-slate-900 dark:text-white">{incident.title}</h3>
                <span className={`px-2 py-1 rounded-full text-[10px] font-black uppercase flex-shrink-0 ${
                  incident.status === "red-flag"
                    ? "bg-red-500/10 text-red-500 dark:text-red-400"
                    : incident.status === "investigating"
                    ? "bg-orange-500/10 text-orange-500 dark:text-orange-400"
                    : "bg-emerald-500/10 text-emerald-500 dark:text-emerald-400"
                }`}>
                  {incident.status}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-500 dark:text-slate-400">{incident.timestamp}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 dark:text-slate-500">📍 {incident.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}