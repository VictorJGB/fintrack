// icons
import { Info } from "lucide-react"

// components
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

// interface
import { Separator } from "@/components/ui/separator"

// utils
import type FixedExpense from "@/interfaces/fixed-expense"
import { formatToBRL } from "@/utils/formatters"

interface Props {
  data: FixedExpense
}

export default function InfoFixedExpenseDialog({ data }: Props) {

  const infos = [
    { label: 'Descrição', value: data.description },
    { label: 'Valor', value: `${formatToBRL(data.amount)}` },
  ]

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'ghost'} className="w-full">
          Mais informações
          <Info className="size-4 ml-auto" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Mais informações</DialogTitle>
          <Separator />
        </DialogHeader>
        <div className="flex flex-col gap-4 size-full overflow-y-auto">
          {infos.map(({ label, value }, index) => (
            <div key={index} className="grid gap-1">
              <Label className="text-primary font-bold">{label}</Label>
              <span>{value}</span>
            </div>
          ))}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={'ghost'}>
              Fechar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}