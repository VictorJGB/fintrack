'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect } from 'react'

// actions
import getExpenses from '@/actions/expenses/get-expenses'

// libs
import { useQuery } from '@tanstack/react-query'

// data table
import AddExpenseDialog from '@/components/dialogs/expenses/add-expense'
import { DataTable } from '../data-table'
import TableSkeleton from '../table-skeleton'
import { columns } from './columns'

// components
import ImportExpensesDialog from '@/components/dialogs/expenses/import-expenses'
import PeriodSelect from '@/components/period-select'
import { toast } from 'sonner'

export default function ExpensesTable() {
  const { push } = useRouter()

  const searchParams = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const itemsPerPage = searchParams.get('items_per_page') ?? '10'
  const period = searchParams.get('period') ?? ""

  const { data, isLoading, error } = useQuery({
    queryKey: ['expenses', page, itemsPerPage, period],
    queryFn: () => getExpenses(page, period, itemsPerPage),
  })

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      console.log(error)
    }
  }, [data, error])

  const onPeriodSelect = useCallback((period: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("period", period);
    const url = `/expenses?${params.toString()}`

    push(url)
  }, [searchParams]);

  return (
    <div className="container mx-auto py-10">

      {isLoading && <TableSkeleton rowsNumber={10} />}

      {data && (
        <DataTable
          columns={columns}
          data={data.data}
          AddDialogComponent={AddExpenseDialog}
          ImportDialogComponent={ImportExpensesDialog}
          FilterComponent={<PeriodSelect period={period} onPeriodChange={onPeriodSelect} />}
          page={data.page}
          pageCount={data.pageCount}
          firstPage={data.firstPage}
          lastPage={data.lastPage}

        />)}
    </div>
  )
}