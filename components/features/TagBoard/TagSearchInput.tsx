"use client";

import React, { useState, useMemo } from "react";
import { Search, Users, CheckCircle2, Circle } from "lucide-react";
import PersonChip, { Person } from "./TagChip";

interface PersonSearchProps {
  people: Person[];
  /** personId → cardId */
  personAssignment: Record<string, string>;
  cards: { id: string; label: string }[];
  multiselectMode: boolean;
  onToggleMultiselectMode: () => void;
  selectedPersonIds: Set<string>;
  onToggleSelectPerson: (personId: string) => void;
  onSelectAllUnassigned: () => void;
  onClearSelection: () => void;
}

export default function PersonSearch({
  people,
  personAssignment,
  cards,
  multiselectMode,
  onToggleMultiselectMode,
  selectedPersonIds,
  onToggleSelectPerson,
  onSelectAllUnassigned,
  onClearSelection,
}: PersonSearchProps) {
  const [search, setSearch] = useState("");

  const cardLabelMap = useMemo(
    () => Object.fromEntries(cards.map((c) => [c.id, c.label])),
    [cards]
  );

  const filtered = useMemo(
    () =>
      search.trim()
        ? people.filter((p) =>
            p.name.toLowerCase().includes(search.toLowerCase())
          )
        : people,
    [people, search]
  );

  const unassigned = filtered.filter((p) => !personAssignment[p.id]);
  const assigned = filtered.filter((p) => !!personAssignment[p.id]);

  const totalAssigned = people.filter((p) => personAssignment[p.id]).length;
  const pct = Math.round((totalAssigned / people.length) * 100);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800/80 gap-3">
        <div className="flex items-center gap-2">
          <Users size={15} className="text-blue-500" />
          <span className="text-sm font-bold text-foreground">Students</span>
        </div>

        <div className="flex flex-wrap items-center gap-3.5">
          {/* Enable Multiselect Toggle */}
          <button
            onClick={onToggleMultiselectMode}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 border cursor-pointer select-none ${
              multiselectMode
                ? "bg-blue-600 border-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-500/20"
                : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-350 dark:hover:border-slate-650 hover:bg-slate-50 dark:hover:bg-slate-850"
            }`}
          >
            <span className="relative flex h-2 w-2">
              {multiselectMode && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-300 opacity-75"></span>
              )}
              <span className={`relative inline-flex rounded-full h-2 w-2 ${multiselectMode ? "bg-white" : "bg-slate-400 dark:bg-slate-500"}`}></span>
            </span>
            <span>{multiselectMode ? "Disable Multiselect" : "Enable Multiselect"}</span>
          </button>

          {/* Assignment progress bar */}
          <div className="flex items-center gap-2">
            <div className="w-24 h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="text-[10px] font-bold text-slate-400 tabular-nums">
              {totalAssigned}/{people.length}
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Multiselect Toolbar */}
        {multiselectMode && (
          <div className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40">
            <span className="text-xs font-semibold text-blue-700 dark:text-blue-300">
              {selectedPersonIds.size} student{selectedPersonIds.size === 1 ? "" : "s"} selected
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={onSelectAllUnassigned}
                className="px-2.5 py-1 rounded text-[11px] font-bold bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-950/50 cursor-pointer transition-colors"
              >
                Select All Unassigned
              </button>
              {selectedPersonIds.size > 0 && (
                <button
                  onClick={onClearSelection}
                  className="px-2.5 py-1 rounded text-[11px] font-bold bg-white dark:bg-slate-800 text-slate-650 dark:text-slate-350 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 cursor-pointer transition-colors"
                >
                  Clear Selection
                </button>
              )}
            </div>
          </div>
        )}

        {/* Search Input */}
        <div className="relative">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search students by name…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-10 py-2.5 text-sm rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 outline-none text-foreground placeholder:text-slate-400"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-foreground transition-colors cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <p className="text-xs text-slate-400 italic text-center py-4">
            No students matching &ldquo;{search}&rdquo;
          </p>
        ) : (
          <div className="space-y-3">
            {/* Unassigned section */}
            {unassigned.length > 0 && (
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <Circle size={11} className="text-slate-400" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Unassigned · {unassigned.length}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {unassigned.map((p) => (
                    <PersonChip
                      key={p.id}
                      person={p}
                      sourceId={`search-${p.id}`}
                      multiselectMode={multiselectMode}
                      selected={selectedPersonIds.has(p.id)}
                      onToggleSelect={() => onToggleSelectPerson(p.id)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Assigned section */}
            {assigned.length > 0 && (
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <CheckCircle2 size={11} className="text-amber-500" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500/80 dark:text-amber-400/70">
                    Assigned · {assigned.length}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {assigned.map((p) => (
                    <PersonChip
                      key={p.id}
                      person={p}
                      assignedToLabel={cardLabelMap[personAssignment[p.id]]}
                      sourceId={`search-${p.id}`}
                      multiselectMode={multiselectMode}
                      selected={selectedPersonIds.has(p.id)}
                      onToggleSelect={() => onToggleSelectPerson(p.id)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
