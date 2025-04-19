// icons
import { Info } from "lucide-react"

// components
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

// interface
import { Separator } from "@/components/ui/separator"
import type Expense from "@/interfaces/expense"

// utils
import { formatToBRL } from "@/utils/formatters"

interface Props {
  data: Expense
}

export default function InfoExpenseDialog({ data }: Props) {

  const infos = [
    { label: 'Empresa', value: data.company },
    { label: 'Descrição', value: data.description ?? 'Sem descrição' },
    { label: 'Destinatário', value: data.recipient ?? 'Sem destinatário' },
    { label: 'Parcela(s)', value: `${data.installments}x de ${formatToBRL(data.amount_per_installment)}` },
    { label: 'Parcela(s) paga(s)', value: `${data.installments_paid} de ${data.installments} parcela(s)` },
    { label: 'Valor total', value: `${formatToBRL(data.total_amount)}` },
  ]

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'ghost'}>
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