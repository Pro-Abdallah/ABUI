"use client";

import React from "react";
import ComponentCard from "@/components/gallery/ComponentCard";
import { Sparkles, Flame, Menu, Globe, Mail } from "lucide-react";
import { ControlField } from "@/components/gallery/PreviewModal";

export default function HeadersPage() {
  const headerControls: ControlField[] = [
    {
      name: "brandName",
      label: "Brand Name",
      type: "text",
      defaultValue: "NexusCorp",
    },
    {
      name: "sticky",
      label: "Sticky Navigation",
      type: "boolean",
      defaultValue: false,
    },
    {
      name: "centeredMenu",
      label: "Center Menu Links",
      type: "boolean",
      defaultValue: true,
    },
  ];

  return (
    <div className="space-y-8 select-none">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
          Headers & Navigation
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-3xl leading-relaxed">
          Premium navigation headers to structure your applications. Built with responsiveness, interactive layouts, and dark mode compliance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ComponentCard
          title="Dynamic Enterprise Header"
          description="A rich enterprise header layout with navigation links, inline search, and dark mode action keys."
          tags={["header", "navigation", "navbar"]}
          controls={headerControls}
          renderComponent={(config) => (
            <header
              className={`w-full bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-lg p-4 flex items-center justify-between ${
                config.sticky ? "shadow-md shadow-red-950/20" : "shadow-sm"
              }`}
            >
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-red-500 fill-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
                <span className="font-extrabold text-sm tracking-tight text-foreground">
                  {config.brandName || "NexusCorp"}
                </span>
              </div>

              <nav
                className={`hidden md:flex items-center gap-4 text-xs font-semibold text-slate-500 ${
                  config.centeredMenu ? "mx-auto" : "ml-auto mr-4"
                }`}
              >
                <span className="hover:text-red-500 transition-colors cursor-pointer">Dashboard</span>
                <span className="hover:text-red-500 transition-colors cursor-pointer">Analytics</span>
                <span className="hover:text-red-500 transition-colors cursor-pointer">Security</span>
                <span className="hover:text-red-500 transition-colors cursor-pointer">Pricing</span>
              </nav>

              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 text-xs font-bold bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white rounded shadow-sm cursor-pointer">
                  Console
                </button>
              </div>
            </header>
          )}
          generateCode={(config) => `import React from "react";
import { Flame } from "lucide-react";

export default function Navbar() {
  return (
    <header className="w-full bg-white dark:bg-slate-900 border-b border-slate-250 dark:border-slate-800 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Flame className="w-5 h-5 text-blue-500 fill-blue-500" />
        <span className="font-extrabold text-base text-foreground">${config.brandName || "NexusCorp"}</span>
      </div>
      <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-500">
        <a href="#" className="hover:text-blue-500">Dashboard</a>
        <a href="#" className="hover:text-blue-500">Analytics</a>
        <a href="#" className="hover:text-blue-500">Pricing</a>
      </nav>
      <button className="px-4 py-2 text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
        Get Started
      </button>
    </header>
  );
}`}
        />

        <ComponentCard
          title="Minimalist Utility Header"
          description="Sleek, small height utility nav featuring simple link items and social quick links."
          tags={["minimal", "utility", "top-bar"]}
          controls={headerControls}
          renderComponent={(config) => (
            <header className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-3 flex items-center justify-between text-xs text-slate-400">
              <span className="font-medium flex items-center gap-1.5">
                <Globe size={13} />
                Global Servers Active
              </span>
              <div className="flex items-center gap-4">
                <span className="hover:text-foreground cursor-pointer flex items-center gap-1">
                  <Mail size={12} />
                  Contact Support
                </span>
                <span className="hover:text-foreground cursor-pointer">Help Docs</span>
              </div>
            </header>
          )}
          generateCode={() => `export default function UtilityNav() {
  return (
    <header className="w-full bg-slate-50 dark:bg-slate-950 px-4 py-2 border-b border-slate-200 flex justify-between text-xs text-slate-400">
      <span>Status: All Systems Operational</span>
      <div className="flex gap-4">
        <a href="#" className="hover:text-slate-600">Contact Support</a>
        <a href="#" className="hover:text-slate-600">Help Docs</a>
      </div>
    </header>
  );
}`}
        />
      </div>
    </div>
  );
}
