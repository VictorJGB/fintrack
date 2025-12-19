"use client";

// libs
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
// actions
import getAllFixedExpenses from "@/actions/fixed-expenses/get-fixed-expenses";
// components
import AddFixedExpenseDialog from "@/components/dialogs/fixed-expenses/add-fixed-expense";
// data table
import { DataTable } from "../data-table";
import TableSkeleton from "../table-skeleton";
import { columns } from "./columns";

export default function FixedExpensesTable() {
	const searchParams = useSearchParams();
	const page = searchParams.get("page") ?? "1";
	const itemsPerPage = searchParams.get("items_per_page") ?? "10";

	const { data, isLoading, error } = useQuery({
		queryKey: ["fixed", "expenses", page],
		queryFn: () => getAllFixedExpenses(page, itemsPerPage),
	});

	useEffect(() => {
		if (error) {
			toast.error(error.message);
			console.error(error);
		}
	}, [error]);

	return (
		<div className="container mx-auto py-10">
			<div className="w-full flex justify-center md:justify-end mb-4">
				<AddFixedExpenseDialog />
			</div>

			{isLoading && <TableSkeleton rowsNumber={10} />}

			{data && (
				<DataTable
					columns={columns}
					data={data.data}
					page={data.page}
					pageCount={data.pageCount}
					firstPage={data.firstPage}
					lastPage={data.lastPage}
				/>
			)}
		</div>
	);
}
