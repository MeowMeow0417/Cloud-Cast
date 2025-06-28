import {DarkMode} from '../custom/dark-mode'
import SearchBar from '../custom/SearchBar'
import AuthButtons from '../auth/AuthButtons'


const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 flex flex-row py-2 items-center bg-background/80 backdrop-blur">
      <div className="flex w-full items-center justify-between px-4 gap-4">
        <h1 className="text-lg font-bold">CloudCast</h1>
        <SearchBar />
        <AuthButtons />
        {/* <DarkMode /> */}
      </div>
    </header>
  )
}

export default Header