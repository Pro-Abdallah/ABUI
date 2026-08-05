"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Tag,
  MonitorPlay,
  Grid,
  Menu,
  Moon,
  Sun,
  Layout,
  Layers,
  ChevronLeft,
  ChevronRight,
  Flame,
  LayoutDashboard,
  Loader2,
  Sparkles,
  PanelLeft,
  UserCheck,
} from "lucide-react";

interface SidebarProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function Sidebar({ darkMode, onToggleDarkMode }: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = [
    {
      name: "Custom Dashboard",
      path: "/gallery/dashboard",
      icon: LayoutDashboard,
      description: "Interactive Drag & Drop Charts",
    },
    {
      name: "Tag Board",
      path: "/gallery/tag-board",
      icon: Tag,
      description: "Feature 1: DnD tags & reassignment",
    },
    {
      name: "Welcome Screen",
      path: "/gallery/welcome",
      icon: MonitorPlay,
      description: "Feature 2: Splash overlay demo",
    },
    {
      name: "Data Grids",
      path: "/gallery/grids",
      icon: Grid,
      description: "Feature 3: AG Grid & custom table",
    },
    {
      name: "Headers Gallery",
      path: "/gallery/headers",
      icon: Layout,
      description: "Custom site header options",
    },
    {
      name: "Cards Gallery",
      path: "/gallery/cards",
      icon: Layers,
      description: "Variant product/info cards",
    },
    {
      name: "Design Sidebars",
      path: "/gallery/sidebars",
      icon: PanelLeft,
      description: "Animated nav sidebar variants",
    },
    {
      name: "User Welcome Card",
      path: "/gallery/user-welcome",
      icon: UserCheck,
      description: "Post-login user greeting card",
    },
    {
      name: "Loading States",
      path: "/gallery/loading",
      icon: Loader2,
      description: "Skeleton shimmer UI patterns",
    },
  ];

  return (
    <>
      {/* Mobile top bar navigation */}
      <div className="md:hidden w-full h-16 border-b border-slate-200 dark:border-zinc-800 bg-background flex items-center justify-between px-4 sticky top-0 z-40 select-none">
        <div className="flex items-center gap-2.5">
          <Flame className="w-6 h-6 text-red-500 fill-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
          <span className="font-extrabold text-base tracking-tight bg-gradient-to-r from-red-500 via-rose-500 to-red-600 bg-clip-text text-transparent">
            AB UI
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleDarkMode}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 text-muted-foreground hover:text-foreground cursor-pointer"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 text-muted-foreground hover:text-foreground cursor-pointer"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Mobile slide-out nav drawer overlay */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-45 bg-black/60 backdrop-blur-xs"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer & Desktop sidebar */}
      <aside
        className={`fixed top-16 bottom-0 left-0 z-45 md:sticky md:top-0 md:h-screen border-r border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 transition-all duration-300 flex flex-col justify-between ${
          mobileOpen ? "translate-x-0 w-64" : "-translate-x-full md:translate-x-0"
        } ${collapsed ? "md:w-20" : "md:w-64"}`}
      >
        <div className="flex flex-col flex-1 overflow-y-auto custom-scrollbar select-none">
          {/* Header branding (Desktop only) */}
          <div className={`hidden md:flex items-center justify-between px-5 h-16 border-b border-slate-100 dark:border-zinc-800/80 shrink-0`}>
            {!collapsed && (
              <div className="flex items-center gap-2.5">
                <Flame className="w-6 h-6 text-red-500 fill-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
                <span className="font-extrabold text-base tracking-tight bg-gradient-to-r from-red-500 via-rose-500 to-red-600 bg-clip-text text-transparent">
                  AB UI
                </span>
              </div>
            )}
            {collapsed && (
              <Flame className="w-6 h-6 text-red-500 fill-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.6)] mx-auto" />
            )}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-zinc-800 text-muted-foreground hover:text-foreground hidden md:block cursor-pointer"
            >
              {collapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-3 py-4 space-y-1.5">
            {menuItems.map((item) => {
              const active = pathname === item.path;
              const Icon = item.icon;

              return (
                <React.Fragment key={item.path}>
                  <Link
                    href={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={`group flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-all select-none ${
                      active
                        ? "bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md shadow-red-600/30"
                        : "text-muted-foreground hover:bg-slate-50 dark:hover:bg-zinc-900/80 hover:text-foreground"
                    }`}
                  >
                    <Icon
                      size={18}
                      className={`shrink-0 ${
                        active ? "text-white" : "text-zinc-400 group-hover:text-red-500"
                      }`}
                    />
                    {!collapsed && (
                      <div className="flex flex-col items-start leading-tight">
                        <span>{item.name}</span>
                        <span
                          className={`text-[10px] font-normal transition-colors ${
                            active ? "text-red-100" : "text-zinc-400 dark:text-zinc-500"
                          }`}
                        >
                          {item.description}
                        </span>
                      </div>
                    )}
                  </Link>

                  {/* Sub-item: Appears beneath Loading States when clicked/active */}
                  {item.path === "/gallery/loading" && pathname.startsWith("/gallery/loading") && (
                    <Link
                      href="/gallery/loading-example"
                      onClick={() => setMobileOpen(false)}
                      className={`group flex items-center gap-2.5 ml-4 my-1 px-3 py-2 rounded-lg text-xs font-semibold transition-all select-none border-l-2 ${
                        pathname === "/gallery/loading-example"
                          ? "border-red-500 bg-red-500/10 text-red-400 font-bold shadow-sm"
                          : "border-zinc-800 text-muted-foreground hover:bg-slate-50 dark:hover:bg-zinc-900/60 hover:text-foreground"
                      }`}
                    >
                      <Sparkles
                        size={14}
                        className={`shrink-0 ${
                          pathname === "/gallery/loading-example"
                            ? "text-red-400"
                            : "text-zinc-400 group-hover:text-red-400"
                        }`}
                      />
                      {!collapsed && (
                        <div className="flex flex-col items-start leading-tight">
                          <span>Loading Example</span>
                          <span
                            className={`text-[9px] font-normal transition-colors ${
                              pathname === "/gallery/loading-example"
                                ? "text-red-300"
                                : "text-zinc-400 dark:text-zinc-500"
                            }`}
                          >
                            AG Grid + Skeleton Demo
                          </span>
                        </div>
                      )}
                    </Link>
                  )}
                </React.Fragment>
              );
            })}
          </nav>
        </div>

        {/* Footer controls (Desktop theme switcher) */}
        <div className="p-3 border-t border-slate-100 dark:border-zinc-800/80 shrink-0">
          <button
            onClick={onToggleDarkMode}
            className={`w-full flex items-center justify-center gap-3 py-2.5 rounded-lg border border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-900/60 hover:text-foreground text-slate-500 dark:text-zinc-400 text-sm font-bold transition-all cursor-pointer ${
              collapsed ? "px-0" : "px-4"
            }`}
          >
            {darkMode ? (
              <>
                <Sun size={16} className="text-amber-400" />
                {!collapsed && <span>Light Mode</span>}
              </>
            ) : (
              <>
                <Moon size={16} className="text-red-400" />
                {!collapsed && <span>Dark Mode</span>}
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
