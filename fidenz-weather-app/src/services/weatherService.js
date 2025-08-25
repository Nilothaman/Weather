import axios from "axios";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const GROUP_URL = "https://api.openweathermap.org/data/2.5/group";
const ONE_CITY_URL = "https://api.openweathermap.org/data/2.5/weather";

//Log API key status
console.log("API Key loaded:", API_KEY ? "Yes" : "No");
console.log("API Key value:", API_KEY);
const TTL = 5 * 60 * 1000; // 5 minutes

//simple localStorage cache helpers 
function getCache(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const { expiry, payload } = JSON.parse(raw);
    if (Date.now() > expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

function setCache(key, payload, ttl = TTL) {
  const value = JSON.stringify({ expiry: Date.now() + ttl, payload });
  localStorage.setItem(key, value);
}

//split IDs into batches of 20(OWM group API limit)
function chunk(arr, size = 20) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export async function getCityIds() {
  const res = await fetch("/cities.json");
  const all = await res.json();

  const cityArray = all.List;

  if (!Array.isArray(cityArray)) {
    throw new Error("cities.json format invalid – expected an array under 'List'");
  }

  return cityArray.map((c) => c.CityCode).filter(Boolean);
}

export async function getGroupWeather(cityIds) {
  const ids = [...new Set(cityIds)].map(String).sort();
  const cacheKey = `group_${ids.join(",")}`;
  const cached = getCache(cacheKey);
  if (cached) return cached;

  // Try group endpoint first, fallback to individual calls
  try {
    console.log("Trying group endpoint first...");
    const batches = chunk(ids, 20);
    const results = [];
    for (const batch of batches) {
      const params = { id: batch.join(","), units: "metric", appid: API_KEY };
      console.log("Making group API request with params:", params);
      
      const { data } = await axios.get(GROUP_URL, {
        params: params,
      });
     
      results.push(...data.list);
    }
    const merged = { list: results };
    setCache(cacheKey, merged);
    return merged;
  } catch (error) {
    console.log("Group endpoint failed, trying individual calls...", error.message);
    
    const results = [];
    for (const id of ids) {
      try {
        const { data } = await axios.get(ONE_CITY_URL, {
          params: { id, units: "metric", appid: API_KEY },
        });
        results.push(data);
      } catch (individualError) {
        console.error(`Failed to get weather for city ${id}:`, individualError.message);
       
      }
    }
    
    const merged = { list: results };
    setCache(cacheKey, merged);
    return merged;
  }
}

// Show weather details for particular city
export async function getCityWeather(id) {
  const cacheKey = `city_${id}`;
  const cached = getCache(cacheKey);
  if (cached) return cached;

  const { data } = await axios.get(ONE_CITY_URL, {
    params: { id, units: "metric", appid: API_KEY },
  });
  setCache(cacheKey, data);
  return data;
}
