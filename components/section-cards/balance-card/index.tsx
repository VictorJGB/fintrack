'use client'

// components
import { SectionCard } from "../card"
import BalanceHoverInfo from "./hover-info"
// libs
import { useQueries, useQuery } from "@tanstack/react-query"
// actions
import verifyUser from "@/actions/user/verify-user"
// hooks
import getGroupedExpenses from "@/actions/expenses/get-grouped-expenses"
import getFixedExpenses from "@/actions/fixed-expenses/get-fixed-expenses"
import getIncomes from "@/actions/incomes/get-incomes"
import type { MonthFilter } from "@/interfaces/expense"
import type FixedExpense from "@/interfaces/fixed-expense"
import type Income from "@/interfaces/income"
import { formatToBRL } from "@/utils/formatters"
import { useEffect } from "react"
import { toast } from "sonner"

const searchRecipient: string = 'Eu'
const incomesPage = ""
const incomesPeriod: MonthFilter = "current"
const incomesPerPage = ""

export default function BalanceCard() {
  const { data: user } = useQuery({
    queryKey: ['verify-user'],
    queryFn: verifyUser
  })

  const data = useQueries({
    queries: [
      { queryKey: ["expenses", "grouped", , searchRecipient], queryFn: () => getGroupedExpenses(searchRecipient) },
      { queryKey: ['expenses', 'fixed'], queryFn: () => getFixedExpenses() },
      { queryKey: ["incomes", "dashboard"], queryFn: () => getIncomes(incomesPage, incomesPerPage, incomesPeriod), },
    ],
    combine: (results) => {
      const [grouped, fixed, incomes] = results
      const totalFixedExpenses = fixed.data?.data.reduce((acc: number, expense: FixedExpense) => acc + expense.amount, 0) ?? 0;
      const totalExpenses = grouped.data ? grouped.data[0].total_amount + totalFixedExpenses : 0;
      const totalIncomes = incomes.data?.data.reduce((acc: number, income: Income) => acc + income.amount, 0) ?? 0;
      const balance = ((user?.salary ?? 0) + totalIncomes) - totalExpenses;
      const isBalanceNegative = balance < 0;

      return {
        balance,
        isBalanceNegative,
        totalFixedExpenses,
        totalExpenses,
        totalIncomes,
        pending: results.some((result) => result.isPending),
        error: results.map((result) => result.error)
      }
    }
  })

  useEffect(() => {
    data.error.map((error) => {
      if (error) toast.error('Card de saldo', {
        description: error.message
      })
    })
  }, [data.error, data])

  return <SectionCard
    title={formatToBRL(data.balance)}
    subtitle="Saldo total"
    iconButton={
      <BalanceHoverInfo
        totalExpense={data.totalExpenses}
        totalIncome={data.totalIncomes}
        totalBalance={data.balance}
        fixedIncome={user?.salary ?? 0}
      />
    }
    description="Verifique o quanto ainda pode gastar"
    variant={data.isBalanceNegative ? 'destructive' : 'default'}
    isSuspense={data.pending}
  />
}
