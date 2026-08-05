"use client";

import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import PreviewModal, { ControlField } from "./PreviewModal";

interface ComponentCardProps {
  title: string;
  description: string;
  tags?: string[];
  controls: ControlField[];
  renderComponent: (config: Record<string, any>) => React.ReactNode;
  generateCode: (config: Record<string, any>) => string;
}

export default function ComponentCard({
  title,
  description,
  tags = [],
  controls,
  renderComponent,
  generateCode,
}: ComponentCardProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setModalOpen(true)}
        className="group relative flex flex-col rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 p-5 hover:border-red-500/60 dark:hover:border-red-500/60 hover:shadow-xl hover:shadow-red-950/20 transition-all duration-300 cursor-pointer select-none overflow-hidden"
      >
        {/* Subtle hover background glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/5 via-rose-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Thumbnail Preview Area */}
        <div className="w-full h-36 rounded-lg bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-100 dark:border-zinc-800 flex items-center justify-center overflow-hidden mb-4 relative shadow-inner">
          <div className="scale-75 opacity-70 group-hover:scale-80 group-hover:opacity-90 transition-transform duration-300 pointer-events-none w-full h-full flex items-center justify-center">
            {/* Render with default control configurations */}
            {renderComponent(
              controls.reduce((acc, curr) => {
                acc[curr.name] = curr.defaultValue;
                return acc;
              }, {} as Record<string, any>)
            )}
          </div>
          <div className="absolute top-2 right-2 p-1.5 rounded-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <ArrowUpRight size={14} className="text-red-500" />
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-foreground tracking-tight group-hover:text-red-500 transition-colors">
              {title}
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-4">
              {tags.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase rounded-md bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 border border-zinc-200/60 dark:border-zinc-800"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <PreviewModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={title}
        description={description}
        controls={controls}
        renderComponent={renderComponent}
        generateCode={generateCode}
      />
    </>
  );
}
