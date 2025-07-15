"use client"

import { useState } from "react"
import { DarkMode } from "../custom/dark-mode"
import AuthButtons from "../auth/AuthButtons"
import { Label } from "../ui/label"
import { Card, CardHeader ,CardContent } from "../ui/card"
import { Search, X } from "lucide-react"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import clsx from "clsx"


const Header = () => {
  const [showSearch, setShowSearch] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [weatherData, setWeatherData] = useState<any[]>([]);
  const router = useRouter()

  const handleSearch = () => {
    const trimmed = searchTerm.trim()
    if (trimmed) {
      router.push(`/home/city/${encodeURIComponent(trimmed)}`)
      setSearchTerm("")
      setShowSearch(false)
    }
  }

  return (
    <>
      {/* ✅ Navbar */}
      <header className="fixed top-3 left-0 w-full z-50 flex flex-col items-center">
        <Card className={clsx(
          "flex flex-row items-center w-9/12 justify-between gap-4 px-4 py-2 rounded-md bg-background/50 backdrop-blur-md",
            showSearch
              ? "rounded-b-none border-b-0 shadow-none bg-card"
              : "rounded-b-md"
          )}>
          <Label className="text-lg font-bold">CloudCast</Label>

          <div className="flex flex-row items-center gap-4">
            <DarkMode />

             {/* Search Trigger */}
            <Button
              variant="ghost"
              onClick={() => setShowSearch((prev) => !prev)}
              aria-label={showSearch ? "Close search" : "Open search"}
            >
              {showSearch ? <X /> : <Search />}
            </Button>

            <AuthButtons />
          </div>
        </Card>

        {/* ✅ Expanding Search Section */}
        {/* <Card
          className={clsx(
            "w-full max-w-6xl px-2 md:w-9/12 md:px-4 overflow-hidden transition-all duration-300 p-0 gap-0 z-50",
            showSearch
              ? "max-h-[300px] opacity-100 rounded-t-none border-t-0"
              : "max-h-0 opacity-0"
          )}
        > */}
        <Card
          className={clsx(
            "w-full max-w-6xl p-0 md:w-9/12 md:px-4 overflow-hidden transition-[transform,opacity] duration-500 ease-in-out transform origin-top",
            showSearch
              ? "scale-y-100 opacity-100 rounded-t-none"
              : "scale-y-0 opacity-0"
          )}
        >

          {/* Search Input */}
          <CardHeader className="p-2 ">
            <div className="flex items-center gap-3 px-4 py-3">
              <Search className="h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for a city..."
                className="flex-1 bg-transparent outline-none text-lg font-bold"
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                autoFocus={showSearch}
              />

              <Button onClick={handleSearch}>Search</Button>
            </div>
            {/* show search results */}
            <CardContent className="p-2 mt-0">
              <p className="text-sm text-muted-foreground">
                Enter a city name to find its weather information.
              </p>
          </CardContent>

          </CardHeader>
        </Card>

      </header>
    </>
  )
}

export default Header
