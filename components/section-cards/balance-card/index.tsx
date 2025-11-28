'use client'

// components
import { SectionCard, SectionCardSkeleton } from "../card"
import BalanceHoverInfo from "./hover-info"
// libs
import { useQuery } from "@tanstack/react-query"
// actions
import verifyUser from "@/actions/user/verify-user"
// hooks
import useBalance from "@/hooks/use-balance"
import { formatToBRL } from "@/utils/formatters"

export default function BalanceCard() {
  const { data: user } = useQuery({
    queryKey: ['verify-user'],
    queryFn: verifyUser
  })

  const {
    balance,
    isBalanceNegative,
    queriesLoading,
    totalExpenses,
    totalIncomes
  } = useBalance(user)


  if (queriesLoading) return <SectionCardSkeleton />

  if (!queriesLoading) {
    return <SectionCard
      title={formatToBRL(balance)}
      subtitle="Saldo total"
      iconButton={<BalanceHoverInfo totalExpense={totalExpenses} totalIncome={totalIncomes} totalBalance={balance} fixedIncome={user?.salary ?? 0} />}
      description="Verifique o quanto ainda pode gastar"
      variant={isBalanceNegative ? 'destructive' : 'default'}
    />
  }
}
