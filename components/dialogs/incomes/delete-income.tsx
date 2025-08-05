import { useState } from "react"

// actions

// libs
import { queryClient } from "@/lib/react-query"
import { useMutation } from "@tanstack/react-query"

// components
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"

// icons
import deleteIncome from "@/actions/incomes/delete-income"
import { Loader2, Trash } from "lucide-react"

interface Props {
  incomeID: string
}

export default function DeleteIncomeDialog({ incomeID }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const { mutate, isPending } = useMutation({
    mutationFn: deleteIncome,
    mutationKey: ['delete-income'],
    onSuccess: ({ message }) => {
      toast.success(message)
      queryClient.invalidateQueries({ queryKey: ['get-incomes', 'chart-incomes', 'card-incomes'] })
      setIsOpen(false)
    },
    onError: ({ message }) => {
      toast.error(message)
    }
  })

  function handleDelete() {
    mutate(incomeID)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={'destructive'} className="w-full">
          Deletar recebimento
          <Trash className="size-4 ml-auto" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Deletar despesa</DialogTitle>
          <Separator />
        </DialogHeader>

        <p>
          Esta ação é <strong className="text-destructive">IRREVERSÍVEL</strong>, uma vez deletados, os dados não poderão mais ser recuperados.
          Deseja realmente deletar este recebimento?
        </p>

        <DialogFooter className="flex w-full mt-4 justify-end gap-2">
          <DialogClose asChild>
            <Button variant={'ghost'}>
              Fechar
            </Button>
          </DialogClose>

          <Button variant={'destructive'} onClick={handleDelete} disabled={isPending}>
            {isPending && <Loader2 className="size-4 ml-auto animate-spin" />}
            Deletar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}