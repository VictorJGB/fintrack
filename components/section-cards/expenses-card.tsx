'use client'

// actions
import getExpenses from "@/actions/expenses/get-expenses"
import { useQuery } from "@tanstack/react-query"
// components
import { SectionCard, SectionCardSkeleton } from "./card"
// utils
import { formatToBRL } from "@/utils/formatters"

export default function ExpensesCard() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["expenses"],
    queryFn: getExpenses
  })

  if (isLoading) return <SectionCardSkeleton />

  if (data) {
    const total = formatToBRL(data.data.reduce((acc, expense) => { return acc + expense.amount_per_installment }, 0))

    return (
      <SectionCard
        title={total}
        subtitle="Total de despesas"
        description="Verificar minhas despesas"
        path="/expenses"
        variant={'destructive'}
      />
    )
  }

  if (error) return <p className="text-destructive">{JSON.stringify(error, null, 2)}</p>
}