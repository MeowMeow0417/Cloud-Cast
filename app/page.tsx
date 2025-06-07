import React from 'react'
import { DarkMode } from '@/components/custom/dark-mode'
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"

const page = () => {
  return (
    <main className="flex items-center justify-center w-screen h-screen p-6">
      <section className=''>
         {/* <DarkMode /> */}
          <Card className="w-full lg:w-[1000px] rounded-md shadow-lg bg-black dark:bg-white p-8">
            <CardContent className=" grid grid-cols-3 text-white dark:text-black gap-10">
              <div className='col-span-2 items-center justify-center flex flex-col'>
                <Label className='flex flex-col items-center text-center'>
                  <h2 className="text-4xl font-bold text-black">Washington, DC</h2>
                </Label>
              </div>

              <div>
                <Label className='flex flex-col items-center text-center mt-4'>
                  <h1 className="text-8xl font-semibold text-black">34 C</h1>
                  <p className="mt-2 text-gray-600">Feels like 43 C</p>
                </Label>
              </div>

            </CardContent>
          </Card>
      </section>

    </main>
  )
}

export default page
