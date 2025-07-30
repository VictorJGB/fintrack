"use client"
import { useEffect, useMemo, useState } from "react"

// components
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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Skeleton } from "@/components/ui/skeleton"
import { Pie, PieChart } from "recharts"
// utils
import { cn } from "@/lib/utils"
// libs
import { useQuery } from "@tanstack/react-query"
// actions
import getGroupedExpenses from "@/actions/expenses/get-grouped-expenses"
import ErrorCard from "@/components/cards/error-card"

interface Props {
  className?: string
}

const initialChartConfig = {
  _id: {
    label: "Destinatários",
  },
}

export default function GroupedExpensesChart({ className }: Props) {
  const [chartConfig, setChartConfig] = useState<ChartConfig>(initialChartConfig)
  const { data, isLoading, error } = useQuery({
    queryKey: ["grouped-expenses"],
    queryFn: () => getGroupedExpenses(),
  })

  const chartData = useMemo(() => data?.map((item) => (
    {
      _id: item._id.toLowerCase(),
      value: item.total_amount,
      fill: `var(--color-${item._id.toLowerCase()})`
    }
  )), [data])

  useEffect(() => {
    // Adding chart config
    if (data) {
      setChartConfig({
        ...initialChartConfig,
        ...data.reduce((acc, item, index) => (
          {
            ...acc,
            [item._id.toLowerCase()]: {
              label: item._id,
              color: `var(--chart-${index + 1})`
            },
          }
        ), {}),
      })
    }
  }, [data])

  if (isLoading || !chartData) return <Skeleton className={cn("rounded-2xl", className)} />

  if (error) return <ErrorCard title="Erro ao carregar despesas" error={error.message} className={className} />

  if (chartData && chartData.length > 0) {
    return (
      <Card className={cn("flex flex-col rounded-2xl", className)}>
        <CardHeader className="items-center pb-0">
          <CardTitle>Despesas por destinatário</CardTitle>
          <CardDescription>Visualize o total de despesas de cada destinatário</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[300px] w-full"
          >
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <Pie data={chartData} dataKey="value" label nameKey="_id" />
              <ChartLegend
                content={
                  <ChartLegendContent
                    nameKey="_id"
                  />
                }
                className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center w-full"
              />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    )
  }

}
