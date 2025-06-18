"use client"
// libs
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
// actions
import getExpenses from "@/actions/expenses/get-expenses"
import { useQuery } from "@tanstack/react-query"
// components
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Skeleton } from "../ui/skeleton"


const chartConfig = {
  amount: {
    label: "Despesa"
  },
  expenses: {
    label: "Despesas",
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
            <BarChart accessibilityLayer data={data}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                tickFormatter={(value) => {
                  const date = new Date(value)
                  return date.toLocaleDateString("pt-BR", {
                    month: "short",
                    day: "numeric",
                  })
                }}
              />
              <ChartTooltip content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="amount"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("pt-BR", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                />
              } />
              <Bar dataKey="expenses" fill="var(--color-expenses" radius={8} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card >
    )
  }
}