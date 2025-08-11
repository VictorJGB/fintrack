'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

// components
import { Button } from '../ui/button'
import { useSidebar } from '../ui/sidebar'
// incons
import { cn } from '@/lib/utils'
import LucideIconStore from '../lucide-icon-store'

type Props = {
  path: string
  iconStr: string
  label: string
  className?: string
}

export default function NavButton({ path, iconStr, label, className }: Props) {
  const { isMobile, toggleSidebar } = useSidebar()
  const pathname = usePathname()

  const isLinkActive = pathname === path

  const handleMobileSidebar = () => {
    if (isMobile) {
      toggleSidebar()
    }
  }


  return (
    <Button
      asChild
      data-active={isLinkActive}
      className={cn(
        "rounded flex items-start justify-start data-[active=true]:text-background data-[active=true]:bg-foreground text-muted-foreground px-4 py-2",
        className
      )}
      variant={"ghost"}
      onClick={handleMobileSidebar}
    >
      <Link href={path}>
        <LucideIconStore name={iconStr} />
        {label}
      </Link>
    </Button>
  )
}