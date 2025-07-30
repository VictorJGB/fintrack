// components
import ExpensesChart from "@/components/charts/expenses-chart";
import GroupedExpensesChart from "@/components/charts/grouped-expenses-chart";
import IncomesChart from "@/components/charts/incomes-chart";
import SectionCards from "@/components/section-cards";

export default function Home() {
  return (
    <div className="@container/main flex flex-col items-start justify-start size-full gap-6">
      <SectionCards />
      <div className="flex flex-col md:flex-row gap-6 w-full">
        <ExpensesChart className="basis-full md:basis-2/4 xl:basis-2/3" />
        <GroupedExpensesChart className="basis-full md:basis-2/4 xl:basis-1/3" />
      </div>
      <IncomesChart />
    </div>
  );
}
