'use client'

import React, { FC } from 'react'
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"

interface WeatherCardProps {
  weatherData: {
    city: string;
    temperature: number;
    feelsLike: number;
    condition: string;
  };
}

const WeatherCard: FC<WeatherCardProps> = ({ weatherData }) => {
  return (
    <Card className="lg:w-[1000px] md:w-full rounded-md shadow-lg bg-black dark:bg-white p-8">
      <CardContent className="grid grid-cols-3 text-white dark:text-black gap-10">
        <div className="col-span-2 flex flex-col items-center justify-center">
          <Label className="text-center">
            <h2 className="text-4xl font-bold text-black dark:text-white">
              {weatherData.city}
            </h2>
            <p className="text-gray-500">{weatherData.condition}</p>
          </Label>
        </div>
        <div className="flex flex-col items-center text-center mt-4">
          <Label>
            <h1 className="text-8xl font-semibold text-black dark:text-white">
              {Math.round(weatherData.temperature)}°C
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Feels like {Math.round(weatherData.feelsLike)}°C
            </p>
          </Label>
        </div>
      </CardContent>
    </Card>
  )
}

export default WeatherCard
