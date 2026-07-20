"use client";

import { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
  SortingState,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { generateEmployeeData, Employee } from "@/lib/mockData";

interface TanStackVariantProps {
  rowCount?: number;
  enableSorting?: boolean;
  enablePagination?: boolean;
}

const columnHelper = createColumnHelper<Employee>();

export default function TanStackVariant({
  rowCount = 20,
  enableSorting = true,
  enablePagination = true,
}: TanStackVariantProps) {
  const [data, setData] = useState<Employee[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  useEffect(() => {
    setData(generateEmployeeData(rowCount));
  }, [rowCount]);

  const columns = [
    columnHelper.accessor("id", {
      header: "ID",
      cell: (info) => <span className="font-mono font-semibold">{info.getValue()}</span>,
    }),
    columnHelper.accessor("name", {
      header: "Name",
      cell: (info) => <span className="font-bold text-foreground">{info.getValue()}</span>,
    }),
    columnHelper.accessor("department", {
      header: "Department",
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => {
        const status = info.getValue();
        const color =
          status === "Active"
            ? "bg-green-100 text-green-800 dark:bg-green-950/40 dark:text-green-400"
            : status === "Inactive"
            ? "bg-slate-100 text-slate-800 dark:bg-slate-850 dark:text-slate-400"
            : status === "On Leave"
            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-950/40 dark:text-yellow-400"
            : "bg-red-100 text-red-800 dark:bg-red-950/40 dark:text-red-400";
        return (
          <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${color}`}>
            {status}
          </span>
        );
      },
    }),
    columnHelper.accessor("salary", {
      header: "Salary",
      cell: (info) => <span>${info.getValue().toLocaleString()}</span>,
    }),
    columnHelper.accessor("rating", {
      header: "Rating",
      cell: (info) => (
        <span className="font-bold text-yellow-600 dark:text-yellow-400 font-mono">
          ★ {info.getValue()}
        </span>
      ),
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  return (
    <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm flex flex-col">
      {/* Table grid */}
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 text-slate-500 font-bold select-none"
              >
                {headerGroup.headers.map((header) => {
                  const canSort = enableSorting && header.column.getCanSort();
                  return (
                    <th
                      key={header.id}
                      onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                      className={`px-6 py-4.5 font-bold tracking-tight text-xs uppercase ${
                        canSort ? "cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors" : ""
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {canSort && (
                          <span className="text-slate-400">
                            {{
                              asc: <ChevronUp size={13} className="text-blue-500" />,
                              desc: <ChevronDown size={13} className="text-blue-500" />,
                            }[header.column.getIsSorted() as string] ?? <ArrowUpDown size={12} />}
                          </span>
                        )}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-slate-50/50 dark:hover:bg-slate-850/20 transition-all text-slate-700 dark:text-slate-300"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-6 py-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {enablePagination && (
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-950/10 text-xs font-semibold text-slate-500 select-none">
          <div className="flex items-center gap-2">
            <span>Rows per page:</span>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
              className="px-2 py-1.5 rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-foreground font-bold outline-none cursor-pointer"
            >
              {[5, 10, 15, 20].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-3">
            <span>
              Page <strong>{table.getState().pagination.pageIndex + 1}</strong> of{" "}
              <strong>{table.getPageCount() || 1}</strong>
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
