"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

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

  const [period, setPeriod] = useState("current");

  const { data, isLoading, error } = useQuery({
    queryKey: ["incomes", page],
    queryFn: () => getIncomes(page, itemsPerPage, period),
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
          FilterComponent={<PeriodSelect period={period} onPeriodChange={setPeriod} />}
          firstPage={data.firstPage}
          lastPage={data.lastPage}
          page={data.page}
          pageCount={data.pageCount}
        />
      )}
    </div>
  );
}
