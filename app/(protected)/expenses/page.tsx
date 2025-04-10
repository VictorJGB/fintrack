// components
import ExpensesTable from "@/components/tables/expenses";

export default function ExpensesPage() {

  return (
    <div className="px-10 py-6 size-full flex flex-col items-start justify-start">
      <h1 className="container text-2xl font-bold">Gerenciamento de despesas</h1>

      <ExpensesTable />
    </div>
  )
}