'use client'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

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
import { toast } from 'sonner'

export default function ExpensesTable() {
  const searchParams = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const itemsPerPage = searchParams.get('items_per_page') ?? '10'
  const period = ''

  const { data, isLoading, error } = useQuery({
    queryKey: ['expenses', page],
    queryFn: () => getExpenses(page, period, itemsPerPage),
  })

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      console.log(error)
    }
  }, [data, error])

  return (
    <div className="container mx-auto py-10">

      {isLoading && <TableSkeleton rowsNumber={10} />}

      {data && (
        <DataTable
          columns={columns}
          data={data.data}
          AddDialogComponent={AddExpenseDialog}
          ImportDialogComponent={ImportExpensesDialog}
          page={data.page}
          pageCount={data.pageCount}
          firstPage={data.firstPage}
          lastPage={data.lastPage}

        />)}
    </div>
  )
}