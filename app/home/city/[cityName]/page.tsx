'use client';

import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import WeatherStats from '@/components/custom/WeatherStats';
import DailyForecast from '@/components/custom/DailyForecast';
import FloatingWeatherCard from '@/components/motion/FloatingWeatherCard';
import { notFound } from 'next/navigation';

const CityPage = () => {
  const params = useParams();
  const cityName = params.cityName as string;
  const [weatherData, setWeatherData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchWeatherData = async () => {
      try {
        const res = await fetch(`/api/getCurrentWeather?city=${cityName}`);
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
    <section className="flex flex-1 min-h-screen flex-col items-center justify-center snap-y snap-mandatory overflow-y-scroll h-screen">
      {!loading && weatherData ? (
        <div>
          <section id="forecast" className="snap-start h-screen" >
              <FloatingWeatherCard weatherData={weatherData} />
          </section>

          <section id="daily" className="snap-center h-screen">
            <DailyForecast />
          </section>
          <section id="stats" className="snap-end h-screen">
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
