'use client'

// components
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import PayExpensesTable from './expenses-table'
// utils
import { cn } from '@/lib/utils'
// icons
import { CircleDollarSign } from 'lucide-react'
// libs

interface Props {
  triggerClassName?: string
}

export default function PayExpensesDialog({ triggerClassName }: Props) {

  return (
    <Dialog>
      <DialogTrigger asChild className={cn('', triggerClassName)}>
        <Button>
          Pagar despesas
          <CircleDollarSign className='size-4 ml-1' />
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[1000px]'>
        <DialogHeader>
          <DialogTitle>Pagar despesas</DialogTitle>
          <DialogDescription>Pague todas as suas despesas de uma só vez</DialogDescription>
        </DialogHeader>
        <div className='px-2 max-h-[400px] max-w-full overflow-y-auto'>
          <PayExpensesTable />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={'secondary'}>Fechar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}