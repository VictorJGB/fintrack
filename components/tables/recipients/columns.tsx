"use client";

// react table
import { ColumnDef } from "@tanstack/react-table";

// icons
import { ArrowUpDown } from "lucide-react";

// components
import { Button } from "@/components/ui/button";
import type Recipient from "@/interfaces/recipients";
import RecipientActionsDropdownMenu from "./actions-dropdown-menu";

export const columns: ColumnDef<Recipient>[] = [
	{
		accessorKey: "name",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Destinatário
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const recipient = row.original;

			return (
				<span className="font-semibold text-center ml-4">{recipient.name}</span>
			);
		},
	},
	{
		id: "actions",
		header: "Ações",
		cell: ({ row }) => {
			const recipient = row.original;

			return <RecipientActionsDropdownMenu data={recipient} />;
		},
	},
];
