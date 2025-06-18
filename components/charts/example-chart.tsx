"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import getExpenses from "@/actions/expenses/get-expenses"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { Skeleton } from "../ui/skeleton"

const chartConfig = {
  label: {
    label: "Valor",
  },
  expenses: {
    label: "Despesas",
    color: "var(--destructive)",
  },
} satisfies ChartConfig

interface ChartData {
  date: Date
  value: number
}

export default function ExampleChart() {
  const { data, isLoading, error } = useQuery({
    queryFn: getExpenses,
    queryKey: ["expenses"],
  })

  const [chartData, setChartData] = useState<ChartData[] | undefined>()

  useEffect(() => {
    if (data) {
      const newData = data.map(({ date, amount_per_installment }) => {
        return { date, value: amount_per_installment }
      })

      setChartData(newData)
    }

  }, [data])

  return (
    <Card className="w-full rounded-2xl">
      <CardHeader>
        <CardTitle>Total de despesas</CardTitle>
        <CardDescription>
          Total de despesas nos últimos 3 meses
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        {isLoading && <Skeleton className="h-[250px] w-full rounded-2xl" />}

        {error && <p className="text-destructive font-semibold">{JSON.stringify(error, null, 2)}</p>}

        {chartData && (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <BarChart
              accessibilityLayer
              data={chartData}
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
                content={
                  <ChartTooltipContent
                    className="w-[150px]"
                    nameKey="label"
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("pt-BR", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    }}
                  />
                }
              />
              <Bar dataKey="expenses" fill="var(--color-expenses)" />
            </BarChart>
          </ChartContainer>
        )}

      </CardContent>
    </Card>
  )
}
