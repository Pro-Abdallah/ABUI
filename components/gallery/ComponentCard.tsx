"use client";

import { useState } from "react";
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
        className="group relative flex flex-col rounded-xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-5 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-lg transition-all duration-300 cursor-pointer select-none overflow-hidden"
      >
        {/* Subtle hover background glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Thumbnail Preview Area */}
        <div className="w-full h-36 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-900 flex items-center justify-center overflow-hidden mb-4 relative shadow-inner">
          <div className="scale-75 opacity-70 group-hover:scale-80 group-hover:opacity-90 transition-transform duration-300 pointer-events-none w-full h-full flex items-center justify-center">
            {/* Render with default control configurations */}
            {renderComponent(
              controls.reduce((acc, curr) => {
                acc[curr.name] = curr.defaultValue;
                return acc;
              }, {} as Record<string, any>)
            )}
          </div>
          <div className="absolute top-2 right-2 p-1.5 rounded-md bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <ArrowUpRight size={14} className="text-blue-500" />
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-foreground tracking-tight group-hover:text-blue-500 transition-colors">
              {title}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-4">
              {tags.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700/50"
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
