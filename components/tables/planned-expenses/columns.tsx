"use client"

// types
import type PlannedExpense from '@/interfaces/planned-expense'

// components

// react table
import { ColumnDef } from '@tanstack/react-table'

// icons
import { ArrowUpDown } from 'lucide-react'

// components
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatToBRL } from '@/utils/formatters'
import ActionsDropdownMenu from './actions-dropdown-menu'

export const columns: ColumnDef<PlannedExpense>[] = [
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
    accessorKey: "observation",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Observações
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "installments",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Parcelas
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    }
  },
  {
    accessorKey: "amount_per_installments",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Valor p/ parcela
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount_per_installments"))
      const formatted = formatToBRL(amount)

      return <Badge variant={'outline'} className='rounded-2xl bg-destructive/10  text-destructive border-destructive text-sm'>{formatted}</Badge>
    },
  },
  {
    accessorKey: "total_value",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Valor total
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("total_value"))
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