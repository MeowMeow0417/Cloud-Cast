'use client'

import React from 'react'
import { Card, CardContent } from '../ui/card'
import { Label } from '../ui/label'
import {
  Wind, Droplets, Gauge, Eye, Cloud, Sun,
  Thermometer, CloudSun, CloudRain, CloudFog,
  CloudDrizzle, CloudSnow, SunDim
} from 'lucide-react'

interface WeatherStatsProps {
  WeatherStats?: any // full API response
}

const WeatherStats: React.FC<WeatherStatsProps> = ({ WeatherStats }) => {
  if (!WeatherStats) {
    return <p className="text-center text-gray-500">No weather stats available.</p>
  }

  const { current } = WeatherStats

  const atmospheric = [
    {
      icon: <Gauge className="w-5 h-5 text-blue-700" />,
      label: 'Pressure',
      value: `${current.pressure_mb} hPa`,
    },
    {
      icon: <Droplets className="w-5 h-5 text-blue-500" />,
      label: 'Humidity',
      value: `${current.humidity}%`,
    },
    {
      icon: <Cloud className="w-5 h-5 text-gray-400" />,
      label: 'Cloudiness',
      value: `${current.cloud}%`,
    },
    {
      icon: <SunDim className="w-5 h-5 text-yellow-400" />,
      label: 'UV Index',
      value: `${current.uv}`,
    },
    {
      icon: <CloudFog className="w-5 h-5 text-blue-300" />,
      label: 'Dew Point',
      value: `${current.dewpoint_c ?? 'N/A'}`,
    },
  ]

  const wind = [
    {
      icon: <Wind className="w-5 h-5 text-blue-400" />,
      label: 'Wind Speed',
      value: `${current.wind_kph} km/h (${current.wind_mph} mph)`,
    },
    {
      icon: <Wind className="w-5 h-5 text-blue-400 rotate-90" />,
      label: 'Wind Direction',
      value: `${current.wind_degree}° (${current.wind_dir})`,
    },
    {
      icon: <Wind className="w-5 h-5 text-blue-400" />,
      label: 'Wind Gust',
      value: `${current.gust_kph} km/h (${current.gust_mph} mph)`,
    },
    {
      icon: <CloudSnow className="w-5 h-5 text-blue-200" />,
      label: 'Wind Chill',
      value: `${current.windchill_c}°C (${current.windchill_f}°F)`,
    },
  ]

  const temperature = [
    {
      icon: <Thermometer className="w-5 h-5 text-red-400" />,
      label: 'Feels Like',
      value: `${current.feelslike_c}°C (${current.feelslike_f}°F)`,
    },
    {
      icon: <CloudSun className="w-5 h-5 text-orange-400" />,
      label: 'Heat Index',
      value: `${current.heatindex_c}°C (${current.heatindex_f}°F)`,
    },
  ]

  const visibilityPrecip = [
    {
      icon: <Eye className="w-5 h-5 text-gray-600" />,
      label: 'Visibility',
      value: `${current.vis_km} km (${current.vis_miles} mi)`,
    },
    {
      icon: <CloudRain className="w-5 h-5 text-blue-400" />,
      label: 'Precipitation',
      value: `${current.precip_mm} mm (${current.precip_in} in)`,
    },
  ]

  const airQuality = current.air_quality ? [
    { icon: <CloudDrizzle className="w-5 h-5 text-gray-400" />, label: 'CO', value: `${current.air_quality.co} μg/m³` },
    { icon: <CloudDrizzle className="w-5 h-5 text-gray-400" />, label: 'NO₂', value: `${current.air_quality.no2} μg/m³` },
    { icon: <CloudDrizzle className="w-5 h-5 text-gray-400" />, label: 'O₃', value: `${current.air_quality.o3} μg/m³` },
    { icon: <CloudDrizzle className="w-5 h-5 text-gray-400" />, label: 'SO₂', value: `${current.air_quality.so2} μg/m³` },
    { icon: <CloudDrizzle className="w-5 h-5 text-gray-400" />, label: 'PM2.5', value: `${current.air_quality.pm2_5} μg/m³` },
    { icon: <CloudDrizzle className="w-5 h-5 text-gray-400" />, label: 'PM10', value: `${current.air_quality.pm10} μg/m³` },
    { icon: <CloudDrizzle className="w-5 h-5 text-gray-400" />, label: 'US EPA Index', value: `${current.air_quality['us-epa-index']}` },
    { icon: <CloudDrizzle className="w-5 h-5 text-gray-400" />, label: 'GB DEFRA Index', value: `${current.air_quality['gb-defra-index']}` },
  ] : []

  return (
    <main className="flex flex-col items-center justify-center min-h-screen w-full gap-8">
      <section className='grid grid-cols-2 md:grid-cols-2 gap-6 w-full max-w-6xl p-4'>
      {[['Atmospheric', atmospheric], ['Wind', wind], ['Temperature', temperature], ['Visibility & Precipitation', visibilityPrecip]]
            .map(([title, stats]) => (
      <Card key={title as string} >
        <CardContent className=" space-y-8">
              <section>
                <h2 className="text-lg font-bold mb-4">{title}</h2>
                <div className="flex flex-row gap-6">
                  {(stats as any[]).map(({ icon, label, value }) => (
                    <div key={label} className="flex flex-col items-center text-center gap-1">
                      {icon}
                      <Label className="text-sm font-semibold text-gray-800">{value}</Label>
                      <span className="text-xs text-gray-500">{label}</span>
                    </div>
                  ))}
                </div>
              </section>


        </CardContent>
      </Card>
       ))}

         {/* {airQuality.length > 0 && (
            <section>
              <h2 className="text-lg font-bold mb-4">Air Quality</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {airQuality.map(({ icon, label, value }) => (
                  <div key={label} className="flex flex-col items-center text-center gap-1">
                    {icon}
                    <Label className="text-sm font-semibold text-gray-800">{value}</Label>
                    <span className="text-xs text-gray-500">{label}</span>
                  </div>
                ))}
              </div>
            </section>
          )} */}
      </section>
    </main>
  )
}

export default WeatherStats
