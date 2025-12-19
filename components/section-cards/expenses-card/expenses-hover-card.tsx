"use client";

// icons
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";
// utils
import { formatToBRL } from "@/utils/formatters";

interface Props {
	totalExpenses: number;
	totalFixedExpenses: number;
	totalPlannedExpenses: number;
}

export default function ExpensesHoverInfo({
	totalExpenses,
	totalFixedExpenses,
	totalPlannedExpenses,
}: Props) {
	const total = formatToBRL(
		totalExpenses + totalFixedExpenses + totalPlannedExpenses,
	);
	const totalExpensesLabel = formatToBRL(totalExpenses);
	const totalFixedExpensesLabel = formatToBRL(totalFixedExpenses);
	const totalPlannedExpensesLabel = formatToBRL(totalPlannedExpenses);

	return (
		<HoverCard>
			<HoverCardTrigger>
				<Button variant={"ghost"} size={"icon"} className="size-8">
					<Info />
				</Button>
			</HoverCardTrigger>
			<HoverCardContent className="flex flex-col items-start justify-center space-y-4 w-[600px] rounded-2xl">
				<h3 className="font-semibold">Total de despesas calculadas</h3>
				<Separator />

				<div className="grid space-y-2 w-full">
					<div className="grid grid-cols-2 items-start">
						<span>Despesas mensais</span>
						<span>{totalExpensesLabel}</span>
					</div>
					<div className="grid grid-cols-2 items-start">
						<span>Despesas fixas</span>
						<span>{totalFixedExpensesLabel}</span>
					</div>
					<div className="grid grid-cols-2 items-start">
						<span>Despesas planejadas</span>
						<span>{totalPlannedExpensesLabel}</span>
					</div>
				</div>

				<p>
					<strong>{totalExpensesLabel}</strong> +
					<strong> {totalFixedExpensesLabel}</strong> +
					<strong> {totalPlannedExpensesLabel}</strong> =
					<strong className="text-destructive"> {total}</strong>
				</p>
			</HoverCardContent>
		</HoverCard>
	);
}
