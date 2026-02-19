// components

import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import AddExpenseDialog from "@/components/dialogs/expenses/add-expense";
import DeleteExpenseDialog from "@/components/dialogs/expenses/delete-expense";
import DuplicateExpenseDialog from "@/components/dialogs/expenses/duplicate-expense";
import EditExpenseDialog from "@/components/dialogs/expenses/edit-expense";
import InfoExpenseDialog from "@/components/dialogs/expenses/info-expense";
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
import type Expense from "@/interfaces/expense";

type Props = {
	data: Expense;
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
					<InfoExpenseDialog data={data} />
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem className="w-full" asChild>
					<EditExpenseDialog data={data} handleModalClose={closeModal} />
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem className="w-full" asChild>
					<DuplicateExpenseDialog defaultValues={data} />
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem className="w-full" asChild>
					<DeleteExpenseDialog
						expenseID={data._id}
						handleModalClose={closeModal}
					/>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
