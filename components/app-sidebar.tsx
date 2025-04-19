'use client'

import * as React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"

// utils
import { appLinks } from "@/utils/routes"

// components
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail
} from "@/components/ui/sidebar"
import UserCombobox from "./header/user-combobox"

// icons
import { Banknote, Coins } from "lucide-react"


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const path = usePathname()

  return (
    <Sidebar {...props}>
      <SidebarHeader className="p-4">
        <Link
          className='flex items-center gap-2 cursor-pointer'
          href={'/'}
        >
          <Coins className='w-5 h-5' />
          <h1 className="font-bold text-xl text-primary">Fintrack</h1>
        </Link>
      </SidebarHeader>
      <Separator />
      <SidebarContent className="px-4 py-6">
        {appLinks.map(({ label, href }, index) => (
          <Button
            asChild
            data-active={path === href}
            className="rounded flex items-center justify-start data-[active=true]:text-foreground text-muted-foreground"
            key={index}
            variant={'ghost'}
          >
            <Link href={href}>
              <Banknote className="mr-1 size-4 " />
              {label}
            </Link>
          </Button>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <UserCombobox />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
