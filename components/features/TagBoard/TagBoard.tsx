"use client";

import React, { useState, useMemo } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import PersonSearch from "./TagSearchInput";
import ClassCard from "./ClassCard";
import PersonChip, { Person } from "./TagChip";

/* ─── Mock student roster ─────────────────────────────────────────── */
const STUDENTS: Person[] = [
  { id: "s01", name: "Alice Johnson" },
  { id: "s02", name: "Bob Smith" },
  { id: "s03", name: "Carol Williams" },
  { id: "s04", name: "David Brown" },
  { id: "s05", name: "Emma Davis" },
  { id: "s06", name: "Frank Miller" },
  { id: "s07", name: "Grace Wilson" },
  { id: "s08", name: "Henry Moore" },
  { id: "s09", name: "Isabella Taylor" },
  { id: "s10", name: "James Anderson" },
  { id: "s11", name: "Karen Thomas" },
  { id: "s12", name: "Liam Jackson" },
  { id: "s13", name: "Mia White" },
  { id: "s14", name: "Noah Harris" },
  { id: "s15", name: "Olivia Martin" },
  { id: "s16", name: "Peter Thompson" },
  { id: "s17", name: "Quinn Garcia" },
  { id: "s18", name: "Rachel Rodriguez" },
  { id: "s19", name: "Samuel Lewis" },
  { id: "s20", name: "Tara Walker" },
  { id: "s21", name: "Uma Patel" },
  { id: "s22", name: "Victor Chen" },
  { id: "s23", name: "Wendy Kim" },
  { id: "s24", name: "Xander Nguyen" },
];

/* ─── Assignment state: personId → cardId ────────────────────────── */
type Assignment = Record<string, string>;

export interface TagBoardProps {
  cardCount?: number;
  columns?: number;
}

export default function TagBoard({ cardCount = 12, columns = 4 }: TagBoardProps) {
  const [assignment, setAssignment] = useState<Assignment>({});
  const [activePerson, setActivePerson] = useState<Person | null>(null);
  const [multiselectMode, setMultiselectMode] = useState(false);
  const [selectedPersonIds, setSelectedPersonIds] = useState<Set<string>>(new Set());

  /* ── Sensors: enable drag from anywhere on the chip ─── */
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(MouseSensor, { activationConstraint: { distance: 4 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 8 } })
  );

  /* ── Derived: personId → assigned card label ────────── */
  const cards = useMemo(
    () =>
      Array.from({ length: cardCount }, (_, i) => ({
        id: `card-${i + 1}`,
        label: `Class ${i + 1}`,
      })),
    [cardCount]
  );

  const cardLabelMap = useMemo(
    () => Object.fromEntries(cards.map((c) => [c.id, c.label])),
    [cards]
  );

  const personAssignment = useMemo(
    () => assignment,
    [assignment]
  );

  /* ── Multiselect Actions ────────────────────────────── */
  const handleToggleMultiselectMode = () => {
    setMultiselectMode((prev) => {
      const nextMode = !prev;
      if (!nextMode) {
        setSelectedPersonIds(new Set());
      }
      return nextMode;
    });
  };

  const handleToggleSelectPerson = (personId: string) => {
    setSelectedPersonIds((prev) => {
      const next = new Set(prev);
      if (next.has(personId)) {
        next.delete(personId);
      } else {
        next.add(personId);
      }
      return next;
    });
  };

  const handleSelectAllUnassigned = () => {
    const unassignedIds = STUDENTS.filter((p) => !assignment[p.id]).map((p) => p.id);
    setSelectedPersonIds(new Set(unassignedIds));
  };

  const handleClearSelection = () => {
    setSelectedPersonIds(new Set());
  };

  /* ── Drag handlers ──────────────────────────────────── */
  const handleDragStart = (e: DragStartEvent) => {
    const person = e.active.data.current?.person as Person | undefined;
    setActivePerson(person ?? null);
  };

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    setActivePerson(null);

    if (!over) return;

    const person = active.data.current?.person as Person | undefined;
    if (!person) return;

    const targetCardId = over.id as string;

    // Only accept drops onto class cards
    if (!targetCardId.startsWith("card-")) return;

    // If multiselect is enabled and the dragged person is part of the selection:
    if (multiselectMode && selectedPersonIds.has(person.id)) {
      setAssignment((prev) => {
        const next = { ...prev };
        selectedPersonIds.forEach((pid) => {
          next[pid] = targetCardId;
        });
        return next;
      });
      // Clear selection after batch assignment
      setSelectedPersonIds(new Set());
    } else {
      // Single person assign
      setAssignment((prev) => ({
        ...prev,
        [person.id]: targetCardId,
      }));
    }
  };

  const handleRemovePerson = (personId: string) => {
    setAssignment((prev) => {
      const next = { ...prev };
      delete next[personId];
      return next;
    });
    // Remove from selected list if deleted
    setSelectedPersonIds((prev) => {
      if (prev.has(personId)) {
        const next = new Set(prev);
        next.delete(personId);
        return next;
      }
      return prev;
    });
  };

  /* ── Grid column class ──────────────────────────────── */
  const gridClass =
    columns === 1
      ? "grid-cols-1"
      : columns === 2
      ? "grid-cols-1 md:grid-cols-2"
      : columns === 3
      ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-col gap-6">
        {/* Student Search Panel */}
        <PersonSearch
          people={STUDENTS}
          personAssignment={personAssignment}
          cards={cards}
          multiselectMode={multiselectMode}
          onToggleMultiselectMode={handleToggleMultiselectMode}
          selectedPersonIds={selectedPersonIds}
          onToggleSelectPerson={handleToggleSelectPerson}
          onSelectAllUnassigned={handleSelectAllUnassigned}
          onClearSelection={handleClearSelection}
        />

        {/* Class Cards Grid */}
        <div className={`grid ${gridClass} gap-4`}>
          {cards.map((card) => {
            // Collect people assigned to this card
            const assignedPeople = STUDENTS.filter(
              (p) => personAssignment[p.id] === card.id
            );

            return (
              <ClassCard
                key={card.id}
                id={card.id}
                label={card.label}
                people={assignedPeople}
                onRemovePerson={handleRemovePerson}
              />
            );
          })}
        </div>
      </div>

      {/* Floating drag overlay - shows stacked clone if dragging multiselected set */}
      <DragOverlay dropAnimation={{ duration: 180, easing: "ease-out" }}>
        {activePerson && (
          <div className="relative">
            {multiselectMode && selectedPersonIds.has(activePerson.id) && selectedPersonIds.size > 1 ? (
              <div className="relative">
                {/* 3D Stack Effect */}
                <div className="absolute top-1.5 left-1.5 w-full h-full rounded-lg bg-blue-700/50 -z-20 translate-x-2 translate-y-2 ring-1 ring-blue-500/20" />
                <div className="absolute top-1 left-1 w-full h-full rounded-lg bg-blue-600/70 -z-10 translate-x-1 translate-y-1 ring-1 ring-blue-500/20" />
                <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-blue-600 text-white text-xs font-bold shadow-2xl ring-2 ring-blue-400/60 cursor-grabbing select-none scale-105">
                  <span className="shrink-0 w-4 h-4 bg-white/20 rounded-full flex items-center justify-center text-[10px]">
                    {selectedPersonIds.size}
                  </span>
                  <span>Dragging Roster</span>
                </div>
              </div>
            ) : (
              <PersonChip person={activePerson} overlay />
            )}
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
