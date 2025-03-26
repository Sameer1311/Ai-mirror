"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";
import Lottie from "lottie-react";
import { AlertTriangle } from "lucide-react";

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [history, setHistory] = useState([]);
  const [city, setCity] = useState("Dehradun");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [animationData, setAnimationData] = useState(null);
  const [historyAnimations, setHistoryAnimations] = useState({});

  const weatherAnimations = {
    0: "Sun.json",
    1: "Sun.json",
    2: "Cloudy.json",
    3: "Cloudy.json",
    45: "Fog.json",
    48: "Fog.json",
    51: "Drizzle.json",
    61: "Rain.json",
    63: "Rain.json",
    65: "Rain.json",
    71: "Snow.json",
    73: "Snow.json",
    75: "Snow.json",
    95: "Thunderstorm.json",
  };

  const fetchAnimation = async (weatherCode) => {
    const animationFile = weatherAnimations[weatherCode] || "Default.json";
    try {
      const response = await fetch(`/animations/${animationFile}`);
      if (!response.ok) {
        console.error(`Error: ${animationFile} not found`);
        return null;
      }
      return await response.json();
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      setError(null);

      try {
        const geoResponse = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
        );
        const geoData = await geoResponse.json();
        if (!geoData.results || geoData.results.length === 0) {
          throw new Error("City not found");
        }

        const { latitude, longitude } = geoData.results[0];

        const weatherResponse = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
        );
        const weatherData = await weatherResponse.json();
        setWeather(weatherData.current_weather);

        const today = new Date();
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(today.getDate() - 7);

        const startDate = sevenDaysAgo.toISOString().split("T")[0];
        const endDate = today.toISOString().split("T")[0];

        const historyResponse = await fetch(
          `https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=${startDate}&end_date=${endDate}&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`
        );
        const historyData = await historyResponse.json();

        const historyArray = historyData.daily.time.map((date, index) => ({
          date,
          maxTemp: historyData.daily.temperature_2m_max[index],
          minTemp: historyData.daily.temperature_2m_min[index],
          weatherCode: historyData.daily.weathercode[index],
        }));

        setHistory(historyArray);

        // Fetch animations dynamically
        const animations = {};
        for (const day of historyArray) {
          animations[day.date] = await fetchAnimation(day.weatherCode);
        }
        setHistoryAnimations(animations);

        const currentAnimation = await fetchAnimation(weatherData.current_weather.weathercode);
        setAnimationData(currentAnimation);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setError("⚠️ Something went wrong. Please check address you've entered.");
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [city ,fetchAnimation]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full relative  px-4">
      {/* Background Video */}
      <video
        key={city}
        src="/weather.mp4"
        autoPlay
        loop
        muted
        preload="auto"
        className="absolute z-[-1] inset-0 w-full h-full object-cover  dark:opacity-30"
      />

      <div className="w-full max-w-lg md:max-w-xl lg:max-w-2xl p-6 bg-white/10 backdrop-blur-md shadow-xl rounded-2xl text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-300 to-blue-500 text-transparent bg-clip-text">
          Weather Forecast
        </h1>

        {/* Search Bar */}
        <div className="relative w-full mt-6">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Enter city name..."
            className="border border-gray-300 rounded-lg w-full p-3 shadow-md focus:ring-2 focus:ring-blue-500"
          />
          <Button
            onClick={() => setCity(search)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 px-4 py-2 text-white rounded-lg shadow-md hover:bg-blue-700"
          >
            Search
          </Button>
        </div>

        {/* Weather Data */}
        <div className="mt-8">
          {loading ? (
            <p className="text-lg animate-pulse">Fetching weather data...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : weather ? (
            <>
              <div className="flex items-center justify-center space-x-2 text-2xl md:text-3xl font-semibold">
                <HomeIcon width={24} />
                <span>{city}</span>
              </div>

              {/* Current Weather Animation */}
              {animationData && (
                <Lottie
                  animationData={animationData}
                  loop
                  autoPlay
                  className="w-28 h-28 md:w-36 md:h-36 mx-auto mt-4"
                />
              )}

              <p className="text-xl md:text-2xl font-bold">{weather.temperature}°C</p>

                {error && (
          <div className="mt-4 bg-red-500/90 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 animate-fade-in">
            <AlertTriangle size={20} />
            <span>{error}</span>
          </div>
        )} 
              {/* Historical Weather Data */}
              <div className="mt-6 text-center">
                <h2 className="text-lg md:text-xl font-semibold">Last 7 Days</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                  {history.map((day, index) => (
                    <div key={index}   className="p-4 bg-white/20 rounded-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
                      <p className="text-sm">{day.date}</p>
                      {historyAnimations[day.date] && (
                        <Lottie
                          animationData={historyAnimations[day.date]}
                          loop
                          autoPlay
                          className="w-16 h-16 md:w-20 md:h-20 mx-auto"
                        />
                      )}
                      <p className="text-sm md:text-base">Max: {day.maxTemp}°C</p>
                      <p className="text-sm md:text-base">Min: {day.minTemp}°C</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <p className="text-gray-400">Weather data not available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Weather;
