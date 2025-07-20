'use client'

import React, { FC } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Label } from '../ui/label'

interface DailyForecastProps {
  forecastData: {
    forecastday: Array<{
      date: string;
      day: {
        avgtemp_c: number;
        condition: {
          text: string;
          icon: string;
        };
        maxtemp_c: number;
        mintemp_c: number;
        maxwind_kph: number;
        totalprecip_mm: number;
        avghumidity: number;
      };
    }>;
  };
}

const DailyForecast: FC<DailyForecastProps> = ({ forecastData }) => {
  return (
    <main className='flex items-center justify-center h-full min-h-screen w-full'>
      <div className='flex flex-row'>
        {forecastData.forecastday.map((dayData, idx) => (
          <Card key={idx} className="shadow-xl rounded-none max-w-xs h-screen w-3xs flex items-center justify-center">
            <CardContent className="p-8 flex flex-col items-center gap-3">
              <Label className="text-lg font-semibold tracking-wider uppercase">
                {idx === 0 ? "Today" : new Date(dayData.date).toLocaleDateString(undefined, { weekday: 'short' })}
              </Label>

              <Label className="text-6xl font-extrabold leading-tight">
                {dayData.day.avgtemp_c}°
              </Label>

              <Label className="text-sm font-light">
                High: {dayData.day.maxtemp_c}° / Low: {dayData.day.mintemp_c}°
              </Label>

              <Label className="text-md font-medium capitalize">
                {dayData.day.condition.text ?? 'Unknown'}
              </Label>

              <div className="flex flex-row gap-8 mt-3">
                <div className="flex flex-col items-center">
                  <span className="text-base font-semibold">
                    {dayData.day.totalprecip_mm}mm
                  </span>
                  <span className="text-xs">Rain</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-base font-semibold">
                    {dayData.day.avghumidity}%
                  </span>
                  <span className="text-xs">Humidity</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  )
}

export default DailyForecast
