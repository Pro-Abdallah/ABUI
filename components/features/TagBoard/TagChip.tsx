"use client";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { X, UserCircle2 } from "lucide-react";

export interface Person {
  id: string;
  name: string;
}

interface PersonChipProps {
  person: Person;
  inCard?: boolean;
  assignedToLabel?: string; // shown in search when already assigned
  onRemove?: () => void;
  overlay?: boolean; // floating DragOverlay clone
  sourceId?: string; // unique id for dnd
  multiselectMode?: boolean;
  selected?: boolean;
  onToggleSelect?: () => void;
}

export default function PersonChip({
  person,
  inCard = false,
  assignedToLabel,
  onRemove,
  overlay = false,
  sourceId,
  multiselectMode = false,
  selected = false,
  onToggleSelect,
}: PersonChipProps) {
  const draggableId = sourceId ?? `person-${person.id}`;

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: draggableId,
    data: { person },
    disabled: overlay,
  });

  const style = transform ? { transform: CSS.Translate.toString(transform) } : undefined;

  /* ── Floating drag clone ─────────────────────────── */
  if (overlay) {
    return (
      <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-blue-600 text-white text-xs font-bold shadow-2xl shadow-blue-500/40 scale-105 cursor-grabbing ring-2 ring-blue-400/60 pointer-events-none select-none">
        <UserCircle2 size={13} className="shrink-0 opacity-80" />
        <span>{person.name}</span>
      </div>
    );
  }

  /* ── In-card chip ────────────────────────────────── */
  if (inCard) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold select-none border transition-all duration-150 cursor-grab active:cursor-grabbing group ${
          isDragging
            ? "opacity-20 scale-90"
            : "bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-350 hover:bg-slate-100 dark:bg-slate-900/60 dark:text-slate-300 dark:border-slate-800 dark:hover:border-slate-700"
        }`}
      >
        <UserCircle2 size={12} className="shrink-0 opacity-60 text-slate-500" />
        <span className="leading-none">{person.name}</span>
        {onRemove && (
          <button
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="ml-1 w-4 h-4 flex items-center justify-center rounded border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-500 transition-opacity duration-150 cursor-pointer shrink-0 opacity-0 group-hover:opacity-100"
          >
            <X size={9} strokeWidth={2.5} />
          </button>
        )}
      </div>
    );
  }

  /* ── Search-panel chip (unassigned or assigned) ──── */
  const isAssigned = !!assignedToLabel;
  const compactLabel = assignedToLabel ? assignedToLabel.replace(/Class\s+/i, "C") : "";
  const showCheckbox = multiselectMode && !inCard;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={(e) => {
        if (multiselectMode && onToggleSelect) {
          e.preventDefault();
          e.stopPropagation();
          onToggleSelect();
        }
      }}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold select-none border transition-all duration-150 cursor-grab active:cursor-grabbing ${
        isDragging
          ? "opacity-20 scale-90"
          : selected
          ? "bg-slate-100 text-slate-800 border-slate-400 dark:bg-slate-800/80 dark:text-slate-200 dark:border-slate-600 ring-2 ring-slate-400/10"
          : isAssigned
          ? "bg-amber-50/65 text-amber-800 border-amber-200 hover:border-amber-350 dark:bg-amber-950/20 dark:text-amber-300 dark:border-amber-900/60 dark:hover:border-amber-800"
          : "bg-white text-slate-700 border-slate-200 hover:border-slate-350 hover:bg-slate-50 dark:bg-slate-800/70 dark:text-slate-300 dark:border-slate-700 dark:hover:border-slate-600 dark:hover:bg-slate-850"
      }`}
    >
      {showCheckbox && (
        <span
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            if (onToggleSelect) onToggleSelect();
          }}
          className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-all cursor-pointer ${
            selected
              ? "bg-blue-600 border-blue-600 text-white"
              : "border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900"
          }`}
        >
          {selected && (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4.5" className="w-2.5 h-2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </span>
      )}
      {!showCheckbox && (
        <UserCircle2 size={12} className={`shrink-0 ${isAssigned ? "text-amber-500" : "text-slate-400 dark:text-slate-500"}`} />
      )}
      <span className="leading-none">{person.name}</span>
      {isAssigned && (
        <span className="px-1 py-0.5 rounded text-[9px] font-black bg-amber-100/80 text-amber-700 dark:bg-amber-900/60 dark:text-amber-300 leading-none shrink-0 whitespace-nowrap border border-amber-200 dark:border-amber-800/40">
          {compactLabel}
        </span>
      )}
    </div>
  );
}
