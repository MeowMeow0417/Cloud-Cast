'use client'

import React, { useEffect, useState } from 'react'
import { Label } from '../ui/label'

const breadItems = [
  { name: 'FORECAST', id: 'forecast' },
  { name: 'DAILY', id: 'daily' },
  { name: 'STATS', id: 'stats' }
]

const RightSidebar = () => {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const sections = breadItems.map(item => document.getElementById(item.id));
      const scrollY = window.scrollY;

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        if (section) {
          const { offsetTop, offsetHeight } = section;
          if (scrollY >= offsetTop - 100 && scrollY < offsetTop + offsetHeight - 100) {
            setActive(breadItems[i].id);
            break;
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <aside className='fixed right-0 top-1/2 -translate-y-1/2 flex flex-col items-end z-50 gap-2 p-4'>
      {breadItems.map((item) => (
        <Label
          key={item.id}
          className={`cursor-pointer px-2 py-1 rounded transition-colors text-md ${
            active === item.id
              ? 'bg-black text-white dark:bg-white dark:text-black'
              : 'text-gray-500 hover:text-black dark:hover:text-white'
          }`}
          onClick={() => {
            document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          {item.name}
        </Label>
      ))}
    </aside>
  )
}

export default RightSidebar
