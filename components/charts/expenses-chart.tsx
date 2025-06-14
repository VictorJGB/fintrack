"use client"
// libs
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
// actions
import getExpenses from "@/actions/expenses/get-expenses"
import { useQuery } from "@tanstack/react-query"
// components
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Skeleton } from "../ui/skeleton"


const chartConfig = {
  expenses: {
    label: "Valor",
    color: "var(--destructive)",
  },
} satisfies ChartConfig

export default function ExpensesChart() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["expenses"],
    queryFn: getExpenses
  })

  if (isLoading) return <Skeleton className="rounded-2xl w-full h-[300px]" />

  if (error) {
    return (
      <Card>
        <CardContent>
          <p className="text-destructive font-semibold">{JSON.stringify(error, null, 2)}</p>
        </CardContent>
      </Card>
    )
  }

  if (data) {
    return (
      <Card className="rounded-2xl w-full">
        <CardHeader>
          <CardTitle>Total de despesas</CardTitle>
          <CardDescription>Despesas do mês</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="aspect-auto h-[300px] w-full">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="fillExpenses" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-expenses)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-expenses)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value)
                  return date.toLocaleDateString("pt-BR", {
                    month: "short",
                    day: "numeric",
                  })
                }}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("pt-BR", {
                        month: "short",
                        day: "numeric",
                      })
                    }}
                    indicator="dot"
                  />
                }
              />
              <Area
                dataKey="amount_per_installment"
                type="natural"
                fill="url(#fillExpenses)"
                stroke="var(--color-expenses)"
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card >
    )
  }
}