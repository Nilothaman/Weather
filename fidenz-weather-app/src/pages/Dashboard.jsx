import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCityIds, getGroupWeather } from "../services/weatherService";
import WeatherCard from "../components/WeatherCard";

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const ids = await getCityIds();
        const data = await getGroupWeather(ids);
        setItems(data.list);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p>Loading weather data…</p>;

  return (
    <div className="content-container">
      
      <div style={{ display: "flex", gap: 8, justifyContent: "center", margin: "10px 0 22px" }}>
        <input placeholder="Enter a city" disabled style={{ width: 320, padding: 10, borderRadius: 8, border: "none" }} />
        <button disabled>Add City</button>
      </div>

      <div className="grid">
        {items.map((c) => (
          <WeatherCard key={c.id} city={c} onClick={() => navigate(`/city/${c.id}`)} />
        ))}
      </div>

      <p className="footer">2025 Fidenz Technologies</p>
    </div>
  );
}
