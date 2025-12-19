"use client";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
// components
import { toast } from "sonner";
// actions
import getIncomes from "@/actions/incomes/get-incomes";
// types
import type { MonthFilter } from "@/interfaces/expense";
// utils
import { formatToBRL } from "@/utils/formatters";
import { SectionCard } from "./card";

export default function IncomesCard() {
	const page = "";
	const period: MonthFilter = "current";
	const itemsPerPage = "";

	const { data, isLoading, error } = useQuery({
		queryKey: ["incomes", "dashboard"],
		queryFn: () => getIncomes(page, itemsPerPage, period),
		select: (data) => {
			const total = data.data.reduce((acc, income) => {
				return acc + income.amount;
			}, 0);

			return total;
		},
	});

	useEffect(() => {
		if (error)
			toast.error("Card de recebimentos", {
				description:
					error?.message || "Erro ao carregar os dados do card de recebimentos",
			});
	}, [error]);

	const path = "/incomes?page=1&items_per_page=10";

	return (
		<SectionCard
			title={formatToBRL(data ?? 0)}
			subtitle="Total de recebimentos"
			description="Verificar meus recebimentos"
			path={path}
			variant={"success"}
			isSuspense={isLoading}
		/>
	);
}
