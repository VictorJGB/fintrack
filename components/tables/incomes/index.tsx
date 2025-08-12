"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";

// actions
import getIncomes from "@/actions/incomes/get-incomes";

// libs
import { useQuery } from "@tanstack/react-query";

// data table
import { DataTable } from "../data-table";
import TableSkeleton from "../table-skeleton";

// components
import AddIncomeDialog from "@/components/dialogs/incomes/add-income";
import ImportIncomesDialog from "@/components/dialogs/incomes/import-incomes";
import PeriodSelect from "@/components/period-select";
import { toast } from "sonner";
import { columns } from "./columns";

export default function IncomesTable() {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? "1";
  const itemsPerPage = searchParams.get("items_per_page") ?? "10";
  const period = searchParams.get("period") ?? "current";

  const { push } = useRouter()

  const { data, isLoading, error } = useQuery({
    queryKey: ["incomes", page, itemsPerPage, period],
    queryFn: () => getIncomes(page, itemsPerPage, period),
  });

  const onPeriodSelect = useCallback((period: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("period", period);
    const url = `/incomes?${params.toString()}`

    push(url)
  }, [searchParams, push]);

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
          FilterComponent={<PeriodSelect period={period} onPeriodChange={onPeriodSelect} />}
          firstPage={data.firstPage}
          lastPage={data.lastPage}
          page={data.page}
          pageCount={data.pageCount}
        />
      )}
    </div>
  );
}
