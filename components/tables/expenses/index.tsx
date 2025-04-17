'use client'

// actions
import getExpenses from '@/actions/expenses/get-expenses'

// libs
import { useQuery } from '@tanstack/react-query'

// icons
import { Loader2 } from 'lucide-react'

// components
import { useEffect } from 'react'
import { toast } from 'sonner'
import { DataTable } from '../data-table'
import { columns } from './columns'

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

      {data && <DataTable columns={columns} data={data} />}
    </div>
  )
}