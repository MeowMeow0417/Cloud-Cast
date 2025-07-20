'use client'

import React, {useState, useEffect, useRef,  useCallback, ChangeEvent} from 'react'
import {Card, CardHeader, CardContent} from "../ui/card"
import {Button} from "../ui/button"
import {Search, X, MoveRight} from "lucide-react"
import {useRouter} from "next/navigation"
import { useQuery } from "@tanstack/react-query"

interface SearchBarProps {
  show: boolean
  onClose: () => void
}

// Debounce utility
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

const SearchBar = ({show, onClose}: SearchBarProps) => {
  const router = useRouter()
  const [query, setQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const debouncedQuery = useDebounce(query.trim(), 400)



  // ✅ Query cities
  const { data: weatherData = [], isFetching } = useQuery({
    queryKey: ['search', debouncedQuery],
    enabled: debouncedQuery.length > 0,
    queryFn: async () => {
      const res = await fetch(`/api/getLocation?city=${debouncedQuery}`)
      if (!res.ok) throw new Error('Failed to fetch')
      return res.json()
    }
  })


  // Close search bar when clicking outside
  useEffect(() => {
    if (!show) return;
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [show, onClose]);



  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }

  const handleSelectCity = (city: string) => {

    setQuery('');
    router.push(`/home/city/${encodeURIComponent(city)}`);
    onClose();
  }

  return (
    <Card
    ref={containerRef}
    className={
      `w-full max-w-6xl p-0 md:w-9/12 md:px-4 overflow-hidden transition-[transform,opacity] duration-500 ease-in-out transform origin-top ${
        show
        ? "scale-y-100 opacity-100 rounded-t-none"
        : "scale-y-0 opacity-0"
      }`
    }
  >
    <CardHeader className="p-2 ">
      <div className="flex items-center gap-3 px-4 py-3">
        <Search className="h-5 w-5 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search for a city..."
          className="flex-1 bg-transparent outline-none text-lg font-bold"
          onKeyDown={(e) => {
            if (e.key === "Enter" && query.trim()) {
              handleSelectCity(query.trim())
            }
          }}
          autoFocus={show}
        />

        <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close search">
          <X className="h-5 w-5" />
        </Button>
      </div>
      <CardContent className="p-2 mt-0">
        {weatherData.length > 0 && (
          <ul className="max-h-60 overflow-y-auto">
            {weatherData.map((location: any, idx: number) => {

              const selectedCity = location.region && location.country
              ? `${location.name}, ${location.region}, ${location.country}`
              : location.name;

              return(
                <li
                  key={idx}
                  className="cursor-pointer hover:bg-muted p-2 flex items-center gap-2"
                  onClick={() => handleSelectCity(selectedCity)}
                >
                  <MoveRight size={'10'} /> {location.name}, {location.country}
                </li>
              )
            })}
          </ul>
        )}
        {weatherData.length === 0 && !isFetching &&(
          <p className="text-sm text-muted-foreground">
            Enter a city name to find its weather information.
          </p>
        ) }

      </CardContent>
    </CardHeader>
  </Card>
  )
}

export default SearchBar