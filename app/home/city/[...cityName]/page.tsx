'use client';

import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import WeatherCard from "@/components/custom/WeatherCard";
import WeatherStats from '@/components/custom/WeatherStats';
import DailyForecast from '@/components/custom/DailyForecast';
import FloatingCard from '@/components/motion/FloatingCard';
import { notFound } from 'next/navigation';

const CityPage = () => {
  const params = useParams();
  const cityName = params.cityName as string[];
  const [weatherData, setWeatherData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!cityName || cityName.length !== 2) {
      notFound();
      return;
    }
    const [lat, lon] = cityName;

    const fetchWeatherData = async () => {
      try {
        const res = await fetch(`/api/getWeatherData?lat=${lat}&lon=${lon}`);
        if (!res.ok) throw new Error('Failed to fetch weather data');
        const data = await res.json();
        setWeatherData(data);
      } catch (err) {
        console.error(err);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [cityName]);


  return (
    <section className="flex flex-1 min-h-screen flex-col items-center justify-center ">
      {!loading && weatherData ? (
        <div>
          <section id="forecast" className="w-full">
              <FloatingCard>
                <WeatherCard weatherData={weatherData} />
              </FloatingCard>
          </section>

          <section id="daily">
            <DailyForecast />
          </section>
          <section id="stats">
            <WeatherStats />
        </section>

        </div>
      ) : (
        <p className="text-center text-gray-500">Loading weather data...</p>
      )}
      {/* <pre>{JSON.stringify(weatherData, null, 2)}</pre> */}
    </section>
  );
};

export default CityPage;
