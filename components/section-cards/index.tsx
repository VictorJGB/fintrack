
// components
import BalanceCard from "./balance-card"
import ExpensesCard from "./expenses-card"
import IncomesCard from "./incomes.card"
import SalaryCard from "./salary-card"

export default function SectionCards() {

  return (
    <div className="@xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4 w-full">
      {/* expense card */}
      <ExpensesCard />

      {/* income card */}
      <IncomesCard />

      {/* Salary */}
      <SalaryCard />

      {/* balance card*/}
      <BalanceCard />


    </div>
  )
}