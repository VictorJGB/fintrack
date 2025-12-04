'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

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
import SearchInput from '@/components/search-input'
import useDebounce from '@/hooks/use-debounce'
import { toast } from 'sonner'

export default function ExpensesTable() {
  const { push } = useRouter()
  const pathname = usePathname()

  const searchParams = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const itemsPerPage = searchParams.get('items_per_page') ?? '10'
  const period = searchParams.get('period') ?? ""

  const [search, setSearch] = useState<string>('')

  const debounce_delay = 500 // ms
  const debouncedValue = useDebounce(search, debounce_delay)

  const { data, isLoading, error } = useQuery({
    queryKey: ['expenses', page, itemsPerPage, period, debouncedValue],
    queryFn: () => getExpenses(page, period, itemsPerPage, debouncedValue),
  })

  useEffect(() => {
    if (error) toast.error('Tabela de despesas', { description: error.message })
  }, [data, error])

  const updateSearchParams = useCallback((key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    const url = `${pathname}?${params.toString()}`

    push(url)
  }, [searchParams, push]);


  return (
    <div className="container mx-auto py-10">
      <div className='w-full flex flex-col md:flex-row items-center justify-center mb-4'>
        <div className='w-full flex items-center justify-center gap-2'>
          <SearchInput search={search} onSearchChange={setSearch} />
          {/* <PeriodSelect period={period} onPeriodChange={(value) => updateSearchParams('period', value)} /> */}
        </div>
        <div className='w-full flex items-center justify-between md:justify-end gap-2 ms-auto'>
          <ImportExpensesDialog />
          <AddExpenseDialog />
        </div>
      </div>

      {isLoading && <TableSkeleton rowsNumber={10} />}

      {data && (
        <DataTable
          columns={columns}
          data={data.data}
          page={data.page}
          pageCount={data.pageCount}
          firstPage={data.firstPage}
          lastPage={data.lastPage}

        />)}
    </div>
  )
}