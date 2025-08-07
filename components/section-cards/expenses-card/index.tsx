'use client'

// actions
import { useQueries } from "@tanstack/react-query"
// components
import { SectionCard, SectionCardSkeleton } from "../card"
// utils
import getExpenses from "@/actions/expenses/get-expenses"
import getAllFixedExpenses from "@/actions/fixed-expenses/get-fixed-expenses"
import { formatToBRL } from "@/utils/formatters"
import { useEffect, useState } from "react"
import ExpensesHoverInfo from "./expenses-hover-card"

export default function ExpensesCard() {
  const [expenses, fixedExpenses] = useQueries({
    queries: [
      { queryKey: ['expenses'], queryFn: () => getExpenses() },
      { queryKey: ['fixed', 'expenses'], queryFn: () => getAllFixedExpenses() }
    ]
  })

  const [totalExpenses, setTotalExpenses] = useState(0)
  const [totalFixedExpenses, setTotalFixedExpenses] = useState(0)


  // Calculating the total expenses
  useEffect(() => {
    if (expenses.data && fixedExpenses.data) {
      setTotalExpenses(expenses.data.data.reduce((acc, expense) => { return acc + expense.amount_per_installment }, 0))
      setTotalFixedExpenses(fixedExpenses.data.data.reduce((acc, expense) => { return acc + expense.amount }, 0))
    }
  }, [expenses.data, fixedExpenses.data])

  if (expenses.isLoading || fixedExpenses.isLoading) return <SectionCardSkeleton />


  if (expenses.data && fixedExpenses.data) {
    const total = formatToBRL(totalExpenses + totalFixedExpenses)
    const path = '/expenses?page=1&items_per_page=1'

    return (
      <SectionCard
        title={total}
        subtitle="Total de despesas"
        description="Verificar minhas despesas"
        path={path}
        iconButton={ExpensesHoverInfo({ totalExpenses, totalFixedExpenses, totalPlannedExpenses: 0 })}
        variant={'destructive'}
      />
    )
  }

  if (expenses.error || fixedExpenses.error) return <p className="text-destructive">{JSON.stringify(expenses.error ?? fixedExpenses.error, null, 2)}</p>
}