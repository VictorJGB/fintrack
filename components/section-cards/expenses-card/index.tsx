'use client'

// actions
import { useQueries } from "@tanstack/react-query"
// components
import { SectionCard, SectionCardSkeleton } from "../card"
// utils
import getExpenses from "@/actions/expenses/get-expenses"
import getFixedExpenses from "@/actions/fixed-expenses/get-fixed-expenses"
import getPlannedExpenses from "@/actions/planneed-expenses/get-planned-expenses"
import { formatToBRL } from "@/utils/formatters"
import { useEffect, useState } from "react"
import ExpensesHoverInfo from "./expenses-hover-card"

export default function ExpensesCard() {
  const [expenses, fixedExpenses, plannedExpenses] = useQueries({
    queries: [
      { queryKey: ['expenses'], queryFn: () => getExpenses() },
      { queryKey: ['fixed', 'expenses'], queryFn: () => getFixedExpenses() },
      { queryKey: ['planned', 'expenses'], queryFn: () => getPlannedExpenses() }
    ]
  })

  const [totalExpenses, setTotalExpenses] = useState(0)
  const [totalFixedExpenses, setTotalFixedExpenses] = useState(0)
  const [totalPlannedExpenses, setTotalPlannedExpenses] = useState(0)


  // Calculating the total expenses
  useEffect(() => {
    if (expenses.data && fixedExpenses.data && plannedExpenses.data) {
      setTotalExpenses(expenses.data.data.reduce((acc, expense) => { return acc + expense.amount_per_installment }, 0))
      setTotalFixedExpenses(fixedExpenses.data.data.reduce((acc, expense) => { return acc + expense.amount }, 0))
      setTotalPlannedExpenses(plannedExpenses.data.data.reduce((acc, expense) => { return acc + expense.amount_per_installments }, 0))
    }
  }, [expenses.data, fixedExpenses.data, plannedExpenses.data])

  if (expenses.isLoading || fixedExpenses.isLoading || plannedExpenses.isLoading) return <SectionCardSkeleton />


  if (expenses.data && fixedExpenses.data) {
    const total = formatToBRL(totalExpenses + totalFixedExpenses + totalPlannedExpenses)
    const path = '/expenses?page=1&items_per_page=1'

    return (
      <SectionCard
        title={total}
        subtitle="Total de despesas"
        description="Verificar minhas despesas"
        path={path}
        iconButton={ExpensesHoverInfo({ totalExpenses, totalFixedExpenses, totalPlannedExpenses })}
        variant={'destructive'}
      />
    )
  }

  if (expenses.error || fixedExpenses.error || plannedExpenses.error)
    return <p className="text-destructive">{JSON.stringify(expenses.error ?? fixedExpenses.error ?? plannedExpenses, null, 2)}</p>
}