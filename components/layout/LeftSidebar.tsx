'use client'

import React from 'react'
import { Home, Settings, Map } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'



const LeftSidebar = () => {
  const pathname = usePathname()

  const navItems = [
  { name: 'Home', icon: <Home size={25}/>, href: '/home' },
  { name: 'Map', icon: <Map size={25}/>, href: '/home/map' },
  { name: 'Settings', icon: <Settings size={25}/>, href: '/home/settings' },
]

  return (
    <aside className="fixed left-0 top-1/2 -translate-y-1/2 flex flex-col items-start justify-between z-50 gap-2 p-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
            key={item.name}
            href={item.href}
            className={`flex items-center rounded transition-colors ${
              isActive
                ? 'text-primary'
                : 'text-muted-foreground hover:text-primary'
            }`}
            aria-label={item.name}
          >
            {item.icon}
          </Link>
          )
        })}
    </aside>
  )
}

export default LeftSidebar