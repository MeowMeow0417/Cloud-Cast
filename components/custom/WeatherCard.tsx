'use client'

import React, { FC } from 'react'
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"

import { electrolize } from '@/styles/fonts'

interface WeatherCardProps {
  weatherData: {
    name: string;
    sys: {
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

  function switchingTextColor() {
    return 'text-white dark:text-black';
  }

  function switchingBackgroundColor() {
    return 'bg-black dark:bg-white';
  }

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
    <Card className={`lg:w-[1000px] md:w-full rounded-md shadow-lg p-8 ${switchingBackgroundColor()}`}>
      <CardContent className={` gap-10 flex flex-row justify-between items-center ${switchingTextColor()}`} >
        <div className=" flex flex-col items-center text-center">

            <Label className={`text-6xl font-semibold ${switchingTextColor()}`}>
              {weatherData.name} - {weatherData.sys.country}
            </Label>


        </div>
        <div className=" flex flex-col items-center text-center">

            <Label className={`text-8xl font-extrabold ${switchingTextColor()} ${electrolize.className}`}>
              {weatherData.main.temp}
            </Label>
            <Label className="mt-2 text-gray-600 dark:text-gray-400">
              Feels like {weatherData.main.feels_like} - {weatherData.weather[0]?.description ?? 'Unknown'}
            </Label>


        </div>
      </CardContent>
    </Card>
  )
}

export default WeatherCard
