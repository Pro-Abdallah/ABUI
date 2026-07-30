"use client";

import React from "react";
import ComponentCard from "@/components/gallery/ComponentCard";
import DesignSidebar from "@/components/features/DesignSidebar/DesignSidebar";
import { generateDesignSidebarCode } from "@/lib/codeTemplates";
import { ControlField } from "@/components/gallery/PreviewModal";

/* ─── Shared controls ─────────────────────────────────────────────── */
const sharedControls: ControlField[] = [
  {
    name: "variant",
    label: "Visual Style",
    type: "select",
    defaultValue: "default",
    options: [
      { label: "Default (bordered)",  value: "default"  },
      { label: "Floating (card)",     value: "floating" },
      { label: "Minimal (no bg)",     value: "minimal"  },
      { label: "Glassmorphism",       value: "glass"    },
      { label: "Dark (solid)",        value: "dark"     },
      { label: "Inset (subtle fill)", value: "inset"    },
    ],
  },
  {
    name: "accent",
    label: "Accent Color",
    type: "select",
    defaultValue: "blue",
    options: [
      { label: "Blue",    value: "blue"    },
      { label: "Violet",  value: "violet"  },
      { label: "Rose",    value: "rose"    },
      { label: "Emerald", value: "emerald" },
      { label: "Amber",   value: "amber"   },
    ],
  },
  {
    name: "activeIndicator",
    label: "Active Indicator Style",
    type: "select",
    defaultValue: "pill",
    options: [
      { label: "Pill (filled)",      value: "pill"       },
      { label: "Left Bar",           value: "bar-left"   },
      { label: "Ghost (soft fill)",  value: "ghost"      },
    ],
  },
  {
    name: "defaultCollapsed",
    label: "Start Collapsed",
    type: "boolean",
    defaultValue: false,
  },
  {
    name: "showSearch",
    label: "Show Search Bar",
    type: "boolean",
    defaultValue: true,
  },
  {
    name: "showUser",
    label: "Show User Footer",
    type: "boolean",
    defaultValue: true,
  },
  {
    name: "showNotificationDot",
    label: "Notification Dot (collapsed)",
    type: "boolean",
    defaultValue: true,
  },
];

/* helper to render a sidebar card preview */
function SidebarPreview({
  config,
  bg = "",
  overrides = {},
}: {
  config: Record<string, any>;
  bg?: string;
  overrides?: Record<string, any>;
}) {
  const merged = { ...config, ...overrides };
  return (
    <div className={`w-full h-[280px] rounded-xl overflow-hidden flex ${bg}`}>
      <DesignSidebar
        variant={merged.variant}
        accent={merged.accent}
        activeIndicator={merged.activeIndicator}
        defaultCollapsed={!!merged.defaultCollapsed}
        showSearch={!!merged.showSearch}
        showUser={!!merged.showUser}
        showNotificationDot={!!merged.showNotificationDot}
      />
      <div className="flex-1 p-4 flex flex-col justify-center gap-1.5">
        <p className={`text-xs font-bold ${merged.variant === "glass" || merged.variant === "dark" ? "text-white/80" : "text-foreground"}`}>
          Content Area
        </p>
        <p className={`text-[10px] ${merged.variant === "glass" || merged.variant === "dark" ? "text-white/40" : "text-slate-400"}`}>
          Click nav items · try the chevron · expand sub-menus
        </p>
      </div>
    </div>
  );
}

/* ─── Page ────────────────────────────────────────────────────────── */
export default function SidebarsPage() {
  return (
    <div className="space-y-8 select-none">

      {/* ── Title ──────────────────────────────────── */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
          Design Sidebars
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-3xl leading-relaxed">
          Animated navigation sidebars with spring-physics collapse, expandable sub-menus, live search,
          icon tooltips, notification badges, Pro upgrade banner, and a user footer.
          Six visual styles · five accent colours · three active indicator modes.
          Powered by <strong>Framer Motion</strong>. Configure and copy the TypeScript component.
        </p>
      </div>

      {/* ── Feature chips ──────────────────────────── */}
      <div className="flex flex-wrap gap-2">
        {[
          "Spring collapse","Sub-menus","Icon tooltips","Live search",
          "Notification badges","Active indicator variants","Dark variant",
          "Glassmorphism","Floating card","Upgrade banner","User footer","Mobile drawer",
        ].map((f) => (
          <span key={f} className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200/50 dark:border-slate-700/50">
            {f}
          </span>
        ))}
      </div>

      {/* ── Cards row 1 ────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* 1. Default bordered — fully configurable */}
        <ComponentCard
          title="Bordered Sidebar"
          description="Classic left-rail with spring-animated collapse, grouped nav sections, expandable sub-menus, live search, badges, upgrade banner, and user footer."
          tags={["framer-motion", "spring", "sub-menu", "typescript"]}
          controls={sharedControls}
          renderComponent={(config) => (
            <SidebarPreview config={config}
              bg="border border-slate-200 dark:border-slate-800" />
          )}
          generateCode={generateDesignSidebarCode}
        />

        {/* 2. Dark solid */}
        <ComponentCard
          title="Dark Solid Sidebar"
          description="Slate-950 background with white/alpha text — perfect for dark-first dashboards. All animations and sub-menus included."
          tags={["dark", "solid", "slate-950", "typescript"]}
          controls={[
            { ...sharedControls[0], defaultValue: "dark" },
            ...sharedControls.slice(1),
          ]}
          renderComponent={(config) => (
            <SidebarPreview config={config} overrides={{ variant: "dark" }}
              bg="bg-slate-950" />
          )}
          generateCode={(cfg) => generateDesignSidebarCode({ ...cfg, variant: "dark" })}
        />

        {/* 3. Floating card */}
        <ComponentCard
          title="Floating Card Sidebar"
          description="Detached floating panel with rounded corners and drop shadow. Margin gives it a card-in-page feel. All features preserved."
          tags={["floating", "card", "rounded", "typescript"]}
          controls={[
            { ...sharedControls[0], defaultValue: "floating" },
            ...sharedControls.slice(1),
          ]}
          renderComponent={(config) => (
            <div className="w-full h-[280px] rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-950 flex items-stretch">
              <div className="flex items-stretch">
                <DesignSidebar
                  variant="floating"
                  accent={config.accent}
                  activeIndicator={config.activeIndicator}
                  defaultCollapsed={!!config.defaultCollapsed}
                  showSearch={!!config.showSearch}
                  showUser={!!config.showUser}
                  showNotificationDot={!!config.showNotificationDot}
                />
              </div>
              <div className="flex-1 p-4 flex flex-col justify-center gap-1.5">
                <p className="text-xs font-bold text-foreground">Content Area</p>
                <p className="text-[10px] text-slate-400">Floating panel with rounded corners.</p>
              </div>
            </div>
          )}
          generateCode={(cfg) => generateDesignSidebarCode({ ...cfg, variant: "floating" })}
        />

        {/* 4. Glassmorphism */}
        <ComponentCard
          title="Glassmorphism Sidebar"
          description="Frosted-glass panel over a dark gradient. backdrop-blur-xl with white/10 background. Icon tooltips and collapse all work."
          tags={["glass", "backdrop-blur", "translucent", "typescript"]}
          controls={[
            { ...sharedControls[0], defaultValue: "glass" },
            ...sharedControls.slice(1),
          ]}
          renderComponent={(config) => (
            <div className="w-full h-[280px] rounded-xl overflow-hidden flex"
              style={{ background: "linear-gradient(135deg,#0f172a 0%,#1e1b4b 50%,#0f172a 100%)" }}>
              <DesignSidebar
                variant="glass"
                accent={config.accent}
                activeIndicator={config.activeIndicator}
                defaultCollapsed={!!config.defaultCollapsed}
                showSearch={!!config.showSearch}
                showUser={!!config.showUser}
                showNotificationDot={!!config.showNotificationDot}
              />
              <div className="flex-1 p-4 flex flex-col justify-center gap-1.5">
                <p className="text-xs font-bold text-white/80">Content Area</p>
                <p className="text-[10px] text-white/40">Glassmorphism over gradient bg.</p>
              </div>
            </div>
          )}
          generateCode={(cfg) => generateDesignSidebarCode({ ...cfg, variant: "glass" })}
        />

        {/* 5. Inset subtle */}
        <ComponentCard
          title="Inset Sidebar"
          description="Subtle inset background (slate-100 / slate-800) — softer than bordered. Great for apps where the sidebar should feel embedded, not distinct."
          tags={["inset", "subtle", "embedded", "typescript"]}
          controls={[
            { ...sharedControls[0], defaultValue: "inset" },
            ...sharedControls.slice(1),
          ]}
          renderComponent={(config) => (
            <SidebarPreview config={config} overrides={{ variant: "inset" }} />
          )}
          generateCode={(cfg) => generateDesignSidebarCode({ ...cfg, variant: "inset" })}
        />

        {/* 6. Minimal icon rail */}
        <ComponentCard
          title="Minimal Icon Rail"
          description="Zero-background collapsed rail. Icons with tooltip labels, notification dots, and spring expand on toggle. Ideal for tight layouts."
          tags={["minimal", "icon-rail", "tooltips", "typescript"]}
          controls={[
            { ...sharedControls[0], defaultValue: "minimal" },
            { ...sharedControls[1] },
            { ...sharedControls[2] },
            { ...sharedControls[3], defaultValue: true },
            { ...sharedControls[4], defaultValue: false },
            { ...sharedControls[5], defaultValue: false },
            { ...sharedControls[6] },
          ]}
          renderComponent={(config) => (
            <div className="w-full h-[280px] rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 flex">
              <DesignSidebar
                variant="minimal"
                accent={config.accent}
                activeIndicator={config.activeIndicator}
                defaultCollapsed
                showSearch={false}
                showUser={false}
                showNotificationDot={!!config.showNotificationDot}
              />
              <div className="flex-1 bg-slate-50 dark:bg-slate-950 p-4 flex flex-col justify-center gap-1.5">
                <p className="text-xs font-bold text-foreground">Content Area</p>
                <p className="text-[10px] text-slate-400">Hover collapsed icons to see tooltips.</p>
              </div>
            </div>
          )}
          generateCode={(cfg) =>
            generateDesignSidebarCode({ ...cfg, variant: "minimal", defaultCollapsed: true, showSearch: false, showUser: false })
          }
        />
      </div>

      {/* ── Active Indicator Comparison ──────────── */}
      <div className="pt-8 border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-xl font-bold text-foreground mb-1">Active Indicator Styles</h2>
        <p className="text-xs text-slate-400 mb-5">
          Three different ways to highlight the active nav item — same sidebar, different indicator.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(["pill", "bar-left", "ghost"] as const).map((ind) => (
            <div key={ind} className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
              <div className="px-4 py-2.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex items-center justify-between">
                <span className="text-xs font-bold text-foreground capitalize">{ind.replace("-", " ")}</span>
                <span className="text-[10px] text-slate-400 font-mono">{ind}</span>
              </div>
              <div className="h-[340px] flex">
                <DesignSidebar
                  variant="default"
                  accent="blue"
                  activeIndicator={ind}
                  showSearch={false}
                  showUser
                  showNotificationDot
                />
                <div className="flex-1 bg-slate-50 dark:bg-slate-950 p-3 flex items-center justify-center">
                  <p className="text-[10px] text-slate-400 text-center">Indicator: <strong className="text-foreground">{ind}</strong></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Accent Colour Comparison ──────────────── */}
      <div className="pt-8 border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-xl font-bold text-foreground mb-1">Accent Colour Variants</h2>
        <p className="text-xs text-slate-400 mb-5">
          All five accent colours on the dark sidebar — active pills, badges, and logo gradient all follow the accent.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {(["blue","violet","rose","emerald","amber"] as const).map((acc) => (
            <div key={acc} className="rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
              <div className="px-3 py-2 border-b border-slate-800 flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-300 capitalize">{acc}</span>
              </div>
              <div className="h-[300px] flex">
                <DesignSidebar
                  variant="dark"
                  accent={acc}
                  activeIndicator="pill"
                  showSearch={false}
                  showUser={false}
                  showNotificationDot
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Full sandbox ─────────────────────────── */}
      <div className="pt-8 border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-xl font-bold text-foreground mb-1">Live Sandbox</h2>
        <p className="text-xs text-slate-400 mb-5">
          Full-height interactive preview — click nav items, expand sub-menus, toggle collapse, hover icons when collapsed for tooltips.
        </p>
        <div className="h-[580px] rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 flex">
          <DesignSidebar
            variant="default"
            accent="blue"
            activeIndicator="pill"
            showSearch
            showUser
            showNotificationDot
          />
          <div className="flex-1 bg-slate-50 dark:bg-slate-950/60 p-8 flex flex-col justify-center gap-4 min-w-0">
            <div>
              <h3 className="text-xl font-bold text-foreground">Dashboard</h3>
              <p className="text-sm text-slate-400 max-w-lg leading-relaxed mt-2">
                This is the main content area. Try the sidebar:
              </p>
            </div>
            <ul className="text-xs text-slate-500 space-y-1.5 list-disc list-inside">
              <li>Click the <strong className="text-foreground">chevron</strong> to collapse — labels animate out, icons stay</li>
              <li>Hover a <strong className="text-foreground">collapsed icon</strong> to see the tooltip</li>
              <li>Click <strong className="text-foreground">Analytics</strong> or <strong className="text-foreground">Projects</strong> to expand sub-menus</li>
              <li>Type in the <strong className="text-foreground">search bar</strong> to filter items</li>
              <li>The <strong className="text-foreground">notification dot</strong> shows on collapsed badges</li>
            </ul>
            <div className="flex flex-wrap gap-2 mt-2">
              {["Overview","Activity","Reports","Settings"].map((label) => (
                <div key={label}
                  className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-500 cursor-pointer hover:text-foreground transition-colors">
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
