// icons
import { Coins } from 'lucide-react'

// components
import verifyUser from '@/actions/user/verify-user'
import Link from 'next/link'
import ModeToggle from '../mode-toggle'
import { Separator } from '../ui/separator'
import UserCombobox from './user-combobox'

const HEADER_LINKS = [
  {
    label: 'Despesas',
    href: '/expenses'
  }
]

export default async function Header() {
  const { userID } = await verifyUser()

  return (
    <header className="w-full h-[80px] border-b flex py-2 gap-4 px-10 items-center justify-start">
      {/* Logo */}
      <div className='flex items-center justify-center gap-2 cursor-pointer'>
        <Coins className='w-5 h-5' />
        <h1 className="font-bold text-xl text-primary">Fintrack</h1>
      </div>

      <Separator
        orientation='vertical'
        className='hidden md:flex'
      />

      {/* links */}
      <nav className='hidden h-full md:flex items-center justify-center gap-2'>
        {HEADER_LINKS.map(({ label, href }, index) => (
          <Link
            key={index}
            className='font-semibold text-muted-foreground hover:text-foreground'
            href={href}
          >
            {label}
          </Link>
        ))}
      </nav>

      {/* profile */}
      <div className="flex items-center justify-center gap-2 ml-auto">
        <UserCombobox userID={userID || ''} />
        <Separator orientation='vertical' />
        <ModeToggle />
      </div>
    </header>
  )
}