import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

// types
import type Income from "@/interfaces/income"

// icons
import { MoreHorizontal } from "lucide-react"

type Props = {
  data: Income
}

export default function ActionsDropdownMenu({ data }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Ações</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="w-full" asChild>
          {/* <InfoExpenseDialog data={data} /> */}
          Mains informações
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="w-full" asChild>
          {/* <EditExpenseDialog data={data} /> */}
          Editar recebimento
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="w-full" asChild>
          {/* <DeleteExpenseDialog expenseID={data._id} /> */}
          Deletar recebimento
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}