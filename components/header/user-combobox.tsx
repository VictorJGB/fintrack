"use client"

import { v4 } from 'uuid'

// navigation
import { useRouter } from "next/navigation"

// types
import type User from "@/types/user"

// icons
import { Loader2, LogOut, MoreVerticalIcon } from "lucide-react"

// components
import Logout from '@/actions/user/logout'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import UserInfoDialog from "./user-info-dialog"

export default function UserCombobox() {
  const [open, setOpen] = useState(false)
  const { replace } = useRouter()
  const [isPending, startTransition] = useTransition()

  const user: User = {
    _id: v4(), //UUID
    name: "Victor Jerrysson",
    email: "victorgb.dev@gmail.com",
    avatar: "https://github.com/shadcn.png",
    role: 'admin',
    salary: 1518
  }

  async function logout() {
    startTransition(async () => {
      try {
        await Logout()
        replace('/login')
      } catch (e) {
        if (e instanceof Error) {
          toast.error(e.message)
        }
        console.log(e)
      }
    })
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
              setIsParentOpen={setOpen}
            />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            asChild
          >
            <Button
              className='size-full'
              variant='destructive'
              disabled={isPending}
              onClick={() => logout()}
            >
              Logout
              {!isPending && <LogOut className="h-4 w-4 text-inherit ml-auto" />}
              {isPending && <Loader2 className='size-4 text-inherit ml-auto' />}
            </Button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
