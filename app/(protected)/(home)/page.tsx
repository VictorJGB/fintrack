import MainChart from "@/components/charts/main-chart";
import SectionCards from "@/components/section-cards";

export default function Home() {
  return (
    <div className="@container/main flex flex-col items-start justify-start size-full gap-6">
      <SectionCards />
      <MainChart />
    </div>
  );
}
