"use client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

// actions

// libs
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
// components
import getPlannedExpenses from "@/actions/planneed-expenses/get-planned-expenses";
import AddPlannedExpenseDialog from "@/components/dialogs/planned-expenses/add-planned-expense";
// data table
import { DataTable } from "../data-table";
import TableSkeleton from "../table-skeleton";
import { columns } from "./columns";

export default function PlannedExpensesTable() {
	const searchParams = useSearchParams();
	const page = searchParams.get("page") ?? "1";
	const itemsPerPage = searchParams.get("items_per_page") ?? "10";

	const { data, isLoading, error } = useQuery({
		queryKey: ["planned", "expenses", page, itemsPerPage],
		queryFn: () => getPlannedExpenses(page, itemsPerPage),
	});

	useEffect(() => {
		if (error) {
			toast.error(error.message);
			console.log(error);
		}
	}, [error]);

	return (
		<div className="container mx-auto py-10">
			<div className="w-full flex justify-center md:justify-end mb-4">
				<AddPlannedExpenseDialog />
			</div>

			{isLoading && <TableSkeleton rowsNumber={10} />}

      {data && (
        <DataTable
          columns={columns}
          data={data.data ?? []}
          page={data.page}
          pageCount={data.pageCount}
          firstPage={data.firstPage}
          lastPage={data.lastPage}
        />)}
    </div>
  )
}
