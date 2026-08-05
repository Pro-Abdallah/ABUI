import { Widget } from "./types";

export function generateDashboardCode(widgets: Widget[]): string {
  const jsonWidgets = JSON.stringify(widgets, null, 2);

  return `"use client";

import React, { useState } from "react";
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
} from "recharts";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, TrendingUp, TrendingDown, Activity } from "lucide-react";

// Customized Widgets State Exported from AB UI
const INITIAL_CUSTOM_WIDGETS = ${jsonWidgets};

export default function CustomDashboard() {
  const [widgets, setWidgets] = useState(INITIAL_CUSTOM_WIDGETS);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setWidgets((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="w-full min-h-screen p-6 bg-slate-950 text-white space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Exported Analytics Dashboard</h1>
          <p className="text-xs text-slate-400">Customized with AB UI Component Studio</p>
        </div>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={widgets.map((w) => w.id)} strategy={rectSortingStrategy}>
          <div className="grid grid-cols-12 gap-5">
            {widgets.map((widget) => (
              <SortableCard key={widget.id} widget={widget} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}

function SortableCard({ widget }: { widget: any }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: widget.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
  };

  const spanClasses =
    widget.colSpan === 1
      ? "col-span-12 lg:col-span-4"
      : widget.colSpan === 2
      ? "col-span-12 lg:col-span-8"
      : "col-span-12";

  return (
    <div ref={setNodeRef} style={style} className={spanClasses}>
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl h-full flex flex-col justify-between">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <button {...attributes} {...listeners} className="text-slate-500 hover:text-slate-300 cursor-grab">
              <GripVertical size={18} />
            </button>
            <div>
              <h3 className="text-sm font-bold text-white">{widget.title}</h3>
              {widget.subtitle && <p className="text-xs text-slate-400">{widget.subtitle}</p>}
            </div>
          </div>
        </div>
        <div className="h-[240px] w-full">
          <RenderChart widget={widget} />
        </div>
      </div>
    </div>
  );
}

function RenderChart({ widget }: { widget: any }) {
  if (widget.type === "stat") {
    return (
      <div className="h-full flex flex-col justify-between py-2">
        <div className="flex items-center justify-between">
          <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500 border border-blue-500/20">
            <Activity className="w-6 h-6" />
          </div>
          {widget.statChange && (
            <div className="flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500">
              <TrendingUp size={14} />
              <span>{widget.statChange}</span>
            </div>
          )}
        </div>
        <div>
          <div className="text-3xl font-black text-white">{widget.statValue}</div>
          <p className="text-xs text-slate-400 mt-1">{widget.statPeriod}</p>
        </div>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      {widget.type === "line" ? (
        <LineChart data={widget.data} margin={{ top: 10, right: 15, left: -15, bottom: 0 }}>
          {widget.showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.6} />}
          <XAxis dataKey={widget.categoryKey} stroke="#94a3b8" fontSize={11} />
          <YAxis stroke="#94a3b8" fontSize={11} />
          {widget.showTooltip && <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderRadius: "12px" }} />}
          {widget.showLegend && <Legend wrapperStyle={{ fontSize: "11px" }} />}
          {widget.lines?.map((line: any) => (
            <Line
              key={line.id}
              type={line.curveType || "monotone"}
              dataKey={line.dataKey}
              name={line.name}
              stroke={line.color}
              strokeWidth={line.strokeWidth || 2}
              strokeDasharray={line.dashed ? "5 5" : undefined}
            />
          ))}
        </LineChart>
      ) : widget.type === "bar" ? (
        <BarChart data={widget.data} margin={{ top: 10, right: 15, left: -15, bottom: 0 }}>
          {widget.showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.6} />}
          <XAxis dataKey={widget.categoryKey} stroke="#94a3b8" fontSize={11} />
          <YAxis stroke="#94a3b8" fontSize={11} />
          {widget.showTooltip && <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderRadius: "12px" }} />}
          {widget.bars?.map((b: any) => (
            <Bar key={b.id} dataKey={b.dataKey} name={b.name} fill={b.color} radius={[6, 6, 0, 0]} />
          ))}
        </BarChart>
      ) : (
        <AreaChart data={widget.data}>
          <XAxis dataKey={widget.categoryKey} stroke="#94a3b8" fontSize={11} />
          <YAxis stroke="#94a3b8" fontSize={11} />
          <Area type="monotone" dataKey={widget.valueKey || "visitors"} stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
        </AreaChart>
      )}
    </ResponsiveContainer>
  );
}
`;
}
