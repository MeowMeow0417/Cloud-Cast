'use client'
import React from 'react'
import { useEffect, useState } from 'react'
import WeatherCard from '@/components/custom/WeatherCard'


const page = () => {
  return (
    <main className='p-8'>
      <section className="flex flex-col items-center justify-center p-6">
        <WeatherCard weatherData={null} />
        <p className="text-center text-gray-500">No weather data available.</p>
      </section>
    </main>
  )
}

export default page