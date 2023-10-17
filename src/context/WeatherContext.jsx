import { createContext, useState } from "react";

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [cityWeatherData, setCityWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const [cityKey, setCityKey] = useState(null);

  const weatherContextValue = {
    cityWeatherData,
    setCityWeatherData,
    city,
    setCity,
    cityKey,
    setCityKey,
  };

  return (
    <WeatherContext.Provider value={weatherContextValue}>
      {children}
    </WeatherContext.Provider>
  );
};
