'use client'
import { useUser } from "@/context/user"

// actions
import getIncomes from "@/actions/incomes/get-incomes"
// components
import { SectionCard, SectionCardSkeleton } from "../card"
import BalanceHoverInfo from "./hover-info"
// utils
import { formatToBRL } from "@/utils/formatters"
// libs
import getGroupedExpenses from "@/actions/expenses/get-grouped-expenses"
import ErrorCard from "@/components/cards/error-card"
import { useQuery } from "@tanstack/react-query"
// types
import type { MonthFilter } from "@/interfaces/income"

export default function BalanceCard() {
  const { user } = useUser()
  const searchRecipient: string = 'Eu'

  const incomesPage = ""
  const incomesPeriod: MonthFilter = "current"
  const incomesPerPage = ""

  const { data: expenses, isLoading: isLoadingExpense, error: expenseError } = useQuery({
    queryKey: ["grouped-expenses", searchRecipient],
    queryFn: () => getGroupedExpenses(searchRecipient)
  })
  const { data: incomes, isLoading: isLoadingIncomes, error: incomesError } = useQuery({
    queryKey: ["dashboard-incomes"],
    queryFn: () => getIncomes(incomesPage, incomesPeriod, incomesPerPage),
  })

  if (isLoadingExpense || isLoadingIncomes || !user) return <SectionCardSkeleton />

  if (expenses && incomes) {
    const totalExpenses = expenses[0].total_amount
    const totalIncomes = incomes.data.reduce((acc, income) => { return acc + income.amount }, 0)
    const balance = (totalIncomes + (user?.salary ?? 1518)) - totalExpenses
    const formatedBalance = formatToBRL(balance)

    const isBalanceNegative = balance < 0 ? true : false

    return (
      <SectionCard
        title={formatedBalance}
        subtitle="Saldo total"
        iconButton={<BalanceHoverInfo totalExpense={totalExpenses} totalIncome={totalIncomes} totalBalance={balance} fixedIncome={user?.salary ?? 1518} />}
        description="Verifique o quanto ainda pode gastar"
        variant={isBalanceNegative ? 'destructive' : 'default'}
      />
    )
  }

  if (incomesError !== null || expenseError !== null) return (
    <ErrorCard
      title="Erro ao carregar dados"
      error={incomesError?.message || expenseError?.message || 'Erro desconhecido, tente novamente'}
      className="@container/card h-auto"
    />
  )
}