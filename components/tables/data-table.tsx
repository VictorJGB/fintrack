"use client"

import { useState, type ElementType, type ReactNode } from "react"

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
  AddDialogComponent?: ElementType,
  ImportDialogComponent?: ElementType,
  FilterComponent?: ReactNode,
  pageCount: number
  page: number
  firstPage: number
  lastPage: number
}

export function DataTable<TData, TValue>({
  columns,
  data,
  AddDialogComponent,
  ImportDialogComponent,
  FilterComponent,
  pageCount,
  page,
  firstPage,
  lastPage,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState<string>("");

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

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-center py-4 gap-4 sm:gap-0">
        {/* filters */}
        <div className="flex items-center justify-center gap-2 basis-full sm:basis-2/4">
          <Input
            className="w-full sm:w-3/4"
            placeholder="Digite o seu filtro..."
            value={globalFilter ?? ""}
            onChange={(e) => {
              setGlobalFilter(e.target.value)
              table.setGlobalFilter(String(e.target.value))
            }
            }
          />

          {FilterComponent && FilterComponent}
        </div>

        {/* actions */}
        <div className="basis-full sm:basis-2/4 sm:ml-auto flex items-center justify-between sm:justify-end space-x-2">
          {ImportDialogComponent && <ImportDialogComponent />}
          {AddDialogComponent && <AddDialogComponent />}
        </div>
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
      {pageCount >= 1 && (
        <TablePagination
          firstPage={firstPage}
          lastPage={lastPage}
          page={page}
          pageCount={pageCount}
        />
      )}
    </div>
  )
}
