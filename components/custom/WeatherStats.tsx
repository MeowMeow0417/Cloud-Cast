'use client'

import React from 'react'
import { Card, CardContent } from '../ui/card'
import { Label } from '../ui/label'
import { Wind, Droplets, Gauge, Eye, Cloud, Sun } from 'lucide-react'

interface WeatherStatsProps {
  stats?: {
    pressure: number
    humidity: number
    visibility: number
    windSpeed: number
    windDeg: number
    windGust: number
    cloudiness: number
    sunrise: number
    sunset: number
    seaLevel?: number
    grndLevel?: number
  }
}

const formatTime = (timestamp: number) => {
  const date = new Date(timestamp * 1000)
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const WeatherStats: React.FC<WeatherStatsProps> = ({
  stats = {
    pressure: 1007,
    humidity: 71,
    visibility: 10000,
    windSpeed: 0.95,
    windDeg: 99,
    windGust: 1.23,
    cloudiness: 87,
    sunrise: 1751146189,
    sunset: 1751193122,
    seaLevel: 1007,
    grndLevel: 1004,
  }
}) => {
  const entries = [
    {
      icon: <Gauge className="w-5 h-5 text-blue-700" />,
      label: 'Pressure',
      value: `${stats.pressure} hPa`,
    },
    {
      icon: <Droplets className="w-5 h-5 text-blue-500" />,
      label: 'Humidity',
      value: `${stats.humidity}%`,
    },
    {
      icon: <Eye className="w-5 h-5 text-gray-600" />,
      label: 'Visibility',
      value: `${(stats.visibility / 1000).toFixed(1)} km`,
    },
    {
      icon: <Wind className="w-5 h-5 text-blue-400" />,
      label: 'Wind Speed',
      value: `${stats.windSpeed} m/s`,
    },
    {
      icon: <Wind className="w-5 h-5 text-blue-400 rotate-90" />,
      label: 'Wind Direction',
      value: `${stats.windDeg}°`,
    },
    {
      icon: <Wind className="w-5 h-5 text-blue-400" />,
      label: 'Wind Gust',
      value: `${stats.windGust} m/s`,
    },
    {
      icon: <Cloud className="w-5 h-5 text-gray-400" />,
      label: 'Cloudiness',
      value: `${stats.cloudiness}%`,
    },
    {
      icon: <Sun className="w-5 h-5 text-yellow-400" />,
      label: 'Sunrise',
      value: formatTime(stats.sunrise),
    },
    {
      icon: <Sun className="w-5 h-5 text-orange-400" />,
      label: 'Sunset',
      value: formatTime(stats.sunset),
    },
    ...(stats.seaLevel
      ? [{
          icon: <Gauge className="w-5 h-5 text-blue-300" />,
          label: 'Sea Level',
          value: `${stats.seaLevel} hPa`,
        }]
      : []),
    ...(stats.grndLevel
      ? [{
          icon: <Gauge className="w-5 h-5 text-blue-900" />,
          label: 'Ground Level',
          value: `${stats.grndLevel} hPa`,
        }]
      : []),
  ]

  return (
    <main className="flex items-center justify-center h-full min-h-screen w-full">
      <Card className="w-full max-w-4xl rounded-md shadow-lg border">
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8">
          {entries.map(({ icon, label, value }) => (
            <div key={label} className="flex flex-col items-center text-center gap-1">
              {icon}
              <Label className="text-sm font-semibold text-gray-800">{value}</Label>
              <span className="text-xs text-gray-500">{label}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </main>
  )
}

export default WeatherStats
