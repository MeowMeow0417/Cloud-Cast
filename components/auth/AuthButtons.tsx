'use client'

import React from 'react'
import { Button } from '@/components/ui/button'


// TODO: implement Auth, have proper Profile page
const AuthButtons = () => {
  return (
    <header>
        <div className="flex items-center gap-2">

            {/* <Button variant="outline" className="text-sm">
            Sign In
            </Button> */}
            <Button className="text-sm">
            Profile
            </Button>
        </div>
    </header>
  )
}

export default AuthButtons