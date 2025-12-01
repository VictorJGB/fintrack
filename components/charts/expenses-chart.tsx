"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// actions
import getExpenses from "@/actions/expenses/get-expenses";
import { cn } from "@/lib/utils";
import { formatToBRL } from "@/utils/formatters";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";
import { Skeleton } from "../ui/skeleton";

const chartConfig = {
  amount: {
    label: "Despesa",
  },
  expenses: {
    label: "Despesa",
    color: "var(--destructive)",
  },
} satisfies ChartConfig;

interface Props {
  className?: string
}

export default function ExpensesChart({ className }: Props) {
  const { data, isLoading, error } = useQuery({
    queryFn: () => getExpenses(),
    queryKey: ["expenses", "chart"],
  });

  useEffect(() => {
    if (error) toast.error("Gráfico de Despesas", {
      description: error?.message || "Ocorreu um erro ao carregar o gráfico de despesas."
    });
  }, [error])

  return (
    <Card className={cn("rounded-2xl", className)}>
      <CardHeader>
        <CardTitle>Total de despesas</CardTitle>
        <CardDescription>Despesas do mês</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading && <Skeleton className="h-[300px] rounded-2xl" />}

        {!data && !isLoading && <p className="size-full text-center text-medium text-muted-foreground">Nenhuma despesa encontrada</p>}

        {data &&
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <BarChart
              accessibilityLayer
              data={data.data}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("pt-BR", {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[150px]"
                    nameKey="description"
                    formatter={(value) => {
                      return (
                        <div className="flex items-center justify-center gap-2">
                          <strong className="text-destructive">
                            Despesa:{" "}
                          </strong>
                          <span>{formatToBRL(+value)}</span>
                        </div>
                      );
                    }}
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("pt-BR", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      });
                    }}
                  />
                }
              />
              <Bar
                dataKey="amount_per_installment"
                fill="var(--color-expenses)"
                radius={8}
              />
            </BarChart>
          </ChartContainer>
        }
      </CardContent>
    </Card>
  );
}
