'use client'
import React, { useState, useEffect, ChangeEvent, useCallback } from 'react'
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation'

// Debounce utility
function debounce<Func extends (...args: any[]) => void>(func: Func, delay: number) {
  let timer: NodeJS.Timeout;
  return (...args: Parameters<Func>) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
}

const SearchBar = () => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [weatherData, setWeatherData] = useState<any | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  // Debounced API call
  const debouncedSearch = useCallback(
    debounce(async (searchValue: string) => {
      const trimmed = searchValue.trim();
      if (!trimmed) {
        setWeatherData(null);
        return;
      }

      try {
        const res = await fetch(`/api/getLocation?q=${encodeURIComponent(trimmed)}`);
        if (!res.ok) throw new Error('Failed to fetch weather data');
        const data = await res.json();
        setWeatherData(data);
      } catch (err) {
        console.error(err);
        setWeatherData({ error: true });
      }
    }, 500),
    []
  );

  const handleSelectCity = (city: string) => {
    setQuery('');
    setWeatherData(null);
    router.push(`/dashboard/city/${encodeURIComponent(city)}`);
  };

  useEffect(() => {
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  return (
    <div className="flex flex-col gap-4">
      <Input
        value={query}
        onChange={handleChange}
        placeholder="Search city..."
        className="w-[200px] lg:w-[200px] xl:w-[300px]"
      />

      {weatherData && !weatherData.error && (
        <div
          className="text-sm text-gray-700 border p-3 rounded shadow-sm bg-white cursor-pointer hover:bg-gray-100"
          onClick={() => handleSelectCity(weatherData.name)}
        >
          <p><strong>{weatherData.name}</strong> - {weatherData.sys.country}</p>
          <p>{weatherData.weather[0].description}</p>
          <p>{weatherData.main.temp}°C</p>
        </div>
      )}

      {weatherData?.error && (
        <p className="text-red-500 text-sm">City not found or API error.</p>
      )}
    </div>
  );
};

export default SearchBar;
