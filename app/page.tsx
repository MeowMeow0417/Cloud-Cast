import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { CloudSun, Map, Settings } from "lucide-react"

const page = () => {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 via-white to-blue-300 p-6">
      <section className="flex flex-col items-center gap-8">
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-md p-10">
          <CardContent className="flex flex-col items-center gap-4">
            <CloudSun className="w-20 h-20 text-blue-400 mb-2" />
            <Label className="text-4xl font-extrabold text-blue-700 mb-2 tracking-tight">
              Welcome to CloudCast
            </Label>
            <p className="text-lg text-gray-600 text-center max-w-xl">
              Your modern, beautiful weather dashboard. Get real-time forecasts, daily stats, and interactive maps for any city in the world.
            </p>
            <div className="flex gap-4 mt-6">
              <Link
                href="/home"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <CloudSun className="w-5 h-5" /> Go to Dashboard
              </Link>
              <Link
                href="/home/map"
                className="px-6 py-3 bg-blue-100 text-blue-700 rounded-lg font-semibold shadow hover:bg-blue-200 transition-colors flex items-center gap-2"
              >
                <Map className="w-5 h-5" /> Explore Map
              </Link>
              <Link
                href="/home/settings"
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold shadow hover:bg-gray-200 transition-colors flex items-center gap-2"
              >
                <Settings className="w-5 h-5" /> Settings
              </Link>
            </div>
          </CardContent>
        </Card>
        <footer className="text-gray-400 text-xs mt-8 text-center">
          &copy; {new Date().getFullYear()} CloudCast. All rights reserved.
        </footer>
      </section>
    </main>
  )
}

export default page