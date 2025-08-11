'use client'

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
import { useQueries, useQuery } from "@tanstack/react-query"
// types
import getFixedExpenses from "@/actions/fixed-expenses/get-fixed-expenses"
import verifyUser from "@/actions/user/verify-user"
import type FixedExpense from "@/interfaces/fixed-expense"
import type Income from "@/interfaces/income"
import type { MonthFilter } from "@/interfaces/income"

export default function BalanceCard() {
  const { data: user } = useQuery({
    queryKey: ['verify-user'],
    queryFn: verifyUser
  })

  const searchRecipient: string = 'Eu'

  const incomesPage = ""
  const incomesPeriod: MonthFilter = "current"
  const incomesPerPage = ""

  const [grouped, fixed, incomes] = useQueries({
    queries: [
      { queryKey: ["grouped", "expenses", searchRecipient], queryFn: () => getGroupedExpenses(searchRecipient) },
      { queryKey: ['fixed', 'expenses'], queryFn: () => getFixedExpenses() },
      { queryKey: ["incomes", "dashboard"], queryFn: () => getIncomes(incomesPage, incomesPerPage, incomesPeriod), },
    ]
  })

  if (grouped.isLoading || fixed.isLoading || incomes.isLoading || !user) return <SectionCardSkeleton />

  if (grouped.data && incomes.data && fixed.data) {
    const totalFixedExpenses = fixed.data.data.reduce((acc: number, expense: FixedExpense) => { return acc + expense.amount }, 0)
    const totalExpenses = grouped.data[0].total_amount + totalFixedExpenses
    const totalIncomes = incomes.data.data.reduce((acc: number, income: Income) => { return acc + income.amount }, 0)
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

  if (incomes.error !== null || grouped.error !== null || fixed.error !== null) return (
    <ErrorCard
      title="Erro ao carregar dados"
      error={incomes.error?.message || grouped.error?.message || fixed.error?.message || 'Erro desconhecido, tente novamente'}
      className="@container/card h-auto"
    />
  )
}
