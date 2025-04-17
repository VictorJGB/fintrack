'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const HEADER_LINKS = [
  {
    label: 'Despesas',
    href: '/expenses'
  }
]

export default function NavBar() {
  const path = usePathname()

  console.log('pathname', path)

  return (
    <nav className='hidden h-full md:flex items-center justify-center gap-2'>
      {HEADER_LINKS.map(({ label, href }, index) => (
        <Link
          key={index}
          data-active={path === href}
          className='font-semibold text-muted-foreground hover:text-foreground data-active:text-foreground'
          href={href}
        >
          {label}
        </Link>
      ))}
    </nav>
  )
}