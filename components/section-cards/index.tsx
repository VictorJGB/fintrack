
// components
import BalanceCard from "./balance-card"
import { SectionCard } from "./card"
import ExpensesCard from "./expenses-card"
import IncomesCard from "./incomes.card"

type Props = {}

// mock data

const mockTotalExpense =
  { subtitle: 'Total de despesas', title: 1754.35, description: 'Verificar minhas despesas', }

const mockTotalIncome = { subtitle: 'Total de ganhos', title: 1827.32, description: 'Verificar meus recebimentos' }

const mockBalance = { subtitle: 'Saldo total', title: mockTotalIncome.title - mockTotalExpense.title, description: 'Verifique quanto ainda pode gastar esse mês' }

const mockPlanning = { subtitle: 'Total de planejamentos', title: 650, description: 'Verificar meus planejamentos' }


const formatedBalance = Intl.NumberFormat("pt-BR", {
  style: 'currency',
  currency: 'BRL',
}).format(mockBalance.title)

const formatedPlanning = Intl.NumberFormat("pt-BR", {
  style: 'currency',
  currency: 'BRL',
}).format(mockPlanning.title)

export default function SectionCards({ }: Props) {

  return (
    <div className="@xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4 w-full">
      {/* expense card */}
      <ExpensesCard />

      {/* income card */}
      <IncomesCard />

      {/* balance card*/}
      <BalanceCard />

      <SectionCard
        title={formatedPlanning}
        description={mockPlanning.description}
        subtitle={mockPlanning.subtitle}
      />

    </div>
  )
}