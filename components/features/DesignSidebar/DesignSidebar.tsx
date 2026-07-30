"use client";


import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  LayoutDashboard,
  Settings,
  Users,
  FileText,
  Bell,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Search,
  BarChart2,
  Inbox,
  LogOut,
  Flame,
  X,
  Menu,
  FolderOpen,
  Shield,
  CreditCard,
  HelpCircle,
  Zap,
  Star,
} from "lucide-react";

/* ─── Types ─────────────────────────────────────────────────────────── */
export interface NavChild {
  id: string;
  label: string;
  badge?: number;
}

export interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: number;
  section: string;
  children?: NavChild[];
}

export interface DesignSidebarProps {
  variant?: "default" | "floating" | "minimal" | "glass" | "dark" | "inset";
  accent?: "blue" | "violet" | "rose" | "emerald" | "amber";
  activeIndicator?: "pill" | "bar-left" | "bar-bottom" | "ghost";
  defaultCollapsed?: boolean;
  showSearch?: boolean;
  showUser?: boolean;
  showNotificationDot?: boolean;
}

/* ─── Nav data ───────────────────────────────────────────────────────── */
const NAV_ITEMS: NavItem[] = [
  { id: "home",      label: "Home",       icon: Home,            section: "Main" },
  { id: "dashboard", label: "Dashboard",  icon: LayoutDashboard, section: "Main" },
  { id: "inbox",     label: "Inbox",      icon: Inbox,           badge: 4,  section: "Main" },
  { id: "analytics", label: "Analytics",  icon: BarChart2,       section: "Main",
    children: [
      { id: "analytics-overview", label: "Overview" },
      { id: "analytics-reports",  label: "Reports",  badge: 2 },
      { id: "analytics-funnel",   label: "Funnels" },
    ],
  },
  { id: "projects",  label: "Projects",   icon: FolderOpen,      section: "Work",
    children: [
      { id: "projects-active",    label: "Active",   badge: 3 },
      { id: "projects-archived",  label: "Archived" },
    ],
  },
  { id: "users",     label: "Users",      icon: Users,           section: "Work" },
  { id: "billing",   label: "Billing",    icon: CreditCard,      section: "Work" },
  { id: "docs",      label: "Docs",       icon: FileText,        section: "Work" },
  { id: "alerts",    label: "Alerts",     icon: Bell,            badge: 12, section: "System" },
  { id: "security",  label: "Security",   icon: Shield,          section: "System" },
  { id: "upgrade",   label: "Upgrade",    icon: Zap,             section: "System" },
  { id: "settings",  label: "Settings",   icon: Settings,        section: "System" },
  { id: "help",      label: "Help",       icon: HelpCircle,      section: "System" },
];

/* ─── Theme maps ─────────────────────────────────────────────────────── */
const ACCENT_CFG: Record<string, {
  activePill: string;
  activeText: string;
  activeIcon: string;
  activeBadge: string;
  badge: string;
  iconHover: string;
  gradient: string;
  logoIcon: string;
  barLeft: string;
  barBottom: string;
  ghost: string;
  subActive: string;
  searchFocus: string;
}> = {
  blue: {
    activePill:   "bg-blue-600 shadow-md shadow-blue-500/25",
    activeText:   "text-white",
    activeIcon:   "text-white",
    activeBadge:  "bg-white/20 text-white",
    badge:        "bg-blue-600 text-white",
    iconHover:    "group-hover:text-blue-500",
    gradient:     "from-blue-500 to-purple-600",
    logoIcon:     "text-blue-500 fill-blue-500",
    barLeft:      "border-l-2 border-blue-500 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400",
    barBottom:    "border-b-2 border-blue-500 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400",
    ghost:        "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400",
    subActive:    "text-blue-500 font-bold",
    searchFocus:  "focus:ring-blue-500/40 focus:border-blue-400",
  },
  violet: {
    activePill:   "bg-violet-600 shadow-md shadow-violet-500/25",
    activeText:   "text-white",
    activeIcon:   "text-white",
    activeBadge:  "bg-white/20 text-white",
    badge:        "bg-violet-600 text-white",
    iconHover:    "group-hover:text-violet-500",
    gradient:     "from-violet-500 to-purple-600",
    logoIcon:     "text-violet-500 fill-violet-500",
    barLeft:      "border-l-2 border-violet-500 bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400",
    barBottom:    "border-b-2 border-violet-500 bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400",
    ghost:        "bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400",
    subActive:    "text-violet-500 font-bold",
    searchFocus:  "focus:ring-violet-500/40 focus:border-violet-400",
  },
  rose: {
    activePill:   "bg-rose-600 shadow-md shadow-rose-500/25",
    activeText:   "text-white",
    activeIcon:   "text-white",
    activeBadge:  "bg-white/20 text-white",
    badge:        "bg-rose-600 text-white",
    iconHover:    "group-hover:text-rose-500",
    gradient:     "from-rose-500 to-pink-600",
    logoIcon:     "text-rose-500 fill-rose-500",
    barLeft:      "border-l-2 border-rose-500 bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400",
    barBottom:    "border-b-2 border-rose-500 bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400",
    ghost:        "bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400",
    subActive:    "text-rose-500 font-bold",
    searchFocus:  "focus:ring-rose-500/40 focus:border-rose-400",
  },
  emerald: {
    activePill:   "bg-emerald-600 shadow-md shadow-emerald-500/25",
    activeText:   "text-white",
    activeIcon:   "text-white",
    activeBadge:  "bg-white/20 text-white",
    badge:        "bg-emerald-600 text-white",
    iconHover:    "group-hover:text-emerald-500",
    gradient:     "from-emerald-500 to-teal-600",
    logoIcon:     "text-emerald-500 fill-emerald-500",
    barLeft:      "border-l-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    barBottom:    "border-b-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    ghost:        "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    subActive:    "text-emerald-500 font-bold",
    searchFocus:  "focus:ring-emerald-500/40 focus:border-emerald-400",
  },
  amber: {
    activePill:   "bg-amber-500 shadow-md shadow-amber-400/25",
    activeText:   "text-white",
    activeIcon:   "text-white",
    activeBadge:  "bg-white/20 text-white",
    badge:        "bg-amber-500 text-white",
    iconHover:    "group-hover:text-amber-500",
    gradient:     "from-amber-500 to-orange-500",
    logoIcon:     "text-amber-500 fill-amber-500",
    barLeft:      "border-l-2 border-amber-500 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400",
    barBottom:    "border-b-2 border-amber-500 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400",
    ghost:        "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400",
    subActive:    "text-amber-500 font-bold",
    searchFocus:  "focus:ring-amber-500/40 focus:border-amber-400",
  },
};

const VARIANT_ASIDE: Record<string, string> = {
  default:  "bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800",
  floating: "bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 m-3",
  minimal:  "bg-transparent border-r border-slate-100 dark:border-slate-800/40",
  glass:    "bg-white/10 dark:bg-white/5 backdrop-blur-xl border-r border-white/20 dark:border-white/10",
  dark:     "bg-slate-950 border-r border-slate-800",
  inset:    "bg-slate-100 dark:bg-slate-800/60 border-r border-slate-200 dark:border-slate-700",
};

/* text colours for "dark" variant that override the defaults */
const IS_DARK_VARIANT = (v: string) => v === "dark" || v === "glass";

/* ─── Sidebar spring variants ────────────────────────────────────────── */
const springVariants = {
  expanded:  { width: 256 },
  collapsed: { width: 72 },
};

/* ─── Tooltip on collapsed icons ─────────────────────────────────────── */
function Tooltip({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="relative group/tip flex items-center">
      {children}
      <div className="pointer-events-none absolute left-full ml-3 z-50 hidden group-hover/tip:flex items-center">
        <div className="bg-slate-900 dark:bg-slate-700 text-white text-[11px] font-semibold px-2.5 py-1.5 rounded-lg shadow-xl whitespace-nowrap">
          {label}
        </div>
        <div className="absolute right-full border-4 border-transparent border-r-slate-900 dark:border-r-slate-700" />
      </div>
    </div>
  );
}

/* ─── Main component ─────────────────────────────────────────────────── */
export default function DesignSidebar({
  variant = "default",
  accent = "blue",
  activeIndicator = "pill",
  defaultCollapsed = false,
  showSearch = true,
  showUser = true,
  showNotificationDot = true,
}: DesignSidebarProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const [activeId, setActiveId] = useState("dashboard");
  const [search, setSearch] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set(["analytics"]));

  const cfg = ACCENT_CFG[accent] ?? ACCENT_CFG.blue;
  const asideClass = VARIANT_ASIDE[variant] ?? VARIANT_ASIDE.default;
  const isDark = IS_DARK_VARIANT(variant);

  const sections = Array.from(new Set(NAV_ITEMS.map((i) => i.section)));
  const filtered = search.trim()
    ? NAV_ITEMS.filter((i) => i.label.toLowerCase().includes(search.toLowerCase()))
    : NAV_ITEMS;

  const toggleExpand = (id: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <>
      {/* Mobile trigger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-slate-500 cursor-pointer"
      >
        <Menu size={20} />
      </button>

      {/* Mobile backdrop */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <motion.aside
        className={`hidden md:flex flex-col h-full overflow-hidden shrink-0 select-none ${asideClass}`}
        variants={springVariants}
        initial={false}
        animate={collapsed ? "collapsed" : "expanded"}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <SidebarContent
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          activeId={activeId}
          setActiveId={setActiveId}
          search={search}
          setSearch={setSearch}
          sections={sections}
          filtered={filtered}
          expandedItems={expandedItems}
          toggleExpand={toggleExpand}
          cfg={cfg}
          isDark={isDark}
          activeIndicator={activeIndicator}
          showSearch={showSearch}
          showUser={showUser}
          showNotificationDot={showNotificationDot}
          isMobileDrawer={false}
        />
      </motion.aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            className={`md:hidden fixed top-0 left-0 bottom-0 z-50 w-64 flex flex-col overflow-hidden select-none ${asideClass}`}
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer z-10"
            >
              <X size={16} />
            </button>
            <SidebarContent
              collapsed={false}
              setCollapsed={() => {}}
              activeId={activeId}
              setActiveId={(id) => { setActiveId(id); setMobileOpen(false); }}
              search={search}
              setSearch={setSearch}
              sections={sections}
              filtered={filtered}
              expandedItems={expandedItems}
              toggleExpand={toggleExpand}
              cfg={cfg}
              isDark={isDark}
              activeIndicator={activeIndicator}
              showSearch={showSearch}
              showUser={showUser}
              showNotificationDot={showNotificationDot}
              isMobileDrawer
            />
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}

/* ─── SidebarContent ─────────────────────────────────────────────────── */
interface AccentCfg {
  activePill: string; activeText: string; activeIcon: string; activeBadge: string;
  badge: string; iconHover: string; gradient: string; logoIcon: string;
  barLeft: string; barBottom: string; ghost: string; subActive: string; searchFocus: string;
}

interface ContentProps {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  activeId: string;
  setActiveId: (id: string) => void;
  search: string;
  setSearch: (v: string) => void;
  sections: string[];
  filtered: NavItem[];
  expandedItems: Set<string>;
  toggleExpand: (id: string) => void;
  cfg: AccentCfg;
  isDark: boolean;
  activeIndicator: string;
  showSearch: boolean;
  showUser: boolean;
  showNotificationDot: boolean;
  isMobileDrawer: boolean;
}

function SidebarContent({
  collapsed, setCollapsed, activeId, setActiveId,
  search, setSearch, sections, filtered,
  expandedItems, toggleExpand,
  cfg, isDark, activeIndicator, showSearch, showUser, showNotificationDot,
}: ContentProps) {

  const textMuted = isDark ? "text-slate-400" : "text-slate-500 dark:text-slate-400";
  const textLabel = isDark ? "text-slate-300" : "text-slate-600 dark:text-slate-300";
  const sectionLabel = isDark ? "text-slate-500" : "text-slate-400 dark:text-slate-600";
  const hoverBg = isDark
    ? "hover:bg-white/8 hover:text-slate-100"
    : "hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-foreground";
  const searchBg = isDark
    ? "bg-white/8 border-white/10 text-slate-200 placeholder-slate-500"
    : "bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-foreground placeholder-slate-400";
  const dividerColor = isDark ? "border-white/8" : "border-slate-100 dark:border-slate-800/80";
  const userHover = isDark ? "hover:bg-white/8" : "hover:bg-slate-50 dark:hover:bg-slate-800/50";

  /* resolve active style for a given item id */
  const getActiveClass = (id: string) => {
    const isActive = id === activeId;
    if (!isActive) return `${hoverBg} ${textMuted}`;
    switch (activeIndicator) {
      case "pill":       return `${cfg.activePill} ${cfg.activeText}`;
      case "bar-left":   return cfg.barLeft;
      case "bar-bottom": return cfg.barBottom;
      case "ghost":      return cfg.ghost;
      default:           return `${cfg.activePill} ${cfg.activeText}`;
    }
  };

  const isActivePill = activeIndicator === "pill";

  return (
    <div className="flex flex-col h-full min-h-0">

      {/* ── Header ────────────────────────────────── */}
      <div className={`flex items-center justify-between px-4 h-16 shrink-0 border-b ${dividerColor}`}>
        <AnimatePresence mode="wait">
          {!collapsed ? (
            <motion.div key="brand" className="flex items-center gap-2.5 overflow-hidden min-w-0"
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.18 }}>
              <Flame className={`w-5 h-5 shrink-0 ${isDark ? "text-white/80 fill-white/80" : cfg.logoIcon}`} />
              <span className={`font-extrabold text-sm tracking-tight whitespace-nowrap bg-gradient-to-r ${cfg.gradient} bg-clip-text text-transparent`}>
                AB UI
              </span>
            </motion.div>
          ) : (
            <motion.div key="icon" className="mx-auto"
              initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }} transition={{ duration: 0.15 }}>
              <Flame className={`w-5 h-5 ${isDark ? "text-white/80 fill-white/80" : cfg.logoIcon}`} />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setCollapsed(!collapsed)}
          className={`hidden md:flex p-1.5 rounded-md ${isDark ? "text-slate-500 hover:text-slate-300 hover:bg-white/8" : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"} cursor-pointer shrink-0 ml-2`}
          whileTap={{ scale: 0.82 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </motion.button>
      </div>

      {/* ── Search ────────────────────────────────── */}
      <AnimatePresence>
        {showSearch && !collapsed && (
          <motion.div className="px-3 pt-3 pb-1 shrink-0"
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.18 }}>
            <div className="relative">
              <Search size={12} className={`absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none ${isDark ? "text-slate-500" : "text-slate-400"}`} />
              <input
                type="text" value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search…"
                className={`w-full pl-8 pr-3 py-2 text-xs rounded-lg border outline-none focus:ring-2 transition-all ${searchBg} ${cfg.searchFocus}`}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Nav ───────────────────────────────────── */}
      <nav className="flex-1 overflow-y-auto px-2 py-2 space-y-3 min-h-0">
        {sections.map((section) => {
          const items = filtered.filter((i) => i.section === section);
          if (items.length === 0) return null;

          return (
            <div key={section}>
              {/* Section label */}
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    key={section + "-lbl"}
                    className={`block px-3 mb-1 text-[9px] font-bold uppercase tracking-widest ${sectionLabel}`}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                    {section}
                  </motion.span>
                )}
              </AnimatePresence>

              <div className="space-y-0.5">
                {items.map((item) => {
                  const active = item.id === activeId || (item.children?.some(c => c.id === activeId));
                  const selfActive = item.id === activeId;
                  const Icon = item.icon;
                  const hasChildren = !!(item.children?.length);
                  const isExpanded = expandedItems.has(item.id);
                  const totalBadge = item.badge ?? (item.children?.reduce((s, c) => s + (c.badge ?? 0), 0) || undefined);

                  return (
                    <div key={item.id}>
                      {/* ── Row ── */}
                      {collapsed ? (
                        /* Collapsed: icon with tooltip */
                        <Tooltip label={item.label}>
                          <motion.button
                            onClick={() => {
                              if (hasChildren) toggleExpand(item.id);
                              else setActiveId(item.id);
                            }}
                            className={`relative group w-full flex items-center justify-center p-2.5 rounded-lg transition-colors cursor-pointer ${getActiveClass(item.id)}`}
                            whileTap={{ scale: 0.93 }}
                          >
                            <Icon size={17} className={`shrink-0 transition-colors ${selfActive && isActivePill ? cfg.activeIcon : !selfActive ? `${isDark ? "text-slate-500" : "text-slate-400"} ${cfg.iconHover}` : ""}`} />
                            {/* notification dot */}
                            {showNotificationDot && totalBadge !== undefined && (
                              <span className={`absolute top-1 right-1 w-2 h-2 rounded-full ${cfg.badge} ring-2 ${isDark ? "ring-slate-950" : "ring-white dark:ring-slate-900"}`} />
                            )}
                          </motion.button>
                        </Tooltip>
                      ) : (
                        /* Expanded: full row */
                        <motion.button
                          onClick={() => {
                            if (hasChildren) toggleExpand(item.id);
                            else setActiveId(item.id);
                          }}
                          className={`group w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${getActiveClass(item.id)}`}
                          whileTap={{ scale: 0.97 }}
                          layout
                        >
                          <Icon size={16} className={`shrink-0 transition-colors ${selfActive && isActivePill ? cfg.activeIcon : !selfActive ? `${isDark ? "text-slate-500" : "text-slate-400"} ${cfg.iconHover}` : ""}`} />

                          <motion.span className="flex-1 text-left text-xs truncate"
                            initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.15 }}>
                            {item.label}
                          </motion.span>

                          {/* Badge or chevron */}
                          {hasChildren ? (
                            <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                              <ChevronDown size={13} className={selfActive && isActivePill ? "text-white/70" : isDark ? "text-slate-600" : "text-slate-400"} />
                            </motion.div>
                          ) : totalBadge !== undefined ? (
                            <span className={`shrink-0 min-w-[18px] h-[18px] flex items-center justify-center rounded-full text-[10px] font-bold px-1 ${selfActive && isActivePill ? cfg.activeBadge : cfg.badge}`}>
                              {totalBadge > 99 ? "99+" : totalBadge}
                            </span>
                          ) : null}
                        </motion.button>
                      )}

                      {/* ── Sub-items ── */}
                      <AnimatePresence>
                        {hasChildren && isExpanded && !collapsed && (
                          <motion.div
                            key={item.id + "-children"}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.22, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className={`ml-4 mt-0.5 pl-3 border-l ${isDark ? "border-white/8" : "border-slate-200 dark:border-slate-800"} space-y-0.5 pb-1`}>
                              {item.children!.map((child) => {
                                const childActive = child.id === activeId;
                                return (
                                  <button
                                    key={child.id}
                                    onClick={() => setActiveId(child.id)}
                                    className={`group w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-[11px] font-medium transition-colors cursor-pointer ${
                                      childActive ? cfg.subActive : `${textMuted} ${hoverBg}`
                                    }`}
                                  >
                                    <span>{child.label}</span>
                                    {child.badge !== undefined && (
                                      <span className={`shrink-0 min-w-[16px] h-4 flex items-center justify-center rounded-full text-[9px] font-bold px-1 ${childActive ? cfg.badge : isDark ? "bg-white/10 text-slate-400" : "bg-slate-100 dark:bg-slate-800 text-slate-500"}`}>
                                        {child.badge}
                                      </span>
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>

      {/* ── Upgrade banner (when expanded) ────────── */}
      <AnimatePresence>
        {!collapsed && (
          <motion.div className="px-3 py-2 shrink-0"
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.18 }}>
            <div className={`rounded-xl p-3 flex items-center gap-3 ${isDark ? "bg-white/6 border border-white/8" : "bg-gradient-to-r from-blue-50 to-violet-50 dark:from-blue-950/30 dark:to-violet-950/30 border border-blue-100 dark:border-blue-900/40"}`}>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${isDark ? "bg-white/10" : "bg-white dark:bg-slate-800 shadow-sm"}`}>
                <Star size={14} className="text-amber-400" />
              </div>
              <div className="min-w-0">
                <p className={`text-[11px] font-bold leading-tight ${isDark ? "text-slate-200" : "text-foreground"}`}>Pro Plan</p>
                <p className={`text-[10px] leading-tight mt-0.5 ${isDark ? "text-slate-500" : "text-slate-400"}`}>Unlock all features</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── User footer ───────────────────────────── */}
      {showUser && (
        <div className={`shrink-0 p-3 border-t ${dividerColor}`}>
          <motion.div
            className={`flex items-center gap-3 px-2 py-2 rounded-lg transition-colors cursor-pointer ${userHover} ${collapsed ? "justify-center" : ""}`}
            whileTap={{ scale: 0.97 }}
            layout
          >
            {/* Avatar with online dot */}
            <div className="relative shrink-0">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold bg-gradient-to-br ${cfg.gradient}`}>
                AB
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white dark:ring-slate-900" />
            </div>

            <AnimatePresence mode="wait">
              {!collapsed && (
                <motion.div key="uinfo" className="flex-1 min-w-0"
                  initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -6 }} transition={{ duration: 0.15 }}>
                  <p className={`text-xs font-bold truncate ${isDark ? "text-slate-200" : "text-foreground"}`}>Alex Builder</p>
                  <p className={`text-[10px] truncate ${isDark ? "text-slate-500" : "text-slate-400"}`}>alex@ab-ui.dev</p>
                </motion.div>
              )}
            </AnimatePresence>

            {!collapsed && (
              <LogOut size={13} className={`${isDark ? "text-slate-600 hover:text-slate-400" : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"} shrink-0 transition-colors`} />
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}
