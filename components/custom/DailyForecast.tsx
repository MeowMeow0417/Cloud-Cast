'use client'
import React, {FC} from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Label } from '../ui/label'

interface DailyForecastProps {
  // TODO: fill
}

const DailyForecast: FC<DailyForecastProps> = ({}) => {
  return (
    <main className='flex items-center justify-center h-full min-h-screen w-full'>
      <div className='flex flex-row gap-4'>
        <Card className='max-h-5xl'>
          <CardContent className=" rounded-md p-8 flex flex-col items-center gap-2">
            <Label className="text-2xl font-semibold text-blue-700 mb-2 tracking-wide">Today</Label>
            <Label className="text-6xl font-extrabold text-gray-800 mb-1">27°</Label>
            <Label className="text-lg font-light text-gray-500 mb-2">Feels Like: 32°</Label>
            <Label className="text-xl font-medium capitalize text-blue-600 mb-1 flex items-center gap-2">

            </Label>
            <div className="flex flex-row gap-4 mt-2">
              <div className="flex flex-col items-center">
                <span className="text-base text-blue-500 font-semibold">10%</span>
                <span className="text-xs text-gray-400">Rain</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-base text-blue-700 font-semibold">65%</span>
                <span className="text-xs text-gray-400">Humidity</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className='max-h-5xl'>
          <CardContent className=" rounded-md p-8 flex flex-col items-center gap-2">
            <Label className="text-2xl font-semibold text-blue-700 mb-2 tracking-wide">Today</Label>
            <Label className="text-6xl font-extrabold text-gray-800 mb-1">27°</Label>
            <Label className="text-lg font-light text-gray-500 mb-2">Feels Like: 32°</Label>
            <Label className="text-xl font-medium capitalize text-blue-600 mb-1 flex items-center gap-2">

            </Label>
            <div className="flex flex-row gap-4 mt-2">
              <div className="flex flex-col items-center">
                <span className="text-base text-blue-500 font-semibold">10%</span>
                <span className="text-xs text-gray-400">Rain</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-base text-blue-700 font-semibold">65%</span>
                <span className="text-xs text-gray-400">Humidity</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className='max-h-5xl'>
          <CardContent className=" rounded-md p-8 flex flex-col items-center gap-2">
            <Label className="text-2xl font-semibold text-blue-700 mb-2 tracking-wide">Today</Label>
            <Label className="text-6xl font-extrabold text-gray-800 mb-1">27°</Label>
            <Label className="text-lg font-light text-gray-500 mb-2">Feels Like: 32°</Label>
            <Label className="text-xl font-medium capitalize text-blue-600 mb-1 flex items-center gap-2">

            </Label>
            <div className="flex flex-row gap-4 mt-2">
              <div className="flex flex-col items-center">
                <span className="text-base text-blue-500 font-semibold">10%</span>
                <span className="text-xs text-gray-400">Rain</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-base text-blue-700 font-semibold">65%</span>
                <span className="text-xs text-gray-400">Humidity</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className='max-h-5xl'>
          <CardContent className=" rounded-md p-8 flex flex-col items-center gap-2">
            <Label className="text-2xl font-semibold text-blue-700 mb-2 tracking-wide">Today</Label>
            <Label className="text-6xl font-extrabold text-gray-800 mb-1">27°</Label>
            <Label className="text-lg font-light text-gray-500 mb-2">Feels Like: 32°</Label>
            <Label className="text-xl font-medium capitalize text-blue-600 mb-1 flex items-center gap-2">

            </Label>
            <div className="flex flex-row gap-4 mt-2">
              <div className="flex flex-col items-center">
                <span className="text-base text-blue-500 font-semibold">10%</span>
                <span className="text-xs text-gray-400">Rain</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-base text-blue-700 font-semibold">65%</span>
                <span className="text-xs text-gray-400">Humidity</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className='max-h-5xl'>
          <CardContent className=" rounded-md p-8 flex flex-col items-center gap-2">
            <Label className="text-2xl font-semibold text-blue-700 mb-2 tracking-wide">Today</Label>
            <Label className="text-6xl font-extrabold text-gray-800 mb-1">27°</Label>
            <Label className="text-lg font-light text-gray-500 mb-2">Feels Like: 32°</Label>
            <Label className="text-xl font-medium capitalize text-blue-600 mb-1 flex items-center gap-2">

            </Label>
            <div className="flex flex-row gap-4 mt-2">
              <div className="flex flex-col items-center">
                <span className="text-base text-blue-500 font-semibold">10%</span>
                <span className="text-xs text-gray-400">Rain</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-base text-blue-700 font-semibold">65%</span>
                <span className="text-xs text-gray-400">Humidity</span>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </main>
  )
}

export default DailyForecast