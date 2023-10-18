import axios from "axios";
import React, { useEffect, useState } from "react";

export const WeatherApi = () => {
  const [cityWeatherData, setCityWeatherData] = useState(null);
  const [citySearch, setCitySearch] = useState("");
  const [cityName, setCityName] = useState("");
  const [cityKey, setCityKey] = useState(null);
  const [isDay, setIsDay] = useState(true);
  const [error, setError] = useState("");

  const dayTime =
    "https://img.freepik.com/free-vector/sky-background-video-conferencing_23-2148625271.jpg";
  const nightTime =
    "https://cdn.pixabay.com/photo/2020/02/08/00/35/animated-4828785_1280.jpg";

  const API_KEY = "GfMXudizINgHGhpTqa4dOncheX7CEqOY";
  const apiUrl = `https://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${API_KEY}`;
  const locationUrl = `https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${API_KEY}&q=${citySearch}`;
  const cityUrl = `https://dataservice.accuweather.com/locations/v1/${cityKey}?apikey=${API_KEY}`;

  useEffect(() => {
    if (!cityKey) {
      return;
    }

    Promise.all([axios.get(apiUrl), axios.get(cityUrl)])
      .then(([weatherResponse, cityResponse]) => {
        const weatherData = weatherResponse.data[0];
        const cityNames = cityResponse.data.LocalizedName;

        setCityWeatherData(weatherData);
        setCityName(cityNames);
        setCitySearch("");

        if (weatherData.IsDayTime) {
          setIsDay(true);
        } else {
          setIsDay(false);
        }
      })
      .catch(([weatherError, cityError]) => {
        console.log(weatherError, "Error fetching weather data");
        console.log(cityError, "Error fetching city name");
      });
  }, [cityKey]);

  const handleSearch = (e) => {
    axios
      .get(locationUrl)
      .then((response) => {
        if (response.data && response.data.length > 0) {
          setCityKey(response.data[0].Key);
        } else {
          console.error("City not found");
        }
      })
      .catch((error) => {
        console.error(error, "Error searching city");
      });
  };

  return (
    <section className="container mx-auto flex justify-center pt-5">
      <div className="bg-gradient-to-b from-[#463495] to-[#7E6BBA] h-[90vh] w-[50%] shadow-xl">
        <p className="text-center text-white mt-2">
          Enter a location for weather Information
        </p>
        <span className="flex mx-auto space-x-3 mt-5 w-[80%]">
          <input
            type="text"
            placeholder="Search city"
            className="w-full border border-[#DDB130] outline-none rounded-md pl-3"
            value={citySearch}
            onChange={(e) => setCitySearch(e.target.value)}
          />
          <button
            className="flex justify-center items-center bg-[#DDB130] text-[#362A84] p-2 w-28 h-[30px] rounded-md font-semibold shadow-md"
            onClick={handleSearch}
          >
            Search
          </button>
        </span>
        <p className="border-t mt-10"></p>
        {cityWeatherData && (
          <div className="">
            <div>
              <p>
                {isDay ? (
                  <img src={dayTime} alt="daytime-img" className="w-full h-72 object-center object-cover"/>
                ) : (
                  <img src={nightTime} alt="nighttime-img" className="w-full h-72 object-top object-cover"/>
                )}
              </p>
              <p>City Name: {cityName}</p>
              <p>Weather Condidtion: {cityWeatherData.WeatherText}</p>
              <p>
                Temperature: {cityWeatherData.Temperature.Metric.Value} &deg;C
              </p>
              <p>CurrentTime: {cityWeatherData.IsDayTime}</p>
            </div>
          </div>
        )}
      </div>{" "}
    </section>
  );
};
