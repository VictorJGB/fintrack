"use client"

import { ColumnDef } from '@tanstack/react-table'

// icons
import { ArrowUpDown } from 'lucide-react'

// components
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type FixedExpense from '@/interfaces/fixed-expense'
import { formatToBRL } from '@/utils/formatters'
import ActionsDropdownMenu from './actions-dropdown-menu'

export const columns: ColumnDef<FixedExpense>[] = [
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Descrição
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Valor
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = formatToBRL(amount)

      return <Badge variant={'outline'} className='rounded-2xl bg-destructive/10  text-destructive border-destructive text-sm'>{formatted}</Badge>
    },
  },
  {
    id: 'actions',
    header: 'Ações',
    cell: ({ row }) => {
      const expense = row.original

      return (
        <ActionsDropdownMenu data={expense} />
      )
    },
  }
]