'use client'

import React from 'react'
import WeatherCard from '@/components/custom/weatherCard'

interface CityPageProps {
    weatherData:{

    }
}


const cityPage = () => {
  return (
    <>
        <WeatherCard weatherData={weatherData}/>
    </>
  )
}

export default cityPage