import ReportsForm from "@/components/forms/reports-form";

export default function ReportsPage() {
  return (
    <div className="px-4 sm:px-10 size-full flex flex-col items-start justify-start gap-6">
      <h1 className="text-2xl font-bold text-center md:text-start">Relatórios</h1>

      <div className="container flex items-start justify-start w-full">
        <ReportsForm />
      </div>
    </div>
  )
}