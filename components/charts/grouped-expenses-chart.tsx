"use client";
// libs
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { Pie, PieChart } from "recharts";
import { toast } from "sonner";
// actions
import getGroupedExpenses from "@/actions/expenses/get-grouped-expenses";
// components
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
// utils
import { cn } from "@/lib/utils";
import { Capitalize, formatToBRL } from "@/utils/formatters";

interface Props {
	className?: string;
}

const initialChartConfig = {
	_id: {
		label: "Destinatários",
	},
};

export default function GroupedExpensesChart({ className }: Props) {
	const [chartConfig, setChartConfig] =
		useState<ChartConfig>(initialChartConfig);
	const { data, isLoading, error } = useQuery({
		queryKey: ["expenses", "grouped"],
		queryFn: () => getGroupedExpenses(),
	});

	const chartData = useMemo(
		() =>
			data?.map((item) => ({
				_id: item._id.toLowerCase(),
				value: item.total_amount,
				fill: `var(--color-${item._id.toLowerCase()})`,
			})),
		[data],
	);

	useEffect(() => {
		if (error)
			toast.error("Gráficos de despesas agrupadas", {
				description: error?.message || "Erro ao carregar despesas agrupadas!",
			});

		// Adding chart config
		if (data) {
			setChartConfig({
				...initialChartConfig,
				...data.reduce(
					(acc, item, index) => ({
						...acc,
						[item._id.toLowerCase()]: {
							label: item._id,
							color: `var(--chart-${index + 1})`,
						},
					}),
					{},
				),
			});
		}
	}, [data, error]);

	return (
		<Card className={cn("flex flex-col rounded-2xl", className)}>
			<CardHeader className="items-center pb-0">
				<CardTitle>Despesas por destinatário</CardTitle>
				<CardDescription>
					Visualize o total de despesas de cada destinatário
				</CardDescription>
			</CardHeader>
			<CardContent className="flex-1 pb-0">
				{isLoading && !chartData && (
					<Skeleton className="h-[300px] w-full rounded-2xl" />
				)}
				{!chartData ||
					(chartData?.length === 0 && (
						<p className="size-full text-center text-medium text-muted-foreground">
							Nenhuma despesa encontrada
						</p>
					))}
				{chartData && chartData?.length > 0 && (
					<ChartContainer
						config={chartConfig}
						className="mx-auto aspect-square max-h-[300px] w-full [&_.recharts-pie-label-text]:fill-foreground pb-0"
					>
						<PieChart>
							<ChartTooltip
								content={
									<ChartTooltipContent
										hideLabel
										formatter={(value, name) => {
											const amount = formatToBRL(Number(value));
											const recipient = Capitalize(name.toString());
											return (
												<span>
													{recipient}: <strong>{amount}</strong>
												</span>
											);
										}}
										labelFormatter={(value) => formatToBRL(Number(value))}
									/>
								}
							/>
							<Pie
								data={chartData}
								dataKey="value"
								nameKey="_id"
								label={({ payload, ...props }) => {
									return (
										<text
											cx={props.cx}
											cy={props.cy}
											x={props.x}
											y={props.y}
											textAnchor={props.textAnchor}
											dominantBaseline={props.dominantBaseline}
											className="fill-foreground"
										>
											{formatToBRL(payload.value)}
										</text>
									);
								}}
							/>
							<ChartLegend
								content={<ChartLegendContent nameKey="_id" />}
								className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center w-full"
							/>
						</PieChart>
					</ChartContainer>
				)}
			</CardContent>
		</Card>
	);
}
