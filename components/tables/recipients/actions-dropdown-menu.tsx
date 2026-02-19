// icons
import { MoreHorizontal } from "lucide-react";
import DeleteIncomeDialog from "@/components/dialogs/incomes/delete-income";
import EditIncomeDialog from "@/components/dialogs/incomes/edit-income";
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
import type Recipient from "@/interfaces/recipients";

type Props = {
	data: Recipient;
};

export default function RecipientActionsDropdownMenu({ data }: Props) {
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
					<span>Editar destinatário</span>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem className="w-full" asChild>
					<span>Excluir destinatario</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
