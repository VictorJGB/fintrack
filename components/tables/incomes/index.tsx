"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

// actions
import getIncomes from "@/actions/incomes/get-incomes";

// libs
import { useQuery } from "@tanstack/react-query";

// data table
import AddIncomeDialog from "@/components/dialogs/incomes/add-income";
import { DataTable } from "../data-table";
import TableSkeleton from "../table-skeleton";
import { columns } from "./columns";

// components
import ImportIncomesDialog from "@/components/dialogs/incomes/import-incomes";
import { toast } from "sonner";

export default function IncomesTable() {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? "1";
  const itemsPerPage = searchParams.get("items_per_page") ?? "10";

  const { data, isLoading, error } = useQuery({
    queryKey: ["get-incomes", page],
    queryFn: () => getIncomes(page, itemsPerPage),
  });

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      console.log(error);
    }
  }, [data, error]);

  return (
    <div className="container mx-auto py-10">
      {isLoading && <TableSkeleton rowsNumber={10} />}

      {data && (
        <DataTable
          columns={columns}
          data={data.data}
          AddDialogComponent={AddIncomeDialog}
          ImportDialogComponent={ImportIncomesDialog}
          firstPage={data.firstPage}
          lastPage={data.lastPage}
          page={data.page}
          pageCount={data.pageCount}
        />
      )}

      {!data && !isLoading && (
        <div className='size-full flex flex-col items-center justify-center gap-4'>
          <p className='text-muted-foreground font-semibold'>Nenhum recebimento encontrado!</p>
          <AddIncomeDialog />
        </div>
      )}
    </div>
  );
}
