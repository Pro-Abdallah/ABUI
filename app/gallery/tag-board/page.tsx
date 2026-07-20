"use client";

import React from "react";
import ComponentCard from "@/components/gallery/ComponentCard";
import TagBoard from "@/components/features/TagBoard/TagBoard";
import { generateTagBoardCode } from "@/lib/codeTemplates";
import { ControlField } from "@/components/gallery/PreviewModal";

export default function TagBoardPage() {
  const controls: ControlField[] = [
    {
      name: "cardCount",
      label: "Number of Classes",
      type: "slider",
      defaultValue: 12,
      min: 4,
      max: 24,
      step: 1,
    },
    {
      name: "columns",
      label: "Grid Columns",
      type: "select",
      defaultValue: 4,
      options: [
        { label: "2 Columns", value: 2 },
        { label: "3 Columns", value: 3 },
        { label: "4 Columns", value: 4 },
      ],
    },
  ];

  return (
    <div className="space-y-8 select-none">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
          Student Class Assignment
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-3xl leading-relaxed">
          Search for students by name, then <strong>drag and drop</strong> them into any class card. Already-assigned students stay visible in search with their class highlighted — drag them again to reassign.
        </p>
      </div>

      {/* Variant cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ComponentCard
          title="Standard Class Board (12 Classes)"
          description="Full roster view with 12 classes. Search filters both assigned and unassigned students — drop to assign, × to remove."
          tags={["@dnd-kit", "drag-drop", "assignment"]}
          controls={controls}
          renderComponent={(config) => (
            <div className="w-full max-h-[320px] overflow-y-auto p-2 rounded-lg custom-scrollbar">
              <TagBoard
                cardCount={Number(config.cardCount ?? 12)}
                columns={Number(config.columns ?? 4)}
              />
            </div>
          )}
          generateCode={generateTagBoardCode}
        />

        <ComponentCard
          title="Compact Class Board (6 Classes)"
          description="Smaller board for quick section assignments. 3-column layout with the same search and drag mechanics."
          tags={["compact", "3-column", "reassign"]}
          controls={[
            { ...controls[0], defaultValue: 6 },
            { ...controls[1], defaultValue: 3 },
          ]}
          renderComponent={(config) => (
            <div className="w-full max-h-[320px] overflow-y-auto p-2 rounded-lg custom-scrollbar">
              <TagBoard
                cardCount={Number(config.cardCount ?? 6)}
                columns={3}
              />
            </div>
          )}
          generateCode={(config) =>
            generateTagBoardCode({ ...config, cardCount: 6, columns: 3 })
          }
        />
      </div>

      {/* Live sandbox */}
      <div className="pt-8 border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-xl font-bold text-foreground mb-1">Live Sandbox</h2>
        <p className="text-xs text-slate-400 mb-5">
          Drag students from the search panel above into any class card. Drag again to reassign.
        </p>
        <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40">
          <TagBoard cardCount={12} columns={4} />
        </div>
      </div>
    </div>
  );
}
