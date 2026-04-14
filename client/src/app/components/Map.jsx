import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useState } from "react";
import { Search } from "lucide-react";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const pinIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
  iconSize: [32, 32],
});

function LocationPicker({ onLocationSelect }) {
  useMapEvents({
    click(e) {
      if (onLocationSelect) onLocationSelect([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
}

function FlyTo({ coords }) {
  const map = useMap();
  if (coords) map.flyTo(coords, 14);
  return null;
}

const getIcon = (status) => {
  const color = status === "red-flag" ? "red" : status === "investigating" ? "orange" : "green";
  return new L.Icon({
    iconUrl: `https://maps.google.com/mapfiles/ms/icons/${color}-dot.png`,
    iconSize: [32, 32],
  });
};

export default function Map({ incidents = [], onSelect, onLocationSelect, selectedLocation, showSearch = false }) {
  const [locationQuery, setLocationQuery] = useState("");
  const [flyCoords, setFlyCoords] = useState(null);
  const [searching, setSearching] = useState(false);

  const validIncidents = incidents.filter(
    i => i.latitude != null && i.longitude != null && !isNaN(i.latitude) && !isNaN(i.longitude)
  );

  const isValidSelected = selectedLocation &&
    Array.isArray(selectedLocation) &&
    selectedLocation.length === 2 &&
    selectedLocation[0] != null &&
    selectedLocation[1] != null;

  const searchLocation = async () => {
    if (!locationQuery.trim()) return;
    setSearching(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(locationQuery)}&format=json&limit=1`
      );
      const data = await res.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        setFlyCoords([parseFloat(lat), parseFloat(lon)]);
      }
    } catch {
      console.error("Location search failed");
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="relative h-full w-full">
      {showSearch && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-[1000] flex gap-2 w-72">
          <input
            value={locationQuery}
            onChange={e => setLocationQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && searchLocation()}
            placeholder="Search location..."
            className="flex-1 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-blue-500 text-sm shadow-lg"
          />
          <button
            onClick={searchLocation}
            disabled={searching}
            className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg transition-all"
          >
            <Search size={16} />
          </button>
        </div>
      )}

      <MapContainer center={[-1.286389, 36.817223]} zoom={13} className="h-full w-full">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationPicker onLocationSelect={onLocationSelect} />
        {flyCoords && <FlyTo coords={flyCoords} />}

        {isValidSelected && (
          <Marker position={selectedLocation} icon={pinIcon}>
            <Popup>📍 Incident location pinned</Popup>
          </Marker>
        )}

        {validIncidents.map((i) => (
          <Marker
            key={i.id}
            position={[i.latitude, i.longitude]}
            icon={getIcon(i.status)}
            eventHandlers={{ click: () => onSelect?.(i) }}
          >
            <Popup>
              <strong>{i.title}</strong><br />{i.status}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}