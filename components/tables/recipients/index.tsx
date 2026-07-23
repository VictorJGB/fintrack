"use client";

// libs
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
// actions
import getRecipients from "@/actions/recipients/get-recipients";
import AddRecipientDialog from "@/components/dialogs/recipients/add-recipient";
// components
import { DataTable } from "../data-table";
import TableSkeleton from "../table-skeleton";
import { columns } from "./columns";
import SearchInput from "@/components/search-input";
import useDebounce from "@/hooks/use-debounce";

export default function RecipientsTable() {
	const debounce_delay = 500;
	const [search, setSearch] = useState<string>("")
	const debouncedValue = useDebounce(search, debounce_delay)
	const { data, isLoading, error } = useQuery({
		queryKey: ["recipients", debouncedValue],
		queryFn: () => getRecipients(debouncedValue),
	});

	useEffect(() => {
		if (error) {
			toast.error("Tabela de Destinatários", {
				description: error.message,
			});
		}
	}, [error]);

	return (
		<div className="container mx-auto py-10">
			<div className="w-full flex flex-col md:flex-row items-center justify-center mb-4">
				<div className="w-full flex items-center justify-center md:justify-start gap-2">
					<SearchInput search={search} onSearchChange={setSearch} />
				</div>
				<div className="w-full flex items-center justify-between md:justify-end gap-2 ms-auto">
					<AddRecipientDialog />
				</div>
			</div>

			{isLoading && <TableSkeleton rowsNumber={10} />}

			{data && (
				<DataTable
					columns={columns}
					data={data}
					pageCount={1}
					page={1}
					firstPage={1}
					lastPage={1}
				/>
			)}

			{!isLoading && !data && (
				<div className="flex flex-col items-center justify-center">
					<h2 className="text-xl">Nenhum destinatário encontrado</h2>
				</div>
			)}
		</div>
	);
}
