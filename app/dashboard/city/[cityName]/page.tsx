'use client'

import React, {useState, useEffect} from 'react';
import WeatherCard from "@/components/custom/WeatherCard";
import { notFound, useParams } from 'next/navigation';


const cityPage = () => {

    const params = useParams();
    const cityName = params.cityName as string; // 'paris', 'london', etc.

    const [weatherData, setWeatherData] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWeatherData = async () => {
        try {
            const res = await fetch(`/api/getWeatherData?city=${cityName}`);
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

        if (cityName) fetchWeatherData();
    }, [cityName]);

    return (
        <section className="flex flex-col items-center justify-center p-6">


            {!loading && weatherData ? (
                <WeatherCard weatherData={weatherData} />
            ) : (
                <p className="text-center text-gray-500">Loading weather data...</p>
            )}

            {/* <pre>
                {JSON.stringify(weatherData, null, 2)}
            </pre> */}
        </section>
    );

}

export default cityPage