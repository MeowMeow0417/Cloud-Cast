'use client'
import React, { useState, useEffect, ChangeEvent, useCallback } from 'react'
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from '../ui/button'
import { Label } from "@/components/ui/label"
import { useRouter } from 'next/navigation'
import { Loader2, Search } from 'lucide-react'

// Debounce utility
function debounce<Func extends (...args: any[]) => void>(func: Func, delay: number) {
  let timer: NodeJS.Timeout;
  return (...args: Parameters<Func>) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
}

// TODO: add sumbit button to search for the city

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
  const [searchData, setSearchData] = useState<SearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  // Debounced API call
  const debouncedSearch = useCallback(
    debounce(async (searchValue: string) => {
      const trimmed = searchValue.trim();
      if (!trimmed) {
        setSearchData(null);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      try {
        const res = await fetch(`/api/getLocation?q=${encodeURIComponent(trimmed)}`);
        if (!res.ok) throw new Error('Failed to fetch weather data');
        const data = await res.json();
        setSearchData(data);
      } catch (err) {
        console.error(err);
        setSearchData({ error: true });
      } finally {
        setIsLoading(false);
      }
    }, 500),
    []
  );

 const handleSelectCity = (city: any) => {
    const lat = city.lat;
    const lon = city.lon;
    router.push(`/dashboard/city/${lat}/${lon}`);
  };


  useEffect(() => {
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  return (
    <div className="flex flex-col gap-4">

        <div className="relative flex items-center justify-between">
           <Input
            value={query}
            onChange={handleChange}
            placeholder="Search "
            className="w-3xs lg:w-3xl xl:w-3xs rounded-r-none focus:none"
          />
          <Button
            variant={'secondary'}
            size={'icon'}
            className='rounded-l-none border-1'
              ><Search/>
          </Button>
        </div>


      {searchData && 'data' in searchData && searchData.data.length > 0 && (
        <Card className="flex flex-col gap-2 max-h-60 rounded w-3xs overflow-y-auto z-50 absolute top-12 right-13 p-2 bg-secondary">

          {isLoading && (
            <div className="flex items-center justify-center p-4">
              <Loader2 className="animate-spin h-5 w-5" />
            </div>
          )}

          {searchData.data.map((city, index) => (

              <Card
                key={`${city.name}-${city.lat}-${city.lon}-${index}`}
                className="rounded shadow-sm cursor-pointer transition bg-transparent hover:bg-gray-900 p-2"
                onClick={() => handleSelectCity(city)}
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

      {searchData && 'error' in searchData && (
        <p className="text-red-500 text-sm">City not found or API error.</p>
      )}
    </div>

  );
};

export default SearchBar;
