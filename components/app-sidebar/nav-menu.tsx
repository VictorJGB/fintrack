"use client"

import { usePathname } from 'next/navigation'
import { useMemo, useState } from 'react'

// components
import { Button } from '../ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible'
import { SidebarMenuSub, SidebarMenuSubItem } from '../ui/sidebar'
import NavButton from './nav-button'

// types
import { type Route } from '@/utils/routes'
// icons
import { ChevronRight } from 'lucide-react'
import LucideIconStore from '../lucide-icon-store'

type Props = {
  triggerLabel: string
  icon: string
  links: Route[]
}

export default function NavMenu({ triggerLabel, links, icon }: Props) {
  const pathname = usePathname()

  const isChildrenSelected = useMemo(() => {
    const isChildrenSelected = links.some((link) => {
      return link.href === pathname
    })
    return isChildrenSelected
  }, [links, pathname])

  const [open, setOpen] = useState(isChildrenSelected)

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger asChild>
        <Button variant={'ghost'} className='group w-full cursor-pointer'>
          <LucideIconStore className='text-muted-foreground' name={icon} />
          <span className='text-muted-foreground'>{triggerLabel}</span>
          <ChevronRight
            className="ml-auto transition-transform duration-200 group-data-[state=open]:rotate-90"
          />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <SidebarMenuSub>
          {links.map(({ icon, label, href, urlParams }, index) => {
            return (
              <SidebarMenuSubItem key={index}>
                <NavButton iconStr={icon} label={label} path={href} urlParams={urlParams} />
              </SidebarMenuSubItem>
            )
          })}
        </SidebarMenuSub>
      </CollapsibleContent>
    </Collapsible>
  )
}