
// icons
import { Coins } from 'lucide-react'

// actions
import verifyUser from '@/actions/user/verify-user'

// components
import Link from 'next/link'
import ModeToggle from '../mode-toggle'
import { Separator } from '../ui/separator'
import NavBar from './nav-bar'
import UserCombobox from './user-combobox'


export default async function Header() {
  const { userID } = await verifyUser()

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

      {/* links */}
      <NavBar />

      {/* profile */}
      <div className="flex items-center justify-center gap-2 ml-auto">
        <UserCombobox userID={userID || ''} />
        <Separator orientation='vertical' />
        <ModeToggle />
      </div>
    </header>
  )
}