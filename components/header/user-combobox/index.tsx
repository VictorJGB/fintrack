"use client"
import { useState, useTransition } from 'react'
// libs
import { useQuery } from '@tanstack/react-query'
// navigation
import { useRouter } from "next/navigation"
// icons
import { Loader2, LogOut, MoreVerticalIcon } from "lucide-react"
// components
import getUser from '@/actions/user/get-user'
import Logout from '@/actions/user/logout'
import verifyUser from '@/actions/user/verify-user'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from 'sonner'
import UserInfoDialog from "../user-info-dialog"


export default function UserCombobox() {
  const [open, setOpen] = useState(false)

  // User Authentication
  const { data: authData, isLoading: IsAuthenticating, error: authError } = useQuery({
    queryKey: ['verify-user'],
    queryFn: verifyUser
  })

  // Retrieving user data
  const { data: user, error, isLoading } = useQuery({
    queryKey: ['user', authData?.userID],
    queryFn: () => getUser(authData?.userID || ''),
    enabled: !!authData?.userID
  })

  const { replace } = useRouter()
  const [isPending, startTransition] = useTransition()

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

  if (isLoading || IsAuthenticating) return <p className='text-muted w-full px-2 text-center'>Carregando...</p>

  if (error || authError) return <p className='text-destructive font-semibold w-full text-center px-2'>Erro ao buscar usuário</p>

  if (user) return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="py-5 bg-muted/50 rounded hover:bg-muted cursor-pointer"
        >
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
              user={user}
              triggerClassname="w-full"
              setIsParentOpen={setOpen}
            />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            variant='destructive'
            onClick={() => logout()}
            disabled={isPending}
          >
            Logout
            {!isPending && <LogOut className="h-4 w-4 text-inherit ml-auto" />}
            {isPending && <Loader2 className='size-4 text-inherit ml-auto' />}

          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
