"use client";

import React from "react";
import CustomDashboard from "@/components/features/Dashboard/CustomDashboard";
import ComponentCard from "@/components/gallery/ComponentCard";

export default function DashboardPage() {
  return (
    <div className="space-y-8 select-none">
      {/* Page Title Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-500 bg-blue-500/10 px-2.5 py-1 rounded-md border border-blue-500/20">
            New Feature
          </span>
          <span className="text-xs font-medium text-slate-400">
            Interactive Analytics & Charts
          </span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl mt-2">
          Fully Customizable Drag & Drop Dashboard
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-3xl leading-relaxed">
          Create, reorder, and resize charts dynamically. Supports <strong>multi-line comparison charts</strong> (compare multiple years, targets, and profit lines with custom stroke styles), stacked bar breakdown, donut metrics, tech radars, area traffic trends, and high-impact KPI stat cards.
        </p>
      </div>

      {/* Main Live Dashboard */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-950/20 overflow-hidden">
        <CustomDashboard darkMode={true} />
      </div>
    </div>
  );
}
