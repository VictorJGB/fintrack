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
import { formatToBRL } from "@/utils/formatters";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "../ui/skeleton";

const chartConfig = {
  amount: {
    label: "Despesa"
  },
  expenses: {
    label: "Despesa",
    color: "var(--destructive)",
  },
} satisfies ChartConfig;

export default function ExpensesChart() {
  const { data, isLoading, error } = useQuery({
    queryFn: getExpenses,
    queryKey: ["expenses"],
  });

  return (
    <Card className="w-full rounded-2xl">
      <CardHeader>
        <CardTitle>Total de despesas</CardTitle>
        <CardDescription>Despesas dos últimos 3 meses</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading && <Skeleton className="h-[250px] w-full rounded-2xl" />}

        {error && (
          <p className="text-destructive font-semibold">
            {JSON.stringify(error, null, 2)}
          </p>
        )}

        {data && (
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
        )}
      </CardContent>
    </Card>
  );
}
