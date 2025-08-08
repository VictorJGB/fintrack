import type { Dispatch, SetStateAction } from "react"

// utils
import { cn } from "@/lib/utils"
// components
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select"

interface Props {
  period: string
  onPeriodChange: Dispatch<SetStateAction<string>>
  className?: string
}

const periods = [
  { label: 'Mês atual', value: 'current' },
  { label: 'Últimos 3 meses', value: 'quarter' },
  { label: 'Último ano', value: 'last-year' },
]

export default function PeriodSelect({ period, onPeriodChange, className }: Props) {
  const getPeriodLabel = (value: string) => periods.find(period => period.value === value)?.label

  return (
    <Select>
      <SelectTrigger className={cn('w-[200px]', className)}>
        <SelectValue defaultValue={period} placeholder={getPeriodLabel(period)} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Período</SelectLabel>
          {periods.map((period, index) => (
            <SelectItem
              key={index}
              value={period.value}
              onClick={() => onPeriodChange(period.value)}
            >
              {period.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}