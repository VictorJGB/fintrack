
// components

import FixedExpensesTable from "@/components/tables/fixed-expenses";

export default function FixedExpensesPage() {

  return (
    <div className="px-4 sm:px-10 py-6 size-full flex flex-col items-start justify-start">
      <h1 className="container text-2xl font-bold text-center md:text-start">Gerenciamento de despesas fixas</h1>

      <FixedExpensesTable />
    </div>
  )
}