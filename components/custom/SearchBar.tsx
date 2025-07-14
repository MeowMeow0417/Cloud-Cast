'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search } from 'lucide-react'
import { Button } from '../ui/button'

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const handleSearch = () => {
   const trimmed = searchTerm.trim()
    if (trimmed) {
      router.push(`/home/city/${encodeURIComponent(trimmed)}`)
      setSearchTerm('')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" >
          Search City... <Search className="h-5 w-5" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Search Location</DialogTitle>
          <DialogDescription>
            Enter a city name to find its weather information.
          </DialogDescription>
        </DialogHeader>

        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search for a city..."
          className="w-full p-2 border rounded mb-2"
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
        />

        <Button onClick={handleSearch} className="w-full">
          Search
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default SearchBar