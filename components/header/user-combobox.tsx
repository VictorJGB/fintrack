"use client"

import { v4 } from 'uuid'

// navigation
import { useRouter } from "next/navigation"

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
import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import UserInfoDialog from "./user-info-dialog"

interface Props {
  userID: string
}

export default function UserCombobox({ userID }: Props) {
  const [open, setOpen] = useState(false)
  const { replace } = useRouter()

  console.log(userID)

  const user: User = {
    _id: v4(), //UUID
    name: "Victor Jerrysson",
    email: "victorgb.dev@gmail.com",
    avatar: "https://github.com/shadcn.png",
    role: 'admin',
    salary: 1518
  }

  const logout = () => replace('/login')

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
              userID={userID}
              triggerClassname="w-full"
              setIsParentOpen={setOpen}
            />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={logout}
          >
            Logout
            <LogOut className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
