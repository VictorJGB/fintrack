'use client'

// actions
import getExpenses from "@/actions/expenses/get-expenses"
import getIncomes from "@/actions/incomes/get-incomes"
// components
import { SectionCard, SectionCardSkeleton } from "../card"
import BalanceHoverInfo from "./hover-info"
// utils
import { formatToBRL } from "@/utils/formatters"
// libs
import { useUser } from "@/context/user"
import { useQuery } from "@tanstack/react-query"

export default function BalanceCard() {
  const { user } = useUser()

  const { data: expenses, isLoading: isLoadingExpense, error: expenseError } = useQuery({
    queryKey: ["card-expenses"],
    queryFn: () => getExpenses()
  })
  const { data: incomes, isLoading: isLoadingIncomes, error: incomesError } = useQuery({
    queryKey: ["card-incomes"],
    queryFn: () => getIncomes()
  })

  if (isLoadingExpense || isLoadingIncomes || !user) return <SectionCardSkeleton />

  if (expenses && incomes) {
    const totalExpenses = expenses.data.reduce((acc, expense) => { return acc + expense.amount_per_installment }, 0)
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

  if (incomesError || expenseError) return <p className="text-destructive">{JSON.stringify(incomesError ?? expenseError, null, 2)}</p>
}