"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CodeExporterProps {
  code: string;
  language?: string;
  title?: string;
}

export default function CodeExporter({
  code,
  language = "jsx",
  title = "Component Code",
}: CodeExporterProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <div className="flex flex-col rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-900 overflow-hidden shadow-xl text-sm font-mono max-w-full">
      {/* Exporter Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950 border-b border-slate-800 text-slate-400 select-none">
        <span className="text-xs font-semibold tracking-wider uppercase text-slate-500">
          {language} • {title}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:text-white transition-all text-xs focus:ring-2 focus:ring-blue-500/50 outline-none active:scale-95"
          title="Copy Code"
        >
          {copied ? (
            <>
              <Check size={13} className="text-green-400" />
              <span className="text-green-400 font-medium">Copied!</span>
            </>
          ) : (
            <>
              <Copy size={13} />
              <span>Copy Code</span>
            </>
          )}
        </button>
      </div>

      {/* Code Text Area */}
      <div className="relative p-4 overflow-x-auto max-h-[450px] overflow-y-auto custom-scrollbar">
        <pre className="text-slate-300 whitespace-pre text-left leading-relaxed">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
