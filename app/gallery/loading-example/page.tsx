"use client";

import React, { useState, useEffect } from "react";
import AGGridVariant from "@/components/features/DataGrids/AGGridVariant";
import {
  SkeletonPageLayout,
  SkeletonStatBar,
} from "@/components/ui/skeletons";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, Sparkles, CheckCircle2, Clock, ShieldCheck, Users, DollarSign } from "lucide-react";

export default function LoadingExamplePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingDuration, setLoadingDuration] = useState<number>(2000);
  const [mode, setMode] = useState<"interactive" | "skeleton-only" | "grid-only">("interactive");

  // Trigger loading state simulation
  const triggerLoading = () => {
    setIsLoading(true);
  };

  useEffect(() => {
    if (mode === "skeleton-only") {
      setIsLoading(true);
      return;
    }
    if (mode === "grid-only") {
      setIsLoading(false);
      return;
    }

    // Interactive mode: simulate fetching delay
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, loadingDuration);
      return () => clearTimeout(timer);
    }
  }, [isLoading, loadingDuration, mode]);

  return (
    <div className="space-y-8 select-none">
      {/* ── Title Header ────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-red-500 bg-red-500/10 px-2.5 py-1 rounded-md border border-red-500/20">
              Live Showcase
            </span>
            <span className="text-xs font-medium text-zinc-400">
              AG Grid + On-Brand Crimson Skeleton Transition
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl mt-2">
            Loading Layout & AG Grid Integration
          </h1>
          <p className="text-sm text-zinc-400 mt-2 max-w-3xl leading-relaxed">
            Experience how our custom Framer Motion crimson shimmer loading layout seamlessly replaces complex components like <strong>AG Grid</strong> during initial data hydrations or background refetches.
          </p>
        </div>

        {/* ── Interactive Controls Toolbar ────────────────────────────── */}
        <div className="flex flex-wrap items-center gap-2 bg-zinc-950 border border-zinc-800 p-3 rounded-xl shrink-0 shadow-xl">
          <button
            onClick={triggerLoading}
            disabled={isLoading && mode === "interactive"}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-md shadow-red-600/25 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw size={14} className={isLoading ? "animate-spin" : ""} />
            <span>{isLoading ? "Simulating Fetch..." : "Re-trigger Skeleton"}</span>
          </button>

          <select
            value={loadingDuration}
            onChange={(e) => {
              setLoadingDuration(Number(e.target.value));
              triggerLoading();
            }}
            className="px-3 py-2 text-xs font-semibold rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-200 outline-none cursor-pointer focus:border-red-500"
          >
            <option value={1000}>1.0s Fetch Delay</option>
            <option value={2000}>2.0s Fetch Delay</option>
            <option value={3500}>3.5s Fetch Delay</option>
          </select>

          <div className="h-6 w-px bg-zinc-800 mx-1 hidden sm:block" />

          <div className="flex rounded-lg bg-zinc-900 p-1 border border-zinc-800 text-xs">
            <button
              onClick={() => setMode("interactive")}
              className={`px-2.5 py-1 rounded font-semibold transition-all ${
                mode === "interactive"
                  ? "bg-zinc-800 text-red-500 font-bold"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Interactive
            </button>
            <button
              onClick={() => setMode("skeleton-only")}
              className={`px-2.5 py-1 rounded font-semibold transition-all ${
                mode === "skeleton-only"
                  ? "bg-zinc-800 text-red-500 font-bold"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Skeleton Only
            </button>
            <button
              onClick={() => setMode("grid-only")}
              className={`px-2.5 py-1 rounded font-semibold transition-all ${
                mode === "grid-only"
                  ? "bg-zinc-800 text-red-500 font-bold"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Loaded Grid
            </button>
          </div>
        </div>
      </div>

      {/* ── Demo Container with AnimatePresence Transition ─────────── */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl relative min-h-[560px] overflow-hidden">
        {/* Status Indicator Bar */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-zinc-800/80">
          <div className="flex items-center gap-2">
            <div
              className={`w-2.5 h-2.5 rounded-full ${
                isLoading ? "bg-amber-400 animate-pulse" : "bg-red-500"
              }`}
            />
            <span className="text-xs font-bold text-zinc-300">
              State: {isLoading ? "Hydrating Data (Crimson Shimmer)" : "Ready (AG Grid Loaded)"}
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs text-zinc-400 font-mono">
            <span className="flex items-center gap-1">
              <Clock size={13} className="text-red-500" />
              Latency: {loadingDuration}ms
            </span>
            <span className="flex items-center gap-1">
              <ShieldCheck size={13} className="text-rose-400" />
              Status: 200 OK
            </span>
          </div>
        </div>

        {/* Dynamic Transition Between Skeleton & AG Grid */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="skeleton-view"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Stat Bar Skeleton */}
              <div>
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2 block">
                  Metrics Skeleton
                </span>
                <SkeletonStatBar />
              </div>

              {/* Main Table Skeleton Layout */}
              <div>
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2 block">
                  AG Grid Table Shell Skeleton
                </span>
                <SkeletonPageLayout />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="grid-view"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Live Metric Cards Header */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-4 flex flex-col justify-between hover:border-red-500/30 transition-colors">
                  <div className="flex items-center justify-between text-zinc-400 text-xs font-semibold">
                    <span>Total Employees</span>
                    <Users size={16} className="text-red-500" />
                  </div>
                  <div className="mt-3">
                    <div className="text-2xl font-black text-white">124</div>
                    <div className="text-[10px] text-red-500 font-semibold mt-0.5">↑ 12% this month</div>
                  </div>
                </div>

                <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-4 flex flex-col justify-between hover:border-red-500/30 transition-colors">
                  <div className="flex items-center justify-between text-zinc-400 text-xs font-semibold">
                    <span>Active Status</span>
                    <CheckCircle2 size={16} className="text-rose-500" />
                  </div>
                  <div className="mt-3">
                    <div className="text-2xl font-black text-white">98</div>
                    <div className="text-[10px] text-zinc-400 font-semibold mt-0.5">79% active roster</div>
                  </div>
                </div>

                <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-4 flex flex-col justify-between hover:border-red-500/30 transition-colors">
                  <div className="flex items-center justify-between text-zinc-400 text-xs font-semibold">
                    <span>Avg Payroll</span>
                    <DollarSign size={16} className="text-red-400" />
                  </div>
                  <div className="mt-3">
                    <div className="text-2xl font-black text-white">$108,400</div>
                    <div className="text-[10px] text-red-400 font-semibold mt-0.5">Competitive tier</div>
                  </div>
                </div>

                <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-4 flex flex-col justify-between hover:border-red-500/30 transition-colors">
                  <div className="flex items-center justify-between text-zinc-400 text-xs font-semibold">
                    <span>Avg Score</span>
                    <Sparkles size={16} className="text-rose-400" />
                  </div>
                  <div className="mt-3">
                    <div className="text-2xl font-black text-white">4.85 ★</div>
                    <div className="text-[10px] text-rose-400 font-semibold mt-0.5">Top 5% performance</div>
                  </div>
                </div>
              </div>

              {/* AG Grid Live Component */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                    Interactive Employee Roster Data Grid
                  </span>
                  <span className="text-xs text-red-500 font-semibold">
                    AG Grid Quartz Dark Theme Active
                  </span>
                </div>
                <AGGridVariant rowCount={25} rowHeight={48} enableSorting={true} enablePagination={true} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
