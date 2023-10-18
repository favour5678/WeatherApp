import axios from "axios";
import React, { useEffect, useState } from "react";

export const WeatherApi = () => {
  const [cityWeatherData, setCityWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const [cityName, setCityName] = useState("");
  const [cityKey, setCityKey] = useState(null);
  const [isDay, setIsDay] = useState(true);
  const [weatherIconCode, setWeatherIconCode] = useState(null);

  const dayTime =
    "https://img.freepik.com/free-vector/sky-background-video-conferencing_23-2148625271.jpg";
  const nightTime =
    "https://cdn.pixabay.com/photo/2020/02/08/00/35/animated-4828785_1280.jpg";

  const API_KEY = "A4ape1Xsx3BF8r85Y8rtuz6IwMnOI2Dt";
  const apiUrl = `https://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${API_KEY}`;
  const locationUrl = `https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${API_KEY}&q=${city}`;
  const cityUrl = `https://dataservice.accuweather.com/locations/v1/${cityKey}?apikey=${API_KEY}`;

  useEffect(() => {
    if (cityKey) {
      axios
        .get(apiUrl)
        .then((response) => {
          console.log(response.data[0]);
          setCityWeatherData(response.data[0]);
          setCity("");

          if (response.data[0].IsDayTime) {
            setIsDay(true);
          } else {
            setIsDay(false);
          }
          setWeatherIconCode(response.data[0].WeatherIcon);
        })
        .catch((error) => {
          console.error(error, "Error fetching weather data");
        });

      axios
        .get(cityUrl)
        .then((response) => {
          console.log(response.data.LocalizedName);
          setCityName(response.data.LocalizedName);
        })
        .catch((error) => {
          console.error(error, "Error fetching city name");
        });
    }
  }, [cityKey]);

  const handleSearch = (e) => {
    axios
      .get(locationUrl)
      .then((response) => {
        if (response.data.length > 0) {
          console.log(response.data[0]);
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
    <section className="container mx-auto w-[60%] flex justify-center pt-5">
      <span className="flex space-x-3 mb-10 w-[60%]">
        <input
          type="text"
          placeholder="Search city"
          className="w-full border border-[#DDB130] outline-none rounded-md pl-3"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          className="flex justify-center items-center bg-[#DDB130] text-[#362A84] p-2 w-28 h-[30px] rounded-md font-semibold shadow-md"
          onClick={handleSearch}
        >
          Search
        </button>
      </span>
      {cityWeatherData && (
        <div className="w-[60%]">
          <div>
            <p className="w-[100%] h-[20vh] border">
              Weather
              <img src="" alt="" />
            </p>
            {isDay ? (
              <img src={dayTime} alt="daytime-img" />
            ) : (
              <img src={nightTime} alt="nighttime-img" />
            )}
            <p>City Name: {cityName}</p>
            <p>Weather Condidtion: {cityWeatherData.WeatherText}</p>
            <p>
              Temperature: {cityWeatherData.Temperature.Metric.Value} &deg;C
            </p>
            <p>CurrentTime: {cityWeatherData.IsDayTime}</p>
          </div>
        </div>
      )}
    </section>
  );
};
