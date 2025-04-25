'use client'

import { useEffect } from 'react'

// actions
import getIncomes from '@/actions/incomes/get-incomes'

// libs
import { useQuery } from '@tanstack/react-query'

// icons
import { Loader2 } from 'lucide-react'

// data table
import { DataTable } from '../data-table'
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

    console.log({ data })
  }, [data, error])

  return (
    <div className="container mx-auto py-10">

      {isLoading && <Loader2 className='size-10 animate-spin' />}

      {data && <DataTable columns={columns} data={data} columnFilter='source' filterPlaceholder='Filtrar por fonte...' />}
    </div>
  )
}