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
}

const WeatherCard: FC<WeatherCardProps> = ({ weatherData }) => {
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
    <Card className="w-full max-w-4xl rounded-md shadow-lg p-8 border-none">
      <CardContent className="grid grid-cols-2 items-center text-center gap-4 ">
        <div className="flex flex-col items-center">
          <Label className="text-vlg font-extrabold">
            {Math.round(weatherData.main.temp)}°
          </Label>
          <Label className="text-lg font-medium">
            Feels like: {Math.round(weatherData.main.feels_like)}°
          </Label>
        </div>
        <div>
          <Label className="text-5xl font-semibold text-start">
          {weatherData.name}
          {weatherData.sys.state ? ` - ${weatherData.sys.state}` : ''}
            , {weatherData.sys.country}
          </Label>


          <Label className="mt-2 text-gray-600 dark:text-gray-400">
          {weatherData.weather[0]?.description ?? 'Unknown'}
          </Label>
        </div>
      </CardContent>
    </Card>
  )
}

export default WeatherCard