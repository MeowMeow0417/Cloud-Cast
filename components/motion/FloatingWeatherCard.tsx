"use client"

import { useState, useEffect, useRef } from "react"
import WeatherCard from "../custom/WeatherCard"

export default function FloatingWeatherCard({ weatherData }: any) {
  const [isSticky, setIsSticky] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.offsetHeight)
    }

    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsSticky(scrollY > 600)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {isSticky && (
        <div style={{ height }} />
      )}
      <div
        ref={ref}
        className={`
          transition-all duration-300
          ${isSticky ? "fixed -top-60 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl" : "relative"}
        `}
      >
        <WeatherCard weatherData={weatherData} variant={isSticky ? "floating" : "default"} />
      </div>
    </>
  )
}
