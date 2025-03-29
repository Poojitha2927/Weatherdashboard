import React, { useState } from "react";

export default function SearchBar({ fetchWeather }) {
  const [city, setCity] = useState("");

  const handleSearch = () => {
    if (city.trim()) {
      fetchWeather(city);
      setCity("");
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Enter city name..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleSearch()}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}
