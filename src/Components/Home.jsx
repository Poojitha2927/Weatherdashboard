import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import "../index.css";
import "bootstrap/dist/css/bootstrap.css";
import refresh from "../images/refresh.svg";
import Footer from "./Footer.jsx";

export const WEATHER = "c32b649490f1417ec2b6d663c05a1a21";

export default function Home() {
  const [data, setData] = useState(null);
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLon(position.coords.longitude);
        },
        (err) => {
          setError("Geolocation access denied. Enter city manually.");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  }, []);

  // Fetch weather once lat & lon are available
  useEffect(() => {
    if (lat && lon) {
      fetchWeather(lat, lon);
    }
  }, [lat, lon]);

  const fetchWeather = async (latitude, longitude) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER}&units=metric`
      );
      setData(response.data);
    } catch (err) {
      setError("Failed to fetch weather data. Try again.");
    }
    setLoading(false);
  };

  function StaticMap() {
    const GOOGLE_API_KEY = import.meta.env.VITE_MAP_API_KEY;
    const size = "500x400";
    const zoom = 10;
    const staticURL = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lon}&zoom=${zoom}&size=${size}&key=${GOOGLE_API_KEY}`;

    return data ? (
      <div>
        <img className="static-map" src={staticURL} alt={`Map of ${data.name}`} />
        <figcaption>
          {data.name}, {data.sys.country}
        </figcaption>
      </div>
    ) : null;
  }

  return (
    <>
      <div className="bg--div">
        <h1 className="home-box1 bold">Local Weather</h1>
        <div className="home">
          <button className="refresh--btn home-box2" onClick={() => fetchWeather(lat, lon)}>
            <img className="refresh" src={refresh} width="40" alt="refresh button" />
          </button>

          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : (
            <>
              <div className="home-box3">
                {data && (
                  <>
                    <h1 className="temp bold mb-0">
                      {Math.round(data.main.temp)}
                      <sup>°C</sup>
                    </h1>
                    <h5>
                      Feels like <span>{Math.round(data.main.feels_like)}</span>
                      <sup>°C</sup>
                    </h5>
                    <h2 className="mb-0">{data.weather[0].description}</h2>
                    <img
                      src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                      alt="weather clouds icon"
                    />
                  </>
                )}
              </div>

              <div className="home-box5">
                {data && (
                  <>
                    <h5>
                      Low of {Math.round(data.main.temp_min)}
                      <sup>°C</sup>
                    </h5>
                    <h5 className="mb-0">
                      High of {Math.round(data.main.temp_max)}
                      <sup>°C</sup>
                    </h5>
                  </>
                )}
              </div>

              <div className="home-box6">
                {data && <h5>Humidity: {Math.round(data.main.humidity)}%</h5>}
                {data && <h5 className="mb-0">Wind: {Math.round(data.wind.speed)} km/h</h5>}
              </div>

              <div className="home-map home-box7">
                <StaticMap />
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
