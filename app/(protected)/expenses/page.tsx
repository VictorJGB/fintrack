import { DataTable } from "@/components/tables/data-table";
import { columns } from "@/components/tables/expenses/columns";
import { expenses } from "./mock-data";

export default function ExpensesPage() {

  return (
    <div className="px-10 py-6 size-full flex flex-col items-start justify-start">
      <h1 className="text-2xl font-bold">Gerenciamento de despesas</h1>

      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={expenses} />
      </div>
    </div>
  )
}