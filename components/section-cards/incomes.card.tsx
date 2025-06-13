'use client'

// actions
import getIncomes from "@/actions/incomes/get-incomes"
import { useQuery } from "@tanstack/react-query"
// components
import { SectionCard, SectionCardSkeleton } from "./card"
// utils
import { formatToBRL } from "@/utils/formatters"

export default function IncomesCard() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["incomes"],
    queryFn: getIncomes
  })

  if (isLoading) return <SectionCardSkeleton />

  if (data) {
    const total = formatToBRL(data.reduce((acc, income) => { return acc + income.amount }, 0))

    return (
      <SectionCard
        title={total}
        subtitle="Total de recebimentos"
        description="Verificar meus recebimentos"
        path="/incomes"
        variant={'success'}
      />
    )
  }

  if (error) return <p className="text-destructive">{JSON.stringify(error, null, 2)}</p>
}