'use client'

import React from 'react'
import { Label } from '../ui/label'


const RightSidebar = () => {

  const breadItems = [
    {name: 'Forecast'},
    {name: 'Daily'},
    {name: 'Stats'}
  ]

  return (
    <aside className='fixed right-0 top-1/2 -translate-y-1/2 flex flex-col items-end justify-between z-50 gap-6 p-4'>
      {breadItems.map((item) => {
        return (
          <Label
            key={item.name}
            className=''
            aria-label={item.name}
          >
            {item.name}
          </Label>
        )
      } )}
    </aside>
  )
}

export default RightSidebar