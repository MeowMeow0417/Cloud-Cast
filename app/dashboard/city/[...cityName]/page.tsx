'use client';

import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import WeatherCard from "@/components/custom/WeatherCard";
import { notFound } from 'next/navigation';

const CityPage = () => {
  const params = useParams();
  const cityName = params.cityName as string[]; // this will be an array like ['Paris', 'FR']

  const [weatherData, setWeatherData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!cityName || cityName.length !== 2) {
      notFound(); // Invalid route structure
      return;
    }

    const [name, country] = cityName;

    console.log(`Fetching weather data for city: ${name}, country: ${country}`);
    console.log('weatherData:', weatherData);

    const fetchWeatherData = async () => {
      try {
        const res = await fetch(`/api/getWeatherData?name=${name}&country=${country}`);
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
    <section className="flex flex-col items-center justify-center p-6">
      {!loading && weatherData ? (
        <WeatherCard weatherData={weatherData} />
      ) : (
        <p className="text-center text-gray-500">Loading weather data...</p>
      )}
      <pre>{JSON.stringify(weatherData, null, 2)}</pre>
    </section>
  );
};

export default CityPage;
