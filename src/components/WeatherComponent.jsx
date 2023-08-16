import React, { useState, useEffect } from "react";
import "tailwindcss/tailwind.css";

const WeatherComponent = () => {
  const [weather, setWeather] = useState(null);
  const weatherIcons = {
    'clear sky': 'https://image.flaticon.com/icons/png/512/1163/1163613.png',
    'few clouds': 'https://image.flaticon.com/icons/png/512/1163/1163612.png',
    'scattered clouds': 'https://image.flaticon.com/icons/png/512/1163/1163610.png',
    'broken clouds': 'https://image.flaticon.com/icons/png/512/1163/1163610.png',
    'shower rain': 'https://image.flaticon.com/icons/png/512/1163/1163621.png',
    'rain': 'https://image.flaticon.com/icons/png/512/1163/1163617.png',
    'thunderstorm': 'https://image.flaticon.com/icons/png/512/1163/1163624.png',
    'snow': 'https://image.flaticon.com/icons/png/512/1163/1163618.png',
    'mist': 'https://image.flaticon.com/icons/png/512/1163/1163623.png',
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=a13fdbc32ce982ff3a4488b18501aba2`);
      const data = await response.json();
      setWeather(data);
    });
  }, []);

  if (!weather) {
    return (
      <div className="p-2">
        <p className="text-1xl font-pink mb-2">Loading</p>
      </div>
    );
  }

  const temperature = Math.round(weather.main.temp);
  const description = weather.weather[0].description;
  const iconUrl = weatherIcons[description] || 'https://image.flaticon.com/icons/png/512/1163/1163613.png';
  const city = weather.name;

  return (
    <div className="text-black text-left flex flex-col justify-center items-end h-full">
      <h1 className="text-1xl font-bold mb-1">{`${city}`}</h1>
      <div className="flex items-center">
        <img src={iconUrl} alt="weather icon" className="w-10 h-10 mr-2" />
        <div>
          <p className="text-1xl font-bold">{`${temperature}°C`}</p>
          <p className="text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherComponent;
