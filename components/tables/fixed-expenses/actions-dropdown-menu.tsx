'use client'

import { useState } from "react";
// components
import InfoFixedExpenseDialog from "@/components/dialogs/fixed-expenses/info-fixed-expense";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// types
import type FixedExpense from "@/interfaces/fixed-expense";

// icons
import DeleteFixedExpenseDialog from "@/components/dialogs/fixed-expenses/delete-fixed-expense";
import EditFixedExpenseDialog from "@/components/dialogs/fixed-expenses/edit-fixed-expense";
import { MoreHorizontal } from "lucide-react";

type Props = {
  data: FixedExpense;
};

export default function ActionsDropdownMenu({ data }: Props) {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const closeModal = () => setDropdownOpen(false);

  return (
    <DropdownMenu modal={dropdownOpen} onOpenChange={setDropdownOpen}>
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
          <InfoFixedExpenseDialog data={data} />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="w-full" asChild>
          <EditFixedExpenseDialog data={data} handleModalClose={closeModal} />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="w-full" asChild>
          <DeleteFixedExpenseDialog id={data._id} handleModalClose={closeModal} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
