// components

import { Suspense } from "react";
import TableSkeleton from "@/components/tables/table-skeleton";
import RecipientsTable from "@/components/tables/recipients";

export default function IncomesPage() {
  return (
    <div className="px-4 sm:px-10 size-full flex flex-col items-start justify-start">
      <h1 className="container text-2xl font-bold text-center md:text-start">
        Meus destinatários
      </h1>

      <Suspense fallback={<TableSkeleton rowsNumber={10} />}>
        <RecipientsTable />
      </Suspense>
    </div>
  );
}
