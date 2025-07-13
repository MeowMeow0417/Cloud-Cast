'use client'

import React, { FC } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

interface WeatherCardProps {
  weatherData: {
    name: string;
    sys: {
      state?: string;
      country: string;
    };
    main: {
      temp: number;
      feels_like: number;
    };
    weather: {
      description: string;
    }[];
  } | null;
  variant?: 'default' | 'floating';
}

const WeatherCard: FC<WeatherCardProps> = ({ weatherData, variant }) => {
  if (!weatherData) {
    return (
      <Card className="p-8 text-center">
        <CardContent>
          <p className="text-gray-500">No weather data available.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <main className='flex items-center justify-center h-full min-h-screen w-full'>
      <Card className={`w-full ${variant === 'floating' ? 'max-w-xl p-4' : 'max-w-4xl p-8'} rounded-md shadow-lg`}>
        <CardContent className={`grid grid-cols-2 items-center text-center ${variant === 'floating' ? 'gap-4' : 'gap-8'}`}>
          <div className="flex flex-col items-center">
            <Label className={`${variant === 'floating' ? 'text-3xl' : 'text-vlg'} font-extrabold`}>
              {Math.round(weatherData.main.temp)}°
            </Label>
            <Label className={`${variant === 'floating' ? 'text-sm' : 'text-lg'} font-medium`}>
              Feels like: {Math.round(weatherData.main.feels_like)}°
            </Label>
          </div>

          <div className="flex flex-col items-start">
            <Label className={`${variant === 'floating' ? 'text-2xl' : 'text-5xl'} font-semibold`}>
              {weatherData.name}
            </Label>

            <Label className={`mt-1 ${variant === 'floating' ? 'text-xs' : 'text-gray-600'} dark:text-gray-400`}>
              {weatherData.weather[0]?.description ?? 'Unknown'}
            </Label>
          </div>
        </CardContent>
      </Card>

    </main>
  )
}

export default WeatherCard