// components
import IncomesTable from "@/components/tables/incomes";
import TableSkeleton from "@/components/tables/table-skeleton";
import { Suspense } from "react";

export default function IncomesPage() {

  return (
    <div className="px-4 sm:px-10 size-full flex flex-col items-start justify-start">
      <h1 className="container text-2xl font-bold text-center md:text-start">Gerenciamento de recebimentos</h1>

      <Suspense fallback={<TableSkeleton rowsNumber={10} />}>
        <IncomesTable />
      </Suspense>
    </div>
  )
}