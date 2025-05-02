import SectionCard from "./card"

type Props = {}

// mock data

const mockTotalExpense =
  { subtitle: 'Total de despesas', title: 1754.35, description: 'Verificar minhas despesas', }

const mockTotalIncome = { subtitle: 'Total de ganhos', title: 1827.32, description: 'Verificar meus recebimentos' }

const mockBalance = { subtitle: 'Saldo total', title: mockTotalIncome.title - mockTotalExpense.title, description: 'Verifique quanto ainda pode gastar esse mês' }

const formatedExpenseValue = new Intl.NumberFormat("pt-BR", {
  style: 'currency',
  currency: 'BRL',
}).format(mockTotalExpense.title)

const formatedIncomeValue = new Intl.NumberFormat("pt-BR", {
  style: 'currency',
  currency: 'BRL',
}).format(mockTotalIncome.title)

const formatedBalance = Intl.NumberFormat("pt-BR", {
  style: 'currency',
  currency: 'BRL',
}).format(mockBalance.title)

export default function SectionCards({ }: Props) {

  return (
    <div className="@xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4 px-4 w-full">
      {/* expense card */}
      <SectionCard
        title={formatedExpenseValue}
        description={mockTotalExpense.description}
        subtitle={mockTotalExpense.subtitle}
        path="/expenses"
        variant={'destructive'}
      />

      {/* income card */}
      <SectionCard
        title={formatedIncomeValue}
        description={mockTotalIncome.description}
        subtitle={mockTotalIncome.subtitle}
        path="/incomes"
        variant="success"
      />

      {/* balance card*/}
      <SectionCard
        title={formatedBalance}
        description={mockBalance.description}
        subtitle={mockBalance.subtitle}
      />

    </div>
  )
}