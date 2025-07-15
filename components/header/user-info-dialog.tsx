import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'

// icons
import { CheckCircle2, Info, Loader2, Pencil } from 'lucide-react'

// libs
import { useQuery } from '@tanstack/react-query'

// components
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { toast } from 'sonner'
import { Separator } from '../ui/separator'

// actions
import getUser from '@/actions/user/get-user'
// inter
import { Label } from '@/components/ui/label'
import type User from '@/interfaces/user'
import { formatToBRL } from '@/utils/formatters'
import { Input } from '../ui/input'
// utils

type Props = {
  userID: string
  data: User
  triggerClassname: string | undefined
  setIsParentOpen: Dispatch<SetStateAction<boolean>>
}

export default function UserInfoDialog({ userID, data, triggerClassname, setIsParentOpen }: Props) {
  const [isEditing, setIsEditing] = useState<boolean>(false)

  const { data: user, error, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(userID),
  })

  useEffect(() => {
    if (error) {
      toast.error(error.message)
    }

  }, [error])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className={triggerClassname}>
          Minhas informações
          <Info className='h-4 w-4 ml-auto' />
        </Button>
      </DialogTrigger>
      <Separator />
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Minhas informações</DialogTitle>
        </DialogHeader>
        {/* Loading data */}
        {isLoading && <Loader2 className='size-10 mx-auto animate-spin' />}

        {user &&
          <div className="grid gap-5 py-4">
            {/* form */}
            <div className='grid w-full gap-4'>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right text-primary font-bold">
                  Nome
                </Label>
                <Input
                  disabled={!isEditing}
                  className='col-span-3'
                  placeholder={user.name}
                  value={user.name}
                  onChange={() => { }}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right text-primary font-bold">
                  Email
                </Label>
                <Input
                  disabled={!isEditing}
                  className='col-span-3'
                  placeholder={user.email}
                  value={user.email}
                  onChange={() => { }}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right text-primary font-bold">
                  Salário
                </Label>
                <Input
                  disabled={!isEditing}
                  className='col-span-3'
                  placeholder={formatToBRL(user.salary)}
                  value={formatToBRL(user.salary)}
                  onChange={() => { }}
                />
              </div>
            </div>
          </div>
        }
        <DialogFooter>
          <DialogClose
            asChild
            onClick={() => setIsParentOpen(false)}
          >
            <Button variant={'secondary'}>Fechar</Button>
          </DialogClose>
          {!isEditing && <Button onClick={() => setIsEditing(true)}>
            Editar
            <Pencil className='h-4 w-4 ml-2' />
          </Button>}
          {isEditing && <Button onClick={() => setIsEditing(false)}>
            Salvar
            <CheckCircle2 className='h-4 w-4 ml-2' />
          </Button>}
        </DialogFooter>
      </DialogContent>
    </Dialog >
  )
}
