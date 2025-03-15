// icons
import { Coins } from 'lucide-react'

// components
import UserCombobox from './user-combobox'

export default function Header() {
  return (
    <header className="w-full h-[80px] border flex py-2 px-6 items-center justify-between">
      {/* Logo */}
      <div className='flex items-center justify-center gap-2'>
        <Coins className='w-5 h-5' />
        <h1 className="font-bold text-2xl text-primary">Fintrack</h1>
      </div>

      {/* profile */}
      <UserCombobox />
    </header>
  )
}