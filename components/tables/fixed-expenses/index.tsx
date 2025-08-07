'use client'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

// actions
import getAllFixedExpenses from '@/actions/fixed-expenses/get-fixed-expenses'

// libs
import { useSuspenseQuery } from '@tanstack/react-query'

// data table
import { DataTable } from '../data-table'
import TableSkeleton from '../table-skeleton'
import { columns } from './columns'

// components
import AddFixedExpenseDialog from '@/components/dialogs/fixed-expenses/add-fixed-expense'
import { toast } from 'sonner'

export default function FixedExpensesTable() {
  const searchParams = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const itemsPerPage = searchParams.get('items_per_page') ?? '10'

  const { data, isLoading, error } = useSuspenseQuery({
    queryKey: ['expenses', 'fixed', page],
    queryFn: () => getAllFixedExpenses(page, itemsPerPage),
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

      {data && data.data.length > 0 && (
        <DataTable
          columns={columns}
          data={data.data}
          AddDialogComponent={AddFixedExpenseDialog}
          // ImportDialogComponent={ImportExpensesDialog}
          page={data.page}
          pageCount={data.pageCount}
          firstPage={data.firstPage}
          lastPage={data.lastPage}

        />)}

      {!data && !isLoading && (
        <div className='size-full flex flex-col items-center justify-center gap-4'>
          <p className='text-muted-foreground font-semibold'>Nenhuma despesa encontrada!</p>
          <div className='flex items-center justify-center gap-2'>
            <AddFixedExpenseDialog />
            {/* <ImportExpensesDialog /> */}
          </div>
        </div>
      )}
    </div>
  )
}