"use client";

import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ScatterChart,
  Scatter,
} from "recharts";
import { Widget } from "./types";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";

interface ChartRendererProps {
  widget: Widget;
  isDarkMode?: boolean;
}

export const ChartRenderer: React.FC<ChartRendererProps> = ({
  widget,
  isDarkMode = true,
}) => {
  const gridColor = isDarkMode ? "#334155" : "#e2e8f0";
  const textColor = isDarkMode ? "#94a3b8" : "#64748b";
  const tooltipBg = isDarkMode ? "#0f172a" : "#ffffff";
  const tooltipBorder = isDarkMode ? "#1e293b" : "#cbd5e1";

  // Stat Card
  if (widget.type === "stat") {
    return (
      <div className="h-full flex flex-col justify-between py-2">
        <div className="flex items-center justify-between">
          <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500 border border-blue-500/20">
            <Activity className="w-6 h-6" />
          </div>
          {widget.statChange && (
            <div
              className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full border ${
                widget.statIsPositive
                  ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                  : "bg-rose-500/10 text-rose-500 border-rose-500/20"
              }`}
            >
              {widget.statIsPositive ? (
                <TrendingUp size={14} />
              ) : (
                <TrendingDown size={14} />
              )}
              <span>{widget.statChange}</span>
            </div>
          )}
        </div>
        <div>
          <div className="text-3xl font-black tracking-tight text-foreground mt-3">
            {widget.statValue}
          </div>
          {widget.statPeriod && (
            <p className="text-xs text-muted-foreground mt-1 font-medium">
              {widget.statPeriod}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[220px]">
      <ResponsiveContainer width="100%" height="100%">
        {(() => {
          switch (widget.type) {
            case "line": {
              return (
                <LineChart data={widget.data} margin={{ top: 10, right: 15, left: -15, bottom: 0 }}>
                  {widget.showGrid && (
                    <CartesianGrid strokeDasharray="3 3" stroke={gridColor} opacity={0.6} />
                  )}
                  <XAxis dataKey={widget.categoryKey} stroke={textColor} fontSize={11} tickLine={false} />
                  <YAxis stroke={textColor} fontSize={11} tickLine={false} />
                  {widget.showTooltip && (
                    <Tooltip
                      contentStyle={{
                        backgroundColor: tooltipBg,
                        borderColor: tooltipBorder,
                        borderRadius: "12px",
                        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
                        color: isDarkMode ? "#f8fafc" : "#0f172a",
                        fontSize: "12px",
                        fontWeight: 600,
                      }}
                    />
                  )}
                  {widget.showLegend && (
                    <Legend
                      wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }}
                    />
                  )}
                  {/* Dynamic Comparison Lines */}
                  {widget.lines && widget.lines.length > 0 ? (
                    widget.lines.map((line) => (
                      <Line
                        key={line.id}
                        type={line.curveType || "monotone"}
                        dataKey={line.dataKey}
                        name={line.name}
                        stroke={line.color}
                        strokeWidth={line.strokeWidth || 2}
                        strokeDasharray={line.dashed ? "5 5" : undefined}
                        dot={{ r: 3, fill: line.color }}
                        activeDot={{ r: 6 }}
                      />
                    ))
                  ) : (
                    <Line
                      type="monotone"
                      dataKey={widget.valueKey || "value"}
                      stroke={widget.primaryColor || "#3b82f6"}
                      strokeWidth={2}
                      dot={{ r: 3 }}
                    />
                  )}
                </LineChart>
              );
            }

            case "bar": {
              return (
                <BarChart data={widget.data} margin={{ top: 10, right: 15, left: -15, bottom: 0 }}>
                  {widget.showGrid && (
                    <CartesianGrid strokeDasharray="3 3" stroke={gridColor} opacity={0.6} />
                  )}
                  <XAxis dataKey={widget.categoryKey} stroke={textColor} fontSize={11} tickLine={false} />
                  <YAxis stroke={textColor} fontSize={11} tickLine={false} />
                  {widget.showTooltip && (
                    <Tooltip
                      contentStyle={{
                        backgroundColor: tooltipBg,
                        borderColor: tooltipBorder,
                        borderRadius: "12px",
                        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
                        color: isDarkMode ? "#f8fafc" : "#0f172a",
                        fontSize: "12px",
                      }}
                    />
                  )}
                  {widget.showLegend && <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }} />}
                  {widget.bars && widget.bars.length > 0 ? (
                    widget.bars.map((b) => (
                      <Bar
                        key={b.id}
                        dataKey={b.dataKey}
                        name={b.name}
                        fill={b.color}
                        radius={[6, 6, 0, 0]}
                        stackId={b.stackId}
                      />
                    ))
                  ) : (
                    <Bar
                      dataKey={widget.valueKey || "value"}
                      fill={widget.primaryColor || "#3b82f6"}
                      radius={[6, 6, 0, 0]}
                    />
                  )}
                </BarChart>
              );
            }

            case "area": {
              const gradientId = `grad-${widget.id}`;
              return (
                <AreaChart data={widget.data} margin={{ top: 10, right: 15, left: -15, bottom: 0 }}>
                  <defs>
                    <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor={widget.primaryColor || "#3b82f6"}
                        stopOpacity={0.4}
                      />
                      <stop
                        offset="95%"
                        stopColor={widget.primaryColor || "#3b82f6"}
                        stopOpacity={0.0}
                      />
                    </linearGradient>
                  </defs>
                  {widget.showGrid && (
                    <CartesianGrid strokeDasharray="3 3" stroke={gridColor} opacity={0.6} />
                  )}
                  <XAxis dataKey={widget.categoryKey} stroke={textColor} fontSize={11} tickLine={false} />
                  <YAxis stroke={textColor} fontSize={11} tickLine={false} />
                  {widget.showTooltip && (
                    <Tooltip
                      contentStyle={{
                        backgroundColor: tooltipBg,
                        borderColor: tooltipBorder,
                        borderRadius: "12px",
                        fontSize: "12px",
                      }}
                    />
                  )}
                  <Area
                    type="monotone"
                    dataKey={widget.valueKey || "visitors"}
                    stroke={widget.primaryColor || "#3b82f6"}
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill={`url(#${gradientId})`}
                  />
                </AreaChart>
              );
            }

            case "pie": {
              return (
                <PieChart>
                  {widget.showTooltip && (
                    <Tooltip
                      contentStyle={{
                        backgroundColor: tooltipBg,
                        borderColor: tooltipBorder,
                        borderRadius: "12px",
                        fontSize: "12px",
                      }}
                    />
                  )}
                  {widget.showLegend && <Legend wrapperStyle={{ fontSize: "11px" }} />}
                  <Pie
                    data={widget.data}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey={widget.valueKey || "value"}
                    nameKey={widget.categoryKey}
                  >
                    {widget.data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color || ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#ec4899"][index % 5]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              );
            }

            case "radar": {
              return (
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={widget.data}>
                  <PolarGrid stroke={gridColor} />
                  <PolarAngleAxis dataKey={widget.categoryKey} stroke={textColor} fontSize={10} />
                  <PolarRadiusAxis stroke={textColor} fontSize={9} />
                  <Radar
                    name="Current"
                    dataKey="current"
                    stroke={widget.primaryColor || "#3b82f6"}
                    fill={widget.primaryColor || "#3b82f6"}
                    fillOpacity={0.4}
                  />
                  <Radar
                    name="Target"
                    dataKey="target"
                    stroke={widget.secondaryColor || "#8b5cf6"}
                    fill={widget.secondaryColor || "#8b5cf6"}
                    fillOpacity={0.2}
                  />
                  {widget.showTooltip && (
                    <Tooltip
                      contentStyle={{
                        backgroundColor: tooltipBg,
                        borderColor: tooltipBorder,
                        borderRadius: "12px",
                        fontSize: "12px",
                      }}
                    />
                  )}
                  {widget.showLegend && <Legend wrapperStyle={{ fontSize: "11px" }} />}
                </RadarChart>
              );
            }

            case "scatter": {
              return (
                <ScatterChart margin={{ top: 10, right: 15, left: -15, bottom: 0 }}>
                  {widget.showGrid && (
                    <CartesianGrid strokeDasharray="3 3" stroke={gridColor} opacity={0.6} />
                  )}
                  <XAxis dataKey="x" stroke={textColor} fontSize={11} name="Metric X" />
                  <YAxis dataKey="y" stroke={textColor} fontSize={11} name="Metric Y" />
                  {widget.showTooltip && (
                    <Tooltip
                      cursor={{ strokeDasharray: "3 3" }}
                      contentStyle={{
                        backgroundColor: tooltipBg,
                        borderColor: tooltipBorder,
                        borderRadius: "12px",
                        fontSize: "12px",
                      }}
                    />
                  )}
                  <Scatter
                    name="Data Points"
                    data={widget.data}
                    fill={widget.primaryColor || "#ec4899"}
                  />
                </ScatterChart>
              );
            }

            default:
              return null;
          }
        })()}
      </ResponsiveContainer>
    </div>
  );
};
