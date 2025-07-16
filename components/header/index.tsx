
// icons
import { Coins } from 'lucide-react'

// actions

// components
import Link from 'next/link'
import ModeToggle from '../mode-toggle'
import { Separator } from '../ui/separator'
import UserCombobox from './user-combobox'


export default async function Header() {
  return (
    <header className="w-full h-[80px] border-b flex py-2 gap-4 px-10 items-center justify-start">
      {/* Logo */}
      <Link
        className='flex items-center justify-center gap-2 cursor-pointer'
        href={'/'}
      >
        <Coins className='w-5 h-5' />
        <h1 className="font-bold text-xl text-primary">Fintrack</h1>
      </Link>

      <Separator
        orientation='vertical'
        className='hidden md:flex'
      />

      {/* profile */}
      <div className="flex items-center justify-center gap-2 ml-auto">
        <UserCombobox />
        <Separator orientation='vertical' />
        <ModeToggle />
      </div>
    </header>
  )
}