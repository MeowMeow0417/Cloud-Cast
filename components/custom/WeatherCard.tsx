'use client'

import React, { FC } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

interface WeatherCardProps {
  weatherData: {
    location: {
      name: string;
      region: string;
      country: string;
      localtime: string;
    };
    current: {
      temp_c: number;
      feelslike_c: number;
      condition: {
        text: string;
        icon: string;
        code: number;
      };
      last_updated: string;
    };
    last_updated: string;
  };
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
    <main className='flex items-center justify-center w-full'>
      <Card className={`w-full ${variant === 'floating' ? 'max-w-xl p-4' : 'max-w-5xl p-8 border-0'} shadow-lg`}>
        <CardContent className={`flex flex-row items-center text-center ${variant === 'floating' ? 'gap-4' : 'gap-20'}`}>
          <div className="flex flex-col items-center">
            <Label className={`${variant === 'floating' ? 'text-3xl' : 'text-10xl'} font-extrabold`}>
              {weatherData.current.temp_c}°
            </Label>
            <Label className={`${variant === 'floating' ? 'text-sm' : 'text-lg'} font-medium`}>
              Feels like: {weatherData.current.feelslike_c}°
            </Label>
          </div>

          <div className="flex flex-col ">
            <Label className={`${variant === 'floating' ? 'text-2xl' : 'text-5xl'} font-semibold padding text-start`}>
              {weatherData.location.name}
            </Label>

            <Label className={`mt-1 ${variant === 'floating' ? 'text-xs' : 'text-gray-600'} dark:text-gray-400`}>
              {weatherData.current.condition.text ?? 'Unknown'}
            </Label>
          </div>
        </CardContent>
      </Card>

    </main>
  )
}

export default WeatherCard