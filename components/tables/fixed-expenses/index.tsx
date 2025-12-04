'use client'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

// actions
import getAllFixedExpenses from '@/actions/fixed-expenses/get-fixed-expenses'

// libs
import { useQuery } from '@tanstack/react-query'

// data table
import { DataTable } from '../data-table'
import { columns } from './columns'

// components
import AddFixedExpenseDialog from '@/components/dialogs/fixed-expenses/add-fixed-expense'
import { toast } from 'sonner'
import TableSkeleton from '../table-skeleton'

export default function FixedExpensesTable() {
  const searchParams = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const itemsPerPage = searchParams.get('items_per_page') ?? '10'

  const { data, isLoading, error } = useQuery({
    queryKey: ['fixed', 'expenses', page],
    queryFn: () => getAllFixedExpenses(page, itemsPerPage),
  })

  useEffect(() => {
    if (error) {
      toast.error(error.message)
      console.error(error)
    }
  }, [error])

  return (
    <div className="container mx-auto py-10">
      <div className='w-full flex justify-center md:justify-end mb-4'>
        <AddFixedExpenseDialog />
      </div>

      {isLoading && <TableSkeleton rowsNumber={10} />}


      {data && <DataTable
        columns={columns}
        data={data.data}
        page={data.page}
        pageCount={data.pageCount}
        firstPage={data.firstPage}
        lastPage={data.lastPage}

      />}
    </div>
  )
}