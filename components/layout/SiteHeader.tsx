import {DarkMode} from '../custom/dark-mode'
import SearchBar from '../custom/SearchBar'
import AuthButtons from '../auth/AuthButtons'
import { Label } from '../ui/label'


const Header = () => {
  return (
    <header className="fixed top-3 left-0 w-full z-50 flex items-center justify-center">
      <div className="flex flex-row items-center w-9/12 justify-between gap-4 px-4 py-2 rounded-md bg-background/50 backdrop-blur">

          <Label className="text-lg font-bold">CloudCast</Label>


        <div className='flex flex-row items-center gap-4'>
          <SearchBar />
          <AuthButtons />
          <DarkMode />
        </div>

      </div>
    </header>
  )
}


export default Header