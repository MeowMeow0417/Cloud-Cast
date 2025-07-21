'use client'

import React, { useState } from 'react'
import { Card, CardContent } from '../ui/card'
import { Label } from '../ui/label'
import {
  Wind, Droplets, Gauge, Eye, Cloud, SunDim,
  Thermometer, CloudSun, CloudRain, CloudFog,
  CloudDrizzle, CloudSnow
} from 'lucide-react'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'

interface WeatherStatsProps {
  WeatherStats: any // full API response
}

const WeatherStats: React.FC<WeatherStatsProps> = ({ WeatherStats }) => {
  const [open, setOpen] = useState(false)

  if (!WeatherStats) {
    return <p className="text-center text-gray-500">No weather stats available.</p>
  }

  const { current } = WeatherStats

  // Essentials only
  const essentials = [
    { icon: <Gauge className="w-6 h-6 text-blue-600" />, label: 'Pressure', value: `${current.pressure_mb} hPa` },
    { icon: <Droplets className="w-6 h-6 text-blue-600" />, label: 'Humidity', value: `${current.humidity}%` },
    { icon: <Wind className="w-6 h-6 text-blue-600" />, label: 'Wind Speed', value: `${current.wind_kph} km/h` },
    { icon: <Thermometer className="w-6 h-6 text-red-500" />, label: 'Feels Like', value: `${current.feelslike_c}°C` },
  ]

  // All grouped sections for dialog
  const sections = [
    {
      title: 'Atmospheric',
      stats: [
        { icon: <Gauge className="w-6 h-6 text-blue-600" />, label: 'Pressure', value: `${current.pressure_mb} hPa` },
        { icon: <Droplets className="w-6 h-6 text-blue-600" />, label: 'Humidity', value: `${current.humidity}%` },
        { icon: <Cloud className="w-6 h-6 text-blue-600" />, label: 'Cloudiness', value: `${current.cloud}%` },
        { icon: <SunDim className="w-6 h-6 text-yellow-500" />, label: 'UV Index', value: `${current.uv}` },
        { icon: <CloudFog className="w-6 h-6 text-blue-500" />, label: 'Dew Point', value: `${current.dewpoint_c ?? 'N/A'}°C` },
      ]
    },
    {
      title: 'Wind',
      stats: [
        { icon: <Wind className="w-6 h-6 text-blue-600" />, label: 'Speed', value: `${current.wind_kph} km/h` },
        { icon: <Wind className="w-6 h-6 text-blue-600 rotate-90" />, label: 'Direction', value: `${current.wind_degree}° ${current.wind_dir}` },
        { icon: <Wind className="w-6 h-6 text-blue-600" />, label: 'Gust', value: `${current.gust_kph} km/h` },
        { icon: <CloudSnow className="w-6 h-6 text-blue-500" />, label: 'Wind Chill', value: `${current.windchill_c}°C` },
      ]
    },
    {
      title: 'Temperature',
      stats: [
        { icon: <Thermometer className="w-6 h-6 text-red-500" />, label: 'Feels Like', value: `${current.feelslike_c}°C` },
        { icon: <CloudSun className="w-6 h-6 text-orange-500" />, label: 'Heat Index', value: `${current.heatindex_c}°C` },
      ]
    },
    {
      title: 'Visibility & Precipitation',
      stats: [
        { icon: <Eye className="w-6 h-6 text-gray-600" />, label: 'Visibility', value: `${current.vis_km} km` },
        { icon: <CloudRain className="w-6 h-6 text-blue-600" />, label: 'Precipitation', value: `${current.precip_mm} mm` },
      ]
    }
  ]

  const airQuality = current.air_quality ? [
    { icon: <CloudDrizzle className="w-6 h-6 text-gray-500" />, label: 'CO', value: `${current.air_quality.co}` },
    { icon: <CloudDrizzle className="w-6 h-6 text-gray-500" />, label: 'NO₂', value: `${current.air_quality.no2}` },
    { icon: <CloudDrizzle className="w-6 h-6 text-gray-500" />, label: 'O₃', value: `${current.air_quality.o3}` },
    { icon: <CloudDrizzle className="w-6 h-6 text-gray-500" />, label: 'SO₂', value: `${current.air_quality.so2}` },
    { icon: <CloudDrizzle className="w-6 h-6 text-gray-500" />, label: 'PM2.5', value: `${current.air_quality.pm2_5}` },
    { icon: <CloudDrizzle className="w-6 h-6 text-gray-500" />, label: 'PM10', value: `${current.air_quality.pm10}` },
    { icon: <CloudDrizzle className="w-6 h-6 text-gray-500" />, label: 'US EPA', value: `${current.air_quality['us-epa-index']}` },
    { icon: <CloudDrizzle className="w-6 h-6 text-gray-500" />, label: 'GB DEFRA', value: `${current.air_quality['gb-defra-index']}` },
  ] : []

  return (
    <main className="flex flex-col items-center justify-center min-h-screen w-full p-8 gap-12">
      {/* Essentials */}
      <section className="w-full max-w-5xl px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          {essentials.map(({ icon, label, value }) => (
            <Card key={label} className="rounded-xl border border-gray-200 hover:border-blue-400 transition shadow-sm hover:shadow-md">
              <CardContent className="flex flex-col items-center justify-center gap-3 py-6">
                <div className="mb-1">{icon}</div>
                <Label className="text-lg font-medium">{value}</Label>
                <span className="text-xs text-gray-500">{label}</span>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">View Full Details</Button>
            </DialogTrigger>
            <DialogContent className="w-full h-[500px] overflow-y-auto">
              <DialogTitle>Full Weather Details</DialogTitle>
              <div className="space-y-10 mt-4">
                {sections.map(({ title, stats }) => (
                  <div key={title}>
                    <h3 className="text-lg font-bold mb-4">{title}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                      {stats.map(({ icon, label, value }) => (
                        <Card key={label} className="rounded-xl border border-gray-200">
                          <CardContent className="flex flex-col items-center justify-center gap-3 py-6">
                            <div className="mb-1">{icon}</div>
                            <Label className="text-base font-medium">{value}</Label>
                            <span className="text-xs text-gray-500">{label}</span>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
                {airQuality.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold mb-4">Air Quality</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      {airQuality.map(({ icon, label, value }) => (
                        <Card key={label} className="rounded-xl border border-gray-200">
                          <CardContent className="flex flex-col items-center justify-center gap-3 py-6">
                            <div className="mb-1">{icon}</div>
                            <Label className="text-base font-medium">{value}</Label>
                            <span className="text-xs text-gray-500">{label}</span>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </section>
    </main>
  )
}

export default WeatherStats
