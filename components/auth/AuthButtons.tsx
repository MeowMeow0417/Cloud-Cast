'use client'

import React from 'react'
import { Button } from '@/components/ui/button'

const AuthButtons = () => {
  return (
    <header>
        <div className="flex items-center gap-2">
            <Button variant="outline" className="text-sm">
            Sign In
            </Button>
            <Button className="text-sm">
            Sign Up
            </Button>
        </div>
    </header>
  )
}

export default AuthButtons