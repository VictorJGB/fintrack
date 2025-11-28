import getGroupedExpenses from "@/actions/expenses/get-grouped-expenses"
import getFixedExpenses from "@/actions/fixed-expenses/get-fixed-expenses"
import getIncomes from "@/actions/incomes/get-incomes"
import type { UserResponse } from "@/actions/user/verify-user"

import type { MonthFilter } from "@/interfaces/expense"
import type FixedExpense from "@/interfaces/fixed-expense"
import type Income from "@/interfaces/income"

import { useQueries } from "@tanstack/react-query"
import { useEffect, useState } from "react"

export default function useBalance(user: UserResponse | undefined) {
  const [accExpenses, setAccExpenses] = useState<number>(0);
  const [accIncomes, setAccIncomes] = useState<number>(0);
  const [balance, setBalance] = useState<number>(0);
  const [isBalanceNegative, setIsBalanceNegative] = useState<boolean>(false);
  const [queriesLoading, setQueriesLoading] = useState<boolean>(false);

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

  useEffect(() => {
    setQueriesLoading(grouped.isLoading && fixed.isLoading && incomes.isLoading)

    if (!grouped.isLoading && !fixed.isLoading && !incomes.isLoading && grouped.data && fixed.data && incomes.data && user) {
      const totalFixedExpenses = fixed.data!.data.reduce((acc: number, expense: FixedExpense) => acc + expense.amount, 0) ?? 0;
      const totalExpenses = grouped.data![0].total_amount + totalFixedExpenses;
      const totalIncomes = incomes.data!.data.reduce((acc: number, income: Income) => acc + income.amount, 0) ?? 0;
      const newBalance = (totalIncomes + (user!.salary ?? 0)) - totalExpenses;

      setBalance(newBalance);
      setIsBalanceNegative(newBalance < 0);
      setAccExpenses(totalExpenses);
      setAccIncomes(totalIncomes);
    }

  }, [grouped.isLoading, fixed.isLoading, incomes.isLoading, grouped.data, fixed.data, incomes.data, user]);


  if (fixed.error || grouped.error || incomes.error) {
    return { balance, isBalanceNegative, queriesLoading, totalExpenses: accExpenses, totalIncomes: accIncomes };
  }


  return { balance, isBalanceNegative, queriesLoading, totalExpenses: accExpenses, totalIncomes: accIncomes };
}