"use client"

import { useState, type ElementType } from "react"

// react table
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

// components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "../ui/input"
import TablePagination from "./table-pagination"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  AddDialogComponent?: ElementType
  pageCount?: number
  page?: number
  onNextPage?: number
}

export function DataTable<TData, TValue>({
  columns,
  data,
  AddDialogComponent,
  pageCount = 1,
  page = 1
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState<any>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      globalFilter
    }
  })

  function canGetPreviousPage() {
    return (page - 1) <= 0 ? false : true
  }

  function canGetNextPage() {
    return (page + 1) >= pageCount ? false : true
  }

  return (
    <div>
      {/* filter */}
      <div className="flex items-center py-4">
        <Input
          placeholder="Digite o seu filtro..."
          value={globalFilter ?? ""}
          onChange={(e) => {
            setGlobalFilter(e.target.value)
            table.setGlobalFilter(String(e.target.value))
          }
          }
          className="max-w-sm"
        />
        {AddDialogComponent && <AddDialogComponent />}
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Sem resultados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* pagination */}
      <TablePagination
        firstPage={1}
        lastPage={1}
        nextPage={1}
        page={1}
        pageCount={1}
        prevPage={1}
      />
    </div>
  )
}
