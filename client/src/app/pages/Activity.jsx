import { useNavigate } from "react-router-dom";
import recordsData from "../../data/records.json";
import imagesData from "../../data/images.json";

export default function Activity() {
  const navigate = useNavigate();

  const incidents = recordsData.records.map((record) => {
    const image = imagesData.images.find(
      (img) => img.record_id === record.id
    );

    return {
      id: record.id,
      title: record.title,
      status: record.status,
      timestamp: new Date(record.created_at).toLocaleString(),
      location: `${record.latitude}, ${record.longitude}`,
      thumbnail:
        image?.image_url ||
        "https://via.placeholder.com/400",
    };
  });

  return (
    <div style={{ padding: "20px" }}>
      <h1>Activity Feed</h1>

      <div style={{ marginTop: "20px" }}>
        {incidents.map((incident) => (
          <div
            key={incident.id}
            onClick={() =>
              navigate(`/home/incident/${incident.id}`)
            }
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              marginBottom: "15px",
              cursor: "pointer",
              overflow: "hidden",
              background: "var(--card)",
            }}
          >
            <img
              src={incident.thumbnail}
              alt={incident.title}
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
              }}
            />

            <div style={{ padding: "10px" }}>
              <h3>{incident.title}</h3>
              <p>{incident.timestamp}</p>
              <p>{incident.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}