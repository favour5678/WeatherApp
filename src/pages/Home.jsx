import React from "react";
import weather_img from "../assets/weather.png";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <section className="container mx-auto max-w-full">
      <div className="flex flex-col justify-center h-screen items-center">
        <div className="-mt-20 md:-mt-24">
          <img
            src={weather_img}
            alt="weather-img"
            className="h-[300px] sm:h-[370px] md:h-[428px]"
          />
        </div>
        <div className="text-center space-y-1 font-semibold">
          <p className="text-2xl md:text-4xl tracking-wide text-white">
            Weather
          </p>
          <p className="text-3xl md:text-5xl tracking-wide text-[#DDB130]">
            Forecasts
          </p>
        </div>
        <Link
          to={"/weatherpage"}
          className="text-sm md:text-base text-center bg-[#DDB130] text-[#362A84] p-2 w-40 md:w-52 h-[36px] md:h-[39px] tracking-wide rounded-full font-semibold mt-20 sm:mt-16 shadow-md"
        >
          Get Started
        </Link>
      </div>
    </section>
  );
};
