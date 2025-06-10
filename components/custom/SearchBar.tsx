'use client'
import React, { useState, useEffect, ChangeEvent, useCallback } from 'react'
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

// Debounce utility
function debounce<Func extends (...args: any[]) => void>(func: Func, delay: number) {
  let timer: NodeJS.Timeout;
  return (...args: Parameters<Func>) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
}

type City = {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

type SearchResult =
  | { error: true }
  | { data: City[] };

const SearchBar = () => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [weatherData, setWeatherData] = useState<SearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  // Debounced API call
  const debouncedSearch = useCallback(
    debounce(async (searchValue: string) => {
      const trimmed = searchValue.trim();
      if (!trimmed) {
        setWeatherData(null);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      try {
        const res = await fetch(`/api/getLocation?q=${encodeURIComponent(trimmed)}`);
        if (!res.ok) throw new Error('Failed to fetch weather data');
        const data = await res.json();
        setWeatherData(data);
      } catch (err) {
        console.error(err);
        setWeatherData({ error: true });
      } finally {
        setIsLoading(false);
      }
    }, 500),
    []
  );

  const handleSelectCity = (name: string, country: string) => {
  setQuery('');
  setWeatherData(null);
  router.push(`/dashboard/city/${encodeURIComponent(name)}/${country}`);
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
            className="w-3xs lg:w-3xs xl:w-3xs"
          />

      {weatherData && 'data' in weatherData && weatherData.data.length > 0 && (
        <Card className="flex flex-col gap-2 max-h-60 rounded w-3xs overflow-y-auto z-50 absolute top-12 right-13 p-2 bg-secondary">

          {isLoading && (
            <div className="flex items-center justify-center p-4">
              <Loader2 className="animate-spin h-5 w-5" />
            </div>
          )}

          {weatherData.data.map((city, index) => (
            <Card
              key={`${city.name}-${city.lat}-${city.lon}-${index}`}
              className="rounded shadow-sm cursor-pointer transition bg-transparent hover:bg-gray-900 p-2"
              onClick={() => handleSelectCity(city.name, city.country)}
            >
              <CardContent className="flex flex-row items-center justify-between p-2">
                <div className="flex flex-col">
                  <Label className="text-xs font-small">
                    {city.name}{city.state ? `, ${city.state}` : ''} - {city.country}
                  </Label>
                  <span className="text-xs text-muted-foreground">
                    lat: {city.lat.toFixed(2)} | lon: {city.lon.toFixed(2)}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </Card>
      )}

      {weatherData && 'error' in weatherData && (
        <p className="text-red-500 text-sm">City not found or API error.</p>
      )}
    </div>

  );
};

export default SearchBar;
