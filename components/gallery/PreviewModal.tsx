"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sliders, Code as CodeIcon, Eye } from "lucide-react";
import CodeExporter from "@/components/shared/CodeExporter";

export interface ControlField {
  name: string;
  label: string;
  type: "text" | "number" | "select" | "color" | "boolean" | "slider";
  defaultValue: any;
  options?: { label: string; value: any }[];
  min?: number;
  max?: number;
  step?: number;
}

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  controls: ControlField[];
  renderComponent: (config: Record<string, any>) => React.ReactNode;
  generateCode: (config: Record<string, any>) => string;
}

export default function PreviewModal({
  isOpen,
  onClose,
  title,
  description,
  controls,
  renderComponent,
  generateCode,
}: PreviewModalProps) {
  const [config, setConfig] = useState<Record<string, any>>({});
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

  useEffect(() => {
    // Initialize config with default values
    const initialConfig: Record<string, any> = {};
    controls.forEach((c) => {
      initialConfig[c.name] = c.defaultValue;
    });
    setConfig(initialConfig);
  }, [controls]);

  if (!isOpen) return null;

  const handleControlChange = (name: string, value: any) => {
    setConfig((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6 bg-black/60 backdrop-blur-sm overflow-hidden">
        {/* Backdrop close button */}
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          className="relative w-full h-full md:h-[90vh] md:max-w-6xl md:rounded-xl bg-background border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden z-10"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-foreground">{title}</h2>
              {description && (
                <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-muted-foreground hover:text-foreground transition-all cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Subheader / Tabs for Preview Panel */}
          <div className="flex border-b border-slate-200 dark:border-slate-800 md:hidden bg-slate-100/50 dark:bg-slate-950/20">
            <button
              onClick={() => setActiveTab("preview")}
              className={`flex-1 py-3 text-sm font-semibold border-b-2 flex items-center justify-center gap-2 ${
                activeTab === "preview"
                  ? "border-red-500 text-red-600 dark:text-red-400"
                  : "border-transparent text-muted-foreground"
              }`}
            >
              <Eye size={16} />
              <span>Preview</span>
            </button>
            <button
              onClick={() => setActiveTab("code")}
              className={`flex-1 py-3 text-sm font-semibold border-b-2 flex items-center justify-center gap-2 ${
                activeTab === "code"
                  ? "border-red-500 text-red-600 dark:text-red-400"
                  : "border-transparent text-muted-foreground"
              }`}
            >
              <CodeIcon size={16} />
              <span>Get Code</span>
            </button>
          </div>

          {/* Main workspace */}
          <div className="flex-1 flex overflow-hidden flex-col md:flex-row">
            {/* Left/Main content workspace */}
            <div
              className={`flex-1 flex flex-col p-6 overflow-y-auto bg-slate-100 dark:bg-slate-950/40 relative ${
                activeTab === "preview" ? "flex" : "hidden md:flex"
              }`}
            >
              {/* Desktop workspace controls */}
              <div className="hidden md:flex items-center justify-between mb-4 bg-background px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm shrink-0">
                <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <Eye size={14} className="text-red-500" />
                  Live Preview Container (Dynamic Theme Responsive)
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveTab("preview")}
                    className={`px-3 py-1 text-xs font-semibold rounded ${
                      activeTab === "preview"
                        ? "bg-slate-100 dark:bg-slate-800 text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Interactive
                  </button>
                  <button
                    onClick={() => setActiveTab("code")}
                    className={`px-3 py-1 text-xs font-semibold rounded ${
                      activeTab === "code"
                        ? "bg-slate-100 dark:bg-slate-800 text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    View Code
                  </button>
                </div>
              </div>

              {/* Render area */}
              {activeTab === "preview" ? (
                <div className="flex-1 flex items-center justify-center rounded-xl border border-dashed border-slate-300 dark:border-slate-800 bg-background overflow-hidden relative shadow-sm min-h-[300px] p-2 md:p-6">
                  <div className="w-full h-full max-w-full">
                    {renderComponent(config)}
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col justify-center max-w-full">
                  <CodeExporter code={generateCode(config)} title={title} />
                </div>
              )}
            </div>

            {/* Sidebar customization panel */}
            <div
              className={`w-full md:w-80 border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-800 flex flex-col bg-background shrink-0 ${
                activeTab === "preview" ? "flex" : "hidden md:flex"
              }`}
            >
              <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex items-center gap-2 select-none shrink-0">
                <Sliders size={16} className="text-red-500" />
                <span className="text-sm font-bold tracking-tight text-foreground">Customization Panel</span>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-5 custom-scrollbar">
                {controls.map((ctrl) => {
                  const val = config[ctrl.name] !== undefined ? config[ctrl.name] : ctrl.defaultValue;

                  return (
                    <div key={ctrl.name} className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <label className="text-muted-foreground" htmlFor={ctrl.name}>
                          {ctrl.label}
                        </label>
                        {ctrl.type === "slider" && (
                          <span className="text-red-500 font-mono">{val}</span>
                        )}
                      </div>

                      {ctrl.type === "text" && (
                        <input
                          id={ctrl.name}
                          type="text"
                          value={val}
                          onChange={(e) => handleControlChange(ctrl.name, e.target.value)}
                          className="px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-red-500/50 focus:border-red-500 outline-none text-foreground"
                        />
                      )}

                      {ctrl.type === "number" && (
                        <input
                          id={ctrl.name}
                          type="number"
                          value={val}
                          onChange={(e) => handleControlChange(ctrl.name, parseFloat(e.target.value))}
                          className="px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-red-500/50 focus:border-red-500 outline-none text-foreground"
                        />
                      )}

                      {ctrl.type === "select" && (
                        <select
                          id={ctrl.name}
                          value={val}
                          onChange={(e) => handleControlChange(ctrl.name, e.target.value)}
                          className="px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-red-500/50 focus:border-red-500 outline-none text-foreground"
                        >
                          {ctrl.options?.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      )}

                      {ctrl.type === "slider" && (
                        <input
                          id={ctrl.name}
                          type="range"
                          min={ctrl.min ?? 0}
                          max={ctrl.max ?? 100}
                          step={ctrl.step ?? 1}
                          value={val}
                          onChange={(e) => handleControlChange(ctrl.name, parseFloat(e.target.value))}
                          className="w-full accent-red-500 cursor-pointer"
                        />
                      )}

                      {ctrl.type === "color" && (
                        <div className="flex items-center gap-2">
                          <input
                            id={ctrl.name}
                            type="color"
                            value={val}
                            onChange={(e) => handleControlChange(ctrl.name, e.target.value)}
                            className="w-10 h-8 rounded border border-slate-200 dark:border-slate-800 bg-transparent cursor-pointer p-0"
                          />
                          <input
                            type="text"
                            value={val}
                            onChange={(e) => handleControlChange(ctrl.name, e.target.value)}
                            className="flex-1 px-3 py-1.5 text-xs font-mono rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-foreground"
                          />
                        </div>
                      )}

                      {ctrl.type === "boolean" && (
                        <label className="relative inline-flex items-center cursor-pointer select-none py-1">
                          <input
                            id={ctrl.name}
                            type="checkbox"
                            checked={!!val}
                            onChange={(e) => handleControlChange(ctrl.name, e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-slate-200 dark:bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[6px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                          <span className="ml-3 text-xs font-semibold text-muted-foreground">
                            {val ? "Enabled" : "Disabled"}
                          </span>
                        </label>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Get Code Export Button */}
              <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex gap-2">
                <button
                  onClick={() => setActiveTab(activeTab === "code" ? "preview" : "code")}
                  className={`flex-1 py-2.5 px-4 rounded-lg font-bold transition-all shadow-sm active:scale-95 flex items-center justify-center gap-2 text-sm cursor-pointer ${
                    activeTab === "code"
                      ? "bg-slate-200 dark:bg-slate-800 text-foreground"
                      : "bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-md shadow-red-600/25"
                  }`}
                >
                  {activeTab === "code" ? (
                    <>
                      <Eye size={16} />
                      <span>Back to Preview</span>
                    </>
                  ) : (
                    <>
                      <CodeIcon size={16} />
                      <span>Get Export Code</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
