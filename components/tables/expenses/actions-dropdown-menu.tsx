
// components
import DeleteExpenseDialog from "@/components/dialogs/expenses/delete-expense"
import EditExpenseDialog from "@/components/dialogs/expenses/edit-expense"
import InfoExpenseDialog from "@/components/dialogs/expenses/info-expense"
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
import { MoreHorizontal } from "lucide-react"

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
        <DropdownMenuLabel>Ações</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="w-full" asChild>
          <InfoExpenseDialog data={data} />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="w-full" asChild>
          <EditExpenseDialog data={data} />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="w-full" asChild>
          <DeleteExpenseDialog expenseID={data._id} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}