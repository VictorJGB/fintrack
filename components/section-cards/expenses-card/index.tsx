"use client";

// actions
import { useQueries } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";
// utils
import getExpenses from "@/actions/expenses/get-expenses";
import getFixedExpenses from "@/actions/fixed-expenses/get-fixed-expenses";
import getPlannedExpenses from "@/actions/planneed-expenses/get-planned-expenses";
import { formatToBRL } from "@/utils/formatters";
// components
import { SectionCard } from "../card";
import ExpensesHoverInfo from "./expenses-hover-card";

export default function ExpensesCard() {
	const {
		data,
		error,
		pending,
		totalExpenses,
		totalFixedExpenses,
		totalPlannedExpenses,
	} = useQueries({
		queries: [
			{ queryKey: ["expenses"], queryFn: () => getExpenses() },
			{ queryKey: ["fixed", "expenses"], queryFn: () => getFixedExpenses() },
			{
				queryKey: ["planned", "expenses"],
				queryFn: () => getPlannedExpenses(),
			},
		],
		combine: ([expenses, fixedExpenses, plannedExpenses]) => {
			const totalExpenses =
				expenses.data?.data.reduce((acc, expense) => {
					return acc + expense.amount_per_installment;
				}, 0) ?? 0;
			const totalFixedExpenses =
				fixedExpenses.data?.data.reduce((acc, expense) => {
					return acc + expense.amount;
				}, 0) ?? 0;
			const totalPlannedExpenses =
				plannedExpenses.data?.data.reduce((acc, expense) => {
					return acc + expense.amount_per_installments;
				}, 0) ?? 0;
			const total = totalExpenses + totalFixedExpenses + totalPlannedExpenses;

			return {
				data: total,
				totalExpenses,
				totalFixedExpenses,
				totalPlannedExpenses,
				pending:
					expenses.isPending ||
					fixedExpenses.isPending ||
					plannedExpenses.isPending,
				error: expenses.error || fixedExpenses.error || plannedExpenses.error,
			};
		},
	});

	useEffect(() => {
		if (error)
			toast.error("Card de despesas", {
				description:
					error?.message || "Erro ao carregar os dados do card de despesas",
			});
	}, [error]);

	const total = formatToBRL(data);
	const path = "/expenses?page=1&items_per_page=1";

	return (
		<SectionCard
			isSuspense={pending}
			title={total}
			subtitle="Total de despesas"
			description="Verificar minhas despesas"
			path={path}
			iconButton={ExpensesHoverInfo({
				totalExpenses,
				totalFixedExpenses,
				totalPlannedExpenses,
			})}
			variant={"destructive"}
		/>
	);
}
