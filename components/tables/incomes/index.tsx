'use client'

import { useEffect } from 'react'

// actions
import getIncomes from '@/actions/incomes/get-incomes'

// libs
import { useQuery } from '@tanstack/react-query'

// data table
import AddIncomeDialog from '@/components/dialogs/incomes/add-income'
import { DataTable } from '../data-table'
import TableSkeleton from '../table-skeleton'
import { columns } from './columns'

// components
import { toast } from 'sonner'

export default function IncomesTable() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['get-incomes'],
    queryFn: getIncomes,
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

      {data && <DataTable columns={columns} data={data.data} AddDialogComponent={AddIncomeDialog} />}
    </div>
  )
}