"use client";

import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  AllCommunityModule,
  themeQuartz,
  colorSchemeDark,
  ColDef,
} from "ag-grid-community";
import { generateEmployeeData, Employee } from "@/lib/mockData";

const lightTheme = themeQuartz;
const darkTheme = themeQuartz.withPart(colorSchemeDark);

interface AGGridVariantProps {
  rowCount?: number;
  rowHeight?: number;
  enableSorting?: boolean;
  enablePagination?: boolean;
}

export default function AGGridVariant({
  rowCount = 20,
  rowHeight = 48,
  enableSorting = true,
  enablePagination = true,
}: AGGridVariantProps) {
  const [rowData, setRowData] = useState<Employee[]>([]);
  const [gridTheme, setGridTheme] = useState(lightTheme);

  // Sync with dark mode
  useEffect(() => {
    const checkDark = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setGridTheme(isDark ? darkTheme : lightTheme);
    };

    checkDark();

    // Create a MutationObserver to listen for changes on html classList
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // Fetch row data on count change
  useEffect(() => {
    setRowData(generateEmployeeData(rowCount));
  }, [rowCount]);

  const columnDefs: ColDef<Employee>[] = [
    { field: "id", headerName: "ID", width: 90, sortable: enableSorting },
    { field: "name", headerName: "Employee Name", flex: 1, filter: true, sortable: enableSorting },
    { field: "department", headerName: "Department", flex: 1, filter: true, sortable: enableSorting },
    {
      field: "status",
      headerName: "Status",
      width: 130,
      sortable: enableSorting,
      cellRenderer: (params: any) => {
        const val = params.value;
        const color =
          val === "Active"
            ? "bg-green-100 text-green-800 dark:bg-green-950/40 dark:text-green-400"
            : val === "Inactive"
            ? "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-400"
            : val === "On Leave"
            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-950/40 dark:text-yellow-400"
            : "bg-red-100 text-red-800 dark:bg-red-950/40 dark:text-red-400";
        return (
          <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${color}`}>
            {val}
          </span>
        );
      },
    },
    {
      field: "salary",
      headerName: "Salary",
      width: 130,
      sortable: enableSorting,
      valueFormatter: (params) => {
        return typeof params.value === "number"
          ? `$${params.value.toLocaleString()}`
          : "";
      },
    },
    {
      field: "rating",
      headerName: "Performance Rating",
      width: 170,
      sortable: enableSorting,
      cellRenderer: (params: any) => {
        return (
          <div className="flex items-center gap-1 font-mono font-bold text-yellow-600 dark:text-yellow-400">
            ★ {params.value}
          </div>
        );
      },
    },
    { field: "joinDate", headerName: "Join Date", width: 140, sortable: enableSorting },
  ];

  return (
    <div className="w-full bg-card-bg border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm flex flex-col h-[400px]">
      <div className="flex-1 w-full h-full">
        <AgGridReact
          modules={[AllCommunityModule]}
          theme={gridTheme}
          rowData={rowData}
          columnDefs={columnDefs}
          rowHeight={rowHeight}
          pagination={enablePagination}
          paginationPageSize={10}
          paginationPageSizeSelector={[5, 10, 20]}
          defaultColDef={{
            resizable: true,
          }}
        />
      </div>
    </div>
  );
}
