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
import { Skeleton } from "../ui/skeleton";

// actions
import getIncomes from "@/actions/incomes/get-incomes";
import { useQuery } from "@tanstack/react-query";
// utils
import { formatToBRL } from "@/utils/formatters";

const chartConfig = {
  incomes: {
    label: "Recebimento",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

export default function IncomesChart() {
  const page = "1";
  const itemsPerPage = "100";

  const { data, isLoading, error } = useQuery({
    queryFn: () => getIncomes(page, itemsPerPage),
    queryKey: ["chart-incomes"],
  });

  return (
    <Card className="w-full rounded-2xl">
      <CardHeader>
        <CardTitle>Total de recebimentos</CardTitle>
        <CardDescription>Recebimentos dos últimos 3 meses</CardDescription>
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
                          <strong className="text-primary">
                            Recebimento:{" "}
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
              <Bar dataKey="amount" fill="var(--color-incomes)" radius={8} />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
