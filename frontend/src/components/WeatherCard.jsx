import React from "react";
import useSWR from "swr";

const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Weather fetch failed");
  return res.json();
};

export default function WeatherCard({ city }) {
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const { data, error, isLoading } = useSWR(
    city
      ? `https://api.openweathermap.org/data/2.5/weather?q=${city},IN&units=metric&appid=${API_KEY}`
      : null,
    fetcher
  );

  if (!city) return null;
  if (isLoading) return <p>🌤️ Loading weather...</p>;
  if (error) return <p>⚠️ Unable to load weather</p>;

  return (
    <div
      style={{
        marginTop: 16,
        padding: 14,
        borderRadius: 12,
        background: "#F8FAFC",
        border: "1px solid rgba(15,23,35,0.08)",
        maxWidth: 320
      }}
    >
      <h4 style={{ margin: "0 0 6px 0" }}>
        Weather in {data.name}
      </h4>

      <p style={{ margin: 0 }}>
        🌡️ {Math.round(data.main.temp)}°C —{" "}
        {data.weather[0].description}
      </p>

      <p style={{ margin: 0, fontSize: 13, opacity: 0.7 }}>
        Humidity: {data.main.humidity}%
      </p>
    </div>
  );
}
