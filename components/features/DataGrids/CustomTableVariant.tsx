"use client";

import { useEffect, useState } from "react";
import { ChevronUp, ChevronDown, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from "lucide-react";
import { generateEmployeeData, Employee } from "@/lib/mockData";

interface CustomTableVariantProps {
  rowCount?: number;
  enableSorting?: boolean;
  enablePagination?: boolean;
}

type SortField = keyof Employee;
type SortDirection = "asc" | "desc";

export default function CustomTableVariant({
  rowCount = 20,
  enableSorting = true,
  enablePagination = true,
}: CustomTableVariantProps) {
  const [data, setData] = useState<Employee[]>([]);
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    setData(generateEmployeeData(rowCount));
    setCurrentPage(1);
  }, [rowCount]);

  // Handle Sort Toggle
  const handleSort = (field: SortField) => {
    if (!enableSorting) return;

    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Sort Logic
  const sortedData = [...data].sort((a, b) => {
    if (!sortField) return 0;
    const aVal = a[sortField];
    const bVal = b[sortField];

    if (typeof aVal === "number" && typeof bVal === "number") {
      return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
    }
    return sortDirection === "asc"
      ? String(aVal).localeCompare(String(bVal))
      : String(bVal).localeCompare(String(aVal));
  });

  // Pagination Logic
  const paginatedData = enablePagination
    ? sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : sortedData;

  const totalPages = Math.ceil(data.length / pageSize);

  const SortIndicator = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? (
      <ChevronUp size={14} className="inline ml-1 text-blue-500" />
    ) : (
      <ChevronDown size={14} className="inline ml-1 text-blue-500" />
    );
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm flex flex-col">
      {/* Table Container */}
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 text-slate-500 font-bold select-none">
              {(["id", "name", "department", "status", "salary", "rating", "joinDate"] as SortField[]).map((field) => (
                <th
                  key={field}
                  onClick={() => handleSort(field)}
                  className={`px-6 py-4.5 font-bold tracking-tight text-xs uppercase ${
                    enableSorting ? "cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors" : ""
                  }`}
                >
                  <div className="flex items-center gap-1">
                    <span>
                      {field === "id"
                        ? "ID"
                        : field === "joinDate"
                        ? "Join Date"
                        : field.charAt(0).toUpperCase() + field.slice(1)}
                    </span>
                    <SortIndicator field={field} />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
            {paginatedData.map((emp) => (
              <tr
                key={emp.id}
                className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-all text-slate-700 dark:text-slate-300"
              >
                <td className="px-6 py-4 font-mono font-semibold">{emp.id}</td>
                <td className="px-6 py-4 font-bold text-foreground">{emp.name}</td>
                <td className="px-6 py-4">{emp.department}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold ${
                      emp.status === "Active"
                        ? "bg-green-100 text-green-800 dark:bg-green-950/40 dark:text-green-400"
                        : emp.status === "Inactive"
                        ? "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-400"
                        : emp.status === "On Leave"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-950/40 dark:text-yellow-400"
                        : "bg-red-100 text-red-800 dark:bg-red-950/40 dark:text-red-400"
                    }`}
                  >
                    {emp.status}
                  </span>
                </td>
                <td className="px-6 py-4 font-medium">${emp.salary.toLocaleString()}</td>
                <td className="px-6 py-4 font-bold text-yellow-600 dark:text-yellow-400">★ {emp.rating}</td>
                <td className="px-6 py-4 text-xs font-mono">{emp.joinDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {enablePagination && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-950/10 text-xs font-semibold text-slate-500 select-none shrink-0">
          <div className="flex items-center gap-3">
            <span>Rows per page:</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="px-2 py-1.5 rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-foreground font-bold outline-none cursor-pointer"
            >
              {[5, 10, 15, 20].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-4">
            <span>
              Page <strong>{currentPage}</strong> of <strong>{totalPages || 1}</strong>
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-foreground disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
              >
                <ChevronsLeft size={14} />
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-foreground disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-foreground disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
              >
                <ChevronRight size={14} />
              </button>
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages || totalPages === 0}
                className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-foreground disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
              >
                <ChevronsRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
