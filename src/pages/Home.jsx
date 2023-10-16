import React from 'react'
import weather_img from '../assets/weather.png'

export const Home = () => {
    // #222850
    // #8C43A8

  return (
    <section className=''>
        <div className='flex flex-col items-center'>
        <div>
          <img src={weather_img} alt="weather-img" className=''/>
        </div>
        <div className='text-center'>
            <p className='text-5xl text-white'>Weather</p>
            <p className='text-xl text-yellow-500'>Forecasts</p>
        </div>
        <button>Get Started</button>
        </div>
    </section>
  )
}
