"use client";

import { cn } from "@/lib/utils";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { InvoiceTableProps } from "@/types/invoice-table";
import { useState } from "react";
import { InvoiceToolbar } from "./invoice-toolbar";
import { Separator } from "@/components/ui/separator";

export function InvoiceDataTable<TData, TValue>({
  columns,
  data,
}: InvoiceTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });
  return (
    <>
      <InvoiceToolbar onColumnFiltersChange={table.setColumnFilters} table={table}/>
      <Separator />
      <div className={cn("overflow-hidden rounded-sm")}>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header, idx) => {
                  const totalHeaders = headerGroup.headers.length;
                  const isBordered = idx === 0 || idx === totalHeaders - 2;
                  return (
                    <TableHead
                      key={header.id}
                      className={cn(
                        isBordered && "border-r border-border pl-5",
                      )}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
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
                  className="border-b-0"
                >
                  {row.getVisibleCells().map((cell, idx) => {
                    const totalCols = row.getVisibleCells().length;
                    const isBordered = idx === 0 || idx === totalCols - 2;

                    return (
                      <TableCell
                        key={cell.id}
                        className={cn(
                          isBordered && "border-r border-border pl-5",
                        )}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
