"use client";

import React, { useState } from "react";
import { Widget } from "./types";
import { INITIAL_WIDGETS } from "./mockData";
import { ChartRenderer } from "./ChartRenderer";
import { ChartEditorModal } from "./ChartEditorModal";
import { ExportCodeModal } from "./ExportCodeModal";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Plus,
  GripVertical,
  Edit3,
  Trash2,
  Copy,
  RotateCcw,
  Sparkles,
  Maximize2,
  Minimize2,
  LayoutDashboard,
  Code,
} from "lucide-react";

interface CustomDashboardProps {
  darkMode?: boolean;
}

// Individual Sortable Widget Card Component
const SortableWidgetCard: React.FC<{
  widget: Widget;
  darkMode: boolean;
  isEditMode: boolean;
  onEdit: (widget: Widget) => void;
  onDuplicate: (widget: Widget) => void;
  onDelete: (id: string) => void;
  onToggleSpan: (id: string) => void;
}> = ({
  widget,
  darkMode,
  isEditMode,
  onEdit,
  onDuplicate,
  onDelete,
  onToggleSpan,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: widget.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 1,
    opacity: isDragging ? 0.6 : 1,
  };

  // Map colSpan to Tailwind grid classes
  const spanClasses =
    widget.colSpan === 1
      ? "col-span-12 lg:col-span-4"
      : widget.colSpan === 2
      ? "col-span-12 lg:col-span-8"
      : "col-span-12";

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${spanClasses} transition-all duration-300`}
    >
      <div
        className={`group relative h-full rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden ${
          darkMode
            ? "bg-slate-900/90 border-slate-800/90 hover:border-slate-700/90 shadow-xl shadow-black/40 backdrop-blur-md"
            : "bg-white border-slate-200 hover:border-slate-300 shadow-md shadow-slate-200/50"
        } ${isDragging ? "ring-2 ring-blue-500 shadow-2xl scale-[1.02]" : ""}`}
      >
        {/* Card Header */}
        <div className="flex items-start justify-between p-5 pb-2">
          <div className="flex items-start gap-2.5">
            {isEditMode && (
              <button
                {...attributes}
                {...listeners}
                className="p-1 rounded text-slate-400 hover:text-blue-500 cursor-grab active:cursor-grabbing mt-0.5"
                title="Drag to reorder chart"
              >
                <GripVertical size={18} />
              </button>
            )}
            <div>
              <h3 className="font-bold text-sm tracking-tight text-foreground flex items-center gap-2">
                {widget.title}
                {widget.lines && widget.lines.length > 1 && (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20">
                    {widget.lines.length} Line Compare
                  </span>
                )}
              </h3>
              {widget.subtitle && (
                <p className="text-xs text-muted-foreground mt-0.5">
                  {widget.subtitle}
                </p>
              )}
            </div>
          </div>

          {/* Widget Quick Controls */}
          <div className="flex items-center gap-1 opacity-90 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onToggleSpan(widget.id)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-foreground hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
              title="Toggle Grid Width (1/3, 2/3, Full)"
            >
              {widget.colSpan === 3 ? (
                <Minimize2 size={15} />
              ) : (
                <Maximize2 size={15} />
              )}
            </button>

            {isEditMode && (
              <>
                <button
                  onClick={() => onEdit(widget)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-blue-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                  title="Customize Chart & Lines"
                >
                  <Edit3 size={15} />
                </button>
                <button
                  onClick={() => onDuplicate(widget)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                  title="Duplicate Chart"
                >
                  <Copy size={15} />
                </button>
                <button
                  onClick={() => onDelete(widget.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                  title="Delete Chart"
                >
                  <Trash2 size={15} />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Chart Content Area */}
        <div className="p-5 pt-2 flex-1 min-h-[240px]">
          <ChartRenderer widget={widget} isDarkMode={darkMode} />
        </div>
      </div>
    </div>
  );
};

export default function CustomDashboard({ darkMode = true }: CustomDashboardProps) {
  const [widgets, setWidgets] = useState<Widget[]>(INITIAL_WIDGETS);
  const [isEditMode, setIsEditMode] = useState<boolean>(true);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [exportModalOpen, setExportModalOpen] = useState<boolean>(false);
  const [editingWidget, setEditingWidget] = useState<Widget | null>(null);

  // Setup sensors for smooth Drag and Drop
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
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

  const handleAddWidget = () => {
    setEditingWidget(null);
    setModalOpen(true);
  };

  const handleEditWidget = (widget: Widget) => {
    setEditingWidget(widget);
    setModalOpen(true);
  };

  const handleSaveWidget = (savedWidget: Widget) => {
    setWidgets((prev) => {
      const exists = prev.some((w) => w.id === savedWidget.id);
      if (exists) {
        return prev.map((w) => (w.id === savedWidget.id ? savedWidget : w));
      }
      return [savedWidget, ...prev];
    });
  };

  const handleDuplicateWidget = (widget: Widget) => {
    const duplicated: Widget = {
      ...widget,
      id: `w-dup-${Date.now()}`,
      title: `${widget.title} (Copy)`,
    };
    setWidgets((prev) => [duplicated, ...prev]);
  };

  const handleDeleteWidget = (id: string) => {
    setWidgets((prev) => prev.filter((w) => w.id !== id));
  };

  const handleToggleSpan = (id: string) => {
    setWidgets((prev) =>
      prev.map((w) => {
        if (w.id === id) {
          const nextSpan: 1 | 2 | 3 = w.colSpan === 1 ? 2 : w.colSpan === 2 ? 3 : 1;
          return { ...w, colSpan: nextSpan };
        }
        return w;
      })
    );
  };

  const handleResetLayout = () => {
    setWidgets(INITIAL_WIDGETS);
  };

  return (
    <div className="w-full min-h-screen p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Top Banner Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/60 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl backdrop-blur-xl shadow-lg">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20">
            <LayoutDashboard className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black tracking-tight text-foreground">
                Interactive Custom Dashboard
              </h1>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20">
                AB UI Core
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Drag to reorder charts • Customize multi-line comparison data • Export copy-pasteable React code
            </p>
          </div>
        </div>

        {/* Toolbar Controls */}
        <div className="flex items-center flex-wrap gap-2.5">
          {/* Add Chart Button */}
          <button
            onClick={handleAddWidget}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-500/20 transition cursor-pointer"
          >
            <Plus size={16} /> Add Chart
          </button>

          {/* Export Code Button */}
          <button
            onClick={() => setExportModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-md shadow-emerald-500/20 transition cursor-pointer"
          >
            <Code size={16} /> Export Code
          </button>

          {/* Edit Mode Toggle */}
          <button
            onClick={() => setIsEditMode(!isEditMode)}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
              isEditMode
                ? "bg-slate-800 border-slate-700 text-blue-400"
                : "bg-slate-950/40 border-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            <Edit3 size={15} />
            {isEditMode ? "Editing Layout" : "View Only Mode"}
          </button>

          {/* Reset Layout */}
          <button
            onClick={handleResetLayout}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-foreground hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            title="Reset to default layout"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      {/* Grid of Sortable Widgets */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={widgets.map((w) => w.id)}
          strategy={rectSortingStrategy}
        >
          <div className="grid grid-cols-12 gap-5">
            {widgets.map((widget) => (
              <SortableWidgetCard
                key={widget.id}
                widget={widget}
                darkMode={darkMode}
                isEditMode={isEditMode}
                onEdit={handleEditWidget}
                onDuplicate={handleDuplicateWidget}
                onDelete={handleDeleteWidget}
                onToggleSpan={handleToggleSpan}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {/* Chart Customizer / Creator Modal */}
      <ChartEditorModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveWidget}
        initialWidget={editingWidget}
      />

      {/* Export Code Modal */}
      <ExportCodeModal
        isOpen={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
        widgets={widgets}
      />
    </div>
  );
}

