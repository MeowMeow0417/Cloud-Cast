'use client'

import { useState } from "react"
import { DarkMode } from "../custom/dark-mode"
import AuthButtons from "../auth/AuthButtons"
import { Label } from "../ui/label"
import { Card } from "../ui/card"
import { Search, X } from "lucide-react"
import { Button } from "../ui/button"
import clsx from "clsx"
import SearchBar from "../custom/SearchBar"

const Header = () => {
  const [showSearch, setShowSearch] = useState(false)

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

        <SearchBar
          show={showSearch}
          onClose={() => setShowSearch(false)}
        />

      </header>
    </>
  )
}

export default Header
