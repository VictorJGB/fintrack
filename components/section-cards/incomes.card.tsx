"use client";

// actions
import getIncomes from "@/actions/incomes/get-incomes";
import { useQuery } from "@tanstack/react-query";
// components
import { SectionCard, SectionCardSkeleton } from "./card";
// utils
import { formatToBRL } from "@/utils/formatters";
// types
import type { MonthFilter } from "@/interfaces/expense";

export default function IncomesCard() {
  const page = "";
  const period: MonthFilter = "current";
  const itemsPerPage = ""

  const { data, isLoading, error } = useQuery({
    queryKey: ["incomes", "card"],
    queryFn: () => getIncomes(page, itemsPerPage, period),
  });

  if (isLoading) return <SectionCardSkeleton />;

  if (data) {
    const total = formatToBRL(
      data.data.reduce((acc, income) => {
        return acc + income.amount;
      }, 0)
    );
    const path = "/incomes?page=1&items_per_page=10";

    return (
      <SectionCard
        title={total}
        subtitle="Total de recebimentos"
        description="Verificar meus recebimentos"
        path={path}
        variant={"success"}
      />
    );
  }

  if (error)
    return <p className="text-destructive">{JSON.stringify(error, null, 2)}</p>;
}
