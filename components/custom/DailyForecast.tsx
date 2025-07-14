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
      <div className='flex flex-row '>

        <Card className="shadow-xl rounded-none max-w-xs h-screen w-3xs flex items-center justify-center">
          <CardContent className="p-8 flex flex-col items-center gap-3">
            <Label className="text-lg font-semibold tracking-wider uppercase">Today</Label>

            <Label className="text-6xl font-extrabold leading-tight">27°</Label>
            <Label className="text-sm  font-light">Feels like 32°</Label>

            <Label className="text-md font-medium capitalize">
              Overcast Clouds
            </Label>

            <div className="flex flex-row gap-8 mt-3">
              <div className="flex flex-col items-center">
                <span className="text-base font-semibold ">10%</span>
                <span className="text-xs ">Rain</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-base font-semibold ">65%</span>
                <span className="text-xs ">Humidity</span>
              </div>
            </div>
          </CardContent>
        </Card>


      </div>
    </main>
  )
}

export default DailyForecast