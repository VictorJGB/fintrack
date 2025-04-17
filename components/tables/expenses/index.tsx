'use client'
import { useEffect } from 'react'

// actions
import getExpenses from '@/actions/expenses/get-expenses'

// libs
import { useQuery } from '@tanstack/react-query'

// icons
import { Loader2 } from 'lucide-react'

// data table
import { DataTable } from '../data-table'
import { columns } from './columns'

// components
import AddExpenseDialog from '@/components/dialogs/expenses/add-expense'
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

      {isLoading && <Loader2 className='size-10 animate-spin' />}

      {data && <DataTable columns={columns} data={data} AddDialogComponent={AddExpenseDialog} />}
    </div>
  )
}