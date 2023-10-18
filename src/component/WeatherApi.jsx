import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const WeatherApi = () => {
  const [cityWeatherData, setCityWeatherData] = useState(null);
  const [citySearch, setCitySearch] = useState("");
  const [cityName, setCityName] = useState("");
  const [cityKey, setCityKey] = useState(null);
  const [isDay, setIsDay] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    setErrorMessage("");

    axios
      .get(locationUrl)
      .then((response) => {
        if (response.data && response.data.length > 0) {
          setCityKey(response.data[0].Key);
        } else {
          setErrorMessage("City not found!");
        }
      })
      .catch((error) => {
        console.error(error, "Error searching city");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <section className="container mx-auto flex justify-center items-center h-screen">
      <div className="bg-gradient-to-b from-[#463495] to-[#7E6BBA] h-[88vh] w-[80%] md:w-[50%] shadow-xl text-center">
        <p className="text-sm md:text-base text-center text-white mt-2">
          Enter a location for weather Information
        </p>
        <span className="flex mx-auto space-x-3 mt-5 w-[80%]">
          <input
            type="text"
            placeholder="Search city"
            className="w-full border border-[#DDB130] outline-none rounded-md pl-1 md:pl-3"
            value={citySearch}
            onChange={(e) => setCitySearch(e.target.value)}
          />
          <button
            className="text-sm md:text-base flex justify-center items-center bg-[#DDB130] text-[#362A84] p-2 w-28 h-[30px] rounded-md font-semibold shadow-md outline-none"
            onClick={handleSearch}
          >
            Search
          </button>
        </span>
        <p className="border-t mt-10"></p>
        {loading ? (
          <AiOutlineLoading3Quarters className="animate-spin flex justify-center mx-auto mt-44 text-white text-3xl" />
        ) : errorMessage ? (
          <p className="text-white tracking-wider text-xl mt-44">
            {errorMessage}
          </p>
        ) : (
          <div>
            {cityWeatherData && (
              <div>
                <p>
                  {isDay ? (
                    <img
                      src={dayTime}
                      alt="daytime-img"
                      className="w-full h-60 md:h-72 object-center object-cover"
                    />
                  ) : (
                    <img
                      src={nightTime}
                      alt="nighttime-img"
                      className="w-full h-60 md:h-72 object-top object-cover"
                    />
                  )}
                </p>
                <p className="text-white uppercase font-semibold tracking-widest text-sm md:text-xl mt-3">
                  {cityName}
                </p>
                <p className="text-white uppercase tracking-widest mt-2 text-base">
                  {cityWeatherData.WeatherText}
                </p>
                <p className="text-white tracking-widest text-3xl md:text-5xl mt-7">
                  {cityWeatherData.Temperature.Metric.Value} &deg;C
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
