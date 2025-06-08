'use client'

import { SidebarTrigger } from '../ui/sidebar'
import {DarkMode} from '../custom/dark-mode'
import { Separator } from '../ui/separator'
import SearchBar from '../custom/SearchBar'


const Header = () => {
  return (
   <header className="flex flex-row py-2 items-center justify-between">
      <div className="flex w-full items-center gap-1 px-2 lg:gap-2 ">
        <SidebarTrigger />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />

        <div className="ml-auto flex items-center gap-2">
          <SearchBar/>

          <DarkMode />
        </div>
      </div>
    </header>
  )
}

export default Header