import axios from "axios";
import React, { useEffect, useState } from "react";

export const ForecastApi = () => {
  const API_KEY = "Skr4DO6ZB3DtuQG2k1N75KEROQ1oR31l";
  const [cityWeatherData, setCityWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const [cityKey, setCityKey] = useState(null);
  const apiUrl = `https://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${API_KEY}`;
  const locationUrl = `https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${API_KEY}&q=${city}`;

  useEffect(() => {
    if (cityKey) {
      axios
        .get(apiUrl)
        .then((response) => {
          console.log(response.data);
          setCityWeatherData(response.data[0]);
        })
        .catch((error) => {
          console.error(error, "Error fetching weather data");
        });
    }
  }, [cityKey]);

  const handleSearch = (e) => {
    axios
      .get(locationUrl)
      .then((response) => {
        if (response.data.length > 0) {
          console.log(response.data[0]);
          // setCityKey(response.data[0].Key)
        } else {
          console.error("City not found");
        }
      })
      .catch((error) => {
        console.error(error, "Error searching city");
      });
  };
  

  return (
    <div>
      <input
        type="text"
        placeholder="search city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleSearch} className="border">
        Search
      </button>
    </div>
  );
};
