import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCityWeather } from "../services/weatherService";
import { themeForTemp } from "../utils/theme";
import { timeFromUnix, dateTimeFromUnix } from "../utils/format";

export default function CityDetail() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const d = await getCityWeather(id);
      setData(d);
    })();
  }, [id]);

  if (!data) return <p>Loading…</p>;

  const theme = themeForTemp(data.main?.temp ?? 0);

  return (
    <div className="content-container">
      <div className={`detail ${theme}`}>
        <div className="detail-top">
          <div className="back" onClick={() => navigate(-1)}>←</div>
          <h2 style={{ margin: "8px 0 4px" }}>{data.name}, {data.sys?.country}</h2>
          <div className="small">{dateTimeFromUnix(data.dt)}</div>
          <div style={{ marginTop: 16, opacity: .95 }}>{data.weather?.[0]?.description}</div>
          <div className="detail-temp">{Math.round(data.main?.temp ?? 0)}°C</div>
          <div>Temp Min: {Math.round(data.main?.temp_min ?? 0)}°C &nbsp;|&nbsp; Temp Max: {Math.round(data.main?.temp_max ?? 0)}°C</div>
        </div>

        <div className="detail-grid">
          <div><strong>Pressure:</strong> {data.main?.pressure}hPa</div>
          <div><strong>Humidity:</strong> {data.main?.humidity}%</div>
          <div><strong>Visibility:</strong> {(data.visibility ?? 0)/1000}km</div>
          <div><strong>Wind:</strong> {data.wind?.speed}m/s {data.wind?.deg}°</div>
          <div><strong>Sunrise:</strong> {timeFromUnix(data.sys?.sunrise)}</div>
          <div><strong>Sunset:</strong> {timeFromUnix(data.sys?.sunset)}</div>
        </div>
      </div>

      <p className="footer">2025 Fidenz Technologies</p>
    </div>
  );
}
