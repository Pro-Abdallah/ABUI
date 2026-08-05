"use client";

import React, { useState } from "react";
import { Widget } from "./types";
import { generateDashboardCode } from "./codeGenerator";
import { X, Copy, Check, Download, Code, FileJson, Sparkles } from "lucide-react";

interface ExportCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  widgets: Widget[];
}

export const ExportCodeModal: React.FC<ExportCodeModalProps> = ({
  isOpen,
  onClose,
  widgets,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<"react" | "json">("react");
  const [copied, setCopied] = useState(false);

  const reactCode = generateDashboardCode(widgets);
  const jsonCode = JSON.stringify(widgets, null, 2);

  const currentCode = activeTab === "react" ? reactCode : jsonCode;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const filename = activeTab === "react" ? "CustomDashboard.tsx" : "dashboard-config.json";
    const mime = activeTab === "react" ? "text/typescript" : "application/json";
    const blob = new Blob([currentCode], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 sm:p-6 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Code size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-tight">Export Dashboard Code</h2>
              <p className="text-xs text-slate-400">
                Copy or download standalone production code for your customized layout
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Toolbar (Tabs & Action Buttons) */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-slate-800/80 bg-slate-950/40">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("react")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeTab === "react"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Code size={14} /> React (TSX)
            </button>
            <button
              onClick={() => setActiveTab("json")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeTab === "json"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <FileJson size={14} /> Config JSON
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border border-slate-700 bg-slate-800 text-slate-200 hover:text-white hover:bg-slate-700 transition cursor-pointer"
            >
              <Download size={14} /> Download
            </button>
            <button
              onClick={handleCopy}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                copied
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20"
                  : "bg-blue-600 text-white hover:bg-blue-500 shadow-md shadow-blue-500/20"
              }`}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? "Copied!" : "Copy Code"}
            </button>
          </div>
        </div>

        {/* Code Output Viewer */}
        <div className="p-6 flex-1 overflow-y-auto bg-slate-950 custom-scrollbar">
          <pre className="font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
            <code>{currentCode}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
