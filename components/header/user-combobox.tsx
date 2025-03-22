"use client"

import * as React from "react"
import { v4 } from 'uuid'

// types
import type User from "@/types/user"

// icons
import { LogOut, MoreVerticalIcon } from "lucide-react"

// components
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import UserInfoDialog from "./user-info-dialog"


const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
]

export default function UserCombobox() {
  const [open, setOpen] = React.useState(false)

  const user: User = {
    id: v4(), //aaaa-aaaa-aaaa-aaaa
    name: "Victor Jerrysson",
    email: "victorgb.dev@gmail.com",
    avatar: "https://github.com/shadcn.png"
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="py-5 bg-muted/50 rounded hover:bg-muted cursor-pointer"
        >
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{user.name}</span>
            <span className="truncate text-xs text-muted-foreground">
              {user.email}
            </span>
          </div>
          <MoreVerticalIcon className="ml-auto size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[230px] p-2" side="bottom">
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <UserInfoDialog
              data={user}
              triggerClassname="w-full"
            />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">
            Logout
            <LogOut className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
