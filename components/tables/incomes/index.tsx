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
import SearchInput from "@/components/search-input";
import { toast } from "sonner";
import { columns } from "./columns";

export default function IncomesTable() {
  const searchParams = useSearchParams();

  const page = searchParams.get("page") ?? "1";
  const itemsPerPage = searchParams.get("items_per_page") ?? "10";
  const period = searchParams.get("period") ?? "current";

  const { data, isLoading, error } = useQuery({
    queryKey: ["incomes", page, itemsPerPage, period],
    queryFn: () => getIncomes(page, itemsPerPage, period),
  });

  const [search, setSearch] = useState("")

  // const onPeriodSelect = useCallback((period: string) => {
  //   const params = new URLSearchParams(searchParams.toString());
  //   params.set("period", period);
  //   const url = `${pathname}?${params.toString()}`

  //   push(url)
  // }, [searchParams, push, pathname]);

  useEffect(() => {
    if (error) {
      toast.error('Tabela de recebimentos', {
        description: error.message
      });
    }
  }, [data, error]);


  return (
    <div className="container mx-auto py-10">
      <div className='w-full flex flex-col md:flex-row items-center justify-center mb-4 gap-2 md:gap-0'>
        <div className='w-full flex items-center justify-center gap-2'>
          <SearchInput search={search} onSearchChange={setSearch} />
          {/* <PeriodSelect period={period} onPeriodChange={onPeriodSelect} /> */}
        </div>
        <div className='w-full flex items-center justify-between md:justify-end gap-2 ms-auto'>
          <ImportIncomesDialog />
          <AddIncomeDialog />
        </div>
      </div>

      {isLoading && <TableSkeleton rowsNumber={10} />}

      {data && (
        <DataTable
          columns={columns}
          data={data.data}
          firstPage={data.firstPage}
          lastPage={data.lastPage}
          page={data.page}
          pageCount={data.pageCount}
        />
      )}
    </div>
  );
}
