"use client";

import { useDroppable } from "@dnd-kit/core";
import { Users } from "lucide-react";
import PersonChip, { Person } from "./TagChip";

interface ClassCardProps {
  id: string;
  label: string; // "Class 1"
  people: Person[];
  onRemovePerson: (personId: string) => void;
}

export default function ClassCard({
  id,
  label,
  people,
  onRemovePerson,
}: ClassCardProps) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`relative flex flex-col rounded-xl border min-h-[170px] transition-all duration-200 overflow-hidden ${
        isOver
          ? "border-blue-500 shadow-lg shadow-blue-500/15 ring-2 ring-blue-500/20 scale-[1.02]"
          : "border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm"
      }`}
    >
      {/* Card Header */}
      <div
        className={`flex items-center justify-between px-4 py-3 border-b transition-all duration-200 shrink-0 ${
          isOver
            ? "bg-blue-600 border-blue-500"
            : "bg-slate-50 dark:bg-slate-900/80 border-slate-100 dark:border-slate-800/60"
        }`}
      >
        <div className="flex items-center gap-2">
          <Users
            size={13}
            className={isOver ? "text-blue-100" : "text-slate-400"}
          />
          <span
            className={`text-xs font-extrabold tracking-tight leading-none ${
              isOver ? "text-white" : "text-foreground"
            }`}
          >
            {label}
          </span>
        </div>

        <span
          className={`text-[10px] font-bold px-2 py-0.5 rounded-full leading-none ${
            isOver
              ? "bg-white/20 text-white"
              : people.length > 0
              ? "bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400"
              : "bg-slate-100 dark:bg-slate-800 text-slate-400"
          }`}
        >
          {people.length}
        </span>
      </div>

      {/* Drop Body */}
      <div
        className={`flex-1 p-3 transition-all duration-200 ${
          isOver
            ? "bg-blue-50/40 dark:bg-blue-950/15"
            : "bg-white dark:bg-slate-900/50"
        }`}
      >
        {people.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {people.map((person) => (
              <PersonChip
                key={person.id}
                person={person}
                inCard
                sourceId={`card-${id}-${person.id}`}
                onRemove={() => onRemovePerson(person.id)}
              />
            ))}
          </div>
        ) : (
          <div
            className={`h-full min-h-[80px] flex flex-col items-center justify-center rounded-lg border border-dashed gap-1.5 transition-all duration-200 ${
              isOver
                ? "border-blue-400 bg-blue-50/60 dark:bg-blue-950/25 dark:border-blue-700"
                : "border-slate-200 dark:border-slate-800"
            }`}
          >
            <Users
              size={16}
              className={
                isOver
                  ? "text-blue-400"
                  : "text-slate-300 dark:text-slate-700"
              }
            />
            <span
              className={`text-[10px] font-semibold uppercase tracking-wider ${
                isOver
                  ? "text-blue-500 dark:text-blue-400"
                  : "text-slate-300 dark:text-slate-700"
              }`}
            >
              {isOver ? "Drop to assign" : "Drop students here"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
