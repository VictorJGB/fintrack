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
import Image from "next/image"
import LucideIconStore from "./lucide-icon-store"

// assets
import logo from '@/public/images/fintrack_logo_02_no_bg.png'
import ModeToggle from "./mode-toggle"


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const path = usePathname()

  return (
    <Sidebar {...props}>
      <SidebarHeader className="p-4 flex-row">
        <Link
          className='flex gap-2 cursor-pointer'
          href={'/'}
        >
          <div className="size-5">
            <Image
              className="w-full object-cover"
              height={200}
              width={200}
              src={logo}
              alt=""
            />
          </div>
          <h1 className="font-bold text-xl text-primary">Fintrack</h1>
        </Link>
        <ModeToggle btnClassName="ml-auto" />
      </SidebarHeader>
      <Separator />
      <SidebarContent className="px-4 py-6">
        {appLinks.map(({ label, href, icon }, index) => (
          <Button
            asChild
            data-active={path === href}
            className="rounded flex items-center justify-start data-[active=true]:text-background data-[active=true]:bg-foreground text-muted-foreground px-4 py-2"
            key={index}
            variant={'ghost'}
          >
            <Link href={href}>
              <LucideIconStore name={icon} />
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
