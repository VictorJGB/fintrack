import Image from 'next/image'
import { useEffect, type Dispatch, type SetStateAction } from 'react'

// icons
import { Info, Loader2, Pencil } from 'lucide-react'

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
import { Label } from "@/components/ui/label"
import { Separator } from '../ui/separator'

// actions
import getUser from '@/actions/user/get-user'
import type User from '@/interfaces/user'
import { toast } from 'sonner'

type Props = {
  userID: string
  data: User
  triggerClassname: string | undefined
  setIsParentOpen: Dispatch<SetStateAction<boolean>>
}

export default function UserInfoDialog({ userID, data, triggerClassname, setIsParentOpen }: Props) {
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

        {user && <div className="grid gap-5 py-4">
          {/* image */}
          <div className='mx-auto size-40 relative'>
            <Image
              alt=''
              src={data.avatar}
              className='max-w-full max-h-full object-cover rounded-full'
              fill
            />
            <Button className='absolute bottom-0 right-[10%] rounded-full' size={'icon'}>
              <Pencil className='h-4 w-4' />
            </Button>
          </div>

          {/* form */}
          <div className='grid w-full gap-4'>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right text-primary font-bold">
                Nome
              </Label>
              <span className='col-span-3'>{user.name}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right text-primary font-bold">
                Email
              </Label>
              <span>{user.email}</span>
            </div>
          </div>
        </div>}
        <DialogFooter>
          <DialogClose
            asChild
            onClick={() => setIsParentOpen(false)}
          >
            <Button variant={'secondary'}>Fechar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog >
  )
}
