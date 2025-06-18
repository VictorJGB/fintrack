'use client'

// actions
import getExpenses from "@/actions/expenses/get-expenses"
import getIncomes from "@/actions/incomes/get-incomes"
import { useQuery } from "@tanstack/react-query"
// components
import { SectionCard, SectionCardSkeleton } from "./card"
// utils
import { formatToBRL } from "@/utils/formatters"

export default function BalanceCard() {
  const { data: expenses, isLoading: isLoadingExpense, error: expenseError } = useQuery({
    queryKey: ["expenses"],
    queryFn: getExpenses
  })
  const { data: incomes, isLoading: isLoadingIncomes, error: incomesError } = useQuery({
    queryKey: ["incomes"],
    queryFn: getIncomes
  })

  if (isLoadingExpense || isLoadingIncomes) return <SectionCardSkeleton />

  if (expenses && incomes) {
    const totalExpenses = expenses.reduce((acc, expense) => { return acc + expense.amount_per_installment }, 0)
    const totalIncomes = incomes.reduce((acc, income) => { return acc + income.amount }, 0)
    const balance = (totalIncomes + 1518) - totalExpenses
    const formatedBalance = formatToBRL(balance)

    const isBalanceNegative = balance < 0 ? true : false

    return (
      <SectionCard
        title={formatedBalance}
        subtitle="Saldo total"
        description="Verifique o quanto ainda pode gastar"
        variant={isBalanceNegative ? 'destructive' : 'default'}
      />
    )
  }

  if (incomesError || expenseError) return <p className="text-destructive">{JSON.stringify(incomesError ?? expenseError, null, 2)}</p>
}