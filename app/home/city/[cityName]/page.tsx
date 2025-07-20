'use client'

import { useParams } from 'next/navigation'
import React from 'react'
import WeatherStats from '@/components/custom/WeatherStats'
import DailyForecast from '@/components/custom/DailyForecast'
import FloatingWeatherCard from '@/components/motion/FloatingWeatherCard'
import { useQuery } from '@tanstack/react-query'

const fetchWeatherData = async (cityName: string) => {
  const res = await fetch(`/api/getForecast?city=${cityName}`)
  if (!res.ok) throw new Error('Failed to fetch weather data')
  return res.json()
}

const CityPage = () => {
  const params = useParams()
  const cityName = params.cityName as string

  const { data, isLoading, isError } = useQuery({
    queryKey: ['weather', cityName],
    queryFn: () => fetchWeatherData(cityName),
    enabled: !!cityName, // Only runs if cityName exists
  })

  if (isLoading) {
    return <p className="text-center text-gray-500">Loading weather data...</p>
  }

  if (isError || !data) {
    return <p className="text-center text-red-500">Could not load weather data.</p>
  }

  return (
    <section className="flex flex-1 min-h-screen flex-col items-center justify-center">
      <div>
        <section id="forecast" className="snap-start h-screen">
          <FloatingWeatherCard weatherData={data} />
        </section>

        <section id="daily" className="snap-center h-screen">
          <DailyForecast forecastData={data.forecast} />
        </section>

        <section id="stats" className="snap-end h-screen">
          <WeatherStats WeatherStats={data}/>
        </section>
      </div>
    </section>
  )
}

export default CityPage
