import { useState } from 'react';
import Map from '../components/Map';
import { Camera, Video, Send } from 'lucide-react';
import { useLocation } from "react-router-dom";

export default function ReportSubmission() {
  const routerState = useLocation();
  const [formData, setFormData] = useState({ title: '', description: '', type: 'red-flag' });
  const [location, setLocation] = useState(routerState.state?.location || null);
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);
  const [timestamp] = useState(new Date()); // ← must be here, not inside handleSubmit

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!location) return alert("Please pin the incident location on the map.");
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('type', formData.type);
    data.append('latitude', location[0]);
    data.append('longitude', location[1]);
    data.append('created_at', new Date().toISOString());
    images.forEach(img => data.append('images', img));
    if (video) data.append('video', video);
    alert("Report packaged for Flask!");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <header>
        <h1 className="text-3xl font-black italic text-slate-900 dark:text-white">FILE A REPORT</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm uppercase tracking-widest">Provide evidence for action</p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4 bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700">

          {/* Timestamp */}
          <div className="flex items-center gap-2 px-4 py-3 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-500 dark:text-slate-400 text-xs">
            <span>🕒</span>
            <span>Report time: <span className="text-slate-900 dark:text-white font-bold">
              {timestamp.toLocaleString('en-KE', { dateStyle: 'medium', timeStyle: 'short' })}
            </span></span>
          </div>

          <select
            className="w-full p-4 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            onChange={e => setFormData({...formData, type: e.target.value})}
          >
            <option value="red-flag">🚩 Red-Flag (Corruption)</option>
            <option value="intervention">🛠️ Intervention (Infrastructure)</option>
          </select>

          <input
            placeholder="Short Title"
            className="w-full p-4 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-500"
            onChange={e => setFormData({...formData, title: e.target.value})}
            required
          />

          <textarea
            placeholder="Detailed Description..."
            className="w-full p-4 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white h-40 outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-500"
            onChange={e => setFormData({...formData, description: e.target.value})}
            required
          />

          <div className="flex gap-4">
            <label className="flex-1 flex items-center justify-center gap-2 p-4 bg-slate-100 dark:bg-slate-900 rounded-xl cursor-pointer hover:bg-blue-500/10 transition-all border-2 border-dashed border-slate-600 text-slate-500 dark:text-slate-400">
              <Camera size={20}/>
              <span className="text-xs font-bold">
                {images.length > 0 ? `${images.length} image(s)` : 'IMAGES'}
              </span>
              <input type="file" multiple hidden accept="image/*" onChange={e => setImages([...e.target.files])} />
            </label>
            <label className="flex-1 flex items-center justify-center gap-2 p-4 bg-slate-100 dark:bg-slate-900 rounded-xl cursor-pointer hover:bg-blue-500/10 transition-all border-2 border-dashed border-slate-600 text-slate-500 dark:text-slate-400">
              <Video size={20}/>
              <span className="text-xs font-bold">
                {video ? '✓ VIDEO' : 'VIDEO'}
              </span>
              <input type="file" hidden accept="video/*" onChange={e => setVideo(e.target.files[0])} />
            </label>
          </div>
        </div>

        <div className="space-y-4">
          <div className="h-[400px] rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-200 dark:border-slate-700">
            <Map onLocationSelect={setLocation} selectedLocation={location} />
          </div>
          {location && (
            <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
              📍 {location[0].toFixed(5)}, {location[1].toFixed(5)}
            </p>
          )}
          <button
            onClick={handleSubmit}
            className="w-full py-5 bg-blue-600 text-slate-900 dark:text-white font-black rounded-2xl hover:bg-blue-700 shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3 transition-all"
          >
            <Send size={20}/> SUBMIT TO AUTHORITIES
          </button>
        </div>
      </div>
    </div>
  );
}