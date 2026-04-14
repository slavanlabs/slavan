"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ProjectTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function ProjectTable<TData, TValue>({
  columns,
  data,
}: ProjectTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  return (
    <div className={cn("flex flex-col mt-10")}>
      <div className="w-full flex items-center justify-end gap-x-2">
        <div
          className={cn(
            "flex items-center gap-2 px-3 py-1 w-full max-w-xs rounded-xl",
            "bg-linear-to-b from-white to-[#f5f5f5]",
            "dark:from-[#1c1c1c] dark:to-[#141414]",
            "border border-neutral-200/80 dark:border-neutral-800/80",
            "shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.06)]",
            "dark:shadow-[0_2px_8px_rgba(0,0,0,0.4),0_8px_24px_rgba(0,0,0,0.5)]",
            "ring-1 ring-black/3 dark:ring-white/5",
            "transition-shadow duration-200",
            "focus-within:shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_rgba(0,0,0,0.1)]",
            "focus-within:ring-black/8 dark:focus-within:ring-white/10",
            "focus-within:border-neutral-300 dark:focus-within:border-neutral-700",
          )}
        >
          <Search
            size={15}
            className="text-neutral-400 dark:text-neutral-500 shrink-0"
          />
          <Input
            className={cn(
              " bg-transparent! border-none p-0 text-sm",
              "placeholder:text-neutral-400 dark:placeholder:text-neutral-600",
              "focus-visible:ring-0 focus-visible:ring-offset-0",
            )}
            value={
              (table.getColumn("project")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("project")?.setFilterValue(event.target.value)
            }
            placeholder="Search Projects..."
          />
        </div>
        <Select>
          <SelectTrigger
            className={cn(
              "w-40 p-5! rounded-xl",
              "bg-linear-to-b from-white to-[#f5f5f5]",
              "dark:from-[#1c1c1c] dark:to-[#141414]",
              "border border-neutral-200/80 dark:border-neutral-800/80",
              "shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.06)]",
              "dark:shadow-[0_2px_8px_rgba(0,0,0,0.4),0_8px_24px_rgba(0,0,0,0.5)]",
              "ring-1 ring-black/3 dark:ring-white/5",
              "transition-shadow duration-200",
              "focus-within:shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_rgba(0,0,0,0.1)]",
              "focus-within:ring-black/8 dark:focus-within:ring-white/10",
              "focus-within:border-neutral-300 dark:focus-within:border-neutral-700",
            )}
          >
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="invoice_sent">Invoice Sent</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="w-full overflow-hidden rounded-xl border mt-8">
        <Table className="bg-neutral-50 dark:bg-neutral-900">
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
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={cn(
                        "p-3",
                        cell.column.id === "client" &&
                          "text-neutral-500 dark:text-neutral-500",
                      )}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
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
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft />
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}

export default ProjectTable;
