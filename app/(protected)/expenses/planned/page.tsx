// components

import TableSkeleton from "@/components/tables/table-skeleton";

export default function FixedExpensesPage() {

  return (
    <div className="px-4 sm:px-10 py-6 size-full flex flex-col items-start justify-start">
      <h1 className="container text-2xl font-bold">Gerenciamento de despesas planejadas</h1>

      {/* <Suspense fallback={<TableSkeleton rowsNumber={10} />}>
        <ExpensesTable />
      </Suspense> */}

      <TableSkeleton rowsNumber={10} />
    </div>
  )
}