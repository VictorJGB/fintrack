'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

// components
import { Button } from '../ui/button'
import { useSidebar } from '../ui/sidebar'
// icons
import LucideIconStore from '../lucide-icon-store'
// utils
import { cn } from '@/lib/utils'
import type { URLParams } from '@/utils/routes'

type Props = {
  path: string
  urlParams?: URLParams
  iconStr: string
  label: string
  className?: string
}

const createQueryParamsUrl = (path: string, urlParams: object) => {
  const params = new URLSearchParams({ ...urlParams });
  return `${path}?${params.toString()}`
}

export default function NavButton({ path, iconStr, label, className, urlParams }: Props) {
  const { isMobile, toggleSidebar } = useSidebar()
  const pathname = usePathname()

  const isLinkActive = pathname === path
  const linkURL = createQueryParamsUrl(path, urlParams ?? {})

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
      <Link href={linkURL}>
        <LucideIconStore name={iconStr} />
        {label}
      </Link>
    </Button>
  )
}