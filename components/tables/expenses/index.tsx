'use client'
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
import { toast } from 'sonner'

export default function ExpensesTable() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['get-expenses'],
    queryFn: getExpenses,
  })

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      console.log(error)
    }
  }, [data, error])

  return (
    <div className="container mx-auto py-10">

      {isLoading && <TableSkeleton rowsNumber={6} />}

      {data && (
        <DataTable
          columns={columns}
          data={data.data}
          AddDialogComponent={AddExpenseDialog}
          page={data.page}
          pageCount={data.pageCount}
        />)}
    </div>
  )
}