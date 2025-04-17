
// components
import EditExpenseDialog from "@/components/dialogs/expenses/edit-expense"
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
import type Expense from "@/interfaces/expense"

// icons
import { Info, MoreHorizontal, Trash } from "lucide-react"

type Props = {
  data: Expense
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
        <DropdownMenuLabel>Açoes</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="w-full">
          Mais informaçoes
          <Info className="size-4 ml-4" />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="w-full" asChild>
          <EditExpenseDialog data={data} />
        </DropdownMenuItem>
        <DropdownMenuItem
          variant="destructive"
          className="w-full"
        >
          Deletar despesa
          <Trash className="size-4 ml-auto text-inherit" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}