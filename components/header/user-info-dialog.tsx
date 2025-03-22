
// types
import User from '@/types/user'

// components
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

import { Info, Pencil } from 'lucide-react'

import Image from 'next/image'
import { Separator } from '../ui/separator'


type Props = {
  data: User
  triggerClassname: string | undefined
}

export default function UserInfoDialog({ data, triggerClassname }: Props) {

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
        <div className="grid gap-4 py-4">
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
              <span className='col-span-3'>{data.name}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">
                Email
              </Label>
              <span>{data.email}</span>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant={'secondary'}>Fechar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog >
  )
}