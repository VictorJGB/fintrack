// icons
import { Coins } from 'lucide-react'

// components
import ModeToggle from '../mode-toggle'
import UserCombobox from './user-combobox'

export default async function Header() {
  return (
    <header className="w-full h-[80px] border-b flex py-2 px-10 items-center justify-between">
      {/* Logo */}
      <div className='flex items-center justify-center gap-2'>
        <Coins className='w-5 h-5' />
        <h1 className="font-bold text-2xl text-primary">Fintrack</h1>
      </div>

      {/* profile */}
      <div className="flex items-center justify-center gap-2">
        <UserCombobox />
        <ModeToggle />
      </div>
    </header>
  )
}