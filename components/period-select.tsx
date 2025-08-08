// utils
// components
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select"

interface Props {
  period: string
  onPeriodChange: (value: string) => void
  className?: string
}

const periods = [
  { label: 'Mês atual', value: 'current' },
  { label: 'Últimos 3 meses', value: 'quarter' },
  { label: 'Último ano', value: 'last-year' },
  { label: 'Todas', value: 'all' },
]

export default function PeriodSelect({ period, onPeriodChange, className }: Props) {

  return (
    <Select onValueChange={onPeriodChange} defaultValue={period}>
      <SelectTrigger className={cn('min-w-[150px]', className)}>
        <SelectValue placeholder="Selecione um período" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Período</SelectLabel>
          {periods.map((period, index) => (
            <SelectItem
              key={index}
              value={period.value}
            >
              {period.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}