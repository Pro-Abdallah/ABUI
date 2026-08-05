"use client";

import React, { useState } from "react";
import { Widget, LineSeriesConfig, WidgetType, CurveType } from "./types";
import { ChartRenderer } from "./ChartRenderer";
import {
  X,
  Plus,
  Trash2,
  LineChart as LineIcon,
  BarChart2,
  PieChart as PieIcon,
  Activity,
  Sliders,
  Sparkles,
  Maximize2,
} from "lucide-react";
import { MONTHLY_DATA, CATEGORY_DATA, REGIONAL_SALES, TECH_RADAR, TRAFFIC_CONVERSION } from "./mockData";

interface ChartEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (widget: Widget) => void;
  initialWidget?: Widget | null;
}

const COLOR_PALETTE = [
  "#3b82f6", // Blue
  "#8b5cf6", // Purple
  "#10b981", // Emerald
  "#f59e0b", // Amber
  "#ec4899", // Pink
  "#06b6d4", // Cyan
  "#ef4444", // Red
  "#64748b", // Slate
];

export const ChartEditorModal: React.FC<ChartEditorModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialWidget,
}) => {
  if (!isOpen) return null;

  const isEditing = Boolean(initialWidget);

  // Form states
  const [title, setTitle] = useState(initialWidget?.title || "New Multi-Metric Chart");
  const [subtitle, setSubtitle] = useState(
    initialWidget?.subtitle || "Customizable performance comparison chart"
  );
  const [type, setType] = useState<WidgetType>(initialWidget?.type || "line");
  const [colSpan, setColSpan] = useState<1 | 2 | 3>(initialWidget?.colSpan || 2);
  const [showGrid, setShowGrid] = useState(initialWidget?.showGrid ?? true);
  const [showLegend, setShowLegend] = useState(initialWidget?.showLegend ?? true);
  const [showTooltip, setShowTooltip] = useState(initialWidget?.showTooltip ?? true);
  const [primaryColor, setPrimaryColor] = useState(
    initialWidget?.primaryColor || "#3b82f6"
  );

  // Line Chart specific state (Multiple Comparison Lines)
  const [lines, setLines] = useState<LineSeriesConfig[]>(
    initialWidget?.lines || [
      {
        id: "line-1",
        dataKey: "revenue2025",
        name: "Current Metric (2025)",
        color: "#3b82f6",
        strokeWidth: 3,
        curveType: "monotone",
      },
      {
        id: "line-2",
        dataKey: "revenue2024",
        name: "Comparison Baseline (2024)",
        color: "#8b5cf6",
        strokeWidth: 2,
        curveType: "monotone",
        dashed: true,
      },
      {
        id: "line-3",
        dataKey: "target",
        name: "Target Goal",
        color: "#10b981",
        strokeWidth: 2,
        curveType: "linear",
        dashed: true,
      },
    ]
  );

  // Stat Card specifics
  const [statValue, setStatValue] = useState(initialWidget?.statValue || "$248,500");
  const [statChange, setStatChange] = useState(initialWidget?.statChange || "+24.5%");
  const [statIsPositive, setStatIsPositive] = useState(
    initialWidget?.statIsPositive ?? true
  );

  const addLine = () => {
    const keys = ["expenses", "netProfit", "target", "revenue2024"];
    const unusedKey = keys[lines.length % keys.length];
    const newColor = COLOR_PALETTE[lines.length % COLOR_PALETTE.length];

    const newLine: LineSeriesConfig = {
      id: `line-${Date.now()}`,
      dataKey: unusedKey,
      name: `Comparison Series ${lines.length + 1}`,
      color: newColor,
      strokeWidth: 2,
      curveType: "monotone",
      dashed: false,
    };
    setLines([...lines, newLine]);
  };

  const removeLine = (id: string) => {
    if (lines.length <= 1) return;
    setLines(lines.filter((l) => l.id !== id));
  };

  const updateLine = (id: string, updates: Partial<LineSeriesConfig>) => {
    setLines(lines.map((l) => (l.id === id ? { ...l, ...updates } : l)));
  };

  // Preview Widget Object
  const previewWidget: Widget = {
    id: initialWidget?.id || `w-custom-${Date.now()}`,
    title,
    subtitle,
    type,
    colSpan,
    showGrid,
    showLegend,
    showTooltip,
    primaryColor,
    data:
      type === "pie"
        ? CATEGORY_DATA
        : type === "radar"
        ? TECH_RADAR
        : type === "bar"
        ? REGIONAL_SALES
        : MONTHLY_DATA,
    categoryKey:
      type === "pie"
        ? "name"
        : type === "radar"
        ? "skill"
        : type === "bar"
        ? "region"
        : "month",
    lines: type === "line" ? lines : undefined,
    statValue,
    statChange,
    statIsPositive,
    statPeriod: "vs previous quarter",
  };

  const handleSave = () => {
    onSave(previewWidget);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 sm:p-6 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl w-full max-w-5xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Sliders size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-tight">
                {isEditing ? "Customize Chart Widget" : "Create New Custom Chart"}
              </h2>
              <p className="text-xs text-slate-400">
                Configure dataset metrics, comparison lines, layout span, and appearance
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-y-auto divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
          {/* Controls Column */}
          <div className="lg:col-span-6 p-6 space-y-6 overflow-y-auto">
            {/* Chart Type Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                1. Select Chart Type
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: "line", label: "Line Chart", icon: LineIcon },
                  { id: "bar", label: "Bar Chart", icon: BarChart2 },
                  { id: "pie", label: "Donut / Pie", icon: PieIcon },
                  { id: "stat", label: "KPI Stat", icon: Activity },
                ].map((item) => {
                  const Icon = item.icon;
                  const active = type === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setType(item.id as WidgetType)}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-semibold transition cursor-pointer ${
                        active
                          ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20"
                          : "bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                      }`}
                    >
                      <Icon size={20} className="mb-1.5" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Basic Information */}
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                2. General Details
              </label>
              <div>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Chart Title..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition"
                />
              </div>
              <div>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="Chart Subtitle..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition"
                />
              </div>
            </div>

            {/* MULTI-LINE COMPARISON CUSTOMIZER (For Line Chart) */}
            {type === "line" && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Sparkles size={14} className="text-blue-400" />
                    3. Comparison Lines ({lines.length})
                  </label>
                  <button
                    onClick={addLine}
                    className="flex items-center gap-1 text-xs font-bold text-blue-400 hover:text-blue-300 bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-lg transition cursor-pointer"
                  >
                    <Plus size={14} /> Add Line
                  </button>
                </div>

                <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                  {lines.map((line, idx) => (
                    <div
                      key={line.id}
                      className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-3"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 flex-1">
                          <input
                            type="color"
                            value={line.color}
                            onChange={(e) =>
                              updateLine(line.id, { color: e.target.value })
                            }
                            className="w-7 h-7 rounded-lg bg-transparent border-0 cursor-pointer"
                          />
                          <input
                            type="text"
                            value={line.name}
                            onChange={(e) =>
                              updateLine(line.id, { name: e.target.value })
                            }
                            className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs font-semibold text-white flex-1 focus:outline-none focus:border-blue-500"
                          />
                        </div>
                        {lines.length > 1 && (
                          <button
                            onClick={() => removeLine(line.id)}
                            className="text-slate-500 hover:text-rose-400 p-1 rounded transition cursor-pointer"
                          >
                            <Trash2 size={15} />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <span className="text-[10px] text-slate-500 block mb-1">
                            Metric Data
                          </span>
                          <select
                            value={line.dataKey}
                            onChange={(e) =>
                              updateLine(line.id, { dataKey: e.target.value })
                            }
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-xs text-slate-300"
                          >
                            <option value="revenue2025">2025 Revenue</option>
                            <option value="revenue2024">2024 Revenue</option>
                            <option value="target">Target Goal</option>
                            <option value="expenses">Expenses</option>
                            <option value="netProfit">Net Profit</option>
                          </select>
                        </div>

                        <div>
                          <span className="text-[10px] text-slate-500 block mb-1">
                            Curve Style
                          </span>
                          <select
                            value={line.curveType}
                            onChange={(e) =>
                              updateLine(line.id, {
                                curveType: e.target.value as CurveType,
                              })
                            }
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-xs text-slate-300"
                          >
                            <option value="monotone">Smooth Curve</option>
                            <option value="linear">Straight Line</option>
                            <option value="step">Step Line</option>
                          </select>
                        </div>

                        <div>
                          <span className="text-[10px] text-slate-500 block mb-1">
                            Line Pattern
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateLine(line.id, { dashed: !line.dashed })
                            }
                            className={`w-full py-1 px-2 rounded-lg border text-xs font-semibold cursor-pointer ${
                              line.dashed
                                ? "bg-purple-500/20 border-purple-500/40 text-purple-300"
                                : "bg-slate-900 border-slate-800 text-slate-400"
                            }`}
                          >
                            {line.dashed ? "Dashed (- -)" : "Solid (——)"}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Layout Span & Toggles */}
            <div className="space-y-3 pt-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                4. Layout Grid Width & Display Options
              </label>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { span: 1, label: "1/3 Width" },
                  { span: 2, label: "2/3 Width" },
                  { span: 3, label: "Full Width (3/3)" },
                ].map((s) => (
                  <button
                    key={s.span}
                    type="button"
                    onClick={() => setColSpan(s.span as 1 | 2 | 3)}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold cursor-pointer transition ${
                      colSpan === s.span
                        ? "bg-blue-600 border-blue-500 text-white"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showGrid}
                    onChange={(e) => setShowGrid(e.target.checked)}
                    className="rounded border-slate-800 text-blue-600 focus:ring-0"
                  />
                  Show Gridlines
                </label>

                <label className="flex items-center gap-2 text-xs font-semibold text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showLegend}
                    onChange={(e) => setShowLegend(e.target.checked)}
                    className="rounded border-slate-800 text-blue-600 focus:ring-0"
                  />
                  Show Legend
                </label>

                <label className="flex items-center gap-2 text-xs font-semibold text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showTooltip}
                    onChange={(e) => setShowTooltip(e.target.checked)}
                    className="rounded border-slate-800 text-blue-600 focus:ring-0"
                  />
                  Show Tooltip
                </label>
              </div>
            </div>
          </div>

          {/* Live Preview Column */}
          <div className="lg:col-span-6 p-6 bg-slate-950/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Maximize2 size={14} className="text-emerald-400" />
                  Live Preview
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700 font-mono">
                  {colSpan === 1
                    ? "Span: 1/3"
                    : colSpan === 2
                    ? "Span: 2/3"
                    : "Span: Full"}
                </span>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl min-h-[300px]">
                <div className="mb-4">
                  <h3 className="text-base font-bold text-white">{title}</h3>
                  {subtitle && (
                    <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>
                  )}
                </div>

                <div className="h-[240px]">
                  <ChartRenderer widget={previewWidget} isDarkMode={true} />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-800 mt-6">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 hover:from-blue-500 hover:to-indigo-500 transition cursor-pointer"
              >
                {isEditing ? "Save Changes" : "Add to Dashboard"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
