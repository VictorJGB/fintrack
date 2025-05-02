// components
import IncomesTable from "@/components/tables/incomes";

export default function IncomesPage() {

  return (
    <div className="px-10 py-6 size-full flex flex-col items-start justify-start">
      <h1 className="container text-2xl font-bold">Gerenciamento de recebimentos</h1>

      <IncomesTable />
    </div>
  )
}