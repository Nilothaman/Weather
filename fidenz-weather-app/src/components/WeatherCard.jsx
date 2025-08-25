import { themeForTemp } from "../utils/theme";
import { timeFromUnix, dateTimeFromUnix } from "../utils/format";

export default function WeatherCard({ city, onClick }) {
  const theme = themeForTemp(city.main?.temp ?? 0);

  return (
    <div className={`card ${theme}`} onClick={onClick} role="button" aria-label={`${city.name} weather`}>
      <div className="card-top">
        <div>
          <p className="city">{city.name}, {city.sys?.country}</p>
          <p className="small">{dateTimeFromUnix(city.dt)}</p>
          <p className="desc">{city.weather?.[0]?.description ?? "-"}</p>
        </div>
        <p className="temp">{Math.round(city.main?.temp ?? 0)}°C</p>
        <div className="split" />
      </div>

      <div className="card-bottom">
        <div><strong>Pressure:</strong><br />{city.main?.pressure}hPa</div>
        <div><strong>Humidity:</strong><br />{city.main?.humidity}%</div>
        <div><strong>Wind:</strong><br />{city.wind?.speed}m/s {city.wind?.deg}°</div>
        <div><strong>Visibility:</strong><br />{(city.visibility ?? 0)/1000}km</div>
        <div><strong>Temp Min:</strong><br />{Math.round(city.main?.temp_min ?? 0)}°C</div>
        <div><strong>Temp Max:</strong><br />{Math.round(city.main?.temp_max ?? 0)}°C</div>
        <div><strong>Sunrise:</strong><br />{timeFromUnix(city.sys?.sunrise)}</div>
        <div><strong>Sunset:</strong><br />{timeFromUnix(city.sys?.sunset)}</div>
      </div>
    </div>
  );
}
