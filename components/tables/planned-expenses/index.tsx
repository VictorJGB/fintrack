'use client'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

// actions

// libs
import { useQuery } from '@tanstack/react-query'

// data table
import { DataTable } from '../data-table'
import TableSkeleton from '../table-skeleton'
import { columns } from './columns'

// components
import getPlannedExpenses from '@/actions/planneed-expenses/get-planned-expenses'
import AddPlannedExpenseDialog from '@/components/dialogs/planned-expenses/add-planned-expense'
import { toast } from 'sonner'

export default function PlannedExpensesTable() {
  const searchParams = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const itemsPerPage = searchParams.get('items_per_page') ?? '10'

  const { data, isLoading, error } = useQuery({
    queryKey: ['planned', 'expenses', page, itemsPerPage],
    queryFn: () => getPlannedExpenses(page, itemsPerPage),
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
          AddDialogComponent={AddPlannedExpenseDialog}
          page={data.page}
          pageCount={data.pageCount}
          firstPage={data.firstPage}
          lastPage={data.lastPage}
        />)}
    </div>
  )
}