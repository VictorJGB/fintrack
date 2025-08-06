'use client'

// actions
import { useQuery } from "@tanstack/react-query"
// components
import { SectionCard, SectionCardSkeleton } from "./card"
// utils
import getExpenses from "@/actions/expenses/get-expenses"
import { formatToBRL } from "@/utils/formatters"

export default function ExpensesCard() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["expenses", 'card'],
    queryFn: () => getExpenses()
  })

  if (isLoading) return <SectionCardSkeleton />


  if (data) {
    const total = formatToBRL(data.data.reduce((acc, expense) => { return acc + expense.amount_per_installment }, 0))
    const path = '/expenses?page=1&items_per_page=1'

    return (
      <SectionCard
        title={total}
        subtitle="Total de despesas"
        description="Verificar minhas despesas"
        path={path}
        variant={'destructive'}
      />
    )
  }

  if (error) return <p className="text-destructive">{JSON.stringify(error, null, 2)}</p>
}