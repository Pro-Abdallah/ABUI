"use client";

import React from "react";
import ComponentCard from "@/components/gallery/ComponentCard";
import AGGridVariant from "@/components/features/DataGrids/AGGridVariant";
import CustomTableVariant from "@/components/features/DataGrids/CustomTableVariant";
import CardGridVariant from "@/components/features/DataGrids/CardGridVariant";
import TanStackVariant from "@/components/features/DataGrids/TanStackVariant";
import {
  generateAGGridCode,
  generateCustomTableCode,
  generateCardGridCode,
  generateTanStackCode,
} from "@/lib/codeTemplates";
import { ControlField } from "@/components/gallery/PreviewModal";

export default function GridsPage() {
  const rowCountControl: ControlField = {
    name: "rowCount",
    label: "Sample Rows Count",
    type: "slider",
    defaultValue: 20,
    min: 5,
    max: 100,
    step: 5,
  };

  const sortingControl: ControlField = {
    name: "enableSorting",
    label: "Enable Sorting",
    type: "boolean",
    defaultValue: true,
  };

  const paginationControl: ControlField = {
    name: "enablePagination",
    label: "Enable Pagination",
    type: "boolean",
    defaultValue: true,
  };

  return (
    <div className="space-y-8 select-none">
      {/* Title block */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
          Data Grid Components
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-3xl leading-relaxed">
          A dedicated collection of data tables and structural grids. Includes full-featured <strong>AG Grid</strong> bindings, lightweight <strong>CSS Tables</strong> (zero deps), responsive <strong>Product/Card Grids</strong>, and headless <strong>TanStack Table</strong> layout architectures.
        </p>
      </div>

      {/* Components Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. AG Grid */}
        <ComponentCard
          title="AG Grid Community Integration"
          description="High-performance data grid with built-in Quartz styling, sorting, pagination, and dynamic dark mode color scheme swapping."
          tags={["ag-grid", "community", "quartz-theme"]}
          controls={[
            rowCountControl,
            sortingControl,
            paginationControl,
            {
              name: "rowHeight",
              label: "Row Height (px)",
              type: "slider",
              defaultValue: 48,
              min: 36,
              max: 72,
              step: 4,
            },
          ]}
          renderComponent={(config) => (
            <div className="w-full h-full max-h-[300px] overflow-hidden">
              <AGGridVariant
                rowCount={Number(config.rowCount ?? 20)}
                rowHeight={Number(config.rowHeight ?? 48)}
                enableSorting={!!config.enableSorting}
                enablePagination={!!config.enablePagination}
              />
            </div>
          )}
          generateCode={generateAGGridCode}
        />

        {/* 2. Custom CSS Table */}
        <ComponentCard
          title="Lightweight CSS Table"
          description="A pure HTML/CSS table styled with Tailwind CSS. Includes custom client-side column sorting and pagination state logic."
          tags={["pure-css", "tailwind", "zero-deps"]}
          controls={[rowCountControl, sortingControl, paginationControl]}
          renderComponent={(config) => (
            <div className="w-full h-full max-h-[300px] overflow-y-auto custom-scrollbar">
              <CustomTableVariant
                rowCount={Number(config.rowCount ?? 20)}
                enableSorting={!!config.enableSorting}
                enablePagination={!!config.enablePagination}
              />
            </div>
          )}
          generateCode={generateCustomTableCode}
        />

        {/* 3. Card Grid Variant */}
        <ComponentCard
          title="Visual Product Card Grid"
          description="Masonry-style structural grid of cards. Features real-time category filtering tabs, pagination, and sorting keys."
          tags={["product-grid", "masonry", "responsive"]}
          controls={[
            {
              name: "productCount",
              label: "Product Count",
              type: "slider",
              defaultValue: 12,
              min: 4,
              max: 36,
              step: 4,
            },
            {
              name: "columns",
              label: "Grid Columns",
              type: "select",
              defaultValue: 3,
              options: [
                { label: "2 Columns", value: 2 },
                { label: "3 Columns", value: 3 },
                { label: "4 Columns", value: 4 },
              ],
            },
            {
              name: "enableFiltering",
              label: "Enable Category Filtering",
              type: "boolean",
              defaultValue: true,
            },
          ]}
          renderComponent={(config) => (
            <div className="w-full h-full max-h-[300px] overflow-y-auto p-1 custom-scrollbar">
              <CardGridVariant
                productCount={Number(config.productCount ?? 12)}
                columns={Number(config.columns ?? 3)}
                enableFiltering={!!config.enableFiltering}
              />
            </div>
          )}
          generateCode={generateCardGridCode}
        />

        {/* 4. TanStack Table Headless */}
        <ComponentCard
          title="TanStack React Table"
          description="Headless grid architecture. Renders dynamic columns, state sorting, and page offsets, styled with clean custom Tailwind layers."
          tags={["tanstack", "react-table", "headless"]}
          controls={[rowCountControl, sortingControl, paginationControl]}
          renderComponent={(config) => (
            <div className="w-full h-full max-h-[300px] overflow-y-auto custom-scrollbar">
              <TanStackVariant
                rowCount={Number(config.rowCount ?? 20)}
                enableSorting={!!config.enableSorting}
                enablePagination={!!config.enablePagination}
              />
            </div>
          )}
          generateCode={generateTanStackCode}
        />
      </div>
    </div>
  );
}
